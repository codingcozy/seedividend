---
title: "JavaScript로 정의되지 않은 객체에 속성을 자동으로 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HowtoAutomaticallyAddPropertiestoanObjectthatisUndefinedwithJavaScript_0.png"
date: 2024-06-23 13:08
ogImage: 
  url: /assets/img/2024-06-23-HowtoAutomaticallyAddPropertiestoanObjectthatisUndefinedwithJavaScript_0.png
tag: Tech
originalTitle: "How to Automatically Add Properties to an Object that is Undefined with JavaScript?"
link: "https://medium.com/@hohanga/how-to-automatically-add-properties-to-an-object-that-is-undefined-with-javascript-a1f1de28fa59"
isUpdated: true
---




<img src="/assets/img/2024-06-23-HowtoAutomaticallyAddPropertiestoanObjectthatisUndefinedwithJavaScript_0.png" />

가끔은 JavaScript로 정의되지 않은 객체에 속성을 자동으로 추가하고 싶을 때가 있습니다.

이 글에서는 JavaScript로 정의되지 않은 객체에 속성을 자동으로 추가하는 방법을 살펴보겠습니다.

# JavaScript로 정의되지 않은 객체에 속성을 자동으로 추가하기

<div class="content-ad"></div>

JavaScript에서 정의되지 않은 객체에 속성을 자동으로 추가하려면 hasOwnProperty 메서드를 사용하여 속성이 있는지 확인할 수 있습니다.

해당 속성이 있으면 true를 반환하고 그렇지 않으면 false를 반환합니다.

만약 false를 반환하면, 원하는 값으로 속성 값을 설정할 수 있습니다.

예를 들어, 다음과 같이 작성할 수 있습니다:

<div class="content-ad"></div>

```js
const test = {}
if (!test.hasOwnProperty('hello')) {
  test.hello = {};
}
test.hello.world = "Hello World!"
```

우리는 hello 속성을 추가하고 싶은 test 객체를 가지고 있어요.

!test.hasOwnProperty('hello')로 존재하지 않는지 확인해요.

만약 그게 사실이라면, test.hello를 빈 객체로 설정해요.

<div class="content-ad"></div>

그럼 test.hello.world를 "Hello World!"로 설정해 봅시다.

hasOwnProperty 메서드는 Object 생성자로부터 상속되므로 쉽게 재정의할 수 있습니다.

따라서 정확한 hasOwnProperty 메서드를 항상 호출하도록 하려면 다음과 같이 작성할 수 있습니다:

```js
const test = {}
if (!Object.prototype.hasOwnProperty.call(test, 'hello')) {
  test.hello = {};
}
test.hello.world = "Hello World!"
```

<div class="content-ad"></div>

Object.prototype.hasOwnProperty.call을 사용하여 test로 test.hasOwnProperty와 같은 작업을 수행할 수 있지만, 항상 Object 생성자에서 올바른 것을 호출한다는 것을 확인합니다.

# 결론

JavaScript로 정의되지 않은 객체에 자동으로 속성을 추가하려면 hasOwnProperty 메서드를 사용하여 속성이 있는지 확인할 수 있습니다.

해당 속성이 존재하면 true를 반환하고 그렇지 않으면 false를 반환합니다.

<div class="content-ad"></div>

False가 반환되면 속성 값을 원하는 값으로 설정할 수 있습니다.