var express = require('express.io');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var database = null;
var collection = null;
mongoClient.connect('mongodb://localhost:20000/facebyte',function(error,_database){
	if (error) {
		throw error;
	} else {
		database = _database;
	}
});
var http = express();
http.http().io();
http.get('/',httpGet_index);
http.get('/users',httpGet_users);
http.post('/users/:username/:password',httpPost_users);
http.listen(process.env.PORT||30000);
function httpGet_index (request,response) {
	response.send('facebyte.io\n');
}
function httpGet_users (request,response) {
	if (database) {
		var users = database.collection('users');
		users.find().toArray(function(e,r){
			var json = null;
			if (e) {
				json = JSON.stringify(e);
			}
			json = JSON.stringify(r);
			response.send(json);
		});
	}
}
function httpPost_users (request,response) {
	if (database) {
		var users = database.collection('users');
		var json = null;
		users.insert({username:'braungoodson',password:'braungoodson'});
	}
}
