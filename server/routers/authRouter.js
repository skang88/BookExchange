// server/routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .get('/getUserbyToken', authController.returnUserbyToken)
    .get('/getUsers', authController.getUsers)
    .get('/getUserInfo', authController.verifyToken, authController.getUserInfo)
    .post('/login', authController.login)
    .post('/signup', authController.signup)
    .post('/updateUserinfo', authController.verifyToken, authController.updateUserInfo)

module.exports = router;
