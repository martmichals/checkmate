import Chess from 'chess.js'

// Class to describe a generic game of chess, with output
class ChessGame {
  constructor (outputMethod, userColor) {
    this.game = new Chess()
    this.outputMethod = outputMethod
    this.userColor = userColor
  }

  getFEN () { return this.game.fen() }

  // TODO : Handle promotion
  executeMove (source, target, newPiece) {
    const res = this.game.move({ to: target, from: source })

    if (res !== null && res.color === 'b') {
      const history = this.game.history()
      const moveNumber = Math.floor((history.length + 1) / 2)
      this.outputMethod(moveNumber + '.  ' +
      history[history.length - 1] + '  ' +
      history[history.length - 2])
    }

    return res !== null
  }

  // Returns the last move in algebraic notation
  lastMoveAlgebraic () {
    const history = this.game.history()
    return history[history.length - 1]
  }

  // Returns true if the last move was castling or en passant
  complexLast () {
    const history = this.game.history({ verbose: true })
    const flag = history[history.length - 1].flags
    return (flag === 'k' || flag === 'e' || flag === 'q')
  }

  // Returns the user's color, "white" or "black"
  getUserColor () { return this.userColor }

  // Returns the opponent's color
  getOpponentColor () { return this.userColor === 'white' ? 'black' : 'white' }
}

export default ChessGame
