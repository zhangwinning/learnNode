### 这篇文章会回答一个http请求到达服务器时,服务器是如何处理的?

* Node如何实现`高并发`的?

  * Node 的http模块包括对http请求的封装。在Node中,http服务继承自tcp服务器(net模块),它能够与多个客户端保持连接,由于其采用`事件驱动`的形式,并不为每个连接创建额外线程,保持很低的内存占用,所以能够实现`高并发`。

* tcp服务和http服务的区别?

  * tcp服务是以`connection`为单位进行服务的,而http服务是以`request`为单位进行服务的。

  * http服务把`connection`到`request`这个过程进行了封装。

* http模块从`connection`到`request`这个过程具体做了什么?

  * http模块把连接所用的`套接字`抽象为`ServerRequest`和`ServerResponse`对象,它们对应请求和响应操作。

  * 当请求产生的过程中,http模块拿到连接中传过来的数据,调用二进制模块的`http_parser`进行解析,在解析完报文内容后,触发`request事件`,而`request事件`的监听器则是http.createServer([requestListener]),从而在这儿就处理用户的业务逻辑。

* http请求

```js
var http = require('http')
http.createServer((request, response) => {
	console.log(request.url);
	console.log(request.headers);
	const chunks = [];
	request.on('data', chunk => chunks.push(chunk));
	request.on('end', () => {
		const data = Buffer.concat(chunks);
		console.log('Data: ', data);
		console.log('Data: ', data.toString());
	})
	response.end('hello \n')
}).listen(8080);

console.log('服务器启动完成');
  
```
这里如果通过`curl -X GET 'http://localhost:8080/locations?id=3'` get 方式请求时,

```js
/locations?id=3				//这里是request.url的值,说明server对于get请求的参数回直接从url中获取。
{ host: 'localhost:8080',
  'user-agent': 'curl/7.43.0',
  accept: '*/*' }
Data:  <Buffer >
Data:
```
如果通过`curl -H "Content-Type: application/json" -X POST -d '{"username":"zwn"}' http://localhost:8080` post方式请求时,

```js
/		//这里是request.url的值
{ host: 'localhost:8080',
  'user-agent': 'curl/7.43.0',
  accept: '*/*',
  'content-type': 'application/json',
  'content-length': '18' }
Data:  <Buffer 7b 22 75 73 65 72 6e 61 6d 65 22 3a 22 7a 77 6e 22 7d>
Data:  {"username":"zwn"}

```
说明post请求的数据是通过request的`data`事件触发获得的。

这里报文头是通过二进制模块的`http_parser`解析的,因此get请求的url可以解析出来,但是post请求中数据放到了请求体中了,因此只能通过程序获取报文体的数据了。

* http响应

http封装了对底层连接的写操作,可以将其看成一个可写的流对象,它通过`res.setHeader()`和`res.writeHead()`设置响应头部。

```js
var http = require('http')
http.createServer((request, response) => {
	response.writeHead(200, {'content-type': 'text/plain'});
	response.end('hello \n');
}).listen(8080);
console.log('服务器启动完成');

```
通过`curl -H "Content-Type: application/json" -X POST -d '{"username":"zwn"}' http://localhost:8080 -i` 加上一个`-i`在客户端处显示响应头的信息如下:

```js

HTTP/1.1 200 OK
content-type: text/plain
Date: Thu, 27 Jul 2017 08:01:25 GMT
Connection: keep-alive
Transfer-Encoding: chunked

hello
```
这里有个坑,setHeader()可以调用多次,但是只有调用writeHead()后,报文才会写到连接中。

报文体部分则是通过res.write()和res.end()

方法的调用,write和end方法都可以把数据发送的客户端,但是res.end()

发送完数据之后,会将此次请求得问客户端关闭,而res.write()则不会关闭。

* http服务器的事件

http服务器是一个`EventEmitter`事件。

	* 



