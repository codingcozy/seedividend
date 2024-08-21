---
title: "사파리 모바일 리사이징 버그 해결 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Fixing the Safari Mobile Resizing Bug A Developers Guide"
link: "https://medium.com/@krutilin.sergey.ks/fixing-the-safari-mobile-resizing-bug-a-developers-guide-6568f933cde0"
isUpdated: true
---

Safari 브라우저는 모바일 폰에서 가상 키보드를 활성화할 때 뷰 레이아웃 크기를 조정하지 않습니다. 여기에서 "뷰 레이아웃"과 "시각적 레이아웃" 사이의 차이를 볼 수 있습니다. 결과적으로, 채팅 입력란을 탭하면 헤더를 보려고 할 때 스크롤을 올려야 합니다.

또한, 아래로 스크롤할 때 HTML 문서 페이지에 속하지 않는 영역을 알 수 있을 수도 있습니다.

# Twitter 접근 방식

![Twitter Approach](https://miro.medium.com/v2/resize:fit:436/1*Dj_5lZ32Ok-VuR-h2_maGg.gif)

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

트위터는 문제를 검토하고 발생 상황을 식별하는 데 좋은 방법입니다. 가장 간단한 예는 입력이 화면 하단에 있는 채팅입니다. 키보드가 활성화되면 채팅 입력과 헤더가 보이기를 원합니다. 왜냐하면 모든 네이티브 애플리케이션이 그렇게 작동하기 때문이죠.

```js
export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Chat</h1>

        <div className="message-history">
          {Array.from(Array(100).keys()).map((i) => (
            <div className="list-item" key={i} id={`${i}`}>
              {i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            </div>
          ))}
        </div>

        <div className="actions">
          <textarea
            autoFocus={false}
            className={`message-input ${STICKY_INPUT_BUGGED_CLASS_NAME}`}
            placeholder="Message"
          />
          <button className="btn btn-primary">Button</button>
        </div>
      </div>
    </main>
  );
}
```

# Web Telegram 방식

![웹 텔레그램 방식](https://miro.medium.com/v2/resize:fit:436/1*7-qPiF5kXspetxsY40POyA.gif)

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

텔레그램은 이 문제를 다음과 같은 몇 가지 단계로 해결합니다. 먼저 HTML 문서의 스크롤 방지를 위해 고정 위치를 추가합니다:

```js
html,
body {
 position: fixed;
}
```

다음으로, 전역 CSS 변수와 화면 크기 변경 시 트리거되는 JavaScript 코드를 사용하여 보이는 영역의 높이를 수동으로 계산합니다.

```js
:root {
 --vh: 1vh;
}

html.is-safari,
html.is-safari body {
 height: calc(var(--vh, 1vh) * 100);
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

위 코드는 모바일 웹 브라우저, 특히 Safari에서 발생하는 뷰포트 크기 조정 문제에 대한 해결책을 제공합니다. 먼저 기기가 "스티키 입력" 버그를 가지고 있는지 여부를 식별하고 뷰포트 높이를 이에 맞게 조정합니다. overlayCounter는 활성화된 오버레이를 추적합니다. setVH 함수는 반응형 디자인을 위해 뷰포트 높이를 재계산하고 설정하는 사용자 정의 속성으로 설정합니다. 스티키 입력 버그가 감지되면 toggleResizeMode 함수는 오버레이가 활성화되어 있는지 여부에 따라 올바른 크기 조정 동작을 보장합니다.

크기 문제를 해결했지만 여전히 화면이 가시 영역을 넘어 스크롤될 수 있습니다. 따라서 Telegram은 최종 단계에서 화면 스크롤을 제어합니다. 화면에서 손가락 동작과 터치에 반응하는 `touchmove` 및 `touchstart` 이벤트 핸들러를 사용합니다. 이는 "scrollable-y" 클래스를 가진 요소의 콘텐츠 스크롤을 관리하기 위해 필요합니다. 이를 통해 페이지의 모든 요소에 대한 스크롤을 차단하지 않고 스크롤을 관리할 수 있습니다.

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

위 코드에는 Safari에서의 "sticky" 입력 문제를 해결하기 위한 핸들러가 포함되어 있습니다. 이는 특정 클래스를 가진 요소에 대해 `focusin` 및 `focusout` 이벤트를 감지하고 필요한 조정을 수행합니다. 요소 내의 특정 속성을 확인하는 단계는 생략할 수 있으며, 모든 입력 요소가 원치 않는 동작을 보이기 때문입니다.

```js
const onFocusIn = (e: FocusEvent) => {
 if (
  !(e.target as HTMLElement).classList.contains(
  STICKY_INPUT_BUGGED_CLASS_NAME
  ) ||
  e.timeStamp - lastFocusOutTimeStamp < 50
 ) {
  return;
 }

 fixSafariStickyInput(e.target as HTMLElement);

 document.addEventListener("touchmove", onTouchMove, o);
 document.addEventListener("touchstart", onTouchStart);
};

const onFocusOut = (e: FocusEvent) => {
 document.removeEventListener("touchmove", onTouchMove, o);

 lastFocusOutTimeStamp = e.timeStamp;

 document.removeEventListener("touchstart", onTouchStart);
};

const onVisibilityChange = () => {
 if (
  document.activeElement &&
  document.activeElement.classList.contains(
   STICKY_INPUT_BUGGED_CLASS_NAME
  ) &&
  (document.activeElement as HTMLElement).blur
 ) {
  fixSafariStickyInput(document.activeElement as HTMLElement);
 }
};
```

# LinkedIn 접근 방식

<img src="https://miro.medium.com/v2/resize:fit:436/1*FQQffPzH2llfblXOEeC2ww.gif" />

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

링크드인의 접근 방식은 훨씬 더 간단합니다. 페이지를 고치는 대신에 사용자가 스크롤할 때 화면의 가시 영역으로 돌아가게 만듭니다. 따라서 강조할 두 가지 단계는 다음과 같습니다: 뷰 레이아웃 크기를 변경하는 단계와 컨텐츠를 다시 가시 화면 영역으로 되돌리는 핸들러를 추가하는 단계입니다:

```js
const handleScrollToTop = () => {
 window.scrollTo(0, 0);
};

// 시각적 뷰포트 변화를 처리하기 위한 확인
const visualViewport = window.visualViewport;
let offset = 0;

if (visualViewport) {
 let viewportWidth = window.innerWidth;
 let viewportHeight = window.innerHeight;

 visualViewport.addEventListener("resize", (event) => {
  const $target = event.target as unknown as HTMLDivElement;
  const $page = pageRef.current as HTMLDivElement;

  if (viewportWidth !== $target.width) {
   viewportWidth = window.innerWidth;
   viewportHeight = window.innerHeight;
  }

  if (viewportHeight - $target.height > 150) {
   handleScrollToTop();
   const adjustment = viewportHeight - $target.height - offset;
   $page.style.bottom = `${adjustment}px`;
  } else if (
   viewportHeight === $target.height ||
   viewportHeight - $target.height <= 150
  ) {
   offset = viewportHeight - $target.height;
   $page.style.bottom = "0px";
  }
 });
}

document.addEventListener("touchend", handleScrollToTop);
```

# 요약

모든 접근 방식을 분석해보면 어느 것도 이상적인 해결책이라고 볼 수 없음을 알 수 있습니다. 트위터의 방식은 나쁜 UI/UX를 초래하지만 개발자들이 더 중요한 기능에 시간을 절약하도록 도와줍니다. 링크드인의 방식은 동적이며 실시간 통신에 많이 의존하지 않는 웹 애플리케이션에 적합하며 사용자가 페이지를 새로 고치기 위해 다시 로드해야 할 수 있기 때문에 텔레그램의 방식처럼 밀어서 새로 고치는 동작을 방지할 수 없습니다.

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

https://github.com/krutilins/fix-safari-scroll-on-focus-in-mobile

# 자료

- Chrome on Android에서 발생하는 viewport 크기 조정 동작 변경에 대비하기 - Chrome Developers
- 키보드와 함께 iOS Safari의 별난 동작
- iOS Safari: 키보드가 열리면 원하지 않는 스크롤 발생 및 body 스크롤 비활성화
- iOS Safari: 입력 포커스 시 스크롤 방지(또는 제어)
- 모바일에서 viewport 단위 사용하는 꿀팁 | CSS-Tricks
