var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


var pageToVisit = "https://mediatropy.com/";
console.log("Visiting page " + pageToVisit);
request(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     console.log("Page title:  " + $('title').text());
   }

   if(response.statusCode === 200) {
    // Parse the document body
    var $ = cheerio.load(body);
    console.log("Head Script:  " + $('script').text());
  }
});
