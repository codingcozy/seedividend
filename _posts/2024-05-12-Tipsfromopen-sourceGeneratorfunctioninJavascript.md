---
title: "오픈 소스로부터 배운 JavaScript의 제너레이터 함수 팁"
description: ""
coverImage: "/assets/img/2024-05-12-Tipsfromopen-sourceGeneratorfunctioninJavascript_0.png"
date: 2024-05-12 21:10
ogImage: 
  url: /assets/img/2024-05-12-Tipsfromopen-sourceGeneratorfunctioninJavascript_0.png
tag: Tech
originalTitle: "Tips from open-source: Generator function in Javascript."
link: "https://medium.com/dev-genius/tips-from-open-source-generator-function-in-javascript-1093f9eabe47"
---


Next.js 소스 코드를 읽다가 *로 접두사가 붙은 함수 이름을 본 적이 있어요. 제 첫 생각은 "이거 Javascript에서 포인터인가?" 였어요. 구글 검색을 해보니 *로 접두사가 붙은 이 함수들은 제너레이터 함수라고 불린다는 걸 알았어요. 지금까지는 Javascript에서 제너레이터 함수에 대해 알지 못했어요.

Next.js 소스 코드에는 아래와 같이 클래스 내에서 정의된 제너레이터 함수가 있어요:

![이미지](/assets/img/2024-05-12-Tipsfromopen-sourceGeneratorfunctioninJavascript_0.png)

일반적으로 이런 제너레이터 함수를 클래스 바깥에서 정의할 때는 다음과 같은 구문을 사용해요:



```js
// 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
function* generator(i) {
  yield i;
  yield i + 10;
  yield i + 20;
}

const gen = generator(10);

console.log(gen.next().value);
// 예상 출력: 10
console.log(gen.next().value);
// 예상 출력: 20
console.log(gen.next().value);
```

# Keys() as a generator function

```js
public *keys(): IterableIterator<string> {
    for (const key of Object.keys(this.headers)) {
      const name = key.toLowerCase()
      yield name
    }
  }
```

이 코드 스니펫은 Next.js 소스 코드의 header.ts에서 가져온 것입니다. "keys() 함수가 제너레이터 함수인 이유는 무엇일까?" 라는 질문을 내 자신에게 했습니다.



저는 ChatGPT에 이 코드를 붙여 넣었더니 "메모리 효율성"이라는 용어를 소개해 주었어요. 잠깐만, 어떻게 그런 걸까요?

아래 코드를 복사해서 브라우저에 붙여넣어 보세요.

```js
const exampleObject = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// 제너레이터 함수를 사용하여 keys() 메서드 구현하기
exampleObject.keys = function* () {
  for (const key in this) {
    yield key;
  }
};

// 이제 exampleObject의 키를 for...of 루프를 사용하여 반복할 수 있습니다.
for (const key of exampleObject.keys()) {
  console.log(key);
}

// 결과:
firstName
VM247:16 lastName
VM247:16 age
VM247:16 keys
```

하지만 keys()를 출력하려고 하면 다음과 같은 결과가 나타납니다:



<img src="/assets/img/2024-05-12-Tipsfromopen-sourceGeneratorfunctioninJavascript_1.png" />

한 번에 모든 키를 생성하고 배열에 저장하는 대신, 제너레이터 함수는 필요할 때 키를 즉석에서 생성합니다.

# 더 많은 읽을거리 링크:

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*
- https://stackoverflow.com/questions/47027191/do-suspended-generator-functions-have-performance-costs



# 결론:

`function* keys()`은 포인터가 아닌 제너레이터 함수임을 알게 되었습니다. 원하는 시점에 키, 엔트리, 값 등을 생성할 때 사용합니다.

제너레이터 함수는 실행 시간을 소비하지 않으며 사용될 때까지 메모리에 남아 있습니다.