let {Sprite} = kontra;        // initialize Sprite class of Kontra

class PlayerSprite extends Sprite.class {

    constructor(properties) {

        super(properties);

        // Set the direction of the player (1: forward (from left to right), 0: backward (from right to left))
        this.direction = 1;

        this.createCollisionBox();

    }

    /**
     * Checks if arrow keys are pressed and set the movement speed of the sprite accordingly.
     */
    movement() {

        let speed = Vector(-worldSpeed*this.direction, 0); // speed vector of the player (set starting speed)

        // check each key and add the contribution of this direction to the speed vector
        if (keyPressed('up')){
            speed.y -= this.speed;
        }

        if (keyPressed('down')) {
            speed.y += this.speed;
        }

        if (keyPressed('left')) {
            speed.x -= this.speed;
        }

        if (keyPressed('right')) {
            speed.x += this.speed;
        }

        this.velocity = speed;         // set the calculated vector as the players speed (velocity vector)

        // set the animation depending on if the player is moving or not and in which direction
        if (speed.x === -worldSpeed*this.direction && speed.y === 0) {          // not moving

            if (this.lookRight) {                                               // looking right
                this.playAnimation('rightStand');
            }
            else {                                                              // looking left
                this.playAnimation('leftStand');
            }
        }
        else if (speed.x > -worldSpeed*this.direction || (speed.y !== 0 && this.lookRight)) { // moving right or moving up or down and looking right
            this.playAnimation('rightWalk');
            this.lookRight = true;                      // set orientation (look direction)
        }
        else if (speed.x < -worldSpeed*this.direction || (speed.y !== 0 && !this.lookRight)) { // moving left or moving up or down and looking left
            this.playAnimation('leftWalk');
            this.lookRight = false;                     // set orientation (look direction)
        }
    }

    blockCollide(blocks) {
        let collide = false;

        this.updateCollisionBox();

        for (let i = 0; i < blocks.length; i++) {
            if (this.collisionBox.collidesWith(blocks[i])) {            // Check the collision with the collision box!
                return true;
            }
        }

        return false;
    }

    noteCollide(notes) {
        let collide = false;

        for (let i = 0; i < notes.length; i++) {
            if (this.collidesWith(notes[i])) {
                notes.splice(i,1);                  // delete this note
                return true;
            }
        }

        return false;
    }

    /**
     * Changes the moving direction of the player:
     * 1: forward (from left to right)
     * -1: backward (from right to left)
     */
    changeDirection() {
        this.direction = -this.direction;
    }

    /**
     * Set the current coordinate (using absolute x position: relative to zero point) of the player as a trace point
     * @param {number} zero - x-coordinate of the zero point
     */
     setTrace(zero) {
        this.trace.push({x: this.x - zero, y: this.y, back: false});
    }

     /**
     * Check if the player character is on a trace. If yes, set "back = true" for this trace. If no trace was found
     * increase the out of trace counter.
     * @param {number} zero - x-coordinate of the zero point
     */
    checkTrace(zero) {

        // Calculate the corner coordinates of the player (in absolute position: relative to zero point)
        const absoluteX = this.x - zero;            // Calculate absolute x coordinate of player

        const x1 = absoluteX - this.width/2;        // Calculate absolute x coordinate of left corners (as anchor is set to {x: 0.5, y: 0.5}
        const x2 = absoluteX + this.width/2;        // Calculate absolute x coordinate of right corners (as anchor is set to {x: 0.5, y: 0.5}
        const y1 = this.y - this.height/2;          // Calculate absolute y coordinate of upper corners (as anchor is set to {x: 0.5, y: 0.5}
        const y2 = this.y + this.height/2;          // Calculate absolute y coordinate of lower corners (as anchor is set to {x: 0.5, y: 0.5}

        let found = false;                          // This value is set to true if the player is on at least one trace

        // Check if the player is positioned on one or multiple traces
        for (let i = 0; i < this.trace.length; i++) {
            if (this.trace[i].x >= x1 && this.trace[i].x <= x2 && this.trace[i].y >= y1 && this.trace[i].y <= y2) {
                found = true;                       // Set this to true if the player is standing on a trace

                // If it is a trace where the player is the first time on his way back, set it also to "true"
                // (which means the player crossed this trace) and increase the "on Trace" counter (used for scores)
                if (!this.trace[i].back) {
                    this.trace[i].back = true;
                    this.onTrace++;                 // Increase the "on Trace" counter, which counts how many traces were covered on the way back
                }
            }
        }

        // If the player is currently not standing on any trace, increase the "out of Trace" counter
        if (!found) {
            this.outOfTrace++;
        }
    }

    /**
     * Calculate the scores based on how many traces were already covered on the way back ("onTrace"), how many times
     * the player was standing on no trace ("outOfTrace") and on how many traces the player didn't cover on his way back
     * ("forgottenTrace").
     * @returns {number} - Trace score (relative (0 - 1), e.g. as percentage)
     */
    getTraceScore() {

        // The formula would be: "onTrace" / ("onTrace" + "outOfTrace" + "forgottenTrace"). But as the length of the
        // trace array ("trace.length") is equals "onTrace" + "forgottenTrace" the formula can be simplified.
        return this.onTrace / (this.outOfTrace + this.trace.length);
    }

    /**
     * Resets all trace variables (e.g. at a game restart or new game) and start position
     */
    reset() {
        this.trace = [];            // initialize trace array
        this.outOfTrace = 0;        // initialize the out of trace counter
        this.onTrace = 0;           // initialize the on trace counter


        this.startX = this.x;       // Set start position
        this.lookRight = true;      // Set in which direction the character is looking
    }

    /**
     * P
     */
    isBack(zero) {
       return this.x - zero <= this.startX
    }

    /**
     * Create the box (sprite) which is used to detect collision between the player and the blocks.
     */
    createCollisionBox() {
        this.collisionBox = Sprite({
            x: 0,
            y: 0,
            anchor: {x: 0.5, y: 0.5},
            width: this.width * 3/11,       // It's 3 pixels wide based on the original image width (11 px), the sprite is then resized in the game, therefore it is calculated based on the width of the player
            height: this.height * 10/16     // It's 10 pixels high based on the original image height (16 px), the sprite is then resized in the game, therefore it is calculated based on the height of the player
        })
    }

    /**
     * Update the box (spirte) which is used to detect collision between the player and the blocks.
     */
    updateCollisionBox() {

        this.collisionBox.y = this.y;

        if (this.lookRight) {
            this.collisionBox.x = this.x - this.width/2 + this.width / 11 * 3.5; // The position is always 3.5 / 11 to the left of the left edge of the player sprite (anchor for both is {x: 0.5, y: 0.5})
        }
        else {
            this.collisionBox.x = this.x - this.width/2 + this.width / 11 * 7.5; // The position is always 7.5 / 11 to the left of the left edge of the player sprite (anchor for both is {x: 0.5, y: 0.5})
        }
    }

}