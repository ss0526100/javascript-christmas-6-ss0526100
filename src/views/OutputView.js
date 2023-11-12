import { Console } from '@woowacourse/mission-utils';

import CONSTANT from '../constants/CONSTANT.js';

const {
  WELCOME_MESSAGE_HEADER,
  WELCOME_MESSAGE_FOOTER,
  ALL_BENEFIT_MESSAGE_DIV,
  ALL_BENEFIT_MESSAGE_FOOTER,
  INPUT_RETRY_MESSAGE,
  PRINT_MENU_HEADER_MESSAGE,
  PRINT_ORIGINAL_PRICE_HEADER_MESSAGE,
  MENU_UNIT,
  MONEY_UNIT,
  KOREAN_LOCALE_CODE,
  SPACE,
  BLANK,
} = CONSTANT;

const printItem = item =>
  Console.print(`${item.name}${SPACE}${item.count}${MENU_UNIT}`);

const OutputView = Object.freeze({
  printWelcomeMessage(month) {
    Console.print(`${WELCOME_MESSAGE_HEADER}${month}${WELCOME_MESSAGE_FOOTER}`);
  },
  printBenefitHeader(month, day) {
    Console.print(
      `${month}${ALL_BENEFIT_MESSAGE_DIV}${day}${ALL_BENEFIT_MESSAGE_FOOTER}`
    );
  },
  printMenu(orderItems) {
    Console.print(PRINT_MENU_HEADER_MESSAGE);
    orderItems.forEach(printItem);
  },
  printOriginalPrice(price) {
    Console.print(PRINT_ORIGINAL_PRICE_HEADER_MESSAGE);
    Console.print(`${price.toLocaleString(KOREAN_LOCALE_CODE)}${MONEY_UNIT}`);
  },
  printLineBreak() {
    Console.print(BLANK);
  },
  printError(error) {
    Console.print(`${error.message}${SPACE}${INPUT_RETRY_MESSAGE}`);
  },
});

export default OutputView;
