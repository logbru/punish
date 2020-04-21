const { Model, STRING, INTEGER, BOOLEAN } = require('sequelize')

class WinsOrder extends Model { }

WinsOrder.init({
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
  numberOfGames: INTEGER
}, { sequelize: require('../config'), modelName: 'winsorder' })

module.exports = WinsOrder
