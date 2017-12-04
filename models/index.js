const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const personSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true, min: [18, 'you are too young brah']},
  POB: {type: String, required: true},
  local: {
    email: {type: String, required: true, unique: [true, 'email already exists']},
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  }
})

// methods ======================
// generating a hash

personSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
personSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

let Person = mongoose.model('person', personSchema)

module.exports = { people: Person }
