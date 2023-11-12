import Menu from './Menu.js';
import Utils from './modules/Utils.js';
import OrderValidator from './modules/Ordervalidator.js';

class Order {
  #date;
  #items;

  constructor(date) {
    this.#date = date;
  }

  setItems(items, menu = Menu) {
    OrderValidator.items(items, menu);
    this.#items = new Map();
    items.forEach(item => {
      const categoryMap =
        this.#items.get(menu.get(item.name).category) || new Map();
      categoryMap.set({ name: item.name, count: item.count });
    });
    Utils.freezeMap(this.#items);
  }
}

export default Order;
