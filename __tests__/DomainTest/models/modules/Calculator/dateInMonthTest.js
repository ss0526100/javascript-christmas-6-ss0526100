import Calculator from '../../../../../src/models/modules/Calculator';

test.each([
  [[1, false], 31],
  [[2, false], 28],
  [[2, true], 29],
  [[3, true], 31],
  [[4, false], 30],
  [[5, false], 31],
  [[6, true], 30],
  [[7, false], 31],
  [[8], 31],
  [[9, false], 30],
  [[10, true], 31],
  [[11], 30],
  [[12], 31],
])('정상동작', (inputs, expectedValue) => {
  //when
  const lastDay = Calculator.lastDayByMonth(...inputs);

  expect(lastDay).toBe(expectedValue);
});
