var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submissions', { title: 'My Recruitment Plan' });
});

module.exports = router;
