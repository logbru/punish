const { Model, STRING, INTEGER } = require('sequelize')

class Account extends Model { }

Account.init({
  summonerId: STRING,
  accountId: STRING,
  puuid: STRING,
  name: STRING,
  region: STRING,
  profileIconId: INTEGER,
  summonerLevel: INTEGER,
  flexTier: STRING,
  flexRank: STRING,
  soloTier: STRING,
  soloRank: STRING
}, { sequelize: require('../config'), modelName: 'account' })

module.exports = Account
