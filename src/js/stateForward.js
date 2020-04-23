/*
==========================
Game state: Run forward
==========================
 */

let stateForward = new State(
    'forward',

    // Update
    function(){

        //Start line
        startLine.update();

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
        if (keyPressed('space') && gameStates.getTimeInCurrentState() > 3) {
            gameStates.changeTo('backward');
        }
    },

    // Render
    function(){

        // Background ans start
        background.render();

        // Start line (only render when it is within the canvas
        if (startLine.x >= -startLine.width) {
            startLine.render();
        }

        // Blocks and notes
        generator.renderAll();   // Render all blocks and notes

        // Player
        player.render();        // Render player


    },

    // On Enter
    function(){

        // Set player at starting position and speed
        player.x = playerSettings.startPosition.x * canvasWidth;
        player.y = playerSettings.startPosition.y * canvasHeight;
        player.dx = -worldSpeed;
        player.dy = 0;

        // Reset the player
        player.reset();

        // Reset the block generator
        generator.start();

        // Reset scores
        scores.notes = 0;
        scores.trace = 0;

        // Reset start line
        startLine.x = 0;
        startLine.y = 0;
    },

    // On Exit
    function(){

    }
);

gameStates.push(stateForward);