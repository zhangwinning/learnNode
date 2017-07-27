var  http = require('http')
http.createServer((request, response) => {
	console.log(request.url);
	console.log(request.headers);
	const chunks = [];
	request.on('data', chunk => chunks.push(chunk));
	request.on('end', () => {
		const data = Buffer.concat(chunks);
		console.log('Data: ', data);
		console.log('Data: ', data.toString());
	})
	response.end('hello \n')
}).listen(8080);
console.log('服务器启动完成');