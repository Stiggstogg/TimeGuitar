/*
==========================
Game state: Run forward
==========================
 */

let stateForward = new State(
    'forward',

    // Update
    function(){

        // Start line
        startLine.update();

        // Timelines
        timeline1.update();
        timeline2.update();
        timeline1.reposition();
        timeline2.reposition();
        timeline1.updateAllDates();
        timeline2.updateAllDates();

        // Blocks and notes
        generator.newBlock();       // Check for and create new blocks
        generator.newNote();       // Check for and create new notes
        generator.updateAll();   // Update all blocks

        // Player
        player.movement();       // Set movement speed of player
        player.update();        // Update player
        player.setTrace(generator.getZeroPointX()); // Set a trace point at the current (absolute position)

        // Collision detection: Player - block
        if (player.blockCollide(generator.blocks)) {
            gameStates.changeTo('over');          // if collision happens: GAME OVER

        }

        // Collision detection: Player - note
        if (player.noteCollide(generator.notes)) {
            scores.notes++;         // if collision happens: Note disappears and note score is increased
        }

        // Check if a note left the canvas (was forgotten to collect)
        if (generator.lostNote()) {
            gameStates.changeTo('over');
        }

        // Check if 'Space' is pressed (to travel back in time) and change the game state to backward
        if (keyPressed('space') && gameStates.getTimeInCurrentState() > 1) {
            gameStates.changeTo('backward');
        }
    },

    // Render
    function(){

        // Background
        background.render();


        // Start line (only render when it is within the canvas
        if (startLine.x >= -startLine.width) {
            startLine.render();
        }

        // Blocks and notes
        generator.renderAll();   // Render all blocks and notes

        // Player
        player.render();        // Render player

        // Timelines
        timeline1.render();
        timeline2.render();
        timeline1.renderAllDates();
        timeline2.renderAllDates();

        // Help text
        if (gameStates.getTimeInCurrentState() > 1) {
            context.textAlign = 'right';
            context.font = '15px Tahoma';
            context.fillText('Press SPACE to travel back!', canvasWidth*0.99, canvasHeight*0.98);
        }


    },

    // On Enter
    function(){

        // Stop menu audio
        audioAssets['title'].pause();
        audioAssets['title'].currentTime = 0;

        // Set player at starting position and speed
        player.x = playerSettings.startPosition.x * canvasWidth;
        player.y = playerSettings.startPosition.y * canvasHeight;
        player.dx = -worldSpeed;
        player.dy = 0;

        // Reset the player
        player.reset();

        // Reset the block generator
        generator.start();

        // Reset the timelines
        timeline1.reset();
        timeline2.reset();

        timeline1.addAllDates();
        timeline2.addAllDates();

        // Reset scores
        scores.reset();

        // Reset start line
        startLine.x = 0;
        startLine.y = 0;

        // start audio
        audioAssets['estring'].play();
    },

    // On Exit
    function(){

    }
);

gameStates.push(stateForward);