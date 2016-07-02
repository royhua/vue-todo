'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
    userId: String,
    friendUid: String,
    createdTime: Number
});

module.exports = mongoose.model('Friends', FriendSchema);
