/*
==========================
Initialize Kontra.js
==========================
 */

let {init, GameLoop, initKeys, keyPressed} = kontra;      // initialize Kontra (and objects)
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

const generalPlayerSettings = {
    shape: [Vector(0.5, 0.15), Vector(0.2, 0.15), Vector(0.2, 0.5), Vector(-0.5, 0.5),
        Vector(-0.5, -0.5), Vector(0.2, -0.5), Vector(0.2, -0.15), Vector(0.5, -0.15)],
    width: 10,
    height: 20,
    anchor: {x: 0.5, y:0.5},
    dx: 0,
    dy: 0,
    fireBreak: 200,                         // break between two shots
    lastShot: 0,                            // time when the last shot was created
    speed: 2,
    health: 1
};

/*
==========================
Initialization (new game)
==========================
 */

/**
 * Function to initialize the game elements. Can be also used when restarting a game.
 */
function initNewGame() {


}

/*
==========================
Testing
==========================
 */


/*
==========================
Game Loop
==========================
 */

let loop = GameLoop({
    update: function () {

    },

    render: function () {

    });

initNewGame();
loop.start();               // start loop