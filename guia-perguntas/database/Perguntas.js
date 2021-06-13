const Sequelize = require('sequelize')
const connection = require('./database')

const Perguntas = connection.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Perguntas.sync({ force: false }).then(() => {
  console.log('\x1b[32m[MYSQL] \x1b[0mTabela \x1b[35mPerguntas \x1b[0mcriada com sucesso.')
})

module.exports = Perguntas