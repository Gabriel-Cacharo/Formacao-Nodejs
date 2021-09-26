const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const app = express()

// https://www.npmjs.com/package/validator

app.set('view engine', 'ejs')

app.use(cookieParser('hjadmasxnsak'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: 'wordSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)
app.use(flash())

app.get('/', (req, res) => {
  var emailError = req.flash('emailError')
  var nameError = req.flash('nameError')
  var ageError = req.flash('ageError')

  var email = req.flash('email')

  emailError = emailError == undefined || emailError.length == 0 ? undefined : emailError
  email = email == undefined || email.length == 0 ? '' : email

  res.render('index', { emailError, nameError, ageError, email })
})

app.post('/form', (req, res) => {
  var { email, name, age } = req.body

  var emailError
  var nameError
  var ageError

  if (email == undefined || email == '') {
    // Error
    emailError = 'O email não pode ser vazio'
  }

  if (age == undefined || age < '18') {
    // Error
    ageError = 'A idade não pode ser vazia e/ou você não pode ter menos de 18 anos'
  }

  if (name == undefined || name == '' || name.length <= 3) {
    // Error
    nameError = 'O name não pode ser vazio ou menor que 3'
  }

  if (emailError != undefined || nameError != undefined || ageError != undefined) {
    req.flash('emailError', emailError)
    req.flash('nameError', nameError)
    req.flash('ageError', ageError)

    req.flash('email', email)

    res.redirect('/')
  } else {
    res.send('Show de bola! Passou.')
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando!')
})
