const express = require('express');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const router = express.Router();
const fs = require('fs');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// GET index
router.get('/', forwardAuthenticated, (req, res) => 
  res.render('index', { user: req.user })
);

// GET guest
router.get('/guest', (req, res) =>
  res.render('guest', { user: 'Guest' })
);

// GET profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', { user: req.user })
);

// GET dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', { user: req.user })
);

// POST dashboard/upload
router.post('/dashboard/upload', (req, res) => {
  if (req.files !== null) { // If a file is selected
    // Create a string of accepted image types
    const supportedTypes = 'bmp jpeg jpg png gif';
    // Store the value of the uploaded file extension
    const ext = req.files.tfInput.name.split('.')[req.files.tfInput.name.split('.').length - 1];

    // Check if the file type is supported
    if (supportedTypes.indexOf(ext.toLowerCase()) != -1) {
      const img = req.files.tfInput;
      const name = img.name.split('.');
      const path = 'media/temp.' + name[name.length - 1];
    
      // Add image to target path
      img.mv(path, function (err) {
        if (err) {
          return res.send(err);
        }
  
        /**
         * Create a buffer of the given filepath and use
         * tfnode to decode and return the image content.
         */
        const readImage = path => {
          // Read the entire content of the file
          const buffer = fs.readFileSync(path);
          /**
           * Return a 3D tensor of the decoded image
           * given encoded bytes of an uploaded file.
           */
          return tfnode.node.decodeImage(buffer, 3);
        }
        
        /**
         * Load mobilenet and use it to classify
         * the given image that's read by readImage()
         * and store the classification information.
         */
        const compile = async path => {
          const image = readImage(path);
          // Classify image using MobileNet model
          const mobilenetModel = await mobilenet.load();
          predictions = await mobilenetModel.classify(image);
        }
      
        // Get predictions
        compile(path);
        // Alert user upon successful upload
        req.flash('success', 'Image uploaded sucessfully.');
  
        // Redirect
        if (req.user) {
          res.redirect('/dashboard');
        } else { // Guest view
          res.redirect('/guest');
        }
      });  
    } else { // If unsupported
      // Alert user of failure due to unsupported file type
      req.flash('fail', 'Expected image (BMP, JPEG, JPG, PNG, or GIF), but got an unsupported type.');

      // Redirect
      if (req.user) {
        res.redirect('/dashboard');
      } else { // Guest view
        res.redirect('/guest');
      }
    }
  } else {
    // Alert user of failure with selecting a file
    req.flash('fail', 'No file selected.');

    // Redirect
    if (req.user) {
      res.redirect('/dashboard');
    } else { // Guest view
      res.redirect('/guest');
    }
  }
});

module.exports = router;