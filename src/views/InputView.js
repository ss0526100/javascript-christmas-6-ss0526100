import { Console } from '@woowacourse/mission-utils';
import Pipe from './modules/Pipe.js';
import OutputView from './OutputView.js';

import CONSTANT from '../constants/CONSTANT.js';

const { DATE_INPUT_MESSAGE, ORDER_ITEMS_INPUT_MESSAGE } = CONSTANT;

const InputView = Object.freeze({
  async readDate(outputView = OutputView) {
    while (true) {
      const date = await Console.readLineAsync(DATE_INPUT_MESSAGE);
      try {
        return Pipe.filterDate(date);
      } catch (error) {
        outputView.printError(error);
      }
    }
  },
  async readOrderItems() {
    return await Console.readLineAsync(ORDER_ITEMS_INPUT_MESSAGE);
  },
  // ...
});
export default InputView;
