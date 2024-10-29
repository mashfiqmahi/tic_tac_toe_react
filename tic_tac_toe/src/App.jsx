import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));  // 9 squares, initially empty
  const [isXNext, setIsXNext] = useState(true);             // To track turns
  const winner = calculateWinner(board);                    // Winner is recalculated after each move

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if square is already filled or game is won

    const newBoard = board.slice();     // Copy the current board
    newBoard[index] = isXNext ? 'X' : 'O'; // Place X or O depending on turn
    setBoard(newBoard);                 // Update the board state
    setIsXNext(!isXNext);               // Switch turns
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board squares={board} onClick={handleClick} />
      <div className="info">
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <button onClick={handleRestart} className="restart-button">Restart Game</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Horizontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Vertical lines
    [0, 4, 8], [2, 4, 6],              // Diagonal lines
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
