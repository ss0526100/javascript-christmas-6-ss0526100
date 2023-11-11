import CONSTANT from '../../constants/CONSTANT.js';

const { INVALID_ORDER_ERROR_MESSAGE } = CONSTANT;

const OrderValidator = Object.freeze({
  itemInMenu(item, Menu) {
    if (Menu.get(item.name) === undefined)
      throw new Error(INVALID_ORDER_ERROR_MESSAGE);
  },
});

export default OrderValidator;
