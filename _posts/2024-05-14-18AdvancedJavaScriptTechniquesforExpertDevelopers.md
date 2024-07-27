---
title: "전문 개발자를 위한 18가지 고급 JavaScript 기술"
description: ""
coverImage: "/assets/img/2024-05-14-18AdvancedJavaScriptTechniquesforExpertDevelopers_0.png"
date: 2024-05-14 15:16
ogImage: 
  url: /assets/img/2024-05-14-18AdvancedJavaScriptTechniquesforExpertDevelopers_0.png
tag: Tech
originalTitle: "18 Advanced JavaScript Techniques for Expert Developers"
link: "https://medium.com/javascript-in-plain-english/18-advanced-javascript-techniques-for-expert-developers-23633e62d4d2"
---



<img src="/assets/img/2024-05-14-18AdvancedJavaScriptTechniquesforExpertDevelopers_0.png" />

# 브라우저

# 전체 화면 달성하기 🖥️

현재 화면을 전체 화면으로 표시해야 할 때




# 전체 화면으로 변환하기 ✨

```js
function fullScreen() {  
    const el = document.documentElement
    const rfs = 
    el.requestFullScreen || 
    el.webkitRequestFullScreen || 
    el.mozRequestFullScreen || 
    el.msRequestFullscreen
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el)
    }
}
// 클릭하여 🌐 전체 화면으로 전환하기!
fullScreen()
```

# 전체 화면 나가기 🏁

전체 화면을 나가려면

```js
function exitScreen() {
    if (document.exitFullscreen) { 
        document.exitFullscreen()
    } 
    else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen()
    } 
    else if (document.webkitCancelFullScreen) { 
        document.webkitCancelFullScreen()
    } 
    else if (document.msExitFullscreen) { 
        document.msExitFullscreen()
    } 
    if(typeof cfs != "undefined" && cfs) {
        cfs.call(el)
    }
    // 전체 화면에서 나가기 🚪🏃
}
exitScreen()
```



# 페이지 인쇄 🖨️

현재 페이지를 인쇄해야 할 때

```js
// 페이지를 인쇄하려면 클릭 🖨️
window.print()
```

# 인쇄 내용 스타일 변경 📄



현재 페이지를 인쇄하려면서 레이아웃을 수정해야 할 때

```js
<style>
/* 인쇄 레이아웃 조정 🔧 */
@media print {
    .noprint {
        display: none;
    }
}
</style>
<div class="print">인쇄</div>
<div class="noprint">인쇄 안 함</div>
```

# 차단 닫기 이벤트 🔒

사용자가 새로 고침하거나 브라우저를 닫는 것을 막아야 할 때, beforeunload 이벤트를 트리거하도록 선택할 수 있습니다. 일부 브라우저에서는 텍스트 내용을 사용자 지정할 수 없습니다.




```js
window.onbeforeunload = function(){
    return 'haorooms 블로그를 나가시겠습니까? 🚪🤔';
};
```

# 화면 녹화 📹

현재 화면을 녹화하고 녹화된 화면을 업로드 또는 다운로드해야 할 때

```js
// 이곳에서 화면 녹화하기 🎬
const streamPromise = navigator.mediaDevices.getDisplayMedia()
streamPromise.then(stream => {
    var recordedChunks = [];// 녹화된 비디오 데이터
    var options = { mimeType: "video/webm; codecs=vp9" };// 인코딩 형식 설정
    var mediaRecorder = new MediaRecorder(stream, options);// MediaRecorder 인스턴스 초기화
    mediaRecorder.ondataavailable = handleDataAvailable;// 데이터가 사용 가능한 경우 콜백 설정 (화면 녹화 종료)
    mediaRecorder.start();
    // 비디오 조각화
    function handleDataAvailable(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);// 데이터 추가, event.data는 BLOB 객체
            download();// BLOB 객체로 래핑하여 다운로드
        }
    }
    // 파일 다운로드
    function download() {
        var blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        // 여기서 비디오를 백엔드로 업로드할 수 있음
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    }
})
```



# 가로 및 세로 화면 판단하기 🔄

모바일 전화기의 가로 또는 세로 화면 상태를 판단해야 할 때

```js
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        alert("세로 모드! 📱");
    }
    if (window.orientation == 90 || window.orientation == -90) {
        alert("가로 모드! 🌅");
    }
}
// 화면 방향 변경을 위한 리스너 추가 🔄
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
```

# 가로 및 세로 화면 스타일 변경하기 ↔️



다양한 스타일을 수평 및 수직 화면에 대해 설정해야 할 때

```js
<style>
@media all and (orientation : landscape) {
    body {
        background-color: #ff0000;
    }
}
@media all and (orientation : portrait) {
    body {
        background-color: #00ff00;
    }
}
</style>
```

# 탭 페이지가 숨김 처리됨 🙈

탭이 표시되거나 숨겨지는 이벤트를 모니터링해야 할 때



```js
// 탭 페이지 숨김 🙈
const {hidden, visibilityChange} = (() => {
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 및 Firefox 18 이후 지원
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    return {
      hidden,
      visibilityChange
    }
})();

const handleVisibilityChange = () => {
    console.log("현재 숨겨진 상태", document[hidden]);
};
document.addEventListener(
    visibilityChange,
    handleVisibilityChange,
    false
);
```

# 이미지

# 로컬 이미지 미리보기 🌄

클라이언트로부터 이미지를 받았지만 즉시 서버에 업로드할 수 없고 미리보기해야 하는 경우




```js
<!-- 이미지 업로드 및 미리보기 📸 -->
<div class="test">
    <input type="file" name="" id="">
    <img src="" alt="">
</div>
<script>
const getObjectURL = (file) => {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // webkit or chrome
        url = window.URL.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
}
document.querySelector('input').addEventListener('change', (event) => {
    document.querySelector('img').src = getObjectURL(event.target.files[0])
})
</script>
```

# 이미지 미리로딩 🔄

사진이 많을 때는 화면이 하얗게 보이지 않도록 사진을 미리로딩해야 합니다.

```js
const images = []
function preloader(args) {
    for (let i = 0, len = args.length; i < len; i++) {  
        images[i] = new Image()  
        images[i].src = args[i]
    } 
}  
preloader(['1.png', '2.jpg'])
```



# Js

# 문자열 스크립트 💬

문자열을 js 스크립트로 변환해야 할 때는 이 방법이 xss 취약점이 있으니 주의해서 사용해야 합니다

```js
const obj = eval('({ name: "jack" })')
// obj는 object{ name: "jack" }로 변환됩니다
const v = eval('obj')
// v는 변수 obj가 됩니다
```



# 재귀 함수 이름 분리하기 🔗

재귀 함수를 작성할 때 함수 이름을 선언하지만 함수 이름을 수정할 때마다 내부 함수 이름을 수정하는 것을 항상 잊어버립니다. argument는 함수의 내부 객체로, 함수에 전달된 모든 매개변수를 포함하며 arguments.callee는 함수 이름을 나타냅니다.

```js
// 이것은 기본 피보나치 수열입니다
function fibonacci (n) {
    const fn = arguments.callee
    if (n <= 1) return 1
    return fn(n - 1) + fn(n - 2)
}
```



# 암묵적 판단 👁️‍🗨️

페이지 뷰에 현재 DOM 요소가 나타나 있는지 판단해야 할 때 IntersectionObserver를 사용해보세요.

```js
<style>
.item {
    height: 350px;
}
</style>

<div class="container">
  <div class="item" data-id="1">보이지 않음</div>
  <div class="item" data-id="2">보이지 않음</div>
  <div class="item" data-id="3">보이지 않음</div>
</div>
<script>
  if (window?.IntersectionObserver) {
    let items = [...document.getElementsByClassName("item")]; // 진정한 배열로 변환하여 파싱, Array.prototype.slice.call()도 사용 가능
let io = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          item.target.innerHTML =
            item.intersectionRatio === 1 // 요소의 표시 비율, 1이면 완전히 보이고 0이면 완전히 보이지 않음
              ? `요소가 완전히 보입니다`
              : `요소가 부분적으로 보이지 않습니다`;
        });
      },
      {
        root: null,
        rootMargin: "0px 0px",
        threshold: 1, // 임계값을 1로 설정하고, 비율이 1에 도달할 때만 콜백 함수가 트리거됨
      }
    );
    items.forEach((item) => io.observe(item));
  }
</script>
```

# 편집 가능 요소 ✏️



DOM 요소를 편집해야 할 때, 텍스트 영역처럼 클릭하세요.

```js
<div contenteditable="true">여기를 편집할 수 있어요</div>
```

# 요소 속성 감시하기 👀

```js
<div id="test">테스트</div>
<button onclick="handleClick()">확인</button>

<script>
  const el = document.getElementById("test");
  let n = 1;
  const observe = new MutationObserver((mutations) => {
    console.log("속성이 변경되었어요", mutations);
  })
  observe.observe(el, {
    attributes: true
  });
  function handleClick() {
    el.setAttribute("style", "color: red");
    el.setAttribute("data-name", n++);
  }
  setTimeout(() => {
    observe.disconnect(); // 감시 중지
  }, 5000);
</script>
```



# DOM 요소 출력하기 🖨️

개발 과정에서 DOM 요소를 출력해야 할 때, console.log을 사용하면 종종 전체 DOM 요소만 출력되고 내부 속성을 볼 수 없습니다. console.dir을 사용해보세요.

```js
console.dir(document.body)
```

# 기타



# 어플리케이션 활성화하기 🚀

모바일 측면에서 개발할 때, 다른 애플리케이션을 열어야 할 때가 있어요. 아래 방법들은 location.href 할당을 통해서도 작동할 수 있어요.

```js
<!-- 다음 링크들을 사용해서 폰 기능을 활성화해보세요 📲 -->
<a href="tel:12345678910">전화 걸기</a>
<a href="sms:12345678910,12345678911?body=안녕하세요">안드로이드 메시지</a> 
<a href="sms:/open?addresses=12345678910,12345678911&body=안녕하세요">iOS 메시지</a>
<a href="wx://">iOS 메시지</a>
```

# 쉬운 용어로 설명 🚀



In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수치고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기