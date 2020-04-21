const { Model, STRING, INTEGER, BOOLEAN } = require('sequelize')

class DuoOrder extends Model { }

DuoOrder.init({
  orderNumber: STRING,
  orderStatus: {
    type: INTEGER,
    defaultValue: 0
  },
  price: INTEGER,
  discord: STRING,
  discount: STRING,
  comments: STRING,
  orderType: STRING,
  queue: STRING,
  useCustomChampions: STRING,
  customChampions: STRING,
  midlane: STRING,
  toplane: STRING,
  marksman: STRING,
  jungle: STRING,
  support: STRING,
  games: STRING,
  wins: STRING,
  numberOfGames: INTEGER
}, { sequelize: require('../config'), modelName: 'duoorder' })

module.exports = DuoOrder
