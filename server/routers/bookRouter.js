const express = require('express');
const bookController = require('../controllers/bookController')
const authController = require('../controllers/authController')
const router = express.Router();

router
    .get('/getBooks', bookController.getBooks)
    .get('/searchBooks', bookController.searchBooks)
    .get('/getBook/:id', authController.verifyToken, bookController.getBookById)
    .get('/countBooks', bookController.countBooks)
    .post('/addBook', authController.verifyToken, bookController.addBooks)
    .post('/updateBook/:id', authController.verifyToken, bookController.updateBookById)
    .post('/deleteBook/:id', authController.verifyToken, bookController.deleteBookById);

module.exports = router;
