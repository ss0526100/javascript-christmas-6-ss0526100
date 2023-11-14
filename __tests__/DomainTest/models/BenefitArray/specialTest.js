import Order from '../../../../src/models/Order';
import ModelUtils from '../../../../src/models/modules/ModelUtils';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_SPECIAL_NAME, BENEFIT_TYPE_DISCOUNT } = CONSTANT;

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

const mockOrder = (date, items) => {
  const order = new Order(date);
  order.updateItems(items, mockMenu(items));
  return order;
};

const mockModelInfo = (date, items) => {
  return { dayWeek: 0, order: mockOrder(date, items) };
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
    const modelInfo = mockModelInfo(date, items);

    //when
    const benefit = ModelUtils.filterBenefit('special', modelInfo);

    //then
    expect(benefit).toEqual({
      name: BENEFIT_SPECIAL_NAME,
      price: 1000,
      type: BENEFIT_TYPE_DISCOUNT,
    });
  });

  test.each([
    [20, [{ name: 'a', price: 1000, count: 5 }]],
    [17, [{ name: 'a', price: 1000, count: 5 }]],
    [26, [{ name: 'a', price: 1000, count: 10 }]],
  ])('혜택x', (date, items) => {
    //given
    const modelInfo = mockModelInfo(date, items);

    //when
    const benefit = ModelUtils.filterBenefit('special', modelInfo);

    //then
    expect(benefit).toBe(undefined);
  });
});
