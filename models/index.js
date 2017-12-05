const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const personSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  facebook: {

  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {type: String, required: true},
  gender: {type: String},
  age: {type: Number, min: [18, 'you are too young brah']},
  POB: {type: String }
})

// methods ======================
// generating a hash
//
personSchema.methods.encryptPW = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
personSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

let Person = mongoose.model('Person', personSchema)

module.exports = { people: Person }
