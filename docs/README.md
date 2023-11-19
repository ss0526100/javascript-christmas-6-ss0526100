# 크리스마스 프로모션(v 1.0.0)

- [과제 설명]

## 해당 프로그램은 [ MVC 패턴 ]을 사용하여 구현하였음

## 코드 구조

```
src/
┣ constants/
┃ ┣ CONSTANT.js
┃ ┣ NUMBER.js
┃ ┣ REGEXP.js
┃ ┗ STRING.js
┃
┣ controllers/
┃ ┣ modules/
┃ ┃ ┣ ControllersUtils.js
┃ ┃ ┣ InputValidator.js
┃ ┃ ┗ Pipe.js
┃ ┗ Controller.js
┃
┣ models/
┃ ┣ modules/
┃ ┃ ┣ Calculator.js
┃ ┃ ┣ ModelsUtils.js
┃ ┃ ┣ ModelValidator.js
┃ ┃ ┗ Ordervalidator.js
┃ ┣ BenefitInfo.js
┃ ┣ Menu.js
┃ ┣ Model.js
┃ ┗ Order.js
┃
┣ views/
┃ ┣ modules/
┃ ┃ ┗ ViewsUtils.js
┃ ┣ InputView.js
┃ ┗ OutputView.js
┃
┣ App.js
┃
┗ index.js
```


## coverage

```
-------------------------|---------|----------|---------|---------|--------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|--------------------------------
All files                |   98.23 |    85.45 |   96.62 |   98.82 |                                
 src                     |     100 |      100 |     100 |     100 |                                
  App.js                 |     100 |      100 |     100 |     100 |                                
 src/constants           |     100 |      100 |     100 |     100 |                                
  CONSTANT.js            |     100 |      100 |     100 |     100 | 
  NUMBER.js              |     100 |      100 |     100 |     100 | 
  REGEXP.js              |     100 |      100 |     100 |     100 | 
  STRING.js              |     100 |      100 |     100 |     100 | 
 src/controllers         |     100 |    70.37 |     100 |     100 | 
  Controller.js          |     100 |    70.37 |     100 |     100 | 90,112,117,122,127,132,137,142
 src/controllers/modules |   97.72 |    85.71 |     100 |     100 | 
  ControllersUtils.js    |   95.83 |    76.92 |     100 |     100 | 28,33,39
  InputValidator.js      |     100 |      100 |     100 |     100 | 
  Pipe.js                |     100 |      100 |     100 |     100 | 
 src/models              |     100 |    86.95 |     100 |     100 | 
  BenefitInfo.js         |     100 |      100 |     100 |     100 | 
  Menu.js                |     100 |      100 |     100 |     100 | 
  Model.js               |     100 |       75 |     100 |     100 | 22-23
  Order.js               |     100 |       80 |     100 |     100 | 14
 src/models/modules      |   94.91 |    96.77 |   86.36 |   94.33 | 
  Calculator.js          |     100 |      100 |     100 |     100 | 
  ModelValidator.js      |     100 |     87.5 |     100 |     100 | 19
  ModelsUtils.js         |      88 |      100 |      50 |    87.5 | 8,12,16
  Ordervalidator.js      |     100 |      100 |     100 |     100 | 
 src/views               |   96.96 |     87.5 |     100 |     100 | 
  InputView.js           |     100 |      100 |     100 |     100 | 
  OutputView.js          |   96.55 |     87.5 |     100 |     100 | 53
 src/views/modules       |     100 |      100 |     100 |     100 | 
  ViewsUtils.js          |     100 |      100 |     100 |     100 | 
-------------------------|---------|----------|---------|---------|--------------------------------
```
# controllers

# `Controller`
기본 생성자에 의해 `Model`과 `View`가 생성 후, 전반적인 프로그램이 동작

## private fields

- `#model`

- `#inputView`

- `outputView`


## `constructor(?month, ?fisrtDayWeek, ?inputView, ?outputView)`

- 12월 뿐 만아니라 1월, 혹은 다른 달 정보를 넣어 쉬운 프로그램 변경을 위해 설계됨

- 해당 생성자로 인해 모든 private field가 설정됨(프로그램 실행과정에서 변경되지 않음)

```jsx
  const controller=new Controller();
```

**매개변수**

`?month`

생성할 `Model`의 달 정보

생략될 경우 12월

`?fisrtDayWeek`

첫 날의 요일

생략될 경우 `FRIDAY`(5,금요일)

`?inputView`, `?outputView`

입력, 출력을 맡을 `View` 를 반환


## public methods

### `async run()`

- 전반적인 프로그램 진행상황을 관리

```jsx
const controller = new Controller();

await controller.run();
```

## private methods

### `async #setOrderDate(month)`

- 사용자로부터 날짜를 입력 받아 `Model`의 `private field`인 `#Order` 값을 기본적으로 설정함

- `#model`의 메서드를 이용하기 전, 무조건 이 메서드를 호출해야 함


**매개변수**

`month`

입력 받을 때 출력될 안내 메세지에 넣을 달 정보


**예외**

자용자로 부터 입력 받은 문자열이 달이 아닌 경우(1~12의 십진수 정수)

### `async #setOrderItems()`

- 사용자로부터 `item` 형식의 문자열를 입력 받아`Model` 의 `private field`의 `#order` 에 있는 주문 목록을 설정 

- `#model` 의 메서드 `getItems`, `getTotalPrice`, `getCategoryCount`를 이용하기 전에 이 메서드를 사용해야 함


**예외**

사용자로부터 받은 문자열이 날짜가 아닌 경우(1~31의 십진수 정수)

### `#getSupplyInfo()`

- `#model`로 부터 가져올 수 있는 모든 정보를 가져옴

- ToDo: `Model`의 값을 캐싱하는 객체를 만들면서 이 메서드의 특징(`#model`로 부터 가져올 수 있는 모든 정보를 가져옴)을 유지한 채, 이 메서드가 캐싱 객체에서 직접 값을 가져 오는 형태로 `#getModelInfo`를 대체해야 함

**반환**

`#model`의 `get` 이 붙은 메서드를 이용해 `get`이 빠져있는 이름인 프로퍼티를 갖는 객체를 반환(단, `getShakedBenefits`는 `benefit`으로 저장)(ex: `getGiveaways`: `giveaways`)


### `getModelInfo(supplyInfo)`

- `supplyInfo` 의 값을 활용해서 추가적인 `#model`에서 도출되는 정보를 생성 후, 그 객체를 반환

- 도메인 로직을 `Controller`에서 활용하는 형태

- ToDo: `#getSupplyInfo()`의 ToDo를 구현하면서, 이 메서드는 `Model`의 값을 캐싱하는 객체에서 값을 받아와야 함

**매개변수**

`supplyInfo`

`#getSupplyInfo()`에서 반환하는 객체

ToDo: `#getSupplyInfo()`가 이 메서드를 대체하면서 이 매개변수를 없애야 함

**반환**

`supplyInfo`의 모든 프로퍼티를 포함해서 출력해야하는 모든 `Model`의 값을 반환

### `#printModelInfo(modelInfo)`

- 요구사항에서 요청한 입력 후 출력해야 하는 모든 값들을 출력

**매개변수**

`getModelInfo`

- `getModelInfo(supplyInfo)`을 통해 얻어 오는 정보

**출력예시**

```
12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!
 
<주문 메뉴>
티본스테이크 1개
바비큐립 1개
초코케이크 2개
제로콜라 1개
 
<할인 전 총주문 금액>
142,000원
 
<증정 메뉴>
샴페인 1개
 
<혜택 내역>
크리스마스 디데이 할인: -1,200원
평일 할인: -4,046원
특별 할인: -1,000원
증정 이벤트: -25,000원
 
<총혜택 금액>
-31,246원
 
<할인 후 예상 결제 금액>
135,754원
 
<12월 이벤트 배지>
산타
```

### `#printOriginalOrderInfo({ orderItems, originalPrice })`

- 아래의 출력예시처럼 출력

**매개변수**

`{ orderItems, originalPrice }`

`#getModelInfo(supplyInfo)`의 반환값 형태의 객체

**출력예시**

```
 
<주문 메뉴>
티본스테이크 1개
바비큐립 1개
초코케이크 2개
제로콜라 1개
 
<할인 전 총주문 금액>
142,000원
```

### `#printInfoAfterApplyingBenenfit(modelInfo)`

- `#getModelInfo(supplyInfo)`의 반환값을 이용해 아래의 출력예시처럼 출력

**매개변수**

`modelInfo`

`#getModelInfo(supplyInfo)`의 반환값 형태의 객체

**출력예시**

```

<증정 메뉴>
샴페인 1개
 
<혜택 내역>
크리스마스 디데이 할인: -1,200원
평일 할인: -4,046원
특별 할인: -1,000원
증정 이벤트: -25,000원
 
<총혜택 금액>
-31,246원
 
<할인 후 예상 결제 금액>
135,754원
 
<12월 이벤트 배지>
산타
```

### `#printOrderItems(orderItems, blankHeader = true)`

- 주문한 목록을 출력

**매개변수**

`orderItems`

주문한 목록의 정보를 담은 객체들의 배열

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<주문 메뉴>
티본스테이크 1개
바비큐립 1개
초코케이크 2개
제로콜라 1개
```

### `#printOriginalPrice(price, blankHeader = true)`

- 할인 이전 금액을 출력

**매개변수**

`price`

할인 이전의 금액

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<할인 전 총주문 금액>
142,000원
```

### `#printGiveaways(giveaways, blankHeader = true)`

- 증정 메뉴를 출력

- 증정 메뉴가 없으면 `없음`이 출력됨

**매개변수**

`giveaways`

증정 메뉴 정보가 담긴 객체들의 배열

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```

<증정 메뉴>
샴페인 1개
```


### `#printBenefits(benefits, blankHeader = true)`

- 혜택 내역을 출력

- 혜택이 없으면 `없음`이 출력됨

**매개변수**

`benefits`

혜택 내역 정보가 담긴 객체들의 배열

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<혜택 내역>
크리스마스 디데이 할인: -1,200원
평일 할인: -4,046원
특별 할인: -1,000원
증정 이벤트: -25,000원
```

### `#printTotalBenefitPrice(totalBenefitPrice, blankHeader = true)`

- 총 혜택 금액을 출력

- 혜택이 없으면 `0원`이 출력됨

**매개변수**

`totalBenefitPrice`

총 혜택 금액

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<총혜택 금액>
-31,246원
```

### `#printFinalPayAmount(finalPayAmount, blankHeader = true)`

- 할인 후 예상 결제 금액을 출력

- 할인 후 예상 결제 금액은 (할인 전 총 주문금액)-(할인 혜택)((할인 전 총 주문금액) - (총혜택 금액)이 아님에 주의!!)

**매개변수**

`finalPayAmount`

할인 후 예상 결제 금액

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<할인 후 예상 결제 금액>
135,754원
```

### `#printBadges(month, badges, blankHeader = true)`

- 특정한 달의 배지들을 출력

**매개변수**

`month`

달 숫자(1~12)

`badges`

배지 정보가 담긴 문자열들의 배열

`blankHeader`

맨 앞 칸을 띄우고 출력할 지 여부, 생략시 띄움

**출력예시**

```
 
<12월 이벤트 배지>
산타
```

# moduels

## `ControllerUtils`

`contollers` 폴더 아래에서 사용되는 함수들

### `getTotalBenefitPrice(benefits)`

- 혜택 정보가 담긴 객체들의 배열(`benefits`)을 인자로 받아 총 혜택 금액을 반환 (할인 금액이 아님에 주의!!)


### `getFinalPayAmount(originalPrice, benefits)`

- `originalPrice` 에서 `benefits`(할인 혜택 정보가 담긴 객체들의 배열)에서 할인으로 인한 할인 금액을 반환

- 할인 금액은 `benefits`의 요소(`benefit`)의 `type` 프로퍼티의 값이 `discount`인 경우에만 계산

- 혜택 금액의 총 합이 할인 금액이 아님에 주의!

### `getGiveaways(originalPrice)`

- `originalPrice`가 '`120000` 이상인 경우 `{ name: '샴페인', count: 1 }`가 담긴 배열을, 그렇지 않은 경우 빈 배열을 반환

### `getBadges(totalBenefitPrice)`

- `totalBenefitPrice`가 `20000` 이상인 경우 `산타`, `20000` 미만 `10000` 이상인 경우 `트리`, `10000`미만 `5000`이상인 경우 `별`이 담긴 배열을, 나머지 경우(`5000`미만)에는 빈 배열을 반환

### `splitStringByToken(string, token, isTriming = true)`

- `string`을 `token`에 의해 나눈 후 `isTriming`이 `true`인 경우 나눈 각 요소들에 `trim`을 적용함

**사용예시**

```jsx
const string = ' a, b ,c, d '
console.log(splitStringByToken(string,',')); // [a,b,c,d]
```

### `changeItemFormatToObject(itemFormatString)`

- `itemFormatString`을 객체형태로 바꿈

- `itemFormatString`은 `이름-갯수` 형태의 문자열들

- 반환 값은 `{name: 이름, count: 갯수}`

## `Pipe`

매개변수가 특정 조건을 만족하는지 확인해 조건을 충족하면 특정한 값으로 바꾸고, 그렇지 않다면 예외를 던지는 함수들

### `filterDate(string)`

- `string`이 날짜 수(1~31인 정수)인 십진수인지 확인 후 맞다면 `Number`형을 반환, 그렇지 않다면 예외를 던짐

### `filterOrderItems(string)`

- `string`을 `-`로 나눈 값이 `itemFormatString`(`이름-갯수`) 형태인지 확인 후 맞다면 `orderItem`형 객체(`{name:이름, count:갯수}`)들의 배열로 반환, 그렇지 않다면 예외를 던짐

## `InputValidator`

입력 값의 유효성을 확인하는 함수들

### `dateString(string)`

- 문자열 `string`이 십진수 숫자이면서, 1~31 범위의 숫자의 문자열인지 확인하고, 그렇지 않으면 예외를 던짐

### `digitIntegerString(string)`

- 문자열 `string`이 십진수 숫자인지 확인하고 그렇지 않으면 예외를 던짐

### `numberInRange(number, lower, upper)`

- `number`가 `lower` 이상 `upper` 이하의 값인지 확인하고 그렇지 않으면 예외를 던짐

### `orderFormat(string)`

- `string`이 `이름-숫자` 형태의 문자열인지 확인하고 그렇지 않으면 예외를 던짐

- 공백문자가 들어가면 무시함


# models

# `Model`

## private field

`#monthInfo`

달의 정보가 담겨 있음

`#menu`

메뉴 정보가 담겨있는 객체

`#order`

주문 정보가 담겨있는 `Order` 형 객체

`#benefitInfo`

혜택 정보가 담겨있는 객체

## `constructor(?month,?firstDayWeek,?menu,?benefitInfo)`

- 생성자를 통해 `#order`를 제외한 모든 private field를 초기화

- 이렇게 초기화된 값은 실행 과정 내내 변하지 않음

## public methods

### `getMonth()`

- `#monthInfo.month`를 반환

### `getDate()`

- `#order`의 `#date`를 반환

### `initOrder(date)`

- `date` 값의 유효성(달의 마지말 날짜보다 큰 날짜 여부)를 확인 후 유효하지 않으면 예외를 던짐

- `date` 값이 유효하다면, `#order` 값을 `date`를 `Order` 생성자에 넣어 설정

- 이 메서드 사용 이전에 `#order`를 사용하는 메서드가 있다면 예외가 발생됨

### `setOrderItems(items, menu?)`

- 주문 목록인 `items`의 유효성을 판단(음료수만 샀는지, 중복된 메뉴가 있는지)후 유효하지 않다면 예외를 던짐

- `items` 값이 유효하다면 `#order.updateItems()`를 통해 주문 목록을 업데이트

- `menu`에 인자가 들어오지 않는다면 `Menu`를 기본값으로 삼음

### `getOrderItems()`

- `#order.getItem()`을 반환

### `getOrignalPrice()`

- `#order.getTotalPrice()`을 반환

### `getShakedBenefit(benefitInfo?)`

- `benefitInfo`를 바탕으로 `#order`에 적용될 수 있는 혜택들을 담은 배열을 반환

**매개변수**

- `benefitInfo`

적용할 수 있는 혜택들이 담겨있는 객체, 기본값은 `BenefitInfo`

**반환값**

`benefitInfo`를 바탕으로 `#order`에 적용될 수 있는 혜택들을 담은 배열

혜택들의 가격을 기준으로 배열의 요소들이 잘 섞여져서 반환

(ex: 혜택 가격이 1,2,3,4라면 1,4,2,3 순으로 섞음)

섞는 이유: 고객들이 혜택을 많이 받는다는 것을 체감할 수 있게 하기 위함

배열을 섞을 경우 오름차순이나 내림차순으로 혜택을 보여주는 것 보다 혜택이 더 많아 보임

## private methods

### `#getModelInfo()`

- `getShakedBenefit()`에서 받을 혜택인지 판단하기 위한 reducer함수를 만들때 필요한 `modelInfo`를 반환

### `#getBenefitReducer(modelInfo)`

- `getShakedBenefit()`에서 `benefitInfo`를 순회하며 혜택을 확인할 때 쓰는 reducer 함수를 반환

# `Order`

## private fields

`#date`

주문하는 날짜

`#categoryMap`

메뉴를 저장하는 `Map` 객체

카테고리의 이름을 `key`, 카테고리의 정보를 담은 객체를 `value`로 가짐

**구조**
```
#categoryMap
┣ (key:카테고리 이름, value:categoryObject)
┃                    ┣ price(카테고리 내의 주문 목록 가격의 총합)
┃                    ┗ set(Set 객체)
┃                      ┣ itemObject
┃                      ┃ ┣ name(시킬 메뉴의 이름)
┃                      ┃ ┣ count(시킬 메뉴의 갯수)
┃                      ┃ ┗ price(시킬 메뉴의 가격)
┃                      ┣ itemObject
┃                      ┣ itemObject
┃                      . 
┃                      . 
┃                      . 
┃ 
┣ (key:카테고리 이름, value:categoryObject)
┣ (key:카테고리 이름, value:categoryObject)
.
.
.
```

**Todo**

`categoryInfo`에 카테고리 내의 메뉴의 총 개수인 `count` 프로퍼티 만들기

`#totalPrice`

총 메뉴들의 가격 총합(`#categoryMap` 에서 직접 도출이 가능하나, 자주 사용되는 값이므로 외부에 드러난 함수로 변경할 수 없는 private field로 남겨 놓음)
/ `#categoryMap`의 값을 바꿀 때만 값이 변경됨

## `constructor(date)`

`#date`를 설정, 이 값은 실행 과정 내내 바뀌지 않음

## public methods

### `updateItem(items,menu?)`

- 주문 목록인 `items` 내부의 요소인 `item`의 유효성(모든 메뉴의 개수가 1이상, 중복 메뉴는 없는지, 총 메뉴의 값이 20개 이하인지)를 확인후 유효하지 않다면 예외를 던짐

- `items`이 유효하다면, `items`를 통해 `#categoryMap`의 구조에 맞게 `#categoryMap`을 초기화

**매개변수**

`items`

`item`들이 담긴 배열,( `item`의 구조 : `{name:이름, count: 메뉴 갯수}` )

`menu`

`item`의 `category`와 `price`를 확인할 `Map`형의 객체, 기본값은 `Menu`

### `getDate()`

- `#date`를 반환

### `getTotalPrice()`

- `#totalPrice`를 반환

### `getItems()`

- `#categoryMap`에 저장된 값을 배열로 바꾸어 반환

**반환값**

`item`들이 담긴 배열,( `item`의 구조 : `{name:이름, count: 메뉴 갯수}` )

### `getCategoryCount(category)`

- `#categoryMap`에서 `category`를 `key`값으로 갖는 `categoryInfo`의 메뉴의 총 갯수를 반환

- 현재는 `categoryInfo.set`을 순회하며 값을 얻으나, Todo에 있는 "`categoryInfo`에 카테고리 내의 메뉴의 총 개수인 `count` 프로퍼티 만들기"를 구현하며 직접 값을 반환하는 형식으로 바꾸기

## private methods

### `#setTotalPrice()`

- `#categoryMap` 내부의 모든 메뉴 가격의 합을 반환

- `updateItems` 내부에 위치하게 해, `#categoryMap`의 값이 바뀔 때마다 값이 업데이트 되야 함

### `#setCategoryMap(items, menu)`

- `items`와 `menu`를 활용해 `#categoryMap`을 설정함

- 해당 객체는 바뀌어지지 않게 얼려짐

### `#addItem(item, menu)`

- `menu`의 정보를 통해 `item`을 `categoryMap`에 업데이트

### `#getCategoryInfo(category)`

- `#addItem()`에서 `item`을 저장할 `categoryInfo`를 반환

- `item`을 넣을 `categoryInfo`가 `#categoryMap`에 없으면, `#categoryMap`에 `categoryInfo`를 추가

# `Menu`

메뉴 정보가 담긴 `Map`형 객체

**구조**

```
Menu
┣ (key:메뉴 이름, value: menuInfo)
┃                    ┣ category (메뉴가 속한 카테고리)
┃                    ┗ price (메뉴의 가격)
┃ 
┣ (key:메뉴 이름, value: menuInfo)
┣ (key:메뉴 이름, value: menuInfo)
.
.
.
```

**메뉴 추가, 수정 방법**

`Menu.js`의 `menuObject`를 수정

- `menuObject`는 `key`(카테고리 이름):`value`(메뉴 정보가 담긴 배열) 쌍들이 담긴 객체

- `value`의 요소(메뉴 정보)는 `{name: 메뉴 이름, price: 가격}`


# `BenefitInfo`

혜택 목록을 저장한 객체

`key`: 혜택이름

`value`: 혜택 정보

`value`의 형식

`{name:혜택 이름, checkCondition: 혜택을 적용할 조건이 담긴 함수, type: 혜택의 종류}`

# `Model` 

# modules

## ModelValidator

`Model`의 유효성을 확인하는 class

### `dateInMonth(date, month, leapYear?)`

- `date`가 `month`에 있을 수 있는지 확인해서 있을 수 없다면 예외를 던짐

**매개변수**

`date`

날짜

`month`

달

`leapYear`

윤년여부, 기본값은 `false`


### 이후 README 작성 필요




# views

## 추후 작성 필요

# ToDo

`Controller`가 `Model`을 가져올 때 `Model`의 값을 캐싱하는 객체를 넣기

`Order` `#categoryMap` 의 `value`인 `categoryInfo`에 카테고리 내의 메뉴의 총 개수인 `count` 프로퍼티 만들기

`#categoryMap`의 `value`값인 `categoryInfo.set`이 제대로 얼려지지 않은 상태, `freezeMap`을 수정하는 등의 방식을 통해 확실히 얼릴 것

`ModelValidator`의 `items`와 `itemsInMenu`의 이름을 `Order`를 넣어 확실히 할 것

작성하지 못한 리드미 (Models/modules의 일부 하위 파일,views 하위 파일) 작성하기

coverage 상에서 테스트 하지 못한 유닛 테스트 만들기

# 구현한 기능 목록
- [x] 프로그램 시작 메시지 출력(`안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.`)
- [x] 식당 예상 방문 날짜 입력(`12월 중 식당 예상 방문 날짜는 언제인가요?`)
  - [x] 예외체크(`[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.`)
    - [x] 십진수 정수의 문자열인지 확인(view)
    - [x] `1` 이상 `31` 이하의 숫자인가 확인(view)
  - [x] 예외 값일 경우 다시 입력받기 

- [x] 주문 메뉴와 개수 입력(`주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)`)
  - [x] 예외 체크 (`[ERROR] {예외 내용} 다시 입력해주세요`)
    - [x] (`유효하지 않은 주문입니다.`)
      - [x] 메뉴 형식이 예시와 같은가(공백의 경우에도 너그럽게 확인)(view)
      - [x] 메뉴판에 없는 메뉴인가(model)
      - [x] 메뉴의 개수가 `1` 이상의 숫자인가(order)
      - [x] 중복 메뉴인가(order)
    - [x] (`메뉴는 총 20개까지만 주문할 수 있습니다.`)
      - [x] 모든 메뉴 개수가 20개 이하인가(order)
    - [x] (`음료만 주문할 수 없습니다.`) 
      - [x] 음료만 주문하지 않았는가 (model)
  - [x] 예외 값일 경우 다시 입력받기  

- [x] 혜택 계산 및 출력
  - [x] 혜택 미리보기 출력(`12월 *일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`)

  - [x] 주문 메뉴 가져오기
  - [x] 주문 메뉴 출력(메뉴 가격 순)(`\n<주문 메뉴>\n`{`메뉴 *개\n메뉴 *개\n...`})

  - [x] 할인 전 총 주문 금액 계산()
  - [x] 할인 전 총 주문 금액 출력(`\n<할인 전 총주문 금액>\n`,`*,***원`)
   
  - [x] 증정 메뉴 확인
  - [x] 증정 메뉴 출력(`\n<증정 메뉴>`)
    - [x] 할인 전 총 금액이 12만원 이상이면 `샴페인 1개`, 아니면 `없음`

  - [x] 혜택 내역 확인(크리스마스 디데이 제외~31일)
    - [x] `크리스마스 디데이 할인`(1일 `1000`원, 25일까지 `100`원 증가(25일 `3400`원))(~25일)
    - [x] `평일 할인`(일~목)(디저트 메뉴 1개당 `2023`원 할인)
    - [x] `주말 할인`(금~토)(메인 메뉴 1개당 `2023`원 할인)
    - [x] `특별 할인`(3,10,17,24,25,31일)(총 주문금액에서 `1000`원 할인)
    - [x] `증정 이벤트`(총 금액 12만원 이상일 시 샴페인 가격(`25000`) 만큼 혜택 처리)
  - [x] 혜택 내역 출력(`\n<혜택 내역>\n{혜택 이름}: -{혜택 금액(*,***)}원\n...`)

  - [x] 총 혜택 금액 출력(`\n<총혜택 금액>\n -{총혜택 금액(*,***)}원`)

  - [x] 할인 후 예상 결제 금액 출력(`\n<할인 후 예상 결제 금액>\n {예상 결제 금액(*,***)}원`)

  - [x] 이벤트 배지 확인(무조건 하나)
    - [x] 5천 원 이상: `별`
    - [x] 1만 원 이상: `트리`
    - [x] 2만 원 이상: `산타`
  - [x] 이벤트 배지 출력(`\n<12월 이벤트 배지>\n{이벤트 배지 이름}`)



[과제 설명]: https://github.com/woowacourse-precourse/javascript-christmas-6/blob/main/README.md

[MVC 패턴]: https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC