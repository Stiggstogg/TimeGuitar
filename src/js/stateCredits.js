/*
==========================
Game state: Menu
==========================
 */

let stateCredits = new State(
    'credits',

    // Update
    function(){

        menuGuitarist.update();

        // Check if 'Space' is pressed and go back to the menu
        if (keyPressed('esc')) {
            gameStates.changeTo('menu');
        }

    },

    // Render
    function(){

        menuBackground.render();
        menuGuitarist.render();

        context.font = '50px Bangers';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('TIME GUITAR', canvasWidth*0.5, canvasHeight*0.2);

        // Set font for credits
        context.font = '10px Tahoma';
        context.textAlign = 'left';

        // Framework:
        context.fillText('Code:', this.pos1, this.pos3);
        context.fillText('Kontra.js framework and some ugly code by myself.', this.pos2, this.pos3);

        // Graphics:
        context.fillText('Graphics:', this.pos1, this.pos3 + 0.05 * canvasHeight);
        context.fillText('All by myself but highly inspired by my only groupie and', this.pos2, this.pos3 + 0.05 * canvasHeight);
        context.fillText('a YouTube video by \'Dual Core Studio\'', this.pos2, this.pos3 + 0.1 * canvasHeight);

        // Sound:
        context.fillText('Sound:', this.pos1, this.pos3 + 0.15 * canvasHeight);
        context.fillText('Played on my Gibson SG Special Faded with a broken neck', this.pos2, this.pos3 + 0.15  * canvasHeight);
        context.fillText('and serial number 00484505 ;)', this.pos2, this.pos3 + 0.20 * canvasHeight);

        // Idea:
        context.fillText('Story:', this.pos1, this.pos3 + 0.25 * canvasHeight);
        context.fillText('Based on my own life!', this.pos2, this.pos3 + 0.25 * canvasHeight);


        // Back key information
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.font = '10px Tahoma';
        context.fillText('Press ESC to go back to the Menu!', canvasWidth*0.99, canvasHeight*0.98);


    },

    // On Enter
    function(){

        this.pos1 = canvasWidth*0.38;
        this.pos2 = canvasWidth*0.48;
        this.pos3 = canvasHeight*0.4;

    },

    // On Exit
    function(){

    },
);

gameStates.push(stateCredits);