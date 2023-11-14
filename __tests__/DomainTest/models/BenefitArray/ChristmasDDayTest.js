import Order from '../../../../src/models/Order';
import ModelUtils from '../../../../src/models/modules/ModelUtils';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { BENEFIT_CHRISTMAS_D_DAY_NAME, BENEFIT_TYPE_DISCOUNT } = CONSTANT;

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
    const modelInfo = mockModelInfo(date, items);

    //when
    const benefit = ModelUtils.filterBenefit('christmasDDay', modelInfo);

    //then
    expect(benefit).toEqual({
      name: BENEFIT_CHRISTMAS_D_DAY_NAME,
      price: expectedPrice,
      type: BENEFIT_TYPE_DISCOUNT,
    });
  });

  test.each([
    [4, [{ name: 'a', price: 1000, count: 5 }]],
    [26, [{ name: 'a', price: 1000, count: 10 }]],
  ])('혜택x', (date, items) => {
    //given
    const modelInfo = mockModelInfo(date, items);

    //when
    const benefit = ModelUtils.filterBenefit('christmasDDay', modelInfo);

    //then
    expect(benefit).toBe(undefined);
  });
});
