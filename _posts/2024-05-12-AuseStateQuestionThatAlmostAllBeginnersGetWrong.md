---
title: "대기업 프론트엔드 단골 useState 질문"
description: ""
coverImage: "/assets/img/2024-05-12-AuseStateQuestionThatAlmostAllBeginnersGetWrong_0.png"
date: 2024-05-12 20:51
ogImage:
  url: /assets/img/2024-05-12-AuseStateQuestionThatAlmostAllBeginnersGetWrong_0.png
tag: Tech
originalTitle: "A useState Question That Almost All Beginners Get Wrong"
link: "https://medium.com/javascript-in-plain-english/a-usestate-question-that-almost-all-beginners-get-wrong-076009be61ed"
---

<img src="/assets/img/2024-05-12-AuseStateQuestionThatAlmostAllBeginnersGetWrong_0.png" />

리액트에서 `useState`는 함수 컴포넌트에서 상태를 관리하는 데 필수적인 도구입니다. 그 사용법은 직관적이고 유연합니다. 하지만 초보자들과 어떤 경험이 있는 개발자들도 `useState`가 어떻게 작동하는지와 관련된 세부 내용을 완전히 이해하지 못할 수 있습니다.

다음 코드를 분석해보겠습니다. 버튼 A, B, C, D를 클릭한 후에 각 버튼에 표시된 숫자를 고려하고 이러한 결과가 발생하는 이유를 생각해봅시다.

```js
import { useState } from "react";

export default function UseStateDemo() {
  const [numberA, setNumberA] = useState(0);
  const [numberB, setNumberB] = useState(0);
  const [numberC, setNumberC] = useState(0);
  const [numberD, setNumberD] = useState(0);

  const handleButtonA = () => {
    setNumberA(numberA + 1);
    setNumberA(numberA + 1);
  };

  const handleButtonB = () => {
    setNumberB((n) => n + 1);
    setNumberB((n) => n + 1);
  };

  const handleButtonC = () => {
    setNumberC(numberC + 3);
    setNumberC((n) => n + 1);
  };

  const handleButtonD = () => {
    setNumberD(numberD + 4);
    setNumberD((n) => n + 1);
    setNumberD(99);
  };

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-white m-8 p-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={handleButtonA}
      >
        Button A {numberA}
      </button>
      <button
        type="button"
        className="rounded-md bg-white m-8 p-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={handleButtonB}
      >
        Button B {numberB}
      </button>
      <button
        type="button"
        className="rounded-md bg-white m-8 p-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={handleButtonC}
      >
        Button C {numberC}
      </button>
      <button
        type="button"
        className="rounded-md bg-white m-8 p-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={handleButtonD}
      >
        Button D {numberD}
      </button>
    </>
  );
}
```

<img src="/assets/img/2024-05-12-AuseStateQuestionThatAlmostAllBeginnersGetWrong_1.png" />

버튼 A를 누른 후 각각 버튼 B, 버튼 C, 버튼 D를 순서대로 클릭하면 버튼에 적힌 숫자가 1, 2, 4, 99인 것을 확인할 수 있어요.

<img src="/assets/img/2024-05-12-AuseStateQuestionThatAlmostAllBeginnersGetWrong_2.png" />

결과가 기대와 일치했나요?

# 결과 분석

## 버튼 A:

setNumberA(numberA + 1)가 두 번 호출되었습니다. 각 호출은 현재 값에 따라 상태를 업데이트하지만 상태 업데이트는 비동기적입니다. useState의 set 함수는 값이 즉시 업데이트되지 않고 다음 렌더링 중에 적용됩니다. 따라서 두 호출 모두 numberA의 동일한 기본값을 사용하여 0부터 1로만 증가합니다.

## 버튼 B:

표 태그를 Markdown 형식으로 변경해주세요.

| Button | 역할                                                                                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | setNumberB(n = n + 1)를 두 번 사용합니다. 이 접근 방식은 각 증가가 최신 상태 값에 기반하게 합니다. 결과적으로 카운트가 정확하게 2씩 증가합니다.                   |
| C      | 초기에 setNumberB(numberC + 3)은 직접 카운트를 3씩 증가시킵니다. 그런 다음 setNumberC(n = n + 1)는 최신 상태 값을 기반으로 추가로 1씩 증가시켜 총 4씩 증가합니다. |
| D      |                                                                                                                                                                   |

첫 번째 setNumberD(numberD + 4)는 수를 4씩 증가시킵니다. 다음으로 setNumberD(n =` n + 1)은 1씩 추가 증가시킵니다. 마지막으로 numberD를 직접 99로 설정하면 이전 증가가 무시되고 값을 99로 고정시킵니다.

# 이유

콜백 함수가 인수로 사용될 때(예: n =` n + 1), 현재 상태 값을 기준으로 증분을 허용합니다. 이는 상태 업데이트가 서로 의존하거나 업데이트가 가장 최신 값에 기반하는 것을 보장해야 할 때 유용합니다.

변수 값 직접 업데이트하기(예: setNumber(value))는 특정 양을 명시적으로 추가하는 장점이 있습니다. 그러나 여러 직접 업데이트는 이전 상태 값이 사용되어 오래된 상태 값으로 인해 부정확한 업데이트를 초래할 수 있습니다.

따라서, 콜백 함수를 사용하는 것은 정확한 증분 및 순차적 상태 업데이트가 필요한 시나리오에 더 적합합니다. 특히 업데이트가 기존 상태 값에 따라 결정될 때 유용합니다. 직접적인 업데이트는 간단한 증분이 필요하거나 현재 상태를 고려할 필요가 없는 상황에 더 적합합니다.

# 결론

useState 훅을 사용하면 함수 컴포넌트에서 상태 변수를 선언하고 상태를 업데이트하는 함수를 제공합니다. 이는 상태를 비동기적으로 업데이트하여 여러 `set` 호출이 즉시 컴포넌트의 현재 렌더링 주기에 반영되지 않도록합니다.

useState의 설계는 함수 컴포넌트에서 상태 관리를 더 유연하게 만들어줍니다. 비동기 및 콜백 메커니즘을 이해하면 정확한 여러 상태 업데이트에 대해 올바르게 사용하는 데 도움이 됩니다.

일반적으로 콜백 함수를 사용하여 정확한 업데이트를 보장하는 것이 좋습니다. 특히 여러 개의 업데이트가 비동기 환경에서 발생하는 경우에는 더욱 중요합니다.

# 쉽게 설명한 것 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수치고 팔로우해 주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서도 만나보세요: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 확인해 보세요
