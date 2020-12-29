import Conversions from './Conversions'

/* eslint-env jest */
test('Converting from notation to matrix works properly', () => {
  expect(Conversions.algebraicToCoords('a1')).toEqual({ x: 0, y: 0 })
  expect(Conversions.algebraicToCoords('b3')).toEqual({ x: 1, y: 2 })
  expect(Conversions.algebraicToCoords('c8')).toEqual({ x: 2, y: 7 })
  expect(Conversions.algebraicToCoords('h8')).toEqual({ x: 7, y: 7 })
  expect(Conversions.algebraicToCoords('d6')).toEqual({ x: 3, y: 5 })
  expect(Conversions.algebraicToCoords('f3')).toEqual({ x: 5, y: 2 })
  expect(Conversions.algebraicToCoords('a2')).toEqual({ x: 0, y: 1 })
})

test('Converting from matrix coordinates to notation', () => {
  expect(Conversions.coordsToAlgebraic({ x: 0, y: 0 })).toEqual('a1')
  expect(Conversions.coordsToAlgebraic({ x: 1, y: 2 })).toEqual('b3')
  expect(Conversions.coordsToAlgebraic({ x: 2, y: 7 })).toEqual('c8')
  expect(Conversions.coordsToAlgebraic({ x: 7, y: 7 })).toEqual('h8')
  expect(Conversions.coordsToAlgebraic({ x: 3, y: 5 })).toEqual('d6')
  expect(Conversions.coordsToAlgebraic({ x: 5, y: 2 })).toEqual('f3')
  expect(Conversions.coordsToAlgebraic({ x: 0, y: 1 })).toEqual('a2')
})
