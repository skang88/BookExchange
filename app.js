const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()


app.set('view engine', 'ejs')
app.set('vies', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
 
 
// DB Connection 
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

 
// User Router
const userRouter = require('./routers/userRouter')
app.use('/users', userRouter)


// index Router
const indexRouter = require('./routers/indexRouter')
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})

