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

      $('.company span').filter(function() {
        var data = $(this);
        companyName = data.text()
        job.companyName = companyName;
      })

      $('#top-card .title').filter(function(){
        var data = $(this);
        positionTitle = data.text();
        job.positionTitle = positionTitle;
      })

      $('.rich-text, .rich-text li, .rich-text p').filter(function() {
        var el = $(this);
        // console.log('el: ', el['0']);
        if(el['0'].name === 'li') {
          job.jobDetails += "- " + $(el).text() + "\n";
        } else {
          job.jobDetails += $(el).text() + "\n";
        }
      })

    }
    // console.log("scraped: ", job);
    cb(job);

  })

}