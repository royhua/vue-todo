'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShareSchema = new Schema({
    owner_id: String,
    shared_uid: String,
    shared_todo_id: String,
    createdTime: Number
});

module.exports = mongoose.model('Share', ShareSchema);
