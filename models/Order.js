const { Model, STRING, INTEGER } = require('sequelize')

class Order extends Model { }

Order.init({
  orderNumber: STRING,
  orderType: INTEGER,
  winsQueue: INTEGER,
  numberOfWins: INTEGER,
  leagueQueue: INTEGER,
  desiredTier: STRING,
  desiredDivision: STRING,
  customChampions: STRING
}, { sequelize: require('../config'), modelName: 'order' })

module.exports = Order
