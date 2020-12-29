import Pawn from './Pawn'

// Sample board objects
const board = {
  a1: new Pawn('w', 'a1'),
  b2: new Pawn('w', 'b2'),
  b3: new Pawn('w', 'b3'),
  c1: new Pawn('w', 'c1'),
  c3: new Pawn('w', 'c3'),
  b8: new Pawn('b', 'b8'),
  c8: new Pawn('b', 'c8'),
  c7: new Pawn('b', 'c7'),
  d8: new Pawn('b', 'd8'),
  d6: new Pawn('b', 'd6')
}

const capturesBoard = {
  d4: new Pawn('b', 'd4'),
  e4: new Pawn('w', 'e4'),
  g4: new Pawn('w', 'g4'),
  h5: new Pawn('b', 'h5'),
  b3: new Pawn('w', 'b3'),
  a2: new Pawn('w', 'a2'),
  b6: new Pawn('b', 'b6'),
  a7: new Pawn('b', 'a7'),
  enPassantSquare: 'e3'
}

/* eslint-env jest */
test('Pawn construction works correctly', () => {
  const testPiece = new Pawn('w', 'a1')
  expect(testPiece.getLocation()).toEqual({ x: 0, y: 0 })
})

test('Pawn can move one space forward without obstruction', () => {
  const testBoard = Object.assign({}, board)

  let testPiece = testBoard.a1
  expect(testPiece.getLegalMoves(testBoard).includes('a2')).toBeTruthy()

  testPiece = testBoard.b8
  expect(testPiece.getLegalMoves(testBoard).includes('b7')).toBeTruthy()
})

test('Pawn can move two spaces forward without obstruction, first move', () => {
  const testBoard = Object.assign({}, board)

  let testPiece = testBoard.a1
  expect(testPiece.getLegalMoves(testBoard).includes('a3')).toBeTruthy()

  testPiece = testBoard.b8
  expect(testPiece.getLegalMoves(testBoard).includes('b6')).toBeTruthy()
})

test('Pawn cannot move with obstruction on space 1', () => {
  const testBoard = Object.assign({}, board)

  let testPiece = testBoard.b2
  expect(testPiece.getLegalMoves(testBoard)).toEqual([])

  testPiece = testBoard.c8
  expect(testPiece.getLegalMoves(testBoard)).toEqual([])
})

test('Pawn cannot move with obstruction on space 2', () => {
  const testBoard = Object.assign({}, board)

  let testPiece = testBoard.c1
  expect(testPiece.getLegalMoves(testBoard)).toEqual(['c2'])

  testPiece = testBoard.d8
  expect(testPiece.getLegalMoves(testBoard)).toEqual(['d7'])
})

test('Pawn cannot capture its own color', () => {
  const testBoard = Object.assign({}, capturesBoard)

  let testPiece = testBoard.a7
  expect(testPiece.getLegalMoves(testBoard).includes('b6')).toBeFalsy()

  testPiece = testBoard.a2
  expect(testPiece.getLegalMoves(testBoard).includes('b3')).toBeFalsy()
})

test('Pawn captures along the diagonal', () => {
  const testBoard = Object.assign({}, capturesBoard)

  const testPiece = testBoard.g4
  expect(testPiece.getLegalMoves(testBoard).includes('h5')).toBeTruthy()
})

test('Pawn captures en passant', () => {
  const testBoard = Object.assign({}, capturesBoard)

  const testPiece = testBoard.d4
  expect(testPiece.getLegalMoves(testBoard).includes('e3')).toBeTruthy()
})
