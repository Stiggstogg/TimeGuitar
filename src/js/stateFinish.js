/*
==========================
Game state: Finish
==========================
 */

let stateFinish = new State(
    'finish',

    // Update
    function(){

        menuGuitarist.update();
        menuCrowd.update();

        // Check if 'Space' is pressed and start the game
        if (keyPressed('enter') && gameStates.getTimeInCurrentState() > 3) {
            gameStates.changeTo('forward');
        }

        // Check if 'Esc' is pressed and start the game
        if (keyPressed('esc') && gameStates.getTimeInCurrentState() > 3) {
            gameStates.changeTo('menu');
        }

    },

    // Render
    function(){

        menuBackground.render();
        menuGuitarist.render();
        menuCrowd.render();

        // Title text
        context.font = '30px Tahoma';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('You made it back!', canvasWidth * 0.5, canvasHeight * 0.15);

        // Stats text
        context.textAlign = 'left';
        context.font = '10px Tahoma';

        context.fillText('Riffs collected:', canvasWidth*0.20, canvasHeight*0.25);
        context.fillText(scores.notes.toFixed(0), canvasWidth*0.37, canvasHeight * 0.25);

        context.fillText('Back travel accuracy:', canvasWidth*0.20, canvasHeight*0.29);
        context.fillText(scores.trace.toFixed(0) + ' %', canvasWidth*0.37, canvasHeight * 0.29);

        if (gameStates.getTimeInCurrentState() > 0.5) {
            context.textAlign = 'center';
            context.font = '20px Tahoma';
            context.fillText('Let\'s have a look at the charts!', canvasWidth*0.73, canvasHeight*0.25);
        }

        if (gameStates.getTimeInCurrentState() > 1) {
            charts.render();

            // Title
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.font = '20px Courier New';
            context.fillText('HOT 100', canvasWidth * 0.73, canvasHeight * 0.38);

            // Fill charts
            for (let i = 0; i < 3; i++) {

                // Rank
                context.font = '20px Courier New';
                context.textAlign = 'center';
                context.fillStyle = scores.getChartEntry(i).color;

                context.fillText(scores.getChartEntry(i).rank, canvasWidth * this.rankX, canvasHeight * (this.rankY + i * this.separation));

                // Songs
                context.textAlign = 'left';
                context.font = '17px Courier New';
                context.fillText(scores.getChartEntry(i).song, canvasWidth * this.songBandX, canvasHeight * (this.songY + i * this.separation));

                // Bands
                context.font = '15px Courier New';
                context.fillText(scores.getChartEntry(i).band, canvasWidth * this.songBandX, canvasHeight * (this.bandY + i * this.separation));
            }
        }

        //

        if (gameStates.getTimeInCurrentState() > 3) {

            context.textAlign = 'left';
            context.font = '15px Tahoma';
            context.fillStyle = 'white';
            context.fillText('ENTER: Restart', canvasWidth * 0.01, canvasHeight * 0.65);
            context.fillText('ESC: Back to Menu', canvasWidth * 0.01, canvasHeight * 0.70);

        }

    },

    // On Enter
    function(){

        scores.createCharts();

        // Stop audio and set back to start
        audioAssets['estring'].pause();
        audioAssets['estring'].currentTime = 0;

        // Start winning audio
        audioAssets['win'].play();

        // Chart positions
        this.rankX = 0.536;
        this.rankY = 0.515;
        this.separation = 0.16;
        this.songBandX = 0.575;
        this.songY = 0.48;
        this.bandY = 0.54;

        menuGuitarist.playAnimation('rock');

    },

    // On Exit
    function(){

        // Stop audio and set back to start
        audioAssets['win'].pause();
        audioAssets['win'].currentTime = 0;

    }
);

gameStates.push(stateFinish);