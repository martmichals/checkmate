import Conversions from '../conversions/Conversions'

class Piece {
  /**
   * Constructor for the piece parent class, contains information common for
   * every piece
   * @param  {string} color color of the piece, either "w" or "b"
   * @param  {string} location location of the piece in algebraic notation
   */
  constructor (color, location) {
    this.color = color
    this.location = Conversions.algebraicToCoords(location)
  }

  /**
   * Return the list of legal moves as a list of strings in algebraic notation
   * @param  {board} board board object representing the state of the board, passed by
   *                 reference
   */
  getLegalMoves (board) {
    return []
  }

  /**
   * Function that returns true if the piece is white, false otherwise
   */
  isWhite () { return this.color === 'w' }

  /**
   * Function that returns true if the piece is black, false otherwise
   */
  isBlack () { return this.color === 'b' }

  /**
   * Function that returns true if the passed color is the opposite of the piece color
   */
  isOpposite (color) { return color !== this.color }

  /**
   * Function that returns the location of the piece in algebraic notation
   */
  getLocation () { return this.location }

  /**
   * Function that returns the FEN notation for the piece
   */
  getFEN () { return '' }

  /**
   * Function that changes the location of the piece
   * @param  {string} newLocation the new location of the piece, in algebraic notation
   */
  move (newLocation) {
    this.location = Conversions.algebraicToCoords(newLocation)
  }
}

export default Piece
