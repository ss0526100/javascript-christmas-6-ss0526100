import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Model from '../models/Model.js';

import Pipe from './modules/Pipe.js';
import ControllerUtils from './modules/ControllerUtils.js';

import CONSTANT from '../constants/CONSTANT.js';
const { DECEMBER, FRIDAY } = CONSTANT;

const { getTotalBenefitPrice, getFinalPayAmount, getGiveaway, getBadges } =
  ControllerUtils;

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
    this.#printModelInfo(this.#getModelInfo());
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

  #printModelInfo(modelInfo = this.#getModelInfo()) {
    this.#outputView.printAllBenefitHeader(modelInfo.month, modelInfo.date);

    this.#printOriginalOrderInfo(modelInfo);

    this.#printInfoAfterApplyingBenenfit(modelInfo);
  }

  #getModelInfo(supplyInfo = this.#getSupplyInfo()) {
    const totalBenefitPrice = getTotalBenefitPrice(supplyInfo.benefits);

    return {
      ...supplyInfo,
      totalBenefitPrice,
      giveaways: getGiveaway(supplyInfo.originalPrice),
      finalPayAmount: getFinalPayAmount(
        supplyInfo.originalPrice,
        supplyInfo.benefits
      ),
      badges: getBadges(totalBenefitPrice),
    };
  }

  #getSupplyInfo() {
    const model = this.#model;
    const benefits = model.getShakedBenefits();

    return {
      benefits,
      originalPrice: model.getOrignalPrice(),
      month: model.getMonth(),
      date: model.getDate(),
      orderItems: model.getOrderItems(),
    };
  }

  #printOriginalOrderInfo({ orderItems, originalPrice }) {
    this.#printOrderItems(orderItems);
    this.#printOriginalPrice(originalPrice);
  }

  #printInfoAfterApplyingBenenfit(modelInfo) {
    this.#printGiveaways(modelInfo.giveaways);
    this.#printBenefits(modelInfo.benefits);
    this.#printTotalBenefitPrice(modelInfo.totalBenefitPrice);
    this.#printFinalPayAmount(modelInfo.finalPayAmount);
    this.#printBadges(modelInfo.month, modelInfo.badges);
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
