const express = require('express')
const apiRouter = express.Router()
const jwt = require('jsonwebtoken')

// controller actions
const {
  createPerson,
  getProfile,
  getPeople,
  updatePerson,
  deletePerson,
  loginPerson
} = require('../controllers')

apiRouter.route('/signup')
  .post(createPerson)
apiRouter.route('/login')
  .post(loginPerson)
apiRouter.route('/profile')
  .get(checkToken, getProfile)
apiRouter.route('/people')
  .get(getPeople)
apiRouter.route('/people/:_id')
  .put(updatePerson)
  .delete(deletePerson)

module.exports = apiRouter

function checkToken (req, res, next) {
  let token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, 'DRAGONS', function (err, decoded) {
      if (err) {
        res.status(401).send({message: 'invalid token'})
      } else {
        req.decodedToken = decoded
        next()
      }
    })
  } else {
    res.status(401).send({message: 'no token provided'})
  }
}
