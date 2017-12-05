const fs = require('fs')
const db = require('../models')
<<<<<<< HEAD
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

class apiController {
  static createPerson (req, res) {
    console.log('create person', req.body)

    let passReturn = passport.use(new LocalStrategy(
      function (email, password, done) {
        var newUser = new db.people()

            // set the user's local credentials
        newUser.local.email = req.body.email
        newUser.local.password = newUser.generateHash(password)
        console.log('new user', newUser)
            // save the user
        newUser.save(function (err) {
          if (err) {
            throw err
          }
          return done(null, newUser)
        })
      }
    ))
    res.send(passReturn)
    //
    //
    // newPerson.save((error) => {
    //   if (error) {
    //     res.status(422).send({error})
    //   } else {
    //     res.send({message: 'Successfully created a person!'})
    //   }
    // })
=======
// this is using the keyword static
// apiController.getHome

// not using the keyword static
// let myObj = new apiController()
// myObj.getHome

class apiController {
  static getHome (req, res) {
    res.send('<h1> YOU HIT THE ROOT PAGE </h1>')
  }
  static postHome (req, res) {
    fs.writeFileSync('test.json', JSON.stringify(req.body), 'utf8')
    res.send('data sent')
  }
  static getAbout (req, res) {
    res.send('<h1>here is some data about my site</h1>')
  }
  static aboutJSON (req, res) {
    res.send({message: 'here is some data about my site'})
>>>>>>> parent of d8d6a05... mongodb setup finished with CR done
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
<<<<<<< HEAD
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
=======

>>>>>>> parent of d8d6a05... mongodb setup finished with CR done
}

// const apiControllerOBJ = {
//   getHome: (request, response) => {
//     response.send('<h1> YOU HIT THE ROOT PAGE </h1>')
//   }
// }

module.exports = apiController
