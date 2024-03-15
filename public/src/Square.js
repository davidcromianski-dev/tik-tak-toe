class Square {
    #name;
    #value;
    #isOccupied;
    #occupant = null;
    #domSquare = null;
    #players = [];
    #color;


    constructor({ name, value, players, isOccupied = false, color = null }) {
        this.name = name;
        this.value = value;
        this.players = players;
        this.isOccupied = isOccupied;
        this.color = color ?? this.color;
        this.build();
    }

    build() {
        this.buildDOMSquare();
    }

    buildDOMSquare() {
        this.#domSquare = document.createElement('div');
        this.#domSquare.classList.add('square');
        this.#domSquare.id = `square-${this.name}`;
        this.#domSquare.value = this.value;
        this.#domSquare.addEventListener('click', () =>  this.place());
    }

    place() {
        if (this.isOccupied) return;
        this.isOccupied = !this.isOccupied;
        const currentPlayer = this.players.find(player => player.playerTurn);
        this.domSquare.appendChild(currentPlayer.buildDOMShape());
        this.occupant = (this.isOccupied) ? currentPlayer : null;
        currentPlayer.score += (this.isOccupied) ? this.value : -this.value;
        this.players.forEach(player => player.playerTurn = !player.playerTurn);
    }

    reset() {
        this.isOccupied = false;
        this.occupant = null;
        this.domSquare.innerHTML = '';
    }

    get value() {
        return this.#value;
    }

    get isOccupied() {
        return this.#isOccupied;
    }

    set value(value) {
        this.#value = value;
    }

    get players() {
        return this.#players;
    }

    set players(players) {
        this.#players = players;
    }

    set isOccupied(isOccupied) {
        this.#isOccupied = isOccupied;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get occupant() {
        return this.#occupant;
    }

    set occupant(occupant) {
        this.#occupant = occupant;
    }

    get domSquare() {
        return this.#domSquare;
    }

    set color(color) {
        this.#color = color;
    }

    get color() {
        return this.#color;
    }

}

export default Square;