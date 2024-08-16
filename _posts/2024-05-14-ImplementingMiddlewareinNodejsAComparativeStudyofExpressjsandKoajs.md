---
title: "Nodejs에서 Middleware 구현하기 Expressjs와 Koajs의 비교 연구"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_0.png"
date: 2024-05-14 15:39
ogImage: 
  url: /assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_0.png
tag: Tech
originalTitle: "Implementing Middleware in Node.js: A Comparative Study of Express.js and Koa.js"
link: "https://medium.com/bitsrc/implementing-middleware-in-node-js-a-comparative-study-of-express-js-and-koa-js-a93f2ebd867c"
isUpdated: true
---





<img src="/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_0.png" />

## BACK-END DEVELOPMENT

# Introduction

<img src="/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_1.png" />




안녕하세요! 미들웨어는 요청 및 응답 객체에서 작동하는 함수로, 종종 이러한 객체들을 최종 라우트 핸들러에 도달하기 전에 정보를 변경하거나 추가하거나 처리하는 방식으로 작동하기 때문에 서버 측 프로그래밍의 중요한 부분이 되었습니다.

이러한 미들웨어의 유틸리티를 고려하면, 서버 측 기술들은 종종 이러한 도구의 개발과 사용을 용이하게 하는 프레임워크를 제공합니다. 본 문서에서는 Node.js 생태계에서 두 가지 인기 있는 프레임워크인 Express.js와 Koa.js에 대해 다룹니다.

## Express.js와 Koa.js

Express.js는 Node.js를 위한 표준 서버 프레임워크로 인정받고 있으며 강력한 미들웨어 시스템을 포함한 강력한 기능들로 웹 개발의 풍경을 형성하는 데 중요한 역할을 하고 있습니다. 반면에 Koa.js는 Express.js를 개발한 팀에 의해 개발된 Node.js를 위한 최신 웹 프레임워크로, 더 작고 표현력이 뛰어나며 웹 애플리케이션과 API를 위한 훨씬 견고한 기반을 제공하려고 합니다. 이 프레임워크는 핵심에 어떤 미들웨어도 번들로 제공하지 않아 개발자들에게 더 많은 제어와 자유를 제공합니다.



## 사례 연구

이 문서는 Express.js와 Koa.js의 미들웨어 구현 능력에 중점을 두고 깊이 있는 비교를 제공합니다. 또한 인증, 권한 부여, 자세한 요청 분석 로깅 및 책 요청 로깅 및 유효성 검사와 같은 예시들을 탐구합니다. 이러한 예시들은 실제 사용 사례인 약학 마이크로서비스를 통해 설명될 것입니다. 이 서비스는 의약품 목록을 관리하고 새로운 의약품을 필요할 때 매입하여 추적하는 역할을 담당합니다.

# Express.js를 이용한 미들웨어 구현

![이미지](/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_2.png)



## Express.js: 간단한 개요

Express.js 또는 Express는 Node.js를 위한 강력한 백엔드 웹 애플리케이션 프레임워크로 널리 알려져 있습니다. 그 간결함, 유연성, 확장성으로 칭찬받고 있으며, MEAN/MERN 스택(MongoDB, Express, Angular/React, Node.js)의 필수 구성 요소이기도 합니다. 간소한 성격에도 불구하고, 라우팅, 템플릿 엔진, 미들웨어, 오류 처리 등의 기능을 포함한 강력한 기능을 자랑합니다.

## Express.js가 미들웨어를 처리하는 방식

Express의 핵심은 미들웨어 시스템입니다. 미들웨어는 요청 객체(req), 응답 객체(res), 및 응용 프로그램의 요청-응답 주기 내의 다음 미들웨어 함수에 접근 권한이 있는 함수들입니다. 이들은 코드를 실행하거나 요청 및 응답 객체를 변경하며 요청-응답 주기를 종료하거나 다음 미들웨어 함수에 제어를 전달할 수 있습니다.



이 미들웨어 파이프라인은 개발자가 중요한 유연성을 제공하여 애플리케이션의 고유한 요구 사항에 맞춰 미들웨어 기능을 추가하고 계층화할 수 있도록 합니다.

## Express 미들웨어 예시

의약품 마이크로서비스 시나리오를 살펴보면 Express를 사용하여 필요한 미들웨어 기능을 구현하는 방법을 알아볼 수 있습니다. 인증(Authentication), 권한 부여(Authorization), 분석을 위한 요청 로깅(Request Logging) 및 도서 요청 로깅 및 유효성 검사(Book Request Logging & Validation)가 포함됩니다. 

인증 미들웨어 — 인증은 사용자, 프로세스 또는 시스템의 신원을 확인하는 과정이며, Express에서는 미들웨어를 사용하여 유효 자격 증명이 있는지 확인하기 위해 요청 헤더를 검사하여 들어오는 요청을 인증할 수 있습니다.



```js
function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  // 토큰을 확인하고 계속 진행
  // ...
  next();
}
```

인증 미들웨어 — 인증 후에 사용되는 인가는, 인증된 사용자가 어떤 자원에 액세스할 수 있는지 결정하는 것이며, 다시 한 번 Express 미들웨어가 유용하게 사용됩니다.

```js
function authorize(req, res, next) {
  const user = req.user;
  if (!user || !user.isAdmin) return res.status(403).send('Unauthorized access.');

  next();
}
```

로깅 미들웨어 — 그리고 우리는 로깅에 도달했습니다. 로깅은 애플리케이션 활동 추적과 디버깅에 중요하며, 여기 Express 미들웨어를 사용해 요청 세부 정보를 로깅할 수 있습니다.




```js
function logger(req, res, next) {
  console.log(`요청 방법이 ${req.method}이고 URL이 ${req.url}인 요청을 받았습니다. 시간: ${Date.now()}`);
  next();
}
```

도서 요청 로깅 및 유효성 검사 미들웨어 — 재고에 새로운 약품을 추가하는 경로와 같은 특정 경로를 다룰 때, 미들웨어는 요청 데이터를 유효성 검사하고 요청을 로그에 남길 수 있습니다.

```js
function validateAndLogBookRequest(req, res, next) {
  // 요청 데이터 유효성 검사 (Joi와 같은 라이브러리 사용 가능)
  // 유효하지 않으면 '400 Bad Request' 응답 반환

  // 도서 요청 로깅
  console.log(`도서 요청이 ${req.body.drugName}인 요청을 받았습니다. 시간: ${Date.now()}`);

  next();
}
```

## 더 알아보기:



# 미들웨어 구현을 위한 Koa.js

<img src="/assets/img/2024-05-14-Nodejs에서의미들웨어구현Expressjs와Koajs의비교연구_3.png"/>

Koa.js 또는 간단히 Koa는 Express 팀이 디자인한 웹 프레임워크로, 더 현대적이고 최신 솔루션으로 웹 애플리케이션과 API를 위한 표현력이 풍부하고 견고하며 가벼운 기반을 제공하려고 합니다. Koa는 핵심 내부에 미들웨어를 번들로 제공하지 않으며 대신, 서버를 빠르고 즐겁게 작성할 수 있게 하는 우아한 메서드 모음을 제공합니다.

## Koa.js가 미들웨어를 처리하는 방법



Koa는 미들웨어 처리 방식에 혁신적인 접근을 제공합니다. 최신 JavaScript 기능인 특히 ES6 제너레이터 함수를 활용하여 콜백을 제거하고 에러 처리를 간소화함으로써 미들웨어 스택을 간단하게 만들고 여러 종류의 미들웨어 함수를 관리하는 복잡성을 줄입니다.

Koa 미들웨어의 주요 차이점은 제너레이터 함수를 사용하며 실행을 일시 중지하고 재개할 수 있는 yield 키워드를 사용한다는 점입니다. 이는 미들웨어 함수가 어떻게 그리고 언제 실행되는지에 대한 높은 수준의 제어를 제공합니다.

## Koa.js 미들웨어 예시

약학 마이크로서비스 시나리오를 계속해가며, Express로 했던 것과 같은 미들웨어 함수를 만드는 방법을 살펴보겠습니다: 인증, 권한 부여, 요청 로깅 및 도서 요청 로깅 및 유효성 검사.



인증 미들웨어 — 익스프레스처럼, Koa에서도 미들웨어를 사용하여 제공된 자격 증명을 확인하여 들어오는 요청을 인증할 수 있습니다.

```js
const auth = async (ctx, next) => {
  const token = ctx.headers['auth-token'];
  if (!token) ctx.throw(401, 'Access Denied');

  // 토큰을 확인하고 계속 진행합니다
  // ...
  await next();
}
```

인가 미들웨어 — 인증된 사용자에 대한 자원 접근 가능성을 결정하기 위해 Koa 미들웨어를 사용할 수도 있습니다.

```js
const authorize = async (ctx, next) => {
  const user = ctx.user;
  if (!user || !user.isAdmin) ctx.throw(403, 'Unauthorized access.');

  await next();
}
```



Logging Middleware — Koa의 로깅 미들웨어는 수신된 요청의 세부 정보를 기록하여 디버깅 및 분석을 지원합니다.

```js
const logger = async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
```

책 요청 로깅 및 유효성 검사 미들웨어 — 재고에 새로운 약물을 추가하는 라우트와 같은 특정 라우트는 데이터 유효성 검사와 로깅을 위해 Koa 미들웨어를 사용할 수 있습니다.

```js
const validateAndLogBookRequest = async (ctx, next) => {
  // 요청 데이터 유효성 검사 (다시 말해, Joi나 다른 라이브러리를 사용할 수 있음)
  // 유효하지 않은 경우 '400 잘못된 요청' 오류 발생

  // 책 요청 기록
  console.log(`Received a book request for ${ctx.request.body.drugName} at ${new Date().getTime()}`);

  await next();
}
```



# 사례 연구: 제약 마이크로서비스에서 미들웨어 구현하기

![image](/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_4.png)

Node.js에서 Express와 Koa를 사용하여 미들웨어를 실제로 구현하는 방법에 대해 더 깊이 이해하기 위해, 제약 마이크로서비스의 사례 연구를 살펴보겠습니다. 이 마이크로서비스는 약물 목록을 제공하고 필요할 때 새로운 약물을 재고에 등록할 수 있는 권한이 있는 사용자에게 이 서비스를 제공합니다.

## 우리의 사용 사례 시나리오



이 시나리오에서는 네 가지 유형의 미들웨어를 구현해야 하므로, 다시 한 번 정리해보겠습니다:

- 사용자 자격 증명을 확인하기 위한 인증(Authentication)
- 리소스 접근을 제어하기 위한 권한 부여(Authorization)
- 분석을 위해 들어오는 요청의 세부 내용을 추적하는 요청 로깅(Request Logging)
- 새로운 약품을 재고에 추가하는 요청을 기록하고 유효성을 검사하는 Book Request Logging and Validation

여기서, Express와 Koa를 사용하여 각 유형의 미들웨어에 대한 코드 조각을 제공하며, 이 두 인기있는 Node 프레임워크의 미들웨어 접근 방식의 유사점과 차이점을 관찰할 수 있습니다.

## Express.js 구현



우리는 필요한 라이브러리를 요구하고, 미들웨어 함수를 정의한 다음, 이러한 미들웨어 함수를 사용하여 서버 라우트를 설정할 것입니다.

```js
const express = require('express');
const app = express();

// 인증 미들웨어
function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('액세스 거부됨');

  // 토큰 확인 및 계속 진행
  // ...
  next();
}

// 권한 미들웨어
function authorize(req, res, next) {
  const user = req.user;
  if (!user || !user.isAdmin) return res.status(403).send('인가되지 않은 액세스입니다.');

  next();
}

// 로깅 미들웨어
function logger(req, res, next) {
  console.log(`요청 방식 ${req.method} 요청을 받음: ${req.url}, 시간: ${Date.now()}`);
  next();
}

// 책 요청 로깅 및 유효성 검사 미들웨어
function validateAndLogBookRequest(req, res, next) {
  // 요청 데이터 유효성 검사 (Joi 또는 다른 라이브러리 사용 가능)
  // 유효하지 않은 경우 '400 잘못된 요청' 응답 반환
  
  // 책 요청 로깅
  console.log(`책 요청 받음: ${req.body.drugName}, 시간: ${Date.now()}`);

  next();
}

// 서버 라우트 설정
app.use(logger); // 모든 라우트에 로깅 사용
app.use('/api/drugs', auth, authorize); // '/api/drugs' 라우트에 인증 및 권한 사용
app.use('/api/book', validateAndLogBookRequest); // '/api/book' 라우트에 책 요청 로거 및 유효성 검사 사용

// 요청 수신 대기
app.listen(3000, () => {
  console.log('서버가 포트 3000에서 대기 중');
});
```

## Koa.js 구현 방법

이제 Koa에서 동등한 내용을 살펴봅시다.



```js
const Koa = require('koa');
const app = new Koa();

// 인증 미들웨어
const auth = async (ctx, next) => {
  const token = ctx.headers['auth-token'];
  if (!token) ctx.throw(401, '액세스 거부');

  // 토큰 확인 및 진행
  // ...
  await next();
}

// 권한 부여 미들웨어
const authorize = async (ctx, next) => {
  const user = ctx.user;
  if (!user || !user.isAdmin) ctx.throw(403, '사용 권한이 없습니다.');

  await next();
}

// 로깅 미들웨어
const logger = async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

// 책 요청 로깅 및 유효성 검사 미들웨어
const validateAndLogBookRequest = async (ctx, next) => {
  // 요청 데이터 유효성 검사 (Joi 또는 다른 라이브러리 사용 가능)
  // 잘못된 경우 '400 잘못된 요청' 오류 발생

  // 책 요청 로깅
  console.log(`Received a book request for ${ctx.request.body.drugName} at ${new Date().getTime()}`);

  await next();
}

// 서버 경로 설정
app.use(logger); // 모든 경로에 로거 사용
app.use(auth, authorize); // 모든 경로에 인증과 권한을 사용
app.use(validateAndLogBookRequest); // 모든 경로에 책 요청 로거 및 유효성 검사 사용

// 요청 수신 대기
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 수신 대기 중입니다.');
});
```

이 간단한 예제에서는 모든 요청에 대한 로깅, 의약품 자원에 대한 인증 및 권한 부여, 그리고 책 요청 로깅 및 유효성 검사를 위해 미들웨어를 사용했습니다. Express와 Koa 사이의 구현이 매우 유사하다는 점을 알 수 있습니다. 주요 차이점은 Koa가 더 읽기 쉽고 유지보수하기 쉬운 코드를 위해 async/await 구문을 사용한다는 것입니다.

# Express.js vs Koa.js: 두 미들웨어의 이야기

<img src="/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_5.png" />




Node 마이크로서비스를 개발할 때 Express와 Koa 중 어떤 것을 선택할지는 특정 프로젝트 요구 사항, 팀이 프레임워크에 익숙한 정도, 장기적인 유지 보수 관점 등 여러 요소에 따라 결정됩니다. 그럼 각 프레임워크의 강점을 살펴보고 미들웨어 처리 면에서 어떻게 비교되는지 알아봅시다.

## Express.js 장점

Express는 Koa보다 오랜 기간 사용되어 왔으며 현재 더 인기가 많습니다. 방대한 커뮤니티와 다양한 자원이 제공되어 많은 개발자들에게 특히 간단한 웹 애플리케이션이나 REST API 개발에 용이한 선택지입니다.

Express의 미들웨어 아키텍처는 간단하고 직관적으로 설계되어 있어, 가파른 학습 곡선 없이도 강력한 기능 세트가 필요한 애플리케이션에 좋은 선택으로 떠오릅니다.



## Koa.js의 강점

Koa는 미들웨어 관리에 대한 혁신적인 접근 방식을 제공하며, 비동기 함수의 사용으로 코드를 더 읽기 쉽고 유지보수하기 쉽게 만들어 줍니다. 이는 Node.js에서 보편적으로 발생하는 콜백 지옥(callback hell)을 제거해줍니다.

Koa는 더 가벼우면서도 표현력이 풍부하고 견고한 웹 애플리케이션과 API의 기반을 제공하며, async 함수를 통해 콜백을 버리고 에러 처리를 크게 향상시킬 수 있습니다. Koa는 자체적으로 미들웨어를 포함하지 않으며, 서버를 빠르고 즐겁게 작성할 수 있는 다양한 메서드를 제공합니다.

![2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_6](/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_6.png)



## 미들웨어 비교

익스프레스와 코아는 각자 독특한 방식으로 미들웨어를 다루는데, 첫 번째는 더 전통적인 방식을 사용합니다. 미들웨어 함수는 요청 및 응답 객체에 액세스할 수 있으며 직접 작동할 수 있어서 제어 흐름을 이해하고 디버깅하기 쉽습니다.

반면, 코아는 현대적인 JavaScript 기능을 사용하며, 미들웨어가 실행을 다음 미들웨어에 "양보"하고 스택이 해제될 때 재개될 수 있도록 흐름을 제어하게 합니다. 이는 코드를 더 선형적이고 쉽게 읽을 수 있게 만드는 반면, JavaScript 제너레이터 및 프로미스에 대한 깊은 이해가 필요합니다.



# 아직 끝나지 않았어요

![이미지](/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_8.png)

Express.js와 Koa.js를 비교한 결론을 도출해본 결과, Express는 직관적이고 간단한 방법론을 채택했으며, Koa는 JavaScript의 비동기 함수를 활용한 더 간략하고 현대적인 접근 방식을 취했습니다.

Middleware를 최적화하는 것은 Node.js 애플리케이션 전반의 성능을 향상시키는 일부분에 불과하다는 것을 명심해주세요. 저의 이전 글인 "이벤트 루프를 통해 Node.js의 성능 향상하기: 사례 연구를 통해 더 나은 성능"에서 Node가 이벤트 루프를 어떻게 활용해 효율적으로 작업을 처리하는지 심층적으로 살펴볼 수 있습니다. 이를 통해 성능 최적화에 대한 깊은 이해를 얻을 수 있습니다.



반면에, 애플리케이션의 구조와 효율성을 더욱 향상시키기 위해 이벤트 주도 아키텍처를 채택하는 것을 고려해보세요. 또 다른 기사인 "Node.js 및 TypeScript를 사용한 이벤트 주도형 REST API 만들기: 실용적인 접근"에서는 Node와 TypeScript를 활용하여 강력하고 효율적인 REST API를 구축하는 방법을 안내하고 있습니다. 여기서는 간단한 이벤트 주도 접근 방식에 중점을 두며 독자를 안내합니다.

즐거운 코딩하시고, 앞으로의 기사에서 더 많은 통찰과 실용적인 접근법을 공유하기를 기대하고 있습니다!

# 레고처럼 재사용 가능한 컴포넌트로 구성 가능한 앱을 구축하자

![이미지](/assets/img/2024-05-14-ImplementingMiddlewareinNodejsAComparativeStudyofExpressjsandKoajs_9.png)



Bit는 본질적으로 조립 가능한 소프트웨어를 개발하기 위한 오픈 소스 도구 모음입니다.

Bit를 사용하면 현대적인 웹 애플리케이션, UI 컴포넌트, 백엔드 서비스 또는 CLI 스크립트와 같은 어떤 소프트웨어 요소든 독립적이고 재사용 가능하며 조립 가능한 소프트웨어 단위로 개발할 수 있습니다. 어플리케이션 간에 어떤 컴포넌트라도 공유하여 협업을 더 쉽게 하고 더 빠르게 빌드할 수 있습니다.

조립 가능한 소프트웨어를 함께 만드는 100,000명 이상의 개발자 중 하나가 되어보세요.

다음 자습서로 시작해보세요:



# → 마이크로 프론트엔드: 비디오 // 안내

# → 코드 공유: 비디오 // 안내

# → 현대화: 비디오 // 안내

# → 모노 레포: 비디오 // 안내



# → 마이크로서비스: 비디오 // 가이드

# → 디자인 시스템: 비디오 // 가이드

# 추천 문서: