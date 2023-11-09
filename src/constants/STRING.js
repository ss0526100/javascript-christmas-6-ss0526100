import NUMBER from './NUMBER.js';

const { NOW_MONTH } = NUMBER;

const ERROR_HEADER = '[ERROR]';

const STRING = Object.freeze({
  WELCOME_MESSAGE: `안녕하세요! 우테코 식당 ${NOW_MONTH}월 이벤트 플래너입니다.`,

  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE: `${ERROR_HEADER} 10진수 정수가 아닙니다`,
});

export default STRING;
