'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user by id
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

/**
 * Get a single user by email and save sharedView
 */
exports.shareView = function (req, res, next) {
  var email = req.body.email;
  console.log('finding user with email: ', email);

  User.findOne({email: email}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    console.log('pushing user with id: ', req.user._id, req.user.name);
    var sharedObj = {name: user.name, id: user._id, email: user.email};
    req.user.sharedWith.push(sharedObj);
    console.log(req.user.sharedWith);
    user.sharedViews.push(req.user._id);
    req.user.save();
    user.save(function(err) {
      if (err) return handleError(err);
      res.send(req.user.sharedWith);
    });
  });
};

/**
 * Get a single user by email
 */
exports.checkEmail = function (req, res, next) {
  var email = req.body.email;
  console.log('finding user with email: ', email);

  User.findOne({email: email}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
      if (err) return handleError(err);
      res.send(res.user);
  });
};

exports.shareTemplate = function (req, res, next) {
  var email = req.body.email;
  console.log('finding user with email: ', email);

  User.findOne({email: email}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    console.log('pushing user with id: ', req.user._id, req.user.name);
    user.sharedTemplates.push(req.user._id);
    user.save(function(err) {
      if (err) return handleError(err);
      res.send(user);
    });
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.update = function(req, res) {
  console.log('user obj sent from front end: ', req.body);
  console.log(req.params.id);
  var updatedUser = req.body;
  // if(req.body._id) { delete req.body._id; }
  // if(req.body.__v) { delete req.body.__v; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    console.log('found user: ', user);
    // user = updatedUser;
    user.sharedViews = updatedUser.sharedViews;
    user.sharedWith = updatedUser.sharedWith;
    user.save();
  //   // console.log('current job stage to be added', req.body.stage);
  //   // var newStage = new Stage();
  //   // newStage.stage = req.body.stage;
  //   // console.log('new stage', newStage);
  //   // var updated = _.merge(user, req.body);
    // updated.save(function (err) {
    //   if (err) { return handleError(res, err); }
    //   return res.json(200, user);
    // });
  });
};


/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.send(500, err);
}