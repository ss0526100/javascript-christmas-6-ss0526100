import Model from '../../../../src/models/Model';
import BenefitArray from '../../../../src/models/BenefitArray';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_CHRISTMAS_D_DAY_NAME } = CONSTANT;

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name || 'name', {
      category: item.category || 'category',
      price: item.price || 0,
    })
  );
  return menu;
};

const mockModel = (date, items) => {
  const menu = mockMenu(items);
  const model = new Model(12, 1, menu);
  model.initOrder(date);
  model.setOrderItems(items, menu);
  return model;
};

describe('크리스마스 디데이 할인', () => {
  test.each([
    [4, [{ name: 'a', price: 1000, count: 10 }], 1300],
    [1, [{ name: 'a', price: 1000, count: 10 }], 1000],
    [
      25,
      [
        { name: 'a', price: 1000, count: 3 },
        { name: 'b', price: 1000, count: 7 },
      ],
      3400,
    ],
  ])('혜택O', (date, items, expectedPrice) => {
    //given
    const model = mockModel(date, items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);

    //then
    expect(benefits).toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_CHRISTMAS_D_DAY_NAME,
          price: expectedPrice,
        },
      ])
    );
  });

  test.each([
    [4, [{ name: 'a', price: 1000, count: 5 }]],
    [26, [{ name: 'a', price: 1000, count: 10 }]],
  ])('혜택x', (date, items) => {
    //given
    const model = mockModel(date, items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);

    //then
    expect(benefits).not.toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_CHRISTMAS_D_DAY_NAME,
          price: date * 100,
        },
      ])
    );
  });
});
