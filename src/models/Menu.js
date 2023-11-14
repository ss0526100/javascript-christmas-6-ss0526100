import ModelUtils from './modules/ModelUtils.js';

import CONSTANT from '../constants/CONSTANT.js';

const {
  MENU_CATEGORY_APPETIZER,
  MENU_CATEGORY_MAIN,
  MENU_CATEGORY_DESSERT,
  MENU_CATEGORY_BEVERAGE,
} = CONSTANT;

const menuObject = {
  [MENU_CATEGORY_APPETIZER]: [
    { name: '양송이수프', price: 6000 },
    { name: '타파스', price: 5500 },
    { name: '시저샐러드', price: 8000 },
  ],
  [MENU_CATEGORY_MAIN]: [
    { name: '티본스테이크', price: 55000 },
    { name: '바비큐립', price: 54000 },
    { name: '해산물파스타', price: 35000 },
    { name: '크리스마스파스타', price: 25000 },
  ],
  [MENU_CATEGORY_DESSERT]: [
    { name: '초코케이크', price: 15000 },
    { name: '아이스크림', price: 5000 },
  ],
  [MENU_CATEGORY_BEVERAGE]: [
    { name: '제로콜라', price: 3000 },
    { name: '레드와인', price: 60000 },
    { name: '샴페인', price: 25000 },
  ],
};

const Menu = new Map();

Object.keys(menuObject).forEach(category =>
  menuObject[category].forEach(item =>
    Menu.set(item.name, { category, price: item.price })
  )
);

ModelUtils.freezeMap(Menu);

export default Menu;
