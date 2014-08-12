'use strict';
var _ = require('lodash');
var Createdraft = require('./createDraft.model');
var User = require('../user/user.model');

var google = require('googleapis');
var gmail = google.gmail('v1');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, "http://localhost:9000/auth/google/callback");


exports.createDraft = function(req, res) {

  oauth2Client.setCredentials({
   access_token: req.user.google.accessToken,
   refresh_token: req.user.google.refreshToken
  });

  // console.log(req.body.userId, ": ", req.body.message.raw);
  console.log(oauth2Client);

  var to_email = req.body.message.to;
  var subjectLine = req.body.message.subjectLine;
  var bodyOfEmail = req.body.message.bodyOfEmail;

  var email_lines = [];

  email_lines.push("From: \"Some Name Here\" <rootyadaim@gmail.com>");
  email_lines.push("To: " + to_email);
  email_lines.push('Content-type: text/html;charset=iso-8859-1');
  email_lines.push('MIME-Version: 1.0');
  email_lines.push("Subject: " + subjectLine);
  email_lines.push("");
  email_lines.push(bodyOfEmail);
  email_lines.push("<b>And the bold text goes here</b>");

  var email = email_lines.join("\r\n").trim();

  // var base64EncodedEmail = new Buffer(email).toString('base64');

  // var encodedEmail = req.body.message.raw;
  console.log("email to send in base64: ", email);

  gmail.users.drafts.create({
    auth: oauth2Client,
    userId: "me",
    media: {
      mimeType: 'message/rfc822',
      body: email
    }
  }, function(err, results) {
    if(err) { return console.log('error: ', err)};
    return res.send({results: results});
  })
};
















// Get list of createDrafts
exports.index = function(req, res) {
  Createdraft.find(function (err, createDrafts) {
    if(err) { return handleError(res, err); }
    return res.json(200, createDrafts);
  });
};

// Get a single createDraft
exports.show = function(req, res) {
  Createdraft.findById(req.params.id, function (err, createDraft) {
    if(err) { return handleError(res, err); }
    if(!createDraft) { return res.send(404); }
    return res.json(createDraft);
  });
};

// Creates a new createDraft in the DB.
exports.create = function(req, res) {
  Createdraft.create(req.body, function(err, createDraft) {
    if(err) { return handleError(res, err); }
    return res.json(201, createDraft);
  });
};

// Updates an existing createDraft in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Createdraft.findById(req.params.id, function (err, createDraft) {
    if (err) { return handleError(res, err); }
    if(!createDraft) { return res.send(404); }
    var updated = _.merge(createDraft, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, createDraft);
    });
  });
};

// Deletes a createDraft from the DB.
exports.destroy = function(req, res) {
  Createdraft.findById(req.params.id, function (err, createDraft) {
    if(err) { return handleError(res, err); }
    if(!createDraft) { return res.send(404); }
    createDraft.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}