import Validator from '../../../../../src/controllers/utils/Validator';

describe('dayString()', () => {
  test.each([['1'], ['2'], ['3'], ['31']])('정상동작', input => {
    //given
    const checkFunction = () => Validator.dateString(input);

    expect(checkFunction).not.toThrow();
  });

  test.each([['0'], ['32'], ['3.1'], ['초순']])('예외', input => {
    //given
    const checkFunction = () => Validator.dateString(input);

    expect(checkFunction).toThrow(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });
});