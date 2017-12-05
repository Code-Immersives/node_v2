const express = require('express')
const apiRouter = express.Router()

// controller actions
const { createPerson, getPerson, getPeople, updatePerson, deletePerson} = require('../controllers')
apiRouter.route('/people')
  .get(getPeople)
  .post(createPerson)
apiRouter.route('/people/:_id')
  .get(getPerson)
  .put(updatePerson)
  .delete(deletePerson)

module.exports = apiRouter
