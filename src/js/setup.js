/*
==========================
Initialize Kontra.js
==========================
*/

let {init, GameLoop, initKeys, keyPressed, Vector, load, on, setImagePath, imageAssets} = kontra;        // initialize Kontra (and objects)
let {canvas, context} = init();                                     // get canvas and context

initKeys();                                                         // initialize Keyboard support


/*
==========================
Properties
==========================
 */

const canvasWidth = canvas.width;           // get canvas width (to scale objects according to the canvas size)
const canvasHeight = canvas.height;         // get canvas height (to scale objects according to the canvas size)


/*
==========================
State Machine
==========================
 */

let gameStates = new StateStack();


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
Variable initialization
==========================
 */

// Calculate world speed from widths / s to px / frame (assuming 60 fps)
const worldSpeed = generalSettings.worldSpeed * canvasWidth / 60;

let player = new PlayerSprite({
    x: 100,
    y: 100,
    anchor: {x: 0.5, y: 0.5},
    speed: worldSpeed*3
});


// make sure the player can't move out of the canvas
player.position.clamp(player.width/2, player.height/2,
    canvasWidth-player.width/2, canvasHeight-player.height/2);

// Scores object
let scores = {
    notes: 0,
    trace: 0
}

/*
==========================
World generation
==========================
 */

// Create the block generator
generator = new Generator(blockSettings, noteSettings);