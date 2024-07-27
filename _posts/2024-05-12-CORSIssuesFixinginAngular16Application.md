---
title: "Angular16 애플리케이션에서 CORS 문제 해결하기"
description: ""
coverImage: "/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_0.png"
date: 2024-05-12 22:21
ogImage: 
  url: /assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_0.png
tag: Tech
originalTitle: "CORS Issues Fixing in Angular16 Application"
link: "https://medium.com/@srinathsree122/fixing-cors-issues-in-angular16-application-3d53d46dc845"
---



![이미지](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_0.png)

Cross-Origin Resource Sharing (CORS)은 웹 브라우저가 제한하는 필수적인 보안 메커니즘입니다.

CORS는 HTTP 헤더 기반 메커니즘으로, 서버가 브라우저가 리소스를로드 허용해야 하는 자신의 도메인, 스키마 또는 포트 이외의 모든 출처를 나타낼 수 있도록 허용합니다.

여기에서는 Angular 애플리케이션에서 CORS 문제를 해결하는 방법과 CORS 문제 없이 애플리케이션을 실행하는 방법을 논의할 것입니다.




<img src="/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_1.png" />

# CORS 문제를 어떻게 해결할 수 있을까요?

<img src="/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_2.png" />

- 적절한 헤더를 제공하기 위해 HTTP Interceptor를 생성하면 문제를 해결할 수 있습니다.
- 또 다른 방법은 Proxy.conf.js 파일을 생성하는 것입니다.



Angular 애플리케이션을 독립적으로 만들어 봅시다. 그리고 HTTP Interceptors를 생성해 보겠습니다.

![이미지](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_3.png)

인터셉터 파일 안에 다음 코드를 추가해주세요.

![이미지](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_4.png)



사이트를 설정하여 해당 사이트에 액세스할 수 있도록 허용할 수도 있습니다. "*" 와일드카드를 사용하여 모든 사이트에 액세스할 수 있도록 설정할 수 있습니다. 이것은 공개 API에만 사용해야 합니다. 비공개 API에는 *를 사용해서는 안 되며 대신 특정 도메인 또는 도메인이 설정되어야 합니다. 또한 와일드카드는 crossorigin 속성이 익명으로 설정된 요청에만 작동하며, 요청에 쿠키와 같은 자격 증명을 전송하는 것을 방지합니다.

```js
Access-Control-Allow-Origin: *
```
프라이빗 API에 모든 사이트가 액세스할 수 있도록 "*" 와일드카드를 사용하는 것은 좋지 않은 방법입니다.

일부 경우에는 헤더를 추가해도 CORS 문제가 해결되지 않을 수 있습니다. 이런 경우에는 프록시 서버를 추가하여 문제를 해결해야 합니다.



글로벌 수준에서 proxy.conf.js 파일을 추가해주세요

![그림](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_5.png)

해당 파일 안에 다음 코드를 추가해야 합니다

![그림](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_6.png)



proxy.conf.js 파일에 프록시 설정을 추가한 후에는 이제 angular.json 파일에 해당 파일을 다음과 같이 등록해야 합니다.

![Proxy Configuration](/assets/img/2024-05-12-CORSIssuesFixinginAngular16Application_7.png)

CORS 프록시를 사용하면 클라이언트와 서버 사이에 브릿지 역할을 하는 프록시 서버를 사용하여 CORS 오류를 우회할 수 있습니다. 그래서 대상 서버에 요청하는 대신에 요청을 대신하여 프록시 서버로 보냅니다. 요청은 다음과 같이 보입니다: https://proxy.com/https://server.com.

이 내용이 도움이 되었으면 좋겠네요!



"이 기사를 즐겼나요? 더 많은 유익한 콘텐츠를 위해 계속 연락을 유지하세요. 트위터와 링크드인에서 제를 팔로우하여 내 최신 기사, 튜토리얼, 발표 자료를 받아보세요. 함께 학습하는 여정을 떠나 새로운 아이디어를 탐험해봅시다! 놓치지 마세요, 지금 바로 팔로우하세요!"