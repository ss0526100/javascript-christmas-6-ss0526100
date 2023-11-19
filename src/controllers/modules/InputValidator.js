import CONSTANT from '../../constants/CONSTANT.js';

const {
  FIRST_DATE_IN_MONTH,
  LAST_DATE_IN_MONTH,
  DIGIT_INTEGER_REGULAR_EXPRESSION,
  ORDER_FORMAT_REGULAR_EXPRESSION,
  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE,
  NOT_NUMBER_IN_RANGE_ERROR_MESSAGE,
  INVALID_DATE_ERROR_MESSAGE,
  INVALID_ORDER_ERROR_MESSAGE,
} = CONSTANT;

const InputValidator = {
  dateString(string) {
    try {
      this.digitIntegerString(string);
      this.numberInRange(
        Number(string),
        FIRST_DATE_IN_MONTH,
        LAST_DATE_IN_MONTH
      );
    } catch (error) {
      throw new Error(INVALID_DATE_ERROR_MESSAGE);
    }
  },
  digitIntegerString(string) {
    if (!DIGIT_INTEGER_REGULAR_EXPRESSION.test(string))
      throw new Error(NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE);
  },
  numberInRange(number, lower, upper) {
    if (number < lower || upper < number)
      throw new Error(NOT_NUMBER_IN_RANGE_ERROR_MESSAGE);
  },
  orderFormat(string) {
    if (!ORDER_FORMAT_REGULAR_EXPRESSION.test(string))
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
};

export default InputValidator;
