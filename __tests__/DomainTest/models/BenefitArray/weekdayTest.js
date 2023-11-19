import Order from '../../../../src/models/Order';
import ModelsUtils from '../../../../src/models/modules/ModelsUtils';

import CONSTANT from '../../../../src/constants/CONSTANT';

const {
  BENEFIT_WEEKDAY_NAME,
  BENEFIT_TYPE_DISCOUNT,
  MENU_CATEGORY_DESSERT,
  MENU_CATEGORY_APPETIZER,
  MENU_CATEGORY_MAIN,
  MENU_CATEGORY_BEVERAGE,
  SUNDAY,
  MONDAY,
  TUSEDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
} = CONSTANT;

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

const mockModelInfo = (dayWeek, items) => {
  return { dayWeek: dayWeek, order: mockOrder(items) };
};

describe('평일 할인', () => {
  test.each([
    [
      SUNDAY,
      [{ name: 'a', price: 10000, count: 10, category: MENU_CATEGORY_DESSERT }],
      20230,
    ],
    [
      THURSDAY,
      [{ name: 'a', price: 1000, count: 15, category: MENU_CATEGORY_DESSERT }],
      30345,
    ],
    [
      WEDNESDAY,
      [
        {
          name: 'a1',
          price: 10000,
          count: 1,
          category: MENU_CATEGORY_DESSERT,
        },
        { name: 'a2', price: 25000, count: 1, category: MENU_CATEGORY_DESSERT },
        { name: 'b', price: 4000, count: 3, category: MENU_CATEGORY_MAIN },
        {
          name: 'c',
          price: 10000,
          count: 2,
          category: MENU_CATEGORY_APPETIZER,
        },
        {
          name: 'd',
          price: 1000,
          count: 2,
          category: MENU_CATEGORY_BEVERAGE,
        },
      ],
      4046,
    ],
  ])('혜택O', (dayWeek, items, expectedPrice) => {
    //given
    const modelInfo = mockModelInfo(dayWeek, items);

    //when
    const benefit = ModelsUtils.filterBenefit('weekday', modelInfo);

    //then
    expect(benefit).toEqual({
      name: BENEFIT_WEEKDAY_NAME,
      price: expectedPrice,
      type: BENEFIT_TYPE_DISCOUNT,
    });
  });

  test.each([
    [
      FRIDAY,
      [{ name: 'a', price: 10000, count: 10, category: MENU_CATEGORY_DESSERT }],
    ],
    [
      MONDAY,
      [{ name: 'a', price: 5000, count: 1, category: MENU_CATEGORY_DESSERT }],
    ],
    [
      TUSEDAY,
      [{ name: 'a', price: 50000, count: 1, category: MENU_CATEGORY_MAIN }],
    ],
  ])('혜택x', (dayWeek, items) => {
    //given
    const modelInfo = mockModelInfo(dayWeek, items);

    //when
    const benefit = ModelsUtils.filterBenefit('weekday', modelInfo);

    //then
    expect(benefit).toBe(undefined);
  });
});
