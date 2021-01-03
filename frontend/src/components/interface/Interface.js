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

class Interface extends React.Component {
  constructor (props) {
    super(props)

    const userColor = Math.floor(Math.random() * 2) === 0 ? 'white' : 'black'
    this.state = {
      game: new ChessGame((message) => { this.appendToOutput(message) }, userColor),
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
      game: new ChessGame((message) => { this.appendToOutput(message) }, this.state.game.getUserColor())
    })
    this.appendToOutput('The Game has been reset')
  }

  handleSwap () {
    this.setState({
      game: new ChessGame((message) => { this.appendToOutput(message) }, this.state.game.getOpponentColor())
    })
    this.appendToOutput('The Game has been reset')
  }

  render () {
    // Opponent color
    let opponentColor = this.state.game.getOpponentColor()
    opponentColor = opponentColor.substring(0, 1).toUpperCase() + opponentColor.substring(1)
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
