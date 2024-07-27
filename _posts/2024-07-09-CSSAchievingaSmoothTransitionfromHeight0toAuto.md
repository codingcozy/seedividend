---
title: "CSS 높이 0에서 자동으로 부드럽게 전환하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-CSSAchievingaSmoothTransitionfromHeight0toAuto_0.png"
date: 2024-07-09 18:20
ogImage:
  url: /assets/img/2024-07-09-CSSAchievingaSmoothTransitionfromHeight0toAuto_0.png
tag: Tech
originalTitle: "CSS: Achieving a Smooth Transition from Height 0 to Auto!"
link: "https://medium.com/@mannycode/css-achieving-a-smooth-transition-from-height-0-to-auto-14e554885497"
---

![이미지](/ui-log-2/assets/img/2024-07-09-CSSAchievingaSmoothTransitionfromHeight0toAuto_0.png)

만약 CSS를 조금 다뤄보았다면, 아마도 높이를 0에서 자동으로 전환하는 것을 시도해보았고, 협조하지 않을 때의 실망을 경험한 적이 있을 것입니다! 😢

다행히도, CSS 그리드를 사용하는 깔끔한 솔루션이 있습니다. 이를 통해 전환이 쉽게 이루어지면서도 매끄럽게 작동됩니다!

실용적인 예시인 쉬운 따라하기 아코디언에 대해 알아봅시다:

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

HTML 구조는 간단합니다:

```javascript
<div class="accordion">
  <div class="accordion-title">Hover me!</div>
  <div class="accordion-body">
    <div>
      <p>Lorem ipsum ...</p>
    </div>
  </div>
</div>
```

아코디언 위에 마우스를 올리면 드롭다운이 나타납니다. 멋지죠, 그런데 부드러운 전환을 원한다면 어떻게 할까요?

이전에 시도한 CodePen에서 높이 속성에 전환 효과를 추가했습니다:

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
.accordion-body {
  height: 0;
  transition: 500ms height ease;
}

.accordion:hover .accordion-body {
  height: auto;
}
```

❌ 높이가 0에서 자동으로 변경되는 것이 CSS의 한 가지 문제입니다.

🤔 이를 극복하는 방법은 무엇일까요?

가능한 해결책은 max-height를 사용하는 것입니다:

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

```css
.accordion-body {
  max-height: 0;
  transition: 500ms max-height ease;
}
.accordion:hover .accordion-body {
  max-height: 200px;
}
```

동작은 하지만 고정된 max-height를 지정하는 것은 이상적이지 않을 수 있으며 콘텐츠 오버플로우로 이어질 수 있습니다.

CSS Grid로 변경해보세요!

CSS 그리드를 사용하여 한 개의 그리드 아이템을 만드는 멋진 방법이 있습니다. grid-template-rows를 0fr에서 1fr로 전환하도록 설정하여 항목이 0에서 자연스러운 높이로 부드럽게 전환되도록합니다:

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
.accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: 250ms grid-template-rows ease;
}
.accordion:hover .accordion-body {
  grid-template-rows: 1fr;
}
.accordion-body > div {
  overflow: hidden;
}
```

요렇게 하면 깔끔하고, 고정된 높이 없이 기능적인 아코디언이 완성돼요. 멋지죠! 😄

유일한 주의점은 `.accordion-body` 내부 div에 `overflow: hidden`을 추가하는 것입니다. 작은 CSS 추가지만 보람이 있죠. 댓글로 의견 공유해 주세요!

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

이 요령은 grid-template-rows의 애니메이션 가능성에 의존합니다.

이 기능은 특정 브라우저에서 비교적 최근에 추가되었습니다. 이 페이지를 확인하면 예를 들어 Chrome의 경우, 그리드 트랙을 애니메이트할 수 있는 기능은 버전 107부터 사용 가능하다는 것을 알 수 있습니다.

이 기능은 비교적 최근에 추가되었기 때문에 브라우저 호환성을 확인하세요. 주요 브라우저에서 일반적으로 지원되지만, 제작 코드에서 사용하기 전에 항상 확인해야 합니다!
