/*
==========================
Initialize Kontra.js
==========================
*/

let {init, GameLoop, initKeys, keyPressed, Vector,
    load, on, setImagePath, imageAssets, setAudioPath, audioAssets,
    SpriteSheet, bindKeys} = kontra;     // initialize Kontra (and objects)
let {canvas, context} = init();                                     // get canvas and context

initKeys();                                                         // initialize Keyboard support


// prevent default behavior of these keys in browser!
bindKeys(['up', 'down', 'left', 'right', 'space', 'enter', 'esc'], function(e) {
    e.preventDefault();
});

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
    worldSpeed: 0.1,                            // speed of the world relative to canvas width per second (assuming 60 fps)
    timeDifference: 5,                          // time difference between one major tick on the timeline
    playAreaY: {min: 0, max: 0.8},              // play area (where the character can move and all the action happens :D) in canvas height
    maxNotes: 10,                               // used for rank calculation
    maxAccuracy: 80                            // used for rank calculation
}

// Settings for the player
const playerSettings = {
    startPosition: Vector(0.75, 0.5),            // player start position (relative to canvas width and height)
    width: 0.055,                                // player width (relative to canvas width)
    height: 0.08                                // player height (relative to canvas width)
};

// Settings for the blocks (obstacles) which are generated randomly
const blockSettings = {
    frequency: {min: 0.05, max: 1},                      // appearance frequency of new blocks (in blocks / s)
    size: {min: 0.03, max: 0.1},                       // block sizes (relative to canvas width)
    speed: generalSettings.worldSpeed,                  // block speed (canvas width / s)
    distance: playerSettings.height*1.5,                // minimum distance between blocks (relative to canvas width)
    animFrameRate: {min: 2, max: 5},                    // animation frame rate (fps)
    yRange: {min: generalSettings.playAreaY.min, max: generalSettings.playAreaY.max}     // y range where the blocks can appear (relative to canvas height)
}

// Settings for the notes (which need to be collected)
const noteSettings = {
    frequency: {min: 0.1, max: 0.5},                   // appearance frequency of new blocks (in blocks / s)
    size: 0.02,                                         // note size (relative to canvas width)
    speed: blockSettings.speed,                         // note speed (canvas width / s)
    animFrameRate: 1,                                   // animation frame rate (fps)
}
// y range where the note can appear (relative to canvas height, needs to be transformed from canvas width). Makes sure
// that notes are place completely inside of the playing area
noteSettings.yRange = {
    min: generalSettings.playAreaY.min + (noteSettings.size * canvasWidth / canvasHeight) / 2,
    max: generalSettings.playAreaY.max - (noteSettings.size * canvasWidth / canvasHeight) / 2
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
    speed: worldSpeed*3,
    width: playerSettings.width * canvasWidth,
    height: playerSettings.height * canvasWidth
});


// make sure the player can't move out of the canvas
player.position.clamp(player.width/2,  generalSettings.playAreaY.min * canvasHeight + player.height/2,
    canvasWidth-player.width/2, generalSettings.playAreaY.max * canvasHeight-player.height/2);

// Initialize Scores object
let scores = new Scores(generalSettings.maxNotes, generalSettings.maxAccuracy);

/*
=============================
Menu / Credits /... Screens
=============================
 */

// background of the menu screens
let menuBackground = Sprite({
    x: 0,
    y: 0,
    anchor: {x: 0, y: 0},
    width: canvasWidth,
    height: canvasHeight
});

// guitarist in the menus
let menuGuitarist = Sprite({
    x: 0.12 * canvasWidth,
    y: 0.58 * canvasHeight,
    anchor: {x: 0, y: 1},
    width: 0.1*canvasWidth,
    height: 0.15*canvasWidth
});

// fan 1 in the menus
let menuFan1 = Sprite({
    x: 0.45 * canvasWidth,
    y: 0.94 * canvasHeight,
    anchor: {x: 0, y: 1},
    width: 0.1*canvasWidth,
    height: 0.15*canvasWidth
});

// fan 1 in the menus
let menuFan2 = Sprite({
    x: 0.73 * canvasWidth,
    y: 0.85 * canvasHeight,
    anchor: {x: 0, y: 1},
    width: 0.1*canvasWidth,
    height: 0.15*canvasWidth
});

// crowd in the menus
let menuCrowd = Sprite({
    x: canvasWidth,
    y: canvasHeight,
    anchor: {x: 1, y: 1},
    width: 0.73 * canvasWidth,
    height: 0.27 * canvasWidth
});

// arrow in menu
let menuArrow = Sprite({
    x: 0,
    y: 0,
    anchor: {x: 1, y: 0.5},
    width: 0.1 * canvasWidth,
    height: 0.046 * canvasWidth,
    p1: {x: 0.69 * canvasWidth, y: 0.325 * canvasHeight},
    p2: {x: 0.845 * canvasWidth, y: 0.425 * canvasHeight}
});

// Blob in explanation screen
let menuBlock = Sprite({
    x: 0.94 * canvasWidth,
    y: 0.24 * canvasHeight,
    anchor: {x: 0.5, y: 0.5},
    width: (blockSettings.size.max + blockSettings.size.min)/2 * canvasWidth,
    height: (blockSettings.size.max + blockSettings.size.min)/2 * canvasWidth
});

// Riff in explanation screen
let menuNote = Sprite({
    x: 0.94 * canvasWidth,
    y: 0.12 * canvasHeight,
    anchor: {x: 0.5, y: 0.5},
    width: noteSettings.size * canvasWidth,
    height: noteSettings.size * canvasWidth
});

// Charts in finish screen
let charts = Sprite({
    x: 0.73 * canvasWidth,
    y: 0.30 * canvasHeight,
    anchor: {x: 0.5, y: 0},
    width: 0.45 * canvasWidth,
    height: 0.3 * canvasWidth
});


/*
==========================
Game world generation
==========================
 */

// Create the block generator
generator = new Generator(blockSettings, noteSettings);

// Background sprite generation (image is added later, after loading)
let background = Sprite({
    x: 0,
    y: 0,
    anchor: {x: 0, y: 0},
    width: canvasWidth,
    height: canvasHeight
});

// Start sprite generation (image is added later, after loading)
let startLine = Sprite({
    x: 0,
    y: 0,
    anchor: {x: 0, y: 0},
    width: canvasWidth,
    height: canvasHeight,
    dx: -worldSpeed
});

let timeDifference = 5;

// Timeline sprite 1 generation
let timeline1 = new TimeSprite({
    x: 0,
    y: generalSettings.playAreaY.max * canvasHeight,
    anchor: {x:0, y: 0},
    width: canvasWidth,
    height: (1 - generalSettings.playAreaY.max) * canvasHeight,
    firstSprite: true,
    dx: -worldSpeed
});

// Timeline sprite 1 generation
let timeline2 = new TimeSprite({
    x: canvasWidth,
    y: generalSettings.playAreaY.max * canvasHeight,
    anchor: {x:0, y: 0},
    width: canvasWidth,
    height: (1 - generalSettings.playAreaY.max) * canvasHeight,
    firstSprite: false,
    dx: -worldSpeed
});

