'use strict';

var express = require('express');
var Activity = require('./lib/proto/activity.js');

var app = express();

var port = process.env.PORT || 3000;

//static resources directories§
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function serve(req, res) {
	res.send('Hello World');
});

var activity = new Activity();

app.get('/start', function serve(req, res) {
	activity.start();
});

app.get('/stop', function serve(req, res) {
	activity.stop()
});

app.listen(port, function init(err) {
	if (err) {
		console.log('server failed to start with error: ' + err);
		return;
	}

	console.log('running server on port ' + port);
});

activity.start();

setTimeout(function(){ 
	activity.stop()
}, 2000);

var activity2 = new Activity(500, function() {
	console.log('activity ' + activity2.id + ' custom work method');
});

activity2.start();

setTimeout(function(){ 
	activity2.stop()
}, 5000);