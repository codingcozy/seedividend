---
title: "접근성을 위한 HTML5 inert 속성 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-12-HTML5inertattributeforAccessibility_0.png"
date: 2024-07-12 19:14
ogImage: 
  url: /assets/img/2024-07-12-HTML5inertattributeforAccessibility_0.png
tag: Tech
originalTitle: "HTML5 inert attribute for Accessibility"
link: "https://medium.com/javascript-in-plain-english/html5-inert-attribute-for-accessibility-992b592b7480"
isUpdated: true
---




아래는 Markdown 형식으로 변경된 내용입니다.


![HTML5 inert attribute for Accessibility](/assets/img/2024-07-12-HTML5inertattributeforAccessibility_0.png)

HTML5 inert 속성은 사용자 이벤트인 클릭, 포커스 또는 호버 또는 어떠한 보조 기술을 페이지의 주의를 요구하지 않는 부분에서 제거할 수 있는 전역 속성입니다. 예를 들어, 모달이 열려 있을 때 모달의 배경에서 상호 작용이 활성화되지 않습니다. 또한, 개발자들은 이제 원치 않는 접근성 코드를 작성하지 않아도 되므로 포커스가 원치 않는 영역으로 이동하는 것을 방지할 수 있습니다. 일반적으로 모달의 경우 포커스는 모달 자체 내에 유지되어야 합니다. 이를 위해 개발자들은 특정 요소를 대상으로 하는 해킹된 JavaScript 코드를 작성하고 다음 탭 또는 Shift+Tab 이벤트에서 포커스가 특정 요소로 돌아가도록 합니다.

이 속성은 일관된 지원을 받습니다:

![HTML5 inert attribute for Accessibility](/assets/img/2024-07-12-HTML5inertattributeforAccessibility_1.png)


<div class="content-ad"></div>

HTML5의 새 요소 `dialog/dialog`는 기본적으로 inert 동작을 가지고 있습니다. 따라서 이 요소가 모달 팝업에 사용된다면 포커스를 관리하기 위한 탭 및 shift+탭을 처리하는 JavaScript 코드를 작성할 필요가 없습니다. 포커스는 대화 상자 요소 내의 요소를 따라 순환합니다. inert 속성은 사용자 정의 요소와 구성 요소와도 잘 작동합니다.

HTML의 문맥에서 inert란 움직임이 없음을 의미합니다. 특정 요소에 inert가 추가되면 해당 요소의 움직임이나 상호 작용이 제거됩니다. 그런 다음 이러한 요소는 시각적으로 비활성화된 요소로 동작합니다.

아래 코드 예시를 살펴봅시다:

```js
<div>
  <label for="button1">버튼 1</label>
  <button id="button1">비inert입니다</button>
</div>
<div inert>
  <label for="button2">버튼 2</label>
  <button id="button2">inert입니다</button>
</div>
```

<div class="content-ad"></div>

두 번째 `div` 요소에는 inert 속성이 있습니다. 두 번째 `div` 내의 모든 내용/요소는 초점을 받거나 사용자 클릭 이벤트나 사용자 키보드 이벤트를받지 않습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*gmptrnmRsjKAU-3xau-oXw.gif)

inert 속성이 자주 사용되는 두 가지 시나리오가 있습니다. 포커스 트랩핑 및 향상된 접근성:

- 요소가 DOM 트리의 일부이지만 화면 밖이나 숨겨진 상태인 경우.
- 요소가 DOM 트리의 일부이지만 상호 작용하지 말아야 하는 경우.

<div class="content-ad"></div>

HTML 페이지에서 화면 밖이거나 상호 작용이 불가능한 요소는 웹 사이트의 접근성을 높이는 동안 개발자가 직면하는 가장 일반적인 도전 과제입니다. 개발자들은 화면 밖에 있는 요소에 초점이 가지 않길 원합니다. 또한, 요소가 상호 작용이 불가능한 경우에도 개발자들은 해당 요소에 초점이 두어지지 않기를 바랍니다.

## 화면 밖 요소 예시

보통 사용자 경험(UX)에 드로어 컨테이너가 포함된 경우, 요소들은 종종 화면 안팎으로 이동합니다. inert를 사용하면 드로어 하위 요소가 화면을 벗어나 있을 때 키보드 사용자가 실수로 상호 작용할 수 없도록 할 수 있습니다. 요소가 화면 밖에 있거나 드로어 요소에 의해 숨겨진 경우 사용자가 해당 요소와 상호 작용할 것으로 예상되지 않습니다. 예시:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*FoBY3lkAC_E9LWuYqjgmBQ.gif)

<div class="content-ad"></div>

```js
$(function() {
  $('body').click(function() {
    const drawer = $('#drawer')[0];

    // Ensure the drawer is *inert* when closed
    drawer.inert = drawer.inert ? false : true;
    $('#drawerStatus').html(`${drawer.inert}`);

    $('#drawer').toggleClass('drawer-closed','normal');
    return false;
  });
});
```

서랍이 닫힌 경우 비활성화됩니다. 서랍이 열리면 활성화되며 비활성화 속성이 제거됩니다.

## 다이얼로그에서 포커스 트래핑

기본적으로 `dialog` 요소는 비활성화 동작을 보입니다. 다이얼로그가 열리지 않은 경우, 포커스는 요소나 다이얼로그 자체에 받아들이지 않습니다. 다이얼로그가 열린 상태에서는 본문이 포커스를 받지 않습니다.

<div class="content-ad"></div>

아래 코드를 확인해주세요:

```js
<main>
      <h1>Dialog Demo</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        recusandae amet, rerum quasi quaerat ipsum nam earum vitae distinctio
        deleniti. Rerum earum excepturi ab, totam tenetur fuga praesentium illum
        repudiandae.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        recusandae amet, rerum quasi quaerat ipsum nam earum vitae distinctio
        deleniti. Rerum earum excepturi ab, totam tenetur fuga praesentium illum
        repudiandae.
      </p>

      <!-- Dialog 버튼 -->
      <button onclick="window.dialog.showModal();">Dialog 열기</button>
    </main>

    <!-- Dialog 팝업 -->
    <dialog
      id="dialog"
      class="">
      <h2>Hello.</h2>
      <p>열려 있는 다이얼로그 요소입니다.</p>
      <p>
        페이지의 나머지 부분은 비활성화되어 있습니다 - 페이지의 다른 곳을 클릭하여 테스트해보세요.
      </p>
      <button
        onclick="window.dialog.close();"
        aria-label="닫기"
        class="x">
        ❌
      </button>

      <button>확인</button>
    </dialog>
```

이미지를 보세요:

![Inert Elements](https://miro.medium.com/v2/resize:fit:1400/1*p5JKkicK2SmHrnaWOQio8Q.gif)

## 비활성화된 요소를 시각적으로 구분하세요

<div class="content-ad"></div>

아래에 언급된 간단한 CSS 스타일을 사용하여 비활성 요소를 시각적으로 구별할 수 있습니다:

```js
[inert], [inert] * {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
  user-select: none;
}
```

이는 모든 비활성 요소 및 비활성 요소 내의 모든 요소를 대상으로 하며, 비활성 및 상호작용 불가능한 방식으로 표시합니다:

<img src="/assets/img/2024-07-12-HTML5inertattributeforAccessibility_2.png" />

<div class="content-ad"></div>

## 상호 작용 및 이동 차단

기본 상태에서 inert는 포커스 및 클릭 이벤트를 모두 차단합니다. 이로 인해 탭 이동이 어려워지고 보조 기술에서 발견성이 떨어집니다. 또한, 브라우저는 지정된 요소 내에서 페이지 검색 및 텍스트 선택을 무시할 수 있습니다.

inert 속성의 초기 설정은 false로 되어 있습니다.

가장 알려지지 않은 속성 중 하나에 대한 이 작은 지식이 도움이 되었으면 좋겠고, 이를 통해 웹사이트의 접근성이 향상되기를 바랍니다. 제 미디엄 페이지를 팔로우해 주시면 감사하겠습니다.

<div class="content-ad"></div>

# 친절한 영어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기