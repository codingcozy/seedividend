---
title: "CSS에서 기본 글꼴 크기로 10px 또는 625를 설정해서는 안 되는 이유"
description: ""
coverImage: "/assets/img/2024-06-20-Whyyoushouldneverset10pxor625asyourbasefontsizeinCSS_0.png"
date: 2024-06-20 03:14
ogImage:
  url: /assets/img/2024-06-20-Whyyoushouldneverset10pxor625asyourbasefontsizeinCSS_0.png
tag: Tech
originalTitle: "Why you should never set 10px or 62.5% as your base font size in CSS"
link: "https://medium.com/frontend-for-everyone/why-you-should-never-set-10px-or-62-5-as-your-base-font-size-in-css-a1c768f23d62"
isUpdated: true
---

세계와 기술이 발전함에 따라 억지로 무언가를 작동하려고 하면 나중에 문제가 발생할 수 있습니다. 특히 CSS에서 기본 글꼴 크기를 조정하는 개발자들에게 이는 특히 사실입니다. 이 기사에서는 기본 글꼴 크기를 처리하는 다양한 방법을 효과적인 방법부터 최적의 방법까지 다루고 그들을 올바르게 사용하는 방법을 설명하겠습니다. 그러나 가장 중요한 것은...

#사람들이 왜 기본 글꼴 크기를 설정하는가?

이를 이해하려면 CSS에서 다른 측정 단위인 rem을 이해할 필요가 있습니다. 이 단위는 루트 또는 HTML 문서 요소의 글꼴 크기를 나타냅니다. 대부분의 브라우저는 1rem = 16px를 기본 글꼴 크기로 설정하는데, 이 크기는 좋은 가독성을 제공하며 사용자가 브라우저 설정을 조정할 때 쉽게 확대할 수 있습니다.

개발자들은 레이아웃 속성(여백, 안쪽여백, 글꼴 크기 등)을 정의하는 데 이 단위를 사용할 수 있습니다. 예를 들어, 여백을 2rem으로 설정하면 32px로 설정하는 것과 같습니다. 그러나 개발자가 무언가를 12px로 설정하고 싶을 때는 어떻게 해야 할까요? 계산을 해야 합니다.

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

```js
12 / 16 = 0.75rem
```

이런 계산을 피하기 위해 개발자들은 보통 기본 글꼴 크기를 10px로 변경합니다.

```js
html {
  font-size: 10px;
}
```

그리고 와! 12px를 설정하고 싶다면 10으로 나누면 1.2rem이라는 답을 쉽게 찾을 수 있습니다. 좋아 보이나요? 하지만 이것이 많은 문제의 근본이 되고 피해야 할 필수적인 것임을 알게 될 것입니다.

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

# 기본 글꼴 크기를 10px로 설정합니다

우리는 방금 본 것처럼, 기본 글꼴 크기를 10px로 설정하여 시작하겠습니다. 하지만 먼저 강조하고 싶은 것은

계산이 우리의 해결책을 이끌 때 특히 문제를 야기할 수 있는 경우에는 안내서는 안 되는 것입니다.

- 접근성: 글꼴 크기를 너무 작게 설정하면 접근성 지침을 위반할 수 있으며, 일부 사용자들이 콘텐츠와 상호 작용하기 어렵게 할 수 있습니다.
- 가독성: 본문 텍스트는 최소 16px 이어야 하며, 가독성을 높이기 위해 텍스트 크기를 12px보다 작게 설정하면 안 됩니다. 그렇지 않으면 사용자는 콘텐츠를 편안하게 읽기 위해 확대하거나 브라우저 설정을 조정해야 할 수 있습니다.
- 사용자 설정 무시: 브라우저는 사용자의 기계에서 기본 설정을 가져옵니다. 사용자가 기계에서 텍스트를 확대한 경우, 기본 글꼴 크기를 무시하는 것은 사용자 설정을 무시하는 것이며, 절대로 해서는 안 되는 것 입니다.

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

# 기본 글꼴 크기를 62.5%로 설정하기

앞서 언급한 문제들을 해결하기 위해 개발자들은 다음과 같은 접근 방식을 고안했습니다.

```js
html {
  font-size: 62.5%; // 글꼴 크기를 1rem = 10px로 설정
}

body {
  font-size: 1.6rem; // 글꼴 크기를 다시 10*1.6 = 16px로 설정
}
```

이는 1rem = 10px로 간편한 계산과 16px로 표준을 따르는 본문 크기를 가질 수 있는 똑똑한 해결책입니다.

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

이것은 멋져 보이지만 말했듯이 세상은 변화하고 변화에 따라 이전에 없던 많은 문제가 발생합니다.

# 웹 구성 요소와 마이크로 프론트엔드

웹 구성 요소는 개발자가 재사용 가능한 사용자 정의 HTML 요소를 만들 수 있는 널리 사용되는 웹 API입니다. 기본적으로 HTML, CSS 및 JavaScript 코드를 단일한, 독립적인 단위로 패키징하여 다른 프로젝트에서 쉽게 재사용하고 다른 사람들과 공유할 수 있는 방법입니다. 마찬가지로, 마이크로 프론트엔드는 독립적인 앱이 다른 앱 내부에서 사용되는 아키텍처입니다.

가령 rem 단위를 기반으로 웹 구성 요소 라이브러리를 생성했다고 가정해보겠습니다. rem은 응답성에 많이 사용되는 인기 있는 단위입니다. 이러한 컴포넌트는 1 rem = 16px를 기반으로 설계되어 있습니다. 그렇다면 이러한 컴포넌트를 기본 글꼴 크기가 1 rem = 62.5% = 10px인 웹 앱에서 사용하면 어떻게 될까요?

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

구성 요소 디자인은 모든 글꼴 크기가 축소되어 나쁘게 보일 것입니다. 버튼 글꼴 크기가 1rem(16px)를 사용하도록 설계된 경우, 새 앱에서는 10px이 될 것입니다. 또한 웹 구성 요소에 대해 특정하게 기본 글꼴 크기를 재정의할 수 있는 방법이 없습니다. 기본 글꼴 크기는 항상 루트에서 가져옵니다.

<img src="/assets/img/2024-06-20-Whyyoushouldneverset10pxor625asyourbasefontsizeinCSS_0.png" />

비슷하게, 다른 앱 내에서 사용되는 마이크로 프런트엔드가 있는 경우 어떻게 될까요? 원래 마이크로 프런트엔드도 디자인에 rem 단위를 사용하고 있습니다. 그러나 기본 글꼴 크기를 62.5%로 설정하는 앱에서 사용되고 있다면 동일한 문제가 발생할 것입니다. 상기 이미지에서 확인할 수 있듯이요.

# 좋은 실천 방법

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

기본 글꼴 크기를 설정하지 않으면 사용자의 브라우저가 사용자가 사용하고 싶은 글꼴 크기를 결정하므로 매우 간단합니다. 이렇게 하면 오늘의 문제뿐만 아니라 미래의 불확실성도 피할 수 있습니다.

끝까지 읽어 주셔서 감사합니다!

다음 기사를 기다렸습니다. 구독해 주시고 기다려 주세요.
