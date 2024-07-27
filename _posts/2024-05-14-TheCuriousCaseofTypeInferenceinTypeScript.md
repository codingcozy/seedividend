---
title: "TypeScript에서 형 추론에 대한 신기한 사례"
description: ""
coverImage: "/assets/img/2024-05-14-TheCuriousCaseofTypeInferenceinTypeScript_0.png"
date: 2024-05-14 14:28
ogImage: 
  url: /assets/img/2024-05-14-TheCuriousCaseofTypeInferenceinTypeScript_0.png
tag: Tech
originalTitle: "The Curious Case of Type Inference in TypeScript"
link: "https://medium.com/gitconnected/the-curious-case-of-type-inference-in-typescript-65d269598494"
---


얼마 전에 사이드 프로젝트를 하고 있었어요. 많은 이벤트를 감지하는 특정 라이브러리를 사용했죠.

제 프로젝트에서도 같은 종류의 이벤트를 사용하고 싶어서 바퀴를 다시 발명하지 않으려고 했어요.

라이브러리 제작자들은 이벤트 리스너 함수의 오버로딩된 첫 번째 매개변수로 이벤트를 넣었어요, 여기처럼요:

```js
type OverloadedFunction = {
    (event: 'eventA'): void;
}
```



의도했던 것은 적절한 유형 정의를 가져오고 계속하는 데 단지 몇 초만 걸릴 줄 알았어요.

그러나 몇 초라는 시간은 분으로 늘어났죠. 더 놀라운 건, 반으로 눈 깜짝할 사이에 또 쿼터로 더 빨라졌어요. 반 시간이 흐른 후, 화면을 의심스럽게 바라보게 되었어요.

"어떻게 간단한 유형 추론이 이렇게 복잡할 수 있지?" 라고 생각했죠.

# 기본사항



TS v. 5.2.2에서 제시된 모든 예제를 테스트했어요.

제가 언급한 오버로드 함수는 아래와 비슷했습니다:

```js
type OverloadedFunction = {
    (event: 'eventA'): void;
    (event: 'eventB'): void;
    (event: 'eventC'): void;
    // ...
    (event: 'eventZ'): void;
}
```

간결함을 위해 추가 매개변수와 각각 다른 반환 유형은 제거했어요. 제 업무는 이벤트 종류를 추출하여 문자열 리터럴 유니언을 형성하는 것이었죠.



위의 예시에서는:

```js
type EventType = 'eventA' | 'eventB' | 'eventC' | /*...*/ | 'eventZ';
```

내가 먼저 떠오른 것은 Parameters`T` 타입 앨리어스를 사용하는 것이었다. 반환 타입에 경악했다.

```js
type NotEventType = Parameters<OverloadedFunction>[0];
// type NotEventType = "eventZ"
```



'eventZ'만 왜 나왔을까요?

![이미지](/assets/img/2024-05-14-TheCuriousCaseofTypeInferenceinTypeScript_0.png)

Parameters 타입 정의를 자세히 살펴봤습니다 (여기서는 조금 간단히 했습니다):

```js
type Parameters<T> = T extends (...args: infer R) => any ? R : never;
```



위의 내용은 너무 많은 매개변수를 추출한다고 생각했어요. 바로 첫 번째 매개변수만 직접 타겟팅할 수 있을 거라 생각해 시도해 봤는데 결과는 여전히 같았어요.

```js
type FirstParameter<T> = T extends (arg: infer R, ...args: never) => any
  ? R
  : never;

type NotEventType = FirstParameter<OverloadedFunction>;
// type NotEventType = "eventZ"
```

마지막 오버로딩된 매개변수 타입을 추출했기 때문에 오버로드된 함수 타입이 제대로 분배하지 않은 유니언 타입이라고 생각했습니다.

# 유니온 분배



가정해보세요. 우리가 유니언 타입 A를 가지고 있다고 해봅시다.

```js
type A = 1 | 2 | 3;
```

우리는 이 유니언에서 1을 제거하고 싶습니다. 다음과 같은 방법을 시도해 볼 수 있습니다.

```js
type AWithout1 = A extends 1 ? never : A;
// type AWithout1 = 1 | 2 | 3
```



놀라셨나요? TypeScript가 여기서 올바르게 동작한 것을 염두에 두세요. 위의 내용에서 A extends 1은 다음을 의미합니다:

A의 연합 타입 멤버는 숫자 리터럴 1을 확장합니까?

그리고 2가 1을 확장하지 않기 때문에, 답은 명백히 "아니요"입니다.

우리는 연합 분배를 필요로 합니다. 연합 타입에서 1을 제거하기 위해 다음 예제에서 그렇게 했습니다:



```js
type IsNotOne<T> = T extends 1 ? never : T;

type AWithout1 = IsNotOne<A>;
// type AWithout1 = 2 | 3
```

조건부 타입에 A를 전달하면, T extends 1 조건은 다음을 의미합니다:

현재 평가 중인 유니온 멤버가 숫자 리터럴 1을 확장하는가?

계산의 결과는 never | 2 | 3이지만, never는 TypeScript의 타입 유니언에서 중립적인 요소입니다. 만약 대수를 공부한 적이 있다면, 지금이 그것이 도움이 될 때입니다.



회원 배포에 대해 더 알고 싶다면 다른 이야기를 읽어보세요:

오버로드된 함수 유형이 연합임을 확신하고 문제를 해결할 수 있다고 믿고 유형을 분배하는 데 시간을 투자했습니다.

그리고 나는 그것이 연합이 아니었다는 것을 깨달았어요!

![이미지](/assets/img/2024-05-14-TheCuriousCaseofTypeInferenceinTypeScript_1.png)



# 재미없는 코딩

그 날 TypeScript에 대해 새로운 것을 배웠어요. 오버로드된 함수 타입이 어떻게 작동하는지 이해하고 싶어서 더 깊이 파고들었죠.

첫 번째 위대한 발견은 추론을 실험해볼 때였어요. 함수 타입이 어떻게 작성되었는지 한 글자 한 글자 따라 해보았더니, 아래 코드를 만들어냈어요:

```js
type OverloadedFunction = {
    (event: 'eventA'): void;
    (event: 'eventB'): void;
    (event: 'eventC'): void;
    // ...
    (event: 'eventZ'): void;
}

type FirstParameter<T> = T extends {
    (arg: infer A, ...args: never): any;
    (arg: infer B, ...args: never): any;
  }
    ? A | B 
    : never;

type NotEventType = FirstParameter<OverloadedFunction>;
// type NotEventType = "eventC" | "eventZ"
```



아주 원시적인 해결책을 찾았어요. 하지만 해결책이란 게 있었어요. 'FirstParameter`T`' 형식 뒤에 코드를 생성할 수 있었죠. 다만, 이벤트 종류의 수가 변경되면 형식의 정확성을 잃을 것 같았어요.

또한, 얼마나 많은 추론 매개변수를 필요로 하시나요?

이 해결책을 오버로드의 수를 모르는 다른 함수에 재사용할 수 있을까요? 저는 하나의 오버로드와 두 가지 추론으로 테스트를 시작했어요. 결과를 보고는 당황했지만요.

```js
type OverloadedFunction = {
    (event: 'eventA'): void;
}

type FirstParameter<T> = T extends {
    (arg: infer A, ...args: never): any;
    (arg: infer B, ...args: never): any;
  }
    ? A
    : never;

type NotEventType = FirstParameter<OverloadedFunction>;
// type NotEventType = "eventA"
```



FirstParameter`T`의 반환 유형은 A이므로 NotEventType은 이벤트A입니다. 그러나 B를 반환하면 NotEventType은 동일합니다! 더 실험해본 결과, 함수 오버로드에 대한 추론보다 더 많은 추론이 있는 경우, 전자는 항상 적절한 유형을 포함한다는 결론을 내렸습니다.

추론은 항상 아래에서 시작되며 다음 예시에서 명확히 나타납니다.

```js
type OverloadedFunction = {
    (event: 'eventA'): void;
    (event: 'eventB'): void;
}

type FirstParameter<T> = T extends {
    (arg: infer A, ...args: never): any;
    (arg: infer B, ...args: never): any;
    (arg: infer C, ...args: never): any;
    (arg: infer D, ...args: never): any;
  }
    ? A
    : never;

type NotEventType = FirstParameter<OverloadedFunction>;
```

여기서 D만 `eventB`를 포함하고 A, B, C는 `eventA`를 가리킨다는 것을 알 수 있습니다.



# 연구

결국, 나는 인터넷을 통해 나만의 연구를 진행했습니다. 다른 사람들과 같은 해결책에 도달한 것으로 밝혀졌습니다. TypeScript의 한계에 도달한 것으로 보입니다.

믿기 어려워서 TypeScript AST 뷰어를 실행시키고 오버로드가 있는 함수를 전달했습니다. 그 결과로 다음과 같은 추상 구문 트리를 반환받았습니다.

![이미지](/assets/img/2024-05-14-TheCuriousCaseofTypeInferenceinTypeScript_2.png)



AST가 올바르게 보였기 때문에 TS 컴파일러가 함수 오버로드 내에서 특정 추론을 지원하지 않았다고 가정했습니다.

# 해결책

모든 소프트웨어 개발자는 어떤 문제에 대해 여러 해결책을 찾아야 한다고 믿습니다. 제 경우, 아이디어를 아래에 나열했습니다. 노력이 필요한 양에 따라 순서를 매겼고, 각각에 대해 장단점이 있습니다.

## 문자열로서 이벤트 종류를 입력하기



모든 이벤트 종류는 문자열입니다. 하지만 그 역은 성립하지 않습니다. 이 해결책을 선택하면 유형 안정성을 희생하고 지능적인 코드 복잡성을 잃을 것이라고 판단했습니다. 다른 한편으로는 유형 확인을 충족시키기 위해 추가 리소스를 소비할 필요가 없을 것입니다.

적절한 테스트를 추가하면 이 해결책이 더욱 유효함을 입증할 것입니다.

맞습니다, 이것을 선택했습니다.

## 타입 추론을 사용하기



이 이야기에 언급된 대로, 이벤트 종류를 추론하기 위한 타입 별칭을 생성할 수 있습니다. 이러한 타입 별칭은 이벤트 종류가 변경될 때 다시 생성해야 합니다. 긍정적인 면으로는 라이브러리를 포크하거나 대체할 필요가 없다는 것입니다.

## 타입 생성하기

사용 가능한 타입 정의로부터 이벤트 종류를 추출하는 스크립트를 작성할 수 있습니다. 타입 추론과 마찬가지로 라이브러리를 업데이트할 때마다 스크립트를 실행해야 합니다. 다시 말해서, 이 종속성은 프로젝트에 유지됩니다.

## 라이브러리 포크하기



그들을 이기지 못하면 함께 하라.

이 속담은 소프트웨어 개발에서도 의미가 있어요. 특정 라이선스가 있는 오픈 소스 라이브러리를 포크하고 그에 맞게 변경할 수 있습니다. 저의 경우에는 모든 이벤트 종류를 유형 리터럴 열거형으로 수집하여 내보낼 거예요.

정기적으로 라이브러리의 새로운 버전이 있는지 확인하고 포크를 업데이트해야 해요.

다소 부드러운 대안은 라이브러리 유지 관리자와 변경 사항을 논의하는 것이에요.



## 라이브러리 변경하기

가끔은 다른 라이브러리로 변경하는 것이 합리적으로 들릴 수 있습니다. 적합한 TypeScript 지원이 없다면 그것이 당신이 다루기를 원하는 마지막 짚널이 될 수도 있습니다. 상업 프로젝트의 경우, 그러한 급격한 변화는 이해관계자들과 진지한 토론이 필요할 수 있습니다.

# 요약

프로그래밍 언어를 사용하여 현실을 모델링합니다. 모델은 정의상 불완전합니다. 컴파일러 팀이 더 중요한 기능에 집중하고 있기 때문에 어떤 패턴에 대한 지원이 부족할 수 있습니다. 우리는 언어의 기능을 이해하고 적절히 활용해야 합니다.



이것은 우리가 항상 기술을 지속적으로 개선해 나가야 한다는 것을 의미합니다. 시간이 지남에 따라 컴파일러가 개선되어 더 많은 패턴을 수용할 수 있게 됩니다. 예를 들어, TypeScript 4.9 버전이 나오기 전까지 변수가 두 가지 유형과 일치하도록 할 수 없었습니다.

제 이야기를 읽어 주셔서 감사합니다!

TypeScript로 고생하시는 것에 지쳤나요? 이 글을 읽어보세요: