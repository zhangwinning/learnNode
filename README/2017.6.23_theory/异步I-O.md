## 异步I/O

事实上,异步最早存在于操作系统的底层.在操作系统中,异步通过信号量,消息等方式有了广泛的应用,
伴随着异步I/O的还有事件驱动和单线程,它们是构成Node的基调

* 异步I/O的优势
* 异步I/O
* 单线程
* 跨平台

## 异步I/O的优势

* 用户体验
* 资源分配

在`资源分配`中分析一下:
如果业务场景中有`多个互不相干的任务`要完成,现在主流的方式有两种:

* <span style="color:blue">单线程串行依次执行</span>
* <span style="color:blue">多线程并行完成</span>

而Node在两者之间给出了它的方案:<span style="color:blue">利用单线程</span>,远离多线程死锁,状态同步等问题(多线程并行的问题),
<span style="color:blue">利用异步I/O</span>,让单线程远离阻塞,更好的使用CPU(单线程串行问题);

然而Node是单线程的,依旧无法利用多核CPU,为弥补这个缺陷,Node提供了类似前端的Web workers
的子进程,该子进程可以通过工作线程高效利用CPU和I/O.

## 异步I/O

* 理想的非阻塞异步I/O
理想的异步I/O应该是应用程序发起异步调用, 而不需要进行轮询，进而处理下一个任务，
只需在I/O完成后通过信号或是回调将数据传递给应用程序即可。
![理想的异步I-O模型.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/理想的异步I-O模型.png?raw=true)


## 相关链接

https://nodejs.org/api/stream.html
