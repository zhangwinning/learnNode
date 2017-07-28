var http = require('http');
var fs = require('fs');
var config = require('../config.js');
var path = require('path');

const sourcePath = path.join(config.dir, '1.jpg');


var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(sourcePath);
    stream.pipe(res);
});
server.listen(8000);