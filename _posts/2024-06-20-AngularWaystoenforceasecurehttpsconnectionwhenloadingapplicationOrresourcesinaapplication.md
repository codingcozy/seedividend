---
title: "앵귤러 애플리케이션을 로드할 때 안전한 HTTPS 연결을 강제하는 방법 혹은 애플리케이션에서 리소스를 로드할 때 HTTPS 연결을 적용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-AngularWaystoenforceasecurehttpsconnectionwhenloadingapplicationOrresourcesinaapplication_0.png"
date: 2024-06-20 03:03
ogImage: 
  url: /assets/img/2024-06-20-AngularWaystoenforceasecurehttpsconnectionwhenloadingapplicationOrresourcesinaapplication_0.png
tag: Tech
originalTitle: "Angular: Ways to enforce a secure https connection when loading application Or resources in a application"
link: "https://medium.com/stackademic/angular-ways-to-enforce-a-secure-https-connection-when-loading-application-or-resources-in-a-a1fcf397a215"
---


응용 프로그램을로드하는 경우뿐만 아니라 응용 프로그램 서버에서 리소스를 요청할 때도 안전한 https 연결을 강제로 설정해야 할 수 있습니다. 이 스토리에서는 이러한 목표를 모두 달성하는 방법을 확인해보겠습니다.

I. 응용 프로그램을로드 할 때 https로 리디렉션

Angular 앱이 443 포트의 innocent.csrfexample.com에서 실행 중이라고 가정해 보겠습니다. OpenSSL을 사용하여 암호없이 SSL 인증서를 이미 생성했습니다.

브라우저에서 https://innocent.csrfexample.com을 입력하면 아래와 같이 응용 프로그램이 로드됩니다.

<div class="content-ad"></div>

만약 http://innocent.csrfexample.com을 입력하면 HTTP에서 HTTPS로 리다이렉션을 달성하기 위해 브라우저에게 해당 사이트를 HTTP로 로드하지 말고 모두 HTTPS로 요청하도록 지시하는 HTTP Strict Transport Security(HSTS) 헤더를 사용할 수 있습니다.

더 나아가기 전에 브라우저 리다이렉션에 대해 몇 가지 포인트를 이해해 봅시다.

- 서버는 요청에 특별한 리다이렉트 응답을 보내어 리다이렉션을 트리거합니다.
- 리다이렉트 응답에는 3으로 시작하는 상태 코드가 있으며, 리다이렉트할 URL을 포함하는 Location 헤더가 있습니다.
- 브라우저가 리다이렉트를 받으면 즉시 Location 헤더에 제공된 새 URL을 로드합니다.
- 리다이렉션에는 영구적, 일시적 및 특별한 유형이 있습니다.

HTTP Strict Transport Security 헤더는 어떻게 작동하나요?

<div class="content-ad"></div>

아래는 이 헤더를 사용하는 예시입니다.

```js
“Strict-Transport-Security”: “max-age=63072000; includeSubDomains; preload”
```

max-age는 브라우저가 해당 사이트에만 HTTPS를 사용하여 액세스해야 한다는 것을 기억하는 시간(초)입니다.

includeSubDomains는 선택적인 매개변수로, 지정된 경우 이 규칙이 사이트의 모든 하위 도메인에도 적용됩니다.

<div class="content-ad"></div>

preload 매개변수는 Google Chrome에 하드코딩된 브라우저 사전로드 목록에 도메인을 추가하며, Chrome 목록을 기반으로 하는 다른 브라우저에도 적용됩니다. 또한 도메인을 hstspreload.org에서도 선언해야 합니다.

- URL innocent.csrfexample.com 또는 http://innocent.csrfexample.com에 접속하면, 브라우저는 HTTP 프로토콜을 사용하려고 한다고 가정하여 innocent.csrfexample.com으로 HTTP 요청을 보냅니다.
- 이 시점에서 웹 서버는 리디렉트(301 상태 코드)로 HTTPS 사이트로 응답합니다. 브라우저는 innocent.csrfexample.com으로 HTTPS 연결을 만듭니다.
- 사이트가 처음으로 HTTPS를 사용하여 액세스되고 Strict-Transport-Security 헤더를 반환하는 경우, 브라우저는 이 정보를 기록하여 나중에 해당 사이트를 HTTP로 로드하려는 시도가 자동으로 HTTPS를 사용하도록 지원합니다.
- Strict-Transport-Security 헤더는 브라우저에 아래 지침을 제공합니다.

```js
- 이 헤더를 수신한 순간부터 다음 63072000초(최대 연령 매개변수로 지정) 동안 사이트와 해당 하위 도메인에 대한 모든 연결은 반드시 HTTPS로 이루어져야 합니다(includeSubDomains 매개변수가 포함된 경우).
- 모든 HTTP 연결을 허용하지 않습니다.

- 브라우저가 HTTP를 사용하여 리소스를로드하는 요청을 받으면, 대신 HTTPS 요청을 시도해야 합니다. HTTPS를 사용할 수 없는 경우 연결을 종료해야 합니다.
```

<div class="content-ad"></div>

4. 웹 사이트에 처음 액세스할 때 HSTS로 보호받지 못하는 불편함이 있습니다. 사용자가 HSTS를 활용하려면 브라우저가 HSTS 헤더를 최소 한 번 볼 수 있어야 합니다. 이는 첫 번째 안전한 연결 이후 가능합니다. 이 문제를 해결하려면 웹 사이트를 HSTS 사전 로딩 목록에 추가해야 합니다(https://hstspreload.org/). 이렇게 하면 브라우저가 먼저 내부 목록을 확인하고 첫 연결 시도 중에도 웹 사이트에 HTTP를 통해 접근하지 않습니다.

5. HSTS의 max-age 매개변수는 브라우저가 Strict-Transport-Security 헤더를 읽을 때마다 갱신됩니다. 이는 max-age 매개변수로 지정된 시간 내에 방문 사이에 간격이 넘지 않는 한 보호가 영구적임을 의미합니다. max-age 매개변수로 지정된 시간 동안 웹 사이트를 방문하지 않으면 새로운 사이트로 취급됩니다.

동시에 max-age를 0으로 설정하여 Strict-Transport-Security 헤더를 제공하면, 브라우저는 다음 연결 시도에서 사이트를 새로운 것으로 처리합니다. max-age 매개변수를 0으로 설정하면 사이트의 HSTS가 비활성화됩니다.

아래는 HSTS의 다이어그램 표현입니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-AngularWaystoenforceasecurehttpsconnectionwhenloadingapplicationOrresourcesinaapplication_0.png)

이제 로컬 개발 서버와 nginx 웹 서버에서 이 헤더를 사용하는 방법을 살펴보겠습니다.

로컬 개발 서버 사용하기

package.json 파일의 "start" 스크립트는 다음과 같이 보입니다:


<div class="content-ad"></div>

```js
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "sslKey": "./self-signed-with-no-passphrase/secureAngularExample.key",
    "sslCert": "./self-signed-with-no-passphrase/secureAngularExample.crt",
    "ssl": true
  },
  "configurations": {
    "production": {
      "browserTarget": "csrfInAngular:build:production"
    },
    "development": {
      "browserTarget": "csrfInAngular:build:development",
      "headers": {
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
      }
    }
  },
  "defaultConfiguration": "development"
}
```

Strict-Transport-Security response header가 "headers" 객체에 속성으로 추가되었습니다.

<div class="content-ad"></div>

```json
"headers": {
"Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
}
```

다른 웹 서버 사용하기

이 이야기에서는 nginx 웹 서버를 사용 중이지만 이 개념은 모든 웹 서버에 적용됩니다.

다음은 nginx.config입니다. Nginx는 포트 80과 443에서 연결을 받고 있습니다.

<div class="content-ad"></div>

서버 블록을 2개 추가했어요. 두 블록 모두 server_name이 innocent.csrfexample.com으로 동일하지만 다른 포트인 443과 80에서 수신하고 있어요.

Nginx가 80포트에서 요청을 받으면, 같은 사이트를 https 프로토콜을 사용하여 301 상태 코드로 리디렉션 하고 있어요.

```js
server{
listen 0.0.0.0:80;
server_name innocent.csrfexample.com;
return 301 https://$host$request_uri;
}
```

443포트에서 수신하는 서버 블록 안에, add_header 지시문을 사용하여 Strict-Transport-Security 응답 헤더를 설정했어요. 이를 통해 브라우저가 응용 프로그램을 http에서 https 프로토콜로 리디렉션할 때, Strict-Transport-Security 응답 헤더가 브라우저로 보내지도록 설정되어요.

<div class="content-ad"></div>


```js
add_header ‘Strict-Transport-Security’ ‘max-age=63072000; includeSubDomains; preload’;
``` 

Angular 앱을 Nginx에 배포하기 위해 애플리케이션을 컨테이너화했습니다.

다음은 docker-compose.yml입니다.

다음은 Dockerfile입니다.


<div class="content-ad"></div>

"Docker compose build"과 "docker compose up"을 실행합니다.

- 브라우저에서 처음으로 http://innocent.csrfexample.com에 접속하면, 브라우저는 301 Moved Permanently 응답을 사용하여 사이트를 안전한 https:// 스키마로 리디렉션합니다.

Location 응답 헤더는 브라우저가 새 URL을로드해야 함을 나타냅니다.

아래 스크린샷에서 "Strict-Transport-Security" 응답 헤더를 확인하세요. 요청 URL에서 명확히 알 수 있듯이, https로 리디렉트된 후에 응답 헤더가 전송됩니다. 브라우저는이 사이트의 만료 시간을 63072000초 또는 2년으로 기록할 것입니다.

<div class="content-ad"></div>

2. 브라우저에서 http://innocent.csrfexample.com에 두 번째로 접속하면, 브라우저가 307 임시 리디렉트 응답을 사용하여 사이트를 안전한 https://로 리디렉션합니다. 이번에는 HSTS(Http Strict Transport Security) 덕분에 https로 리디렉션이 이루어졌습니다. 아래 스크린샷에서 확인할 수 있듯이, HSTS는 브라우저 자체에서 HTTPS로 재작성이 이루어지므로 301 상태 코드 응답과 같은 nginx 웹 서버에 의한 HTTPS로의 리디렉트가 없어졌습니다.

HSTS는 응용 프로그램이 브라우저에서 max-age 매개변수가 만료될 때까지 오직 HTTPS 연결로만 로드되도록 보장합니다.

3. 이제 nginx.config 파일에서 max-age 매개변수를 0으로 설정해보겠습니다. 이는 HSTS를 비활성화하는 것을 의미합니다.

```js
add_header ‘Strict-Transport-Security’ ‘max-age=0; includeSubDomains; preload’ always;
```

<div class="content-ad"></div>

현재 브라우저에서 http://innocent.csrfexample.com을 입력하면 이전에 2년 동안이었던 이 사이트의 max-age 매개변수가 아직 만료되지 않아 HSTS로 다시 https로 리디렉션됩니다.

아래 스크린샷에서 응답 헤더를 확인해 보세요. 여기에서 max-age 매개변수는 0입니다. 브라우저는 이 사이트의 만료 시간을 지금부터 0초로 업데이트할 것입니다.

다음에 브라우저에서 다시 http://innocent.csrfexample.com에 접속할 때, 최신 업데이트에 따라 max-age 매개변수가 0초이므로 HSTS가 리디렉션을 수행하지 않도록 http에서 https로 영구적으로 이동(response code 301)합니다.

이러한 과정은 향후 이 사이트를 로드하려는 시도에서도 계속될 것이며, max-age 매개변수가 0보다 큰 값으로 업데이트되어 HSTS를 활성화할 때까지 지속됩니다.

<div class="content-ad"></div>

4. max-age를 63072000으로 다시 업데이트했다고 치면,

```js
add_header ‘Strict-Transport-Security’ ‘max-age=63072000; includeSubDomains; preload’ always;
```

= 이제 다시 http://innocent.csrfexample.com에 접속했을 때 301 응답 코드로 인해 https로 리디렉션됩니다. 하지만 https로 리디렉션된 후의 응답 헤더를 아래 2번째 스크린샷에서 살펴봐주세요. Strict-Transport-Security 헤더의 max-age 매개변수가 업데이트되었습니다. 브라우저는 이 사이트에 대한 업데이트된 만료 시각을 이제 63072000으로 기록할 것입니다.

= http://innocent.csrfexample.com에 다시 접속했을 때, 이번에는 HSTS를 통해 307 응답 코드로 인해 리디렉션이 발생합니다.

<div class="content-ad"></div>

제가 이해하기 쉽게 HSTS가 어떻게 작동하는지 예시를 통해 설명 드렸으면 좋겠습니다.

II. 애플리케이션 내에서 보안되지 않은 리소스를 로드할 때 https로 리다이렉팅

저는 안전한 https 연결을 통해 실행 중인 Angular 앱이 있습니다. 즉, 웹 서버와의 연결이 TLS/SSL로 암호화되어 있어 대부분의 스니퍼와 중간자 공격으로부터 안전합니다.

이 애플리케이션에 cleartext HTTP를 사용하여 가져온 콘텐츠가 있다면, 이는 혼합 콘텐츠 애플리케이션입니다. 이는 애플리케이션이 부분적으로만 암호화되어 있음을 의미하며, 암호화되지 않은 콘텐츠가 스니퍼와 중간자 공격자에게 노출된 채로 남아 있습니다.

<div class="content-ad"></div>

예시

이 문제와 그 해결책을 설명하기 위해, HTTP 연결을 포트 80에서, HTTPS 연결을 포트 443에서 수신하는 노드 익스프레스 서버를 생성했습니다.

또한, 노드 익스프레스 프로젝트에서 아래와 같은 루트를 생성하여 고양이 이미지를 가져오도록 했습니다.

```js
router.get('/getImage', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'images', 'cat.jpg'));
});
```

<div class="content-ad"></div>

포트 충돌을 피하기 위해 nginx 웹 서버가 안전한 https 연결을 수신하는 포트 5443에서 작동하도록 설정되었습니다. 또한 포트 80에서 연결을 수신하는 서버 블록을 주석 처리하여 Node express 서버와의 충돌을 피했습니다.

docker-compose.yml 파일을 업데이트했습니다.

nginx.config 파일도 업데이트되었습니다.

따라서 이제 https://innocent.csrfexample.com:5443을 통해 앵귤러 애플리케이션에 액세스할 수 있습니다. HSTS가 활성화되어 있기 때문에 http://innocent.csrfexample.com:5443으로의 모든 요청은 https://innocent.csrfexample.com:5443으로 리디렉션됩니다.

<div class="content-ad"></div>

어느 Angular 구성 요소에서, Node 서버에서 이미지를 가져 오기 위해 아래 `img` 태그를 사용하는 경우를 가정해 봅시다. 이미지는 http를 통해 가져 오려고 합니다.

```js
<img src="http://csrfexample.com/getImage">
```

브라우저에서 `http://innocent.csrfexample.com:5443`에 액세스하면, HSTS가 307 응답 코드를 사용하여 `https://innocent.csrfexample.com:5443`로 리디렉션됩니다.

안전하지 않은 요청 `http://csrfexample.com/getImage`가 아래 스크린 샷에서 보이는 것처럼 `https://csrfexample.com/getImage`로 업그레이드되었습니다. 코드 변경 없이 어떻게 이렇게 된 것일까요?

<div class="content-ad"></div>

이미지가 로드된 것을 확인할 수 있지만 콘솔에 Mixed Content 경고 메시지가 표시됩니다. Chrome은 http 요청을 자동으로 https로 업그레이드했습니다. Chrome 79부터는 안전한 연결에서 실행 중인 애플리케이션의 페이지의 모든 리소스에 대한 요청을 http에서 https로 자동으로 업그레이드합니다. Chrome에 대한 자세한 내용은 https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html 확인하세요.

만약 오래된 버전의 Chrome이나 http에서 https로 요청을 자동으로 업그레이드하지 않는 브라우저를 사용 중이라면 어떨까요? 사용자가 어떤 브라우저를 사용하여 애플리케이션을 로드할지는 실제로 제어할 수 없습니다.

이 문제를 해결하기 위해 Content-Security-Policy 헤더를 upgrade-insecure-requests 지시문과 함께 사용할 수 있습니다.

로컬 웹 개발 서버의 경우, angular.json 파일의 "serve" 섹션을 아래와 같이 업데이트하세요.

<div class="content-ad"></div>

```json
{
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "sslKey": "./self-signed-with-no-passphrase/secureAngularExample.key",
      "sslCert": "./self-signed-with-no-passphrase/secureAngularExample.crt",
      "ssl": true
    },
    "configurations": {
      "production": {
        "browserTarget": "csrfInAngular:build:production"
      },
      "development": {
        "browserTarget": "csrfInAngular:build:development",
        "headers": {
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
          "Content-Security-Policy": "upgrade-insecure-requests"
        }
      }
    },
    "defaultConfiguration": "development"
  }
}
```

Nginx 웹서버의 경우, 아래와 같이 nginx.config 파일을 업데이트할 수 있습니다.

이제 브라우저에서 http://innocent.csrfexample.com:5443을 입력하면 HSTS가 307 응답 코드를 사용해 https://innocent.csrfexample.com:5443로 리디렉션되며 이미지는 https를 사용하여 요청되어 "혼합 콘텐츠" 경고 없이 보여집니다.

아래 두 번째 스크린샷에서 응답 헤더를 확인해보세요. "Content-Security-Policy" 헤더에는 "upgrade-insecure-requests" 지시문이 포함되어 있습니다.


<div class="content-ad"></div>

# 스택더믹 🎓

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Differ
- 더 많은 콘텐츠는 Stackademic.com에서 확인하세요.