var express = require("express");
var app = express();

app.get('/', function(request, response) {
   response.send('coming soon'); 
});

app.listen('8080');