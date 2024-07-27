---
title: "렌더링 전략 모든 React 개발자가 알아야 할 것들"
description: ""
coverImage: "/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_0.png"
date: 2024-06-19 23:51
ogImage: 
  url: /assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_0.png
tag: Tech
originalTitle: "Rendering Strategies: Every React Developer Should Know"
link: "https://medium.com/@oguzkilic/rendering-strategies-every-react-developer-should-know-2f9e8ed04b93"
---



![Image](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_0.png)

## 소개:

React는 현대 웹 개발의 핵심입니다. 최대한 효과적으로 활용하려면 복잡한 렌더링 전략을 이해하고 사용해야 합니다. 이 글에서는 이러한 전략을 보여드릴 것입니다.

이러한 전략은 React 개발자가 더 빠르고 효율적인 앱을 만들 수 있도록 돕습니다. 개발을 쉽게 만들어주고 사용자에게 더 나은 경험을 제공합니다. 얼마나 많은 경험이 있든, 이러한 전략들은 여러분을 도와줄 수 있습니다.


<div class="content-ad"></div>

## 렌더링 방법 이해하기

React의 렌더링 프로세스는 UI를 효율적으로 업데이트하는 방법입니다. 두 가지 주요 단계가 있습니다: 렌더 및 커밋.

![이미지](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_1.png)

렌더 단계

<div class="content-ad"></div>

렌더 단계는 React가 가상 UI를 구축하는 렌더링의 첫 부분입니다. 이 단계에는 DOM 변경이나 데이터 가져오기와 같은 부작용이 없습니다. 이 단계에는 두 가지 주요 단계가 있습니다:

- 가상 DOM 생성: 컴포넌트의 상태나 props가 변경될 때 React는 새 가상 DOM 트리를 생성합니다.
- 차이 비교: React는 새 가상 DOM 트리와 현재 피버 트리를 비교(se)합니다. 이 프로세스에서는 새 가상 DOM이 이전 것과 비교했을 때 무엇이 변경되었는지를 결정합니다.
- 작업 단위: 피버 노드(Fiber nodes)는 작업 단위를 나타냅니다. 각 피버 노드는 React 엘리먼트(컴포넌트 또는 DOM 엘리먼트)에 해당하며, 컴포넌트의 상태, props 및 기타 메타데이터 정보를 포함합니다.

커밋 단계

이 단계에서는 렌더 단계 중에 플래그 처리된 변경 사항을 사용자에게 최신 UI 상태를 표시하기 위해 실제 DOM에 적용합니다.

<div class="content-ad"></div>

- DOM 변경 이전 단계: DOM 변경 이전에 실행해야 하는 부작용들이 여기서 처리됩니다.
- DOM 변경 단계: Fiber 트리에서 식별된 변경 사항에 따라 실제 DOM 업데이트가 적용됩니다.
- 레이아웃 단계: DOM 변경 이후에 실행해야 하는 부작용들이 이 단계에서 처리됩니다.

커밋 단계는 동기적으로 이루어지며 직접적인 DOM 조작을 포함하며 이로 인해 부작용이 발생할 수 있습니다.

주요 개념:

- Fiber 아키텍처: React의 Fiber 아키텍처는 조각 단위로 렌더링할 수 있게 합니다. 이는 React를 더 효율적으로 만들어주며 메인 스레드를 차단하지 않고 대규모 업데이트를 처리할 수 있습니다.
- 동시 모드: React 18에서 동시 모드가 도입되어 React가 동시에 여러 작업을 처리할 수 있습니다. 이로써 사용자 경험을 더 부드럽게 만들어주며 중요하지 않은 작업을 일시 중단하고 긴급한 업데이트에 집중할 수 있습니다.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

아래는 Markdown 형식으로 테이블 태그가 변경되었습니다.


![이미지](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_2.png)

주요 포인트:

1. 동적 콘텐츠 로딩: CSR은 전체 페이지 새로고침 없이 동적으로 콘텐츠를 로드할 수 있습니다.

2. 향상된 사용자 상호작용: 렌더링이 클라이언트 측에서 발생하기 때문에 상호작용이 더 반응적일 수 있습니다.


<div class="content-ad"></div>

3. SEO 도전: 검색 엔진은 JavaScript에 크게 의존하는 CSR 콘텐츠를 색인화하는 데 어려움을 겪을 수 있습니다.

4. 초기로딩 시간: CSR은 브라우저가 콘텐츠를 렌더링하기 전에 JavaScript를 다운로드하고 실행해야 하므로 초기 로딩 시간이 느려질 수 있습니다.

예시:

```js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<div class="content-ad"></div>

이 예시에서:

- useEffect 훅은 컴포넌트가 마운트될 때 API에서 데이터를 가져옵니다.
- 상태(data)가 가져온 데이터로 업데이트되고, 컴포넌트가 다시 렌더링되어 그것을 보여줍니다.
- 데이터가 가져와질 때까지 초기 콘텐츠로 표시되는 것은 로딩 메시지입니다.

장점:

- 상호 작용 요소로 풍부한 사용자 경험.
- 단일 페이지 애플리케이션(SPAs)을 위한 효율적인 데이터 가져오기 및 렌더링.

<div class="content-ad"></div>

단점:

- 첫 페이지가 로딩하는 데 시간이 걸립니다.
- 서버 측 렌더링 또는 사전 렌더링 없이 SEO를 하는 것이 어렵습니다.

## 서버 측 렌더링

서버 측 렌더링(SSR)은 서버가 페이지의 HTML을 생성하고 클라이언트에게 보내는 기술입니다. 이 접근 방식은 서버에서 완전히 렌더링된 페이지를 직접 제공함으로써 웹 앱의 성능과 SEO를 개선합니다.

<div class="content-ad"></div>

아래는 테이블 태그를 Markdown 형식으로 변경하신 것입니다.

Key Points:

1. 향상된 SEO: 컨텐츠가 서버에서 완전히 렌더링되므로 검색 엔진이 페이지를 쉽게 크롤링하고 색인화할 수 있습니다.

2. 초기 로드 속도 향상: 사용자들은 첫 요청 시 완전히 렌더링된 페이지를 받아들이므로 CSR에 비해 초기 로드가 더 빠를 수 있습니다.

<div class="content-ad"></div>

3. Dynamic Content: SSR는 동적 콘텐츠를 처리할 수 있어서 페이지를 요청할 때마다 최신 정보를 제공합니다.

예시:

```js
const express = require('express');
const fetch = require('node-fetch');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();

app.get('/', async (req, res) => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  const appString = ReactDOMServer.renderToString(<Home data={data} />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server-Side Rendering with Express</title>
      </head>
      <body>
        <div id="root">${appString}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(data)}
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000에서 실행 중입니다.');
});
```

<div class="content-ad"></div>

- 서버 설정: 예제는 Express 프레임워크를 사용하여 서버를 설정합니다. 루트 URL(`/`)로 요청이 들어오면, 외부 API에서 데이터를 가져옵니다.
- 데이터 가져오기: 서버는 node-fetch를 사용하여 API 엔드포인트(https://api.example.com/data)로 HTTP 요청을 보냅니다. 가져온 데이터는 JSON 형식으로 변환됩니다.
- React 컴포넌트 렌더링: 서버는 ReactDOMServer.renderToString을 사용하여 Home React 컴포넌트를 HTML 문자열로 렌더링하고, 가져온 데이터를 prop으로 전달합니다.
- HTML 응답 보내기: 서버는 HTML 템플릿을 작성하여 렌더링된 React 컴포넌트를 root ID가 있는 div 안에 삽입합니다. 또한 클라이언트 측 데이터를 초기화하고 클라이언트 측 JavaScript 파일(client.js)을 로드하기 위한 스크립트를 포함합니다.
- 클라이언트 측 수분화: 브라우저가 HTML을 수신하면 클라이언트 측 JavaScript(client.js)가 서버에서 렌더링된 HTML을 수분화하여 React 컴포넌트가 상호작용할 수 있게 합니다.

장점:

- 사전 렌더링된 HTML로 SEO가 유리해집니다.
- 더 빠른 로딩 속도.
- 페이지가 항상 최신 상태를 유지합니다.

단점:

<div class="content-ad"></div>

- 각 요청이 처리되는 데 더 오래 걸릴 수 있습니다.
- CSR(Clinet-Side Rendering)을 사용하는 것보다 페이지 로드에 더 오랜 시간이 소요될 수 있습니다.
- 정적 렌더링보다 설정 및 유지 관리가 복잡합니다.

## 스트리밍 렌더링

스트리밍 렌더링은 서버가 HTML의 일부를 클라이언트에게 가능한 즉시 전송하는 기술입니다. 이를 통해 브라우저가 페이지를 렌더링하기 시작함으로써 웹 애플리케이션의 성능이 향상됩니다.

![Rendering Strategies Every React Developer Should Know](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_4.png)

<div class="content-ad"></div>

중요한 포인트:

1. 느껴지는 성능 개선: 사용자는 나머지 부분이 렌더링되고 스트리밍되는 동안 페이지 일부와 상호 작용을 시작할 수 있습니다.

2. 점진적 렌더링: 페이지의 핵심 부분이 먼저 전송되고 렌더링되어 사용자 경험을 향상시킵니다.

3. 첫 번째 바이트로의 시간 단축(TTFB): 스트리밍을 통해 첫 번째 바이트로의 시간을 단축시켜 초기 로드가 빠르게 느껴질 수 있습니다.

<div class="content-ad"></div>

React 18의 스트리밍 렌더링은 서버 사이드 렌더링을 위해 새로운 pipeToNodeWritable 메소드를 사용합니다. 이는 HTML 부분을 준비되는 대로 클라이언트로 보냅니다.

```js
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Writable } = require('stream');

const app = express();

function Home({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

app.get('/', async (req, res) => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  const htmlStart = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streaming Rendering</title>
      </head>
      <body>
        <div id="root">
  `;

  const htmlEnd = `
        </div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(data)}
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  res.write(htmlStart);

  const writable = new Writable({
    write(chunk, encoding, callback) {
      res.write(chunk, encoding, callback);
    },
    final(callback) {
      res.write(htmlEnd);
      res.end();
      callback();
    },
  });

  ReactDOMServer.pipeToNodeWritable(<Home data={data} />, writable);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

작동 방식:

<div class="content-ad"></div>

- 서버 측: 초기 HTML을 스트리밍하기 위해 ReactDOMServer.pipeToNodeWritable을 사용합니다.
- 클라이언트 측: 클라이언트는 HTML의 일부를 도착하는 대로 렌더링을 시작합니다.

장점:

- 사용자가 페이지 일부와 상호 작용할 수 있습니다.
- 핵심 콘텐츠가 먼저 표시되어 사용자 경험이 향상됩니다.
- 더 많은 콘텐츠가 로드됨에 따라 사용자 인터페이스가 점진적으로 향상됩니다.
- 페이지 전체를 한꺼번에 렌더링할 필요가 없기 때문에 서버 및 클라이언트 리소스를 적게 사용합니다.
- 검색 엔진이 콘텐츠를 더 빨리 찾을 수 있습니다.

단점:

<div class="content-ad"></div>

- Implementation은 전통적 렌더링보다 복잡합니다.
- 올바른 렌더링을 보장하기 위해 종속성 및 스트리밍 순서를 관리해야 합니다.
- 모든 브라우저나 네트워크에서 스트리밍할 수 있는 것은 아닙니다.
- 비동기적인 성격 때문에 스트리밍 문제 해결이 더 어렵습니다.
- 제대로 관리되지 않으면 서버 및 클라이언트 렌더링된 콘텐츠 사이에 차이가 있을 수 있습니다.

## 정적 사이트 생성

정적 사이트 생성은 HTML 페이지를 미리 렌더링하여 정적 파일로 제공하는 기술입니다. 이 접근 방식은 사전 렌더링된 HTML을 제공함으로써 성능을 향상시키고 서버 부하를 줄이며 보안을 강화할 수 있습니다.

주요 포인트:

<div class="content-ad"></div>

1. 성능: 페이지가 사전 렌더링되어 정적 파일로 제공되므로 로딩 속도가 매우 빠릅니다.

2. SEO: 사전 렌더링된 HTML은 검색 엔진이 쉽게 크롤링하여 SEO를 개선합니다.

3. 보안: 정적 파일을 제공함으로써 서버 렌더링된 페이지와 비교하여 공격 표면이 줄어듭니다.

예시:

<div class="content-ad"></div>

다음은 Next.js를 사용한 SSG의 예시입니다.

```js
// pages/index.js
import React from 'react';

function Home({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
```

이 예제에서는:

• getStaticProps 함수는 데이터를 빌드 시간에 가져오고 서버에서 실행됩니다.

<div class="content-ad"></div>

- 홈 컴포넌트로 전달된 데이터는 props를 통해 전달됩니다.

- HTML은 빌드 시 생성되어 정적 파일로 제공됩니다.

장점:

- 정적 파일의 빠른 로드 시간.
- 사전 렌더링된 HTML로 SEO 향상.
- 더 빠른 서버와 안전한 데이터.

<div class="content-ad"></div>

**단점:**

- 내용 변경에 대한 유연성이 부족합니다.
- 우선 구축해야 합니다.
- 대규모 사이트의 경우 빌드 시간이 더 오래 걸릴 수 있습니다.

## 증분 정적 재생

증분 정적 재생(Incremental Static Regeneration, ISR)은 사이트를 빌드하고 배포한 후 정적 페이지를 업데이트할 수 있는 기능입니다. 이 접근 방식은 정적 사이트 생성의 이점과 내용을 업데이트할 수 있는 유연성을 결합합니다.

<div class="content-ad"></div>

중요한 점:

1. 요청 시 업데이트: 데이터 변경 시 전체 사이트 재구축이 필요하지 않고 페이지를 증분적으로 업데이트할 수 있습니다.

2. 향상된 성능: 정적 컨텐츠를 제공하면서 특정 페이지를 새로 고침하고 업데이트할 수 있는 기능을 제공합니다.

3. 유연성: 정적 사이트의 속도와 동적 콘텐츠 업데이트를 처리할 수 있는 능력을 결합합니다.

<div class="content-ad"></div>

예시:

다음은 ISR을 보여주는 Next.js 사용 예시입니다:

```js
// pages/index.js
import React from 'react';

function Home({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10, // 최대 10초마다 페이지를 다시 생성합니다.
  };
}

export default Home;
```

이 예시에서:

<div class="content-ad"></div>

- getStaticProps 함수는 빌드 시간에 데이터를 가져옵니다.
- revalidate 속성은 다시 유효화 기간(예: 10초)을 지정하여 해당 기간 동안 최대 한 번 페이지가 다시 생성되도록 하여 요청이 들어오면.
- 생성된 정적 HTML은 완전한 사이트 재구성 없이 새 데이터로 업데이트할 수 있습니다.

장점:

- 빠르고 유연합니다.
- HTML로 인한 SEO 향상.
- 빈번한 재구성 요구를 줄여 시간과 리소스를 절약합니다.

단점:

<div class="content-ad"></div>

- 정적 사이트 생성보다 설정하는 것이 더 복잡합니다.
- 최신 콘텐츠가 사용자에게 즉시 표시되지 않을 수 있습니다.

## 재수전

React에서 재수전은 서버에서 React 애플리케이션을 렌더링하여 초기 HTML을 생성한 다음 React가 클라이언트에서 페이지를 상호작용하도록 만드는 것을 의미합니다. 이 과정을 통해 사용자가 빠르게 시작하고 JavaScript가 준비되면 페이지와 상호 작용할 수 있도록 합니다.

주요 요점:

<div class="content-ad"></div>

1. 서버 측 렌더링 (SSR): 서버가 초기 HTML을 생성합니다.

2. 클라이언트 측 재가동: 클라이언트 측 React 코드가 페이지를 대화식으로 만듭니다.

예시:

다음은 React를 사용하여 재가동을 보여주는 간단한 예시입니다:

<div class="content-ad"></div>

서버 측

```js
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const App = require('./App').default;

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve(__dirname, 'build', 'index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('에러 발생:', err);
      return res.status(500).send('앗!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000에서 실행 중입니다.');
});
```

클라이언트 측

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

<div class="content-ad"></div>

작동 방식:

1. 서버 측: 서버는 ReactDOMServer.renderToString을 사용하여 초기 페이지 로드를 위한 HTML을 생성합니다. 이 HTML은 index.html 템플릿에 삽입됩니다.

2. 클라이언트 측: 클라이언트가 페이지를 로드할 때, ReactDOM.hydrate가 정적 HTML을 가져와 상호 작용할 수 있도록 이벤트 리스너를 부착합니다.

장점:

<div class="content-ad"></div>

- 서버에서 미리 렌더링된 HTML로 인한 빠른 초기로드 시간.
- 미리 렌더링된 콘텐츠로 개선된 SEO.
- 클라이언트 측 JavaScript가 로드된 후 완전한 상호작용 가능.

단점:

- JavaScript가 로드될 때까지 상호작용이 지연될 수 있음.
- 서버 및 클라이언트에서 렌더링된 콘텐츠가 일치하는지 확인하기 어려울 수 있음.

## 부분 유기화

<div class="content-ad"></div>

부분 수분화는 웹 개발에서 일부 정적 HTML 페이지만 상호 작용적으로 만드는 기술입니다. 이 방식은 페이지의 일부만 상호 작용을 요구하는 부분에 대해 JavaScript를로드하고 실행해 성능을 향상시키며, 전반적인 JavaScript 페이로드를 줄입니다.

![Rendering Strategies Every React Developer Should Know](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_5.png)

주요 포인트:

- 선택적 상호 작용: 페이지의 일부만로드됩니다.
- 더 빠른 성능: 덜 JavaScript를로드 및 실행하므로 페이지가 더 빨리로드되고 더 적은 리소스를 사용합니다.
- 점진적 향상: 페이지가 잘 작동하고 사용하기 쉬운지 확인합니다.

<div class="content-ad"></div>

예시:

리액트를 사용하여 부분 하이드레이션을 보여주는 예시입니다:

클라이언트 측

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
```

<div class="content-ad"></div>

React Components (App.js와 InteractiveComponent.js)

```js
// src/App.js
import React from 'react';
import InteractiveComponent from './InteractiveComponent';

function App() {
  return (
    <div>
      <h1>정적 콘텐츠</h1>
      <InteractiveComponent />
    </div>
  );
}

export default App;
```

```js
// src/InteractiveComponent.js
import React, { useState } from 'react';

function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>클릭하세요</button>
      <p>{count}</p>
    </div>
  );
}

export default InteractiveComponent;
```

작동 방식:

<div class="content-ad"></div>

- 서버 측: 서버는 ReactDOMServer.renderToString을 사용하여 초기 페이지로드를 위한 HTML을 생성합니다. 이 HTML은 index.html 템플릿에 삽입됩니다.
- 클라이언트 측: 클라이언트가 페이지를 로드할 때, ReactDOM.hydrate는 필요한 인터랙션이 필요한 페이지 부분만 적용합니다.

장점:
- 더 작은 JavaScript 페이로드로 인해 더 빠른로드 시간.
- 페이지의 필요한 부분만 적용.
- 사용자들은 더 많은 인터랙션을 즐깁니다.

단점:

<div class="content-ad"></div>

- 전체 페이지 하이드레이션보다 더 복잡합니다.
- 주의 깊게 관리해야 합니다.

## 점진적 하이드레이션

점진적 하이드레이션은 웹 페이지의 다른 부분이 하나씩 로드되는 기술입니다. 이 방법은 필수 부분의 하이드레이션을 우선시하여 비필수 부분의 하이드레이션을 지연시킴으로써 성능을 향상시킵니다.

주요 포인트:

<div class="content-ad"></div>

- 점진적으로 수분을 보충하는 것: 페이지의 일부는 점차적으로 로드됩니다.
- 우선순위를 둔 상호작용: 중요 구성 요소가 먼저 수분 보충됩니다.
- 성능 최적화: 초기 JavaScript 페이로드를 줄이고 페이지 로드 시간을 개선합니다.

예시:

React 및 Intersection Observer API를 사용하여 점진적 수분 보충을 보여주는 예시:

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function hydrateComponent(selector, Component) {
  const element = document.querySelector(selector);
  if (element && element.hasChildNodes()) {
    ReactDOM.hydrate(<Component />, element);
  } else if (element) {
    ReactDOM.render(<Component />, element);
  }
}

hydrateComponent('#root', App);
```

<div class="content-ad"></div>

```js
// src/App.js
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          import('./ProgressiveComponent').then(({ default: Component }) => {
            hydrateComponent('#progressive', Component);
          });
          observer.disconnect();
        }
      });
    });

    observer.observe(document.querySelector('#progressive'));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1>Static Content</h1>
      <div id="progressive">Loading...</div>
    </div>
  );
}

export default App;
```

```js
// src/ProgressiveComponent.js
import React, { useState } from 'react';

function ProgressiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>{count}</p>
    </div>
  );
}

export default ProgressiveComponent;
```

동작 방식:

- 서버 측: 서버는 ReactDOMServer.renderToString을 사용하여 초기 HTML을 생성합니다.
- 클라이언트 측: ReactDOM.hydrate은 주 응용 프로그램을 즉시 채웁니다.
- 점진적 구성 요소 수화: Intersection Observer는 ProgressiveComponent가 뷰포트에 진입할 때 그것을 수화합니다.

<div class="content-ad"></div>

장점:

- 필수 구성 요소만 먼저 로드하여 로드 시간을 개선했습니다.
- 사용자들이 더 나은 경험을 할 수 있습니다.
- Javascript 파일이 줄어 듭니다.

단점:

- 전체 페이지 가득 채우기보다 복잡합니다.
- 문제를 피하기 위해 신중하게 관리해야 합니다.

<div class="content-ad"></div>

## 동적 렌더링

동적 렌더링은 사용자가 원하는 내용을 기반으로 웹 페이지를 만드는 방법입니다. 이 방법은 크롤러와 사용자에게 서로 다른 내용을 제공함으로써 웹 사이트를 최적화하여 사용자와 검색 엔진을 위한 최적의 서비스를 제공합니다.

![랜더링 전략](/assets/img/2024-06-19-RenderingStrategiesEveryReactDeveloperShouldKnow_6.png)

주요 포인트:

<div class="content-ad"></div>

1. 하이브리드 접근 방식: 서버 측 및 클라이언트 측 렌더링을 결합하여 성능 및 SEO를 최적화합니다.

2. SEO 최적화: 사전 렌더링된 HTML을 검색 엔진에 제공하여 크롤링 및 인덱싱을 개선합니다.

3. 사용자 경험: 사용자가 사이트와 완전히 상호 작용할 수 있습니다.

예시:

<div class="content-ad"></div>

Node.js와 Puppeteer를 사용한 동적 렌더링 예제가 있어요:

```js
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('*', async (req, res) => {
  const userAgent = req.headers['user-agent'];
  
  if (/Googlebot|Bingbot|Baiduspider|YandexBot/i.test(userAgent)) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000${req.originalUrl}`, {
      waitUntil: 'networkidle2'
    });
    const html = await page.content();
    await browser.close();
    res.send(html);
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000에서 실행 중입니다.');
});
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

```js
// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export default App;
```

<div class="content-ad"></div>

API 엔드포인트 (Node.js + Express)

```js
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({
    title: 'Dynamic Rendering Example',
    content: 'This content is fetched from the server.'
  });
});

app.listen(3001, () => {
  console.log('API 서버가 http://localhost:3001에서 실행 중입니다.');
});
```

이 예제에서:

- 서버는 사용자 에이전트 헤더를 확인하여 요청이 검색 엔진 봇에서 왔는지 확인합니다.
- 요청이 봇에서 왔다면, Puppeteer가 사전 렌더링된 HTML을 생성하고 반환합니다.
- 요청이 사용자에서 왔다면, 클라이언트 렌더링된 HTML이 제공되며, React 애플리케이션이 API 엔드포인트에서 데이터를 가져옵니다.

<div class="content-ad"></div>

장점:

- 서버 측 및 클라이언트 측 렌더링을 결합합니다.
- 검색 엔진 봇에 사전 렌더링된 콘텐츠를 제공하여 SEO를 최적화합니다.
- 사용자가 상호 작용할 수 있습니다.

단점:

- 서버 설치 및 유지 관리가 더 복잡합니다.
- 프리 렌더링을 위해 headless 브라우저가 필요하기 때문에 더 많은 리소스를 사용합니다.
- 사용자 에이전트 감지 및 동적 콘텐츠 생성에 주의를 기울여야 합니다.

<div class="content-ad"></div>

## 결론

웹 개발의 빠르게 변화하는 세계에서는 웹 페이지를 멋지게 보이고 빠르게 로드하기 위한 다양한 방법을 이해하고 활용하는 것이 중요합니다. 각 렌더링 방법에는 다양한 장단이 있습니다.

중요 사항:

1. 클라이언트 측 렌더링 (CSR)은 사용자에게는 훌륭하지만 SEO 및 로딩 시간에 대비하여 다소 어려울 수 있습니다.

<div class="content-ad"></div>

2. 서버 사이드 렌더링 (SSR)은 초기 로드 속도를 향상시키고 SEO를 개선하지만 서버 부하와 복잡성을 증가시킬 수 있습니다.

3. 스트리밍 렌더링은 HTML을 점진적으로 클라이언트로 전송하여 인식된 성능을 향상시킵니다.

4. 정적 사이트 생성 (SSG)은 빠른 로드 시간과 향상된 보안을 제공하여 변경되지 않는 콘텐츠에 이상적입니다.

5. 점진적 정적 재생성 (ISR)은 정적 및 동적 콘텐츠 업데이트의 이점을 결합하여 성능과 유연성을 균형 있게 제공합니다.

<div class="content-ad"></div>

6. 리하이드레이션은 서버에서 렌더링된 HTML과 클라이언트 측 상호 작용을 연결하여 부드러운 사용자 경험을 제공합니다.

7. 부분 하이드레이션 및 점진적 하이드레이션은 필요에 따라 페이지의 일부를 선택적으로 상호 작용할 수 있도록 최적화하여 성능을 향상시킵니다.

9. 동적 렌더링은 사전 렌더링된 콘텐츠를 검색 엔진 최적화를 위해 봇에 제공하면서 사용자에게 동적 콘텐츠를 제공하여 향상된 경험을 제공합니다.

적절한 렌더링 전략은 앱의 요구 사항, 성능 및 사용자 경험에 따라 다릅니다. 이러한 기술을 사용함으로써 개발자들은 사용자와 검색 엔진에게 잘 작동하는 사용자 친화적인 웹 앱을 만들 수 있습니다.

<div class="content-ad"></div>

Web 기술이 발전함에 따라, 개발자들은 웹 앱을 빠르게 실행할 수 있는 최상의 방법을 항상 파악해야 합니다. 이러한 방법을 활용하여 훌륭한 디지털 경험을 만들어보세요.