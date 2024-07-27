---
title: "React 18에서 SSRServer Side Rendering을 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-05-13-HowtoImplementSSRServerSideRenderinginReact18_0.png"
date: 2024-05-13 00:08
ogImage: 
  url: /assets/img/2024-05-13-HowtoImplementSSRServerSideRenderinginReact18_0.png
tag: Tech
originalTitle: "How to Implement SSR(Server Side Rendering) in React 18"
link: "https://medium.com/simform-engineering/how-to-implement-ssr-server-side-rendering-in-react-18-e49bc43e9531"
---


"renderToPipeableStream" 서버 API를 구현하는 방법을 배우세요. 이 API를 사용하면 React 트리를 HTML로 Node.js 스트림에 렌더링할 수 있습니다.

![이미지](/assets/img/2024-05-13-HowtoImplementSSRServerSideRenderinginReact18_0.png)

React 18은 상호작용적 사용자 인터페이스를 구축하기 위한 인기있는 JavaScript 라이브러리의 최신 버전이며, 많은 새로운 기능과 개선 사항을 제공합니다. 특히 서버 측 렌더링(SSR)의 향상된 성능은 주목할 만한 기능입니다.

이 글에서는 React의 SSR 기능을 유용한 코드 샘플과 예시와 함께 살펴보겠습니다. 하지만 먼저 클라이언트 측 렌더링과 서버 측 렌더링의 차이를 알아보겠습니다.



클라이언트 측 렌더링 (CSR)은 웹 페이지를 클라이언트 측에서 렌더링하는 프로세스를 말합니다 (즉, 사용자의 웹 브라우저에서). 서버는 단순히 원시 데이터나 콘텐츠를 제공하며, 클라이언트 측 JavaScript가 이를 활용하여 최종 렌더링된 페이지를 동적으로 구성합니다.

서버 측 렌더링 (SSR)은 서버에서 웹 페이지를 렌더링한 후 해당 페이지를 클라이언트의 웹 브라우저로 보내는 프로세스를 의미합니다. 클라이언트 측에 의존하는 대신 서버가 웹 페이지의 최종 HTML 마크업을 생성하고 이를 클라이언트로 보내는 방식을 사용합니다.

# "renderToPipeableStream" 서버 API 구현하기

단계 1: create-react-app 명령줄 도구를 사용하여 새로운 React 애플리케이션을 만듭니다. 즐겨 사용하는 터미널을 열고 아래 명령어를 입력하세요.



```js
npx create-react-app server-api-demo-app
```

단계 2: 새로 생성된 React 앱으로 이동합니다.

```js
cd server-api-demo-app
```

단계 3: 이제 프로젝트에 라우팅을 처리하기 위해 react-router-dom을 추가해주세요.



```js
npm install react-router-dom
```

4단계: 애플리케이션에 몇 개의 페이지를 추가해 봅시다. app.js에 아래와 같이 추가할 수 있는 샘플 라우트를 추가해보세요:
(i) 홈
(ii) 소개

```js
const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  </div>
);
```

5단계: 두 페이지에 내용을 추가해보세요. 참고를 원하시면, 여기를 클릭하세요.



6단계: 루트 수준에 "server"라는 새 폴더를 만들고, 그 안에 index.js와 server.js라는 새 파일을 만듭니다. 아래 코드를 해당 파일에 복사하여 붙여넣기하세요.

```js
// server/index.js
require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("./server");
```

이 코드 조각은 Babel을 코드 번역을 위해 설정하고, "node_modules"와 같은 특정 파일을 필터링하며, "server" 모듈을 가져와 서버를 실행합니다. 이 설정은 React 서버 측 렌더링에서 일반적으로 사용되며, 서버가 React 구성 요소를 처리하고 클라이언트에 제공할 수 있도록 합니다.

```js
// server/server.js
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const app = express();

app.get("/*", (req, res) => {
  const entryPoint = ["/main.js"];

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: entryPoint,
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
```



위 코드는 app.get("/*", ...)을 사용하여 모든 경로에 대한 라우트 핸들러를 정의합니다. 이는 서버로 들어오는 모든 요청을 처리하는 라우트 핸들러를 의미합니다. 라우트 핸들러 내부에서:

- entryPoint 배열은 main.js 값을 가지고 정의됩니다. 이는 클라이언트 측 코드를 부트스트랩하는 데 사용되는 JavaScript 파일을 가리킵니다.
- ReactDOMServer.renderToPipeableStream()은 HTML 렌더링을 위한 React 노드와 스트리밍 옵션을 포함하는 선택적 옵션 객체 두 가지 인수를 받습니다. 이는 두 가지 메소드를 반환하는데, pipe와 abort입니다. pipe 메소드는 HTML을 지정된 Node.js 스트림으로 출력합니다. 우리는 onShellReady에서 스트리밍을 가능하게 하기 위해 pipe를 사용합니다. 정적 생성 및 크롤러를 위해 onAllReady도 사용할 수 있습니다.
- onShellReady()는 렌더링 프로세스가 완료되고 HTML이 클라이언트 전송을 위해 준비된 경우 트리거됩니다. 이는 응답 상태 코드를 200으로 설정하고, 내용 유형 헤더를 text/html로 정의하며, 렌더링된 HTML을 응답에 pipe 메소드를 사용하여 보냅니다.
- onShellError() 콜백은 렌더링 중 오류가 발생할 때 트리거됩니다. 이는 응답 상태 코드를 500으로 설정하고, HTML `p` 태그로 감싼 기본 오류 메시지를 전송합니다.

7. 클라이언트 측에서는 index.js 파일에서 ReactDOM.createRoot를 ReactDOM.hydrateRoot로 업데이트해야 서버에서 생성된 HTML을 인터랙티브하게 만들 수 있습니다.

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```



8. 서버 측에서 코드를 실행하려면 package.json 파일에 아래 스크립트를 추가하세요.

```js
"ssr": "npm run build && node server/index.js"  
```

이 명령은 프로젝트를 빌드하고 서버 측에서 코드를 실행하여 localhost:3002에 출력물을 생성합니다.

9. 이제 npm run ssr 명령을 실행하여 출력물을 확인하세요.



![이미지](/assets/img/2024-05-13-HowtoImplementSSRServerSideRenderinginReact18_1.png)

여기에서는 "renderToPipeableStream" API만 소개했습니다. React는 "renderToNodeStream", "renderToReadableStream", "renderToStaticMarkup", "renderToStaticNodeStream" 및 "renderToStream"과 같은 다른 API도 제공하여 요구사항에 맞는 서버 측 렌더링을 지원합니다.

이러한 API에 대한 자세한 정보는 공식 문서를 참조해주시기 바랍니다.

# 결론



새로운 서버 API로 React 컴포넌트를 서버 렌더링된 HTML로 렌더링할 수 있습니다. Node.js 스트림이나 웹 스트림으로 가능합니다.

대부분의 경우에는 Next.js, Remix, Gatsby와 같은 프레임워크가 이 프로세스를 자동으로 처리합니다. 이 API는 앱의 최상위 수준에서 서버 렌더링된 HTML을 빌드하는 데만 사용됩니다. 초기 로드 시간, SEO, 사용자 경험 및 크로스사이트 스크립팅(XSS) 공격에 대한 취약성을 감소시킬 것입니다.

그러나 SSR은 이점을 제공하면서도 복잡한 구현, 증가한 서버 부하로 인한 상당량의 처리 및 메모리 소비와 같은 단점도 가지고 있습니다. 또한 채팅 앱 및 멀티플레이어 게임과 같은 실시간 애플리케이션에는 적합하지 않을 수 있습니다.

따라서 요구 사항을 고려하고 SSR 구현이 해당 요구 사항과 일치하는지 확인해 주세요.