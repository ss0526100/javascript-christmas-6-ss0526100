import Order from '../../../../src/models/Order';

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, { category: 'a', price: item.price / item.count })
  );
  return menu;
};

const mockOrder = items => {
  const order = new Order(1);
  const menu = mockMenu(items);

  order.setItems(items, menu);
  return order;
};

test.each([
  [
    [
      { name: '국수', count: 3, price: 3000 },
      { name: '소바', count: 3, price: 9000 },
      { name: '토끼', count: 3, price: 12000 },
    ],
  ],
  [[{ name: '김치', count: 3, price: 6000 }]],
  [
    [
      { name: '멸치', count: 3, price: 7500 },
      { name: '도라지', count: 3, price: 3600 },
    ],
  ],
])('getItems()', items => {
  //given
  const order = mockOrder(items);

  //when
  const result = order.getItems();

  //then
  expect(result).toHaveLength(items.length);
  items.forEach(item => expect(result).toContainEqual(item));
});
