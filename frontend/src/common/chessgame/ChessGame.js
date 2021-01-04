import Chess from 'chess.js'

// Class to describe a generic game of chess, with output
class ChessGame {
  constructor (outputMethod, userColor) {
    this.game = new Chess()
    this.outputMethod = outputMethod
    this.userColor = userColor
  }

  getFEN () { return this.game.fen() }

  executeMove (source, target, newPiece) {
    if (this.game.game_over()) return false
    const res = this.game.move({ to: target, from: source, promotion: newPiece })

    // Normal move
    if (res !== null && res.color === 'b') {
      const history = this.game.history()
      const moveNumber = Math.floor((history.length + 1) / 2)
      this.outputMethod(moveNumber + '.  ' +
      history[history.length - 2] + '  ' +
      history[history.length - 1])
    }

    // Detect end of game
    if (this.game.game_over()) {
      // Edge case move printout
      if (this.game.turn() === 'b') {
        const history = this.game.history()
        const moveNumber = Math.floor((history.length + 1) / 2)
        this.outputMethod(moveNumber + '.  ' +
        history[history.length - 1])
      }

      // End of game message
      const possibleWinner = this.game.turn() === 'w' ? 'Black' : 'White'
      if (this.game.in_checkmate()) this.outputMethod('Checkmate! ' + possibleWinner + ' wins!')
      else if (this.game.in_stalemate()) this.outputMethod('Stalemate!')
      else if (this.game.in_threefold_repetition()) this.outputMethod('Draw due to threefold repition!')
      else if (this.game.insufficient_material()) this.outputMethod('Draw due to insufficient material!')
      else if (this.game.in_draw()) this.outputMethod('Draw due to the 50 move rule!')
    }

    return res !== null
  }

  // Returns the last move in algebraic notation
  lastMoveAlgebraic () {
    const history = this.game.history()
    return history[history.length - 1]
  }

  // Returns the user's color, "white" or "black"
  getUserColor () { return this.userColor }

  // Returns the opponent's color
  getOpponentColor () { return this.userColor === 'white' ? 'black' : 'white' }

  // Capitalized version
  getOpponentColorCap () { return this.userColor === 'white' ? 'Black' : 'White' }
}

export default ChessGame
