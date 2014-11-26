'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  body: String,
  _userId: {type: Schema.Types.ObjectId, ref: 'User' , index: true},
  permanent: Boolean
});

module.exports = mongoose.model('Template', TemplateSchema);