---
title: "타입스크립트를 사용하여 Express 에러를 프로처럼 처리하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ExpressErrorHandlingLikeaProusingTypescript_0.png"
date: 2024-06-22 03:26
ogImage:
  url: /assets/img/2024-06-22-ExpressErrorHandlingLikeaProusingTypescript_0.png
tag: Tech
originalTitle: "Express Error Handling Like a Pro using Typescript"
link: "https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188"
isUpdated: true
---

![2024-06-22-ExpressErrorHandlingLikeaProusingTypescript_0](/assets/img/2024-06-22-ExpressErrorHandlingLikeaProusingTypescript_0.png)

# 소개

Express는 Node.js를 위한 인기 있는 서버 프레임워크로, 웹 애플리케이션과 API를 만드는 프로세스를 간단히하는 데 사용됩니다.

Express는 강력하고 유연한 환경을 제공하여 웹 애플리케이션을 구축하는 데 도움이 되지만, 배포 환경으로 사용할 때 신뢰성, 유지 보수성 및 보안을 보장하기 위해 개발자가 주의해야 할 에러 핸들링이 중요합니다.

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

잘 구조화된 오류 처리 메커니즘은 예기치 못한 충돌을 방지하고 보안 취약점을 노출시키지 않으며, 무언가 잘못되었을 때 의미 있는 오류 메시지를 제공하여 사용자 경험을 향상시킬 수 있습니다. 우리는 Typescript를 사용하여 응용 프로그램에서 오류 처리를 실제로 개선하기 위한 강력한 도구인 이유를 살펴볼 것입니다. 이 기사에서는 프로덕션용 Express 애플리케이션에서 오류를 효과적으로 처리하기 위한 몇 가지 최상의 방법론과 전략을 탐색할 것입니다.

다음 섹션에서 예시 Express 서버를 설정하는 것으로 시작하겠습니다!

# Express 서버 설정

이 기사에서는 Express 서버가 포함된 시작 프로젝트 템플릿을 준비했습니다. 해당 레포지토리에서 프로젝트를 복제할 수 있습니다. 프로젝트를 다운로드한 후, 다음 명령을 실행하여 모든 종속성을 설치하세요:

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
cd express-error-handling && npm install
```

이제 프로젝트 구조를 살펴보겠습니다:

![프로젝트 구조](/assets/img/2024-06-22-ExpressErrorHandlingLikeaProusingTypescript_1.png)

서버는 index.ts에서 8000 포트에서 시작되어 듣고 있습니다.

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
/** src/index.ts **/

import app from "./app";

const initServer = async () => {
  app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
  });
};

initServer();
```

Express 서버의 모든 설정은 아래와 같이 app.ts 내에서 수행됩니다:

```js
/** src/app.ts **/

// 전역 의존성
import express from "express";
import { json } from "body-parser";

// 프로젝트 의존성
import userRouter from "./routes/users";

// Express 초기화
const app = express();

// 미들웨어
app.use(json());

// 라우터
app.use(userRouter);

export default app;
```

이 예제 서버에서는 routes/users.ts에 위치한 하나의 엔드포인트가 있습니다:

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
/** src/routes/users.ts **/

import { Request, Response, Router } from "express";

const router = Router();

const userData = [
  {id: 1, name: "Sam"},
  {id: 2, name: "Bob"},
  {id: 3, name: "Joe"},
];

const fetchUserData = (): Promise<typeof userData> => {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    setTimeout(() => {
      if(randomNum === 1) {
        reject("오류: 뭔가 잘못되었습니다!");
      } else {
        resolve(userData);
      }
    }, 1000);
  })
};

const getHandler = async (req: Request, res: Response) => {
  const { id } = req.query;
  if(!id) {
    return res.status(400).send({ message: "Id가 필요합니다!" });
  }

  try {
    const fetchedUserData = await fetchUserData();
    let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id as string));
    return res.status(200).send({ data: filteredUserData });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const postHandler = (req: Request, res: Response) => {
  const { name } = req.body;
  if(!name) {
    return res.status(400).send({ message: "이름이 필요합니다!" });
  }

  const newUser = {
    id: userData.length + 1,
    name,
  };

  userData.push(newUser);
  return res.status(201).send({ data: newUser });
};

router.get("/users", getHandler);
router.post("/users", postHandler);

export default router;
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

getHandler가 비동기이고 postHandler는 동기입니다. 이는 각 라우트 핸들러에서 발생하는 오류를 어떻게 처리할지에 역할을 하며, 나중에 왜 그러한지 알게 될 것입니다. 우선 그것을 염두에두세요.

제공된 코드의 오류 처리 기술은 일반적인 접근 방식과 구체적인 오류 처리의 부재로 인해 프로덕션 수준 애플리케이션에 적합하지 않습니다. 이것은 작은 프로젝트이기 때문에 즉시 영향을 보지 못할 수 있습니다. 그러나 가령 수백 개의 엔드포인트가 있는 익스프레스 서버가 있고 매일 여러 개발자가 작업하고 있다고 상상해봅시다. 서로 다른 엔드포인트를 통해 동일 유형의 오류에 대한 클라이언트 연결이 동일한 응답을 받도록 일관된 오류 인터페이스를 어떻게 보장할 수 있을까요?

예를 들어, getHandler에서 요청에 id 쿼리 매개변수가 지정되지 않았다면 상태 코드 400과 메시지 속성이 있는 객체로 응답을 보냅니다. 새로운 개발자가 분리된 엔드포인트에서 작업하다가 동일 유형의 오류에 대해 같은 유형의 응답을 보내려고 하지만 오류 속성을 포함한 객체를 사용하기로 결정한다고 상상해 봅시다. 이 경우 연결된 클라이언트는 서버에서 유래할 수 있는 모든 가능한 오류 형식을 알아야 하므로 이는 지속 가능한 패턴이 아닙니다.

다음 섹션에서 익스프레스 서버에서 올바른 오류 처리에 사용되는 기술을 보여드리겠습니다.

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

# Express 기본 오류 처리기

Express 기본 오류 처리기는 Express에서 제공하는 내장 오류 처리 미들웨어입니다. 이는 응닑-요청 주기 동안 발생하는 오류를 처리하는 대체 메커니즘으로 작용하지만 응용 프로그램의 라우트 핸들러나 사용자 정의 오류 미들웨어에서 명시적으로 처리되지 않은 경우에 대비합니다.

기본 오류 처리기는 err, req, res 및 next라는 네 개의 인수를 취합니다. err 인수는 오류 객체를 나타내고, req와 res는 각각 요청 및 응답 객체입니다. next 함수는 미들웨어 스택에서 다음 오류 처리 미들웨어(있는 경우)로 오류를 전달하는 데 사용됩니다.

기본 오류 처리기는 개발 중에 처리되지 않은 오류를 빠르게 식별하는 데 유용하지만, 일반적으로 프로덕션 환경에서는 적합하지 않습니다. 프로덕션에서는 보다 견고한 오류 처리를 제공하는 사용자 정의 오류 처리 미들웨어로 기본 오류 처리기를 대체하고, 적절한 로깅, 사용자 친화적인 오류 응답 및 서로 다른 유형의 오류를 구분하는 기능을 제공해야 합니다.

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

기본 오류 처리기를 교체하려면 네 가지 인수 (err, req, res 및 next)를 사용하는 사용자 지정 오류 미들웨어를 만들어 해당 미들웨어 내에서 오류 처리 로직을 정의할 수 있습니다. 이렇게 함으로써 오류 응답을 더욱 세밀하게 제어할 수 있으며 응용 프로그램이 제품 환경에서 신뢰성 있게 동작하고 안전하게 운영되도록 할 수 있습니다. 아래에 샘플 사용자 지정 오류 처리기 미들웨어가 표시되어 있습니다.

```js
/** src/middlewares/errors.ts **/

import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
```

위의 핸들러는 간단히 err 객체를 가져와서 해당 객체를 로깅한 후에 500 상태로 클라이언트에게 응답을 보냅니다.

미들웨어 폴더를 만들고, 해당 폴더 안에 위의 오류 처리기 코드를 담은 새로운 errors.ts 파일을 만들어 보도록 하겠습니다. 그리고 app.ts 파일 내에서 express 서버와 연결된 내보내기된 에러 핸들러를 연결할 수 있습니다.

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
/** src/app.ts **/

// 글로벌 의존성
import express from "express";
import { json } from "body-parser";

// 프로젝트 의존성
import userRouter from "./routes/users";
import errorHandler from "./middlewares/errors";

// 익스프레스 초기화
const app = express();

// 미들웨어
app.use(json());

// 라우트
app.use(userRouter);

// 오류 처리
app.use(errorHandler); // <--------- errorHandler를 사용 중

export default app;
```

즉, 라우트나 미들웨어에서 오류가 발생하면 errorHandler에서 처리됩니다. 그러나 여기에 한 가지 주의해야 할 점이 있습니다. 동기식 라우트 핸들러와 비동기식 라우트 핸들러에서 오류를 처리하는 방법이 다르며 다음 두 섹션에서 그 차이를 알아볼 것입니다.

# 동기식 오류

우선 동기식 라우트 핸들러에서 오류를 처리하는 방법을 살펴봅시다. 이것은 더 쉬운 방식으로 다룰 수 있습니다. users.ts의 postHandler를 아래와 같이 변경해봅시다:

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
/** src/routes/users.ts **/

const postHandler = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Name is required!");
    // return res.status(400).send({ message: "Name is required!" });
  }

  const newUser = {
    id: userData.length + 1,
    name,
  };

  userData.push(newUser);
  return res.status(201).send({ data: newUser });
};
```

사용자 엔드포인트에 이름이 요청 본문에 포함되지 않은 요청을 보내보세요. 서버는 응답 본문에서 오류 배열과 함께 500 상태 코드로 응답합니다.

동기적 루트 핸들러에서 오류가 발생하면 사용자 정의 오류 처리기 미들웨어가 즉시 잡아내고 클라이언트에 응답을 보내기 전에 사용자 정의 논리를 적용합니다. 이제 다음 섹션에서 비동기 루트 핸들러에서 발생하는 오류를 처리하는 방법을 살펴봅시다.

# 비동기 오류

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

지금은 users.ts의 getHandler를 아래와 같이 변경해 봅시다:

```js
/** src/routes/users.ts **/

const getHandler = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    throw new Error("Id is required!");
    // return res.status(400).send({ message: "Id is required!" });
  }

  const fetchedUserData = await fetchUserData();
  let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id as string));
  return res.status(200).send({ data: filteredUserData });
};
```

이제 id 쿼리 매개변수 없이 사용자 엔드포인트로 GET 요청을 시도해보세요. 놀랍게도 전체 익스프레스 서버가 충돌할 것이고, 이것은 비동기 오류가 기본적으로 익스프레스 오류 처리기에서 잡히지 않기 때문입니다. 비동기 오류를 오류 처리기 미들웨어로 전달하려면 아래와 같이 익스프레스 next 함수를 사용해야 합니다.

```js
/** src/routes/users.ts **/

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (!id) {
    return next(new Error("Id is required!"));
    // throw new Error("Id is required!");
    // return res.status(400).send({ message: "Id is required!" });
  }

  try {
    const fetchedUserData = await fetchUserData();
    let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id as string));
    return res.status(200).send({ data: filteredUserData });
  } catch (err) {
    next(err);
  }
};
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

다음 함수는 일반적으로 인수를 받지 않고 요청을 다음 미들웨어로 이동시키기 위해 호출됩니다. next 함수에 입력을 제공하면 Express 서버에게 모든 것을 건너뛰고 바로 에러 핸들러로 이동해야 한다는 신호를 보냅니다.

fetchUserData가 프라미스를 반환하므로 오류 처리를 위해 try-catch 블록을 구현하고 catch 표현식에서 next 함수를 사용하여 오류를 전파해야 합니다. express-async-errors npm 패키지를 사용하면 next 함수를 사용하지 않고 비동기 라우트 핸들러에서 간단히 오류를 던질 수 있도록 express 라이브러리를 수정하는 방법을 제공합니다.

다음 명령을 실행하여 패키지를 설치할 수 있습니다:

```js
npm install express-async-errors
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

app.ts 파일 안에서 express 라이브러리에 대한 패치가 적용되도록 패키지를 import하세요.

```js
/** src/app.ts **/

// Global dependencies
import express from "express";
import { json } from "body-parser";
import "express-async-errors"; // <---------- apply async error patch

// Project dependencies
import userRouter from "./routes/users";
import { errorHandler } from "./middlewares/errors";

// Express 초기화
const app = express();

// 미들웨어
app.use(json());

// 라우터
app.use(userRouter);

// 에러 처리
app.use(errorHandler);

export default app;
```

그런 다음 users.ts 파일 안의 getHandler를 수정하여 서버가 크래시하는 걱정없이 간단히 에러를 throw할 수 있습니다.

```js
/** src/routes/users.ts **/

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if(!id) {
    throw new Error("Id is required!");
  }

  const fetchedUserData = await fetchUserData();
  let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id as string));
  return res.status(200).send({ data: filteredUserData });
};
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

Express에서 오류를 중앙 집중식으로 처리하는 데 도움을 주는 도구가 있으니, 해결해야 할 문제가 아직 몇 가지 더 있습니다:

- 모든 오류가 500 응답으로 처리되는 대신 다른 상태 코드로 응답을 보내는 방법은 무엇인가요?
- 클라이언트에게 오류 응답을 일관된 형식으로 보장하는 방법은 무엇인가요?

이것이 TypeScript가 우리를 도와줄 부분이며, 다음 섹션에서 왜 도와주는지 볼 것입니다.

# 사용자 정의 오류 클래스

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

고객에게 반환하는 오류에 일관된 인터페이스를 보장하기 위해 TypeScript에서 사용자 정의 오류 클래스를 만들 수 있습니다. 이를 통해 더 구조화되고 의미 있는 오류 응답을 제공할 수 있습니다. 사용자 정의 오류 클래스를 사용하면 특정 오류 정보를 캡슐화하고 응용 프로그램 전반에서 일관된 오류 객체를 만들 수 있습니다.

우리는 아래와 같이 CustomError 추상 클래스를 생성하면서 시작합니다.

```js
/** src/errors/CustomError.ts **/

export type CustomErrorContent = {
  message: string,
  context?: { [key: string]: any }
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorContent[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    // 내장 클래스를 확장하고 있기 때문에 사용합니다.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
```

CustomErrorContent 유형은 오류 메시지의 구조를 정의합니다. 이는 필수 메시지 필드와 선택적 context 필드(추가적인 오류 관련 데이터를 보유하는 키-값 객체)를 포함합니다. 반면에 CustomError 추상 클래스는 특정 사용자 정의 오류 클래스를 만드는 데 기본 역할을 합니다. 이 클래스는 statusCode(오류 응답에 보낼 HTTP 상태 코드를 나타냄), errors(구체적인 오류 세부 정보를 가진 CustomErrorContent 객체 배열), logging(오류를 로깅해야 하는지 여부를 나타내는 부울값) 세 가지 추상 속성을 구현하도록 강제합니다. 이 추상 클래스 자체는 기본 내장 Error 클래스를 확장하므로 stack 및 cause와 같은 속성에 접근할 수 있습니다.

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

CustomError 클래스를 확장하고 추상 속성을 구현함으로써 다양한 오류 시나리오를 처리하는 일관성 있고 구조화된 확장 가능한 오류 클래스를 만들 수 있습니다. 예를 들어, 아래와 같이 일반적인 BadRequestError 클래스를 생성할 수 있습니다.

```js
/** src/errors/BadRequestError **/

import { CustomError } from "./CustomError";

export default class BadRequestError extends CustomError {
  private static readonly _statusCode = 400;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {code?: number, message?: string, logging?: boolean, context?: { [key: string]: any }) {
    const { code, message, logging } = params || {};

    super(message || "Bad request");
    this._code = code || BadRequestError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};

    // 내장 클래스를 확장하는 경우만 필요
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
```

이 클래스는 CustomError 클래스를 확장하고 Express 서버 애플리케이션에서 잘못된 요청 시나리오를 처리하기 위해 설계되었습니다. 이 클래스에는 HTTP 상태 코드를 나타내는 \_code, 로깅 플래그를 나타내는 \_logging, 그리고 오류에 대한 추가적인 컨텍스트 데이터를 나타내는 \_context라는 프라이빗 속성이 포함되어 있습니다. 클래스 생성자는 옵션 params 객체를 인수로 받아 코드, 메시지, 로깅, 컨텍스트를 지정하여 오류를 사용자 정의할 수 있도록합니다. params가 제공되지 않으면 생성자는 오류 메시지("Bad request")와 상태 코드(400)에 대한 기본값을 설정합니다. 이 사용자 정의 오류 클래스를 위한 구체적인 오류 세부 정보를 반환하도록 구현된 errors, statusCode 및 logging Getter 메서드가 있습니다. 이것들이 CustomError 클래스에 의해 강제됨에 유의하세요.

우리는 사용자 엔드포인트의 postHandler에서 BadRequestError 클래스를 사용할 수 있습니다.

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
/** src/routes/users.ts **/

// ***

const postHandler = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError({ code: 400, message: "Name is required!", logging: true });
  }

  const newUser = {
    id: userData.length + 1,
    name,
  };

  userData.push(newUser);
  return res.status(201).send({ data: newUser });
};

// ***
```

마지막으로, 사용자 지정 오류 처리 미들웨어 내에서 표를 Markdown 형식으로 변경할 수 있습니다. 아래의 예시와 같이 CustomError의 인스턴스를 특별히 찾도록 로직을 조정할 수 있습니다.

```js
/** src/middlewares/errors.ts **/

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // 처리된 오류
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }

    return res.status(statusCode).send({ errors });
  }

  // 처리되지 않은 오류
  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ errors: [{ message: "문제가 발생했습니다" }] });
};
```

미들웨어는 먼저 오류가 CustomError 클래스의 인스턴스인 처리된 사용자 정의 오류인지 확인합니다. 처리된 오류일 경우, 미들웨어는 사용자 지정 오류 객체에서 HTTP 상태 코드, 오류 세부 정보 및 로깅 플래그를 추출합니다. 이 오류에 대해 로깅이 활성화되어 있는 경우, 디버깅 목적으로 콘솔에 오류와 그 스택 트레이스를 로깅합니다. 그런 다음 추출된 오류 세부 정보로 클라이언트에 적절한 응답을 보냅니다.

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

미처리된 오류(사용자 정의 오류가 아닌 오류)의 경우 미들웨어가 오류를 콘솔에 기록하며, 오류 객체의 형식이 지정된 JSON 표현과 함께 스택 추적을 표시합니다. 로깅 후 미들웨어는 클라이언트에게 "문제가 발생했습니다." 라는 기본 오류 메시지와 함께 일반적인 500 Internal Server Error 응답을 보냅니다.

위 구현을 통해 이제 우리는 효과적이고 중앙집중화된 오류 관리를 보장하는 미들웨어를 보유하게 되었으며, 사용자 정의 오류에 대한 특정 응답을 제공하고 디버깅 목적으로 미처리된 오류를 로깅합니다.

# 결론

효과적인 오류 처리는 제품용으로 제작된 안정적이고 견고한 Express 서버 응용 프로그램을 구축하는 중요한 측면입니다. 이 기사에서는 Express 서버에서 TypeScript를 사용하여 프로처럼 오류를 처리하기 위한 다양한 전략과 모범 사례를 탐색했습니다.

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

우리는 예시 Express 서버를 설정하고 Express에서 제공하는 기본 오류 처리 기술의 한계를 확인하며 시작했습니다. 이러한 한계를 극복하기 위해 우리는 사용자 정의 오류 처리 미들웨어를 구현하여 오류 응답을 더 세밀하게 제어하고 응용 프로그램 전반에 걸쳐 일관성을 유지할 수 있도록 했습니다.

우리의 오류 처리 방법 중 하나는 TypeScript를 사용하여 사용자 정의 오류 클래스를 만드는 것이었습니다. 우리는 CustomError라는 추상 기본 클래스를 정의했는데, 이 클래스는 하위 클래스에 statusCode, errors 및 logging과 같은 특정 속성을 강제했습니다. 이 기본 클래스를 확장하고 사용자 정의 오류 클래스에서 이러한 속성을 구현함으로써 일정한 형식을 갖는 체계적이고 의미 있는 오류 응답을 얻었습니다.

우리는 라우트 핸들러에서 동기적 및 비동기적 오류를 효과적으로 처리하는 방법을 배우며, next 함수를 사용하거나 express-async-errors 패키지를 활용하여 비동기적 오류 처리를 간단화했습니다.

이러한 기술을 결합하여 우리는 중앙 집중화된 표준화된 오류 처리 메커니즘을 수립하여 클라이언트가 어떤 종류의 오류나 어떤 엔드포인트를 액세스하더라도 일관된 오류 응답을 받도록 했습니다. 또한, 적절한 경우 콘솔에 오류를 로깅함으로써 디버깅 능력을 향상시키고, 동시에 안전하고 사용자 친화적인 오류 인터페이스를 유지했습니다.

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

요약하면, TypeScript의 강력한 기능과 잘 구성된 오류 처리 전략을 활용하여 더 견고하고 유지보수가 쉬운 Express 서버 애플리케이션을 구축할 수 있으며, 프로덕션 환경에서 예기치 못한 다운타임을 최소화할 수 있습니다.
