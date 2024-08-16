---
title: "자바스크립트에서 모듈 패턴 이해하기 쉽게 따라하는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-07 02:19
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Understanding the Module Pattern in JavaScript"
link: "https://medium.com/@vembarrajan/understanding-the-module-pattern-in-javascript-2663c2e6a970"
isUpdated: true
---




자바스크립트는 다재다능하고 동적인 언어로, 코드를 구조화하고 조직하는 다양한 방법을 제공합니다. 자바스크립트 개발에서 가장 인기 있는 패턴 중 하나는 모듈 패턴입니다. 이 패턴은 단일 객체 내에서 개인 및 공용 멤버를 캡슐화하는 방법을 제공하여 코드를 깔끔하고 유지보수 가능하며 재사용하기 쉽게 만들어줍니다.

# 모듈 패턴을 사용하는 이유

모듈 패턴이 작동하는 구체적인 내용에 대해 알아보기 전에 해당 패턴의 이점을 이해하는 것이 중요합니다:

- 캡슐화: 모듈 내에서 개인 데이터 및 메서드를 캡슐화하여 모듈 외부에서는 모듈의 공용 인터페이스를 통해만 액세스할 수 있도록 합니다.
- 조직화: 모듈을 사용하면 관련 기능을 논리적으로 구성하여 코드를 조직화하는 데 도움이 되어 가독성과 유지보수성을 향상시킵니다.
- 재사용성: 모듈은 다른 응용 프로그램 부분 또는 다른 프로젝트에서 충돌 없이 쉽게 재사용할 수 있습니다.

<div class="content-ad"></div>

# 모듈 패턴의 구조

모듈 패턴은 JavaScript의 클로저와 즉시 호출 함수 표현(IIFE)을 활용하여 캡슐화를 달성합니다. 이 구조를 살펴보겠습니다:

```js
var Module = (function() {
    // 비공개 변수와 함수
    var privateVariable = '비공개입니다';
    function privateFunction() {
        console.log('이것은 비공개 함수입니다');
    }
    // 공개 인터페이스
    return {
        publicVariable: '공개 변수입니다',
        publicFunction: function() {
            console.log('이것은 공개 함수입니다');
            // 비공개 멤버에 접근
            console.log(privateVariable);
            privateFunction();
        }
    };
})();
// 사용 예:
console.log(Module.publicVariable); // 출력: '공개 변수입니다'
Module.publicFunction(); // 출력: '이것은 공개 함수입니다', '비공개입니다', '이것은 비공개 함수입니다'
```

## 설명:

<div class="content-ad"></div>

- 모듈 정의: 모듈은 IIFE(즉시 호출 함수 표현)를 사용하여 정의됩니다. 이는 즉시 실행되는 함수를 생성하여 모듈을 나타내는 객체를 반환합니다.
- 비공개 멤버: IIFE 내부에서 선언된 변수와 함수는 해당 함수에 로컬이므로 모듈 외부에서 접근할 수 없습니다.
- 공용 인터페이스: 반환된 객체(Module의 경우)에는 공개적으로 사용하기 위해 의도된 메서드와 속성에 대한 참조가 포함되어 있습니다. 이러한 것들은 응용프로그램의 다른 부분에서 액세스하고 사용할 수 있습니다.

# 모듈 패턴의 장점

- 캡슐화: 비공개 멤버는 감추어져 있으며 모듈의 공용 인터페이스를 통해서만 액세스할 수 있어 실수로 수정하거나 오용하는 위험을 줄입니다.
- 네임스페이싱: 관련된 코드를 단일 모듈 내에 캡슐화함으로써 전역 스코프 오염을 피하는 데 도움이 됩니다.
- 싱글톤 패턴: 이 패턴을 사용하여 생성된 모듈은 싱글톤으로 작동하며 응용프로그램 전체에서 하나의 인스턴스만 존재합니다.

# 모듈 패턴을 언제 사용해야 하는가

<div class="content-ad"></div>

모듈 패턴은 논리적으로 관련된 기능을 캡슐화하고

- 특정 변수 및 함수를 전역으로 노출하지 않음
- 응용 프로그램 전체에서 재사용할 수 있는 객체의 단일 인스턴스를 생성하는 경우에 특히 유용합니다.

자바스크립트에서 쇼핑 카트 기능을 관리하는 실제 예제를 고려해 보겠습니다. 모듈 패턴을 사용하면 카트에 있는 항목과 같은 개인 데이터를 캡슐화하고 카트와 상호 작용하기 위한 공개 API를 노출할 수 있습니다.

```js
const ShoppingCart = (() => {
    // Private variables
    const cartItems = [];

    // Private methods
    const addItem = (item) => {
        cartItems.push(item);
        console.log(`${item.name}가 장바구니에 추가되었습니다.`);
    };

    const removeItem = (index) => {
        if (index >= 0 && index < cartItems.length) {
            const removedItem = cartItems.splice(index, 1)[0];
            console.log(`${removedItem.name}가 장바구니에서 제거되었습니다.`);
        } else {
            console.log('잘못된 인덱스입니다.');
        }
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice.toFixed(2);
    };

    const displayCart = () => {
        console.log('장바구니 내역:');
        cartItems.forEach(item => {
            console.log(`${item.name} - $${item.price.toFixed(2)}`);
        });
        console.log(`총액: $${getTotalPrice()}`);
    };

    // 공용 API
    return {
        addItem,
        removeItem,
        displayCart
    };
})();

// 예제 사용법
const item1 = { name: '노트북', price: 999.99 };
const item2 = { name: '헤드폰', price: 149.99 };

ShoppingCart.addItem(item1); // 출력: "노트북이 장바구니에 추가되었습니다."
ShoppingCart.addItem(item2); // 출력: "헤드폰이 장바구니에 추가되었습니다."
ShoppingCart.displayCart();
// 출력:
// 장바구니 내역:
// 노트북 - $999.99
// 헤드폰 - $149.99
// 총액: $1149.98

ShoppingCart.removeItem(1); // 출력: "헤드폰이 장바구니에서 제거되었습니다."
ShoppingCart.displayCart();
// 출력:
// 장바구니 내역:
// 노트북 - $999.99
// 총액: $999.99
```

<div class="content-ad"></div>

이 예제에서:

- ShoppingCart은 즉시 호출되는 함수 표현식(IIFE)으로 정의되며, 개별 메서드(addItem, removeItem, displayCart)를 포함하는 객체를 반환합니다. 이 메서드들은 비공개 cartItems 배열과 다른 비공개 메서드(getTotalPrice)와 상호 작용할 수 있습니다.
- cartItems와 같은 비공개 변수는 IIFE의 클로저 내에 캡슐화되어 외부 모듈에서 접근할 수 없게 됩니다.
- addItem, removeItem, displayCart와 같은 공개 메서드는 장바구니 아이템을 조작하는 제어된 인터페이스를 제공합니다.
- 이 패턴은 쇼핑 카트의 상태와 작업을 모듈화되고 조직적인 방식으로 관리하여 외부 모듈에서의 카트 아이템의 직접 조작을 방지합니다.

이 접근 방식은 코드를 유지보수하기 쉽고 이해하기 쉽게 만들어줍니다. 캡슐화와 역할 분리 원칙을 준수합니다.

# 결론

<div class="content-ad"></div>

결론적으로, JavaScript의 모듈 패턴은 코드를 구조화하고 조직화하는 강력한 도구이며 캡슐화를 제공하고 명확하게 정의된 인터페이스를 가진 재사용 가능한 모듈을 생성할 수 있습니다. 클로저와 즉시 실행 함수 식을 활용하여 견고하고 유지보수가 쉬운 애플리케이션을 구축하는 데 도움이됩니다.

모듈 패턴을 효과적으로 이해하고 적용하면 더 깨끗하고 모듈식으로 유지 관리하고 확장하기 쉬운 코드베이스를 얻을 수 있습니다.

즐거운 코딩하세요!