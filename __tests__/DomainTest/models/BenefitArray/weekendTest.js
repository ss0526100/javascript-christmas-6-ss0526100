import Model from '../../../../src/models/Model';
import BenefitArray from '../../../../src/models/BenefitArray';

import CONSTANT from '../../../../src/constants/CONSTANT';

const {
  BENEFIT_WEEKEND_NAME,
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
    menu.set(item.name, {
      category: item.category || 'category',
      price: item.price || 0,
    })
  );
  return menu;
};

const mockModel = (dayWeek, items) => {
  const menu = mockMenu(items);
  const model = new Model(12, dayWeek, menu);
  model.initOrder(1);
  model.setOrderItems(items, menu);
  return model;
};

describe('주말 할인', () => {
  test.each([
    [
      SATURDAY,
      [{ name: 'a', price: 10000, count: 10, category: MENU_CATEGORY_MAIN }],
      20230,
    ],
    [
      FRIDAY,
      [{ name: 'a', price: 10000, count: 15, category: MENU_CATEGORY_MAIN }],
      30345,
    ],
    [
      FRIDAY,
      [
        {
          name: 'a1',
          price: 10000,
          count: 1,
          category: MENU_CATEGORY_MAIN,
        },
        { name: 'a2', price: 25000, count: 1, category: MENU_CATEGORY_MAIN },
        { name: 'b', price: 4000, count: 3, category: MENU_CATEGORY_DESSERT },
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
    const model = mockModel(dayWeek, items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);

    //then
    expect(benefits).toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_WEEKEND_NAME,
          price: expectedPrice,
          discount: true,
        },
      ])
    );
  });

  test.each([
    [
      MONDAY,
      [{ name: 'a', price: 10000, count: 10, category: MENU_CATEGORY_MAIN }],
      20230,
    ],
    [
      FRIDAY,
      [{ name: 'a', price: 5000, count: 1, category: MENU_CATEGORY_MAIN }],
      2023,
    ],
    [
      TUSEDAY,
      [{ name: 'a', price: 50000, count: 1, category: MENU_CATEGORY_DESSERT }],
      0,
    ],
  ])('혜택x', (dayWeek, items, expectedPrice) => {
    //given
    const model = mockModel(dayWeek, items);

    //when
    const benefits = model.getShakedBenefits(BenefitArray);
    //then
    expect(benefits).not.toEqual(
      expect.arrayContaining([
        {
          name: BENEFIT_WEEKEND_NAME,
          price: expectedPrice,
          discount: true,
        },
      ])
    );
  });
});
