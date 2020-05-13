/* This is the primary file for the API*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//The server should respond to all requests with a string
var server = http.createServer(function(req,res){

	//Get the url and parse it
	var parsedUrl = url.parse(req.url,true);

	//Get the path
	var path = parsedUrl.pathname; // if url is localhost:3000/foo , path is foo (everything after 3000/)
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');
	
	//Get the query string as an object
	var queryStringObject = parsedUrl.query;
	
	//Get the HTTP method
	var method = req.method.toLowerCase();
	
	//Get the headers as an object
	var headers = req.headers;


	//Get the payload if there is any (only POST and PUT Requests will have payload(body))
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	
	//called only when req has payload
	req.on('data',function(data){
		buffer += decoder.write(data);
	});

	//called for every request
	req.on('end',function(){
		buffer += decoder.end();

		//choose the handler this request should go to, if not found then redirect to noFound
		var chosenHandler = router[trimmedPath] !== undefined ? router[trimmedPath] : router['notFound'];

		//data object to sent to the handler
		let data = {
			'trimmedPath': trimmedPath,
			'queryStringObject': queryStringObject,
			'method': method,
			'headers': headers,
			'payload': buffer
		};

		// console.log('chose', chosenHandler);

		chosenHandler(data,function(statusCode,payload){
			//use the status code returned by handler or set it ot default
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

			//use the callback payload or set to empty object
			payload = typeof(payload) == 'object' ? payload : {};

			//convert payload to string
			var payloadString = JSON.stringify(payload);

			//return response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			console.log(statusCode);
			console.log(data.headers);
			console.log(payloadString);
		})
	})
	

});

//start the server and listen on port 3000
server.listen(4000,function(){
	console.log('The server is listening on port 4000 now!!!');
})

var handlers = {};

handlers.sample = function(data,callback) {
	callback(406,{'message': 'sample handler'})
}

handlers.hello = function(data,callback) {
	callback(406,{'message': 'hello'})
}

handlers.notFound = function(data,callback) {
	callback(404, {'message': 'Path not found'});
}

//routes
var router = {
	'sample': handlers.sample,
	'hello': handlers.hello,
	'notFound': handlers.notFound
}