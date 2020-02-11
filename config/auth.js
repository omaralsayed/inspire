module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    // Alert user of log in requirement upon failure
    req.flash('fail', 'Please log in to view that resource');
    res.redirect('/');
  },
  
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    // If credentials accepted, redirect to dashboard
    res.redirect('/dashboard');      
  }
};