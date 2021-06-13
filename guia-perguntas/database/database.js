const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'pudim991', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = connection