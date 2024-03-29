class Player {
    #name;
    #shape;
    #color;
    #score = {};
    #playerTurn;
    #squares = [];
    #combinations = [];
    isRobot = false;
    /**
     * @type { Board }
     */
    #board;

    constructor(
        { name, shape, playerTurn = false, color = '#dedede' }
    ) {
        this.name = name;
        this.shape = shape;
        this.playerTurn = playerTurn;
        this.color = color ?? this.color;
    }

    reset() {
        this.score = {};
        this.#squares = [];
        this.playerTurn = false;
    }

    buildDOMShape() {
        const domShape = document.createElement('i');
        domShape.id = this.name;
        domShape.style.color = this.color;
        if (this.shape === 'X') {
            domShape.className = 'shape fa-solid fa-xmark';
        } else if (this.shape === 'O') {
            domShape.className = 'shape fa-regular fa-circle';
        } else {
            domShape.className = 'shape fa-solid fa-fire';
        }
        return domShape;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get shape() {
        return this.#shape;
    }

    set shape(shape) {
        this.#shape = shape;
    }

    get combinations() {
        return this.#combinations;
    }

    set combinations(combination) {
        this.#combinations.push(combination);
    }

    get score() {
        return this.#score;
    }

    set score(score) {
        this.#score = score;
    }

    get playerTurn() {
        return this.#playerTurn;
    }

    set playerTurn(playerTurn) {
        this.#playerTurn = playerTurn;
    }

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
    }

    get squares() {
        return this.#squares;
    }

    /**
     * @param { Square } square
     */
    set squares(square) {
        this.#squares.push(square);
        if (this.squares.length === 3) {
            const values = this.squares.map(square => square.value);
            const sum = values.reduce((acc, value) => acc + value, 0);
            this.#score[sum] = values;
        } else if (this.squares.length > 3) {
            const newMatrix = this.calculateMatrixByValue(square.value);
            this.score = this.combineMatrix(newMatrix);
            this.checkWin();
        }
    }

    get board() {
        return this.#board;
    }

    set board(board) {
        this.#board = board;
    }

    combineMatrix(matrix) {
        const combinedMatrix = {};
        Object.values(matrix).forEach(combination => {
            const sum = combination.reduce((acc, value) => acc + value, 0);
            combinedMatrix[sum] = combination;
        });
        return combinedMatrix;
    }

    calculateMatrixByValue(value) {
        const scoreValues = Object.values(this.score);
        if (scoreValues.length > 0) {
            const newMatrix = [];
            scoreValues.forEach(combination => {
                newMatrix.push(combination);
                combination.forEach((val, index) => {
                    const newCombination = [...combination];
                    newCombination[index] = value;
                    newMatrix.push(newCombination);
                });
            });
            return newMatrix;
        } else {
            const newCombination = this.squares.map(square => square.value);
            newCombination.push(value);
            return this.combineMatrix([newCombination]);
        }
    }

    checkWin(score = null) {
        return Object.keys(score ?? this.score).some(sum => this.board.winningCombinations.includes(Number(sum)));
    }
}

export default Player;