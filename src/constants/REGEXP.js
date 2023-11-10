const REGEXP = Object.freeze({
  DIGIT_INTEGER_REGULAR_EXPRESSION: Object.freeze(/^-?\d+$/),
  ORDER_FORMAT_REGULAR_EXPRESSION: Object.freeze(
    /^[가-힣|x-z|X-Z|1-9]{0,30},\s?\d+\s?$/
  ),
});

export default REGEXP;
