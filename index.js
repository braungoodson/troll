var http = require('http');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var database = null;
var collection = null;
mongoClient.connect('mongodb://localhost:20000/facebyte',function(error,_database){
	if (error) {
		throw error;
	} else {
		database = _database;
		collection = database.collection('facebyte');
	}
});
http.createServer(function createServer_handler (request,response) {
	response.writeHead(200,{'Content-Type': 'text/plain'});
	response.end('facebyte.io\n');
}).listen(30000);
