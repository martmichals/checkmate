import Conversions from '../conversions/Conversions'

class ChessGame {
  constructor () {
    this.board = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'p', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', 'P', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]
    this.whoseMove = 'w' // w or b
    this.whiteCastlingStatus = [true, true] // queenside, kingside
    this.blackCastlingStatus = [true, true]
    this.enPassantOption = [-1, -1] // (y, x) for the en passant capture
    this.halfMoveClock = 0
    this.fullMoveNumber = 1

    this.moveHistory = []
  }

  /*
  Pawn legal squares, ignore possible king exposure to check
  */

  /*
  Rook legal squares, ignore possible king exposure to check
  */

  /*
  Knight legal squares, ignore possible king exposure to check
  */

  /*
  Bishop legal squares, ignore possible king exposure to check
  */

  /*
  Queen legal squares, ignore possible king exposure to check
  */

  /*
  King legal squares, ignore possible exposure to check
  */

  /*
  Checks to see whether a given move is valid given the current state of the game
  Returns true if valid, false otherwise
  */
  isValid (start, end, piece) {
    const startCoords = Conversions.chessToMatrix(start)
    const endCoords = Conversions.chessToMatrix(end)

    // Make sure the pieces match the board state
    const thisPiece = this.board[startCoords[0]][startCoords[1]]
    if (thisPiece.toLowerCase() === thisPiece) {
      if (!(piece === 'b' + thisPiece.toUpperCase())) {
        throw new Error('Pieces do not match between chessboard.js and ChessGame')
      }
    } else if (!(piece === 'w' + thisPiece)) {
      throw new Error('Pieces do not match between chessboard.js and ChessGame')
    }

    // Make sure the piece color matches the current mover
    let movedColor = 'w'
    if (thisPiece.toLowerCase() === thisPiece) movedColor = 'b'
    if (this.whoseMove !== movedColor) return false

    // Check if the move is valid for the piece

    // Check if the move exposes the king to check

    console.log('start', startCoords)
    console.log('end', endCoords)
    console.log('moved', movedColor)
    return false
  }

  /*
  Execute a move on the current game, update the move history for the game
  */
  executeMove (start, end, piece) {

  }

  /*
  Undo the last move of the game
  */
  undoMove () {

  }

  getFEN () {
    let fenString = ''

    // Field 1, Board Representation
    this.board.forEach(function (file, index) {
      let fileString = ''
      let spaceCounter = 0
      file.forEach(function (val, index) {
        if (val === ' ') spaceCounter++
        else {
          fileString += spaceCounter !== 0 ? spaceCounter : ''
          fileString += val
          spaceCounter = 0
        }

        if (val === ' ' && index === 7) fileString += spaceCounter
      })
      fenString += fileString
      if (index !== 7) fenString += '/'
    })

    // Field 2, which color to move
    fenString += ' ' + this.whoseMove

    // Field 3, castling status
    fenString += ' '
    if (this.whiteCastlingStatus[1]) fenString += 'K'
    if (this.whiteCastlingStatus[0]) fenString += 'Q'
    if (this.blackCastlingStatus[1]) fenString += 'k'
    if (this.blackCastlingStatus[0]) fenString += 'q'

    // Field 4, en passant capture square
    fenString += ' '
    fenString += this.enPassantOption === [-1, -1] ? '-' : Conversions.matrixToChess(this.enPassantOption)

    // Field 5, halfmove clock
    fenString += ' ' + this.halfMoveClock

    // Field 6, fullmove number
    fenString += ' ' + this.fullMoveNumber

    return fenString
  }
}

export default ChessGame
