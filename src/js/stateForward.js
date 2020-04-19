/*
==========================
Game state: Run forward
==========================
 */

let stateForward = new State(
    'forward',

    // Update
    function(){
        // Blocks and notes
        generator.newBlock();       // Check for and create new blocks
        generator.newNote();       // Check for and create new notes
        generator.updateAll();   // Update all blocks

        // Player
        player.movement();       // Set movement speed of player
        player.update();        // Update player

        // Collision detection: Player - block
        if (player.blockCollide(generator.blocks)) {
            gameStates.changeTo('forward');          // if collision happens: GAME OVER TODO: Change to another state!
        }

        // Collision detection: Player - note
        if (player.noteCollide(generator.notes)) {
            scores.notes++;         // if collision happens: Note disappears and note score is increased
        }

        // Check if a note left the canvas (was forgotten to collect) TODO: Change to another state
        if (generator.lostNote()) {
            gameStates.changeTo('forward');
        }
    },

    // Render
    function(){
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

        // Reset the block generator
        generator.start();

        // Reset scores
        scores.notes = 0;
    },

    // On Exit
    function(){

    }
);

gameStates.push(stateForward);