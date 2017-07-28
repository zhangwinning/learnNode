var http = require('http');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'person.txt');
var desPath = path.join(__dirname, 'person.txt1');

var myReadStream = fs.createReadStream(filePath);
var myWriteStream = fs.createWriteStream(desPath);

myReadStream.on('data', function(chunk) {
	console.log('this is chunk data');
	myWriteStream.write(chunk);
});



