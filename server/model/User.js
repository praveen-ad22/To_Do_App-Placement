

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  picture: String,
})

module.exports = mongoose.model('User', userSchema)
