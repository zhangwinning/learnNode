const Writable = require('stream').Writable;

class OutputStream extends Writable {
    _write(chunk, enc, done) {
        process.stdout.write(chunk.toString().toUpperCase());

        process.nextTick(done);
    }
}

module.exports = OutputStream;