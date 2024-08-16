---
title: "브라우저가 팝오버 API 지원을 시작했습니다 빠른 안내"
description: ""
coverImage: "/assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_0.png"
date: 2024-05-15 15:32
ogImage: 
  url: /assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_0.png
tag: Tech
originalTitle: "Browser Begins Support for Popover API: A Quick Guide"
link: "https://medium.com/javascript-in-plain-english/browser-begins-support-for-popover-api-a-quick-guide-c02db5f5d312"
isUpdated: true
---




## 새로운 팝오버 API로 웹 개발을 간소화하세요

![이미지](/assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_0.png)

저의 뉴스레터에 원문이 게재되었습니다.

팝오버는 일시적으로 부유하는 오버레이 레이어에 추가 콘텐츠나 인터랙티브 요소를 표시하는 데 사용되는 범용 UI 구성요소입니다. 과거에는 이를 구현하기 위해 추가 작업이 필요했습니다.



거의 모든 주요 브라우저에서 이제 Popover API를 지원합니다. 이 API는 추가 라이브러리 없이 이러한 요소를 생성하고 관리하는 표준화된 방법을 제공합니다.

# popover Global Attribute

HTMLElement에 popover 속성을 추가하면 해당 요소가 팝오버로 변환됩니다. 이 팝오버 요소는 초기에 display: none을 사용하여 숨겨져 있지만 아래에서 설명하는대로 활성화될 때 표시됩니다.

활성화되면 팝오버는 다른 모든 요소 위에 표시되며 부모 요소의 위치 또는 오버플로 스타일에 영향을 받지 않습니다.



팝오버 속성은 "auto" (기본값) 또는 "manual" 값을 가질 수 있습니다. 자동 상태의 팝오버는 팝오버 영역 외부를 선택하여 "경량 해제" 할 수 있으며 일반적으로 한 번에 화면에 하나의 팝오버만 표시됩니다. 이에 반해, 수동 팝오버는 항상 명시적으로 숨겨져야 하지만 메뉴 내의 중첩된 팝오버를 허용합니다.

![팝오버 이미지](/assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_1.png)

# 활성화 방법

생성하는 두 가지 방법이 있습니다:



## HTML 선언

```js
<button popovertarget="mypopover" popovertargetaction="toggle">팝오버 토글</button>
<div id="mypopover" popover>팝오버 내용</div>
```

여기서 `popovertarget`은 새롭게 추가된 속성으로, `button` 또는 `input` 요소를 팝오버 제어 버튼으로 변환합니다. 이 속성은 제어하는 팝오버 요소의 ID를 값으로 갖습니다.

비슷하게, `popovertargetaction`도 새롭게 추가된 속성으로, hide, show, toggle을 받습니다. 기본값은 toggle이며, 생략 가능합니다. 이 속성은 팝오버 요소에 대한 제어 버튼의 작업을 지정합니다.



## JavaScript API

```js
// 팝오버 엘리먼트의 표시 상태를 토글합니다.
HTMLElement.togglePopover();

// 팝오버 엘리먼트를 상위 레이어에 추가하여 표시합니다.
HTMLElement.showPopover();

// 팝오버 엘리먼트를 상위 레이어에서 제거하고 display: none으로 스타일링하여 숨깁니다.
HTMLElement.hidePopover();
```

팝오버 속성을 가진 엘리먼트에 이러한 함수를 호출하면 원하는 효과를 빠르게 얻을 수 있습니다.

# 이벤트



팝오버 요소의 상태가 표시되거나 숨겨지는 경우, 몇 가지 작업을 수행해야 할 수도 있습니다. 브라우저는 다음과 같이 구성된 beforetoggle 이벤트와 toggle 이벤트를 제공합니다:

```js
interface ToggleEvent extends Event {
    readonly newState: string;
    readonly oldState: string;
}
```

여기서 newState와 oldState의 값은 모두 "open" 또는 "closed"입니다. 하지만 전자는 요소가 전이되는 상태를 나타내고, 후자는 요소가 전환되는 상태를 나타냅니다.

자세히 살펴보겠습니다:



## beforetoggle 이벤트

팝오버 요소의 상태가 보이는 상태와 숨겨진 상태 사이를 전환할 때 또는 그 반대로 전환하기 전에 발생합니다.

```js
const popover = document.getElementById("mypopover");

// ...

popover.addEventListener("beforetoggle", (event) => {
  if (event.newState === "open") {
    console.log("팝오버가 표시됩니다");
  } else {
    console.log("팝오버가 숨겨집니다");
  }
});

popover.showPopover();
popover.hidePopover();
// `beforetoggle` 이벤트는 한 번만 발생합니다
```

여러 개의 beforetoggle 이벤트가 발생하는 경우, 이벤트 루프가 한 번 순환하기 전에 모든 이벤트가 발생하는 것이 아니라 하나의 이벤트만 발생한다는 점을 유의하십시오.



## 토글 이벤트

팝오버 요소의 상태가 표시되거나 숨겨질 때 또는 반대로 변경된 직후에 발생합니다. 이 이벤트는 이미 디테일 요소의 상태 변화를 신호로 보내는 데 사용됩니다.

```js
const popover = document.getElementById("mypopover");

// ...

popover.addEventListener("toggle", (event) => {
  if (event.newState === "open") {
    console.log("팝오버가 표시되었습니다");
  } else {
    console.log("팝오버가 숨겨졌습니다");
  }
});

popover.showPopover();
popover.hidePopover();
// `toggle` 이벤트는 한 번만 발생함
```

마찬가지로, 토글 이벤트는 병합됩니다.



# CSS 특징

팝 오버의 스타일을 사용자 정의하고 싶을 수 있습니다. 브라우저에서 제공하는 다음과 같은 특징들이 있습니다:

## ::backdrop

::backdrop 의사 요소는 팝 오버 요소 바로 뒤에 배치되는 전체 화면 요소로, 원하는 경우 페이지 내용 뒤에 팝 오버를 가리는 효과(예: 흐린 효과)를 추가할 수 있습니다.




<img src="/assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_2.png" />

## :popover-open

The :popover-open pseudo-class matches a popover element only when it is in the showing state — it can be used to style popover elements when they are showing.

## [popover]




Popover의 기본 CSS 스타일을 다음과 같이 설정할 수도 있어요:

![image](/assets/img/2024-05-15-BrowserBeginsSupportforPopoverAPIAQuickGuide_3.png)

# 결론

Popover API는 HTML과 Javascript에서 기다려온 기능으로, 우리에게 네이티브하고 유연한 솔루션을 제공합니다. 즐거운 코딩 되세요!



만약 이 내용이 도움이 되었다면, 웹 개발에 대한 더 많은 통찰을 얻기 위해 제 뉴스레터 구독을 고려해 주세요. 읽어 주셔서 감사합니다!

# 간단한 영어로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 마지막으로 가기 전에:

- 작가를 박수와 팔로우해 주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루게 하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해 보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 즐기세요