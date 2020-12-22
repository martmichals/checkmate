import React from 'react'

// Styling
import './Interface.css'
import '../../common/themes.css'
import THEMES from '../../common/themes.js'

// Chessboard and terminal imports
import Terminal from 'react-console-emulator'
import ChessBoard from '../chessboard/ChessBoard'

// Chess game object
import ChessGame from '../../common/chessgame/ChessGame'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      game: new ChessGame()
    }
  }

  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <ChessBoard game={this.state.game} />
        <Terminal
          welcomeMessage={"I'm Checkmate, a chess A.I."}
          commands={{}}
          style={{
            width: '300px',
            maxHeight: '550px',
            backgroundColor: THEMES.dark.terminal
          }}
          readOnly
        />
      </div>
    )
  }
}

export default Interface
