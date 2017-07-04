## JavaScript 运行机制详解：再谈Event Loop

http://www.ruanyifeng.com/blog/2014/10/event-loop.html

* 为什么JavaScript是单线程？
* 任务队列
* 事件和回调函数
* Event Loop
* 定时器
* Node.js的Event Loop

## 为什么JavaScript是单线程？

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM
节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，
且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## 任务队列？


https://github.com/DoubleSpout/threadAndPackage/blob/master/chapter.7.thread_and_process.md