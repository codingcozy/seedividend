---
title: "Nextjs 14 Draft Mode 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# Nextjs 14 Draft Mode 방법 정리

정적 렌더링은 페이지가 헤드리스 CMS에서 데이터를 가져올 때 유용합니다. 그러나 헤드리스 CMS에서 초안을 작성하고 바로 페이지에서 확인하고 싶은 경우에 이상적이지 않습니다. 이럴 때 Next.js가 이러한 페이지를 빌드 시간이 아니라 요청 시간에 렌더링하고 게시된 콘텐츠가 아니라 초안 콘텐츠를 가져오도록 하고 싶을 것입니다. 이 특별한 경우에만 Next.js가 동적 렌더링으로 전환될 수 있도록 하고 싶을 것입니다.
Next.js에는 이 문제를 해결하는 Draft Mode라는 기능이 있습니다. 사용 방법은 다음과 같습니다.

## 단계 1: 라우트 핸들러 생성 및 접근

<div class="content-ad"></div>

먼저 Route Handler를 만들어보세요. 이름은 어떤 것이든 됩니다 - 예를 들어 app/api/draft/route.ts
그런 다음 next/headers에서 draftMode를 가져와 enable() 메소드를 호출하세요.

```typescript
// 드래프트 모드를 활성화하는 route handler
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  draftMode().enable();
  return new Response("드래프트 모드가 활성화되었습니다");
}
```

이렇게 해서 쿠키를 설정하여 드래프트 모드를 활성화할 수 있습니다. 이 쿠키를 포함한 후속 요청은 정적으로 생성된 페이지의 동작을 변경하는 드래프트 모드를 트리거할 것입니다 (이에 대해 나중에 자세히 설명하겠습니다).

<div class="content-ad"></div>

수동으로 이를 테스트하려면 /api/draft를 방문하여 브라우저의 개발자 도구를 확인해보세요. "Set-Cookie"라는 응답 헤더에 "\_\_prerender_bypass"라는 이름의 쿠키가 있는 것을 확인할 수 있습니다.

### 헤들리스 CMS에서 안전하게 접근하기

실제로는 헤들리스 CMS에서 이 라우트 핸들러를 안전하게 호출하고 싶을 것입니다. 사용하는 헤들리스 CMS에 따라 구체적인 단계는 다를 수 있지만, 여기에 몇 가지 일반적인 단계가 있습니다.
이러한 단계들은 사용 중인 헤들리스 CMS가 사용자 정의 드래프트 URL 설정을 지원하는 것으로 가정합니다. 그렇지 않은 경우에도 이 방법을 사용하여 드래프트 URL을 보호할 수 있지만, 드래프트 URL을 수동으로 구성하고 액세스해야 할 것입니다.

<div class="content-ad"></div>

먼저, 자신이 선택한 토큰 생성기를 사용하여 시크릿 토큰 문자열을 생성해야 합니다. 이 시크릿은 당신의 Next.js 앱과 헤드리스 CMS만이 알게 될 것입니다. 이 시크릿은 CMS에 액세스할 수 없는 사람들이 초안 URL에 액세스하는 것을 방지합니다.
둘째, 헤드리스 CMS가 사용자 정의 초안 URL을 설정하는 것을 지원하는 경우, 다음을 초안 URL로 지정하십시오. 이는 Route Handler가 app/api/draft/route.ts에 위치한다고 가정합니다.

```js
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

- `<your-site>`는 배포 도메인이어야 합니다.
- `<token>`은 생성한 시크릿 토큰으로 대체해야 합니다.
- `<path>`는 보고 싶은 페이지의 경로여야 합니다. /posts/foo를 보고 싶다면 &slug=/posts/foo를 사용해야 합니다.

<div class="content-ad"></div>

헤들리스 CMS를 사용하면 초안 URL에 변수를 포함할 수 있어요. 이렇게하면 `<path>`가 CMS 데이터에 따라 동적으로 설정될 수 있어요: &slug=/posts/{entry.fields.slug}
마지막으로, 라우트 핸들러에서:

- 비밀 토큰을 확인하고 슬러그 매개변수가 있는지 확인하세요 (그렇지 않으면 요청이 실패해야 합니다).
- draftMode.enable()을 호출하여 쿠키를 설정하세요.
- 그런 다음 브라우저를 slug로 지정된 경로로 리디렉션하세요.

```typescript
// 비밀 및 슬러그 있는 라우트 핸들러
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // 쿼리 문자열 매개변수 구문 분석
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // 비밀 및 다음 매개변수 확인
  //이 비밀 정보는 이 라우트 핸들러와 CMS에서만 알려진 정보여야 합니다
  if (secret !== "MY_SECRET_TOKEN" || !slug) {
    return new Response("유효하지 않은 토큰", { status: 401 });
  }

  // Headless CMS를 가져와 제공된 'slug'가 있는지 확인합니다
  // getPostBySlug는 Headless CMS로 필요한 가져오기 로직을 구현할 것입니다
  const post = await getPostBySlug(slug);

  // slug가 존재하지 않는 경우 초안 모드를 활성화하지 않음
  if (!post) {
    return new Response("유효하지 않은 슬러그", { status: 401 });
  }

  // 쿠키를 설정하여 초안 모드 활성화
  draftMode().enable();

  // 가져온 게시물의 경로로 리디렉션
  // open redirect 취약점으로 이어질 수 있는 searchParams.slug로 리디렉션하지 않습니다
  redirect(post.slug);
}
```

<div class="content-ad"></div>

이것이 성공하면, 브라우저가 원하는 경로로 redirect되며 초안 모드 쿠키로 설정될 것입니다.

## 단계 2: 페이지 업데이트

다음 단계는 페이지를 업데이트하여 draftMode().isEnabled의 값을 확인하는 것입니다.
쿠키가 설정된 페이지를 요청하면 데이터가 빌드 시간이 아닌 요청 시간에 가져올 것입니다.

<div class="content-ad"></div>

더욱이, isEnabled의 값은 true가 될 것입니다.

```typescript
// 데이터를 가져오는 페이지
import { draftMode } from "next/headers";

async function getData() {
  const { isEnabled } = draftMode();

  const url = isEnabled ? "https://draft.example.com" : "https://production.example.com";

  const res = await fetch(url);

  return res.json();
}

export default async function Page() {
  const { title, desc } = await getData();

  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
    </main>
  );
}
```

여기까지입니다! 만약 헤들리스 CMS나 수동으로 숨은 Route Handler에 액세스한다면, 이제 드래프트 컨텐츠를 볼 수 있어야 합니다. 또한, 드래프트를 업데이트하고 발행하지 않은 경우에도 드래프트를 볼 수 있어야 합니다.
이를 헤들리스 CMS의 드래프트 URL로 설정하거나 수동으로 액세스하여 드래프트를 볼 수 있어야 합니다.

<div class="content-ad"></div>

```js
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

## 더 자세한 정보

### 드래프트 모드 쿠키 지우기

기본적으로, 브라우저가 닫히면 드래프트 모드 세션이 종료됩니다.

<div class="content-ad"></div>

Draft Mode 쿠키를 수동으로 지우려면 draftMode().disable()를 호출하는 Route Handler를 생성하십시오:

```typescript
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  draftMode().disable();
  return new Response("Draft mode is disabled");
}
```

그런 다음 /api/disable-draft로 요청을 보내어 Route Handler를 호출하십시오. 만약 next/link를 사용하여 이 라우트를 호출하는 경우, 미리 가져오기(prefetch)에서 실수로 쿠키를 삭제하는 것을 방지하기 위해 prefetch={false}를 전달해야 합니다.

### 각각의 next 빌드별로 고유함

<div class="content-ad"></div>

다음 빌드를 실행할 때마다 새로운 바이패스 쿠키 값이 생성됩니다.  
이렇게 함으로써 바이패스 쿠키가 추측되지 않도록 보장됩니다.

> 알아두면 좋은 사항: Draft Mode를 로컬에서 HTTP로 테스트하려면 브라우저가 제3자 쿠키와 로컬 저장소 액세스를 허용해야 합니다.

<div class="content-ad"></div>
