/*
==========================
Game state: Finish
==========================
 */

let stateFinish = new State(
    'finish',

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
        context.fillText('You made it back!', canvasWidth*0.5, canvasHeight*0.3);

        context.font = '20px Arial';
        context.fillText('Riffs collected: ' + scores.notes.toFixed(0), canvasWidth*0.5, canvasHeight*0.4);
        context.fillText('Trace accuracy: ' + scores.trace.toFixed(0) + ' %', canvasWidth*0.5, canvasHeight*0.5);

        context.font = '15px Arial';

        if (gameStates.getTimeInCurrentState() > 1) {
            context.fillText('Press SPACE to restart the game', canvasWidth*0.5, canvasHeight*0.75);
            context.fillText('Press ESC to go back to main menu', canvasWidth*0.5, canvasHeight*0.85);
        }


    },

    // On Enter
    function(){

        // Stop audio and set back to start
        audioAssets['estring'].pause();
        audioAssets['estring'].currentTime = 0;

        // Start winning audio
        audioAssets['win'].play();

    },

    // On Exit
    function(){

        // Stop audio and set back to start
        audioAssets['win'].pause();
        audioAssets['win'].currentTime = 0;

    }
);

gameStates.push(stateFinish);