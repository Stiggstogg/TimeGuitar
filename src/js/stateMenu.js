/*
==========================
Game state: Menu
==========================
 */

let stateMenu = new State(
    'menu',

    // Update
    function(){

        menuGuitarist.update();
        menuFan1.update();
        menuFan2.update();

        // Check if up or down arrow is pressed and change selection (only if 300 ms passed since the last change)
        if (Date.now() - this.lastUpDownPress > 300 && (keyPressed('up') || keyPressed('down'))) {

            if (this.selection === 0 || this.selection === 2) {
                this.selection = 1;
                menuArrow.x = menuArrow.p1.x;
                menuArrow.y = menuArrow.p1.y;
            }
            else {
                this.selection = 2;
                menuArrow.x = menuArrow.p2.x;
                menuArrow.y = menuArrow.p2.y;
            }
            this.lastUpDownPress = Date.now();
        }

        menuArrow.update();

        // Try to start audio (can only start if the user already interacted with the window!)
        audioAssets['title'].play().then(function() {
            }).catch(function() {});


        // Check if 'Enter' is pressed and start the game
        if (keyPressed('enter') && this.selection === 1) {
            gameStates.changeTo('story');
        }
        else if (keyPressed('enter') && this.selection === 2) {
            gameStates.changeTo('credits');
        }

    },

    // Render
    function(){

        menuBackground.render();
        menuGuitarist.render();
        menuFan1.render();
        menuFan2.render();

        if (this.selection !== 0) {
            menuArrow.render();
        }

        context.font = '50px Bangers';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('TIME GUITAR', canvasWidth*0.5, canvasHeight*0.2);

        // Set font for selectable menu entries
        context.font = '20px Tahoma';

        // Render 'Start'
        if (this.selection === 1) {
            context.fillStyle = 'white';
        }
        else {
            context.fillStyle = 'black';
        }

        context.fillText('Let\'s Rock!', canvasWidth*0.5, canvasHeight*0.35);

        // Render 'Credits'
        if (this.selection === 2) {
            context.fillStyle = 'white';
        }
        else {
            context.fillStyle = 'black';
        }
        context.fillText('Who\'s responsible for this noise?', canvasWidth*0.5, canvasHeight*0.45);

        // Render key information
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.font = '10px Tahoma';
        context.fillText('Use ARROW KEYS to choose and ENTER to select!', canvasWidth*0.99, canvasHeight*0.98);


    },

    // On Enter
    function(){

        // Set the arrow to the correct position
        this.lastUpDownPress = Date.now();

        // Set animation for guitar player
        menuGuitarist.playAnimation('cool');

    },

    // On Exit
    function(){

    },
);

stateMenu.selection = 0;     // Number to check what the user has selected, 0: Nothing, not yet interacted, 1: Start, 2: Credits

gameStates.push(stateMenu);