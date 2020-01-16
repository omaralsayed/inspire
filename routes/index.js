const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// GET index
router.get('/', forwardAuthenticated, (req, res) => 
  res.render('index', { user: req.user })
);

// GET dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', { user: req.user })
);

// GET profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', { user: req.user })
);

module.exports = router;