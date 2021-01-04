import React from 'react'

// Chessboard and page themes
import ChessboardJs from 'react-chessboardjs-wrapper'
import THEMES from '../../common/themes.js'

class ChessBoard extends React.Component {
  constructor (props) {
    super(props)

    this.game = props.game

    this.state = {
      fen: props.game.getFEN(),
      promotionPopup: false
    }

    this.handlePromotion = this.handlePromotion.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onSnapEnd = this.onSnapEnd.bind(this)
  }

  onDrop (source, target, piece) {
    // Check for pawn promotion case
    if ((target.charAt(1) === '1' && source.charAt(1) === '2' && piece === 'bP') ||
    (target.charAt(1) === '8' && source.charAt(1) === '7' && piece === 'wP')) {
      return this.handlePromotion(source, target, piece)
    }

    // Check to make sure the move is valid
    if (!this.game.executeMove(source, target)) return 'snapback'
  }

  handlePromotion (source, target) {
    // Use a callback to handle piece promotion
    this.setState({
      promotionPopup: {
        onSelect: piece => {
          const newPiece = piece.toLowerCase()
          if (!this.game.executeMove(source, target, newPiece)) return 'snapback'
          this.setState({
            fen: this.game.getFEN(),
            promotionPopup: false
          })
        },
        square: target
      }
    })
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
        showPromotionDialog={this.state.promotionPopup}
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
