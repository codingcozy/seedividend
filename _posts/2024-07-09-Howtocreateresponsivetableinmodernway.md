---
title: "최신 방식으로 반응형 테이블 쉽게 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-Howtocreateresponsivetableinmodernway_0.png"
date: 2024-07-09 18:52
ogImage:
  url: /assets/img/2024-07-09-Howtocreateresponsivetableinmodernway_0.png
tag: Tech
originalTitle: "How to create responsive table in modern way"
link: "https://medium.com/@snowleo208/how-to-create-responsive-table-d1662cb62075"
---

표는 데이터를 나타내는 데 중요한 도구이지만, 작은 화면(예: 모바일 및 태블릿)에서는 데이터를 다르게 나타내는 것이 중요합니다. 그렇지 않으면 혼돈스러워질 수 있어요!

![이미지](/ui-log-2/assets/img/2024-07-09-Howtocreateresponsivetableinmodernway_0.png)

# 새로운 친구: Flexbox

현대 브라우저에서는 우리 모두가 반응형 표를 만들기 위해 플렉스박스를 사용할 수 있어요! Flexbox에 대해 더 알고 싶다면, CSSTricks의 훌륭한 가이드를 항상 참고할 수 있어요!

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

우선 우리가 하고 싶은 것은 다음과 같습니다:

지금은 여행 상품에 관심을 두지 않고, 웹에서 복사하여 붙여 넣기만 하면 됩니다 (그래도 거기에 가고 싶긴 하지만 lol)!

먼저 테이블의 구조를 만들 수 있습니다. 가장 까다로운 부분은 "미국"에서의 중첩된 테이블인데, 중첩된 div를 사용하여 이를 처리할 것입니다:

간단하게 하기 위해 여기에서는 Flag Icon CSS를 사용하여 국기를 만들 것입니다. 제작 단계에서는 SVG 또는 SVG 스프라이트를 사용해야 하며, 대역폭을 더 절약하기 위해 몇 개의 국기만 필요합니다!

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

"United States"에 대한 중첩된 테이블을 보면 다른 클래스 열을 사용하여 생성했음을 확인할 수 있어요.

그리고, 저희 사랑스러운 CSS 스타일!

일반 행의 경우 .flex-table과 .flex-row를 사용하여 래핑하고, 행은 모두 25%로 동일합니다. 즉, 100% / 4로 나누어져요.

중첩된 행의 경우, 첫 번째 셀은 25%이며, .column을 컨테이너로 사용하여 너비를 75%로 조정하고, .rowspan 및 .flex-table로 테이블을 래핑해야 해요.

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

가장 중요한 것은 box-sizing입니다:

```js
div {
  box-sizing: border-box;
}
```

그렇게 하면 모든 여백, 테두리 등이 100%에 포함되지 않습니다. 이 코드를 사용하지 않았고 0.5em 여백을 추가했다면 너 자신이 너비를 계산해야 할 것입니다. 예: CSS에서 calc((100% - 0.5em) / 4).

두 번째로 중요한 것은 플렉스박스 레이아웃입니다!

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
display: flex;
flex-flow: row wrap;
```

여기서 보시다시피, 이 레이아웃에는 플렉스박스를 사용하고 모든 셀이 한 줄에 있으므로 이 코드를 .flex-table에 추가해야 합니다.

Flex-flow는 flex의 shorthand입니다. 첫 번째는 flex-direction으로, 모든 셀이 자동으로 행이 됩니다.

두 번째는 flex-wrap으로, 모든 요소가 컨테이너의 너비를 초과하면 자동으로 두 번째 줄로 넘어갑니다.

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

마지막으로, 테두리 설정도 중요합니다!

div의 테두리가 겹치기 때문에 모든 테두리는 고유해야 합니다. 이번에는 .flex-row에 아래 및 오른쪽 테두리를 설정하고 .flex-table에 왼쪽 테두리를 설정했습니다. 그래서 아래 테두리는 다음 행의 위쪽 테두리를 만들어줍니다 :)

```js
$table-header: #1976D2;
$table-header-border: #1565C0;
$table-border: #d9d9d9;
.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px $table-border;
  transition: 0.5s;
  &:first-of-type {
    border-top: solid 1px $table-header-border;
    border-left: solid 1px $table-header-border;
  }
  &:first-of-type .flex-row {
    background: $table-header;
    color: white;
    border-color: $table-header-border;
  }
}
```

여기가 최종 제품입니다:

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

# 신입: 그리드 레이아웃

이 방법을 모든 브라우저에서 사용할 수는 없지만, 브라우저의 80%만이 이를 지원합니다. 하지만, 한 번 시도해볼까요? 이전의 플렉스박스 테이블을 CSS 그리드 레이아웃으로 변경해 보겠습니다!

우선, 모든 플렉스박스 관련 속성을 삭제하고 다음을 추가해 보세요:

```js
.flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 25%);
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

25%로 반복(auto-fill, 25%)을 추가하면 25%의 행이 자동으로 생성됩니다.

태블릿 버전에서 가장 까다로운 부분은 중첩된 테이블인데, 첫 번째 셀이 100%로 변경됩니다. 이번에는 100%의 그리드를 만들어야 할까요? 아니요, 33.33%를 만들 것입니다. 이는 1행에 3개의 셀을 의미합니다.

```js
.flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33.33%);
    grid-template-rows: repeat(auto-fill, 100%);
}
.first {
    grid-column-start: 1;
    grid-column-end: 4;
}
```

이것이 무엇을 의미할까요? .first 클래스를 가진 div가 있을 때, 즉 첫 번째 셀인 경우, 1~3 그리드를 차지할 것입니다.

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

그 의미는 한 행에 33.33% \* 3 그리드를 만든 경우, 첫 번째 셀이 전체 행을 차지할 것입니다. 그런 다음 다음 행이 시작되고, 남은 항목은 모두 다음 행으로 이동합니다.

여기 최종 결과가 있습니다!

# 접근성은 어떨까요?

그래서 'div'를 사용하여 테이블을 만드는 것은 원시적이고 의미론적이지 않습니다. 테이블을 만드는 가장 좋은 방법은 여전히 원래의 'table' 태그를 사용하는 것입니다. 'div' 방법을 계속 사용할 수 있지만 'aria-labels'를 잊지 말아주세요!

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

만약 네이티브 방식을 사용하여 그것을 달성하고 싶다면, 반응형 버전이 여기 있습니다.

1990년대로 돌아간 듯한 느낌이죠! 그런데 덜한 HTML 및 CSS로 동일한 결과를 얻을 수 있으며, 접근성(접근성에 대해 더 알아보기) 및 개발에 더 많은 시간을 절약할 수 있어요.

이제는 어떤 방법으로 멋진 반응형 테이블을 만들겠습니까? 의견을 나누어 주시면 환영입니다!
