'use strict';

var _ = require('lodash');
var Joblink = require('./joblink.model');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};
scrapers['linkedin'] = require('./scrapers/linkedin.scraper');
scrapers['stackoverflow'] = require('./scrapers/stackoverflow.scraper');
scrapers['angel'] = require('./scrapers/angel.scraper');
scrapers['indeed'] = require('./scrapers/indeed.scraper');
scrapers['dice'] = require('./scrapers/dice.scraper');
scrapers['theresumator'] = require('./scrapers/theresumator.scraper');
scrapers['greenhouse'] = require('./scrapers/greenhouse.scraper');


// Crawl Link that is submitted
exports.scrape = function(req, res) {

  var url = req.body.url;
  var scraperToUse;

  if(url.indexOf("linkedin") > -1) {
    scraperToUse = 'linkedin';
  } else if(url.indexOf("stackoverflow") > -1) {
    scraperToUse = 'stackoverflow';
  } else if(url.indexOf("angel.co") > -1) {
    scraperToUse = 'angel';
  } else if(url.indexOf("indeed") > -1) {
    scraperToUse = 'indeed';
  } else if(url.indexOf("dice") > -1) {
    scraperToUse = 'dice';
  } else if(url.indexOf("theresumator") > -1) {
    scraperToUse = 'theresumator';
  } else if(url.indexOf("boards.greenhouse") > -1) {
    scraperToUse = 'greenhouse';
  } else {
    return res.send({companyName: "", positionTitle: "", jobDetails: ""});
  }

  scrapers[scraperToUse].scrape(url, function(data) {
    // console.log('data from scraper: ', data);
    res.json(data);
  });


};

















// Get list of joblinks
exports.index = function(req, res) {
  Joblink.find(function (err, joblinks) {
    if(err) { return handleError(res, err); }
    return res.json(200, joblinks);
  });
};

// Get a single joblink
exports.show = function(req, res) {
  Joblink.findById(req.params.id, function (err, joblink) {
    if(err) { return handleError(res, err); }
    if(!joblink) { return res.send(404); }
    return res.json(joblink);
  });
};

// Creates a new joblink in the DB.
exports.create = function(req, res) {
  Joblink.create(req.body, function(err, joblink) {
    if(err) { return handleError(res, err); }
    return res.json(201, joblink);
  });
};

// Updates an existing joblink in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Joblink.findById(req.params.id, function (err, joblink) {
    if (err) { return handleError(res, err); }
    if(!joblink) { return res.send(404); }
    var updated = _.merge(joblink, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, joblink);
    });
  });
};

// Deletes a joblink from the DB.
exports.destroy = function(req, res) {
  Joblink.findById(req.params.id, function (err, joblink) {
    if(err) { return handleError(res, err); }
    if(!joblink) { return res.send(404); }
    joblink.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}