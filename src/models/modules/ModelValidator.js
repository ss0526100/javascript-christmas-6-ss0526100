import Calculator from './Calculator.js';
import Menu from '../Menu.js';

import CONSTANT from '../../constants/CONSTANT.js';

const {
  INVALID_DATE_ERROR_MESSAGE,
  INVALID_ORDER_ERROR_MESSAGE,
  ONLY_BEVERAGE_ORDER_ERROR_MESSAGE,
  MENU_CATEGORY_BEVERAGE,
} = CONSTANT;

const ModelValidator = Object.freeze({
  dateInMonth(date, month, leapYear = false) {
    if (Calculator.lastDayByMonth(month, leapYear) < date)
      throw new Error(INVALID_DATE_ERROR_MESSAGE);
  },

  items(items, menu = Menu) {
    items.forEach(item => this.itemInMenu(item, menu));
    this.onlyBeverage(items, menu);
  },

  itemInMenu(item, menu) {
    if (menu.get(item.name) === undefined)
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },

  onlyBeverage(items, menu) {
    const beverageCount = Calculator.countCategory(
      items,
      menu,
      MENU_CATEGORY_BEVERAGE
    );
    if (beverageCount === items.length)
      throw new Error(ONLY_BEVERAGE_ORDER_ERROR_MESSAGE);
  },
});

export default ModelValidator;
