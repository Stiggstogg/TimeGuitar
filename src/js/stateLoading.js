/*
==========================
Game state: Loading
==========================
 */

let stateLoading = new State(
    'loading',

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
        context.fillText('Loading...', canvasWidth*0.5, canvasHeight*0.5);

    },

    // On Enter
    function(){

        setImagePath('img/');
        load('player.png').then(function() {
            gameStates.changeTo('menu');
        });

    },

    // On Exit
    function(){

        player.image = imageAssets['player'];
        player.width = playerSettings.width * canvasWidth;
        player.height = playerSettings.height * canvasWidth;

        imageAssets['player'].onload(function() {
            player.render();
        })

    }
);

gameStates.push(stateLoading);