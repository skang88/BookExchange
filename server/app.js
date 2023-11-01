const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');

// start express app
const app = express();

// for debugging to log in the console
app.use(morgan('dev'));
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_SERVER }));

module.exports = app;