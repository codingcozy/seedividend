---
title: "ReactJS: 클릭하지 않아도 렌더링되거나 로드될 때 onClick이 실행되는 이유"
description: ""
coverImage: "/assets/img/2024-05-02-ReactJSonClickgetsexecutedwhenrenderedorloadedwithoutaclick_0.png"
date: 2024-05-02 00:26
ogImage: 
  url: /assets/img/2024-05-02-ReactJSonClickgetsexecutedwhenrenderedorloadedwithoutaclick_0.png
tag: Tech
originalTitle: "ReactJS: onClick gets executed when rendered or loaded without a click"
link: "https://medium.com/@xavieryuhanliu/reactjs-onclick-gets-executed-when-rendered-or-loaded-without-a-click-837fc3c71cca"
isUpdated: true
---




아주 간단한 방법으로 해결할 수 있어요.

![ReactJS onClick gets executed when rendered or loaded without a click](/assets/img/2024-05-02-ReactJSonClickgetsexecutedwhenrenderedorloadedwithoutaclick_0.png)

그룹 프로젝트를 진행하면서 onClick이 클릭 없이 실행되는 것을 발견했어요. 구글을 찾아보니 왜 이런지 마침내 알게 되었어요.

답은 매우 간단해요. 코드를 다음과 같이 변경해주세요.

<div class="content-ad"></div>

```js
<button onClick={() => handleClick()}>Click Me!</button>
```

이렇게 변경해 주세요. 그 이유는 간단합니다. 버튼이 로드될 때, onClick 함수가 평가됩니다. onClick에서 반환된 함수는 버튼이 클릭될 때마다 실행될 것입니다.

<div class="content-ad"></div>

그러니까, 우리가 클릭할 때마다 실행되길 원하는 함수를 또 다른 함수 안에 감싸서 원하는 함수를 반환해야 해.

나는 스택오버플로우에 답을 찾았어.

내 블로그에서도 이 스토리를 찾을 수 있어.