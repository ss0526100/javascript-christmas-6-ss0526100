import { Console } from '@woowacourse/mission-utils';

import ViewsUtils from './modules/ViewsUtils.js';
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
  PRINT_BADGE_HEADER_MESSAGE_HEADER,
  PRINT_BADGE_HEADER_MESSAGE_FOOTER,
  MENU_UNIT,
  NONE_MESSAGE,
  SPACE,
  BLANK,
  DASH,
  COLON,
} = CONSTANT;

const { getMoneyString } = ViewsUtils;

class OutputView {
  static printWelcomeMessage(month) {
    Console.print(`${WELCOME_MESSAGE_HEADER}${month}${WELCOME_MESSAGE_FOOTER}`);
  }

  static printAllBenefitHeader(month, day) {
    Console.print(
      `${month}${ALL_BENEFIT_MESSAGE_DIV}${day}${ALL_BENEFIT_MESSAGE_FOOTER}`
    );
  }

  static printMenu(orderItems) {
    Console.print(PRINT_MENU_HEADER_MESSAGE);
    orderItems.forEach(this.#printItem);
  }

  static printOriginalPrice(price) {
    Console.print(PRINT_ORIGINAL_PRICE_HEADER_MESSAGE);
    Console.print(getMoneyString(price));
  }

  static printgiveaways(giveaways) {
    Console.print(PRINT_GIVEAWAY_HEADER_MESSAGE);
    if (giveaways.length === 0) Console.print(NONE_MESSAGE);
    else giveaways.forEach(this.#printItem);
  }

  static printBenefits(benefits) {
    Console.print(PRINT_BENEFITS_HEADER_MESSAGE);
    if (benefits.length === 0) Console.print(NONE_MESSAGE);
    else benefits.forEach(this.#printBenefit);
  }

  static printTotalBenefitPrice(totalBenefitPrice) {
    Console.print(PRINT_TOTAL_BENEFIT_PRICE_HEADER_MESSAGE);
    Console.print(
      `${totalBenefitPrice === 0 ? BLANK : DASH}${getMoneyString(
        totalBenefitPrice
      )}`
    );
  }

  static printFinalPayAmount(finalPayAmount) {
    Console.print(PRINT_FINAL_PAY_AMOUNT_HEADER_MESSAGE);
    console.log(getMoneyString(finalPayAmount));
  }

  static printbadge(month, badges) {
    Console.print(
      `${PRINT_BADGE_HEADER_MESSAGE_HEADER}${month}${PRINT_BADGE_HEADER_MESSAGE_FOOTER}`
    );
    if (badges.length === 0) Console.print(NONE_MESSAGE);
    else badges.forEach(badge => Console.print(badge));
  }

  static printLineBreak() {
    Console.print(BLANK);
  }

  static printError(error) {
    Console.print(`${error.message}${SPACE}${INPUT_RETRY_MESSAGE}`);
  }

  static #printItem(item) {
    Console.print(`${item.name}${SPACE}${item.count}${MENU_UNIT}`);
  }

  static #printBenefit(benefit) {
    Console.print(
      `${benefit.name}${COLON}${SPACE}${DASH}${getMoneyString(benefit.price)}`
    );
  }
}

export default OutputView;
