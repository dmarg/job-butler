'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JoblinkSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Joblink', JoblinkSchema);