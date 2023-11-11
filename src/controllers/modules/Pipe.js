import InputView from '../../views/InputView.js';
import OutputView from '../../views/OutputView.js';
import ControllerValidator from './ControllerValidator.js';

const Pipe = Object.freeze({
  async filterDate(inputView = InputView, outputView = OutputView) {
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
  async filterOrderItems(inputView = InputView, outputView = OutputView) {
    while (true) {
      const orderItems = await inputView
        .readOrderItems()
        .split(',')
        .map(string => string.trim());
      try {
        orderItems.forEach(ControllerValidator.orderFormat);
        return orderItems.map(item =>
          item.split('-').map(string => string.trim())
        );
      } catch (error) {
        outputView.printError(error);
      }
    }
  },
});

export default Pipe;
