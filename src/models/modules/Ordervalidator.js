import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_ORDER_ERROR_MESSAGE } = CONSTANT;

const OrderValidator = Object.freeze({
  itemCount(item) {
    if (item.count < 1) throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
});

export default OrderValidator;
