const fs = require('fs')
const db = require('../models')
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

}

// const apiControllerOBJ = {
//   getHome: (request, response) => {
//     response.send('<h1> YOU HIT THE ROOT PAGE </h1>')
//   }
// }

module.exports = apiController
