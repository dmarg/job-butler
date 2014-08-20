'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StageSchema = new Schema({
  stageName: String,
  date: String,
  unixTC: String,
  notes: String
});

var JobSchema = new Schema({
  _userId: {type: Schema.Types.ObjectId, ref: 'User' , index: true},
  companyName: String,
  link: String,
  positionTitle: String,
  description: String,
  userName: String,
  stage: [StageSchema],
  active: Boolean
});

module.exports = mongoose.model('Job', JobSchema);