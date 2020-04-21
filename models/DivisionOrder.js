const { Model, STRING, INTEGER, BOOLEAN } = require('sequelize')

class DivisionOrder extends Model { }

DivisionOrder.init({
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
  desiredTier: STRING,
  desiredDivision: STRING
}, { sequelize: require('../config'), modelName: 'divisionorder' })

module.exports = DivisionOrder
