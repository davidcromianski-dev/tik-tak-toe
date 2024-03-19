import Board from "./src/Board.js";
import Player from "./src/Player.js";
import Robot from "./src/Robot.js";

const app = document.getElementById('app');

const players = [
    new Player({ name: 'Jogador 1', shape: 'X', color: '#F00', playerTurn: true}),
    new Robot({ name: 'Robô', shape: 'O', color: '#00F'})
];

const board = new Board({ players });

app.appendChild(board.element)