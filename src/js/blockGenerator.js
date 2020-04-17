class BlockGenerator {

    /**
     * Constructor for the block generator class. Initializes all variables, sets the block frequency, size, speed and
     * distance and creates the first block.
     * @param {{min: number, max: number}} freq - Block appearance frequency (minimum and maximum) in blocks / s
     * @param {{min: number, max: number}} sz - Block size (minimum and maximum) in relative size to canvas width
     * @param {number} spd - Block speed in px / s
     * @param {number} dist - Minimum distance between two blocks in relative size to canvas width
     */
    constructor(freq, sz, spd, dist) {

        this.blocks = [];                                                       // block array (array of sprites)

        this.frequency = {min: freq.min / 1000, max: freq.max / 1000};          // appearance frequency (minimum and maximum) of blocks in 1/ms
        this.size = {min: sz.min * canvasWidth, max: sz.max * canvasWidth};     // size (minimum and maximum) of blocks (in px)
        this.speed = spd;                                                       // block speed (in px / frame)
        this.distance = dist * canvasWidth;                                     // minimum block distance (in px)

        this.nextBlockTime = this.getNextBlockTime();

        this.createNewBlock();
    }

    /**
     * Checks if a new block needs to be created, based on the frequency set. If it's time a new block will be created.
     */
    check() {
        if (this.newBlockNeeded()) {
            this.createNewBlock();
        }
    }

    /**
     * Calculates the time when the next block should be created, based on the frequency range.
     * @returns {number}
     */
    getNextBlockTime() {
        return Date.now() + 1/this.frequency.max + (1/this.frequency.min - 1/this.frequency.max) * Math.random();
    }

    /**
     * Checks if a new block is needed (if current time is higher than the calculated time for the next block).
     * Returns true if a new block needs to be created.
     * @returns {boolean} - true: A new block needs to be created.
     */
    newBlockNeeded() {
        return Date.now() > this.nextBlockTime;
    }

    /**
     * Creates a new block and adds it to the block array. The block is only created if the distance to the other blocks
     * is large enough (to avoid that blocks can block the way of the player)
     */
    createNewBlock() {

        // Calculate next block parameters (size and position)
        const position = Vector(canvasWidth, Math.random() * canvasHeight);                // position vector
        const width = this.size.min + (this.size.max - this.size.min) * Math.random();     // width
        const height = this.size.min + (this.size.max - this.size.min) * Math.random();    // height

        // If this stays true a new block will be created
        let create = true;

        // Check distance to each existing block
        for (let i = 0; i < this.blocks.length; i++) {

            // If the potential block would be too close to an existing block the "create" variable is set to "false"
            if ( (Math.abs(this.blocks[i].x - position.x) < this.distance + this.blocks[i].width / 2 + width / 2) &&
                (Math.abs(this.blocks[i].y - position.y) < this.distance + this.blocks[i].height / 2 + height / 2) ) {
                create = false;
                break;
            }

        }

        // if the potential block is far enough away from the other blocks (create = true), create the sprite
        if (create) {

            let block = new Sprite({
                position: position,
                anchor: {x: 0, y: 0.5},
                width: width,
                height: height,
                color: 'blue',
                dx: -this.speed,
                visible: true       // "true" if the sprite is visible (within the canvas) and should be rendered
            });

            this.blocks.push(block);                        // add the new block to the array of blocks
            this.nextBlockTime = this.getNextBlockTime();   // set the time when the next block should appear
        }
    }

    /**
     * Updates all blocks in the block array.
     */
    updateAll() {
        this.blocks.forEach(function(b) {
            b.update();
            }
        );
    }

    /**
     * Renders all blocks which are within the canvas
     */
    renderAll() {

        this.setVisibility(); // check visibility of all blocks and set accordingly

        this.blocks.forEach(function(b) {

                // render only the blocks which are visible (within canvas)
                if (b.visible) {
                    b.render();
                }
        });
    }

    /**
     * Checks for each block, if they are within the canvas. If not "visible" is set to "false" otherwise to "true".
     * Only "visible" blocks will be rendered.
     */
    setVisibility() {
        this.blocks.forEach(function (b) {

            // Check for each block if it is outside of the canvas. If it is, set "visible" to false
            if (b.visible && (b.x + b.width < 0 || b.x > canvasWidth)) {    // block set to visible but is outside canvas
                b.visible = false;                                          // make invisible
            }
            else if (!b.visible && b.x + b.width >= 0 && b.x <= canvasWidth) {  // block is set to invisible but is inside canvas
                b.visible = true;                                               // make visible
            }
        });

    }

}

