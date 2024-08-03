---
title: "iOS Safari에서 HTML 비디오 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-07-12-HowtofixHTMLvideoissuesiniOSSafari_0.png"
date: 2024-07-12 19:17
ogImage: 
  url: /assets/img/2024-07-12-HowtofixHTMLvideoissuesiniOSSafari_0.png
tag: Tech
originalTitle: "How to fix HTML video issues in iOS Safari"
link: "https://medium.com/@otterlord/how-to-fix-html-video-issues-in-ios-safari-05e180b3a9f1"
---



<img src="/assets/img/2024-07-12-HowtofixHTMLvideoissuesiniOSSafari_0.png" />

iOS Safari의 HTML 비디오는 Chromium 및 Firefox와 다른 독특한 동작을 보입니다. 이 문제를 해결하는 동안 고통스러운 문제에 대한 몇 가지 해결책을 발견했습니다.

# 내 비디오가 스크롤할 때 확대됩니다

비디오 요소에 playsinline 속성을 추가하십시오.


<div class="content-ad"></div>

```js
<비디오 autoplay 소리없음 너비="250" playsinline style="사용자 선택:없음;">
  <소스 src="/videos/example.mp4" type="video/mp4" />
</비디오>
```

# 누르면 배경 비디오가 일시 중지됩니다

`사용자 선택: 없음;`으로 비디오 요소 모양을 지정하여 클릭하거나 누를 때 비디오가 일시 중지되지 않게 합니다.

```js
<비디오 autoplay 소리없음 너비="250" playsinline style="사용자 선택:없음;">
  <소스 src="/videos/example.mp4" type="video/mp4" />
</비디오>
```

<div class="content-ad"></div>

# canplaythrough 트리거가 작동하지 않음

아직 이 문제를 해결하지 못했지만 오디오 요소에 관한 유용한 스택 오버플로우 질문이 몇 가지 힌트를 줄 수 있습니다.

이 게시물은 대부분 미래에 마주칠 문제들에 대한 문제 해결 과정을 문서화하는 것이며, 문제를 해결하는 데 성공한다면 코드 스니펫으로 이 섹션을 업데이트할 예정입니다.