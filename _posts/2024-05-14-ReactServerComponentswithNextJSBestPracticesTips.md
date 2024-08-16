---
title: "React Server Components와 NextJS Best Practices, 팁"
description: ""
coverImage: "/assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_0.png"
date: 2024-05-14 11:30
ogImage: 
  url: /assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_0.png
tag: Tech
originalTitle: "React Server Components with NextJS: Best Practices , Tips"
link: "https://medium.com/@harshvsj/react-server-components-with-nextjs-best-practices-tips-500fe62fe4bb"
isUpdated: true
---




React Server Components (RSCs)는 React 애플리케이션의 서버 측 렌더링(SSR)에 대한 생각 방식을 변경할 것으로 약속합니다. 이 개념은 개발자 커뮤니티 내에서 긍정적인 관심을 불러일으켰어요. Next.js가 이제 RSCs를 지원함에 따라, 개발자들은 전통적인 싱글 페이지 애플리케이션에 일반적으로 연관된 복잡성 없이 SSR을 받아들일 수 있게 되었습니다. 그러나, 새로운 프레임워크나 기술에는 항상 개발자가 알아야 할 도전과 함정이 따르게 됩니다.
이 가이드는 NextJS와 함께 RSCs를 탐험하려는 프론트엔드 개발자를 대상으로 합니다.

## 서버 측 렌더링에 대한 간단한 소개:

서버 측 렌더링은 자바스크립트 코드를 실행하고, 서버 측에서 웹 페이지의 초기 HTML을 생성한 후, 완전히 렌더링된 페이지가 브라우저로 전달됩니다.

이 방식에는 몇 가지 장점이 있습니다:



- SEO 순위 향상: 검색 엔진이 이미 HTML로 렌더링된 페이지 컨텐츠를 쉽게 색인화할 수 있습니다.
- 빠른 성능: 브라우저가 서버로부터 HTML을 받자마자 페이지 컨텐츠의 렌더링을 시작할 수 있습니다. 이는 인지되는 성능을 최적화합니다.
- 접근성: JavaScript를 비활성화한 사용자도 페이지 컨텐츠를 볼 수 있습니다.

전통적인 클라이언트 렌더링:

![이미지](/assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_0.png)

서버 측 렌더링:




![React Server Components with Next.js Best Practices and Tips](/assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_1.png)

RSC와 함께 사용할 때 고려해야 할 몇 가지 최상의 실천 방안을 살펴보겠습니다.

## 서버-클라이언트 경계 이동하기:

NextJS 13+에서는 기본적으로 트래디셔널 페이지 라우터 대신 App 라우터를 제공합니다. 이 경계를 이해하는 것은 효과적인 컴포넌트 관리에 중요합니다. App 라우터를 사용하면 우리가 생성하는 모든 컴포넌트는 클라이언트로 명시되지 않는 한 서버 컴포넌트로 간주됩니다.
https://nextjs.org/docs/app/building-your-application/routing




지금 '서버 클라이언트 경계'가 뭔가요?

이것은 NextJS의 서버 및 클라이언트 구성 요소 사이의 가상의 경계입니다. 서버 구성 요소는 엄격히 서버 측에서 처리되어 클라이언트 번들의 일부로 다운로드되지 않습니다.

이 경계는 어떻게 정의되나요?

이전에 설명했듯이, App 라우터의 모든 구성 요소는 기본적으로 서버 구성 요소이며 클라이언트로 지정되지 않는 한입니다.



그래서, 클라이언트 구성 요소를 지정하는 방법은 무엇인가요?

클라이언트 번들의 일부로 구성 요소가 해석되도록 하려면 JavaScript/TypeScript 파일의 맨 위에 'use client'를 언급해야 합니다.

![이미지](/assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_2.png)

서버 측으로 이동할 컴포넌트와 클라이언트 측으로 이동할 컴포넌트를 선택하는 방법:



서버 구성 요소 (데이터 가져오기): 서버 구성 요소를 루트 구성 요소로 설정하는 것이 좋습니다. 루트 구성 요소는 모든 클라이언트 구성 요소를 감싸야 합니다. 이 구성 요소의 목적은 API 호출을 수행하고 내부 구성 요소를 위한 래퍼 HTML을 생성하는 것입니다. 서버 구성 요소의 장점 중 하나는 민감한 데이터(인증/로그인 정보)를 처리하는 데 사용할 수 있다는 것입니다.

클라이언트 구성 요소 (상호작용): 상호작용이 많은 하위 구성 요소로 설정해야 합니다. 이 구성 요소들은 훅 같은 기능을 사용할 필요가 있습니다. Redux와 같은 상태 관리 도구는 클라이언트 구성 요소에서만 사용할 수 있습니다. 이들은 부모 구성 요소로부터 데이터를 prop drilling을 통해 전달받을 수 있습니다.

## 우선 순위에 따른 사전 렌더링:

사전 렌더링은 NextJS의 가장 강력한 기능 중 하나입니다. 브라우저가 웹페이지를 요청할 때 NextJS는 클라이언트 및 서버 구성 요소를 사용하여 사전 렌더링된 HTML을 생성합니다. 이는 백그라운드에서 NextJS/React가 상호작용을 위해 구성 요소를 업데이트하는 동안 초기 페이지 콘텐츠를 빠르게 전달하는 데 도움이 됩니다.
그렇다면 '우선 순위에 따른 사전 렌더링'이란 무엇을 의미할까요?
NextJS는 초기 페이지 로드 시 고객에게 표시되는 부분과 그렇지 않은 부분을 모두 사전 렌더링합니다. 이는 느린 네트워크에서 로드할 때 FCP (첫 콘텐츠 렌더링) 지연이 몇 초까지 발생할 수 있습니다.
예를 들어 드롭다운을 개발 중이라고 가정해 봅시다. 일반적으로 초기 페이지 로드 시 드롭다운 제목만 표시되고 실제 콘텐츠는 마우스를 가져가면 활성화됩니다. 따라서 이상적으로는 컴포넌트를 분할하고 요청 시 부분을 동적으로 로드해야 합니다.



![이미지](/assets/img/2024-05-14-ReactServerComponentswithNextJSBestPracticesTips_3.png)

페이지 전체에 최적화되면 웹페이지의 FCP(첫 번째 콘텐츠 표시)가 줄어들고 페이지가 더 빠르게 렌더링됩니다.

## 동적/레이지 로딩:

위 주제를 더 확장하기 위해 웹페이지 전체에 대한 리액트 컴포넌트의 레이지 로딩 또는 동적 로딩으로 많은 최적화를 수행할 수 있습니다. 모든 것을 사전 렌더링할 필요는 없습니다.
'react.lazy' 또는 Next/dynamic과 함께 동적 임포트를 사용할 수 있습니다.



리액트.lazy는 좋지만 클라이언트 측에서 컴포넌트를 렌더링하지 않는 옵션을 제공하지 않습니다. 컴포넌트를 가져올 때 'ssr: false' 플래그를 사용하여 서버 측에서 렌더링되지 않도록 할 수 있습니다.

## 서버 컴포넌트와 CSS:

서버 컴포넌트는 발전 중이지만 몇 가지 제한 사항이 여전히 존재합니다. 서버 컴포넌트로 HTML을 렌더링할 수 있지만, 기기별로 지나치게 구체적이거나 CSS가 많이 사용된 컴포넌트는 피하는 것이 좋습니다. 오직 드문드문한 HTML/CSS만 남기는 주요 이유 중 하나는 서버가 웹 페이지를 요청하는 기기를 모르기 때문에 기기별 HTML 블록을 렌더링하는 것을 방지하기 때문입니다.

모든 최상의 실천 방법을 모두 포함하지는 않겠지만 RSCs를 시작하는 데 도움이 되리라 생각됩니다.