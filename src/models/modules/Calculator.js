import CONSTANT from '../../constants/CONSTANT.js';

const { FEBRUARY, TWENTY_EIGHT, TWENTY_NINE, THIRTY, THIRTY_ONE } = CONSTANT;

const lastDay = [
  null,
  THIRTY_ONE,
  TWENTY_EIGHT,
  THIRTY_ONE,
  THIRTY,
  THIRTY_ONE,
  THIRTY,
  THIRTY_ONE,
  THIRTY_ONE,
  THIRTY,
  THIRTY_ONE,
  THIRTY,
  THIRTY_ONE,
];

const Calculator = Object.freeze({
  lastDayByMonth(month, leapYear = false) {
    if (month === FEBRUARY && leapYear) return TWENTY_NINE;
    else return lastDay[month];
  },
});

export default Calculator;
