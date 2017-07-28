var http = require('http');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'person.txt');

var myReadStream = fs.createReadStream(filePath, 'utf8');

myReadStream.on('data', function(chunk) {
	console.log('this is chunk data');
	console.log(chunk);
});



