import Model from '../../../../src/models/Model';

import CONSTANT from '../../../../src/constants/CONSTANT';

const {
  SUNDAY,
  MONDAY,
  TUSEDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  BENEFIT_TYPE_DISCOUNT,
} = CONSTANT;

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, { category: item.category, price: item.price })
  );
  return menu;
};

const mockModel = (firstDayWeek, date, orderItems, menuItems) => {
  const model = new Model(12, firstDayWeek, mockMenu(menuItems), benefitInfo);
  model.initOrder(date);
  model.setOrderItems(orderItems);
  return model;
};

const benefitInfo = {
  a: {
    name: '신장개업 행사',
    checkCondition({ order }) {
      if (order.getTotalPrice() > 50000) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getCategoryCount('soup') * 1000;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  },
  b: {
    name: '주말행사',
    checkCondition({ dayWeek }) {
      return [SATURDAY, SUNDAY].includes(dayWeek);
    },
    getBenefit({ order }) {
      return order.getTotalPrice() / 10;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  },
  c: {
    name: '10일의 날 행사',
    checkCondition({ order }) {
      if (order.getDate() === 10) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getTotalPrice() / 2;
    },
    type: BENEFIT_TYPE_DISCOUNT,
  },
};

test.each([
  [
    FRIDAY,
    10,
    [
      { name: '김치찌개', count: 5 },
      { name: '소고기뭇국', count: 3 },
      { name: '아이스크림', count: 3 },
    ],
    [
      { name: '김치찌개', price: 10000, category: 'soup' },
      { name: '소고기뭇국', price: 7000, category: 'soup' },
      { name: '아이스크림', price: 1000, category: 'dessert' },
    ],
    [
      { name: '신장개업 행사', price: 8000, type: BENEFIT_TYPE_DISCOUNT },
      { name: '10일의 날 행사', price: 37000, type: BENEFIT_TYPE_DISCOUNT },
    ],
  ],
  [
    SATURDAY,
    1,
    [{ name: '아이스크림', count: 10 }],
    [
      { name: '김치찌개', price: 10000, category: 'soup' },
      { name: '소고기뭇국', price: 7000, category: 'soup' },
      { name: '아이스크림', price: 1000, category: 'dessert' },
    ],
    [{ name: '주말행사', price: 1000, type: BENEFIT_TYPE_DISCOUNT }],
  ],
])(
  'getShakedBenefits()',
  (firstDayWeek, date, orderItems, menuItems, expected) => {
    //given
    const model = mockModel(firstDayWeek, date, orderItems, menuItems);

    //when
    const benefits = model.getShakedBenefits(benefitInfo);

    //then
    expect(benefits).toEqual(expect.arrayContaining(expected));
  }
);
