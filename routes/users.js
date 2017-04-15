/**
 * The arrangement of the routers in this file is VERY IMPORTANT
 */
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var isLoggedIn = require('./util').isLoggedIn;
var isNotLoggedIn = require('./util').isNotLoggedIn;

var Supervisor = require('../models/supervisor');
var Administrator = require('../models/administrator');

// using csurf to start csrf protection. With this we are able to use csurf as a middleware
var csrfProtection = csrf();

// By this I am telling express that all the routes within
// the current instance of router should be protected by this
// csrfProtection
router.use(csrfProtection);

// Administrative tasks
// this middleware protects all admin routes
router.use('/admin', isLoggedIn, isAdmin, function(req, res, next){
  next();
});

// Dashboard
router.get('/admin',  function(req, res, next) {
  res.render('users/administrator/admin');
});

// students view for administrator
router.get('/admin/students', function(req, res, next) {
  res.render('users/administrator/admin-students');
});
 
 // supervisors view for administrator
router.get('/admin/supervisors',  function(req, res, next) {
   Supervisor.find(function(err, docs){
      res.render('users/administrator/admin-supervisors', {supervisors: docs});
  });
});

// Supervisory tasks
// this middleware protects all supervisor routes
router.use('/supervisor', isLoggedIn, isSupervisor, function(req, res, next){
  next();
});

router.get('/supervisor',  function(req, res, next) {
  res.render('users/supervisor/supervisor');
});

router.get('/supervisor/projects', function(req, res, next) {
  res.render('users/supervisor/supervisor-projects');
});

router.get('/supervisor/add/projects', function(req, res, next) {
  res.render('users/supervisor/supervisor-add-projects');
});

router.get('/supervisor/students', function(req, res, next){
  res.render('users/supervisor/supervisor-students');
});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});


router.get('/', isNotLoggedIn, function(req, res, next) {
  res.redirect('/casualuser');
});

router.get('/casualuser', function(req, res, next) {
  res.render('users/casual/casual');
});


router.get('/login', function(req, res, next) {
  var messages = req.flash('error');
  res.render('users/login', {csrfToken: req.csrfToken(), messages: messages});
});


router.post('/login', 
  passport.authenticate('local.signin', {
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res, next){
    if(req.body.user_type === 'admin'){
      res.redirect('/users/admin');
    }
    else if(req.body.user_type === 'super'){
      res.redirect('/users/supervisor');
    }
    else{
      req.logout();
      res.redirect('/users/login');
    }
  }
);


router.get('/signup', function(req, res, next){
  // all error flash messages that comes from passport is stored under 'error'
  var messages = req.flash('error');
  console.log(messages);
  // req.csrfToken is made available by csurf being used as a middleware
  res.render('users/signup', {csrfToken: req.csrfToken(), messages: messages});
});

router.post('/signup', 
  passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true,
    session: false
  }),
  function(req, res, next){
    res.redirect('/users/signup-landing');
  }
);

// landing page for sign up
router.get('/signup-landing', function(req, res, next){
  res.render('users/signup-landing', {csrfToken: req.csrfToken()});
});

router.post('/signup-landing', function(req, res, next){
  var userType = req.body.user_type;
  var name = req.body.name;
  var titles = req.body.titles;
  var id = req.body.id;
  var profileImage = req.body.profile_image;

  if (userType === 'super'){
    var supervisor = new Supervisor({
      user: req.user,
      name: name,
      id: id,
      titles: titles,
      profileImage: profileImage
    });

    supervisor.save(function(err, result){
      if (err) {
        res.redirect('/users/signup');
      }
      req.flash('success', 'Successfully added a supervisor');
      res.redirect('/users/login');
    });
  }
  else if(userType === 'admin'){
    var administrator = new Administrator({
      user: req.user,
      name: name,
      id: id,
      titles: titles,
      profileImage: profileImage
    });

    administrator.save(function(err, result){
      if (err) {
        res.redirect('/users/signup');
      }
      req.flash('success', 'Successfully added an administrator');
      res.redirect('/users/login');
    });
  }
  else {
    res.redirect('/signup-landing', {message: 'Select supervisor or administrator'});
  }

});



module.exports = router;

// this middleware tests if a user is an admin
function isAdmin(req, res, next){
    Administrator.findOne({user: req.user}, function(err, admin){
      if (err){
        return res.redirect('/users/admin');
      }
      return next();
    });
}

function isSupervisor(req, res, next){
    Supervisor.findOne({user: req.user}, function(err, supervisor){
      if (err){
        return res.redirect('/users/supervisor');
      }
      return next();
    });
}