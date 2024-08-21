---
title: "position sticky를 생각없이 사용하면 안되는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Position stuck  and a way to fix it"
link: "https://medium.com/user-experience-design-1/position-stuck-96c9f55d9526"
isUpdated: true
---

## overflow를 사용할 때 position: sticky;의 단점

안녕하세요! 두 분은 아마도 'sticky elements' 또는 'frozen panes'라고도 알고 계실 겁니다. 이러한 요소는 주로 Microsoft Excel과 같은 행/열 기반 애플리케이션에서 사용되어 영원한 기간 동안 존재해 왔어요.

스티키 요소는 또한 모바일 (원생) 애플리케이션과 웹 디자인에서도 널리 사용됩니다. 이러한 요소들은 사용자들이 긴 목록을 정렬하거나 온라인 쇼핑 중에 주문 세부 정보를 추적하는 동안 관점을 유지할 수 있도록 도와줍니다.

![GIF Image](https://miro.medium.com/v2/resize:fit:1400/1*3nZKIeuc5a0yso6-SA2gAw.gif)

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

이 기사에서는 position: sticky;의 단점을 살펴보고, 오버플로우와 함께 작업할 때 발생하는 FRUSTRATION을 극복하기 위한 창의적 기술을 생각해볼 수 있을지에 대해 탐구하고 싶습니다.

이 기사를 쓰게 된 동기는 Elad Shechter의 기사 댓글을 읽은 것에서 비롯됩니다. 따라서 제가 position: sticky; 작업을 하면서 겪은 경험을 전하고 싶었습니다.

참고! 저는 position: sticky;가 어떻게 작동하는지 심층적으로 다루지 않을 것입니다. 기본 사항을 배우고 싶다면 Elad Shechter의 입문 기사를 읽어보시기를 권장합니다. https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46

시작해 보겠습니다.

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

# 예전 방식

브라우저 창에서 요소를 고정 및 정적으로 동작하도록 지시하는 것은 다소 어려운 일일 수 있습니다. 이전(현대적인) 브라우저에서 기본 해결책이 도입되기 전에는 헤더, 측면 막대 등의 항목에 대해 javascript 및 position: fixed;을 사용하여 가짜로 고정 동작을 만들어야 했습니다. Javascript는 스크롤 이벤트 및 문서 내 요소의 위치를 수신하며, 수학적 계산이 일치하는 순간 "sticky"와 같은 클래스를 추가하여 지시에 따라 요소에 position: fixed;를 지정합니다.

비교적 복잡하고 신중하게 연출된 기술로서, 상대적으로 간단해야 할 일에 대한 기술입니다. 이 기술에는 몇 가지 명백한 단점이 있습니다:
a) 요소가 문서 흐름에 참여하지 않아 고정된 후 점프가 발생할 수 있으며,
b) 스크롤 이벤트로 인한 연속적인 다시 그리기 및 콜백으로 인한 잠재적인 성능 저하가 발생할 수 있습니다 (성능 문제를 쓰로틀링, 디바운싱(https://www.sitepoint.com/throttle-scroll-events/) 또는 교차 옵저버(https://css-tricks.com/design-v17/#article-header-id-3)와 같은 기술을 사용하여 처리할 수 있습니다).

# 고정 방식

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

`<table>` 태그를 Markdown 형식으로 변경하면 아래와 같이 됩니다.

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

그러나 position: sticky;은 때로 다루기 까다로운 친구가 될 수 있어요 — 특히 우리가 오버플로우를 소개할 때.

# 오버플로우 문제

컬럼과 행이 넘치는 테이블에 페이지에서 스티키 헤딩을 가지고 싶다고 가정해 봅시다. 문서 창을 스크롤할 때 헤딩이 고정되어 있기를 원하며, 오버플로우 컨테이너 내에서 수평으로 스크롤할 수 있기를 원합니다.

그러나 오버플로우를 다룰 때 스티키 엘리먼트가 예상한대로 고정되지 않아 약간의 답답함을 느낄 수 있습니다. 오버플로우를 추가하면 브라우저가 position: sticky;를 제대로 적용하지 않는 것처럼 보일 수 있습니다.

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

오버플로우 문제에 대해요...

이 코드펜(Valtteri Laitinen의)에서 동일한 동작이 복제되었습니다:

이건 우리가 원하는 건데, 테이블을 수직으로 스크롤하면 제목이 스틱되지 않아요. 부모 컨테이너에 오버플로우 속성이 있는 경우 문제가 발생해요. 오버플로우를 제거하면, 제목이 예상대로 스틱됩니다(체크박스를 토글해보세요).

그래서 우리는 어떻게 대처할까요?

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

## 고정 높이 추가하기

인터넷에서 답변을 찾아보던 중 유용한 제안을 발견했어요: 오버플로우가 발생하는 컨테이너에 높이를 명시하는 것이에요.

이 간단화된 버전에서는 오버플로우가 발생하는 컨테이너에 고정 높이를 설정해두었어요:

이렇게 하면 제목이 붙지만, 컨테이너 내에서 스크롤할 때만 작동하며 문서 창에서 작동하지는 않아요.

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

안타깝지만, 그렇게 하면 안 됩니다.

# 제안하는 해결책

먼저 표의 제목을 별도로 분리해 봅시다. 제목은 자체 div(“headers” 안에 포함되어 있기를 원합니다. 이렇게 하면 제목을 따로 처리할 수 있습니다. 이 div에 position: sticky;를 할당하고, 가로로 스크롤할 수 있도록 다른 div인 “scroller”를 추가합시다.

```js
<!-- HTML -->
<div class="wrap">
  <div class="headers">
    <div class="scroller">
      <div class="track">
        <div class="heading">표 제목 1</div>
      </div>
      ...
    </div>
  </div> <!-- headers -->
...
/* 스타일 */
.headers {
  position: sticky;
  top: 0;
  z-index: 1;
}
.scroller {
  overflow: auto;
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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*BWfyn1iSEY7vOqBH02Xihg.gif)

이제 문서 창을 스크롤할 때 표 중 제목이 고정됩니다. 하지만 아직 완벽하지는 않습니다. 가로로 스크롤할 때, 표 열과 함께 제목이 이동하지 않음을 주목해주세요.

이를 해결하기 위해 두 컨테이너의 스크롤을 동기화할 수 있는 작은 스크립트(946바이트)를 추가해야 합니다. 이름 속성과 함께 .syncscroll 클래스를 추가하여 두 DIV의 스크롤을 동기화할 수 있습니다.

또한, 제목 컨테이너에 수평 스크롤 막대가 생기는 것을 방지하기 위해 다음을 추가해주어야 합니다:

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
.scroller {
  overflow-x: hidden;
}
```

이렇게 하면 우리가 원하는 결과가 나옵니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*sgqPD_LVrqrCVs81g2Rkvg.gif" />

그리고 여기에 실제 예시가 있습니다:

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

<img src="https://miro.medium.com/v2/resize:fit:1400/1*N_YlSmYVqO0bx81XT6vwAA.gif" />

최근 순회 컨테이너를 동기화하기 위한 순수 CSS 솔루션을 찾지 못했어요.

## 브라우저 지원에 대한 참고 사항

테이블에서 thead와 관련된 작은 문제를 제외하고는, position: sticky;에 대한 브라우저 지원이 상당히 양호해요. 그러나 오래된 친구 인터넷 익스플로러는 이것을 인식하지 않습니다. 그래서 오래된 브라우저에서 "sticky" 요소를 사용하고 싶다면, stickyfill과 같은 폴리필을 사용하는 것을 고려해보세요.

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

또 기억해야 할 것은 Safari에서 접두사를 필요로 한다는 것이에요 (position: -webkit-sticky).

그게 다야—나의 의견 두 마디였어. 즐겁게 읽으셨기를 바라며.

이 글에 대해 다른 기술을 아시거나 이 기사에 댓글을 달고 싶다면 알려주세요.
