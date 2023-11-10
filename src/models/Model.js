import Order from './Order.js';
import ModelValidator from './modules/ModelValidator.js';

import CONSTANT from '../constants/CONSTANT.js';

const { DECEMBER, FRIDAY } = CONSTANT;

class Model {
  #month;
  #firstDayWeek;
  #order;

  constructor(month = DECEMBER, firstDayWeek = FRIDAY) {
    this.#month = month;
    this.#firstDayWeek = firstDayWeek;
  }

  getMonth() {
    return this.#month;
  }

  initOrder(date) {
    ModelValidator.dateInMonth(date);
    this.#order = new Order(date);
  }
}

export default Model;
