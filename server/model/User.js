// server/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    require: [true, 'Please provide your email'],
    unique: true
  },
  username: {
    type: String,
    require: [true, 'Please provide your username'],
    unique: true
  },
  password: {
    type: String, 
    required: [true, 'Please provide a password'],
    select: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
