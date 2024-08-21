---
title: "Reactjs 앱에서 Axios 인터셉터를 사용하여 토큰 새로 고침 후 실패한 요청을 반복하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Repeating Failed Requests After Token Refresh in Axios Interceptors for Reactjs Apps"
link: "https://medium.com/@sina.alizadeh120/repeating-failed-requests-after-token-refresh-in-axios-interceptors-for-react-js-apps-50feb54ddcbc"
isUpdated: true
---

![RepeatingFailedRequestsAfterTokenRefreshinAxiosInterceptorsforReactjsApps_0.png](/assets/img/RepeatingFailedRequestsAfterTokenRefreshinAxiosInterceptorsforReactjsApps_0.png)

현대 웹 애플리케이션에서 API에 HTTP 요청을 보내는 것은 개발 프로세스의 중요한 부분입니다. 인기 있는 JavaScript 라이브러리 중 하나인 Axios는 React.js 애플리케이션에서 HTTP 요청을 보내는 과정을 간소화합니다. 그러나 안전한 API 및 토큰 기반 인증과 관련된 경우 토큰 만료를 원활하게 처리하는 것이 중요합니다. 이 기사에서는 토큰 새로 고침 프로세스 중에 발생한 모든 요청이 새로운 액세스 토큰으로 자동으로 반복되도록 하는 방법을 살펴봅니다.

## Axios Interceptors 이해하기

Axios 인터셉터는 HTTP 요청과 응답을 전역적으로 가로채고 변환할 수 있는 미들웨어입니다. 이는 요청에 인증 헤더를 추가하거나 오류 처리, 토큰 관리와 같은 작업을 처리할 때 특히 유용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// React.js 프로젝트에서 Axios 설정하기
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com",
});

// 전역 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청 구성 수정하기, 예: 헤더 추가
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 전역 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 필요에 따라 응답 데이터 수정하기
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
```

## 토큰과 리프레시 토큰

액세스 토큰과 리프레시 토큰은 웹 애플리케이션을 보호하는 데 필수적입니다. 액세스 토큰은 보호된 리소스에 액세스할 수 있는 짧은 수명의 토큰입니다. 반면에 리프레시 토큰은 새로운 액세스 토큰을 얻기 위해 사용할 수 있는 장기간 수명의 토큰입니다.

```js
// 백엔드에서 토큰과 리프레시 토큰을 생성하고 관리하기
// 이 코드는 일반적으로 서버 측 로직의 일부입니다
const generateAccessToken = (user) => {
  // 액세스 토큰 생성 및 서명하기
  // 액세스 토큰 반환
};

const generateRefreshToken = (user) => {
  // 리프레시 토큰 생성 및 서명하기
  // 리프레시 토큰 반환
};
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Axios 인터셉터를 사용하여 토큰 만료 처리하기

접근 토큰이 만료되었을 때, Axios 인터셉터를 사용하여 토큰 만료를 자동으로 감지하고 토큰 갱신을 시작할 수 있습니다.

```js
// 자동 토큰 갱신을 위한 Axios 인터셉터 구현
const axiosInstance = axios.create({ baseURL: "https://api.example.com" });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 접근 토큰이 만료되었습니다. 토큰을 갱신합니다.
      try {
        const newAccessToken = await refreshAccessToken();
        // 새 접근 토큰으로 요청 헤더를 업데이트합니다.
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 원래 요청을 다시 시도합니다.
        return axiosInstance(error.config);
      } catch (refreshError) {
        // 토큰 갱신 오류를 처리합니다.
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);
```

## 토큰 갱신 후 실패한 요청 다시 시도하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

토큰 갱신 중에는 토큰 만료로 인해 일부 요청이 실패할 수 있습니다. 이 문제를 해결하기 위해 우리는 실패한 요청을 저장하고 새로운 액세스 토큰을 획득한 후 다시 시도할 수 있는 요청 대기열을 구현할 수 있습니다.

```js
// Axios 인터셉터에서 요청 대기열 구현하기
import { AxiosRequestConfig } from 'axios';

// 다시 시도 대기열 항목의 구조를 정의합니다.
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// 요청 대기열을 보유할 목록을 생성합니다.
const refreshAndRetryQueue: RetryQueueItem[] = [];

// 여러 토큰 갱신 요청을 방지하기 위한 플래그
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // 액세스 토큰을 갱신합니다.
          const newAccessToken = await refreshAccessToken();

          // 새로운 액세스 토큰으로 요청 헤더를 업데이트합니다.
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 새 토큰으로 대기열에 있는 모든 요청을 다시 시도합니다.
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // 대기열을 비웁니다.
          refreshAndRetryQueue.length = 0;

          // 원래 요청을 다시 시도합니다.
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 오류를 처리합니다.
          // 모든 저장소를 지우고 사용자를 로그인 페이지로 리다이렉션할 수 있습니다.
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      // 원래 요청을 대기열에 추가합니다.
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // 상태 코드가 401이 아닌 경우에는 Promise 거부를 반환합니다.
    return Promise.reject(error);
  }
);
```

## 설명:

- 다시 시도 대기열 항목 구조: 다시 시도 대기열 항목(RetryQueueItem)의 구조를 정의합니다. 이는 해당 요청과 연결된 프라미스를 해결하거나 거부하는 resolve 및 reject 함수(요청과 관련된 프라미스를 해결하거나 거부하는 데 사용됨)와 원래 요청 구성(config)을 포함합니다.
- 요청 대기열 초기화: 토큰 갱신 후 다시 시도해야 하는 실패한 요청을 보유하기 위해 refreshAndRetryQueue라는 배열을 생성합니다.
- 토큰 갱신 플래그: isRefreshing 플래그는 여러 토큰 갱신 요청이 동시에 발생하는 것을 방지하는 데 사용됩니다. 한 번에 하나의 토큰 갱신 요청만 실행되도록 보장합니다.
- 응답 인터셉트: 응답을 받을 때 Axios가 인터셉트하여 상태 코드가 401인지 확인하여 액세스 토큰이 만료되었는지를 확인합니다.
- 토큰 갱신 프로세스: 액세스 토큰이 만료되었고 토큰 갱신이 이미 진행 중이지 않은 경우 (!isRefreshing), 토큰 갱신 프로세스를 시작합니다. 새 액세스 토큰을 기다리고 실패한 요청의 헤더를 새 토큰으로 업데이트합니다.
- 실패한 요청 다시 시도: 새 액세스 토큰을 획들한 후 refreshAndRetryQueue를 반복하며 업데이트된 구성을 사용하여 각 요청을 다시 시도합니다. 모든 요청을 다시 시도한 후 대기열을 비웁니다.
- 원래 요청 대기열에 추가: 요청이 토큰 갱신 중 401 오류를 만난 경우 토큰 갱신이 진행 중이므로 원래 요청 구성을 대기열에 추가합니다. 이러한 요청은 새 액세스 토큰을 사용할 수 있을 때 다시 시도됩니다.
- 401이 아닌 경우 거부: 상태 코드가 401이 아닌 경우 에러를 전파하기 위해 프로미스를 거부합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 코드는 모든 실패한 요청이 새 액세스 토큰으로 성공적인 토큰 새로 고침 후 자동으로 다시 시도되도록하며, 동시성을 효과적으로 관리하여 중복된 토큰 새로 고침 요청을 피합니다.

## React.js 애플리케이션에서 모두 통합하기

Axios 인터셉터를 React.js 프로젝트에 통합하여 토큰 만료를 처리하고 실패한 요청을 자동으로 반복하는 방법을 알아봅시다.

```js
// React.js 애플리케이션에서 Axios 인터셉터 설정
import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // 에러 처리, 토큰 새로고침 오류 포함
      });
  }, []);

  return <div className="App">{/* 앱을 렌더링하세요 */}</div>;
}

export default App;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 결론:

인증, 엑세스 토큰, 토큰 갱신, 그리고 자동으로 실패한 요청을 반복하는 처리는 안전하고 신뢰할 수 있는 React.js 애플리케이션을 구축하는 데 중요합니다. Axios 인터셉터는 이러한 측면을 관리하기 위한 강력한 솔루션을 제공하여 원활하고 안전한 사용자 경험을 보장합니다.

샘플 코드는 [여기](https://github.com/SinaMAlizadeh/axios-interceptors)에서 찾을 수 있습니다.
