'use strict';

var Todos = require('../models/todos');
var io = require('../socket.io/io');

function notifyAll(uid){
    Todos.find(function (err, todos) {
        io.update('todos', {
            uid: uid,
            data: todos
        });
    });
}

exports.create = function (req, res) {
    var todo = new Todos(req.body);

    todo.save(function (err) {
        res.json(todo);
        notifyAll(req.headers.uid);
    });
};

exports.read = function (req, res) {
    Todos.find(function (err, todos) {
        res.json(todos);
    });
};

exports.update = function (req, res) {
    Todos.findOneAndUpdate({'_id': req.body._id}, {
        done: req.body.done,
        title: req.body.title,
        createDate: req.body.createDate
    }, {}, function (err, todo) {
        res.json(todo);
        notifyAll(req.headers.uid);
    });
};

exports.remove = function (req, res) {
    console.log(req.params.id);
    Todos.findOneAndRemove({'_id': req.params.id}, function (err, todo) {
        res.json(todo);
        notifyAll(req.headers.uid);
    });
};
