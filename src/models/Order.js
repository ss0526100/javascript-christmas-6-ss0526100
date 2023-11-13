import Menu from './Menu.js';
import Utils from './modules/Utils.js';
import OrderValidator from './modules/Ordervalidator.js';

class Order {
  #date;
  #itemsMap;
  #totalPrice;

  constructor(date) {
    this.#date = date;
  }

  setItems(items, menu = Menu) {
    OrderValidator.items(items, menu);
    this.#setItemsMap(items, menu);
    this.#setTotalPrice();
  }

  getDate() {
    return this.#date;
  }

  getItems() {
    const items = [];
    this.#itemsMap.forEach(categoryObject =>
      categoryObject.set.forEach(item => items.push({ ...item }))
    );
    return items;
  }

  getTotalPrice() {
    return this.#totalPrice;
  }

  getCategoryCount(category) {
    let totalCount = 0;
    this.#itemsMap
      .get(category)
      .set.forEach(item => (totalCount += item.count));

    return totalCount;
  }

  #setTotalPrice() {
    this.#totalPrice = 0;
    this.#itemsMap.forEach(
      categoryObject => (this.#totalPrice += categoryObject.price)
    );
  }

  #setItemsMap(items, menu) {
    this.#itemsMap = new Map();
    items.forEach(item => this.#addItem(item, menu));
    Utils.freezeMap(this.#itemsMap);
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
    if (this.#itemsMap.get(category) === undefined) {
      this.#itemsMap.set(category, { set: new Set(), price: 0 });
    }
    return this.#itemsMap.get(category);
  }
}

export default Order;
