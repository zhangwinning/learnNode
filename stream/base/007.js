/**
 * 1.流的2中工作方式:
 *      1.流动模式:数据由底层系统读出,并尽可能提供给应用程序
 *      2.暂停模式:必须显示调用read()方法,来读取若干数据块
 *
 */
const RandomNumberStream = require('./005.js');

const rns = new RandomNumberStream(5);

rns.on('data', chunk => {
    console.log(chunk.toString())
});

rns.on('end', () => {
    console.log('done');
});

