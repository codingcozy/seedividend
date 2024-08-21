---
title: "프론트엔드 개발자라면 반드시 알아야 하는 CSS 지식들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "A Comprehensive Guide to CSS Insights from the King of CSS, Kevin Powell"
link: "https://medium.com/towardsdev/a-comprehensive-guide-to-css-insights-from-the-king-of-css-kevin-powell-51e0bd569756"
isUpdated: true
---

이 특별 게스트 이슈에서 기술 산업 전문가 매트 로렌스와 마이크 카란은 존경받는 케빈 파웰의 통찰을 소개하여 기쁨을 느낍니다. 웹 개발 커뮤니티에서 'CSS의 군주'로 널리 알려진 케빈은 가르침에 대한 열정과 복잡한 개념을 쉽게 이해할 수 있는 능력으로 무수히 많은 학습자들을 웹 개발의 마스터로 안내해 왔습니다. 이 포괄적인 가이드는 CSS의 필수 요소, 기본 웹 기술의 중추적인 역할, 그리고 현대적인 프레임워크와 도구를 사용하는 원활한 전환에 대해 깊이 들어가고 있습니다. 당신이 신진 웹 개발자이든 기술을 다듬고 싶은 분이든, 이 기사는 귀중한 통찰과 실용적인 조언으로 가득하며 당신의 웹 개발 여정을 높여줄 것입니다.

## 이 기사에서 다루는 주제:

- 프레임워크에 뛰어들기 전 바닐라 CSS를 학습하는 중요성
- 고급 CSS 기능 개요 및 실용적인 응용
- Sass 및 PostCSS와 같은 CSS 전처리기 효과적인 사용법
- CSS 프레임워크의 세계 탐험: 당신에게 적합한 것 선택하기
- 현대 웹 개발에서의 CSS 네이밍 규칙 이해와 중요성
- 크로스 브라우저 호환성 보장 전략
- 튜토리얼 지옥을 벗어나기: 학습한 내용 적용하는 팁
- 웹 개발자와 웹 디자이너의 차이
- 케빈의 추천하는 패스: 바닐라 웹 개발에서 프레임워크 마스터까지
- 로컬 React 개발 환경 설정: 초심자 안내

![CSS 킹 케빈 파웰로부터의 통찰에 관한 포괄적인 가이드](/assets/img/AComprehensiveGuidetoCSSInsightsfromtheKingofCSSKevinPowell_0.png)

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

# Kevin Powell에 대해

Kevin Powell는 웹 개발 커뮤니티에서 "CSS의 왕 👑"으로 칭송받고 있으며 학생들에게 매력적이고 즐거운 학습 분위기를 조성하는 열정과 열기로 잘 알려져 있습니다.

Kevin의 미션은 웹 개발을 간단하게 만들고 모두에게 이해할 수 있게 만드는 것입니다! 그의 YouTube 채널은 거의 100만 구독자를 보유하고 있으며 700개가 넘는 비디오를 제공하여 8천만 회가 넘는 조회수를 기록하고 있어, 웹 개발 커뮤니티에 큰 영향을 끼친 것을 강조하고 있습니다!

YouTube 이외에도 Kevin은 기사, 프리미엄 강의, 그리고 Discord 커뮤니티를 통해 개발자들의 학습 여정을 돕고 있습니다.

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

그의 목표 "인터넷의 한 구석을 조금 더 멋지게 만들어 가는 것을 계속하기" 는 그의 긍정적이면서도 격려적인 가르침 스타일과 웹 개발에 대한 접근을 완벽하게 반영하고 있어요!

# CSS란

CSS는 Cascading Style Sheets의 줄임말로, HTML 또는 XML로 작성된 문서의 표현을 설명하는 스타일시트 언어입니다. 웹 페이지의 요소들이 레이아웃, 색상, 글꼴 및 애니메이션을 포함한 어떻게 표시되어야 하는지를 정의합니다.

CSS 정의는 이해하기 쉽지만, 실제로 코딩하는 것은 마스터하기 어렵습니다! 우리는 케빈과 함께 이 글을 읽어보면 CSS에 대해 깊은 경험과 지식을 갖고 있는 케빈과 함께 모두 배울 수 있을 거예요!

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

# 먼저 바닐라 CSS를 배우세요

Kevin은 CSS 가르치는 10년 이상의 경험에서 공통점을 발견했습니다: 확고한 CSS 기초를 갖추기 전에 CSS 프레임워크를 배우려는 학생들은 어려움을 겪는 경향이 있습니다.

이 자발적인 어려움은 학생들이 해결할 수 없는 문제에 직면했을 때 발생합니다. 솔루션을 정확히 찾기 어려운 이유는 강력한 CSS 기초가 부족하기 때문에 바닐라 CSS와 프레임워크를 구분하기 어렵기 때문입니다.

바닐라 CSS는 정의에 따라 기본적인 수정되지 않은 CSS 코드를 사용하여 웹 페이지를 디자인하는 것을 의미합니다. 이 플레인 CSS는 웹 브라우저가 의도한 대로 웹 사이트를 표시하는 데 직접 이해하고 사용할 수 있습니다. 그러나 CSS 라이브러리와 프레임워크는 개발자가 디자인 프로세스를 가속화하고 향상시키기 위해 사용하지만 브라우저가 즉시 이해할 수는 없습니다. 이들은 종종 표준 CSS로 처리하거나 컴파일 되어야하며, 그 후 브라우저가 이를 읽고 웹 페이지 스타일에 적용해야합니다. 이것이 바닐라 CSS를 배우는 것이 중요한 이유입니다! 이것은 스타일링이 핵심에서 어떻게 작동하는지 이해하는 기초를 마련해줍니다. 이로써 나중에 CSS 프레임워크의 장점을 효과적으로 사용하고 감상할 수 있습니다.

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

바닐라 CSS를 마스터하면 프레임워크를 제대로 활용하여 그 많은 기능을 활용할 수 있어요. 이렇게 하면 당신이 당황하는 대신에 더 생산적일 거에요!

## 바닐라 CSS의 발전

바닐라 CSS를 배우는 중요성을 더 강조하기 위해 케빈은 CSS가 더욱 발전함에 따라 그 가능성이 커지고 있다고 설명합니다. 결과적으로 이전에 의존했던 몇 가지 도구들은 더 이상 그 중요성이 예전만큼은 아닙니다.

그 중 하나가 CSS 중첩입니다. 이 기능은 초기에 Sass, Less, Stylus와 같은 CSS 전처리기에서만 제공되는 기능이었죠. 이 기능은 다른 CSS 규칙 안에 CSS 규칙을 작성할 수 있게 해줘, 계층적 규칙 구조를 만들어 HTML 구조를 반영하고 코드 유지보수를 향상시킬 수 있어요. 현재 CSS 중첩에 대한 브라우저 지원은 여전히 진화 중이며 아직 널리 구현되지 않았습니다. 이 글에서는 나중에 CSS 기능 지원을 확인하는 방법에 대해 논의할 거에요.

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

## Scope

Kevin도 바닐라 CSS 기술의 중요성을 강조하며, 그들이 현대 프레임워크에서 사용되는 컴포넌트 스코프링을 강조합니다. 이 기법은 스타일의 영향을 특정 컴포넌트나 웹페이지 부분에만 제한하는 데 사용됩니다. 현재 Svelte, Vue, Astro와 같은 모던 웹 개발 프레임워크에서 이는 특히 중요합니다. 이 프레임워크들은 컴포넌트 중심 아키텍처를 수용하고 있기 때문입니다.

📝🔗바닐라 CSS를 얼마나 잘 알고 있는지 판단하여 프레임워크로 넘어갈 시기를 파악하려면 아래의 기사를 참고하세요:

- CSS 기초 마스터하기: 기본에서 프레임워크로의 전환 시기 알기

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

# CSS 도구 및 프레임워크

Kevin은 Sass 및 PostCSS와 같은 CSS 도구를 배우는 것이 일반 CSS에서 프레임워크를 배우는 등 더 복잡한 것으로 전환하는 것을 단순화할 수 있다고 조언합니다.

## Sass

Sass는 CSS를 확장하는 전처리기입니다. 변수, 중첩된 규칙, 믹스인 등을 사용하여 CSS를 더 쉽게 유지보수할 수 있고 작성하기 쉽게 만듭니다. 코드를 표준 CSS로 컴파일하여 브라우저가 원활하게 해석할 수 있도록 합니다.

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

접해보니 피처 좋은 기능 nested rules 때문에 Sass를 즐겨 사용해요! 네비게이션바 내에 CSS 코드를 중첩하는 것은 이해하기 쉬운 좋은 예시죠.

```js
.navbar {
  background-color: black;
  .nav-link {
    color: white;
    &:hover {
      color: lightgray;
    }
  }
}
```

Sass를 설정한 후에는 Sass 파일에서 바로 작업할 수 있어요. 변경 사항을 저장할 때마다 Watch 명령어가 자동으로 컴파일하여 CSS 파일로 작업한 내용을 반영해줘요!

```js
sass --watch input.scss:output.css
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

그래, Sass를 시도할 준비가 되셨나요? Kevin이 만든 초보자 친화적인 YouTube 시리즈인 'Sass 시작하기'를 확인해보세요.

Sass가 CSS 관리를 어떻게 간단하게 만드는지 알아본 후, PostCSS를 사용하여 새로운 CSS 기능을 즉시 활용할 수 있는 길로 여겨보세요! 이 도구들을 먼저 배우면 CSS 프레임워크를 배울 때 더 잘 준비될 수 있습니다.

## PostCSS

PostCSS는 JavaScript로 CSS를 변환하는 강력한 도구로, 오늘 바로 미래 CSS 기능을 사용할 수 있습니다! 이는 플러그인 기반의 생태계로 작동하여, 모든 브라우저에 호환되는 CSS로 컴파일되는 현대 구문으로 스타일을 작성할 수 있게 해줍니다.

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

PostCSS를 실행하려면 조금 설정해야하지만 걱정하지 마세요! Kevin이 준비한 YouTube 비디오로 모두 해결됩니다: PostCSS로 CSS를 업그레이드하는 방법 배우기

## CSS 프레임워크

일반 CSS에 익숙해지고 프레임워크를 배우기 ready하다면, Kevin도 동의하는 좋은 팁은 로컬 채용 공고를 확인하여 그들이 사용하는 기술을 보는 것입니다.

어떤 비즈니스나 정부 부서들은 더 오래된 기술을 사용할 수 있습니다. 그래서 당신의 요구에 따라서, 최신 CSS 프레임워크가 가장 좋은 선택이 아닐 수도 있습니다.

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

웹 개발에 사용되는 인기있는 CSS 프레임워크는 다음과 같습니다:

- Bootstrap: 반응형 웹 개발을 위한 오픈 소스 프레임워크로, 그리드 시스템과 구성 요소를 제공합니다.
- Tailwind CSS: 직접 HTML에서 스타일링하는 유틸리티 중심 프레임워크로, 신속한 UI 개발을 강조합니다.
- Foundation: 웹 및 앱 디자인을 위한 유연성을 중시하는 반응형 프레임워크입니다.
- Bulma: 깔끔하고 최소주의적인 웹 디자인을 위한 현대적인 Flexbox 기반 프레임워크입니다.
- Materialize: 구글의 Material Design에서 영감을 받아 사용자 친화적 인터페이스를 위한 UI 구성 요소를 제공하는 프레임워크입니다.

Kevin은 Tailwind가 React(수요가 높은 JavaScript 프레임워크)와 잘 맞아 떨어진다는 점을 강조합니다. Tailwind CSS는 JSX 코드 내에서 신속하게 스타일을 적용할 수 있기 때문에 React와 잘 작동합니다. 이는 React가 컴포넌트를 중심으로 구축되어 각 컴포넌트를 직접 스타일링하기 쉽게 만들기 때문입니다. 또한 Tailwind의 짧은 클래스 이름은 디자인 변경을 빠르게 할 수 있고 코드를 깔끔하게 유지하여 스타일링과 코드를 동일한 파일에 함께 두어 React 프로젝트의 품질을 향상시킵니다.

적합한 CSS 프레임워크를 선택한 후 Kevin은 해당 프레임워크를 사용하여 사이드 프로젝트를 만드는 것을 권장합니다. 이 접근 방식은 프레임워크를 배우는 데 필요한 실용적 경험을 제공하고 잠재적인 취업 기회에 이력을 제공해줍니다!

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

# CSS 네이밍 규칙

네이밍 규칙이란 무엇이며, 아직도 중요한가요?

CSS에서의 네이밍 규칙은 클래스, ID 및 기타 선택자의 이름을 지정하는 체계적인 방식으로 코드의 가독성, 유지 관리성 및 확장성을 향상시키는 것입니다. 이러한 규칙은 CSS 코드의 구조와 목적을 한 눈에 이해할 수 있도록 도와주어 웹 개발 프로젝트에서의 탐색, 업데이트 및 협업을 더 쉽게 만듭니다. 대표적인 예시로는 BEM (Block Element Modifier), OOCSS (Object-Oriented CSS), SMACSS (Scalable and Modular Architecture for CSS) 등이 있으며, 각각 효과적으로 CSS 코드를 정리하는 다양한 방법론을 제공합니다.

알겠어요, 하지만 아직도 중요한가요? 새로운 프레임워크의 등장으로 몇몇 관심사가 전통적인 방법에서 돌아가기도 했지만, CSS 네이밍 규칙은 여전히 중요성을 유지하고 있습니다.

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

그들의 중요성은 조금 감소되었습니다. 케빈은 CSS 네이밍 규칙이 한때 산업 표준이었던 것보다 이제는 특수한 실천사례로 전환되고 있다고 제안합니다.
만약 BEM이 어떤 것인지, 어떻게 작동하는지 간단히 알고 싶다면, 케빈의 (예전) 유튜브 동영상을 확인해보세요: Why I use the BEM naming convention for my CSS

## 브라우저 지원

프로페셔널한 웹 개발자로 성장할 때, 단지 코드를 작동시키는 것이 중요한 것이 아니라 이제는 모든 사람이 사용할 수 있도록 만드는 것이 중요해집니다. 특히 여러 브라우저에서 동작하는 것이 중요해요!

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

특정 코드가 각 브라우저에서 작동하는지 알고 싶다면, 웹 개발자에게 가장 좋은 도우미는 Can I Use 웹사이트입니다!

Can I Use 웹사이트는 HTML5, CSS3, SVG 및 다른 주요 브라우저에서의 웹 기술 지원 상태를 보여주는 최신 및 자세한 호환성 표를 제공합니다. 궁금한 기능을 입력하면 해당 기능을 지원하는 브라우저와 그 정도를 즉시 확인할 수 있습니다. 이 리소스는 개발 중에 합리적인 결정을 내릴 때 귀중하며, 사용자가 브라우저 선택과 관계없이 일관된 경험을 제공하는 웹사이트를 만드는 데 도움이 됩니다.

이제 중요한 질문은, "언제 새로운 기능을 구현해야 할까요?"

Kevin은 프로덕션 웹사이트인 경우 특히 웹사이트를 망가뜨릴 가능성이 있는 것은 도입하지 말라고 현명하게 조언합니다! 대신, 점진적 향상을 도입하는 새로운 기능을 사용하세요. Kevin은 "스크롤 타임라인"을 안전한 예로 들었는데, 이것은 브라우저가 지원하지 않아도 웹사이트를 망가뜨리지 않는 단순한 향상이기 때문입니다.

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

# 튜토리얼 지옥 탈출하기

튜토리얼을 따라 하면서 성공적으로 완료했고 그 과정에서 코드를 이해했다면서도 배운 것을 프로젝트에 적용하지 못한 적이 있나요? 독립적으로 코딩하는 방법을 마침내 깨달으려고 새로운 튜토리얼을 끊임없이 찾아다니는데도 똑같은 상황에 빠지신다면, 그것은 바로 "🔥튜토리얼 지옥!🔥"에 빠진 것입니다!

걱정하지 마세요, 우리 모두가 그 상황에 처해봤습니다! 튜토리얼 지옥에서 벗어나기 위한 첫 번째 단계는 언제 그 속에 있는지 이해하는 것입니다!

케빈은 이해하는 것과 실행하는 것 간에 확실한 차이가 있다고 설명합니다. 이 말은 튜토리얼을 따라 할 때 코드가 어떻게 작동하는지 쉽게 이해할 수 있겠지만, 자신의 힘으로 기능적인 코드를 작성하는 것은 다른 도전이라는 뜻입니다.

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

튜토리얼 지옥의 무한한 순환에서 벗어나려면 튜토리얼에 의존하지 않고 당신만의 프로젝트를 직접 구축하며 실전 경험을 많이 쌓아보세요. 코딩 문제에 부딪힌다면 온라인에서 해결 방법을 찾아보세요. 요즘에는 인공지능을 상담사로 활용하여 코딩 문제를 해결하고 개인 튜터 역할을 수행할 수도 있습니다! 실전 경험과 학습을 통해 시간이 흐르면 코드를 이해하고 프로젝트에 자신있게 적용할 수 있게 될 거예요.

참고: Kevin은 "학습"과 "생산에 적용하려는 노력"이 다른 것임을 설명하며, 시간이 민감한 상황에서 코드를 처음부터 다시 입력하기보다 코드를 복사하는 것도 괜찮다고 합니다.

## 웹 개발자 & 웹 디자이너

튜토리얼 지옥을 벗어나 당신만의 프로젝트를 구축하며 함수적인 코드를 작성할 수 있는 능력을 갖춘 당신은 다음 문제에 직면할 것입니다: 여러분의 프로젝트가 @!#?@! 같이 보인다는 거죠.

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

케빈은 우리에게 낙담하지 말라고 말해요! 코딩과 디자인은 실제로 두 가지 별개의 작업이라는 것이 드러났어요. UI/UX 디자이너라는 말을 들어봤나요?

"웹 디자인"에 능숙해지려면, 케빈은 많은 실전 연습을 하는 것을 추천해요! iCodeThis나 Frontend Mentor 같은 코딩 플랫폼에서 연습을 통해 이것을 실현할 수 있어요.

iCodeThis는 일일 코딩 도전 과제를 제공하여 당신의 기술을 향상시키기 위한 동적 플랫폼이에요. 매일 새로운 도전 과제가 제공되며, 24시간 안에 해결할 수 있는 기회를 드려요. 이 플랫폼은 사용자 친화적으로 설계되어 있어, 즉시 코딩을 시작할 수 있는 브라우저 기반 IDE를 제공해요. 프로젝트를 완료할 때마다 프로필에 추가되어 잠재적인 고객이나 고용주에게 자랑할 수 있는 포트폴리오를 작성할 수 있어요. 게다가, iCodeThis는 디스코드 커뮤니티를 통해 개발자들이 협업하고 서로의 도전 과제를 해결하는 데 도와주는 지원적인 환경을 조성해요.

Frontend Mentor는 실제 프로젝트를 모의하여 HTML, CSS 및 JavaScript 도전 과제를 제공하여 코딩 기술을 향상시키는 플랫폼이에요. 각 도전 과제에는 디자인, 자산 및 명세서가 포함되어 있어 프로젝트를 구축하고 개발자 커뮤니티로부터 피드백을 받아 다른 사람의 해결책을 보며 학습하고 비교할 수 있어요.

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

<img src="/assets/img/AComprehensiveGuidetoCSSInsightsfromtheKingofCSSKevinPowell_1.png" />

## 케빈은 Scrimba에서 웹 디자인에 도움이 되는 강의도 진행하고 있어요! 저는 수강했고, 정말 추천합니다!

# 반응형 웹 디자인 배우기

## 케빈 파웰과 함께

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

Course level: 중급

이 강좌는 반응형 웹 디자인에서 전문가 수준까지 레벨을 끌어올려 줄 것입니다. 즐거운 코딩 도전 과제를 해결하면서 고급 레이아웃을 만드는 방법을 배울 수 있습니다.

이 부트캠프에는

- 총 15 시간의 콘텐츠 — 173 강의
- 다양한 대화식 도전 과제
- 수료증이 포함되어 있습니다

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

![A Comprehensive Guide to CSS: Insights from the King of CSS Kevin Powell](/assets/img/AComprehensiveGuidetoCSSInsightsfromtheKingofCSSKevinPowell_2.png)

## 케빈의 강좌를 꼭 확인해보세요. 그의 웹사이트에서 제공하는 강좌를 만나보세요! 저는 얼마전에 그의 "CSS Demystified" 강좌를 구입했고, 정말 추천할 만 합니다!

# 케빈이 추천하는 바닐라 웹 개발 경로

CSS만으로 웹사이트를 만들 수는 없어요! 먼저 HTML, CSS, 그리고 JavaScript와 같은 바닐라 형태의 웹 개발 기본을 배우는 것이 강력히 권장됩니다.

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

바닐라 존에서 벗어나려면 Kevin이 시간이 허락된다면 Astro를 배우는 것을 추천합니다. 취업을 적극적으로 찾지 않고 계속 학습할 시간이 있다면 Astro는 빠르고 확장 가능한 웹사이트를 구축할 수 있는 현대적인 정적 사이트 생성기로, 클라이언트 측 자바스크립트를 덜 사용하게 해줘서 좋은 선택입니다. Kevin은 React와 같은 더 복잡한 프레임워크로 뛰어들기 전에 좋은 초석이라고 언급했습니다.

구직을 적극적으로 하고 있는 경우에는 앞서 언급한 대로, 필요한 프레임워크가 어떤 것인지 확인하기 위해 지역 구인 목록(또는 관심 있는 원격 작업)을 찾아보는 것이 현명합니다. 이는 신중한 선택을 도와줄 것입니다. 아직 결정을 내리지 못했다면, React는 인기가 많고 매우 인기 있는 프레임워크이며, 많은 온라인 학교에서 가르치고 있습니다.

# 로컬 React 개발 환경 설정

웹 개발을 배울 때, freeCodeCamp, Codepen 또는 Scrimba와 같은 플랫폼은 브라우저에서 코드를 작성할 수 있는 도구를 제공하여, Visual Studio Code와 같은 전통적인 데스크톱 IDE가 필요 없게 해줍니다.

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

온라인 학습에서 자체 로컬 환경을 만들기로 전환할 준비가 되었다면, Hashnode의 추천 기사인 "Vite를 사용하여 로컬 React 환경 만들기"에서 단계별 지침을 확인해보세요.

더 나아가 준비가 되었다면, 제가 작성한 차후 단계별 지침서도 확인해보세요. 여러분들이 이용하실 수도 있는 "명령줄을 통한 React 프로젝트 생성, GitHub에 푸시, Netlify로 배포하기"입니다.

# Kevin Powell 링크

- Kevin Powell | CSS 전도사

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

![A Comprehensive Guide to CSS Insights from the King of CSS Kevin Powell](/assets/img/AComprehensiveGuidetoCSSInsightsfromtheKingofCSSKevinPowell_3.png)

**에피소드를 꼭 들어보세요!**

CSS: CSS로 웹 스타일링 및 콘텐츠 학습에 대해 Kevin Powell와 함께 이야기해요

**반드시 소셜미디어에서 HTML All The Things도 확인해보세요!**

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

- 트위터
- 링크드인
- 틱톡
- 인스타그램

# Scrimba와 함께 공부하세요!

- Scrimba의 대화형 따라하면서 배우는 코드 편집기를 사용하여 코딩을 배우세요.
- 독점 디스코드 커뮤니티에 가입하여 첫 직장을 찾을 수 있는 네트워크를 구축하세요!
- 저희 제휴 링크 사용하기

이 기사에는 제휴 링크가 포함되어 있습니다. 이 링크를 통해 구매한 모든 것에 대해 수수료를 받을 수 있습니다. 이를 통해 우리의 작업을 지원하고 가치 있는 콘텐츠를 계속 제공할 수 있게 돕습니다. 지원해 주셔서 감사합니다!

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

## 스폰서 콘텐츠: 원본 발행사가 친절하게 이 기사를 후원했습니다. 이를 통해 저는 이 주제에 대한 전문지식을 공유할 수 있었습니다.

# 내 다른 관련 기사

- CSS 기초 마스터하기: 기초부터 프레임워크로 전환하는 시기 알기
- 강사 소개: Kevin Powell
- 케빈 파웰과 함께하는 CSS 최신 소식
- 기술 면접에서 성공하기
- 학습에서 수익 창출로: 기술 경력 탐색에 대한 종합 가이드
- 개발자로부터 개발자 대변사로 전환하기: 임하는 기술 전문가를 꿈꾸는 이들을 위한 안내서

# 결론

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

Kevin은 프레임워크에 빠지기 전에 바닐라 CSS를 정복하는 중요성을 강조합니다. 이 접근 방식은 일반 CSS에서 발생하는 문제와 프레임워크에서 소개된 문제를 구분하지 못하는 불필요한 좌절을 피하는 데 도움이 됩니다. 그는 또한 바닐라 CSS가 진화하고 있다고 강조합니다! CSS 중첩과 같은 고급 기능은 일부 전처리기의 필요성을 줄이므로 Svelte, Vue 및 Astro와 같이 컴포넌트 스코핑을 사용하는 현대적인 프레임워크에서 바닐라 CSS 기술을 효과적으로 사용할 수 있습니다.

Kevin은 그들이 특화되고 있는 것으로 믿지만, BEM, OOCSS 및 SMACSS와 같은 CSS 네이밍 규칙은 코드 가독성, 유지 관리성 및 확장성을 향상시키는 데 계속 기여하고 있습니다. 더 최근의 프레임워크가 등장함에 따라 그 중요성은 약간 감소했지만, 효율적으로 CSS 코드를 구성하는 데 여전히 관련이 있으므로 귀하가 근무하는 조직에서 여전히 그것들을 보고 사용해야 할 수 있습니다!

전문 웹 개발자로 전환할 때 여러 브라우저에서 코드가 작동하는지 확인하는 것이 중요합니다! "Can I Use" 웹 사이트는 다양한 브라우저에 대한 웹 기술 호환성 표를 제공하며 정보에 기반한 개발 결정을 돕습니다. Kevin은 브라우저가 지원하는 경우 좋은 모습을 추가하지만 웹 사이트를 망가뜨리지 않는 '스크롤 타임라인'과 같은 점진적 향상을 제공하는 새로운 기능을 사용하는 데 순조롭게 전환할 것을 권장합니다.

우리 모두가 빠지는 '튜토리얼 지옥'이 있습니다. 이는 필요한 기술을 습득하지 못한 채 튜토리얼을 계속 따라가는 것을 의미합니다. 이러한 비생산적인 사이클을 깨는 방법은 먼저 그것에 갇혔을 때 인지하는 것입니다. 그런 다음 핵심은 개인 프로젝트에 집중하고 문제가 발생할 때 스스로 해결책을 찾으며 점차 당신만의 안도로 코드를 확신 있게 작성하는 능력을 키우는 것입니다.

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

튜토리얼에 의존을 극복한 후에는 프로젝트의 미적 측면에서 어려움을 겪을 수 있습니다. 케빈은 코딩과 디자인이 별개의 기술이라고 강조하며, 웹 디자인을 개선하기 위해서는 연습이 필요하다고 말합니다. 그는 iCodeThis와 Frontend Mentor 같은 플랫폼을 추천하는데, 이들은 매일 코딩 도전 과제와 실제 프로젝트 시뮬레이션을 제공하여 실전 경험과 커뮤니티 피드백을 통해 코딩과 디자인 기술을 향상시킵니다.

HTML, CSS, JavaScript의 기본을 충분히 익힌 후에는 케빈이 React 등의 복잡한 프레임워크로 바로 넘어가기 전에 Astro 작업을 배우는 것을 추천합니다(시간이 허용된다면). Astro는 클라이언트 사이드 JavaScript를 줄이면서 빠르고 확장 가능한 웹사이트를 구축하는 데 도움이 되는 현대적인 정적 사이트 생성기입니다. 케빈은 Astro를 배우는 것을 추천하는데, 이는 다양한 프론트엔드 기술에 대한 실전 경험을 제공하여 초급 웹 개발에서 고급 프레임워크로의 전환을 용이하게 합니다.

케빈은 당신에게 가장 적합한 프레임워크를 선택하는 데 도움을 주기 위해 로컬 또는 희망하는 원격 작업 목록을 살펴보고 어떤 프레임워크가 요구되는지 확인하는 것을 제안합니다. 확신이 부족하다면, React가 인기 있는 옵션이라고 합니다.

웹 개발을 배울 때, freeCodeCamp, Codepen 또는 Scrimba와 같은 플랫폼은 브라우저 기반 코딩을 제공하여 데스크톱 IDE가 필요 없게 합니다. 로컬 개발 환경으로 전환하려면 나의 Hashnode 피처드 기사 "Vite로 로컬 React 환경 생성하는 방법"을 참고하여 자세한 지침을 제공합니다. 더 나아가기 위해, 스텝바이스텝 설치 지침서인 나의 안내서 "명령줄을 통해 React 프로젝트 만들고 GitHub에 푸시하며 Netlify로 배포하기"를 확인해보세요.

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

Kevin Powell의 뉴스레터에 가입하여 웹 개발 기술을 더 깊이 있게 배우고 산업 트렌드를 따라갈 수 있는 독점적인 자습서와 팁을 받아보세요! 또한 Kevin의 Discord에 가입하여 학습과 성장에 열정적인 커뮤니티와 소통할 수도 있어요. 더 알고 싶나요? Kevin의 프리미엄 코스로 웹 개발을 기초부터 고급까지 완전히 마스터할 수 있어요. 지금 구독하고 가입하여 CSS의 왕이 되기까지 여정을 계속하세요!
