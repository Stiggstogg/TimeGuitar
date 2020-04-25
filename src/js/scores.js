class Scores {

    /**
     * Constructor for the scores class. A state object represents a state in the game (e.g loading, menu, game,...).
     * @param {number} maxNotes - Maximum number of notes (riffs) which provide the maximum riff points
     * @param {number} maxAccuracy - Maximum number of accuracy which provide the maximum accuracy points in precentage
     */
    constructor(maxNotes, maxAccuracy) {

        // initialize note and trace (accuracy of back travel)
        this.notes = 0;
        this.trace = 0;

        // Values for the rank calculation
        this.maxNotes = maxNotes;           // Maximum number of notes (riffs) which provide the maximum riff points
        this.maxAccuracy = maxAccuracy;     // Maximum number of accuracy which provide the maximum accuracy points in precentage

        // Initialize rank
        this.rank = 100;

        // initialize charts
        this.charts = [
            {rank: 1, song: 'Song1', band: 'band1', color: 'black'},
            {rank: 2, song: 'Song2', band: 'band2', color: 'black'},
            {rank: 3, song: 'Song3', band: 'band3', color: 'black'}
        ];

        // Songs (Array)
        this.songs = [
            'Dirty Table Blues',
            'I like Dolphins',
            'Hot Potato Pillow',
            'Three Way Switch',
            'Guitar Music is Dead'
        ];

        // Bands (Array)
        this.bands = [
            'Tim and his Kittens',
            'The Sword Crew',
            'The Pirate Dancers',
            'The Killerbees',
            'DJ Bluescreen'
        ];

        // Game over consequences
        this.over = [
            'Nobody loves you anymore, not even your cat!',
            'You got heavily addicted to country music!',
            'The new No. 1 hit was made by a DJ on his tablet!'
        ]

        // Setup the temporary values for songs, bands and consequences
        this.tempSongs = Object.assign(this.songs);
        this.tempBands = Object.assign(this.bands);

        // Initialize game over reason
        this.touchedBlock = true;       // True if the player touched a block, false if he forgot a riff

    }

    reset() {
        this.notes = 0;
        this.trace = 0;

        // Reset temporary values for songs, bands and consequences
        this.tempSongs = Object.assign(this.songs);
        this.tempBands = Object.assign(this.bands);

    }

    calculateRank() {

        // rank calculation
        let rank = Math.floor(-99 * ((this.notes / this.maxNotes) * (this.trace / this.maxAccuracy)) + 100);

        // make sure that rank is always between 1 and 100!
        if (rank > 100) {
            rank = 100;
        }
        else if (rank < 1) {
            rank = 1;
        }

        this.rank = rank;
    }

    getRandomSongBand(array) {

        let i = this.getRandomInt(array.length);    // get a random index

        let song = array[i];                    // get the song with this index
        array.splice(i,1);                      // remove this element from the temporary array

        return song
    }

    getSong() {
        return this.getRandomSongBand(this.tempSongs)
    }

    getBand() {
        return this.getRandomSongBand(this.tempBands)
    }

    getOver() {
        return this.over[this.getRandomInt(this.over.length)];
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    createCharts() {
        this.calculateRank();

        // Fill in all entries with a random song and band, as well as the standard color
        for (let i = 0; i < 3; i++) {
            this.charts[i].song = this.getSong();
            this.charts[i].band = this.getBand();
            this.charts[i].color = 'black';
        }

        if (this.rank === 1) {

            // first entry
            this.charts[0].rank = this.rank;
            this.charts[0].band = 'Johnny Twochords';
            this.charts[0].color = 'blue';

            // set other ranks
            this.charts[1].rank = this.rank + 1;
            this.charts[2].rank = this.rank + 2;

        }
        else if (this.rank === 100) {

            // last entry
            this.charts[2].rank = this.rank;
            this.charts[2].band = 'Johnny Twochords';
            this.charts[2].color = 'blue';

            // set other ranks
            this.charts[0].rank = this.rank - 2;
            this.charts[1].rank = this.rank - 1;

        }
        else {

            // middle entry
            this.charts[1].rank = this.rank;
            this.charts[1].band = 'Johnny Twochords';
            this.charts[1].color = 'blue';

            // set other ranks
            this.charts[0].rank = this.rank - 1;
            this.charts[2].rank = this.rank + 1;
        }
    }

    getChartEntry(i) {
        return this.charts[i];
    }

}