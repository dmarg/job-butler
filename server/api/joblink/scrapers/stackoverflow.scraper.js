'use strict';

var _ = require('lodash');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.scrape = function(url, cb) {

  console.log(url);

  request(url, function(error, response, body){

    // console.log(body);
    var job = {companyName: "", positionTitle: "", jobDetails: ""};

    if(error) {
      cb({error: error});
    }

    if(!error) {
      var $ = cheerio.load(body);

      var companyName, positionTitle, jobDetails;

      $('.employer').filter(function() {
        var data = $(this);
        companyName = data.text()
        job.companyName = companyName;
      })

      $('#title .job-link').filter(function(){
        var data = $(this);
        positionTitle = data.text();
        job.positionTitle = positionTitle;
      })

      $('.description').filter(function() {
        var el = $(this);
        job.jobDetails += $(el).text() + "\n";
      })

    }
    // console.log("scraped: ", job);
    cb(job);

  })

}