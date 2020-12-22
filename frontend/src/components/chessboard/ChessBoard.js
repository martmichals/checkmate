import React from 'react'

// Chessboard and page themes
import ChessboardJs from 'react-chessboardjs-wrapper'
import THEMES from '../../common/themes.js'

class ChessBoard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: props.game
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (source, target, piece, newPos, oldPos, orientation) {
    // Check to make sure the move is valid
    if (this.state.game.isValid(source, target, piece)) {
      console.log('That was a valid move')
    } else {
      console.log('That was not a valid move')
      return 'snapback'
    }
  }

  // TODO : Use callbacks to register game state in the interface
  // TODO : Use ChessGame in order to set up the state of the board
  // TODO : Conditionally update based on the state of the chess game, do not update if matches the UI state

  render () {
    return (
      <ChessboardJs
        animate
        resize
        whiteSquareColour={THEMES.dark.lightSquares}
        blackSquareColour={THEMES.dark.darkSquares}
        config={{
          draggable: true,
          showNotation: true,
          pieceTheme: 'img/chesspieces/alpha/{piece}.png',
          position: this.state.game.getFEN(),
          onDrop: this.onDrop
        }}
        width='550px'
      />
    )
  }
}

export default ChessBoard
