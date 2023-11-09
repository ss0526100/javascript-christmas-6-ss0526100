import { MissionUtils } from '@woowacourse/mission-utils';

import Convertor from '../../../../../src/controllers/utils/Convertor';

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

test.each(
  [['10'], 10],
  [['15일', '15'], 15],
  [['-1', '134', '111', '하이', '1'], 1],
  ['크리스마스', '이브 다음날', '내 생일', '25', 25]
)('day()', async (inputs, expectedValue) => {
  //given
  const logSpy = getLogSpy();

  mockQuestions(inputs);

  //when
  const result = await Convertor.day();

  //then
  for (let index = 0; index < inputs.length - 1; index++) {
    expect(logSpy.mock.calls[0][i]).toBe(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  }
  result.toBe(expectedValue);
});
