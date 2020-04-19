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

        // Collision detection: Player - block
        if (player.blockCollide(generator.blocks)) {
            gameStates.changeTo('over');          // if collision happens: GAME OVER
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

        console.log('enter backward');

        player.changeDirection();
        generator.changeDirection();
    },

    // On Exit
    function(){

        player.changeDirection();
        generator.changeDirection();

    }
);

gameStates.push(stateBackward);