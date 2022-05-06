import React from 'react'

const GameInfo = (props) => {

  return (
    <div>
      <div>{props.status}</div>
      <ol>
        {props.history.map((step, move) => {
          return (
            <li key={move}>
              <button onClick={() => props.onClick(move)}>
                {move ? `Go to move #${move}` : "Go to game start"}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )

}

export default GameInfo