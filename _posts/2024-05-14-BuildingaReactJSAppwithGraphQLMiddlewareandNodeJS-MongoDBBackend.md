---
title: "ReactJS 앱을 GraphQL 미들웨어와 NodeJS-MongoDB 백엔드로 구축하기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_0.png"
date: 2024-05-14 10:38
ogImage: 
  url: /assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_0.png
tag: Tech
originalTitle: "Building a ReactJS App with GraphQL Middleware and NodeJS-MongoDB Backend"
link: "https://medium.com/@carloscuba014/building-a-reactjs-app-with-graphql-middleware-and-nodejs-mongodb-backend-b19dbce9ddcb"
isUpdated: true
---




<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_0.png" />

가끔 옛날을 그리곤 합니다. 2006년이었던 그 때, 믿을만한 웹사이트를 만드는 가장 좋은 해결책은 HTML, CSS, 때로는 가끔씩 JS만 있었죠. 그 해에 고등학교에서 배운 것과 정확히 일치합니다. 혹시 당시에는 인터넷 서비스를 사용하는 것이 현재처럼 쉽지 않았거나 기술이 아직 그에 미쳐하지 않아 항상 연결된 세상에서 얻을 수 있는 웹사이트의 장점을 활용할 수 없었기 때문인가요.

하지만 웹사이트를 호스팅하는 기술은 개선되고, 웹 앱도 변화합니다. FTP나 버전 관리 없이 일하는 시대는 이미 지나갔으며, 이제 웹 응용 프로그램이 최신 코딩 관행을 준수하고 일반 Javascript 이상의 개발 작업을 촉진하는 것이 이전보다 더 중요합니다. 네, 더 복잡해지긴 했지만, 신기술의 세계는 더 나은 소프트웨어를 만들기 위해 기술을 활용할 수 있는 여러 가지 방법을 제시합니다! 그러나 ReactJS나 AngularJS 같은 프레임워크는 개발 환경에서 효과적으로 작업할 수 있지만, 어플리케이션 내에서 복잡한 상태/데이터 변경을 유지하기 위해서는 정적 코드가 아닌 것이 필요합니다. 이를 위해서 우리가 잘 알고 있는 Filezilla 같은 오래된 도구는 거의 사용되지 않게 되었습니다!

그럼에도 불구하고, 이러한 정적 웹사이트는 여전히 존재합니다. Github Pages 같은 무료 서비스를 통해 프로젝트 빌드를 호스팅하고 브라우저에서 액세스할 수 있습니다. 다만 다른 애플리케이션과의 통신 없이 상태/데이터가 변경되는 것을 보장하는 복잡한 소프트웨어 개발 주기가 관련되어 있지 않다면요. 이러한 무료 서비스의 존재로 취미로 하는 사람들과 개발자들이 과거 기술을 사용하여 스스로 컨텐츠를 온라인에 호스팅할 수 있습니다. HTML, CSS 그리고 JS 파일은 여전히 잘 동작하지만, 언급한 프레임워크를 고려할 때 이러한 장점은 제한됩니다. 물론 AWS, Azure, Heroku와 같은 선도적인 클라우드 호스팅 서비스는 저렴한 호스팅 경험을 제공합니다. 그러나 이러한 서비스의 설정과 구성을 소홀히 한다면, 언제든지 트래픽이 있는지 없는지 애플리케이션을 호스팅하는데 사용되는 컨테이너가 호스팅 비용을 발생시킬 수 있는 소득 미니 진공청소기가 될 수 있습니다.



이젠 온라인으로 제공되는 서비스들이 있어요. 적절하게 활용하면 아마추어, 초보자, 그리고 작은 비즈니스들에게 유용한 개발 작업이 될 수 있는 겁니다. Vercel과 같은 서비스를 통해 여러 서버리스 애플리케이션을 호스팅할 수 있어요. 이는 애플리케이션을 쉽게 준비하고 배포할 수 있어서 복잡함에 대해 걱정하지 않고 작동시킬 수 있어요.

이 튜토리얼은 소프트웨어 개발 생명주기에 대해 더 완벽한 경험을 제공하기 위한 것이에요. 구성할 분산 시스템의 기본을 다룰 거에요: ReactJS 프론트엔드 앱이 GraphQl 미들웨어에 연결되며, 미들웨어는 다시 백엔드로 NodeJS 익스프레스 앱이나 MongoDB 데이터베이스에 연결하는 서비가 될 거에요. 모두 무료로 호스팅될 거에요.

## 설정

우선 https://github.com/signup 에서 깃허브 계정이 있어야 해요.




![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_1.png)

계정을 설정했다면 https://github.com/new에서 적어도 한 개의 저장소를 만들 수 있어야 합니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_2.png)

이 튜토리얼에서는 ReactJS와 NodeJS를 사용할 것이며 프로젝트용 .gitignore를 만들고 싶다면 아무런 경우에나 나중에 각 앱에 추가할 것입니다!
이 튜토리얼에서는 다음과 같이 저장소를 만들었습니다:




<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_3.png" />

그러면, 재미있는 부분이 시작됐습니다!

## 보일러플레이트 설정

우선, 만든 저장소를 복제하거나 해당 저장소와 동일한 이름의 폴더 안에서 다음 단계를 따라주세요:



<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_4.png" />

첫 번째 커밋을 푸시하거나 계속 진행하세요. 다음으로 터미널을 열고 npm init을 실행해야 합니다. 이렇게 하면 package.json 파일이 생성됩니다. 지금은 다음과 같이 보일 것입니다:

```js
{
  "name": "react-graphql-node-mongo-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
} 
```

이게 왜 중요한가요? 이 보일러플레이트에서는 모든 어플리케이션을 함께 모아놓는 데 초점을 맞추었는데, 이 package.json은 그 모든 것을 제어하는 데 유용할 것입니다. 그러나 이 보일러플레이트의 각 부분(프론트엔드, 미들웨어, 백엔드)을 별도의 저장소에 넣는 데 제한이 있으면 안 될 것입니다.



어쨌든, 프로젝트 구조는 다음과 같이 보이면 충분히 좋을 것입니다:

![프로젝트 구조](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_5.png)

코드를 깃허브 저장소에 푸시해 보세요.

## 프론트엔드



아래 명령어를 실행해 주세요:

```js
npx create-react-app frontend --template typescript
```

이 명령어를 실행하면 frontend에 TypeScript 템플릿을 이용한 ReactJS 앱이 생성됩니다. 작업이 완료되면 프로젝트 구조는 다음과 같아요:

![프로젝트 구조](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_6.png)



만약 npm start를 실행하면 브라우저에서 앱이 이렇게 나타날 것입니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_7.png)

보일러플레이트/프론트엔드 통합

다음으로, 보일러플레이트에 대해 말씀드리겠습니다. 프론트엔드 앱을 폴더 외부에서 호출했을 때도 실행할 수 있도록 보장할 거에요. 메인 package.json을 다음과 같이 변경하세요:



```js
{
  "name": "react-graphql-node-mongo-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start-fe": "npm run --prefix ./frontend start"
  },
  "author": "",
  "license": "ISC"
}
```

참고: 테스트가 중요하지 않다는 것은 아닙니다. 그러나 이 튜토리얼을 좀 더 간략하게 유지하기 위해 테스트는 포함하지 않았습니다.

어쨌든, 이제 start-fe 스크립트가 있다는 것을 알 수 있습니다. --prefix 플래그를 사용하면 내부 디렉토리에서 명령을 실행할 수 있습니다. 이를 통해 전체 위치에서 프론트엔드 앱을 실행할 수 있게 됩니다. 이것은 결국 미들웨어와 백엔드를 동일한 위치와 동시에 실행할 수 있어야 한다는 의미입니다.

## Frontend Vercel 통합



이제 적어도 하나 이상의 앱이 있으므로 Vercel을 무료 호스팅 도구로 활용할 수 있도록 배포를 시작할 수 있습니다. 이를 위해 Vercel에서 계정을 만들어야 합니다.https://vercel.com/signup .

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_8.png)

계정을 만들었다면 새 프로젝트를 만들 수 있어야 합니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_9.png)



해당하는 git 저장소를 가져올 수 있어야합니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_10.png)

작업 중인 저장소를 선택한 후, 이 프로젝트에 이름을 지정하고 프레임워크 및 루트 디렉토리를 선택할 수 있어야합니다. 단일 저장소에 모든 앱을 가질 수 있도록 허용되기 때문에 매우 유용합니다. 혹시 모노 레포라고 부르는 것 같아요:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_11.png)



작업을 마치면 배포 버튼을 클릭하세요. 그러면 이와 유사한 화면을 볼 수 있을 거에요:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_12.png)

Visit을 클릭하면 온라인으로 무료로 배포된 ReactJS 앱을 볼 수 있을 거에요!

레포를 연결하고 Vercel에 배포하는 데의 장점은 이제 코드를 쉽게 게시할 수 있다는 것이죠. 코드가 푸시될 때마다 Vercel 프로젝트는 변경 사항을 인식하고 새로운 배포를 준비할 거에요.



## 미들웨어

이제 다른 애플리케이션을 생성할 차례입니다. 이 미들웨어는 일종의 경비병 역할을 하는 중개자로, 프론트엔드와 백엔드의 서비스 사이의 요청 통신을 라우팅할 수 있는 기능을 제공합니다 (비록 이 튜토리얼에서는 하나의 서비스만 구현하겠지만요).

최상위 디렉토리에서 middleware라는 폴더를 생성합니다. 해당 폴더 안에서 npm init -y 명령을 실행합니다. 이렇게 하면 GraphQL과 Vercel을 함께 실행할 수 있도록 기본 프로젝트가 생성됩니다.

middleware 폴더 안에 api 폴더를 만듭니다. 그 안에 server.js라는 파일을 만듭니다. 이 파일은 GraphQL과 Vercel을 설정하는 주요 부분이 구현될 곳입니다. 다음 코드를 추가하세요:



```js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const cors = require('cors');

const isDev = process.env.MIDDLEWARE_ENV === 'dev';

const typeDefs = gql`
type Query {
    hello: String
}
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: isDev,
  playground: isDev
});
const app = express();
app.use(cors());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Only listen on HTTP port in local development, not when deployed on Vercel
  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`💫 Server ready at http://localhost:${PORT}/graphql`));
  }
}

startServer();
const requestHandler = app;
const vercelServer = createServer((req, res) => requestHandler(req, res));
module.exports = vercelServer;
```

현재는 백엔드에서 서비스 호출로부터 반환되는 데이터 구조를 해결하는 함수인 resolvers와 백엔드 서비스로의 호출 스키마를 지정하는 것인 typeDefs의 매우 간단한 구현을 사용 중입니다. 배포된 인스턴스에서 이를 수행하면 데이터 스키마가 노출되어도 훨씬 더 안전하지 않을 수 있으므로 개발 환경에서만 인트로스펙션 쿼리를 실행하고 플레이그라운드를 볼 수 있도록 허용합니다.

여기서 개발 환경에 있는지 확인하기 위해 process.env.MIDDLEWARE_ENV를 사용합니다. 이는 실행 중에 사용할 환경을 지정할 수 있어야 한다는 것을 의미합니다. 우리가 dev 환경에서 플레이그라운드를 사용하고 싶기 때문에 npm start를 실행할 때 환경 변수로 사용할 MIDDLEWARE_ENV를 포함하고 싶을 것입니다. NodeJS에서 이를 달성하는 간단한 방법 중 하나는 middleware 폴더 내에 .env 파일을 생성하는 것입니다. 파일은 아래와 같이 보여야 합니다:

```js
MIDDLEWARE_ENV=dev
```



그리고 이제 이 변수를 사용할 수 있어야 합니다. 그냥 .env 파일을 추가했다고 해서 앱이 자동으로 그것을 사용한다고는 알 수 없습니다. 따라서 dotenv 패키지를 설치할 수 있습니다. 그런데 우리가 server.js에서 사용하는 패키지들도 함께 설치해 봅시다! 다음을 실행해 주세요:

```js
npm i @vercel/node apollo-server-express dotenv express graphql
```

@vercel/node를 왜 사용해야 하냐구요? Vercel에 이 앱을 배포할 것이기 때문입니다. 왜냐하면 어째선지 Vercel은 NodeJS 프레임워크 프리셋을 포함하지 않기 때문입니다 :( 이를 위해 middleware 폴더 안에 vercel.json 파일을 생성하세요:

```js
{
  "version": 2,
  "routes": [
    {
      "src": "/graphql",
      "dest": "/api/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/api/server.js"
    }
  ]
}
```



여기서 우리는 어떤 경로든 서버.js를 거쳐야 하며, 프론트엔드에서의 GraphQL 호출(/graphql 경로)이 동일한 위치로 이동한다는 것을 나타냅니다.

이제 로컬에서 실행하려면 package.json을 수정하여 start 명령을 포함해야 합니다:

```js
"start": "node -r dotenv/config api/server.js"
```

npm start를 실행한 후 http://localhost:4000/graphql로 이동하여 다음을 볼 수 있어야 합니다:



마크다운 형식으로 테이블 태그를 변경해주세요.



하지만 이제 우리가 작동시킨 것을 리포에 푸쉬해야 할까요? 이제 .env 파일이 있으니까요. 이 파일에 중요한 정보(주소, 키 등)가 저장되어 있다면, 리포나 이를 의존하는 어플리케이션에 보안 문제가 발생할 수 있습니다. 이제 이 특정 파일을 푸쉬하지 않도록 무시할 수 있도록 하고 싶으므로, 미들웨어 폴더 안에 .gitignore 파일을 추가할 시간입니다. 아래와 같이 추가하세요:

그러나 node_modules와 .env만 추가하면 되지만, 이것은 여러 종류의 프로젝트에 사용할 gitignore 파일 모음을 보유하는 이런 리포에서 얻을 수 있는 종합적인 파일입니다.

하지만 이제, 이런 프로젝트를 완료하고 얼마 후에도 작업을 계속하지 않게 된다면 어떻게 될까요? 코드가 이렇게 남게 되면 사용되는 환경 변수가 무엇인지 기억하지 못할 수 있습니다. 항상 코드 편집기에서 확인할 수 있지만, 그건 별로 필요한 작업이 아닐 수 있습니다. 미래의 자신이나 귀하의 리포를 포크하려는 누군가에게 암시할 수 있는 방법은 .env.sample 파일을 만드는 것입니다. 이 파일은 환경 변수 이름만 포함합니다:



```js
MIDDLEWARE_ENV=
```

물론, 여기에 민감한 정보가 저장되지 않도록 주의를 기울이는 것이 당신의 책임입니다. 이 미들웨어 설정이 끝난 후에는 미들웨어 폴더 구조가 다음과 같아야 합니다:

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_15.png" />

## 보일러플레이트/미들웨어 통합



계속해서 보일러플레이트 프로세스를 이어가려고 합니다. 미들웨어 앱을 외부에서 실행할 수 있도록 하려면 concurrently 패키지가 필요합니다. 미들웨어 폴더 외부에서 다음을 실행해주세요:

```js
npm i concurrently -D
```

이 명령을 통해 한 번에 여러 앱을 실행해야 하기 때문에 개발 종속성으로 패키지가 설치됩니다. 다음으로 두 가지 스크립트를 추가해야 합니다:

```js
"start:mw": "npm run --prefix ./middleware start",
"start": "concurrently \"npm run start:fe\" \"npm run start:mw\""
```



위에 언급된 내용대로 하면, 우리가 미들웨어를 프로젝트 외부에서만 실행하고 싶을 때에는 start:mw를 실행합니다. 새로운 start 명령어는 새로 설치한 concurrently 패키지를 사용하여 start:fe와 start:mw 명령어를 동시에 실행합니다.

하지만 이제 한 개의 패키지가 있기 때문에 package-lock.json 파일과 node_modules 폴더가 생길 것입니다. 파일은 사용할 수 있지만 폴더는 사용하지 않을 거에요. 다음과 같은 .gitignore 파일을 간단히 추가해주세요:

```js
/node_modules
```

그러면 레포지토리에 설치된 파일들을 푸시하지 않도록 합니다. 이제 보일러플레이트 구조는 아래와 같을 것입니다:




![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_16.png)

### 미들웨어 Vercel 통합

이제 Vercel에서 다른 프로젝트를 만들 수 있어야 합니다. 동일한 저장소를 선택하고 이름을 지정하되 Root Directory에서 미들웨어 폴더를 선택하십시오. 이제 두 개의 프로젝트가 배포되어 있어야 합니다!

### 데이터베이스




자, 이제 우리는 무료 NoSQL 데이터베이스를 호스팅하기 위해 MongoDB 계정을 생성할 거에요. 먼저 https://account.mongodb.com/account/register에 접속해서 양식을 채워주세요.

![MongoDB Registration](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_17.png)

양식을 채웠으면, 이 MongoDB 간단 튜토리얼을 따라해보세요:
- 조직 생성
- 프로젝트 생성
- 클러스터 생성



그러나 클러스터를 만들 때 M0 공유 클러스터 배포를 선택해야 합니다:

![image](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_18.png)

이를 통해 데이터베이스가 무료 공간에 호스팅됨이 보장됩니다. 물론, 상당한 트래픽이나 사용자가 예상되어 많은 저장 공간이 필요한 경우에는 다른 배포 템플릿을 사용하는 것이 좋습니다. 마지막으로, 배포 생성을 클릭하세요.

이 작업을 완료한 후, 왼쪽 메뉴의 Database 옵션으로 이동하여 Browse Collections 버튼을 클릭하세요.



<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_19.png" />

한 번 들어오면 샘플 데이터 세트를 추가하여 작업을 시작하거나 본인의 데이터를 추가할 수 있습니다:

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_20.png" />

데이터베이스 이름과 컬렉션 이름을 작성한 다음 '생성'을 클릭하세요.



<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_21.png" />

다음으로, 문서를 삽입할 버튼을 찾아 클릭하세요. 모달에서,

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_22.png" />

다음 데이터를 추가하세요:



```js
[
  {"userId": 1, "name": "Andrew"},
  {"userId": 2, "name": "Bob"},
  {"userId": 3, "name": "Charles"},
  {"userId": 4, "name": "Damian"}
]
```

물론, 데이터베이스 계정, 컬렉션 사용자, 데이터는 모두 테스트 목적으로 제공됩니다. 프로젝트에서는 필요한 데이터를 자유롭게 사용할 수 있습니다. 작업이 완료되면 왼쪽 메뉴에서 "데이터베이스 액세스"를 클릭하십시오.

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_23.png" />

이렇게 하면 백엔드에서 데이터베이스 액세스를 처리할 사용자인 새 데이터베이스 사용자를 추가할 수 있습니다. 버튼을 클릭한 후 사용자 이름과 비밀번호를 입력한 다음 역할을 선택하려면 아래로 스크롤하세요. 읽기 및 쓰기가 충분합니다.



<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_24.png" />

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_25.png" />

마지막으로, '사용자 추가'를 클릭해주세요.

## 백엔드



코드로 돌아가기 전에 MongoDB에서 왼쪽 메뉴에서 '데이터베이스'로 이동한 다음 '연결'을 클릭해주세요:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_26.png)

그다음 '드라이버'를 클릭하고 '드라이버'에서 Node.js를 선택해주세요. 최신 버전을 선택하면 됩니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_27.png)



언급했듯이, 백엔드에는 mongodb 패키지가 필요합니다. 또한 아래 형식을 따르는 연결 문자열을 메모해주세요:

```js
mongodb+srv://<db-user>:<db-password>@<cluster-url>?retryWrites=true&w=majority&appName=<app-name>
```

이를 염두에 두고 저장소로 돌아가봅시다. 루트 수준에서 backend라는 폴더를 만들고 그 안에서 npm init -y를 실행하세요. 이렇게 하면 간단한 NodeJS 앱이 생성됩니다. 또한 안에 index.js 파일을 만들어 아래와 같이 작성해주세요:

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const testRouter = require('./routes/testRoutes');
const connectToDb = require('./configs/db.config');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello from the NodeJS backend!');
});

app.use('/test', testRouter.getUsers);

async function startServer() {
  const port = process.env.PORT || 5000;
  app.listen({ port }, () =>
    console.log(`✨ Server ready at http://localhost:${port}`)
  );
  connectToDb();
}

startServer();
```



프로젝트에서 요청을 처리하고 백엔드 서비스 내에서 특정 기능으로 라우팅하는 데 사용할 express는 RESTful 기능을 활용하여 데이터베이스와 상호 작용하기 위해 앱에 통합됩니다. body-parser는 앱에 통합된 경우 요청 경로로 JSON 데이터를 보내면 이를 올바르게 이해하도록합니다. cors는 도메인에 상관없이 모든 도메인의 교차 출처 요청을 허용하는 데 사용됩니다. testRouter와 connectToDb는 나중에 보여줄 코드에서 가져온 것입니다.

간단히 말하면, index.js의 역할은 기본 포트 5000에서 연결을 설정하고 데이터베이스 연결을 설정하며 두 가지 별도의 요청을 처리하는 것입니다: 하나는 간단한 hello-world 스타일 텍스트를 표시하는 /로의 요청이고, 다른 하나는 데이터베이스에서 사용자를 가져 오는 /test로의 요청입니다. 이를 실제로 보려면 다음 명령을 실행하십시오:

```js
npm i body-parser cors dotenv express mongodb
```

다음으로, 스크립트를 다음과 같이 수정하십시오:



```js
"start": "node -r dotenv/config index.js"
```

프로그램을 실행할 수 있어야 합니다. 그러나 dotenv을 사용하므로 index.js에서 process.env를 사용하므로 환경 변수를 설정해야 합니다. 다음과 같이 보이는 .env.sample 파일을 만드세요:

```js
PORT=
DB_USER=
DB_PASSWORD=
DB_CLUSTER_URL=
DB_APP_NAME=
DB_NAME=
DB_COLLECTION=
```

이러한 변수가 모두 연결 문자열에서 가져오는 변수여야 하며, 포트를 제외한 모든 변수를 채워넣어야 합니다. 포트는 미들웨어나 프론트엔드에 사용된 것과 중복되지 않는 한 5000 또는 다른 값이어야 합니다. 이제 .gitignore를 추가하십시오. 미들웨어에서 사용된 것과 유사하거나 node_modules와 .env를 언급하는 한 사용할 수 있습니다.



위 내용을 실제로 보고 싶다면 index.js에서 testRouter와 connectToDb에 언급된 라인들, 그리고 /test route를 주석 처리해보세요. npm start를 실행하면 브라우저에서 다음과 같은 내용을 확인할 수 있을 거에요:

![image](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_28.png)

그래서 적어도 텍스트 요청이 작동하는지 확인할 수 있어요! 이제 db 요청을 실행해보겠습니다. 위의 코드를 테스트했다면 index.js의 코드를 주석 처리하고 다음 두 개 폴더를 만드세요:

- 폴더 configs: 내부에 다음과 같은 내용이 들어 있는 db.config.js 파일을 만들어보세요:



```js
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
const client = new MongoClient(uri);

let database;

const connectToDb = async () => {
  if (database) {
    return database;
  }
  try {
    await client.connect();
    console.log('📘 Connected to MongoDB');
    database = client.db(process.env.DB_NAME);
    return database;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
```

요렇게, 이제 connectToDb를 호출할 때 (예를 들어 인덱스 파일에서), 우리의 MongoDB 데이터베이스에 연결합니다. if(database) 블록은 connectToDb를 호출해도, 이미 연결이 시작된 경우 다시 연결하는 대신 해당 연결을 사용할 수 있도록 합니다.

2. 폴더 routes: 내부에 testRoutes.js라는 파일을 만들어 사용자와 관련된 모든 호출을 보관합니다. 다음을 작성하세요:

```js
const connectToDb = require('../configs/db.config');

const getUsers = async (req, res) => {
  try {
    let db = await connectToDb();
    const collection = db.collection(process.env.DB_COLLECTION);
    const data = await collection.find({}).toArray();
    res.send({
      message: '그리고 백엔드도!',
      data
    });
  } catch (error) {
    console.error('데이터베이스에 액세스하는 중 오류 발생', error);
    res.status(500).send('데이터 검색에 실패했습니다');
  }
};

module.exports = {
  getUsers,
};
```



이전 파일에서 언급한 대로, connectToDb는 여기에서도 쉽게 재사용할 수 있습니다. 다시 연결할 위험이 없습니다. 그러나 이제 이 파일에서는 getUsers를 호출할 때(/test route in index.js에 있는 것과 같이) 환경 변수에서 정의된 컬렉션을 가져와 배열로 변환한 다음 결과를 보내게 됩니다. 간단하게 하기 위해 이 강좌에서는 모든 사용자를 가져오는 방법만 언급할 것입니다. 그러나 이러한 것들을 사용하여 각종 CRUD 작업을 쉽게 구현할 수 있습니다. 연습 삼아 데이터 처리와 조회 방법을 익히실 수 있습니다.

```js
const collection = db.collection('users');

// 모두 가져오기
await collection.find().toArray();

// 하나 가져오기 (예를 들어, 이름으로 가져오기)
await collection.findOne({ name: 'Charles' });

// 하나 생성하기
await collection.insertOne({ userId: '5', name: 'Eric' });

// 다수 생성하기
await collection.insertMany([
  { userId: 5, name: 'Ethan' },
  { userId: 6, name: 'Felix' }
]);

// 하나 업데이트하기
await collection.updateOne({ userId: '5' }, { $set: { name: 'Ethan' } });

// 하나 삭제하기
await collection.deleteOne({ userId: '5' });

// userId가 3 미만인 모든 항목 가져오기
await collection.find({ userId: { $lt: 3 } }).toArray();

// userId가 [2,3] 리스트에 있는 사용자 이름에 '*' 추가하기
await collection.updateMany(
  { userId: { $in: [2, 3] } },
  { $set: { name: { $concat: ['$name', '*'] } } }
);

// userId가 홀수인 모든 항목 삭제하기
await collection.deleteMany({ userId: { $mod: [2, 1] } });
```

이러한 내용을 더 자세히 알아보려면 아주 유용한 Operand 목록을 이곳에서 찾을 수 있습니다: https://www.mongodb.com/docs/manual/reference/operator/query/ 여기서 데이터 처리를 필요로 할 때 데이터를 조작하는 데 도움이 될 것입니다. 어쨌든, 세 파일의 코드가 모두 완성되었으므로 이제 로컬에서 MongoDB를 쿼리할 수 있습니다. 백엔드를 다시 실행하고 브라우저에서 /test로 이동하면 아마도 다음과 같이 보일 것입니다:

<img src="/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_29.png" />



베르셀과 통합해야 하니, 백엔드 폴더 안에 vercel.json을 추가해주세요:

```js
{
  "version": 2,
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

마지막으로, 루트 package.json으로 가서 새로운 스크립트를 추가하고 start 스크립트를 업데이트해주세요:

```js
"start:be": "npm run --prefix ./backend start"

"start": "concurrently \"npm run start:fe\" \"npm run start:mw\" \"npm run start:be\""
```



이로써, boilerplate에서 프론트엔드, 미들웨어 및 백엔드 앱을 함께 실행할 수 있게 됩니다. 이를 통해 백엔드 앱은 이 boilerplate의 목적을 위해 완료되었습니다. 그것에 대한 폴더 구조는 다음과 같아야 합니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_30.png)

## 백엔드 Vercel 통합

코드를 푸시한 후, Vercel에서 다른 프로젝트를 생성하고, boilerplate 리포를 선택하여 이름을 지정하며, root 디렉토리에서는 백엔드 폴더를 선택합니다. 프로젝트가 환경 변수를 사용하기 때문에 프로젝트가 작동하지 않을 것임을 유념하십시오. Vercel은 프로젝트에 환경 변수를 추가할 수 있는 옵션을 제공하지만, 이를 고려하도록 한 번 다시 배포하여야 합니다.



![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_31.png)

몽고디비 데이터베이스를 위해 사용 중인 모든 환경 변수를 추가하고 프로젝트를 다시 배포해야 합니다.

그러나 아직 끝나지 않았어요! `/test` 페이지로 이동하면 페이지에 이런 내용이 나타날 수 있습니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_32.png)



이 게이트웨이 시간 초과 오류는 단순히 백엔드 배포의 IP 주소가 데이터베이스에 액세스할 권한이 없다는 것을 의미합니다. 해결하기 위해 프로젝트에 MongoDBAtlas 통합을 추가하면 됩니다. 이 경우 백엔드 프로젝트는 여기에 있습니다: https://vercel.com/integrations/mongodbatlas. 이 과정은 비교적 직관적이며 클러스터를 선택할 수 있어야 합니다.

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_33.png)

이 작업을 통해 최종적으로 하는 일은 MongoDB 왼쪽 메뉴의 데이터베이스 액세스에서 찾을 수 있는 사용자를 만드는 것이며, 이 사용자는 백엔드에서의 요청을 처리하기 위해 해당 IP를 화이트리스트에 추가합니다.

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_34.png)



바이노 희석 고 내부 값에 대한 SQLite 데이터베이스에서 임베드 된 데이터를 가지고 있습니다. 이 데이터를 포함된 SQL 질의 명령문으로 SELECT하려면 다른 단일값 또는 여러 행 및 열을 반환하는 SQL 함수를 사용하시면 됩니다.



resolvers 폴더에는 모든 리졸버가 저장될 것입니다. 이들은 백엔드/서비스 호출에서 나오는 데이터를 수정할 수 있는 함수들로, 프론트엔드로 다시 전송하기 전에 준비됩니다. 또한 data-sources 폴더에는 모든 데이터 소스가 저장될 것입니다. 이들은 리졸버에서 받은 데이터를 사용하여 외부 호출(예: 백엔드로)을 수행하는 함수로, 실패 시에는 즉시 반환하거나 예비 동작을 수행합니다.

resolvers 폴더는 test라는 단일 폴더를 가지고 있으며, test.js 파일이 있습니다.

```js
const { gql } = require('apollo-server-express');
const TestDataSource = require('../../data-sources/test/test.js');

const testTypeDefs = gql`
type UserData {
  name: String
  userId: String
}
type Response {
  message: String
  data: [UserData]
}
type Query {
  test: Response
}
`;

const buildTestResponse = (response) => {
  return {
    message: `FE integrated successfully with Middleware! ${response.message}`,
    data: response.data
  };
}

const testResolvers = {
  Query: {
    test: async () => {
      const response = await TestDataSource.test();
      return buildTestResponse(response);
    },
  },
};

module.exports = { testTypeDefs, testResolvers };
```

여기서 testResolvers는 리졸버로 사용할 모든 함수가 정의되어 있습니다. 데이터 소스 함수 호출을 하고, 데이터를 정리하여 buildTestResponse를 사용하여 프론트엔드로 다시 전송합니다. 또한 testTypeDefs는 사용할 모든 쿼리(이 프로젝트에서는 하나뿐)를 보유하고 응답 유형을 정의합니다. 이로써 우리는 미들웨어를 통해 다양한 쿼리나 변이가 어떤 것인지를 playground에서 확인할 수 있습니다. 이를 통해 프론트 엔드에서 올바른 인수를 사용하여 쿼리 호출을 준비하는 것을 보장합니다.



```js
const axios = require('axios');

class TestDataSource {
  static async test() {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/test`);
      return response.data;
    } catch (error) {
      console.error('백엔드에서 데이터를 가져오기 실패했습니다:', error);
      return '데이터 가져오기 실패';
    }
  }
}

module.exports = TestDataSource;
```

이 데이터 소스 함수는 axios에 의존하여 백엔드에 요청을 보내고 받은 데이터를 간단히 반환하는 간단한 함수입니다. 이를 필요에 따라 처리할 수 있도록 하겠습니다. 그러므로 axios 패키지를 미들웨어 앱에 추가하기 위해 npm i axios를 실행해야 합니다.

다음으로, api/server.js 파일을 다음과 같이 업데이트해야 합니다. 기본적으로 더미 typedef 및 리졸버를 생성한 것으로 대체합니다.



```js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const cors = require('cors');
const { testTypeDefs, testResolvers } = require('../src/graphql/resolvers/test/test.js');

const isDev = process.env.MIDDLEWARE_ENV === 'dev';

const server = new ApolloServer({
  typeDefs: [testTypeDefs],
  resolvers: [testResolvers],
  introspection: isDev,
  playground: isDev
});

const app = express();
app.use(cors());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Only listen on HTTP port in local development, not when deployed on Vercel
  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`💫 서버가 http://localhost:${PORT}/graphql 에 준비되었습니다`));
  }
}

startServer();

const requestHandler = app;
const vercelServer = createServer((req, res) => requestHandler(req, res));

module.exports = vercelServer;
```

`.env.sample` 파일을 업데이트하여 `MIDDLEWARE_ENV` 변수를 포함시킵니다. `.env` 파일에서는 로컬 백엔드에서 로컬 미들웨어에 액세스하려면 `http://localhost:5000`으로 설정해주세요. 코드를 푸시하세요.

## 배포된 미들웨어를 배포된 백엔드에 연결하기

미들웨어 Vercel 앱에는 이제 모든 GraphQL 관련 코드가 있지만, 백엔드의 배포된 인스턴스에 연결되지 않을 것입니다. 왜냐하면 `MIDDLEWARE_ENV` 변수가 없기 때문입니다. 미들웨어 프로젝트의 설정에서 해당 환경 변수를 추가하고, 배포된 백엔드 URL을 사용하세요. 미들웨어에서 `/test`로 요청하면 이제 백엔드에서 해당 경로로부터 데이터를 반환할 수 있어야 합니다.




이제 남은 것은 프론트엔드를 미들웨어에 연결하도록 변경하는 것뿐입니다!

## 로컬 프론트엔드와 로컬 미들웨어 연결하기

모든 코드를 작성하고 성공적인 연결을 수행하려면 먼저 몇 가지 패키지를 추가해야 합니다:

```js
npm i @apollo/client dotenv graphql react-router-dom
npm i -D @babel/plugin-proposal-private-property-in-object @types/react-router-dom @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```



프론트엔드 폴더 안에 있는 src 폴더 내의 index.tsx 파일을 찾아서, App 래퍼를 수정하여 ApolloProvider를 도입하고 ApolloClient를 사용해 프론트엔드를 미들웨어에 연결하도록 만들어보세요. 파일은 아래와 같이 보일 것입니다:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// 만약 앱의 성능을 측정하려면, 결과를 기록할 함수를 전달하세요 (예: reportWebVitals(console.log))
// 또는 애널리틱스 엔드포인트로 전송하세요. 더 자세한 내용은 여기를 참고하세요: https://bit.ly/CRA-vitals
reportWebVitals();
```

그러므로 똑같은 수준에서 apolloClient.ts 파일을 생성해야 합니다. 해당 파일은 아래와 같이 보일 것입니다:

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

export default client;
```



이것은 데이터를 더 빨리 읽고 쓰기 위해 메모리 캐시를 지정하는 매우 간단한 구현입니다. uri는 환경변수로 지정된 env를 사용합니다. 따라서 frontend 폴더 안에 .env.sample 파일을 생성해야 합니다.

```js
REACT_APP_GRAPHQL_ENDPOINT=
```

그런 다음 일치시키기 위해 .env 파일을 만드세요. 로컬에서는 이 값을 http://localhost:4000/graphql로 설정해야 합니다. 왜냐하면 이것은 Frontend에서 쿼리를 호출하려면 graphql 호출을 할 로컬 주소이기 때문입니다. Vercel의 경우, Frontend 앱의 설정으로 가서 이 값을 추가하고, 중간웨어 앱의 배포 URL을 사용하도록 해야 합니다(일반적으로 링크를 클릭하면 표시된 것과 동일한 URL에 /graphql를 추가해야 합니다):

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_36.png)



이제 App.tsx 파일을 다음과 같이 수정해주세요:

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/test">
            <TestPage />
          </Route>
          {/* 필요한 만큼 더 많은 경로 추가 */}
          <Route path="/">
            {/* TODO: 실제 앱 개발 시에는 이 샘플 코드를 제거하세요 */}
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

TODO를 남겨두어서 무엇을 제거해야 하는지 명확하게 했지만, 연결을 테스트하기 위해 /test로 이동하는 Route를 추가했습니다. 여기에는 백엔드를 호출하여 사용자를 가져오는 GraphQL 쿼리가 있을 것입니다. 이는 실제로 함수 컴포넌트인 TestPage 컴포넌트를 호출할 것입니다. 이를 만들어봅시다. src 폴더 내에 pages 폴더를 생성한 다음, 그 안에 TestPage 폴더를 만들고 그 안에 index.tsx 파일을 다음과 같이 작성해주세요:

```js
import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_TEST_DATA } from '../../graphql/queries/test';
import { TestQuery } from '../../generated/graphql';

const TestPage: React.FC = () => {
  const { data, error, loading } = useQuery<TestQuery>(GET_TEST_DATA);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return error ? (
    <p>{`오류 발생: ${JSON.stringify(error)}`}</p>
  ) : (
    <div>
      <h2>GraphQL로부터</h2>
      <p>{`응답: ${data?.test?.message}`}</p>
      {data?.test?.data?.length && (
        <ul>
          {data?.test?.data.map((currUserData, i) => {
            const { name, userId } = currUserData!;

            return (
              <li key={i}>
                {`${userId}: ${name}`}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default TestPage;
```



여기서는 @apollo/client를 사용하여 useQuery 훅을 활용하여 미들웨어로부터 쿼리를 호출하여 백엔드-데이터베이스 통신을 시작할 수 있습니다. 쿼리에서 세 가지 속성을 분해하여 사용합니다: 데이터, 에러, 로딩입니다. 적절하게 명명되었으므로, 다음과 같이 사용할 수 있습니다:

- 데이터는 처음에는 null 상태이지만 쿼리 호출로 반환된 정보를 포함하며, 성공적인 경우
- 에러는 초기에 false인 부울 값이지만 쿼리 호출 시 오류가 발생하면 true가 됩니다.
- 로딩은 다른 부울 값이며, 초기에는 false이지만 쿼리가 실행되면 true로 변경되고 완료되면 false가 되거나 오류가 발생하거나 상관없이 false가 됩니다.

위 세 가지 속성을 통해 페이지의 상태에 따라 화면에 무엇을 표시할지 유연하게 설정할 수 있습니다. 데이터가 로드되는 동안 애니메이션을 표시하거나, 실패한 경우 이미지와 함께 오류 메시지를 표시하거나, 쿼리 호출이 성공한 경우 데이터를 표시할 수 있습니다. 그런데 이 글이 너무 길어지지 않도록 하기 위해 각 경우에 텍스트만 표시하겠습니다: 데이터가 로드되는 동안 if 블록, 오류가 발생한 경우 텍스트, 성공적으로 데이터가 로드되면 목록을 표시합니다.

하지만 useQuery 라인으로 돌아와서: '' 괄호 내부의 변수는 가져온 데이터의 응답 유형을 나타내며, 괄호 내부의 변수는 호출할 쿼리를 지정합니다. 따라서 GET_TEST_DATA 및 TestQuery를 가져올 두 개의 파일이 필요합니다.



GET_TEST_DATA는 간단해요; 미들웨어에 선언된 쿼리와 일치하는 쿼리일 뿐이에요. src 안에 graphql라는 폴더를 만들고 그 안에 queries라는 폴더를 만들고 그 안에 test.ts라는 파일을 만드세요:

```js
import { gql } from "@apollo/client";

export const GET_TEST_DATA = gql`
  query GetTestData {
    test {
      message
      data {
        name
        userId
      }
    }
  }
`;
```

test 블록 안에 있는 내용은 응답 페이로드에 다시 보낼 값을 지정해요. 이렇게 하면 필요한 것만 가져오고 가져오려는 값의 프로세스를 최적화할 수 있어요.

TestQuery의 import는 조금 더 복잡해요. import가 나타내는 바처럼, GraphQL 미들웨어에서의 유형을 인식하여 응답 유형을 생성하고 그것을 프론트엔드로 가져와 유형으로 사용할 수 있도록 파일에 넣는 것을 의도했어요. 이를 위해 frontend 폴더 안에 graphql-types.js라는 파일을 만들어요.



```js
require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');

async function generateTypes() {
  const options = {
    overwrite: true,
    schema: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    documents: 'src/graphql/queries/*',
    generates: {
      'src/generated/graphql.tsx': {
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo'
        ],
        config: {
          withHooks: true,
          withHOC: false,
          withComponent: false,
        }
      }
    }
  };

  try {
    await generate(options, true); // true here means to print generation logs
  } catch (error) {
    console.error('Error during code generation', error);
  }
}

generateTypes();
```

이 파일이 실행되면 generateTypes 함수가 호출되고, 이 함수는 @graphql-codegen/cli 패키지의 generate 함수를 호출합니다. 이 함수는 제공된 GraphQL URL(데이터 처리 미들웨어의 GraphQL URL)을 통해 쿼리의 스키마를 검사하고 형성할 문서 디렉토리를 나타냅니다. 쿼리는 src/graphql/queries에 있으므로 해당 디렉토리의 모든 내용을 가져오기로 선택했습니다. 마지막으로 generates 옵션은 이 생성에서 만들 파일과 위치를 언급하며, 설정과 플러그인을 일치시키기 위한 것입니다. src/generated/graphql.tsx 주소가 익숙한가요? 페이지에서 가져오는 생성된 파일입니다!

마지막으로 필요한 코드 변경은 패키지.json 스크립트를 수정하여 graphql-types.js 파일을 호출하는 것입니다. 이를 위해 다음 스크립트를 추가합니다:

```js
"generate": "node graphql-types.js",
```



프론트엔드가 실행되어 있지 않고 미들웨어가 실행 중인지 확인한 후, npm run generate로 이 스크립트를 실행해야 합니다. 완료되면 frontend/src/generated/graphql.tsx 파일을 확인할 수 있어야 합니다. 파일은 아래와 같이 보이어야 합니다:

```js
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends '$fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** 모든 기본 및 사용자 정의 스칼라, 실제 값으로 매핑됨 */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Response>;
};

export type Response = {
  __typename?: 'Response';
  data?: Maybe<Array<Maybe<UserData>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UserData = {
  __typename?: 'UserData';
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type TestQueryVariables = Exact<{ [key: string]: never; }>;

export type TestQuery = { __typename?: 'Query', test?: { __typename?: 'Response', message?: string | null, data?: Array<{ __typename?: 'UserData', name?: string | null, userId?: string | null } | null> | null } | null };

export const TestDocument = gql`
    query Test {
  test {
    message
    data {
      name
      userId
    }
  }
}
    `;

/**
 * __useTestQuery__
 *
 * React 컴포넌트 내에서 쿼리를 실행하려면 `useTestQuery`를 호출하고 필요한 옵션을 전달하십시오.
 * 컴포넌트가 렌더링될 때, `useTestQuery`는 Apollo Client에서 로딩, 에러 및 데이터 속성을 포함하는 객체를 반환하며
 * UI를 렌더링하는 데 사용할 수 있습니다.
 *
 * @param baseOptions 옵션은 다음에서 지원하는 옵션을 전달할 수 있습니다: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @예시
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions };
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
}

export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions };
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
}

export function useTestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions };
          return Apollo.useSuspenseQuery<TestQuery, TestQueryVariables>(TestDocument, options);
}

export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestSuspenseQueryHookResult = ReturnType<typeof useTestSuspenseQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;
```

TestQuery라는 줄은 페이지 컴포넌트에서 사용하는 응답 데이터를 보여줍니다. 이제 쿼리 응답 데이터에서 추출하고 데이터를 구성하는 작업이 필요한 마지막 코드 조각입니다! 이제 쿼리 호출에서 필드를 사용할 수 있는 인텔리센스 도움을 얻을 수 있어야 합니다.

## 최종 프로젝트 구조



이 튜토리얼의 모든 단계를 따르셨면 다음과 같이 완전한 폴더 구조를 갖게 됩니다:

![folder structure](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_37.png)

## 최종 실행

이제 루트 폴더로 이동하여 npm start 명령어를 실행하세요. 이 명령은 프론트엔드, 미들웨어 및 백엔드 세 앱을 시작합니다.




![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_38.png)

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_39.png)

프론트엔드가 준비되면 http://localhost:3000/test로 이동하면 미들웨어에서 백엔드로부터 데이터를 받은 후 TestPage의 코드를 볼 수 있습니다. 테스트 리졸버에서 추가된 텍스트를 표시합니다:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_40.png)




코드를 저장소에 푸시하세요. 이렇게 하면 Vercel 프로젝트에서 배포가 트리거됩니다. 작업이 완료되면 프론트엔드 배포로 이동해서 /test로 이동하세요:

![이미지](/assets/img/2024-05-14-BuildingaReactJSAppwithGraphQLMiddlewareandNodeJS-MongoDBBackend_41.png)

로컬호스트와 같은 동작을 본다면 성공적입니다! 세 앱이 완전히 연결되어 어떤 사용자 정의도 원할 때 준비가 된 상태입니다. 이 튜토리얼의 마지막 단계에서 바로 작업하길 원한다면 아래 저장소를 포크해도 괜찮습니다: https://github.com/gfcf14/react-graphql-node-mongo-boilerplate 세 앱의 설정을 따릅니다. 다만 Vercel 앱은 직접 설정해주어야 합니다.

그럼 즐거운 코딩되세요! 이 기사가 웹 개발의 전반적인 소프트웨어 개발 경험에 대해 읽는 사람을 깨우칠 수 있기를 희망합니다.