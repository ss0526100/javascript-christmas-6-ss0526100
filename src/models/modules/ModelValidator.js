import Calculator from './Calculator.js';

import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_DATE_ERROR_MESSAGE } = CONSTANT;

const ModelValidator = Object.freeze({
  dateInMonth(date, month, leapYear = false) {
    if (Calculator.lastDayByMonth(month, leapYear) < date)
      throw new Error(INVALID_DATE_ERROR_MESSAGE);
  },

  items(item, menu) {},
});

export default ModelValidator;
