var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('applicationview', { title: 'Data Analyst Application Form' });
});

module.exports = router;
