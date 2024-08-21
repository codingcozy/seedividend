---
title: "Next.js를 위한 실제 API 미들웨어 작성 방법"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoWriteActualAPIMiddlewareforNextjs_0.png"
date: 2024-05-01 18:07
ogImage:
  url: /assets/img/2024-05-01-HowtoWriteActualAPIMiddlewareforNextjs_0.png
tag: Tech
originalTitle: "How to Write Actual API Middleware for Next.js"
link: "https://medium.com/sopra-steria-norge/how-to-write-actual-api-middleware-for-next-js-2a38355f6674"
isUpdated: true
---

<img src="/assets/img/2024-05-01-HowtoWriteActualAPIMiddlewareforNextjs_0.png" />

어플리케이션을 위한 웹 클라이언트나 특정한 종류의 컨셉 프로젝트를 구현해야 할 때 저는 본능적으로 Next.js를 선택합니다. 몇 년 전, 제가 구현해야 했던 어플리케이션은 Next.js 버전 12가 나온 시기에 맞춰 만들어졌었는데, 이 때 공개된 많은 새로운 기능들에 대해 듣게 되어 흥분했습니다. 그 중에서도 API Middleware의 출시는 저에게 가장 흥미로운 기능 중 하나였습니다.

하지만 이 흥분은 잠시 지속되었습니다. 그들의 구현은 이름은 같고 개념적으로 유사하지만, 이전에 있던 것을 재탄생시킨 느낌이었고, 결과적으로 베이스림에 담긴 벽돌 같은 느낌을 주었습니다.

# Middleware가 어떤 문제를 해결하나요?

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

Next.js API routes는 정말 편리한 방법 중 하나로, 클라이언트에 API를 추가할 수 있습니다. 해야 할 일은 api 디렉토리 내에 새 파일을 만들고 함수를 작성하는 것 뿐입니다.

```js
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
```

시작하기에는 이 간단함이 좋지만, 복잡성을 구현 수준으로 미루는 결과가 될 수 있습니다.

예를 들어, 구현에서 요청 유형 분기 처리를 처리해야 합니다.

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
export default function handler(req, res) {
  if (req.method === "POST") {
    // POST 요청 처리
  } else {
    // 다른 모든 HTTP 메소드 처리
  }
}
```

이제 사용자가 인증되었는지 확인하고 싶다면 어떻게 해야 할까요? 해당 내용은 라우트 핸들러 내에서 처리해야 합니다.

```js
export default function handler(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).send("권한이 없습니다");
  }
  // 구현
}
```

이러한 방식으로 계속 하다 보면, 핸들러 구현 앞에 조건들이 계속 쌓이는 것을 알게 되고, 더 나쁜 일로, 핸들러 간에 많은 복사 및 붙여넣기 작업이 필요합니다. 이는 완전히 혼란스러워집니다.

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

# 보통 이 문제는 어떻게 해결하나요?

이 문제는 Express와 같은 프레임워크를 사용하여 매우 우아하게 해결됩니다.

우리의 코드는 아래와 같이 보일 수 있어요:

```js
app.post("/hello", requireAuth, validatePayload, doUsefulStuff, respond);
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

이는 구현된 다음 인터페이스를 준수하는 한 재사용 가능한 여러 함수를 서로 쌓을 수 있게 해줍니다:

- 함수는 next라는 매개변수를 가져야 하며, 이 매개변수는 함수여야 합니다.
- 사용자 정의 로직이 실행된 후, 체인 내의 다음 함수로 이동하려면 next()를 호출하거나 즉시 요청에 응답해야 합니다.

```js
function myMiddleware(req, res, next) {
  // 일부 검사 수행
  next();
}
```

이제 이러한 미들웨어를 목록에 추가하여 활성화하거나 제거하거나 주석 처리하여 비활성화할 수 있습니다.

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

이 문법은 매우 명확하며 코드를 재사용할 수 있어요.

# Next.js에서 미들웨어 문제를 어떻게 해결하나요?

Next.js 문서를 보면 middleware.js 파일을 생성하고 미들웨어를 구현하라고 합니다. 이 부분이 조금 마음에 들지 않지만 계속해 봅시다.

```js
// middleware.js

export function middleware(request) {
  return response;
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

미들웨어를 구현한 후에는 Next.js에 해당 미들웨어가 실행되어야 하는 위치를 알려주는 구성 객체를 내보내야 합니다.

```js
// 미들웨어.js

export const config = {
  matcher: "/api/:여러분의-엔드포인트-여기에*",
};
```

이 구성 객체에서는 정규 표현식을 지원하는 매처를 지정할 수 있습니다.

만족스럽지 않다면, 미들웨어 선언 내에서 조건문을 활용하여 사용자 정의 로직을 적용해볼 수도 있습니다.

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
// middleware.js

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
```

여기서 약간의 점들이 왜 저는 이 방식을 좋아하지 않는지에 대해 이야기해 드리겠습니다:

- 미들웨어 구현이 담긴 전용 middleware.js 파일이 있으면 조잡하게 느껴집니다. 라우트가 정의된 곳에 내 미들웨어를 두고 싶어요.
- 설정과 매처 접근 방식은 정말로 필요 없어보입니다. 왜 내 미들웨어를 실행하려면 매처와 정규식을 작성해야 하는 건가요? 이미 디렉토리 구조로 라우트를 설정했는데 (제가 처음에 Next.js를 선택한 가장 큰 이유가 이것인데) 이제 다른 연관성 없는 곳으로 가서 매처나 조건문을 작성해야 한다니요.

몇 가지 상황에서는 이러한 방식이 실용적일 수 있는데, 예를 들어 애플리케이션 수준에서 모든 요청에 대해 실행되는 미들웨어를 사용하는 경우 등이 있습니다.

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

말씀하신 대로, 이 기능의 디자인은 별로 마음에 들지 않아요. 미들웨어를 정의하고 라우트를 정의하는 곳과 같이 깔끔하게 쌓아 나열하고 유지 관리하기 쉽게 만들고 싶어요.

# API 라우트를 위한 사용자 정의 미들웨어

최근 Next.js에서 라우트 핸들러를 출시했지만, 대부분의 사람들(포함해서 저도)은 여전히 대부분의 프로젝트에서 API 라우트를 사용하고 있기 때문에, 먼저 API 라우트의 구현 방법에 대해 다루겠습니다.

소스 코드는 GitHub에서 사용 가능하며, 아래 예시에서는 간단한 JavaScript를 사용하겠습니다. 이는 의사코드와 유사하지만 여전히 작동합니다.

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

아래 코드는 우리가 루트가 작동하는 방식을 설명한 것입니다.

```js
// src/pages/api/hello.js

const middleware_1 = async (req, res, next) => {
  console.log("Running middleware 1");
  next();
};
const middleware_2 = async (req, res, next) => {
  console.log("Running middleware 2");
  next();
};
const middleware_3 = async (req, res, next) => {
  console.log("Running middleware 3");
  next();
};
const middleware_4 = async (req, res, next) => {
  console.log("Running middleware 4");
  next();
};
const hello = async (req, res) => {
  res.status(200).json({ message: "Hello World." });
};
export default handler(middleware_1, middleware_2, middleware_3, middleware_4, hello);
```

언제든지 미들웨어 체인 중간에서 next() 함수 대신 res 객체를 사용하여 응답할 수 있어야하며, 그때 체인이 실행이 중단됩니다. 또한 미들웨어는 다른 곳에서 선언되어 재사용 가능하도록 작성되고 루트로 가져와야 합니다.

이러한 기능을 구현하기 위해 할 일은 여기서 호출하고 있는 handler 함수를 구현하는 것뿐입니다.

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

아래에 예시 구현을 확인할 수 있고, 소스 코드는 여기서 찾을 수 있습니다.

```js
// src/pages/middleware/handler.js

const execMiddleware = async (req, res, middleware, index = 0) => {
  if (res.headersSent || !middleware[index]) return;
  if (typeof middleware[index] !== "function") {
    res.status(500).end("Middleware must be a function!");
    throw new Error("Middleware must be a function!");
  }
  await middleware[index](req, res, async () => {
    await execMiddleware(req, res, middleware, index + 1);
  });
};

export const handler =
  (...middleware) =>
  async (req, res) => {
    await execMiddleware(req, res, middleware);
  };
```

추가적으로, 여기에서 사용할 수 있는 allowMethods 미들웨어가 포함되어 있어요. 라우트에서 다음과 같이 사용할 수 있습니다:

```js
// src/pages/api/hello.js

export default handler(allowMethods(["GET", "PUT"]), hello);
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

# 라우트 핸들러를 위한 사용자 지정 미들웨어

라우트 핸들러는 Next.js에서 최신 API 구현 접근 방식이며, 앞으로 채택할 것을 권장합니다.

한편으로는 HTTP 메소드(GET, POST, PUT 등)별로 명명된 내보내기가 필요하게 되어 좋아하지만, 핸들러 내에서 명시적으로 응답 값을 반환해야 하는 변경 사항에는 큰 부담을 느낍니다.

위와 마찬가지로 소스 코드는 GitHub에서 확인할 수 있으며, 우리가 구현하고 있는 기능을 설명하기 위해 간단한 JavaScript를 사용하겠습니다.

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

아래 코드는 우리가 원하는 라우트 작업 방식을 보여줍니다.

```js
// src/app/api/hello/route.js

const middleware_1 = async (req, next) => {
  console.log("Running middleware 1");
  next();
};

const middleware_2 = async (req, next) => {
  console.log("Running middleware 2");
  next();
};

const middleware_3 = async (req, next) => {
  console.log("Running middleware 3");
  next();
};

const middleware_4 = async (req, next) => {
  console.log("Running middleware 4");
  next();
};

const hello = async (req) => {
  return NextResponse.json({ data: "Hello World" });
};

export const GET = handler(middleware_1, middleware_2, hello);

export const POST = handler(middleware_3, middleware_4, hello);
```

한 번 더 강조하지만, 미들웨어 체인에서 언제든지 응답을 반환하여 next() 함수를 호출하는 대신 응답을 반환할 수 있으며, 체인이 실행을 중지합니다.

아래는 handler 함수의 예시 구현입니다. 소스 코드는 여기에서 찾을 수 있습니다.

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
// src/app/middleware/handler.js

export const handler =
  (...middleware) =>
  async (request) => {
    let result;
    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false;
      const next = async () => {
        nextInvoked = true;
      };
      result = await middleware[i](request, next);
      if (!nextInvoked) {
        break;
      }
    }
    if (result) return result;
    throw new Error("핸들러 또는 미들웨어가 NextResponse를 반환해야 합니다!");
  };
```

# 결론

당연히 취향의 문제일 수 있지만, 우리는 50줄 이하의 코드로 Next.js에 우리의 미들웨어 구현을 성공적으로 적용했고, 이것은 내 기준에서 이긴 것입니다.

Next.js가 가는 방향에 대해서는, 우리가 그냥 우회로에 들어간 것이고 곧 간단하고 깨끗하며 쉬운 개발자 경험으로 돌아갈 것을 손가락을 꼬집었어요. 몇 년 전에 그들의 개발 경험이 얼마나 부드러운지 보았을 때 반해버렸으며, 아직 희망을 버리지 않았습니다.

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

미들웨어 패턴에 대해서는 어떤 프로젝트에든 자유롭게 코드를 활용하셔도 괜찮아요. 이는 로직을 세분화하여 작은 조각으로 쌓는 훌륭한 방법입니다.

호기심을 잃지 말고, 즐거운 코딩되세요!
