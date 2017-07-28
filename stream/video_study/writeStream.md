### 可写流介绍

```js
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
```

* 可写流要有一个`目标地址`用来指明可写流要写到什么地方去。
* 可读流读出数据后,可写流通过write方法直接写回去。
* 因为我们经常从可读流中读取数据,然后写到可写流中去,最后发送数据,然而我们还有一个更快的
  方式处理这个流程,那就是pipe。

```js
in fact because we do this so often reading streams then  writing streams
and sending data from one place to another 
this is actually a way to do this even quick than all of this that we have done  pipes 
```