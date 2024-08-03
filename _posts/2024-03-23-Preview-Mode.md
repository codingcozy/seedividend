---
title: "Nextjs 13 프로젝트 preview 모드 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "미리보기 모드"
link: "undefined"
---



# 미리보기 모드

> 참고: 이 기능은 초안 모드에 의해 대체되었습니다.

페이지 문서 및 데이터 가져오기 문서에서 페이지를 빌드 시간에 미리 렌더링하는 방법에 대해 이야기했습니다(getStaticProps와 getStaticPaths를 사용하여 정적 생성).

정적 생성은 페이지가 헤드리스 CMS에서 데이터를 가져올 때 유용합니다. 그러나 헤드리스 CMS에서 초안을 작성하고 해당 초안을 즉시 페이지에서 미리보기하려는 경우 이상적이지 않습니다. Next.js에게 이러한 페이지를 빌드 시간이 아닌 요청 시간에 렌더링하고 게시된 콘텐츠가 아닌 초안 콘텐츠를 가져오도록 할 것입니다. Next.js에게 이 특정 사례에 대해서만 정적 생성을 우회하도록 하려면 이렇게 할 수 있습니다.

<div class="content-ad"></div>

Next.js에는 이 문제를 해결하는 데 도움이 되는 미리 보기 모드라는 기능이 있어요. 사용 방법에 대한 안내가 여기 있어요.

## 단계 1: 미리 보기 API 경로 생성 및 접근하기

> Next.js API Routes에 익숙하지 않다면 먼저 API Routes 문서를 살펴보세요.

먼저 미리 보기 API 경로를 만든 후 접근해 보세요. 아무 이름으로 생성할 수 있어요 - 예를 들어, pages/api/preview.js(또는 TypeScript를 사용한다면 .ts) 같은 이름으로 만들 수 있어요.

<div class="content-ad"></div>

이 API 경로에서는 응답 객체에서 setPreviewData를 호출해야 합니다. setPreviewData의 인수는 객체여야하며, getStaticProps에서 사용할 수 있습니다 (이에 대해 나중에 더 설명하겠습니다). 지금은 {}를 사용할 것입니다.

```js
export default function handler(req, res) {
  // ...
  res.setPreviewData({});
  // ...
}
```

res.setPreviewData는 브라우저에 일부 쿠키를 설정하여 미리보기 모드를 활성화합니다. 이러한 쿠키를 포함하는 Next.js로의 모든 요청은 미리보기 모드로 간주되며, 정적으로 생성된 페이지의 동작이 변경됩니다 (이에 대해 나중에 더 자세히 설명하겠습니다).

아래와 같이 수동으로 API 경로를 생성하고 브라우저에서 수동으로 액세스하여 테스트할 수 있습니다:

<div class="content-ad"></div>

```js
// 브라우저에서 수동으로 테스트해 보기 위한 간단한 예제.
export default function handler(req, res) {
  res.setPreviewData({});
  res.end("미리보기 모드가 활성화되었습니다.");
}
```

만약 브라우저의 개발자 도구를 열고 /api/preview를 방문하면, 이 요청에 **prerender_bypass와 **next_preview_data 쿠키가 설정되는 것을 알 수 있습니다.

### Headless CMS에서 안전하게 액세스하는 방법

실제로는 헤들리스 CMS에서 이 API 경로에 안전하게 액세스하고 싶을 것입니다. 사용 중인 헤들리스 CMS에 따라 구체적인 단계가 다를 수 있지만, 일반적으로 취할 수 있는 몇 가지 일반적인 단계는 다음과 같습니다.

<div class="content-ad"></div>

이러한 단계는 사용 중인 헤드리스 CMS가 사용자 정의 미리 보기 URL 설정을 지원하는 것으로 가정합니다. 그렇지 않은 경우에도이 방법을 사용하여 미리 보기 URL을 안전하게 보호할 수 있지만, 미리 보기 URL을 생성 및 액세스하려면 수동으로 수행해야 합니다.

먼저, 선택한 토큰 생성기를 사용하여 시크릿 토큰 문자열을 생성해야 합니다. 이 시크릿은 당신의 Next.js 앱과 헤드리스 CMS만 알고 있을 것입니다. 이 시크릿은 CMS에 액세스 할 수 없는 사람들이 미리 보기 URL에 액세스하는 것을 방지합니다.

둘째, 헤드리스 CMS가 사용자 정의 미리 보기 URL 설정을 지원하는 경우, 다음을 미리 보기 URL로 지정하십시오. 이는 미리 보기 API 경로가 pages/api/preview.js에 위치한다고 가정합니다.

```js
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

<div class="content-ad"></div>

- `your-site`은 배포 도메인을 나타냅니다.
- `token`은 생성한 시크릿 토큰으로 대체되어야 합니다.
- `path`는 미리보기를 원하는 페이지의 경로여야 합니다. 만약 /posts/foo를 미리보기하려면 &slug=/posts/foo를 사용해야 합니다.

당신의 헤들리스 CMS는 미리보기 URL에 변수를 포함할 수 있도록 허용할 수 있습니다. 이렇게 하면 `path`를 CMS 데이터에 기반으로 동적으로 설정할 수 있습니다. &slug=/posts/{entry.fields.slug}와 같이 사용할 수 있습니다.

마지막으로, 미리보기 API 라우트에서:

- 시크릿이 일치하고 슬러그 매개변수가 존재하는지 확인해야 합니다 (그렇지 않으면 요청은 실패해야 합니다).
-
- res.setPreviewData를 호출합니다.
- 그런 다음 브라우저를 슬러그로 지정된 경로로 리디렉션합니다. (다음 예제는 307 리디렉트를 사용합니다).

<div class="content-ad"></div>

```js
export default async (req, res) => {
  // 비밀 및 다음 매개변수 확인
  // 이 비밀은이 API 경로와 CMS에서만 알 수 있어야합니다
  if (req.query.secret !== "MY_SECRET_TOKEN" || !req.query.slug) {
    return res.status(401).json({ message: "잘못된 토큰입니다" });
  }

  // 제공된 'slug'가 존재하는지 확인하기 위해 headless CMS에서 가져옵니다
  // getPostBySlug는 headless CMS로 필요한 가져오기 로직을 구현할 것입니다
  const post = await getPostBySlug(req.query.slug);

  // slug가 존재하지 않으면 미리보기 모드를 활성화하지 않습니다
  if (!post) {
    return res.status(401).json({ message: "잘못된 slug입니다" });
  }

  // 미리보기 모드를 활성화하려면 쿠키를 설정합니다
  res.setPreviewData({});

  // 가져온 게시물의 경로로 리디렉트합니다
  // req.query.slug로 리디렉트하지 않는 이유는 개방형 리디렉트 취약점으로 이어질 수 있기 때문입니다
  res.redirect(post.slug);
};
```

성공하면 브라우저가 미리보기하려는 경로로 리디렉션되며 미리보기 모드 쿠키가 설정됩니다.

## 단계 2: getStaticProps 업데이트하기

다음 단계는 미리보기 모드를 지원하도록 getStaticProps를 업데이트하는 것입니다.

<div class="content-ad"></div>

만약 getStaticProps를 사용하여 미리보기 모드 쿠키가 설정된 페이지를 요청하면(getStaticProps에서 res.setPreviewData를 통해 설정된 경우), getStaticProps가 요청 시간에 호출됩니다(빌드 시간이 아닌).

또한, context 객체와 함께 호출될 것입니다:

- context.preview은 true일 것입니다.
- context.previewData는 setPreviewData에 사용된 인수와 동일할 것입니다.

```js
export async function getStaticProps(context) {
  // 미리보기 모드 쿠키가 설정된 페이지를 요청하는 경우:
  //
  // - context.preview은 true일 것입니다.
  // - context.previewData는 `setPreviewData`에 사용된 인수와 동일할 것입니다.
}
```

<div class="content-ad"></div>

프리뷰 API 루트에서 res.setPreviewData({})를 사용하여 context.previewData가 {}로 설정됩니다. 이를 사용하여 필요한 경우에 프리뷰 API 루트에서 세션 정보를 getStaticProps로 전달할 수 있습니다.

getStaticPaths를 사용하는 경우 context.params도 사용할 수 있습니다.

### 프리뷰 데이터 가져오기

getStaticProps를 업데이트하여 context.preview 및/또는 context.previewData에 따라 다른 데이터를 가져올 수 있습니다.

<div class="content-ad"></div>

예를 들어, 당신의 헤드리스 CMS는 초안 게시물을 위한 다른 API 엔드포인트를 가질 수 있습니다. 그렇다면 아래와 같이 context.preview를 사용하여 API 엔드포인트 URL을 수정할 수 있습니다:

```js
export async function getStaticProps(context) {
  // 만약 context.preview가 true이면, API 엔드포인트에 "/preview"를 추가하여
  // 발행된 데이터 대신 초안 데이터를 요청합니다. 어떤 헤드리스 CMS를 사용하느냐에 따라
  // 달라질 수 있습니다.
  const res = await fetch(`https://.../${context.preview ? "preview" : ""}`);
  // ...
}
```

이게 전부입니다! 헤드리스 CMS에서 미리보기 API 경로(시크릿 및 슬러그 포함)에 액세스하거나 수동으로 액세스하면 이제 미리보기 콘텐츠를 볼 수 있어야 합니다. 그리고 게시하지 않고 초안을 업데이트하면 해당 초안을 미리볼 수 있어야 합니다.

이를 헤드리스 CMS에서 미리보기 URL로 설정하거나 수동으로 액세스하면 미리보기를 볼 수 있습니다.

<div class="content-ad"></div>

```js
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

## 자세한 내용

> 알아두면 좋아요: 렌더링 중에 next/router는 isPreview 플래그를 노출합니다. 라우터 객체 문서에서 자세한 정보를 확인하세요.

### 미리보기 모드 지속 시간 지정하기

<div class="content-ad"></div>

setPreviewData는 옵션으로 들어가는 두 번째 매개변수로 옵션 객체여야 합니다. 다음과 같은 키를 허용합니다:

- maxAge: 미리보기 세션을 유지하는 시간(초)을 지정합니다.
- path: 적용될 쿠키의 경로를 지정합니다. 기본값은 /이며 모든 경로에 대해 미리보기 모드를 활성화합니다.

```js
setPreviewData(data, {
  maxAge: 60 * 60, // 미리보기 모드 쿠키는 1시간 후에 만료됩니다
  path: "/about", // 미리보기 모드 쿠키는 /about과 같은 경로에 적용됩니다
});
```

### 미리보기 모드 쿠키 지우기

<div class="content-ad"></div>

기본적으로 미리보기 모드 쿠키에는 만료일이 설정되어 있지 않아 브라우저를 닫을 때 미리보기 세션이 종료됩니다.

미리보기 모드 쿠키를 수동으로 지우려면 clearPreviewData()를 호출하는 API 루트를 만드세요:

```js
export default function handler(req, res) {
  res.clearPreviewData({});
}
```

그런 다음 /api/clear-preview-mode-cookies로 요청을 보내 API 루트를 호출하세요. next/link를 사용하여 이 경로를 호출하는 경우 link prefetching 중 clearPreviewData가 호출되지 않도록 prefetch={false}를 전달해야 합니다.

<div class="content-ad"></div>

setPreviewData 호출 시 경로가 지정된 경우, clearPreviewData에도 동일한 경로를 전달해야 합니다:

```js
export default function handler(req, res) {
  const { path } = req.query;

  res.clearPreviewData({ path });
}
```

### 미리보기 데이터 크기 제한

setPreviewData에 객체를 전달하고 getStaticProps에서 사용할 수 있습니다. 그러나 데이터는 쿠키에 저장되기 때문에 크기 제한이 있습니다. 현재 미리보기 데이터는 2KB로 제한되어 있습니다.

<div class="content-ad"></div>

### getServerSideProps와 함께 작동합니다

미리보기 모드는 getServerSideProps에서도 작동합니다. 또한 미리보기와 미리보기 데이터를 포함하는 context 객체에서도 사용할 수 있습니다.

> 알고 계셔야 할 점: 미리보기 모드를 사용할 때는 Cache-Control 헤더를 설정하지 않아야 합니다. 왜냐하면 우회할 수 없기 때문입니다. 대신 ISR을 사용하는 것을 권장합니다.

### API Routes와 함께 작동합니다

<div class="content-ad"></div>

API 라우트는 요청 객체 내에서 미리보기와 미리보기 데이터에 액세스할 수 있습니다. 예:

```js
export default function myApiRoute(req, res) {
  const isPreview = req.preview;
  const previewData = req.previewData;
  // ...
}
```

### 각 Next 빌드마다 고유함

다음 빌드가 완료되면 바이패스 쿠키 값과 미리보기 데이터를 암호화하는 개인 키가 변경됩니다. 이를 통해 바이패스 쿠키를 추측할 수 없게 됩니다.

<div class="content-ad"></div>

> 알아두면 좋은 정보: 브라우저에서 로컬 HTTP를 통해 미리보기 모드를 테스트하려면 제3자 쿠키 및 로컬 저장소 접근을 허용해야 합니다.

<div class="content-ad"></div>
