const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

//set dynamic views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('public'));
//route untuk halaman home
app.get('/',(req, res) => {
  //render file index.hbs
  res.render('index');
});

app.use(bodyParser());
app.post('/scraper',function(req, res, next){
    var urlwebsite = req.body.urlwebsite;
    console.log(urlwebsite);

    var pageToVisit = urlwebsite;
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
    var txt='';
    $('script').each(function(){
      var text=$(this).text();
      if(text.indexOf('https://www.googletagmanager.com/gtm.js') > -1){
        var cari="(window,document,'script','dataLayer',";
        var pos=text.indexOf(cari);
        if(pos > -1){
          pos=pos+cari.length;
          var text=text.substr(pos,text.length-pos);
          var pos=text.indexOf(')');
          if(pos > -1){
            text=text.substr(0,pos);
          }
          
          text=text.replace(/'/gi,'');
          txt+=text;
          
          console.log(text);
        }
      }
    });
    res.render('index', { gtm: txt});
    // console.log("Head Script:  " + $('script').text());
  }
});

});


 
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});