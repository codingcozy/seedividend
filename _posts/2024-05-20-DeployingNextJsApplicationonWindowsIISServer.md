---
title: "윈도우 IIS 서버에 NextJs 애플리케이션을 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-DeployingNextJsApplicationonWindowsIISServer_0.png"
date: 2024-05-20 22:10
ogImage:
  url: /assets/img/2024-05-20-DeployingNextJsApplicationonWindowsIISServer_0.png
tag: Tech
originalTitle: "Deploying NextJs Application on Window’s IIS Server"
link: "https://medium.com/@patrick.jakobsen/deploying-nextjs-application-on-windows-iis-server-60793f416eb1"
isUpdated: true
---

![Deploying Next.js Application on Windows IIS Server](/assets/img/2024-05-20-DeployingNextJsApplicationonWindowsIISServer_0.png)

NextJS는 단일 페이지 애플리케이션을 만들기 위한 서버 측 렌더링된 React 기반 프레임워크입니다. 서버 측 렌더링 기능으로 인해 매우 인기가 높습니다. NextJS를 사용하여 다음 애플리케이션을 작성하는 것은 매우 간단합니다. NextJS를 사용하기 위해 명시적으로 구성할 필요가 없습니다. npm run dev를 실행하고 애플리케이션을 구축하기 시작하면 됩니다.

# 서버 측 렌더링이란?

서버 측 렌더링(SSR)은 프런트엔드 프레임워크가 웹페이지를 준비하기 위해 사용자별 데이터를 서버 측에서 가져와 사용자 화면으로 보내는 능력입니다. 사용자에게 표시하기 위해 클라이언트 측에서 웹페이지를 준비하는 대신에 서버 측에서 웹페이지를 준비합니다.

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

NextJS에서는 서버에서 페이지를 렌더링하거나 일반적인 create-react-app SPA처럼 클라이언트 측에서 렌더링할 수 있는 옵션이 있습니다.

서버 측 렌더링의 장점은 분명히 있습니다. 그래서 NextJS 프레임워크가 인기를 얻은 이유이기도 합니다. SSR 덕분에 초기 페이지 로딩이 빨라져 최종 사용자에게 더 나은 상호작용을 제공합니다. 또한 검색 엔진이 사이트를 크롤링하여 더 나은 검색 엔진 최적화를 제공하는데 도움이 됩니다.

# 만약 NextJS가 프론트엔드 프레임워크라면, 이 프레임워크는 어떻게 서버에서 웹 페이지를 준비하는 것일까요?

NextJS 프레임워크는 NodeJS 기반으로 만들어졌습니다. 아시다시피, NodeJS는 서버 측에서 페이지를 준비하기 위해 사용되는 NextJS 애플리케이션에 강력함을 제공하는 백엔드 JavaScript 런타임 환경입니다.

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

# NextJS 애플리케이션 배포하기

Windows IIS에서 Next.js 애플리케이션을 호스팅하는 방법을 여러 곳에서 찾아보았어요. 괜찮은 튜토리얼을 몇 개 찾았지만 제 문제를 해결해 주지는 못했어요. Vercel과 Netlify, Heroku 등과 같은 유사한 플랫폼에 호스팅하는 것이 이상적일 것 같아요. 하지만 제 애플리케이션을 로컬에서 호스팅하고 싶어요. 왜냐하면 내 애플리케이션에 대중이 접근하는 것을 원하지 않기 때문이에요. 그건 제 개인적인 용도로 사용할 거거든요. 그래서 여러분이 구글에서 시간을 낭비하지 않고 필요한 정보를 찾을 수 있도록, 간단한 가이드를 제공해 드리겠어요.

하지만 그 전에, 사용하려는 것에 대해 간단히 설명해볼게요.

저희는 iisnode을 사용하려고 해요. iisnode은 C++로 작성된 오픈 소스 네이티브 IIS 모듈로, Node.js를 Windows IIS 내에서 실행할 수 있게 해줘요. 저희는 IIS 서버 배포 방식으로 Node.js를 사용할 거에요. 그러려면 Server.js와 web.config 두 파일이 필요하답니다.

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

지금 application의 진입점인 server.js를 만들어보겠습니다:

```js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 3000; // 포트를 IIS가 실행 중인 포트로 변경하세요. 기본값은 80이고 개발 중이면 3000입니다.
const hostname = "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, async () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
});
```

웹 구성 파일인 web.config은 IIS 및 ASP.NET Core Module이 응용 프로그램을 구성하는 데 사용하는 파일입니다. 그래서 여기에 우리의 web.config 파일이 있습니다:

```js
<?xml version="1.0" encoding="utf-8"?>
<!--
     이 구성 파일은 iisnode를 사용하여 IIS 또는 IIS Express에서 노드 프로세스를 실행하는 경우 필요합니다.
     자세한 내용은 다음을 참조하십시오:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->

<configuration>
  <system.webServer>
    <!-- WebSocket 지원에 대한 자세한 정보는 http://blogs.msdn.com/b/windowsazure/archive/2013/11/14/introduction-to-websockets-on-windows-azure-web-sites.aspx에서 확인할 수 있습니다 -->
    <webSocket enabled="false" />
    <handlers>
      <!-- server.js 파일이 iisnode 모듈에 의해 처리되는 node.js 사이트임을 나타냄 -->
      <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <!-- node-inspector 디버깅을 위한 요청 방해하지 않음 -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>

        <!-- 먼저 /public 폴더의 물리적 파일과 일치하는 들어오는 URL을 고려 -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- 모든 다른 URL은 node.js 사이트 진입점으로 매핑됨 -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>

    <!-- 'bin' 디렉토리는 node.js에서 특별한 의미가 없으며, 앱을 그 안에 배치할 수 있음 -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules"/>
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- 오류 응답을 변경하지 않도록 함 -->
    <httpErrors existingResponse="PassThrough" />
    <iisnode node_env="production"/>

    <!--
      다음 옵션을 사용하여 IIS 내에서 Node를 호스트하는 방법을 제어할 수 있습니다:
        * watchedFiles: 변경 사항을 감지하여 서버를 다시 시작할 파일 목록
        * node_env: NODE_ENV 환경 변수로 전달될 값
        * debuggingEnabled - 기본 디버거가 활성화되는지 여부

      모든 옵션 목록은 https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config에서 확인 가능합니다
    -->
    <!--<iisnode watchedFiles="web.config;*.js"/>-->
  </system.webServer>
</configuration>
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

웹 구성 파일을 추가한 후에는 package.json을 약간 변경해야 합니다. npm run start가 서버를 시작하도록 설정되어야 하며 next start를 사용하지 않아야 합니다. 다음은 package.json 스크립트가 보이는 방식입니다:

```js
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "node server.js",
    "lint": "next lint"
  },
```

server.js를 추가하고 web.config를 추가한 후 npm run build를 실행하면 애플리케이션의 루트 폴더가 다음과 같이 보입니다.

![애플리케이션 루트 폴더](/assets/img/2024-05-20-DeployingNextJsApplicationonWindowsIISServer_1.png)

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

# IIS에서 NextJS 애플리케이션을 배포하는 방법

배포를 설정하기 전에 IISNode와 URLRewrite를 설치해야 합니다. 그 후, IIS에 새 웹 사이트를 생성하고 물리적 경로를 .next, node_modules, server.js 및 web.config가 포함된 폴더로 지정하세요. 권한 문제나 다른 가능한 문제를 피하려면 해당 폴더를 Windows Server의 루트 사용자 폴더 안에 배치하세요.

IIS에서 웹 서버를 시작하면 자동으로 iisnode이라는 새 폴더가 생성됩니다.

만약 배포 폴더가 C:/ 드라이브의 wwwroot에 있다면 전체 폴더에 대해 IIS_Users에게 읽기/쓰기 권한을 명시적으로 부여해야 할 수 있습니다. 다른 예상치 못한 오류가 발생하는 경우, 댓글을 남기거나 내 Discord @pallepadehat을 추가해주세요. 도와드릴게요!

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

이 Github Repo에서 소스 코드를 확인할 수 있어요.
