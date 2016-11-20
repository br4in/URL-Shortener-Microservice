var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
});

app.get('/new/:query', function(request, response) {
   var url = request.params.query;
   response.send(url);
});

app.listen('8080');