import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class Controller {
  #model;
  #inputView;
  #outputView;

  constructor(model, inputView = InputView, outputView = OutputView) {
    this.#model = model;
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async run() {
    this.#outputView.printWelcomeMessage();
  }
}

export default Controller;
