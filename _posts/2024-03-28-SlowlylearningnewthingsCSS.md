---
title: "CSS shape-outside 속성이란"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Slowly learning new things CSS"
link: "https://medium.com/@bzfishmaster94/slowly-learning-new-things-bd5f7f87b9bd"
isUpdated: true
---





오늘은 특정 방법으로 콘텐츠를 모퉁이에 배치하는 방법에 대해 더 배웠어요.

주제나 div의 모퉁이에 콘텐츠를 배치하는 몇 가지 CSS 방법이 있어요. 이 새로운 속성을 사용하면 콘텐츠를 필요한 위치에 정확히 배치할 수 있어요.

이 작업에는 플렉스박스가 필요하지만, 해당 속성은 shape-outside입니다.

https://developer.mozilla.org/ko/docs/Web/CSS/shape-outside에서 언급된 바와 같이,

<div class="content-ad"></div>

이 속성은 여러 값들을 가질 수 있지만 그 중 하나는 inset입니다.

따라서 shape-outside: inset(calc(100% — X) 0 0)를 사용하면 이미지의 모서리(위쪽 오른쪽)에 배치할 수 있는 내부 사각형을 만들 수 있습니다.

출처:

Temani Afif on Apr 19, 2021, https://css-tricks.com/float-an-element-to-the-bottom-corner/.

<div class="content-ad"></div>

https://developer.mozilla.org/ko/docs/Web/CSS/shape-outside
