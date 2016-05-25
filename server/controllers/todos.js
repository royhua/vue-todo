'use strict';

var Todos = require('../models/todos');

exports.create = function (req, res) {
    var todo = new Todos(req.body);

    todo.save(function (err) {
        res.json(todo);
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
    });
};

exports.remove = function (req, res) {
    console.log(req.params.id);
    Todos.findOneAndRemove({'_id': req.params.id}, function (err, todo) {
        console.log(err);
        console.log(todo);
        res.json(todo);
    });
};
