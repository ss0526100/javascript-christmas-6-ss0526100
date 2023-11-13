const ERROR_HEADER = '[ERROR]';

const STRING = Object.freeze({
  WELCOME_MESSAGE_HEADER: '안녕하세요! 우테코 식당 ',
  WELCOME_MESSAGE_FOOTER: '월 이벤트 플래너입니다.',
  DATE_INPUT_MESSAGE:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER_ITEMS_INPUT_MESSAGE:
    '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  INPUT_RETRY_MESSAGE: '다시 입력해 주세요.',
  ALL_BENEFIT_MESSAGE_DIV: '월 ',
  ALL_BENEFIT_MESSAGE_FOOTER:
    '일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  PRINT_MENU_HEADER_MESSAGE: '<주문 메뉴>',
  PRINT_ORIGINAL_PRICE_HEADER_MESSAGE: '<할인 전 총주문 금액>',
  PRINT_GIVEAWAY_HEADER_MESSAGE: '<증정 메뉴>',
  PRINT_BENEFITS_HEADER_MESSAGE: '<혜택 내역>',
  PRINT_TOTAL_BENEFIT_PRICE_HEADER_MESSAGE: '<총혜택 금액>',
  PRINT_FINAL_PAY_AMOUNT_HEADER_MESSAGE: '<할인 후 예상 결제 금액>',

  BENEFIT_CHRISTMAS_D_DAY_NAME: '크리스마스 디데이 할인',
  BENEFIT_WEEKDAY_NAME: '평일 할인',
  BENEFIT_WEEKEND_NAME: '주말 할인',
  BENEFIT_SPECIAL_NAME: '특별 할인',
  BENEFIT_GIVEAWAY_NAME: '증정 이벤트',

  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE: `${ERROR_HEADER} 10진수 정수가 아닙니다.`,
  NOT_NUMBER_IN_RANGE_ERROR_MESSAGE: `${ERROR_HEADER} 범위 바깥의 숫자입니다`,
  INVALID_DATE_ERROR_MESSAGE: `${ERROR_HEADER} 유효하지 않은 날짜입니다.`,
  INVALID_ORDER_ERROR_MESSAGE: `${ERROR_HEADER} 유효하지 않은 주문입니다.`,
  INVALID_ORDER_COUNT_ERROR_MESSAGE_HEADER: `${ERROR_HEADER} 메뉴는 총 `,
  INVALID_ORDER_COUNT_ERROR_MESSAGE_FOOTER: '개까지만 주문할 수 있습니다.',
  ONLY_BEVERAGE_ORDER_ERROR_MESSAGE: `${ERROR_HEADER} 음료만 주문할 수 없습니다.`,

  MENU_CATEGORY_APPETIZER: '애피타이저',
  MENU_CATEGORY_MAIN: '메인',
  MENU_CATEGORY_DESSERT: '디저트',
  MENU_CATEGORY_BEVERAGE: '음료',
  CHAMPAGNE: '샴페인',

  MENU_UNIT: '개',
  MONEY_UNIT: '원',
  KOREAN_LOCALE_CODE: 'ko-KR',
  NONE_MESSAGE: '없음',

  SPACE: ' ',
  COMMA: ',',
  DASH: '-',
  BLANK: '',
  COLON: ':',
});

export default STRING;
