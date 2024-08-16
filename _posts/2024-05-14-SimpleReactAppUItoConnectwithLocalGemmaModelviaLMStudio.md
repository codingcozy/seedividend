---
title: "로컬 Gemma 모델과 연결하는 LM Studio를 통한 간단한 React 앱 UI"
description: ""
coverImage: "/assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_0.png"
date: 2024-05-14 12:04
ogImage: 
  url: /assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_0.png
tag: Tech
originalTitle: "Simple React App UI to Connect with Local Gemma Model via LM Studio"
link: "https://medium.com/@magesh27/simple-react-app-ui-to-connect-with-local-gemma-model-via-lm-studio-c746c8a996f5"
isUpdated: true
---




로컬 데이터를 Gemma를 통해 LM Studio로 처리함으로써 정보를 외부 서버로 보내지 않고 제어할 수 있습니다. 이 방식은 민감한 문서나 개인 데이터를 다룰 때 데이터 개인 정보 보호와 보안을 보장합니다. 이 기사에서는 로컬 LLM과 상호작용하기 위해 간단한 React 앱 GUI를 사용하는 방법을 살펴보겠습니다.

LM Studio 및 Gemma 모델 설치

```js
https://lmstudio.ai/
```

Windows / Linux / Mac 버전을 다운로드하세요.



![이미지](/assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_0.png)

이제 노트북/PC/서버에 적합한 모델을 찾아보세요.

우리는 Gemma Model을 사용하고 있습니다. 이는 기계 학습에 경험이 제한된 개발자들에게도 쉽게 사용할 수 있습니다. 그들의 가벼운 특성은 접근성이 높고 사용하기 편리합니다.

![이미지](/assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_1.png)



다운로드 후에는 왼쪽 메뉴에서이 모델을 로컬 서버에서 제공하는 옵션을 찾을 수 있습니다. 선택한 후 위쪽 드롭다운에서 사용 가능한 로컬 모델 목록을 선택하고 "서버 시작"을 클릭할 수 있습니다. 오른쪽 메뉴에서는 로컬 모델의 설정을 사용자 정의할 수 있습니다. 샘플 코드 섹션에서 API Curl 명령을 볼 수 있습니다. 로컬호스트 URL 및 API의 매개변수가 표시됩니다.

![이미지](/assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_2.png)

이제 LM Studio 설정이 완료되었으며 Gemma 모델이 로컬 API로 이용 가능해졌습니다.

간단한 React App GUI를 작성하여 Gemma 모델의 로컬 LM Studio API와 상호 작용해 보겠습니다. 나중에 이 코드를 사용하여 직접 응용 프로그램에서 사용할 수 있습니다.



React GUI

설정

여기서는 React 앱에 Vite를 사용하고 있습니다.

```js
npm create vite@latest
```



프롬프트 메뉴에서 Framework를 React로, Variant를 Javascript로 선택하고 해당 디렉토리로 이동하여 설치하세요.

```js
npm install
```

앱을 미리 보기하려면 다음을 실행하세요.

```js
npm run dev
```



웹 브라우저를 열고 http://localhost:5173/ 로 이동하세요.

무료 사이트에서 lens.png 및 loading.gif 두 개의 이미지를 다운로드하여 assets 디렉토리에 추가하세요.

이제 아래 코드를 사용하여 3개 파일을 업데이트하세요.

App.jsx



```js
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import lens from "./assets/lens.png";
import loadingGif from "./assets/loading.gif";

function App() {

  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    try {
      setLoading(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          
          { 
            model: "lmstudio-ai/gemma-2b-it-GGUF", 
            temperature : 0.7,
            max_tokens : -1,
            messages: [ { role : "user", content : `${prompt}` },] 
          },
        ),
      };

      const res = await fetch("/api/v1/chat/completions", requestOptions);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const testresp = await res.json();
      console.log(testresp.choices[0].message.content);
      setAnswer(testresp.choices[0].message.content);

    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Chat LLM UI</h1>
      <input
            type="text"
            className="searchlight__input"
            placeholder="Ask me anything and press enter..."
            disabled={loading}
            style={
              backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
            }
            onChange={(e) => updatePrompt(e.target.value)}
            onKeyDown={(e) => sendPrompt(e)}
          />

        <div className="searchlight__answer">{answer && <p>{answer}</p>}</div>

    </>
  )
}

export default App
```

App.css

아래 코드로 기존의 App.css를 업데이트하세요. 원하시는 대로 사용자 정의할 수 있습니다.

```js
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

.searchlight__input {
  display: block;
  height: 56px;
  width: 80%;
  border: 0;
  border-radius: 12px;
  outline: none;
  font-size: 1.2rem;
  color: #000;
  background-position: left 17px center;
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: 3.5%;
  padding-left: 60px;
}

.searchlight__input::placeholder {
  line-height: 1.5em;
}

.searchlight__answer {
  min-height: 115px;
  line-height: 1.5em;
  letter-spacing: 0.1px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchlight__answer p::after {
  content: "";
  width: 2px;
  height: 14px;
  position: relative;
  top: 2px;
  left: 2px;
  background: black;
  display: inline-block;
  animation: cursor-blink 1s steps(2) infinite;
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}
```



LM Studio Local API를 호출하기 위해 Gemma를 업데이트하려면 Vite 구성 파일을 수정하십시오.

vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1234",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        onBeforeSend(proxyContext) {
          const { req, res } = proxyContext;
          const { url, method, headers, rawBody } = req;
          return proxyContext;
        },
      },
    },
  },
});
```

샘플 출력:



![이미지](/assets/img/2024-05-14-SimpleReactAppUItoConnectwithLocalGemmaModelviaLMStudio_3.png)

대체 도구: Ollama는 로컬 서버에서 오픈 소스 모델을 호스팅하는 또 다른 도구입니다.

다음 글에서는 문서를 업로드하고 채팅하는 방법을 알아보겠습니다.

해보고 느낀 점은 댓글로 공유해주세요.