const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  first_name: String,
  last_name: {type: String},
  email: String,
  gender: String,
  age: Number,
  POB: String
})

let Person = mongoose.model('Person', personSchema)

module.exports = { people: Person }
