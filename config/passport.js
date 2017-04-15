// the configurations applied to passport persists across different files
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Administrator = require('../models/administrator');
var Supervisor = require('../models/supervisor');

// This basically tells passport how to store the user in a session
// serializeUser determines which data of the user object should be stored  in a session
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializeUser is used by passport to retrieve the serialized user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

// signup strategy
passport.use('local.signup', 
    new LocalStrategy({
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true
    }, 
    function(req, email, password, done){
        User.findOne({'email': email}, function(err, user){
            // checkBody is a method added by express-validator
            req.checkBody('email', 'Invalid email').notEmpty().isEmail();
            req.checkBody('password', 'Password should be more than four(4) characters').notEmpty().isLength({min:4});
            var errors = req.validationErrors();
            if (errors) {
                var messages = [];
                errors.forEach(function(error){
                    messages.push(error.msg);
                });
                return done(null, false, req.flash('error', messages));
            }

            if(err){
                return done(err);
            }
            if(user) {
                return done(null, false, {message: 'Email is already in use.'});
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err, result){
                if(err) {
                    return done(err);
                }
                return done(null, newUser);
            });
        });
    })
);

// signin strategy
passport.use('local.signin', 
    new LocalStrategy({
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true
    }, 
    function(req, email, password, done){
        // checkBody is a method added by express-validator
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Password should be more than four(4) characters').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        User.findOne({'email': email}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: 'No user found'});
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Invalid or wrong password'});
            }
            if(user){
                if((req.body.user_type === 'admin') || (req.body.user_type === 'super')){
                    // sign in as admin
                    console.log(req.body.user_type);
                    return done(null, user, {message: 'login in progress'} );
                }
               
            }
            return done(null, false, {message: 'Select a user type'});
        });
    })
);
