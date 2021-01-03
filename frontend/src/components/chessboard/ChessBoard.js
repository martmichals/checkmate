import React from 'react'

// Chessboard and page themes
import ChessboardJs from 'react-chessboardjs-wrapper'
import THEMES from '../../common/themes.js'

class ChessBoard extends React.Component {
  constructor (props) {
    super(props)

    this.game = props.game

    this.state = {
      fen: props.game.getFEN()
    }

    this.onDrop = this.onDrop.bind(this)
    this.onSnapEnd = this.onSnapEnd.bind(this)
  }

  onDrop (source, target) {
    // TODO : Detect and handle promotion
    const newPiece = null

    // Check to make sure the move is valid
    if (!this.game.executeMove(source, target, newPiece)) {
      return 'snapback'
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.game !== this.props.game) {
      this.game = this.props.game
      this.setState({ fen: this.game.getFEN() })
    }
  }

  onSnapEnd (newPos, oldPos) {
    this.setState({ fen: this.game.getFEN() })
  }

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
          orientation: this.game.getUserColor(),
          pieceTheme: 'img/chesspieces/alpha/{piece}.png',
          position: this.state.fen,
          onDrop: this.onDrop,
          onSnapEnd: this.onSnapEnd
        }}
        width='550px'
      />
    )
  }
}

export default ChessBoard
