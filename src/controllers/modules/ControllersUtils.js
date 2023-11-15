import CONSTANT from '../../constants/CONSTANT.js';

const {
  SANTA_BADGE,
  TREE_BADGE,
  STAR_BADGE,
  CHAMPAGNE,
  GIVEAWAY_STNADARD,
  BENEFIT_TYPE_DISCOUNT,
  DASH,
} = CONSTANT;

const getTotalBenefitPrice = benefits =>
  benefits.reduce((prev, benefit) => prev + benefit.price, 0);

const getFinalPayAmount = (originalPrice, benefits) => {
  return (
    originalPrice -
    benefits.reduce(
      (prev, benefit) =>
        prev + (benefit.type === BENEFIT_TYPE_DISCOUNT ? benefit.price : 0),
      0
    )
  );
};

const getGiveaways = originalPrice =>
  originalPrice < GIVEAWAY_STNADARD ? [] : [{ name: CHAMPAGNE, count: 1 }];

const getBadges = totalBenefitPrice => {
  const badges = [];
  if (totalBenefitPrice >= 20000) badges.push(SANTA_BADGE);
  else if (totalBenefitPrice >= 10000) badges.push(TREE_BADGE);
  else if (totalBenefitPrice >= 5000) badges.push(STAR_BADGE);
  return badges;
};

const splitStringByToken = (string, token, isTriming = true) =>
  string.split(token).map(string => (isTriming ? string.trim() : string));

const changeItemFormatToObject = itemFormat => {
  const itemArray = splitStringByToken(itemFormat, DASH);
  return { name: itemArray[0], count: Number(itemArray[1]) };
};

export default {
  getTotalBenefitPrice,
  getFinalPayAmount,
  getGiveaways,
  getBadges,
  splitStringByToken,
  changeItemFormatToObject,
};
