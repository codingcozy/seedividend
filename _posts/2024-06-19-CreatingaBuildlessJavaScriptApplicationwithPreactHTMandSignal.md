---
title: "Preact, HTM, 그리고 Signal을 활용한 빌드 없이 구축하는 JavaScript 애플리케이션"
description: ""
coverImage: "/assets/img/2024-06-19-CreatingaBuildlessJavaScriptApplicationwithPreactHTMandSignal_0.png"
date: 2024-06-19 23:57
ogImage: 
  url: /assets/img/2024-06-19-CreatingaBuildlessJavaScriptApplicationwithPreactHTMandSignal_0.png
tag: Tech
originalTitle: "Creating a Buildless JavaScript Application with Preact, HTM, and Signal"
link: "https://medium.com/@antoniogallo.it/creating-a-buildless-javascript-application-with-preact-htm-and-signal-f99386ad36d4"
isUpdated: true
---




현대 웹 개발 시대에는 빌드 도구의 복잡성이 때로는 초보자들과 간단하게 유지하고 싶은 사람들에게 장벽이 될 수 있습니다 (K.I.S.S.).

그러나 Preact, HTM, Signal과 같은 라이브러리들이 등장함으로써, 빌드가 필요 없는 JavaScript 애플리케이션을 생성하는 것이 가능할 뿐만 아니라 효율적으로 이루어질 수 있게 되었습니다.

이 접근법은 빌드 구성의 부담 없이 프로젝트를 신속하게 설정할 수 있어 개발 프로세스를 빠르고 간편하게 만들어줍니다.

## 왜 Preact, HTM, 그리고 Signal을 선택해야 할까요?

<div class="content-ad"></div>

- Preact: React의 3KB 빠른 대안인 Preact는 동일한 현대적 API를 제공하며, DOM 위에 가장 얇은 Virtual DOM 추상화를 제공합니다. 그 간결함과 작은 크기로 빌드 없이 설정이 필요한 환경에서 각 바이트가 중요한 경우 이상적입니다.
- HTM: Hyperscript Tagged Markup (HTM)은 JSX와 유사한 구문을 변환 없이 브라우저에서 직접 사용할 수 있게 해줍니다. HTM은 Preact와 아름답게 결합되어, 빌드 단골 없이도 개발자 친화적인 템플릿 제작 경험을 제공합니다.
- Signals: Preact와 원활하게 작동하는 상태 관리 라이브러리로, 애플리케이션 상태를 섬세하게 반응적 프로그래밍으로 처리할 수 있는 간단하고 효율적인 방법을 제공합니다.

## 빌드 없는 환경 설정

[여기](https://github.com/badpenguin/buildless-pwa)에서 GitHub에서 제 제작 App을 시작할 수 있습니다.

<div class="content-ad"></div>

빌드 없이 구현되는 전체 컨셉은 다음 두 가지 기반을 갖고 있어요:

- 번들러 대신 ES 모듈과 ImportMap 사용;
- JSX 대신 HTM 템플릿 리터럴 라이브러리 사용.

그래서 브라우저가 ImportMap과 호환되어야 해요. 그것이 항상 그런 것은 아니에요. 그래서 시작할 때 다음 폴리필을 추가하는 것을 제안해요:

https://github.com/guybedford/es-module-shims

<div class="content-ad"></div>

```js
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.3/dist/es-module-shims.js"></script>
```

그러면 "fetch" 및 기타 기능 지원 여부를 확인하는 몇 가지 확인 사항을 알게 될 것입니다.

현대 브라우저에서도 이 기본 구조가 작동하지만, 기기의 기능을 항상 확인하는 것을 추천합니다.

<div class="content-ad"></div>

외부에는 오래된 "스마트 TV"와 미친 JVM과 같은 이상한 오래된 장치들이 많이 있어요. 그래서 그들의 브라우저가 너무 오래되었다고 표시해 주는 것도 나쁘지 않겠죠.

여기 importmap이 등장합니다.

여기서 우리는 JS 엔진에게 import할 라이브러리를 어디에서 찾을 수 있는지를 지정해 줍니다.

HTML 파일의 importmap은 종속성을 직접 선언하고, Preact, HTM, 그리고 Signal의 번들 버전을 가리키며, script 태그를 통해 로드할 수 있는 내용입니다.

<div class="content-ad"></div>

이 설정은 개발 중에 번들러나 모듈 로더가 필요하지 않도록 만들어줍니다.

```js
<script type="importmap">
    {
        "imports": {
            "preact": "/app/dist/standalone.js",
            "preact/hooks": "/app/dist/standalone.js",
            "htm": "/app/dist/standalone.js",
            "@preact/signals": "/app/dist/standalone.js",
            "@preact/signals-core": "/app/dist/standalone.js",
            "preact-router": "/app/dist/preact-router.module.js"
        }
    }
</script>
```

원격 라이브러리도 지정할 수 있지만 저는 항상 로컬 사본을 사용하는 것을 선호합니다. 특히 WebView(Cordova와 같은)를 사용하여 이 웹앱을 모바일 앱으로 번들하려고 할 때 말이죠.

standalone.js를 눈치채셨나요?

<div class="content-ad"></div>

저는 몇 개의 라이브러리를 하나의 파일에 패키징했습니다. 이 프로젝트 덕분에:

https://github.com/mujahidfa/preact-htm-signals-standalone

이곳에서는 22KB 안에 훅과 시그널이 포함된 Preact와 HTM 템플릿 라이브러리를 받을 수 있습니다.

이제 주 애플리케이션 컴포넌트를 부트스트랩할 준비가 되었습니다:

<div class="content-ad"></div>

```js
<script type="module">
  import {h, render} from 'preact';
  import {MainApp} from '/app/main.js';

  window.onload = function() {
    console.log('* onload');
    const app = h(MainApp);
    render(app, document.getElementById("main"));
  }
</script>
<div id="main"></div>
```

React에 익숙하다면, 이것은 단지 "hello world"일 뿐입니다.

주목할 점은 main 구성요소가 별도의 파일인 main.js로 나뉘어져 있다는 것입니다. "/app/main.js"는 실제로 절대 또는 상대 URL이 될 수 있으며, 파일 경로가 아닙니다.

## The splash screen example


<div class="content-ad"></div>

단순한 스플래시 화면 예제 역시 "신호"를 활용하는 방법을 보여드리기 위해 추가했어요.

이 화면은 어플리케이션이 초기화되는 동안 보일 거에요.

스플래시 화면에 대한 모든 CSS와 HTML은 외부 파일에 의존하지 말고 주요 index.html 파일 내에 넣어주세요.

가능하다면 외부 HTTP 요청을 피하기 위해 이미지를 base64로 인라인으로 포함해주세요. 그렇지 않으면 여기서 "사전로드(preload)"의 개념을 잃을 것이에요.

<div class="content-ad"></div>

```js
# 프리로드
<preload> 요소에는 다음과 같은 스타일이 지정되어 있습니다.
- 텍스트 색상: #6d1153
- 배경색: #fff
- 안쪽 여백: 1rem
- 고정 위치: 화면 상단 좌측
- 플렉스 박스로 설정, 세로 방향으로 정렬
- 가운데 정렬
- 글꼴: sans-serif
- 글꼴 크기: 18px
- 줄 높이: 1.7

preload 요소의 이미지는 다음과 같이 스타일이 지정되어 있습니다.
- 블록으로 표시
- 아래 여백: 2rem

preload 요소 내의 단락과 제목은 다음과 같은 스타일이 지정되어 있습니다.
- 텍스트 색상: #333

preload 요소 내의 링크는 다음과 같은 스타일이 지정되어 있습니다.
- 링크 색상: #FF1978
```

이 main.js 파일에서 이것이 어떻게 숨겨지는지 상세히 보여드리겠습니다.

## JSX 대신 HTML을 사용하여 개발

그리고 이것이 "Main" 컴포넌트입니다.

<div class="content-ad"></div>

```js
import {html} from 'htm';
import Router, {route} from 'preact-router';
import {signal} from '@preact/signals';
import {effect} from '@preact/signals-core';

export function MainApp() {
 console.debug('- render MainApp');
 return html`
  ${$loading.value ? null : html`
   <${Router}>
    <${PageHome} path="/"/>
    <${PageNotFound} default/>
   <//>`}
 `;
}
```

위 코드에서는 JSX를 사용하는 대신 HTM 라이브러리를 사용하고 있습니다.

HTM 구문은 브라우저에서 직접 JSX와 유사한 컴포넌트를 생성하는 데 사용되며, Signal은 상태 변경을 반응적으로 관리하여 사용자 상호 작용에 따라 UI를 업데이트합니다.

이 구성 요소에서 $loading이 TRUE일 때만 렌더링되지 않습니다(널 값), 즉 div#main이 아닌 div#preload가 그대로 표시됩니다.


<div class="content-ad"></div>

로딩이 완료되면 preact-router의 설정에 따라 페이지를 최종적으로 렌더링합니다.

$loading 변수는 preact-signal로 생성된 오브젝트입니다.

```js
export const $loading = signal(true);
```

메인 컴포넌트를 미리 채우는 초기화 함수를 만들고 작업이 완료되면 이 변수를 FALSE로 설정할 수 있습니다.

<div class="content-ad"></div>

```js
setTimeout(function(){
 console.log('- loading completed.');
 $loading.value = false;
}, 1000);
```

“effect”와 “dispose”를 사용하여 $loading의 값이 변경될 때마다 “una tantum”(한 번만)을 가로채고 스플래시 화면을 숨길 수 있습니다:

```js
const dispose = effect(() => {
 if ($loading.value) {
  return;
 }
 console.debug('- app ready');
 // 프리로드 숨기기
 const preloadDiv = document.getElementById("preload");
 preloadDiv.style.display = "none";
 dispose();
});
```

$loading은 우리의 “Main” 컴포넌트 내에서 사용되므로, Main 컴포넌트를 자동으로 다시 렌더링하게 됩니다.

<div class="content-ad"></div>

## 신호 및 HTM을 사용한 간단한 카운터 생성

이 예제는 매우 간단합니다. 먼저 변수를 만들어주세요:

```js
export const $counter = signal(0);
```

그리고 이 두 버튼으로 조작해보세요:

<div class="content-ad"></div>

```js
const PageHome = function() {
 console.debug('- render PageHome');
 return html`
  <div class="page active ">

    <div class="flex-row">

     <a class="btn" onclick="${() => {
      $counter.value--;
     }}">\u00AB</a>

     <span class="counter">${$counter}</span>

     <a class="btn" onclick="${() => {
      $counter.value++;
     }}">\u00BB</a>

    </div>

  </div>`;
};
```

팁: HTM에서는 &raquo;와 같은 HTML 엔티티를 사용할 수 없습니다. 왜냐하면 이들이 사용된 그대로 표시될 것이기 때문입니다. 해결책은 \u0000 구문을 대신 사용하는 것입니다.

그게 다 입니다.

만약 풀 기능의 PWA를 만들기 위해 Manifest.json과 좋아하는 ServiceWorker 구현을 추가하고 싶다면 언제라도 추가해 주세요.

<div class="content-ad"></div>

## 빌드 없는 접근 방식의 이점

- 간편함: 웹팩, 롤업 또는 다른 빌드 구성을 유지할 필요가 없어 설정을 단순화하고 빌드 관련 문제의 가능성을 줄입니다.
- 속도: 변경 사항이 즉시 브라우저 새로고침 후에 반영되어 개발 주기를 가속화합니다.
- 코드에 집중: 개발자들은 특히 작은 프로젝트나 개발 초기 단계에서 도구보다 코딩에 더 집중할 수 있습니다.

## 고려해야 할 단점

- 확장성: 프로젝트가 커짐에 따라 빌드 시스템의 부재는 트리 쉐이킹, 최소화, 고급 번들링 전략과 같은 최적화 옵션을 제한할 수 있습니다.
- 브라우저 호환성: 현대 브라우저 기능에 지나치게 의존할 경우 응용 프로그램이 이전 브라우저와 호환되는 것을 제한할 수 있습니다.

<div class="content-ad"></div>

## 결론

Preact, HTM 및 Signals를 활용한 빌드 없는 JavaScript 애플리케이션은 현대적인 개발 관행과 간단함 사이에 뛰어난 균형을 제공합니다.

특히 가벼운 애플리케이션이나 프로토 타입을 신속하게 작성하려는 개발자들에게 매력적입니다.

모든 프로젝트에 적합하지는 않을 수 있지만, 특히 대규모 애플리케이션에는 해당하지 않을 수 있지만, 빠른 설정과 적은 종속성을 우선시하는 사람들에게 매력적인 옵션을 제공합니다.

<div class="content-ad"></div>

## 나에 대해

저는 오픈 소스 기술 분야에서 40년 이상의 경험을 가지고 있습니다. 개발자, 연설가 및 트레이너로 활동하고 있습니다. 제 LinkedIn 프로필이나 웹사이트 https://antoniogallo.it를 확인해주세요.