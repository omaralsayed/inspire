'use strict';

const express    = require('express');
const mongoose   = require('mongoose');
const passport   = require('passport');
const session    = require('express-session');
const fileUpload = require('express-fileupload');
const flash      = require('connect-flash');
const db         = require('./config/keys').mongoURI;
require('./controllers/user')(passport);

const port = process.env.port || 80;
const server = express();

server.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// EJS template
server.set("view engine", "ejs");
server.use(express.static("public"));

// Express encoding to parse 
// requests with JSON payloads
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// Passport middleware
server.use(passport.initialize());
server.use(passport.session());

// File upload middleware
server.use(fileUpload({	
	limits: { fileSize: 50 * 1024 * 1024 },
	preserveExtension: true
}));

// Connect flash
server.use(flash());

// Global variables
server.use(function(req, res, next) {
	res.locals.success = req.flash('success');
	res.locals.fail    = req.flash('fail');
	res.locals.error   = req.flash('error');
	next();
});

// Routes
server.use('/',
	require('./routes/index.js'));
server.use('/users',
	require('./routes/user.js'));
server.use('/sentiment',
	require('./routes/sentiment.js'));

server.listen(port, function () {
	console.log('Listening on port ' + port)
});
