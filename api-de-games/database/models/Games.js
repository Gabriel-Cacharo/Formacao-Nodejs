const { Sequelize, DataTypes } = require('sequelize')
const connection = require('../index')

const Games = connection.define('games', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

Games.sync()
console.log('\x1b[36m[TABELA]\x1b[0m Tabela \x1b[36mGames\x1b[0m carregada com sucesso.')

module.exports = Games
