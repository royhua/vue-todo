var express = require('express');
var router = express.Router();
var todos = require('../controllers/todos.js');

router.get('/users/:userId/todos', todos.read);

router.post('/users/:userId/todos', todos.create);

router.put('/users/:userId/todos', todos.update);

router.delete('/users/:userId/todos/:id', todos.remove);

module.exports = router;
