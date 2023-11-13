import Model from '../../../../src/models/Model';
import BenefitArray from '../../../../src/models/BenefitArray';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_SPECIAL_NAME } = CONSTANT;

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
  const model = new Model(12, 5, menu);
  model.initOrder(date);
  model.setOrderItems(items, menu);
  return model;
};

describe('특별 할인', () => {
  test.each([
    [3, [{ name: 'a', price: 1000, count: 10 }]],
    [10, [{ name: 'a', price: 1000, count: 10 }]],
    [
      31,
      [
        { name: 'a', price: 1000, count: 3 },
        { name: 'b', price: 1000, count: 7 },
      ],
    ],
  ])('혜택O', (date, items) => {
    //given
    const model = mockModel(date, items);

    //when
    const benefits = model.getBenefits(BenefitArray);

    //then
    expect(benefits).toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_SPECIAL_NAME,
          price: 1000,
        },
      ])
    );
  });

  test.each([
    [20, [{ name: 'a', price: 1000, count: 5 }]],
    [26, [{ name: 'a', price: 1000, count: 10 }]],
  ])('혜택x', (date, items) => {
    //given
    const model = mockModel(date, items);

    //when
    const benefits = model.getBenefits(BenefitArray);

    //then
    expect(benefits).not.toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_SPECIAL_NAME,
          price: date * 100,
        },
      ])
    );
  });
});
