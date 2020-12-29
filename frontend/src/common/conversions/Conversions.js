const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

class Conversions {
  /**
   * Converts passed alebraic notation into an easily workable x, y coordinate
   * @param  {string} notation algebraic notation for a chess piece position
   * @return {object} object with x, y properties, [a->0,..., h->7], [1->0,...,8->7]
   */
  static algebraicToCoords (notation) {
    return {
      x: letters.indexOf(notation.charAt(0)),
      y: parseInt(notation.charAt(1)) - 1
    }
  }

  /**
   * Converts from a coordinate object to algebraic position string
   * @param  {object} coords, object with x, y properties representing a chess piece position
   * @return {object} algebraic position string, '{a<-0,..., h<-7}{1<-0,...,8<-7}'
   */
  static coordsToAlgebraic (coords) {
    return letters[coords.x] + (coords.y + 1)
  }
}

export default Conversions
