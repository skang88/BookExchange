// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY; // secretKey is in .env

function createToken(username) {
  return jwt.sign({ username }, secretKey, { expiresIn: '1d' });
}

exports.login = async (req, res) => {

  const { username, password } = req.body;
  // login - find user in the database and verify if match username and password.
  await User.findOne({ username: username })
    .then(async (foundUser)=>{
      if (foundUser) {
        // verification login form info and user info in the database
        if (foundUser.username === username && await bcrypt.compare(password, foundUser.password)) {
          const token = createToken(username);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'User name or Password is not match' });
        }
      } else {
        res.status(404).json({ error: 'User not found' })
      }
  })  
};

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  // Create a new user
  const newUser = new User({
    email,
    username,
    password
  });

  try {
    // Save to database
    await newUser.save();
    const token = createToken(username);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occured while creating a user');
  }
}

// verify token in the Header
exports.verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.decodedUser = decoded.username; // assign decoded.user to req.user for using next middleware this user information
    console.log("Current User info: ",decoded)
    next(); // continue to middleware chain
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// response username by token
exports.returnUserbyToken = (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json(decoded.username); // assign decoded.user to req.user for using next middleware this user information
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.getUsers = async (req, res) => {
  // Get all users
  try {
    const users = await User.find();
    if(users && users.length > 0  ){
        res.status(200).json(users);}
    else{
        res.send('No Users are here');
    }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    const currentuser = req.decodedUser;
    const user = await User.findOne({ username: currentuser }, { password: 0 })
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

// can only change email, + additional infor if develope. 
exports.updateUserInfo = async (req, res) => {
  try {
    const currentuser = req.decodedUser;
    const foundUser = await User.findOne({ username: currentuser })
    
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password not matched" })
    }
    
    foundUser.email = req.body.email;
    await foundUser.save();

    res.status(200).json({ message: "User information successfully updated"});
    
  } catch(err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const currentuser = req.decodedUser;
    const foundUser = await User.findOne({ username: currentuser })
    const isPasswordMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password not matched" })
    }
    
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" })
    }

    foundUser.password = req.body.password;
    await foundUser.save();

    res.status(200).json({ message: "User password successfully updated"});
    
  } catch(err) {
    res.status(500).json({ message: err.message })
    console.log(err)
  }
}