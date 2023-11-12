import Ordervalidator from '../../../../../src/models/modules/OrderValidator';

describe('totalCount()', () => {
  test.each([
    [[{ count: 5 }, { count: 12 }, { count: 3 }], 20],
    [[{ count: 1 }, { count: 1 }, { count: 1 }], 3],
    [[{ count: 5 }], 5],
  ])('정상작동', (item, upper) => {
    //given
    const testFucntion = () => Ordervalidator.totalCount(item, upper);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [[{ count: 5 }, { count: 12 }, { count: 3 }], 19],
    [[{ count: 1 }, { count: 1 }, { count: 1 }], 1],
    [[{ count: 5 }], 4],
  ])('예외', (item, upper) => {
    //given
    const testFucntion = () => Ordervalidator.totalCount(item, upper);

    //when
    expect(testFucntion).toThrow(
      `[ERROR] 메뉴는 총 ${upper}개까지만 주문할 수 있습니다.`
    );
  });
});
