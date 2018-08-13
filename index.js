var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');


var node_variables = {
  "pagetitle" : process.env.PAGETITLE || "PAGETITLE",
  "headline" : process.env.HEADLINE || "HEADLINE",
  "description" : process.env.DESCRIPTION || "DESCRIPTION",
  "url_homepage": process.env.URL_HOMEPAGE || "https://www.example.com",
  "email": process.env.URL_HOMEPAGE || "your@email.com",
  "url_image" : process.env.URL_IMAGE || "https://googlechrome.github.io/samples/picture-element/images/kitten-large.png",
  "url_footer_left_name" : process.env.URL_FOOTER_LEFT_NAME || "ABCDEFGHIJKLM-LEFT",
  "url_footer_left" : process.env.URL_FOOTER_LEFT || "https://www.example.com/footer_left",
  "url_footer_right_name" : process.env.URL_FOOTER_RIGHT_NAME || "ABCDEFGHIJKLM-RIGHT",
  "url_footer_right" : process.env.URL_FOOTER_RIGHT || "https://www.example.com/footer_right",
  "url_font_bold" : process.env.URL_FONT_BOLD || "",
  "url_font_bold_name" : process.env.URL_FONT_BOLD || "",
  "url_font_normal" : process.env.URL_FONT_BOLD || "",
  "url_font_normal_name" : process.env.URL_FONT_BOLD || ""
}

const content = "var env = " + JSON.stringify(node_variables);

fs.writeFile("./public/env.js", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("saved")
}); 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


 app.get(/^(.+)$/, function(req, res){ 
    file = __dirname + "/public"  + req.params[0]
    console.log(file)
    if(!fs.existsSync(file)) {
      console.log(file);
      res.redirect('/');
    } else {
          res.sendfile(file); 
    }
 });


 
app.listen(8085);
