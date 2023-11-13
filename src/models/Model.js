import Order from './Order.js';
import Menu from './Menu.js';
import ModelValidator from './modules/ModelValidator.js';

import CONSTANT from '../constants/CONSTANT.js';
import Calculator from './modules/Calculator.js';
import BenefitArray from './BenefitArray.js';

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

  setOrderItems(items, menu = this.#menu) {
    ModelValidator.items(items, menu);
    this.#order.setItems(items, menu);
  }

  getOrderItems() {
    return this.#order.getItems();
  }

  getOrignalPrice() {
    return this.#order.getTotalPrice();
  }

  //Not implemented
  // getBenefit() {
  //   const result = [];
  //   const modelInfo = this.#getModelInfo();
  //   BenefitArray.forEach(benefit => {
  //     if (benefit.checkCondition(modelInfo))
  //       result.push({
  //         name: benefit.name,
  //         price: benefit.getBenefit(modelInfo),
  //       });
  //   });
  //   return result;
  // }

  //Not implemented
  // #getModelInfo() {
  //   const originalPrice = this.getOrignalPrice();
  //   const modelInfo = {
  //     originalPrice,
  //     dayWeek: Calculator.dayWeek(
  //       this.#order.getDate,
  //       this.#monthInfo.firstDayWeek
  //     ),
  //     order: this.#order,
  //   };
  //   return modelInfo;
  // }
}

export default Model;
