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

gameStates.changeTo('loading');    // change to the first game state TODO: Adapt when the loading and menu is added
loop.start();                            // start loop