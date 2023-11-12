import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_ORDER_ERROR_MESSAGE } = CONSTANT;

const OrderValidator = Object.freeze({
  lowerCount(item) {
    if (item.count < 1) throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
  sameNameInItems(items) {
    if (items.length !== new Set(items.map(item => item.name)).size)
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
});

export default OrderValidator;
