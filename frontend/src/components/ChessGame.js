import React from 'react'

// Styling
import './ChessGame.css'
import '../common/themes.css'
import THEMES from '../common/themes.js'

// Chessboard and terminal imports
import ChessboardJs from 'react-chessboardjs-wrapper'
import Terminal from 'react-console-emulator'

class ChessGame extends React.Component {
  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <ChessboardJs
          animate
          resize
          whiteSquareColour={THEMES.dark.lightSquares}
          blackSquareColour={THEMES.dark.darkSquares}
          config={{
            draggable: true,
            showNotation: false,
            pieceTheme: 'img/chesspieces/alpha/{piece}.png',
            position: 'start'
          }}
          width='550px'
        />
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

export default ChessGame
