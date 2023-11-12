import Ordervalidator from '../../../../../src/models/modules/OrderValidator';

describe('lowerCount()', () => {
  test.each([[{ count: 10 }], [{ count: 2 }], [{ count: 5 }], [{ count: 7 }]])(
    '정상작동',
    item => {
      //given
      const testFucntion = () => Ordervalidator.lowerCount(item);

      //when
      expect(testFucntion).not.toThrow();
    }
  );

  test.each([[{ count: 0 }]])('예외', item => {
    //given
    const testFucntion = () => Ordervalidator.lowerCount(item);

    //when
    expect(testFucntion).toThrow('[ERROR] 유효하지 않은 주문입니다.');
  });
});
