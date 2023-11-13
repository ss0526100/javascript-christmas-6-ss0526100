import Model from '../../../../src/models/Model';

import CONSTANT from '../../../../src/constants/CONSTANT';

const { SUNDAY, MONDAY, TUSEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } =
  CONSTANT;

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, { category: item.category, price: item.price })
  );
  return menu;
};

const mockModel = (firstDayWeek, date, orderItems, menuItems) => {
  const model = new Model(12, firstDayWeek, mockMenu(menuItems));
  model.initOrder(date);
  model.setOrderItems(orderItems);
  return model;
};

const benefitArray = [
  {
    name: '신장개업 행사',
    checkCondition({ order }) {
      if (order.getTotalPrice() > 50000) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getCategorySize('soup') * 1000;
    },
  },
  {
    name: '주말행사',
    checkCondition({ dayWeek }) {
      const targetDayWeek = [SATURDAY, SUNDAY];
      if (targetDayWeek.includes(dayWeek)) return true;
      else false;
    },
    getBenefit({ order }) {
      return order.getTotalPrice() / 10;
    },
  },
  {
    name: '10일의 날 행사',
    checkCondition({ date }) {
      if (date === 10) return true;
      else false;
    },
    getBenefit({ originalPrice }) {
      return originalPrice / 2;
    },
  },
];

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
      { name: '신장개업 행사', benefit: 8000 },
      { name: '10일의 날 행사', benefit: 35650 },
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
    [{ name: '주말행사', benefit: 3000 }],
  ],
])(
  'getBenefits()',
  (firstDayWeek, date, orderItems, menuItems, expectedValue) => {
    //given
    const model = mockModel(firstDayWeek, date, orderItems, menuItems);

    //when
    const benefits = model.getBenefits(benefitArray);

    //then
    expect(benefits).arrayContaining(expectedValue);
  }
);
