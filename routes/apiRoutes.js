const express = require('express')
const router = require('express').Router()
const SuperArray = require('super-array')
const { Kayn, REGIONS } = require('kayn')
const axios = require('axios')
const { Account, DivisionOrder, DuoOrder, PlacementOrder, WinsOrder } = require('../models')
const { Random } = require("random-js")
const random = new Random()
const requestIp = require('request-ip')
const API_KEY = process.env.API_KEY
const kayn = Kayn(API_KEY)(

)

router.use(requestIp.mw())

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

function getRankChar(rank) {
  switch (rank) {
    case 'IV':
      return '4'
      break
    case 'III':
      return '3'
      break
    case 'II':
      return '2'
      break
    case 'I':
      return '1'
      break
  }
}

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}
function buildLeagueData(obj) {
  if (obj === null) {
    return {
      tier: 'unranked',
      division: 'unranked',
      tierChar: '0',
      rankChar: '0',
      TierDiv: '00',
      lp: 0
    }
  } else {
    return {
      tier: obj.tier,
      division: obj.rank,
      tierChar: obj.tier.charAt(0),
      rankChar: getRankChar(obj.rank),
      TierDiv: `${obj.tier.charAt(0)}${getRankChar(obj.rank)}`,
      lp: obj.leaguePoints
    }
  }
}
function generateOrderNumber() {
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
router.post('/orders', (req, res) => {
  let orderNumber = parseInt(random.integer(1000000000, 9999999999))
  let order = req.body
  let accountData = {
    summonerId: order.account.info.summoner.id,
    accountId: order.account.info.summoner.accountId,
    puuid: order.account.info.summoner.puuid,
    name: order.account.info.summoner.name,
    region: order.region,
    profileIconId: order.account.info.summoner.profileIconId,
    summonerLevel: order.account.info.summoner.summonerLevel,
    flexTier: order.account.info.flex.tier,
    flexRank: order.account.info.flex.division,
    soloTier: order.account.info.solo.tier,
    soloRank: order.account.info.solo.division
  }
  Account.create(accountData)
    .then(insertedAccount => {
      let insertedId = insertedAccount.dataValues.id
      switch (order.order.orderType) {
        case 'flexBoost1':
        case 'soloBoost1':
          DivisionOrder.create({
            orderNumber: orderNumber,
            price: parseInt(order.order.price),
            orderType: order.order.orderType,
            queue: order.order.queue,
            useCustomChampions: order.customChampions.useChampions,
            customChampions: JSON.stringify(order.customChampions.championArray),
            midlane: order.roles.midlane,
            toplane: order.roles.toplane,
            marksman: order.roles.marksman,
            jungle: order.roles.jungle,
            support: order.roles.support,
            desiredTier: order.formOptions.divisionBoost.desiredTier,
            desiredDivision: order.formOptions.divisionBoost.desiredDivision,
            accountId: insertedId
          })
          .then(() => {
            res.sendStatus(200)
          })
          .catch(e => console.log(e))
          break
        case 'flexBoost2':
        case 'soloBoost2':
          DuoOrder.create({
            orderNumber: orderNumber,
            price: parseInt(order.order.price),
            orderType: order.order.orderType,
            queue: order.order.queue,
            useCustomChampions: order.customChampions.useChampions,
            customChampions: JSON.stringify(order.customChampions.championArray),
            midlane: order.roles.midlane,
            toplane: order.roles.toplane,
            marksman: order.roles.marksman,
            jungle: order.roles.jungle,
            support: order.roles.support,
            games: order.formOptions.duoGames.games,
            wins: order.formOptions.duoGames.wins,
            numberOfGames: order.formOptions.duoGames.numberOfGames,
            accountId: insertedId
          })
            .then(() => {
              res.sendStatus(200)
            })
            .catch(e => console.log(e))
          break
        case 'flexBoost3':
        case 'soloBoost3':
          PlacementOrder.create({
            orderNumber: orderNumber,
            price: parseInt(order.order.price),
            orderType: order.order.orderType,
            queue: order.order.queue,
            useCustomChampions: order.customChampions.useChampions,
            customChampions: JSON.stringify(order.customChampions.championArray),
            midlane: order.roles.midlane,
            toplane: order.roles.toplane,
            marksman: order.roles.marksman,
            jungle: order.roles.jungle,
            support: order.roles.support,
            previousTier: order.formOptions.placementGames.previousTier,
            numberOfGames: order.formOptions.placementGames.numberOfGames,
            accountId: insertedId
          })
            .then(() => {
              res.sendStatus(200)
            })
            .catch(e => console.log(e))
          break
        case 'flexBoost4':
        case 'soloBoost4':
          WinsOrder.create({
            orderNumber: orderNumber,
            price: parseInt(order.order.price),
            orderType: order.order.orderType,
            queue: order.order.queue,
            useCustomChampions: order.customChampions.useChampions,
            customChampions: JSON.stringify(order.customChampions.championArray),
            midlane: order.roles.midlane,
            toplane: order.roles.toplane,
            marksman: order.roles.marksman,
            jungle: order.roles.jungle,
            support: order.roles.support,
            numberOfGames: order.formOptions.rankedWins.numberOfWins,
            accountId: insertedId
          })
            .then(() => {
              res.sendStatus(200)
            })
            .catch(e => console.log(e))
          break
      }
    })
    .catch(e => console.log(e))
})
router.get('/champions', (req, res) => {
  kayn.DDragon.Champion.list() // Implicitly targets 8.24.1
    .callback(function (error, champions) {
      res.json(champions)
    })
})
router.get('/championnames', (req, res) => {
  kayn.DDragon.Champion.list() // Implicitly targets 8.24.1
    .callback(function (error, champions) {
      var cData = Object.keys(champions.data).map(key => {
        return champions.data[key];
      })
      let cReturn = []
      cData.forEach(c => {
        let cObj = {
          id: c.id,
          name: c.name,
          key: c.key,
          title: c.title,
          icon: c.image.full
        }
        cReturn.push(cObj)
      })
      res.json(cReturn)
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
              let sLeague = findObjectByKey(data, 'queueType', 'RANKED_SOLO_5x5')
              let fLeague = findObjectByKey(data, 'queueType', 'RANKED_FLEX_SR')
              let returnJson = {
                summoner,
                solo: buildLeagueData(sLeague),
                flex: buildLeagueData(fLeague)
              }
              res.json(returnJson)
            })
            .catch(e => console.log(e))
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))

})

module.exports = router
