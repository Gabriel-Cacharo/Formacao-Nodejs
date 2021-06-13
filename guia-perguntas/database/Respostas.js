const Sequelize = require('sequelize')
const connection = require('./database')

const Respostas = connection.define('respostas', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Respostas.sync({ force: false }).then(() => {
  console.log('\x1b[32m[MYSQL] \x1b[0mTabela \x1b[35mRespostas \x1b[0mcriada com sucesso.')
})

module.exports = Respostas