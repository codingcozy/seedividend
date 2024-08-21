---
title: "Nextjs 13 프로젝트 디버깅 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "디버깅"
link: "undefined"
isUpdated: true
---

# 디버깅

이 문서는 VS Code 디버거나 Chrome DevTools를 사용하여 전체 소스 맵 지원을 통해 Next.js 프론트엔드 및 백엔드 코드를 디버그하는 방법을 설명합니다.

Node.js에 연결할 수 있는 모든 디버거는 Next.js 응용 프로그램을 디버깅하는 데 사용할 수 있습니다. Node.js 디버깅 가이드에서 자세한 내용을 확인할 수 있습니다.

## VS Code를 사용한 디버깅

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

프로젝트 루트에 .vscode/launch.json 파일을 만들어서 아래 내용을 추가해주세요:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

만약 Yarn을 사용하고 있다면 npm run dev 대신 yarn dev로, pnpm을 사용 중이라면 npm run dev 대신 pnpm dev로 변경하실 수 있습니다.

만약 어플리케이션의 포트 번호를 변경하고 있다면 http://localhost:3000의 3000을 사용하는 포트 번호로 변경해주세요.

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

루트 디렉토리가 아닌 다른 디렉토리에서 Next.js를 실행 중이라면(예: Turborepo를 사용하는 경우) 서버 측 및 전체 스택 디버깅 작업에 cwd를 추가해야 합니다. 예를 들어, "cwd": "${workspaceFolder}/apps/web"와 같이 설정하세요.

이제 디버그 패널로 이동하세요 (Windows/Linux에서는 Ctrl+Shift+D, macOS에서는 ⇧+⌘+D), 시작 구성을 선택한 다음 F5를 누르거나 명령 팔레트에서 Debug: Start Debugging을 선택하여 디버깅 세션을 시작하세요.

## Jetbrains WebStorm에서 디버거 사용하기

런타임 구성 목록의 드롭다운 메뉴를 클릭한 다음 Edit Configurations...을 클릭하세요. http://localhost:3000을 URL로 사용하여 Javascript Debug 디버그 구성을 만드세요. 필요에 따라 사용자 정의하세요 (예: 디버깅에 브라우저, 프로젝트 파일로 저장) 그리고 확인을 클릭하세요. 이 디버그 구성을 실행하면 선택한 브라우저가 자동으로 열릴 것입니다. 이 시점에서 NextJS 노드 애플리케이션과 클라이언트/브라우저 애플리케이션 두 개가 디버그 모드로 실행 중임을 확인할 수 있습니다.

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

## Chrome DevTools을 사용한 디버깅

### 클라이언트 측 코드

개발 서버를 보통처럼 실행하려면 next dev, npm run dev 또는 yarn dev를 실행하세요. 서버가 시작되면 크롬에서 http://localhost:3000(또는 대체 URL)을 열어주세요. 그 후에 크롬의 개발자 도구를 열고 (Windows/Linux에서는 Ctrl+Shift+J, macOS에서는 ⌥+⌘+I), Sources 탭으로 이동하세요.

이제 클라이언트 측 코드가 디버거 문을 만나면 코드 실행이 멈추고 해당 파일이 디버그 영역에 나타납니다. 또한 Windows/Linux에서는 Ctrl+P 또는 macOS에서는 ⌘+P를 눌러 파일을 검색하고 수동으로 중단점을 설정할 수도 있습니다. 여기서 검색할 때 유의할 점은 웹팩://\_N_E/./로 시작하는 경로를 가진 소스 파일들이 있습니다.

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

### 서버 측 코드

Chrome DevTools를 사용하여 서버 측 Next.js 코드를 디버깅하려면 기본 Node.js 프로세스에 --inspect 플래그를 전달해야 합니다:

```js
NODE_OPTIONS='--inspect' next dev
```

만약 npm run dev 또는 yarn dev를 사용 중이라면 package.json에서 dev 스크립트를 업데이트해야 합니다:

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

표를 다음과 같은 형식으로 변경해 보세요:

Next.js 개발 서버에 --inspect 플래그를 사용하여 로컬 개발 서버를 시작하면 다음과 같은 메시지가 표시됩니다:

디버거가 ws://127.0.0.1:9229/0cf90313-350d-4466-a748-cd60f4e47c95에서 수신 대기 중입니다.
도움이 필요하면 다음 문서를 참조하세요: https://nodejs.org/en/docs/inspector
준비 완료 - 서버가 0.0.0.0:3000에서 시작되었습니다. URL: http://localhost:3000

> NODE_OPTIONS=`--inspect` npm run dev 또는 NODE_OPTIONS=`--inspect` yarn dev를 사용하지 마세요. 이렇게 하면 동일한 포트에서 여러 개의 디버거를 시작하려고 하므로 npm/yarn 프로세스에 대한 하나, Next.js에 대한 하나가 생성됩니다. 이러한 경우 콘솔에 Address already in use: Starting inspector on 127.0.0.1:9229 failed라는 오류가 표시됩니다.

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

서버가 시작되면 Chrome에서 새 탭을 열고 chrome://inspect를 방문하여 Remote Target 섹션 안에 Next.js 어플리케이션을 확인할 수 있습니다. 어플리케이션 아래에 있는 inspect를 클릭하여 별도의 DevTools 창을 열고 Sources 탭으로 이동하세요.

여기서 서버 측 코드를 디버깅하는 방법은 Chrome DevTools로 클라이언트 측 코드를 디버깅하는 것과 매우 유사합니다. 단, 여기서 파일을 찾을 때 Ctrl+P 또는 ⌘+P로 검색할 때 소스 파일 경로는 webpack://{application-name}/./ (여기서 {application-name}은 package.json 파일에 따라 어플리케이션 이름으로 대체됩니다)로 시작합니다.

### Windows에서의 디버깅

Windows 사용자는 NODE_OPTIONS=`--inspect`를 사용할 때 Windows 플랫폼에서 지원되지 않는 구문 문제에 직면할 수 있습니다. 이를 해결하기 위해 cross-env 패키지를 개발 종속성으로 설치하고(-D with npm 또는 yarn 사용) dev 스크립트를 다음과 같이 바꿉니다.

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
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS='--inspect' next dev"
  }
}
```

cross-env는 Mac, Linux 및 Windows를 포함한 모든 플랫폼에서 NODE_OPTIONS 환경 변수를 설정하고 장치 및 운영 체제 간에 일관된 디버깅을 가능하게 합니다.

> 좋은 정보: Windows Defender가 꺼져 있는지 확인하세요. 이 외부 서비스는 모든 파일 읽기를 확인하며, next dev에서 Fast Refresh 시간을 크게 늘린다고 보고되었습니다. 이는 Next.js와 관련된 문제가 아니지만 Next.js 개발에 영향을 미칩니다.

## 자세한 정보

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

자바스크립트 디버거를 사용하는 방법에 대해 더 알아보려면 다음 문서를 참조해보세요:

- Node.js 디버깅 VS Code: 중단점
- Chrome DevTools: 자바스크립트 디버깅

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
