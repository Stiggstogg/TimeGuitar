/*
==========================
Game state: Menu
==========================
 */

let stateMenu = new State(
    'menu',

    // Update
    function(){

        // Check if 'Space' is pressed and start the game
        if (keyPressed('space')) {
            gameStates.changeTo('forward');
        }

    },

    // Render
    function(){

        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Time Guitar', canvasWidth*0.5, canvasHeight*0.3);

        context.font = '20px Arial';
        context.fillText('Press SPACE to start the game', canvasWidth*0.5, canvasHeight*0.5);

    },

    // On Enter
    function(){},

    // On Exit
    function(){}
);

gameStates.push(stateMenu);