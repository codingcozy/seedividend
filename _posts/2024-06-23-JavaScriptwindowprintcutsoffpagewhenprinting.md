---
title: "JavaScript windowprint로 인쇄할 때 페이지가 잘리는 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-06-23-JavaScriptwindowprintcutsoffpagewhenprinting_0.png"
date: 2024-06-23 14:27
ogImage:
  url: /assets/img/2024-06-23-JavaScriptwindowprintcutsoffpagewhenprinting_0.png
tag: Tech
originalTitle: "JavaScript window.print() cuts off page when printing"
link: "https://medium.com/@abenezerdaniel147/javascript-window-print-cuts-off-page-when-printing-4cff3688d4aa"
isUpdated: true
---

![Printing Issue](/assets/img/2024-06-23-JavaScriptwindowprintcutsoffpagewhenprinting_0.png)

현재 페이지를 하드 복사본에 인쇄하는 window.print() 함수를 사용합니다. 그러나 스크롤했거나 문제가 발생한 경우 인쇄할 때 창의 일부가 잘릴 수 있습니다. 이는 함수가 페이지 맨 위에 있다고 가정하기 때문입니다. 이 문제를 해결하려면 몇 가지 단계를 거쳐야 합니다.

첫째, 사용자가 페이지를 인쇄하려면 버튼을 클릭할 때 JavaScript 이벤트인 "beforeprint"를 사용하여 페이지 맨 위로 스크롤할 수 있습니다. 버튼을 클릭할 때 스크롤 위치를 설정해야 하며, 사용자가 다시 아래로 스크롤하길 원하지 않을 수 있습니다.

```js
let scrollY = 0;

btn.addEventListener("click", () => {
  scrollY = window.scrollY;
  window.print();
});
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

그럼 사용자가 페이지 맨 위로 스크롤하도록 이전 인쇄 이벤트를 청취하세요.

```js
window.addEventListener("beforeprint", (e) => {
  scrollTo(0, 0);
});
```

마지막으로 인쇄 후에는 scrollY 변수를 사용하여 사용자를 처음에 있던 위치로 스크롤하십시오.

```js
window.addEventListener("afterprint", (e) => {
  scrollTo(0, scrollY);
});
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

이제 모든 것이 예상대로 원활하게 작동해야 합니다. 읽어 주셔서 감사합니다. 이 블로그가 도움이 되었다면, 자주 유용한 내용을 게시하고 있으니 Medium에서 저를 팔로우하여 개발 지식을 향상시키세요.
