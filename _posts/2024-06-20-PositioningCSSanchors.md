---
title: "CSS 앵커의 위치 조정"
description: ""
coverImage: "/assets/img/2024-06-20-PositioningCSSanchors_0.png"
date: 2024-06-20 00:52
ogImage: 
  url: /assets/img/2024-06-20-PositioningCSSanchors_0.png
tag: Tech
originalTitle: "Positioning CSS anchors"
link: "https://medium.com/@evayde/positioning-css-anchors-f847c03b4f78"
isUpdated: true
---




![](/assets/img/2024-06-20-PositioningCSSanchors_0.png)

툴팁을 만드는 것은 사용자에게 더 많은 맥락을 제공하는 좋은 방법입니다. 그러나, 이는 복잡한 주제입니다. 따라서 Web 플랫폼 팀의 개발자들은 브라우저 내부 코드를 사용하여이 문제를 해결하기 위해 더 많은 API를 추가하려고 합니다.

Popover API는 툴팁 주변의 많은 도전에 대한 해결책을 제공합니다. 그러나, 위치 지정은 여전히 해결되지 않은 상태입니다. 특히, 팝오버가 얼마나 많은 공간을 가지고 있는지 알 수 없을 때: 툴팁 트리거가 화면 아래쪽에 있을 경우, 팝오버를 아래에 표시하고 싶지 않습니다. 이 도전에 대한 가능한 해결책은 곧 Chrome에 시행될 것이며, 다른 브라우저도 따를 것입니다.

업데이트: 사양이 변경되었습니다. 최근 예시는 다음에서 찾을 수 있습니다:
https://codepen.io/una/pen/KKYXMNo

<div class="content-ad"></div>

# 팝오버 API 간단 소개

팝오버 API를 사용하려면 두 가지 요소가 필요합니다: **트리거**와 **팝오버**입니다.

```js
<button popovertarget="my-tooltip">
  <p>트리거</p>
</button>

<div id="my-tooltip" popover>
  <p>툴팁</p>
</div>
```

편의를 위해 다음에 제공된 피들(fiddle)을 확인해보세요:

<div class="content-ad"></div>

위에서 보듯이, id와 popovertarget 속성에 의해 생성된 두 항목 간에 링크가 있습니다.

이제 뒷단에서 많은 일이 벌어지고 있습니다: 트리거를 탭할 수 있습니다. 툴팁이 열리면 Esc를 눌러 팝오버를 닫을 수 있습니다. 다시 말해, 팝오버 API는 상자 밖에서 키보드로 사용할 수 있는 솔루션을 제공합니다.

# CSS 앵커 위치 지정

앵커 위치 지정 속성을 통해 우리는 요소를 앵커 요소와 상대적으로 페이지 어디에든 배치할 수 있습니다. 요소의 레이아웃과 관계없이 (position absolute와 같이)요소를 배치할 수 있습니다.

<div class="content-ad"></div>

오늘 앵커 위치 지정을 시도하려면 Chrome에서 실험적인 웹 플랫폼 기능을 활성화해야 합니다(chrome://flags/#enable-experimental-web-platform-features) 또는 최신 개발자 채널을 사용하세요(Chrome 125부터 기본으로 활성화되며, 2024년 5월 8일에 안정 버전이 될 것입니다).

앵커를 설정하려면 다른 id를 추가하고 앵커 속성을 사용하여 해당 id에 연결하면 됩니다(트리거일 필요는 없습니다.):

```js
<button popovertarget="my-tooltip" id="tooltip-trigger">
  <p>트리거</p>
</button>

<div id="my-tooltip" popover anchor="tooltip-trigger">
  <p>툴팁</p>
</div>
```

그리고 앵커가 어떻게 동작해야 하는지 알려주기 위해 CSS를 추가하세요:

<div class="content-ad"></div>

```js
#my-tooltip {
  bottom: calc(anchor(top));
  position-try-options: flip-block;
  justify-self: anchor-center;
}
```

앵커는 요소의 맨 위에 있어야 하며, position-try-options는 남은 공간을 계산할 것이며, 맞지 않으면 요소의 반대쪽으로 뒤집힐 것입니다. 마지막 줄은 앵커가 앵커의 맨 위에 가운데 정렬되어 있다는 것을 의미합니다. 이것이 어떻게 보이는지 확인해보세요:

<img src="/assets/img/2024-06-20-PositioningCSSanchors_1.png" />

그러나 아랫부분에도 충분한 공간이 없으면 상단 위치로 다시 이동하게 됩니다. 심지어 거기에도 충분한 공간이 없다면 (다른 곳으로 갈 곳이 없기 때문에):

<div class="content-ad"></div>


<img src="/assets/img/2024-06-20-PositioningCSSanchors_2.png" />

여기서 함께 놀 수 있는 피들(fiddle)이 있어요:

또한 너무 흥분하기 전에 현재 브라우저 지원을 고려해주세요:

<img src="/assets/img/2024-06-20-PositioningCSSanchors_3.png" />


<div class="content-ad"></div>

여기까지 입니다!
읽어 주셔서 정말 감사합니다.