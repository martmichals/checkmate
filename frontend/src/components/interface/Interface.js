import React from 'react'

// Styling
import './Interface.css'
import '../../common/themes.css'

// Chessboard and terminal imports
import ChessBoard from '../chessboard/ChessBoard'
import ChessTerminal from '../chessterminal/ChessTerminal'

// Chess game object
import ChessGame from '../../common/chessgame/ChessGame'

// Bootstrap button
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

// Bot type
const autoType = 'random'

class Interface extends React.Component {
  constructor (props) {
    super(props)

    const userColor = Math.floor(Math.random() * 2) === 0 ? 'white' : 'black'
    this.state = {
      game: new ChessGame((message) => { this.appendToOutput(message) }, userColor, autoType),
      output: []
    }

    this.handleReset = this.handleReset.bind(this)
    this.handleSwap = this.handleSwap.bind(this)
  }

  appendToOutput (message) {
    const out = this.state.output
    out.push(message)
    this.setState({
      output: out
    })
  }

  handleReset () {
    this.setState({
      game: new ChessGame((message) => { this.appendToOutput(message) }, this.state.game.getUserColor(), autoType)
    })
    this.appendToOutput("I've reset the game for you")
  }

  handleSwap () {
    this.setState({
      game: new ChessGame((message) => { this.appendToOutput(message) }, this.state.game.getOpponentColor(), autoType)
    })
    this.appendToOutput("I've reset the game for you")
  }

  render () {
    // Opponent color
    const opponentColor = this.state.game.getOpponentColorCap()
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <ChessBoard game={this.state.game} />
        <div>
          <ChessTerminal style={{ position: 'absolute' }} output={this.state.output} />
          <Button
            variant='dark'
            className='button left-btn'
            onClick={this.handleReset}
          >
            Reset
          </Button>
          <Button
            variant='dark'
            className='button right-btn'
            onClick={this.handleSwap}
          >
            Play as {opponentColor}
          </Button>
        </div>
      </div>
    )
  }
}

export default Interface
