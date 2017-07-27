//测试通过res设置响应头部

var  http = require('http')
http.createServer((request, response) => {
	response.writeHead(200, {'content-type': 'text/plain'});
	response.write('hello \n');
	response.end('world \n');
}).listen(8080);
console.log('服务器启动完成');