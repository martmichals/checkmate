/*
 * Try to execute a move, return '' on error, or the current state FEN
 * string in the case of success
 */
function executeMove (moveObj, currFen) {
  const { Chess } = require('chess.js')
  const chess = new Chess(currFen)

  if (chess.move(moveObj) !== null) {
    return chess.fen()
  } else {
    return null
  }
}

export default { executeMove }
