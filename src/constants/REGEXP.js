const REGEXP = Object.freeze({
  DIGIT_INTEGER_REGULAR_EXPRESSION: Object.freeze(/^-?\d+$/),
  ORDER_FORMAT_REGULAR_EXPRESSION: Object.freeze(
    /^[가-힣|a-z|A-Z|0-9]{0,30}\s?\-\s?\d+$/
  ),
});

export default REGEXP;
