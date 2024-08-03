---
title: "리액트에서 CSS 애니메이션을 활용한 가벼운 모션 시스템 구축하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building a Lightweight Motion System in React Using CSS Animations"
link: "https://medium.com/@curavcy/building-a-lightweight-motion-system-in-react-using-css-animations-e0ce120e62e2"
---



## 소개

애니메이션은 웹 애플리케이션에서 사용자 참여도와 경험을 현격하게 향상시킬 수 있습니다. 그러나 미학적 요소와 접근성 및 성능을 균형 있게 유지하는 것이 중요합니다. 이 기사는 React에서 MotionSystem을 구축하는 방법을 설명하며 CSS 애니메이션을 사용하여 동적 상호작용을 제공하면서 사용자의 움직임 감소를 선호하는 사용자를 존중합니다.

## React에서 CSS 애니메이션의 중요성

CSS 애니메이션은 React 애플리케이션에서 사용하기에 이상적인 여러 가지 장점을 제공합니다:

<div class="content-ad"></div>

- 성능: CSS로 애니메이션을 실행하면 JavaScript 스레드에서 작업을 줄일 수 있어 응용 프로그램이 responsiv하게 유지되는 데 도움이 됩니다.
- 유지 관리성: CSS 애니메이션을 통해 스타일 관련 변경을 JavaScript 외부로 유지하여 코드베이스가 더 깨끗하고 모듈화되도록 유지할 수 있습니다.
- 접근성: CSS를 사용하면 움직임에 민감한 사용자들을 위해 움직임을 최소화하는 환경 설정을 쉽게 구현할 수 있어 사용성을 해치지 않도록 합니다.

## 프로젝트 설정

이미 React 프로젝트를 설정하지 않았다면 새 React 프로젝트를 만들기 시작하세요:

```js
npx create-react-app motion-system-demo
cd motion-system-demo
```

<div class="content-ad"></div>

## 전문적인 모션 유형 정의하기

animations.css에서 다양한 UI 요소에 적용할 수 있는 전문적이고 재사용 가능한 키프레임 애니메이션을 정의할 수 있습니다:

```js
/* animations.css */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes popIn {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}

.fade-in {
  animation: fadeIn 1s ease-out forwards;
}
.slide-up {
  animation: slideUp 0.5s ease-out forwards;
}
.pop-in {
  animation: popIn 0.5s ease-out forwards;
}
```

## MotionSystem 컴포넌트 생성하기

<div class="content-ad"></div>

MotionSystem은 이제 사용자가 움직임을 줄이기를 선호하는지 확인하여 적절한 경우에만 애니메이션을 적용할 것입니다:

```js
import React, { useState, useEffect } from "react";
import "./animations.css";

function MotionSystem({ children, animation }) {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const handleAnimation = () => {
    if (!prefersReducedMotion) {
      setIsActive(true);
    }
  };
  return (
    <div
      className={isActive ? animation : ""}
      onAnimationEnd={() => setIsActive(false)}
      onClick={handleAnimation}
    >
      {children}
    </div>
  );
}
export default MotionSystem;
```

## MotionSystem 구현하기

디자인 요구에 따라 애니메이션 유형을 지정하여 MotionSystem 구성 요소 내에 요소를 래핑하세요:

<div class="content-ad"></div>

```js
import React from "react";
import MotionSystem from "./MotionSystem";

function App() {
  return (
    <div>
      <MotionSystem animation="fade-in">
        <h1>모션 시스템 데모에 오신 걸 환영합니다!</h1>
      </MotionSystem>
      <MotionSystem animation="slide-up">
        <button>기능 살펴보기</button>
      </MotionSystem>
      <MotionSystem animation="pop-in">
        <p>이 문단은 자리에 팝업됩니다!</p>
      </MotionSystem>
    </div>
  );
}

export default App;
```

## 결론

React에서 MotionSystem 컴포넌트를 사용하여 CSS 애니메이션을 적용하면 상호 작용이 가능하고 매력적인 애니메이션을 추가하는 강력한 솔루션을 제공할 수 있습니다. 동시에 사용자가 움직임을 줄이도록 선호하는 것을 고려합니다. 이 설정은 접근성을 향상시킬 뿐만 아니라 성능과 청결한 코드 아키텍처를 유지할 수 있습니다.```
