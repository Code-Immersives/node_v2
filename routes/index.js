const express = require('express')
const apiRouter = express.Router()
// controller actions
const { getHome, getAbout, postHome, aboutJSON, getPerson, getPeople} = require('../controllers')

// root route
apiRouter.route('/')
  .get(getHome)
  .post(postHome)

// apiRouter.get('/', getHome)
//
// apiRouter.post('/', postHome)

apiRouter.get('/about', getAbout)

apiRouter.get('/about.json', aboutJSON)
apiRouter.get('/people', getPeople)
apiRouter.get('/people/:id', getPerson)

module.exports = apiRouter

// Create the index.js for the controllers folder and move all the callback functions from the routes file to the controllers,
// then export the controller object.
