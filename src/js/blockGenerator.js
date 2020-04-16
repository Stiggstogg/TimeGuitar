class BlockGenerator {

    constructor(freq, sz, spd) {

        this.blocks = [];           // block array (array of sprites)

        this.frequency = {min: freq.min / 1000, max: freq.max / 1000};      // appearance frequency (minimum and maximum) of blocks in 1/ms
        this.size = sz;           // size (minimum and maximum) of blocks
        this.speed = spd;           // block speed

        this.nextBlockTime = this.getNextBlockTime();
    }

    check() {
        if (this.newBlockNeeded()) {
            this.createNewBlock();
            this.nextBlockTime = this.getNextBlockTime();
        }
    }

    getNextBlockTime() {
        return Date.now() + 1/this.frequency.max + (1/this.frequency.min - 1/this.frequency.max) * Math.random();
    }

    newBlockNeeded() {
        return Date.now() > this.nextBlockTime;
    }

    createNewBlock() {
        let block = new Sprite({
            x: canvasWidth,
            y: Math.random() * canvasHeight,
            anchor: {x: 0, y: 0.5},
            width: 10 + Math.random()*20,
            height: 10 + Math.random()*20,
            color: 'blue',
            dx: -this.speed
        })

        this.blocks.push(block);
    }

    updateAll() {
        this.blocks.forEach(function(b) {
            b.update();
            }
        );
    }

    renderAll() {
        this.blocks.forEach(function(b) {
                b.render();
            }
        );
    }

}

