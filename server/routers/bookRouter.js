const express = require('express');
const bookController = require('../controllers/bookController')
const authController = require('../controllers/authController')
const router = express.Router();

router
    .get('/getBooks', bookController.getBooks)
    .post('/addBook', authController.verifyToken, bookController.addBooks);

module.exports = router;
