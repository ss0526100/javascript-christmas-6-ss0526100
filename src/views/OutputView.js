import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const { WELCOME_MESSAGE } = CONSTANT;

const OutputView = Object.freeze({
  printWelcomeMessage() {
    Console.print(WELCOME_MESSAGE);
  },
  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
  // ...
});

export default OutputView;
