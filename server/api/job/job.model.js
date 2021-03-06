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
  url: String,
  companyName: String,
  positionTitle: String,
  positionAtCompany: String,
  jobDetails: String,
  userName: String,
  stage: [StageSchema],
  active: Boolean
});

mongoose.model('Stage', StageSchema);
module.exports = mongoose.model('Job', JobSchema);
