import CONSTANT from '../constants/CONSTANT.js';
const {
  BENEFIT_CHRISTMAS_D_DAY_NAME,
  BENEFIT_WEEKDAY_NAME,
  BENEFIT_WEEKEND_NAME,
  BENEFIT_SPECIAL_NAME,
  BENEFIT_GIVEAWAY_NAME,
  BENEFIT_TYPE_DISCOUNT,
  BENEFIT_TYPE_GIEVAWAY,
  MENU_CATEGORY_DESSERT,
  MENU_CATEGORY_MAIN,
  SUNDAY,
  MONDAY,
  TUSEDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  GIVEAWAY_STANDARD,
} = CONSTANT;

const checkdefaultCondition = order => order.getTotalPrice() >= 10000;

const BenefitInfo = Object.freeze({
  christmasDDay: Object.freeze({
    name: BENEFIT_CHRISTMAS_D_DAY_NAME,
    checkCondition({ order }) {
      return checkdefaultCondition(order) && order.getDate() <= 25;
    },
    getBenefit({ order }) {
      return 900 + order.getDate() * 100;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  }),
  weekday: Object.freeze({
    name: BENEFIT_WEEKDAY_NAME,
    checkCondition({ dayWeek, order }) {
      const targetDayWeek = [SUNDAY, MONDAY, TUSEDAY, WEDNESDAY, THURSDAY];
      return checkdefaultCondition(order) && targetDayWeek.includes(dayWeek);
    },
    getBenefit({ order }) {
      return order.getCategoryCount(MENU_CATEGORY_DESSERT) * 2023;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  }),
  weekend: Object.freeze({
    name: BENEFIT_WEEKEND_NAME,
    checkCondition({ dayWeek, order }) {
      const targetDayWeek = [FRIDAY, SATURDAY];
      return checkdefaultCondition(order) && targetDayWeek.includes(dayWeek);
    },
    getBenefit({ order }) {
      return order.getCategoryCount(MENU_CATEGORY_MAIN) * 2023;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  }),
  special: Object.freeze({
    name: BENEFIT_SPECIAL_NAME,
    checkCondition({ order }) {
      const targetdate = [3, 10, 17, 24, 25, 31];
      return (
        checkdefaultCondition(order) && targetdate.includes(order.getDate())
      );
    },
    getBenefit() {
      return 1000;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  }),
  giveaway: Object.freeze({
    name: BENEFIT_GIVEAWAY_NAME,
    checkCondition({ order }) {
      return (
        checkdefaultCondition(order) &&
        order.getTotalPrice() >= GIVEAWAY_STANDARD
      );
    },
    getBenefit() {
      return 25000;
    },
    type: BENEFIT_TYPE_GIEVAWAY,
  }),
});

export default BenefitInfo;
