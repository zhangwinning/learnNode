/**
 * Created by zhangwenning on 17/6/28.
 */

const net = require('net');
const WriteWrap = process.binding('stream_wrap').WriteWrap;
const channel = process._channel;
var buf = 'hello Node.js';
var res = ['HTTP/1.1 200 OK', 'content-length:' + buf.length].join('\r\n') + '\r\n\r\n' + buf;

channel.ref();
channel.onread = function (len, buf, handle) {
    var socket = new net.Socket({
        handle: handle
    });
    socket.readable = socket.writable = true;
    socket.end(res);
}