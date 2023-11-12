import Order from '../../../../src/models/Order';

const mockMenu = items => {
  const menu = new Map();
  items.map(item => menu.set(item.name, { category: 'a', price: 0 }));
  return menu;
};

const mockOrder = items => {
  const order = new Order(date);
  const menu = mockMenu(items);

  order.setItems(items, menu);
  return order;
};

test.each([
  [
    { name: '국수', count: 3 },
    { name: '소바', count: 3 },
    { name: '토끼', count: 3 },
  ],
  [{ name: '김치', count: 3 }],
  [
    { name: '멸치', count: 3 },
    { name: '도라지', count: 3 },
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
