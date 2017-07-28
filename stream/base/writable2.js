const fs = require('fs');
const config = require('../config.js');
const path = require('path');

const sourcePath = path.join(config.dir, 'package.json');
const destinationPath = path.join(config.dir, 'write.json');

const rs = fs.createReadStream(sourcePath);
const ws = fs.createWriteStream(destinationPath);

rs.setEncoding('utf-8');

//可读流data事件会使可读流进入'流动模式',
rs.on('data', chunk => {
   ws.write(chunk);
});
