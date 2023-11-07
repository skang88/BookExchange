// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please provide a password']
  }
}, { collection: 'users' });


// add encrypting the password middleware
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next;
  }
  // // if new and modified
  // npm install bcryptjs
  this.password = await bcrypt.hash(this.password, 12); // how intensive the CPU will be
  this.passwordConfirm = undefined; // we dop not want to store in database
  next();
});
//model instance method will be available to all the instance of the user.
userSchema.methods.isPasswordMatch = async (userSuppliedPassword, currentHashedPasswordInDB)=>{
  return await bcrypt.compare(userSuppliedPassword, currentHashedPasswordInDB)
}
const User = mongoose.model('User', userSchema);

module.exports = User;
