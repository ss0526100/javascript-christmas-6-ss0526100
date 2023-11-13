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
  PRINT_GIVEAWAY_HEADER_MESSAGE,
  PRINT_BENEFITS_HEADER_MESSAGE,
  PRINT_TOTAL_BENEFIT_PRICE_HEADER_MESSAGE,
  PRINT_FINAL_PAY_AMOUNT_HEADER_MESSAGE,
  MENU_UNIT,
  MONEY_UNIT,
  KOREAN_LOCALE_CODE,
  NONE_MESSAGE,
  SPACE,
  BLANK,
  DASH,
  COLON,
} = CONSTANT;

const printItem = item =>
  Console.print(`${item.name}${SPACE}${item.count}${MENU_UNIT}`);

const printBenefit = benefit =>
  Console.print(
    `${benefit.name}${COLON}${SPACE}${DASH}${getMoneyString(benefit.price)}`
  );

const getMoneyString = number =>
  `${number.toLocaleString(KOREAN_LOCALE_CODE)}${MONEY_UNIT}`;

const OutputView = Object.freeze({
  printWelcomeMessage(month) {
    Console.print(`${WELCOME_MESSAGE_HEADER}${month}${WELCOME_MESSAGE_FOOTER}`);
  },
  printAllBenefitHeader(month, day) {
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
    Console.print(getMoneyString(price));
  },
  printgiveaways(giveaways) {
    Console.print(PRINT_GIVEAWAY_HEADER_MESSAGE);
    if (giveaways.length === 0) Console.print(NONE_MESSAGE);
    else giveaways.forEach(printItem);
  },
  printBenefits(benefits) {
    Console.print(PRINT_BENEFITS_HEADER_MESSAGE);
    if (benefits.length === 0) Console.print(NONE_MESSAGE);
    else benefits.forEach(printBenefit);
  },
  printTotalBenefitPrice(totalBenefitPrice) {
    Console.print(PRINT_TOTAL_BENEFIT_PRICE_HEADER_MESSAGE);
    Console.print(
      `${totalBenefitPrice === 0 ? BLANK : DASH}${getMoneyString(
        totalBenefitPrice
      )}`
    );
  },
  printFinalPayAmount(finalPayAmount) {
    Console.print(PRINT_FINAL_PAY_AMOUNT_HEADER_MESSAGE);
    console.log(getMoneyString(finalPayAmount));
  },

  printLineBreak() {
    Console.print(BLANK);
  },
  printError(error) {
    Console.print(`${error.message}${SPACE}${INPUT_RETRY_MESSAGE}`);
  },
});

export default OutputView;
