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

  getDate() {
    return this.#order.getDate();
  }

  initOrder(date) {
    ModelValidator.dateInMonth(date);
    this.#order = new Order(date);
  }

  setOrderItems(item) {
    ModelValidator.item(item, this.#menu);
    this.#order.setItems(item);
  }

  getOrderItems() {
    return this.#order.getItems();
  }

  getOrignalPrice(items = this.#order.getItems()) {
    return items.reduce(
      (prev, item) => prev + this.#menu.get(item.name).price * item.count,
      0
    );
  }
}

export default Model;
