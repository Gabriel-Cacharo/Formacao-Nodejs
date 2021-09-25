const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const connection = require('./database/index')
const Games = require('./database/models/Games')
const Users = require('./database/models/Users')

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

const jwtSecret = 'dsa9d89as9dasmdsadjm122'

function auth(req, res, next) {
  const authToken = req.headers['authorization']

  if (authToken != undefined) {
    const bearer = authToken.split(' ')
    var token = bearer[1]

    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401).json({ err: 'Token inválido!' })
      } else {
        req.token = token
        req.loggedUser = { id: data.id, email: data.email }

        next()
      }
    })
  } else {
    res.status(401).json({ err: 'Token inválido!' })
  }
}

// Games
app.get('/games', auth, async (req, res) => {
  var HATEOAS = [
    {
      href: 'http://localhost:3000/games',
      method: 'POST',
      rel: 'create_game',
    },
    {
      href: 'http://localhost:3000/game/:id',
      method: 'DELETE',
      rel: 'delete_game',
    },
    {
      href: 'http://localhost:3000/game/:id',
      method: 'PUT',
      rel: 'modify_game',
    },
  ]

  await Games.findAll().then((games) => {
    res.status(200).json({ games, _links: HATEOAS })
  })
})

app.get('/game/:id', auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send('Você deve fornecer um número!')
  } else {
    var id = parseInt(req.params.id)

    var HATEOAS = [
      {
        href: `http://localhost:3000/games`,
        method: 'POST',
        rel: 'create_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'GET',
        rel: 'get_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'DELETE',
        rel: 'delete_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'PUT',
        rel: 'modify_game',
      },
    ]

    Games.findByPk(id).then((game) => {
      if (game != undefined) {
        res.status(200).json({ game, _links: HATEOAS })
      } else {
        res.status(404).send('Jogo não encontrado!')
      }
    })
  }
})

app.post('/games', auth, async (req, res) => {
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

app.delete('/game/:id', auth, (req, res) => {
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

app.put('/game/:id', auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send()
  } else {
    var id = req.params.id
    var { title, price } = req.body

    var HATEOAS = [
      {
        href: `http://localhost:3000/games`,
        method: 'POST',
        rel: 'create_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'GET',
        rel: 'get_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'DELETE',
        rel: 'delete_game',
      },
      {
        href: `http://localhost:3000/game/${id}`,
        method: 'PUT',
        rel: 'modify_game',
      },
    ]

    Games.update(
      { title, price },
      {
        where: {
          id,
        },
      }
    )

    res.status(200).json({ _links: HATEOAS })
  }
})

// Users
app.post('/users', auth, (req, res) => {
  var { name, email, password } = req.body

  Users.create({ name, email, password }).then((resp) => {
    res.status(201).send()
  })
})

// Login
app.post('/auth', async (req, res) => {
  var { email, password } = req.body

  if (email != undefined) {
    var user = await Users.findOne({ where: { email } })

    if (user != undefined) {
      if (user.password == password) {
        jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '48h' }, (err, token) => {
          if (err) {
            res.status(400).json({ err: 'Falha interna' })
          } else {
            res.status(200).json({ token: token })
          }
        })
      } else {
        res.status(401).json({ err: 'Credenciais inválidas!' })
      }
    } else {
      res.status(404).json({ err: 'O email enviado não existe!' })
    }
  } else {
    res.status(400).json({ err: 'O email é inválido!' })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando')
})
