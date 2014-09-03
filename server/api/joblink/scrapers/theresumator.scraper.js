'use strict';

var _ = require('lodash');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.scrape = function(url, cb) {
    console.log(url);

    request(url, function(error, response, body) {

        var job = {
            companyName: "",
            positionTitle: "",
            jobDetails: ""
        };

        if (error) {
            cb({
                error: error
            });
        }

        if (!error) {
            var $ = cheerio.load(body);

            var companyName, positionTitle, jobDetails;

            $('title').filter(function() {
                var data = $(this);
                var companyInfo = data.text();
                var companyInfoArr = companyInfo.split('-');

                positionTitle = companyInfoArr[0].replace('\n\t\t', '');
                companyName = companyInfoArr[1].replace('\n\t\t','');

                job.companyName = companyName;
                job.positionTitle = positionTitle;
            });

            $('#resumator-job-description').filter(function() {
                var el = $(this);
                // console.log('el: ', el['0']);
                if (el['0'].name === 'li') {
                    job.jobDetails += "- " + $(el).text() + "\n";
                } else {
                    job.jobDetails += $(el).text() + "\n";
                }
            })
        }

        cb(job);
    })
};