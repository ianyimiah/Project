var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Project' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('about', { title: 'About' });
});


module.exports = router;