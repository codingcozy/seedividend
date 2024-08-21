---
title: "Vercel에 Nodejs 백엔드를 배포하는 방법 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoDeployYourNodejsBackendonVercelAStep-by-StepGuide_0.png"
date: 2024-06-20 04:36
ogImage:
  url: /assets/img/2024-06-20-HowtoDeployYourNodejsBackendonVercelAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "How to Deploy Your Node.js Backend on Vercel: A Step-by-Step Guide"
link: "https://medium.com/@kanakkholwal/how-to-deploy-your-node-js-backend-on-vercel-a-step-by-step-guide-21796db74601"
isUpdated: true
---

<img src="/assets/img/2024-06-20-HowtoDeployYourNodejsBackendonVercelAStep-by-StepGuide_0.png" />

Vercel에 Node.js 백엔드를 배포하는 것은 업무를 간편화하면서 애플리케이션을 웹상에서 작동시킬 수 있는 프로세스입니다. 이 수정된 가이드에서는 가장 최신 방법을 사용하여 백엔드를 배포하는 방법을 안내해 드리겠습니다. 시작해 봅시다.

# 1. Vercel 계정 생성

먼저, vercel.com에서 Vercel 계정을 만들어주세요. GitHub, GitLab 또는 Bitbucket 중 선호하는 인증 방법을 선택할 수 있습니다.

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

# 2. 간단한 Express API 만들기

로컬 머신에 Node.js와 NPM이 설치되어 있는지 확인해주세요. 만약 없다면, https://nodejs.org/ 에서 다운로드할 수 있습니다.

먼저, 새로운 프로젝트용 디렉토리를 만들고 해당 디렉토리로 이동한 후, 새로운 Node.js 프로젝트를 초기화하세요:

```js
mkdir my-express-api
cd my-express-api
npm init -y
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

Express를 설치하고 index.js 파일을 만드세요:

```js
npm install express touch index.js
```

선호하는 코드 편집기에서 index.js를 열고 기본 Express API를 만들기 위한 다음 코드를 추가하세요:

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
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

# 3. Express API 내보내기

원하는 위치에 있는 index.js 파일을 수정하여 Express 앱을 내보냅니다:

```js
// ... (이전 코드) module.exports = app; // Express 앱 내보내기
```

프로젝트 디렉토리에 vercel.json 파일을 생성하세요.

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
touch vercel.json
```

vercel.json 파일 내용:

```js
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

# 5. Express API 배포하기

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

깃 레포지토리를 초기화하고 코드를 커밋한 후에 해당 코드를 소스 레포지토리에 푸시하세요. 이 레포지토리는 GitHub, GitLab 또는 다른 플랫폼에 있을 수 있습니다.

배포가 완료되면 제공된 Vercel URL에서 API에 액세스하여 서비스가 제대로 작동하는지 확인해보세요. 예를 들면 your-app-name.vercel.app와 같이 접속할 수 있습니다.

축하합니다! 이제 Node.js 백엔드가 서버리스 함수로 성공적으로 Vercel에 배포되었습니다. 프로젝트 구조와 요구사항에 맞게 가이드를 수정하여 원활한 배포 경험을 만들어보세요.

원문은 https://kkupgrader.eu.org에서 확인할 수 있습니다.
