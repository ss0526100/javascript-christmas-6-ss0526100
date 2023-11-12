import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const {
  WELCOME_MESSAGE_HEADER,
  WELCOME_MESSAGE_FOOTER,
  BENEFIT_MESSAGE_DIV,
  BENEFIT_MESSAGE_FOOTER,
  INPUT_RETRY_MESSAGE,
  SPACE,
} = CONSTANT;

const OutputView = Object.freeze({
  printWelcomeMessage(month) {
    Console.print(`${WELCOME_MESSAGE_HEADER}${month}${WELCOME_MESSAGE_FOOTER}`);
  },
  printBenefitHeader(month, day) {
    Console.print(
      `${month}${BENEFIT_MESSAGE_DIV}${day}${BENEFIT_MESSAGE_FOOTER}`
    );
  },
  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
  printError(error) {
    Console.print(`${error.message}${SPACE}${INPUT_RETRY_MESSAGE}`);
  },
});

export default OutputView;
