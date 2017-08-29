var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');

var server = require('net').createServer();
server.on('connection',function(socket){
    socket.end('handled by master \n');
});

server.listen(1337, function(){
	child1.send('server', server);
	child2.send('server', server);
});
