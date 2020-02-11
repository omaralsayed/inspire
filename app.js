'use strict';

// Imports
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const db = require('./config/keys').mongoURI;

// Express
const app = express();
const port = process.env.port || 80;

// Passport implementation
require('./controllers/user')(passport);

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// EJS template
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(session({ secret: 'secret',	resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// File upload middleware
app.use(fileUpload({	
	limits: { fileSize: 50 * 1024 * 1024 },
	preserveExtension: true
}));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
	res.locals.success = req.flash('success');
	res.locals.fail = req.flash('fail');
	res.locals.error = req.flash('error');
	next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'));

// Port 80
app.listen(port, function () {
	console.log('Listening on port ' + port)
});