---
title: "HTML CSS 실전 팁  스크롤 가능한 테이블 본문 tbody 쉽게 만드는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 18:45
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "HTML CSS Tricks — Scroll-able Table Body <tbody>"
link: "https://medium.com/@vembarrajan/html-css-tricks-scroll-able-table-body-tbody-d23182ae0fbc"
isUpdated: true
---

테이블 본문을 스크롤할 수 있도록 만든 상단 고정 테이블 헤더의 문제를 해결할 수 있는 간단한 요령입니다. 이를 통해 데이터 테이블을 더 쉽게 사용할 수 있습니다. 사용자가 스크롤할 때 고정된 테이블 헤더는 사용자가 어떤 열에 있는지 컨텍스트를 제공합니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*WntU4JaVwB3SwZ_UtzyJ6g.gif" />

기본적으로 오버플로 속성은 테이블 그룹 요소 thead, tbody, tfoot에 적용되지 않습니다. 아래 펜에서 직접 확인할 수 있습니다.

작동하게 하려면,

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

첫 번째 단계는 `tbody`를 `display:block`으로 설정하여 높이와 오버플로 속성을 적용할 수 있도록 하는 것입니다.

두 번째 단계는 `thead`의 `tr`을 `display:block`으로 설정하는 것입니다.

그러면 최종 CSS는 다음과 같을 것입니다.

```js
.fixed_header tbody{
  display:block;
  overflow:auto;
  height:200px;
  width:100%;
}
.fixed_header thead tr{
  display:block;
}
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

아래 예시,

테이블을 만드는 마크업은 간단하고 의미론적입니다. 그리고 JavaScript 종속성 없이 문제를 해결합니다.

개선 제안이나 문제를 발견하면 댓글에서 알려주세요.
