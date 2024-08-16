---
title: "SSR와 CSR란 무엇인가 간단히 설명하기"
description: ""
coverImage: "/assets/img/2024-05-14-WhatisSSRandCSRAsimpleexplanation_0.png"
date: 2024-05-14 11:49
ogImage: 
  url: /assets/img/2024-05-14-WhatisSSRandCSRAsimpleexplanation_0.png
tag: Tech
originalTitle: "What is SSR and CSR: A simple explanation"
link: "https://medium.com/@dgongoragamboa/what-is-ssr-and-csr-a-simple-explanation-c25354c8b34e"
isUpdated: true
---




웹 개발 세계에서 자주 만나는 두 용어는 SSR (서버 측 렌더링)와 CSR (클라이언트 측 렌더링)입니다. 두 용어는 웹 애플리케이션에서 콘텐츠가 표시되고 처리되는 방식에 상당한 영향을 미칩니다. 이 글에서는 이러한 개념을 자세히 살펴보고 그 차이점과 유사점을 알아보며, 어떤 경우에 한 가지를 다른 것보다 선호해야 하는지 이해해보겠습니다.

![SSR](/assets/img/2024-05-14-WhatisSSRandCSRAsimpleexplanation_0.png)

# 서버 측 렌더링 (SSR)

## SSR이란?



서버 측 렌더링(SSR)은 웹 페이지가 브라우저로 전송되기 전에 서버에서 생성되는 방식입니다. 다시 말해, 서버가 페이지의 로직과 구조를 처리하고 완전히 렌더링된 페이지를 사용자의 브라우저로 보냅니다.

## SSR의 장점

- SEO 개선: 서버에서 렌더링된 페이지는 컨텐츠가 이미 클라이언트로 전송되는 초기 HTML에 포함되어 있기 때문에 검색 엔진 친화적입니다.
- 초기 성능 개선: 사용자들이 페이지 렌더링이 완료된 페이지를 처음부터 받기 때문에 컨텐츠를 빠르게 볼 수 있습니다.

## React를 사용한 SSR의 예시



Next.js는 인기 있는 React 프레임워크로, SSR을 간단하게 구현할 수 있게 해줘요.

## Step 1: Next.js 설치하기

```js
npx create-next-app my-nextjs-app
cd my-nextjs-app
```

## Step 2: SSR 페이지 만들기



In pages/index.js 파일:

```js
// pages/index.js
const HomePage = ({ data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export async function getServerSideProps() {
  // API나 데이터베이스에서 데이터 가져오는 로직
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return {
    props: { data },
  };
}

export default HomePage;
```

# 클라이언트 사이드 렌더링 (CSR)

## CSR이란?



클라이언트 측 렌더링(CSR)은 브라우저가 빈 페이지를로드하고 JavaScript를 사용하여 해당 페이지를 콘텐츠로 채우는 것을 의미합니다. 이 경우 브라우저는 사용자 인터페이스를 만들고 제공하는 데 더 활발한 역할을 합니다.

## CSR의 장점

- 향상된 상호 작용: CSR 애플리케이션은 전체 페이지를 다시로드할 필요없이 사용자 인터페이스를 업데이트할 수 있어 더 많은 상호 작용성을 제공합니다.
- 낮은 초기 로드: 초기 페이지로드가 더 빠를 수 있으며 브라우저로는 애플리케이션의 뼈대만 전송됩니다.

## React를 활용한 CSR의 예시



Create React App를 사용하여 간단한 클라이언트 측 렌더링 예제를 만들어보겠습니다.

## 단계 1: React 앱 만들기

```js
npx create-react-app my-react-app
cd my-react-app
```

## 단계 2: 클라이언트 측 렌더링 구현하기



[src/App.js 파일]

```js
// src/App.js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // 앱이 로드된 후 데이터를 가져오기 위한 로직
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export default App;
```

# 각 접근 방식의 비교 및 언제 사용해야 하는지

두 가지 방법에는 각각 장단점이 있습니다. SSR과 CSR 중 어떤 것을 선택할지는 애플리케이션의 특정 요구 사항에 따라 다릅니다. 일반적인 지침은 다음과 같습니다:



SSR을 사용해보세요:

- SEO를 개선하고 싶을 때.
- 초기 성능을 향상시키고 싶을 때.

CSR을 사용해보세요:

- 매우 상호 작용형 애플리케이션을 갖고 있을 때.
- 더 빠른 초기 로드를 원할 때.



# 요약

요약하자면, SSR과 CSR은 웹 페이지를 렌더링하는 데 사용되는 서로 다른 방법론입니다. SSR은 SEO 및 초기 성능 향상에 도움이 되지만, CSR은 보다 인터랙티브한 경험을 제공합니다. 둘 중 어떤 것을 선택할지는 애플리케이션의 목표와 구체적인 요구 사항에 따라 다릅니다.

애플리케이션을 디자인할 때 사용자 요구 사항, 성능 요구 사항, 그리고 선택 사항이 검색 엔진에서 콘텐츠의 가시성에 어떻게 영향을 미칠지를 고려해야 합니다. 많은 경우, SSR과 CSR을 결합한 "수분화" 기술을 사용하는 것이 최상의 선택일 수 있습니다. 프로젝트의 고유한 특성에 따라 실험하고 조정해보세요.

이 문서가 도움이 되었다면 망설이지 말고 팔로우, 구독, 박수를 부탁드립니다. 감사합니다!