var express = require("express");
var path = require("path");
var mongo = require("mongodb").MongoClient;
var app = express();

var db_url = 'mongodb://localhost:27017/url_shortener';
var app_url = 'https://api-project3-br4in.c9users.io/';
var count = 0;

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
    
});

app.get('/:url', function(request, response) {
    // get url parameter, check if it exist in the db
    
    var input_short_url = request.params.url;
    console.log('Looking for ' + input_short_url + ' in db');
    findURL(input_short_url, response);
});

app.get('/new/:url*', function(request, response) {
    // get url parameter, check if it is a valid url
    // if valid, add it to the db and return result
    
    var url = request.url.substring(5);
    
    if (validateURL(url) == true) {
        // convert url to short format, then send them to InsertURL
        console.log('the inserted URL is valid');
        console.log('Inserting site to db');
        var short_url = generateURL(url);
        insertURL(url, short_url, response);
        count += 1;
    } else {
        var error = {
            'error': 'The url in not valid.'
        };
        response.send(error);
    }
    
});

// insert url in db
function insertURL(full_url, short_url, response) {
    mongo.connect(db_url, function(error, db) {
        if (error) throw error;
        var collection = db.collection('urls');
        var site = {
            'full_url': full_url,
            'short_url': short_url
        };
        collection.insert(site, function(error, data) {
            if (error) throw error;
            console.log(data);
            db.close();
        });
    });
    var result = {
        'full_url': full_url,
        'short_url': app_url + short_url
    };
    response.send(result);
}

// find short url in db
function findURL(short_url, response) {
    mongo.connect(db_url, function(error, db) {
       if (error) throw error;
       var collection = db.collection('urls');
       collection.find({
           short_url: short_url
       }).toArray(function(err, documents) {
        if (err) throw err;
        
        if (documents[0] !== undefined) {
            //console.log('url found: ' + documents[0].full_url);
            // ensure that url starts with 'https://' otherwise won't redirect
            
            if (documents[0].full_url.substring(0, 4) !== 'http') {
                response.redirect('http://' + documents[0].full_url);
            } else {
                response.redirect(documents[0].full_url); 
            }
            
        } else {
            var error = {
                'error': 'URL not found in database'
            };
            response.send(error);
        }
        db.close();
       });
    });
}

// validate url regex
function validateURL(url) {
    return /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(url);
}

// generate random short url
function generateURL() {

    var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var base = alphabet.length;
    var id = [];
    
    // pick 5 random element from the alphabet string
    for (var i = 0; i < 5; i++) {
        id.push(alphabet.charAt(Math.floor(Math.random() * base)));
    }
    return id.join('');
    
}

app.listen('8080', function() {
    console.log('Listening on port 8080');
});