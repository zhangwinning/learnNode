const RandomNumberStream = require('./005.js');

const rns = new RandomNumberStream(5);

rns.pipe(process.stdout);

