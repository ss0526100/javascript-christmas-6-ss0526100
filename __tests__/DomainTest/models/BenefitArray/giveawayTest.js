import Order from '../../../../src/models/Order';
import ModelsUtils from '../../../../src/models/modules/ModelsUtils';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_GIVEAWAY_NAME, BENEFIT_TYPE_GIEVAWAY } = CONSTANT;

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

const mockOrder = items => {
  const order = new Order(1);
  order.updateItems(items, mockMenu(items));
  return order;
};

const mockModelInfo = items => {
  return { dayWeek: 0, order: mockOrder(items) };
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
    const modelInfo = mockModelInfo(items);

    //when
    const benefit = ModelsUtils.filterBenefit('giveaway', modelInfo);

    //then
    expect(benefit).toEqual({
      name: BENEFIT_GIVEAWAY_NAME,
      price: 25000,
      type: BENEFIT_TYPE_GIEVAWAY,
    });
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
    const modelInfo = mockModelInfo(items);

    //when
    const benefit = ModelsUtils.filterBenefit('giveaway', modelInfo);

    //then
    expect(benefit).toBe(undefined);
  });
});
