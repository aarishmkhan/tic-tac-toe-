import React from "react"

interface SquareProps{
    value: any;
    onClick: () => any;
}
export default function Square({value,onClick}: SquareProps) {
    return (
      <button className="square" onClick={onClick}>{value}</button>
    );
}

