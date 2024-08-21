---
title: "ElysiaJS 소개 및 정리"
description: ""
coverImage: "/assets/img/2024-05-27-FirstLookAtElysiaJS_0.png"
date: 2024-05-27 18:50
ogImage:
  url: /assets/img/2024-05-27-FirstLookAtElysiaJS_0.png
tag: Tech
originalTitle: "First Look At ElysiaJS"
link: "https://medium.com/codex/first-look-at-elysiajs-84ecf1bc8b38"
isUpdated: true
---

## 새로운 번 런타임 환경에서 현대적인 API 구축

중간에 Medium에 오랫동안 없어서 죄송합니다. 제가 계획한 기사 시리즈, 튜토리얼, 고찰 및 코드를 공유하기 위해 기다리고 있습니다.

최근에 프론트엔드 개발자로서 큰 전기를 경험했습니다. 백엔드 개발에 더 많은 시간을 투자해야겠다고 결정했습니다. 최근에 트윗을 읽고 새로운 기술이 Ben Holmes의 의견을 이끈다는 것에 대해 생각해보게 되었습니다.

인터넷 전체(Reddit.com만)를 연구하고 사람들의 의견을 듣고 나니, 개발자들은 여전히 Express를 좋아하는 것으로 결론을 내렸습니다. Express는 인터넷에 많은 것을 제공해 왔으며 여전히 가장 안정적인 라이브러리 중 하나입니다. 하지만 저는 개인적으로 다른 기술을 시도하고 다른 기술에 도전하고 싶었습니다. 그때 발견한 것이 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 번

![이미지](/assets/img/2024-05-27-FirstLookAtElysiaJS_0.png)

와 어마어마해! 그게 필요한 거잖아. 또 다른 자바스크립트... 잠깐, 런타임 환경?

맞아, 라이브러리나 프레임워크가 아니야; 런타임 환경이거든. 2018년에 Ryan Dahl이 Node 문제를 해결하기 위해 Deno를 발명했지만, 그렇게 유명해진 것 같지는 않아.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

2023년 9월 8일, Bun이 첫 안정 버전을 출시했어요. 많은 JavaScript 개발자들이 이 새로운 런타임 환경을 시도 중이고 매우 유망해 보여요. Next, Nuxt, SvelteKit과 같은 유명한 프론트엔드 프레임워크들이 Bun을 사용할 수 있는 옵션을 제공하고 있어요. 저는 Bun 라이브러리들을 살펴보았고 API를 구축하기 위해 이것을 배우기로 결정했어요:

# ElysiaJS

![ElysiaJS](/assets/img/2024-05-27-FirstLookAtElysiaJS_1.png)

ElysiaJS는 자신을 "에르고노믹 프레임워크"로 소개하며 엔드투엔드 유형 안전성을 제공한다고 주장해요. 이 언어를 시험해보고 나서, 나는 이것을 매우 직관적으로 느꼈어요. 풍부한 API, 훌륭한 플러그인 관리 및 원하는 것이 정확히 얻을 수 있도록 보증해주는 견고한 유효성 검사 API가 있어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Elysia 설치하기

이 문서에서는 이미 Bun을 설치했다고 가정합니다. 다음과 같이 새로운 Elysia 애플리케이션을 생성할 수 있습니다:

```js
bun create elysia hello-server
cd hello-server
```

기존 애플리케이션이 있다면, Elysia를 다음과 같이 설치할 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
bun add elysia
```

그리고 여기에 자세히 설명된 패키지.json 파일에 필요한 스크립트를 설정하세요.

# ElysiaJS 첫 번째 살펴보기

몇 줄의 코드로 매우 간단한 서버를 시작할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
/* src/index.ts */
import { Elysia } from "elysia";

const app = new Elysia()
  .onStart(() => console.log("서버가 시작되었습니다!"))
  .get("/", () => "안녕하세요 서버")
  .listen(8080);
```

이 서버를 실행하고 테스트할 수 있습니다:

```js
$ bun dev
서버가 시작되었습니다!

$ curl http://localhost:8080/
안녕하세요 서버
```

더 많은 라우트를 그룹화하고 생성하기 위해 인스턴스를 만들고 메인 애플리케이션에서 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```json
{
  "scripts": {
    "start": "node src/index.ts"
  },
  "dependencies": {
    "elysia": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^4.0.3"
  }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

대부분의 프레임워크는 Elysia가 하는 일을 합니다. 그런데 왜 Elysia가 다른 것일까요? 그것은 타입 안전성과 유효성 검사 때문입니다. 위의 나이 예제를 고려해보세요. 나이는 어떤 타입이든 될 수 있습니다. 이것은 타입 안전하지 않습니다.

```js
/* src/index.ts */
import { Elysia, t } from "elysia";

const age = new Elysia()
  .get("/age", () => "당신의 나이를 모릅니다.")
  .post("/age", ({ body: { age } }) => `안녕하세요, 당신은 ${age}살 입니다.`, {
    body: t.Object({
      age: t.Number(),
    }),
  });

const app = new Elysia()
  .onStart(() => console.log("서버가 시작되었습니다!"))
  .get("/", () => "안녕하세요 서버")
  .use(age)
  .listen(8080);
```

이 서버를 다시 실행하고 bun dev를 사용하여 테스트해보세요.

```js
$ curl -v -H "Content-Type: application/json" \
>   -X POST \
>   -d '{"age": "20"}' \
>   http://localhost:8080/age
{
  "type": "body",
  "at": "age",
  "message": "예상된 숫자",
  "expected": {
    "age": 0
  },
  "found": {
    "age": "20"
  },
  "errors": [
    {
      "type": 41,
      "schema": {
        "type": "number"
      },
      "path": "/age",
      "value": "20",
      "message": "예상된 숫자"
    }
  ]
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

ElysiaJS에서는 나이 대신 숫자가 아닌 문자열을 보내면 오류가 발생합니다. 서버 측 개발자로서, 본문 데이터를 수동으로 유효성 검사할 필요가 없었습니다. 응답의 헤더를 보면 HTTP/1.1 400 Bad Request가 반환되는 것을 확인할 수 있습니다. 정수를 전달하면 curl이 성공합니다.

```js
$ curl -v -H "Content-Type: application/json" \
>   -X POST \
>   -d '{"age": 20}' \
>   http://localhost:8080/age
Hi, you are 20 years old
```

# ElysiaJS/Eden

이것은 Type-Safety 제목의 확장입니다. API 엔드포인트를 테스트할 때 curl을 사용했습니다. 개발자로서, Postman이나 wget을 사용할 수도 있지만 이러한 도구들은 타입 안전하지 않습니다. 요청을 할 때 실수를 하면 정의되지 않은 동작이 발생할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프론트엔드 애플리케이션은 API 요청을 할 때 타입 오류가 발생하기 쉽습니다. tRPC는 이 기능을 제공하는 좋은 시도였지만, 프로젝트를 구현하기 위한 적응성이 큰 단점이었습니다. Eden은 이 문제를 훌륭하게 해결하여 이 시리즈의 향후 기사에서 자세히 다루겠습니다.

Eden으로 돌아와서, 라우트가 원하는 대로 작동하는지 확인하기 위해 일부 유닛 테스트를 작성해보겠습니다. 먼저 index.ts에서 애플리케이션 타입을 내보내야 합니다.

```js
/* src/index.ts */
import { Elysia, t } from "elysia";

const age = new Elysia()
  .get("/age", () => "당신의 나이를 모르겠어요")
  .post("/age", ({ body: { age } }) => `안녕하세요, 당신은 ${age}살 입니다`, {
    body: t.Object({
      age: t.Number(),
    }),
  });

const app = new Elysia()
  .onStart(() => console.log("서버가 시작되었습니다!"))
  .get("/", () => "안녕하세요 서버")
  .use(age)
  .listen(8080);

export type App = typeof app; // <- 타입을 내보내기
```

두 번째로, 유닛 테스트를 작성할 수 있습니다. 의존성으로 @elysiajs/eden을 설치해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
/* test/route.test.ts */
import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { type App } from "../src";

const BASE_URL = "http://localhost:8080";
const app = edenTreaty < App > BASE_URL;

describe("Age API", () => {
  it("GET / works as expected", async () => {
    const { data, status } = await app.get();

    expect(data).toBe("Hello Server");
    expect(status).toBe(200);
  });

  describe("/age routes", () => {
    it("GET /age returns IDK", async () => {
      const { data, status } = await app.age.get();

      expect(data).toBe("I don't know your age");
      expect(status).toBe(200);
    });

    it("POST /age with number returns OK", async () => {
      const body = { age: 20 };
      const { data, status } = await app.age.post(body);

      expect(data).toBe(`Hi, you are ${body.age} years old`);
      expect(status).toBe(200);
    });

    it("POST /age with string returns error", async () => {
      const body = { age: "20" };
      const { status, error } = await app.age.post(body);

      expect(status).toBe(400);
      expect(error).toBeTruthy();
    });

    it("POST /age with wrong key returns error", async () => {
      const body = { myAge: "20" };
      const { status, error } = await app.age.post(body);

      expect(status).toBe(400);
      expect(error).toBeTruthy();
    });
  });
});
```

우리가 가진 라우트에 대한 유형이 edenTreaty에서 반환될 때 다음과 같이 매핑됩니다:

```js
GET /              -> app.get()
GET /age           -> app.age.get()
POST /age          -> app.age.post(body)

GET /api/books     -> app.api.books.get()
GET /api/books/:id -> app.api.books[id].get()
POST /auth/login   -> app.auth.login.post(body)
```

http://localhost:8080에서 서버를 실행 중이라면, 애플리케이션을 테스트해보세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

$ bun test
bun test v1.0.30 (1424a196)

test/route.test.ts:
✓ Age API > /age routes > GET /age returns IDK [3.70ms]
✓ Age API > /age routes > POST /age with number returns OK [1.35ms]
✓ Age API > /age routes > POST /age with string returns error [5.12ms]
✓ Age API > /age routes > POST /age with wrong key returns error [0.94ms]
✓ Age API > GET / works as expected [0.59ms]

5 pass
0 fail
10 expect() calls
Ran 5 tests across 1 files. [43.00ms]

Eden은 E2E Type Safety를 얻을 수 있는 훌륭한 도구입니다. 이를 프런트엔드 애플리케이션에서 사용하거나 서버를 테스트할 때 활용할 수 있습니다.

# 결론

안타깝게도 이 글은 너무 길어져서 종료하겠습니다. 유용한 기능을 가진 Elysia에 대한 설명을 계속 진행할 수 없어서 유감스럽습니다. 더 많은 정보를 알고 싶다면 여기에서 문서를 확인할 수 있습니다. Elysia 팀은 훌륭한 일을 하고 있고 이 라이브러리가 밝은 미래를 가질 것으로 기대합니다. 첫 안정적인 릴리스를 기대할 수밖에 없네요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

제 기사를 즐겁게 읽어 주셨기를 바랍니다. 무슨 교훈이 있다면 더 좋겠네요. 감사합니다!

```js
연결하고 싶으시면?

내 GitHub 프로필.
내 포트폴리오 웹사이트.
```
