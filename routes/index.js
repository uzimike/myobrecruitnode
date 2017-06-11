var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MYOB Recruit', subtitle: 'Create New...' });
});

module.exports = router;
