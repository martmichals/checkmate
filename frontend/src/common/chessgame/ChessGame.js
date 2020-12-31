import Chess from 'chess.js'

// Class to describe a generic game of chess
class ChessGame {
  constructor (fenString) {
    console.log('Construcing a chess object')
    this.output = []
    this.game = fenString ? new Chess(fenString) : new Chess()
    console.log(this.game.fen())
  }

  getFEN () { return this.game.fen() }

  // TODO : Handle promotion
  // TODO : Handle board updates
  executeMove (source, target, newPiece) {
    const res = this.game.move({ to: target, from: source })
    console.log(res)
    return res !== null
  }
}

export default ChessGame
