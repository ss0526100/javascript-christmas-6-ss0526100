import InputView from '../../views/InputView.js';
import OutputView from '../../views/OutputView.js';
import ControllerValidator from './ControllerValidator.js';

const Pipe = Object.freeze({
  async date(inputView = InputView, outputView = OutputView) {
    while (true) {
      const date = await inputView.readDate();
      try {
        ControllerValidator.dateString(date);
        return Number(date);
      } catch (error) {
        outputView.printError(error);
      }
    }
  },
});

export default Pipe;
