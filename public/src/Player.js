class Player {
    #name;
    #shape;
    #color;
    #score;
    #playerTurn;
    #winCondition = [7, 56, 448, 73, 146, 292, 273, 84];

    constructor( { name, shape, score = 0, playerTurn = false, color = '#dedede'}) {
        this.name = name;
        this.shape = shape;
        this.score = score;
        this.playerTurn = playerTurn;
        this.color = color ?? this.color;
    }

    reset() {
        this.score = 0;
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

    checkWin() {
        return this.#winCondition.some((win) => (win & this.score) === win);
    }
}

export default Player;