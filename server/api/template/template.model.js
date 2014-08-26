'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  body: String,
  userId: String,
  permanent: Boolean
});

module.exports = mongoose.model('Template', TemplateSchema);