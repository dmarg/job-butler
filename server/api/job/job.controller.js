'use strict';

var _ = require('lodash');
var Job = require('./job.model');

// Get list of jobs
exports.index = function(req, res) {
  Job.find({_userId: req.user._id}, function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.json(200, jobs);
  });
};

// Get list of jobs for specified user
exports.index = function(req, res) {
  Job.find({_userId: req.body.userId}, function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.json(200, jobs);
  });
};

// Get a single job
exports.show = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    return res.json(job);
  });
};

// Creates a new job in the DB.
exports.create = function(req, res) {
  var newJob = new Job(req.body);
  newJob._userId = req.body.userId;
  newJob.positionTitle = req.body.positionTitle;
  newJob.companyName = req.body.companyName;
  newJob.stage = req.body.stage;
  newJob.save(function(err, job) {
    if (err) {
      console.log('error: ', err);
      return res.send(500);
    }
    return res.send(job);
  })

  // Job.create(req.body, function(err, job) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, job);
  // });
};

// Updates an existing job in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Job.findById(req.params.id, function (err, job) {
    if (err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    var updated = _.merge(job, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, job);
    });
  });
};

// Deletes a job from the DB.
exports.destroy = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    job.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}