// VARIABLES
let account = {}
let boostOptions = {}
let selectedOption
let selectedQueue
let priceCache
let tierOptions = [
  '<option value="Iron">Iron</option>',
  '<option value="Bronze">Bronze</option>',
  '<option value="Silver">Silver</option>',
  '<option value="Gold">Gold</option>',
  '<option value="Platinum">Platinum</option>',
  '<option value="Diamond">Diamond</option>',
  '<option value="Master">Master</option>'
]
let divisionOptions = [
  '<option value="IV">Division IV</option>',
  '<option value="III">Division III</option>',
  '<option value="II">Division II</option>',
  '<option value="I">Division I</option>'
]
let tierMap = ['I', 'B', 'S', 'G', 'P', 'D']
let divMap = ['4', '3', '2', '1']
let tierCache
let divCache
let divisions = ['I4', 'I3', 'I2', 'I1', 'B4', 'B3', 'B2', 'B1', 'S4', 'S3', 'S2', 'S1', 'G4', 'G3', 'G2', 'G1', 'G4', 'P3', 'P2', 'P1', 'D4', 'D3', 'D2', 'D1', 'M']
let customChampions = false
let selectedChampions = []
let championArr = []
let selectedRegion
// PRICE VARS
// Base win price
let ironWins = [1.9, 1.9, 1.9, 1.9]
let bronzeWins = [1.9, 1.9, 1.9, 1.9]
let silverWins = [1.9, 2.9, 2.9, 3.9]
let goldWins = [3.9, 4.9, 4.9, 5.9]
let platinumWins = [6.9, 6.9, 7.9, 9.9]
let diamondWins = [12.9, 16.9, 21.9, 22.9]
let masterWins = 25
let masterWinsAdd = 4
let grandmasterWins = 30
let grandmasterWinsAdd = 6
let challengerWins = 35
let challengerWinsAdd = 8
// Base placement price
let placementTiers = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']
let placementPrices = [5, 7, 9, 11, 13, 15, 17, 19, 21, 25]
// Base flex duo game/win price
let duoIronGames = [1.9, 1.9, 1.9, 1.9]
let duoBronzeGames = [1.9, 1.9, 1.9, 1.9]
let duoSilverGames = [1.9, 2.9, 2.9, 3.9]
let duoGoldGames = [3.9, 4.9, 4.9, 5.9]
let duoPlatinumGames = [6.9, 6.9, 7.9, 9.9]
let duoDiamondGames = [12.9, 16.9, 21.9, 22.9]
let duoMasterGames = 25
let duoMasterGamesAdd = 2
let duoGrandmasterGames = 30
let duoGrandmasterGamesAdd = 4
let duoChallengerGames = 35
let duoChallengerGamesAdd = 6
// Base solo duo game/win price
let duoIronWins = [1.9, 1.9, 1.9, 1.9]
let duoBronzeWins = [1.9, 1.9, 1.9, 1.9]
let duoSilverWins = [1.9, 2.9, 2.9, 3.9]
let duoGoldWins = [3.9, 4.9, 4.9, 5.9]
let duoPlatinumWins = [6.9, 6.9, 7.9, 9.9]
let duoDiamondWins = [12.9, 16.9, 21.9, 22.9]
let duoMasterWins = 25
let duoMasterWinsAdd = 4
let duoGrandmasterWins = 30
let duoGrandmasterWinsAdd = 6
let duoChallengerWins = 35
let duoChallengerWinsAdd = 8
// Division prices
let divisionPrices = [10, 10, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 20, 20, 20, 20, 29, 29, 29, 29, 80, 80, 80, 80, 284]
// FUNCTIONS
async function getChampionNames() {
  let response = await new Promise((resolve, reject) => {
    $.get(`/api/championnames`, (res) => {
      if (!res) {
        reject(new Error('Error communicating with server'))
      } else {
        resolve((res))
      }
    })
  })

  return response
}
async function submitOrder(obj) {
  let response = await new Promise((resolve, reject) => {
    axios.post(`./api/orders`, obj)
      .then((data) => {
        resolve(data)
      })
      .catch(e => reject(e))
  })

  return response
}
function getTierDiv(tier, rank) {
  let t = tier.charAt(0)
  switch (rank) {
    case 'IV':
      return `${t}4`
      break
    case 'III':
      return `${t}3`
      break
    case 'II':
      return `${t}2`
      break
    case 'I':
      return `${t}1`
      break
  }
}
function range(size, startAt) {
  return [...Array(size).keys()].map(i => i + startAt);
}
function lpWinsPrice(base, addon, wins, LP) {
  return ((wins * base) + ((LP / 100) * addon))
}
async function getAccount(name, region) {
  let response = await new Promise((resolve, reject) => {
    $.get(`./api/get/account/${name}/${region}`, (res) => {
      if (!res) {
        reject(new Error('Error communicating with server'))
      } else {
        resolve((res))
      }
    })
  })
  return response
}
async function calculatePrice() {
  let response = await new Promise((resolve, reject) => {
    let masterPrice = 0
    switch (selectedOption) {
      case 'soloBoost1':
      case 'flexBoost1':
        // Division price
        let curTierDiv
        let desTierDiv = getTierDiv($('#desiredTier').val(), $('#desiredDivision').val())
        if (selectedQueue === 'solo') {
          curTierDiv = account.info.solo.TierDiv
        } else {
          curTierDiv = account.info.flex.TierDiv
        }
        if (desTierDiv.charAt(0) === 'M') {
          let currentIndex = divisions.indexOf(curTierDiv)
          let desiredIndex = divisions.indexOf('M')
          let jumpCount = desiredIndex - currentIndex
          let purchaseArray = range(jumpCount, currentIndex + 1)
          let totalPrice = 0
          purchaseArray.forEach(index => {
            totalPrice = totalPrice + divisionPrices[index]
          })
          masterPrice = totalPrice
        } else {
          let currentIndex = divisions.indexOf(curTierDiv)
          let desiredIndex = divisions.indexOf(desTierDiv)
          let jumpCount = desiredIndex - currentIndex
          let purchaseArray = range(jumpCount, currentIndex + 1)
          let totalPrice = 0
          purchaseArray.forEach(index => {
            totalPrice = totalPrice + divisionPrices[index]
          })
          masterPrice = totalPrice
        }
        break
      case 'soloBoost2':
      case 'flexBoost2':
        // Duo games or wins
        let gameType
        let duoTier
        let duoRank
        let duoLP
        let numOfGames = parseInt($('#gamesRange').val())
        if ($('#gamesOnly').is(':checked')) {
          // Games only
          gameType = 1
        } else {
          // Wins only
          gameType = 2
        }
        if (selectedQueue === 'solo') {
          duoTier = account.info.solo.tier
          duoRank = parseInt(account.info.solo.rankChar) - 1
          duoLP = account.info.solo.lp
        } else {
          duoTier = account.info.flex.tier
          duoRank = parseInt(account.info.flex.rankChar) - 1
          duoLP = account.info.flex.lp
        }
        switch (duoTier) {
          case 'CHALLENGER':
            if (gameType === 1) {
              masterPrice = lpWinsPrice(duoChallengerGames, duoChallengerGamesAdd, numOfGames, duoLP)
            } else {
              masterPrice = lpWinsPrice(duoChallengerWins, duoChallengerWinsAdd, numOfGames, duoLP)
            }
            break
          case 'GRANDMASTER':
            if (gameType === 1) {
              masterPrice = lpWinsPrice(duoGrandmasterGames, duoGrandmasterGamesAdd, numOfGames, duoLP)
            } else {
              masterPrice = lpWinsPrice(duoGrandmasterWins, duoGrandmasterWinsAdd, numOfGames, duoLP)
            }
            break
          case 'MASTER':
            if (gameType === 1) {
              masterPrice = lpWinsPrice(duoMasterGames, duoMasterGamesAdd, numOfGames, duoLP)
            } else {
              masterPrice = lpWinsPrice(duoMasterWins, duoMasterWinsAdd, numOfGames, duoLP)
            }
            break
          case 'DIAMOND':
            console.log(duoDiamondGames)
            console.log(duoDiamondWins)
            console.log(duoRank)
            if (gameType === 1) {
              masterPrice = duoDiamondGames[duoRank] * numOfGames
            } else {
              masterPrice = duoDiamondWins[duoRank] * numOfGames
            }
            break
          case 'PLATINUM':
            if (gameType === 1) {
              masterPrice = duoPlatinumGames[duoRank] * numOfGames
            } else {
              masterPrice = duoPlatinumWins[duoRank] * numOfGames
            }
            break
          case 'GOLD':
            if (gameType === 1) {
              masterPrice = duoGoldGames[duoRank] * numOfGames
            } else {
              masterPrice = duoGoldWins[duoRank] * numOfGames
            }
            break
          case 'SILVER':
            if (gameType === 1) {
              masterPrice = duoSilverGames[duoRank] * numOfGames
            } else {
              masterPrice = duoSilverWins[duoRank] * numOfGames
            }
            break
          case 'BRONZE':
            console.log(duoBronzeGames)
            console.log(duoBronzeWins)
            console.log(duoRank)
            if (gameType === 1) {
              masterPrice = duoBronzeGames[duoRank] * numOfGames
            } else {
              masterPrice = duoBronzeWins[duoRank] * numOfGames
            }
            break
          case 'IRON':
            if (gameType === 1) {
              masterPrice = duoIronGames[duoRank] * numOfGames
            } else {
              masterPrice = duoIronWins[duoRank] * numOfGames
            }
            break
        }
        break
      case 'soloBoost3':
      case 'flexBoost3':
        // Placement games
        let placementGameCount = parseInt($('#placementRange').val())
        let pastTier = $('#previousSeason').val()
        let pastTierIndex = placementTiers.indexOf(pastTier)
        let placePrice = placementPrices[pastTierIndex]
        masterPrice = placePrice * placementGameCount
        break
      case 'soloBoost4':
      case 'flexBoost4':
        // Ranked wins
        let numWins = parseInt($('#winRange').val())
        let winTier
        let winDiv
        if (selectedQueue === 'solo') {
          winTier = account.info.solo.tier
          winDiv = parseInt(account.info.solo.rankChar)
          winLP = account.info.solo.lp
        } else {
          winTier = account.info.flex.tier
          winDiv = parseInt(account.info.flex.rankChar)
          winLP = account.info.flex.lp
        }
        switch (winTier) {
          case 'CHALLENGER':
            masterPrice = lpWinsPrice(challengerWins, challengerWinsAdd, numWins, winLP)
            break
          case 'GRANDMASTER':
            masterPrice = lpWinsPrice(grandmasterWins, grandmasterWinsAdd, numWins, winLP)
            break
          case 'MASTER':
            masterPrice = lpWinsPrice(masterWins, masterWinsAdd, numWins, winLP)
            break
          case 'DIAMOND':
            masterPrice = diamondWins[winDiv] * numWins
            break
          case 'PLATINUM':
            masterPrice = platinumWins[winDiv] * numWins
            break
          case 'GOLD':
            masterPrice = goldWins[winDiv] * numWins
            break
          case 'SILVER':
            masterPrice = silverWins[winDiv] * numWins
            break
          case 'BRONZE':
            masterPrice = bronzeWins[winDiv] * numWins
            break
          case 'IRON':
            masterPrice = ironWins[winDiv] * numWins
            break
        }
        break
    }
    if (masterPrice === 0) {
      reject(masterPrice)
    } else {
      resolve(Math.round(masterPrice))
    }
  })
  return response
}
function renderProfile(account) {
  selectedRegion = $('#searchServer').val()
  $('#profileIcon').attr('src', `./assets/images/profileicon/${account.summoner.profileIconId}.png`)
  $('#profileName').text(account.summoner.name)
  $('#profileLevel').text(`Level: ${account.summoner.summonerLevel}`)
  let soloRow = `
    <tr>
      <td>Solo/Duo</td>
      <td>${account.solo.tier}</td>
      <td>${account.solo.division}</td>
    </tr>
  `
  let flexRow = `
    <tr>
      <td>Flex</td>
      <td>${account.flex.tier}</td>
      <td>${account.flex.division}</td>
    </tr>
  `
  $('#profileTable').html('')
  $('#profileTable').append(soloRow)
  $('#profileTable').append(flexRow)
  $(".accountRender").show()
}
function findChampionByKey(value) {
  for (var i = 0; i < championArr.length; i++) {
    if (championArr[i]['key'] === value) {
      return championArr[i];
    }
  }
  return null;
}
function getSoloBoostOptions() {
  let soloRankedWins
  let soloDivisionBoost
  let soloPlacementGames
  let soloDuoGamesOrWins
  if (account.solo.tier === 'unranked') {
    soloRankedWins = false
  } else {
    soloRankedWins = true
  }
  if (account.solo.tier === 'unranked') {
    soloPlacementGames = true
  } else {
    soloPlacementGames = false
  }
  if (account.solo.tier === 'unranked') {
    soloDuoGamesOrWins = false
  } else {
    soloDuoGamesOrWins = true
  }
  if (account.solo.tier === 'unranked' || account.solo.tier === 'MASTER' || account.solo.tier === 'GRANDMASTER' || account.solo.tier === 'CHALLENGER') {
    soloDivisionBoost = false
  } else {
    soloDivisionBoost = true
  }
  return {
    rankedWins: soloRankedWins,
    divisionBoost: soloDivisionBoost,
    placementGames: soloPlacementGames,
    duoGamesOrWins: soloDuoGamesOrWins
  }
}
function getFlexBoostOptions() {
  let flexRankedWins
  let flexDivisionBoost
  let flexPlacementGames
  let flexDuoGamesOrWins
  if (account.flex.tier === 'unranked') {
    flexRankedWins = false
  } else {
    flexRankedWins = true
  }
  if (account.flex.tier === 'unranked') {
    flexPlacementGames = true
  } else {
    flexPlacementGames = false
  }
  if (account.flex.tier === 'unranked') {
    flexDuoGamesOrWins = false
  } else {
    flexDuoGamesOrWins = true
  }
  if (account.flex.tier === 'unranked' || account.flex.tier === 'MASTER' || account.flex.tier === 'GRANDMASTER' || account.flex.tier === 'CHALLENGER') {
    flexDivisionBoost = false
  } else {
    flexDivisionBoost = true
  }
  return {
    rankedWins: flexRankedWins,
    divisionBoost: flexDivisionBoost,
    placementGames: flexPlacementGames,
    duoGamesOrWins: flexDuoGamesOrWins
  }
}
function renderOptions(type) {
  $('#notype').hide()
  switch (type) {
    case 'soloBoost1':
      selectedQueue = 'solo'
      $('#b1').show()
      $('#b2').hide()
      $('#b3').hide()
      $('#b4').hide()
      break
    case 'soloBoost2':
      selectedQueue = 'solo'
      $('#b1').hide()
      $('#b2').show()
      $('#b3').hide()
      $('#b4').hide()
      break
    case 'soloBoost3':
      selectedQueue = 'solo'
      $('#b1').hide()
      $('#b2').hide()
      $('#b3').show()
      $('#b4').hide()
      break
    case 'soloBoost4':
      selectedQueue = 'solo'
      $('#b1').hide()
      $('#b2').hide()
      $('#b3').hide()
      $('#b4').show()
      break
    case 'flexBoost1':
      selectedQueue = 'flex'
      $('#b1').show()
      $('#b2').hide()
      $('#b3').hide()
      $('#b4').hide()
      break
    case 'flexBoost2':
      selectedQueue = 'flex'
      $('#b1').hide()
      $('#b2').show()
      $('#b3').hide()
      $('#b4').hide()
      break
    case 'flexBoost3':
      selectedQueue = 'flex'
      $('#b1').hide()
      $('#b2').hide()
      $('#b3').show()
      $('#b4').hide()
      break
    case 'flexBoost4':
      selectedQueue = 'flex'
      $('#b1').hide()
      $('#b2').hide()
      $('#b3').hide()
      $('#b4').show()
      break
  }
}
function renderBoostOptions() {
  if (account.boostOptions.soloOptions.divisionBoost === false) {
    $('#solo1').hide()
  } else {
    $('#solo1').show()
  }
  if (account.boostOptions.soloOptions.duoGamesOrWins === false) {
    $('#solo2').hide()
  } else {
    $('#solo2').show()
  }
  if (account.boostOptions.soloOptions.placementGames === false) {
    $('#solo3').hide()
  } else {
    $('#solo3').show()
  }
  if (account.boostOptions.soloOptions.rankedWins === false) {
    $('#solo4').hide()
  } else {
    $('#solo4').show()
  }
  if (account.boostOptions.flexOptions.divisionBoost === false) {
    $('#flex1').hide()
  } else {
    $('#flex1').show()
  }
  if (account.boostOptions.flexOptions.duoGamesOrWins === false) {
    $('#flex2').hide()
  } else {
    $('#flex2').show()
  }
  if (account.boostOptions.flexOptions.placementGames === false) {
    $('#flex3').hide()
  } else {
    $('#flex3').show()
  }
  if (account.boostOptions.flexOptions.rankedWins === false) {
    $('#flex4').hide()
  } else {
    $('#flex4').show()
  }
}
function setBoostOptions() {
  $('#desiredDivision').html('')
  $('#desiredTier').html('')
  switch (selectedOption) {
    case 'soloBoost1':
    case 'flexBoost1':
      if (selectedQueue === 'solo') {
        let tierIndex = tierMap.indexOf(account.info.solo.tierChar)
        let rankIndex = divMap.indexOf(account.info.solo.rankChar)
        if (tierIndex === 5 && rankIndex === 3) {
          // Account is diamond 1, only show master
          tierCache = tierOptions.slice(tierIndex + 1)
          $('#desiredDivision').hide()
        } else {
          // Map options
          if (rankIndex === 3) {
            // Account is divsion 1 in current tier
            tierCache = tierOptions.slice(tierIndex + 1)
            divCache = divisionOptions
          } else {
            tierCache = tierOptions.slice(tierIndex)
            divCache = divisionOptions.slice(rankIndex + 1)
          }
        }
        tierCache.forEach(t => {
          $('#desiredTier').append(t)
        })
        divCache.forEach(d => {
          $('#desiredDivision').append(d)
        })
      } else {
        let tierIndex = tierMap.indexOf(account.info.flex.tierChar)
        let rankIndex = divMap.indexOf(account.info.flex.rankChar)
        if (tierIndex === 5 && rankIndex === 3) {
          // Account is diamond 1, only show master
          tierCache = tierOptions.slice(tierIndex + 1)
          $('#desiredDivision').hide()
        } else {
          // Map options
          if (rankIndex === 3) {
            // Account is divsion 1 in current tier
            tierCache = tierOptions.slice(tierIndex + 1)
            divCache = divisionOptions
          } else {
            tierCache = tierOptions.slice(tierIndex)
            divCache = divisionOptions.slice(rankIndex + 1)
          }
        }
        tierCache.forEach(t => {
          $('#desiredTier').append(t)
        })
        divCache.forEach(d => {
          $('#desiredDivision').append(d)
        })
      }
      break
  }
}
function renderPrice() {
  calculatePrice()
    .then(price => {
      priceCache = price
      $('#curPrice').text(`€${price}`)
    })
    .catch(e => console.log(e))
}
function renderChampions() {
  $('#championStream').html('')
  selectedChampions.forEach(key => {
    let champ = findChampionByKey(key)
    console.log(champ)
    let cElement = `
    <div className="col-sm-3 text-center">
      <div class="alert alert-dismissible alert-light">
        <button type="button" cid="${champ.key}" class="close remove-champ" data-dismiss="alert">&times;</button>
        <div className="row">
          <img src="./assets/images/champion/${champ.name}.png" className="img-thumbnail thumb"/>
        </div>
        <div className="row">
          <h5>${champ.name}</h5>
        </div>
        <div className="row">
          <h6>${champ.title}</h6>
        </div>
      </div>
    </div>
    `
    $('#championStream').append(cElement)
  })
}
function removeChamp(cid) {
  selectedChampions.splice(selectedChampions.indexOf(cid), 1)
  renderChampions()
}
function buildOrder() {
  return {
    account,
    region: selectedRegion,
    order: {
      price: priceCache,
      orderType: selectedOption,
      queue: selectedQueue,
    },
    customChampions: {
      useChampions: customChampions,
      championArray: selectedChampions
    },
    roles: {
      midlane: $('#midlane').is(':checked'),
      toplane: $('#toplane').is(':checked'),
      marksman: $('#marksman').is(':checked'),
      jungle: $('#jungle').is(':checked'),
      support: $('#support').is(':checked')
    },
    formOptions: {
      divisionBoost: {
        desiredTier: $('#desiredTier').val(),
        desiredDivision: $('#desiredDivision').val()
      },
      duoGames: {
        games: $('#gamesOnly').is(':checked'),
        wins: $('#winsOnly').is(':checked'),
        numberOfGames: $('#gamesRange').val()
      },
      placementGames: {
        previousTier: $('#previousSeason').val(),
        numberOfGames: $('#placementRange').val()
      },
      rankedWins: {
        numberOfWins: $('#winRange').val()
      }
    }
  }
}

// DOM
$('#boostMe').on('click', () => {
  submitOrder(buildOrder())
    .then(result => {
      console.log(result)
    })
    .catch(e => console.log(e))
})
$("#smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection) {
  if (stepNumber === 0 && stepDirection === 'forward') {
    if (jQuery.isEmptyObject(account) === false) {
      $('#noAccount').hide()
      $('#hasAccount').show()
    }
  }
  if (stepNumber === 2 && stepDirection === 'forward') {
    if (selectedOption !== undefined) {
      $('#nooverview').hide()
      $('#hasoverview').show()
    }
  }
})
$('#searchBtn').on('click', (e) => {
  e.preventDefault()
  $(".spin").show()
  $(".accountRender").hide()
  getAccount($('#searchUsername').val(), $('#searchServer').val())
    .then(data => {
      account = data
      boostOptions = {
        soloOptions: getSoloBoostOptions(),
        flexOptions: getFlexBoostOptions()
      }
      account = {
        info: account,
        boostOptions
      }
      renderProfile(account.info)
      renderBoostOptions()
      $(".spin").hide()
    })
    .catch(e => console.error(e))
})
$('.nextstep').on('click', (e) => {
  selectedOption = $(e.target).attr('id')
  renderOptions(selectedOption)
  setBoostOptions()
  $('#smartwizard').smartWizard('goToStep', 2)
})
$('#desiredTier').change(e => {
  if ($('#desiredTier').val() === 'Master') {
    $('#divLabel').hide()
    $('#desiredDivision').hide()
  } else {
    $('#divLabel').show()
    $('#desiredDivision').show()
    let cache
    if (selectedQueue === 'solo') {
      cache = account.info.solo.tier
    } else {
      cache = account.info.flex.tier
    }
    let desTier = $('#desiredTier').val()
    if (desTier.toUpperCase() === cache) {
      setBoostOptions()
    } else {
      $('#desiredDivision').html('')
      divisionOptions.forEach(d => {
        $('#desiredDivision').append(d)
      })
    }
  }
})
$('#gamesRange').on('click', () => {
  $('#gameCount').text(`  ${$('#gamesRange').val()}  `)
})
$('#placementRange').on('click', () => {
  $('#placementCount').text(`  ${$('#placementRange').val()}  `)
})
$('#winRange').on('click', () => {
  $('#winCount').text(`  ${$('#winRange').val()}  `)
})
$('#customChampions').on('click', () => {
  if ($('#customChampions').is(':checked')) {
    $('#championCard').show()
    customChampions = true
  } else {
    $('#championCard').hide()
    customChampions = false
  }
})
$(document).on('click', e => {
  renderPrice()
  if ($(e.target).hasClass('remove-champ')) {
    let cid = $(e.target).attr('cid')
    removeChamp(cid)
  }
})
$(document).ready(function () {
  $('#accountRender').hide()
  $('#smartwizard').smartWizard()
  getChampionNames()
    .then(champList => {
      // champSearch
      championArr = champList
      $('#champSearch').typeahead({
        source: championArr,
        displayText: function (item) { return item.name; },
        afterSelect: function (data) {
          $('#champSearch').val('')
          selectedChampions.push(data.key)
          renderChampions()
        }
      })
    })
    .catch(e => console.error(e))
})