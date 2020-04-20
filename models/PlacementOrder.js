const { Model, STRING, INTEGER, BOOLEAN } = require('sequelize')

class PlacementOrder extends Model { }

PlacementOrder.init({
  orderNumber: STRING,
  price: INTEGER,
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
}, { sequelize: require('../config'), modelName: 'placementorder' })

module.exports = PlacementOrder
