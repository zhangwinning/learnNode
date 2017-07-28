### 可读流介绍

上图了

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/005.png)

```js
var http = require('http');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'person.txt');

var myReadStream = fs.createReadStream(filePath);

myReadStream.on('data', function(chunk) {
	console.log('this is chunk data');
	console.log(chunk);
});
```
* 因为可读流继承自`EventEmitter`事件,而可读流有一个`data`事件,当可读流的`buffer`满了,触发这个事件,从而打印出来。

* 我们还可以告知当可读流的`buffer`数据满了,指定数据格式为`utf8`,`var myReadStream = fs.createReadStream(filePath, 'utf8');`可以显示数据格式为字符串。