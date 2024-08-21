---
title: "Tailwind CSS에 Signals가 도입된다"
description: ""
coverImage: "/assets/img/2024-07-09-SignalsareNowComingtoTailwindCSS_0.png"
date: 2024-07-09 13:57
ogImage:
  url: /assets/img/2024-07-09-SignalsareNowComingtoTailwindCSS_0.png
tag: Tech
originalTitle: "Signals are Now Coming to Tailwind CSS?"
link: "https://medium.com/javascript-in-plain-english/about-me-yevhen-a03fb7d03d20"
isUpdated: true
---

![Signals](/assets/img/2024-07-09-SignalsareNowComingtoTailwindCSS_0.png)

Tailwind Signals는 Tailwind CSS의 새로운 실험적인 기능으로, DOM 내의 모든 하위 항목이 사용자 지정 상태를 소비하여 더 깨끗한 코딩과 효율적인 스타일링을 가능하게 합니다. Signals는 가상 클래스 개념을 기반으로 하며, 부모와 자식 구성 요소 간의 양방향 통신을 허용하여 자식 구성 요소가 부모의 상태 변경에 반응하고 그 반대도 가능케 합니다.

다음 예시에서는 GitHub 페이지에서 제공된 예제를 활용한 JavaScript 없이 입력 상태에 따라 요소를 조건부로 스타일링하는 방법을 살펴볼 것입니다.

Signals을 사용하면:

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
<input type="checkbox" class="peer" /> 👈🏼 여기에서 선택 또는 해제할 수 있어요
<div class="peer-checked:signal hover:signal">
  <div class="signal:bg-green-800 bg-red-800 p-1 text-white">
    또는 여기를 호버해보세요
  </div>
</div>
```

시그널 없이:

```js
<input type="checkbox" class="peer" /> 👈🏼 여기에서 선택 또는 해제할 수 있어요
<div class="hover:[&gt;div]:bg-green-800 peer-checked:[&gt;div]:bg-green-800">
  <div class="bg-red-800 p-1 text-white">또는 여기를 호버해보세요</div>
</div>
```
