const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require('password-validator');

const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

// GET register
router.get('/register', forwardAuthenticated, (req, res) => 
  res.render('register', { user: req.user })
);

const schema = new validator();
schema
.is().min(6)      
.has().uppercase()
.has().lowercase()
.has().symbols()

// POST register
router.post('/register', (req, res) => {
  let errors = [];
  const { name, email, password, repeatedPassword } = req.body;
  console.log(repeatedPassword)
  if (!name || !email || !password || !repeatedPassword) {
    errors.push({ msg: 'Please fill out all fields' });
  } else {
    if (password != repeatedPassword) {
      errors.push({ msg: 'Passwords do not match' });
    } else {
      const validationErrors = schema.validate(password, { list: true });
      if (validationErrors.length) {
        for (let errorIdx = 0; errorIdx < validationErrors.length; errorIdx++) {
          if (validationErrors[errorIdx] == 'min') {
            errors.push({ msg: 'Password must be at least 6 characters' });
          } else if (validationErrors[errorIdx] == 'uppercase') {
            errors.push({ msg: 'Password must have uppercase characters' });
          } else if (validationErrors[errorIdx] == 'lowercase') {
            errors.push({ msg: 'Password must have lowercase characters' });
          } else {
            errors.push({ msg: 'Password must have symbols (@, !, &, ...)' });
          }
        }
      }
    }
  }
  if (errors.length) {
    res.render('register', { 
      errors, name, email, password, repeatedPassword, user: req.user
    });
  } else {
    User.findOne({ email: { "$regex": "^" + email + "\\b", "$options": "i" }})
    .then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', { 
          errors, name, email, password, repeatedPassword, user: req.user
        });
      } else {
        const newUser = new User({ name, email, password });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success', 'You are now registered and can log in!');
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