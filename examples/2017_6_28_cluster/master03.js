/**
 * Created by zhangwenning on 17/6/28.
 */

var fork = require('child_process').fork;
var cpus = require('os').cpus();
console.log(cpus)
for (var i = 0; i < cpus.length; i++) {
    //fork('./worker03.js');
}