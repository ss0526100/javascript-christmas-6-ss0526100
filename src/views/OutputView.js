import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const {
  WELCOME_MESSAGE_HEADER,
  WELCOME_MESSAGE_FOOTER,
  ALL_BENEFIT_MESSAGE_DIV,
  ALL_BENEFIT_MESSAGE_FOOTER,
  INPUT_RETRY_MESSAGE,
  SPACE,
  BLANK,
} = CONSTANT;

const OutputView = Object.freeze({
  printWelcomeMessage(month) {
    Console.print(`${WELCOME_MESSAGE_HEADER}${month}${WELCOME_MESSAGE_FOOTER}`);
  },
  printBenefitHeader(month, day) {
    Console.print(
      `${month}${ALL_BENEFIT_MESSAGE_DIV}${day}${ALL_BENEFIT_MESSAGE_FOOTER}`
    );
  },
  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
  printLineBreak() {
    Console.print(BLANK);
  },
  printError(error) {
    Console.print(`${error.message}${SPACE}${INPUT_RETRY_MESSAGE}`);
  },
});

export default OutputView;
