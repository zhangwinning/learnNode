/**
 * Created by zhangwenning on 17/6/27.
 */
function test() {
    console.log(new Date() + '2222');
    process.nextTick(() => test());
}

//function test() {
//    console.log(new Date() + '111');
//    setTimeout(() => test(), 1000);
//}

test();