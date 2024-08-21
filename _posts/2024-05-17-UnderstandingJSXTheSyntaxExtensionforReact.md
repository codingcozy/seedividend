---
title: "React jsx를 이해하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-UnderstandingJSXTheSyntaxExtensionforReact_0.png"
date: 2024-05-17 21:05
ogImage:
  url: /assets/img/2024-05-17-UnderstandingJSXTheSyntaxExtensionforReact_0.png
tag: Tech
originalTitle: "Understanding JSX: The Syntax Extension for React"
link: "https://medium.com/@iammayank20/understanding-jsx-the-syntax-extension-for-react-1ac0064b4432"
isUpdated: true
---

<img src="/assets/img/2024-05-17-UnderstandingJSXTheSyntaxExtensionforReact_0.png" />

## 소개

리액트를 배우기 시작했다면 아마도 JSX라는 것에 대해 들어보았을 것입니다. JSX는 자바스크립트 내에서 HTML과 유사한 코드를 작성할 수 있게 해주는 구문 확장입니다. 이 독특한 기능은 리액트의 핵심 요소 중 하나로, 상호 작용하는 UI를 만들기 쉽게 해줍니다. 이 글에서는 JSX가 무엇인지, JavaScript와 HTML을 어떻게 통합하는지, 그리고 왜 유용한지 살펴보겠습니다. 또한 몇 가지 예제를 살펴보면서 JSX가 어떻게 동작하는지 알아볼 것입니다.

## JSX란 무엇인가요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

JSX는 JavaScript XML의 약자입니다. JavaScript의 구문 확장으로, JavaScript 코드 내에서 직접적으로 HTML 태그를 작성할 수 있게 해줍니다. HTML과 비슷해 보이지만, JavaScript의 모든 기능을 갖고 있습니다. JSX를 작성하면 일반적인 JavaScript 함수 호출로 변환되어 React 요소를 생성합니다.

## JSX가 JavaScript와 HTML을 통합하는 방법

JSX를 사용하면 JavaScript 로직을 HTML 구조와 원활하게 통합할 수 있습니다. 이 통합은 더 직관적으로 동적 웹 애플리케이션을 구축하는 데 도움이 됩니다. 다음은 JSX의 간단한 예시입니다:

```js
const element = <h1>Hello, world!</h1>;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 JSX 코드가 다음으로 변환됩니다:

```js
const element = React.createElement("h1", null, "Hello, world!");
```

## JSX 사용의 장점

1. 가독성과 유지보수성: JSX를 사용하면 마크업과 로직을 한 곳에 모아 코드를 더 읽기 쉽게 만들 수 있습니다. 이는 UI 구조와 관련 로직을 함께 볼 수 있어 이해와 유지보수가 쉬워집니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

2. 개발자 경험: JSX는 UI 구성 요소를 작성하는 더 직관적인 방법을 제공합니다. JSX 내에서 JavaScript의 모든 기능을 활용할 수 있으며, 반복문, 조건문 및 변수 선언을 포함할 수 있습니다.

3. 강력한 추상화: JSX는 React.createElement() 호출을 추상화하여 코드를 덜 장황하고 더 선언적으로 만듭니다. 이 추상화는 더 깔끔하고 표현력이 높은 코드를 작성할 수 있도록 돕습니다.

4. 도구 및 생태계: JSX는 다양한 도구와 편집기에서 지원되며, 구문 강조, 오류 확인 및 자동 완성 기능을 제공하여 개발자 경험을 향상시킵니다.

## JSX 동작 예시

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

1. JSX에서 표현식 삽입하기

JSX 내에서는 중괄호 `''`로 둘러싸면 어떤 JavaScript 표현식이든 포함할 수 있습니다. 변수, 함수 호출 등을 포함합니다.

```js
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

이 예시에서는 `name` 변수의 값이 JSX에 동적으로 삽입됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### 2. JavaScript 함수와 함께 JSX 사용하기

JSX를 사용하면 JavaScript 함수를 사용하여 요소를 생성할 수 있습니다.

```js
function formatName(user) {
 return user.firstName + ‘ ‘ + user.lastName;
}

const user = {
 firstName: 'John',
 lastName: 'Doe'
};

const element = <h1>Hello, {formatName(user)}!</h1>;
```

여기서 `formatName` 함수는 JSX 내에서 호출되어 개인화된 인사말을 생성합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### 3. JSX를 사용한 조건부 렌더링

JSX 내에서 JavaScript의 조건부 연산자를 사용하여 요소를 조건부로 렌더링할 수 있습니다.

```js
const isLoggedIn = true;
const element = <div>{isLoggedIn ? <h1>어서 오세요!</h1> : <h1>로그인해주세요.</h1>}</div>;
```

이 예제는 `isLoggedIn` 상태에 따라 다른 요소를 렌더링하는 삼항 연산자를 사용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### 4. JSX에서 반복문

`map()`과 같은 JavaScript 배열 메소드를 사용하여 요소 목록을 렌더링할 수 있습니다.

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li key={number}>{number}</li>);
const element = <ul>{listItems}</ul>;
```

이 경우 `map()` 함수는 숫자 배열에서 `li` 요소 목록을 생성하는 데 사용됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### 5. JSX를 사용하여 컴포넌트 생성하기

JSX는 일반적으로 React 컴포넌트 내에서 사용됩니다. 다음은 간단한 컴포넌트 예제입니다:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
```

이 예제는 `name` prop을 받아 인사 메시지를 렌더링하는 `Welcome` 컴포넌트를 정의합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 결론

JSX는 JavaScript와 HTML의 장점을 결합하여 UI 구성 요소를 구축하는 직관적이고 효율적인 방법을 제공하는 React의 강력한 기능입니다. 읽기 쉬움, 사용하기 쉬움, 그리고 JavaScript와의 원활한 통합성은 개발자들 사이에서 인기를 얻고 있습니다. JSX를 활용함으로써 유지보수가 쉽고 표현력이 풍부한 코드를 작성할 수 있어 최종적으로 개발 워크플로우와 응용프로그램 품질을 향상시킬 수 있습니다.

초보자든 경험 많은 개발자이든 JSX를 이해하고 활용함으로써 React 개발 환경을 크게 향상시킬 수 있습니다. 그러니 다음 React 프로젝트에서 JSX의 가능성을 탐험하고 시작해보세요!
