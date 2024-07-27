---
title: "TypeScript와 함께 작업할 때 정직이 최선의 정책인 이유  거짓말의 대가"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_0.png"
date: 2024-07-02 21:49
ogImage:
  url: /TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_0.png
tag: Tech
originalTitle: "The cost of a lie — why honesty is the best policy when working with TypeScript"
link: "https://medium.com/swinginc/the-cost-of-a-lie-5d9814fe2853"
---

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_0.png)

# 서문

코드베이스로 새로운 풀 리퀘스트 '라이브러리 A 마이너 업데이트'를 받았다고 상상해보세요. 변경 사항을 검토하고 모든 것이 좋아 보입니다: 유닛 테스트를 통과했고, 통합 테스트가 성공했으며, 수동 테스트에서는 문제가 발견되지 않았습니다. 자신감을 갖고 PR을 프로덕션에 병합합니다. 성공적인 배포 후, 한 잠깐 쉬어도 좋을 것 같은 시간에 복어 잇님 모님 캆시 닦고 동료들과 이야기를 나눕니다. 정말 좋은 하루가 되고 있습니다.

그러나 당신이 책상에 돌아가 앉은 순간, 예상치 못한 광경이 당신을 반격합니다: 슬랙 인박스에 99개의 읽지 않은 메시지가 있는 것입니다. 무엇이 잘못되었을까요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_1.png)

코드 세계에서 거짓말은 현실 세계에서와 마찬가지로 치명적일 수 있습니다. TypeScript 컴파일러를 속이면 전체 응용 프로그램의 무결성이 위험에 빠집니다. 모든 X와 같이 알 수 없는 것은 시간이 지남에 따라 증가할 수 있는 가격이 따릅니다.

이 기사는 다음 측면을 밝히는 데 목표를 두고 있습니다:

- 코드베이스로 속임수를 도입하는 메커니즘
- 이러한 실천으로 이어지는 근본적인 이유들
- 기만의 사이클에서 벗어나 보다 투명한 코딩 접근 방식을 채택하는 전략

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Chapter 1: 속임수의 기술

우선, "거짓말"의 정의부터 시작해 봅시다:

하지만 거짓말은 프로그래밍과 무슨 공통점이 있는 걸까요 🤔? 실은 상당히 많은 부분이 비슷합니다.

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_2.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 거짓의 정의를 이해했으니, 우리에게 한 가지 질문을 해 보겠습니다:

그럼, 한 가지 더 물어볼게요: 코드로 무언가를 수행하려고 하는 상황에서 TypeScript가 너무 엄격하거나 필요한 유연성을 제공하지 않는 상황에 처했던 적이 있나요? 혹시 '유형 단언'이나 명시적 형 변환을 시도해 보았는데, 컴파일러를 속이는 방법으로 기술적으로 올바르지만 예상과 맞지 않는 코드를 수용하도록 했던 적이 있나요?

TypeScript는 우리 코드의 유형을 추론하는 데 탁월한 성과를 거두고 있습니다. 예를 들어, 이 스니펫에서 애완동물의 유형을 완벽하게 포착해냅니다:

```js
let pets = [new Dog(), new Cat(), new Bird()];
let pets: (Dog | Cat | Bird)[];
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

실제 코딩은 종종 예상과는 다르게 복잡할 때가 많아요!

개발자 생활에서 아래와 같은 경우를 만날 수도 있습니다:

## 사례 1.

```javascript
const params = new URL(document.location).searchParams;
const name = params.get("name");

const hello = `Welcome ${name!}`;
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Case 2.

```js
import { ColorsEnum } from 'happy-lib/colors';
import { LocalColorsEnum } from '../enums/color';
...

const handleColorChange = async (colorToUpdate: LocalColorsEnum) => {
    await callImaginaryApi('/colors', {
        color: colorToUpdate as unknown as ColorsEnum
    })
}
```

## Case 3.

```js
type UserType = 'admin' | 'superadmin' | 'user'
type SpecialUsers = Extract<UserType, 'admin' | 'superadmin'>

const allowList = ['admin', 'superadmin'] as const satisfies SpecialUsers[];

const doAdminStuff = (userType: SpecialUsers) => {
  // magic
}

const checkIfAllowed = (userType: UserType) => {
  if (allowList.includes(userType)) {
    doAdminStuff(userType as SpecialUsers)
  }
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 한 발자국 물러나서 이 경우들을 다시 살펴보고 "거짓말"을 찾아보세요.

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_3.png)

찾았나요? 네, 아니오? (혹시라도? 모르겠어요). 네라면, 축하해요 🎉 찾지 못했다면 걱정마시고 계속해서 읽어보세요.

우리 함께 모든 경우를 해결해 낼 거에요 💪.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 케이스 1

```js
const params = new URL(document.location).searchParams;
const name = params.get("name");

const hello = `환영합니다, ${name}님!`;
```

여기에는 URL에서 검색 매개변수를 구문 분석하는 클래식 프론트엔드 사례가 있습니다. 이름 매개변수를 검색하고 환영 메시지를 반환하려고 합니다. 안타깝게도, 이 코드는 거짓말을 하고 있습니다.

```js
const hello = `환영합니다, ${name}님!`;
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

당신이 왜 이것을 문제로 생각하는지 궁금할 수도 있습니다. URL에 이름 매개변수가 없는 경우, "이름이 정의되지 않은 상태에서 '안녕하세요'가 표시됩니다. 코드에는 TypeScript에게 모든 것이 괜찮다고 확신하는! - non-null assertion operator가 포함되어 있습니다. (여기서는 사실이 아닙니다 😠). 우리에게 다행히, 해결책은 간단합니다:

```js
const params = new URL(document.location).searchParams;
const name = params.get("name");

if (!name) {
  // 오류 케이스를 좀 더 세련되게 처리
}

const hello = `환영합니다 ${name}`;
```

TypeScript를 사용하여 narrowing을 하고, 오래된 if 문의 도움으로 이제 if 블록 바깥에서 name을 사용할 때 항상 값이 있다고 확신할 수 있습니다. 잠재적인 오류를 숨겨도 오류가 사라질 것이라는 보장은 없다는 것을 기억하는 것이 매우 중요합니다.

## 케이스 2

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { ColorsEnum } from 'happy-lib/colors';
import { LocalColorsEnum } from '../enums/color';
...

const handleColorChange = async (colorToUpdate: LocalColorsEnum) => {
    await callImaginaryApi('/colors', {
        color: colorToUpdate as unknown as ColorsEnum
    })
}
```

여기서 볼 수 있는 것은 상상 속의 API를 사용하여 색상을 업데이트하는 간단한 경우입니다. 현재 코드가 어떻게 보이는지에 따라 모든 것이 괜찮아 보입니다. 수동으로 작동을 테스트하고 유닛 테스트를 추가했습니다. 네, colorToUpdate을 다른 열거형으로 수용하지만, 값이 동일하고 변경되지 않을 것을 알고 있습니다.

불행하게도, 위의 줄은 거짓말이 들어 있으며 찾기 어려운 것입니다.

아래 줄에 집중해보겠습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
...
color: colorToUpdate as unknown as ColorsEnum
...
```

이 코드는 TypeScript에게 다음을 알려줍니다:

happy-lib/colors 패키지가 주요 패치를 받을 경우를 가정해 봅시다. 알 수없는 이유로 ColorsEnum이 변경되어 열거형의 키 케이싱이 바뀝니다. 이러한 열거형은 더 이상 동일한 값을 보유하지 않습니다. TypeScript 컴파일러는 이러한 사항에 대해 경고하지 않고 단위 테스트에서는 문제를 포착하지 못할 것입니다. 이 문제를 포착하는 것은 수동 또는 엔드투엔드 테스트에 달려 있습니다. 그러나 이럴 필요는 없습니다.

우리는 진실을 이야기하기 위해 이 코드를 다시 작성해보겠습니다. 이 연습의 목적을 위해 colorToUpdate 유형을 변경할 수 없으며, 이 작업을 함수 내부에서 처리해야 합니다. TypeScript(또는 JavaScript)에서 열거형을 비교하는 것은 어렵습니다. 우리가 할 수 있는 것은 번역기를 작성하거나(또는 사전을 사용하는 것)하는 것입니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
function transformColorEnum(localColor: LocalColorsEnum): ColorsEnum | null {
  switch (localColor.toString()) {
    case LocalColorsEnum.Red:
      return ColorsEnum.Red;
    case LocalColorsEnum.Green:
      return ColorsEnum.Green;
    case LocalColorsEnum.Blue:
      return ColorsEnum.Blue;
    default:
      return null;
  }
}

const handleColorChange = async (colorToUpdate: LocalColorsEnum) => {
  const translatedColor = transformColorEnum(colorToUpdate);

  if (!translatedColor) {
    // 에러 케이스를 처리하세요
  }

  await callImaginaryApi("/colors", {
    color: colorToUpdate,
  });
};
```

여기서 우리는 무엇을 달성했을까요? 이제 API 변경으로 인해 잘못된 값이 전송되는 경우를 방지할 수 있게 되었습니다.

맞아요. 이 코드를 개선할 다양한 방법이 있습니다(어떤 라이브러리도 사용하지 않고도), 하지만 이번에는 Zod 라이브러리를 사용하여 이를 처리하는 방법을 보여드리고 싶었어요:

```js
import z from "zod";

const handleColorChange = async (colorToUpdate: LocalColorsEnum) => {
  const translatedColor = z.nativeEnum(ColorsEnum).safeParse(colorToUpdate);

  if (!translatedColor.success) {
    // 에러 케이스를 처리하세요
  }

  await callImaginaryApi("/colors", {
    color: colorToUpdate,
  });
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 케이스 3

```js
type UserType = 'admin' | 'superadmin' | 'user'
type SpecialUsers = Extract<UserType, 'admin' | 'superadmin'>

const allowList = ['admin', 'superadmin'] as const satisfies SpecialUsers[];

const doAdminStuff = (userType: SpecialUsers) => {
  // magic
}

const checkIfAllowed = (userType: UserType) => {
  if (allowList.includes(userType)) {
    doAdminStuff(userType as SpecialUsers)
  }
}
```

이미 1과 2번 케이스를 해결했다면, 여기서 형 변환을 하고 있다는 것을 빠르게 지적할 수 있을 것입니다. 그리고 당신은 맞을 것입니다! 다행히 이번에는 상황이 심각하지는 않습니다. 사용자가 권한 배열에 포함되어 있는지 확인하기 때문에 안전합니다. 그러나 우리는 가져야 할 정보 유형을 잃어버렸습니다. 거의 동일한 로직을 유지하면서 정보 유형을 복구해 봅시다.

```js
type UserType = 'admin' | 'superadmin' | 'user';
type SpecialUsers = Extract<UserType, 'admin' | 'superadmin'>;

const allowList = ['admin', 'superadmin'] as const satisfies SpecialUsers[];

const doAdminStuff = (userType: SpecialUsers) => {
  // magic
};

const isSpecialUser = (userType: UserType): userType is SpecialUsers => {
  return allowList.includes(userType as SpecialUsers);
};

const checkIfAllowed = (userType: UserType) => {
  if (isSpecialUser(userType)) {
    doAdminStuff(userType);
  }
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 형변환(casting)이 안전한 이유는 `isSpecialUser` 유형 가드 함수 내부에서 사용하기 때문입니다. TypeScript는 includes 확인이 통과되면 `userType`이 `SpecialUsers` 유형이어야 한다는 것을 이해합니다. 따라서 형변환은 안전하며 유형 안전성을 위반하지 않습니다. 이렇게 하면 `userType` 변수는 if 블록의 범위 내에서 `SpecialUsers` 유형을 유지합니다.

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_4.png)

3/3 사건 마무리 수사관 - 훌륭한 일했어요.

# 2장: 거짓말의 해부학.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희 코드에서 문제점을 파악했습니다. 이제는 그 문제들이 처음에 발생한 이유를 이해해야 합니다.

코딩 세계에서는 종종 특정 목표를 이루기 위해 의도적으로 유형이나 데이터 구조를 조작하는 상황에 처합니다. 실생활에서 무언가에 대해 확신이 없거나 단축키를 사용하길 원할 때 사람들이 진실을 왜곡하는 것과 비슷한 상황이죠.

## 알 수 없는 데이터

가장 일반적으로 '거짓말'을 하는 경우는 데이터가 불확실한 출처에서 올 때입니다. 예를 들어, 이 코드 조각을 살펴보죠:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// API에서 사용자 데이터를 가져옵니다
const response = await getUsers();
const users = await response.json();
```

사용자가 특정 유형임을 정확히 알 수 있을까요? 대부분, 다음과 같은 것을 볼 수 있습니다:

```js
const users: Users = await response.json() as Users;
```

대부분의 경우에는 잘 작동합니다. 그러나 이 코드는 실제로 안전하지 않습니다. 우리가 호출하는 엔드포인트가 지정된 형식의 데이터를 반환하는지 알 방법이 없습니다. 유형 단언(as Users)을 사용하여 사실상 코드에 거짓말을 하고 원하는 것이 맞다고 코드에 알려주는 것입니다. 하지만 이러한 "소백한 거짓말"은 종종 미래 문제의 근본 원인이 되며 오류 케이스를 무시합니다. getUsers가 반환하는 유형이 변경되면 어떻게 될까요? TypeScript에 모든 것이 괜찮고 특정 유형(e.g., Users)이 반환될 것이 확실하다고 확신할 수 있지만, 실제로는 코드가 예기치 않은 유형을 처리할 준비가 되어 있지 않습니다. 이는 프로덕션 코드를 망가뜨릴 수 있는 런타임 오류로 이어질 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_5.png" />

## 게으름 (좋은겁니다 😎)

가끔은 사소해 보이지만 디버깅하기 어려울 수 있는 거짓말도 있어요.

예를 들어 단위 테스트에서 대량의 모의 객체가 있는 경우를 생각해봅시다. 특정 속성만 신경 쓰지만 자동완성과 타입 안전성의 이점을 원한다면, 이런 식의 코드가 될 수 있습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const veryBigObjectMock: BigObjectType = {
    ...{} as BigObjectType,
    keyIWantToMock: 'myMock'
};
```

컴파일러가 만족하고 테스트가 의도대로 실행됩니다...지금까지는요. 그러나 어느 날 테스트가 실패하면서 데이터 구조가 변경되었다는 것을 알고 있음에도 TypeScript의 타입 체커(tsc)가 문제를 보고하지 않는 것을 발견할 수 있습니다. 아마도 당신이 로직을 잘못 이해한 것인지 생각해 볼지도 모르겠죠.

무엇이 잘못되었는지 알아내려고 몇 시간을 낭비한 후, 오래된 키 이름을 가진 잊혀진 목 객체를 기억낼 수 있습니다. 시간을 낭비한 셈이죠.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 준비되지 않은 데이터 사용

준비되지 않은 데이터를 사용하는 것은 일반적인 함정일 수 있습니다. 우리는 밑바닥 데이터를 안전하게 사용할 수 있는지 확인하지 않고 속성이나 메서드에 액세스하려는 유혹을 느낄 수 있습니다.

예를 살펴봅시다. 비동기적으로 가져온 할 일 항목을 표시하는 TodoList 컴포넌트가 있다고 가정해 봅시다. 이 할 일 항목은 리덕스의 useSelector 훅을 통해 반환됩니다 (물론 다른 상태 관리 라이브러리일 수도 있습니다):

```js
import * as React from "react";
import { useSelector } from "react-redux";

type Todo = { id: string, name: string };

const TodoList = () => {
  const todos: Todo[] | null = useSelector((state) => state.todos);

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
};
export default TodoList;
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 컴포넌트를 사용할 때는 잘 렌더링됩니다. 그러나 주의 깊게 관찰하거나 인터넷 연결이 느린 경우에는 1초 미만의 깜빡임이 발생할 수도 있습니다. 하지만 받는 데 시간이 걸리는 경우나 애플리케이션에서 할 일 항목에 대한 실시간 업데이트를 보여주려는 경우에는 어떨까요? 이 순진한 방법을 사용하면 사용자 경험이 좋지 않을 수 있습니다. TypeScript는 할 일 항목이 비어 있을 수 있다고 알려줬는데도 우리는 그 경고를 무시하기로 결정했습니다.

# 제 3장: 진실의 힘.

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_6.png)

지금까지 코드에서 거짓이 어떻게 보이는지와 그 코드베이스에 나타난 이유에 중점을 두었습니다. 그러나 우리는 진실을 말할 수 있는 방법이 무엇이며 어떻게 거짓을 멈출 수 있을까요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다행히도, 쉬운 일은 아니지만 우리 삶을 많이 개선해 줄 것입니다.

**Typescript을 믿으세요.**

Typescript는 당신을 위해 최선을 다해줍니다. 당신에게 경고를 주고 실수를 예방해줍니다. 코드에서 보이는 오류와 경고에는 그 이유가 있습니다.

**엄격한 eslint 및 tsconfig 규칙을 추가하세요.**

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

자동화할 수 있는 것은 자동화하고 엄격한 @typescript-eslint 구성을 사용하세요. 이는 오류를 보여주는 것뿐만 아니라 미래 실수를 방지하는 데 도움이 될 수 있습니다. 최상의 관행과 권장 사항을 사용하여 tsconfig를 설정하세요 (예: https://www.totaltypescript.com/tsconfig-cheat-sheet). 이렇게 하면 올바른 방향으로 유지될 수 있습니다. 수동으로 확인할 필요가 줄수록 더 좋습니다.

## TypeScript에게 일을 시키세요.

if-else 조건문 및 switch 문과 같은 흐름 제어문을 사용하면 TypeScript가 변수 유형에 대한 이해를 더욱 정확하게 할 수 있습니다. 다음과 같이 할 수 있습니다:

```js
const optionalValue: string | null = getOptionalValue();

if (!optionalValue) {
  return;
} else {
  // 코드의 나머지 부분
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

optionalValue에 값이 항상 있으므로 else 본문에서 수동 타입 체크가 필요하지 않습니다.

## 확실히 움직이세요.

값이 undefined 또는 null일 가능성이 있는 경우, 그러한 경우가 발생할 가능성이 높으므로 이에 대비하고 정상적으로 처리하세요. 입력 유효성 검사, 방어적 프로그래밍 및 타입 체크를 통해 가능성을 좁힙니다. 기본값 제공, 오류 처리 구현, 그리고 작업 전에 이러한 경우를 확인하고 처리하는 방어적 코드 작성과 같은 전략을 활용하세요.

## 런타임에서 유효성 검사하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

예방 조치인 입력 유효성 검사와 유형 검사와 같은 것들은 중요하지만, 알려지지 않거나 신뢰할 수 없는 객체를 다룰 때는 런타임에 데이터를 유효성 검사하는 것이 매우 중요합니다. 이를 달성하는 강력한 도구 중 하나는 zod입니다. TypeScript를 기반으로 한 스키마 유효성 검사 라이브러리로 데이터의 예상 형태와 유형을 정의하는 엄격한 스키마를 설정할 수 있습니다. 데이터 구조물의 청사진과 같은 개념입니다! Zod를 사용하면 런타임에서 잘못된 또는 예기치 않은 데이터에 대해 경고를 내어주는 강력한 스키마를 만들 수 있습니다. 예를 들어, 외부 API나 사용자 입력에서 데이터를 받는 경우, 해당 데이터의 예상 구조를 나타내는 Zod 스키마를 정의하고 해당 스키마를 사용하여 들어오는 데이터를 유효성 검사할 수 있습니다. 이를 통해 지정된 유형, 형태 및 제약 조건을 준수하는지 확인할 수 있습니다. 데이터가 이러한 기대에 미치지 않는 경우, Zod는 유용한 오류를 발생시켜 이 문제를 세련되게 처리할 수 있게 도와줍니다. 또한, 유형 가드나 어서션 함수와 같은 기술을 구현하는 자체 파서를 작성할 수도 있습니다.

# Chapter 4: 마무리.

TypeScript의 타입 어설션을 사용하면 값의 유형에 대해 컴파일러에게 거짓 정보를 전달할 수 있습니다. 유효한 사용 사례가 제한적이지만 자주 남용되며, 정적 유형 확인 목적을 해치는 잔인한 유형 오류를 초래할 수 있습니다.

완벽한 세상에서는 사용하는 라이브러리에서 모든 타이핑을 처리할 수 있고 가능한 한 순수 JavaScript에 가까운 코드만 작성할 수 있을 것입니다. 불행하게도, 이것은 현실적으로 어렵고, 타입을 어떻게 구조화할지에 대해 신중해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

TypeScript는 개발자가 오류를 잡고 코드 품질을 향상시키는 데 도움을 주도록 설계되었지만, 마법같은 해결책은 아닙니다. 여전히 그 아래에는 옛날의 JavaScript가 있다는 것을 기억해야 합니다. TypeScript는 정적 유형 검사를 위한 강력한 도구를 제공하지만 모든 잠재적인 런타임 오류를 제거할 수는 없습니다.

이 글을 처음부터 끝까지 함께 읽어주셔서 감사합니다. 그리고 기억하세요:

거짓말 하지 마세요.

![이미지](/TIL/assets/img/2024-07-02-ThecostofaliewhyhonestyisthebestpolicywhenworkingwithTypeScript_7.png)
