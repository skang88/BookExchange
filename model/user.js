// Require mongoose module
const mongoose = require('mongoose')


// Create a User Schema
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    password: { type: String, required: true }
})

// Exports User Schema
module.exports = mongoose.model('User', userSchema)



