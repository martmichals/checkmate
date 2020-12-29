import Conversions from '../../conversions/Conversions'
import Piece from '../Piece'

class Pawn extends Piece {
  constructor (color, location, isFirstMove = true) {
    super(color, location)
    this.isFirstMove = isFirstMove
    this.direction = this.isWhite() ? 1 : -1
  }

  move (newLocation) {
    this.location = Conversions.algebraicToCoords(newLocation)
    this.isFirstMove = false
  }

  getLegalMoves (board) {
    const legalMoves = []

    // Conditions on piece position
    if (this.isWhite() && this.location.y === 7) {
      throw new Error('White pawn is unpromoted, on rank 8')
    }
    if (this.isBlack() && this.location.y === 0) {
      throw new Error('Black pawn is unpromoted, on rank 1')
    }

    // Check if the piece can move one space forward
    const inFront = Conversions.coordsToAlgebraic({
      x: this.location.x,
      y: this.location.y + this.direction
    })
    if (!(inFront in board)) legalMoves.push(inFront)

    // Check if the piece can move two spaces forward
    const twoInFront = Conversions.coordsToAlgebraic({
      x: this.location.x,
      y: this.location.y + this.direction * 2
    })
    if (legalMoves.length !== 0 && !(twoInFront in board) && this.isFirstMove) legalMoves.push(twoInFront)

    // Check if the piece can capture left
    let leftDiagonal = {
      x: this.location.x - 1,
      y: this.location.y + this.direction
    }
    if (leftDiagonal.x >= 0) {
      leftDiagonal = Conversions.coordsToAlgebraic(leftDiagonal)
      if (leftDiagonal in board && board[leftDiagonal].isOpposite(this.color)) legalMoves.push(leftDiagonal)
    }

    // Check if the piece can capture right
    let rightDiagonal = {
      x: this.location.x + 1,
      y: this.location.y + this.direction
    }
    if (rightDiagonal.x < 8) {
      rightDiagonal = Conversions.coordsToAlgebraic(rightDiagonal)
      if (rightDiagonal in board && board[rightDiagonal].isOpposite(this.color)) legalMoves.push(rightDiagonal)
    }

    // Check if the piece can capture en passant
    if (board.enPassantSquare && board.enPassantSquare.length === 2) {
      if (typeof leftDiagonal === 'string' &&
      leftDiagonal === board.enPassantSquare) legalMoves.push(leftDiagonal)
      if (typeof rightDiagonal === 'string' &&
      rightDiagonal === board.enPassantSquare) legalMoves.push(rightDiagonal)
    }

    return legalMoves
  }

  getFEN () { return this.isWhite() ? 'P' : 'p' }
}

export default Pawn
