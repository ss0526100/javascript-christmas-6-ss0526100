const ERROR_HEADER = '[ERROR]';

const STRING = Object.freeze({
  WELCOME_MESSAGE_HEADER: '안녕하세요! 우테코 식당 ',
  WELCOME_MESSAGE_FOOTER: '월 이벤트 플래너입니다.',
  DATE_INPUT_MESSAGE:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER_ITEMS_INPUT_MESSAGE:
    '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
  INPUT_RETRY_MESSAGE: '다시 입력해 주세요.',

  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE: `${ERROR_HEADER} 10진수 정수가 아닙니다.`,
  NOT_NUMBER_IN_RANGE_ERROR_MESSAGE: `${ERROR_HEADER} 범위 바깥의 숫자입니다`,
  INVALID_DATE_ERROR_MESSAGE: `${ERROR_HEADER} 유효하지 않은 날짜입니다.`,
  INVALID_ORDER_ERROR_MESSAGE: `${ERROR_HEADER} 유효하지 않은 주문입니다.`,

  SPACE: ' ',
  COMMA: ',',
  DASH: '-',
});

export default STRING;
