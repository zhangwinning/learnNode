## Node特点

* 异步I/O
* 事件
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

这段代码中先输出'发送Ajax结束',然后'响应内容',下图是一个经典的Ajax调用
![AJAX请求.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/AJAX请求.png?raw=true)

而在Node中,异步也常见

例子二:
```js
var fs = require('fs');
fs.readFile('/path', (err, file) => {
    consoel.log('读取文件结束')
});
console.log('end');
```

这里的先输出'end', 在输出'读取文件结束',如图这是Node中经典的异步调用
![Node异步请求.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/Node异步请求.png?raw=true)

## 事件
Evented I/O for V8 JavaScript, (基于V8引擎实现的事件驱动I/O);

事件也是先在前端应用的,Dom中的各种事件;在Ajax大规模应用之后,异步请求得到了更加广泛的认同,而Ajax是基于事件机制的

例子一:
```js
$.Ajax({
	'url':'/url',
	'method':'post',
	'data':[],
	'success':function(data) {
		//success事件
	}
});
```
这段代码我们给Ajax请求绑定success事件,在发出请求之后,只需关心成功之后我们要执行的业务逻辑代码即可

将前端浏览器中广泛且成熟的事件引入后端,配合异步I/O,将事件点暴露给业务逻辑

例子二
```js
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
```

对于服务器,我们绑定了request对象,对于请求对象,我们绑定了data和end事件

事件的编程方式是轻量级,松耦合,只关注事物点等优势

## 单线程

单线程在前端的体现是:在浏览器中js和UI共用一个线程,js长时间执行会导致UI渲染和响应被中断,
前端的解决方案是:Web Workers,Web Workers 可以通过创建工作线程来计算,以解决js大计算阻塞
UI渲染的问题.工作线程为了不阻塞主线程,通过消息传递的方式来传递运行结果,这也使得工作线程
不能访问主线程的UI

Node保持了js在浏览器中单线程的特点,它在弱势是
* 无法利用多核cpu
* 错误会引起整个应用的退出
* 大量计算导致CPU无法继续调用异步I/O

所以Node采用了和Web Workers 相同的思路解决大量计算的问题: child_process
通过将计算分发到各个子进程,可以将大量计算分解掉,然后在通过进程之间的事件消息来传递结果.
通过Master-Worker的管理方式,已达到更高的健壮性

## 跨平台

Node通过libuv实现跨平台,libuv实现跨平台的架构图

![libuv实现跨平台.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/libuv实现跨平台.png?raw=true)

## 相关链接

https://nodejs.org/api/stream.html
