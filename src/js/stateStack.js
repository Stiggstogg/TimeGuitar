class StateStack {

    /**
     * Constructor for the state stack class. This class controls the different states and transitions between them
     * @param {string} name - Name of the state.
     * @param {function} update - Update function of this state.
     * @param {function} render - Render function of this state.
     * @param {function} onEnter - Function which is executed when this state is started.
     * @param {function} onExit - Function which is executed when you leave this state.
     */
    constructor() {

        this.states = [];

        let EmptyState = new State(
            'Empty',
            function(){},
            function(){},
            function(){},
            function(){}
        );

        this.push(EmptyState);
        this.currentState = EmptyState;

    }

    push(state) {
        this.states.push(state);
    }

    changeTo(stateName) {

        this.currentState.onExit();

        this.currentState = this.getStateByName(stateName);

        this.currentState.onEnter();

    }

    getStateByName(stateName) {
        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i].name === stateName) {
                return this.states[i];
            }
        }
    }

}