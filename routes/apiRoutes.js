const express = require('express')
const router = require('express').Router()
const SuperArray = require('super-array')
const { Kayn, REGIONS } = require('kayn')
const axios = require('axios')
const { Account, Order } = require('../models')
const { Random } = require("random-js")
const random = new Random()
const API_KEY = process.env.API_KEY
const kayn = Kayn(API_KEY)(

)

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
// BRAZIL (BR)
// EUROPE (EUNE)
// EUROPE_WEST (EUW)
// JAPAN (JP)
// KOREA (KR)
// LATIN AMERICA NORTH (LAN)
// LATIN AMERICA SOUTH (LAS)
// NORTH AMERICA (NA)
// OCEANIA (OCE)
// RUSSIA (RU)
// TURKEY (TR)
function generateOrderNumber(){
  var result = '';
  for (var i = 0; i < 10; i++) {
    result += random.integer(1, 9)
  }
  return parseInt(result);
}

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}

async function getLeague(id) {
  let response = await new Promise((resolve, reject) => {
    axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(e => reject(e))
  })

  return response
}

router.get('/champions', (req, res) => {
  kayn.DDragon.Champion.list() // Implicitly targets 8.24.1
    .callback(function (error, champions) {
      res.json(champions)
    })
})
router.get('/championnames', (req, res) => {
  kayn.DDragon.Champion.list() // Implicitly targets 8.24.1
    .callback(function (error, champions) {
      let listofchamps = []
      res.json(Object.keys(champions.data))
    })
})
// Get summoner data
router.get('/get/account/:name/:region', (req, res) => {
  let name = req.params.name
  let region = req.params.region
  let searchRegion
 
  switch (region) {
    case "br":
    searchRegion = REGIONS.BRAZIL
    break
    case "eune":
    searchRegion = REGIONS.EUROPE
    break
    case "euw":
      searchRegion = REGIONS.EUROPE_WEST
    break
    case "jp":
      searchRegion = REGIONS.JAPAN
    break
    case "kr":
      searchRegion = REGIONS.KOREA
    break
    case "lan":
      searchRegion = REGIONS.LATIN_AMERICA_NORTH
    break
    case "las":
      searchRegion = REGIONS.LATIN_AMERICA_SOUTH
    break
    case "na":
      searchRegion = REGIONS.NORTH_AMERICA
    break
    case "oce":
      searchRegion = REGIONS.OCEANIA
    break
    case "ru":
      searchRegion = REGIONS.RUSSIA
    break
    case "tr":
      searchRegion = REGIONS.TURKEY
    break
  }
  kayn.Summoner.by.name(name).region(searchRegion)
    .then(summoner => {
      kayn.League.Entries.by.summonerID(summoner.id)
        .then(data => {
          getLeague(summoner.id)
          .then(data => {
            res.json({
              summoner,
              leagueCount: data.length,
              data
            })
          })
          .catch(e => console.log(e))
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))

})

router.post('/orders', (req, res) => {
  let soloLeague = findObjectByKey(req.body.selectedAccount.data, 'queueType', 'RANKED_SOLO_5x5')
  let flexLeague = findObjectByKey(req.body.selectedAccount.data, 'queueType', 'RANKED_FLEX_SR')
  let accountData = {
    summonerId: req.body.selectedAccount.summoner.id,
    accountId: req.body.selectedAccount.summoner.accountId,
    puuid: req.body.selectedAccount.summoner.puuid,
    name: req.body.selectedAccount.summoner.name,
    region: req.body.selectedRegion,
    profileIconId: req.body.selectedAccount.summoner.profileIconId,
    summonerLevel: req.body.selectedAccount.summoner.summonerLevel,
    flexTier: flexLeague.tier || 'None',
    flexRank: flexLeague.rank || 'None',
    soloTier: soloLeague.tier || 'None',
    soloRank: soloLeague.rank || 'None'
  }
  Account.create(accountData)
    .then(insertedAccount => {
      let insertedId = insertedAccount.dataValues.id
      let orderNumber = random.integer(1000000000, 9999999999)
      let orderObj = {
        orderNumber,
        orderType: req.body.formOptions.orderType,
        winsQueue: req.body.formOptions.winsQueue,
        numberOfWins: req.body.formOptions.numberOfWins,
        leagueQueue: req.body.formOptions.leagueQueue,
        desiredTier: req.body.formOptions.desiredTier,
        desiredDivision: req.body.formOptions.desiredDivision,
        customChampions: JSON.stringify(req.body.formOptions.customChampions),
        accountId: insertedId
      }
      Order.create(orderObj)
        .then(result => {
          console.log(result)
          res.json(result)
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
})

module.exports = router
