const Account = require('./Account.js')
const Order = require('./Order.js')

Order.belongsTo(Account)
module.exports = { Account, Order }
