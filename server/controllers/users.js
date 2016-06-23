'use strict';

var Users = require('../models/users');

exports.create = function (req, res) {
    var user = new Users(req.body);
    user.createdTime = new Date().getTime()
    user.save(function (err) {
        res.json(user);
    });
};

exports.read = function (req, res) {
    Users.find(function (err, users) {
        res.json(users);
    });
};

exports.login = function (req, res) {
    console.log(req.body.email);
    Users.findOne({'email': req.body.email},function (err, user) {
        console.log(user);
        console.log(err);
        if(user && user.password === req.body.password){
            console.log(user);
            res.json(user);
        } else {
            res.json({
                state: false
            });
        }
    });
};

exports.update = function (req, res) {
    Users.findOneAndUpdate({'_id': req.body._id}, {
        email: req.body.email,
        nickName: req.body.nickName,
        password: req.body.password,
        createdTime: new Date().getTime()
    }, {}, function (err, user) {
        res.json(user);
    });
};

exports.remove = function (req, res) {
    Users.findOneAndRemove({'_id': req.params.id}, function (err, user) {
        res.json(user);
    });
};
