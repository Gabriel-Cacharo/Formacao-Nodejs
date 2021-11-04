const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pudim991',
    database: 'banco_knex',
  },
})

module.exports = knex
