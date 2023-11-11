import InputValidator from './InputValidator.js';

const Pipe = Object.freeze({
  filterDate(string) {
    while (true) {
      try {
        InputValidator.dateString(string);
        return Number(string);
      } catch (error) {
        throw error;
      }
    }
  },
  filterOrderItems(inputView = InputView, outputView = OutputView) {
    while (true) {
      const orderItems = inputView
        .readOrderItems()
        .split(',')
        .map(string => string.trim());
      try {
        orderItems.forEach(InputValidator.orderFormat);
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
