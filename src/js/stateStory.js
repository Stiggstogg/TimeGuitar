/*
==========================
Game state: Story
==========================
 */

let stateStory = new State(
    'story',

    // Update
    function(){

        menuGuitarist.update();

        // Check Enter is pressed and proceed accorindgly
        if (Date.now() - this.lastEnterPress > 300 && keyPressed('enter')) {

            if (this.storyVisible) {
                this.storyVisible = false;              // If the story is shown proceed to the controls and explanations text
                this.lastEnterPress = Date.now();
            }
            else {
                gameStates.changeTo('forward'); // If controls is shown, proceed to the game
            }
        }
    },

    // Render
    function(){

        menuBackground.render();
        menuGuitarist.render();

        context.font = '50px Bangers';
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.fillText('TIME GUITAR', canvasWidth*0.01, canvasHeight*0.2);

        // Set font for story and explanation text
        context.font = '15px Tahoma';
        context.fillStyle = 'white';
        context.textAlign = 'left';

        // Text
        if (this.storyVisible) {            // Story text
            context.fillText('Johnny Twochords wants to be a rock star and have', this.posx * canvasWidth, this.posy * canvasHeight);
            context.fillText('a No. 1 hit in the charts! Unfortunately all of his', this.posx * canvasWidth, (this.posy + this.separationy) * canvasHeight);
            context.fillText('guitar riffs SUCK!', this.posx * canvasWidth, (this.posy + this.separationy * 2) * canvasHeight);
            context.fillText('He realizes that he can travel into the future', this.posx * canvasWidth, (this.posy + this.separationy * 3.5) * canvasHeight);
            context.fillText('when he plays constantly the E string on his', this.posx * canvasWidth, (this.posy + this.separationy * 4.5) * canvasHeight);
            context.fillText('Gibson SG Special Faded with a broken neck and', this.posx * canvasWidth, (this.posy + this.separationy * 5.5) * canvasHeight);
            context.fillText('serial number 00484505.', this.posx * canvasWidth, (this.posy + this.separationy * 6.5) * canvasHeight);
            context.fillText('Now he wants to travel to the future, COLLECT all', this.posx * canvasWidth, (this.posy + this.separationy * 8) * canvasHeight);
            context.fillText('cool riffs, COME BACK and get a No.1 hit!', this.posx * canvasWidth, (this.posy + this.separationy * 9) * canvasHeight);

            context.textAlign = 'right';
            context.font = '20px Tahoma';
            context.fillText('Press ENTER to proceed!', canvasWidth*0.99, canvasHeight*0.98);

        }
        else {                              // Explanation text
            context.fillText('Use the ARROW keys to move and collect ALL cool', this.posx * canvasWidth, this.posy * canvasHeight);
            context.fillText('riffs from the future (the more the better)!', this.posx * canvasWidth, (this.posy + this.separationy) * canvasHeight);
            context.fillText('Avoid getting too close to the time singularity', this.posx * canvasWidth, (this.posy + this.separationy * 2.5) * canvasHeight);
            context.fillText('blobs.', this.posx * canvasWidth, (this.posy + this.separationy * 3.5) * canvasHeight);
            context.fillText('If you miss a riff or touch a time singularity', this.posx * canvasWidth, (this.posy + this.separationy * 5) * canvasHeight);
            context.fillText('bad things might happen.', this.posx * canvasWidth, (this.posy + this.separationy * 6) * canvasHeight);
            context.fillText('You can travel as far as you want and collect', this.posx * canvasWidth, (this.posy + this.separationy * 7.5) * canvasHeight);
            context.fillText('as many riffs as you want, but time travelling', this.posx * canvasWidth, (this.posy + this.separationy * 8.5) * canvasHeight);
            context.fillText('is not that easy. You have to COME BACK!', this.posx * canvasWidth, (this.posy + this.separationy * 9.5) * canvasHeight);
            context.fillText('Press SPACE to turn around in time and make', this.posx * canvasWidth, (this.posy + this.separationy * 11) * canvasHeight);
            context.fillText('sure you take the same way back or the future', this.posx * canvasWidth, (this.posy + this.separationy * 12) * canvasHeight);
            context.fillText('changes and your riffs might be useless!', this.posx * canvasWidth, (this.posy + this.separationy * 13) * canvasHeight);


            context.textAlign = 'right';
            context.font = '20px Tahoma';
            context.fillText('Press ENTER to start your journey!', canvasWidth*0.99, canvasHeight*0.98);
        }


        // Key information
        context.fillStyle = 'white';



    },

    // On Enter
    function(){

        // Set the enter press timer to now
        this.lastEnterPress = Date.now();

        // If this is true the story is shown, if this is false the controls and game explanations are shown
        this.storyVisible = true;

        // positions for the text (left aligned)
        this.posx = 0.38;           // x position for the text (left aligned) in canvas width
        this.posy = 0.10;           // y position for the text in canvas width
        this.separationy = 0.05;    // y separation between the texts in canvas height

    },

    // On Exit
    function(){

    },
);

gameStates.push(stateStory);