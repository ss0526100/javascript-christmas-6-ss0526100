import Order from './Order.js';
import Menu from './Menu.js';
import ModelValidator from './modules/ModelValidator.js';

import CONSTANT from '../constants/CONSTANT.js';

const { DECEMBER, FRIDAY } = CONSTANT;

class Model {
  #monthInfo;
  #menu;
  #order;

  constructor(month = DECEMBER, firstDayWeek = FRIDAY, menu = Menu) {
    this.#monthInfo = Object.freeze({ month, firstDayWeek });
    this.#menu = menu;
  }

  getMonth() {
    return this.#monthInfo.month;
  }

  initOrder(date) {
    ModelValidator.dateInMonth(date);
    this.#order = new Order(date);
  }

  setOrderItems(item) {
    this.#order.setItems(item);
  }
}

export default Model;
