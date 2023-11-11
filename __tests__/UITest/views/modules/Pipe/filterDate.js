import Pipe from '../../../../../src/views/modules/Pipe';

describe('filterDate()', () => {
  test.each([
    ['10', 10],
    ['15', 15],
    ['1', 1],
    ['25', 25],
  ])('정상동작', (input, expectedValue) => {
    //when
    const date = Pipe.filterDate(input);

    //then
    expect(date).toBe(expectedValue);
  });

  test.each([
    ['15일'],
    ['-1'],
    ['134'],
    ['111'],
    ['하이'],
    ['크리스마스'],
    ['이브 다음날'],
    ['내 생일'],
  ])('예외', input => {
    //given
    const testFunction = () => Pipe.filterDate(input);

    //when
    expect(testFunction).toThrow('[ERROR] 유효하지 않은 날짜입니다.');
  });
});
