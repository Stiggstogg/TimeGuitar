/*
==========================
Game state: Menu
==========================
 */

let stateMenu = new State(
    'menu',

    // Update
    function(){

        // Try to start audio (can only start if the user already interacted with the window!)
        audioAssets['title'].play().then(function() {
            }).catch(function() {});


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
    function(){

    },

    // On Exit
    function(){

        // stop and reset audio
        audioAssets['title'].pause();
        audioAssets['title'].currentTime = 0;

    },
);

stateMenu.ready = false;

gameStates.push(stateMenu);