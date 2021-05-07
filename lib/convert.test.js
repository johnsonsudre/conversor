const {convert, toMoney} = require('./convert')

test('Convert 2 to 4', () => {
  expect(convert(2, 4)).toBe(8)
})

test('Convert 0 to 4', () => {
  expect(convert(0, 4)).toBe(0)
})

test('Convert to money', () => {
  expect(toMoney(2)).toBe('2.00')
})

test('Convert string to money', () => {
  expect(toMoney('2')).toBe('2.00')
})