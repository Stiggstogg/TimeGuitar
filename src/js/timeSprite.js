
class TimeSprite extends Sprite.class {

    constructor(properties) {

        super(properties);

    }

    /**
     * Checks if the timeline sprite moved out of the canvas. If yes, it is replaced at the other side of the canvas.
     * In this way, if two timeline sprites are used an infinite timeline is visible at the bottom.
     */
    reposition() {

        // check where the sprite is and reposition it (depending on the current moving direction) if it is outside of the canvas
        if (this.forward && this.x <= -this.width) {
            this.x = canvasWidth - (- this.width - this.x);     // reposition to the right side and shift it already a bit left if it moved already too much
            this.repetition++;                                  // increase the repetition counter
            this.addAllDates();
        }
        else if (!this.forward && this.x >= this.width) {
            this.x = -canvasWidth + (this.x - canvasWidth);                // reposition to the left side and shift it already a bit right if it moved already too much
        }

    }

    /**
     * Adds a date / time field text to the array (which is then drawn)
     */
    addDate(x, y, date) {
        this.dateTexts.push({
            x: x,
            y: y,
            date: date
        });
    }

    /**
     * Adds all date / time fields to the current position of the timeline
     */
    addAllDates() {

        let offset = 0;                 // offset for the sprite (important if it is not the first sprite)

        // add the offset to the date if it is the second sprite
        if (!this.firstSprite) {
            offset = 4;                 // four times the time difference is the offset
        }

        // add all for dates with the corresponding additional dates in contrast to the start date
        for (let i = 0; i < 4; i++) {
            this.addDate(this.x + 0.25 * (i+1) * this.width, this.y + 0.5 * this.height,
                new Date(this.startDate.getTime() +                 // current date
                    (timeDifference * 24 * 60 * 60 * 1000) *              // + time difference in milliseconds
                    (this.repetition * 8 + i + offset)));                 // * which repetition it is and which of the four dates it is
        }
    }

    /**
     * Update the x coordinates of all date texts
     */
    updateAllDates() {
        for (let i = 0; i < this.dateTexts.length; i++) {
            this.dateTexts[i].x = this.dateTexts[i].x + this.dx;
        }
    }

    /**
     * Render all date texts
     */
    renderAllDates() {

        // text settings
        context.font = '10px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';

        // render every date as local date string
        for (let i = 0; i < this.dateTexts.length; i++) {
            context.fillText(this.dateTexts[i].date.toLocaleDateString(), this.dateTexts[i].x, this.dateTexts[i].y);
        }

    }


    /**
     * Changes the moving direction of the timeline:
     * forward: from left to right
     * backward: from right to left
     */
    changeDirection() {
        this.forward = !this.forward;   // change the direction switch
        this.dx = -this.dx;             // reverse the moving speed
    }

    /**
     * Resets the sprite
     */
    reset() {
        this.forward = true;            // Set the direction of the timeline (true: moving forward (from left to right))

        this.dateTexts = [];            // initialize the array with all the dates
        this.startDate = new Date(Date.now() - 2 * (timeDifference * 24 * 60 * 60 * 1000));    // set the start date - 2 time time difference, as the player starts at the third date, which then should be the current date

        // Set the starting position of the timeline
        if (this.firstSprite) {
            this.x = 0;             // if it is the first (of two) timelines it is placed inside the canvas
        }
        else {
            this.x = canvasWidth;   // if it is the second (of two) it is placed just to the right of the canvas
        }

        this.repetition = 0;        // repetition counter, to calculate how much time this timeline was already used
    }

}