## Node特点

* 异步I/O
* 事件与回调函数
* 单线程
* 跨平台

## 异步I/O

异步最早用在前端的Ajax请求中

例子一:
```js
$.post('/url', {'title': '前端Ajax请求'}, () => {
    console.log('响应内容');
})
console.log('发送Ajax结束');
```

这段代码中先输出'发送Ajax结束',然后'响应内容',下图是一个经典的Ajax调用.
![fds](picture/AJAX请求.png)



## Readable Stream

以下都是nodejs中常见的Readable Stream，当然还有其他的，可自行查看文档。

* http.IncomingRequest
* fs.createReadStream()
* process.stdin
* 其他

例子一：

```js
var fs = require('fs');

fs.readFile('./sample.txt', 'utf8', function(err, content){
	// 文件读取完成，文件内容是 [你好，我是程序猿小卡]
	console.log('文件读取完成，文件内容是 [%s]', content);
});
```

例子二：

```js
var fs = require('fs');

var readStream = fs.createReadStream('./sample.txt');
var content = '';

readStream.setEncoding('utf8');

readStream.on('data', function(chunk){
	content += chunk;
});

readStream.on('end', function(chunk){
	// 文件读取完成，文件内容是 [你好，我是程序猿小卡]
	console.log('文件读取完成，文件内容是 [%s]', content);
});
```

例子三：

这里使用了`.pipe(dest)`，好处在于，如果文件

```js
var fs = require('fs');

fs.createReadStream('./sample.txt').pipe(process.stdout);
```

注意：这里只是原封不动的将内容输出到控制台，所以实际上跟前两个例子有细微差异。可以稍做修改，达到上面同样的效果

```js
var fs = require('fs');

var onEnd = function(){
	process.stdout.write(']');	
};

var fileStream = fs.createReadStream('./sample.txt');
fileStream.on('end', onEnd)

fileStream.pipe(process.stdout);

process.stdout.write('文件读取完成，文件内容是[');

// 文件读取完成，文件内容是[你好，我是程序猿小卡]
```

## Writable Stream

同样以写文件为例子，比如想将`hello world`写到`sample.txt`里。

例子一：

```js
var fs = require('fs');
var content = 'hello world';
var filepath = './sample.txt';

fs.writeFile(filepath, content);
```

例子二：

```js
var fs = require('fs');
var content = 'hello world';
var filepath = './sample.txt';

var writeStram = fs.createWriteStream(filepath);
writeStram.write(content);
writeStram.end();
```

## Duplex Stream

最常见的Duplex stream应该就是`net.Socket`实例了，在前面的文章里有接触过，这里就直接上代码了，这里包含服务端代码、客户端代码。

服务端代码：

```js
var net = require('net');
var opt = {
	host: '127.0.0.1',
	port: '3000'
};

var client = net.connect(opt, function(){
	client.write('msg from client');  // 可写
});

// 可读
client.on('data', function(data){
    // server: msg from client [msg from client]
	console.log('client: got reply from server [%s]', data);
	client.end();
});
```

客户端代码：

```js
var net = require('net');
var opt = {
	host: '127.0.0.1',
	port: '3000'
};

var client = net.connect(opt, function(){
	client.write('msg from client');  // 可写
});

// 可读
client.on('data', function(data){
    // lient: got reply from server [reply from server]
	console.log('client: got reply from server [%s]', data);
	client.end();
});
```

## Transform Stream

Transform stream是Duplex stream的特例，也就是说，Transform stream也同时可读可写。跟Duplex stream的区别点在于，Transform stream的输出与输入是存在相关性的。

常见的Transform stream包括`zlib`、`crypto`，这里举个简单例子：文件的gzip压缩。

```js
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var inFile = fs.createReadStream('./extra/fileForCompress.txt');
var out = fs.createWriteStream('./extra/fileForCompress.txt.gz');

inFile.pipe(gzip).pipe(out);
```

## 相关链接

https://nodejs.org/api/stream.html