---
title: "자바스크립트에서의 Call, Apply 및 Bind 함수들 - 깊게 들어가보기"
description: ""
coverImage: "/assets/img/2024-05-15-CallApplyandBindFunctionsinJavascriptDeepDive_0.png"
date: 2024-05-15 10:12
ogImage: 
  url: /assets/img/2024-05-15-CallApplyandBindFunctionsinJavascriptDeepDive_0.png
tag: Tech
originalTitle: "Call, Apply and Bind Functions in Javascript — Deep Dive"
link: "https://medium.com/@hklohani/call-apply-and-bind-functions-in-javascript-deep-dive-c768a97099b2"
isUpdated: true
---




이 게시물에서는 JavaScript에서 호출, 적용 및 바인드 함수의 개념을 더 깊게 탐구하여 혼란을 해소하기 위해 노력할 것입니다. 우리는 이러한 함수를 포괄적인 예제를 통해 탐구하여 명확한 이해를 제공할 것입니다.

# 차이점

- call()은 지정된 this 값과 개별 인수로 함수를 호출합니다.
- apply()은 배열로 제공된 인수와 함께 지정된 this 값으로 함수를 호출합니다. 이것은 전달된 인수를 제외하고는 call() 함수와 유사합니다.
- bind()는 지정된 this 값과 초기 인수를 가진 새로운 함수를 반환하여 나중에 호출할 수 있도록 합니다.

JavaScript의 세 가지 함수 각각에 대해 더 자세히 살펴보고 JavaScript의 미묘한 차이를 경험하여 더 나은 이해를 얻어봅시다.



# 더 깊게 파보기

실제 시나리오에서 두 명의 개인, person1과 person2를 고려해보겠습니다. 각각 JavaScript 객체로 표현되며 이름과 나이와 같은 속성을 갖습니다. introduce() 함수를 사용하면 call() 메서드를 사용하여 각 객체 컨텍스트로 함수를 호출하여 개인 속성을 기반으로 한 개인화된 소개를 할 수 있습니다.

```js
// person1 객체 정의
const person1 = {
    name: '히만슈',
    age: 25
};

// person2 객체 정의
const person2 = {
    name: '알록',
    age: 35
};

// 소개 함수
function introduce(state, city) {
    console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야. ${state}, ${city}에 사는 중이야`);
}

// person1 소개
introduce.call(person1, '서벵갈', '콜카타');

// person2 소개
introduce.call(person2, '자르크핸드', '란치');
```

이 예제에서:



- 서로 다른 이름과 나이를 가진 두 person 객체인 person1과 person2를 정의합니다.
- this 컨텍스트의 속성을 사용하여 메시지를 출력하는 introduce() 함수가 있습니다.
- call()을 사용하여 각 person 객체를 this 컨텍스트로 사용하여 introduce() 함수를 호출합니다. 이를 통해 각 person을 적절한 이름과 나이로 개별적으로 소개할 수 있습니다.

person1과 person2의 같은 시나리오를 살펴봅시다

```js
// Define person1 object
const person1 = {
    name: 'Himanshu',
    age: 25
};

// Define person2 object
const person2 = {
    name: 'Alok',
    age: 35
};

// Introduce function
function introduce(state, city) {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old. I live in ${state}, ${city}`);
}

// Introduce person1
introduce.apply(person1, ['West Bengal', 'Kolkata']);

// Introduce person2
introduce.apply(person2, ['Jharkhand', 'Ranchi']);
```

이 예시에서:



- 동일한 person1, person2 객체를 사용하여 함수를 소개합니다.
- person1과 person2 객체 컨텍스트 및 상태와 도시를 포함하는 인수 배열을 전달하여 각 사람을 개별적으로 소개하기 위해 apply()를 사용합니다.

참고: call과 apply에서 어떻게 인수가 전달되는지 살펴보세요. 이 두 가지 사이에 차이가 있습니다.

```js
// person1 객체 정의
const person1 = {
    name: '히만수',
    age: 25
};

// person2 객체 정의
const person2 = {
    name: '알록',
    age: 35
};

// 소개 함수
function introduce(state, city) {
    console.log(`안녕, 저는 ${this.name}이고 ${this.age}살 입니다. 저는 ${state}, ${city}에 살고 있어요.`);
}

// introduce 함수를 person1에 바인딩
const introducePerson1 = introduce.bind(person1, '서부 벵갈', '콜카타');

// introduce 함수를 person2에 바인딩
const introducePerson2 = introduce.bind(person2, '자르크핸드', '란치');

// person1 소개
introducePerson1();

// person2 소개
introducePerson2();
```

이 예시에서:



- 동일한 person1과 person2 객체를 사용하고 함수를 소개했습니다.
- bind()를 사용하여 this를 각각 person1과 person2에 영구적으로 바인딩하고 state 및 city 인수를 미리 지정한 introducePerson1 및 introducePerson2 새 함수를 만듭니다.
- 그런 다음 introducePerson1() 및 introducePerson2()를 호출하여 각 인물을 해당하는 state 및 city와 함께 소개하여 나중에 미리 지정된 컨텍스트와 인수로 이러한 소개를 나중에 호출할 수 있는 능력을 보여주었습니다.

# bind()에 대해 더 알아보기

더 깊이 이해하고 흥미를 느낄 수 있는 몇 가지 고급 예제로 bind()를 자세히 살펴보겠습니다.

```js
const person = {
  age: 42,
  getDetails: function() {
    return this.age;
  }
};

const unboundGetDetails = person.getDetails;
console.log(unboundGetDetails()); // 함수는 window 객체인 전역 범위에서 호출됩니다.
// 예상 출력: undefined
```



여기서 explicit context없이 unboundGetDetails()가 호출됩니다. 결과적으로 getDetails 함수 내에서 this는 기본적으로 전역 객체(window)를 참조합니다. 전역 객체에 age가 정의되어 있지 않기 때문에, this.age는 undefined로 평가되어 결과가 undefined로 표시됩니다.

이를 해결하고 getDetails 함수 내에서 this가 person 객체를 참조하도록 하려면 bind() 메소드를 사용합니다:

```js
const boundGetDetails = unboundGetDetails.bind(person);
console.log(boundGetDetails());
// 예상 출력: 42
```

# 팁:



만약 person.getDetails()가 42를 반환하고 unboundGetDetails()가 정의되지 않았다는 이유에 대해 궁금해하고 있다면, 혼란을 해소해보겠습니다.

제공된 코드 스니펫에서 person.getDetails()와 unboundGetDetails() 간의 출력 차이는 this 키워드가 처리되는 방식 때문입니다.

1. person.getDetails():

여기서 getDetails() 메소드는 person 객체에 직접 호출됩니다. 메소드가 점 표기법 (object.method())을 사용하여 호출될 때, 마침표 왼쪽의 객체가 메소드 내에서 컨텍스트(this)로 설정됩니다. 따라서 getDetails() 내부의 this.age는 person.age를 가리키며, 이 값은 42입니다.



2. unboundGetDetails():

이 경우 getDetails() 메서드는 어떤 컨텍스트 없이 unboundGetDetails 변수에 할당됩니다. 이와 같이 메서드가 변수에 할당되면 해당 메서드는 원래의 컨텍스트를 잃게 됩니다. 따라서 unboundGetDetails()가 호출될 때 getDetails() 내부의 this.age는 더 이상 person.age를 참조하지 않습니다. 대신에 전역 객체 (또는 엄격 모드에서는 정의되지 않음)로 기본 설정되어 age가 정의되지 않은 곳으로 인식됩니다. 따라서 출력은 undefined가 됩니다.

읽어 주셔서 감사합니다! 본 게시물이 도움이 되었다면 다른 사람들과 함께 공유해 주세요. 더 유익한 콘텐츠를 기대해 주세요!