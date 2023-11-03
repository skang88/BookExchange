// server/routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .get('/getUserbyToken', authController.returnUserbyToken)
    .get('/getUsers', authController.getUsers)
    .post('/login', authController.login)
    .post('/signup', authController.signup)


module.exports = router;
