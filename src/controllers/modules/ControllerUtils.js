import CONSTANT from '../../constants/CONSTANT.js';

const { SANTA_BADGE, TREE_BADGE, STAR_BADGE, CHAMPAGNE, GIVEAWAY_STNADARD } =
  CONSTANT;

const getTotalBenefitPrice = benefits =>
  benefits.reduce((prev, benefit) => prev + benefit.price, 0);

const getFinalPayAmount = (originalPrice, benefits) => {
  return (
    originalPrice -
    benefits.reduce(
      (prev, benefit) => prev + (benefit.discount ? benefit.price : 0),
      0
    )
  );
};

const getGiveaway = originalPrice =>
  originalPrice < GIVEAWAY_STNADARD ? [] : [{ name: CHAMPAGNE, count: 1 }];

const getBadges = totalBenefitPrice => {
  const badges = [];
  if (totalBenefitPrice >= 20000) badges.push(SANTA_BADGE);
  else if (totalBenefitPrice >= 10000) badges.push(TREE_BADGE);
  else if (totalBenefitPrice >= 5000) badges.push(STAR_BADGE);
  return badges;
};

export default {
  getTotalBenefitPrice,
  getFinalPayAmount,
  getGiveaway,
  getBadges,
};
