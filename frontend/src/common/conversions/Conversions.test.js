import Conversions from './Conversions'

/* eslint-env jest */
test('Converting from notation to matrix works properly', () => {
  expect(Conversions.chessToMatrix('a1')).toEqual([7, 0])
  expect(Conversions.chessToMatrix('b3')).toEqual([5, 1])
  expect(Conversions.chessToMatrix('c8')).toEqual([0, 2])
  expect(Conversions.chessToMatrix('h8')).toEqual([0, 7])
  expect(Conversions.chessToMatrix('d6')).toEqual([2, 3])
  expect(Conversions.chessToMatrix('f3')).toEqual([5, 5])
  expect(Conversions.chessToMatrix('a2')).toEqual([6, 0])
})

test('Converting from matrix coordinates to notation', () => {
  expect(Conversions.matrixToChess([7, 0])).toEqual('a1')
  expect(Conversions.matrixToChess([5, 1])).toEqual('b3')
  expect(Conversions.matrixToChess([0, 2])).toEqual('c8')
  expect(Conversions.matrixToChess([0, 7])).toEqual('h8')
  expect(Conversions.matrixToChess([2, 3])).toEqual('d6')
  expect(Conversions.matrixToChess([5, 5])).toEqual('f3')
  expect(Conversions.matrixToChess([6, 0])).toEqual('a2')
})
