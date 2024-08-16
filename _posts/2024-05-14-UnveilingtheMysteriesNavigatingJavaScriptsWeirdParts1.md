---
title: "미스테리를 밝히다 JavaScript의 이상한 부분 탐색하기  1"
description: ""
coverImage: "/assets/img/2024-05-14-UnveilingtheMysteriesNavigatingJavaScriptsWeirdParts1_0.png"
date: 2024-05-14 12:32
ogImage: 
  url: /assets/img/2024-05-14-UnveilingtheMysteriesNavigatingJavaScriptsWeirdParts1_0.png
tag: Tech
originalTitle: "Unveiling the Mysteries: Navigating JavaScript’s Weird Parts — 1"
link: "https://medium.com/@poulami.21ghosh/unveiling-the-mysteries-navigating-javascripts-weird-parts-1-79fa6792ece7"
isUpdated: true
---




![이미지](/assets/img/2024-05-14-UnveilingtheMysteriesNavigatingJavaScriptsWeirdParts1_0.png)

자바스크립트는 다양하고 동적인 언어로, 웹에 상호작용성과 기능을 추가하는 능력으로 웹을 채웁니다. 그러나 확장성과 인기 속에서 특정 측면은 "이상한 부분"으로 불릴 수 있습니다. 이것들은 개발자들을 종종 당혹케 하는 특이성과 기이함입니다. 특히 이 언어를 처음 사용하는 사람들에게 도움이 됩니다. 이러한 기이함을 이해하면 자바스크립트에 대한 깊은 이해를 가지게 되며 더 견고하고 효율적인 코드를 작성할 수 있는 도구가 됩니다. 이 흥미로운 이야기를 풀어내고 자바스크립트의 이상한 부분을 해소해봅시다.

# 형 강제 변환:

자바스크립트는 동적으로 타입이 지정되는 언어로, 변수는 모든 데이터 유형의 값을 보유할 수 있습니다. 이 유연성은 강력하지만, 유형 강제 변환으로 인해 예기치 않은 동작이 발생할 수 있습니다. 예를 들어, 덧셈 연산자(+)는 피연산자의 유형에 따라 다르게 작동합니다. 피연산자 중 하나가 문자열이면 문자열을 연결하고, 그렇지 않은 경우에는 덧셈을 수행합니다. 이러한 암묵적인 유형 변환을 이해하면 버그를 방지하고 코드 가독성을 향상시킬 수 있습니다.



```js
console.log(1 + "2"); // "12"
console.log(1 + 2);   // 3
```

형 변환이 일부 경우에 유용할 수 있지만, 잠재적인 문제점에 대해 알고 있어야 합니다.

```js
console.log(1<2<3); // true
console.log(3<2<1) ; // true 
// (이유: 3<2=false이므로 false<1이 되고, Number(false)=0 이므로, 0<1= true)
```

# 프로토타입 상속:



프로토타입 상속은 자바스크립트의 기본 개념 중 하나로, 객체가 다른 객체로부터 속성과 메서드를 상속하는 방식을 관리합니다. 자바나 C++과 같은 언어에서 볼 수 있는 고전적 상속과는 달리, 자바스크립트의 상속 모델은 프로토타입을 기반으로 하며 객체 지향 프로그래밍에 더 동적이고 유연한 접근법을 제공합니다.

프로토타입 이해하기:

자바스크립트에서 모든 객체는 프로토타입을 가집니다. 프로토타입은 단순히 다른 객체가 속성을 상속하는 객체입니다. 객체의 속성이나 메서드에 접근할 때, JavaScript는 먼저 해당 객체에서 직접 찾습니다. 찾지 못하면 프로토타입 체인을 따라 상위로 올라가 속성을 찾거나 체인의 끝에 도달할 때까지 계속합니다(프로토타입이 null일 때).

```js
const person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};

const employee = {
    position: 'Developer'
};

employee.__proto__ = person; // employee의 프로토타입을 person으로 설정

console.log(employee.fullName()); // "John Doe"
console.log(employee.position);   // "Developer"
```



위의 예시에서 직원은 원형(person)에서 fullName 메서드를 상속받습니다. 직원.fullName()이 호출되면 JavaScript는 직원에게 fullName 속성을 찾아보고, 찾지 못하면 원형 체인을 따라가 원형에 있는 fullName을 찾습니다.

생성자를 이용한 프로토타입 상속:

생성자와 프로토타입은 종종 함께 사용되어 JavaScript에서 상속을 구현하는 데 사용됩니다. 공유 속성과 메서드를 가진 객체를 만드는 템플릿으로 사용될 생성자 함수를 만들 수 있습니다.

```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.fullName = function() {
    return this.firstName + ' ' + this.lastName;
};

function Employee(firstName, lastName, position) {
    Person.call(this, firstName, lastName); // Person 생성자 호출
    this.position = position;
}

Employee.prototype = Object.create(Person.prototype); // Person의 프로토타입에서 상속
Employee.prototype.constructor = Employee; // 생성자 재설정

const johnDoe = new Employee('John', 'Doe', 'Developer');
console.log(johnDoe.fullName()); // "John Doe"
console.log(johnDoe.position);   // "Developer"
```



이 예시에서, Employee 생성자는 Person으로부터 속성과 메서드를 상속받기 위해 그 프로토타입을 Person.prototype의 인스턴스로 설정합니다.

Object.create() 메서드:

Object.create() 메서드는 지정된 프로토타입을 가진 객체를 생성하는 또 다른 방법을 제공합니다.

```js
const person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};

const employee = Object.create(person);
employee.position = 'Developer';

console.log(employee.fullName()); // "John Doe"
console.log(employee.position);   // "Developer"
```



# 스코핑과 클로저:

스코핑과 클로저를 이해하는 것은 깔끔하고 효율적인 JavaScript 코드를 작성하는 데 매우 중요합니다. JavaScript는 함수 수준의 스코프를 가지고 있어 변수들이 선언된 함수 내에서만 유효합니다. 반면에 클로저는 외부 함수의 실행이 완료된 후에도 해당 범위 변수에 대한 접근 권한을 유지할 수 있도록 합니다.

## 스코핑:

스코프란 변수가 선언되고 액세스되는 컨텍스트를 의미합니다. JavaScript에서는 전역 스코프와 지역 스코프 두 가지 주요 유형의 스코프가 있습니다.



글로벌 스코프: 어떤 함수 안에서도 선언되지 않은 변수들은 전역 스코프에 있게 되며 전체 스크립트 어디에서나 접근할 수 있어요.

```js
const globalVar = '나는 글로벌';

function foo() {
    console.log(globalVar); // "나는 글로벌"
}

foo();
```

로컬 스코프: 함수 안에서 선언된 변수들은 로컬 스코프에 있어서 해당 함수 내에서만 접근이 가능해요.

```js
function foo() {
    const localVar = '나는 로컬';
    console.log(localVar);
}

foo(); // "나는 로컬"
console.log(localVar); // 에러: localVar가 정의되지 않았어요
```



블록 범위: ES6에서 도입된 let 및 const를 사용하여 선언된 변수는 블록 범위로 지정되어 있습니다. 즉, 정의된 블록 내에서만 액세스할 수 있습니다.

```js
function foo() {
    if (true) {
        const localVar = '저는 블록 안에 있어요';
        console.log(localVar);
    }
    console.log(localVar); // 에러: localVar가 정의되지 않았습니다
}

foo();
```

## 클로저:

클로저란 함수와 해당 함수가 선언된 렉시컬 환경의 조합입니다. 이를 통해 함수는 외부 함수의 실행이 완료된 후에도 포함하는 범위의 변수에 액세스할 수 있습니다. 다시 말해, 클로저는 내부 함수에서 외부 함수의 범위에 액세스할 수 있게 해줍니다.



```js
function outer() {
    const outerVar = 'I am from the outside';
    
    function inner() {
        console.log(outerVar); // The inner function has access to outerVar
    }
    
    return inner;
}

const innerFunc = outer();
innerFunc(); // "I am from the outside"
```

이 예제에서 inner 함수는 outer 함수를 감싼 클로저를 형성하여 outerVar에 대한 액세스 권한을 유지합니다. outer 함수의 실행이 완료된 후에도 계속 사용할 수 있습니다.

클로저의 일부 사용 사례:

캡슐화: 클로저를 사용하여 비공개 변수를 캡슐화하고 모듈을 생성하여 구현 세부 정보를 숨기고 필요한 기능만 노출시킬 수 있습니다.



```js
function counter() {
    let count = 0;

    return {
        increment: function() {
            count++;
        },
        getCount: function() {
            return count;
        }
    };
}

const counterObj = counter();
counterObj.increment();
console.log(counterObj.getCount()); // 1
```

함수 팩토리: 클로저를 사용하면 주변 범위에 따라 특정 동작을 하는 다른 함수를 생성하는 함수를 만들 수 있습니다.

```js
function multiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

이벤트 핸들러: 클로저는 이벤트 핸들러에서 널리 사용되며, 이벤트의 컨텍스트와 관련된 변수에 계속 액세스할 수 있도록 합니다.



```js
function setupCounter() {
    let count = 0;
    document.getElementById('btn').addEventListener('click', function() {
        count++;
        console.log(count);
    });
}

setupCounter();
```

# 결론:

이 게시물에서는 JavaScript의 중요한 몇 가지 개념에 대해 다루고 소개했습니다. JavaScript의 이상한 부분들은 처음에는 어렵게 보일 수 있지만, 이를 마스터하는 것은 능숙한 JavaScript 개발자가 되는 데 필수적입니다. 타입 강제 변환, 프로토타입 상속, 스코핑, 클로저를 이해하여 더 예측 가능하고 효율적이며 유지보수 가능한 코드를 작성할 수 있습니다. JavaScript의 별난 점들을 받아들이고, 그것들은 더 이상 장애물이 아닌 코딩 여정에서 사용할 도구로 바뀝니다.

아래 댓글란에 피드백을 주시면 감사하겠습니다.




참고 자료:
1. [Understanding JavaScript](https://www.udemy.com/course/understand-javascript/)
   
2. [Mozilla Developer Network](https://developer.mozilla.org/)