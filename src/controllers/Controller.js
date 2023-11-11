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
  }

  async #setOrderDate() {
    while (true) {
      const date = await this.#inputView.readDate();
      try {
        return this.#model.initOrder(date);
      } catch (error) {
        this.#outputView(error);
      }
    }
  }

  async #setOrderItems() {
    while (true) {
      const date = await Pipe.filterDate();
      try {
      } catch (error) {
        this.#outputView(error);
      }
    }
  }
}

export default Controller;
