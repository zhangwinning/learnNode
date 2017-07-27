//设置http服务器的请求事件。

console.log('starting');
var server = require('http').createServer();

server.on('connection',function(socket){console.log('*server/connection');});
server.on(
    'request',
    function(request, response){
        console.log('*server/request');
        request.on(
            'data',
            function(chunk){
                console.log('*request/data');
                // <!> How do I abort next data calls from here?
            }
        );
        request.on(
            'end',
            function(){
                console.log('*request/end');
                response.writeHead(200,"OK");
                response.write('Hello');
                response.end();
            }
        );
    }
);
server.listen(8080);
console.log('started');