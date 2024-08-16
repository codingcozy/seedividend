---
title: "2024년에 React, Vite, Electron, 그리고 FastAPI로 Full-Stack 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_0.png"
date: 2024-05-12 22:52
ogImage: 
  url: /assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_0.png
tag: Tech
originalTitle: "Building a Full-Stack Application with React, Vite, Electron, and FastAPI in 2024"
link: "https://medium.com/@onursasmaz/building-a-full-stack-application-with-react-vite-electron-and-fastapi-in-2024-6c6c32dfffc5"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_0.png)

이 포괄적인 가이드에서는 React, Vite, Electron 및 FastAPI를 활용하여 간단한 풀스택 애플리케이션을 설정하는 방법을 안내해 드릴 거에요. 이 튜토리얼을 완료하면 단일 명령어로 시작되는 기능적인 애플리케이션을 보유하게 되며 로컬 개발 및 테스트에 적합할 거에요.

# 개요

이 애플리케이션 아키텍처는 아래와 같이 통합될 것입니다:



- ReactJS: 사용자 인터페이스를 구축하기 위한 강력한 라이브러리.
- Vite: 웹 프로젝트용 현대적이고 빠른 빌드 도구.
- Electron: 웹 기술로 크로스 플랫폼 데스크톱 앱을 빌드하는 프레임워크.
- FastAPI: Python으로 API를 빌드하기 위한 효율적이고 고성능 프레임워크.

# 시스템 디자인 개요

아래 다이어그램은 시스템 아키텍처를 설명합니다:

![Architecture Diagram](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_1.png)



다음은 각 구성 요소 간 상호 작용을 보여주는 다이어그램입니다:

- Electron Main Process: 라이프사이클 이벤트를 관리하고 브라우저 창을 생성합니다.
- Electron Renderer Process: 브라우저 창 내에서 웹 프런트엔드를 실행합니다.
- React Application: Vite를 통해 제공되는 UI를 제공합니다.
- FastAPI Server: 백엔드 로직 및 데이터 관리를 처리합니다.

# 애플리케이션 구조

다음은 우리의 간단한 애플리케이션의 구조입니다:



```js
my-project/
│
├── backend/
│   ├── main.py            # FastAPI 애플리케이션
│   └── requirements.txt   # Python 종속성
│
├── frontend/              # Vite 프로젝트 루트
│   ├── main.jsx           # React 애플리케이션 진입점
│   ├── App.jsx            # React 컴포넌트
│   ├── App.module.css     # 스타일
│   └── vite.config.js     # Vite 구성 설정
│   └── package.json       # 프론트엔드 종속성을 위한 NPM 패키지 파일
│
├── electron/
│   └── main.cjs           # Electron 메인 스크립트
│   └── preload.cjs           # Electron 메인 스크립트
│
├── package.json           # Electron을 위한 루트 NPM 패키지 파일
```

# 환경 설정

## 1. 가상 환경

프로젝트 디렉토리에서 파이썬 가상 환경을 만들면 전역 파이썬 환경과 별도로 파이썬 종속성을 관리할 수 있습니다.



Windows:


```js
python -m venv venv
.\venv\Scripts\activate
```

macOS/Linux:

```js
python3 -m venv venv
source venv/bin/activate
```



# 2. 종속성 설치

백엔드 디렉토리에서 requirements.txt 파일을 추가하세요:

```js
fastapi==0.68.1
uvicorn==0.15.0
```

Python 종속성을 설치하세요:



```js
pip install -r backend/requirements.txt
```

## 3. 프론트엔드 및 일렉트론 설정

Vite를 사용하여 프론트엔드를 초기화하고 일렉트론을 구성합니다.

Vite 프로젝트를 초기화합니다 (프론트엔드 디렉토리 내부):



```js
npm create vite@latest --template frontend
```

Node 의존성 패키지 설치:

```js
npm install
```

# 4. 백엔드 서버



frontend/App.jsx:

```jsx
import React from 'react';

function App() {
    return (
        <div>
            <h1>Welcome to the React Front-end!</h1>
            <p>Your data:</p>
            <table>
                <tr>
                    <th>Message</th>
                </tr>
                <tr>
                    <td>Hello from FastAPI</td>
                </tr>
            </table>
        </div>
    );
}

export default App;
```  



```js
import React, { useEffect, useState } from "react";
import styles from "./App.module.css"; // CSS 모듈 가져오기

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data");
        const jsonData = await response.json();
        setData(jsonData.message);
      } catch (error) {
        console.error("데이터를 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>{data || "로딩 중..."}</div>
    </div>
  );
}

export default App;
```

스타일 추가:
frontend/App.module.css:

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .content {
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

frontend/main.jsx:




```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

# 6. 일렉트론 구성

electron/main.cjs:

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true, // 보안을 위해 중요함
            enableRemoteModule: false, // 보안 상 이유로 원격 모듈 비활성화
            nodeIntegration: false // 보안 상 이유로 nodeIntegration 비활성화
        }
    });

    // 로컬 웹 서버 URL 로드
    mainWindow.loadURL('http://localhost:5173');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
```



electron/preload.cjs:

```js
const { contextBridge, ipcRenderer } = require('electron');

// 렌더러 프로세스에 노출할 안전한 API
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        // 렌더러에서 메인 프로세스로 데이터를 보내기 위한 채널 화이트리스트
        const validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        // 메인에서 렌더러 프로세스로 데이터를 수신하기 위한 채널 화이트리스트
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            // 새 리스너를 추가하기 전에 채널에서 모든 리스너를 제거
            // 이렇게 하면 여러 리스너가 등록되는 것을 방지
            ipcRenderer.removeAllListeners(channel);
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
```

# 7. 통합 시작 명령

package.json을 업데이트하여 모든 서비스를 하나의 명령어로 시작하세요.



```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "start": "concurrently \"npm run start-backend\" \"npm run start-frontend\" \"npm run start-electron\"",
    "start-backend": "cd backend && uvicorn main:app --reload --host localhost --port 8000",
    "start-frontend": "cd frontend && vite",
    "start-electron": "electron electron/main.cjs"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "concurrently": "^7.0.0"
  }
}
```

# 응용 프로그램 실행 방법

응용프로그램을 실행하려면:

```js
npm start
```



아래 명령어로 백엔드, 프론트엔드 및 일렉트론을 동시에 시작하여 즉시 애플리케이션을 확인할 수 있습니다.

성공적인 터미널 출력은 다음과 같아야 합니다:

![이미지](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_2.png)

# 결과



Browser:

![Browser screenshot](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_3.png)

MacOS:

![MacOS screenshot](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_4.png)



Windows:

![Windows](/assets/img/2024-05-12-BuildingaFull-StackApplicationwithReactViteElectronandFastAPIin2024_5.png)

## 결론

이 안내서는 최신 기술을 활용하여 개발 및 확장 가능한 제품 배포 모델에 이상적인 완전한 스택 애플리케이션을 구축하기 위한 간단한 로드맵을 제시합니다. 이 프레임워크는 소프트웨어 아키텍처의 최상의 실천 방법을 준수하며, 요소의 느슨한 결합과 손쉬운 유지 관리를 촉진합니다.



여기서 전체 코드에 액세스하세요

질문이 있으시면 언제든지 물어보세요.