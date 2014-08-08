/*jshint node: true*/
var config = require('./config/config.js');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var rewrite = require("connect-url-rewrite");
var morgan  = require('morgan')

// Some redirect rules too keep url's looking good.
var rules = [
  "^\/Cars /",
  "^\/Phones /",
  "^\/Services /",
  "^\/ad\/(.+) /"
];

var app = express();
app.use(rewrite(rules));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(validator());
app.use(session(config.session));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

if(config.logging.enabled){
    var morgan = require("morgan");
    var loggingOptions = config.logging.options;
    if(config.logging.file !== false) {
        var dir = path.dirname(config.logging.file);

        if(fs.existsSync(dir) === false){
            fs.mkdirSync(dir);
        }

        var ws = fs.createWriteStream(config.logging.file, {flags: 'a'});
        loggingOptions.stream = ws;
    }

    app.use(morgan(loggingOptions));
}

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));

//loads main controller and sub-controllers
require('./controller/controller.js')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    var error = {
        status : err.status || 500,
        result : false,
        message : err.message || err
    }

    res.json(error.status, error);
});

var port = config.server.port || 3000;
if(config.server.ssl.use_ssl !== true) {
    http.createServer(app).listen(port, function() {
        console.log('Listening on http port ' + port);
    });
} else {
    var opts = {
        key: fs.readFileSync(config.server.ssl.key),
        cert: fs.readFileSync(config.server.ssl.certificate)
    };

    https.createServer(opts, app).listen(port, function() {
        console.log('Listening on https port ' + port);
    });
}