/**
 * Created by zhangwenning on 17/6/27.
 */
var start = Date.now();//获取当前时间戳
setTimeout(function () {
    console.log(Date.now() - start);
    for (var i = 0; i < 1000000000; i++){//执行长循环
    }
}, 1000);
setTimeout(function () {
    console.log(Date.now() - start);
}, 2000);