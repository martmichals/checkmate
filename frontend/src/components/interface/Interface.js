import React from 'react'

// Styling
import './Interface.css'
import '../../common/themes.css'

// Chessboard and terminal imports
import ChessBoard from '../chessboard/ChessBoard'
import ChessTerminal from '../chessterminal/ChessTerminal'

// Chess game object
import ChessGame from '../../common/chessgame/ChessGame'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      game: new ChessGame()
    }
  }

  // TODO : Figure out how to output shit
  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <ChessBoard game={this.state.game} />
        <ChessTerminal output={this.state.game.output} />
      </div>
    )
  }
}

export default Interface
