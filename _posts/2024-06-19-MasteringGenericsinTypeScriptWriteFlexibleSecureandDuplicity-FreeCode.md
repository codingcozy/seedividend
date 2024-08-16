---
title: "타입스크립트에서 제네릭 마스터하기 유연하고 안전하며 중복이 없는 코드 작성"
description: ""
coverImage: "/assets/img/2024-06-19-MasteringGenericsinTypeScriptWriteFlexibleSecureandDuplicity-FreeCode_0.png"
date: 2024-06-19 22:37
ogImage: 
  url: /assets/img/2024-06-19-MasteringGenericsinTypeScriptWriteFlexibleSecureandDuplicity-FreeCode_0.png
tag: Tech
originalTitle: "Mastering Generics in TypeScript: Write Flexible, Secure, and Duplicity-Free Code"
link: "https://medium.com/@felipefreitasa/mastering-generics-in-typescript-write-flexible-secure-and-duplicity-free-code-b3027e20c108"
isUpdated: true
---




![이미지](/assets/img/2024-06-19-MasteringGenericsinTypeScriptWriteFlexibleSecureandDuplicity-FreeCode_0.png)

## 소개

TypeScript의 제네릭은 소프트웨어의 견고성과 확장성을 향상시키는 뿐만 아니라 any를 대체함으로써 유형 정확성을 향상시킵니다. 이 개념은 TypeScript에만 한정되지 않고 Swift, Java, C#, C++ 등 다른 프로그래밍 언어에서도 널리 채택되었습니다.

## 제네릭 미사용 방법 대 제네릭 사용 방법

<div class="content-ad"></div>

```js
function logInformations<T>(infos: T): T {
  return infos;
}

logInformations<number>(1234);
logInformations<string[]>(['React Native', 'TypeScript']);
```

<div class="content-ad"></div>

제네릭을 사용하면 logInformations 메서드를 이제 모든 데이터 유형과 함께 사용할 수 있어 코드 중복을 피하고 유연성을 제공할 수 있습니다. 이는 개발을 간소화할 뿐만 아니라 더 견고하고 확장 가능한 코드를 보장하여 유형 정확성을 높이는 장점이 있습니다.

또 다른 흥미로운 특징은 제네릭의 유추 타입(type inference)입니다. TypeScript 컴파일러에서 수행되며, 일반 함수를 호출할 때 유형 명세가 선택 사항이 될 수 있도록 합니다:

```js
logInformations(1234)
logInformations(['React Native', 'TypeScript'])
```

이 과정은 컴파일러가 자동으로 처리하여 유형 명세가 선택 사항이 됩니다.

<div class="content-ad"></div>

## 명명 규칙

TypeScript에서 제네릭을 사용할 때, 일반적으로 T를 제네릭 유형 매개변수로 사용하는 것이 일반적입니다. 그러나 중요한 점은 T가 단지 관습이라는 것이며, 코드의 문맥에 맞는 의미있는 이름으로 대체할 수 있다는 것입니다. 예를 들어, 항목 목록을 다룰 때 T 대신 Item을 사용하면 코드 가독성을 높일 수 있습니다.

## 제약 조건

제약 조건은 사용되는 제네릭 유형에 제약 조건을 부여하여 특정 규칙이나 인터페이스를 준수하도록 하는 제네릭의 기능입니다.

<div class="content-ad"></div>

```js
인터페이스 ExtraInformations {
  createdAt: string;
}

function logInformations<T extends ExtraInformations>(infos: T): T {
  return infos;
}
```

따라서 logInformations 메서드에 전달된 제네릭 타입은 어떤 타입이든 될 수 있지만, 반드시 string 타입의 createdAt 속성을 가져야 합니다.

## 결론

TypeScript의 제네릭은 더 유연하고 안전한 코드를 작성하는 데 필수적이며, any를 사용한 적 less robust한 방식을 대체하고 불필요한 코드 중복을 제거합니다. 타입을 추론하고 제약을 부과할 수 있는 기능을 통해, 제네릭은 개발을 단순화하고 타입의 정확성을 크게 향상시켜 코드를 확장 가능하고 유지보수하기 쉽게 만듭니다.


<div class="content-ad"></div>

소셜 미디어에서 나를 팔로우해 주세요: LinkedIn | GitHub