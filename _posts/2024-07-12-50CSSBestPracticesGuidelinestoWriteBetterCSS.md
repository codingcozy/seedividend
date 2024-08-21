---
title: "더 나은 CSS 작성을 위한 50가지 CSS 모범 사례 및 가이드라인"
description: ""
coverImage: "/assets/img/2024-07-12-50CSSBestPracticesGuidelinestoWriteBetterCSS_0.png"
date: 2024-07-12 19:11
ogImage:
  url: /assets/img/2024-07-12-50CSSBestPracticesGuidelinestoWriteBetterCSS_0.png
tag: Tech
originalTitle: "50 CSS Best Practices , Guidelines to Write Better CSS"
link: "https://medium.com/before-semicolon/50-css-best-practices-guidelines-to-write-better-css-c60807e9eee2"
isUpdated: true
---

<img src="/assets/img/2024-07-12-50CSSBestPracticesGuidelinestoWriteBetterCSS_0.png" />

최근에 웹 개발자가 되기 위해 습득해야 할 15가지 CSS를 소개한 글을 썼었는데, CSS를 쓰는 것은 특정 기능에 집중하는 것 이상으로 많은 노력이 필요하다는 것을 깨달았어요. 때로는 CSS를 어렵게 만드는 것은 개발자들이 따르고 사용하여 CSS 작성의 즐거움을 느낄 수 있도록 도와주는 도구, 지침 및 최상의 방법을 갖지 못한 것입니다.

여러 해 동안 제가 수집한 규칙과 도구를 통해 CSS 여정에서 큰 도움을 받았으며, 이 중 50가지를 여러분과 공유하고 싶어요.

## 1 — 전처리기 사용

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

CSS 프리프로세서를 사용하면 CSS를 더 적게 더 빠르고 더 나은 방식으로 작성할 수 있습니다. 이들은 도구와 유틸리티로 가득하여 CSS를 조직화하고 반복을 피하며 모듈화하는 데 도움이 됩니다. 나는 SASS를 선호하지만 LESS와 Stylus도 즐겨 사용합니다. 그들을 좋아하는 이유는 페이지를 스타일링하는 새로운 방법을 소개하지 않기 때문입니다. 여전히 CSS이지만 추가 구문과 기능이 있는 것 뿐입니다.

## 2 - 전역 스타일과 지역 스타일을 분리하세요

어떤 스타일이 어떤 HTML 선택기나 특정한 것을 위한 것인지 분명히 구분하는 것이 중요합니다. 전역 스타일은 별도의 파일에 유지하는 것이 중요합니다 (특히 프리프로세서를 사용할 때), 하지만 파일 상단에 두고 특정 컴포넌트, 요소 또는 사이트의 섹션에 대한 구체적인 스타일을 설정하는 데 집중할 수도 있습니다.

## 3 - 스타일 모듈화하기

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

홈페이지로 이동하는 사용자는 그 페이지에 필요한 스타일만 포함되어 있지 않으면 하나의 파일에 모든 CSS를 포함할 필요가 없습니다. 페이지를 로드할 때 사용자가 보는 꼭 필요한 스타일과 다이얼로그, 스낵-바, 알림과 같이 숨겨진 컴포넌트용인 비필수 스타일로 구분해서 스타일시트를 분리하는 것까지 나는 심지어 합니다. 사용자 조치가 필요한 요소 또는 표시될 컴포넌트들입니다.

## 4 – 스타일시트를 올바르게 느리게 로드하기

CSS를 느리게 로드하는 여러 가지 방법이 있으며 WebPack과 같은 번들러를 사용할 때 동적 가져오기를 사용하면 쉽습니다. 자체 JavaScript CSS 로더를 만들거나 페이지에 스타일시트를 포함할 때 ‘link’ 태그를 조정하여 중요하지 않은 CSS를 연기할 수 있습니다.

## 5 – 구체적이고 너무 구체적하지 않게

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

너무 구체적으로 명시하는 것은 어디에 어떤 스타일을 적용해야 하는지 정의하는 데 도움이 되지만, 지나치게 구체적이면 오버킬이 되어 성능이 저하되고 번들 크기가 커질 수 있습니다. 때로는 CSS나 디자인 시스템이 잘못된 표시일 수도 있습니다. 너무 구체적인 선택자의 예시는 다음과 같습니다:

- section#sample-section — (id와 함께 "section"을 특정해야 하는 이유에 대해 물어보세요)
- main div p.title — (.title 외에 무언가를 특정해야 하는 이유에 대해 물어보세요)
- [disabled] — 충분히 구체적이지 않고 비용이 많이 듦
- #sample — 가장 구체적이고 효율적인 선택자
- - — 전역으로 매우 비용이 많이 듦 (가장 느림)

가끔 너무 구체적이어야 할 때도 있지만, 예외로 간주하는 것이 일반적인 규칙보다 나을 수 있습니다. 너무 구체적이지 않으면 스타일 충돌이 발생할 수 있고, 너무 구체적이면 브라우저에서 처리하기 어려워집니다.

## 6 — 브라우저가 CSS를 읽는 방법

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

다음 세렉터를 살펴보세요:

nav ul li a

대부분 왼쪽에서 오른쪽으로 읽을 것입니다. 하지만 브라우저는 오른쪽에서 왼쪽으로 읽습니다. 즉, 페이지의 모든 `a` 태그를 찾은 다음, `li` 안에 있는 것만 포함하도록 필터링한 후, `ul` 내부에서 포함하도록 다시 필터링 한 다음, 마지막으로 `nav` 내부에서만 해당되는 것을 필터링합니다. 이렇게 함으로써 가능한 빨리 일치하지 않도록 합니다. `a` 태그가 없다면, `nav`에서부터 일치를 시작할 필요가 없습니다.

아마도 가장 성능이 우수한 CSS는 페이지의 각 HTML 요소에 id를 지정하고 그것을 사용하여 스타일을 적용하는 것일 것입니다. CSS 선택자를 사용하는 것은 매우 비용이 많이들고, 특히 깊이 중첩된 경우 더욱 나빠집니다. 아마도 성능의 각 부분이 필요할지 모르겠고, 아마도 브라우저가 충분히 빠르다고 생각할지도 모릅니다. 이상적으로는 HTML을 기준으로 페이지를 스타일링해야 합니다.

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

## 7 - HTML을 고려한 스타일링으로 성능을 높이세요

스타일을 지정할 때는 HTML 구조를 고려하세요. 특히 이전 규칙/지침(6 & 5)을 읽은 후입니다. 페이지에 있는 링크가 탐색 링크 뿐이라는 것을 안다면 선택기 a 사용하는 것도 좋지만, 많은 링크가 있을 것을 안다면 .nav-link와 같은 클래스를 사용하여 구분하는 것이 좋습니다.

스타일 선택기는 비용이 많이 들고 중첩되어 일반적인 HTML 태그(div, p, a)를 대상으로 하는 것이 나쁩니다. CSS를 효율적으로 렌더링하는 전략을 찾아보세요. 스타일링을 위해 모든 것에 id나 class를 추가하는 극단적인 조치는 피하십시오. 클래스 유틸리티 라이브러리를 사용하거나 추가 성능이 필요한 경우를 제외하고는요. 더 나은 이해를 위해 CSS 작동 방식에 대해 알아보세요.

```js
#main-navigation          /* ID (빠름) */
body #page-wrap           /* ID */
.main-navigation          /* 클래스 */
li a.nav-link             /* 클래스 */
div                       /* 태그 (느림) */
nav ul li a               /* 태그 (더 느림) */
*                         /* 전체 (가장 느림) */
[disabled]                /* 전체 */
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

## 8 - 인라인 스타일 사용을 피하세요

인라인 스타일을 덮어쓸 수 있는 것은 `!important` 플래그 뿐이며, 다음 블록에서 읽을 수 있듯이 `!important` 플래그는 좋지 않을 수 있고, 인라인 스타일은 이를 요구합니다.

그것들을 피해야 하는 또 다른 이유는 외부 스타일 시트를 추가한 이유가 있기 때문입니다. 그 이유는 스타일을 구조(HTML)로부터 분리하는 것입니다. 이에는 예외가 있지만, 외부 스타일 시트에 스타일이 있고, HTML에 스타일이 있거나 JavaScript에 스타일이 있는 경우 변경 사항을 추적하기 어려워지며, 코드베이스가 커지면 유지 보수하기 어려워집니다.

Svelte나 Vue와 같은 일부 라이브러리와 프레임워크는 동일한 파일에서 HTML(JSX), CSS 및 JavaScript가 함께 사용되도록 허용하지만, 결과적으로는 선호도에 맞춰야 합니다.

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

## 9 — !important을 피하세요

Bootstrap을 사용하고 스타일을 덮어쓰고 싶다면, !important 플래그를 사용해야 할 수도 있지만, 그럼에도 불구하고 첫 번째로 Bootstrap을 왜 사용하는지 생각해 보세요.

!important 플래그를 사용할 필요를 느낀다면 보통 문제가 있다는 신호입니다. 덮어쓰기가 어렵거나 서드 파티 라이브러리를 사용 중이거나 인라인 스타일을 사용하고 있거나 선택자를 지나치게 명확하게 정의하고 있거나 CSS 계층 구조나 순서 문제가 있는 것입니다.

## 10 — 일관성 있게 CSS 작성하기

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

일관성이 중요해요. 모든 것을 잘못하고 있어도 일관성을 유지하세요. 나중에 수정하기가 훨씬 쉬워질 거예요. 자신에게 맞는 명명 규칙을 찾아 채택하고 CSS 방법론을 채택하며, 스타일을 동일한 방식으로 정리하고, 선택자를 몇 단계까지 중첩할지 정의하세요. 자신의 스타일을 정의하고 그것을 고수하며 시간이 지남에 따라 개선하세요.

## 11 — 디자인 시스템 사용하기

디자인 시스템을 사용하면 미래를 위해 설계할 수 있어요. 일반적인 디자인 규칙과 명세를 정의하고, 조직을 따르고, 모듈화하고, 모범 사례를 정의할 수 있어요. 이것은 미래를 대비하는 전략인 이유 중에 하나로, 전역적으로 변경을 도입하거나 설정 및 수정할 때 훨씬 쉽기 때문이에요.

## 12 — 짧은 표기법 사용하기

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

가끔은 패딩-탑이나 보더-라이트를 지정하고 싶을 때가 있지만 제 경험상 이런 것들을 더 추가해야 할 때가 많아요. 그래서 여러 속성을 지정하지 않고 변경하기 쉽도록 항상 축약형을 사용하는 습관을 들였어요. 변경하기 쉽고 코드도 더 간단해요.

## 13 — 공통 스타일 결합

같은 스타일 규칙을 가진 선택자를 그룹화하여 반복되는 스타일을 피하세요. 동일한 스타일 바디를 가진 선택자를 쉼표로 구분할 수 있어요.

## 14 — 일반적인 트릭을 유틸리티 클래스로 전환하기

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

만약 자주 트릭이나 동일한 스타일을 반복적으로 적용하고 있다면, 이를 클래스 유틸로 변환하여 HTML 태그에서 직접 사용할 수 있도록 만드세요. 저에게 중요한 것들은 display flex나 grid를 사용한 가운데 정렬 같은 것들이 있어서 .center-flex와 .center-grid 클래스를 생성했습니다. 이러한 반복적인 스타일 조합을 자동화하기 위해 클래스 유틸을 만드세요.

## 15 — 상대적 단위를 더 많이 사용해보세요

정말 상대적 단위를 더 많이 사용해 보아야 합니다. em, rem, %, vw, vh, fr 등과 같은 것들이 있습니다. px와 pt로 고정값을 설정하는 것은 정적 디자인을 위한 것이어야 하지만 경우에 따라 이러한 값 단위가 필요한 경우도 있습니다. 브라우저는 유연하니까, 당신의 웹사이트와 단위도 유연해야 합니다.

## 16 — 고비용 속성에 주의해야 합니다

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

요즘 브라우저는 정말 빨라졌어요. 그렇지만 가끔 복잡한 웹사이트에서 box-shadow, border-radius, position, filter, width 및 height와 관련된 그림 문제가 발생하는 경우가 있어요. 특히 복잡한 애니메이션이나 반복적인 변경에 대해서죠. 이러한 경우에는 브라우저가 복잡한 다시 계산 및 다시 그리기를 해야 하므로 모든 중첩된 자식 요소에 영향을 미치게 됩니다.

## 17 — 레이아웃 수정 스타일 최소화하기

레이아웃 수정 요소는 width, height, left, top, margin, order 등과 같은 속성들을 의미해요. 이 요소들은 애니메이션을 할 때 더 많은 비용이 들며 레이아웃 및 해당 요소의 모든 자손을 다시 계산해야 하는 등 변경 사항이 반영되어야 해요. 특히 이러한 속성들을 한꺼번에 많이 변경할 때 더 많이 느껴지게 되니, 주의해주세요.

## 18 — “will-change”는 마지막 수단으로 사용하기

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

"will-change"는 성능을 향상시키는 데 사용됩니다. 이 속성이 어떻게 변경될 것으로 예상되는지 브라우저에 알려주는 것입니다. 그러면 브라우저는 사용되기 전에 복잡한 계산을 수행하게 됩니다. 이것은 좋은 것처럼 들리지만, 대부분의 경우에는 필요하지 않을 수 있습니다. 무언가를 변환하거나 애니메이션을 적용할 때와 같이 변경 관련 성능 문제를 발견하지 않는 한 마지막 수단으로 사용하세요.

## 19 — CSS에 주석 달기

주석은 좋은 것입니다. 채택해보세요! 복잡한 해킹을 작성하거나 어떤 것이 작동하는지 모르는 경우 주석을 추가하세요. 복잡한 것에 대한 주석을 추가하고, CSS를 조직화하고, 다른 사람들이 당신의 사고와 전략을 이해하도록 도와주며, 나중에 다시 돌아왔을 때 당신의 혼란을 이해하는 데 도움이 되도록 주석을 추가하세요.

## 20 — CSS를 Normalize하거나 Reset하기"

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

모든 브라우저에는 요소에 대한 기본 스타일이 포함되어 있으며 이는 다양합니다. 따라서 한 브라우저에서는 한 방식으로 보일 수 있지만 다른 브라우저에서는 다르게 보일 수도 있고, 예상하지 못한 추가 테두리나 모양이 생길 수도 있습니다. CSS를 초기화하거나 표준화함으로써 이러한 문제를 해결하고 스타일이 모든 브라우저에서 동일하게 보이도록 할 수 있습니다.

## 21 - 더 나은 글꼴 로딩 전략 고려하기

@font-face를 계속 사용하여 글꼴을 정의할 수 있지만, 2개 이상의 글꼴 파일이 있는 경우에는 `link/` 태그를 사용하여 글꼴을 로드하고 특히 나중에 불러올 수 있도록 설정할 수 있습니다. 또한 SVG 글꼴에 대해 알아보고 정확한 글꼴 렌더링이 가능하도록 하는 방법도 알아보세요. @font-face 규칙은 스타일 시트의 맨 위에 추가하세요.

## 22 - 너무 많은 글꼴 파일 피하기

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

디자이너가 너에게 너무 많은 글꼴 파일을 전달했다는 것은 경고 신호일지도 몰라. 너무 많은 글꼴을 사용하는 웹사이트는 혼란스럽고 혼란스러울 수 있으므로, 항상 페이지에 필요한 글꼴들만 포함되어 있는지 확인하세요. 글꼴은 로드되고 적용되는 데 시간이 걸릴 수 있으며, 글꼴이 너무 많으면 일반적으로 UI가 글꼴이 로드된 후에 잡힙니다.

## 23 — CSS 최소화

브라우저에 CSS를 로드하기 전에 CSS를 최소화하세요. 후처리기를 사용하거나 사이트 배포 과정의 간단한 빌드 단계로 만들 수 있습니다. 작은 CSS 파일은 더 빨리 로드되고 더 빨리 처리되기 시작합니다.

## 24 — CSS 변수 사용하기

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

프로세서를 사용하는 가장 큰 이유는 변수와 CSS 변수입니다. 브라우저에 로드 될 때 변수가 유지되기 때문에 훨씬 더 좋습니다. 지원이 뛰어나며 더 유연하고 재사용 가능한 UI를 만들 수 있습니다. 더 강력한 디자인 시스템과 기능을 만드는 데 도움이 됩니다.

## 25 — 아웃라인 속성을 삭제하지 마세요, 스타일을 변경하세요!

아웃라인 속성을 "none"으로 설정하지 마세요, 대신 스타일을 변경하세요! 웹사이트의 룩앤필과 일치하도록 스타일을 변경하세요. 키보드나 다른 스크린 리더 네비게이션 방법을 사용하여 웹사이트를 탐색하는 사람들에게는 현재 위치를 파악하는 데 중요한 아웃라인이 필요합니다.

## 26 — 불필요하게 CSS 라이브러리/프레임워크를 도입하지 마세요

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

요즘 대부분의 사람들이 하는 첫 번째 일은 CSS 라이브러리나 프레임워크를 추가하는 것입니다. 그러나 종종 결국 오랜 기간 동안 비용이 많이 들 수 있는 결정일 수 있습니다. 보통 이러한 사람들은 모르는 것을 만나게 되면 도움을 받기 위해 전체 라이브러리를 가져옵니다.

CSS 라이브러리를 추가하는 것은 신중하게 고려해야 합니다. 대부분의 기능을 사용할 의향이 없다면 추가하지 마세요. 그 결정에 대해 팀과 여러분이 편안해야 하며 실제로 제공 시간과 디버깅 시간을 상당히 줄여줄 것이어야 합니다. 가져오면서 그것을 배우고 완전히 사용하는 시간을 가져야 합니다. 서드파티 라이브러리를 덮어쓰거나 해킹하는 경우에는 그것이 필요 없는 것입니다!

## 27 — 이중 따옴표 사용

배경이나 글꼴 URL 또는 콘텐츠와 같은 문자열 값을 포함할 때에는 이중 따옴표를 선호하고 일관성 있게 유지하세요. 따옴표를 누락하는 사람이 많은데, 때로는 작동할 수 있지만 CSS 해석 도구에서 문제를 일으킬 수도 있습니다. 또한 CSS quotes 속성을 살펴보고 일부 작업을 자동화해 보세요.

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

## 28 - 유지보수가 어려운 해킹을 피하세요

스타일에 해킹을 도입할 때마다, 예를 들어 hacks.css와 같은 별도의 파일에 넣어 유지보수를 쉽게 할 수 있습니다. 코드베이스가 커지면 해킹들을 찾고 해결하기 어려워지므로, 가능하면 해킹을 완전히 피하는 것이 좋습니다.

## 29 - CSS로 텍스트 서식 지정하기

CSS를 사용하면 HTML 텍스트를 서식 지정할 수 있습니다. HTML에 모든 글자를 대문자, 소문자 또는 대문자화로 수동으로 쓰지 않아도 됩니다. CSS 속성 값을 변경하는 것이 HTML의 모든 텍스트를 변경하는 것보다 빠르고, CSS로 텍스트가 보이는 방식을 원하는 대로 작성할 수 있어 국제화에도 유리합니다.

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

## 30 - CSS 유효성 검사하기

W3 기관은 무료 CSS 유효성 검사기를 제공하여 CSS가 올바른 스타일 규칙 및 지침을 따르는지 확인할 수 있습니다.

## 31 - 반응형 또는 적어도 유동적인 스타일 지정

웹 브라우저에 들어갈 내용을 만들고 있으므로 사람들이 다양한 기기 유형과 크기에서 액세스할 것을 고려해야 합니다. 이들을 위한 경험을 향상시키기 위해 유동적이거나 반응형인 디자인을 고려하는 것이 좋습니다. 프로젝트에 반응 형 계획이 없는 경우, 적어도 유동적인 디자인을 유지하려고 노력해보세요.

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

## 32 - 콘텐츠가 크기를 정의하도록 하세요

예를 들어 버튼의 너비와 높이를 설정하는 대신 일부 패딩을 설정하여 간격을 유지하고 디자인이 엄격한 크기를 요구하지 않는 한 max-width 및 max-height를 포함하세요.

## 33 - CSS 방법론을 따르세요

CSS 방법론은 일관성을 보장하고 스타일을 미래지향적으로 만듭니다. 시도할 수 있는 몇 가지 옵션이 있거나 여러 가지를 도입할 수도 있습니다.

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

- BEM (Block Element Modifier) — 이것은 강력한 방법론으로, 클래스 네이밍 규칙을 사용하여 블록(구성 요소)과 엘리먼트(구성 요소 부분) 및 모디파이어(구성 요소 및 엘리먼트 상태)를 분리하는 것을 목적으로 합니다.
- ITCSS (Inverted Triangle CSS) — 3가지 원칙에 따라 특이성 수준에 따라 것을 구성하는 매우 효과적인 방법입니다: 일반적에서 명시적으로, 낮은 특이성에서 높은 특이성으로, 넓게 퍼지는 것에서 지역화된 스타일 규칙으로.
  ![Image](/assets/img/2024-07-12-50CSSBestPracticesGuidelinestoWriteBetterCSS_1.png)
- OOCSS (Object Oriented CSS) — 이것은 꽤 멋진 방법론으로, CSS에서 객관지향 패러다임에 따라 재사용 가능한 독립 코드를 분리하고 추상화하는 것을 목적으로 합니다.

## 34 — 스타일을 지속적으로 덮어쓰거나 취소하는 것을 피하세요.

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

거대한 빨간 깃발은 CSS 스타일을 작성한 다음 다른 곳에서 동일한 CSS를 다른 값으로 작성하는 경우를 말합니다. 이렇게 계속하게 되면, 프로젝트의 스타일링 방식에 분명히 문제가 있다는 것을 보여줍니다.

본인의 스타일을 덮어쓸 필요가 있는 상황에 거의 결코 빠지지 말아야 합니다. 이는 스타일 변형이 있으며 아마도 UI를 사전에 계획하지 않았을 가능성이 높다는 것을 보여줍니다.

## 35 — 애니메이션 선언을 마지막에 추가하기

다른 할 일은 애니메이션 @keyframes를 별도 파일에 넣고 스타일시트 마지막에 포함하거나 간단히 마지막에 가져오는 것입니다. 이렇게 하면 브라우저가 로드되는 동안 애니메이션을 수행하기 전에 전체 스타일이 읽히도록 보장할 수 있습니다.

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

## 36 — 제 친구인 타사 CSS를 섞지 마세요

타사 라이브러리를 덮어쓰기하는 스타일을 작성할 때는 추적 및 유지 관리를 쉽게 하기 위해 별도의 파일에 넣는 것을 고려해보세요. 나중에 라이브러리를 제거하기로 결정할 경우, 제거하기가 더 쉬워지며, 파일에 따로 넣어두는 것이 자체적인 문서화가 될 수 있습니다.

## 37 — 전환할 속성을 명확히 나열하세요

전환을 지정할 때는 반드시 전환할 모든 속성의 이름을 포함해야 합니다. "모두"를 사용하거나 속성 이름을 비워두면 브라우저가 모두 전환을 시도하고 전환 성능에 영향을 줄 수 있습니다.

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

## 38 — 모든 곳에서 id 속성을 사용하는 것을 피하세요

CSS에서의 성능을 극도로 중요시하는 분이시라면 모든 곳에서 id를 사용하는 것이 좋을 수도 있지만, 그렇지 않다면 id를 과용하는 것은 좋지 않을 수 있습니다. id 속성은 덮어쓰기하기 어려우며 페이지당 유일해야 하므로 id 사용에 대한 지침을 따르세요:

- 로고와 컨테이너와 같이 페이지에서 실제로 고유한 것에 사용하세요;
- 재사용되는 구성 요소 내부에 사용하지 마세요;
- 웹사이트의 제목과 섹션에 사용하여 링크하고자 하는 경우에 사용하세요;
- 필요한 경우 고유성을 보장하기 위해 id 생성기를 사용하세요;

## 39 — 스타일 순서를 주의하세요

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

CSS는 Cascading StyleSheets의 줄임말로, 마지막에 온 스타일이 이전 스타일을 덮어쓸 수 있는 "캐스케이딩" 방식을 사용합니다. 따라서, 적용하고자 하는 스타일이 제대로 적용되도록 스타일을 순서대로 작성해야 합니다. CSS의 구체성에 대한 이해가 필요합니다.

## 40 — 스타일을 검사하세요

린팅은 당신이 정의한 규칙을 따르도록 하여 스타일이 일관되고 잘 구조화되며 CSS의 모베스트를 따르도록 하는 역할을 합니다. Stylelint를 살펴보고, 즐겨 사용하는 IDE에서 스타일 린팅을 설정하는 방법과 구성 파일을 설정하는 방법을 알아보세요.

## 41 — CSS 속성을 알파벳 순서대로 정렬하세요

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

아이템을 쉽게 찾을 수 있어요. 심지어 Stylelint를 사용하여 이 규칙을 강제 적용할 수도 있어요.

## 42 — 상자 크기 박스 전체 박스

CSS 속성 box-sizing의 기본값은 border-box여야 하며, 많은 CSS API 실수 중 하나로 나열되어 있어요. 최상위 수준에서는 간단히 _, _::after, \*::before에 'box-sizing: border-box;'를 선언해주세요.

## 43 — 색상 이름을 피해주세요

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

모든 색상 값을 "빨강", "보라", "하늘색"과 같이 말하는 대신에 16진수 및 색상 함수로 명시하는 것이 좋습니다. 수백만 개의 16진수 색상 값이 있으며 이 중 모든 색상에 대한 이름이 없습니다. 일관성을 유지하기 위해 한 가지 방법을 선택하고 그것을 준수해 주세요.

## 44 — 부모에게 간격, 위치 및 크기 처리를 맡기세요

콘텐츠 플로우에서 사용할 구성 요소를 스타일링할 때, 컨텐츠와 내부 간격이 크기를 정의하도록하고, 위치와 여백과 같은 요소를 포함하지 마세요. 이 구성 요소를 사용할 컨테이너에게 이 구성 요소와 다른 요소 사이의 거리와 위치를 결정하도록 하세요.

## 45 — CSS를 마크업 순서에 맞추어 정리해 보세요

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

마크업을 CSS로 바로 확인하는 것은 이해하기 쉽게 해주네요. 저도 이렇게 하면 시간을 많이 절약할 수 있어서 좋아해요.

## 46 — HTML 의미론은 유지하고 스타일링에는 CSS 사용

특정한 스타일을 적용하기 위해 HTML을 변경하는 개발자들을 종종 볼 수 있습니다. 일반적으로, CSS에 스타일링을 맡기고 HTML은 의미론적으로 의미있는 방식으로 구조화하세요. 이 규칙에는 예외가 있지만, 채택된 구조가 HTML 의미론적 규칙을 위배하지 않도록 항상 주의하세요. 콘텐츠를 염두에 두고 HTML을 먼저 작성한 다음 CSS를 추가하여 스타일링을 시도해보세요. 스타일링 이유로 HTML을 변경하기 전에 최선을 다해보세요.

## 47 — 하이픈(-) 또는 밑줄(\_)를 사용할까요?

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

가장 흔한 클래스와 아이디 이름 구분자는 하이픈이지만, 선택하시는 것은 무엇이든 간에 일관성 있게 유지해 주세요.

## 48 — 자바스크립트 도움을 찾기 전에 CSS 솔루션을 찾으세요

내 Youtube UI/UX 라이브러리에서는 CSS만을 사용하여 공통 컴포넌트를 만드는 방법을 공유하고 있는데, 알려드리고 싶은 것은 자바스크립트를 추가하기 전에 (너무 hacky하지 않은) CSS 솔루션을 찾아보아야 한다는 것입니다. 또한 자바스크립트를 추가한다 해도, CSS가 대부분의 스타일링을 하고 자바스크립트는 트리거나 부가 기능에 사용하는 것을 고려해야 합니다.

## 49 — 사용하지 않는 CSS 제거하기

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

마찬가지로, 사용할 CSS만 포함해서 배송하려면 PurgeCSS와 같은 도구를 활용하는 것을 고려해보세요. 이 도구들은 CSS를 살펴보고 HTML을 분석하여 필요한 스타일을 결정합니다. 이것이 필요한지 확신이 없다면, 코드 커버리지를 확인하는 브라우저 도구를 사용해보세요. 그것은 사용되지 않는 스타일을 배송하는지 알려줄 것입니다.

## 50 — 후처리기 사용하기

프로젝트에 PostCSS를 추가하여 Autoprefixer(webkit-, moz-, ms- 등을 추가), CSSNano(CSS를 최소화), postcss-preset-css(미래 CSS 작성 가능) 등 다양한 플러그인을 활용하여 CSS를 최적화할 수 있도록 고려해보세요. 여러 다른 플러그인들이 표준 및 규칙을 정의하고, 도구를 도입하며, 클래스 유틸리티를 소개하며, 자바스크립트와 통신하며, 이 글에서 읽은 많은 베스트 프랙티스를 표준화하는 데 도움이 될 것입니다.

## 결론

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

아무도 하루 아침에 CSS를 더 잘 작성하지는 못해요. 실력을 키우려면 연습과 조정이 필요해요. 이 제안은 제가 CSS 공부하는 데 많은 도움을 받은 것들이에요. 당신을 도와 줄 거라고 확신해요. 각 경험은 고유하니, 올바르게 느껴질 때까지 다양한 방법을 시도해야 해요.

도구를 도입하는 데 겁내지 마세요. 하지만 다른 사람이 하는 대로 하는 것에 너무 성급해하지 마세요. CSS를 이해하고 작성하며 조직하는 과정은 한 단계 수준의 예술이에요. 채택할 규칙이 무엇이든 일관성을 유지하세요.

제가 CSS 코딩하는 걸 Before Semicolon 유튜브 채널에서 보실 수 있고, 제 글을 더 읽어보시고, 도움이 필요하면 연락해주세요.

행운을 빕니다!

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

다음 독서 추천 목록:
50가지 자바스크립트 Best Practice 규칙으로 더 나은 코드 작성하기
15가지 숙달하면 더 나은 웹 개발자가 될 수 있는 CSS 요소

[이미지](https://miro.medium.com/v2/resize:fit:1400/1*kKfpitAbaRbqRAXx0-YqTw.gif)

유튜브 채널: Before Semicolon
웹사이트: beforesemicolon.com
