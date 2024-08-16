---
title: "타입 생성 비밀 탐구 in TypeScript"
description: ""
coverImage: "/assets/img/2024-05-14-SecretsofTypeGenerationinTypeScript_0.png"
date: 2024-05-14 13:47
ogImage: 
  url: /assets/img/2024-05-14-SecretsofTypeGenerationinTypeScript_0.png
tag: Tech
originalTitle: "Secrets of Type Generation in TypeScript"
link: "https://medium.com/gitconnected/secrets-of-type-generation-in-typescript-5d74c2e9dc56"
isUpdated: true
---




한 번 TypeScript 모임에서 발표하기 위해 나라의 절반을 여행했던 적이 있어요. 제 발표를 진행한 후에는 청중들이 흥미로워 한 것 같았는데, 다른 연사가 나타났어요. 그는 매우 사소하지만 중요한 주제에 대해 이야기했어요. TypeScript에서 데이터 유효성 검사에 대해 논의했죠.

![이미지](/assets/img/2024-05-14-SecretsofTypeGenerationinTypeScript_0.png)

저는 자바 개발자로 경력을 시작했는데, 당연히 일상 업무에서 다양한 유효성 검사 라이브러리를 활용했어요.

TypeScript 코딩을 시작하자, 유사한 도구 세트가 쉽게 사용 가능하지 않다는 것을 깨달았어요! JavaScript 커뮤니티에서 유효성 검사가 점점 중요해지고 있는 개념인 것 같았어요.



발표자는 io-ts에 대해 이야기하며 유효성 검사 스키마에서 타입을 쉽게 추론할 수 있다고 설명했습니다. 추론이라는 아이디어가 나를 순간적으로 사로잡았어요. 만약 테이블 스키마와 같은 임의의 객체에서 타입을 생성할 수 있다면 어떨까요?

Sequelize, Prisma 또는 Zod와 같은 도구의 구현을 분석하여 타입 추론을 이해하기 위해 노력했습니다. 이 이야기는 제 학습 내용을 요약하며 사용자 정의 스키마를 활용하여 타입을 생성하는 방법을 설명할 것입니다.

# 소개

본 이야기에서, TypeScript에서의 두 가지 유형 생성 범주를 고안했습니다: 정적과 동적. 정적 생성은 코드 생성기를 활용하며 동적 생성은 TypeScript 추론을 활용하여 실시간으로 타입을 제공합니다.



# 정적 타입 생성

스키마 파일을 기반으로 타입 정의를 생성하는 라이브러리 또는 프레임워크를 찾을 수 있습니다. Prisma가 좋은 예입니다만, Prisma는 타입 뿐만 아니라 클라이언트 코드도 생성합니다.

정적 타입 생성은 세 단계의 프로세스로 생각할 수 있습니다:

- 스키마 파일을 생성(또는 업데이트)합니다.
- CLI를 사용하여 코드 생성기를 실행합니다.
- 프로젝트에서 생성된 코드를 사용합니다.



일반적으로 도구 제작자가 허용하는 어떤 언어로든 스키마 파일을 작성합니다. 그들은 프로그래밍 언어를 사용하는 대신 도메인 특화 언어(DSL)를 선택할 수도 있습니다. 이런 선택은 TypeScript에 익숙하지 않은 사람들도 스키마 파일에 기여할 수 있도록 할 수 있습니다.

예를 들어, Prisma의 제작자들은 데이터 모델링 언어를 개발했습니다. 아래에 전형적인 스니펫을 보실 수 있습니다.

```js
generator client {
  provider = "prisma-client-js"
  output   = "./client"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id String @unique
}
```

이 스니펫은 코드 생성 및 모델 자체에 대한 지시사항을 모두 포함하고 있다는 점을 언급할 가치가 있다고 생각합니다!



다음 명령어를 실행하여 TypeScript 코드를 생성할 수 있어요.

```js
pnpm exec prisma generate
```

Prisma는 스키마 파일이 가리키는 디렉토리에 코드를 생성합니다. 아래에 생성된 코드의 사용 예시를 확인해보세요.

```js
import { randomBytes } from "node:crypto";
import { PrismaClient } from "./prisma/client";

const createUser = async () => {
  const prisma = new PrismaClient();
  try {
    const id = randomBytes(16).toString("base64url");

    return await prisma.user.create({
      data: {
        id,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
```



데이터베이스 스키마 설계에 대해 궁금하다면, 아래 이야기를 읽어보세요:

## 정적 타입 생성의 장점

정적 타입 생성을 통해 비즈니스 로직 구조와 TypeScript를 분리할 수 있습니다.

이를 통해 비개발자들이 독립적으로 스키마 파일에 기여할 수 있습니다. 비기술자에게 코딩 원리를 가르치는 대신, 도메인 특화 언어 개념을 빠르게 설명할 수 있습니다!



또한, 사람들은 스키마 파일을 특정 디렉토리에 특정 확장자로 저장합니다. 코드베이스 전체를 찾는 대신에 효율적으로 찾을 수 있도록 도와줄 수 있습니다.

마지막으로, 저는 TypeScript 추론이 강력하지만 일부 응용 프로그램에서는 제약이 있음을 발견했습니다. TypeScript가 개발하기 어려워지지 않도록 추론을 제한해야 한다고 생각합니다.

제가 TypeScript 추론의 불가피한 한계에 대해 사례 연구를 진행했고, 아래에서 읽을 수 있습니다:

## 정적 타입 생성의 단점



지금까지 도메인 특화 언어를 사용하여 코드와 유형을 생성하는 방법에 대해 설명했습니다. 흥미롭게도 TypeScript 파일을 기반으로 코드를 생성할 수도 있습니다.

프로젝트 내 각 파일에 대해 특정 디렉토리 구조 및 특정 이름으로 내보내기를 강제하기를 원할 수 있습니다. 예를 들어, 데이터베이스 모델을 모델 디렉토리에 각 파일로 구성하고, 파일 이름에 모델 이름을 포함할 수 있습니다. 각 파일은 스키마 이름 아래 모델 스키마를 내보내야 합니다.

생성기를 구현하여 적절한 유형 규율을 달성할 수 있습니다. 이 생성기는 폴더 구조를 읽고 유형 정의를 작성합니다. 모델을 생성한 후에는 생성기를 실행해야 합니다.

이러한 접근 방식은 지속적인 유형 차이로 이어질 수 있습니다. 모델을 변경하면 기존 유형 정의에 반영되지 않는 변경 사항을 도입할 수 있습니다. 파일을 유효성 검사하려면 TypeScript 오류가 없을 때까지 생성기를 계속 실행해야 합니다.



![이미지](/assets/img/2024-05-14-SecretsofTypeGenerationinTypeScript_1.png)

두번째, 스키마에 대한 모든 변경 사항은 이후에 명령을 실행해야 하며, 이 단계는 경험이 부족한 엔지니어들에게 쉽게 간과될 수 있습니다.

세번째, TypeScript에는 인상적인 타입 추론이 포함되어 있기 때문에, 처음부터 정적으로 타입을 생성해야 하는 이유가 있을까요? 제 생각에는 그에 대한 좋은 이유가 필요합니다.

네번째, 생성된 타입을 소스 제어에 커밋해야 할까요? 아마도 생성되는 것이 정확히 무엇인지에 따라 다를 것입니다.



# 동적 유형 생성

여기 예제를 통해 동적 유형 생성을 보여 드리겠습니다.

누군가가 TypeScript에서 새로운 ORM 생성을 맡겨줬다고 상상해 봅시다. 우리는 먼저 SQL 데이터 유형을 위한 추상화를 생성하는 것으로 시작할 것입니다. 먼저, 행에서 nullable 값을 허용하거나 허용하지 않을 수 있는 열을 인식합니다.

Nullable 및 non-nullable 열 사이의 구분을 만들기 위해 고유한 심볼을 사용할 수 있습니다.



```js
export const NULL: unique symbol = Symbol();
export const NOT_NULL: unique symbol = Symbol();
```

저는 심볼을 실수로 선택한 것이 아닙니다. 이제 첫 번째 유형을 설명하겠습니다.

특정 데이터 유형 내에 정의된 널 가능성 일반 유형을 앵커하는 TNULLABLE 유형을 정의하겠습니다.

```js
type TNULLABLE = typeof NULL | typeof NOT_NULL;
```



다시 말해, 단순히 true 또는 false로 nullability를 제어해서는 안 됩니다. NULL 및 NOT_NULL 기호에 바인딩된 일반 타입 내에 nullability를 포함시킬 것입니다.

TCHAR 타입 정의를 살펴봅시다.

```js
type TCHAR<N extends TNULLABLE, L extends number> = Readonly<{
  type: "char";
  length: L;
  nullable: N;
}>;
```

이 정의에서 N은 nullability를 관리하고, L은 SQL CHAR 열의 길이를 설정합니다.



다음으로 CHAR 컬럼을 위한 빌더를 생성합니다. 클래스 생성자가 아니기 때문에 '빌더'라는 용어를 사용했습니다.

```js
const CHAR = <N extends TNULLABLE, L extends number>(
  nullable: N,
  length: L
): TCHAR<N, L> => ({
  type: "char",
  length,
  nullable,
});
```

CHAR(false, 255) 대신 CHAR(NULL, 255)로 작성할 수 있습니다. 전후 문맥을 알지 못해도 이전 표현식을 쉽게 이해할 수 있습니다.

이제 SQL INTEGER 컬럼에 대해 비슷한 내용을 작성합니다.



```js
type TINTEGER<N extends TNULLABLE> = Readonly<{
  type: "integer";
  nullable: N;
}>;

const INTEGER = <N extends TNULLABLE>(nullable: N): TINTEGER<N> => ({
  type: "integer",
  nullable,
});
```

이제 스키마 유형을 정의하는 시간이 왔습니다. 키-값 쌍으로 구성된 객체로 생각할 수 있습니다. 키는 열 이름을 나타내고 값은 해당 열 정의를 제공합니다. 아래 예제를 살펴보세요.

```js
export type Schema = Readonly<{
  [K in string]?: TCHAR<TNULLABLE, number> | TINTEGER<TNULLABLE>;
}>;
```

스키마 유형을 정의한 후에는 예제를 진행할 수 있습니다. 다음 스니펫을 만들었습니다.



```js
상수 스키마 = {
  a: CHAR(NULL, 255),
  b: CHAR(NOT_NULL, 1),
  c: INTEGER(NULL),
  d: INTEGER(NOT_NULL),
}을(를) 스키마로써 만족합니다;
```

저는 "만족합니다" 키워드를 의도적으로 사용했습니다. 스키마를 Schema 유형에 할당하고 싶지 않았기 때문에 추론에 부정적인 영향을 미치지 않을 수 있습니다! 대신, 스키마 정의가 Schema 유형을 만족하는지 확인할 수 있습니다.

이제 가장 흥미로운 부분인 추론이 시작됩니다!

아래에 두 가지 도우미 유형을 정의해보겠습니다.



```js
유형 NullableString<N> = N이 typeof NOT_NULL인 경우
  ? string
  : string | null;

유형 NullableNumber<N> = N이 typeof NOT_NULL인 경우
  ? number
  : number | null;
```

이 범용 유형은 널 가능성을 켜고 끄는 데 사용됩니다. 이런 도우미들은 TypeScript에서 유형 생성 시 흔한 속임수로 생각합니다.

이제 추론에 사용되는 유형을 최종적으로 정의할 수 있습니다.

```js
유형 Attributes<T> = {
  [K in keyof T]: T[K]이 TCHAR<infer N, number>의 확장인 경우
    ? NullableString<N>
    : T[K]이 TINTEGER<infer N>의 확장인 경우
    ? NullableNumber<N>
    : never;
};
```



천천히 설명해 드릴게요.

먼저, 일반 타입은 스키마 타입입니다.

둘째, 값만 변환합니다. 키는 그대로 유지됩니다.

셋째, 값이 TCHAR 타입이면 널 가능성 일반 타입 N을 추론하고 NullableString 도우미 타입으로 전달합니다.



우리는 N에 따라 문자열 또는 null을 반환할 것입니다.

TINTEGER 유형에 대해서도 비슷한 작업을 수행합니다. 값이 명시적 유형과 일치하지 않는 경우 never 유형을 전달합니다.

Attributes 타입을 다음과 같이 사용할 수 있습니다:

```js
type A = Attributes<typeof schema>;
```



위의 텍스트를 친근한 톤으로 한국어로 번역해 드리겠습니다:


타입 A의 정의는 다음과 같습니다:

```js
type A = {
    a: string | null;
    b: string;
    c: number | null;
    d: number;
}
```

## 동적 타입 생성의 장점

나는 TypeScript에서 schema를 유지하는 것이 동적 타입 생성의 자연스러운 장점이라고 생각합니다.




먼저, 스키마를 구현하기 위해 다른 언어를 생각해 낼 필요가 없습니다. 둘째, 스키마에 대한 모든 변경 사항은 프로젝트 전체에 즉시 타입 영향을 줍니다. 셋째, 스키마를 변경한 후에 생성기를 실행할 필요가 없습니다.

## 동적 타입 생성의 단점

이전에 언급했듯이, TypeScript 추론에는 한계가 있습니다. 특정 상황에서 정적 타입 생성으로 전환하면 복잡한 타입 추론 도우미를 만들 필요가 줄어듭니다.

게다가 TypeScript에서 스키마를 유지함으로써 업데이트를 개발자에게 의존해야 합니다. 진행 중인 프로그래밍 언어의 고급 메커니즘을 비 전공자들이 처리할 것을 거의 기대할 수 없습니다.



# 결론

정적 또는 동적 유형 생성을 선택하기 전에 문제와 모든 가능한 옵션을 고려해야 합니다. 유형 생성이 내 문제를 해결하는 가장 좋은 방법인가요? 더 수고로운 만큼 기술적이지 않은 해결책이 있을까요?

실제로 올바른 선택을 하는 것은 우리 산업에서의 중대한 영향을 미칩니다!

또한 TypeScript의 아키텍트들이 시간이 지남에 따라 유형 추론의 기능을 확대할 것으로 예상됩니다. 저는 지난 6년간 이 언어를 사용해왔는데, 새로운 기능과 개선 사항의 수는 놀라울 정도로 많았습니다!



이야기가 유형 생성의 모든 주의사항을 이해하는 데 도움이 되었고 유도 추론에 조금 흥미를 느끼게 했다면 좋겠어요.

이 이야기가 흥미로웠다면 아래에서 QR 코드의 실용적 구현에 대한 다른 이야기를 읽어보세요: