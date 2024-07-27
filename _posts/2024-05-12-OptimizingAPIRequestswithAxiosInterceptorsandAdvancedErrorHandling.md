---
title: "Axios를 활용하여 API 요청 최적화하기 Interceptors 및 고급 오류 처리"
description: ""
coverImage: "/assets/img/2024-05-12-OptimizingAPIRequestswithAxiosInterceptorsandAdvancedErrorHandling_0.png"
date: 2024-05-12 22:42
ogImage: 
  url: /assets/img/2024-05-12-OptimizingAPIRequestswithAxiosInterceptorsandAdvancedErrorHandling_0.png
tag: Tech
originalTitle: "Optimizing API Requests with Axios: Interceptors and Advanced Error Handling"
link: "https://medium.com/@sarathadhithya/optimizing-api-requests-with-axios-interceptors-and-advanced-error-handling-3f69b1e05868"
---



![Alt text](/assets/img/2024-05-12-OptimizingAPIRequestswithAxiosInterceptorsandAdvancedErrorHandling_0.png)

프로젝트에서 API 통신의 참된 잠재력을 발휘해 보세요! 다재다능한 HTTP 클라이언트인 Axios를 살펴보고, 인터셉터와 견고한 에러 처리로 요청 관리를 어떻게 높일 수 있는지 알아보세요.

Axios와 기본 Fetch API는 JavaScript에서 HTTP 요청을 하는 도구이지만, 주요 차이점이 있습니다. Axios가 인기 있는 이유와 Fetch API와의 차이점을 강조한 비교입니다:

## 1. 사용 편의성 및 구문:



— Axios: 깔끔한 구문과 일관된 API를 제공하여 간단하게 사용할 수 있습니다. 그리고 메서드들은 Promises를 반환하여 비동기 작업을 쉽게 연결하고 처리할 수 있습니다.
— Fetch API: 강력하지만 더 많은 설명이 필요한 구문을 갖고 있으며, 다양한 HTTP 메서드나 헤더를 처리하기 위해서는 추가적인 보일러플레이트(boilerplate) 코드가 필요할 수 있습니다.

## 2. JSON 데이터 다루기:

— Axios: JSON 응답을 자동으로 구문 분석하여 JSON 데이터를 다루는 프로세스를 간단화합니다.
— Fetch API: 응답에서 JSON 데이터를 추출하려면 수동으로 .json() 메서드를 호출해야 합니다.

## 3. 인터셉터:



- Axios: Interceptors를 사용하여 HTTP 요청이나 응답이 .then() 또는 .catch() 블록에 도달하기 전에 전역적으로 가로채고 수정하는 것을 가능하게 합니다.
- Fetch API: 내장된 Interceptors가 없기 때문에 유사한 기능을 달성하려면 추가 코드 및 각 사용 지점에서 처리가 필요합니다.

## 4. 오류 처리:

- Axios: 견고한 오류 처리가 있으며 HTTP 오류 상태 (예: 404 또는 500)에 대해 자동으로 프라미스를 거부합니다.
- Fetch API: 응답의 ok 속성을 수동으로 확인해야 하며 오류는 자동으로 throw되지 않습니다.

Axios가 인기 있는 이유:
- 편리성: Axios는 개발자 친화적 인터페이스를 제공하여 명확한 구문으로 작업하기 쉽게 만듭니다.
- 기능이 풍부함: Interceptors, 자동 JSON 구문 분석 및 요청/응답 변환과 같은 내장 기능은 인기에 기여합니다.
- 일관된 동작: Axios는 Fetch API에 존재하는 일부 불일치에 대응하여 서로 다른 브라우저에서 일관된 동작을 보장합니다.



## Axios 시작하기

## 1. Axios 설치하기:

프로젝트에 Axios가 설치되어 있는지 확인하세요. npm 또는 yarn을 사용하여 설치할 수 있습니다:

```js
npm install axios
// 또는
yarn add axios
```



## 2. Axios 인스턴스를 가져와서 만들기:

API 요청을 만들 예정인 JavaScript 파일에서 Axios를 가져와주세요. 그리고 기본 URL, 헤더 등과 같은 기본 설정을 설정하기 위해 Axios 인스턴스를 만들어주세요. 이렇게 하면 다른 요청에서 동일한 설정을 재사용할 수 있어요:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    // 다른 공통 헤더를 추가해주세요
  },
});
```

## 3. 요청과 응답 인터셉터 처리:



```js
Axios는 요청과 응답을 전역적으로 처리하기 위해 인터셉터를 사용할 수 있습니다. 이는 헤더 추가, 오류 처리 등과 같은 작업에 유용합니다.

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 구성을 여기서 수정하세요 (예: 권한 헤더 추가)
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 응답 데이터를 여기서 수정하세요
    return response;
  },
  (error) => {
    // 응답 오류 처리
    return Promise.reject(error);
  }
);

## 4. 비동기 요청에 대해 Async/Await 사용:

클린하고 가독성이 좋은 비동기 코드를 위해 async/await 구문을 활용하세요:
```



```js
async function fetchData() {
  try {
    const response = await api.get('/endpoint');
    // 응답 데이터 처리
  } catch (error) {
    // 에러 처리
  }
}
```

## 5. 동시 요청 최적화:

여러 요청을 동시에 실행할 수 있는 경우 성능을 최적화하기 위해 Promise.all을 사용해보세요:

```js
async function fetchMultipleData() {
  try {
    const [data1, data2] = await Promise.all([
      api.get('/endpoint1'),
      api.get('/endpoint2'),
    ]);
    // 데이터 처리
  } catch (error) {
    // 에러 처리
  }
}
```



## 6. 요청 취소:

Axios는 요청 취소를 지원합니다. 이는 사용자가 요청이 완료되기 전에 페이지를 벗어날 때 불필요한 요청을 방지하는 데 유용할 수 있습니다:

```js
const source = axios.CancelToken.source();

try {
  const response = await api.get('/endpoint', {
    cancelToken: source.token,
  });
  // 응답 처리
} catch (error) {
  if (axios.isCancel(error)) {
    // 요청이 취소되었습니다
  } else {
    // 다른 오류 처리
  }
}

// 요청 취소하기
source.cancel('사용자에 의해 요청이 취소됨');
```

## 성공 및 오류 토스트와 함께 완전한 소스 코드



```js
import { toast } from 'react-hot-toast';
import Axios from 'axios';

const axios = Axios.create({
  // 여러분의 API 기본 URL로 변경하세요
  baseURL: 'https://fakerapi.it/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => {
    const data = response?.data;

    console.log(data);

    if (data?.message && typeof data?.message === 'string') {
      toast.success(data.message);
    } else if (data?.status && typeof data?.status === 'string') {
      toast.success(data.status + ` - 상태 코드: ${data.code}`);
    }

    // 필요에 맞게 변경하세요
    return data.data;
  },
  (error) => {
    const data = error.response.data;

    if (data?.message && typeof data?.message === 'string') {
      toast.error(data.message);
    } else if (data?.status && typeof data?.status === 'string') {
      toast.error(data.status + ` - 상태 코드: ${data.code}`);
    }

    return Promise.reject(data);
  }
);

axios.interceptors.request.use((config) => {
  let token = 'your-bearer-token';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 토큰이 없는 경우 처리
    // 로그인 페이지로 리디렉션하거나 적절한 조치를 취할 수 있습니다
  }

  return config;
});

export default axios;
```

axios 템플릿 코드를 문서에 추가했고, 아래 링크를 참조해주세요:

[GitHub Gist](https://www.0cb.tech/jbbch)
[실시간 코드 — StackBlitz](https://www.0cb.tech/fvopy)

' embed https://stackblitz.com/edit/vitejs-vite-uqovqp?embed=1&file=src%2Flib%2Faxios.js '
