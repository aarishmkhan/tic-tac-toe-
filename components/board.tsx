import React from "react"
import Square from "./square";

interface BoardProp{
    boxesOnBoard: any[]
    onClickB: (i: number) => any;
}

export default function Board({boxesOnBoard,onClickB}: BoardProp){
      return (
        <div className="board">
            {boxesOnBoard.map((square,i) => (
                <Square key={i} value={square} onClick={() => onClickB(i)}/> 
        ))}
        </div>
      );
    }

 