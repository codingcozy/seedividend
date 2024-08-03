---
title: "리액트 에러 해결 방법 Invalid hook call Hooks can only be called inside of the body of a function component"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Understanding the Error Invalid hook call Hooks can only be called inside of the body of a function component"
link: "https://medium.com/@kasata/demystifying-react-error-invalid-hook-call-c92b13575dfe"
---



리액트는 강력한 기능이 많은데 그중 하나가 Hooks입니다. Hooks로 작업할 때 종종 “Invalid hook call. Hooks can only be called inside of the body of a function component”라는 오류 메시지가 나타날 수 있습니다. 이 오류는 리액트에 익숙하지 않은 개발자에게 혼란스러울 수 있지만, 이 게시물에서는 이 오류를 이해하고 해결하는 방법을 안내해 드릴 거에요.

## 이 오류가 발생하는 이유

문제의 핵심은 오류 메시지에 명시된 대로입니다: Hooks는 함수 컴포넌트의 본문 안에서만 호출할 수 있습니다. Hooks는 리액트의 상태(state)와 라이프사이클(lifecycle) 기능에 "hook into"하는 특별한 리액트 함수인데, 사용 방법에는 특정 규칙이 있어요. 이러한 규칙을 무시하면 리액트가 상기한 오류를 토해냅니다.

구체적으로, 다음과 같은 함정이 이 오류를 발생시킬 수 있어요: — 일반 JavaScript 함수 안에서 Hook을 호출하는 경우, 함수 컴포넌트 안에서 호출하지 않는 경우. — 반복문, 조건문 또는 중첩 함수 내에서 Hook을 호출하는 경우. — 이벤트 핸들러에서 Hook을 호출하는 경우. — 같은 앱 내에서 두 개 이상의 리액트 버전을 사용하는 경우.

## 오류 해결 방법

<div class="content-ad"></div>

"“Invalid hook call” 오류를 해결하는 몇 가지 실용적인 단계를 안내해 드릴게요:

함수 컴포넌트에서 Hooks를 호출하고 있는지 확인해 주세요
Hooks는 반드시 함수 컴포넌트의 본문에서만 호출되어야 합니다. 코드를 확인하여 모든 Hooks가 이 맥락에서 호출되고 있는지 확인해 주세요. 또한 컴포넌트의 이름은 React 컴포넌트로 인식되기 위해 대문자로 시작해야 합니다. 아래는 함수 컴포넌트에서 Hook을 호출하는 예시입니다:
function Example() { const [count, setCount] = React.useState(0); //... }

Hooks의 규칙을 기억해 주세요
이 오류는 Hooks의 규칙을 무시했을 때도 발생할 수 있습니다. 반복문, 조건문 또는 중첩 함수 내에서는 Hooks 호출을 피해야 합니다. Hooks는 반드시 React 함수의 최상위 레벨에서 사용되어야 합니다.

여러 개의 React 버전이 실행 중인지 확인해 주세요
동일한 애플리케이션에서 여러 개의 React 버전이 실행되는 경우 일관성 없음과 오류를 유발할 수 있습니다. package.json 파일과 번들을 확인하여 하나의 React 버전만 실행 중인지 확인해 주세요.

ESLint 플러그인 사용하기
Hooks에 대한 ESLint 플러그인(`eslint-plugin-react-hooks`)과 같은 도구를 사용하면 자동으로 코드를 확인할 수 있습니다. 이 자동화된 확인은 시간과 노력을 아낄 수 있어 이 오류를 해결하는 데 도움이 됩니다.

## 결론

React의 Hooks는 구성 요소를 조직화하고 작업하는 데 더 많은 유연성을 제공하는 강력한 기능입니다. “Invalid hook call” 오류는 처음에는 다소 어렵게 느껴질 수 있지만, 실제로는 Hooks의 올바르고 효과적인 사용을 강제하는 것뿐입니다. Hooks의 규칙을 이해하고 적용하며 애플리케이션이 하나의 React 버전만 사용하도록 하는 것으로 이 오류를 해결하고 React Hooks가 제공하는 혜택을 계속 즐길 수 있습니다."
