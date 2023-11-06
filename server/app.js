const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');

// start express app
const app = express();

// for debugging to log in the console
app.use(morgan('dev'));
app.use(express.json())

// To communicate with client server
app.use(cors({ origin: process.env.CLIENT_SERVER }));

const authRouter = require('./routers/authRouter');
app.use('/api/auth', authRouter);

const bookRouter = require('./routers/bookRouter');
app.use('/api/book', bookRouter)



module.exports = app;