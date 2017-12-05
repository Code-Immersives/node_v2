const express = require('express')
// const passport = require('passport')
const apiRouter = express.Router()
<<<<<<< HEAD

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
=======
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
>>>>>>> parent of d8d6a05... mongodb setup finished with CR done

module.exports = apiRouter

// Create the index.js for the controllers folder and move all the callback functions from the routes file to the controllers,
// then export the controller object.
