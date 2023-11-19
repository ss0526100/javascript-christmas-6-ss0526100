import Order from './Order.js';
import Menu from './Menu.js';
import ModelValidator from './modules/ModelValidator.js';

import Calculator from './modules/Calculator.js';
import BenefitInfo from './BenefitInfo.js';

import ModelsUtils from './modules/ModelsUtils.js';
import CONSTANT from '../constants/CONSTANT.js';

const { DECEMBER, FRIDAY } = CONSTANT;

const { shakeArray, filterBenefit } = ModelsUtils;

class Model {
  #monthInfo;
  #menu;
  #order;
  #benefitInfo;

  constructor(
    month = DECEMBER,
    firstDayWeek = FRIDAY,
    menu = Menu,
    benefitInfo = BenefitInfo
  ) {
    this.#monthInfo = Object.freeze({ month, firstDayWeek });
    this.#menu = menu;
    this.#benefitInfo = benefitInfo;
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

  getShakedBenefits(benefitInfo = this.#benefitInfo) {
    const modelInfo = this.#getModelInfo();
    const benefitReducer = this.#getBenefitReducer(modelInfo);
    const benefits = Object.keys(benefitInfo).reduce(benefitReducer, []);
    return shakeArray(
      benefits,
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

  #getBenefitReducer(modelInfo) {
    return (array, benefitKey) => {
      const result = filterBenefit(benefitKey, modelInfo, this.#benefitInfo);
      if (result) array.push(result);
      return array;
    };
  }
}

export default Model;
