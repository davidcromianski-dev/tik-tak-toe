import Player from "./Player.js";

class Robot extends Player {
    /**
     * @type { Array<Square> }
     */
    emptySquares;
    isRobot = true;
    opponent;

    /**
     * @param { Board } board
     */
    play() {
        this.board.lockBoard();
        this.opponent = this.opponent ?? this.board.players.filter(player => player !== this)[0];
        this.emptySquares = this.board.getEmptySquares();
        setTimeout(() => {
            if (this.playerTurn) {
                if (this.squares.length === 0) {
                    this.randomPlay();
                } else {
                    this.calculatedPlay();
                }
                this.board.unlockBoard();
            }
        }, 1000);
    }

    randomPlay() {
        const randomNumber = Math.floor(Math.random() * this.emptySquares.length);
        const square = this.emptySquares[randomNumber].element;
        square.dispatchEvent(new Event('click'));
    }

    calculatedPlay() {
        const winningSquares = this.emptySquares.filter(square => {
            const matrix = this.calculateMatrixByValue(square.value);
            return this.checkWin(matrix);
        });
        if (winningSquares.length > 0) {
            const square = winningSquares[0].element;
            square.dispatchEvent(new Event('click'));
        } else {
            const opponentWinsCell = this.checkOpponentIsGoingToWin();
            if (opponentWinsCell) {
                opponentWinsCell.dispatchEvent(new Event('click'));
            } else {
                const possiblePlays = {};
                console.log(this.board.winningCombinations)
                this.squares.forEach(square => {
                    this.emptySquares.forEach(emptySquare => {
                        const sum = square.value + emptySquare.value;
                        console.log(sum, this.combinations);
                    });
                });
                console.log(possiblePlays);
                if (possiblePlays.length > 0) {
                    const square = possiblePlays[0].element;
                    square.dispatchEvent(new Event('click'));
                }
            }
        }
    }

    checkOpponentIsGoingToWin() {
        const opponentCells = this.board.getCellsByPlayer(this.opponent);
        if (opponentCells.length >= 3) {
            for (const square of this.emptySquares) {
                const matrix = this.opponent.calculateMatrixByValue(square.value);
                const combinedMatrix = this.combineMatrix(matrix, opponentCells);
                if (this.opponent.checkWin(combinedMatrix)) {
                    return square.element;
                }
            }
        } else {
            for (const square of this.emptySquares) {
                const sum = square.value + opponentCells.reduce((acc, cell) => acc + cell.value, 0);
                if (this.board.winningCombinations.includes(sum)) {
                    return square.element;
                }
            }
        }
        return false;
    }
}

export default Robot;