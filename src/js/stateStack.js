class StateStack {

    /**
     * Constructor for the state stack class. This class controls the different states (e.g loading, menu, game,...)
     * and transitions between them
     * @param {string} name - Name of the state.
     * @param {function} update - Update function of this state.
     * @param {function} render - Render function of this state.
     * @param {function} onEnter - Function which is executed when this state is started.
     * @param {function} onExit - Function which is executed when you leave this state.
     */
    constructor() {

        // initialize the array
        this.states = [];

        // create and add an empty state to the stack to avoid errors and handling edge cases :).
        let EmptyState = new State(
            'Empty',
            function(){},
            function(){},
            function(){},
            function(){}
        );

        this.push(EmptyState);              // add the empty state

        this.currentState = EmptyState;         // set the empty state as the current state
        this.currentStateStart = Date.now();    // set the time when the current state was entered

    }

    /**
     * Adds a new state to the stack.
     * @param {State} state - Game state object
     */
    push(state) {
        this.states.push(state);
    }

    /**
     * Changes from the current state to the next one
     * @param {stringe} stateName - Name of the the state you want to change to.
     */
    changeTo(stateName) {

        this.currentState.onExit();

        this.currentState = this.getStateByName(stateName);
        this.currentStateStart = Date.now();

        console.log(this.states);

        this.currentState.onEnter();

    }

    /**
     * Returns the state object by giving the name of a state (search for a state)
     * @param {string} stateName - Name of the state
     * @returns {State} - State object with the selected name
     */
    getStateByName(stateName) {
        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i].name === stateName) {
                return this.states[i];
            }
        }
    }


    /**
     * Provides the time (in seconds) for how long the current state is active
     * @returns {number} - Time (in s) for how long the current state was active
     */
    getTimeInCurrentState() {
        return (Date.now() - this.currentStateStart) / 1000;
    }

}