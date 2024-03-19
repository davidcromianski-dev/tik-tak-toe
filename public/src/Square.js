class Square {
    #name;
    #value;
    #isOccupied;
    #occupant = null;
    /**
     * @type {HTMLDivElement}
     */
    #element = null;
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
        this.#element = document.createElement('div');
        this.#element.classList.add('square');
        this.#element.id = `square-${this.name}`;
        this.#element.value = this.value;
        this.#element.addEventListener('click', () =>  this.place());
    }

    place() {
        if (this.isOccupied) return;
        /**
         * @var {Player} currentPlayer
         */
        const currentPlayer = this.players.find(player => player.playerTurn);
        this.isOccupied = true;
        this.occupant = currentPlayer;
        this.element.appendChild(currentPlayer.buildDOMShape());
        currentPlayer.squares = this;
        this.players.forEach(player => player.playerTurn = !player.playerTurn);
    }

    reset() {
        this.isOccupied = false;
        this.occupant = null;
        this.element.innerHTML = '';
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

    get element() {
        return this.#element;
    }

    set color(color) {
        this.#color = color;
    }

    get color() {
        return this.#color;
    }

}

export default Square;