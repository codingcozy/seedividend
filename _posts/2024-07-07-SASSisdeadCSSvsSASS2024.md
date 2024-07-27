---
title: "SASS는 죽었나요 2024년 CSS와 SASS 비교"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-07-SASSisdeadCSSvsSASS2024_0.png"
date: 2024-07-07 21:21
ogImage:
  url: /assets/img/2024-07-07-SASSisdeadCSSvsSASS2024_0.png
tag: Tech
originalTitle: "SASS is dead? CSS vs SASS 2024"
link: "https://medium.com/@erennaktas/sass-is-dead-css-vs-sass-2024-a78c65c47a4d"
---

![SASS vs CSS](/ui-log-2/assets/img/2024-07-07-SASSisdeadCSSvsSASS2024_0.png)

SASS는 수 년전에 등장한 CSS 전처리기로 CSS 작성 프로세스를 간소화하는 데 사용됩니다. SASS를 사용하려면 장치에 설치해야하며, 브라우저가 SASS를 읽을 수는 없지만 CSS는 읽을 수 있으므로 SASS 파일을 CSS로 컴파일해야 합니다.

SASS 덕분에 표준 CSS에 없는 기능을 활용하여 더 체계적이고 효율적인 CSS를 작성할 수 있습니다.

지금은 2024년이니, 이 상황이 계속되는지 확인해 봅시다.

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

오늘을 기준으로, 네이티브 CSS가 훨씬 강력해졌습니다. 브라우저의 지원을 받아 CSS를 더욱 강화하는 기능들을 편리하게 활용할 수 있습니다. 함께 SCSS의 강력한 기능과 네이티브 CSS의 대응 기능을 살펴보겠습니다:

# 변수

SCSS의 주요 기능 중 하나인 변수 정의는 CSS에는 없었습니다. 변수 선언을 통해 하나의 소스에서 여러 속성을 관리할 수 있습니다. 그러나 이제 CSS에서도 비슷한 방식으로 변수를 정의할 수 있습니다. 브라우저 지원률은 97% 이상입니다.

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

# 중첩

CSS에서 중첩된 작성은 특정 영역을 대상으로하는 구문입니다. SCSS 덕분에 메인 클래스 내 요소에 한 번만 접근하여 메인 클래스를 반복적으로 작성하지 않고 수정할 수 있습니다.

이제 CSS에서도 메인 클래스를 한 번만 사용하여 중첩이 가능합니다. 예를 살펴봅시다:

```js
.container {
    padding: 32px;
    .content {
      margin: 16px;
        .btn {
            padding: 12px 32px;
            border-radius: 16px;
            & span {
                font-size: 18px;
            }

        }

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

위 예시는 다음과 같이 CSS로 처리되었습니다:

```js
.container {padding: 32px;}
.container .content {margin: 16px;}
.container .content .btn {padding: 12px 32px; border-radius: 16px;}
.container .content .btn span {font-size: 18px;}
```

CSS 중첩 기능은 모든 주요 최신 브라우저에서 작동합니다. 그러나 브라우저 지원률은 여전히 90% 미만입니다. SASS는 브라우저 지원률이 98%에 도달할 때까지 중첩 기능을 계속 사용할 것이라고 언급했습니다.

# 부분 — 모듈

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

SCSS에서는 특정 영역에 대해 별도의 SCSS 파일을 만들어 사용할 수 있습니다. 예를 들어, form 요소를 위한 \_input.scss 파일을 만들고 이러한 요소들을 단일 위치에서 제어할 수 있습니다. 또는 \_input.scss 파일을 \_form.scss와 같은 다른 SCSS 파일에 가져와 해당 파일에서 사용할 수도 있습니다.

CSS에서는 원하는 CSS 파일에서 다른 CSS 파일을 호출하고 사용할 수 있습니다. 다음과 같이 CSS 파일에서 mobile.css를 호출함으로써 mobile.css에 정의된 변수를 포함한 모든 속성을 사용할 수 있습니다. @import의 브라우저 지원률은 97% 이상입니다.

```js
@import "mobile.css";
```

# 믹스인

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

SCSS에서 믹스인은 매개변수를 사용할 수 있는 재사용 가능한 블록을 만드는 데 도움이 되는 중요한 기능입니다. 예를 들어 보겠습니다:

```js
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

위 SCSS 파일은 다음과 같은 CSS 출력을 생성합니다.

```js
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
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

더 자세한 내용은 여기를 확인해주세요.

CSS에서는 변수 선언을 사용하여 mixins과 유사한 기능을 구현할 수 있지만 CSS에는 mixins에 대한 직접적인 동등물이 없습니다. 이 글에서 설명하는 재사용 가능한 CSS 네이밍 규칙을 사용하면 mixins이 필요 없어질 수 있습니다.

# 확장/상속

SCSS에서 @extend 기능을 사용하면 한 셀렉터에서 정의된 속성을 다른 셀렉터 내에서 호출할 수 있습니다. 동일한 속성을 반복하는 것을 피할 수 있습니다. 바로 예시를 살펴봅시다.

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

```js
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```

위 코드의 CSS 출력은 다음과 같습니다:

```js
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

이 기능은 CSS에는 해당하지 않지만, 이 글에서 설명한 네이밍 규칙을 따르면 필요하지 않습니다.

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

# 연산자들

SCSS에서는 기본 산술 연산을 사용하여 계산을 할 수 있습니다. 그러나 CSS에서는 min(), max(), calc(), clamp()와 같은 수학 함수를 사용할 수 있습니다. 이러한 함수들은 브라우저에서 96% 이상의 지원을 받고 있습니다.

```js
.block{width: calc(100vh - 100px);}
.content{width: clamp(200px, 50%, 500px);}
```

만약 SASS의 다른 여러 기능들을 탐구하고 싶다면, 여기를 참고해보세요.

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

SASS를 여러 해간 사용해온 개발자로서, 2024년을 기준으로 SASS의 이점과 설치, 사용, 컴파일 등의 번거로움이 사용 가치를 더 이상 정당화하지 못한다고 생각합니다. 특히 프로젝트가 커지면 컴파일 시간이 상당히 부담스러워집니다.

2024년을 특히 보면 CSS가 날로 강해지고 있으며 기존 기술/브라우저 사용량이 줄어들고 현대 브라우저의 보급이 늘어나며 CSS가 계속 발전함에 따라 더욱 강력해질 것입니다.

또한 클래스 네이밍 규칙을 의미 있게 재사용함으로써 CSS 효율성을 최대로 유지할 수 있습니다.

안녕히 가라, SASS! 모든 것에 감사합니다...

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

따뜻한 마음으로 여러분을 내 YouTube 채널로 초대합니다. 웹 개발에 대한 통찰력 있는 콘텐츠를 공유하는 것 뿐만 아니라 끊임없이 발전하는 웹 세계의 흥미로운 다이내믹과 기술도 탐험합니다.

Twitter — Linkedin — Youtube

저희 기사에서 참고한 출처는:

SASS

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

웹세계

캐니아이즈
