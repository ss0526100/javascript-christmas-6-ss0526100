import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from '../../../../src/views/OutputView';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

test.each([
  [
    [
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 3 },
      { name: '시저샐러드', count: 100 },
    ],
    ['<주문 메뉴>', '타파스 1개', '티본스테이크 3개', '시저샐러드 100개'],
  ],
  [
    [
      { name: '김밥', count: 1 },
      { name: '떡볶이', count: 5 },
      { name: '순대', count: 3 },
    ],
    ['<주문 메뉴>', '김밥 1개', '떡볶이 5개', '순대 3개'],
  ],
])('printMenu()', (orderItems, expectedValue) => {
  //given
  const outputView = OutputView;
  const logSpy = getLogSpy();

  //when
  outputView.printMenu(orderItems);

  //then
  for (let index = 0; index < expectedValue.length; index++) {
    expect(logSpy.mock.calls[index][0]).toBe(expectedValue[index]);
  }
});
