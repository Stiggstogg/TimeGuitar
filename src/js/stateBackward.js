/*
==========================
Game state: Run backward
==========================
 */

let stateBackward = new State(
    'backward',

    // Update
    function(){

        // Blocks and notes
        generator.updateAll();      // Update all blocks and notes

        // Player
        player.movement();          // Set movement speed of player
        player.update();            // Update player
        player.checkTrace(generator.getZeroPointX());

        // Collision detection: Player - block
        if (player.blockCollide(generator.blocks)) {
            gameStates.changeTo('over');          // if collision happens: GAME OVER
        }

        // Check if player is already back at the start
        if (player.isBack(generator.getZeroPointX())) {
            gameStates.changeTo('finish');
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

        // change direction to backward
        player.changeDirection();
        generator.changeDirection();
    },

    // On Exit
    function(){

        // Change direction back to forward
        player.changeDirection();
        generator.changeDirection();

        // Set trace score (in %)
        scores.trace = player.getTraceScore() * 100;


    }
);

gameStates.push(stateBackward);