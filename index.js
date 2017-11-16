// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();


// DB setting
mongoose.connect(process.env.MONGODB, { useMongoClient: true});
var db = mongoose.connection;
db.once('open', function() {
    console.log('DB connected.');
});
db.on('error', function(err) {
    console.log('DB ERROR : ', err);
});

// Middleware setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname +  '/public')); // html, css, js resource 저장 폴더
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));

// Port setting
app.listen(app.get('port'), function() {
    console.log('Express Server Running on : ', app.get('port'));
});