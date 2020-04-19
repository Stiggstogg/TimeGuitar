/*
==========================
Initialize Kontra.js
==========================
 */

let {init, GameLoop, initKeys, keyPressed, Vector} = kontra;        // initialize Kontra (and objects)
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
    frequency: {min: 1.5, max: 7},          // appearance frequency of new blocks (in blocks / s)
    size: {min: 0.02, max: 0.05},           // block sizes (relative to canvas width)
    speed: generalSettings.worldSpeed,      // block speed (canvas width / s)
    distance: playerSettings.height*1.5     // minimum distance between blocks (relative to canvas width)
}

// Settings for the notes (which need to be collected)
const noteSettings = {
    frequency: {min: 0.05, max: 0.1},       // appearance frequency of new blocks (in blocks / s)
    size: 0.02,                             // note size (relative to canvas width)
    speed: blockSettings.speed              // note speed (canvas width / s)
}


/*
==========================
Initialization
==========================
 */

// Calculate world speed from widths / s to px / frame (assuming 60 fps)
const worldSpeed = generalSettings.worldSpeed * canvasWidth / 60;

// Create the player sprite
let player = new PlayerSprite({                               // create
    anchor: {x: 0.5, y: 0.5},
    width: playerSettings.width * canvas.width,
    height: playerSettings.height * canvas.width,
    color: 'red',
    speed: worldSpeed*3
});

// make sure the player can't move out of the canvas
player.position.clamp(player.width/2, player.height/2,
    canvasWidth-player.width/2, canvasHeight-player.height/2);

// Scores object
let scores = {
    notes: 0
}

/*
==========================
World generation
==========================
 */

// Create the block generator
generator = new Generator(blockSettings, noteSettings);

/*
==========================
Game Loop
==========================
 */

let loop = GameLoop({
    update: function () {

        // Blocks and notes
        generator.newBlock();       // Check for and create new blocks
        generator.newNote();       // Check for and create new notes
        generator.updateAll();   // Update all blocks

        // Player
        player.movement();       // Set movement speed of player
        player.update();        // Update player

        // Collision detection: Player - block
        if (player.blockCollide(generator.blocks)) {
            initNewGame();          // if collision happens: GAME OVER
        }

        // Collision detection: Player - note
        if (player.noteCollide(generator.notes)) {
            scores.notes++;         // if collision happens: Note disappears and note score is increased
        }

        // Check if a note left the canvas (was forgotten to collect)
        if (generator.lostNote()) {
            initNewGame();
        }

    },

    render: function () {

        // Blocks
        generator.renderAll();   // Render all blocks

        // Player
        player.render();        // Render player

    }

});

/*
==========================
Reset to new game
==========================
 */

/**
 * Initializes all game elements. Used to restart the game.
 */
function initNewGame() {

    // Set player at starting position and speed
    player.x = playerSettings.startPosition.x * canvasWidth;
    player.y = playerSettings.startPosition.y * canvasHeight;
    player.dx = -worldSpeed;
    player.dy = 0;

    // Reset the block generator
    generator.start();

    // Reset scores
    scores.notes = 0;
}

/*
==========================
Testing
==========================
 */

console.log(generator.isTrapped({x:2, y:0.5, width: 1, height: 1}, {x:2, y:5, width:2, height:2}, {x: 1, y:3}));


/*
==========================
Start
==========================
 */

initNewGame();
loop.start();               // start loop