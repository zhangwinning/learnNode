## 异步I/O

事实上,异步最早存在于操作系统的底层.在操作系统中,异步通过信号量,消息等方式有了广泛的应用,
伴随着异步I/O的还有事件驱动和单线程,它们是构成Node的基调

* 异步I/O的优势
* 异步I/O
* Node异步I/O模型
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
理想的异步I/O应该是应用程序发起异步调用, `而不需要进行轮询`，进而处理下一个任务，只需在I/O完成后通过信号或是回调将数据传递给应用程序即可。

理想的非阻塞异步I/O架构图:

![理想的异步I-O模型.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/理想的异步I-O模型.png?raw=true)

* 现实的异步I/O
和`理想的非阻塞异步I/O`的区别是要通过`轮询`技术获取数据
在单线程的情况下,通过让部分线程进行阻塞I/O操作+轮询技术来完成数据获取,让一个线程进行计算处理,通过线程之间的通信将I/O获取的数据进行传递,
可以实现异步I/O.

JavaScript是单线程的，但Node本身其实是多线程的，除了用户代码无法并行执行外，所有的I/O请求是可以并行执行的。

## Node异步I/O模型

* 事件循环
  `事件循环`被称为Node自身执行模型,
在进程启动时Node.js会创建一个类似于while（true）的循环，每次执行循环体的过程就是询问每个观察者是否有事件等待处理，如果有就取出事件和
相关的回调函数处理，如果没有事件了就退出进程

![理想的异步I-O模型.png](https://github.com/WenNingZhang/learnNode/blob/master/README/picture/事件循环.png?raw=true)

## 相关链接

http://www.jianshu.com/p/f196da6b2cad