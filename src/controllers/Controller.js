import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Model from '../models/Model.js';
import Pipe from './modules/Pipe.js';

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
    this.#printMenu(this.#model.getOrderItems());
    this.#printOriginalPrice(this.#model.getOrignalPrice());
  }

  #printMenu(orderItems, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printMenu(orderItems);
  }

  #printOriginalPrice(price, blankHeader = true) {
    if (blankHeader) this.#outputView.printLineBreak();
    this.#outputView.printOriginalPrice(price);
  }

  #printGiveaways(giveaways, blankHeader = true) {}

  #printBenefits(benefits, blankHeader = true) {}

  #printPayAmount(payAmount, blankHeader = true) {}

  #printBadge(badge, blankHeader = true) {}
}

export default Controller;
