import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../../src/controllers/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

test('printWelcomeMessage()', () => {
  //given
  const outputView = OutputView;
  const logSpy = getLogSpy();

  //when
  outputView.printWelcomeMessaage();

  //then
  expect(logSpy.mock.calls[0][0]).toBe(
    `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.`
  );
});
