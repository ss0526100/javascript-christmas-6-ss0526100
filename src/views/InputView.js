import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const { DATE_INPUT_MESSAGE_FOOTER, ORDER_ITEMS_INPUT_MESSAGE } = CONSTANT;

const InputView = Object.freeze({
  async readDate(month) {
    return await Console.readLineAsync(`${month}${DATE_INPUT_MESSAGE_FOOTER}`);
  },
  async readOrderItems() {
    return await Console.readLineAsync(ORDER_ITEMS_INPUT_MESSAGE);
  },
});
export default InputView;
