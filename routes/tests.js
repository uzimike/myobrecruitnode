var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tests', { title: 'Test Forms' });
});

module.exports = router;
