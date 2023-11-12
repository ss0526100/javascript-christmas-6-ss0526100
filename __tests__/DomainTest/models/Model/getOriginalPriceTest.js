import Model from '../../../../src/models/Model';

const mockMenu = items => {
  const menu = new Map();
  items.forEach(item =>
    menu.set(item.name, { category: 'tmp', price: item.price })
  );
  return menu;
};

const mockModel = menu => {
  return new Model(12, 5, menu);
};

test.each([
  [
    [
      { name: '김치찌개', count: 5 },
      { name: '소고기뭇국', count: 3 },
    ],
    [
      { name: '김치찌개', price: 10000 },
      { name: '소고기뭇국', price: 7000 },
    ],
    71000,
  ],
  [
    [{ name: '탕수육', count: 5 }],
    [
      { name: '탕수육', price: 8000 },
      { name: '소고기뭇국', price: 7000 },
    ],
    40000,
  ],
])('getOriginalPrice()', (orderItems, menuItems, expectedNumber) => {
  //given
  const model = mockModel(mockMenu(menuItems));

  //when
  const price = model.getOrignalPrice(orderItems);

  //then
  expect(price).toBe(expectedNumber);
});
