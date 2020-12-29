import Conversions from '../conversions/Conversions'
import Pawn from './pieces/Pawn'

const defaultBoard = {
  a2: new Pawn('w', 'a2'),
  b2: new Pawn('w', 'b2'),
  c2: new Pawn('w', 'c2'),
  d2: new Pawn('w', 'd2'),
  e2: new Pawn('w', 'e2'),
  f2: new Pawn('w', 'f2'),
  g2: new Pawn('w', 'g2'),
  h2: new Pawn('w', 'h2'),
  a7: new Pawn('b', 'a7'),
  b7: new Pawn('b', 'b7'),
  c7: new Pawn('b', 'c7'),
  d7: new Pawn('b', 'd7'),
  e7: new Pawn('b', 'e7'),
  f7: new Pawn('b', 'f7'),
  g7: new Pawn('b', 'g7'),
  h7: new Pawn('b', 'h7'),

  whiteCastlingStatus: [true, true],
  blackCastlingStatus: [true, true],
  enPassantSquare: ''
}

// Class to keep track of game state
class ChessGame {
  constructor () {
    this.board = Object.assign({}, defaultBoard)

    this.whoseMove = 'w' // w or b
    this.halfMoveClock = 0
    this.fullMoveNumber = 1

    this.moveHistory = []
  }

  /**
   * A method to determine if a move is legal given the current state of the game
   * @param  {string} start start position of the piece being moved, in algebraic notation
   * @param  {string} end end position of the piece being moved, in algebraic notation
   * @param  {string} piece string representing which piece is being moved
   * @returns {bool} true if the passed move, false otherwise
   */
  isValid (start, end) {
    if (!(start in this.board)) throw new Error('Piece not found in the board')

    console.log(this.board[start])
    const legalMoves = this.board[start].getLegalMoves(this.board)
    return legalMoves.includes(end) && !this.board[start].isOpposite(this.whoseMove)
  }

  executeMove (start, end) {
    // Check if the move is legal
    if (this.isValid(start, end)) {
      // Important values
      const isCapture = end in this.board
      const oppositeColor = this.board[start].isWhite() ? 'b' : 'w'

      // Update the piece positions
      this.board[start].move(end)
      this.board[end] = this.board[start]
      delete this.board[start]

      // Update the en passant square
      if (this.board[end].getFEN().toLowerCase() === 'p') {
        const startCoord = Conversions.algebraicToCoords(start)
        const endCoord = Conversions.algebraicToCoords(end)
        if (Math.abs(startCoord.y - endCoord.y) === 2) {
          const enPassantCoords = { x: startCoord.x, y: (startCoord.y + endCoord.y) / 2 }
          this.board.enPassantSquare = Conversions.coordsToAlgebraic(enPassantCoords)
        } else this.board.enPassantSquare = ''
      } else this.board.enPassantSquare = ''

      // TODO : Update the castling status
      // TODO : Disallow moves based on threats

      // Update game metadata
      this.halfMoveClock = isCapture ? 0 : this.halfMoveClock + 1
      this.fullMoveNumber = oppositeColor === 'w' ? this.fullMoveNumber + 1 : this.fullMoveNumber

      // Update whose turn it is
      this.whoseMove = oppositeColor
    } else {
      throw new Error('Illegal move passed into executeMove()')
    }
  }

  undoMove () {
  }

  /**
   * Returns the FEN string for the board position
   */
  getFEN () {
    // Field 1
    let fenString = ''
    let algebraicCoords = ''
    for (let y = 7; y >= 0; y--) {
      let counter = 0
      for (let x = 0; x < 8; x++) {
        algebraicCoords = Conversions.coordsToAlgebraic({ x: x, y: y })
        if (algebraicCoords in this.board) {
          if (counter !== 0) {
            fenString += counter
            counter = 0
          }
          fenString += this.board[algebraicCoords].getFEN()
        } else counter++
      }
      if (counter !== 0) {
        fenString += counter
        counter = 0
      }
      if (y !== 0) fenString += '/'
    }
    fenString += ' '

    // Field 2
    fenString += this.whoseMove + ' '

    // Field 3
    if (this.board.whiteCastlingStatus[1]) fenString += 'K'
    if (this.board.whiteCastlingStatus[0]) fenString += 'Q'
    if (this.board.blackCastlingStatus[1]) fenString += 'k'
    if (this.board.blackCastlingStatus[0]) fenString += 'q'
    fenString += ' '

    // Field 4
    fenString += this.board.enPassantSquare === '' ? '- ' : this.board.enPassantSquare + ' '

    // Field 5
    fenString += this.fullMoveNumber + ' '

    // Field 6
    fenString += this.halfMoveClock

    return fenString
  }
}

export default ChessGame
