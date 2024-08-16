---
title: "문제 해결 WTF   Element가 암시적으로 any 타입을 가지고 있습니다 왜냐하면 string 타입의 표현식을 사용하여 WTF  타입에 색인을 걸 수 없기 때문입니다"
description: ""
coverImage: "/assets/img/2024-05-13-ElementimplicitlyhasananytypebecauseexpressionoftypestringcantbeusedtoindextypeWTF_0.png"
date: 2024-05-13 00:16
ogImage: 
  url: /assets/img/2024-05-13-ElementimplicitlyhasananytypebecauseexpressionoftypestringcantbeusedtoindextypeWTF_0.png
tag: Tech
originalTitle: "Element implicitly has an ‘any’ type because expression of type ‘string’ can’t be used to index type WTF ???"
link: "https://medium.com/@borzifrancesco/element-implicitly-has-an-any-type-because-expression-of-type-string-can-t-be-used-to-index-051bf439b7a9"
isUpdated: true
---




만약 TypeScript를 사용해 보셨다면, 다음과 같은 컴파일 에러를 만날 기회가 많을 것입니다:

만약 저와 같이, 왜 ... 음 ... 다른 누군가의 코드가 그런 식으로 에러가 발생한 이유를 전혀 모를 때가 있었다면, 이 기사는 typing 시스템에서 무슨 일이 벌어지고 있는지에 대해 더 잘 이해하도록 도와줄 수 있습니다.

# JavaScript는 duck-typed입니다

![error](/assets/img/2024-05-13-ElementimplicitlyhasananytypebecauseexpressionoftypestringcantbeusedtoindextypeWTF_0.png)



자바스크립트는 덕 타이핑을 사용하기 때문에, 함수에 모든 올바른 속성을 갖춘 값을 전달하면 값의 출처가 어디인지에 상관없이 작동합니다.

TypeScript는 구조적 유형 시스템을 사용하여 이를 처리하는데, 이는 타입 체커가 유형의 속성만을 비교할 때만 신경 쓴다는 것을 의미합니다. 때로는 예상치 못한 동작으로 이어질 수 있습니다.

# TypeScript 구조적 유형 모델

다음 인터페이스와 함수를 고려해보세요:



```js
인터페이스 Person {
  firstName: string;
  lastName: string;
}

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}
```

이제 다른 인터페이스를 만들어 봅시다:

```js
인터페이스 계정 {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
```

만약 Person 대신에 Account를 getFullName() 함수에 전달하려고 하면 어떻게 될까요?



```js
const francesco: 계정 = { id: 123, email: 'borzifrancesco@gmail.com', firstName: 'Francesco', lastName: 'Borzì' };

const result = getFullName(francesco);
```

놀랍게도… 이건 오류가 발생하지 않아요!

getFullName() 함수는 firstName과 lastName 속성을 가진 typeAccount 입력을 받습니다.

다시 말해, 함수는 구조상 적절한 속성을 가진 모든 객체를 허용할 거예요 (이것이 구조화된 타이핑이라 불리는 이유에요).



하지만... 사물이 다른 속성을 가지고 있어도 관심이 없습니다.

## 구조적 타이핑의 결과

함수를 정의할 때 항상 선언된 속성만 가지고 호출된다고 가정하는 것이 유혹적일 수 있습니다. 이것은 "봉인된" 유형이라고 불릴 수 있지만 TypeScript에서는 그렇지 않습니다.

이를 이해하기 위해 새로운 시나리오를 고려해보십시오: 사용자가 서로 다른 색상의 보석을 모으는 게임을 구현 중이라고 상상해보겠습니다:



```js
인터페이스 GemCollection {
  blueCount: number;
  greenCount: number;
  redCount: number;
  yellowCount: number;
  // purpleCount: number; // 나중에 구현 예정
}
```

이제 GemCollection을 입력으로 받아 총 보석 개수를 반환하는 함수를 구현해야 합니다. 나중에 새로운 보라색이 추가될 것을 알고 있으므로 다음과 같이 함수를 유연하게 만드는 것이 좋다고 생각합니다:

```js
function getTotalGemsCount(gemCollection: GemCollection): number {
  let totalGemsCount = 0;

  for (const key of Object.keys(gemCollection)) {
    totalGemsCount += gemCollection[key];
  }

  return totalGemsCount;
}
```

논리적으로는 이해가 되고 잘 작동할 것으로 기대하지만 타입 체커는 gemCollection[key]에서 에러를 발생시킬 것입니다:




![Issue Screenshot](/assets/img/2024-05-13-ElementimplicitlyhasananytypebecauseexpressionoftypestringcantbeusedtoindextypeWTF_1.png)

이 문제는, 예상했던 것과는 다르게, 타입 검사기가 gemCollection 입력이 GemCollection 인터페이스에서 지정된 속성을 최소한 가지고 있다는 것을 보장한다는 것입니다. 그러나 이는 추가 속성이 없음을 보장하지는 않습니다.

우리의 함수는 다음과 같이 다시 작성되어야 합니다:

```js
function getTotalGemsCount(gemCollection: GemCollection): number {
  return gemCollection.blueCount
    + gemCollection.greenCount
    + gemCollection.redCount
    + gemCollection.yellowCount;
}
```



그리고 우리는 게임에 자주색이 구현되어야 할 때에는 수동으로 gemCollection.purpleCount를 추가해주어야 합니다.

# 구조적 타이핑의 장점

구조적 타이핑은 잠재적인 예상치 못한 행동 때문에 주의해야 하는 것만이 아닙니다. 이것은 우리에게 유연성을 제공하는 등 여러 이점을 줄 수도 있습니다.

![이미지](/assets/img/2024-05-13-ElementimplicitlyhasananytypebecauseexpressionoftypestringcantbeusedtoindextypeWTF_2.png)



이제 우리의 보석 수집 게임에서는 특정 사용자가 수집한 보석을 반환하는 API를 쿼리해야 합니다. 어쩌면 우리는 외부 라이브러리를 사용하여 특별한 HTTP 클라이언트인 SuperHttpClient를 제공하는 이유가 있습니다.

또한 호출하는 API 엔드포인트는 사용자가 존재하지 않거나 지금까지 어떤 보석도 수집하지 않은 경우에는 GemCollection 객체 또는 undefined를 반환한다고 가정합시다. 그래서 우리는 getGemsCollection() 함수를 다음과 같이 구현합니다:

```js
import { SuperHttpClient } from '@some-library/http-client';

function getGemsCollection(httpClient: SuperHttpClient, userId: number): GemCollection {
  const gemsCollection = httpClient.get(`https://game.gems.org/users/${userId}/gems`) as GemCollection | undefined;

  if (gemsCollection) {
    return gemsCollection;
  }

  return {
    blueCount: 0,
    greenCount: 0,
    redCount: 0,
    yellowCount: 0,
  };
}
```

예를 들어, 이제 위의 함수에 대한 단위 테스트를 작성하려면 SuperHttpClient의 모의(mock)를 제공해야 합니다. 이겢은 가끔 까다로울 수 있는데, 구조적 타입화를 활용하고 함수에 더 유연한 정의를 제공할 수 있는 방법이 있습니다:



```js
인터페이스 HttpClient {
  get: (query: string) => unknown;
}

function getGemsCollection(httpClient: HttpClient, userId: number): GemCollection {
  // 구현 내용은 이전과 동일합니다
}
```

저희는 HttpClient인터페이스를 정의했는데, 이는 getGemsCollection 함수에서 필요한 최소한의 것들을 포함한 새로운 추상화입니다. 이는 우리가 SuperHttpClient 타입의 객체를 전달할 수 있기 때문에 제품 환경에서 잘 작동할 것입니다. SuperHttpClient는 필요한 get 속성을 가지고 있기 때문입니다.

또한 이것은SuperHttpClient를위한 목 라이브러리가 필요하지 않고 해당 함수를 단위 테스트할 수 있게 해 줄 것입니다. 우리의 단위 테스트는 다음과 같이 수행될 수 있습니다:

```js
describe('getGemsCollection', () => {
  it('지정된 사용자에 대해 사용 가능한 보석 컬렉션을 반환해야합니다', () => {
    // 스텁 보석 컬렉션을 준비합니다
    const testCollection: GemCollection = {
      blueCount: 2,
      greenCount: 4,
      redCount: 1,
      yellowCount: 7,
    };
    // 스텁 HttpClient를 준비하고 스텁 보석 컬렉션을 반환합니다
    const testHttpClientWithGems = {
      get: (_url: string) => testCollection,
    };

    // getGemsCollection이 스텁 보석 컬렉션을 반환하는지 확인합니다
    expect(getGemsCollection(testHttpClientWithGems, 10)).toEqual(testCollection);
  });

  it('지정된 사용자에 대해 사용할 수 없는 경우 새로운 빈 보석 컬렉션을 반환해야합니다', () => {
    // 아무것도 반환하지 않는 스텁 HttpClient를 준비합니다
    const testHttpClientWithoutGems = {
      get: (_url: string) => undefined,
    };

    // getGemsCollection이 새로운 빈 보석 컬렉션을 반환하는지 확인합니다
    expect(getGemsCollection(testHttpClientWithoutGems, 10)).toEqual({
      blueCount: 0,
      greenCount: 0,
      redCount: 0,
      yellowCount: 0,
    });
  });
});
```



새 HttpClient 추상화 덕분에 로직과 유닛 테스트를 써드 파티 라이브러리에서 제공되는 HTTP 클라이언트 구현으로부터 분리할 수 있게 되었어요.

팁: 위 구현 및 유닛 테스트를 심플하게 유지하여 Structural Typing의 잠재력을 보여주었어요. 실제 시나리오에서는 다르게 처리할 부분이 여러 가지 있을 거예요. 위 코드는 주로 학습용이라고 생각해주세요.

# 결론

- 자바스크립트는 덕 타이핑을 사용합니다: 개체가 할 수 있는 일은 해당 메서드 또는 속성이 있는지에 달려있고, 특정 유형에 의존하지 않아요;
- 이러한 동적 특성을 관리하기 위해 TypeScript는 Structural Typing을 사용하며, 개발자는 그 작동 방식을 이해해야 해요;
- Structural Typing은 예상치 못한 동작이 발생할 수 있음에 주의해야 해요;
- Structural Typing은 더 큰 유연성을 제공합니다. 개발자는 이를 활용하여 새로운 추상화를 만들어 관심사 분리를 장려하고 전체 코드 아키텍처를 개선할 수 있어요.



## 참고 사항

Dan Vanderkam이 쓴 Effective TypeScript 책에서 영감을 받았습니다.