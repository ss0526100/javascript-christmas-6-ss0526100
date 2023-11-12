import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../../../src/views/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

test.each([
  [1, 21],
  [4, 30],
  [10, 30],
  [3, 4],
])('printBenefitHeader()', (month, day) => {
  //given
  const outputView = OutputView;
  const logSpy = getLogSpy();

  //when
  outputView.printBenefitHeader(month, day);

  //then
  expect(logSpy.mock.calls[0][0]).toBe(
    `${month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
  );
});
