// this middleware tests if a user is logged in
function isLoggedIn(req, res, next){
    // isAuthenticated is provided by passport. Logging in set it to true
    if(req.isAuthenticated()){
      return next(); // executes next middleware. Essentially continues
    }
    res.redirect('/users/login');
}

// this middleware tests if a user is not logged in
function isNotLoggedIn(req, res, next){
    // isAuthenticated is provided by passport. Logging in set it to true
    if(!req.isAuthenticated()){
      return next(); // executes next middleware. Essentially continues
    }
    res.redirect('/users/signup');
}


module.exports = {
    isLoggedIn: isLoggedIn,
    isNotLoggedIn: isNotLoggedIn
}