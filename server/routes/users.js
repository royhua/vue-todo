var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

router.post('/users/login', users.login);

// body 内容: emails = ['xx1@xx.com','xx2@xx.com']
router.post('/users/:userId/todos/:todoId/share', users.shareTodo);

router.get('/users/:userId/todos/shared', users.getSharedTodoList);

// /users/search?keyword=aaa
router.get('/users/search', users.search);

//  /users/:userid/friend/add?userIds=id,id2
router.get('/users/:userId/friends/add', users.addFriends);

router.get('/users/:userId/friends', users.getFriends);

router.post('/users', users.create);

module.exports = router;