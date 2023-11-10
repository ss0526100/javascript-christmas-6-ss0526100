import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const { DATE_INPUT_MESSAGE } = CONSTANT;

const InputView = Object.freeze({
  async readDate() {
    return await Console.readLineAsync(DATE_INPUT_MESSAGE);
  },
  // ...
});
export default InputView;
