/**
 *
 */
class Generator {

    /**
     * Constructor for the generator class. Gets all settings, changes the units accordingly.
     * @param {{frequency: {min: {number}, max: {number}}, size: {min: {number}, max: {number}}, speed: {number},
     *        distance: {number}, animFrameRate: {min: {number}, max: {number}}, yRange: {min: {number}, max: {number}}}} bset
     *        - Settings for the blocks: frequency: Min. and max. appearance frequency in 1/s; size: Min. and max. size
     *        in canvas width; speed: Speed in canvas width; distance: Minimum distance between block in canvas width;
     *        animFrameRate: Min. and max. animation frame rate in fps; yRange: Min. and max. y range in canvas height.
     * @param {{frequency: {min: {number}, max: {number}}, size: {number}, speed: {number}, animFrameRate: {number},
     *        yRange: {min: {number}, max: {number}}}} nset
     *        - Settings for the notes: frequency: Min. and max. appearance frequency in 1/s; size: size in canvas
     *        width; speed: Speed in canvas width; animFrameRate: Animation frame rate in fps; yRange: Min. and max.
     *        y range in canvas height.
     */
    constructor(bset, nset) {

        // convert block settings units and save it in the bSettings object
        this.bSettings = {
            frequency: {min: bset.frequency.min / 1000, max: bset.frequency.max / 1000},        // Min. and max. appearance frequency from 1/s to 1/ms
            size: {min: bset.size.min * canvasWidth, max: bset.size.max * canvasWidth},         // Min. and max. block size from canvas width to px
            speed: bset.speed * canvasWidth / 60,                                               // Block speed from canvas width/s to px/frame (assuming 60 fps)
            distance: bset.distance * canvasWidth,                                              // Minimum block distance from canvas width to px
            animFrameRate: {min: bset.animFrameRate.min, max: bset.animFrameRate.max},          // Min. and max. animation frame rate in fps
            yRange: {min: bset.yRange.min * canvasHeight, max: bset.yRange.max * canvasHeight } // Min. and max. y range from canvas height to px
        };

        // convert note settings units and save it in the nSettings object
        this.nSettings = {
            frequency: {min: nset.frequency.min / 1000, max: nset.frequency.max / 1000},        // Min. and max. appearance frequency from 1/s to 1/ms
            size: nset.size * canvasWidth,                                                      // Note size from canvas width to px
            speed: nset.speed * canvasWidth / 60,                                                // Note speed from canvas width/s to px/frame (assuming 60 fps)
            animFrameRate: nset.animFrameRate,                                                    // Animation frame rate in fps
            yRange: {min: nset.yRange.min * canvasHeight, max: nset.yRange.max * canvasHeight } // Min. and max. y range from canvas height to px
        };

    }

    /**
     * Checks if a new block needs to be created, based on the frequency set. If it's time a new block will be created.
     */
    newBlock() {
        if (this.newElementNeeded(this.nextBlockTime)) {
            this.createNewBlock();
        }
    }

    /**
     * Checks if a new note needs to be created, based on the frequency set. If it's time a new block will be created.
     */
    newNote() {
        if (this.newElementNeeded(this.nextNoteTime)) {
            this.createNewNote();
        }
    }

    /**
     * Calculates the time when the next element (block or note) should be created, based on the frequency range.
     * @param {{number}} fmin - Minimum appearance frequency (in 1/ms)
     * @param {{number}} fmax - Maximum appearance frequency (in 1/ms)
     * @returns {number} - Time when the next element should appear (in ms)
     */
    getNextElementTime(fmin, fmax) {
        return Date.now() + 1/fmax + (1/fmin - 1/fmin) * Math.random();
    }

    /**
     * Checks if a new element is needed (if current time is higher than the calculated time for the next element).
     * Returns true if a new element needs to be created.
     * @param {number} nextTime - Time when the next element should appear
     * @returns {boolean} - true: A new element needs to be created.
     */
    newElementNeeded(nextTime) {
        return Date.now() > nextTime;
    }

    /**
     * Check if two rectangles (with anchor {x: 0, y: 0.5}!!!) are too close to each other (not separated by the minimum distance).
     * @param {{x: {number}, y: {number}, width: {number}, height: {number}}} r1 - First rectangle (position and dimensions), anchor for this rectangle is assumed to be at {x: 0, y: 0.5}
     * @param {{x: {number}, y: {number}, width: {number}, height: {number}}} r2 - Second rectangle (position and dimensions), anchor for this rectangle is assumed to be at {x: 0, y: 0.5}
     * @param {{x: {number}, y: {number}}} distance - Minimum distance between the two rectangles which
     * @returns {boolean} - Return true if the two rectangles are not separated by the minimum distance (too close!)
     */
    tooClose(r1, r2, distance) {

        let rect1 = Object.assign({},r1);
        let rect2 = Object.assign({},r2);

        // change the anchor of the rectangles to {x: 0, y: 0}
        rect1.y = rect1.y - rect1.height/2;
        rect2.y = rect2.y - rect2.height/2;

        // Enlarge the first rectangle on all sides by the distance
        rect1.x = rect1.x - distance.x;
        rect1.y = rect1.y - distance.y;
        rect1.width = rect1.width + 2 * distance.x;
        rect1.height =  rect1.height + 2 * distance.y;

        // Check if a collision between the enlarged first rectangle and the second rectangle appears. If yes,
        // then they are placed to close to each other (return: true). Used method: Axis-Aligned Bounding Box
        // (AABB, https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box)
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;               // if this condition is true a collision happens (elements are too close)
    }

    /**
     * Checks if two lines (e.g. projections of squares on a axis) overlap. If they overlap this function provides true.
     * @param {number} a1 - First point of the first line
     * @param {number} a2 - Second point of the first line
     * @param {number} b1 - First point of the second line
     * @param {number} b2 - Second point of the second line
     * @returns {boolean|boolean}
     */
    axisOverlap(a1, a2, b1, b2) {
        return a2 > b1 && b2 > a1;
    }

    /**
     * Checks if a note (with anchor {x: 0, y: 0.5}!!!) is trapped between the lower and upper edges of the canvas and a block (with anchor {x: 0, y: 0.5}!!!). This avoids that a
     * note is not reachable. If there is not enough space between the block and the canvas limit the function returns
     * true
     * @param {{x: {number}, y: {number}, width: {number}, height: {number}}} note - Note rectangle (position and dimensions), anchor for this rectangle is assumed to be at {x: 0, y: 0.5}
     * @param {{x: {number}, y: {number}, width: {number}, height: {number}}} block - Block rectangle (position and dimensions), anchor for this rectangle is assumed to be at {x: 0, y: 0.5}
     * @param {{x: {number}, y: {number}}} distance - Minimum distance between the two rectangles which
     * @returns {boolean|boolean}
     */
    isTrapped(note, block, distance) {

        // Calculate y-coordinates of edges as anchor is {x: 0, y: 0.5}
        const blockUpperEdgeY = block.y - block.height/2;
        const blockLowerEdgeY = block.y + block.height/2;
        const noteUpperEdgeY = note.y - note.height/2;
        const noteLowerEdgeY = note.y + note.height/2;

        return this.axisOverlap(note.x, note.x + note.width, block.x - note.width/2,
            block.x + block.width + note.width/2) &&                                        // check if the projections to the x-axis of note and block overlap
            (
                ( blockUpperEdgeY < this.bSettings.min + distance.y &&
                    blockUpperEdgeY > this.bSettings.min &&
                    noteLowerEdgeY < blockUpperEdgeY ) ||                          // check if the block is to close to the upper canvas limit (but still a gap is available) and check if note is between it
                ( blockLowerEdgeY > this.bSettings.max - distance.y &&
                    blockLowerEdgeY < this.bSettings.max &&
                    noteUpperEdgeY > blockLowerEdgeY )   // check if the block is to close to the lower canvas limit (but still a gap is available) and check if note is between it
            );

    }

    /**
     * Creates a new block and adds it to the block array. The block is only created if the distance to the other blocks
     * is large enough (to avoid that blocks can block the way of the player)
     */
    createNewBlock() {

        // Calculate next block parameters (size and position)
        const position = Vector(canvasWidth*1.2, this.bSettings.yRange.min + (this.bSettings.yRange.max - this.bSettings.yRange.min) * Math.random());    // position vector, blocks are created earlier (outside of the canvas) so that later notes are added. In this the distance to notes does not need to be checked.
        const width = this.bSettings.size.min + (this.bSettings.size.max - this.bSettings.size.min) * Math.random();     // width
        const height = this.bSettings.size.min + (this.bSettings.size.max - this.bSettings.size.min) * Math.random();    // height

        // If this stays true a new block will be created
        let create = true;

        // create objects for the comparison
        const newBlock = {x: position.x,                // rectangle 1 (new Block)
            y: position.y,
            width: width,
            height: height};
        let distance = {x: this.bSettings.distance,   // distance to other blocks
            y: this.bSettings.distance};

        // Check distance to each existing blocks
        for (let i = 0; i < this.blocks.length; i++) {

            // create rectangle object for the comparison (rectangle 2)
            let existingBlock = {x: this.blocks[i].x,
                y: this.blocks[i].y,
                width: this.blocks[i].width,
                height: this.blocks[i].height};

            // If the potential block would be too close to an existing block the "create" variable is set to "false"
            if (this.tooClose(newBlock, existingBlock, distance)) {
                create = false;
                break;
            }
        }

        // if the potential block is far enough away from the other blocks (create = true), create the sprite
        if (create) {

            // create sprite sheet (with animation)
            let blockSheet = SpriteSheet({
                image: imageAssets['blob'],
                frameWidth: 10,
                frameHeight: 10,
                animations: {
                    blink: {
                        frames: '0..2',
                        frameRate: this.bSettings.animFrameRate.min +
                            (this.bSettings.animFrameRate.max - this.bSettings.animFrameRate.min) * Math.random() // frame rate is set randomly
                    }
                }
            });

            // create sprite
            let block = Sprite({
                position: position,
                anchor: {x: 0, y: 0.5},
                width: width,
                height: height,
                color: 'blue',
                dx: -this.bSettings.speed,
                visible: true,                          // "true" if the sprite is visible (within the canvas) and should be rendered
                animations: blockSheet.animations       // add animation
            });

            this.blocks.push(block);                        // add the new block to the array of blocks
            this.nextBlockTime = this.getNextElementTime(this.bSettings.frequency.min, this.bSettings.frequency.max);   // set the time when the next block should appear
        }
    }

    /**
     * Creates a new note and adds it to the note array. The note is only created if it doesn't overlap with any other
     * element
     */
    createNewNote() {

        // Calculate next note parameters (size and position)
        const position = Vector(canvasWidth, this.nSettings.yRange.min + (this.nSettings.yRange.max - this.nSettings.yRange.min) * Math.random());   // position vector
        const width = this.nSettings.size;     // width
        const height = this.nSettings.size;    // height

        // If this stays true a new note will be created
        let create = true;

        // Create objects for the comparison
        const newNote = {x: position.x,                // rectangle 1 (new note)
            y: position.y,
            width: width,
            height: height};
        const distance = {x: 0, y: 0}                   // distance

        // Check distance to each existing block (position to other notes does not need to be checked as they appear in a much lower frequency)
        for (let i = 0; i < this.blocks.length; i++) {

            // create rectangle object for the comparison (rectangle 2)
            let existingBlock = {x: this.blocks[i].x,
                y: this.blocks[i].y,
                width: this.blocks[i].width,
                height: this.blocks[i].height};

            // If the potential note would be too close to an existing block or trapped (not reachable without touching
            // a block) between a block and the canvas limit the "create" variable is set to "false"
            if (this.tooClose(newNote, existingBlock, distance) ||
                this.isTrapped(newNote, existingBlock,{x: this.bSettings.distance, y: this.bSettings.distance})) {
                create = false;
                break;
            }
        }

        // if the potential block is far enough away from the other blocks (create = true), create the sprite
        if (create) {

            // create sprite sheet (with animation)
            let noteSheet = SpriteSheet({
                image: imageAssets['riff'],
                frameWidth: 4,
                frameHeight: 4,
                animations: {
                    blink: {
                        frames: '0..3',
                        frameRate: this.nSettings.animFrameRate
                    }
                }
            });

            // create sprite
            let note = new Sprite({
                position: position,
                anchor: {x: 0, y: 0.5},
                width: width,
                height: height,
                color: 'white',
                dx: -this.nSettings.speed,
                visible: true,                      // "true" if the sprite is visible (within the canvas) and should be rendered
                animations: noteSheet.animations    // add animation
            });

            this.notes.push(note);                        // add the new note to the array of notes
            this.nextNoteTime = this.getNextElementTime(this.nSettings.frequency.min, this.nSettings.frequency.max);   // set the time when the next block should appear
        }
        else {
            this.createNewNote();                           // if the sprite was not created try again
        }
    }

    /**
     * Updates all blocks and notes in the arrays as well as the zero point
     */
    updateAll() {
        this.blocks.forEach(function(b) {
                b.update();
            }
        );

        this.notes.forEach(function(n) {
                n.update();
            }
        );

        this.zeroPoint.update();

    }

    /**
     * Renders all blocks and notes which are within the canvas
     */
    renderAll() {

        this.setVisibility(this.blocks);    // check visibility of all blocks and set accordingly

        // render block
        this.blocks.forEach(function(b) {

                // render only the blocks which are visible (within canvas)
                if (b.visible) {
                    b.render();
                }
        });

        // render notes
        this.notes.forEach(function(n) {

                n.render();
        });
    }

    /**
     * Checks for each element in the array, if it is within the canvas. If not "visible" is set to "false" otherwise to
     * "true". Only "visible" blocks will be rendered.
     * @param {[]} elements - Block or note array which contains all blocks and notes
     */
    setVisibility(elements) {
        elements.forEach(function (e) {

            // Check for each element if it is outside of the canvas. If it is, set "visible" to false
            if (e.visible && (e.x + e.width < 0 || e.x > canvasWidth)) {    // block set to visible but is outside canvas
                e.visible = false;                                          // make invisible
            }
            else if (!e.visible && e.x + e.width >= 0 && e.x <= canvasWidth) {  // block is set to invisible but is inside canvas
                e.visible = true;                                               // make visible
            }
        });
    }

    /**
     * Checks if any of the notes left the canvas on the left side (note was not collected). If this is the case
     * true is returned.
     * @returns {boolean} - true if one of the notes left the canvas (was forgotten)
     */
    lostNote() {

        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].x + this.notes[i].width < 0) {                      // right edge of note left the canvas
                return true;
            }
        }

        return false;
    }

    /**
     * Starts the generator. Can also be used to restart the generator
     */
    start() {

        // Create empty arrays
        this.blocks = [];                   // create an empty block array
        this.notes = [];                    // create an empty note array

        // Create first note and block
        this.createNewBlock();              // create the first block
        this.createNewNote();               // create the first note

        // create the zero point sprite (to calculate absolute position)
        this.zeroPoint = Sprite({
            x: 0,
            y: 0,
            anchor: {x: 0, y: 1},
            width: 1,
            height: 1,
            color: 'black',
            dx: -this.bSettings.speed
        });
    }

    /**
     * Changes the moving direction of all blocks and notes as well as the zero point
     */
    changeDirection() {

        this.blocks.forEach(function (b) {
            b.dx = -b.dx;
        });

        this.notes.forEach(function (n) {
            n.dx = -n.dx;
        })

        this.zeroPoint.dx = -this.zeroPoint.dx;
    }

    /**
     * Provides the x-coordinate of the zero point (to be used to calculate absolute positions)
     * @returns {number} - x-coordinate of the zero point
     */
    getZeroPointX() {
        return this.zeroPoint.x;
    }

}

