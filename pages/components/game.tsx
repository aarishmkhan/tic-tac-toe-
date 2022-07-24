import React, { useState} from "react"
import Board from "./board";
import { atom, useRecoilState } from "recoil";
//import { userAgent } from "next/server";

export default function Game() {
    function calculateWinner(boxesOnBoard: any) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (boxesOnBoard[a] && boxesOnBoard[a] === boxesOnBoard[b] && boxesOnBoard[a] === boxesOnBoard[c]) {
            return boxesOnBoard[a];
          }
        }
        return null;
    
    }

    const whoIsNext = atom({
      key: "whoisnext",
      default: true
    })
    const stepCounter = atom({
      key: "stepcounter",
      default: 0
    })
    const historyStorage = atom({
      key: "historystorage",
      default: [Array(9).fill(null)]
    })
    
    const [xIsNext, setNext] = useRecoilState(whoIsNext)
    const [stepNumber,setStepNo] = useRecoilState(stepCounter)
    const [history,setHistory] = useRecoilState(historyStorage)

    function handleClick(i: number) {
      const changedHistory = history.slice(0, stepNumber + 1);
      const current = changedHistory[stepNumber];
      const boxesOnBoard =[...current];
      
      if (calculateWinner(boxesOnBoard) || boxesOnBoard[i]){
        return;
      }
      
      else return (boxesOnBoard[i] = xIsNext ? 'X': 'O',
      setNext(!xIsNext),
      setStepNo(changedHistory.length),
      setHistory([...changedHistory, boxesOnBoard])
      );
    }

    function jumpTo(step: number) {
      setStepNo(step);
      if ((step%2)===0){
        setNext(true);

      }
    }
    const changedHistory = history;
    const current = changedHistory[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
      const desc = move ?  'Go to move #' + move : 'Restart game';
        return (
          <li key={move}>
            <button className="historyButton" onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              boxesOnBoard={current}
              onClickB={(i) => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }

 