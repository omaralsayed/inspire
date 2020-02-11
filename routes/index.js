const express = require('express');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../controllers/index');

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
    if (supportedTypes.indexOf(ext.toLowerCase()) != -1) { // If supported
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
           * Return a 3D or 4D tensor of the decoded image
           * given the encoded bytes of the uploaded image.
           */
          const tfimage = tfnode.node.decodeImage(buffer);
          return tfimage;
        }
        
        /**
         * Load mobilenet and use it to classify
         * the given image that's read by readImage()
         * and store the classification information.
         */
        const compile = async path => {
          const image = readImage(path);
          // Load mobilenet model
          const mobilenetModel = await mobilenet.load();
          // Classify the image
          predictions = await mobilenetModel.classify(image);
        }
      
        // Get predictions
        compile(path);
        // Alert user upon successful upload
        req.flash('success', 'Image uploaded sucessfully.');
  
        // Redirect
        if (req.user) { // User view
          res.redirect('/dashboard');
        } else { // Guest view
          res.redirect('/guest');
        }
      });  
    } else { // If unsupported
      // Alert user of failure due to unsupported file type
      req.flash('fail', 'Expected image (BMP, JPEG, JPG, PNG, or GIF), but got unsupported image type.');

      // Redirect
      if (req.user) { // User view
        res.redirect('/dashboard');
      } else { // Guest view
        res.redirect('/guest');
      }
    }
  } else {
    // Alert user of failure due to not selecting a file
    req.flash('fail', 'No file selected.');

    // Redirect
    if (req.user) { // User view
      res.redirect('/dashboard');
    } else { // Guest view
      res.redirect('/guest');
    }
  }
});

module.exports = router;