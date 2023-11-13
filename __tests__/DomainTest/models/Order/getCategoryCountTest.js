import Order from '../../../../src/models/Order';

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, {
      category: item.category,
      price: item.price / item.count,
    })
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
      { name: '국수', count: 3, price: 3000, category: 'main' },
      { name: '소바', count: 3, price: 9000, category: 'main' },
      { name: '토끼', count: 3, price: 12000, category: 'animal' },
    ],
    'main',
    6,
  ],
  [[{ name: '김치', count: 3, price: 6000, category: 'hello' }], 'nono', 0],
])('geCategoryCount()', (items, category, expected) => {
  //given
  const order = mockOrder(items);

  //when
  const count = order.getCategoryCount(category);

  //then
  expect(count).toBe(expected);
});
