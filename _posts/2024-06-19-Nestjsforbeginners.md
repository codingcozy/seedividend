---
title: "초보자를 위한 Nestjs"
description: ""
coverImage: "/assets/img/2024-06-19-Nestjsforbeginners_0.png"
date: 2024-06-19 23:15
ogImage: 
  url: /assets/img/2024-06-19-Nestjsforbeginners_0.png
tag: Tech
originalTitle: "Nest.js for beginners"
link: "https://medium.com/@ckekula/nest-js-for-beginners-0da843caccb2"
---


Nest.js는 TypeScript를 사용하여 확장 가능한 서버 측 애플리케이션을 구축하기 위한 Node.js 프레임워크입니다.

![Nest.js](/assets/img/2024-06-19-Nestjsforbeginners_0.png)

# Nest.js를 선택하는 이유

아마 이미 알고 계시다시피, 인기 있는 Node.js 프레임워크 중 하나는 Express입니다. 디자인상으로 매우 미니멀하게 설계되어 있습니다. 몇 가지 기능을 소개하여 서버 측 애플리케이션을 구축할 수 있지만, 백엔드의 전반적인 아키텍처는 사용자에게 달려 있습니다.

<div class="content-ad"></div>


![Nestjsforbeginners_1](/assets/img/2024-06-19-Nestjsforbeginners_1.png)

Express 문서를 살펴보면 라우팅, 미들웨어, 일부 오류 처리를 수행할 수 있는 몇 가지 기능을 제공합니다. 이렇게 보면 이것이 거의 전부입니다. 이러한 아키텍처의 부재는 굉장히 유연하다는 점을 의미합니다. Express로 원하는 대로 거의 무엇이든 할 수 있습니다.

그러나 프로젝트나 팀이 성장함에 따라 여러분은 매우 쉽게 스파게티로 변할 수 있다는 것을 발견할 것입니다. 여러분은 실제로 규칙과 구조가 필요합니다. 특히 GraphQL, REST 또는 Swagger와 같은 것들을 통합해야 할 때 이것들은 매우 중요합니다.

이제 Nest가 나와서 말합니다: "에이, 우리가 서버 쪽 애플리케이션의 아키텍처를 돌보겠다고. 그리고 가장 좋은 부분은 무엇일까요? Express를 여전히 사용할 수 있다는 것입니다!"


<div class="content-ad"></div>

# Nest.js가 작동하는 방식

Nest.js는 빠른 개발과 예측 가능하고 가독성 있는 코드를 위해 express (Fastify도 포함)를 활용하는 도구 모음을 제공합니다. 기본적으로 REST 및 GraphQL API를 지원하거나 Laravel이나 Ruby on Rails와 같은 프레임워크를 사용하여 모델-뷰-컨트롤러(MVC) 설계 패턴을 활용하여 풀 스택 애플리케이션을 구축하는 데 사용할 수 있습니다.

데이터베이스 작업을 처리하거나 보안을 다루는 등 서버 측 애플리케이션에서 수행할 수 있는 작업을 상상할 수 있는 모듈이 풍부하게 포함되어 있습니다.

![Nest.js 이미지](/assets/img/2024-06-19-Nestjsforbeginners_2.png)


<div class="content-ad"></div>

Nest.js에는 훌륭한 문서가 있어요. 모든 핵심 개념에 대한 개요를 제공할 뿐만 아니라 테스팅, 데이터베이스 연결, 작업 스케줄링, 큐, 이벤트, 웹소켓, GraphQL 등 다른 작업 방법에 대한 지침도 볼 수 있어요.

그리고 TypeScript에 매우 중점을 두고 있어요. OOP와 FP의 요소를 결합했는데, 데코레이터에 큰 비중을 두고 있어요. 스프링부트 프레임워크를 사용해봤다면 익숙할 수도 있겠죠.

# Nest CLI

Nest에는 자체 강력한 Command Line Tool이 있어요. nest new 명령어로 새 프로젝트를 손쉽게 만들 수 있어요.

<div class="content-ad"></div>

```js
> nest new server-side-app
```

이 명령은 Jest를 통해 미리 구성된 코드베이스를 제공하고, 타입스크립트를 설정하여 더 가독성이 있고 믿을만한 코드를 작성할 수 있도록 합니다. 이제 Nest.js로 시작할 준비가 되었습니다!

독자 여러분 감사합니다 🎉
