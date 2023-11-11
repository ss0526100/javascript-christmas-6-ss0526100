import Pipe from '../../../../../src/views/modules/Pipe';

describe('filterOrderItems()', () => {
  test.each([
    [
      '양송이수프-1, 티본스테이크-3, 초코케이크-10',
      [
        ['양송이수프', 1],
        ['티본스테이크', 3],
        ['초코케이크', 10],
      ],
    ],
    [
      '타파스 - 1 , 티본스테이크 - 3 , 시저샐러드 - 100',
      [
        ['타파스', 1],
        ['티본스테이크', 3],
        ['시저샐러드', 100],
      ],
    ],
    [
      '소고기 - 10, 김치 - 10,짜장 - 5',
      [
        ['소고기', 10],
        ['김치', 10],
        ['짜장', 5],
      ],
    ],
  ])('정상동작', (input, expectedValue) => {
    //when
    const date = Pipe.ilterOrderItems(input);

    //then
    expect(date).toEqual(expectedValue);
  });

  test.each([
    ['양송이수프-10티본스테이크-3초코케이크10'],
    ['양송이스프-0x10'],
    ['소고기10개김치10개짜장5개'],
    ['아무거나줘'],
    ['많이'],
    ['오마카세로 내와라'],
    ['10'],
    ['내 생일'],
  ])('예외', input => {
    //given
    const testFunction = () => Pipe.filterOrderItems(input);

    //when
    expect(testFunction).toThrow('[ERROR] 유효하지 않은 주문입니다.');
  });
});
