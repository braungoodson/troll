var express = require('express.io');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var database = null;
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
http.post('/users/:username/:password/keys/:public',httpPost_users);
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
		var cypher = null;
		var authorizationKey = cypher;
		var users = database.collection('users');
		var user = {username:request.params.username,password:request.params.password,keys:{public:request.params.keys.public,authorization:authorizationKey}};
		users.insert(user,function usersInsert_callback (error,objects) {
			if (error) {
				console.warn(error.message);
				response.send('{}');
			}
			if (error && error.message.indexOf('E11000 ') !== -1) {
				console.warn(error.message);
				response.send('{"error":"username already exists."}');
			}
			response.send(JSON.stringify(objects));
		});
	}
}