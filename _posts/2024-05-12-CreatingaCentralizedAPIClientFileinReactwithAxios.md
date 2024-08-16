---
title: "React에서 Axios를 사용하여 중앙 집중식 API 클라이언트 파일 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-CreatingaCentralizedAPIClientFileinReactwithAxios_0.png"
date: 2024-05-12 21:05
ogImage: 
  url: /assets/img/2024-05-12-CreatingaCentralizedAPIClientFileinReactwithAxios_0.png
tag: Tech
originalTitle: "Creating a Centralized API Client File in React with Axios"
link: "https://medium.com/@shruti.latthe/creating-a-centralized-api-client-file-in-react-with-axios-5e69dc27fdb1"
isUpdated: true
---




리액트 애플리케이션을 구축할 때 API와 상호 작용하는 경우, API 호출을 처리하는 깔끔하고 조직화된 방식을 유지하는 것이 중요합니다. 이를 달성하는 효과적인 방법 중 하나는 중앙 집중식 API 클라이언트 파일을 생성하는 것입니다. 이 튜토리얼에서는 Axios를 사용하여 이러한 파일을 구조화하는 방법을 살펴보겠습니다.

![이미지](/assets/img/2024-05-12-CreatingaCentralizedAPIClientFileinReactwithAxios_0.png)

# API 호출을 중앙 집중화하는 이유

API 호출을 중앙 집중화하는 것에는 여러 가지 이점이 있습니다:



- 모듈성: API 로직을 하나의 파일로 분리함으로써 응용 프로그램 전반에 걸쳐 모듈성과 재사용성을 촉진합니다.
- 조직화: 모든 API 관련 코드가 하나의 파일에 포함되어 있어 관리하고 유지하는 것이 더 쉬워집니다.
- 일관성: 일반적인 설정 및 오류 처리 전략을 한 곳에 정의함으로써 응용 프로그램 전체에서 일관성을 보장할 수 있습니다.

# Axios 설정하기

먼저 프로젝트에 Axios가 설치되어 있는지 확인하세요. npm이나 yarn을 통해 설치할 수 있습니다:

```js
npm install axios
# 또는
yarn add axios
```



# API 클라이언트 파일 만들기

API 호출을 처리할 apiClient.js 파일을 생성해 봅시다:

```js
// apiClient.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.example.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 여기에 인증 토큰과 같은 다른 헤더를 추가할 수 있습니다
  },
});

// 공통 API 메서드 정의
const _get = (url, config = {}) => {
  return apiClient.get(url, config);
};

const _delete = (url, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

// API 메서드 내보내기
export { _get, _delete, _put, _post };t api;
```

위 파일에서:



- Axios 인스턴스를 생성하여 기본 URL과 기본 헤더를 설정합니다.
- 각 엔드포인트에 해당하는 다양한 API 기능을 정의합니다.

환경 변수 설정: 먼저, 각 환경에 맞게 환경 변수를 설정해야 합니다. 일반적으로 각 환경에 대한 .env 파일을 생성하여 이 작업을 수행할 수 있습니다. 예를 들어:

- .env.development: 개발 환경을 위한 변수를 포함합니다.
- .env.qa: QA 환경을 위한 변수를 포함합니다.
- .env.staging: 스테이징 환경을 위한 변수를 포함합니다.
- .env.production: 프로덕션 환경을 위한 변수를 포함합니다.

각 .env 파일 내에서 기본 URL을 정의하세요.



REACT_APP_BASE_URL=https://api.example.com

- 다른 환경에 접속하기: 환경에 따라 (예: 개발, QA, 스테이징) React는 자동으로 해당 .env 파일을로드하고 BASE_URL이 그에 맞게 설정됩니다.

예를 들어, 개발 중일 때 React는 .env.development를로드하고 BASE_URL이 해당 파일에 지정된 값으로 설정됩니다.

마찬가지로 다른 환경 (예: QA, 스테이징)에서도 React는 해당 .env 파일을로드합니다.



2. React 컴포넌트에서의 사용법: 이전 예시에서 보았던 것처럼 React 컴포넌트에서 api 객체를 계속 사용할 수 있습니다. 기본 URL은 환경에 따라 동적으로 결정됩니다.

이 설정을 사용하면 다른 환경에 대해 쉽게 다른 기본 URL을 관리할 수 있어 React 애플리케이션이 실행 중인 환경에 따라 적절한 백엔드와 통신할 수 있도록 보장합니다.

# 컴포넌트에서 API 클라이언트 사용하기

이제 React 컴포넌트에서 이 API 클라이언트를 사용하는 방법을 살펴보겠습니다:



```js
import React, { useState, useEffect } from 'react';
import { _get, _post, _put, _delete } from './apiClient'; // 필요에 따라 경로를 조정하세요

function ExampleComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터 가져오기
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await _get('/data', { headers: { Authorization: 'Bearer 여기에 토큰 입력' } });
      setData(response.data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      // 에러 처리
    }
  };

  const addData = async () => {
    try {
      const newData = { name: '새 데이터' };
      await _post('/data', newData);
      fetchData(); // 추가 후 데이터 새로고침
    } catch (error) {
      console.error('데이터 추가 중 오류 발생:', error);
      // 에러 처리
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      await _put(`/data/${id}`, updatedData);
      fetchData(); // 업데이트 후 데이터 새로고침
    } catch (error) {
      console.error('데이터 업데이트 중 오류 발생:', error);
      // 에러 처리
    }
  };

  const deleteData = async (id) => {
    try {
      await _delete(`/data/${id}`);
      fetchData(); // 삭제 후 데이터 새로고침
    } catch (error) {
      console.error('데이터 삭제 중 오류 발생:', error);
      // 에러 처리
    }
  };

  return (
    <div>
      <h1>예시 컴포넌트</h1>
      <button onClick={addData}>데이터 추가</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => updateData(item.id, { name: '업데이트된 아이템' })}>업데이트</button>
            <button onClick={() => deleteData(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExampleComponent;
```

Axios에서 config 매개변수를 사용하면 HTTP 요청에 대한 추가 구성을 전달할 수 있습니다. 일반적으로 사용되는 구성에는 헤더, 쿼리 매개변수, 요청 시간 초과, 인증 토큰 등이 있습니다.

참고: axios.create()로 Axios 인스턴스를 만들 때 baseURL 옵션을 BASE_URL로 설정합니다. 이렇게 하면 이 Axios 인스턴스로 작성된 모든 요청에 기본 URL이 URL에 접두사로 붙습니다.

예를 들어, ExampleComponent에서 _get(`/data`)를 호출하면 Axios는 `https://api.example.com/data`로 GET 요청을 보냅니다.



# 결론

Axios를 사용하여 React 애플리케이션에서 API 호출을 중앙화하는 것은 API 로직을 관리하기 위한 깔끔하고 조직된 방법을 제공합니다. 중앙 집중화된 API 클라이언트 파일을 만들면 코드베이스에서 모듈화, 조직화 및 일관성을 달성할 수 있습니다. 이 방법을 통해 유지 보수가 간단해지며 애플리케이션 전체에서 코드 재사용을 장려합니다.

오늘부터 API 호출을 조직화하고 React 프로젝트에 가져다 주는 혜택을 경험해보세요!