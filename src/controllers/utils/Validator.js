import CONSTANT from '../../constants/CONSTANT.js';

const {
  LAST_DAY,
  DIGIT_INTEGER_REGULAR_EXPRESSION,
  NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE,
  NOT_NUMBER_IN_RANGE_ERRRO_MESSAGE,
} = CONSTANT;

const Validator = Object.freeze({
  dayString(number) {},
  digitIntegerString(string) {
    if (!DIGIT_INTEGER_REGULAR_EXPRESSION.test(string))
      throw new Error(NOT_DIGIT_INTEGER_STRING_ERROR_MESSAGE);
  },
  numberInRange(number, lower, upper) {
    if (number < lower || upper < number)
      throw new Error(NOT_NUMBER_IN_RANGE_ERRRO_MESSAGE);
  },
});

export default Validator;
