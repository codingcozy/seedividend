---
title: "GraphQL 소개 2024 최신 가이드 붙이기"
description: ""
coverImage: "/assets/img/2024-06-22-GraphQLIntroduction_0.png"
date: 2024-06-22 14:33
ogImage: 
  url: /assets/img/2024-06-22-GraphQLIntroduction_0.png
tag: Tech
originalTitle: "GraphQL: Introduction"
link: "https://medium.com/@sanjanahumanintech/graphql-introduction-e422185b0a85"
---


아래는 위에 나타낸 html 태그를 Markdown 형식으로 변경한 것입니다.


![GraphQL Introduction](/assets/img/2024-06-22-GraphQLIntroduction_0.png)

GraphQL의 기초를 탐구하고, React 및 React Native과 같은 프론트엔드 프레임워크와 Apollo를 연결하는 방법을 배울 것입니다. 이를 통해 GraphQL, React, React Native 및 Apollo를 사용하여 현대적이고 효율적인 앱을 구축하는 방법을 이해할 수 있습니다.

## GraphQL이란?

GraphQL은 API를 위한 쿼리 언어입니다. Facebook에서 개발되었으며, 데이터를 더 효율적으로 가져오기 위한 솔루션으로 개발되었습니다.


<div class="content-ad"></div>

# GraphQL을 선택하는 이유

GraphQL을 사용하기 전

- REST API (Representational State Transfer Application Programming Interface)는 서로 다른 소프트웨어 시스템 간에 통신할 수 있는 표준화된 방법입니다.

REST API에서는 각 endpoint가 특정한 JSON 데이터 페이로드를 반환합니다. 필요한 필드만 필요하더라도 모든 요청에서 모든 내용을 반환합니다.

<div class="content-ad"></div>

## 제품 목록 가져오기

- HTTP 메소드: GET
- 엔드포인트: /api/products
- 설명: 모든 제품의 목록을 가져옵니다.

요청:

```js
GET /api/products/1
```

<div class="content-ad"></div>

답변:

Markdown 형식으로 표 태그를 변경합니다.

REST API의 디자인은 어플리케이션이 불필요한 요청을 많이 보내도록 할 수 있습니다. 왜냐하면 일부 데이터가 다른 엔드포인트에서 올 수도 있기 때문입니다.

즉, 특정 데이터에 대해 정보를 얻으려면 다른 HTTP 요청을 여러 번 보내야 할 수도 있습니다.

<div class="content-ad"></div>

빠르고 효율적인 앱에 대한 수요가 증가하는 가운데, Facebook은 REST API에서 이러한 문제점을 인식하였습니다.

2012년에 내부에서 GraphQL을 개발하기 시작하여, 2015년에 공개하게 되었습니다.

# GraphQL 작동 원리

이미 언급한 바와 같이, GraphQL은 쿼리 언어로, 필요한 데이터만 쿼리를 사용하여 가져오는 방식입니다.

<div class="content-ad"></div>

GraphQL을 사용하면:

- 관리해야 할 엔드포인트가 /graphql만 있어요.
- 데이터베이스, REST API, 클라우드 서비스, JSON 파일과 유연하게 통합할 수 있어요.

![그림](/assets/img/2024-06-22-GraphQLIntroduction_1.png)

일반적인 GraphQL 작업은 다음과 같이 진행돼요:

<div class="content-ad"></div>

- 데이터는 쿼리를 통해 GraphQL 서버에서 요청됩니다.
- 적절한 소스에서 데이터를 가져 오기위해 GraphQL 서버에서 함수가 호출됩니다.
- GraphQL 서버는 클라이언트에 응답을 반환합니다.

GraphQL은 API를 테스트하는 데 도움이되는 GraphiQL이라는 IDE와 함께 제공됩니다.

비주얼 스튜디오 코드용 GraphQL 확장 프로그램

![그림](/assets/img/2024-06-22-GraphQLIntroduction_2.png)

<div class="content-ad"></div>

# GraphQL의 주요 기능

데이터 선언적 가져오기: 클라이언트는 필요한 데이터의 형태와 크기를 지정합니다. 초과 가져오기(필요 이상의 데이터 검색)와 부족한 가져오기(필요 이하의 데이터 검색)를 피할 수 있습니다.

단일 엔드포인트: REST와 달리 각각 다른 리소스를 위한 여러 엔드포인트를 필요로 하지 않고 GraphQL은 모든 데이터에 접근하기 위한 단일 엔드포인트를 사용합니다.

강력한 타입화 스키마: 스키마는 쿼리할 수 있는 데이터 유형과 그들 간의 관계를 정의합니다.

<div class="content-ad"></div>

실시간 데이터 구독: 클라이언트는 데이터 변경 사항을 구독하여 실시간 업데이트를 받을 수 있습니다.

## GraphQL 쿼리의 기본 구조

다음은 제품을 가져오기 위한 간단한 GraphQL 쿼리입니다:

특정 ID로 단일 제품 가져오기:

<div class="content-ad"></div>

GraphQL 쿼리:

```js
query {
  product(id: 1) {
    id
    name
    price
    category
    description
  }
}
```

JSON 요청:

```js
{
  "query": "query { product(id: 1) { id name price category description } }"
}
```

<div class="content-ad"></div>

예시 응답:

```js
{
  "data": {
    "product": {
      "id": 1,
      "name": "노트북",
      "price": 999.99,
      "category": "전자제품",
      "description": "모든 컴퓨팅 요구 사항에 적합한 고성능 노트북."
    }
  }
}
```

새 제품 추가, 업데이트 또는 제품(Mutation)：

GraphQL 뮤테이션:

<div class="content-ad"></div>

```js
변이 {
  추가상품(입력: {
    이름: "태블릿",
    가격: 299.99,
    카테고리: "전자제품",
    설명: "긴 배터리 수명을 가진 가벼운 태블릿."
  }) {
    id
    이름
    가격
    카테고리
    설명
  }
}
```

JSON 요청:

```js
{
  "query": "mutation { addProduct(input: { name: \"Tablet\", price: 299.99, category: \"Electronics\", description: \"A lightweight tablet with a long battery life.\" }) { id name price category description } }"
}
```

예시 응답:

<div class="content-ad"></div>

```js
{
  "data": {
    "addProduct": {
      "id": 3,
      "name": "Tablet",
      "price": 299.99,
      "category": "Electronics",
      "description": "A lightweight tablet with a long battery life."
    }
  }
}
```

JSON 요청 업데이트

```js
{
  "query": "mutation { updateProduct(id: 1, input: { name: \"Laptop\", price: 1099.99, category: \"Electronics\", description: \"An updated high-performance laptop with additional features.\" }) { id name price category description } }"
}
```

예시 응답:

<div class="content-ad"></div>

```json
{
  "data": {
    "updateProduct": {
      "id": 1,
      "name": "Laptop",
      "price": 1099.99,
      "category": "Electronics",
      "description": "An updated high-performance laptop with additional features."
    }
  }
}
```

JSON으로 GraphQL 사용하기

스키마 정의하기: API에서 사용 가능한 유형 및 필드를 정의하는 스키마를 만듭니다.

서버 설정하기: Apollo Server 또는 Express GraphQL과 같은 서버 라이브러리를 사용하여 요청을 처리합니다.

<div class="content-ad"></div>

쿼리/뮤테이션 전송: GraphiQL, Apollo Client 또는 HTTP 클라이언트(예: Postman, cURL)와 같은 도구를 사용하여 JSON 형식으로 쿼리 및 뮤테이션을 전송합니다.

응답 처리: 서버에서 받은 JSON 응답을 처리하여 요청된 데이터나 뮤테이션 작업의 확인을 포함합니다.

GraphQL은 복잡한 쿼리를 처리하고 JSON 형식으로 정확한 데이터를 반환하는 능력으로 전통적인 REST API에 대안을 제공하여 더 효율적이고 유연한 데이터 가져오기를 가능하게 합니다.