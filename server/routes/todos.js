var express = require('express');
var router = express.Router();
var todos = require('../controllers/todos.js');

router.get('/todos', todos.read);

router.post('/todos', todos.create);

router.put('/todos', todos.update);

router.delete('/todos/:id', todos.remove);

module.exports = router;
