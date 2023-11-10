import Calculator from './Calculator.js';

import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_DATE_ERROR_MESSAGE } = CONSTANT;

const ModelValidator = Object.freeze({
  dateInMonth(date, month) {
    if (Calculator.lastDayByMonth(month) < date)
      throw new Error(INVALID_DATE_ERROR_MESSAGE);
  },
});

export default ModelValidator;
