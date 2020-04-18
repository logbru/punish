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
  customChampions: STRING,
  clientIp: STRING,
  midLane: INTEGER,
  topLane: INTEGER,
  marksman: INTEGER,
  jungle: INTEGER,
  support: INTEGER
}, { sequelize: require('../config'), modelName: 'order' })

module.exports = Order
