import Order from './Order.js';
import Menu from './Menu.js';
import ModelValidator from './modules/ModelValidator.js';

import Calculator from './modules/Calculator.js';
import BenefitArray from './BenefitArray.js';

import ModelUtils from './modules/ModelUtils.js';
import CONSTANT from '../constants/CONSTANT.js';

const { DECEMBER, FRIDAY } = CONSTANT;

const { shakeArray } = ModelUtils;

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
    ModelValidator.dateInMonth(date, this.#monthInfo.month);
    this.#order = new Order(date);
  }

  setOrderItems(items, menu = this.#menu) {
    ModelValidator.items(items, menu);
    this.#order.updateItems(items, menu);
  }

  getOrderItems() {
    return this.#order.getItems();
  }

  getOrignalPrice() {
    return this.#order.getTotalPrice();
  }

  getShakedBenefits(benefitArray = BenefitArray) {
    const result = [];
    const modelInfo = this.#getModelInfo();
    benefitArray.forEach(benefit => {
      const isValid = benefit.checkCondition(modelInfo);
      const price = benefit.getBenefit(modelInfo);
      if (isValid && price !== 0)
        result.push({
          name: benefit.name,
          price,
          discount: benefit.isDiscount(),
        });
    });
    return shakeArray(
      result,
      (benefitA, benefitB) => benefitB.price - benefitA.price
    );
  }

  #getModelInfo() {
    const modelInfo = {
      dayWeek: Calculator.dayWeek(
        this.#order.getDate(),
        this.#monthInfo.firstDayWeek
      ),
      order: this.#order,
    };
    return modelInfo;
  }
}

export default Model;
