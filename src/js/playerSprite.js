let {Sprite} = kontra;        // initialize Sprite class of Kontra

class PlayerSprite extends Sprite.class {

    constructor(properties) {

        super(properties);
    }

    /**
     * Checks if arrow keys are pressed and set the movement speed of the sprite accordingly.
     */
    movement() {

        let speed = Vector(-worldSpeed, 0); // speed vector of the player (set starting speed)

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

}
