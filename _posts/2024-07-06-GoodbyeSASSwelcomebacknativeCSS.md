---
title: "안녕 SASS , 다시 만난 native CSS 이유와 방법"
description: ""
coverImage: "/assets/img/2024-07-06-GoodbyeSASSwelcomebacknativeCSS_0.png"
date: 2024-07-06 02:19
ogImage:
  url: /assets/img/2024-07-06-GoodbyeSASSwelcomebacknativeCSS_0.png
tag: Tech
originalTitle: "Goodbye SASS 👋, welcome back native CSS"
link: "https://medium.com/@karstenbiedermann/goodbye-sass-welcome-back-native-css-b3beb096d2b4"
---

/assets/img/2024-07-06-GoodbyeSASSwelcomebacknativeCSS_0.png

Sass는 로컬에 설치된 강력한 전처리기로 자리를 잡았으며, 10년 이상에 걸쳐 제 프로젝트의 기반을 형성했습니다. 이를 통해 저는 확장 가능하고 안정적인 CSS 패키지를 효율적으로 구성할 수 있었습니다. 오늘날에도 Sass를 극히 강력한 도구로 여기고 있습니다. 그러나 우리가 2024년으로 발걸음을 옮기면, CSS가 빠르게 발전했다는 것은 부인할 수 없습니다. Sass에만 있던 기능들이 변수와 최신 강조: CSS 중첩도 포함하여 CSS에 네이티브로 통합되었습니다.

# 변수

```js
:root {
  --button-padding: 10px 20px;
  --button-bg-color: #007bff;
  --button-text-color: #ffffff;
  --button-border-radius: 8px;
}

.button {
  padding: var(--button-padding);
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border-radius: var(--button-border-radius);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
```

<div class="content-ad"></div>

변수 정의는 오랫동안 SCSS의 독특한 강점으로 여겨졌으며 많은 속성을 중앙에서 관리할 수 있도록 허용하여 오랫동안 CSS에서 간젝했던 기능이었습니다. 그러나 오늘날에는 CSS에서도 Sass와 유사한 방식으로 변수를 정의할 수 있습니다. 하지만 중요한 차이는 Sass 변수가 전처리기 컨텍스트 내에서만 존재하는 반면 CSS 변수는 브라우저에서도 사용할 수 있으며 심지어 JavaScript를 통해 동적으로 덮어쓸 수 있다는 것입니다.

# CSS 중첩

```js
.blog {
  position: relative;
  padding: 1rem;
  background: var(--neutral-100);

    .blog-item {
      border: 1px solid var(--neutral-200);

      & span {
        font-size: 1rem;
      }
  }
}
```

하위 요소나 가상 선택자에 동일한 선택기를 반복적으로 사용하는 대신, 다른 요소의 스타일 규칙을 부모 선택기 내에 정의할 수 있는 능력은 CSS 작성을 상당히 단순화시킵니다. 중첩을 사용하면 부모 선택기 내에 이러한 요소들을 그룹화할 수 있습니다. 이 기술은 코드를 명료하게 만들고 계층 구조적이며 효율적인 코드베이스로 이어집니다.

<div class="content-ad"></div>

CSS 중접과 중첩 선택자의 브라우저 지원률이 각각 84%와 86%로 높아져, 이 기술이 점점 더 접근성이 높아지고 있어요.

# :is 가상 클래스

```js
:is(selector1, selector2, selector3) {
  /* 스타일 */
}
```

:is 가상 클래스는 선택자 개념을 혁신적으로 변경하여 여러 선택자의 목록을 받아들이고 이 중 어느 것이든 일치하는 모든 요소에 스타일을 적용합니다. 이는 DOM에서 요소를 선택하고 스타일을 적용하는 것을 크게 용이하게 만들어 줘요.

<div class="content-ad"></div>

긴 선택자 목록 대신 :is()를 사용하여 가독성을 높이고 긴 선택자를 피할 수 있어요.

## :has() 가상 클래스

```js
.hero:has(.hero-button) {
  background-color: var(--accent-50);
}
```

CSS 가상 클래스인 :has()는 자손에 기반한 요소를 선택하는 강력한 방법을 제공하며, 조건부 스타일 적용과 유사합니다.

<div class="content-ad"></div>

# 컨테이너 쿼리

```js
.component {
  --theme: dark;
  container-name: fancy;
}

@container fancy style(--theme: dark) {
  .fancy {
    /* dark styles. */
  }
}
```

```js
.parent-container {
  container-type: inline-size;

  .headline {
    font-size: 2rem;
  }

  @container (width >= 720px) {
    .headline {
      font-size: 2.5rem;
    }
  }
}
```

컨테이너 쿼리는 CSS3 이후의 가장 혁신적인 웹 디자인 기술로 간주됩니다. 반응형 디자인의 개념을 확장하여 요소가 자신의 컨테이너 크기에 따라 조정되도록 합니다. 이 기술은 요소의 디자인을 동적으로 변경하여 컨텍스트에 따라 적응적이고 유연한 디자인을 가능하게 합니다.

<div class="content-ad"></div>

만약 container에 fancy라는 변수가 있고 theme이 dark일 경우, 다음 CSS를 추가해주세요.

# Cascade layers

```js
@layer utilities {
  .button {
    padding: 0.5rem;
  }

  .button--lg {
    padding: 0.8rem;
  }
}
```

카스케이드 레이어를 사용하면 클래스, ID 등을 중첩하지 않고도 더 높은 명확성을 갖기 위해 자체 레이어(layer)를 할당할 수 있습니다. @layer at-rule과 레이어드 @imports를 사용하여 리셋 및 기본값과 같은 낮은 우선순위 스타일부터 테마, 프레임워크, 디자인 시스템을 거쳐 구성 요소, 유틸리티, 재정의와 같은 가장 높은 우선순위 스타일까지 자체 카스케이드 레이어를 구축할 수 있습니다. 카스케이드 레이어는 더 많은 제어를 제공합니다.

<div class="content-ad"></div>

# Sass의 미래

이것은 Sass가 사용되지 않게 된 것을 의미합니까? 전혀 그렇지 않습니다. Mixin과 함수, 예를 들어 픽셀을 rem 단위로 변환하는 등의 기능은 Sass의 대체할 수 없는 장점입니다. 그럼에도 불구하고 저는 대부분의 프로젝트에서 Sass를 버리기로 결정했습니다. 대신 Sublime Editor에서 미리 정의된 코드 블록과 패키지를 사용하여 작업 흐름이 크게 개선되었습니다.

# 안녕히 가라, SASS?

2024년부터는 Sass의 혜택인 설치, 사용 및 컴파일 문제들이 더 이상 그 사용을 정당화하지 못할 것이라고 확신합니다. 현대 CSS의 확장성과 사용자 친화성을 고려하면 추가 도구 없이도 충분히 작업할 수 있습니다.

<div class="content-ad"></div>

저의 Themex 프로젝트는 새로운 CSS 기능들을 조합했을 때 얼마나 강력한지 보여줍니다: [https://app.themexproject.com](https://app.themexproject.com)

CSS의 발전으로, 작은 프로젝트부터 큰 프로젝트까지 직접적이고 간단하게 구현하는 것을 기대하고 있습니다.

안녕 Sass, 그리고 감사합니다!

![이미지](https://miro.medium.com/v2/resize:fit:1000/1*zE69ta024X0m4DJM4jRXlQ.gif)

<div class="content-ad"></div>

친구야, 원래는 2024년 3월 20일에 https://dev.to에서 발행되었어.
