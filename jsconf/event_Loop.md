今天看到一个不错的视频是讲述js的[event-loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)索性记录下来，方便下次查看。
 
 下面先看第一张图(js的 Runtime)(https://github.com/WenNingZhang/learnNode/blob/master/jsconf/event_Loop/screenshot.png)
 
- 这里`heap`的作用是分配内存大小,而`stack`是处理上下文环境的地方,也就是执行代码程序的地方.
 
- 后来发现`setTimeout `或者`HTTP request`竟然没有在`stack`中执行,这里要研究一下喽。
 
 再来第二张图解释这个疑问
 (https://github.com/WenNingZhang/learnNode/blob/master/jsconf/event_Loop/screenshot%202.png)
- 后来发现还有一些东西(例如called web APIs, event loop 和 callback queue)是由浏览器提供的.
- 而上面`setTimeout`, `HTTP`函数是则是在web APIs中运行的.这些函数的回调放到`callback queue`里面,通过event Loop 把在`callback queue`中的第一个取出来在放到`stack`中执行。

`one thread === one call stack === one thing at a time`

单线程的意思是同一时间只做一件事.

那么我们看一下下面的图来说明这件事.

screenshot1

运行这个函数我们要牢记调用栈的规律:如果我们运行这个函数,这个函数进栈,
如果从函数中返回,该函数出栈.

我们在浏览器开发中可能碰到过这样的代码


```
function foo() {
    throw new Error('Oops');
}

function bar() {
    foo();
}

function baz() {
    bar();
}

baz()

```
这里的输出结果是

```
/usr/local/bin/node test.js
/Users/zhangwenning/git/jfjun-cw/test.js:5
    throw new Error('Oops');
    ^

Error: Oops
    at foo (/Users/zhangwenning/git/jfjun-cw/test.js:5:11)
    at bar (/Users/zhangwenning/git/jfjun-cw/test.js:9:5)
    at baz (/Users/zhangwenning/git/jfjun-cw/test.js:13:5)
    at Object.<anonymous> (/Users/zhangwenning/git/jfjun-cw/test.js:16:1)
    
```
说明这个函数调用顺序是这样的.

说明`RangeError: Maximum call stack size exceeded`
还有一个例子:

```
function foo() {
    return foo();
}

foo();
```
图片:screenshot(2).png,这张图片显示了这些.

这里引出`阻塞`的概念，我们谈论`阻塞`的概念,其实`阻塞`没有特定`概念`，

其实`阻塞`我们就是程序运行的慢.

下面在看一张图4 ,

这里有网络请求，并且是同步操作，所以执行的慢了，所以我们定义为`阻塞`了

图片:

这里的解决方案,当然我们就采取异步调用了.

再来看一张图:

[5],这张图

**We log JSConfEU, clear, five seconds later somehow magically "there" appears on the stack**

这基本上是并发事件的由来.

然而开始说过js在同一个时间只能做一件事.

我们可以同时做多件事的原因是:浏览器不仅仅一个执行环境

查看下面这张图.screenshot(6)

JavaScript Runtime 同一时间只能做一件事情,但是浏览器提供了一些API是，这些APIs是高效的线程,因而可以实现并发性.

如果你是node开发者,这张图与node也是类似的,这里的web API是由c++API,

而多线程是通过c++隐藏的.

  
  I'm a single threaded single concurrent language  ‑‑ right. yeah, cool, I have a call stack, an event loop, a callback queue, and some other APIs and stuff
  
  这里说明了js是单线程单进程的。有一个调用stack, 一个事件循环,一个回调函数队列和其他的api.
