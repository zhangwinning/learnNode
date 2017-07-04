/**
 * Created by zhangwenning on 17/6/28.
 */
const net = require('net');
const fork = require('child_process').fork;

var handle = net._createServerHandle('0.0.0.0', 3000);

for(var i=0;i<4;i++) {
    fork('./worker').send({}, handle);
}