/**
 * Created by zhangwenning on 17/6/27.
 */


/*
* 上面代码中，由于process.nextTick方法指定的回调函数，
* 总是在当前"执行栈"的尾部触发，
* 所以不仅函数A比setTimeout指定的回调函数timeout先执行，
* 而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套）
* ，将全部在当前"执行栈"执行
*/

setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
}, 0);


process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B(){console.log(2);});
});