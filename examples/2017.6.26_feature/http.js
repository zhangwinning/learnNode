/**
 * Created by zhangwenning on 17/6/26.
 */
var http = require('http');
var querystring = require('querystring');

//监听服务器的request事件

http.createServer((req, res) => {
    var postData = '';
    req.setEncoding('utf8');

    //监听请求的data事件
    req.on('data', (chunk) => {
        postData += chunk;
    });

    //监听请求的end事件
    req.on('end', () => {
        req.end(postData);
    });
}).listen(8080);

console.log('服务器启动完成');