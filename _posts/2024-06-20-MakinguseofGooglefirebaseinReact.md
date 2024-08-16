---
title: "구글 파이어베이스를 React에서 활용하기"
description: ""
coverImage: "/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_0.png"
date: 2024-06-20 05:13
ogImage: 
  url: /assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_0.png
tag: Tech
originalTitle: "Making use of Google firebase in React"
link: "https://medium.com/@samuelbankole/google-firebase-in-react-1acc64516788"
isUpdated: true
---




<img src="/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_0.png" />

# React에서 Firebase 탐험하기

환영합니다!

저는 Firebase와 React의 흥미로운 세계로 다가가려 합니다. 그래서 Firebase는 무엇일까요? 구글이 제공하는 클라우드 기반 도구함으로 생각해보세요. 개발자로서 우리의 삶을 더 쉽게 만들어주는 도구들로 가득차 있습니다. 이는 우리가 웹 앱/React 앱에 멋진 기능을 추가하기 위해 빠르게 개발할 수 있는 초능력과 같습니다.

<div class="content-ad"></div>

Firebase는 강력한 백엔드 서비스(BaaS) 솔루션이며, 개발자들에게 클라우드 서비스를 쉽게 React 애플리케이션에 통합할 수 있는 기회를 제공합니다.

# 주요 Firebase 기능

## 1. 실시간 데이터베이스 (Firestore)

Firestore는 클라우드 저장소 장치로 생각해보세요. 이것은 실시간으로 데이터를 저장하고 공유할 수 있는 NoSQL 클라우드 데이터베이스입니다. 무언가를 업데이트하면 React 앱을 사용하는 모든 사용자가 수동 새로 고침 없이 즉시 보여주므로 부드럽고 반응이 빠른 사용자 경험을 제공합니다.

<div class="content-ad"></div>

## 2. 인증

Firebase Authentication은 웹/앱을 위한 VIP 목록을 갖는 것과 같습니다. 회원가입, 로그인 및 비밀번호 관리를 처리하여 누가 들어오고 나가는지를 관리하는 데 도움을 줍니다. 보안이 쉬워졌어요!

## 3. 호스팅

Firebase Hosting은 React 애플리케이션을 배포하고 호스팅하기 위한 번거로움 없는 솔루션을 제공합니다. 전 세계 사용자를 위한 빠른 로딩 시간을 위한 글로벌 콘텐츠 전송 네트워크(CDN)를 제공하여 전 세계 사용자에게 원활한 경험을 제공합니다.

<div class="content-ad"></div>

## 4. 클라우드 함수

이것들은 작은 도우미들 같아요. Firebase 클라우드 함수를 사용하면 Firebase 기능에서 트리거된 이벤트에 응답하여 서버 측 코드를 실행할 수 있어요. 이 서버리스 아키텍처는 서버를 관리할 필요 없이 React 애플리케이션에서 백엔드 로직을 실행하는 데 특히 유용할 수 있어요.

## 5. 저장소

Firebase 저장소는 디지털 저장 공간이에요. 이미지와 비디오를 안전하게 보관하여 React 앱에서 미디어를 손쉽게 표시할 수 있도록 도와줘요.

<div class="content-ad"></div>

# React와 Firebase의 우정

React와 Firebase를 결합하면 마치 호두 버터와 쨈을 섞는 것과 같아요. React는 앱의 외관과 느낌을 다루고(프론트엔드), Firebase는 뒷단 작업을 처리해줘요(백엔드).

액션 준비 완료!

다가오는 레슨에서는 손을 놓지 않을 거예요. 프로젝트 설정부터 React 컴포넌트에서 Firebase 기능을 사용하기까지, 멋진 실시간 및 안전한 애플리케이션을 만들기 위해 준비하세요. 함께 Firebase의 특별 능력을 React 우주에서 발휘해보세요!

<div class="content-ad"></div>

# Firebase와 React를 통합하는 단계별 안내서

## 단계 1: Firebase 계정 설정

시작하기 전에 구글 계정이 있어야 합니다. 계정이 없다면 하나 생성하십시오. Firebase 콘솔로 이동하여 로그인합니다.

## 단계 2: 새 Firebase 프로젝트 생성

<div class="content-ad"></div>

`<img src="/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_1.png" />`

"Create a Project"을 탭하세요

`<img src="/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_2.png" />`

프로젝트에 제목을 입력하고 두 개의 상자를 체크하세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_3.png" />

이 프로젝트에서는 GOOGLE ANALYSIS를 사용하지 않을 것이므로 내 것을 비활성화했습니다. 여러분은 본인 것을 비활성화할지 여부를 결정할 수 있습니다.
그런 다음 "CREATE PROJECT"를 클릭하세요.

## 단계 3: 실시간 데이터베이스 설정

Real-time database. Firebase 콘솔에서 "Build" 쪽으로 이동한 후 "Realtime Database"를 선택하세요. "Create Database"를 클릭하고 위치를 선택하세요. 간편함을 위해 테스트 모드에서 시작하세요.
원하는 대로 나중에 바꿀 수 있는 형식으로 콘솔을 편집하세요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_4.png)

## 단계 4: Firebase 구성

프로젝트 대시보드에서 톱니바퀴 아이콘을 클릭한 후 "프로젝트 설정"을 선택합니다. "일반" 탭에서 아래로 내려가서 "앱"을 클릭한 후 웹 아이콘(`/`)을 클릭하세요. 프로젝트 이름을 작성하고 npm을 사용하여 제공된 구성 스니펫을 복사하세요.

## 단계 5: React 앱 생성

<div class="content-ad"></div>

터미널을 열고 다음을 실행해보세요:

```js
npx create-react-app my-firebase-app
cd my-firebase-app
```

## 단계 6: React 앱에 Firebase 설치하기

프로젝트 디렉토리에서 Firebase 종속성을 설치하세요:

<div class="content-ad"></div>

```js
npm install firebase
```

## 단계 7: React 애플리케이션 실행하기

터미널에서 다음 명령을 실행하세요:

```js
npm start
```

<div class="content-ad"></div>

만약 기본 브라우저에서 자동으로 열리지 않는 경우 http://localhost:3000을 방문하여 React 앱이 어떻게 작동하는지 확인할 수 있습니다.

## 단계 8: React 앱에서 Firebase 구성하기

“configuration.jsx” 파일을 생성하고 Step 4에서 Firebase 구성을 복사하여 src/index.js 파일에 붙여넣으세요.

```js
// 필요한 Firebase 모듈 가져오기
import { initializeApp } from "firebase/app";

// 여기에 Firebase 구성 추가
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Firebase 초기화
const cong = initializeApp(firebaseConfig);

export default cong;
// 이제 React 앱에서 Firebase 서비스를 사용할 수 있습니다!
```

<div class="content-ad"></div>

## 단계 9: React 구성 요소에서 데이터베이스 사용하기

예를 들어, App.js 파일에서 데이터를 가져와서 표시하는 방법입니다.
파일에서 기본 코드를 제거하고 아래 코드로 대체하세요.

```js
import React, { useEffect, useState } from "react";
import cong from "./configuration"; // 구성 파일의 올바른 경로를 가정
import { getDatabase, ref, onValue } from "firebase/database";

// App.js

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 제공된 구성으로 Firebase 데이터베이스를 초기화합니다
    const database = getDatabase(cong);
    
    // 데이터베이스의 특정 컬렉션에 대한 참조
    const collectionRef = ref(database, "your_collection");

    // 데이터베이스에서 데이터를 가져오는 함수
    const fetchData = () => {
      // 컬렉션의 변경 사항을 수신대기
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // 데이터가 있는지 확인
        if (dataItem) {
          // 객체 값을 배열로 변환
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    // 컴포넌트가 마운트될 때 데이터를 가져옵니다
    fetchData();
  }, []);

  return (
    <div>
      <h1>데이터베이스에서 가져온 데이터:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

<div class="content-ad"></div>

브라우저를 확인하면 데이터베이스 콘솔에 나열된 항목과 일치하는 내용이 표시됩니다.

![Google Firebase in React](/assets/img/2024-06-20-MakinguseofGooglefirebaseinReact_5.png)

데이터베이스에 새 항목을 추가하고 실시간 업데이트를 확인하며 경험을 향상시켜보세요. 항목을 더 복잡하게 만들어 보거나 코드를 조정하여 콘솔에 이러한 변화를 반영하고, 원하는대로 프레젠테이션을 스타일링하여 창의력을 발휘해보세요. 가능성은 여러분이 탐험할 수 있도록 열려 있습니다!