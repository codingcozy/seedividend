---
title: "크리에이트 리액트 앱 프로젝트에서 프록시를 사용하여 CORS 문제 해결하기"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoSolvetheCORSIssueinaCreateReactAppProjectwithaProxy_0.png"
date: 2024-05-12 20:40
ogImage: 
  url: /assets/img/2024-05-12-HowtoSolvetheCORSIssueinaCreateReactAppProjectwithaProxy_0.png
tag: Tech
originalTitle: "How to Solve the CORS Issue in a Create React App Project with a Proxy"
link: "https://medium.com/@jafreitas90/how-to-solve-the-cors-issue-in-a-create-react-app-project-with-a-proxy-5403141d7f32"
isUpdated: true
---




<img src="/assets/img/2024-05-12-HowtoSolvetheCORSIssueinaCreateReactAppProjectwithaProxy_0.png" />

만약 여러분이 Create React App 프로젝트에서 페이지를 제공하는 도메인과 다른 도메인으로부터 fetch 요청을 보낸 적이 있다면, CORS(Cross-Origin Resource Sharing) 문제를 마주친 적이 있을 수도 있습니다.

React 앱에서 다른 도메인으로 요청을 보낼 때, 서버가 CORS를 명시적으로 허용하지 않는다면 브라우저가 요청을 차단할 수 있습니다.

이 글에서는 프록시를 사용하여 Create React App 프로젝트에서 CORS 문제를 해결하는 방법을 살펴볼 것입니다. 프록시는 클라이언트와 대상 서버 사이에서 중계 역할을 하는 서버입니다. 프록시를 사용하면 클라이언트에서 대상 서버로의 요청을 프록시 서버를 통해 전달함으로써 CORS 문제를 우회할 수 있습니다.



Create React App 프로젝트에서 프록시를 사용하는 두 가지 방법이 있습니다: setupProxy.js 파일을 사용하거나 package.json 파일에 프록시를 추가하는 것입니다. 이 기사에서는 두 가지 방법을 모두 다룰 것입니다.

# setupProxy.js 파일 사용

setupProxy.js 파일은 Create React App 프로젝트에서 프록시를 구성할 수 있는 특별한 파일입니다. CORS 문제를 해결하기 위해 setupProxy.js 파일을 사용하는 방법은 다음과 같습니다:

- 프로젝트의 src 폴더에 setupProxy.js 파일을 생성합니다.
- 아래 코드를 setupProxy.js 파일에 추가합니다:



```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

이 코드는 /api 경로를 http://localhost:5000으로 전달하는 프록시 미들웨어를 설정합니다. 실제 서버의 URL로 바꿀 수 있습니다.

changeOrigin 옵션은 요청의 원래 호스트 이름을 볼 수 있도록 대상 서버를 활성화하는 데 true로 설정됩니다.

- fetch 요청을 사용하여 /api 접두사를 업데이트하십시오:




```js
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

이렇게 하면 프록시를 통해 http://localhost:5000/data로 요청을 보낼 수 있습니다.

setupProxy.js 파일을 사용하여 React 앱에서 CORS 문제를 해결할 수 있습니다.

# package.json 파일에 프록시 추가하기



Create React App 프로젝트의 package.json 파일에 프록시를 추가하여 CORS 문제를 해결할 수도 있어요. 아래는 해결 방법입니다:

- 프로젝트의 루트 폴더에 있는 package.json 파일을 열어주세요.
- 파일에 다음 라인을 추가하세요:

```js
"proxy": "http://localhost:5000"
```

http://localhost:5000을 서버의 실제 URL로 교체해주세요.



- 파일을 저장하세요.
- fetch 요청을 절대 URL 대신 상대 URL을 사용하도록 업데이트하세요:

```js
fetch('/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

이렇게 하면 프록시를 통해 http://localhost:5000/data로 요청이 전송됩니다.

package.json 파일에 프록시를 추가하여 별도의 setupProxy.js 설정 없이 React 앱에서 CORS 문제를 피할 수 있습니다.



# 결론

이 글에서는 프록시를 사용하여 Create React App 프로젝트에서 CORS 문제를 해결하는 방법에 대해 살펴보았습니다. setupProxy.js 파일을 사용하는 방법과 package.json 파일에 프록시를 추가하는 두 가지 방법을 다루었습니다. 프록시를 사용하면 클라이언트에서 요청을 프록시 서버를 통해 대상 서버로 전달하여 CORS 문제를 우회할 수 있습니다.

# 참고 자료

- MDN Web Docs: Cross-Origin Resource Sharing (CORS)
- Create React App: Proxying API Requests in Development
- http-proxy-middleware