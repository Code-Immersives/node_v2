const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: [true, 'email already exists']},
  gender: {type: String, required: true},
  age: {type: Number, required: true, min: [18, 'you are too young brah']},
  POB: {type: String, required: true}
})

let Person = mongoose.model('person', personSchema)

module.exports = { people: Person }
