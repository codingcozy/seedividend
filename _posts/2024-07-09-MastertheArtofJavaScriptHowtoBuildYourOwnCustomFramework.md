---
title: "자바스크립트 마스터하기 나만의 커스텀 프레임워크 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-MastertheArtofJavaScriptHowtoBuildYourOwnCustomFramework_0.png"
date: 2024-07-09 09:00
ogImage: 
  url: /assets/img/2024-07-09-MastertheArtofJavaScriptHowtoBuildYourOwnCustomFramework_0.png
tag: Tech
originalTitle: "Master the Art of JavaScript: How to Build Your Own Custom Framework!"
link: "https://medium.com/@learntocodetoday/master-the-art-of-javascript-how-to-build-your-own-custom-framework-a3821b93d8ea"
isUpdated: true
---



![image](/assets/img/2024-07-09-MastertheArtofJavaScriptHowtoBuildYourOwnCustomFramework_0.png)

자바스크립트 프레임워크를 직접 만드는 것은 언어를 깊게 이해하고 고급 코딩 기술을 배우는 데 좋은 방법입니다. 이 기사에서는 맨 처음부터 간단하지만 기능적인 자바스크립트 프레임워크를 만드는 과정을 안내해 드리겠습니다. 저희 프레임워크, MiniJS는 DOM 조작, 이벤트 처리 및 AJAX 요청과 같은 필수 기능을 포함할 것입니다. 시작해 봅시다!

## 1. 프로젝트 설정

먼저 프로젝트용 새 디렉토리를 만들고 npm으로 초기화하세요:

<div class="content-ad"></div>

```js
mkdir mini-js
cd mini-js
npm init -y
```

우리의 프레임워크 코드를 작성할 메인 JavaScript 파일 mini.js를 생성해봅시다.

## 2. 구조 및 핵심 기능

우리의 프레임워크의 기본 구조와 핵심 기능부터 시작하겠습니다. 이 함수는 우리 프레임워크의 사용자들의 진입점이 될 것입니다.

<div class="content-ad"></div>

// mini.js

(function(global) {
const MiniJS = function(selector) {
return new MiniJS.init(selector);
};

MiniJS.prototype = {
// Methods will go here
};

MiniJS.init = function(selector) {
this.elements = document.querySelectorAll(selector);
};

MiniJS.init.prototype = MiniJS.prototype;

global.MiniJS = global.$M = MiniJS;
})(window);
