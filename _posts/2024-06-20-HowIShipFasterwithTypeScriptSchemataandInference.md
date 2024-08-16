---
title: "제가 TypeScript, Schemata 및 추론을 사용하여 어떻게 깨른 배송을 할 수 있는지 알려드릴게요"
description: ""
coverImage: "/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_0.png"
date: 2024-06-20 02:47
ogImage: 
  url: /assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_0.png
tag: Tech
originalTitle: "How I Ship Faster with TypeScript, Schemata, and Inference"
link: "https://medium.com/gitconnected/how-i-ship-faster-with-typescript-schemata-and-inference-20bd4dd3ff56"
isUpdated: true
---




거의 10년 전에 Java 개발자로서 경력을 시작했고, 여전히 변수를 끊임없이 타이핑했던 기억이 나네요! TypeScript로 전향한 후에는 타입 추론에 의존하기 시작했습니다. 이 언어 기능을 넘어서 이를 이해하고 있고, 이 덕분에 일상적으로 많은 키 스트로크를 절약하고 있어요.

명시적 추론을 사용할 수 있다는 것을 깨달았을 때 기쁜 충격을 받았어요. 한 줄로 배열과 반환 타입을 추출할 수 있다는 것이죠!

첫 번째 스키마 라이브러리를 배운 후에 엄청난 획기가 왔어요.

스키마 작성을 마스터한 뒤에는 말로써 일석이조였죠. 런타임에서 수신 데이터를 구문 분석하고 추론된 유형을 컴파일 타임에 사용할 수 있었어요!

<div class="content-ad"></div>

이 발견으로 내 생산성이 향상되었어요. 이로 인해 더 빨리 프로젝트를 완료할 수 있었거든.

왜 빠른 배송이 중요한가요?

경쟁사보다 빨라야 한다고 얘기하는 사람도 있죠...

빠르게 배송하지 않고 꾸준히 하지 않으면, 엔지니어링 프로세스에 문제가 있는 것이라고 볼 수 있어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_0.png)

위의 그림 속 핸들을 잡고 있는 사람은 배의 엔지니어링에 대해 의심하고 있는 걸까요?

생산성 향상은 다음과 같은 개념에서 비롯되었습니다.

파싱을 프로젝트의 핵심 요소로 취급하고 계약 프로그래밍을 강제 적용하기 시작했습니다.


<div class="content-ad"></div>

먼저, 각 수신 구조를 구문 분석하면 데이터 처리가 시작되기 전에 보안 계층을 도입합니다. 유명한 속담을 바꿔 말하면, 수신 데이터를 테스트하지 않으면 결국 클라이언트가 테스트하게 될 것입니다!

둘째로, 이는 또한 생산 중에 발생할 수 있는 버그의 수를 줄이며, 실행 시 오류를 컴파일 타입 오류로 대체합니다. 컴파일 할 수 없는 프로젝트를 배포해서는 안 됩니다!

세 번째로, 적절한 애플리케이션 모니터링을 통해 구문 분석 오류(PPI를 고려함)를 오류 수집기로 보낼 수 있습니다. 문제가 발생한 위치를 이해하면 피드백 루프를 단축시킬 수 있습니다. 클라이언트가 문제를 알기 전에 문제에 대해 알고 싶습니다.

마지막으로, LLM을 사용하여 스키마를 더 빨리 작성할 수 있습니다. 다시 말해, 인공지능을 습득한 사람들은 아마도 그렇지 않은 사람들의 직업을 대체할 것입니다. 이야기 끝에 별도의 섹션에서 LLM 사용에 대해 논의하겠습니다.

<div class="content-ad"></div>

이야기를 써서 생산성을 향상시키는 발견을 설명했어요. 제 경험에서 배우고, 현재와 미래 프로젝트에 적용해 보세요!

이야기에서 제시된 모든 코드 조각은 Bun 1.1.12에서 코딩하고 테스트했어요.

# 스키마 라이브러리 선택

![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_1.png)

<div class="content-ad"></div>

선택은 어려운 결정이죠.

최근 몇 년 동안 다양한 스키마 라이브러리를 사용해봤는데, 특히 Zod, @effect/schema, 그리고 Yup을 주로 사용했어요. 이들은 일반적인 유효성 검증과 파싱에 사용할 때 거의 구별하기 어렵지만, 브랜드 타입이나 숫자 범위를 정의할 때 차이가 나타날 수 있어요.

소프트웨어 엔지니어는 작업에 적합한 도구를 선택해야 해요. 함수형 프로그래밍에 대한 좋은 지원이 필요하다면, 불변성을 보장하고 모나드 구조를 지원하는 @effect/schema가 가장 적합할 거예요.

최소한의 종속성을 유지하고 싶다면, 아무 종속성도 없는 Zod을 선호할 수 있어요.

<div class="content-ad"></div>

모든 언급된 라이브러리에 대한 동등한 코드를 제시하겠습니다.

다음 명령어를 사용하여 이들을 설치할 수 있습니다:

```js
bun install @effect/schema yup zod
```

## 구문 분석이 검증을 이기는 이유

<div class="content-ad"></div>

제대로 시작하기 전에 TypeScript의 구조적 타이핑과 유효성 검사 및 구문 분석에 미치는 영향을 언급해야 합니다.

두 타입을 비교할 때 컴파일러는 이름을 무시하고 속성 타입만 확인합니다. 예를 들어 다음 타입은 동일하다고 간주됩니다:

```js
type User = { id: string };
type Company = { id: string };
```

TypeScript를 사용하기 시작할 때는 명백하지 않을 수 있지만, 더 많은 경험을 쌓으면 감이 올 것입니다. 그러나 객체 리터럴 주변에 더 많은 유의해야 할 점이 있습니다.

<div class="content-ad"></div>

타입 변수를 초기화할 때 컴파일러는 초과 속성에 대한 검사를 실행합니다. 우리는 이 할당의 오른쪽을 오브젝트 리터럴이라고 공식적으로 부릅니다. 다음 스니펫은 컴파일되지 않습니다:

```js
const user: User = {
  id: '1',
  name: 'test username',
};
```

저는 이 언어 기능의 이유에 동의합니다. 선택한 타입을 준수하지 않는다면 타입 변수를 지정하지 않는 것이 좋습니다. 이게 합리적으로 느껴지시나요?

다음 스니펫에서 확인할 수 있듯이 함수에 오브젝트 인자를 전달할 때 초과 속성 검사는 작동하지 않습니다:

<div class="content-ad"></div>

```js
const userWithExcessProperties = {
  id: '1',
  name: 'Alice',
  claims: 0x02,
  test: 1,
};

const canAccessDashboard = (user: User) => (user.claims & 0x01) !== 0;

canAccessDashboard(userWithExcessProperties);
```

프로그램은 함수를 통해 데이터가 흐르는 단순한 흐름입니다. 데이터를 구문 분석하면 반복적으로 함수에 전달됩니다. 이제 데이터를 구문 분석해야 하는 이유에 대해 설명하겠습니다.

구조를 검증할 때는 해당 스키마에 적합한지만 확인합니다. 유효성 검사는 새 객체를 생성하지 않습니다. TypeScript에서 원본 구조를 함수에 전달할 때 초과된 속성도 함께 전달될 수 있습니다.

로그에 사용자 데이터를 기록하면 개인 식별 정보를 저장할 수 있습니다! 그래서 그것을 피하기 위해 원하는 속성을 갖는 새 객체를 만들어 데이터를 구문 분석해야 합니다.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_2.png" />

# 추론

스키마 라이브러리를 사용하여 한 방에 두 마리의 새를 잡고 싶어요. 어떤 API에든 딱 붙어보이지만 그 대신에 어떤 데이터든 수월하게 파싱하고 컴파일러에 대한 형식을 얻고 싶어요.

Zod를 사용하여 사용자 스키마를 작성하려면 아래 코드를 작성할 수 있어요:

<div class="content-ad"></div>

```js
import z, { ZodType } from 'zod';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  claims: z.number(),
}).readonly();
```

이제 사용자 유형을 추론하겠습니다:

```js
type User = z.infer<typeof userSchema>;
```

이 문장은 다음 코드의 달신이 되었습니다:

<div class="content-ad"></div>

```js
유저 타입을 호출할 때 다음 메소드를 이용하여 구문 분석할 거에요:

const user: User = userSchema.parse(userWithExcessProperties);

사용자들을 그룹화하고 싶다고 상상해 보세요. 그룹 스키마와 해당 유형을 비슷하게 작성할 거에요:

<div class="content-ad"></div>

const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  userIds: z.array(z.string()).readonly(),
  interests: z.array(z.object({
    id: z.string(),
    level: z.union([
      z.literal('low'),
      z.literal('medium'),
      z.literal('high')
    ]),
  })).readonly(),
}).readonly();

type Group = z.infer<typeof groupSchema>;

## 추이추론

별도의 변수로 스키마를 추출하지 않고 관심 수준 유형을 추출하는 방법은 무엇인가요?

TypeScript 유형 메커니즘을 활용하여 다음과 같이 작성할 수 있습니다.

<div class="content-ad"></div>

type InterestLevel = Group['interests'][number]['level'];

만약 제가 스키마를 별도로 사용하지 않는다면, 제 다른 비즈니스 구조의 일부로 유지합니다.

덧붙여, 최소 추론 규칙을 만들었습니다. 이미 추론한 타입이 있는 경우, 그 하위 타입을 추출하기 위해 다시 추론해서는 안 된다는 것입니다!

## 일반 추론

<div class="content-ad"></div>

이제 좀 더 고급 추론 패턴을 보여드릴게요. 이를 "일반 추론"이라고 부르겠어요.

임의의 데이터와 그들의 체크섬을 포함하는 구조를 구문 분석해야 한다고 상상해봅시다. 우리는 이러한 구조를 보통 봉투(envelope)라고 부릅니다.

![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_3.png)

그래서 우리는 일반 빌더 함수를 작성할 수 있어요:

<div class="content-ad"></div>

const buildChecksumEnvelopeSchema = <T>(
  datumSchema: ZodType<T>
) => z.object({
  datum: datumSchema,
  checksum: z.string(),
}).readonly();

위의 코드 조각에서 `ZodType<T>`는 일반 타입 T로 구문 분석되는 스키마입니다.

만약 사용자 및 그룹 스키마와 타입을 필요로 한다면, 다음과 같이 타입을 지정할 수 있습니다:

const userEnvelopeSchema = buildChecksumEnvelopeSchema(userSchema);
const groupEnvelopeSchema = buildChecksumEnvelopeSchema(groupSchema);

type UserChecksumEnvelope = z.infer<typeof userEnvelopeSchema>;
type GroupChecksumEnvelope = z.infer<typeof groupEnvelopeSchema>;

<div class="content-ad"></div>

만약 우리가 일반적인 envelope 타입을 유지하고 싶다면 어떻게 할까요? 우리는 이를 사용하여 내용을 정확히 모르는 임의의 envelopes에 작업을 수행할 수 있습니다. 예를 들어, 체크섬을 계산하는 것과 같이요.

type ChecksumEnvelope<T> = z.infer<
  ReturnType<typeof buildChecksumEnvelopeSchema<T>>
>;

type UserChecksumEnvelope = ChecksumEnvelope<User>;
type GroupChecksumEnvelope = ChecksumEnvelope<Group>;

## 단수 schema

스키마를 사용할 때, 저는 단수 구조만을 정의하는 것을 선호합니다. 예를 들어, 다음과 같이 작성하지 않겠습니다:

<div class="content-ad"></div>

const usersSchema = z.array(userSchema);
type Users = z.infer<typeof usersSchema>;

가능하다면 복수형 타입을 정의하지 않겠어요. 배열에는 `ReadonlyArray<User>`나 `User[]`를 사용할 거에요. 혼란을 피하고 다른 명명 규칙을 만들지 않기 위해 가능한 한 타입 별칭을 적게 사용하려고 해요.

## 내보내기

일반적으로 schema와 비즈니스 구조체의 유추된 타입을 내보내요. 다른 개발자들이 혼란스럽지 않도록 helper schema를 절대 내보내지 않아요. 가져올 수 있는 문장을 줄이기 위해 노력해요.

<div class="content-ad"></div>

# 불변성

저는 불변성의 충실한 지지자입니다.

새로운 변수를 생성할 때만 데이터가 변경되므로 코드를 분석하기가 더 쉽다고 생각합니다. 제 스키마는 불변성을 일등 시민 개념으로 취급하길 원합니다.

![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_4.png)

<div class="content-ad"></div>

불변성을 사용하는 것은 프로그래밍 언어의 규칙을 제한하기 위해 사슬을 사용하는 것과 같습니다. 깨지기 쉬운 링크만 깨뜨리면 됩니다. 저희 경우에는 스키마가 그런 링크일 수 있습니다.

Zod 스키마를 불변하게 만들기 위해 readonly 메서드를 호출합니다. Zod는 자동으로 불변의 추론된 유형을 생성합니다.

예를 들어, 아래에 명시된 것처럼 그룹 스키마는 이미 불변성 원칙을 준수합니다:

const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  userIds: z.array(z.string()).readonly(),
  interests: z.array(z.object({
    id: z.string(),
    level: z.union([
      z.literal('low'),
      z.literal('medium'),
      z.literal('high'),
    ]),
  })).readonly(),
}).readonly();

<div class="content-ad"></div>

만약 추론된 타입을 준수하는 인스턴스를 생성할 때 불변성에서 일시적으로 벗어나고 싶다면 어떻게 해야 할까요?

해당 readonly 수정자를 무효화하는 타입을 사용해야 합니다. 일부 스키마에는 충분하지 않을 수도 있습니다. ReadonlyArray 타입을 가변으로 만들려면 어떻게 해야 할까요? 그리고 ReadonlySet은 어떻게 해야 할까요? ReadonlyMap은요?

우리는 많은 실수를 저지르지 말고 전용 라이브러리를 사용해야 합니다. 예를 들어, ts-essentials 라이브러리와 많은 다른 라이브러리가 관련된 타입을 포함하고 있습니다.

다음 명령어를 입력하여 설치할 수 있습니다:

<div class="content-ad"></div>

bun install ts-essentials

이제 아래의 코드를 작성할 수 있습니다:

import type { DeepWritable } from ‘ts-essentials’;

type WritableGroup = DeepWritable<Group>;

# Enumerations

<div class="content-ad"></div>

Zod에서 열거형을 정의하는 세 가지 방법이 있습니다:

- 네이티브 열거형 사용
- Zod의 리터럴 유니언 사용
- Zod의 열거형 사용

각 방법은 적절한 구문 분석과 유추된 유형을 제공합니다. 차이점은 열거된 모든 값을 액세스하는 데 있습니다.

예를 들어, 언어 목록이 있다면 사용자의 선택을 유효성 검사하고 목록을 프론트 엔드에 전송하여 드롭다운에서 표시해야 할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_5.png" />

## 네이티브 열거

TypeScript를 사용하면 컴파일 시에 존재하고 런타임에도 존재하는 열거형(enum) 타입을 선언할 수 있습니다. 예를 들어, 다음과 같이 관심 수준을 나타내는 enum을 정의할 수 있습니다:

enum InterestLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
};

<div class="content-ad"></div>

Zod는 열거 유형에서 스키마를 작성하는 방법을 제공합니다. 아래 코드 스니펫에서와 같이:

const interestLevelSchema = z.nativeEnum(InterestLevel);

만약 const 키워드로 InterestLevel 열거 유형을 선언했다면, 이전에는 컴파일 시간에만 존재했기 때문에 Zod 도우미를 사용할 수 없었습니다.

열거된 모든 값을 추출하려면 다음 코드를 작성해야 합니다.

<div class="content-ad"></div>

const interestLevels = Object.values(InterestLevel);

## Zod의 리터럴 유니언

다른 패턴을 사용하여 열거 스키마를 정의할 수 있습니다. 결국, 열거는 문자열 또는 숫자 리터럴의 유니언입니다.

각 관심 수준 리터럴에 대한 스키마를 작성해 봅시다:

<div class="content-ad"></div>

const interestLevelLiteralSchemata = [
  z.literal('low'),
  z.literal('medium'),
  z.literal('high'),
] as const;

자 이제 적절한 스키마와 타입을 정의할 시간입니다:

const interestLevelSchema = z.union(interestLevelLiteralSchemata);
type InterestLevel = z.infer<typeof interestLevelSchema>;

마지막으로, 모든 열거된 값을 추출할 수 있습니다:  

<div class="content-ad"></div>

const interestLevels = interestLevelLiteralSchemata
  .map((literal) => literal.value);

## 조드의 열거

열거 스키마를 정의하는 내가 가장 좋아하는 방법은 조드의 열거 도우미를 사용하는 것입니다.

다음과 같은 방법으로 스키마를 작성하고 타입을 추론할 수 있습니다:

<div class="content-ad"></div>

const interestLevelSchema = z.enum(['low', 'medium', 'high']);
type InterestLevel = z.infer<typeof interestLevelSchema>;

모든 열거된 값 추출을 한 줄로 처리할 수 있습니다:

const interestLevels = interestLevelSchema.options;

# 구분된 연합(Unions)
```

<div class="content-ad"></div>

일반적인 유니언 타입에서는 컴파일러가 많은 서로 다른 타입을 구분합니다. 디스크리미네이트 유니언에서는 컴파일러가 공유 프로퍼티를 기준으로 구분합니다. 예를 들어, 애플리케이션의 작업을 특정 액터인 사용자 또는 그룹에 할당할 수 있습니다.

![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_6.png)

제가 액터 스키마를 구현하고 다음과 같이 타입을 추론할 것입니다:

```js
const userActorSchema = z.object({
  type: z.literal('user'),
  id: z.string(),
});

const groupActorSchema = z.object({
  type: z.literal('group'),
  id: z.string(),
});

const actorSchema = z.discriminatedUnion(
  "type",
  [userActorSchema, groupActorSchema],
).readonly();

type Actor = z.infer<typeof actorSchema>;
```

<div class="content-ad"></div>

내 선택에는 설명이 필요해요!

먼저, 사용자와 그룹 액터의 스키마를 명시적으로 정의했어요. 이 방법은 구분된 연합의 각 구성 요소를 명명하고 들여쓰기 수준을 낮게 유지하죠.

누군가 액터 스키마를 읽으면, 여러 줄로 이루어진 스키마를 읽지 않아도 내 의도를 즉시 추측할 거에요!

둘째, 액터 유형을 스키마에서 추론했어요. 코드 베이스에서 연합 유형의 연산이 멤버 대신 발생하기를 기대하죠.

<div class="content-ad"></div>

세 번째로, 나는 사용자의 종류와 그룹 활동자의 유형을 추론하지 않았어. 나중에 그들을 정의해야 한다면, 다음 패턴을 사용하여 그렇게 할 수 있을 것 같아:

```js
type UserActor1 = z.infer<typeof userActorSchema>;
type UserActor2 = Extract<Actor, { type: 'user' }>;
type UserActor3 = Actor & { type: 'user' };
```

각각이 동일한 결과를 가져오는 것에도 불구하고, 나는 첫 번째 것을 사용하지 않을 거야. 왜냐하면 그것은 최소한 추론 규칙에 어긋나기 때문이야. 이미 활동자 유형을 추론을 통해 얻었다면 TypeScript 유형 도우미를 사용하여 더 정확한 유형을 추출할 수 있어.

그리고 discriminatedUnion 메서드를 사용하여 식별 속성의 이름을 명시해야 하는 이유를 궁금해할 수도 있어. 일치시켜야 할 내용을 알면 Zod가 적합한 스키마를 빠르게 찾을 수 있어. 이러한 최적화를 피하고 싶다면 union 도우미를 사용할 수도 있었겠지.

<div class="content-ad"></div>

# 기존 유형 변환

기존 TypeScript 프로젝트에는 많은 유형이 포함되어 있을 것입니다. 이를 수동으로 작성하는 것은 여러분의 시간을 낭비하는 일입니다. 대신 LLM 또는 코드 완성 도구를 사용할 수 있습니다. 정확한 법적 조언은 제공하지 않겠지만, 소유 코드베이스에서 이러한 기술을 사용할 수 있는지 항상 확인합니다.

각 LLM 제공업체는 모델에 제공하는 데이터에 대해 무엇이 발생하는지 알려줄 것입니다!

특정 LLM을 추천하지는 않겠지만, 주요 모델들이 이 문제를 상당히 잘 처리합니다. 유형을 정의하고 스키마 정의를 시작해보세요. 몇 번 시도한 후에는 고품질 자동완성 스키마가 나올 것입니다.

<div class="content-ad"></div>

LLM을 완전히 믿지 마세요. 항상 결과를 검증해야 합니다!

다양한 유형이 있다면, 먼저 그들의 정규 표현을 얻는 것을 추천합니다. AST 추출기를 작성하거나 TypeScript Language Server에 요청하여 이를 수행하거나, LLM이 작업을 처리하도록 할 수 있습니다. 처음 두 가지 가능성에 대해 LLM을 사용할 수 있습니다!

정규 표현을 구문 분석하여 스키마를 생성하는 스크립트를 작성할 수 있습니다. 가장 큰 어려움은 스키마를 생성하는 것이 아니라 구문 분석에 사용하는 것입니다. 프로젝트 아키텍처의 완전한 변경이 필요할 수도 있습니다!

![이미지](/assets/img/2024-06-20-HowIShipFasterwithTypeScriptSchemataandInference_7.png)

<div class="content-ad"></div>

# 요약

나는 스키마와 유형 추론을 사용하는 것에 대한 설득력있는 주장을 펼쳤기를 희망합니다, 특히 LLMs와 함께. 아니라면, 의견을 남겨주세요! 다양한 기술적 주제에 대해 토론하는 것을 좋아합니다.

가장 중요한 포인트를 되풀이하자면, 데이터를 단순히 유효성 검사하는 것이 아니라 파싱해야 한다고 생각합니다. 우리는 스키마를 작성하고 그로부터 유형을 추론해야 합니다. 나는 불변성을 지지하며 이 패러다임을 준수하는 스키마를 선호합니다. 또한 열거 유형 대신 스키마 리터럴을 사용하는 것을 좋아합니다.

나는 내 코드가 파싱되지 않은 데이터에서 실행되지 않기 때문에 보다 빠르게 배포할 수 있습니다. 컴파일 시간 오류만 만날 것이라고 믿습니다. 애플리케이션 모니터링 덕분에 파싱이 실패할 때를 알 수 있습니다. 나는 LLM을 사용하여 스키마를 작성하고 유형을 더 빨리 추론할 수 있습니다.

<div class="content-ad"></div>

이야기의 개념을 설명하는 부록을 작성했습니다. 이번에는 다른 스키마 라이브러리를 사용하여 @effect/schema와 yup을 설명합니다.

# 부록 A: @effect/schema

사용자 스키마를 정의하기 위해 다음과 같이 작성해야 합니다:

```js
import { Schema } from "@effect/schema"

const userSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  claims: Schema.Number,
});
```

<div class="content-ad"></div>

사용자 스키마는 이미 불변성을 준수합니다. 아래 스니펫을 사용하여 사용자 유형을 추론할 수 있습니다:

```js
type User = Schema.Schema.Type<typeof userSchema>;
```

위의 type helper는 다음 코드와 동일합니다:

```js
type User = typeof userSchema.Type;
```

<div class="content-ad"></div>

라이브러리는 객체를 구문 분석하고 초과 속성을 허용하지 않습니다. 아래 내용을 확인해주세요:

```js
const userWithExcessProperties = {
  id: '1',
  name: 'Alice',
  claims: 0x02,
  excessProperty: 1,
};

const user = Schema.decodeSync(userSchema)(userWithExcessProperties);
```

그룹 스키마와 해당 유형은 사용자 스키마와 유사하게 정의할 수 있습니다:

```js
const groupSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  userIds: Schema.Array(Schema.String),
  interests: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      level: Schema.Union(
        Schema.Literal('low'),
        Schema.Literal('medium'),
        Schema.Literal('high'),
      ),
    })
  ),
});

type Group = Schema.Schema.Type<typeof groupSchema>;
```

<div class="content-ad"></div>

일반적인 추론을 달성하기 위해 다음 코드를 작성합니다:

```js
const buildChecksumEnvelopeSchema = <T>(
  datumSchema: Schema.Schema<T>
) => Schema.Struct({
  datum: datumSchema,
  checksum: Schema.String,
});

const userEnvelopeSchema = buildChecksumEnvelopeSchema(userSchema);
const groupEnvelopeSchema = buildChecksumEnvelopeSchema(groupSchema);

type ChecksumEnvelope<T> = Schema.Schema.Type<
  ReturnType<typeof buildChecksumEnvelopeSchema<T>>
>;

type UserChecksumEnvelope = ChecksumEnvelope<User>;
type GroupChecksumEnvelope = ChecksumEnvelope<Group>;
```

@effect/schema를 사용하여 열거 스키마를 정의하는 세 가지 방법을 찾았습니다.

첫 번째 방법은 리터럴의 합집합을 사용하는 것입니다. 아래 예제를 살펴보세요:

<div class="content-ad"></div>

```js
const interestLevelSchema = Schema.Union(
  Schema.Literal('low'),
  Schema.Literal('medium'),
  Schema.Literal('high'),
);

type InterestLevel = Schema.Schema.Type<typeof interestLevelSchema>;
```

스키마 속성에 액세스하여 관심 수준 목록을 추출할 수 있습니다. 아래에 나와있는 것처럼:

```js
const interestLevels = interestLevelSchema
  .members
  .flatMap((member) => member.literals);
```

두 번째 접근 방법은 스키마 리터럴 도우미를 사용하는 것입니다. 한 줄로 스키마를 정의할 수 있습니다.

<div class="content-ad"></div>

```js
const interestLevelSchema = Schema.Literal(‘low’, ‘medium’, ‘high’);
```

우리는 모든 값을 가져 오기위한 한 줄짜리도 사용할 것입니다:

```js
const interestLevels = interestLevelSchema.literals;
```

이 라이브러리를 사용하면 네이티브 열거 유형을 사용할 수 있습니다! 다음 조각을 살펴보세요:


<div class="content-ad"></div>

```js
enum InterestLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

const interestLevelSchema = Schema.Enums(InterestLevel)
const interestLevels = Object.values(InterestLevel);
```

차별화 된 연합을 정의하는 것이 더 간단하지 않았을 것입니다. 아래 코드 조각을 읽어보세요.

```js
const userActorSchema = Schema.Struct({
  type: Schema.Literal('user'),
  id: Schema.String,
});

const groupActorSchema = Schema.Struct({
  type: Schema.Literal('group'),
  id: Schema.String,
});

const actorSchema = Schema.Union(userActorSchema, groupActorSchema);
type Actor = Schema.Schema.Type<typeof actorSchema>;
```

# 부록 B : Yup


<div class="content-ad"></div>

Yup을 사용한 사용자 스키마는 다음과 같습니다:

```js
import Yup from ‘yup’;

const userSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required(),
  claims: Yup.number().required(),
}).noUnknown();
```

이 라이브러리에는 두 가지 주의 사항이 있습니다. 먼저, 필수 도우미를 사용하여 비널 값 받아들이기, 두 번째로 초과 속성을 제외하려면 noUnknown 도우미를 사용해야 합니다.

하지만, 여기에 더 많은 내용이 있습니다!

<div class="content-ad"></div>

추론된 유형에서 스키마를 불변성을 보장하도록 강제하는 방법을 찾지 못했습니다. 다음과 같이 ts-essentials 라이브러리의 DeepReadonly 유형 도우미를 사용해야 했습니다:

```js
type User = DeepReadonly<Yup.InferType<typeof userSchema>>;
```

위의 유형은 다음과 같습니다:

```js
type User = DeepReadonly<typeof userSchema['__outputType']>;
```

<div class="content-ad"></div>

도서관은 내가 정의한 구문 분석을 수행하는 validateSync라는 메서드를 제공합니다:

```js
const userWithExcessProperties = {
  id: '1',
  name: 'Alice',
  claims: 0x02,
  excessProperty: 1,
};

const user = userSchema.validateSync(userWithExcessProperties);
```

그룹 스키마를 다음 형식으로 정의하기를 제안합니다:

```js
enum InterestLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

const groupSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required(),
  userIds: Yup.array(
    Yup.string().required()
  ).required(),
  interests: Yup.array(
    Yup.object({
      id: Yup.string().required(),
      level: Yup.mixed<InterestLevel>()
        .oneOf(Object.values(InterestLevel))
        .required(),
    })
  ).required(),
}).noUnknown();

type Group = DeepReadonly<Yup.InferType<typeof groupSchema>>;
```

<div class="content-ad"></div>

만약 주의깊게 살펴봤다면, 관심 수준을 위한 enum 형식을 볼 수 있었을 것입니다. 곧 enum을 사용하는 이유에 대해 설명할 것입니다.

아래 예제에서 제시된대로 제네릭 추론을 달성할 수 있습니다:

```js
const buildChecksumEnvelopeSchema = <T>(
  datumSchema: Yup.Schema<T>
) => Yup.object({
  datum: datumSchema,
  checksum: Yup.string().required(),
}).noUnknown();

const userEnvelopeSchema = buildChecksumEnvelopeSchema(userSchema);
const groupEnvelopeSchema = buildChecksumEnvelopeSchema(groupSchema);

type UserChecksumEnvelope = DeepReadonly<
  Yup.InferType<typeof userEnvelopeSchema>
>;

type GroupChecksumEnvelope = DeepReadonly<
  Yup.InferType<typeof groupEnvelopeSchema>
>;

type ChecksumEnvelope<T> = DeepReadonly<
  Yup.InferType<ReturnType<typeof buildChecksumEnvelopeSchema<T>>>
>;

type UserChecksumEnvelope = ChecksumEnvelope<User>;
type GroupChecksumEnvelope = ChecksumEnvelope<Group>;
```

약속한 대로, Yup에서 enum 유형을 사용하는 것이 가장 합리적인 이유를 설명하겠습니다.

<div class="content-ad"></div>

다음과 같이 열거형 유형의 스키마를 손쉽게 만들 수 있습니다:

```js
const interestLevelSchema = Yup.mixed<InterestLevel>()
  .oneOf(Object.values(InterestLevel))
  .required();
```

모든 값을 배열로 먼저 정의해야하는 두 번째 방법도 있습니다:

```js
const interestLevels = [
  'low',
  'medium',
  'high',
] as const;

type InterestLevel = typeof interestLevels[number];
```

<div class="content-ad"></div>

다음은 한 줄로 스키마를 작성할 수 있습니다:

```js
const interestLevelSchema = Yup.mixed<InterestLevel>()
  .oneOf(interestLevels)
  .required();
```

여기에는 공용 체계에 대한 스키마를 작성하는 상세한 지침이 있어야 합니다. 유감스럽게도 Yup을 사용하여 지원하는 것을 찾지 못했습니다. 그러나 해결책을 찾았습니다.

스키마 시퀀스가 있는 경우, 각 스키마를 사용하여 객체를 구문 분석하는 함수를 작성하여 일치하는 것을 찾을 때까지 시도할 수 있습니다. 빠르게 작성하는 데 도움이 되는 LLM을 사용할 수 있습니다!

<div class="content-ad"></div>

설정된 제한 시간이 초과되어 서비스에 영향을 줄 수 있습니다. 해당 작업에 대한 피드백이 필요하신 경우 언제든지 알려주세요!