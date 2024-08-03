---
title: "Nextjs 13 Draft 모드 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "화면 보호 모드"
link: "undefined"
---



# 임시 보관함

페이지 문서 및 데이터 가져오기 문서에서는 getStaticProps와 getStaticPaths를 사용하여 페이지를 빌드할 때 미리 렌더링하는 방법에 대해 설명했습니다.

정적 생성은 페이지가 헤드리스 CMS에서 데이터를 가져 올 때 유용합니다. 그러나 헤드리스 CMS에서 드래프트를 작성하고 해당 드래프트를 즉시 페이지에서 볼 수 있으면 이상적이지 않습니다. 이러한 경우 Next.js가 이러한 페이지를 요청 시간에 렌더링하고 빌드 시간이 아닌 드래프트 콘텐츠를 가져 오도록하고 싶습니다. 이 특정 경우에만 정적 생성을 우회하고 싶을 것입니다.

Next.js에는 이 문제를 해결하는 Draft Mode라는 기능이 있습니다. 이를 사용하는 방법은 다음과 같습니다.

<div class="content-ad"></div>

## 단계 1: API 라우트 생성 및 접근

> Next.js API 라우트에 익숙하지 않다면 먼저 API 라우트 문서를 확인해보세요.

먼저 API 라우트를 생성하세요. 아무 이름으로 생성해도 괜찮습니다 - 예를 들어 pages/api/draft.ts

이 API 라우트에서는 응답 객체에서 setDraftMode를 호출해야 합니다.

<div class="content-ad"></div>

```js
export default function handler(req, res) {
  // ...
  res.setDraftMode({ enable: true });
  // ...
}
```

이렇게 하면 초안 모드를 활성화하는 쿠키가 설정됩니다. 이 쿠키를 포함한 후속 요청은 정적으로 생성된 페이지의 동작을 변경하게 됩니다 (나중에 더 자세히 설명하겠습니다).

아래처럼 API 경로를 만들고 브라우저에서 수동으로 접근해 테스트할 수 있습니다:

```js
// 브라우저에서 수동으로 테스트하기 위한 간단한 예제.
export default function handler(req, res) {
  res.setDraftMode({ enable: true });
  res.end("Draft mode is enabled");
}
```

<div class="content-ad"></div>

만약 브라우저의 개발자 도구를 열고 /api/draft에 방문하면 Set-Cookie 응답 헤더가 포함된 것을 알 수 있습니다. 그 쿠키의 이름은 \_\_prerender_bypass입니다.

### 헤드리스 CMS에서 안전하게 접근하기

실제로는 헤드리스 CMS에서 이 API 경로를 안전하게 호출하려고 할 것입니다. 사용 중인 헤드리스 CMS에 따라 단계는 다를 수 있지만, 여기 몇 가지 일반적인 단계가 있습니다.

이러한 단계는 사용 중인 헤드리스 CMS가 사용자 정의 밉프트 URL을 설정하는 것을 지원하는 것으로 가정합니다. 그렇지 않은 경우에도 이 방법을 사용하여 임시 URL을 안전하게 만들 수는 있지만, 임시 URL을 만들고 액세스해야 할 것입니다.

<div class="content-ad"></div>

먼저, 선택한 토큰 생성기를 사용하여 비밀 토큰 문자열을 생성해야 합니다. 이 비밀은 Next.js 앱과 헤드리스 CMS만 알 수 있습니다. 이 비밀은 CMS에 액세스할 수 없는 사람들이 임시 URL에 액세스하는 것을 방지합니다.

둘째, 헤드리스 CMS가 사용자 정의 임시 URL 설정을 지원하는 경우, 다음을 임시 URL로 지정하세요. 이는 임시 API 경로가 pages/api/draft.ts에 위치한다고 가정합니다.

```js
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

- `your-site`는 배포 도메인을 넣어주셔야 합니다.
- `token`에는 생성한 비밀 토큰을 넣어야 합니다.
- `path`에는 보고 싶은 페이지의 경로를 넣어야 합니다. /posts/foo를 보려면 &slug=/posts/foo를 사용해야 합니다.

<div class="content-ad"></div>

헤드리스 CMS를 사용하고 있다면 드래프트 URL에 변수를 포함하여 `path`를 CMS 데이터에 기반하여 동적으로 설정할 수 있을 수도 있어요. 다음과 같이 해보세요: &slug=/posts/{entry.fields.slug}

마지막으로, 드래프트 API 라우트에서:

- 시크릿이 일치하는지, 그리고 슬러그 파라미터가 존재하는지 확인하세요 (그렇지 않으면 요청은 실패해야 합니다).
-
- res.setDraftMode을 호출하세요.
- 그런 다음 브라우저를 slug로 지정된 경로로 리디렉션하세요. (다음 예시는 307 리디렉트를 사용합니다).

```js
export default async (req, res) => {
  // 시크릿과 next 매개변수를 확인하세요
  // 이 시크릿은 이 API 라우트와 CMS에만 알려져 있어야 합니다
  if (req.query.secret !== "MY_SECRET_TOKEN" || !req.query.slug) {
    return res.status(401).json({ message: "잘못된 토큰" });
  }

  // 제공된 `slug`가 존재하는지 확인하기 위해 헤드리스 CMS를 가져옵니다
  // getPostBySlug는 필요한 가져오기 로직을 구현할 것입니다
  const post = await getPostBySlug(req.query.slug);

  // 만약 슬러그가 존재하지 않는다면, 드래프트 모드 활성화를 막습니다
  if (!post) {
    return res.status(401).json({ message: "잘못된 슬러그" });
  }

  // 쿠키를 설정하여 드래프트 모드를 활성화합니다
  res.setDraftMode({ enable: true });

  // 가져온 포스트의 경로로 리디렉션합니다
  // req.query.slug로 리디렉션하지 않는 이유는 이것이 오픈 리디렉트 취약점으로 이어질 수 있기 때문입니다
  res.redirect(post.slug);
};
```

<div class="content-ad"></div>

성공하면 브라우저가 초안 모드 쿠키로 원하는 경로로 리디렉션됩니다.

## 단계 2: getStaticProps 업데이트

다음 단계는 드래프트 모드를 지원하도록 getStaticProps를 업데이트하는 것입니다.

쿠키가 설정된 getStaticProps 페이지를 요청하면 (res.setDraftMode를 통해), getStaticProps가 빌드 시간이 아닌 요청 시간에 호출됩니다.

<div class="content-ad"></div>

또한, context.draftMode가 true인 상황에서 context 객체와 함께 호출될 것입니다.

```js
export async function getStaticProps(context) {
  if (context.draftMode) {
    // 동적 데이터
  }
}
```

draft API route에서 res.setDraftMode를 사용했기 때문에 context.draftMode가 true로 설정됩니다.

getStaticPaths를 사용 중이라면 context.params도 사용할 수 있습니다.

<div class="content-ad"></div>

### 초안 데이터 가져오기

getStaticProps를 업데이트하여 context.draftMode에 따라 다른 데이터를 가져올 수 있습니다.

예를 들어, 헤드리스 CMS에서는 초안 포스트를 위한 다른 API 엔드포인트를 가질 수 있습니다. 그렇다면 다음과 같이 API 엔드포인트 URL을 수정할 수 있습니다:

```js
export async function getStaticProps(context) {
  const url = context.draftMode ? "https://draft.example.com" : "https://production.example.com";
  const res = await fetch(url);
  // ...
}
```

<div class="content-ad"></div>

그게 다에요! 헤들리스 CMS나 수동으로 드래프트 API 경로(시크릿 및 슬러그와 함께)에 액세스하면 이제 드래프트 콘텐츠를 볼 수 있어요. 그리고 초안을 업데이트하고 발행하지 않은 경우, 드래프트를 볼 수 있어야 해요.

헤들리스 CMS에서 이를 드래프트 URL로 설정하거나 수동으로 액세스하면 드래프트를 볼 수 있어요.

```js
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

## 자세한 내용

<div class="content-ad"></div>

### 초안 모드 쿠키 지우기

기본적으로 브라우저를 닫을 때 초안 모드 세션이 종료됩니다.

수동으로 초안 모드 쿠키를 지우려면, setDraftMode({ enable: false })를 호출하는 API 루트를 생성하세요:

```js
export default function handler(req, res) {
  res.setDraftMode({ enable: false });
}
```

<div class="content-ad"></div>

그럼, /api/disable-draft로 요청을 보내어 API Route를 호출하세요. next/link를 사용하여 이 경로를 호출할 때는 prefetch={false}를 전달해야 예비 검색(prefetch)에서 실수로 쿠키를 삭제하는 것을 방지할 수 있어요.

### getServerSideProps와 함께 작동

Draft Mode은 getServerSideProps와 함께 작동하며, context 객체의 draftMode 키로 사용할 수 있어요.

> 알아두면 좋아요: Draft Mode를 사용할 때 Cache-Control 헤더를 설정하면 우회할 수 없기 때문에 ISR 사용을 권장해요.

<div class="content-ad"></div>

### API 라우트와 함께 사용하기

API 라우트는 요청 객체의 draftMode에 액세스할 수 있습니다. 예를 들어:

```js
export default function myApiRoute(req, res) {
  if (req.draftMode) {
    // 드래프트 데이터 가져오기
  }
}
```

### 다음 빌드마다 고유합니다.

<div class="content-ad"></div>

다음 빌드를 실행할 때마다 새로운 우회 쿠키 값이 생성됩니다.

이를 통해 우회 쿠키가 추측되지 않도록 보장됩니다.

> 알아두면 좋은 사항: 로컬에서 HTTP를 통해 Draft Mode를 테스트하려면 브라우저가 타사 쿠키 및 로컬 스토리지 액세스를 허용해야 합니다.

<div class="content-ad"></div>
