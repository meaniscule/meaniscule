var router = require('express').Router();
var path = require('path');

router.use('/modules', require('./modules'));

module.exports = router;