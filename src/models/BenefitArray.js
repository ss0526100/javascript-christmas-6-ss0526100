import CONSTANT from '../constants/CONSTANT';
const {
  BENEFIT_CHRISTMAS_D_DAY_NAME,
  BENEFIT_WEEKDAY_NAME,
  BENEFIT_WEEKEND_NAME,
  BENEFIT_SPECIAL_NAME,
  BENEFIT_GIVEAWAY_NAME,
  MENU_CATEGORY_DESSERT,
  MENU_CATEGORY_MAIN,
  SUNDAY,
  MONDAY,
  TUSEDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  GIVEAWAY_PRICE,
} = CONSTANT;

const BenefitArray = Object.freeze([
  Object.freeze({
    name: BENEFIT_CHRISTMAS_D_DAY_NAME,
    checkCondition({ date }) {
      if (date <= 25) return true;
      else false;
    },
    getBenefit({ date }) {
      return date * 100;
    },
  }),
  Object.freeze({
    name: BENEFIT_WEEKDAY_NAME,
    checkCondition({ dayWeek }) {
      const targetDayWeek = [SUNDAY, MONDAY, TUSEDAY, WEDNESDAY, THURSDAY];
      if (targetDayWeek.includes(dayWeek)) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getCategorySize(MENU_CATEGORY_DESSERT) * 2023;
    },
  }),
  Object.freeze({
    name: BENEFIT_WEEKDAY_NAME,
    checkCondition({ dayWeek }) {
      const targetDayWeek = [SUNDAY, MONDAY, TUSEDAY, WEDNESDAY, THURSDAY];
      if (targetDayWeek.includes(dayWeek)) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getCategorySize(MENU_CATEGORY_DESSERT) * 2023;
    },
  }),
  Object.freeze({
    name: BENEFIT_WEEKEND_NAME,
    checkCondition({ dayWeek }) {
      const targetDayWeek = [FRIDAY, SATURDAY];
      if (targetDayWeek.includes(dayWeek)) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getCategorySize(MENU_CATEGORY_MAIN) * 2023;
    },
  }),
  Object.freeze({
    name: BENEFIT_SPECIAL_NAME,
    checkCondition({ date }) {
      const targetdate = [3, 10, 17, 24, 25, 31];
      if (targetdate.includes(date)) return true;
      else false;
    },
    getBenefit() {
      return 1000;
    },
  }),
  Object.freeze({
    name: BENEFIT_GIVEAWAY_NAME,
    checkCondition({ originalPrice }) {
      if (originalPrice > GIVEAWAY_PRICE) return true;
      else false;
    },
    getBenefit() {
      return 25000;
    },
  }),
]);

export default BenefitArray;
