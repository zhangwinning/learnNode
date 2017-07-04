/**
 * Created by zhangwenning on 17/7/3.
 */
function sleep(ms) {
    var start = Date.now(), expire = start + ms;
    while (Date.now() < expire) ;
    return;
}

let time1 = new Date();
sleep(2000);
let time2 = new Date();
console.log(time2 - time1);
