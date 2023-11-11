import Calculator from './Calculator.js';

import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_DATE_ERROR_MESSAGE, INVALID_ORDER_ERROR_MESSAGE } = CONSTANT;

const ModelValidator = Object.freeze({
  dateInMonth(date, month, leapYear = false) {
    if (Calculator.lastDayByMonth(month, leapYear) < date)
      throw new Error(INVALID_DATE_ERROR_MESSAGE);
  },

  itemInMenu(item, Menu) {
    if (Menu.get(item.name) === undefined)
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
});

export default ModelValidator;
