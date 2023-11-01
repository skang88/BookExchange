require('dotenv').config();

const mongoose = require('mongoose'); // Mongoose 모듈 추가

// required for the application to run
const app = require('./app');

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
  console.log(`Server is running on port ${port}`);
});
