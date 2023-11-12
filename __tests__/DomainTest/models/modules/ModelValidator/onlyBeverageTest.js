import ModelValidator from '../../../../../src/models/modules/ModelValidator';

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
    menu.set(name, {});
  });
  return menu;
};

describe('onlyBeverageTest()', () => {
  test.each([
    [
      [{ name: '소불고기' }],
      [
        { name: '소불고기', catogory: MENU_CATEGORY_MAIN },
        { name: '돼지고기', catogory: MENU_CATEGORY_MAIN },
        { name: '커피', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '된장찌개', catogory: MENU_CATEGORY_DESSERT },
      ],
    ],
    [
      [
        { name: '샐러드' },
        { name: '돈가스' },
        { name: '콜라' },
        { name: '푸딩' },
      ],
      [
        { name: '샐러드', catogory: MENU_CATEGORY_APPETIZER },
        { name: '수프', catogory: MENU_CATEGORY_APPETIZER },
        { name: '돈가스', catogory: MENU_CATEGORY_MAIN },
        { name: '스테이크', catogory: MENU_CATEGORY_MAIN },
        { name: '콜라', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '사이다', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '푸딩', catogory: MENU_CATEGORY_DESSERT },
        { name: '쿠키', catogory: MENU_CATEGORY_DESSERT },
      ],
    ],
  ])('정상작동', (item, menuArray) => {
    //given
    const menu = mockMenu(menuArray);
    const testFucntion = () => ModelValidator.onlyBeverageTest(item, menu);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [
      [{ name: '커피' }],
      [
        { name: '소불고기', catogory: MENU_CATEGORY_MAIN },
        { name: '돼지고기', catogory: MENU_CATEGORY_MAIN },
        { name: '커피', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '된장찌개', catogory: MENU_CATEGORY_DESSERT },
      ],
    ],
    [
      [{ name: '콜라' }, { name: '사이다' }],
      [
        { name: '샐러드', catogory: MENU_CATEGORY_APPETIZER },
        { name: '수프', catogory: MENU_CATEGORY_APPETIZER },
        { name: '돈가스', catogory: MENU_CATEGORY_MAIN },
        { name: '스테이크', catogory: MENU_CATEGORY_MAIN },
        { name: '콜라', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '사이다', catogory: MENU_CATEGORY_BEVERAGE },
        { name: '푸딩', catogory: MENU_CATEGORY_DESSERT },
        { name: '쿠키', catogory: MENU_CATEGORY_DESSERT },
      ],
    ],
  ])('정상작동', (item, menuArray) => {
    //given
    const menu = mockMenu(menuArray);
    const testFucntion = () => ModelValidator.onlyBeverageTest(item, menu);

    //when
    expect(testFucntion).toThrow('[ERROR] 음료만 주문할 수 없습니다.');
  });
});
