const fs = require('fs')
const db = require('../models')
const jwt = require('jsonwebtoken')

class apiController {
  static createPerson (req, res) {
    let newPerson = new db.people(req.body)
    newPerson.encryptPW(req.body.password)
    newPerson.save((error) => {
      if (error) {
        res.status(422).send({error})
      } else {
        res.send({message: 'created a person'})
      }
    })
  }
  static loginPerson (req, res) {
    const {email, password} = req.body

    db.people.findOne({email})
      .exec((error, person) => {
        if (person) {
          if (person.validPassword(password)) {
            let {email} = person
            let jwt = generateToken({email})
            res.send({message: 'you successfully logged in!', jwt})
          } else {
            res.send({message: 'wrong password'})
          }
        } else {
          res.status(404).send({message: 'no user found with that email'})
        }
      })
  }
  static getPeople (req, res) {
    db.people.find()
      .exec((error, people) => {
        if (error) {
          res.status(422).send({error})
        } else {
          res.send(people)
        }
      })
  }
  static getProfile (req, res) {
    let {email} = req.decodedToken
    db.people.findOne({email})
      .exec((error, user) => {
        if (user) {
          res.send(user)
        } else {
          res.status(422).send({message: 'user not found'})
        }
      })
  }
  static updatePerson (req, res) {
    let _id = req.params._id
    let updatedPerson = req.body

    if (typeof (_id) === 'string' && Object.keys(updatedPerson).length > 0) {
      db.people.findOneAndUpdate({ _id }, updatedPerson, {new: true})
        .exec((error, person) => {
          if (error) {
            res.status(422).send({error})
          } else {
            res.send(person)
          }
        })
    } else {
      res.status(422).send({message: 'Error with data sent'})
    }
  }
  static deletePerson (req, res) {
    let {_id} = req.params
    db.people.findOneAndRemove({_id})
      .exec((error) => {
        if (error) {
          res.status(422).send({error})
        } else {
          res.send({message: `Removed person with id: ${_id} from database`})
        }
      })
  }
}

function generateToken (user) {
  return jwt.sign(user, 'DRAGONS', {
    expiresIn: 10080
  })
}

module.exports = apiController
