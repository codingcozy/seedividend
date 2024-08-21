---
title: "HMPL  API를 통해 HTML을 가져오는 새로운 템플릿 언어"
description: ""
coverImage: "/assets/img/2024-06-20-HMPLnewtemplatelanguageforfetchingHTMLfromAPI_0.png"
date: 2024-06-20 03:41
ogImage:
  url: /assets/img/2024-06-20-HMPLnewtemplatelanguageforfetchingHTMLfromAPI_0.png
tag: Tech
originalTitle: "HMPL — new template language for fetching HTML from API"
link: "https://medium.com/@antonmak1/hmpl-new-template-language-for-fetching-html-from-api-6c1d2dd26af6"
isUpdated: true
---

![이미지](/assets/img/2024-06-20-HMPLnewtemplatelanguageforfetchingHTMLfromAPI_0.png)

이 글에서는 HMPL이라고 불리는 새로운 템플릿 언어에 대해 이야기하겠습니다. 이 언어를 사용하면 API에서 HTML을 쉽게 불러올 수 있어 굉장히 많은 불필요한 코드를 줄일 수 있습니다.

hmpl.js의 주요 목표는 작은 요청 구조를 HTML에 통합하여 서버 작업을 간단하게 만드는 것입니다. 이는 php 확장자가 있는 파일에서 php 요청을 통해 서버로부터 받은 응답을 처리하는 방식과 비교될 수 있지만 동시에 javascript를 통해 직접적으로 처리할 수 있는 방법을 제공합니다. 단순히 버튼에서 제목을 가져오는 예를 통해 이 템플릿 언어가 귀하의 작업을 단순화할 수 있는 방법을 이해할 수 있습니다.

이 템플릿 언어를 이용하면 지정된 문자열 템플릿을 반복할 수 있습니다. 코드로 표현하면 다음과 같습니다:

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

```js
import { compile } from "hmpl-js";
const templateFn = compile(
  `<div>
     <request src="/api/test"></request>
   </div>`
);

const wrapper = document.getElementById("wrapper");
const obj1 = templateFn();

const obj2 = templateFn();

wrapper.appendChild(obj1.response);
wrapper.appendChild(obj2.response);
```

이 모듈은 최신 JS 도구를 사용하여 서버와 작업할 수 있도록 fetch API에 기반을 둔 것입니다.

fetch API와 상호작용하려면 RequestInit 유형을 기반으로 한 설정 객체도 생성되었습니다. 예시 코드:

```js
const elementObj = templateFn({
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "text/html",
  },
  redirect: "follow",
  get: (prop, value) => {},
  referrerPolicy: "no-referrer",
  body: JSON.stringify(data),
  signal: new AbortController().signal,
  integrity: "…",
  window: null,
  refferer: "about:client",
});
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

템플릿 언어의 구문 자체로 .hmpl 확장자 파일을 사용하여 실용적이고 이해하기 쉬운 프로젝트 파일 구조를 만들고 일반 HTML과 "모듈화된" HTML을 분리하는 것이 가능합니다.

![이미지](/assets/img/2024-06-20-HMPLnewtemplatelanguageforfetchingHTMLfromAPI_1.png)

해당 모듈은 매우 작은 크기입니다 (버전 1.0.9). npm에서 100킬로바이트 미만을 차지합니다. 미니파이된 파일 자체도 더욱 가벼워집니다.

![이미지](/assets/img/2024-06-20-HMPLnewtemplatelanguageforfetchingHTMLfromAPI_2.png)

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

아래는 작업을 더욱 쉽게 수행할 수 있는 여러 연결 옵션이 있는 모듈입니다:

```js
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
```

또는

```js
{
  "dependencies": {
    "hmpl-js": "latest"
  }
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

웹팩 구성 파일

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.hmpl$/i,
        use: ["hmpl-loader"],
      },
    ],
  },
};
```

모듈에 대한 간단한 프로젝트 예시:

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

https://github.com/hmpljs/examples

다른 유용한 링크:

- https://hmpljs.github.io
- https://github.com/hmpljs/hmpl-loader
- https://github.com/hmpljs/hmpl
- https://www.youtube.com/@antonmak1

이 모듈에 관심이 있으시다면 댓글에 여러분의 의견을 남겨주시면 멋질 것 같아요 :). 이 기사를 읽어 주셔서 감사합니다!
