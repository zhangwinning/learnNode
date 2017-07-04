/**
 * Created by zhangwenning on 17/6/28.
 */
/**
 * http://taobaofed.org/blog/2015/11/10/nodejs-cluster-2/
 */
const WriteWrap = process.binding('stream_wrap').WriteWrap;
const net = require('net');
const fork = require('child_process').fork;

var workers = [];
for(var i = 0; i < 4; i++) {
    workers.push(fork(__dirname + '/worker02.js'));
}

var handle = net._createServerHandle('0.0.0.0', 3000);
handle.listen();
handle.onconnection = function (err,handle) {
    var worker = workers.pop();
    var channel = worker._channel;
    var req = new WriteWrap();
    channel.writeUtf8String(req, 'dispatch handle', handle);
    workers.unshift(worker);
}
