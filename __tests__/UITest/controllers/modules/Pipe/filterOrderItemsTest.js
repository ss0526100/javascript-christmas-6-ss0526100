import { MissionUtils } from '@woowacourse/mission-utils';

import Pipe from '../../../../../src/controllers/modules/Pipe';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

test.each([
  [
    ['양송이수프-1, 티본스테이크-3, 초코케이크-10'],
    [
      ['양송이수프', 1],
      ['티본스테이크', 3],
      ['초코케이크', 10],
    ],
  ],
  [
    ['양송이수프 - 1 , 티본스테이크 - 3 , 초코케이크 - 10'],
    [
      ['양송이수프', 1],
      ['티본스테이크', 3],
      ['초코케이크', 10],
    ],
  ],
  [
    [
      '양송이수프-10티본스테이크-3초코케이크10',
      '양송이수프 - 1 , 티본스테이크 - 3 , 초코케이크 - 10',
    ],
    [
      ['양송이수프', 1],
      ['티본스테이크', 3],
      ['초코케이크', 10],
    ],
  ],
  [
    ['소고기10개김치10개짜장5개', '소고기 - 10,\n김치 - 10,\n짜장 - 5'],
    [
      ['소고기', 10],
      ['김치', 10],
      ['짜장', 5],
    ],
  ],
])('filterOrderItems()', async (inputs, expectedValue) => {
  //given
  const logSpy = getLogSpy();

  mockQuestions(inputs);

  //when
  const result = await Pipe.filterOrderItems();

  //then
  for (let index = 0; index < inputs.length - 1; index++) {
    expect(logSpy.mock.calls[0][i]).toBe(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  }
  expect(result).toEqual(expectedValue);
});
