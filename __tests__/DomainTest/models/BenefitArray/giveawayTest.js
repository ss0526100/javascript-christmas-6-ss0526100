import Model from '../../../../src/models/Model';
import BenefitArray from '../../../../src/models/BenefitArray';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_GIVEAWAY_NAME } = CONSTANT;

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, {
      category: item.category || 'category',
      price: item.price || 0,
    })
  );
  return menu;
};

const mockModel = items => {
  const menu = mockMenu(items);
  const model = new Model(12, 1, menu);
  model.initOrder(1);
  model.setOrderItems(items, menu);
  return model;
};

describe('주말 할인', () => {
  test.each([
    [[{ name: 'a', price: 10000, count: 12 }]],
    [[{ name: 'a', price: 10000, count: 20 }]],
    [
      [
        { name: 'a', price: 10000, count: 1 },
        { name: 'b', price: 4000, count: 2 },
        { name: 'c', price: 4000, count: 3 },
        { name: 'd', price: 2000, count: 4 },
        { name: 'e', price: 2000, count: 5 },
        { name: 'f', price: 14400, count: 5 },
      ],
    ],
  ])('혜택O', items => {
    //given
    const model = mockModel(items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);

    //then
    expect(benefits).toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_GIVEAWAY_NAME,
          price: 25000,
        },
      ])
    );
  });

  test.each([
    [[{ name: 'a', price: 10000, count: 10 }]],
    [[{ name: 'a', price: 10909, count: 11 }]],
    [
      [
        { name: 'a', price: 10000, count: 1 },
        { name: 'b', price: 4000, count: 2 },
        { name: 'c', price: 4000, count: 3 },
        { name: 'd', price: 2000, count: 4 },
        { name: 'e', price: 2000, count: 5 },
      ],
    ],
  ])('혜택x', items => {
    //given
    const model = mockModel(items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);
    //then
    expect(benefits).not.toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_GIVEAWAY_NAME,
          price: 25000,
        },
      ])
    );
  });
});
