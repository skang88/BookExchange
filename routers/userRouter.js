const express = require('express')
const router = express.Router()
const User = require('../model/user')

// All User Route
router.get('/', (req, res) =>{

    const users = User.find({ })
    console.log(users)
    res.render('users/index', { users: users })
    
})

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
})

// Create User Route
router.post('/', async (req, res) => {

    const user = new User({
        userId: req.body.name,
        password: "1234"
    })
    const newUser = user.save()
    console.log(newUser)
    res.redirect('users')
}) 
 
module.exports = router 
 