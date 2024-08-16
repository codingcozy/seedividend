---
title: "익스프레스 게이트웨이 당신의 다음 API 게이트웨이 솔루션"
description: ""
coverImage: "/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_0.png"
date: 2024-05-14 13:28
ogImage: 
  url: /assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_0.png
tag: Tech
originalTitle: "Express gateway : Your next API Gateway Solution."
link: "https://medium.com/@tushar_chavan/express-gateway-your-next-api-gateway-solution-658587e37e11"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_0.png" />

안녕하세요 개발자 여러분! 이 블로그 포스트에 오신 것을 환영합니다. 이 포스트에서는 Express 게이트웨이에 대해 자세히 살펴보겠습니다. 왜 사용해야 하며 언제 사용해야 하는지, 그리고 어떤 문제를 해결할 수 있는지 알아봅시다. 시작해봅시다! 🚀

API 게이트웨이는 현대 소프트웨어 아키텍처에서 중요한 구성 요소로, 백엔드 서비스와 API에 대한 모든 클라이언트 요청의 단일 진입점 역할을 합니다. 인증, 권한 부여, 속도 제한 및 라우팅과 같은 작업을 처리하며 클라이언트와 다양한 마이크로서비스 간의 통신을 간소화합니다. 이러한 기능을 중앙 집중화함으로써 API 게이트웨이는 분산 시스템의 보안, 확장성 및 관리 용이성을 향상시킵니다. 인기 있는 API 게이트웨이 솔루션에는 Kong, AWS API 게이트웨이 및 Traefik 등이 있으며, 이러한 서비스를 관리하는 UI와 함께 훌륭한 API 관리 시스템을 제공하지만 Express 게이트웨이는 이 문제에 대한 오픈 소스 솔루션이며 우리가 곧 살펴볼 모든 편리한 구성을 제공합니다.

API 게이트웨이는 특히 분산 아키텍처에서 여러 마이크로서비스나 API를 관리할 때 사용해야 합니다. 통합된 진입점을 제공함으로써 클라이언트 액세스를 간소화하고 인증, 권한 부여 및 트래픽 관리와 같은 필수 기능을 제공합니다. 게다가 API 게이트웨이는 복잡한 서비스 지향 환경에서 보안 정책을 강화하고 잠재적인 위험을 완화하는 데 유용합니다.




![Express Gateway 이미지 1](/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_1.png)

![Express Gateway 이미지 2](/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_2.png)

Express Gateway는 미리 정의된 라우팅 규칙에 따라 들어오는 HTTP 요청을 가로채어 적절한 마이크로 서비스 또는 API로 보내는 방식으로 작동합니다. 인증, 권한 부여, 속도 제한 및 로깅과 같은 작업을 처리하여 클라이언트와 서비스 간의 안전하고 효율적인 통신을 보장합니다. Express Gateway의 정책 시스템은 사용자 정의 및 확장성을 허용하여 개발자가 특정 요구 사항에 맞게 조정할 수 있도록 합니다. Express Gateway에서 사용 가능한 정책 목록을 확인하고 그에 맞게 구성하는 방법을 알아봅시다.

이제 Express Gateway의 설치부터 시작하여 우리의 요구 사항에 맞게 구성하는 방법을 살펴봅시다.




```js
$ bun add -g express-gateway
```

- 익스프레스 게이트웨이를 추가합니다.

```js
$ eg gateway create
```

몇 가지 질문에 답하면 기본 구성으로 준비된 게이트웨이 프로젝트가 생성됩니다.



<img src="/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_3.png" />

- server.js: 게이트웨이의 진입점이며 구성이 로드되고 응용 프로그램이 API 엔드포인트를위한 포트 8080 및 관리 API 엔드 포인트를위한 포트 9876에서 수신 대기를 시작하는 위치입니다.
- system.config.yml: 게이트웨이의 시스템 수준 구성 및 글로벌 매개 변수가 정의되어 있으며 system.config.yml에 설명되어 있습니다. 이 구성 파일은 게이트웨이를 실행하는 데 사용되는 인프라 구성 설정을 설명합니다.
- gateway.config.yml: 게이트웨이의 모든 기능이 정의되어 있으며 gateway.config.yml에 설명되어 있습니다. 이 구성 파일은 게이트웨이의 마이크로 서비스 및 API 연산 전체를 한눈에 보여줍니다.
- models: models 디렉토리에는 Express Gateway 엔티티의 JSON 스키마를 설명하는 모델 구성 파일이 포함되어 있습니다. 이는 사용자 정의 및 확장 가능한 항목입니다.

Express Gateway 구성을 시도해보기 위해 각각 다른 포트 3000, 3001 및 3002에서 실행 중인 local-server에 세 개의 Express 서버를 만들었습니다.

<img src="/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_4.png" />



이제 gateway.config.yml을 구성하여 익스프레스 게이트웨이의 라우트에 마이크로 서비스를 포함시켜서 요청을 지정된 마이크로 서비스로 리디렉션할 수 있도록 설정하십시오.

```js
http:
  port: 8080
admin:
  port: 9876
  host: localhost
apiEndpoints:
  ms1:
    host: localhost
    paths: /api/ms1/*
  ms2:
    host: localhost
    paths: /api/ms2/*
serviceEndpoints:
  ms1:
    url: 'http://localhost:3000'
  ms2:
    url: 'http://localhost:3001'
policies:
  - basic-auth
  - cors
  - expression
  - key-auth
  - log
  - oauth2
  - proxy
  - rate-limit
pipelines:
  ms1:
    apiEndpoints:
      - ms1
    policies:
      - proxy:
          - action:
              serviceEndpoint: ms1
              changeOrigin: true
  ms2:
    apiEndpoints:
      - ms2
    policies:
      - proxy:
          - action:
              serviceEndpoint: ms2
              changeOrigin: true
```

- http: 익스프레스 게이트웨이가 수신하는 HTTP 요청의 포트를 지정합니다 (포트 8080).
- admin: 관리 인터페이스에 액세스하기 위한 포트 (9876) 및 호스트 (localhost)를 정의합니다.
- apiEndpoints: 지정된 경로를 기반으로 서로 다른 마이크로 서비스 (ms1 및 ms2)를 위한 엔드포인트를 구성합니다.
- serviceEndpoints: 서비스 엔드포인트 (ms1 및 ms2)를 해당 URL과 연결합니다.
- policies: API 라우트에 적용할 수 있는 사용 가능한 정책을 나열합니다. 기본 인증, CORS, 속도 제한 등이 포함됩니다.
- pipelines: 각 마이크로 서비스에 대해 처리 파이프라인을 정의하고 적용할 API 엔드포인트 및 정책을 지정합니다. 예를 들어, ms1에 대한 파이프라인은 요청을 ms1 서비스 엔드포인트로 프록시하고 출처 변경을 가능하게 합니다. 마찬가지로, ms2에 대한 파이프라인은 출처 변경이 가능한 상태로 요청을 ms2 서비스 엔드포인트로 프록시합니다.

게이트웨이 구성에 대해 더 알아보려면 이 링크를 따르세요 [링크](내부 링크 주소를 입력하세요).



이제 구성 변경으로 인해 localhost:8080/api/ms1/에 요청을 보낼 수 있으며 해당 요청을 serviceEndpoint에 리디렉션할 것입니다.

또한 다음은 이 구성을 편집할 수 있는 관리자 API 엔드포인트를 사용할 수 있습니다. 아래는 예시입니다.

- API 엔드포인트 생성

![이미지](/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_5.png)



- 서비스 엔드포인트 생성

![이미지](/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_6.png)

- 서비스 엔드포인트용 파이프라인 생성

![이미지](/assets/img/2024-05-14-ExpressgatewayYournextAPIGatewaySolution_7.png)



이 요청에서 다른 가능한 정책도 구성하세요.

apiEndpoints, serviceEndpoint 및 piplines을 나열할 수도 있습니다. 이러한 엔드포인트에 대해 GET 요청을 만들어 읽을 수 있습니다. 익스프레스 게이트웨이는 관리자 API를 자체 도메인이나 서브도메인으로 유지하고 이를 퍼블릭으로 사용할 수 없도록 권장하며, 이러한 엔드포인트에 인증을 추가할 수도 있습니다.

관리자 API 엔드포인트에 대한 자세한 정보는 다음 문서를 읽는 것을 권장합니다.

API 관리 여정에 착수하면서 익스프레스 게이트웨이의 공식 문서를 탐험하는 것을 잊지 마세요. 이 강력한 도구에 대한 이해와 능력을 향상시키는 데 소중한 자원으로 작용합니다. 즐거운 코딩👨‍💻️!