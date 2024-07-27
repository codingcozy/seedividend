---
title: "마이크로 프론트엔드를 탐구하며 React  Vite로 구현하기"
description: ""
coverImage: "/assets/img/2024-05-12-ExploringMicroFrontendsandImplementationwithReactVite_0.png"
date: 2024-05-12 18:46
ogImage: 
  url: /assets/img/2024-05-12-ExploringMicroFrontendsandImplementationwithReactVite_0.png
tag: Tech
originalTitle: "Exploring Micro Frontends and Implementation with React +Vite"
link: "https://medium.com/javascript-in-plain-english/exploring-micro-frontends-and-implementation-with-react-vite-7178aa1886d4"
---


![이미지](/assets/img/2024-05-12-ExploringMicroFrontendsandImplementationwithReactVite_0.png)

마이크로 프론트엔드는 현대적인 웹 애플리케이션을 구축하기 위한 확장 가능한 프레임워크로 점점 더 인기를 얻고 있습니다. 이 방법론은 팀이 독립적인 특징이나 구성 요소를 구축, 배포 및 확장할 수 있게 함으로써 증진된 협력과 지속가능성을 육성합니다. 이 기사에서는 마이크로 프론트엔드가 무엇인지, 그리고 React와 Vite를 활용한 마이크로 프론트엔드의 기본 구현을 탐색할 것입니다.

## 안내

- 마이크로 프론트엔드란 무엇인가요?
- 예시: 전통적인 전자 상거래 프론트엔드 애플리케이션
- 예시: 마이크로 프론트엔드를 활용한 전자 상거래
- 마이크로 프론트엔드 프로젝트 설정
- 프로젝트 실행
- 결론



## 마이크로 프론트엔드

백엔드 팀에서 백엔드를 구축하기 위해 마이크로서비스 접근 방식을 사용한다고 들어 보았을 수 있습니다. 그렇다면 같은 방식을 프론트 엔드 구축에도 사용할 수 있다면 어떨까요?

이렇게 하면 팀이 개별적으로 작업할 수 있고, 코드베이스에서 충돌이 적어지며, 그 충돌을 해결하는 데 걸리는 시간을 줄일 수 있는 등 여러 가지 이점을 얻을 수 있습니다.

프론트엔드 세계에서 마이크로서비스의 확장 개념은 마이크로 프론트엔드라고 불립니다. 예를 들어 React를 사용하여 구축된 전자 상거래 프론트 엔드 애플리케이션을 살펴보며 용어 '마이크로 프론트엔드'를 이해해 봅시다.



## 전통적인 전자 상거래 프런트 엔드 응용 프로그램

일반적으로 프런트엔드 응용 프로그램을 구축할 때는 구성 요소, 자산, 라우팅 및 프런트엔드에 필요한 비즈니스 로직을 모든 코드베이스에 작성한 후 서버에서 제공됩니다. 그러나 현재 대부분의 조직에서 사용하는 다양한 JavaScript UI 프레임워크의 등장으로 이 프레임워크에는 제한 사항이나 단점이 있습니다. 예를 들어, 응용 프로그램이 커질수록 브라우저의 로드 시간이 증가합니다.

![이미지](/assets/img/2024-05-12-ExploringMicroFrontendsandImplementationwithReactVite_1.png)

React를 사용하여 구축된 전자 상거래 앱을 고려해 보세요. 제품 검색, 구매 및 주문 추적과 같은 기능이 포함되어 있습니다. 모놀리식 프런트엔드 응용 프로그램에서 이러한 페이지들이 포함될 것입니다.



리액트 전자 상거래 애플리케이션이 메인 JavaScript 청크에 구축되어 있습니다. 누군가 사이트를 방문할 때 브라우저에 의해로드됩니다. 사용자는 전체 프론트엔드 애플리케이션을 포함한 모든 JavaScript 파일을 다운로드하기까지 기다려야 합니다. 이로 인해 애플리케이션의 초기 로드 시간이 크게 증가할 수 있습니다.

이 로드 시간 문제를 마이크로 프론트엔드로 해결할 수 있습니다.

## 마이크로 프론트엔드와 전자 상거래

전자 상거래 애플리케이션을 고려해 봅시다. 사용자가 제품을 검색하기 위해 애플리케이션에 들어올 경우, 브라우저는 모든 코드를 다운로드할 필요가 없습니다. 대신, 사용자가 필요로 하는 부분을 사용할 수 있어야 합니다. 심지어 다른 부분은 그들에게 관련이 없더라도요.



동일한 애플리케이션을 마이크로 프론트엔드 접근 방식을 사용하여 구축할 수 있습니다. 마이크로 프론트엔드 접근 방식은 전체 큰 애플리케이션을 제공하는 기능에 따라 세분화하여 각각 개별적으로 구축하는 간단한 아이디어입니다. 이렇게 하면 팀원들이 자신이 구축 중인 기능에 대해 더 잘 이해할 수 있고 해당 기능에 대해서만 책임질 수 있습니다.

따라서 전자 상거래 애플리케이션을 제품, 주문 및 배송 기능으로 나눌 수 있습니다. 제품 마이크로 프론트엔드 애플리케이션은 제품 목록 및 검색과 관련된 UI만 렌더링합니다. 주문 마이크로 프론트엔드 애플리케이션은 주문 관련 UI에 책임을 지고 있으며, 배송 마이크로 프론트엔드는 제품 추적 기능에 책임이 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1000/0*sA7aQvM473L0-qOW.gif)

이 애플리케이션을 작은 부분으로 나누기 때문에 이러한 작은 앱들을 병합하거나 통합하여 주 애플리케이션으로 작동할 수 있어야 합니다. 사용자 입력에 따라 이러한 작은 앱들을 통합하고 렌더링하는 책임을 지게 될 host라는 주 메인 애플리케이션을 구축할 수 있습니다.



다양한 서브 애플리케이션을 통합하는 다른 방법들이 있습니다. 빌드 시간 통합, 실행 시간 통합, 서버 측 통합 등이 있어요. 이것은 마이크로 프론트엔드가 무엇인지에 대한 개요를 제공합니다.

## 마이크로 프론트엔드 프로젝트 설정

이 프로젝트에서는 호스트/애플리케이션을 설정하고, 2개의 리액트 컴포넌트 remote-a 및 remote-b를 호스팅하고 있습니다. 그리고 host로 호스트하고 있어요.

```js
# 모든 애플리케이션을 담을 폴더 생성
mkdir vite-react-micro-frontend 
cd vite-react-micro-frontend

# 호스트 애플리케이션 생성
npx create-vite host --template react
cd host
npm install
npm install @originjs/vite-plugin-federation --save-dev
cd ..

# remote-a 애플리케이션 생성
npx create-vite remote-a --template react
cd remote-a
npm install
npm install @originjs/vite-plugin-federation --save-dev
cd ..

# remote-b 애플리케이션 생성
npx create-vite remote-b --template react
cd remote-b
npm install
npm install @originjs/vite-plugin-federation --save-dev
cd ..

# Visual Code 편집기를 해당 폴더에서 열기
code .
```



이제 세 개의 React 앱이 생성되었습니다.

계속하기 위해 두 개의 원격 애플리케이션의 vite.config.js 파일을 수정해야 합니다.

remote-a의 경우 vite.config.js 파일을 수정할 수 있습니다.

```js
// remote-a/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_a",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom"],
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
```




For remote-b, we can amend the `vite.config.js` file as follows:

```js
// remote-a/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_b",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom"],
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
```

To make the same modification for remote-b's project, you should edit the `vite.config.js` file. The only difference is the name of the federation. Make sure to change it accordingly.

Next, navigate to the `package.json` file and define a separate port for each remote project. Remember, only one project can run on each port.



지금은 package.json의 remote-a를 다음과 같이 유지하고 있어요:

```js
{
  "name": "remote-a",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 2020",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview --port 2020"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.5",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "vite": "^5.2.10"
  }
}
```

그리고 remote-b의 package.json은 다음과 같아요:

```js
{
  "name": "remote-b",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 4000",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview --port 4000"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.5",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "vite": "^5.2.0"
  }
}
```



지금 React 앱을 호스트하게 변경해주세요. 호스트의 프로젝트인 vite.config.js 파일을 수정해야 합니다.

```js
// host/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        remoteA: "http://localhost:2020/assets/remoteEntry.js",
        remoteB: "http://localhost:4000/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"]
    })
  ],
})
```

이제 host 프로젝트로 remoteA와 remoteB를 가져올 수 있습니다. 시연 목적으로, host의 App.js 파일에 remoteA와 remoteB를 가져올 것입니다. 아래 코드에서 확인할 수 있습니다.

```js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RemoteA from "remoteA/App"
import RemoteB from "remoteB/App"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <section>
        <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite 로고" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React 로고" />
            </a>
          </div>
          <h1>호스트</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              현재 카운트: {count}
            </button>
            <p>
              <code>src/App.jsx</code>를 편집하고 저장하여 HMR을 테스트하세요.
            </p>
          </div>
          <p className="read-the-docs">
            Vite 및 React 로고를 클릭하여 더 많이 알아보세요.
          </p>
        </div>
      </section>
      <section><RemoteA /></section>
      <section><RemoteB /></section>
    </>
  )
}

export default App
```



## 프로젝트 실행하기

원격 서버 A와 원격 서버 B의 터미널로 이동하여 프로젝트를 빌드하고 정적 빌드 프로젝트를 제공하세요.

```js
npm run build
npm run preview
```

이렇게 하면 몇 가지 Js 파일이 생성되고 어플리케이션을 미리보기할 수 있는 URL이 제공됩니다. 해당 URL을 브라우저에서 열어보세요.



호스트 앱을 실행하세요. 호스트 앱 터미널로 이동해서 다음 명령어를 입력한 후 엔터 키를 누르세요.

```js
npm run dev
```

이제 원격 앱인 remote-a 및 remote-b 앱이 호스트 앱 내에서 추가 구성 요소로 원활하게 통합되는 것을 관찰하세요. 이것은 Micro Frontends의 우아함을 보여줍니다. 호스트 애플리케이션은 이러한 원격 구성 요소를 동적으로 검색하고 통합합니다.

저는 세 가지 다른 React 애플리케이션인 remote-a, remote-b 및 호스트 애플리케이션을 통합된 환경 내에서 운영하는 것을 보여줬습니다. 이것은 Micro Frontends 패러다임의 대표적 예시입니다. 이 React 애플리케이션을 개발할 때 어떤 거대한 프레임워크도 사용하지 않아서 명확성을 유지하기 위해 그랬습니다. 자유롭게 시도해보세요. 솔직히 말해서, 저도 React+Vite로 Micro Frontends를 처음 사용해봅니다.



## 결론

마지막으로, React와 Vite를 활용하여 @originjs/vite-plugin-federation이 향상시킨 Micro Frontends의 구축은 웹 애플리케이션 개발을 위한 모듈식이며 확장 가능한 프레임워크를 제공합니다. 이 방법론은 팀이 다양한 프로젝트 구성 요소에 대해 독립적으로 작업하고 협업 및 지속가능성을 촉진할 수 있습니다. 이 설정을 실험해보면 웹 개발 활동에서 Micro Frontends의 유연성과 견고함을 직접 체험할 수 있습니다.

마지막까지 읽어 주셔서 감사합니다.

더 많이 알고 싶다면 저를 소개하는 링크를 통해 연락해 주세요.



제 다음 블로그를 게시할 때 알림을 받으려면 구독해 주세요. 다음에 또 만나요! 

# 쉽고 명료한 영어로 🚀

In Plain English 커뮤니티의 일원이 되어줘서 감사합니다! 떠나시기 전에:

- 반드시 박수를 보내고 작가를 팔로우해 주세요️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼에서도 만나보세요: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요