---
title: "Nextjs 14에서 Zod 및 useFormState를 사용해 폼 유효성 검사하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Client Side Form Validation with Zod , useFormState in Nextjs 14"
link: "https://medium.com/javascript-in-plain-english/client-side-form-validation-with-zod-useformstate-in-next-js-14-dc011a9c44fb"
---



웹 애플리케이션에서의 인증은 모든 풀스택 개발자가 알아야 할 중요한 부분입니다. 처음으로 인증을 구현하는 것은 많은 라이브러리와 전략이 존재하기 때문에 사람들(나 포함!)에게 성가신 경험이 될 수 있습니다. 그래서 이 블로그는 Next.js 14에서 Next-Auth v5를 사용하여 완벽한 인증을 구현하는 데 대해 쓰는 내 두 부분 블로그 중 첫 번째 부분입니다.

이 블로그에서는 React에서 데이터를 처리하고 Zod를 사용하여 몇 분 안에 클라이언트 측 유효성 검사를 수행하는 가장 쉬운 방법에 대해 이야기하겠습니다.

## 다음 앱 만들기

<div class="content-ad"></div>

터미널에서 아래 명령을 사용하여 Next 앱을 만들어보겠습니다.

```js
npx create-next-app@latest
```

참고: 이 명령을 실행하기 전에 Node.js 18.17(또는 그 이상)이 설치되어 있는지 확인하세요.

비슷하게, Node.js 대신 Bun이 이미 설치된 경우 다음 명령을 실행하세요.

<div class="content-ad"></div>

```js
bunx create-next-app
```

# Next.js 프로젝트 구조

```js
my-app/
├── node-modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   └── components/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tailwind.config.js

끝에 '/'는 폴더를 나타냅니다
```

다음 앱을 만든 후 프로젝트의 폴더 구조는 위와 같습니다. Next.js에 익숙하지 않은 경우에는 압도될 수 있을 수 있지만, 이것이 얼마나 간단한지 알려드리겠습니다:

<div class="content-ad"></div>

- node-modules: 만약 이전에 Node.js를 다뤄본 적이 있다면 이 폴더가 무엇을 의미하는지 알 것입니다. 하지만 이가 처음이라면, 이 폴더에는 프로젝트의 모든 종속성이 저장됩니다. 우리가 npm을 사용해 설치하는 모든 외부 종속성은 여기서 가져옵니다.
- public: 이 폴더에는 이미지, 비디오, GIF 또는 PDF와 같은 다른 종류의 문서를 포함한 모든 정적 자산이 저장됩니다. 이 파일들은 크롬에 캐싱됩니다. 성능을 높이기 위해 자주 바뀌지 않습니다.
- src: 이 폴더는 .jsx 또는 .tsx 파일 형태로 우리의 프론트엔드 및 백엔드 코드를 포함하는 애플리케이션의 핵심입니다. 이 폴더 내부의 앱 폴더에는 애플리케이션의 모든 라우트가 폴더 형태로 포함되어 있으며, 컴포넌트 폴더에는 버튼, 카드 등과 같이 모든 사용자 지정 재사용 가능한 UI 컴포넌트가 포함되어 있습니다.

앱 디렉토리의 각 폴더는 /폴더\_이름으로 이동하여 액세스할 수 있는 라우트를 나타냅니다. 이 페이지의 내용은 page.js라는 파일에서 렌더링되며, layout.js 파일은 모든 서브 라우트에 렌더링되는 스타일 및 UI 컴포넌트 세트를 정의합니다.

앱 라우터에서 허용되는 다른 파일에 대해 자세히 알고 싶다면 공식 문서에서 이 링크를 확인해보세요: https://nextjs.org/docs/getting-started/project-structure#routing-files

- .env: 이 파일에는 시크릿 ID 및 키와 같은 필수적인 비밀 환경 변수가 포함됩니다. 이를 .env.development.local 및 .env.production으로 나누어 저장하고 절대로 공개하지 마세요!
- package.json 및 package-lock.json: 이 파일들은 설치된 모든 패키지와 버전을 추적하고 프로젝트를 실행하기 위한 미리 정의된 스크립트를 유지합니다.
- tailwind.config.js: 이 파일에는 Tailwind가 사용할 모든 구성이 포함되어 있어 사용자 정의를 정의합니다.

<div class="content-ad"></div>

지금 이 부분을 처리했으니 npm run dev 명령을 사용해서 개발 모드로 서버를 실행해 보세요.

참고: 이 명령어는 package.json에 정의된 스크립트 별칭으로, 개발 모드에서 다음 서버를 실행하는 데 사용됩니다.

# 폼 페이지 추가하기

위에서 논의한 대로, 새로운 경로를 만들기 위해 app 디렉토리에 login이라는 이름의 새 폴더를 만들고 page.js라는 파일을 포함해야 합니다. 여기에 작성하는 모든 코드는 /login에 렌더링됩니다.

<div class="content-ad"></div>

우리는 사용자 이름과 비밀번호를 입력하는 간단한 양식을 만들거나 사용자는 OAuth 제공 업체인 Google, Github, Reddit 및 Twitter을 사용할 수 있습니다.

우리의 양식 페이지를 빠르게 만들기 위해 Flowbite에서 Tailwind 구성 요소를 사용하고 있습니다. 여기에 링크되어 있습니다: https://flowbite.com/docs/components/forms/

하지만 원하는 어떤 구성 요소 라이브러리든 사용할 수 있습니다. 정말 중요하지 않아요.

<div class="content-ad"></div>

마침내, 우리 페이지는 다음과 같이 보이고 이제 작업을 시작할 수 있어요.

## 클라이언트 측 양식 유효성 검사

우리 양식 데이터를 유효성 검사하는 첫 번째 단계이며, 이 단계에서는 서버로 데이터를 전송하기 전에 기본 데이터 유효성을 검사합니다. 이를 수행하는 가장 쉬운 방법은 Zod와 같은 서드 파티 라이브러리를 사용하는 것입니다.

![이미지](https://miro.medium.com/v2/resize:fit:996/0*V_3NRp1Kj-niQieY.gif)

<div class="content-ad"></div>

아니에요, 여기 내 친구는 크립토어니언이 아니에요 😅

Zod는 TypeScript를 우선으로 한 스키마 선언 및 유효성 검사 라이브러리로, 사용하기 매우 쉽습니다.

프로젝트 설정에 Zod를 빠르게 포함시키려면 npm install zod를 사용하세요.

Zod는 문자열, 숫자, 부울, 날짜 등과 같은 필드를 위한 기본값을 문서에서 제공합니다. 우리는 두 개의 필드만 가지고 있는데, 둘 다 문자열 값을 사용하므로 두 개 모두에 대해 별도의 스키마를 생성할 수 있습니다.

<div class="content-ad"></div>

Zod은 아래에 표시된 대로 문자열 유효성 검사를 위한 많은 옵션을 기본적으로 제공합니다. 이러한 인수들을 순차적으로 처리할 수 있는 옵션과 함께 사용할 수 있습니다.

```js
z.string().min(5, { message: "5자 이상이어야 함" });
z.string().max(5, { message: "5자 이하여야 함" });
z.string().length(5, { message: "정확히 5자여야 함" });
z.string().email({ message: "잘못된 이메일 주소" });
z.string().url({ message: "잘못된 URL" });
z.string().emoji({ message: "이모지가 포함되지 않음" });
z.string().uuid({ message: "잘못된 UUID" });
z.string().includes("tuna", { message: "반드시 'tuna'를 포함해야 함" });
z.string().startsWith("https://", { message: "보안 URL을 제공해야 함" });
z.string().endsWith(".com", { message: "오직 .com 도메인만 허용됨" });
z.string().datetime({
  message: "잘못된 날짜 및 시간 문자열! 반드시 UTC여야 함",
});
z.string().ip({ message: "잘못된 IP 주소" });
```

스키마는 기본적으로 전달된 데이터의 모든 종류를 유효성 검사할 수 있는 데이터 유형으로 정의된 일련의 규칙을 포함하는 객체입니다.

```js
const userSchema = z.string().min(5, { message: "5자 이상이어야 함" });

const passSchema = z
  .string()
  .min(8, { message: "8자 이상이어야 함" })
  .regex(new RegExp(".*[A-Z].*"), {
    message: "대문자가 하나 이상 포함되어야 함",
  })
  .regex(new RegExp(".*\\d.*"), { message: "숫자가 하나 이상 포함되어야 함" })
  .regex(new RegExp(".*[`~<>?,./!@#$%^&*()-_+=\"'|{}[];:\\\\].*"), {
    message: "특수 문자가 하나 이상 포함되어야 함",
  });
```

<div class="content-ad"></div>

이 스키마를 사용하는 예는 .safeParse() 메소드를 사용하는 것입니다:

```js
userSchema.safeParse("user"); // ❌ { success: false; error: "5자 이상이어야 함" }
userSchema.safeParse("Random"); // ✅ { success: true; data: "Random' }

passSchema.safeParse("pass"); // ❌ { success: false; error: "8자 이상이어야 함" }
passSchema.safeParse("password"); // ❌ { success: false; error: "대문자가 하나 이상 있어야 함" }
passSchema.safeParse("Password"); // ❌ { success: false; error: "숫자가 하나 있어야 함" }
passSchema.safeParse("Password123"); // ❌ { success: false; error: "특수 문자가 하나 있어야 함" }
passSchema.safeParse("Password123*"); // ✅ { success: true; data: "Password123*" }
```

이제 이를 정의했다면 라이브 검증을 위해 모든 키 스트로크마다 이를 호출해야 합니다. 이렇게 하려면 onChange 이벤트를 사용하여 입력 데이터를 확인하는 함수를 호출하는 방식입니다.

```js
<input type="text" name="username" onChange={checkSchema} />
```

<div class="content-ad"></div>

# 폼 데이터 가져오기

React에서 폼 데이터를 가져오는 여러 가지 방법이 있지만, React에서 폼 데이터를 가져오는 가장 쉬운 방법에 대해 다시 이야기해보겠습니다. 몇 달 전에 React에서 새로운 훅인 useFormState()를 출시했는데, 이를 통해 폼과 상호 작용하는 것이 매우 쉬워졌습니다.

```js
const [state, formAction] = useFormState(fn, initialState);
```

공식 문서에서는 다음과 같이 설명합니다:

<div class="content-ad"></div>

이 훅을 사용하려면 useFormState() 훅을 정의하고 제출되는 양식마다 호출될 handleCredentials라는 함수를 함께 정의하면 됩니다. 그런 다음 formData.get("input")를 사용하여 해당 입력 필드에서 데이터를 가져올 수 있습니다.

```js
const handleCredentials = async (prevState, formData) => {
  const response = await signIn("credentials", {
    username: formData.get("username"),
    password: formData.get("password"),
    redirect: false,
  });

  if (!!response.error) {
    setModal(true);
    setErrorMessage("잘못된 사용자 이름 또는 비밀번호");
    console.log(response.error);
  } else {
    router.push("/dashboard");
  }
};

const [state, formAction] = useFormState(handleCredentials, initialState);
```

```js
<form action={formAction}>
```

클라이언트 측에서 자격 증명을 확인한 후에는 서버측 유효성 검사를 위해 해당 내용을 서버에 보낼 수 있습니다. 입력된 자격 증명이 올바른지 확인하려면 요청에 대한 응답을 받게 됩니다. 응답에 오류 메시지가 포함되어 있는 경우 해제 가능한 모달을 사용하여 해당 메시지를 표시하게 됩니다.

<div class="content-ad"></div>

Zod로 클라이언트 측 유효성 검사를 성공적으로 구성했습니다. 블로그를 건너뛴 모든 친구들과 코드에만 관심이 있는 분들을 위해 아래에 소스 코드를 첨부했어요.

이 글을 즐겁게 읽어 주셨기를 바라며, 즐거운 하루 보내세요! 😅

## 소스 코드:

![ClientSideFormValidationwithZod-useFormStateinNextjs14_3](/assets/img/ClientSideFormValidationwithZod-useFormStateinNextjs14_3.png)

<div class="content-ad"></div>

## 참고 자료:

- useFormState() 훅: https://react.dev/reference/react-dom/hooks/useFormState
- Zod: https://zod.dev/
- Flowbite: https://flowbite.com/docs/getting-started/quickstart/
- Next.js 문서: https://nextjs.org/docs

다음에는 서버 측에 양식 데이터를 전송하고 Next-Auth v5를 사용하여 인증을 구현할 예정입니다.

![이미지](https://miro.medium.com/v2/resize:fit:996/0*DqPaqJr_veut8_bv.gif)

<div class="content-ad"></div>

# 솔직한 영어 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 반드시 작가를 clapping하고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
