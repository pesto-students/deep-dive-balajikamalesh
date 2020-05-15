const http = require('http');
const url = require('url');
const router = require('./lib/handler');
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function(req,res){

	let parsedUrl = url.parse(req.url,true);

	let path = parsedUrl.pathname; // if url is localhost:3000/foo/1 , path is foo (everything after 3000/)
	let trimmedPath = path.replace(/^\/+|\/+$/g,'');
	
	let queryStringObject = parsedUrl.query;
	let model = path.split('/')[1];
	let id = path.split('/')[2];
	
	let method = req.method.toLowerCase();

	let headers = req.headers;

	//Get the payload if there is any (only POST and PUT Requests will have payload(body))
	let decoder = new StringDecoder('utf-8');
	let buffer = '';
	
	//called only when req has payload
	req.on('data',function(data){
		buffer += decoder.write(data);
	});

	//called for every request
	req.on('end',function(){
		buffer += decoder.end();

		//choose the handler this request should go to, if not found then redirect to noFound
		let chosenHandler = router[model] !== undefined ? router[model] : router['notFound'];

		//data object to sent to the handler
		let data = {
			'trimmedPath': trimmedPath,
			'queryStringObject': queryStringObject,
			'id': id,
			'method': method,
			'headers': headers,
			'payload': buffer
		};

		chosenHandler(data,function(statusCode,payload){
			//use the status code returned by handler or set it ot default
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

			//use the callback payload or set to empty object
			payload = typeof(payload) == 'object' ? payload : {};

			//convert payload to string
			let payloadString = JSON.stringify(payload);

			//return response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

		})
	})
});

module.exports = server ;