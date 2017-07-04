/**
 * Created by zhangwenning on 17/6/28.
 */
const net = require('net');
const fork = require('child_process').fork;

var workers = [];
for (var i = 0; i < 4; i++) {
    workers.push(fork('./worker01'));
}

var handle = net._createServerHandle('0.0.0.0', 3000);
handle.listen();
handle.onconnection = function (err,handle) {
    var worker = workers.pop();
    worker.send({},handle);
    workers.unshift(worker);
}