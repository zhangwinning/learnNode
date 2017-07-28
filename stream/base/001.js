/**
 * 在 NodeJS 中所有的 Stream 都是 EventEmitter 的实例
 **/


//在Unix中流是一个十分常见重要的概念,从术语上讲流是对输入输出设备的抽象.
// ls | grep .js,把前一个命令的结果作为后一个命令的参数传入.这样数据像是在水流在管道中传递一样,每个命令类似一个处理器,对数据进行一些加工.因此 | 为管道符号
// readable     writable       duplex   transform
//  Node中关于流的操作被封装到Stream模块,这个模块可以被多个核心模块所引用,按照Unix哲学,一切皆文件,在Node中对文件的处理多数使用流来处理
const fs = require('fs');
const config = require('../config.js');
const path = require('path');

const date1 = new Date();

const sourcePath = path.join(config.dir, '1.mp4');
const destinationPath = path.join(config.dir, '2.mp4');

const rs = fs.createReadStream(sourcePath);
const ws = fs.createWriteStream(destinationPath);

rs.pipe(ws);

const date2 = new Date();

console.log(date2 - date1);