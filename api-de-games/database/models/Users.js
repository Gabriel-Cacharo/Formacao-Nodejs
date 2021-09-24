const { Sequelize, DataTypes } = require('sequelize')
const connection = require('../index')

const Users = connection.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Users.sync()
console.log('\x1b[36m[TABELA]\x1b[0m Tabela \x1b[36mUsers\x1b[0m carregada com sucesso.')

module.exports = Users
