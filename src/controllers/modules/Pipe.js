import InputValidator from './InputValidator.js';
import ControllersUtils from './ControllersUtils.js';

import CONSTANT from '../../constants/CONSTANT.js';

const { splitStringByToken, changeItemFormatToObject } = ControllersUtils;

const { COMMA } = CONSTANT;

const Pipe = {
  filterDate(string) {
    InputValidator.dateString(string);
    return Number(string);
  },

  filterOrderItems(string) {
    const orderItems = splitStringByToken(string, COMMA);
    orderItems.forEach(InputValidator.orderFormat);
    return orderItems.map(changeItemFormatToObject);
  },
};

export default Pipe;
