let {Sprite} = kontra;        // initialize Sprite class of Kontra

class PlayerSprite extends Sprite.class {

    constructor(properties) {

        super(properties);

        // Set the direction of the player (1: forward (from left to right), 0: backward (from right to left))
        this.direction = 1;
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

    }

    blockCollide(blocks) {
        let collide = false;

        for (let i = 0; i < blocks.length; i++) {
            if (this.collidesWith(blocks[i])) {
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

}
