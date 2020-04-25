/*
==========================
Game state: Run backward
==========================
 */

let stateBackward = new State(
    'backward',

    // Update
    function(){

        //Start line
        startLine.update();     // update

        if (startLine.x > 0) {  // avoid that start line moves too far to the right
            startLine.x = 0;
        }

        // Timelines
        timeline1.update();
        timeline2.update();
        timeline1.reposition();
        timeline2.reposition();
        timeline1.updateAllDates();
        timeline2.updateAllDates();

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

        // Timelines
        timeline1.render();
        timeline2.render();
        timeline1.renderAllDates();
        timeline2.renderAllDates();

        // Help text
        context.textAlign = 'right';
        context.font = '15px Tahoma';
        context.fillText('Take the same way back!', canvasWidth*0.99, canvasHeight*0.98);
    },

    // On Enter
    function(){

        // change direction to backward
        player.changeDirection();
        generator.changeDirection();
        startLine.dx = -startLine.dx;
        timeline1.changeDirection();
        timeline2.changeDirection();
    },

    // On Exit
    function(){

        // Change direction back to forward
        player.changeDirection();
        generator.changeDirection();
        startLine.dx = -startLine.dx;
        timeline1.changeDirection();
        timeline2.changeDirection();

        // Set trace score (in %)
        scores.trace = player.getTraceScore() * 100;


    }
);

gameStates.push(stateBackward);