const express = require('express')
const App = express()
// const App = require('express')()
const logger = require('morgan')
const infoDisplayType = logger('dev')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

// communicate with mongodb using mongoose connect
mongoose.connect('mongodb://localhost/fb_people', { useMongoClient: true })
// calls all middleware functions
App.use(infoDisplayType)
App.use(jsonParser)
// required for passport
App.use(session({ secret: 'ilovescotchscotchyscotchscotch' })) // session secret
App.use(passport.initialize())
App.use(passport.session()) // persistent login sessions

const apiRoutes = require('./routes')
// apply routes
App.use('/', apiRoutes)

App.listen(3000, function (error) {
  if (error) {
    console.log('Problem starting server', error)
  } else {
    console.log('Successfully connected to server on port 3000')
  }
})
