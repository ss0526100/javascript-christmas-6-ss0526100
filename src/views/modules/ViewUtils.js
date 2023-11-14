import CONSTANT from '../../constants/CONSTANT.js';

const { MONEY_UNIT, KOREAN_LOCALE_CODE } = CONSTANT;

const getMoneyString = number =>
  `${number.toLocaleString(KOREAN_LOCALE_CODE)}${MONEY_UNIT}`;

export default { getMoneyString };
