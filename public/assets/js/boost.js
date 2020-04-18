// Variable initialization
let orderJson = []
let renderedAccount = []
let selectedAccount = []
let selectedRegion
let selectedChampIds = []
let championList
let slider = document.getElementById("winSlider")
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
  '<option value="IV">Divisin IV</option>',
  '<option value="III">Division III</option>',
  '<option value="II">Division II</option>',
  '<option value="I">Division I</option>'
]
let tierMap = ['i', 'b', 's', 'g', 'p', 'd']
let divMap = ['4', '3', '2', '1']

// Functions
async function submitOrder(orderObj) {
  let response = await new Promise((resolve, reject) => {
    axios.post(`./api/orders`, orderObj)
      .then((data) => {
        resolve(data)
      })
      .catch(e => reject(e))
  })

  return response
}
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}
function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
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
async function getChampionList() {
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
function lpWinsPrice(base, addon, wins, LP) {
  return ((wins * base) + ((LP / 100) * addon))
}
function removeFromChampList(id) {
  selectedChampIds.splice(selectedChampIds.indexOf(id), 1)
  renderSelectedChamps()
}
function getCurrentTierChar(tier, division) {
  switch (tier) {
    case 'DIAMOND':
      switch (division) {
        case 'IV':
          return 'd4'
          break
        case 'III':
          return 'd3'
          break
        case 'II':
          return 'd2'
          break
        case 'I':
          return 'd1'
          break
      }
      break
    case 'PLATINUM':
      switch (division) {
        case 'IV':
          return 'p4'
          break
        case 'III':
          return 'p3'
          break
        case 'II':
          return 'p2'
          break
        case 'I':
          return 'p1'
          break
      }
      break
    case 'GOLD':
      switch (division) {
        case 'IV':
          return 'g4'
          break
        case 'III':
          return 'g3'
          break
        case 'II':
          return 'g2'
          break
        case 'I':
          return 'g1'
          break
      }
      break
    case 'SILVER':
      switch (division) {
        case 'IV':
          return 's4'
          break
        case 'III':
          return 's3'
          break
        case 'II':
          return 's2'
          break
        case 'I':
          return 's1'
          break
      }
      break
    case 'BRONZE':
      switch (division) {
        case 'IV':
          return 'b4'
          break
        case 'III':
          return 'b3'
          break
        case 'II':
          return 'b2'
          break
        case 'I':
          return 'b1'
          break
      }
      break
    case 'IRON':
      switch (division) {
        case 'IV':
          return 'i4'
          break
        case 'III':
          return 'i3'
          break
        case 'II':
          return 'i2'
          break
        case 'I':
          return 'i1'
          break
      }
      break
    case 'MASTER':
      return 'none'
      break
    case 'GRANDMASTER':
      return 'none'
      break
    case 'CHALLENGER':
      return 'none'
      break
  }
}
function getDesiredTierChar(tier, division) {
  switch (tier) {
    case 'Diamond':
      switch (division) {
        case 'IV':
          return 'd4'
          break
        case 'III':
          return 'd3'
          break
        case 'II':
          return 'd2'
          break
        case 'I':
          return 'd1'
          break
      }
      break
    case 'Platinum':
      switch (division) {
        case 'IV':
          return 'p4'
          break
        case 'III':
          return 'p3'
          break
        case 'II':
          return 'p2'
          break
        case 'I':
          return 'p1'
          break
      }
      break
    case 'Gold':
      switch (division) {
        case 'IV':
          return 'g4'
          break
        case 'III':
          return 'g3'
          break
        case 'II':
          return 'g2'
          break
        case 'I':
          return 'g1'
          break
      }
      break
    case 'Silver':
      switch (division) {
        case 'IV':
          return 's4'
          break
        case 'III':
          return 's3'
          break
        case 'II':
          return 's2'
          break
        case 'I':
          return 's1'
          break
      }
      break
    case 'Bronze':
      switch (division) {
        case 'IV':
          return 'b4'
          break
        case 'III':
          return 'b3'
          break
        case 'II':
          return 'b2'
          break
        case 'I':
          return 'b1'
          break
      }
      break
    case 'Iron':
      switch (division) {
        case 'IV':
          return 'i4'
          break
        case 'III':
          return 'i3'
          break
        case 'II':
          return 'i2'
          break
        case 'I':
          return 'i1'
          break
      }
      break
  }
}
function range(size, startAt) {
  return [...Array(size).keys()].map(i => i + startAt);
}
function calculatePrice(data) {
  // by division, IV, III, II, I
  let ironWins = [1.9, 1.9, 1.9, 1.9]
  let bronzeWins = [1.9, 1.9, 1.9, 1.9]
  let silverWins = [1.9, 2.9, 2.9, 3.9]
  let goldWins = [3.9, 4.9, 4.9, 5.9]
  let platinumWins = [6.9, 6.9, 7.9, 9.9]
  let diamondWins = [12.9, 16.9, 21.9, 22.9]
  let price
  switch (data.formOptions.orderType) {
    case 1:
      // Win bosting
      switch (data.formOptions.winsQueue) {
        case 1:
          // Win boost solo/duo
          let soloLeague = findObjectByKey(data.selectedAccount.data, 'queueType', 'RANKED_SOLO_5x5')
          let soloDivision
          let soloTier = soloLeague.tier
          let soloLP = parseInt(soloLeague.leaguePoints)
          let solonumOfWins = parseInt(data.formOptions.numberOfWins)
          switch (soloLeague.rank) {
            case "IV":
              soloDivision = 0
              break
            case "III":
              soloDivision = 1
              break
            case "II":
              soloDivision = 2
              break
            case "I":
              soloDivision = 3
              break
          }
          switch (soloTier) {
            case 'CHALLENGER':
              price = lpWinsPrice(40, 8, solonumOfWins, soloLP)
              return price
              break
            case 'GRANDMASTER':
              price = lpWinsPrice(35, 6, solonumOfWins, soloLP)
              return price
              break
            case 'MASTER':
              price = lpWinsPrice(30, 4, solonumOfWins, soloLP)
              return price
              break
            case 'DIAMOND':
              price = diamondWins[soloDivision] * solonumOfWins
              return price
              break
            case 'PLATINUM':
              price = platinumWins[soloDivision] * solonumOfWins
              return price
              break
            case 'GOLD':
              price = goldWins[soloDivision] * solonumOfWins
              return price
              break
            case 'SILVER':
              price = silverWins[soloDivision] * solonumOfWins
              return price
              break
            case 'BRONZE':
              price = bronzeWins[soloDivision] * solonumOfWins
              return price
              break
            case 'IRON':
              price = ironWins[soloDivision] * solonumOfWins
              return price
              break
          }
          break
        case 2:
          // Win boost flex
          let flexLeague = findObjectByKey(data.selectedAccount.data, 'queueType', 'RANKED_FLEX_SR')
          let flexDivision
          let flexTier = flexLeague.tier
          let flexLP = parseInt(flexLeague.leaguePoints)
          let flexnumOfWins = parseInt(data.formOptions.numberOfWins)
          switch (flexLeague.rank) {
            case "IV":
              flexDivision = 0
              break
            case "III":
              flexDivision = 1
              break
            case "II":
              flexDivision = 2
              break
            case "I":
              flexDivision = 3
              break
          }
          switch (flexTier) {
            case 'CHALLENGER':
              price = lpWinsPrice(40, 8, flexnumOfWins, flexLP)
              return price
              break
            case 'GRANDMASTER':
              price = lpWinsPrice(35, 6, flexnumOfWins, flexLP)
              return price
              break
            case 'MASTER':
              price = lpWinsPrice(30, 4, flexnumOfWins, flexLP)
              return price
              break
            case 'DIAMOND':
              price = diamondWins[flexDivision] * flexnumOfWins
              return price
              break
            case 'PLATINUM':
              price = platinumWins[flexDivision] * flexnumOfWins
              return price
              break
            case 'GOLD':
              price = goldWins[flexDivision] * flexnumOfWins
              return price
              break
            case 'SILVER':
              price = silverWins[flexDivision] * flexnumOfWins
              return price
              break
            case 'BRONZE':
              price = bronzeWins[flexDivision] * flexnumOfWins
              return price
              break
            case 'IRON':
              price = ironWins[flexDivision] * flexnumOfWins
              return price
              break
          }
          break
      }
      break
    case 2:
      // League boostinhg
      let divisions = ['i4', 'i3', 'i2', 'i1', 'b4', 'b3', 'b2', 'b1', 's4', 's3', 's2', 's1', 'g4', 'g3', 'g2', 'g1', 'p4', 'p3', 'p2', 'p1', 'd4', 'd3', 'd2', 'd1']
      let divisionPrices = [10, 10, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 20, 20, 20, 20, 29, 29, 29, 29, 80, 80, 80, 80]
      let selectedLeague
      let currentTier
      let currentDivision

      if (data.formOptions.leagueQueue === 1) {
        selectedLeague = findObjectByKey(data.selectedAccount.data, 'queueType', 'RANKED_SOLO_5x5')
        currentTier = selectedLeague.tier
        currentDivision = selectedLeague.rank
      } else {
        selectedLeague = findObjectByKey(data.selectedAccount.data, 'queueType', 'RANKED_FLEX_SR')
        currentTier = selectedLeague.tier
        currentDivision = selectedLeague.rank
      }

      let currentTierChar = getCurrentTierChar(currentTier, currentDivision)
      let desiredTierChar = getDesiredTierChar(data.formOptions.desiredTier, data.formOptions.desiredDivision)

      let currentIndex = divisions.indexOf(currentTierChar)
      let desiredIndex = divisions.indexOf(desiredTierChar)
      if (currentIndex === desiredIndex) {
        $('#formError').show()
        return 0
      } else {
        let jumpCount = desiredIndex - currentIndex
        if (Math.sign(jumpCount) === -1) {
          $('#formError').show()
          return 0
        } else {
          let purchaseArray = range(jumpCount, currentIndex + 1)
          let totalPrice = 0
          purchaseArray.forEach(index => {
            totalPrice = totalPrice + divisionPrices[index]
          })
          return totalPrice
        }
      }
      break
  }
}
function getFormOptions() {
  let customChampions
  let toplane = 0
  let midlane = 0
  let marksman = 0
  let jungle = 0
  let support = 0

  // Get order type
  let orderType
  if ($($('#winsBoost').parent()).hasClass('active')) {
    orderType = 1
  } else {
    orderType = 2
  }

  // Get win boost queue
  let winsQueue
  if ($($('#soloWins').parent()).hasClass('active')) {
    winsQueue = 1
  } else {
    winsQueue = 2
  }

  // Get league boost queue
  let leagueQueue
  if ($($('#soloLeague').parent()).hasClass('active')) {
    leagueQueue = 1
  } else {
    leagueQueue = 2
  }
  if ($('#customChampions').is(':checked')) {
    customChampions = selectedChampIds
    if ($('#toplane').is(':checked')){
      toplane = 1
    }
    if ($('#midlane').is(':checked')){
      midlane = 1
    }
    if ($('#marksman').is(':checked')){
      marksman = 1
    }
    if ($('#jungle').is(':checked')){
      jungle = 1
    }
    if ($('#support').is(':checked')){
      jungle = 1
    }
  } else {
    customChampions = 'None'
  }
  let numberOfWins = parseInt($('#winSlider').val())
  let optionsObj = {
    orderType,
    winsQueue,
    numberOfWins,
    leagueQueue,
    desiredTier: $('#desiredTier').val(),
    desiredDivision: $('#desiredDivision').val(),
    customChampions,
    roles: {
      toplane,
      midlane,
      marksman,
      jungle,
      support
    }
  }
  return optionsObj
}
function renderProfile(info) {
  orderJson = []
  renderedAccount = info
  let accountObj = {
    info
  }
  $('#tiers').html('')
  $('#profileIcon').attr('src', `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/${info.summoner.profileIconId}.png`)
  $('#accName').text(info.summoner.name)
  $('#accLevel').text(`Level: ${info.summoner.summonerLevel}`)
  info.data.forEach(league => {
    let leagueType
    if (league.queueType === "RANKED_FLEX_SR") {
      leagueType = "Ranked Flex"
    }
    if (league.queueType === "RANKED_SOLO_5x5") {
      leagueType = "Solo/Duo"
    }
    let rowElem = `
    <tr>
      <td>${leagueType}</td>
      <td>${league.tier}</td>
      <td>${league.rank}</td>
      <td>${league.leaguePoints}</td>
    </tr>
    `
    $('#tiers').append(rowElem)
  })
}
function showOrder(oObj) {
  orderData = oObj.data
  $('#orderSentModal').text(`Order Sent - (#${orderData.orderNumber})`)
  switch (orderData.orderType) {
    case 1:
      // wins boost
      $('#orderMsg').text('Your wins boost order was successfully placed. You should recieve email contact shortly.')
      $('#selectChampionsModal').modal('hide')
      $('#orderSentModal').modal('show')
      break
    case 2:
      // league boost
      $('#orderMsg').text('Your league boost order was successfully placed. You should recieve email contact shortly.')
      $('#selectChampionsModal').modal('hide')
      $('#orderSentModal').modal('show')
      break
  }
}
function removeInvalidFormOptions() {
  let tierCache = []
  let divCache = []
  let leagueQueue
  if ($($('#soloLeague').parent()).hasClass('active')) {
    leagueQueue = 1
  } else {
    leagueQueue = 2
  }
  let tc
  switch (leagueQueue) {
    case 1:
      // Use solo league division/rank
      let soloCache = findObjectByKey(selectedAccount.data, 'queueType', 'RANKED_SOLO_5x5')
      let soloTc = getCurrentTierChar(soloCache.tier, soloCache.rank)
      if (soloTc === 'none') {
        console.log('disable division boost')
        $('#leagueBoost').prop('disabled', true)
      } else {
        $('#leagueBoost').prop('disabled', false)
        let soloTierChar = soloTc.substring(0, 1)
        let soloRankChar = soloTc.substring(1)
        let soloTierIndex = tierMap.indexOf(soloTierChar)
        let soloRankIndex = divMap.indexOf(soloRankChar)
        if (soloRankIndex === 3) {
          // rank is 1
          tierCache = tierOptions.slice(soloTierIndex + 1)
          divCache = divisionOptions
        } else {
          tierCache = tierOptions.slice(soloTierIndex)
          divCache = divisionOptions.slice(soloRankIndex + 1)
        }
        populateFormOptions(tierCache, divCache)
      }
      break
    case 2:
      // use flex league division/rank
      let flexCache = findObjectByKey(selectedAccount.data, 'queueType', 'RANKED_FLEX_SR')
      let flexTc = getCurrentTierChar(flexCache.tier, flexCache.rank)
      if (flexTc === 'none') {
        console.log('disable division boost')
        $('#leagueBoost').prop('disabled', true)
      } else {
        $('#leagueBoost').prop('disabled', false)
        let flexTierChar = flexTc.substring(0, 1)
        let flexRankChar = flexTc.substring(1)
        let flexTierIndex = tierMap.indexOf(flexTierChar)
        let flexRankIndex = divMap.indexOf(flexRankChar)
        if (flexRankIndex === 3) {
          // rank is 1
          tierCache = tierOptions.slice(flexTierIndex + 1)
          divCache = divisionOptions
        } else {
          tierCache = tierOptions.slice(flexTierIndex)
          divCache = divisionOptions.slice(flexRankIndex + 1)
        }
        populateFormOptions(tierCache, divCache)
      }
      break
  }
}
function populateFormOptions(tiers, divisions) {
  $('#desiredDivision').html('')
  $('#desiredTier').html('')
  tiers.forEach(t => {
    $('#desiredTier').append(t)
  })
  divisions.forEach(d => {
    $('#desiredDivision').append(d)
  })
}
function substringMatcher(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex
    matches = []
    substrRegex = new RegExp(q, 'i')
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str)
      }
    })

    cb(matches);
  }
}
function renderSelectedChamps() {
  $('#championStream').html('')
  selectedChampIds.forEach(id => {
    let cObj = findObjectByKey(championList, 'key', id)
    let tags = ''
    cObj.tags.forEach(tag => {
      tags = tags.concat(`${tag}, `)
    })
    let champElement = `
  <div className="col-12">
    <div class="alert alert-dismissible alert-light">
      <button type="button" class="close" cid="${cObj.key}" data-dismiss="alert">&times;</button>
      <img src="http://ddragon.leagueoflegends.com/cdn/5.9.1/img/champion/${cObj.image.full}" className="img-thumbnail thumb"/>
      <strong>${cObj.name}</strong><br/>
      ${tags}
    </div>
  </div>
  `
    $('#championStream').append(champElement)
  })
}
function selectChamp(key) {
  selectedChampIds.push(key)
  renderSelectedChamps()
}

// Click events
$('#search').on('click', (e) => {
  e.preventDefault()
  $("#accountInfo").hide()
  $(".spin").show()
  let name = $('#lolUsername').val()
  let region = $('#lolRegion').val()
  selectedRegion = region
  getAccount(name, region)
    .then((data) => {
      renderProfile(data)
      $(".spin").hide()
      $("#accountInfo").show()
    })
    .catch(e => console.error(e))

})
$('#winsBoost').on('click', () => {
  $('#league').hide()
  $('#wins').show()
})
$('#leagueBoost').on('click', () => {
  $('#wins').hide()
  $('#league').show()
})
$('#winSlider').change(() => {

})
$('#orderBoost').on('click', () => {
  let orderFormOptions = getFormOptions()
  if (selectedAccount.length < 1) {
    $('#notSelectedToast').toast('show')
  } else {
    myJson = {
      selectedRegion,
      selectedAccount,
      formOptions: orderFormOptions
    }
    calculatedPrice = Math.round(calculatePrice(myJson))
    if (calculatedPrice < 1) {
      // show error
    } else {
      submitOrder(myJson)
        .then(result => {
          showOrder(result)
        })
        .catch(e => console.error(e))
    }
  }
})
slider.oninput = function () {
  $('#winCount').text(`${this.value}`)
}
$(document).on('click', (e) => {
  $('#formError').hide()
  let formOptions = getFormOptions()
  if (selectedAccount.length < 1) {
    $('#notSelectedToast').toast('show')
  } else {
    orderJson = {
      selectedAccount,
      formOptions
    }
    calculatedPrice = Math.round(calculatePrice(orderJson))
    $('#priceCalculation').text(`€${calculatedPrice}`)
  }
  if ($(e.target).hasClass('close')) {
    removeFromChampList($(e.target).attr('cid'))
  }
})
$('#selectAccount').on('click', () => {
  selectedAccount = renderedAccount

  $('#alerts').html(`              <div class="alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Account selected successfully!</strong>
              </div>`)
  removeInvalidFormOptions()
})
$(document).ready(() => {
  $("#toplane").bootstrapSwitch()
  $("#midlane").bootstrapSwitch()
  $("#marksman").bootstrapSwitch()
  $("#jungle").bootstrapSwitch()
  $("#support").bootstrapSwitch()
  populateFormOptions(tierOptions, divisionOptions)
  $('#league').hide()
  $('#formError').hide()
  $('#cChamps').hide()
  getChampionList()
    .then(cl => {
      championList = cl
    })
    .catch(e => console.error(e))
  getChampionNames()
    .then(champList => {
      // champSearch
      $('#champSearch').typeahead({
        source: champList,
        displayText: function (item) { return item.name; },
        afterSelect: function (data) {
          $('#champSearch').val('')
          selectChamp(data.key)
          console.log(data)
        }
      })
    })
    .catch(e => console.error(e))
})
$('#champSearch').on('typeahead:selected', function (evt, item) {
  selectChamp(item)
  $('#champSearch').val('')
})
$('#sccSubmit').on('click', () => {
  let oFO = getFormOptions()
  myJson = {
    selectedRegion,
    selectedAccount,
    formOptions: oFO
  }
  calculatedPrice = Math.round(calculatePrice(myJson))
  if (calculatedPrice < 1) {
    // show error

  } else {
    submitOrder(myJson)
      .then(result => {
        showOrder(result)
      })
      .catch(e => console.error(e))
  }
})
$('#soloLeague').on('click', () => {
  removeInvalidFormOptions()
})
$('#flexLeague').on('click', () => {
  removeInvalidFormOptions()
})
$('#customChampions').on('click', () => {
  if ($('#customChampions').is(':checked')) {
    $('#cChamps').show()
  } else {
    $('#cChamps').hide()
  }
})
$('#desiredTier').on('click', (req, res) => {
  if ($('#desiredTier').val('Master')) {
    $('#desiredDivision').hide()
    $('#divLabel').hide()
  } else {
    $('#desiredDivision').show()
    $('#divLabel').show()
  }
})