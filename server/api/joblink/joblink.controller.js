'use strict';

var _ = require('lodash');
var Joblink = require('./joblink.model');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


// Crawl Link that is submitted
exports.scrape = function(req, res) {

  var url = req.body.url;

  console.log(url);


  if(url.indexOf("linkedin") > -1) {
    request(url, function(error, response, body){

      // console.log(body);

      if(error) {
        console.log('error: ', error);
        return res.send({error: error});
      }

      if(!error) {
        var $ = cheerio.load(body);

        var companyName, positionTitle, description, skills, benefits;
        var job = {companyName: "", positionTitle: "", description: "", skills: "", benefits: ""};

        $('h1[itemprop="title"]').filter(function(){
          var data = $(this);
          positionTitle = data.text();
          job.positionTitle = positionTitle;
        })

        $('span[itemprop="name"]').filter(function() {
          var data = $(this);
          companyName = data.text()
          job.companyName = companyName;
        })


        $('.description-section li, .description-section p').filter(function() {
          var el = $(this);
          console.log('el: ', el['0']);
          if(el['0'].name === 'li') {
            job.description += "- " + $(el).text() + "\n";
          } else {
            job.description += $(el).text() + "\n";
          }
        })

        // $('div[itemprop="description"]').filter(function() {
        //   var data = $(this);
        //   console.log('data: ', data)
        //   description = data.text()
        //   console.log('description: ', description);

        //   job.description = description;
        // })

      }

      return res.send(job);

    })
  } else {
    return res.send({url: 'not found'});
  }


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