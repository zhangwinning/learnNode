### pipe方法

先上图

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/pipe/001.png)

当数据填满`buffer`后,会触发可读流的`data`事件,然后调用可写流通过调用`write`事件把数据
写到文件中,这是'writeStream.js'的流程。

而上面的这个流程可以通过pipe方法完成。

再上图

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/pipe/002.png)

```js
var fs = require('fs');
var path = require('path');

var sourcePath = path.join(__dirname, 'person.txt');
var desPath = path.join(__dirname, 'person1.txt');

var myReadStream = fs.createReadStream(sourcePath);
var myWriteStream = fs.createWriteStream(desPath);

myReadStream.pipe(myWriteStream);	//这里就是pipe的作用
```