import Square from "./Square.js";
import Notification from "./Notification.js";

class Board {
    #players = [];
    #squares = [];
    #buttons = [];
    #element;
    #title;
    #winner;

    constructor({ players }) {
        this.players = players;
        this.build();
    }

    build() {
        this.#element = document.createElement('div');
        this.#element.id = 'board';

        this.#title = document.createElement('h1');
        this.#title.id = 'board-title';
        this.title = 'Sua vez de jogar!';

        const squaresContainer = document.createElement('div');
        squaresContainer.id = 'squares-container';
        for(let i = 1; i < 10; i++) {
            const name = String.fromCharCode(96 + i);
            const value = Math.pow(2, i - 1);
            const square = new Square({name, value, players: this.players});
            square.element.addEventListener('click', () => this.checkStatus());
            this.squares = square;
            this.appendChildren([square.element], squaresContainer);
        }

        const resetButton = document.createElement('button');
        resetButton.id = 'reset';
        resetButton.textContent = 'Reiniciar';
        resetButton.addEventListener('click', () => this.reset());
        this.buttons = { name: 'reset', button: resetButton };

        this.appendChildren([this.#title, squaresContainer, resetButton]);
    }

    appendChildren(children, to = this.#element) {
        children.forEach(child => to.appendChild(child));
    }

    reset() {
        this.element.style.pointerEvents = 'auto';
        this.#squares.forEach(square => square.reset());
        this.players.forEach(player => player.reset());
        this.players[0].playerTurn = true;
    }

    win() {
        return this.players.some(player => {
            if (player.checkWin()) {
                this.winner = player;
                return true;
            }
        });
    }

    draw() {
        return this.#squares.every(square => square.isOccupied);
    }

    lockBoard() {
        this.title = 'Vez do robô!'
        this.element.style.pointerEvents = 'none';
        this.buttons['reset'].innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    unlockBoard() {
        this.title = 'Sua vez de jogar!';
        this.element.style.pointerEvents = 'auto';
        this.buttons['reset'].innerHTML = 'Reset';
    }

    checkStatus() {
        const currentPlayer = this.players.find(player => player.playerTurn);
        if (currentPlayer.isRobot) {
            currentPlayer.play(this);
        }

        if (this.win()) {
            const squaresToDraw = this.findSquaresToDraw(this.winner.score);
            // this.drawLine({ from: squaresToDraw[0], to:squaresToDraw[2], color: winner.color });
            this.notify(`${this.winner.name} venceu!`, 'success');
        } else if (this.draw()) {
            this.notify('Deu velha!', 'error');
        }
    }

    notify(message, type) {
        // this.element.style.pointerEvents = 'none';
        setTimeout(() => {
            const notification = new Notification({ title: 'Fim de jogo', message, type })
            document.body.appendChild(notification);
            this.reset();
        }, 100);
    }

    drawLine({ from, to, color }) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.backgroundColor = color;
    }

    findSquaresToDraw(score) {
        const binaryString = score.toString(2);

        const bitPositions = [];
        for (let i = 0; i < binaryString.length; i++) {
            if (binaryString[i] === '1') {
                bitPositions.push(binaryString.length - i);
            }
        }

        return bitPositions.reverse();
    }

    get squares() {
        return this.#squares;
    }

    set squares(square) {
        this.#squares.push(square);
    }

    get element() {
        return this.#element;
    }

    get players() {
        return this.#players;
    }

    set players(players) {
        this.#players = players;
    }

    get buttons() {
        return this.#buttons;
    }

    set buttons( {name, button} ) {
        this.#buttons[name] = button;
    }

    set title(title) {
        this.#title.innerText = title;
    }

    set winner(winner) {
        this.#winner = winner;
    }

    get winner() {
        return this.#winner;
    }

    getEmptySquares() {
        return this.#squares.filter(square => !square.isOccupied);
    }

    getCellsByPlayer(player) {
        return this.#squares.filter(square => square.occupant === player);
    }
}

export default Board;