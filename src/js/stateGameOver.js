/*
==========================
Game state: GameOver
==========================
 */

let stateOver = new State(
    'over',

    // Update
    function(){

        // Check if 'Space' is pressed and start the game
        if (keyPressed('space') && gameStates.getTimeInCurrentState() > 1) {
            gameStates.changeTo('forward');
        }

        // Check if 'Esc' is pressed and start the game
        if (keyPressed('esc') && gameStates.getTimeInCurrentState() > 1) {
            gameStates.changeTo('menu');
        }

    },

    // Render
    function(){

        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('GAME OVER', canvasWidth*0.5, canvasHeight*0.3);

        context.font = '20px Arial';

        if (gameStates.getTimeInCurrentState() > 1) {
            context.fillText('Press SPACE to restart the game', canvasWidth*0.5, canvasHeight*0.5);
            context.fillText('Press ESC to go back to main menu', canvasWidth*0.5, canvasHeight*0.6);
        }


    },

    // On Enter
    function(){},

    // On Exit
    function(){}
);

gameStates.push(stateOver);