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
  Check the square in the matrix. Return 0 if empty, -1 if black, 1 if white
  */
  getColor (position) {
    const piece = this.board[position[0]][position[1]]
    if (piece === ' ') return 0
    else if (piece.toLowerCase() === piece) return -1
    else return 1
  }

  /*
  Pawn legal squares, ignore possible king exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */
  pawnLegalMoves (position) {
    // Convert to matrix coordinates
    const availablePositions = []
    const coords = Conversions.chessToMatrix(position)
    const isWhite = this.board[coords[0]][coords[1]] === 'P'

    // Set analyzed rank for distance 1 moves
    const firstRank = isWhite ? coords[0] - 1 : coords[0] + 1

    // Check diagonal moves for black pieces
    const oppositeColor = isWhite ? -1 : 1
    const file1 = coords[1] + 1
    const file2 = coords[1] - 1
    if (file1 < 8 && this.getColor([firstRank, file1]) === oppositeColor) {
      availablePositions.push(Conversions.matrixToChess([firstRank, file1]))
    }
    if (file2 >= 0 && this.getColor([firstRank, file2]) === oppositeColor) {
      availablePositions.push(Conversions.matrixToChess([firstRank, file2]))
    }

    // Check for en passant move
    if ([firstRank, file1] === this.enPassantOption) {
      availablePositions.push(Conversions.matrixToChess([firstRank, file1]))
    }
    if ([firstRank, file2] === this.enPassantOption) {
      availablePositions.push(Conversions.matrixToChess([firstRank, file2]))
    }

    // Check for normal forward move
    let canMove1
    if (firstRank < 0 || firstRank > 7) throw new Error('Illegal pawn on board')
    else if (this.getColor([firstRank, coords[1]]) === 0) {
      availablePositions.push(Conversions.matrixToChess([firstRank, coords[1]]))
      canMove1 = true
    }

    // Check if the pawn may move two squares
    const checkTwo = (isWhite && coords[0] === 6) || (!isWhite && coords[0] === 1)
    if (checkTwo && canMove1 && this.getColor([coords[0] + oppositeColor * 2, coords[1]]) === 0) {
      availablePositions.push(Conversions.matrixToChess([coords[0] + oppositeColor * 2, coords[1]]))
    }

    return availablePositions
  }

  /*
  Rook legal squares, ignore possible king exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */

  /*
  Knight legal squares, ignore possible king exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */

  /*
  Bishop legal squares, ignore possible king exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */

  /*
  Queen legal squares, ignore possible king exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */

  /*
  King legal squares, ignore possible exposure to check
  Position in algebraic notation
  Returns in algebraic notation
  */

  /*
  Static. Checks if the current board results in either the white or black king
  being in check from ray pieces
  */

  /*
  Checks to see whether a given move is valid given the current state of the game
  Returns true if valid, false otherwise
  */
  isValid (start, end, piece) {
    const startCoords = Conversions.chessToMatrix(start)

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
    let legalMoves
    switch (thisPiece.toLowerCase()) {
      case 'p':
        legalMoves = this.pawnLegalMoves(start)
        break
      default:
        throw new Error('Piece passed into switch statement is undefined')
    }
    console.log(legalMoves)
    if (legalMoves.includes(end)) return true

    // TODO : Check if the move exposes the king to check

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
