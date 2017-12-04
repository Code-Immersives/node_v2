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
  static updatePerson (req, res) {
    let _id = req.params._id
    let updatedPerson = req.body

    if (typeof(_id) === 'string' && Object.keys(updatedPerson).length > 0) {
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
