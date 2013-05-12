//ports to listen on
var expressPort = 8081;

//express
var express = require('express');
var app = express();

//jade
var jade = require('jade');

//config express
app.configure(function() {
    app.use(express.compress());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({
        secret: 'sessionbrinksecret'
    }));
    app.use(express.static(__dirname + '/static'));
    app.use(app.router);
});

//mongoskin
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/testApp?auto_reconnect', {safe: true});

app.get('/', function(req, res) {
    res.render("index");
});

app.listen(expressPort);
console.log('Express on port: ' + expressPort);