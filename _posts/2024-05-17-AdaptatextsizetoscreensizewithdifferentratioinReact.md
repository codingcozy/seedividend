---
title: "리액트에서 화면 크기에 맞게 반응형으로 텍스트 크기 조정하기"
description: ""
coverImage: "/assets/img/2024-05-17-AdaptatextsizetoscreensizewithdifferentratioinReact_0.png"
date: 2024-05-17 21:22
ogImage: 
  url: /assets/img/2024-05-17-AdaptatextsizetoscreensizewithdifferentratioinReact_0.png
tag: Tech
originalTitle: "Adapt a text size to screen size with different ratio in React"
link: "https://medium.com/@maozerhouni/adapt-a-text-size-to-screen-size-with-different-ratio-in-react-04b7b1ed2ca6"
---


현대 웹 개발의 중요한 측면 중 하나는 반응형 웹 디자인을 만드는 것입니다. 다양한 디바이스의 존재로 인해 텍스트가 다양한 화면 크기와 비율에서 가독성이 좋고 심미적으로 매력적으로 보이도록 하는 것은 어려운 과제일 수 있습니다. 이 기사에서는 React 애플리케이션을 다룰 때 다양한 화면 비율에 맞게 텍스트 크기를 동적으로 조정하는 실용적인 해결책에 대해 살펴보겠습니다.

# 과제 이해하기

서로 다른 크기와 모양의 화면에 완벽하게 맞는 텍스트 블록이 필요한 시나리오를 상상해보세요. 이는 너비에 맞추는 것뿐만 아니라 높이도 고려해야 합니다. 예를 들어, 여러 열로 구성된 큰 화면의 경우 텍스트는 사용 가능한 공간을 효과적으로 활용하기 위해 적응해야 합니다. 화면 너비에만 의존하는 미디어 쿼리는 화면의 더 높은 부분에 미사용 공간이 남아 작은 크기의 텍스트를 만들어낼 수 있습니다. 따라서 뷰포트의 너비와 높이를 모두 고려하는 보다 세밀한 접근 방식이 필요합니다.

# 기본 사항:

<div class="content-ad"></div>

솔루션으로 들어가기 전에 사용될 몇 가지 개념을 기본적으로 이해하는 것이 중요합니다.

먼저, CSS 단위에 대해 설명하겠습니다. 그런 다음, 리액트 컴포넌트 생명주기에 대해 자세히 알아보겠습니다. 리액트를 프레임워크로 사용하고 있지만, 동일한 원칙은 어떤 프레임워크 없이 순수한 JavaScript(프레임워크 없는 JavaScript)로도 적용할 수 있습니다.

## CSS 단위 이해

이 도전 과제를 효과적으로 해결하기 위해 CSS 단위에 대한 명확한 이해가 중요합니다. CSS 단위는 반응형 디자인의 구성 요소입니다. 다음은 가장 일반적으로 사용되는 몇 가지 단위입니다:

<div class="content-ad"></div>

- 픽셀 (px): 화면에서 하나의 픽셀을 나타내는 가장 기본적인 단위입니다. 다른 요소에 따라 변경되지 않는 절대적인 단위입니다.
- 뷰포트 너비 (vw): 이 단위는 뷰포트의 너비(브라우저 창의 가시 영역)의 1%에 대한 상대적인 값입니다. 예를 들어, 뷰포트가 1000px 너비라면 1vw는 10px입니다.
- 뷰포트 높이 (vh): vw와 유사하지만 뷰포트의 높이에 상대적입니다. 따라서 1vh는 뷰포트 높이의 1%입니다.
- 퍼센트 (%): 이 단위는 부모 요소의 크기에 상대적입니다. 레이아웃에 자주 사용되지만 텍스트에는 조심해야 합니다.
- em과 rem: 이것들은 글꼴 상대적 크기입니다. em은 요소의 글꼴 크기에 상대적이며 rem은 루트 요소의 글꼴 크기에 상대적입니다.

## 리액트 컴포넌트와 라이프사이클

리액트는 개발자들이 재사용 가능한 UI 컴포넌트를 만들 수 있도록 합니다. 우리의 맥락에서, 우리는 함수형 컴포넌트를 다룰 것입니다.

리액트 컴포넌트에는 라이프사이클이라고 하는 것이 있습니다 — 컴포넌트의 생성부터 언마운트까지 일련의 이벤트가 발생합니다. useState와 같은 훅을 사용하여 상태 관리하거나 window 크기 조정과 같은 부수 효과에 대응하기 위한 useEffect를 통해, 리액트는 동적 행위를 다루는 강력한 방법을 제공합니다.

<div class="content-ad"></div>

# useState

useState은 React에서 함수 컴포넌트에 상태를 추가할 수 있게 해주는 훅(React의 특별한 함수)입니다. 기본적으로 함수에 인자로써 사용되며, 컴포넌트의 어떤 측면을 변경할 수 있게 합니다. 예를 들어, 숫자를 표시하는 페이지가 있고 이 숫자를 증가시킬 수 있는 두 개의 버튼이 있다고 가정해보세요. 숫자는 상태여야만 컴포넌트를 재구성할 수 있습니다.

useState은 값을 반환하고 값을 설정하는 함수를 제공합니다. 아래의 예시에서 "Increase"를 클릭할 때마다, 숫자를 1씩 증가시키기 위해 update 함수인 setNumber를 호출합니다. 숫자가 상태에 저장되어 있기 때문에 React는 변경될 때마다 업데이트된 점수로 컴포넌트를 다시 렌더링해야 함을 압니다. 이를 통해 표시가 현재 점수와 동기화됩니다. useState가 없다면 버튼을 클릭해도 페이지의 숫자가 변경되지 않을 것입니다.

```js
import {useState} from React

const Scoreboard = () => {

const [number, setNumber] = useState(0);

return(<>
  <button onClick={() => setNumber(number + 1)}>Increase</button>
  <p>{number}</p>
</>
)
}
```

<div class="content-ad"></div>

# useEffect

React에서 작업할 때, 코드는 해석적이 아닙니다. 즉, 어떤 코드가 실행되고 있는지 정확히 알 수 없다는 것을 의미합니다. 때로는 어떤 계산을 수행하기 전에 모든 것이 렌더링되었는지 확인해야 할 수도 있습니다. 이럴 때 useState가 유용합니다.

웹페이지가 숫자를 표시하고 해당 숫자를 증가시키거나 감소시키는 버튼으로 제어되는 예제를 계속해 보겠습니다. 만약 이 숫자가 변경될 때마다 특정 작업이나 계산을 수행하고 싶다면, 예를 들어 해당 숫자를 로깅하거나 UI의 다른 부분을 업데이트하는 경우입니다.

## 숫자 표시 예제

<div class="content-ad"></div>

```js
useEffect(() => {
  // 이 코드는 `number`가 업데이트된 후에 실행됩니다
  console.log("숫자가 변경되었습니다:", number);
  // 이 숫자를 기반으로 다른 것을 업데이트하고 싶을 수도 있습니다
  // 예를 들어, 숫자가 짝수인지 홀수인지에 따라 배경색을 변경할 수 있습니다
  if (number % 2 === 0) {
    document.body.style.backgroundColor = "lightblue";
  } else {
    document.body.style.backgroundColor = "lightpink";
  }
}, [number]); // 이는 React에게 `number`가 변경될 때 효과를 실행하도록 알려줍니다
```

이 코드에서는 useEffect가 숫자 상태를 관찰합니다. 숫자가 변할 때(버튼 클릭으로 인해), useEffect는 코드를 실행합니다. 현재 숫자를 기록하고 숫자가 짝수인지 홀수인지에 따라 배경색을 변경합니다. useEffect는 useState 계산 후에 함수가 실행되도록 보장합니다. 버튼의 onClick 핸들러 안에서 setNumber를 호출한 직후 동작을 수행하려고 하면 문제가 발생할 수 있습니다. 상태 업데이트(setNumber)는 즉시 발생하지 않습니다. React가 일정에 따라 예약되기 때문에 실제로 상태가 변경되기 전에 후속 코드가 실행될 수 있어 예상치 못한 동작을 유발할 수 있습니다. useEffect는 React가 새로운 상태로 구성 요소를 업데이트한 후에만 내부 코드가 실행되도록 보장하여 이 문제를 해결합니다.

# 해결 방법:

우리는 React에서 useState와 useEffect 훅을 사용하여 viewport 너비 (vw) 및 높이 (vh)의 변경에 따라 적응하는 반응형 텍스트 크기를 만들어 보겠습니다. 아래는 단계별 가이드입니다:


<div class="content-ad"></div>

## 단계 1: 상태 설정하기

먼저, useState를 사용하여 텍스트 스타일의 초기 상태를 정의합니다. 이 상태는 글ꔼ 크기, 줄 높이 및 글ꔼ 굵기를 보관합니다.

```js
const [paragraphStyle, setStyle] = useState({
  fontSize: "3vw",
  lineHeight: "4vw",
  fontWeight: "100",
});
const [catchSentenceStyle, setCatchSentenceStyle] = useState({
  fontSize: "7vw",
  lineHeight: "9vw",
  fontWeight: "600",
});
```

## 단계 2: 글ꔼ 크기 동적으로 계산하기

<div class="content-ad"></div>

우리는 viewport의 너비와 높이에 기반하여 동적으로 글꼴 크기를 계산하는 updateStyle 함수를 생성합니다.

```js
const updateStyle = () => {
  const vw = window.innerWidth * 0.0095;
  const vh = window.innerHeight * 0.0095;
  const responsiveSize = vh + vw;
  const cresponsiveSize = responsiveSize * 3.5;
```

```js
  // 화면 비율에 따른 추가 조정 적용을 위해 주석을 해제하세요
  // if (screenRatio < 0.74 && screenRatio > 0.5) {
  //   responsiveSize = responsiveSize * 1.3 * screenRatio;
  //   cresponsiveSize = cresponsiveSize * 1.3 * screenRatio;
  // }
  setStyle({
    fontSize: responsiveSize + "px",
    lineHeight: responsiveSize * 1.3 + "px",
    fontWeight: "100",
  });
  setCatchSentenceStyle({
    fontSize: cresponsiveSize + "px",
    lineHeight: cresponsiveSize * 1.1 + "px",
    fontWeight: "100",
  });
};
```

## 단계 3: 창 크기 조정에 대한 응답

<div class="content-ad"></div>

useEffect 훅은 컴포넌트가 마운트될 때와 창 사이즈가 조정될 때 updateStyle을 호출하기 위해 사용됩니다.

```js
useEffect(() => {
  updateStyle();
  window.addEventListener("resize", updateStyle);
  return () => window.removeEventListener("resize", updateStyle);
}, []);
```

## 단계 4: 스타일 적용

마지막으로, 이 스타일을 컴포넌트의 텍스트 요소에 적용합니다.

<div class="content-ad"></div>

```html
<div
  style={
    padding: "8vh 8vw",
    // additional styles...
  }
>
  <p style={catchSentenceStyle}>Catchy sentence here.</p>
  <p style={paragraphStyle}>Detailed paragraph here.</p>
  {/* Additional paragraphs... */}
</div>
```

이 솔루션을 통해 텍스트가 다양한 화면 비율에서 스케일링되며, 좋은 글꼴 크기로 조정되어 윈도우 높이 및 폭에 모두 적응합니다.

# 결론

텍스트 크기를 다른 화면 크기에 맞게 조정하는 것은 반응형 웹 디자인의 중요한 측면입니다. React의 useState 및 useEffect 훅을 활용하여 개발자는 화면 너비뿐만 아니라 높이에도 조절되는 텍스트를 생성할 수 있으며, 가독성과 화면 공간의 최적 활용을 보장합니다. 이 접근 방식은 다양한 장치와 화면 크기에 걸쳐 사용자 경험을 향상시킵니다.


<div class="content-ad"></div>

이제 이러한 개념을 이해했으니, 2600px에서처럼 응용 프로그램에서 특정 브레이크포인트를 관리하는 방법에 접근할 수 있습니다. 이는 주방에 특별한 규칙이 있는 것과 같습니다: "2600 명 이상의 고객이 있을 때 다른 메뉴로 전환해야 합니다." 웹 개발에서 브레이크포인트는 웹사이트 레이아웃이 다른 화면 크기나 방향에 맞게 변경되는 지점을 의미합니다.

우리의 예시 컴포넌트에서 2600px에서의 브레이크포인트를 관리하는 것은 updateStyle 함수에서 화면 너비를 확인하고 너비가 2600px를 초과할 때 스타일을 조정하는 조건을 설정하는 것을 포함합니다. 이는 화면이 커지더라도 텍스트 크기와 레이아웃이 최적이며 가독성이 유지되도록 보장하며, 항상 우리 메뉴가 고객 수에 적합한지 확인하는 것과 같은 역할을 합니다. 이 도전에 도전해 보고 결과를 게시해보세요!