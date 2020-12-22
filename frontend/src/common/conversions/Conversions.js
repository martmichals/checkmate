const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

class Conversions {
  /*
  This function takes a 'coordinate' in chess notation, i.g. e2, g3
  and converts it to matrix coordinates [y, x]. Matrix is zero-indexed, orientated
  such that black is at the top of the board, and y=0 is at the top of the board
  */
  static chessToMatrix (notation) {
    return [8 - parseInt(notation.charAt(1)), letters.indexOf(notation.charAt(0))]
  }

  /*
  This function takes matrix coordinates in the same format as the function above
  and converts them into chess notation coordinates
  */
  static matrixToChess (coords) {
    return letters[coords[1]] + -1 * (coords[0] - 8)
  }
}

export default Conversions
