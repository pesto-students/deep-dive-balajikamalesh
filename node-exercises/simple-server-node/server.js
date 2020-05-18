const http = require('http');
const url = require('url');

class MyServer {
	constructor(){
		this.server = http.createServer(this.listener);
	}
	static Routes = [];

	listener = (req, res) => {
		let parsedUrl = url.parse(req.url,true);
		let path = parsedUrl.pathname; 
		
		let queryStringObject = parsedUrl.query;
		let model = path.split('/')[1];
		let id = path.split('/')[2];
		
		let method = req.method.toLowerCase();
		let headers = req.headers;

		let buffer = '';
		
		let chosenHandler = this.Routes.find(x => x.path == model);

		req.id = id;
		req.method = method;
		req.headers = headers;
		req.queryStringObject = queryStringObject;
		req.payload = buffer;

		if(method == 'get'){
			chosenHandler._get(req,res);
		} else if(method == 'post'){
			req.on('data', (chunk) => {
				req.body = chunk.toString('utf-8');
				chosenHandler._post(req,res);
			});	
		} else if(method == 'put'){
			req.on('data', (chunk) => {
				req.body = chunk.toString('utf-8');
				chosenHandler._put(req,res);
			});
		} else{
			chosenHandler._delete(req,res);
		}
	}

	listen = (port, callback) => {
		this.server.listen(port);
		callback();
	}
} 

module.exports = MyServer ;