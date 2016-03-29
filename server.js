// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var _ = require('underscore');

var app = express();
var port = process.env.PORT || 9090;
var urlencodedParser = bodyParser.urlencoded({extended: false});

// id, user name, create time, message body.
var messages = JSON.parse(fs.readFileSync("./public/src/messages.json"));


function sendPosts(req, res) {
var compiled = _.template(
"<div class='message' id=\"<%= id %>\">" +
  "<p class='message-body'><%= messageBody %></p>" +
  "<label for='like-button'><%= likes %></label><input type='button' value='Like' id='like-button' onclick='operation(\"/like\", \"<%= username %>\")'>" +
  "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
  "<label for='dislike-button'><%= dislikes %></label><input type='button' value='Dislike' id='didlike-button' onclick='operation(\"/dislike\", \"<%= username %>\")'></label>" +
  "<p class='create-time'><%= createTime %></p>" +
  "<p class='user-name'>---From:&nbsp;<%= username %></p>" +
//  "<div class='comments'><%= (function() { return comments.join('<br /><br />') })() %> </div>" +
"</div>"
);

var str = "";
messages.forEach( function(p) {
 str += compiled(p);
});
res.end( str );
}


app.use(express.static(path.join(__dirname, '/public')));

app.set('trust proxy', 1); // trust first proxy
app.use(session({ name: 'server-session-cookie-id',
                  secret: 'my express secret',
                  resave: false,
                  saveUninitialized: true,
                  store: new FileStore(),
                  cookie: { maxAge: 600000 }}));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/sid', function(req, res) {
  res.end(req.sessionID);
});


app.get('/msg', function(req, res) {
  sendPosts(req, res);
});


app.post('/add', urlencodedParser, function(req, res) {
  var msg = {
    id: req.sessionID,
    username: req.body.username,
    createTime: (new Date()).toLocaleString(),
    messageBody: req.body.msgbody,
    likes: 0,
    dislikes: 0
  };
  messages.push(msg);
  console.log(msg);
  fs.writeFileSync("./public/src/messages.json", JSON.stringify(messages));
  res.end();
});


app.post('/like', urlencodedParser, function(req, res) {
  messages.forEach(function (item) {
    if(item.username === req.body.username) {
      item.likes++;
    }
  });
  res.end();
  //console.log(messages);
});

app.post('/dislike', urlencodedParser, function(req, res) {
  messages.forEach(function (item) {
    if(item.username === req.body.username) {
      item.dislikes++;
    }
  });
  res.end();
  //console.log(messages);
});



function IDGenerator() {

  this.length = 8;
  this.timestamp = +new Date;

  var _getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split("").reverse();
    var id = "";

    for (var i = 0; i < this.length; ++i) {
      var index = _getRandomInt(0, parts.length - 1);
      id += parts[index];
    }

    return id;
  }

}


app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
