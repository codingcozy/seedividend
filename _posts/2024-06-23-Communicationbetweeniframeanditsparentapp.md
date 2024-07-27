---
title: "iframe과 부모 앱 간의 통신 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Communicationbetweeniframeanditsparentapp_0.png"
date: 2024-06-23 14:34
ogImage: 
  url: /assets/img/2024-06-23-Communicationbetweeniframeanditsparentapp_0.png
tag: Tech
originalTitle: "Communication between iframe and it’s parent app"
link: "https://medium.com/@thinuwanwickramaarachchi/communication-between-iframe-and-its-parent-app-ed39ba65cde1"
---


여기에서는 iframe과 해당 부모 앱 간의 통신이 가능한 방법을 간단히 설명하고 있어요.

이 경우에는 브라우저에로드되는 주 응용프로그램이자 iframe을 포함하고 있는 부모 응용프로그램이 있습니다. 여기에서는 iframe의 src 속성을 통해 다른 웹 페이지를 로드하고 있어요. 따라서 부모 앱과 iframe의 두 가지 원본이 있죠.

![iframe and its parent app communication](/assets/img/2024-06-23-Communicationbetweeniframeanditsparentapp_0.png)

## 시나리오 1 - 부모와 iframe이 동일한 출처를 가지고 있으며 부모 및 자식 모두를 제어할 수 있는 경우

<div class="content-ad"></div>

예를 들어, 부모는 www.abc.com을 가지고 있고 자식은 www.abc.com/child를 가지고 있습니다.

이 경우 브라우저는 부모에서 자식으로, 그리고 자식에서 부모로 window 객체를 통해 통신을 허용합니다.

부모 - 자식

```js
// 자식 앱에서
// window 객체에 메소드 바인딩
window.childCallback = function() {
  console.log('부모가 자식 메소드 호출 중');
}

// 부모 앱에서
// iframe 로드
<iframe id='iframe' src="http://www.abc.com/child"/>
// iframe window을 통해 메소드 호출
const iframe = document.getElementById("iframe");
iframe.contentWindow.childCallback();
```

<div class="content-ad"></div>

Child - Parent

```js
// Parent 앱에서
// window 객체에 메소드를 바인딩합니다.
window.parentCallback = function() {
  console.log('자식이 부모 메소드를 호출합니다');
}

// Child 앱에서
// window 객체를 통해 메소드를 호출하세요
window.parent.parentCallback();
```

데모 보기 - https://thinugigs-iframe-test-same-origin.web.app/

소스코드(간단한 리액트 앱) - https://github.com/thinugigs/-Iframe-test-same-origin

<div class="content-ad"></div>

## 시나리오 2 - 부모와 아이프레임이 서로 다른 출처를 가지고 있고 부모와 자식 요소를 모두 제어할 수 있는 경우

부모 요소의 출처이 www.abc.com이고 자식 요소의 출처이 www.xyz.com인 경우를 예로 들어보겠습니다.

이 시나리오에서 브라우저는 postMessage를 통해 부모에서 자식으로 통신하거나 자식에서 부모로 통신하는 것을 허용합니다.

부모 - 자식

<div class="content-ad"></div>

```js
// 자식 애플리케이션에서
// 윈도우 객체에 메시지 이벤트 리스너를 연결합니다
window.addEventListener("message", function(event) {
  console.log('부모가 자식 메소드 호출 중');
});

// 부모 애플리케이션에서
// iframe만 로드합니다
<iframe id='iframe' src="http://www.xyz.com"/>
// iframe 창을 통해 메시지를 전송합니다
const iframeWindow = document.getElementById("iframe").contentWindow;
iframeWindow.postMessage("", "*");
```

자식 - 부모

```js
// 부모 애플리케이션에서
// 윈도우 객체에 메시지 이벤트 리스너를 연결합니다
window.addEventListener("message", function(event) {
  console.log('자식이 부모 메소드 호출 중');
});

// 부모 애플리케이션에서
// 부모 객체를 통해 메시지를 전송합니다
parent.postMessage("", "*");
```

샘플 데모 - https://thinugigs-iframe-test-different-origin-parent.web.app/


<div class="content-ad"></div>

원본(간단한 html 앱입니다) - https://github.com/thinugigs/-iframe-test-different-origins

## 시나리오 3 - 부모와 아이프레임이 서로 다른 출처를 갖지만 부모나 자식 중 한 곳을 제어할 수 있는 경우

이러한 시나리오에서 당신은 부모 앱 또는 자식 앱 중 하나에 속할 수 있습니다. 따라서 한쪽에서만 메시지 구현이 가능하여 상호 통신을 양방향으로 할 수 없게 됩니다, 즉 부모에서 자식으로, 그리고 자식에서 부모로의 통신이 불가능해집니다.

따라서 다음은 우리가 경험한 내용의 요약입니다.