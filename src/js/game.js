/*
==========================
Initialize Kontra.js
==========================
 */

let {init, GameLoop, initKeys, keyPressed, Sprite, Vector} = kontra;      // initialize Kontra (and objects)
let {canvas, context} = init();                          // get canvas and context

initKeys();                         // initialize Keyboard support

/*
==========================
Properties
==========================
 */

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

/*
==========================
Settings
==========================
 */

const generalSettings = {
    worldSpeed: 0.05,                          // speed of the world relative to canvas width per second (assuming 60 fps)
    blockFrequency: {min: 1, max: 5},           // appearance frequency of new blocks (in blocks / s)
    blockSize: {min: 20, max: 50}
}


const playerSettings = {
    startPosition: Vector(0.0, 0.5),            // player start position (relative to canvas width and height)
    size: Vector(0.03, 0.05)                    // player size (relative to canvas width)
};


/*
==========================
Initialization (new game)
==========================
 */

const worldSpeed = generalSettings.worldSpeed * canvasWidth / 60; // calculate world speed from widths / x to px / frame (assuming 60 fps)

// player sprite
let player = Sprite({                           // create
    anchor: {x: 0.5, y: 0.5},
    width: playerSettings.size.x * canvas.width,
    height: playerSettings.size.y * canvas.width,
    color: 'red',
    moveKeys: ['up', 'left', 'down', 'right'],  // keys which are used for movement (up, left, down, right)
    speed: worldSpeed*3
});

player.position.clamp(player.width/2, player.height/2,
    canvasWidth-player.width/2, canvasHeight-player.height/2); // make sure player can't leave the canvas



/**
 * Function to initialize the game elements. Can be also used when restarting a game.
 */
function initNewGame() {

    // set player at starting position and speed
    player.x = playerSettings.startPosition.x * canvasWidth;
    player.y = playerSettings.startPosition.y * canvasHeight;
    player.dx = -worldSpeed;


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

// function which sets the speed of the player based on the arrow key pressed

function movement(s) {

    const speed = Vector(-worldSpeed, 0); // speed vector of the player (set starting speed)

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

blockGen = new BlockGenerator(generalSettings.blockFrequency, generalSettings.blockSize, worldSpeed);

/*
==========================
Game Loop
==========================
 */

let loop = GameLoop({
    update: function () {

        movement(player);
        blockGen.check();

        player.update();
        blockGen.updateAll();

    },

    render: function () {

        blockGen.renderAll();
        player.render();


    }

});

initNewGame();
loop.start();               // start loop