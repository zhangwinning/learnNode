/**
 * Created by zhangwenning on 17/6/28.
 */

/*
*
* https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/
* http://www.alloyteam.com/2015/08/nodejs-cluster-tutorial/
*
* */

const net = require('net');
process.on('message', function(m, handle) {
    start(handle);
});

var buf = 'hello nodejs';
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;

function start(server) {
    server.listen();
    server.onconnection = function(err,handle) {
        console.log('got a connection on worker, pid = %d', process.pid);
        var socket = new net.Socket({
            handle: handle
        });
        socket.readable = socket.writable = true;
        socket.end(res);
    }
}