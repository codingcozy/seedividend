---
title: "ERR_BLOCKED_BY_RESPONSENotSameOrigin 에 대한 간단한 해결 방법"
description: ""
coverImage: "/assets/img/2024-05-20-AsimplewaytosolveERR_BLOCKED_BY_RESPONSENotSameOrigin_0.png"
date: 2024-05-20 23:04
ogImage: 
  url: /assets/img/2024-05-20-AsimplewaytosolveERR_BLOCKED_BY_RESPONSENotSameOrigin_0.png
tag: Tech
originalTitle: "A simple way to solve ERR_BLOCKED_BY_RESPONSE.NotSameOrigin"
link: "https://medium.com/@wenhsuanliao/a-simple-way-to-solve-err-blocked-by-response-notsameorigin-85a6201f838"
isUpdated: true
---




<img src="/assets/img/2024-05-20-AsimplewaytosolveERR_BLOCKED_BY_RESPONSENotSameOrigin_0.png" />

"ERR_BLOCKED_BY_RESPONSE.NotSameOrigin"은 일반적으로 웹 브라우저에서 발생하는 오류입니다. 이 오류는 웹페이지가 접근하려는 리소스가 페이지 자체와 다른 출처(또는 도메인)를 가지고 있는 경우에 발생합니다. 이는 웹 브라우저에 내장된 보안 기능으로, 다중 사이트 스크립팅 공격을 방지하기 위한 것입니다.

웹 페이지가 다른 출처로 요청을 시도할 때, 브라우저는 해당 요청을 차단하고 "ERR_BLOCKED_BY_RESPONSE.NotSameOrigin" 오류 메시지를 반환합니다. 이는 요청을 허용할 경우 민감한 정보가 노출되거나 악성 코드가 페이지에서 실행될 수 있기 때문입니다.

이 오류를 해결하려면 페이지가 접근하려는 모든 리소스(예: 이미지, 스크립트 및 기타 파일)가 페이지 자체와 동일한 도메인에 호스팅되어 있는지 확인해야 합니다. 또는 특정 출처가 리소스에 액세스할 수 있도록 크로스 출처 리소스 공유(CORS)를 사용할 수도 있습니다.

<div class="content-ad"></div>

제 프로젝트에서 가져온 간단한 예시입니다:

이미지 파일 위치를 지정하는 src 속성이 있는 HTML img 태그입니다. 이는 제3자 API입니다.

```js
<img src={`https://countryflagsapi.com/png/${country.alpha3Code.toLowerCase()}`} alt="flag"/>
```

img 태그에 crossorigin 속성을 간단히 추가할 수 있습니다:

<div class="content-ad"></div>

```js
<img crossorigin='anonymous' src={`https://countryflagsapi.com/png/${country.alpha3Code.toLowerCase()}`} alt=”flag”/>
```

문제를 해결할 수 있는 또 다른 고급 방법이 있습니다. Helmet을 사용하여 crossOriginEmbedderPolicy 미들웨어를 비활성화하는 방법도 있습니다. 더 많은 세부 정보는 여기에서 확인할 수 있습니다.

추가 자료:
RFC 섹션-3.4.2
