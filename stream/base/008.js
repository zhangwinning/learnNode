const RandomNumberStream = require('./005.js');

const rns = new RandomNumberStream(5);

rns.on('readable', () => {
    let chunk;
    while((chunk=rns.read()) !== null) {
        console.log(chunk);
    }
});
