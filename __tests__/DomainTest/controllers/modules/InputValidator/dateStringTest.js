import InputValidator from '../../../../../src/controllers/modules/InputValidator';

describe('dateString()', () => {
  test.each([['1'], ['2'], ['3'], ['31']])('정상동작', input => {
    //given
    const testFunction = () => InputValidator.dateString(input);

    expect(testFunction).not.toThrow();
  });

  test.each([['0'], ['32'], ['3.1'], ['초순']])('예외', input => {
    //given
    const testFunction = () => InputValidator.dateString(input);

    expect(testFunction).toThrow('[ERROR] 유효하지 않은 날짜입니다.');
  });
});
