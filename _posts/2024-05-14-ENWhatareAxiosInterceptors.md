---
title: "한국어 Axios 인터셉터란 무엇인가요"
description: ""
coverImage: "/assets/img/2024-05-14-ENWhatareAxiosInterceptors_0.png"
date: 2024-05-14 12:08
ogImage: 
  url: /assets/img/2024-05-14-ENWhatareAxiosInterceptors_0.png
tag: Tech
originalTitle: "[EN] What are Axios Interceptors?"
link: "https://medium.com/@OzturkSirin/en-what-are-axios-interceptors-b0f68c645965"
---


![Axios Interceptors](/assets/img/2024-05-14-ENWhatareAxiosInterceptors_0.png)

인터셉터란 무엇인가요?
인터셉터는 프로그램의 기능을 확장하거나 수정하는 데 사용되는 디자인 패턴입니다. Axios에서 인터셉터는 HTTP 요청과 응답을 처리하는 데 사용되는 특별한 함수입니다. 요청 인터셉터를 사용하면 요청을 보내기 전에 작업을 수행할 수 있고, 응답 인터셉터는 서버에서 반환된 응답에 작업을 수행할 수 있습니다.

Axios 인터셉터를 사용해야 하는 이유는 무엇인가요?

- 재사용성과 모듈성.
- 오류 처리 용이성.
- 보안 제어 및 인가 유효성 검사 프로세스 용이성.
- 네트워크 문제 처리.
- 사용 편의성과 유연성.
- 성능 및 최적화.



Axios Interceptors의 사용법
간단한 사용법을 가지고 있고 Axios 내에서 추가 설정이 필요하지 않아 장점을 제공합니다.

```js
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': null
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전 수행할 작업
    console.log('요청을 보냅니다:', config);
    
    // 예를 들어, 각 요청에 세션 식별자를 추가할 수 있습니다.
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, 
  function (error) {
    // 요청 오류 발생 시 수행할 작업
    console.error('요청 오류:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // 응답이 성공했을 때 수행할 작업
    console.log('응답:', response.data);
    return response;
  },
  function (error) {
    // 응답 오류 발생 시 수행할 작업
    console.error('응답 오류:', error);
    
    // 예를 들어, 401 (Unauthorized) 오류 발생 시 세션이 만료된 것으로 가정할 수 있습니다.
    if (error.response.status === 401) {
      // 세션 새로 고침이나 로그인 페이지로 리다이렉트하는 등의 작업 수행 가능
      console.log('세션이 만료되었습니다. 리다이렉트 중...');
      // 예를 들어, 사용자를 로그인 페이지로 리다이렉트:
    }
    return Promise.reject(error);
  }
);

// 예시 요청

axiosInstance.get('/data')
  .then(response => {
    console.log('응답:', response.data);
  })
  .catch(error => {
    console.error('오류:', error);
  });

axiosInstance.post('/post-data', {
  // 전송할 데이터
  firstName: 'John',
  lastName: 'Doe'
})
.then(response => {
  console.log('응답:', response.data);
})
.catch(error => {
  console.error('오류:', error);
});
```

🚀🚀 이 예시처럼 들어오는 오류를 잡아 사용자에게 반환하거나 페이지 간에 리다이렉트할 수 있습니다.
콘솔에서 각 요청의 오류와 본문을 쉽게 보고 조치할 수 있습니다.

<img src="/assets/img/2024-05-14-ENWhatareAxiosInterceptors_1.png" />



### 이전 게시물