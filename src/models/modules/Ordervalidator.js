import CONSTANT from '../../constants/CONSTANT.js';

const {
  INVALID_ORDER_ERROR_MESSAGE,
  INVALID_ORDER_COUNT_ERROR_MESSAGE_HEADER,
  INVALID_ORDER_COUNT_ERROR_MESSAGE_FOOTER,
  MENU_COUNT_UPPER,
} = CONSTANT;

const OrderValidator = Object.freeze({
  items(items) {
    items.forEach(this.lowerCount);
    this.sameNameInItems(items);
    this.totalCount(items);
  },
  lowerCount(item) {
    if (item.count < 1) throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
  sameNameInItems(items) {
    if (items.length !== new Set(items.map(item => item.name)).size)
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
  totalCount(items, upper = MENU_COUNT_UPPER) {
    if (
      upper < items.map(item => item.count).reduce((prev, now) => prev + now, 0)
    )
      throw new Error(
        `${INVALID_ORDER_COUNT_ERROR_MESSAGE_HEADER}${upper}${INVALID_ORDER_COUNT_ERROR_MESSAGE_FOOTER}`
      );
  },
});

export default OrderValidator;
