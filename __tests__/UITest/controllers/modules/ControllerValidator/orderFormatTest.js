import ControllerValidator from '../../../../../src/controllers/modules/ControllerValidator';

describe('orderFormat()', () => {
  test.each([
    ['ckck- 1'],
    ['양송이수프-1'],
    ['초코케이크- 10'],
    ['20-10'],
    ['시저샐러드 - 10'],
  ])('정상동작', input => {
    //given
    const testFunction = () => ControllerValidator.orderFormat(input);

    expect(testFunction).not.toThrow();
  });

  test.each([['양송이수프'], ['양송이수프10개'], ['---0'], ['양송이수프--1']])(
    '예외',
    input => {
      //given
      const testFunction = () => ControllerValidator.orderFormat(input);

      expect(testFunction).toThrow('[ERROR] 유효하지 않은 주문입니다.');
    }
  );
});
