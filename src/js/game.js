/*
==========================
Initialize Kontra.js
==========================
 */

let {init, GameLoop, initKeys, keyPressed, Sprite, Vector} = kontra;        // initialize Kontra (and objects)
let {canvas, context} = init();                                             // get canvas and context

initKeys();                                                                 // initialize Keyboard support

/*
==========================
Properties
==========================
 */

const canvasWidth = canvas.width;           // get canvas width (to scale objects according to the canvas size)
const canvasHeight = canvas.height;         // get canvas height (to scale objects according to the canvas size)

/*
==========================
Settings
==========================
 */

// General game (environment) settings
const generalSettings = {
    worldSpeed: 0.1                             // speed of the world relative to canvas width per second (assuming 60 fps)
}

// Settings for the player
const playerSettings = {
    startPosition: Vector(0.0, 0.5),            // player start position (relative to canvas width and height)
    width: 0.03,                                // player width (relative to canvas width)
    height: 0.05                                // player height (relative to canvas width)
};

// Settings for the blocks (obstacles) which are generated randomly
const blockSettings = {
    blockFrequency: {min: 1.5, max: 7},      // appearance frequency of new blocks (in blocks / s)
    blockSize: {min: 0.02, max: 0.05},       // block sizes (relative to canvas width)
    blockDistance: playerSettings.height*1.5     // minimum distance between blocks (relative to canvas width)
}


/*
==========================
Initialization
==========================
 */

// Calculate world speed from widths / x to px / frame (assuming 60 fps)
const worldSpeed = generalSettings.worldSpeed * canvasWidth / 60;

// Create the player sprite
let player = Sprite({                               // create
    anchor: {x: 0.5, y: 0.5},
    width: playerSettings.width * canvas.width,
    height: playerSettings.height * canvas.width,
    color: 'red',
    speed: worldSpeed*3
});

// make sure the player can't move out of the canvas
player.position.clamp(player.width/2, player.height/2,
    canvasWidth-player.width/2, canvasHeight-player.height/2);

/*
==========================
Reset to new game
==========================
 */

/**
 * Initializes all game elements. Used to restart the game.
 */
function initNewGame() {

    // set player at starting position and speed
    player.x = playerSettings.startPosition.x * canvasWidth;
    player.y = playerSettings.startPosition.y * canvasHeight;
    player.dx = -worldSpeed;
    player.dy = 0;

}

/*
==========================
Testing
==========================
 */

/*
==========================
Player movement
==========================
 */

/**
 * Checks if arrow keys are pressed and moves the sprite accordingly.
 * @param {Sprite} s - Sprite which should be moved (player sprite)
 */
function movement(s) {

    let speed = Vector(-worldSpeed, 0); // speed vector of the player (set starting speed)

    // check each key and add the contribution of this direction to the speed vector
    if (keyPressed('up')){
        speed.y -= s.speed;
    }

    if (keyPressed('down')) {
        speed.y += s.speed;
    }

    if (keyPressed('left')) {
        speed.x -= s.speed;
    }

    if (keyPressed('right')) {
        speed.x += s.speed;
    }

    s.velocity = speed;         // set the calculated vector as the players speed (velocity vector)

}

/*
==========================
World generation
==========================
 */

// Create the block generator
blockGen = new BlockGenerator(blockSettings.blockFrequency, blockSettings.blockSize, worldSpeed, blockSettings.blockDistance);

/*
==========================
Game Loop
==========================
 */

let loop = GameLoop({
    update: function () {

        // Blocks
        blockGen.check();       // Check for and create new blocks
        blockGen.updateAll();   // Update all blocks

        // Player
        movement(player);       // Set movement speed of player
        player.update();        // Update player


    },

    render: function () {

        // Blocks
        blockGen.renderAll();   // Render all blocks

        // Player
        player.render();        // Render player


    }

});

initNewGame();
loop.start();               // start loop