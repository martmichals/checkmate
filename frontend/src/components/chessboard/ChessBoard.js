import React from 'react'

// Chessboard and page themes
import ChessboardJs from 'react-chessboardjs-wrapper'
import THEMES from '../../common/themes.js'

class ChessBoard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fen: props.game.getFEN(),
      game: props.game
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (source, target, piece, newPos, oldPos, orientation) {
    // TODO : Detect and handle promotion
    const newPiece = null

    // Check to make sure the move is valid
    if (!this.state.game.executeMove(source, target, newPiece)) {
      return 'snapback'
    }

    this.setState({ fen: this.state.game.getFEN() })
  }

  // TODO : Use onMoveEnd to handle more obscure cases

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
          position: this.state.fen,
          onDrop: this.onDrop
        }}
        width='550px'
      />
    )
  }
}

export default ChessBoard
