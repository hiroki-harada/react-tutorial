import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'

import Board from "./Board"
import GameInfo from './GameInfo'
import './index.css'


const Game = () => {

  const [state, setState] = useState({
    history: [{
      squares: Array(9).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0
  })


  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1)
    const current = history[state.stepNumber]
    const squares = current.squares.slice()
    
    // ゲームの決着が既についている場合、クリックされたマス目が既に埋まっている場合に早期 return
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = state.xIsNext ? "X" : "O"
    console.log(squares)
    setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length
    })
  }

  const jumpTo = (step) => {
    setState({
      stepNumber: step,
      xIsNext: (step%2) === 0
    })
  }

  const calculateStatus = () => {
    const winner = calculateWinner(calculateCurrent().squares)
    return winner ? 
        `Winner: ${winner}`
        : `Next player: ${state.xIsNext ? "X" : "O"}`
  }
  
  const calculateCurrent = () => {
    const history = state.history
    return history[history.length - 1]
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={calculateCurrent().squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <GameInfo
          status={calculateStatus()}
          history={state.history}
          onClick={(step) => jumpTo(step)}
        />
      </div>
    </div>
  )
}

// ========================================
// helper function
// ========================================
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />)  