---
title: "React 애플리케이션 성능 향상을 위한 클라이언트 측 타임아웃 처리 방법"
description: ""
coverImage: "/assets/img/2024-05-12-EnhancingReactApplicationPerformancewithClient-SideTimeoutHandling_0.png"
date: 2024-05-12 18:55
ogImage: 
  url: /assets/img/2024-05-12-EnhancingReactApplicationPerformancewithClient-SideTimeoutHandling_0.png
tag: Tech
originalTitle: "Enhancing React Application Performance with Client-Side Timeout Handling"
link: "https://medium.com/@Prashank.jauhari/enhancing-react-application-performance-with-client-side-timeout-handling-01c8284a0e1f"
---


웹 개발의 동적인 세계에서 성능 최적화와 사용자 경험의 원할한 유지가 최우선 과제입니다. 비동기 요청을 처리할 때 성능에 상당한 영향을 미치는 과감실 처리에 대해 종종 간과되는 측면 중 하나입니다. 이 블로그 포스트에서는 JavaScript에서 Axios를 사용하여 클라이언트 측 타임아웃 처리를 통해 웹 애플리케이션의 성능과 신뢰성을 향상시키는 방법에 대해 살펴보겠습니다.

# 클라이언트 측 타임아웃 처리를 왜 해야 하는가요?

- 블로킹 방지: 기대 시간을 초과하는 동기식 요청은 다른 작업을 차단하여 응답성이 감소하고 성능이 저하될 수 있습니다.
- 빠른 오류 복구: 응답이 없는 서버로부터 무기한 대기하는 것은 나쁜 사용자 경험으로 이어질 수 있습니다. 클라이언트 측 타임아웃은 기대 응답 시간을 초과하는 요청을 빠르게 취소함으로써 빠른 오류 복구를 제공합니다.
- 리소스 소비 감소: 오랜 시간 동안 실행되는 요청은 네트워크 대역폭, 서버 리소스 및 클라이언트 측 메모리를 소비합니다. 지정된 시간 초과하는 요청을 취소함으로써 리소스를 절약하여 성능과 확장성을 향상시킬 수 있습니다.
- 사용자 경험 향상: 성능은 사용자 경험에 직접적으로 영향을 미칩니다. 클라이언트 측 타임아웃을 통해 사용자는 지연이 줄어들고 더 빠른 응용 프로그램을 경험할 수 있어 만족도와 참여도가 높아집니다.
- 오류 허용성 개선: 클라이언트 측 타임아웃은 네트워크 오류나 서버 타임아웃과 같은 예기치 않은 상황을 고품질로 처리하여 전체 응용 프로그램의 탄력성을 향상시킵니다.

# Axios를 사용한 클라이언트 측 타임아웃이 성능을 향상시키는 방법



이제, Axios를 사용하여 클라이언트 측 타임아웃 처리를 구현하는 방법을 살펴보겠습니다. Axios는 JavaScript를 위한 인기있는 HTTP 클라이언트입니다.

```js
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/";

const loginClient = axios.create({
    baseURL: API_BASE_URL
});

loginClient.interceptors.request.use(request => {
    request.headers["Accept"] = "application/json";
    return {
        ...request,
        signal: newAbortSignal(2000)
    };
}, error => {
    console.log("오류 발생", error);
});

function newAbortSignal(timeoutMs) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);
    return abortController.signal;
}

async function fetchPosts(req) {
    try {
        const posts = await loginClient({ url: "posts" });
        return posts;
    } catch (error) {
        console.log("오류", error);
        return { "data": { "error": true, "message": "서버가 응답하지 않습니다." } };
    }
}

const postService = {
    fetchPost: fetchPosts
};

export { postService };
```

이 코드에서:

- API를 가리키는 기본 URL이 있는 Axios 인스턴스 loginClient를 생성합니다.
- Interceptor가 설정되어 요청에 타임아웃 시그널이 부착되어서, 서버가 2000밀리초 이내에 응답하지 않으면 취소됩니다.
- newAbortSignal 함수는 지정된 기간 후 요청이 취소되도록 타임아웃이 있는 새로운 AbortController 인스턴스를 생성합니다.
- fetchPosts 함수는 API에서 게시물을 비동기적으로 가져옵니다. 요청이 성공하면 가져온 게시물을 반환하고, 타임아웃 또는 네트워크 실패와 같은 오류가 발생하면 해당 오류를 잡아서 사용자 정의 오류 응답을 반환합니다.



클라이언트 측에서의 타임아웃은 요청을 다시 시도하면 성공할 수 있는 경우에 도움이 됩니다. 예를 들어, 백엔드가 3개의 서버에서 호스팅되고 있고 1개의 서버가 응답하지 않는 경우, 요청을 취소하고 다시 시도하는 것이 더 나은 선택입니다.