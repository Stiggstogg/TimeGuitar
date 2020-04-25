/*
==========================
Game state: GameOver
==========================
 */

let stateOver = new State(
    'over',

    // Update
    function(){

        menuGuitarist.update();


        // Check if 'Space' is pressed and start the game
        if (keyPressed('enter') && gameStates.getTimeInCurrentState() > 1) {
            gameStates.changeTo('forward');
        }

        // Check if 'Esc' is pressed and start the game
        if (keyPressed('esc') && gameStates.getTimeInCurrentState() > 1) {
            gameStates.changeTo('menu');
        }

    },

    // Render
    function(){

        menuBackground.render();
        menuGuitarist.render();

        context.font = '30px Tahoma';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('You failed!', canvasWidth * 0.5, canvasHeight * 0.25);

        context.font = '15px Tahoma';
        context.textAlign = 'left';

        if (scores.touchedBlock) {
            context.fillText('You touched a time singularity!', canvasWidth * this.posx, canvasHeight * this.posy);
        }
        else {
            context.fillText('You forgot a riff!', canvasWidth * this.posx, canvasHeight * this.posy);
        }

        context.fillText('Your song has the same lame riffs as always!', canvasWidth * this.posx, canvasHeight * (this.posy + this.separationy));
        context.fillText('Due to your failed time traveling things got', canvasWidth * this.posx, canvasHeight * (this.posy + 2.5 * this.separationy));
        context.fillText('even worse:', canvasWidth * this.posx, canvasHeight * (this.posy + 3.5 * this.separationy));

        context.fillStyle = 'blue';
        context.fillText(this.overText, canvasWidth * this.posx, canvasHeight * (this.posy + 5 * this.separationy));


        if (gameStates.getTimeInCurrentState() > 1) {
            context.textAlign = 'left';
            context.font = '15px Tahoma';
            context.fillStyle = 'white';
            context.fillText('ENTER: Restart', canvasWidth * 0.01, canvasHeight * 0.65);
            context.fillText('ESC: Back to Menu', canvasWidth * 0.01, canvasHeight * 0.70);
        }


    },

    // On Enter
    function(){

        // Stop audio and set back to start
        audioAssets['estring'].pause();
        audioAssets['estring'].currentTime = 0;

        // Start game over audio
        audioAssets['loose'].play();

        // Set menu guitarist animation
        menuGuitarist.playAnimation('smash');

        this.posx = 0.38;           // x position for the text (left aligned) in canvas width
        this.posy = 0.40;           // y position for the text in canvas width
        this.separationy = 0.06;    // y separation between the texts in canvas height

        this.overText = scores.getOver(); // Get consequence of game over

    },

    // On Exit
    function(){

        // Stop audio and set back to start
        audioAssets['loose'].pause();
        audioAssets['loose'].currentTime = 0;

    }
);

gameStates.push(stateOver);