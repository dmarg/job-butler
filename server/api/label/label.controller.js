'use strict';

var _ = require('lodash');
var Label = require('./label.model');

var User = require('../user/user.model');
var google = require('googleapis');
var gmail = google.gmail('v1');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, "http://localhost:9000/auth/google/callback");

exports.createLabel = function(req, res) {

  console.log(req.body);

  oauth2Client.setCredentials({
   access_token: req.user.google.accessToken,
   refresh_token: req.user.google.refreshToken
  });

  gmail.users.labels.create({
    auth: oauth2Client,
    userId: req.body.userId,
    resource: {
      id: req.body.labelId,
      name: req.body.labelName,
      messageListVisibility: 'show',
      labelListVisibility: 'labelShow'
    }
  }, function(err, results) {
    if(err) { return console.log('error: ', err)};
    console.log('create results: ', results);
    return res.send({results: results});
  })
};

exports.deleteLabel = function(req, res) {

  console.log(req.body);

  oauth2Client.setCredentials({
   access_token: req.user.google.accessToken,
   refresh_token: req.user.google.refreshToken
  });

  gmail.users.labels.delete({
    auth: oauth2Client,
    userId: req.body.userId,
    id: req.body.labelId
  }, function(err, results) {
    if(err) { return console.log('error: ', err)};
    return res.send({results: results});
  })
};



// Get list of labels
exports.index = function(req, res) {
  Label.find(function (err, labels) {
    if(err) { return handleError(res, err); }
    return res.json(200, labels);
  });
};

// Get a single label
exports.show = function(req, res) {
  Label.findById(req.params.id, function (err, label) {
    if(err) { return handleError(res, err); }
    if(!label) { return res.send(404); }
    return res.json(label);
  });
};

// Creates a new label in the DB.
exports.create = function(req, res) {
  Label.create(req.body, function(err, label) {
    if(err) { return handleError(res, err); }
    return res.json(201, label);
  });
};

// Updates an existing label in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Label.findById(req.params.id, function (err, label) {
    if (err) { return handleError(res, err); }
    if(!label) { return res.send(404); }
    var updated = _.merge(label, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, label);
    });
  });
};

// Deletes a label from the DB.
exports.destroy = function(req, res) {
  Label.findById(req.params.id, function (err, label) {
    if(err) { return handleError(res, err); }
    if(!label) { return res.send(404); }
    label.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}