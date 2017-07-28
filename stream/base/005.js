const Readable = require('stream').Readable;

class RandomNumberStream extends Readable {
    constructor(max) {
        super();
        this.max = max;
    }

    _read() {
        const ctx = this;
        setTimeout(() => {
            if (ctx.max) {
                const randomNumber = parseInt(Math.random() * 10000);

                //只能push 字符串 或者buffer,为了方便显示

                ctx.push(`${randomNumber} \n`);
                ctx.max -= 1;
            } else {
                ctx.push(null);
            }
        }, 100);
    }
}

module.exports = RandomNumberStream;
