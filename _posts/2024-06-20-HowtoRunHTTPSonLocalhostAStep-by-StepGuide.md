---
title: "로컬호스트에서 HTTPS를 실행하는 방법 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoRunHTTPSonLocalhostAStep-by-StepGuide_0.png"
date: 2024-06-20 07:36
ogImage:
  url: /assets/img/2024-06-20-HowtoRunHTTPSonLocalhostAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "How to Run HTTPS on Localhost: A Step-by-Step Guide"
link: "https://medium.com/@akshitb/how-to-run-https-on-localhost-a-step-by-step-guide-c61fde893771"
isUpdated: true
---

로컬호스트에서 HTTPS를 실행하는 것은 안전한 웹 애플리케이션을 개발하고 테스트하는 데 필수적입니다.
보안 소켓 계층(SSL) 또는 전송 계층 보안(TLS)은 인터넷을 통해 안전한 통신을 제공하는 방법을 제공합니다. 로컬호스트에서 HTTPS 서버를 실행하면 제품 서버에 배포될 때 웹 애플리케이션이 작동할 안전한 환경을 시뮬레이션할 수 있습니다.

![이미지](/assets/img/2024-06-20-HowtoRunHTTPSonLocalhostAStep-by-StepGuide_0.png)

이 안내서에서는 자체 서명된 인증서 및 Node.js 서버를 사용하여 로컬 머신에서 HTTPS를 설정하는 과정을 안내하겠습니다.

# 준비 사항

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

시작하기 전에 다음 사전 요구 사항을 준비해 주세요:

- Node.js 및 npm: 시스템에 Node.js 및 npm이 설치되어 있는지 확인하세요. 이것들은 nodejs.org에서 다운로드할 수 있습니다.
- HTTPS의 기본 지식

# 단계 1: 자체 서명 루트 인증서 생성

첫 번째 단계는 자체 서명 루트 인증서를 생성하는 것입니다. 해당 인증서를 컴퓨터에 설치하고 서버에서 사용할 다른 인증서를 서명할 것입니다. 루트 인증서를 설치하면 해당 루트 인증서로 서명된 다른 인증서를 신뢰하는 것을 의미합니다.

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

- 터미널이나 명령 프롬프트를 열고 인증서를 저장할 디렉토리로 이동하세요.
- 다음 명령을 실행하여 루트 인증서용 개인 키를 생성하세요:

```js
openssl genrsa -out root.key 2048
```

3. 이제 해당 개인 키를 사용하여 자체 서명된 루트 인증서를 생성하세요:

```js
openssl req -x509 -new -nodes -key root.key -sha256 -days 365 -out root.crt
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

4. macOS를 사용 중이라면, root.crt 파일을 두 번 클릭하여 시스템의 신뢰할 수 있는 인증서에 루트 인증서를 추가할 수 있습니다. Keychain Access 애플리케이션이 열릴 것입니다. "System" 키체인을 선택한 후, "추가"를 클릭하여 root.crt 파일을 찾아 선택하고 다시 "추가"를 클릭합니다. 인증서가 신뢰할 수 있는 것으로 표시되었는지 확인해주세요.

이러한 단계를 거친 후, 우리는 자체 서명 루트 인증서를 만들어 신뢰할 수 있는 저장소에 추가했습니다.

# 단계 2: 서버 인증서 생성

다음으로, 로컬호스트를 위한 서버 인증서를 만들 것입니다. 이 인증서를 사용하면 로컬 서버가 안전한 연결을 설정할 수 있습니다. 서버의 인증서를 루트 인증서로 서명하여 컴퓨터가 서버의 신뢰성을 보장할 수 있도록 할 것입니다.

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

- 서버용 개인 키 생성:

```js
openssl genrsa -out server.key 2048
```

2. 서버용 개인 키를 사용하여 인증서 서명 요청 (CSR) 생성:

```js
openssl req -new -key server.key -out server.csr
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

3. 이 명령은 공통 이름 (CN) 및 조직 세부 정보와 같은 CSR에 대한 일부 정보를 제공하도록 요구합니다. 공통 이름을 서버와 연결된 호스트명 또는 도메인 이름 (예: localhost)으로 설정해야 합니다.

4. 루트 인증서로 CSR에 서명하여 서버 인증서를 만듭니다:

```js
openssl x509 -req -in server.csr -CA root.crt -CAkey root.key -CAcreateserial -out server.crt -days 365 -sha256
```

5. 이 명령은 루트 인증서와 개인 키를 사용하여 CSR에 서명하고, 365일 동안 유효한 새로운 서버 인증서인 server.crt를 생성합니다.

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

이러한 단계를 거치면 서버에서 사용할 인증서를 만들고 PC가 신뢰하는 인증서로 설정합니다.

# 단계 3: Node.js 서버 생성

이제 서버 인증서를 준비했으니, HTTPS로 콘텐츠를 제공하기 위한 간단한 Node.js 서버를 만들어봅시다. 이 예시에선 Node.js와 Express 프레임워크를 사용하지만, 다른 언어와 프레임워크에 이 단계를 적용할 수도 있습니다.

- server.js 라는 파일을 생성하고 다음 코드를 추가하세요:

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
// server.js
const app = require("express")();
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("~/certs/practice/server.key"), // 귀하의 키 경로로 대체하세요
  cert: fs.readFileSync("~/certs/practice/server.crt"), // 귀하의 인증서 경로로 대체하세요
};

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello, HTTPS World!");
  })
  .listen(443, () => {
    console.log("서버가 443 포트에서 실행 중입니다");
  });
node;
```

2. 파일을 저장한 후 터미널에서 아래 명령어를 실행하여 서버를 시작하세요:

```js
node server.js
```

3. HTTPS 서버가 443 포트에서 실행 중이며, https://localhost 에서 액세스할 수 있습니다

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

# 단계 4: 루트 인증서 신뢰 (macOS 전용)

만약 macOS를 사용 중이라면, 루트 인증서를 신뢰하기 위해 다음 추가 단계를 따라주세요:

- Keychain Access 애플리케이션을 엽니다.
- 왼쪽 사이드바에서 "시스템" 키체인을 선택합니다.
- "파일"을 클릭한 후 "항목 가져오기"를 선택하고 root.crt 파일을 선택합니다.
- 가져온 인증서를 더블 클릭하고 "신뢰" 섹션을 확장한 후 "이 인증서 사용 시"를 "항상 신뢰함"으로 설정합니다.

# 단계 5: 최종 스크립트 (옵션)

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

인증서 생성 및 서버 설정을 자동화하려면 다음 스크립트를 사용할 수 있어요:

```js
echo "루트 서버 생성 중"
openssl genrsa -out root.key 2048
openssl req -x509 -new -nodes -key root.key -sha256 -days 365 -out root.crt

echo "서버 인증서 생성 중"
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -CA root.crt -CAkey root.key -CAcreateserial -out server.crt -days 365 -sha256

echo "서버 파일 생성 중"
touch server.js
echo "
// server.js
const app = require('express')();
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('/Users/akshitdev/certs/practice/server.key'),
    cert: fs.readFileSync('/Users/akshitdev/certs/practice/server.crt'),
}

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS World!');
}).listen(443, () => {
  console.log('서버가 포트 443에서 실행 중입니다');
});
" >> server.js

echo "서버를 루트에 추가 중"
sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" <인증서_파일_경로>

echo "서버 실행 중"
node server.js
```

이 스크립트를 사용하면 인증서 생성 및 서버 설정 과정을 자동화할 수 있어요.

끝났어요! 셀프 사이닝된 인증서를 사용하여 로컬호스트에서 HTTPS를 성공적으로 구성했어요.
