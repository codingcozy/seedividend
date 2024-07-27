---
title: "모듈 페더레이션에서 범위 지정된 스타일 관리하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ManagingScopedStylesinModuleFederation_0.png"
date: 2024-06-22 03:46
ogImage: 
  url: /assets/img/2024-06-22-ManagingScopedStylesinModuleFederation_0.png
tag: Tech
originalTitle: "Managing Scoped Styles in Module Federation"
link: "https://medium.com/@alpgokcek/managing-scoped-styles-in-module-federation-9879b25b0746"
---


<img src="/assets/img/2024-06-22-ManagingScopedStylesinModuleFederation_0.png" />

현대 웹 개발 세계에서, 마이크로 프론트엔드가 점점 더 인기를 얻고 있습니다. 마이크로 프론트엔드를 가능하게 하는 주요 기술 중 하나는 Webpack의 Module Federation입니다. 이 기능을 통해 다른 Webpack 빌드가 런타임에서 함께 작동하고 코드를 공유할 수 있습니다. 그러나 Module Federation 애플리케이션에서 CSS를 관리하는 것은 어려운 과제일 수 있습니다.

이 글에서는 우리가 이러한 CSS 도전 과제를 어떻게 처리했는지 설명하겠습니다. 우리가 사용한 전략과 개발한 사용자 정의 PostCSS 플러그인을 공유할 것입니다. 우리의 접근 방식을 공유함으로써, 우리의 마이크로 프론트엔드 프로젝트에서 비슷한 문제에 직면한 다른 개발자들에게 도움이 되기를 희망합니다.

# CSS 도전적 과제

<div class="content-ad"></div>

CSS에 대해 이야기할 때, 전통적인 스타일 포함 방법은 갈등과 일관성 부족으로 이어질 수 있습니다. 이는 여러 팀이 다른 CSS 방법론, 전처리기 또는 프레임워크를 사용할 수 있는 모듈 연합 설정에서 특히 문제가 될 수 있습니다. 주요 도전 과제는 다음과 같습니다:

- CSS 범위 격리: 서로 다른 마이크로 프론트엔드 간의 스타일 충돌을 피하는 것.
- CSS 로딩 순서: 스타일이 올바른 순서로 로드되도록 보장하는 것.
- 공유 스타일: 서로 다른 마이크로 프론트엔드 간에 공유되는 일반적인 스타일을 관리하는 것.

저희 프로젝트에서는 Tailwind CSS 프레임워크를 사용하고 있었습니다. Tailwind를 마이크로 프론트엔드 애플리케이션에 통합할 때, 원치 않는 화면이 발생하는 충돌이 있었던 일이 있습니다.

# 초기 해결책: 접두사 추가

<div class="content-ad"></div>

가장 간단한 해결책은 각 클래스명에 접두사를 추가하는 것이었습니다. Tailwind의 구성에서 접두사를 추가할 수 있는 옵션이 있습니다:

```js
module.exports = {
  prefix: 'app1-',
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,tsx,html}', './src/**/*.{js,ts,tsx,html}']
}
```

그러나 이 방식으로 구성하려면 모든 클래스명을 접두사로 시작하도록 변경해야 했습니다:

```js
<!-- 변경 전 -->
<div className="flex gap-3 mb-2 w-full"/>

<!-- 변경 후 -->
<div className="app1-flex app1-gap-3 app1-mb-2 app1-w-full"/>
```

<div class="content-ad"></div>

이 접근 방식은 작동했지만 코드 작성과 유지 관리가 어려워졌어요. 예를 들어, 접두사를 추가하는 걸 잊고 이런 경우에 이슈를 찾으려고 했어요. 우리는 다른 해결책이 필요했어요.

# 우리의 해결책: 사용자 정의 PostCSS 플러그인

더 우아하게 이 문제를 해결하기 위해 우리는 모든 CSS 선택기를 특정 부모 선택기로 래핑하는 사용자 정의 PostCSS 플러그인을 개발했어요. 이렇게 함으로써 스타일이 특정한 마이크로 프런트엔드에 대해 스코프가 지정되어 애플리케이션의 다른 부분과 충돌하는 것을 방지했어요.

## 사용자 정의 PostCSS 플러그인 예시

<div class="content-ad"></div>

우리가 만든 사용자 정의 PostCSS 플러그인을 보여드릴게요:

```js
// postcss.config.js
const tailwindcss = require('tailwindcss');
const wrapSelector = (opts = {}) => ({
  postcssPlugin: 'wrap-selector',
  Once(root) {
    root.walkRules((rule) => {
      if (!rule.selectors) return rule;
      rule.selectors = rule.selectors.map((selector) => `${opts.wrapper} ${selector}`);
    });
  },
});
wrapSelector.postcss = true;

module.exports = {
  plugins: ['postcss-preset-env', tailwindcss, wrapSelector({ wrapper: '#app1-id' })],
};
```

## 작동 방법

- 플러그인 정의: wrapSelector 함수는 PostCSS 플러그인으로 정의됩니다. opts 객체를 입력값으로 받아들이는데, 이 객체에는 기존 CSS 선택자 주변에 감쌀 부모 선택자인 wrapper 속성이 포함되어 있습니다.
- 규칙 탐색: Once 메서드는 모든 CSS 규칙을 탐색합니다. 선택자가 있는 각 규칙마다 해당하는 wrapper와 함께 접두어를 붙인 새 선택자로 매핑합니다.
- PostCSS 설정: 이 플러그인은 postcss-preset-env 및 tailwindcss와 같은 다른 플러그인과 함께 PostCSS 구성에 포함됩니다.

<div class="content-ad"></div>

# 모듈 연합에서의 사용법

이 사용자 지정 PostCSS 플러그인을 모듈 연합 설정에서 사용하려면 다음 단계를 따르세요:

- PostCSS 구성: 위에 표시된대로 사용자 지정 플러그인이 포함된 PostCSS 구성을 확인하십시오.
- 스코프 스타일 적용: CSS 선택자를 래핑하여 마이크로 프론트엔드 애플리케이션에서 스타일이 적절히 스코프화되도록합니다.

## 웹팩에서의 구성 예시

<div class="content-ad"></div>

웹팩 구성에 PostCSS 플러그인을 통합하는 방법은 다음과 같습니다:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
};
```

## 리액트 컴포넌트에서의 예시 사용법

```js
import React from 'react';

const App = () => {
  return (
    <div id="app1-id">
      <h1 className="text-2xl font-bold">안녕하세요, App 1에서 인사드립니다</h1>
    </div>
  );
};

export default App;
```

<div class="content-ad"></div>

# 결론

Module Federation 애플리케이션에서 CSS를 다루려면 범위 격리, 로딩 순서 및 공유 스타일을 신중히 고려해야 합니다. 위에서 소개한 것과 같이 커스텀 PostCSS 플러그인을 활용하여 CSS를 효과적으로 관리하고 스타일이 개별 마이크로 프론트엔드에 적절하게 스코프되도록 할 수 있습니다. 이 접근 방식을 통해 마이크로 프론트엔드 애플리케이션에서 모듈식이며 충돌이 없는 CSS 아키텍처를 유지할 수 있습니다.