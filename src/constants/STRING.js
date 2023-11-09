import NUMBER from './NUMBER.js';

const { NOW_MONTH } = NUMBER;

const ERROR_HEADER = '[ERROR]';

const STRING = Object.freeze({
  WELCOME_MESSAGE: `안녕하세요! 우테코 식당 ${NOW_MONTH}월 이벤트 플래너입니다.`,

  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE: `${ERROR_HEADER} 10진수 정수가 아닙니다.`,
  NOT_NUMBER_IN_RANGE_ERROR_MESSAGE: `${ERROR_HEADER} 범위 바깥의 숫자입니다`,
  INVALID_DAY_ERROR_MESSAGE: `${ERROR_HEADER} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
});

export default STRING;
