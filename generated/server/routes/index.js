var router = require('express').Router();
var path = require('path');

// Require in your routes here
router.use('/modules', require('./modules'));

module.exports = router;