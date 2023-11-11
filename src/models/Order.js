import Menu from './Menu.js';
import ModelValidator from './modules/ModelValidator.js';

class Order {
  #date;
  #items;

  constructor(date) {
    this.#date = date;
    this.#items = new Map();
  }

  setItems(items, menu = Menu) {
    ModelValidator.items(items, menu);
  }
}

export default Order;
