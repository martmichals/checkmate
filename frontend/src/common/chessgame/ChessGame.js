import Chess from 'chess.js'

// Class to describe a generic game of chess, with output
class ChessGame {
  constructor (outputMethod, userColor, autoType) {
    this.game = new Chess()
    this.outputMethod = outputMethod
    this.userColor = userColor
    this.autoType = autoType
  }

  getFEN () { return this.game.fen() }

  executeAutomatedMove () {
    switch (this.autoType) {
      case 'random':
        this.executeRandomMove()
        break
      case 'api':
        console.log('Excuting a move via API')
        break
      default:
        throw new Error(this.autoType, 'is not a valid automated move type')
    }
  }

  executeRandomMove () {
    if (this.game.game_over()) return false

    const possibleMoves = this.game.moves()
    const randomIdx = Math.floor(Math.random() * possibleMoves.length)
    const res = this.game.move(possibleMoves[randomIdx])

    this.printPostMove(res)

    return res !== null
  }

  executeMove (source, target, newPiece) {
    if (this.game.game_over()) return false

    // Validate the piece moved is the proper color
    const piece = this.game.get(source)
    if (piece === null || piece.color !== this.userColor.charAt(0)) return false

    // Attempt the move in game
    const res = this.game.move({ to: target, from: source, promotion: newPiece })

    // Print out post move to the terminal
    this.printPostMove(res)

    return res !== null
  }

  printPostMove (res) {
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
  }

  // Returns the last move in algebraic notation
  lastMoveAlgebraic () {
    const history = this.game.history()
    return history[history.length - 1]
  }

  // Returns true if the next move is meant to be an automatic move
  nextMoveAutomated () { return this.game.turn() !== this.userColor.charAt(0) }

  // Returns the user's color, "white" or "black"
  getUserColor () { return this.userColor }

  // Returns the opponent's color
  getOpponentColor () { return this.userColor === 'white' ? 'black' : 'white' }

  // Capitalized version
  getOpponentColorCap () { return this.userColor === 'white' ? 'Black' : 'White' }
}

export default ChessGame
