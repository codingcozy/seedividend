---
title: "리액트 GraphQL 대 REST API 포괄적 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-ReactGraphQLvsRESTAPIComprehensiveGuide_0.png"
date: 2024-05-14 12:50
ogImage: 
  url: /assets/img/2024-05-14-ReactGraphQLvsRESTAPIComprehensiveGuide_0.png
tag: Tech
originalTitle: "React: GraphQL vs. REST API: Comprehensive Guide"
link: "https://medium.com/dev-genius/react-graphql-vs-rest-api-comprehensive-guide-32442a567332"
---



![그래픽](/assets/img/2024-05-14-ReactGraphQLvsRESTAPIComprehensiveGuide_0.png)

GraphQL 또는 REST API를 React 기반 애플리케이션에 사용할지 결정하는 것은 매우 중요합니다. 이 결정은 앱의 성능, 확장 가능성, 데이터 처리 효율성 및 개발 수명주기에 도입되는 복잡성 수준에 심각한 영향을 미칩니다. 이 포괄적인 가이드는 두 가지의 차이점을 명확히하고 정보를 얻을 수 있는 선택을 도와줄 것으로 기대됩니다!

# REST API란 무엇인가요?

REST (Representational State Transfer)는 웹 개발에 사용되는 아키텍처 스타일로, 클라이언트-서버 접근 방식을 사용합니다. 서버는 클라이언트가 요청한 리소스의 표현을 제공합니다. 리소스는 URL로 식별되며 이러한 리소스는 POST, GET, PUT, DELETE와 같은 HTTP 방식으로 표시되는 CRUD 작업을 사용하여 조작할 수 있습니다. 최근 몇 년간 REST API의 활용이 많이 증가했습니다.




```js
// REST API를 사용하여 데이터 가져오기
fetch("https://api.example.com/items") 
  .then(res => res.json())
  .then(data => console.log(data));
```

위 예시에서는 REST API 엔드포인트 /items에 대한 호출이 해당 항목들을 JSON 형식으로 반환합니다.

# GraphQL이란?

2015년 Facebook에서 개발된 GraphQL은 REST API에 대안으로 효율적이고 선언적이며 유연한 데이터 쿼리 언어입니다. 이를 통해 클라이언트는 서버에서 어떤 데이터가 필요한지 정확히 지정하고 원하는 방식으로 가져올 수 있어, REST API와 관련된 오버-패칭 또는 언더-패칭 문제를 제거합니다.



```js
// GraphQL을 사용하여 데이터를 가져옵니다
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: `{ 
      items { 
        id, 
        name 
      } 
    }`
  })
})
.then(res => res.json())
.then(data => console.log(data.data));
```

위의 예제에서 요청의 query 속성은 GraphQL 서버에서 각 항목의 id와 이름을 가져옵니다.

# GraphQL과 REST API의 차이

## 1. 데이터 가져오기



REST API

REST 기반 아키텍처에서는 귀하의 앱이 관련 데이터를 가져 오기 위해 다양한 엔드포인트로 여러 요청을 해야합니다.

```js
fetch("https://api.example.com/users/1") // ID가 1인 사용자 가져 오기
.then(/* */)

fetch("https://api.example.com/users/1/posts") // ID가 1인 사용자의 게시물 가져 오기
.then(/* */)
```

위의 예시처럼 특정 사용자가 만든 데이터(게시물)를 가져 오는 것은 REST API에서 여러 네트워크 요청이 필요합니다.



GraphQL

GraphQL을 사용하면 관련 데이터를 하나의 요청으로 모아 가져올 수 있으며, 정확히 필요한 데이터만 가져와서 과다 또는 미비한 데이터 문제를 줄일 수 있어요.

```js
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: `{
      user(id: 1) {
        name,
        posts {
          title,
          body
        }
      }
    }`
  })
})
.then(/* */)
```

위 코드는 한 요청으로 사용자와 해당 사용자의 게시물을 가져오는 거에요.



## 2. Over-fetching and Under-fetching

REST API

RESTful 서비스에서 응답의 모양과 크기는 서버에 의해 결정됩니다. 종종 endpoint가 충분한 정보를 제공하지 않아 추가 요청이 필요한 under-fetching이 발생하거나, 필요 이상의 정보가 전송되어 over-fetching이 발생할 수 있습니다.

GraphQL



GraphQL의 주요 이점 중 하나는 클라이언트가 필요한 데이터를 정확히 지정하여 over-fetching 또는 under-fetching을 피할 수 있다는 것입니다. 서버는 요청의 형태를 따르는 응답을 반환합니다.

## 3. 버전 관리

REST API

버전 관리는 REST 기반 서비스에서 일반적입니다. 이는 API를 발전시키는 것이 어려워 새로운 API 버전이 처리할 필요가 있는 파괴적인 변경을 피하기 위함입니다.



GraphQL

GraphQL을 사용하면 서버는 자신의 기능을 공개하고 클라이언트는 필요한 요청을 구성하며, 이로 인해 버전 관리가 필요 없어집니다.

## REST API와 GraphQL을 언제 사용해야 할까요?

REST API를 사용해야 하는 경우:



- 당신의 앱이 간단하거나 데이터 요구 사항이 복잡하지 않다면 REST API 설계에 더 익숙한 팀이 있다면 REST를 사용하세요.
- 데이터가 자주 변경되지 않고 중첩된 엔티티를 포함하지 않는다면 REST를 사용하세요.

GraphQL을 사용해야 하는 경우:

- 애플리케이션이 중첩된 엔티티를 포함하거나 그들 사이에 복잡한 관계가 있는 경우.
- 네트워크를 통해 로드되는 데이터를 줄이고 싶은 경우.
- 앱이 애플리케이션 부하 및 코드베이스 크기 측면에서 확장될 것으로 예상되는 경우.

마지막으로, GraphQL과 REST 중 어느 것을 선택할지는 프로젝트 요구 사항, 팀의 기술 수준, 데이터의 성격 등 여러 가지 요인에 달려 있습니다. 두 가지 방식에는 각각의 장점이 있으며 상황에 따라 어느 쪽이든 완벽하게 어울릴 수 있습니다. 이러한 주요 차이를 이해하면 프로젝트 성공에 중요한 결정을 내릴 수 있게 될 것입니다.



# 만약 즐거우셨다면 박수와 구독을 잊지 마세요! 👏

열정적인 건축가들의 디스코드 커뮤니티에 가입해보세요: [https://discord.gg/QyXEsb4C](https://discord.gg/QyXEsb4C)