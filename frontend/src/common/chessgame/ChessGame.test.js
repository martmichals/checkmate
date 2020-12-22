import ChessGame from './ChessGame'

/* eslint-env jest */
test('default chess game is correct', () => {
  const game = new ChessGame()
  expect(game.getFEN()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
})
