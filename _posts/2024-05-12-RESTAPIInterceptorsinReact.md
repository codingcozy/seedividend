---
title: "리액트에서 REST API 인터셉터 사용하기"
description: ""
coverImage: "/assets/img/2024-05-12-RESTAPIInterceptorsinReact_0.png"
date: 2024-05-12 21:59
ogImage: 
  url: /assets/img/2024-05-12-RESTAPIInterceptorsinReact_0.png
tag: Tech
originalTitle: "REST API Interceptors in React"
link: "https://medium.com/@uthpala-isiru/rest-api-interceptors-in-react-26662e8b6b56"
---


![이미지](/assets/img/2024-05-12-RESTAPIInterceptorsinReact_0.png)

리액트는 프론트엔드 자바스크립트 라이브러리로 잘 알려져 있어요. 리액트의 주요 책임은 웹 애플리케이션의 사용자 인터페이스(UI)를 개발하는 것이에요. 애플리케이션의 UI 구성 요소와 상태를 관리할 때, 리액트는 외부 소스나 백엔드 시스템과 상호 작용하기 위해 API(응용 프로그램 프로그래밍 인터페이스)에 의존해요. API는 서버에서 데이터를 가져오는, 사용자 상호 작용에 기반한 UI 업데이트, 인증, 권한 부여, 그리고 데이터 조작과 같은 다양한 기능을 다룰 때 핵심적인 역할을 합니다.

리액트에서의 API 사용 예시:

- 데이터 가져오기: 리액트 컴포넌트들은 데이터베이스나 제3자 서비스와 같은 외부 소스로부터 데이터를 가져오기 위해 API 요청을 합니다.
- 서버 통신: API는 프론트엔드가 서버와 상호 작용할 수 있는 표준화된 방법을 제공하여, 폼 제출, 데이터 업데이트, 정보 검색 등의 작업을 수행할 때 사용돼요.
- 상태 관리: API는 리액트 컴포넌트가 서버로부터 상태를 업데이트하거나 검색할 수 있도록 요청을 보낼 수 있게 하여 상태 관리를 용이하게 해줍니다.
- 인증과 권한 부여: API는 리액트 컴포넌트가 로그인, 등록, 권한 부여 프로세스를 다루기 위해 인증 서버와 통신할 수 있도록 지원해줘요.
- 제3자 통합: API를 통해 제3자 서비스와 통합하고, 소셜 미디어 공유, 결제 처리, 외부 데이터 소스 접근과 같은 기능들을 사용할 수 있게 됩니다.



가능한 접근 방법 중에서 리액트 애플리케이션에서 REST API를 소비하는 두 가지 인기있는 방법은 액시오스(Axios) (프로미스 기반 HTTP 클라이언트)와 페치 API(Fetch API) (브라우저에 내장된 웹 API)입니다. 이 글에서는 액시오스와 페치 API에 대한 인터셉터를 어떻게 구현할 수 있는지에 대해 논의해보겠습니다.

인터셉터는 리액트 자체에서 제공하는 기능은 아니지만, 주로 액시오스나 페치 API와 같은 라이브러리와 함께 사용됩니다. 우리는 다음과 같은 이유로 인해 리액트에서 인터셉터가 필요합니다.

- 중앙화된 요청 처리: 개발자가 전역 요청 핸들러를 정의하여 나가는 HTTP 요청을 가로채는 방법을 제공합니다. 이 접근 방식은 헤더 추가, 로깅, 오류 처리를 여러 요청에 일관되게 적용할 때 유용합니다.
- 전역 오류 처리: 응답 인터셉터를 정의함으로써 개발자는 서버에서의 오류 응답을 가로채고 사용자에게 오류 메시지를 표시하거나 오류 유형에 따라 특정 작업을 수행하는 등 일관된 오류 처리 로직을 구현할 수 있습니다.
- 요청 변형: 서버로 보내기 전에 요청 구성 또는 페이로드를 수정하는 것을 가능하게 합니다. 이를 통해 인증 토큰 추가, 요청 데이터 변형, 사용자 지정 요청 로직 적용 등의 작업을 수행할 수 있습니다.
- 응답 변형: 응답이 호출 코드로 전달되기 전에 응답 데이터나 구성을 수정합니다. 이 기능은 응답 데이터 구문 분석, 데이터 구조 정규화, 특정 응답 조건 처리 등과 같은 작업에 유용합니다.
- 권한 처리: 리액트 애플리케이션 내에서 권한 로직을 관리하는 데 자주 사용됩니다. 나가는 요청을 가로채어 개발자가 인증 토큰이나 자격 증명을 확인하고 이를 요청 헤더에 추가하여 허가된 요청이 서버로 전송되도록 할 수 있습니다.

이 글의 나머지 부분에서는 가장 인기 있는 REST API 메서드인 액시오스와 페치 API에 인터셉터를 구현하는 방법을 살펴보겠습니다.



## Axios를 위한 인터셉터 구현

API 헤더에 API 키를 추가해야 하는 상황이라고 가정해봅시다. 인터셉터를 사용하여 이를 어떻게 처리할 수 있는지 알아봅시다.

이를 위해 axiosRequestInterceptor라는 인터셉터를 만들었는데, 이는 axios API에 API 키를 추가합니다. 이는 일종의 공통 함수이므로 모든 REST 엔드포인트에서 재사용할 수 있습니다.

```js
import axios from "axios";

export const axiosRequestInterceptor = (baseEndPoint, apiKey) => {
  const api = axios.create({
    baseURL: baseEndPoint, // API의 기본 URL
  });

  api.interceptors.request.use(
    (config) => {
      // 만약 API 키를 사용한다면
      if (apiKey) {
        config.headers["x-api-key"] = apiKey;
      }
      // 만약 Bearer 토큰을 사용한다면
      // config.headers.Authorization = `Bearer ${apiKey}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};
```



헤더에 대한 API 키 이외에도 인터셉터를 사용하여 Axios 요청에 대한 타임아웃 및 콘텐츠 유형과 같은 다양한 추가 사항을 할 수 있습니다. 

요청 뿐만 아니라 axios.interceptors.response를 사용하여 Rest 엔드포인트의 응답에 대한 인터셉터를 정의할 수도 있습니다. 자세한 내용은 Axios 문서를 참조해주세요.

## Fetch API Intercepters

Fetch API에 대한 인터셉터를 구현하는 두 가지 방법이 있습니다.



- Monkey patching 방법 사용
- fetch-intercept 라이브러리 사용

Monkey patching 방법을 사용하여 Fetch API 인터셉터 구현하기

Monkey patching은 프로그래밍에서 사용되는 기술로, 기존 코드나 기능을 수정하는 것을 의미합니다. Fetch API에 대한 인터셉터를 구현할 때 monkey patching은 fetch()와 같은 Fetch API 메서드의 동작을 업데이트하여 인터셉터를 삽입하고 사용자 정의 기능을 추가하는 것을 의미합니다.

다음은 Monkey patching 방법을 사용하여 엔드포인트에 API 토큰을 헤더에 추가하는 방법을 나타냅니다.



```js
익스포트된 상수 fetchAPIRequestInterceptor을 사용하여 Fetch API 인터셉터를 설정합니다. endPoint, apiKey 및 config를 매개변수로 받습니다. 

export const fetchAPIRequestInterceptor  = async (endPoint, apiKey, config) => {
    const { fetch: originalFetch } = window;
    window.fetch =  async (...args) => {
        //setting the api token for the header
        config.headers = config.headers || {};
        config.headers["x-api-key"] = apiKey;
        config.method = 'GET';
        try {
            const response = await originalFetch(endPoint, config);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };  
}

fetch-intercept npm 라이브러리를 사용한 Fetch API 인터셉터입니다.

먼저, 아래 명령어를 사용하여 npm 라이브러리를 설치해야 합니다.

npm i fetch-intercept



인터셉터는 Fetch API 호출을 위해 인터셉터를 등록할 수 있는 register 메서드를 사용하여 정의할 수 있습니다. 이는 request, requestError, response, responseError 콜백을 포함하는 객체를 가지고 있습니다. 여기서 register 메서드는 인터셉터를 등록할 때 사용하는 unregister 메서드를 반환합니다. 필요하지 않을 때 인터셉터를 등록 해제할 수 있습니다. 아래는 인터셉터 구현을 나타냅니다.

import * as fetchIntercept from 'fetch-intercept';

export const fetchInterceptRequestInterceptor  = async (endPoint, apiKey) => {
    const unregister = fetchIntercept.register({
        request: function (url, config) {
            config = { ...config };
            const modifiedUrl = endPoint;
            config.headers = config.headers || {};

            // API 토큰 설정
            return [modifiedUrl, config];
        },
      
        requestError: function (error) {
            return Promise.reject(error);
        },
      
        response: function (response) {
            return response;
        },
      
        responseError: function (error) {
            return Promise.reject(error);
        },
      }); 
}

## 요약

인터셉터는 응용 프로그램에서 요청이나 응답을 가로채고 필요에 따라 수정할 수 있는 함수 또는 미들웨어입니다. 이를 통해 인증, 로깅 또는 오류 처리와 같은 일반적인 작업을 중앙 처리할 수 있습니다. React 컨텍스트에서는 Axios와 Fetch API 모두를 위해 인터셉터를 정의할 수 있습니다. 본문에서는 Axios 및 Fetch API에 대한 인터셉터를 어떻게 구현하는지 설명합니다.



내 Git 저장소에서 구현 세부사항을 참조하세요.