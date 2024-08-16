---
title: "한 줄의 CSS로 모바일에서 100vh 버그 해결 동적 뷰포트 유닛 사용하기"
description: ""
coverImage: "/assets/img/2024-07-09-Fixmobileviewport100vhbuginonelineofCSSDynamicviewportunitsinaction_0.png"
date: 2024-07-09 17:56
ogImage: 
  url: /assets/img/2024-07-09-Fixmobileviewport100vhbuginonelineofCSSDynamicviewportunitsinaction_0.png
tag: Tech
originalTitle: "Fix mobile viewport 100vh bug in one line of CSS: Dynamic viewport units in action"
link: "https://medium.com/@alekswebnet/fix-mobile-100vh-bug-in-one-line-of-css-dynamic-viewport-units-in-action-102231e2ed56"
isUpdated: true
---



## VH 대신 DVH을 사용하여 더 완전한 단위로 사용하세요

![이미지](/assets/img/2024-07-09-Fixmobileviewport100vhbuginonelineofCSSDynamicviewportunitsinaction_0.png)

이상한 모바일 뷰포트 버그, 또는 100vh 버그에 대해 알고 계신가요? 혹은 올바른 방법으로 전체 화면 블록을 만드는 방법을 아시나요? 이 기사에서는 이 버그의 본질과 더 나은 해결 방법에 대해 설명하겠습니다.

# 모바일 뷰포트 버그는 무엇인가요?

<div class="content-ad"></div>

웹페이지에서 전체화면 요소를 만들어 본 적이 있나요? CSS 한 줄을 추가하기만 하면 쉽게 할 수 있어요:

```js
.my-element {
  height: 100vh
}
```

여기서 1vh는 뷰포트 높이의 1%를 차지합니다. 하지만 모바일 기기에서 테스트를 하면 뭔가 잘못된 것이 발생합니다. 모바일 브라우저의 뷰포트는 동적으로 변경될 수 있지만 vh 값은 변경되지 않습니다. 그래서 모바일 브라우저에서 vh는 정적인 값이 되며 실제 뷰포트 높이를 반영하지 않습니다.

아래 그림에서 모바일 화면의 두 가지 상태를 확인할 수 있어요:

<div class="content-ad"></div>

- 숨겨진 주소 표시줄 있을 때
- 표시된 주소 표시줄 있을 때

두 상태 모두 100vh의 값이 동일하며 그 결과로 CTA 버튼이 첫 화면을 벗어납니다. 이로 인해 문제가 발생합니다:

![이미지](/assets/img/2024-07-09-Fixmobileviewport100vhbuginonelineofCSSDynamicviewportunitsinaction_1.png)

# 일반적인 수정

<div class="content-ad"></div>

이전에 사용했던 해결책은 CSS Custom Properties와 약간의 Javascript를 사용하는 것이었습니다. 간단히 말해서, resize 이벤트를 수신하고 창 크기가 변경될 때마다 --vh 사용자 지정 속성(창 높이의 1%)을 설정합니다.

더 자세한 내용은 아래 멋진 CSS-Tricks 글을 참조해주세요:

# 더 나은 방법

CSS Values 4 Specification에 따르면 Viewport-relative lengths를 사용할 수 있습니다. 새로운 뷰포트 단위를 사용할 수 있습니다. 이 작업을 수행해주는 dvh 단위가 있습니다. 항상 뷰포트 크기에 맞게 자동으로 조정됩니다. 마지막으로, 브라우저 지원이 완벽합니다:

<div class="content-ad"></div>

![image](/assets/img/2024-07-09-Fixmobileviewport100vhbuginonelineofCSSDynamicviewportunitsinaction_2.png)

With this cool feature, the solution becomes pretty simple. You need only one line of CSS:

```css
.my-element {
  height: 100dvh;
}
```

Read more about other amazing dynamic viewport units:

<div class="content-ad"></div>

# 결론

요즘에는 CSS가 빠르게 발전하고 프론트엔드 문제 해결에 큰 도움이 됩니다. dvh 단위는 뷰포트에 따라 높이를 조정하는 데 최적의 선택입니다. 이것은 정말 간단하면서도 강력한 CSS 기능으로 여러분의 작업을 더 쉽게 만들어줍니다. 게다가, 모든 주요 브라우저에서 지원되므로 지금 당장 사용할 수 있습니다.

🎉 최신 소식: 최근에 발견했는데, dvh 단위가 이미 Vue.js용 컴포넌트 프레임워크인 Vuetify 3에서 사용되고 있습니다. 다른 프로젝트에서 사용 중인 경우, 댓글로 공유해주시면 다른 사람들에게도 알려주시기 바랍니다!

🙏 즐거우신 독자 여러분이 흥미로운 도움이 되는 이야기를 읽으셨기를 바랍니다.

<div class="content-ad"></div>

👏 만약 마음에 들었다면 박수를 보내주세요! 당신의 반응을 보게 되어 정말 기뻐할 거예요!

👆 나를 팔로우하고 내 새로운 글을 가장 먼저 볼 수 있는 사람이 되세요.

감사합니다! BR 올렉산드르
