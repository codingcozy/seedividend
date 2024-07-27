---
title: "자바스크립트 - Strict Mode는 어떻게 작동하나요"
description: ""
coverImage: "/assets/img/2024-05-14-JavaScriptStrictModeHowDoesItWork_0.png"
date: 2024-05-14 14:46
ogImage: 
  url: /assets/img/2024-05-14-JavaScriptStrictModeHowDoesItWork_0.png
tag: Tech
originalTitle: "JavaScript—'Strict Mode' How Does It Work?"
link: "https://medium.com/javascript-in-plain-english/javascript-strict-mode-how-does-it-work-4aba8726ed6b"
---


![이미지](/assets/img/2024-05-14-JavaScriptStrictModeHowDoesItWork_0.png)

과연 엄격한 선생님이나 멘토를 만나본 적이 있나요? 그러나 결국 더 나은 학생이나 전문가가 되도록 도와준 적이 있습니까?
자바스크립트 세계에서 "use strict"는 비슷한 역할을 합니다. 이는 최고의 실천법을 강요하고 더 깔끔하고 견고한 코드를 작성하는 데 도움을 줍니다.

## 엄격 모드의 기원

1990년대 초에 처음으로 등장한 이후로 자바스크립트는 많은 발전을 이루었습니다. 언어가 발전함에 따라 그 동안 유용했던 특정 기능 및 동작이 혼동을 일으키고 잠재적 버그의 원인이 되기도 했습니다. 이러한 문제를 해결하기 위해 ECMAScript 5 (ES5) 명세에서는 엄격 모드(strict mode)를 소개했습니다. 이로써 자바스크립트의 제한된 변형에 참여할 수 있는 방법을 제공했습니다.



Strict 모드는 언어의 완전히 별개의 버전이 아닙니다. 오히려 언어의 일부 규칙을 자발적으로 준수하여 더욱 문제가 되는 기능과 동작을 제거하는 방법입니다. Strict 모드를 선택함으로써 JavaScript에게 "약간 더 엄격해지길 바래. 날 마구 코딩 실수로 그냥 넘어가게 하지 말아줘"라고 말하는 것과 같습니다.

## Strict 모드 활성화

Strict 모드를 활성화하는 것은 단순합니다. JavaScript 파일이나 함수의 시작 부분에 다음 줄을 추가하는 것으로 가능합니다:

```js
"use strict";
```



파일 상단에 이 줄을 포함하면 전체 스크립트에 strict 모드가 적용됩니다. 또는 함수 몸체의 시작 부분에 "use strict" 문을 포함하여 특정 함수에 대해 strict 모드를 활성화할 수도 있습니다.

```js
function strictFunction() {
  "use strict";
  // Strict 모드 코드를 여기에 입력합니다.
}
```

ES6 모듈 및 클래스에서는 strict 모드가 자동으로 활성화되며 비활성화할 수 없다는 점을 유의해야 합니다.

## Strict 모드의 장점



이제 엄격 모드를 활성화하는 방법을 알았으니, 이 모드가 제공하는 일부 이점을 살펴보겠습니다:

- 일반적인 코딩 실수 잡기
엄격 모드는 문제가 될 수 있는 또는 에러를 일으킬 수 있는 특정 코딩 패턴에 대해 예외를 던집니다. 예를 들어, 비엄격 모드에서는 변수 이름을 잘못 입력하거나 선언을 잊어서 전역 변수를 실수로 만들 수 있습니다. 엄격 모드는 이를 방지하기 위해 에러를 던져서 변수를 정확하게 선언하도록 강요합니다.

```js
"use strict";
x = 3.14; // 이것은 엄격 모드에서 에러를 발생시킵니다
```

안전하지 않은 동작 방지
엄격 모드는 예상치 못한 동작이나 보안 취약점으로 이어질 수 있는 일부 동작을 금지합니다. 예를 들어, 변수나 객체 속성을 삭제함으로써 실수로 전역 변수를 만드는 것을 방지합니다.



```js
"use strict";
delete Object.prototype; // 이것은 엄격한 모드에서 오류를 발생시킵니다.
```

혼란스러운 기능 제거하기
JavaScript의 일부 기능들은 언어의 최상의 가이드가 완전히 확립되기 전에 도입되었습니다. 엄격 모드(strict mode)는 이러한 혼란스러운 기능들을 없애거나 수정하여 더 나은 코딩 관행을 촉진합니다. 예를 들어, 비 엄격 모드에서는 with 문을 사용할 수 있지만, 이는 예상치 못한 동작 및 성능 문제로 이어질 수 있습니다. 엄격 모드는 with 문의 사용을 금지합니다.

```js
"use strict";
with (Math) { // 이것은 엄격한 모드에서 오류를 발생시킵니다.
  console.log(PI);
}
```

더 나은 매개변수 처리 강화하기
비 엄격 모드에서는 함수 내에 중복된 매개변수 이름을 가질 수 있으나, 이는 혼란과 버그를 초래할 수 있습니다. 엄격 모드는 중복된 매개변수 이름을 갖는 함수를 선언하려고 시도하면 오류를 발생시킵니다.



```js
"use strict";
function duplicateParams(a, a) { // 이것은 엄격한 모드에서 오류를 발생시킵니다
  // ...
}
```

실수로 전역 변수를 만드는 것을 방지하기
JavaScript에서 버그가 가장 일반적으로 발생하는 소스 중 하나는 실수로 전역 변수를 만드는 것입니다. 엄격한 모드는 미선언 변수에 값을 할당하려고 할 때 오류를 던져 이를 방지합니다.

```js
"use strict";
myGlobal = 42; // 이것은 엄격한 모드에서 오류를 발생시킵니다
```

변수 사용을 단순화하기
엄격한 모드가 아닌 경우, arguments 객체는 약간 특이한 동작을 합니다. 함수의 명명된 매개변수로 별칭을 지정하고 그 값을 덮어쓸 수 있습니다. 엄격한 모드는 이러한 혼동스러운 동작을 제거하여 arguments 객체를 다루기 쉽게 만듭니다.



```js
// 비 엄격 모드
function nonStrict() {
  var obj = {
    prop: 1
  };
  
  // 존재하지 않는 속성에 값 할당하기
  obj.prop2 = 2;
  
  // 선언되지 않은 변수에 접근하기 (오류가 발생하지 않음)
  x = 10;
  
  return obj;
}

// 엄격 모드
function strict() {
  "use strict";
  var obj = {
    prop: 1
  };
  
  // 존재하지 않는 속성에 값 할당 시도 (오류 발생)
  obj.prop2 = 2; // 엄격 모드에서 오류 발생
  
  // 선언되지 않은 변수에 접근 (오류 발생)
  // x = 10; // 이 줄을 주석 해제하면 엄격 모드에서 오류가 발생합니다.
  
  return obj;
}

console.log(nonStrict());
console.log(strict());
```

## 결론

엄격 모드는 처음에는 엄격한 선생님처럼 보일 수 있지만, 결국 더 나은 JavaScript 개발자가 되도록 돕는 역할을 합니다. 엄격 모드를 사용하면 일반적인 실수를 미리 잡을 수 있습니다.

물론, 엄격 모드가 모든 문제를 해결해주는 마법의 해결책은 아닙니다.



# 친절한 어조로 번역한 내용 🚀

In Plain English 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠로 고생하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- 더 많은 콘텐츠: PlainEnglish.io