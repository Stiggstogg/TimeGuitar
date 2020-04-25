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
        context.fillText('Code:', this.pos1x * canvasWidth, this.pos1y * canvasHeight);
        context.fillText('Kontra.js framework and some ugly code by myself.', this.pos2x * canvasWidth, this.pos1y * canvasHeight);

        // Graphics:
        context.fillText('Graphics:', this.pos1x * canvasWidth, (this.pos1y + this.separationy) * canvasHeight);
        context.fillText('All by myself but highly inspired by my only groupie and', this.pos2x * canvasWidth, (this.pos1y + this.separationy) * canvasHeight);
        context.fillText('a YouTube video by \'Dual Core Studio\'', this.pos2x * canvasWidth, (this.pos1y + 2 * this.separationy) * canvasHeight);

        // Sound:
        context.fillText('Sound:', this.pos1x * canvasWidth, (this.pos1y + 3 * this.separationy) * canvasHeight);
        context.fillText('Played on my Gibson SG Special Faded with a broken neck', this.pos2x * canvasWidth, (this.pos1y + 3 * this.separationy) * canvasHeight);
        context.fillText('and serial number 00484505 ;)', this.pos2x * canvasWidth, (this.pos1y + 4 * this.separationy) * canvasHeight);

        // Idea:
        context.fillText('Story:', this.pos1x * canvasWidth, (this.pos1y + 5 * this.separationy) * canvasHeight);
        context.fillText('Based on my own life!', this.pos2x * canvasWidth, (this.pos1y + 5 * this.separationy) * canvasHeight);


        // Back key information
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.font = '10px Tahoma';
        context.fillText('Press ESC to go back to the Menu!', canvasWidth*0.99, canvasHeight*0.98);


    },

    // On Enter
    function(){

        // positions for the text (left aligned)
        this.pos1x = 0.38;           // x position for the category (e.g. Code, ...) in canvas width
        this.pos2x = 0.48;           // x position for the text in canvas width
        this.pos1y = 0.40;           // y position for the first text in canvas height
        this.separationy = 0.05;     // y separation between the texts in canvas height

    },

    // On Exit
    function(){

    },
);

gameStates.push(stateCredits);