'use strict';

var _ = require('lodash');
var Template = require('./template.model');

// var coverLetter = new Template;
// coverLetter.name = 'Follow-Up';
// coverLetter.body = "<p>HELLO 3 <b>[Contact Name]</b>,</p><p>I'm writing to apply to the <b>[Position Title]</b> opening at <b>[Company Name]</b>. I am a web developer with experience in JavaScript. I have built RESTful APIs using the MVC framework and relational databases on the back-end, and used JavaScript, HTML5, and CSS3 to create simple, intuitive front-end for web applications.<br/></p><p>I'm looking for a team that's building an innovative product while solving complicated, stimulating problems. <b>[Something interesting about the Company]</b> I would love to talk more about your product and the engineering profile you're looking for.<br/></p><p>My r&#233;sum&#233; is attached for your convenience. You can also see my portfolio here: <b>[your portfolio website]</b>, and read some of the code I've written here: <b>[link to your github]</b>. I look forward to being in touch.<br/></p>";
// coverLetter.save();

// Get list of templates
exports.index = function(req, res) {
  Template.find(function (err, templates) {
    if(err) { return handleError(res, err); }
    return res.json(200, templates);
  });
};

// Get list of templates for current user
exports.render = function(req, res) {
  Template.find({$or: [{userId: req.user._id}, {permanent: true}]}, function (err, templates) {
    if(err) { return handleError(res, err); }
    return res.json(200, templates);
  });
};

// Get a single template
exports.show = function(req, res) {
  Template.findById(req.params.id, function (err, template) {
    if(err) { return handleError(res, err); }
    if(!template) { return res.send(404); }
    return res.json(template);
  });
};

// Creates a new template in the DB.
exports.create = function(req, res) {
  Template.create(req.body, function(err, template) {
    if(err) { return handleError(res, err); }
    return res.json(201, template);
  });
};

// Updates an existing template in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Template.findById(req.params.id, function (err, template) {
    if (err) { return handleError(res, err); }
    if(!template) { return res.send(404); }
    var updated = _.merge(template, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, template);
    });
  });
};

// Deletes a template from the DB.
exports.destroy = function(req, res) {
  Template.findById(req.params.id, function (err, template) {
    if(err) { return handleError(res, err); }
    if(!template) { return res.send(404); }
    template.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};

