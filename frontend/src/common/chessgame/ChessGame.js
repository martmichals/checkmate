import Chess from 'chess.js'

// Class to describe a generic game of chess, with output
class ChessGame {
  constructor (outputMethod) {
    this.game = new Chess()
    this.outputMethod = outputMethod
  }

  getFEN () { return this.game.fen() }

  // TODO : Handle promotion
  executeMove (source, target, newPiece) {
    const res = this.game.move({ to: target, from: source })

    // TODO : Only output on valid move
    this.outputMethod(this.lastMoveAlgebraic())

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
}

export default ChessGame
