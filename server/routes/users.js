var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

router.post('/users/login', users.login);

router.post('/users', users.create);

module.exports = router;