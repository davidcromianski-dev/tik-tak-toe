import Board from "./src/Board.js";
import Player from "./src/Player.js";

const players = [
    new Player({ name: 'Jogador 1', shape: 'X', color: '#F00', playerTurn: true}),
    new Player({ name: 'Jogador 2', shape: 'O', color: '#00F' })
];

const board = new Board({ players });

document.getElementById('app').appendChild(board.domBoard)