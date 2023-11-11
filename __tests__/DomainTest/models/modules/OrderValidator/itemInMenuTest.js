import Ordervalidator from '../../../../../src/models/modules/OrderValidator';

const mockMenu = menuArray => {
  const menu = new Map();
  menuArray.forEach(menu => {
    const { name } = menu;
    menu.set(name, {});
  });
  return menu;
};

describe('itemInMenu()', () => {
  test.each([
    [
      { name: '소불고기' },
      [
        { name: '소불고기' },
        { name: '돼지불고기' },
        { name: '초벌삼겹살' },
        { name: '기타메뉴' },
      ],
    ],
    [
      { name: '김치찌개' },
      [{ name: '된장찌개' }, { name: '고기찌개' }, { name: '김치찌개' }],
    ],
  ])('정상작동', (item, menuArray) => {
    //given
    const menu = mockMenu(menuArray);
    const testFucntion = () => Ordervalidator.itemInMenu(item, menu);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [
      [{ name: '김치찌개' }],
      [{ name: '된장찌개' }, { name: '고기찌개' }, { name: '짜치계' }],
    ],
    [
      [{ name: '라면사리' }],
      [{ name: '닭가슴살' }, { name: '브로콜리' }, { name: '불닭소스' }],
    ],
  ])('예외', (item, menuArray) => {
    //given
    const menu = mockMenu(menuArray);
    const testFucntion = () => Ordervalidator.itemInMenu(item, menu);

    //when
    expect(testFucntion).toThrow('[ERROR] 유효하지 않은 주문입니다.');
  });
});
