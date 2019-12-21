'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = Schema({
title: String,
content: String,
date : {type:Date, default: Date.now},
imagen: String,
precio:String,
Stock:Number
});

module.exports = mongoose.model('Article',ArticleSchema);
