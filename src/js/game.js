/*
==========================
Game Loop
==========================
 */

let loop = GameLoop({
    update: function () {

        gameStates.currentState.update();

    },

    render: function () {

        gameStates.currentState.render();

    }

});

/*
==========================
Start
==========================
 */

gameStates.changeTo('loading');    // change to the first game state
loop.start();                            // start loop