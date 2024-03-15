import Square from "./Square.js";
import Notification from "./Notification.js";

class Board {
    #players = [];
    #squares = [];
    #domBoard;

    constructor({ players }) {
        this.players = players;
        this.build();
    }

    build() {
        for(let i = 1; i < 10; i++) {
            const name = String.fromCharCode(96 + i);
            const value = Math.pow(2, i - 1);
            this.#squares.push(new Square({name, value, players: this.players}));
        }

        this.#domBoard = document.createElement('div');
        this.#domBoard.id = 'board';

        this.#squares.map(square => {
            square.domSquare.addEventListener('click', () => this.checkStatus());
            this.#domBoard.appendChild(square.domSquare);
        });

        const resetButton = document.createElement('button');
        resetButton.id = 'reset';
        resetButton.textContent = 'Reset';
        resetButton.addEventListener('click', () => this.reset());
        this.#domBoard.appendChild(resetButton);
    }

    reset() {
        this.domBoard.style.pointerEvents = 'auto';
        this.#squares.forEach(square => square.reset());
        this.players.forEach(player => player.reset());
        this.players[0].playerTurn = true;
    }

    win() {
        return this.players.some(player => player.checkWin());
    }

    draw() {
        return this.#squares.every(square => square.isOccupied);
    }

    checkStatus() {
        if (this.win()) {
            const winner = this.players.find(player => player.checkWin());
            const squaresToDraw = this.findSquaresToDraw(winner.score);
            // this.drawLine({ from: squaresToDraw[0], to:squaresToDraw[2], color: winner.color });
            this.notify(`${winner.name} venceu!`, 'success');
        } else if (this.draw()) {
            this.notify('Deu velha!', 'error');
        }
    }

    notify(message, type) {
        // this.domBoard.style.pointerEvents = 'none';
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

    get domBoard() {
        return this.#domBoard;
    }

    get players() {
        return this.#players;
    }

    set players(players) {
        this.#players = players;
    }
}

export default Board;