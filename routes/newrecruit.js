var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newrecruit', { title: 'Recruitment Plans', subtitle: ' Recruitment Plan' });
});

module.exports = router;
