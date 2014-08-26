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

      $('.g-title2').filter(function() {
        var data = $(this);
        companyName = data.text().split(' at ')[1];
        job.companyName = companyName;
      })

      $('.g-title2').filter(function(){
        var data = $(this);
        positionTitle = data.text().split(' at ')[0];
        job.positionTitle = positionTitle;
      })

      $('.about-section').filter(function() {
        var el = $(this);
        job.jobDetails += $(el).text();
      })

    }
    // console.log("scraped: ", job);
    cb(job);

  })

}