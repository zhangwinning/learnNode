const RandomNumberStream = require('./003');

const rns = new RandomNumberStream();

rns.pipe(process.stdout);