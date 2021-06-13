const express = require('express')
const app = express()
const connection = require('./database/database')
const Perguntas = require('./database/Perguntas')
const Respostas = require('./database/Respostas')

// Database
connection.authenticate().then(() => {
  console.log('\x1b[32m[MYSQL] \x1b[0mConexão feita com o banco de dados!')
}).catch(err => {
  console.log('\x1b[31m[MYSQL] \x1b[0m', err)
})

// Usar EJS como View Engine
app.set('view engine', 'ejs')
// Arquivos estáticos
app.use(express.static('public'))
// BodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rotas
app.get('/', (req, res) => {
  Perguntas.findAll({
    raw: true, order: [
      ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
    ]
  }).then(perguntas => {
    res.render('index', {
      perguntas
    })
  })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
  var titulo = req.body.titulo
  var descricao = req.body.descricao

  Perguntas.create({
    titulo,
    descricao
  }).then(() => {
    res.redirect('/')
  })
})

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id

  Perguntas.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      Respostas.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta,
          respostas
        })
      })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/responder', (req, res) => {
  var corpo = req.body.corpo
  var perguntaId = req.body.pergunta

  Respostas.create({
    corpo,
    perguntaId
  }).then(() => {
    res.redirect('/pergunta/' + perguntaId)
  })
})

app.listen(3005, () => {
  console.log('\x1b[34m[SERVIDOR] \x1b[0mAplicação rodando com sucesso!')
})