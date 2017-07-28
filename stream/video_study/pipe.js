
var fs = require('fs');
var path = require('path');

var sourcePath = path.join(__dirname, 'person.txt');
var desPath = path.join(__dirname, 'person1.txt');

var myReadStream = fs.createReadStream(sourcePath);
var myWriteStream = fs.createWriteStream(desPath);

myReadStream.pipe(myWriteStream);