import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../../../src/views/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

test.each([[1], [2], [3], [4]])('printWelcomeMessage()', input => {
  //given
  const outputView = OutputView;
  const logSpy = getLogSpy();

  //when
  outputView.printWelcomeMessage(input);

  //then
  expect(logSpy.mock.calls[0][0]).toBe(
    `안녕하세요! 우테코 식당 ${input}월 이벤트 플래너입니다.`
  );
});
