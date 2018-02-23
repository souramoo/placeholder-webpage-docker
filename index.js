var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var title = process.env.TITLE;
var description = process.env.DESCRIPTION;
var url = process.env.URL;
var name = process.env.NAME;


var stream = fs.createWriteStream("public/docker_vals.js");
stream.once('open', function(fd) {
  stream.write("var title = '" + title + "'\n");
  stream.write("var description = '" + description + "'\n");
  stream.write("var url = '" + url + "'\n");
  stream.write("var name = '" + name + "'\n");
  stream.end();
});


 app.get(/^(.+)$/, function(req, res){ 
     // console.log('static file request : ' + req.params, {docker_test_value:docker_test_value});
      //app.use(express.static(__dirname + '/'));

file = __dirname + "/public"  + req.params[0]
console.log(file)
if(!fs.existsSync(file)) {
  console.log(file);
  res.redirect('/');
} else {
      res.sendfile(file); 
      //console.log("------------")
      //console.log(__dirname)
      //console.log(req.params[0])
}
     //res.render(__dirname + req.params[0], {docker_test_value:docker_test_value});
 });


 
app.listen(8085);