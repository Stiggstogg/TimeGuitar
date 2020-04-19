class State {

    /**
     * Constructor for the state class. A state object represents a state in the game (e.g loading, menu, game,...).
     * @param {string} name - Name of the state.
     * @param {function} update - Update function of this state.
     * @param {function} render - Render function of this state.
     * @param {function} onEnter - Function which is executed when this state is started.
     * @param {function} onExit - Function which is executed when you leave this state.
     */
    constructor(name, update, render, onEnter, onExit) {

        this.name = name;
        this.update = update;
        this.render = render;
        this.onEnter = onEnter;
        this.onExit = onExit;

    }
}