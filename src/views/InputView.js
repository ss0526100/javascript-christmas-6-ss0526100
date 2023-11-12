import { Console } from '@woowacourse/mission-utils';
import Pipe from '../controllers/modules/Pipe.js';
import OutputView from './OutputView.js';

import CONSTANT from '../constants/CONSTANT.js';

const { DATE_INPUT_MESSAGE, ORDER_ITEMS_INPUT_MESSAGE } = CONSTANT;

const InputView = Object.freeze({
  async readDate() {
    return await Console.readLineAsync(DATE_INPUT_MESSAGE);
  },
  async readOrderItems(outputView = OutputView) {
    return await Console.readLineAsync(ORDER_ITEMS_INPUT_MESSAGE);
  },
});
export default InputView;
