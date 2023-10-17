// Imports required module
const express = require('express')
const router = express.Router()


// Root Router
router.get('/', (req, res) => {
    res.render('index')
})


// Exports Router
module.exports = router