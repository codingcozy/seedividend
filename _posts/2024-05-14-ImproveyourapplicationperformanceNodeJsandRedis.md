---
title: "애플리케이션 성능을 향상시키세요 Nodejs와 Redis"
description: ""
coverImage: "/assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_0.png"
date: 2024-05-14 15:52
ogImage: 
  url: /assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_0.png
tag: Tech
originalTitle: "Improve your application performance : NodeJs and Redis"
link: "https://medium.com/@essaadani.yo/improve-your-application-performance-nodejs-and-redis-ed90cbce0763"
---



![사진](/assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_0.png)

데이터베이스에서 데이터를 가져올 때마다 서버에 요청이 들어올 때마다 대기하는 것에 지쳤나요? 연결을 열고 쿼리를 실행하는 것은 애플리케이션의 속도를 늦출 수 있습니다. 그러나 만약 그 모든 것을 우회할 수 있는 방법이 있다면 어떨까요?

캐싱이 바로 그 방법입니다.

캐싱을 사용하면 자주 액세스하는 데이터를 임시 저장소에 저장하여 가져오는 데 걸리는 시간을 현저히 줄일 수 있습니다. 그리고 Redis는 Node.js 애플리케이션의 완벽한 동반자인 고속인 메모리 데이터 저장소입니다.




하루, 한 시간 또는 심지어 일 분 동안 데이터를 캐싱해두고 Redis가 데이터베이스를 쿼리하는 데 걸리는 시간의 한 부분으로 데이터를 제공한다고 상상해보세요. 마치 마법처럼 — 여러분의 사용자는 데이터를 더 빨리 받을 수 있고, 서버는 땀 한 방울 흘리지 않고 더 많은 요청을 처리할 수 있습니다.

그럼 왜 기다릴까요? Redis가 여러분의 Node.js 애플리케이션에서 데이터를 처리하는 방식을 혁신시키게 두세요. 데이터베이스 병목 현상에 작별을 고하고 번쩍번쩍 속도를 내는 것을 환영하세요. Redis의 속도에 놀라시는 것이 바로 지금입니다.

# 요구 사항

본 문서에서는 ExpressJs, Redis 그리고 NodeJs를 사용하여 데이터를 캐싱하고 HTTP 요청을 처리할 것입니다. 그러므로 NodeJs, NPM, Docker를 준비하는 것이 좋습니다.
Redis 서버를 생성하여 저장 및 데이터 검색을 다루기 위해 Docker를 사용할 것입니다.



# 애플리케이션 설정 및 실행

작업할 디렉토리를 만들고, 해당 디렉토리 내에 애플리케이션 소스 코드를 포함하는 src라는 또 다른 디렉토리와 docker-compose.yml이라는 다른 파일을 생성하세요.
최종 구조는 다음과 같아야 합니다:

![애플리케이션 구조](/assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_1.png)

src 폴더 내부에서 다음 명령을 실행하세요:



```js
npm i express redis
npm i -D nodemon
```

그런 다음 package.json을 업데이트하여 일부 새로운 명령어 별명을 포함시킬 수 있습니다. 아래 예시를 복사하세요.

```js
{
  "name": "src",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js",
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2",
    "redis": "^4.6.13"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

그런 다음 src 폴더에 app.js 파일을 만들고 다음 라인을 포함시킵니다:



```js
import express from "express";
const PORT = 4000;
const app = express();

app.get("/", async (req, res) => {
  return res.json("Hello World!!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

위의 코드를 실행하려면 다음 명령을 사용하십시오:

```js
npm run dev
```

그리고 http://localhost:4000/을 방문하여 "Hello World!!"를 볼 수 있습니다.



이제 터미널을 종료하여 서버를 중지하고 Redis에 연결을 시도해보겠습니다.
아래의 코드를 app.js에 추가해주세요.

```js
import { createClient } from "redis";
const client = createClient();
client.on("error", (err) => console.error("Redis Client Error", err));
client
  .connect()
  .then((suc) => console.info(`Redis connected`))
  .catch((err) => console.error(`Error occured while redis is connecting, ${err}`));
```

이를 통해 애플리케이션과 Redis 서버 간에 연결이 생성됩니다.

지금 애플리케이션을 실행해보면 충돌이 발생할 것입니다. 그 이유는 아직 Redis 서버를 설정하지 않았기 때문입니다. 따라서 지금 설정을 해보겠습니다.
docker-compose.yml 파일에 다음 라인을 복사해주세요.



```yaml
버전: "3.8"
서비스:
  캐시:
    이미지: redis:6.2-alpine
    재시작: 항상
    포트:
      - "6379:6379"
    볼륨:
      - cache:/data
볼륨:
  캐시:
    드라이버: 로컬
```

메인 디렉토리에서 다음 명령어를 실행하세요:

```js
docker-compose build
docker-compose up -d
```

참고: 명령어를 실행하려면 컴퓨터에 Docker가 설치되어 있어야 합니다.



어제 후면을 다시 실행하면 다음이 출력됩니다:
서버가 http://localhost:4000에서 실행 중입니다
레디스 연결됨

좋아요!! 계속 진행합시다

이제 app.js 파일을 다음 라인을 포함하도록 조정해보세요:

```js
const getData = async () => {
  //이 부분은 데이터베이스에 쿼리하여 데이터를 가져 오는 것으로 가정합시다
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["bar", "baz", "qux"]);
    }, 1_000);
  });
};

app.get("/", async (req, res) => {
  let data;
  let from = "DB";
  data = await client.get("foo");
  if (!data) {
    data = await getData();
    await client.set("foo", JSON.stringify(data), {
      EX: 60,
    });
  } else {
    from = "Cache";
    data = JSON.parse(data);
  }
  return res.json({ data, from });
});
```



여기서는 데이터 배열을 검색하고 60초 동안 캐시에 저장하는 가짜 프로미스를 만들어 보았습니다. 데이터가 얼마나 자주 변경되는지에 따라 변경할 수 있습니다.

이제 다시 http://localhost:4000 으로 이동하세요.
데이터를 수신했다는 배열이 포함된 데이터가 표시됩니다. "from" 값이 "DB"인 것을 확인할 수 있을 겁니다. 페이지를 새로 고치면 "from"이 "Cache"인 같은 빠른 응답을 확인할 수 있을 겁니다.

캐시 이전:

![이미지](/assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_2.png)



캐싱 후:

<img src="/assets/img/2024-05-14-ImproveyourapplicationperformanceNodeJsandRedis_3.png" />

캐싱하기 전에 시간 차이를 볼 수 있습니다. 캐싱하기 전에는 1초가 걸렸는데, 이는 우리가 약속을 1초 동안 기다리도록 설정했기 때문입니다. 하지만 실제로는 데이터 크기와 작업하고 있는 데이터베이스에 따라 더 짧거나 더 오래 걸릴 수 있습니다. 그러나 캐싱을 사용하면 데이터를 매번 데이터베이스에서 가져오는 것보다 더 빠르게 검색할 수 있습니다.

# 결론



이것은 일반적인 개요예요. 자주 요청되는 데이터를 저장하는 캐싱 메커니즘을 포함하는 중요성을 설명하려고 노력했어요. 이것은 애플리케이션 성능을 향상시키고 클라이언트가 요청 처리를 기다리는 시간을 줄일 거예요. 제 첫 번째 글이에요. 읽어주셔서 감사해요. 누군가에게 도움이 되길 바라요!