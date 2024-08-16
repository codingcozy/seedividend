---
title: "Title TypeScript과 Go 및 Rust 오류 Try Catch 없어 이단주의"
description: ""
coverImage: "/assets/img/2024-05-14-TypeScriptWithGoandRustErrorsNoTryCatchHeresy_0.png"
date: 2024-05-14 15:12
ogImage: 
  url: /assets/img/2024-05-14-TypeScriptWithGoandRustErrorsNoTryCatchHeresy_0.png
tag: Tech
originalTitle: "TypeScript With Go and Rust Errors? No Try Catch? Heresy"
link: "https://medium.com/better-programming/typescript-with-go-rust-errors-no-try-catch-heresy-da0e43ce5f78"
isUpdated: true
---




![2024-05-14-TypeScriptWithGoandRustErrorsNoTryCatchHeresy_0.png](/assets/img/2024-05-14-TypeScriptWithGoandRustErrorsNoTryCatchHeresy_0.png)

자, 그러면 나에 대한 소소한 이야기부터 시작해볼까요? 저는 경력이 약 열 년 정도인 소프트웨어 개발자입니다. 처음에는 PHP로 일하다가 서서히 JavaScript로 전환했어요.

약 다섯 년 전 TypeScript를 사용하기 시작했고, 그 이후로는 결코 JavaScript로 돌아가지 않았습니다. TypeScript를 사용하기 시작한 순간, 이 전세계에서 가장 멋진 프로그래밍 언어인 것 같다고 생각했어요. 모두가 그것을 사랑하고 사용하니까요... 정말 최고의 언어인 거 맞죠? 맞죠? 그렇죠?

그런데 다른 언어들을 좀 더 현대적인 것으로 시도해보기 시작했어요. 먼저 Go를 접했고, 이어서 천천히 Rust를 목록에 추가했어요 (감사합니다, Prime).



알지 못할 때 뭔가를 놓치는 것은 어렵습니다.

제가 얘기하고 싶은 것은 무엇일까요? Go와 Rust가 공유하는 공통점은 무엇인가요? 오류입니다. 그것이 가장 눈에 띄는 점이었죠. 그리고 좀 더 구체적으로, 이러한 언어들이 오류를 어떻게 처리하는지에 대해서요.

JavaScript는 오류를 처리하기 위해 예외를 던지는 데 의존하지만, Go와 Rust는 그것들을 값으로 취급합니다. 이게 그다지 큰 문제가 아니라고 생각할 수도 있습니다만... 하지만, 정말 그럴듯하게 들릴지도 몰라요; 하지만, 이것은 게임 체인저입니다.

마주하겠습니다. 각 언어에 대해 깊게 들어가지는 않을 거에요; 일반적인 접근 방식을 알고 싶어 하는 것이죠.



자바스크립트/타입스크립트와 작은 게임으로 시작해볼까요?

아래 코드를 5초 동안 살펴보고, 왜 try/catch로 감싸야 하는지 답해보세요.

```js
try {
  const request = { name: "test", value: 2n };
  const body = JSON.stringify(request);
  const response = await fetch("https://example.com", {
    method: "POST",
    body,
  });
  if (!response.ok) {
    return;
  }
  // handle response
} catch (e) {
  // handle error
  return;
}
```

대부분의 분들이 예상한 대로, response.ok를 확인하고 있는데도 fetch 메서드가 오류를 발생시킬 수 있다는 것을 알았을 것입니다. response.ok는 4xx와 5xx 네트워크 오류만을 "잡아내지"요. 그러나 네트워크 자체에 문제가 발생하면 오류가 발생합니다.



하지만 JSON.stringify가 오류를 던질 것이라는 것을 얼마나 많은 사람이 추측했을지 궁금하네요. 이유는 요청 객체에 bigint (2n) 변수가 포함되어 있기 때문에 JSON이 이를 문자열화하는 방법을 모른다는 점입니다.

그래서 첫 번째 문제는, 개인적으로는 JavaScript 역사상 가장 큰 문제라고 생각합니다: 어떤 것이 오류를 발생시킬 수 있는지 모른다는 것입니다. JavaScript 오류 관점에서, 이는 다음과 같습니다:

```js
try {
  let data = "Hello";
} catch (err) {
  console.error(err);
}
```

JavaScript는 모릅니다; JavaScript는 신경 쓰지 않습니다. 하지만 여러분은 알아야 합니다.



두 번째로, 여기 완벽히 유효한 코드입니다:

```js
const request = { name: "test", value: 2n };
const body = JSON.stringify(request);
const response = await fetch("https://example.com", {
  method: "POST",
  body,
});
if (!response.ok) {
  return;
}
```

에러 없이, 린터도 통과하여도 여전히 앱을 망가뜨릴 수 있답니다.

지금 내 머릿속에서 "뭐가 문제니, 그냥 모든 곳에 try/catch를 사용하면 되지"라는 목소리를 듣는 것 같아요. 여기 세 번째 문제가 나타나죠: 어떤 예외가 발생하였는지 알 수 없어요. 물론 에러 메시지를 통해 어떤 예외가 발생했는지 어느 정도는 추측할 수 있지만, 에러가 발생할 수 있는 많은 서비스/기능이 있는 큰 프로젝트라면 어떻게 할 건가요? 당신이 모든 예외 상황을 try/catch로 제대로 처리하고 있는지 확신할 수 있나요?



알았어요, JS를 비난하는 걸 그만하고 다른 얘기로 넘어갈까요? 이 Go 코드로 시작해봐요:

```go
f, err := os.Open("filename.ext")
if err != nil {
  log.Fatal(err)
}
// 열린 *File f로 무언가를 처리합니다
```

우리는 파일을 열어서 파일 또는 오류를 반환하려고 해요. 이걸 자주 볼 거에요, 왜냐하면 어떤 함수가 항상 오류를 반환하는지 알고 있기 때문이에요. 한 번도 놓치지 않아요. 여기서 오류를 값으로 다루는 첫 번째 예시를 볼 수 있어요. 어떤 함수가 그것들을 반환할 수 있는지 지정하고, 반환하고, 할당하고, 확인하고, 다루는거죠.

그리고 이것은 그렇게 다채롭지 않다는 점도 있고, Go가 비판받는 것 중 하나인 ‘"오류 확인 코드"’인데요, err != nil ' … 같은 부분이 종종 나머지보다 더 많은 줄을 차지하기도 해요.



```js
만약 에러가 발생하면 {
  …
  만약 에러가 발생하면 {
    …
    만약 에러가 발생하면 {
      … 
    }
  } 
}
만약 에러가 발생하면 {
  … 
}
…
만약 에러가 발생하면 {
  … 
}
```

전체 노력이 확실히 가치 있어, 믿어도 괜찮아.

그리고 마지막으로, Rust:

```js
let greeting_file_result = File::open("hello.txt");
let greeting_file = match greeting_file_result {
  Ok(file) => file,
  Err(error) => panic!("파일 열기에 문제 발생: {:?}", error),
};
```



여기 세 가지 중 가장 상세하고, 기이하게도 가장 좋은 것이 있습니다. 그래서, 먼저 러스트는 놀라운 enum을 사용하여 오류를 처리합니다 (TypeScript의 enum과는 다릅니다!). 자세히 설명하지 않고 중요한 것은 두 가지 변형을 가진 Result라는 enum을 사용한다는 것입니다: Ok과 Err입니다. 상상컨대 Ok에는 값이 포함되어 있고 Err에는... 놀랍게도 오류가 포함되어 있습니다 :D.

Go 문제를 완화하기 위해 더 편리하게 처리하기 위한 방법이 많이 있습니다. 가장 잘 알려진 방법 중 하나는 ? 연산자입니다.

```js
let greeting_file_result = File::open("hello.txt")?;
```

여기서 주요한 점은 Go와 Rust가 항상 어디에 오류가 발생할 수 있는지 알고 있고, 오류가 나타난 곳에서 바로 처리하도록 강제한다는 것입니다 (대부분). 숨겨진 오류나 추측, 놀란 얼굴로 앱이 깨지는 일은 없습니다.



그리고 이 방법이 그냥 더 나은 거야. 아주 많이.

그럼, 솔직해지는 시간이야; 난 조금 거짓말을 했어. TypeScript 오류를 Go/Rust와 같이 작동하도록 만들 수는 없어. 여기서의 제한 요인은 언어 자체야; 그 일을 수행할 적절한 도구가 없거든.

하지만 우리가 할 수 있는 건 비슷하게 만들어 보려고 노력하는 거야. 그리고 간단하게 만드는 거야.

이렇게 시작해 보자:



```js
export type Safe<T> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    error: string;
  };
```

여기에는 특별한 것은 없어요. 그냥 간단한 제네릭 타입일 뿐이에요. 그러나 이 작은 아이가 코드를 완전히 바꿀 수 있어요. 아마도 알아차릴 수 있을 거예요만, 이곳에서 가장 큰 차이점은 데이터를 반환하거나 에러를 반환한다는 점이죠. 익숙해 보이나요?

그리고… 또 하나의 거짓말, 우리는 몇 개의 try/catch가 필요해요. 좋은 점은 100,000이 아니라 약 두 개만 필요하다는 것이에요.

```js
export function safe<T>(promise: Promise<T>, err?: string): Promise<Safe<T>>;
export function safe<T>(func: () => T, err?: string): Safe<T>;
export function safe<T>(
  promiseOrFunc: Promise<T> | (() => T),
  err?: string,
): Promise<Safe<T>> | Safe<T> {
  if (promiseOrFunc instanceof Promise) {
    return safeAsync(promiseOrFunc, err);
  }
  return safeSync(promiseOrFunc, err);
}

async function safeAsync<T>(
  promise: Promise<T>, 
  err?: string
): Promise<Safe<T>> {
  try {
    const data = await promise;
    return { data, success: true };
  } catch (e) {
    console.error(e);
    if (err !== undefined) {
      return { success: false, error: err };
    }
    if (e instanceof Error) {
      return { success: false, error: e.message };
    }
    return { success: false, error: "Something went wrong" };
  }
}

function safeSync<T>(
  func: () => T, 
  err?: string
): Safe<T> {
  try {
    const data = func();
    return { data, success: true };
  } catch (e) {
    console.error(e);
    if (err !== undefined) {
      return { success: false, error: err };
    }
    if (e instanceof Error) {
      return { success: false, error: e.message };
    }
    return { success: false, error: "Something went wrong" };
  }
}
```



"와우, 무슨 천재인가요. try/catch를 위한 래퍼를 만들었네요." 네, 맞아요; 이것은 Safe 타입을 반환하는 래퍼일 뿐입니다. 하지만 때로는 간단한 것만으로 충분할 때도 있죠. 위의 예시와 함께 결합해봅시다.

예전 코드 (16 줄):

```js
try {
  const request = { name: "test", value: 2n };
  const body = JSON.stringify(request);
  const response = await fetch("https://example.com", {
    method: "POST",
    body,
  });
  if (!response.ok) {
    // 네트워크 에러 처리
    return;
  }
  // 응답 처리
} catch (e) {
  // 에러 처리
  return;
}
```

새 코드 (20 줄):



```js
const request = { name: "test", value: 2n };
const body = safe(
  () => JSON.stringify(request),
  "요청을 직렬화하는 데 실패했습니다",
);
if (!body.success) {
  // 에러 처리 (body.error)
  return;
}
const response = await safe(
  fetch("https://example.com", {
    method: "POST",
    body: body.data,
  }),
);
if (!response.success) {
  // 에러 처리 (response.error)
  return;
}
if (!response.data.ok) {
  // 네트워크 에러 처리
  return;
}
// 응답 처리 (body.data)
```

그래서 새롭게 제안된 솔루션은 더 길지만, 다음과 같은 이유로 성능이 우수합니다:

- try/catch가 없음
- 발생한 각 오류를 해당 위치에서 처리
- 특정 함수에 대한 오류 메시지 지정 가능
- 상단부터 하단까지 좋은 논리 구조, 모든 오류가 상단에 있고 가장 아래에는 응답만 있음

다음의 내용을 확인하는 것을 잊을 경우 어떻게 될까요?




```js
if (!body.success) {
  // 에러 처리 (body.error)
  return;
}
```

문제는... 우리는 그것을 할 수 없어요. 네, 그 확인을 해야 합니다. 그것을 하지 않으면 body.data가 존재하지 않을 거에요. LSP가 "Property 'data' does not exist on type 'Safe`string`’" 오류를 던져서 우리를 알릴 거에요. 그리고 그건 우리가 만든 간단한 Safe 타입 덕분이에요. 그리고 에러 메시지에도 작동해요. 우리는 !body.success를 확인하지 않으면 body.error에 액세스할 수 없어요.

여기 TypeScript를 감사하게 생각해야 할 때예요. 그리고 이것이 적용되는 방법은 다음과 같아요:



```js
if (!response.success) {
  // 오류 처리 (response.error)를 핸들링하세요
  return;
}
```

!response.success를 제거할 수 없는 이유는 그렇게 하지 않으면 response.data가 존재하지 않을 수 있기 때문입니다.

물론, 우리의 해결책에는 문제가 없지 않습니다. 가장 큰 문제는 오류를 발생시킬 수 있는 Promise/함수를 안전한 래퍼로 감싸야 한다는 것을 기억해야 한다는 점입니다. 이 "우리가 알아야 하는" 것은 극복할 수 없는 언어 제한입니다.

어렵게 들릴 수 있지만, 실제로는 그렇지 않습니다. 곧 코딩에서 거의 모든 Promise가 오류를 발생할 수 있고 동기 함수 중에서도 그런 것을 알아보고 그 수가 많지 않다는 것을 깨닫게 될 것입니다.




여전히 의문이 있을 수도 있겠죠? 하지만 저희는 그것이 가치가 있다고 생각해요. 저희 팀에서는 정말 잘 작동하고 있거든 :). 예를 들어, 어디에서나 try/catch가 없는 큰 서비스 파일을 본다면, 모든 오류가 발생한 곳에서 처리되고, 논리적으로 순조롭게 흘러간다면... 정말 멋지게 보이죠.

여기 SvelteKit FormAction을 사용한 실제 예제가 있어요:

```js
export const actions = {
  createEmail: async ({ locals, request }) => {
    const end = perf("CreateEmail");
    const form = await safe(request.formData());
    if (!form.success) {
      return fail(400, { error: form.error });
    }
    const schema = z
      .object({
        emailTo: z.string().email(),
        emailName: z.string().min(1),
        emailSubject: z.string().min(1),
        emailHtml: z.string().min(1),
      })
      .safeParse({
        emailTo: form.data.get("emailTo"),
        emailName: form.data.get("emailName"),
        emailSubject: form.data.get("emailSubject"),
        emailHtml: form.data.get("emailHtml"),
      });
    if (!schema.success) {
      console.error(schema.error.flatten());
      return fail(400, { form: schema.error.flatten().fieldErrors });
    }
    const metadata = createMetadata(URI_GRPC, locals.user.key)
    if (!metadata.success) {
      return fail(400, { error: metadata.error });
    }
    const response = await new Promise<Safe<Email__Output>>((res) => {
      usersClient.createEmail(schema.data, metadata.data, grpcSafe(res));
    });
    if (!response.success) {
      return fail(400, { error: response.error });
    }
    end();
    return {
      email: response.data,
    };
  },
} satisfies Actions;
```

다음 사항 몇 가지를 강조해보겠어요:



- 저희 사용자 정의 함수 grpcSafe는 gGRPC 콜백 처리를 돕습니다.
- createMetadata는 Safe를 반환하므로 래핑할 필요가 없습니다.
- zod 라이브러리도 동일한 패턴을 사용합니다 :) 스키마.success 확인을 하지 않으면 스키마.data에 접근할 수 없습니다.

깔끔하게 보이지 않나요? 한번 시도해보세요! 아마도 여러분에게도 잘 맞을지도 모르겠네요 :)

읽어 주셔서 감사합니다.

P.S. 비슷해 보이나요?



```js
f, err := os.Open("filename.ext")
if err != nil {
  log.Fatal(err)
}
// 열린 *File f를 사용해 작업을 수행합니다
```

```js
const response = await safe(fetch("https://example.com"));
if (!response.success) {
  console.error(response.error);
  return;
}
// response.data를 활용해 작업을 수행합니다
```

만약 마음에 드셨다면, 저의 트위터를 팔로우해주시고 공유해주시면 정말 감사하겠습니다! 제가 gRPC와 페이지로 데이터를 점진적으로 스트리밍하는 등, 잘 알려지지 않은 기술들에 대해 지식을 나누기를 원합니다. :)

[트위터에서 팔로우하기](https://twitter.com/mapiorowski)