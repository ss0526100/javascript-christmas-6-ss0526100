import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Model from '../models/Model.js';
import Pipe from './modules/Pipe.js';
import CONSTANT from '../constants/CONSTANT.js';
const { CHAMPAGNE, GIVEAWAY_PRICE } = CONSTANT;

class Controller {
  #model;
  #inputView;
  #outputView;

  constructor(
    model = new Model(),
    inputView = InputView,
    outputView = OutputView
  ) {
    this.#model = model;
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async run() {
    this.#outputView.printWelcomeMessage(this.#model.getMonth());
    await this.#setOrderDate();
    await this.#setOrderItems();
    this.#printAllBenefit();
  }

  async #setOrderDate() {
    while (true) {
      try {
        const date = Pipe.filterDate(await this.#inputView.readDate());
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

  #printAllBenefit() {
    this.#outputView.printAllBenefitHeader(
      this.#model.getMonth(),
      this.#model.getDate()
    );
    const originalPrice = this.#model.getOrignalPrice();
    const benefits = this.#model.getShakedBenefits();
    const totalBenefitPrice = benefits.reduce(
      (prev, benefit) => prev + benefit.price,
      0
    );
    const finalPayAmount =
      originalPrice -
      benefits.reduce(
        (prev, benefit) => prev + (benefit.discount ? benefit.price : 0),
        0
      );
    this.#printMenu(this.#model.getOrderItems());
    this.#printOriginalPrice(originalPrice);
    this.#printGiveaways(
      originalPrice < GIVEAWAY_PRICE ? [] : [{ name: CHAMPAGNE, count: 1 }]
    );
    this.#printBenefits(benefits);
    this.#printTotalBenefitPrice(totalBenefitPrice);
    this.#printFinalPayAmount(finalPayAmount);
  }

  #printMenu(orderItems, blankHeader = true) {
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

  #printBadge(badge, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
  }
}

export default Controller;
