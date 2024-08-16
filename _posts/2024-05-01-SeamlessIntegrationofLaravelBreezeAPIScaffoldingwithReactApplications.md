---
title: "Laravel Breeze API 스캐폴딩을 리액트 애플리케이션과 통합하기"
description: ""
coverImage: "/assets/img/2024-05-01-SeamlessIntegrationofLaravelBreezeAPIScaffoldingwithReactApplications_0.png"
date: 2024-05-01 17:28
ogImage: 
  url: /assets/img/2024-05-01-SeamlessIntegrationofLaravelBreezeAPIScaffoldingwithReactApplications_0.png
tag: Tech
originalTitle: "Seamless Integration of Laravel Breeze API Scaffolding with React Applications"
link: "https://medium.com/javascript-in-plain-english/seamless-integration-of-laravel-breeze-api-scaffolding-with-react-applications-60ed4b672bf1"
isUpdated: true
---




<img src="/assets/img/2024-05-01-SeamlessIntegrationofLaravelBreezeAPIScaffoldingwithReactApplications_0.png" />

## 소개

웹 개발의 끊임없이 발전하는 환경에서, 견고한 인증 메커니즘은 안전하고 확장 가능한 애플리케이션을 구축하는 데 중요합니다. Laravel Breeze는 웹 및 API용 강력한 인증 프레임워크 솔루션으로, 이 영역에서 등대 같은 역할을 합니다. 강력한 Laravel Sanctum 인증 시스템을 활용하여, Breeze는 기본적으로 매끄럽고 안전한 경험을 제공합니다.

본 문서에서는 Laravel Breeze API 프레임워크를 React 애플리케이션과 통합하는 복잡성에 대해 살펴보고, 두 강력한 프레임워크의 장점을 결합하는 방법을 살펴볼 것입니다.

<div class="content-ad"></div>

## 라라벨 백엔드 설정

저희의 여정은 라라벨 백엔드를 설정하는 것으로 시작됩니다. 새로운 라라벨 애플리케이션을 생성하고 다음 명령어를 사용하여 Breeze API 스캐폴딩을 설치합니다:

```js
# 라라벨 애플리케이션 생성
composer create-project laravel/laravel react-backend
cd react-backend

# Breeze 설치
composer require laravel/breeze
php artisan breeze:install api
```

이 명령어를 통해 백엔드를 위한 기반을 설정하고 필수적인 인증 스캐폴딩을 통합합니다. 설치 후에는 환경 파일의 FRONTEND_URL을 localhost:3000으로 업데이트하는 것이 필요합니다. 라라벨 세일이나 php artisan serve 명령어를 사용하여 애플리케이션을 실행할 수 있습니다. 브라우저에서 localhost:8000을 방문하여 간단한 테스트를 수행하면 응답의 일부로 앱 버전이 표시될 것이며, 이는 라라벨 백엔드가 리액트 앱의 요청을 처리할 준비가 되었음을 나타냅니다.

<div class="content-ad"></div>

## React 앱 설정

프론트 엔드로 전환하며, React 애플리케이션을 설정하기 위해 Create React App을 선택합니다. 아래 명령을 실행하여 React 앱을 초기화하세요.

```js
npx create-react-app breeze-react
cd breeze-react
yarn start
```

이를 통해 React 애플리케이션을 위한 기초를 설정하고, 더 많은 개발을 위한 견고한 기반을 마련합니다.

<div class="content-ad"></div>

## Axios 구성하기

React 애플리케이션에서 API 요청을 처리하기 위해 Axios를 활용합니다. 전역 Axios 클라이언트를 아래와 같이 추가해보세요:

```js
import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

export default axios
```

`withCredentials`를 `true`로 설정하여 교차 사이트 쿠키 액세스를 활성화할 수 있습니다. `.env` 파일에 `REACT_APP_BACKEND_URL=localhost:8000`을 추가하고, 이는 이전에 생성한 Laravel 백엔드 애플리케이션에 해당합니다.

<div class="content-ad"></div>

```js
REACT_APP_BACKEND_URL=http://localhost:8000
```

우리의 React 앱과 라라벨 백엔드 사이의 통신 링크를 설정합니다.

## CSRF 요청

라라벨 Breeze가 인증에 Sanctum을 활용하기 때문에 React 앱은 먼저 /sanctum/csrf-cookie 엔드포인트로 초기 요청을 보내야 합니다. 이는 인증에 중요하며, 로그인, 등록 및 비밀번호 잊어버리기와 같은 모든 비인증된 경로에서 수행되어야 합니다. 이 프로세스를 간소화하기 위해 hooks/auth.js 파일에 사용자 정의 후크를 만들어 CSRF 요청을 처리합니다.

<div class="content-ad"></div>

```js
// auth.js
import axios from ‘axios’;

export const useAuth = () => {
 const getCsrfToken = async () => {
 await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
 }

// 기타 인증 관련 함수들

return {
 getCsrfToken,
 // 기타 인증 관련 함수들
 };
};
```

## 로그인 API 통합

CSRF 처리를 위한 기본 작업이 완료되었으므로 이제 로그인 API를 통합해보겠습니다. 이에는 useAuth 훅에 함수를 추가하는 작업이 필요합니다:

```js
// auth.js
import axios from ‘axios’;

export const useAuth = () => {

 // 이전 코드
const login = async (credentials) => {
 await getCsrfToken();
 await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
 // 로그인 성공 또는 실패 처리
 };

// 기타 인증 관련 함수들

return {
 getCsrfToken,
 login,
 // 기타 인증 관련 함수들
 };
};
```

<div class="content-ad"></div>

이 기능은 로그인 API 호출을 시작하기 전 CSRF 토큰을 요청하는 프로세스를 캡슐화하여 안전하고 인증된 로그인 경험을 보장합니다.

## Laravel Breeze React

Laravel Breeze를 위해 맞춤화된 사전 구성된 React 애플리케이션 템플릿을 찾는 개발자들에게 Laravel Breeze React가 이상적인 솔루션으로 떠오릅니다. GitHub에서 제공되는 이 템플릿은 Laravel Breeze의 장점을 Vite의 효율성과 결합한 것입니다. 이 기능들과 스스로 쉽게 시작할 수 있는 빠른 시작 가이드를 살펴보겠습니다.

## 기능들

<div class="content-ad"></div>

1. 미리 구축된 UI 구성 요소: 라라벨 Breeze React는 Tailwind CSS를 사용하여 스타일이 적용된 로그인, 등록, 비밀번호 재설정, 대시보드 등의 미리 구축된 UI 구성 요소를 갖추고 있습니다. 이를 통해 공통 인증 관련 페이지에 대한 기반을 제공하여 개발을 가속화합니다.

2. Vite 4로 구축: Vite 4의 최신 기능과 성능 향상을 활용하여, 라라벨 Breeze React는 더 빠르고 효율적인 개발 경험을 보장합니다.

3. React Router 6: 이 템플릿은 효율적이고 동적인 클라이언트 사이드 라우팅을 위해 React Router 6을 채택하여 부드럽고 원활한 탐색 경험을 제공합니다.

4. 데이터 재확인을 위한 SWR: 사용자 데이터의 재확인을 용이하게 하기 위해 SWR (Stale-While-Revalidate)이 통합되어 있어, 애플리케이션이 서버 상태와 동기화되도록 보장합니다.

<div class="content-ad"></div>

5. ESLint: 코드 품질을 유지하고 최고의 실천 방법을 준수하기 위해, Laravel Breeze React는 정적 코드 분석을 위해 ESLint를 통합하고 있습니다.

## 빠른 시작 가이드

1. 저장소 복제: GitHub에서 Laravel Breeze React 저장소를 복제하여 시작해보세요.

```js
git clone https://github.com/nilanth/laravel-breeze-react
```

<div class="content-ad"></div>

2. 의존성 설치: 복제된 디렉토리로 이동하여 Yarn을 사용하여 프로젝트 의존성을 설치하세요.

```js
cd laravel-breeze-react
yarn install
```

3. 환경 설정: .env.example 파일을 .env로 복사하고 Laravel 백엔드의 URL을 지정하세요.

```js
VITE_APP_BACKEND_URL=http://localhost:8000
```

<div class="content-ad"></div>

4. 애플리케이션 실행: 개발 서버를 시작하려면 `yarn start` 명령을 실행하세요.

```js
yarn start
```

위 단계를 따라하면, 깨끗하고 기능적인 사용자 인터페이스를 갖춘 Laravel Breeze React 템플릿이 작동하는 것을 확인할 수 있을 거에요.

# 결론

<div class="content-ad"></div>

마지막으로, Laravel Breeze API 뼈대와 React 애플리케이션의 원활한 통합은 개발자들이 견고하고 안전하며 확장 가능한 웹 애플리케이션을 만들 수 있도록 돕습니다. 제시된 단계를 따라가면, 개발자들은 Laravel Breeze와 React의 강점을 결합한 안전한 인증 레이어를 구축할 수 있습니다. 수동 통합을 선택하든지, Laravel Breeze React와 같은 템플릿을 활용하든지, 결과물은 백엔드 인증 메커니즘과 프론트엔드 사용자 경험이 조화롭게 어우러진 것입니다. 이 통합은 개발을 효율적으로 만들 뿐만 아니라 현대적인 웹 애플리케이션을 구축하기 위한 견고한 기반을 보장합니다.

# 쉽게 설명하기 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 박수를 치고 작성자를 팔로우해 주세요 👏️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요