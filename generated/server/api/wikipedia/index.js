const router = require('express').Router();
const controller = require('./wikipedia.controller.js');

module.exports = router;

router.get('/random', controller.random);