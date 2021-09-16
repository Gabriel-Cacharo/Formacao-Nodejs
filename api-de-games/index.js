const express = require('express')
const app = express()
const cors = require('cors')

const connection = require('./database/index')
const Games = require('./database/models/Games')

connection
  .authenticate()
  .then(() => {
    console.log('\x1b[35m[DATABASE]\x1b[0m Banco conectado com sucesso.')
  })
  .catch((error) => {
    console.log(error)
  })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/games', async (req, res) => {
  await Games.findAll().then((games) => {
    res.status(200).json(games)
  })
})

app.get('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send('Você deve fornecer um número!')
  } else {
    var id = parseInt(req.params.id)

    Games.findByPk(id).then((game) => {
      if (game != undefined) {
        res.status(200).json(game)
      } else {
        res.status(404).send('Jogo não encontrado!')
      }
    })
  }
})

app.post('/games', async (req, res) => {
  var { title, price } = req.body

  if (title && price != undefined) {
    await Games.create({
      title,
      price,
    })
    res.status(201).send()
  } else {
    res.status(400).send('Você deve fornecer o title e o price do produto!')
  }
})

app.delete('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send()
  } else {
    var id = parseInt(req.params.id)

    Games.destroy({
      where: {
        id,
      },
    })

    res.status(200).send()
  }
})

app.put('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send()
  } else {
    var id = req.params.id
    var { title, price } = req.body

    Games.update(
      { title, price },
      {
        where: {
          id,
        },
      }
    )

    res.status(200).send()
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando')
})
