### 昨天晚上在youtube上看了一个Node的stream video,感觉讲解的很形象,遂记录下来。
#### 初识buffer和Stream

这里先上一个小故事:

有一个人生活在森林中,一天他在森林中遇到一个巨大的糖果石头,所以他想把这个糖果石头搬到家给他的小孩

吃，这个人虽然很强壮但是他知道把这块石头移到家要耗费很长时间,而他的孩子也可能没有耐性了,他在想如

何才能轻松搞定这件事情,突然这个人灵机一动,他想到上周他修了一个煤车,他可以利用煤车运输糖果石头,他

把小石头聚集起来放到纸板盒子中,然后把纸板盒子放到煤车上,一点一点儿运到家里去,这时家里的孩子也不

必用等待了。

而这里就用到的`buffer`和`stream`

##### 这里先上第一张图介绍buffer特点

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/001.png)

* 临时存储点当大量数据的从一个地方转移到另一个地方的时。

* 缓冲区内充满了数据之后,然后传递。

* 一次传输小块数据。

##### 这里第二张图介绍buffer流程

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/002.png)

和上面的故事做对比,我们可以把`buffers`作为煤车,这儿有大量数据我们想得到它,如果用传统的方法,我

们,要把全部数据放到`memory`中再能传输它,这样会耗时的,但是如果使用`buffers`,我们可以把小部分

数据放到`buffers`中,先传给用户。然后在运输其他的。

##### 这里第三张图介绍stream流程

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/003.png)

我们可以把`stream`比作上文中的糖果,流就是随着时间的推移,数据从一个地方移动到另一个地方的`data`

流动,所以这里会有一个数据源,我们可以运输`stream`到`buffer`,而`buffer`可以收集每个小数据聚

集起来,当`buffer`数据满了,`buffer`把数据放到processed中,最后返给用户即可。

##### 这里第四张图介绍stream流程

![image](https://github.com/WenNingZhang/learnNode/blob/master/stream/video_picture/004.png)

#### stream可以增强性能















