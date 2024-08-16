---
title: "접근성을 고려해서 리액트 웹사이트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-AccessibilityinReactjs_0.png"
date: 2024-05-12 19:46
ogImage: 
  url: /assets/img/2024-05-12-AccessibilityinReactjs_0.png
tag: Tech
originalTitle: "Accessibility in Reactjs?"
link: "https://medium.com/@thevinaysingh/accessibility-in-reactjs-991571d80e53"
isUpdated: true
---



주요 개념 및 접근성 사용 방법

## React.js에서의 접근성(a11y)은 능력에 관계없이 모든 사람이 이해하고 상호 작용할 수 있는 사용자 인터페이스를 만드는 것입니다.

이는 스크린 리더, 키보드 탐색 또는 음성 제어와 같은 보조 기술을 사용하는 사람들을 포함합니다.

다음은 React에서의 접근성에 대한 주요 개념을 설명합니다:

## 1. 시멘틱 HTML

- 'h1' 태그는 제목에, 'button' 태그는 버튼에, 'nav' 태그는 내비게이션에 등 세맨틱 HTML 요소를 사용하여 컴포넌트를 구축하세요. 이러한 요소들은 보조 기술 및 브라우저에 의미를 전달합니다.

```js
<header> {/* 시맨틱 헤더 요소 */}
    <h1>Main Title of the Page</h1> {/* 시맨틱 헤딩 요소 */}
</header>

<main>
    <p>The main content of your webpage goes here</p> {/* 시멘틱 단락 요소 */}
</main>

<footer> {/* 시멘틱 푸터 요소 */}
   <p>Copyright information and other footer related stuff</p>
</footer>
```

## 2. ARIA 속성

- 때로는 의미 있는 HTML 만으로 충분하지 않을 수도 있습니다. 보조 기술을 위한 추가 정보를 제공하려면 ARIA (접근 가능한 리치 인터넷 애플리케이션) 속성을 사용하세요. 이미지를 설명하는 데 aria-label을 사용하거나 입력 필드에 설명을 연결하는 데 aria-describedby를 사용할 수 있습니다.
- HTML로는 원하는 기능을 달성할 수 없는 경우에는 접근성 리치 인터넷 애플리케이션(WAI-ARIA) 역할 및 속성을 사용하세요.

```js
function ImageWithDescription() {
  return (
    <div>
    <button aria-label="닫기" onClick={this.close}>
    X
    </button>
    <img
      src="이미지.jpg"
      alt="설명적 이미지 대체 텍스트"  {/* 설명적 대체 텍스트 */}
      aria-describedby="imageDescription"  {/* 설명과 연결 */}
    />
    </div>
  );
}
```

## 3. 키보드 탐색

- 애플리케이션이 키보드를 사용하여 완전히 탐색 가능하도록 보장하세요. 이는 사용자가 버튼, 링크 및 폼 필드와 같은 초점 가능 요소를 탭할 수 있게 하는 것을 의미합니다. onFocus 및 onBlur와 같은 이벤트 핸들러를 사용하여 초점 상태를 관리하고 시각적 단서를 제공하세요.

```js
함수 FocusableButton({ onClick }) {
  return (
    <button type="button" onFocus={() => console.log("Button Focused")} onClick={onClick}>
      Click me
    </button>
  );
}
```

## 4. 스크린 리더 지원

- 컴포넌트에 대한 명확하고 간결한 텍스트 설명에 중점을 두세요. 설명적인 링크 텍스트를 사용하고 정보 전달에 색상에만 의존하지 마세요. 스크린 리더는 내용을 텍스트로 제시하기 때문에 구조화되고 이해하기 쉬운 내용임을 보장하세요.

```js
함수 ErrorMessage({ message }) {
  return (
    <div role="alert" aria-live="assertive">  {/* 에러를 발표함 */}
      {message}
    </div>
  );
}
```

## 5. 초점 제어

- 키보드만 사용하는 사용자가 컴포넌트에서 요소 포커스를 관리하여 애플리케이션을 탐색할 수 있게 합니다. autoFocus 속성을 사용하면 컴포넌트가 마운트될 때 특정 요소에 포커스를 주는 예입니다.

```js
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <input
        type="text"
        ref={(input) => {
          this.textInput = input;
        }} // ref 할당
      />
    );
  }
}
```

## 6. 테스팅 및 유효성 검사:

- 리액트 애플리케이션의 접근성을 테스트하고 유효성을 검사하는 다양한 도구와 기술이 있어요. 브라우저 개발자 도구를 사용하여 접근성 트리를 확인하고 잠재적인 문제를 식별할 수 있어요. 게다가 개발 중에 접근성 검사를 자동화할 수 있는 react-axe와 같은 라이브러리를 고려해 보세요.
- 대부분의 접근성 문제는 정적 분석 도구를 통해 발견할 수 있지만, 수동 테스트와 유효성 검사도 중요해요. 왜냐하면 접근성은 단순히 규칙 목록을 충족하는 것 이상이기 때문이에요.

## 7. 이미지의 Alt 속성

이미지에 유용하고 설명적인 대체 텍스트를 항상 제공해 주세요.

```js
<img src={logo} alt="로고 설명" />
```

## 8. 접근성 있는 양식 만들기

모든 양식 요소에는 명확하고 접근성 있는 라벨이 있어야 합니다.

```js
<label htmlFor='name'> 이름 </label>
<input type='text' id='name' name='name' />
```

## 9. 접근성 있는 색상과 대비

- 모든 사람이 내용을 완전히 읽을 수 있도록 색상과 대비에 주의하세요. WCAG2는 특정 대비 및 텍스트 크기 가이드라인을 제공합니다.

## 10. React 프래그먼트

여러 요소를 그룹화하고 DOM에 추가 노드를 만들지 않으려면 React 프래그먼트(`/` 또는 `React.Fragment`)를 사용하세요. 이는 스크린 리더 사용자를 위해 깔끔한 문서 개요를 유지하는 데 도움이 됩니다.

```js
<>
  <ChildA />
  <ChildB />
  <ChildC />
</>
```

## 11. React 접근성 린터

eslint-plugin-jsx-a11y와 같은 도구를 사용하면 따를 수 있는 일련의 접근성 관련 규칙을 강제로 적용할 수 있습니다.

# 몇 가지 출처

React에서 접근성에 대해 시작할 수 있는 몇 가지 리소스입니다:

- React 웹 접근성 문서: https://legacy.reactjs.org/docs/accessibility.html
- MDN Web Docs — React에서의 접근성: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
- A11y Project: https://www.a11yproject.com/pen_spark
