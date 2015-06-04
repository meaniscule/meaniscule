var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../app/views/index.html'));
});

// router.put('/modules', function(req, res, next) {
  
// });

module.exports = router;