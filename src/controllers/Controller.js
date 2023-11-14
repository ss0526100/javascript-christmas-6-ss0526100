import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Model from '../models/Model.js';

import Pipe from './modules/Pipe.js';

import CONSTANT from '../constants/CONSTANT.js';
const {
  DECEMBER,
  FRIDAY,
  SANTA_BADGE,
  TREE_BADGE,
  STAR_BADGE,
  CHAMPAGNE,
  GIVEAWAY_PRICE,
} = CONSTANT;

const getTotalBenefitPrice = benefits =>
  benefits.reduce((prev, benefit) => prev + benefit.price, 0);

const getFinalPayAmount = (originalPrice, benefits) => {
  return (
    originalPrice -
    benefits.reduce(
      (prev, benefit) => prev + (benefit.discount ? benefit.price : 0),
      0
    )
  );
};

const getGiveaway = originalPrice =>
  originalPrice < GIVEAWAY_PRICE ? [] : [{ name: CHAMPAGNE, count: 1 }];

const getBadges = totalBenefitPrice => {
  const badges = [];
  if (totalBenefitPrice >= 20000) badges.push(SANTA_BADGE);
  else if (totalBenefitPrice > 10000) badges.push(TREE_BADGE);
  else if (totalBenefitPrice > 5000) badges.push(STAR_BADGE);
  return badges;
};

class Controller {
  #model;
  #inputView;
  #outputView;

  constructor(
    month = DECEMBER,
    firstDayWeek = FRIDAY,
    inputView = InputView,
    outputView = OutputView
  ) {
    this.#model = new Model(month, firstDayWeek);
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async run() {
    this.#outputView.printWelcomeMessage(this.#model.getMonth());
    await this.#setOrderDate(this.#model.getMonth());
    await this.#setOrderItems();
    this.#printAllBenefit(this.#getModelInfo());
  }

  async #setOrderDate(month) {
    while (true) {
      try {
        const date = Pipe.filterDate(await this.#inputView.readDate(month));
        this.#model.initOrder(date);
        return;
      } catch (error) {
        this.#outputView.printError(error);
      }
    }
  }

  async #setOrderItems() {
    while (true) {
      try {
        const orderItems = Pipe.filterOrderItems(
          await this.#inputView.readOrderItems()
        );
        this.#model.setOrderItems(orderItems);
        return;
      } catch (error) {
        this.#outputView.printError(error);
      }
    }
  }

  #printAllBenefit(modelInfo = this.#getModelInfo()) {
    this.#outputView.printAllBenefitHeader(modelInfo.month, modelInfo.date);
    this.#printOrderItems(modelInfo.orderItems);
    this.#printOriginalPrice(modelInfo.originalPrice);
    this.#printGiveaways(modelInfo.giveaways);
    this.#printBenefits(modelInfo.benefits);
    this.#printTotalBenefitPrice(modelInfo.totalBenefitPrice);
    this.#printFinalPayAmount(modelInfo.finalPayAmount);
    this.#printBadges(modelInfo.month, modelInfo.badges);
  }

  #getModelInfo(supplyInfo = this.#getSupplyInfo()) {
    return {
      ...supplyInfo,
      giveaways: getGiveaway(supplyInfo.originalPrice),
      finalPayAmount: getFinalPayAmount(
        supplyInfo.originalPrice,
        supplyInfo.benefits
      ),
      badges: getBadges(supplyInfo.totalBenefitPrice),
    };
  }

  #getSupplyInfo() {
    const model = this.#model;
    const benefits = model.getShakedBenefits();
    return {
      benefits,
      originalPrice: model.getOrignalPrice(),
      totalBenefitPrice: getTotalBenefitPrice(benefits),
      month: model.getMonth(),
      date: model.getDate(),
      orderItems: model.getOrderItems(),
    };
  }

  #printOrderItems(orderItems, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printMenu(orderItems);
  }

  #printOriginalPrice(price, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printOriginalPrice(price);
  }

  #printGiveaways(giveaways, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printgiveaways(giveaways);
  }

  #printBenefits(benefits, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printBenefits(benefits);
  }

  #printTotalBenefitPrice(totalBenefitPrice, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printTotalBenefitPrice(totalBenefitPrice);
  }

  #printFinalPayAmount(finalPayAmount, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printFinalPayAmount(finalPayAmount);
  }

  #printBadges(month, badges, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printbadge(month, badges);
  }
}

export default Controller;
