
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require("request");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//IP for aws: http://54.69.171.165/ 
var data = [
		    { id: 1, name: "bob", score: 5 },
		    { id: 2, name: "john", score: 10 },
		    { id: 3, name: "jake", score: 3 },
			];


app.get('/', function(req, res) {
  res.render('opener', { title: 'The index page!' })
});

app.get('/home', function(req, res) {
 

  //console.log(word);
  var url = "http://liketodaydata.gopagoda.com/feed/linksJSONStatic";

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {


			function sortByKey(array, key) {
			return array.sort(function(a, b) {
			    var x = a[key]; var y = b[key];
			    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});
			}

			weblist = sortByKey(body, 'score');


	        res.render('index', {some: weblist})
	    }
	})
	

});


var compAds = [ { "title" : "Mindsence - Software Developer (Junior)", "url" : "http://www.mindsense.co/jobs/apply?i=5&t=f" , "image_url": "http://www.mindsense.co/jobs/images/logo.png" } ,{ "title" : "Fitnet - iPhone 6 App” To The iPhone And iPad", "url" : "https://www.youtube.com/watch?v=krtRP0ct2Ng", "image_url": "https://i.ytimg.com/vi/krtRP0ct2Ng/maxresdefault.jpg" } ];

app.post('/subreq', function(req, res) {
	var query = req.body.searchF;
	console.log(query);
	//var query2 = "Static";
	var url = "http://liketodaydata.gopagoda.com/feed/linksJSON" + query;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {


			function sortByKey(array, key) {
			return array.sort(function(a, b) {
			    var x = a[key]; var y = b[key];
			    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});
			}

			weblist = sortByKey(body, 'score');


	        res.render('index', {some: weblist})
	    }
	    else
	    {
	    	res.send("Sorry, that channel does not exist yet!");
	    }
	})

});


app.get('/:tagId', function(req, res) {
 	var query = req.param("tagId");
	console.log(query);
	//var query2 = "Static";
	var url = "http://liketodaydata.gopagoda.com/feed/linksJSON" + query;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {


			function sortByKey(array, key) {
			return array.sort(function(a, b) {
			    var x = a[key]; var y = b[key];
			    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});
			}

			weblist = sortByKey(body, 'score');


	        res.render('index', {some: weblist})
	    }
	    else
	    {
	    	res.send("Sorry, this channel does not exist yet!");
	    }
	})
});


//app.get('/', function(req, res) {
//	res.sendfile(__dirname + '/public/index.html');
//});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
