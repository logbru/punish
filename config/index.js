const Sequelize = require('sequelize')

module.exports = new Sequelize(process.env.DATABASE_URL || process.env.LOCAL_URI)
