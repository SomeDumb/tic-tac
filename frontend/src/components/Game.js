import React, {useState} from "react";
import './game.css';


function Square({number, value, onPress}){

    return (
        <button number={number} onClick={onPress} className="square">{value}</button>
    )


}


function Board(){

    let [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    let [winner, setWinner] = useState(null);
    let [xIsNext, setState] = useState(true);

    function isDraw() {
        for (const element of board) {
            for (let j = 0; j < board.length; j++) {
                if (element[j] === ""){
                    return (false)
                }
            }
        }
        return (true)

    }

    function calculateWinner() {
        const lines = [
          [[0, 0], [0, 1], [0, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          [[0, 0], [1, 0], [2, 0]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          [[0, 0], [1, 1], [2, 2]],
          [[0, 2], [1, 1], [2, 0]],
        ];

        for (const element of lines) {
          const [a, b, c] = element;
          if (board[a[0]][a[1]] !== "" && board[a[0]][a[1]] === board[b[0]][b[1]] &&  board[b[0]][b[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
          }
        }
        return null;
    }

    let status;
    if (winner) {
        status = 'Выиграл: ' + winner;
    } 
    else if (isDraw()){
        status = 'Ничья'
    }
    else {
      status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');
    }

    const handleClick = (row, col) => {
        const newBoard = board

        if (board[row][col] === ""){
            if (xIsNext){
                newBoard[row][col] = 'X'
                setState(false)
            }
            else{
                newBoard[row][col] = 'O'
                setState(true)
            }
            setWinner(calculateWinner())
            setBoard([...newBoard]);
        }

    }


    let squares = board.map((row, i) => {
        
        return (
            <div key={i} className="board-row">
                {row.map((col, j)=><Square key={j} onPress={() => handleClick(i, j)} value={board[i][j]} />)}
            </div>
        )
    })

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board">
            {squares}
          </div>
        </div>
    )

}


export default function Game(){

    return (
        <div className="Game">
            <Board />
        </div>
    )
}