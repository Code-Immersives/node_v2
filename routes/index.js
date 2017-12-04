const express = require('express')
const apiRouter = express.Router()
// controller actions
const { createPerson, getPerson, getPeople} = require('../controllers')

apiRouter.route('/people')
  .get(getPeople)
  .post(createPerson)
apiRouter.get('/people/:_id', getPerson)

module.exports = apiRouter
