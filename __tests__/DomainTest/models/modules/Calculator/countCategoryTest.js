import Calculator from '../../../../../src/models/modules/Calculator';

import CONSTANT from '../../../../../src/constants/CONSTANT';

const {
  MENU_CATEGORY_APPETIZER,
  MENU_CATEGORY_BEVERAGE,
  MENU_CATEGORY_DESSERT,
  MENU_CATEGORY_MAIN,
} = CONSTANT;

const mockMenu = menuArray => {
  const menu = new Map();
  menuArray.forEach(menuItem => {
    const { name } = menuItem;
    menu.set(name, { category: menuItem.category });
  });
  return menu;
};
test.each([
  [
    [{ name: '소불고기' }],
    [
      { name: '소불고기', category: MENU_CATEGORY_MAIN },
      { name: '돼지고기', category: MENU_CATEGORY_MAIN },
      { name: '커피', category: MENU_CATEGORY_BEVERAGE },
      { name: '된장찌개', category: MENU_CATEGORY_DESSERT },
    ],
    MENU_CATEGORY_APPETIZER,
    0,
  ],

  [
    [{ name: '소불고기' }],
    [
      { name: '소불고기', category: MENU_CATEGORY_MAIN },
      { name: '돼지고기', category: MENU_CATEGORY_MAIN },
      { name: '커피', category: MENU_CATEGORY_BEVERAGE },
      { name: '된장찌개', category: MENU_CATEGORY_DESSERT },
    ],
    MENU_CATEGORY_MAIN,
    1,
  ],
  [
    [
      { name: '샐러드' },
      { name: '돈가스' },
      { name: '콜라' },
      { name: '푸딩' },
      { name: '쿠키' },
    ],
    [
      { name: '샐러드', category: MENU_CATEGORY_APPETIZER },
      { name: '수프', category: MENU_CATEGORY_APPETIZER },
      { name: '돈가스', category: MENU_CATEGORY_MAIN },
      { name: '스테이크', category: MENU_CATEGORY_MAIN },
      { name: '콜라', category: MENU_CATEGORY_BEVERAGE },
      { name: '사이다', category: MENU_CATEGORY_BEVERAGE },
      { name: '푸딩', category: MENU_CATEGORY_DESSERT },
      { name: '쿠키', category: MENU_CATEGORY_DESSERT },
    ],
    MENU_CATEGORY_DESSERT,
    2,
  ],
  [
    [
      { name: '샐러드' },
      { name: '돈가스' },
      { name: '콜라' },
      { name: '푸딩' },
    ],
    [
      { name: '샐러드', category: MENU_CATEGORY_APPETIZER },
      { name: '수프', category: MENU_CATEGORY_APPETIZER },
      { name: '돈가스', category: MENU_CATEGORY_MAIN },
      { name: '스테이크', category: MENU_CATEGORY_MAIN },
      { name: '콜라', category: MENU_CATEGORY_BEVERAGE },
      { name: '사이다', category: MENU_CATEGORY_BEVERAGE },
      { name: '푸딩', category: MENU_CATEGORY_DESSERT },
      { name: '쿠키', category: MENU_CATEGORY_DESSERT },
    ],
    MENU_CATEGORY_MAIN,
    1,
  ],
])('countCategory()', (items, menuArray, category, expeectedValue) => {
  //given
  const menu = mockMenu(menuArray);

  //when
  const count = Calculator.countCategory(items, menu, category);

  //when
  expect(count).toBe(expeectedValue);
});
