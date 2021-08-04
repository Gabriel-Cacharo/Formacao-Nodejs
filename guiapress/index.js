const express = require('express')
const app = express()
const session = require('express-session')

const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./users/UsersController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require ('./users/User')

// View Engine
app.set('view engine', 'ejs')

// Sessões
app.use(session({
  secret: 'baebibobu9193',
  cookie: {
    maxAge: 300000000
    // 60s = 60 000
  }
}))

// Static
app.use(express.static('public'))

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Database
connection.authenticate().then(() => {
  console.log('\x1b[35m[DATABASE]\x1b[0m Banco conectado com sucesso.')
}).catch((error) => {
  console.log(error)
})

// Routes
app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', usersController)

app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles, categories })
    })
  })
})

app.get('/:slug', (req, res) => {
  var slug = req.params.slug

  Article.findOne({
    where: {
      slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render('article', { article, categories })
      })
    } else {
      res.redirect('/') 
    }
  }).catch(err => {
    res.redirect('/')
  })
})

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug

  Category.findOne({
    where: {
      slug
    },
    include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {
      Category.findAll().then(categories => {
        res.render('index', { articles: category.articles, categories })
      })
    } else {
      res.redirect('/')
    }
  }).catch(err => {
    res.redirect('/')
  })
})

app.listen('8080', () => {
  console.log('\x1b[34m[BACKEND]\x1b[0m Servidor iniciado com sucesso.')
})