const express = require('express')
// const passport = require('passport')
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

  // route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next()
  }

    // if they aren't redirect them to the home page
  res.redirect('/people')
}

module.exports = apiRouter
