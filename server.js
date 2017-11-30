const express = require('express')
const App = express()
// const App = require('express')()
const logger = require('morgan')
const infoDisplayType = logger('dev')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const apiRoutes = require('./routes')
const mongoose = require('mongoose')

// communicate with mongodb using mongoose connect
mongoose.connect('mongodb://localhost/fb_people', { useMongoClient: true })
// calls all middleware functions
App.use(infoDisplayType)
App.use(jsonParser)
// apply routes
App.use('/', apiRoutes)

App.listen(3000, function (error) {
  if (error) {
    console.log('Problem starting server', error)
  } else {
    console.log('Successfully connected to server on port 3000')
  }
})
