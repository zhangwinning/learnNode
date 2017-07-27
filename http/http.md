### 这篇文章会回答一个http请求到达服务器时,服务器是如何处理的?

* Node如何实现`高并发`的?
Node 的http模块包括对http请求的封装。在Node中,http服务继承自tcp服务器(net模块)

,它能够与多个客户端保持连接,由于其采用`事件驱动`的形式,并不为每个连接创建额外线程,保持很

低的内存占用,所以能够实现`高并发`。

* tcp服务和http服务的区别?

tcp服务是以`connection`为单位进行服务的,而http服务是以`request`为单位进行服务的。

http服务把`connection`到`request`这个过程进行了封装。

*