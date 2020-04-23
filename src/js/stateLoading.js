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

        // load images
        setImagePath('img/');
        load('player-sheet.png',
            'background.png',
            'start.png',
            'blob.png',
            'riff.png').then(function() {
            gameStates.changeTo('menu');
        });

    },

    // On Exit
    function(){

        // add images to sprites
        background.image = imageAssets['background'];
        startLine.image = imageAssets['start'];

        // create player sprite sheet (for animation)
        let playerSheet = SpriteSheet({
            image: imageAssets['player-sheet'],
            frameWidth: 11,
            frameHeight: 16,
            animations: {
                rightStand: {
                    frames: '4..7',
                    frameRate: 10
                },
                leftStand: {
                    frames: '8..11',
                    frameRate: 10
                },
                rightWalk: {
                    frames: '12..15',
                    frameRate: 10
                },
                leftWalk: {
                    frames: '16..19',
                    frameRate: 10
                }
            }
        });

        player.animations = playerSheet.animations;     // add animation to player sprite


    }
);

gameStates.push(stateLoading);