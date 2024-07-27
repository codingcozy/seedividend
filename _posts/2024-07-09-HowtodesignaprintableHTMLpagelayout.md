---
title: "인쇄 가능한 HTML 페이지 레이아웃 디자인하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-HowtodesignaprintableHTMLpagelayout_0.png"
date: 2024-07-09 18:31
ogImage:
  url: /assets/img/2024-07-09-HowtodesignaprintableHTMLpagelayout_0.png
tag: Tech
originalTitle: "How to design a printable HTML page layout"
link: "https://medium.com/@karthikricssion/how-to-design-a-printable-html-page-layout-802bc9ea61dd"
---

프린트 가능한 HTML 페이지는 신입 개발자나 경험 많은 프론트엔드 개발자들에게 항상 악몽이었어요. 제가 3년 전에 유사한 스타일을 작업했었는데, 여전히 StackOverflow에서 많은 연구를 해서 해결책을 찾아야 했어요. 하나를 만들고 그 과정에 대해 글을 써보기로 했어요. 도움이 될 것 같아서요.

먼저, “sheet-outer” 클래스 이름이 있는 div를 만들어보죠. 그 안에 “A4” 클래스를 더하고, 내용이 들어갈 inner div를 만들어요. “sheet” 클래스 이름을 추가하고 내용을 넣어주세요. 이 예시에서는 “A4” 시트를 사용했고, 그 안에 article 요소를 추가했어요.

```js
<div class=”sheet-outer A4”>
    <section class=”sheet”>
        <article>This is an A4 document.</article>
    </section>
    <section class=”sheet”>
        <article>This is an A4 document.</article>
    </section>
</div>
```

이제 sheet와 outer sheet에 스타일을 추가해봅시다.

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

```json
{
  "body": "본문 { 여백: 0 }",
  "sheet-outer": "{ 여백: 0 }",
  "sheet": "{ 여백: 0; 숨김 표시: 숨김; 위치: 상대적; 상자 크기: 테두리 상자; 페이지 나누기: 항상;}"
}
```

인쇄 가능한 페이지와 같은 모양과 느낌을 얻기 위해서 위의 스타일에 아래 코드를 추가하십시오

```json
{
  "@media screen": {
    "body": "{ 배경: #e0e0e0 }",
    "sheet": "{ 배경: 흰색; 그림자: 0 .5mm 2mm rgba(0,0,0,.3); 여백: 5mm auto; }"
  }
}
```

A4 페이지 크기를 mm 단위로 추가하십시오.

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
.sheet-outer.A4 .sheet {
    width: 210mm;
    height: 296mm;
}
.sheet.padding-5mm {
    padding: 5mm;
}
```

출력용 시트에 여백을 설정하도록 시트에 패딩 클래스를 추가하세요.

```js
<div class="sheet-outer A4">
  <section class="sheet padding-5mm">
    <article>This is an A4 document.</article>
  </section>
  <section class="sheet padding-5mm">
    <article>This is an A4 document.</article>
  </section>
</div>
```

마지막으로 CSS에서 페이지 크기를 A4로 설정하고 레이아웃의 A4 크기를 설정하기 위해 인쇄 옵션을 사용하세요.

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
@페이지 {
    크기: A4;
    여백: 0
}
@media 인쇄 {
    .시트-외부.A4, .시트-외부.A5.가로 {
        너비: 210mm
    }
}
```

위 단계를 따라하면 아래에 표시된 대로 출력물을 얻을 수 있습니다.

<img src="/ui-log-2/assets/img/2024-07-09-HowtodesignaprintableHTMLpagelayout_0.png" />
