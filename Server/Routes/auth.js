//auths.js
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../Models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      // Log the 'info' object to see more details about the authentication failure
      console.log(info);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If authentication succeeds, manually log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // User is successfully logged in
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});


// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

module.exports = router;
