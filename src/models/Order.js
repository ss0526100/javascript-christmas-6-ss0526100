import Menu from './Menu.js';
import Utils from './modules/Utils.js';
import OrderValidator from './modules/Ordervalidator.js';

class Order {
  #date;
  #itemsMap;

  constructor(date) {
    this.#date = date;
  }

  setItems(items, menu = Menu) {
    OrderValidator.items(items, menu);
    this.#itemsMap = new Map();
    items.forEach(item => {
      const itemInfo = menu.get(item.name);
      const categorySet = this.#getCategorySet(itemInfo.category);
      categorySet.add({ name: item.name, count: item.count });
    });
    Utils.freezeMap(this.#itemsMap);
  }

  getDate() {
    return this.#date;
  }

  getItems() {
    const items = [];
    this.#itemsMap.forEach(categorySet =>
      categorySet.forEach(item => items.push(item))
    );
    return items;
  }

  #getCategorySet(category) {
    if (this.#itemsMap.get(category) === undefined) {
      this.#itemsMap.set(category, new Set());
    }
    return this.#itemsMap.get(category);
  }
}

export default Order;
