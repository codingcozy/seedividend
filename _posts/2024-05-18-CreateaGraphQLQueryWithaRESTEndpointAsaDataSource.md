---
title: "REST 엔드포인트를 데이터 소스로 사용하는 GraphQL 쿼리 작성하기"
description: ""
coverImage: "/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_0.png"
date: 2024-05-18 21:26
ogImage: 
  url: /assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_0.png
tag: Tech
originalTitle: "Create a GraphQL Query With a REST Endpoint As a Data Source"
link: "https://medium.com/javascript-in-plain-english/create-a-graphql-query-with-a-rest-endpoint-as-a-data-source-fc21ae95a441"
isUpdated: true
---




![image](/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_0.png)

이 짧은 기사에서는 RESTful 엔드포인트에서 데이터를 가져오는 간단한 GraphQL 쿼리를 어떻게 생성할 수 있는지 살펴보겠습니다. 이를 위해 Node.js와 Apollo Server를 사용할 것입니다.

이 기사에서는 예시로 간단한 사용자 리소스인 Users를 살펴보겠습니다. 이 글의 목표는 apollo GraphQL 서버를 사용하여 기존 REST 엔드포인트를 데이터 소스로 활용하는 쿼리를 작성하는 데 필요한 단계와 구성을 간략히 개요로 설명하는 것뿐입니다.

## PlainEnglish.io에서 더 많은 내용 확인 가능합니다.

<div class="content-ad"></div>

우리 무료 주간 뉴스레터를 구독해보세요. Twitter, LinkedIn, YouTube, 그리고 Discord에서도 팔로우해주세요.

## 당신의 기술 창업품을 알림과 채용을 확대하려고 하세요? Circuit을 확인해보세요.

이것이 응담하는 클라이언트에게 응답에서 투영되는 필드를 더 많은 제어를 제공하고 싶을 때 유용할 수 있습니다.

자, 더 이상 말이 필요없으니 시작해봅시다:

<div class="content-ad"></div>

# GraphQL 프로젝트 초기화:

새 디렉토리를 gserver로 만들고 cd gserver라고 입력하여 디렉토리를 변경해 봅시다.

이제 yarn init -y로 프로젝트를 초기화해 봅시다.

## Dependencies 추가:

<div class="content-ad"></div>

저희가 주요하게 사용하는 의존성은 graphQL과 apollo-server 패키지입니다. 그러니 이들을 프로젝트에 추가해봅시다:

```js
yarn add apollo-server graphql
```

개발 중에 서버가 변경 사항이 생길 때 자동으로 다시 시작되도록 하려면 nodemon을 개발 의존성으로 추가해봅시다:

```js
yarn add --dev nodemon
```

<div class="content-ad"></div>

지금 우리의 package.json 파일은 다음과 같이 보일 것입니다:

```js
{
  "name": "gserver",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "apollo-server": "^3.10.2",
    "graphql": "^16.6.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}
```

참고: 저는 패키지 매니저로 Yarn을 사용하고 있지만, npm을 사용해도 괜찮습니다.

## index 파일을 생성하세요:

<div class="content-ad"></div>

프로젝트의 루트에 index.js라는 파일을 만들어주세요. 이 파일은 우리의 GraphQL 서버의 진입점이 될 것입니다.

```js
// index.js
import { ApolloServer } from "apollo-server";
const server = new ApolloServer();
server
  .listen({port: process.env.PORT || 5000})
  .then(({url})=> console.log(`서버 실행 중 : ${url}`));
```

기본적인 GraphQL 서버가 설정되었으니, package.json에 nodemon을 사용하여 개발 모드에서 시작하는 스크립트를 추가해봅시다:

```js
{
...기존의 package.json 내용
"scripts": {
    "dev": "nodemon index.js"
  }
 ... 남은 내용
}
```

<div class="content-ad"></div>

# 사용자 스키마 생성하기:

스키마는 우리가 GraphQL에서 쿼리와 뮤테이션을 위한 유형과 그 하위 구조를 정의하는 방법입니다.

프로젝트 루트에 schema라는 디렉토리를 빠르게 생성해봅시다.

스키마를 정의하기 위해 gql이라는 특별한 태그를 사용할 것입니다.

<div class="content-ad"></div>

사용자 스키마는 다음과 같이 정의될 수 있습니다:

```js
// schema/user.js
import { gql } from "apollo-server";
export const User = gql`
  type User {
    id: ID!,
    email: String,
    name: String
  }
``` 

UUID를 위해 우리는 graphQL에서 ID라는 특별한 타입을 사용하며, '!' 표시는 값이 null일 수 없음을 의미합니다.

따라서 User라는 타입을 정의하고 사용자 객체에 대한 스키마를 생성했습니다.

<div class="content-ad"></div>

# 사용자 쿼리 정의:

GraphQL에서는 데이터를 가져오는 쿼리(REST 용어로는 GET 요청과 동일하다고 볼 수 있음)를 정의할 때 잘 정의된 스키마가 필요합니다. 이 예시에서는 기본 사용자 서비스 엔드포인트에서 모든 사용자를 가져오고자 합니다. 그러므로 모든 사용자를 가져오기 위한 쿼리를 정의해봅시다:

```js
// schema/query.js
import { gql } from "apollo-server";
export const Query = gql`
  type Query {
    users: [User]
}
```

사용자 쿼리로 여러 사용자를 검색할 것이기 때문에 그 유형을 이전에 스키마에서 정의한 User 유형의 배열로 지정합니다.

<div class="content-ad"></div>

편의를 위해 스키마 디렉토리 아래에 인덱스 파일을 만들고 정의된 스키마를 다음과 같이 노출해봅시다:

```js
// schema/index.js
export { User } from './user.js';
export { Query } from './query.js';
```

# 서버 실행:

저희가 정의한 스키마를 포함하는 서버의 진입점인 index.js를 수정해봅시다:

<div class="content-ad"></div>

```js
// index.js
import { ApolloServer } from "apollo-server";
import { Query, User } from "./schema/index.js";
const server = new ApolloServer({typeDefs:[Query,User]});
server
  .listen({ port: process.env.PORT || 5000 })
  .then(({ url }) => console.log(`gserver at : ${url}`));
```

이제 터미널에서 `yarn dev`라고 입력해보세요:

<img src="/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_1.png" />

브라우저를 http://localhost:5000 에서 열어볼 때, 모든게 잘 되었다면 다음 화면을 보게 됩니다:


<div class="content-ad"></div>

<img src="/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_2.png" />

"Query Your Server" 버튼을 클릭하면 아폴로 스튜디오로 이동하게 되는데, 여기서 정의된 스키마를 찾을 수 있어요:

<img src="/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_3.png" />

아직 많이 할 수 있는 것은 없어요. 그래서 다음 섹션에서 사용자 정보를 가져오기 위한 리졸버를 추가해볼게요.

<div class="content-ad"></div>

# 사용자 RESTful 서비스:

저희는 현재 포트 3000에서 실행 중인 사용자 서비스가 있습니다. 현재 localhost:3000/users 엔드포인트에 대한 다음 응답을 반환합니다 :

![이미지](/assets/img/2024-05-18-CreateaGraphQLQueryWithaRESTEndpointAsaDataSource_4.png)

이것은 express 서버에서 실행 중인 전형적인 RESTful 엔드포인트입니다. 이미 구현되어 있으므로 많은 걱정할 필요가 없습니다. 이 기사의 초점은 기존 REST 엔드포인트와 graphQL 쿼리를 인터페이싱하는 것뿐입니다.

<div class="content-ad"></div>

# 사용자 데이터 소스 및 리졸버:

이제 우리는 그래프큐엘 사용자 쿼리를 위에서 언급된 RESTful 엔드포인트에서 데이터를 가져오도록 매핑해야 합니다. 이를 하기 위해 dataSource를 정의하고 resolver에 매핑하는 방법을 살펴볼 수 있습니다.

이 섹션에서는 Rest 엔드포인트에서 모든 사용자를 가져오기 위해 그것을 하는 방법을 살펴보겠습니다.

## 사용자 데이터 소스:

<div class="content-ad"></div>

우리가 데이터 소스로 REST 엔드포인트를 사용할 것이기 때문에, 아폴로 팀이 만든 apollo-datasource-rest 패키지를 설치해봅시다. 이 패키지는 캐싱과 같은 중요한 기능을 다루므로 우리가 걱정할 필요가 없습니다.

프로젝트에 패키지를 추가해봅시다:

```js
yarn add apollo-datasource-rest
```

이제 프로젝트 루트에 datasource라는 디렉토리를 만들어 다음과 같이 정의해봅시다:

<div class="content-ad"></div>

```js
// datasource/users.js
import { RESTDataSource } from "apollo-datasource-rest";
export class UsersAPI extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = "http://localhost:3000/"
  }
  async getAllUsers() {
    return this.get('users')
  }
}
```

`baseURL`는 우리 usersservice를 위한 기본 URL이어야 합니다.

datasource 디렉토리의 인덱스 파일은 다음과 같이 될 것입니다:

```js
// datasource/index.js
import { UsersAPI } from "./users.js";
export const dataSources = () => ({
  UsersAPI: new UsersAPI()
});
```

<div class="content-ad"></div>

## 사용자 리졸버:

모든 사용자를 가져오는 우리의 리졸버를 추가해보겠습니다. 프로젝트 루트에 resolvers라는 디렉토리를 만들고 다음을 추가합니다:

```js
// resolvers/users.js
export const userResolvers = {
  users: (parent, args, {dataSources}, info) => dataSources.UsersAPI.getAllUsers()
}
```

다음 세션에서 서버의 진입점과 연결할 때 이해할 수 있을 것입니다. 리졸버 인덱스에 다음을 추가합시다.

<div class="content-ad"></div>

```js
// resolvers/index.js
import { userResolvers } from "./users.js";
export const resolvers = {
  Query: {
    ...userResolvers
  }
}
```

## 서버와 연결하기:

데이터 소스와 리졸버를 서버에 연결하려면 프로젝트 루트에 있는 index.js 파일을 다음과 같이 수정하십시오:

```js
// index.js
import { ApolloServer } from "apollo-server";
import { Query, User } from "./schema/index.js";
import { resolvers } from "./resolver/index.js";
import { dataSources } from "./datasource/index.js";
const server = new ApolloServer({ typeDefs:[Query,User ], resolvers, dataSources });
server
  .listen({ port: process.env.PORT || 5000 })
  .then(({ url }) => console.log(`서버가 실행 중: ${url}`));
```

<div class="content-ad"></div>

이제 로컬호스트:5000에서 실행 중인 GraphQL 플레이그라운드로 이동하여 다음과 같이 모든 사용자를 검색하는 쿼리를 실행할 수 있습니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*X9A5GeYoCB8dxYsROmk6VQ.gif)

REST 엔드포인트와 달리 GraphQL 쿼리에서는 사용자 스키마에서 필요한 필드만 선택적으로 가져올 수 있습니다.

# 결론:

<div class="content-ad"></div>

따라서 기존 REST 엔드포인트에서 데이터를 가져오는 기능이 포함된 GraphQL 쿼리를 만들었습니다. 또한 필요한 다양한 구성 요소 및 구성 설정이 무엇이며, 이를 어떻게 연결하여 작동시키는지 살펴보았습니다.