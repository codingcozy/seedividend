---
title: "구체적인 기술 명시- Vanilla 웹 컴포넌트 구현하는 방법 버전 또는 연도 포함- 2024년 Vanilla 웹 컴포넌트 구현 특정 기능 또는 방법 강조- Vanilla 웹 컴포넌트를 구현하는 쉬운 방법 비교 또는 대조- Vanilla 웹 컴포넌트와 ReactJS 어떤 것이 더 좋은 선택인가 목록 제공- Vanilla 웹 컴포넌트를 구현할 때 알아두면 좋은 10가지 팁"
description: ""
coverImage: "/assets/img/2024-07-06-ImplementationVanillaWebComponents_0.png"
date: 2024-07-06 02:13
ogImage:
  url: /assets/img/2024-07-06-ImplementationVanillaWebComponents_0.png
tag: Tech
originalTitle: "Implementation: Vanilla Web Components"
link: "https://medium.com/@javarome/implementation-vanilla-web-components-66347b4dafca"
---

## 일반적인 방식으로 진행해 보세요

웹 컴포넌트는 프레임워크 대신 표준 API에 의존하는 좋은 방법입니다... 단, 웹 컴포넌트 프레임워크에 의존하지 않는 경우라면요 🤯

# 그게 뭔가요?

웹 컴포넌트는 사용자 지정 요소, 즉 제작한 HTML 태그로서 구현을 제공하는 요소입니다. 다른 태그와 마찬가지로 일반적으로 컴포넌트에 특화된 "서브-DOM"에서 자체 HTML 템플릿을 정의하는 것을 의미합니다. 이 DOM은 일반 DOM에서 접근할 수 없으므로 "그림자 DOM"(shadow DOM)이라고 하고, 일반 DOM을 "라이트 DOM"(light DOM)이라고 합니다.

<div class="content-ad"></div>

/assets/img/2024-07-06-ImplementationVanillaWebComponents_0.png

아래에서는 의도적으로 `my-component`라는 웹 구성 요소를 만드는 방법을 설명하겠습니다.

# 인스턴스화

사용자 지정 요소 인스턴스를 인스턴스화 하는 것은 문서에 네 사용자 정의 태그로 요소를 생성하도록 요청하는 것입니다. 이 작업은 선언적으로 수행할 수도 있습니다(닫히는 태그를 잊지 마세요):

<div class="content-ad"></div>

```js
<my-component></my-component>
```

또는 프로그래밍 방식으로:

```js
const compInstance = document.createElement("my-component");
```

그러면 이제 이를 다른 HTML 요소처럼 사용할 수 있습니다. 예를 들어:

<div class="content-ad"></div>

```js
document.body.append(compInstance);
compInstance.classList.add("warning");
```

하지만 문서가 이러한 태그를 생성하도록 요청받을 때 무엇을 해야 하는지 알 때까지는 작동하지 않습니다. 이것은 두 가지 준비 단계를 의미합니다:

- 커스텀 엘리먼트 구현;
- 이 구현을 사용자 정의 태그와 연관시키기.

# 구현

<div class="content-ad"></div>

"autonomous" 커스텀 엘리먼트를 정의하는 것은 기본 HTMLElement 클래스를 확장하는 것만으로도 간단합니다:

```js
class MyComponentElement extends HTMLElement {}
```

그러니 이제 당신은 다음을 알게 되었습니다:

```js
const compInstance = document.createElement("my-component");
```

<div class="content-ad"></div>

`MyComponentElement` 인스턴스가 반환될 것입니다. 또한 `createElement` API가 생성자 인수를 사용하지 않는다는 것을 알았는데, 이는 모든 사용자 정의 요소 (그리고 일반적으로 모든 요소)가 기본 생성자만 가질 수 있다는 것을 의미합니다.

## 초기화 방법

그렇다면 어떻게 생성 인수를 제공할까요? 다른 태그와 마찬가지로 속성을 사용하면 됩니다:

```js
compInstance.setAttribute("myprop", "propValue");
```

<div class="content-ad"></div>

그리고 속성은 변경될 수 있으므로, 그것들을 듣는 게 좋아요:

```js
class MyComponentElement extends HTMLElement {
  static observedAttributes = ["myprop"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "myprop") {
      this.myRenderingAgainUsing(newValue);
    }
  }
}
```

하지만 속성은 문자열만 될 수 있다는 말이죠? 만약에 복잡한 객체를 컴포넌트에 제공해야 한다면 어떡해요?

사실, 컴포넌트에서 공개 API를 정의하고 호출하는 데 아무런 장애물은 없어요. 예를 들어:

<div class="content-ad"></div>

```js
class MyComponentElement extends HTMLElement {
  setComplexObject(obj) {
    this.myRenderingAgainUsing(obj);
  }
}

const compInstance = document.createElement("my-component");
compInstance.setComplexObject(new ComplexObject());
```

마지막으로, 모든 이 생성 + 초기화 작업은 편리한 유틸리티 함수에 캡슐화될 수 있습니다. 이 함수는 컴포넌트의 코드 내에 있을 수도 있고 밖에 있을 수도 있습니다:

```js
class MyComponentElement extends HTMLElement {
  /**
   * @param {string} propValue
   * @param {ComplexObject} obj
   * @return MyComponentElement
   */
  static create(propValue, obj) {
    const instance = document.createElement("my-component");
    instance.setAttribute("myprop", propValue);
    instance.setComplexObject(obj);
    return instance;
  }
}
```

## 템플릿

<div class="content-ad"></div>

이 기사 초반에 언급된 대로, 웹 컴포넌트는 보통 자체 shadow DOM이 있습니다. 외부에서 접근할 수 없도록 하려면 이를 닫아두세요:

```js
class MyComponentElement extends HTMLElement {
  constructor() {
    this.shadow = this.attachShadow({ mode: "closed" });
  }
}
```

이 shadow DOM은 보통 템플릿을 통해 컴포넌트의 내부 HTML 내용으로 채워집니다:

```js
const template = document.createElement("template");
template.innerHTML = `<input><br>`;
this.shadow.appendChild(template.content.cloneNode(true));
```

<div class="content-ad"></div>

## 스타일

일반적으로 내부 DOM의 스타일은 템플릿의 `style` 태그를 통해 제공됩니다:

```js
template.innerHTML = `<style>input{color:red}</style><input><br>
```

그렇다고 해서 외부 CSS 파일에서 해당 스타일을 불러올 수 없는 것은 아닙니다. 어떤 파일이든 가져올 수 있는 능력 덕분에 가능합니다. 그러나 JavaScript로 구문 분석되지 않도록 하려면 해당 파일을 원시 파일로 가져와야 합니다 (또는 import assertions를 사용해야 합니다):

<div class="content-ad"></div>

```js
import style from "./MyCustomComponent.css?raw"

template.innerHTML = `<style>${style}</style><input><br>
```

# 등록

우리의 사용자 정의 요소 클래스가 정의되었으므로, 이를 우리의 사용자 정의 태그 이름과 연결할 수 있습니다. 이를 통해 문서는 해당 태그를 만날 때 어떤 클래스를 인스턴스화해야 하는지 알 수 있습니다:

```js
customElements.define("my-component", MyComponentElement);
```

<div class="content-ad"></div>

물론, 이것을 한 번만 해야 합니다. 이 코드를 여러 번 실행해야 하는 경우, 한 번만 실행되도록 확인해야 합니다:

```js
if (!customElements.get("my-component")) {
  customElements.define("my-component", MyComponentElement);
}
```

# 결론

이것은 브라우저에 이미 있는 표준 API만으로 웹 컴포넌트를 만드는 기본적인 단계입니다.

<div class="content-ad"></div>

더 심화된 주제에 대해 설명할 수 있어요, 예를 들면:

- 웹 컴포넌트가 사용되는 폼이나 스타일링에서 사용될 수 있는 사용자 지정 상태를 갖는 방법;
- 웹 컴포넌트가 양식 유효성 검사에 참여하는 방법;
- 웹 컴포넌트 템플릿이 슬롯을 포함하여 제3자 HTML로 채워질 수 있는 방법;
- 웹 컴포넌트의 스타일이 외부에서 사용자 지정되는 방법 (CSS 변수 및/또는 스타일링 "파트" 사용);
- "내장" 웹 컴포넌트가 표준 요소 (HTMLElement 이외)의 특수화로 정의되는 방법 ("is" 표준 속성 사용).
