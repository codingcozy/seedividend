---
title: "Angular Content Security Policy 위반 사항 보고하는 방법 "
description: ""
coverImage: "/assets/img/2024-06-22-AngularWayswecanreportContentSecurityPolicyViolations_0.png"
date: 2024-06-22 14:55
ogImage:
  url: /assets/img/2024-06-22-AngularWayswecanreportContentSecurityPolicyViolations_0.png
tag: Tech
originalTitle: "Angular: Ways we can report Content Security Policy Violations"
link: "https://medium.com/@ramya-bala221190/angular-ways-we-can-report-content-security-policy-violations-e5f36d971904"
isUpdated: true
---

귀하의 애플리케이션에서 발생한 CSP 위반 사항을 추적하여 해당 보고서를 응용 프로그램 서버로 전송하여 분석할 수 있습니다. 이를 위해 Content-Security-Policy 헤더의 report-to 또는 report-uri 지시문을 사용하면 됩니다.

report-uri은 더 이상 권장되지 않으며 report-to가 이를 대체하기 위해 도입되었습니다. 그러나 모든 브라우저에서 report-to가 아직 지원되지 않으므로 호환성을 위해 두 지시문을 모두 사용하는 것이 좋습니다.

아래 예시를 참고해 보세요. 여기서는 report-uri 지시문을 추가하여 브라우저에게 위반 보고서를 JSON 문서 형식으로 작성하여 HTTP POST 요청을 사용해 https://csrfexample.com:3443/reportViolations로 보내도록 지시하고 있습니다:

```js
“Content-Security-Policy”:”default-src ‘self’;report-uri https://csrfexample.com:3443/reportViolations"
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

이제 CSP를 위반해보고 위반 보고서가 어떻게 전송되는지 살펴보겠습니다. 내 Angular 앱은 https://innocent.csrfexample.com:4200에서 호스팅되어 있습니다.

AppComponent에서 https://csrfexample.com:3443에서 이미지를 로드하고 있습니다. 이는 default-src 지시어를 위반합니다. default-src 지시어는 'self'로 설정되어 있기 때문에 응용 프로그램에서 https://innocent.csrfexample.com:4200과 다른 출처에서 리소스가로드되는 경우 위반으로 간주됩니다.

```js
<img src="https://csrfexample.com:3443/getImage">
```

Angular.json의 "serve" 섹션에 "headers" 속성을 아래와 같이 설정했습니다.

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
“serve”: {
“builder”: “@angular-devkit/build-angular:dev-server”,
“options”: {
“sslKey”: “./self-signed-with-no-passphrase/secureAngularExample.key”,
“sslCert”: “./self-signed-with-no-passphrase/secureAngularExample.crt”,
“ssl”: true
},
“configurations”: {
“production”: {
“browserTarget”: “csrfInAngular:build:production”
},
“development”: {
“browserTarget”: “csrfInAngular:build:development”,
“headers”: {
“Content-Security-Policy”:”default-src ‘self’;report-uri https://csrfexample.com:3443/reportViolations"
}
}
},
“defaultConfiguration”: “development”
}
```

저는 https://csrfexample.com:3443에 호스팅된 Node Express 서버를 만들었고, 위반 데이터를받기 위한 POST 경로를 만들었습니다.

```js
router.post(‘/reportViolations’,(req,res,next)=>{
res.status(200).send(“위반 사항이 성공적으로 수신되었습니다”)
})
```

브라우저에서 https://innocent.csrfexample.com:4200을 입력하면, https://csrfexample.com:3443/getImage로의 http GET 요청이 CSP에 의해 차단되었음을 확인할 수 있으며, https://csrfexample.com:3443/reportViolations으로 3개의 http POST 요청을 보게 됩니다. 각 POST 요청에는 개별 위반 사항의 보고서가 포함되어 있습니다.

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

지금 3개의 위반 보고서 내용을 확인해보겠습니다.

정책을 시행하지 않고 CSP 위반 사항을 모니터링할 수 있나요?

네! Content-Security-Policy-Report-Only 헤더를 사용하면 정책을 강제하지 않고 모니터링함으로써 정책을 실험할 수 있습니다.

angular.json 파일의 "serve" 섹션 아래 headers 속성을 아래와 같이 수정해봅시다:

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
“serve”: {
“builder”: “@angular-devkit/build-angular:dev-server”,
“options”: {
“sslKey”: “./self-signed-with-no-passphrase/secureAngularExample.key”,
“sslCert”: “./self-signed-with-no-passphrase/secureAngularExample.crt”,
“ssl”: true
},
“configurations”: {
“production”: {
“browserTarget”: “csrfInAngular:build:production”
},
“development”: {
“browserTarget”: “csrfInAngular:build:development”,
“headers”: {
 "Content-Security-Policy-Report-Only":"default-src 'self';report-uri https://csrfexample.com:3443/reportViolations"
}
}
},
“defaultConfiguration”: “development”
}
```

애플리케이션을 재시작하여 변경 사항을 확인해 봅시다.

아래 이미지가 성공적으로 로드된 것을 관찰할 수 있습니다. CSP default-src 지시문이 강제되지 않았지만 이 지시문과 관련된 위반 사항이 서버에 성공적으로 게시되었습니다. 아래 2번째 스크린샷에서 확인할 수 있습니다.

애플리케이션 서버가 위반 보고서 처리 책임을 다른 신뢰할 수 있는 시스템에 맡길 수 있을까요?

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

그래요! https://report-uri.com/ 이 도움을 줄 거에요. 테스트 목적으로 무료 계정을 만들고 계정별 보고 URL을 사용해 위반 보고서를 게시할 수 있어요.

지금까지 한 모든 것은 그대로 유지돼요. 변하는 것은 보고서를 게시할 URL 뿐이죠. 보안 정책을 강제하고 싶든 원하지 않든, 이 방법은 여러분에게 완벽히 도움이 될 거에요.

위반 보고서를 보내기 위해 report-uri.com 서버로 3개의 HTTP POST 요청을 확인해보세요.

대시보드에 나타나는 CSP 위반 보고서는 이렇게 생겼어요.
