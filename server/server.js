// Required for reading .env file
require('dotenv').config()

// required for database to perform CRUD operations 
const mongoose = require('mongoose'); // Mongoose 모듈 추가

// this is new from windows 10, leadgoon
// This is from testing btanch
// This is from skang 88, main branch
// Hi skang88, I commmint to main branch also. 
// required for the application to run
const app = require('./app');

console.log(process.env.MONGODB_URI)
// Check Connection result
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
