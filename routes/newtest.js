var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newtest', { title: 'Test Forms', subtitle: 'New Test Form' });
});

module.exports = router;
