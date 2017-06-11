var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recruit', { title: 'Recruitment Plans', subtitle: 'New Recruitment Plan' });
});

module.exports = router;
