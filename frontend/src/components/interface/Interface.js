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
import 'bootstrap/dist/css/bootstrap.min.css';

class Interface extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: new ChessGame(this.appendToOutput),
      output: []
    }

    this.resetGame = this.resetGame.bind(this)
  }

  appendToOutput = (message) => {
    const out = this.state.output
    out.push(message)
    this.setState({
      output: out
    })
  }

  resetGame () {
    this.setState({
      game: new ChessGame(this.appendToOutput)
    })
    this.appendToOutput('Game has been reset')
  }

  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <ChessBoard game={this.state.game} />
        <div>
          <ChessTerminal style={{position: 'absolute'}} output={this.state.output} />
          <Button 
          variant='dark' 
          className='button left-btn'
          onClick={this.resetGame}>Reset</Button>
          <Button variant='dark' className='button right-btn'>Play as {"OTHER"}</Button>
        </div>
      </div>
    )
  }
}

export default Interface
