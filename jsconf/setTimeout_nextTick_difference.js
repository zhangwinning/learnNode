/**
	setTimeout和process.nextTick()的区别
**/

setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
}, 0);


process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B(){console.log(2);});
});