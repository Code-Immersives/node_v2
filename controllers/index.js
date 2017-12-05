const fs = require('fs')
const db = require('../models')

class apiController {
  static createPerson (req, res) {
    let newPerson = new db.people(req.body)
    newPerson.save((error) => {
      if (error) {
        res.status(422).send({error})
      } else {
        res.send({message: 'created a person'})
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
    // should come from mongoDB
    const people = { '1': {id: 1, 'name': 'Kevin', occupation: 'NBA Superstar', age: "I don't age"}}
    // localhost:3000 / people / 1
    // error checking for data type
    if (typeof req.params.id === 'string') {
      let person = people[req.params.id]
      if (person) {
        res.send(person)
      } else {
        res.status(404).send({error: 'person not found'})
      }
    } else {
      res.status(422).send({error: 'incorrect data type'})
    }
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

module.exports = apiController
