'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StageSchema = new Schema({
  stageName: String,
  date: Date,
  unixTC: String,
  notes: Array
});

var JobSchema = new Schema({
  _userId: {type: Schema.Types.ObjectId, ref: 'User' , index: true},
  companyName: String,
  linkToJobPost: String,
  positionTitle: String,
  description: String,
  stage: [StageSchema],
  active: Boolean
});

module.exports = mongoose.model('Job', JobSchema);