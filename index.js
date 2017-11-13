var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080

 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });

app.listen(8085);