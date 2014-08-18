'use strict';

var _ = require('lodash');
var Message = require('./message.model');

var User = require('../user/user.model');

var google = require('googleapis');
var gmail = google.gmail('v1');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, "http://localhost:9000/auth/google/callback");

exports.sendMessage = function(req, res) {

  oauth2Client.setCredentials({
   access_token: req.user.google.accessToken,
   refresh_token: req.user.google.refreshToken
  });

  // console.log(req.body.userId, ": ", req.body.message.raw);'
  console.log('this is oauth2');
  console.log(oauth2Client);

  var to_email = req.body.message.to;
  var subjectLine = req.body.message.subjectLine;
  var bodyOfEmail = req.body.message.bodyOfEmail;

  var email_lines = [];

  // email_lines.push("From: \"Some Name Here\" <rootyadaim@gmail.com>");
  email_lines.push("To: " + to_email);
  email_lines.push('Content-type: text/html;charset=iso-8859-1');
  email_lines.push('MIME-Version: 1.0');
  email_lines.push("Subject: " + subjectLine);
  email_lines.push("");
  email_lines.push(bodyOfEmail);

  console.log(email_lines);

  var email = email_lines.join("\r\n").trim();

  // var base64EncodedEmail = new Buffer(email).toString('base64');

  // var encodedEmail = req.body.message.raw;
  console.log("email to send in base64: ", email);

  gmail.users.messages.send({
    auth: oauth2Client,
    userId: "me",
    media: {
      mimeType: 'message/rfc822',
      body: email
    }
  }, function(err, results) {
    if(err) { return console.log('error: ', err)};
    console.log("results: ", results);
    return res.send({results: results});
  })
};

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.json(201, message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}