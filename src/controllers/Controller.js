import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Model from '../models/Model.js';

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
    this.#outputView.printBenefitHeader(
      this.#model.getMonth(),
      this.#model.getDate()
    );
    this.#printAllBenefit();
  }

  async #setOrderDate() {
    while (true) {
      const date = await this.#inputView.readDate();
      try {
        this.#model.initOrder(date);
        return;
      } catch (error) {
        this.#outputView.printError(error);
      }
    }
  }

  async #setOrderItems() {
    while (true) {
      const orderItems = await this.#inputView.readOrderItems();
      try {
        this.#model.setOrderItems(orderItems);
        return;
      } catch (error) {
        this.#outputView.printError(error);
      }
    }
  }

  #printAllBenefit() {
    const items = this.#model.getOrderItems();
    this.#printOrder(items);
  }

  #printOrder(orderItems, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printMenu(orderItems);
  }

  #printGiveaways(giveaways, blankHeader = true) {}

  #printBenefits(benefits, blankHeader = true) {}

  #printPayAmount(payAmount, blankHeader = true) {}

  #printBadge(badge, blankHeader = true) {}
}

export default Controller;
