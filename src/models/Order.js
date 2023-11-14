import Menu from './Menu.js';
import Utils from './modules/Utils.js';
import OrderValidator from './modules/Ordervalidator.js';

class Order {
  #date;
  #categoryMap;
  #totalPrice;

  constructor(date) {
    this.#date = date;
  }

  updateItems(items, menu = Menu) {
    OrderValidator.items(items, menu);
    this.#setCategoryMap(items, menu);
    this.#setTotalPrice();
  }

  getDate() {
    return this.#date;
  }

  getItems() {
    const items = [];
    this.#categoryMap.forEach(categoryInfo =>
      categoryInfo.set.forEach(item => items.push({ ...item }))
    );
    return items;
  }

  getTotalPrice() {
    return this.#totalPrice;
  }

  getCategoryCount(category) {
    const categoryInfo = this.#categoryMap.get(category);
    if (categoryInfo === undefined) return 0;
    let totalCount = 0;
    categoryInfo.set.forEach(item => (totalCount += item.count));

    return totalCount;
  }

  #setTotalPrice() {
    this.#totalPrice = 0;
    this.#categoryMap.forEach(
      categoryInfo => (this.#totalPrice += categoryInfo.price)
    );
  }

  #setCategoryMap(items, menu) {
    this.#categoryMap = new Map();
    items.forEach(item => this.#addItem(item, menu));
    Utils.freezeMap(this.#categoryMap);
  }

  #addItem(item, menu) {
    const itemInfo = menu.get(item.name);
    const categoryInfo = this.#getCategoryInfo(itemInfo.category);
    categoryInfo.set.add({
      name: item.name,
      count: item.count,
      price: itemInfo.price * item.count,
    });
    categoryInfo.price += itemInfo.price * item.count;
  }

  #getCategoryInfo(category) {
    if (this.#categoryMap.get(category) === undefined) {
      this.#categoryMap.set(category, { set: new Set(), price: 0 });
    }
    return this.#categoryMap.get(category);
  }
}

export default Order;
