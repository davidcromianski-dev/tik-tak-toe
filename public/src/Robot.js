import Player from "./Player.js";

class Robot extends Player {
    /**
     * @type { Board }
     */
    board;
    /**
     * @type { Array<Square> }
     */
    emptySquares;
    isRobot = true;
    opponent;

    /**
     * @param { Board } board
     */
    play(board) {
        board.lockBoard();
        console.log("Robot is playing");
        this.opponent = this.opponent ?? board.players.filter(player => player !== this)[0];
        this.board = board
        this.emptySquares = board.getEmptySquares();
        setTimeout(() => {
            if (this.squares.length === 0) {
                this.randomPlay();
            } else {
                this.calculatedPlay();
            }
            board.unlockBoard();
        }, 1000);
    }

    randomPlay() {
        console.log("I have no squares. Going to make a random move")
        const randomNumber = Math.floor(Math.random() * this.emptySquares.length);
        const square = this.emptySquares[randomNumber].element;
        square.dispatchEvent(new Event('click'));
    }

    calculatedPlay() {
        const opponentWinsCell = this.checkOpponentIsGoingToWin();
        if (opponentWinsCell) {
            console.log("Opponent is going to win")
            opponentWinsCell.dispatchEvent(new Event('click'));
            console.log("Prevented that")
        } else {
            console.log("No one is going to win")
            let closestToWin;
            this.emptySquares.forEach(square => {
                const matrix = this.calculateMatrixByValue(square.value);
            })
        }
    }

    checkOpponentIsGoingToWin() {
        const opponentCells = this.board.getCellsByPlayer(this.opponent);
        console.log('I\'m going to check the empty cells');
        if (opponentCells.length > 3) {
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
                if (this.winningCombinations.includes(sum)) {
                    console.log('Opponent can win! Must block it');
                    return square.element;
                }
            }
        }
        return false;
    }
    
    checkWithMatrix() {
        
    }
}

export default Robot;