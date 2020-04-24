/*
==========================
Game state: Loading
==========================
 */

let stateLoading = new State(
    'loading',

    // Update
    function(){

    },

    // Render
    function(){

        context.font = '50px Bangers';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Loading...', canvasWidth*0.5, canvasHeight*0.5);

    },

    // On Enter
    function(){

        let ready = false;

        // load images
        setImagePath('img/');
        setAudioPath('audio/');
        load('player-sheet.png',
            'background.png',
            'start.png',
            'blob.png',
            'riff.png',
            'timeline.png',
            'estring.mp3',
            'title.mp3',
            'loose.mp3',
            'win.mp3').then(function(ready) {
                gameStates.changeTo('menu');
        });

    },

    // On Exit
    function(){

        // add images to sprites
        background.image = imageAssets['background'];
        startLine.image = imageAssets['start'];
        timeline1.image = imageAssets['timeline'];
        timeline2.image = imageAssets['timeline'];

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

        // set looping for audio files
        audioAssets['estring'].loop = true;
        audioAssets['title'].loop = true;
        audioAssets['loose'].loop = true;
        audioAssets['win'].loop = true;

    }
);

gameStates.push(stateLoading);