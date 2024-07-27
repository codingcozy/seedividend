---
title: "Tailwind CSS vs SCSS 유틸리티 퍼스트와 전처리기 접근 방식 비교"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-TailwindCSSvsSCSSAComparisonofUtility-FirstandPreprocessorApproaches_0.png"
date: 2024-07-09 13:54
ogImage:
  url: /assets/img/2024-07-09-TailwindCSSvsSCSSAComparisonofUtility-FirstandPreprocessorApproaches_0.png
tag: Tech
originalTitle: "Tailwind CSS vs. SCSS: A Comparison of Utility-First and Preprocessor Approaches"
link: "https://medium.com/@muzammilsyed270300/tailwind-css-vs-scss-a-comparison-of-utility-first-and-preprocessor-approaches-1d0be4cc0bbd"
---

![이미지](/ui-log-2/assets/img/2024-07-09-TailwindCSSvsSCSSAComparisonofUtility-FirstandPreprocessorApproaches_0.png)

웹 개발자라면 SCSS와 Tailwind CSS를 사용해 본 적이 있거나 들어본 적이 있을 것입니다. 이 두 가지는 웹 페이지 스타일링을 위한 인기 있는 도구입니다. 그러나 각기 다른 기능과 방식을 가지고 있습니다. 이 게시물에서는 둘을 비교하고 왜 Tailwind CSS가 프로젝트에 SCSS보다 더 나은 선택인지 보여 드리겠습니다.

# SCSS란?

SCSS는 Sassy CSS의 약어로 CSS의 기능을 변수, 믹스인, 함수 및 중첩과 같은 기능으로 확장하는 CSS 전처리기입니다. CSS 전처리기는 브라우저가 이해할 수 있는 일반 CSS로 컴파일할 때 CSS를 더 강력하고 표현력 있게 작성할 수 있도록 해주는 도구입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# SCSS를 사용하는 이유

SCSS를 사용하는 사람들은 다양한 이유로 사용하지만, 그 중 일부 주요 이유는 다음과 같습니다:

- 중첩(Nesting): SCSS를 사용하면 다른 선택자 내에 선택자를 중첩하여 작성할 수 있기 때문에 복잡한 스타일시트를 작성하고 읽기 쉽게 만들 수 있습니다. 반면 CSS는 각 선택자를 따로 작성해야 합니다. 예를 들어 다음과 같이 작성할 수 있습니다:

```js
.parent {
  background-color: blue;

  &:hover {
    background-color: red;
  }

  .child {
    margin: 2rem;
    color: green;
  }
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 변수: SCSS와 CSS 모두 색상, 글ꔰ 사이즈, 간격 등과 같이 자주 사용되는 값을 저장하는 변수를 정의할 수 있습니다. 그러나 SCSS 변수는 전처리, 명령형 동작, 색상 계산과 같은 고급 기능을 제공하여 이점을 제공합니다. 예를 들면:

```js
$white: #ffffff;
$ubuntu-font: "Ubuntu", "Arial", "Helvetica", sans-serif;
$base-color: #ff0000;
$border-dark: darken($base-color, 20%);

body {
  color: $white;
  font: $ubuntu-font;
  border: 1px solid $border-dark;
}
```

- 믹싱: SCSS를 사용하면 믹싱을 사용하여 재사용 가능한 코드 조각을 만들 수 있습니다. 이는 프로그래밍 언어에서 함수와 같습니다. CSS는 이 기능을 제공하지 않습니다. 예를 들면:

```js
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- Partial 및 Import: SCSS를 사용하면 스타일시트를 부분 파일로 나눌 수 있는데, 이는 밑줄(\_)로 시작하는 파일인 파셜 파일을 사용합니다. 그런 다음 @import 지시문을 사용하여 이러한 partial을 주요 스타일시트에 가져올 수 있습니다. 이를 통해 코드를 조직화하고 반복을 피할 수 있습니다. CSS는 이러한 기능을 지원하지 않습니다. 예를 들어:

```js
// _variables.scss
$primary-color: #ff0000;
$secondary-color: #00ff00;
$tertiary-color: #0000ff;
```

```js
// main.scss
@import "variables";

body {
  background-color: $primary-color;

  h1 {
    color: $secondary-color;
  }

  p {
    color: $tertiary-color;
  }
}
```

- 상속 및 연산자: SCSS를 사용하면 @extend 지시문을 사용하여 다른 선택자에서 스타일을 상속할 수 있으며, 이는 코드 중복을 피하는 데 도움이 됩니다. 또한 SCSS는 +, -, \*, /, % 및, or, and, not와 같은 산술 및 논리 연산자를 지원하여 스타일과 연산 및 비교를 수행할 수 있습니다. CSS에는 이러한 기능이 없습니다. 예를 들어:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

.error {
border: 1px solid red;
color: red;
}
.warning {
@extend .error;
color: orange;
}

.success {
@extend .error;
color: green;
}

.container {
width: 100% / 3 - 20px;
height: 50% + 10px;
}

@media (min-width: 768px) and (max-width: 1024px) {
.container {
width: 50% - 10px;
}
}

# SCSS의 단점은 무엇인가요?

- 도구 의존성: SCSS는 CSS로 컴파일하기 위해 전처리기가 필요하며, 이는 개발 프로세스에 추가 단계가 필요하다는 것을 의미합니다. 이 도구 의존성은 프로젝트 설정 및 유지 관리를 복잡하게 할 수 있습니다.
- 디버깅 복잡성: SCSS로 생성된 CSS를 디버깅하는 것은 도전적일 수 있습니다. 컴파일된 CSS는 SCSS 소스를 직접 반영하지 않기 때문에 개발 중에 문제를 정확히 파악하기 어렵게 할 수 있습니다.
- 파일 크기: 중첩 및 믹스인과 같은 기능으로 인해 SCSS 파일이 일반 CSS 파일보다 크기가 커질 수 있으며, 이는 로드 시간을 늘릴 수 있습니다.
- 성능 영향: SCSS 파일 전처리의 추가 단계는 빌드 시간에 영향을 줄 수 있으며, 특히 큰 프로젝트에서는 더욱 그렇습니다.
- 빌드 프로세스 의존성: SCSS를 사용하는 프로젝트는 SCSS를 CSS로 컴파일하기 위한 빌드 프로세스에 의존합니다. 이는 개발 워크플로에 복잡성을 추가하며, 추가 구성 및 도구가 필요할 수 있습니다.

# Tailwind CSS란 무엇인가요?

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

테이블 태그를 Markdown 형식으로 변경해주세요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

Tailwind CSS를 사용하여 호버 효과가 있는 카드 컴포넌트를 만드는 방법의 예제입니다:

```js
<figure class="bg-gray-100 rounded-xl p-8 hover:bg-green-600 hover:text-white transition duration-300 ease-in">
  <img class="w-32 h-32 rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 space-y-4">
    <blockquote>
      <p class="text-lg">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div>
        Sarah Dayan
      </div>
      <div>
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
```

# Tailwind CSS가 SCSS를 대체할 수 있는 이유

SCSS가 강력하고 유연하다면, 왜 Tailwind CSS로 전환해야 할까요? 실제로 Tailwind CSS는 SCSS가 할 수 있는 모든 것을 할 뿐만 아니라 더 많은 기능을 제공합니다. 어떻게 할 수 있는지 보여드릴게요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# HTML에서 스타일을 분리하고 싶으세요?

Tailwind CSS를 사용하면 마크업에서 미리 정의된 클래스를 직접 적용하여 HTML 요소에 스타일을 지정할 수 있습니다. 이렇게 하면 사용자 정의 CSS를 작성하지 않고도 원하는 디자인을 구축할 수 있습니다.

그러나 몇몇 사람들은 Tailwind CSS를 좋아하지 않을 수도 있습니다. 왜냐하면 HTML 파일에 너무 많은 클래스를 추가하여 코드를 읽고 유지하기 어렵게 만든다고 생각할 수 있습니다. 그들은 의미있는 클래스 이름을 사용하고 CSS를 별도의 파일에 작성하는 더 전통적인 방법을 선호할 수 있습니다. 다행히 Tailwind CSS는 이 문제를 피할 수 있는 방법을 제공하며 HTML을 깔끔하고 의미 있게 유지할 수 있습니다. 그 중 하나는 CSS 파일에서 @apply 지시문을 사용하여 Tailwind 유틸리티 클래스를 생성한 사용자 정의 클래스에 적용하는 것입니다:

```js
<div class="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
  <div class="flex items-center">
    <img src="avatar.jpg" alt="Avatar" class="w-12 h-12 rounded-full mr-4">
    <div class="text-sm">
      <p class="text-gray-900 font-bold">Jane Doe</p>
      <p class="text-gray-600">janedoe@example.com</p>
    </div>
  </div>
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Follow</button>
</div>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

위와 같이 작성할 수 있습니다:

```js
/* main.css */
.card {
  @apply bg-white shadow-lg rounded-lg p-4 flex items-center justify-between;
}

.card-image {
  @apply w-12 h-12 rounded-full mr-4;
}

.card-info {
  @apply text-sm;
}

.card-name {
  @apply text-gray-900 font-bold;
}

.card-email {
  @apply text-gray-600;
}

.card-button {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded;
}
```

```js
<div class="card">
  <div class="flex items-center">
    <img src="avatar.jpg" alt="Avatar" class="card-image">
    <div class="card-info">
      <p class="card-name">Jane Doe</p>
      <p class="card-email">janedoe@example.com</p>
    </div>
  </div>
  <button class="card-button">Follow</button>
</div>
```

또는, 제가 선호하는 방법으로 HTML 클래스를 접기 또는 숨길 수 있는 코드 편집기 확장 프로그램을 사용할 수 있습니다. VS Code의 Inline-Fold와 같은 기능이 있는 확장 프로그램을 사용하면 코드가 다음과 같이 변환됩니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이렇게 변경해도 좋을 것 같아요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 중첩 없이는 살 수 없나요?

SCSS 사용자들이 좋아하는 기능 중 하나는 중첩입니다. 이를 통해 다른 선택자 내에 중첩된 선택자를 작성할 수 있습니다. 스타일을 마크업으로부터 분리하고 있다면, tailwindcss/nesting 플러그인 덕분에 Tailwind CSS에서도 이 기능을 사용할 수 있습니다. 이 플러그인은 Tailwind CSS 패키지에 직접 포함되어 있으므로, 사용하려면 PostCSS 구성에 추가하기만 하면 됩니다. 예를 들어:

```js
// postcss.config.js
module.exports = {
  plugins: {
    "tailwindcss/nesting": {}, // 이 줄을 추가하세요
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

그러면 Tailwind 유틸리티 클래스와 함께 중첩된 선택자를 작성할 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

.navbar {
@apply bg-gray-900 text-white;

ul {
@apply list-none;

    li {
      @apply inline-block px-4;

      a {
        @apply no-underline text-inherit;

        &:hover {
          @apply text-yellow-500;
        }
      }
    }

}
}

위에서 보듯이 Tailwind CSS는 중첩 사용을 제한하지 않습니다. 사실 중첩을 더 강력하고 유연하게 만듭니다.

# 여러 개의 CSS 파일을 좋아하시나요?

SCSS 사용자들이 즐기는 또 다른 기능은 부분 파일인데, 이를 사용하면 스타일시트를 여러 파일로 분할하고 이를 주 파일에 가져올 수 있습니다. 여러분은 Tailwind CSS로도 이를 할 수 있습니다. 사용법은 다음과 같습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

다음 명령어를 사용하여 이 플러그인을 npm을 통해 설치해주세요:

```js
npm install -D postcss-import
```

그런 다음 PostCSS 구성에서 매우 첫 번째 플러그인으로 추가해주세요:

```js
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {}, // 이 줄을 추가해주세요
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이제 button.css라는 파일을 만들어서 버튼 스타일을 저장할 수 있어요. 아래와 같이요:

```css
/* button.css */
.base-button {
  @apply bg-gray-900 text-white;
}
```

그리고 메인 파일을 이렇게 업데이트할 수 있어요:

```css
/* main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기 보이는 것처럼, Tailwind CSS는 여러 파일을 사용하는 것을 막지 않습니다. 사실, 스타일을 조직화하고 관리하기가 더 쉬워집니다.

# 색상, 글꼴 및 화면 크기를 중앙 집중화하고 싶으신가요?

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

SCSS의 장점 중 하나는 색상, 글꼴, 화면 크기 등과 같이 자주 사용하는 값들을 저장할 수 있는 변수를 정의할 수 있다는 것입니다. Tailwind CSS로도 이를 할 수 있습니다. 필요한 것은 단순히 커스텀 값을 Tailwind 구성에서 테마 객체에 추가하는 것 뿐입니다. 아래와 같이 하면 됩니다:

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: "#00FF00",
      secondary: "#FF0000",
      // ...
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      // ...
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // ...
    },
    // ...
  },
  // ...
};
```

그리고 이를 HTML 파일에서 다음과 같이 사용할 수 있습니다:

```js
<div class="bg-primary text-white font-roboto">
  <p>이것은 커스텀 값입니다</p>
</div>

<div class="lg:bg-secondary">
  <p>이것은 커스텀 브레이크포인트입니다</p>
</div>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

보시다시피, Tailwind CSS는 변수 사용을 제한하지 않습니다. 실제로 변수를 사용하는 것이 더 편리하고 일관성 있게 만들어줍니다.

# 벤더 접두어에 대한 믹스인은 어떻습니까?

SCSS 사용자가 의존하는 기능 중 하나는 mixins입니다. 이는 재사용 가능한 코드 조각으로 스타일 시트 전체에서 사용할 수 있는 기능입니다. 믹스인의 일반적인 사용 사례 중 하나는 모든 브라우저에서 완전히 지원되지 않는 CSS 속성에 벤더 접두어를 추가하는 것입니다. 예를 들어 box-shadow, border-radius 또는 transform과 같은 속성입니다. Tailwind CSS로 이 작업을 수행할 필요가 없습니다. Tailwind CSS는 이미 PostCSS와 Autoprefixer를 사용하여 벤더 접두어를 추가해줍니다. 단순히 Tailwind CSS가 제공하는 유틸리티 클래스인 shadow, rounded 또는 rotate와 같은 클래스를 사용하면 모든 브라우저에서 작동합니다. 예를 들어, 다음과 같이 작성할 수 있습니다:

\js

<div class="card shadow rounded rotate-3">
  <p>이것은 그림자, 둥근 모서리, 회전 효과가 있는 카드입니다.</p>
</div>
\

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 결론

이 블로그 포스트에서는 Tailwind CSS와 PostCSS를 사용하는 것이 SCSS보다 프론트엔드 디자인에 뛰어난 선택인 것을 보여드렸습니다. Tailwind CSS는 SCSS보다 더 많은 유연성, 제어력, 속도, 효율성, 사용자 정의 및 반응성을 제공하면서 작성해야 하는 CSS 코드 양을 줄입니다. 또한 SCSS가 갖고 있지 않은 유틸리티 클래스, 컴포넌트 친화적 구문, 그리고 더 나은 커뮤니티 지원과 같은 많은 독특한 기능과 혜택을 제공합니다.

덜 귀찮음과 함께 멋진 그리고 적응형 웹사이트를 만들고 싶은 프론트엔드 개발자라면 Tailwind CSS를 한번 시도해보세요. 공식 웹사이트, 문서 또는 튜토리얼에서 더 많은 정보를 얻을 수 있습니다. 또한 이 대화형 치트 시트를 사용하여 Tailwind의 모든 클래스 이름과 CSS 속성을 빠르게 찾아볼 수도 있습니다.

이 블로그 포스트가 유익하고 도움이 되었으면 좋겠습니다. 피드백이나 질문이 있으시면 아래 댓글 섹션에 남겨주세요. 읽어주셔서 감사합니다. 😊
