#### 利用stream下载图片

```js
var fs = require('fs'),
request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
});
	
```
这里的`request.head`是根据url构建请求头,request(uri)返回的是serverRequest对象,该对象是

是可读流对象,通过`pipe`方法写到可写流中去。同时pipe方法的返回对象监听`close`事件。