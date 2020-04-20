const Account = require('./Account.js')
const DivisionOrder = require('./DivisionOrder.js')
const DuoOrder = require('./DuoOrder.js')
const PlacementOrder = require('./PlacementOrder.js')
const WinsOrder = require('./WinsOrder.js')

DivisionOrder.belongsTo(Account)
DuoOrder.belongsTo(Account)
PlacementOrder.belongsTo(Account)
WinsOrder.belongsTo(Account)
module.exports = { Account, DivisionOrder, DuoOrder, PlacementOrder, WinsOrder }
