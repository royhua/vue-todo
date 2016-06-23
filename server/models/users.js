'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    nickName: String,
    password: String,
    createdTime: Number
});

module.exports = mongoose.model('Users', UserSchema);
