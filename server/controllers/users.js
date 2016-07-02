'use strict';

var Users = require('../models/users');
var Friends = require('../models/friends');
var Share = require('../models/share');
var Todos = require('../models/todos');

function toArray(param){
    if(Array.isArray(param)){
        return param;
    }
    if(!param){
        return [];
    }
    return [param];
}

exports.create = function (req, res) {
    Users.findOne({'email': req.body.email},function (err, user) {
        if(user){
            res.json({
                state: false
            });
        } else {
            var user = new Users(req.body);
            user.createdTime = new Date().getTime()
            user.save(function (err) {
                res.json(user);
            });
        }
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

//根据email 查账号
exports.search = function (req, res) {
    let reg = new RegExp(`.${req.query.keyword}.`, 'g');
    Users.find({'$or': [{'email': reg}, {'nickName': reg}]}, function (err, users) {
        res.json(users);
    });
};

//添加好友
exports.addFriends = function (req, res) {
    let userId = req.params.userId;
    let friendIds = toArray(req.query.friendIds);
    let allPromise = friendIds.map(function(friendId){
        return new Promise(function(req, rej){
            if(friendId === userId){
                req({
                    friendId,
                    state : false
                });
            }
            Friends.findOne({'userId': userId, friendUid: friendId}).then(function(user){
                if(user){
                    req({
                        friendId,
                        state : false
                    });
                } else {
                    var friend = new Friends();
                    friend.userId = friendId;
                    friend.friendUid = userId;
                    friend.createdTime = new Date().getTime();
                    friend.save();

                    friend = new Friends();
                    friend.userId = userId;
                    friend.friendUid = friendId;
                    friend.createdTime = new Date().getTime();
                    friend.save(function (err) {
                        if(err){
                            req({
                                friendId,
                                state : false
                            });
                        } else{
                            req({
                                friendId,
                                state : true
                            });
                        }
                    });

                }
            });
        });
    });
    Promise.all(allPromise).then(function(result){
        let successAdded = [];
        result.forEach(function(item){
            if(item.state){
                successAdded.push(item.friendId);
            }
        });
        res.json(successAdded);
    });
};

exports.getFriends = function (req, res) {
    let userId = req.params.userId;
    Friends.find({'userId': userId}).sort({createdTime: -1}).then(function(firends){
        if(firends){
            let userIds = firends.map(function(item){
                return item.friendUid;
            });

            return Users.find({'_id': {'$in': userIds}}).then(function(users){
                res.json(users);
            })
        }
    }).catch(function(){
        res.json({
            state : false
        });
    });
};
//分享todo给一些好友
exports.shareTodo = function (req, res) {
    //检测分享的email是否是好友, emails 必须为数组
    let friendIds = toArray(req.body.friendIds);
    let userId = req.params.userId;
    let todoId = req.params.todoId;

    let allPromise = friendIds.map(function(friendId){
        return new Promise(function(res, rej){
            Share.find({'shared_todo_id':todoId, 'shared_uid':friendId}).then((share) =>{
                console.log(share);
                if(share && share.length > 0){
                    res({
                        friendId,
                        state: false
                    });
                } else {
                    let share = new Share();
                    share.owner_id = userId;
                    share.shared_uid = friendId;
                    share.shared_todo_id = todoId;
                    share.createdTime = new Date().getTime();
                    share.save().then(()=>{
                        res({
                            friendId,
                            state: true
                        });
                    }).catch(()=>{
                        res({
                            friendId,
                            state: false
                        });
                    });
                }
            }).catch(function(){
                res({
                    friendId,
                    state: false
                });
            });
        });

    });
    Promise.all(allPromise).then(function(result){
        console.log(result);
        let f = [];
        result.forEach(function(r){
            if(r.state){
                f.push(r.friendId);
            }
        });
        res.json(f);
    });

};

//获取分享过来的todo列表
exports.getSharedTodoList = function (req,res) {
    Share.find({'shared_uid':req.params.userId}, function (err, shared) {
        if(shared && shared.length > 0){

            let allPromise = shared.map(function(s){
                return new Promise(function(res, rej){
                    Promise.all(
                        [Todos.findOne({'_id': s.shared_todo_id}),
                            Users.findOne({'_id': s.owner_id})]
                    ).then(function(result){

                        let todo = result[0];
                        let user = result[1];
                        let newTodo = {
                            title: todo.title,
                            desc: todo.desc,
                            finishedTime: todo.finishedTime,
                            color: todo.color,
                            userId: todo.userId,
                            done: todo.done,
                            _id: todo._id
                        };
                        newTodo.sharedFrom = user;
                        res(newTodo);
                    });
                });
            });

            Promise.all(allPromise).then((result)=>{
                res.json(result);
            })
        } else {
            res.json([]);
        }
    });

}