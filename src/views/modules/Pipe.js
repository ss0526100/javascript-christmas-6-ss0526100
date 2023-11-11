import InputValidator from './InputValidator.js';

import CONSTANT from '../../constants/CONSTANT.js';

const { COMMA, DASH } = CONSTANT;

const spliter = (string, token, isTriming = true) =>
  string.split(token).map(string => (isTriming ? string.trim() : string));

const Pipe = Object.freeze({
  filterDate(string) {
    try {
      InputValidator.dateString(string);
      return Number(string);
    } catch (error) {
      throw error;
    }
  },

  filterOrderItems(string) {
    const orderItems = spliter(string, COMMA);
    try {
      orderItems.forEach(InputValidator.orderFormat);
      return orderItems.map(item => {
        const itemArray = spliter(item, DASH);
        return { name: itemArray[0], count: Number(itemArray[1]) };
      });
    } catch (error) {
      throw error;
    }
  },
});

export default Pipe;
