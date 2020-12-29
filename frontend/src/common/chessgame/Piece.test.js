import Piece from './Piece'

/* eslint-env jest */
test('Piece constructor worked without error', () => {
  const testPiece = new Piece('w', 'a1')
  expect(testPiece.getLocation()).toEqual({ x: 0, y: 0 })
})

test('Piece color functions work correctly', () => {
  const testPiece = new Piece('w', 'b4')
  expect(testPiece.isWhite()).toBeTruthy()
  expect(testPiece.isBlack()).toBeFalsy()
  expect(testPiece.getLocation()).toEqual({ x: 1, y: 3 })

  const testPiece1 = new Piece('b', 'h6')
  expect(testPiece1.isBlack()).toBeTruthy()
  expect(testPiece1.isWhite()).toBeFalsy()
  expect(testPiece1.getLocation()).toEqual({ x: 7, y: 5 })
})

test('Opposite color functions work correctly', () => {
  const testPiece = new Piece('w', 'a1')
  expect(testPiece.isOpposite('b')).toBeTruthy()
  expect(testPiece.isOpposite('w')).toBeFalsy()

  const testPiece1 = new Piece('b', 'a8')
  expect(testPiece1.isOpposite('w')).toBeTruthy()
  expect(testPiece1.isOpposite('b')).toBeFalsy()
})
