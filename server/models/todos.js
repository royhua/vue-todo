'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    desc: String,
    finishedTime: Date,
    color: String,
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todos', TodoSchema);
