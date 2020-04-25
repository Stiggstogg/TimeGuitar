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
            'menuBackground.png',
            'fans.png',
            'crowd.png',
            'arrow.png',
            'charts.png',
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
        charts.image = imageAssets['charts'];
        menuBackground.image = imageAssets['menuBackground'];

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

        // Menu animations
        // ----------------

        // create menu guitarist sprite sheet
        let menuGuitaristSheet = SpriteSheet({
            image: imageAssets['player-sheet'],
            frameWidth: 11,
            frameHeight: 16,
            animations: {
                cool: {
                    frames: '4..7',
                    frameRate: 15
                },
                rock: {
                    frames: '12..15',
                    frameRate: 7
                },
                smash: {
                    frames: '20..23',
                    frameRate: 7
                }
            }
        });
        menuGuitarist.animations = menuGuitaristSheet.animations;     // add animation to sprite

        // create menu fan sprite sheet
        let menuFan1Sheet = SpriteSheet({
            image: imageAssets['fans'],
            frameWidth: 11,
            frameHeight: 16,
            animations: {
                dance: {
                    frames: '0..3',
                    frameRate: 5
                }
            }
        });
        menuFan1.animations = menuFan1Sheet.animations;     // add animation to sprite

        // create menu fan sprite sheet
        let menuFan2Sheet = SpriteSheet({
            image: imageAssets['fans'],
            frameWidth: 11,
            frameHeight: 16,
            animations: {
                dance: {
                    frames: '4..7',
                    frameRate: 6
                }
            }
        });
        menuFan2.animations = menuFan2Sheet.animations;     // add animation to sprite

        // create menu fan sprite sheet
        let menuCrowdSheet = SpriteSheet({
            image: imageAssets['crowd'],
            frameWidth: 80,
            frameHeight: 30,
            animations: {
                dance: {
                    frames: '0..1',
                    frameRate: 6
                }
            }
        });
        menuCrowd.animations = menuCrowdSheet.animations;     // add animation to sprite

        // create menu fan sprite sheet
        let menuArrowSheet = SpriteSheet({
            image: imageAssets['arrow'],
            frameWidth: 11,
            frameHeight: 5,
            animations: {
                dance: {
                    frames: '0..7',
                    frameRate: 10
                }
            }
        });
        menuArrow.animations = menuArrowSheet.animations;     // add animation to sprite

        // create menu block sprite sheet
        let menuBlockSheet = SpriteSheet({
            image: imageAssets['blob'],
            frameWidth: 10,
            frameHeight: 10,
            animations: {
                blink: {
                    frames: '0..2',
                    frameRate: (blockSettings.animFrameRate.min + blockSettings.animFrameRate.max)/2
                }
            }
        });

        menuBlock.animations = menuBlockSheet.animations;     // add animation to sprite

        // create menu note sprite sheet
        let menuNoteSheet = SpriteSheet({
            image: imageAssets['riff'],
            frameWidth: 4,
            frameHeight: 4,
            animations: {
                blink: {
                    frames: '0..3',
                    frameRate: noteSettings.animFrameRate
                }
            }
        });

        menuNote.animations = menuNoteSheet.animations;          // add animation to sprite

        // set looping for audio files
        // -----------------------------
        audioAssets['estring'].loop = true;
        audioAssets['title'].loop = true;
        audioAssets['loose'].loop = true;
        audioAssets['win'].loop = true;

    }
);

gameStates.push(stateLoading);