const fs = require('fs')
const db = require('../models')

class apiController {
  static createPerson (req, res) {
    let newPerson = new db.people(req.body)
    newPerson.save((error) => {
      if (error) {
        res.status(422).send({error})
      } else {
        res.send({message: 'Successfully created a person!'})
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
  static getPerson (req, res) {
    let { _id } = req.params
    if (typeof _id === 'string') {
      db.people.findOne({_id})
      .exec((error, person) => {
        if (person) {
          res.send(person)
        } else {
          res.status(404).send({error})
        }
      })
    } else {
      res.status(422).send({error: 'incorrect data type'})
    }
  }
}

module.exports = apiController
