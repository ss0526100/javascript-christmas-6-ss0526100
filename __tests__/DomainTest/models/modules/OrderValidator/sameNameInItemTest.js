import Ordervalidator from '../../../../../src/models/modules/OrderValidator';

describe('sameNameInItems()', () => {
  test.each([
    [[{ name: '케이크' }, { name: '쿠키' }, { name: '커피' }]],
    [[{ name: '김치' }, { name: '소고기' }, { name: '돼지고기' }]],
    [[{ name: '김치' }]],
  ])('정상작동', items => {
    //given
    const testFucntion = () => Ordervalidator.sameNameInItems(items);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [[{ name: '케이크' }, { name: '쿠키' }, { name: '쿠키' }]],
    [[{ name: '소고기' }, { name: '소고기' }]],
  ])('예외', items => {
    //given
    const testFucntion = () => Ordervalidator.sameNameInItems(items);

    //when
    expect(testFucntion).toThrow('[ERROR] 유효하지 않은 주문입니다.');
  });
});
