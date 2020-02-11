const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

// GET register
router.get('/register', forwardAuthenticated, (req, res) => 
  res.render('register', { user: req.user })
);

// POST register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', { 
      errors, name, email, password, password2, user: req.user
    });
  } else {
    User.findOne({ email: { "$regex": "^" + email + "\\b", "$options": "i" }})
    .then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', { 
          errors, name, email, password, password2, user: req.user
        });
      } else {
        const newUser = new User({ name, email, password });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success', 'You are now registered and can log in');
                res.redirect('/');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// GET logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

// POST login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;