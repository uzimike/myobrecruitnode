var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email-sent', { title: 'Email Sent!' });
});

module.exports = router;
