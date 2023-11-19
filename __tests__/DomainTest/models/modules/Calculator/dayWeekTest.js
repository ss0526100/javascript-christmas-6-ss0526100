import Calculator from '../../../../../src/models/modules/Calculator';

import CONSTANT from '../../../../../src/constants/CONSTANT';

const { SUNDAY, MONDAY, TUSEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } =
  CONSTANT;

test.each([
  [10, SUNDAY, TUSEDAY],
  [20, MONDAY, SATURDAY],
  [14, TUSEDAY, MONDAY],
  [1, WEDNESDAY, WEDNESDAY],
  [30, WEDNESDAY, THURSDAY],
  [10, THURSDAY, SATURDAY],
  [18, FRIDAY, MONDAY],
  [14, SATURDAY, FRIDAY],
])('dayWeekTest()', (date, firstDayWeek, expectedValue) => {
  //when
  const dayWeek = Calculator.dayWeek(date, firstDayWeek);

  //then
  expect(dayWeek).toBe(expectedValue);
});
