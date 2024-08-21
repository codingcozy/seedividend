---
title: "API 버전 관리 이해하기 왜 중요한 것인지"
description: ""
coverImage: "/assets/img/2024-06-20-UnderstandingAPIVersioningWhyItsImportant_0.png"
date: 2024-06-20 04:28
ogImage:
  url: /assets/img/2024-06-20-UnderstandingAPIVersioningWhyItsImportant_0.png
tag: Tech
originalTitle: "Understanding API Versioning: Why It’s Important"
link: "https://medium.com/web-tech-journals/understanding-api-versioning-why-its-important-9ed7e924000b"
isUpdated: true
---

API(응용 프로그램 프로그래밍 인터페이스)는 현대 소프트웨어 개발의 중추로, 다른 시스템이 통신하고 데이터를 교환할 수 있게 합니다.

소프트웨어가 발전함에 따라 API에 대한 변경은 불가피합니다. 이러한 변경은 새로운 기능을 도입하거나 성능을 개선하거나 버그를 수정할 수 있습니다.

하지만, API의 변경은 API의 이전 버전에 의존하는 사용자들에게 기존 기능을 망가뜨릴 수도 있습니다. 이 때 API 버전 관리가 필요합니다.

이 글에서는 API 버전 관리가 무엇인지, 왜 중요한지, 언제 사용해야 하는지, 그리고 Node.js를 사용한 실용적인 예제에 대해 탐구해 보겠습니다.

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

# API 버전 관리란 무엇인가요?

API 버전 관리는 API의 변경 사항을 관리하기 위해 API의 다른 상태에 다른 버전을 할당하는 것을 말합니다.

![image](/assets/img/2024-06-20-UnderstandingAPIVersioningWhyItsImportant_0.png)

이를 통해 개발자는 특정 API 버전에 의존하는 기존 사용자를 방해하지 않고 업데이트와 개선 사항을 적용할 수 있습니다.

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

# API 버전 관리의 중요성

다음은 API 버전 관리의 중요성을 강조하는 요점입니다.

- 역호환성: API 버전 관리는 API의 변경 사항이 기존 응용 프로그램을 손상시키지 않도록 보장합니다. 클라이언트는 의존하는 버전을 계속 사용할 수 있으며, 동시에 새로운 클라이언트는 최신 기능을 활용할 수 있습니다.
- 부드러운 전환: 이는 한 버전에서 다른 버전으로의 부드러운 전환을 허용하며, 개발자들이 코드를 새 버전과 호환되도록 업데이트하는 데 충분한 시간을 제공합니다.
- 유지보수 향상: 버전 관리는 코드베이스를 유지하고 조직화하는 데 도움이 되어 API의 다양한 반복본을 관리하기가 쉬워집니다.
- 명확한 의사 소통: 사용자들에게 그들이 사용 중인 버전과 향후 버전에서 기대할 수 있는 변경 사항에 대해 명확히 전달합니다.

# API 버전 관리의 사용 시기

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

다음은 API 버전 관련 시기를 강조한 내용입니다.

- 중단 변경사항: 엔드포인트를 제거하거나 응답 형식을 변경하거나 기존 엔드포인트의 동작을 변경하는 등과 같이 하위 호환성이 없는 변경 사항을 도입할 때.
- 중요한 업데이트: 중요한 업데이트로, 상당한 새 기능을 추가하거나 기존 기능을 크게 변경하는 경우.
- 사용 중단: 더 오래된 기능을 단계적으로 폐기할 계획이지만 이전 기능에 대한 지원을 제공해야 할 때.

# API 버전 관리에 사용하지 말아야 할 때

다음은 API 버전 관리를 사용하지 말아야 하는 경우를 강조한 내용입니다.

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

<img src="/assets/img/2024-06-20-UnderstandingAPIVersioningWhyItsImportant_1.png" />

- 작은 변경 사항: 작은, 하위 호환성 업데이트에는 새 엔드포인트 추가, 기존 엔드포인트에 비파괴적인 변경, 또는 버그 수정이 포함됩니다.
- 내부 API: 조직 내부에서 사용되는 API로, 모든 클라이언트를 제어하고 API 변경 사항과 동시에 업데이트되도록 보장할 수 있는 경우입니다.

# 다른 버전의 API로 클라이언트 요청

<img src="/assets/img/2024-06-20-UnderstandingAPIVersioningWhyItsImportant_2.png" />

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

- 클라이언트 요청: 클라이언트는 API에 요청을 보냅니다.
- API 게이트웨이: API 게이트웨이는 이러한 요청을 받아들이고 요청 URL 또는 헤더에 지정된 버전에 따라 적절한 API 버전으로 라우팅합니다.
- API 버전: API 게이트웨이는 요청을 적절한 API 버전(e.g., v1, v2 또는 v3)으로 전달합니다.
- 응답: API는 요청을 처리하고 응답을 API 게이트웨이에 다시 보내며, 이후 게이트웨이가 클라이언트에게 전달합니다.

# API 게이트웨이를 통한 API 버전 관리 구현

위의 흐름을 설명하기 위해 URL을 기반으로 서로 다른 API 버전으로 요청을 라우팅하는 간단한 Node.js API 게이트웨이를 생성할 수 있습니다.

## 단계 1: 프로젝트 설정하기

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

우선 새로운 Node.js 프로젝트를 만들고 Express를 설치하세요.

```bash
mkdir api-gateway-example
cd api-gateway-example
npm init -y
npm install express
```

## 단계 2: 서버 및 API 게이트웨이 생성

gateway.js라는 파일을 만들고 API 게이트웨이로 작동하는 기본 Express 서버를 설정하세요.

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

```javascript
const express = require("express");
const app = express();
const port = 3000;

// API v1 route
app.use("/api/v1", (req, res, next) => {
  // Forward the request to the API v1 server
  // Assuming the API v1 server is running on port 3001
  const proxy = require("http-proxy").createProxyServer();
  proxy.web(req, res, { target: "http://localhost:3001" });
});

// API v2 route
app.use("/api/v2", (req, res, next) => {
  // Forward the request to the API v2 server
  // Assuming the API v2 server is running on port 3002
  const proxy = require("http-proxy").createProxyServer();
  proxy.web(req, res, { target: "http://localhost:3002" });
});

app.listen(port, () => {
  console.log(`API Gateway is now running at http://localhost:${port}/`);
});
```

## Step 3: API Version Creation

Create separate API servers for v1 and v2.

Step 3.1: API v1 (port 3001):

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
// api-v1.js
const express = require("express");
const app = express();
const port = 3001;

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
});

app.listen(port, () => {
  console.log(`API v1 running at http://localhost:${port}/`);
});
```

단계 3.2: API v2 (포트 3002):

```js
// api-v2.js
const express = require("express");
const app = express();
const port = 3002;

app.get("/users", (req, res) => {
  res.json([
    { userId: 1, fullName: "John Doe" },
    { userId: 2, fullName: "Jane Smith" },
    { userId: 3, fullName: "Jim Beam" },
  ]);
});

app.listen(port, () => {
  console.log(`API v2 running at http://localhost:${port}/`);
});
```

## 단계 4: 서버 실행하기

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

API 게이트웨이와 두 개의 API 버전을 시작하세요:

```js
node gateway.js
node api-v1.js
node api-v2.js
```

## 단계 5: 설정 테스트

다른 버전에 요청을 보내어 API 게이트웨이를 테스트하세요.

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

curl http://localhost:3000/api/v1/users
curl http://localhost:3000/api/v2/users

API 게이트웨이 및 버전별 API를 Node.js에서 구현하여 클라이언트 요청을 적절한 API 버전으로 라우팅하고 관리할 수 있습니다.

이 설정은 하위 호환성을 보장하고 API의 다른 버전 간에 원확한 전환을 가능하게 합니다.

# 결론

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

API 버전 관리는 API 설계 및 개발의 중요한 측면이며, 기존 기능을 손상시키지 않고 변경 사항을 도입할 수 있도록 개발자들을 가능하게 합니다.

API의 다양한 버전을 신중하게 관리함으로써 사용자들에게 원활한 전환을 보장하고 역호환성을 유지할 수 있습니다.

제 글을 끝까지 읽어주셔서 진심으로 감사드립니다!

도움이 되었거나 흥미로웠다면 박수 버튼을 클릭하여 응원해주시겠어요? 🎉

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

![image](https://miro.medium.com/v2/resize:fit:1400/0*4KabDY9ZImT3QdwF.gif)

And hey, don’t miss out on more insightful content — hit that follow button to stay updated!

Get email alerts for my latest Medium posts! Click here.

Let’s learn and grow together. Happy Coding! 👏
