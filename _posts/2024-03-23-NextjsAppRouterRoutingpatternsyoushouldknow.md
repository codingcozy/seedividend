---
title: "Nextjs 앱 라우터 라우팅 패턴을 모르면 나중에 후회하는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Nextjs App Router Routing patterns you should know"
link: "https://medium.com/israeli-tech-radar/next-js-app-router-routing-patterns-you-should-know-9dfa6b669983"
---



# 라우트 정의하기

가장 간단한 패턴은 앱 폴더 내에서 라우트 이름을 가진 디렉토리를 생성하고 해당 디렉토리 안에 page.tsx 파일을 만드는 것입니다.

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               └── posts
│                   └── page.tsx
└── libste
```

다음은 게시물을 가져와 표시하는 코드입니다:

<div class="content-ad"></div>

```js
import { ContentWrapper, Title } from "@nrp/components/server";
import Link from "next/link";

export default async function Page() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());

  return (
    <ContentWrapper>
      <Title>게시물</Title>

      <ul className="flex flex-col gap-2">
        {posts.map((post: { id: string, title: string }) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="capitalize hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </ContentWrapper>
  );
}
```

# 동적 루트

게시물의 ID로 이동하려면 동적 루트를 만들어야 합니다. 이를 위해 대괄호와 매개변수 이름이 포함된 디렉토리를 만들고 해당 디렉토리 안에 page.tsx 파일을 만드세요:

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               └── posts
│                   ├── [postId]
│                   │   └── page.tsx
│                   └── page.tsx
└── libs
```

<div class="content-ad"></div>

위의 글을 한국어로 번역하면 다음과 같습니다:

```js
import { ContentWrapper, Paragraph, Title } from "@nrp/components/server";

export default async function Page({ params }: { params: { postId: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then((res) => res.json());

  return (
    <ContentWrapper>
      <Title className="capitalize">{post.title}</Title>

      <Paragraph className="capitalize">{post.body}</Paragraph>
    </ContentWrapper>
  );
}
```

# 모든 경로 및 선택적 모든 경로

특정 디렉토리의 루트 이외의 모든 경로를 캐치하려면, Catch All 패턴을 사용할 수 있습니다. 우리는 [...slug] 괄호와 3 점 주석을 추가하고, 파라미터 props에서 slug를 경로 파라미터로 사용할 것이며, 해당 디렉토리에 page.tsx 파일을 추가할 것입니다.

<div class="content-ad"></div>

```bash
nextjs-routing-patterns
├── apps
│ └── blog
│ └── src
│ └── app
│ └── catch-all
│ └── [...slug]
│ └── page.tsx
└── libs
```

여기가 코드입니다:

```jsx
import { ContentWrapper, Title } from "@nrp/components/server";

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <ContentWrapper>
      <Title>From Catch All</Title>
      <pre>{JSON.stringify(params.slug, null, 2)}</pre>
    </ContentWrapper>
  );
}
```

/catch-all 경로로 이동하면 404 페이지가 나타납니다. 하지만 /catch-all/next/page/etc로 이동하면 원하는 대로 렌더링된 페이지가 표시되며 JSON 형식의 매개변수 배열이 표시됩니다.

<div class="content-ad"></div>

두 번째 패턴을 사용하면 루트 디렉터리를 캐치할 수도 있어요. 디렉터리를 [[...slug]]와 3개의 점 주석으로 만든 다음, 그 폴더에 page.tsx를 추가할 거에요:

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               └── optional-catch-all
│                   └── [[...slug]]
│                       └── page.tsx
└── libs
```

page.tsx 코드는 다음과 같아요:

```js
import { ContentWrapper, Title } from "@nrp/components/server";

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <ContentWrapper>
      <Title>From Optional Catch All</Title>

      <pre>{JSON.stringify(params.slug, null, 2)}</pre>
    </ContentWrapper>
  );
}
```

<div class="content-ad"></div>

지금 루트 디렉토리는 404 페이지를 반환하지 않고 페이지의 제목 및 빈 매개 변수 배열을 반환합니다. 더 나아갈 때에도 이전에 설명한 것과 같은 동작이 발생할 것입니다.

# 중첩 레이아웃

새 경로에 layout.tsx 파일이 추가되면 라우팅 레이아웃을 중첩할 수 있습니다. 이렇게 하면 현재 레이아웃을 상위 레이아웃 파일 안으로 중첩시키고 현재 페이지를 새 레이아웃의 자식들 안에 표시할 수 있습니다. 이는 탭 내비게이션을 만드는데 좋은 패턴입니다.

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               └── nested
│                   ├── password
│                   │   └── page.tsx
│                   ├── layout.tsx
│                   ├── page.tsx
│                   └── tabs.tsx
└── libs
```

<div class="content-ad"></div>

여기 layout.tsx 코드입니다:

```js
import { ContentWrapper, Title } from "@nrp/components/server";
import { NavigationTabs } from "@nrp/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentWrapper>
      <Title>I am nested layout</Title>
      <NavigationTabs
        items={[
          { title: "Account", url: "/nested" },
          { title: "Password", url: "/nested/password" },
        ]}
      />

      {children}
    </ContentWrapper>
  );
}
```

지금 중첩 경로에서 우리의 페이지가 레이아웃의 children과 또한 패스워드 경로에서 렌더링 될 것입니다. 레이아웃이 다시 렌더링되지 않아 SPA를 빠르게 탐색할 수 있다는 것이 좋은 점입니다.

레이아웃 페이지를 다시 렌더링해야 하는 경우 템플릿 파일 규칙을 사용하는 것을 고려해보세요: https://nextjs.org/docs/app/api-reference/file-conventions/template

<div class="content-ad"></div>

여기 page.tsx 코드입니다:

```js
import { ContentWrapper, Paragraph, Title } from "@nrp/components/server";

export default function Page() {
  return (
    <ContentWrapper>
      <Title>Account</Title>

      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto, corporis eos eum facilis incidunt libero perspiciatis provident quae quod. Aliquid animi at culpa, hic illo reiciendis
        similique? Molestiae, repudiandae.
      </Paragraph>
    </ContentWrapper>
  );
}
```

그리고 비밀번호 페이지의 page.tsx 코드입니다:

```js
import { ContentWrapper, Paragraph, Title } from "@nrp/components/server";

export default function Page() {
  return (
    <ContentWrapper>
      <Title>Password</Title>

      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod</Paragraph>
    </ContentWrapper>
  );
}
```

<div class="content-ad"></div>

# 병렬 경로

이 패턴은 두 개 이상의 다른 페이지를 옆으로 나란히 표시하고 심지어 결합된 부모 페이지 내 각 페이지에 대한 고유한 탐색을 생성하는 데 좋습니다.

이를 위해 먼저 슬롯을 생성해야 합니다. 슬롯은 '@' 기호와 슬롯의 이름인 디렉토리입니다. 즉, @albums처럼. 여기서 우리는 다시 page.tsx 파일을 만들 것입니다. @users 페이지에 대해 동일한 것을 만들어 봅시다.

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               └── parallel
│                   ├── @albums
│                   │   └── page.tsx
│                   └── @users
│                       └── page.tsx
└── libs
```

<div class="content-ad"></div>

앨범 페이지 코드입니다:

```js
import { ContentWrapper, Title } from "@nrp/components/server";

export default async function Page() {
  const albums = await fetch(`https://jsonplaceholder.typicode.com/albums`).then((res) => res.json());

  return (
    <ContentWrapper>
      <Title size="small">앨범</Title>

      <ul>
        {albums.map((album: { id: string, title: string }) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </ContentWrapper>
  );
}
```

그리고 사용자 페이지 코드:

```js
import { ContentWrapper, Title } from "@nrp/components/server";
import { Avatar, AvatarFallback, AvatarImage } from "@nrp/components";
import Link from "next/link";

export default async function Page() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

  return (
    <ContentWrapper>
      <Title size="small">사용자</Title>

      <ul className="flex flex-col gap-4">
        {users.map((user: { id: string, name: string, username: string, email: string }) => (
          <li key={user.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage className="bg-foreground" src={`https://robohash.org/${user.username}`} alt="@shadcn" />
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </ContentWrapper>
  );
}
```

<div class="content-ad"></div>

다음으로 레이아웃에 슬롯을 추가해야 합니다. 병렬 라우트 내에 중첩된 레이아웃을 추가하거나 루트 레이아웃에도 추가할 수 있습니다. 우리는 layout.tsx 파일과 병렬 페이지를 위한 page.tsx를 만듭니다.

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               ├── parallel
│               │   ├── @albums
│               │   │   └── page.tsx
│               │   └── @users
│               │       └── page.tsx
│               ├── layout.tsx
│               └── page.tsx
└── libs
```

다음은 레이아웃에 대한 코드입니다:

```js
import { Title } from "@nrp/components/server";

export default function Layout({ children, users, albums }: { children: React.ReactNode, users: React.ReactNode, albums: React.ReactNode }) {
  return (
    <div>
      <Title>Parallel Layout</Title>

      {children}

      <div className="flex gap-4 p-4 justify-around">
        {users}
        {albums}
      </div>
    </div>
  );
}
```

<div class="content-ad"></div>

그리고 우리의 병렬 라우트 페이지:

```js
import { Title } from "@nrp/components/server";

export default function Page() {
  return <Title size="medium">병렬 라우트</Title>;
}
```

# 라우트 가로채기

가끔 페이지에서 소프트한 라우트를 원할 때가 있습니다. 예를 들어 Modal에서 페이지를 간단히 열어보고 원래의 라우트를 그대로 유지하려고 할 때나 직접 액세스하거나 링크를 공유할 때입니다. 그래서 이 패턴은 그런 용도로 아주 좋습니다.

<div class="content-ad"></div>

사진 갤러리와 ID에 따른 사진 라우트가 있는 경우, 클라이언트에서 모달 대화상자에서 사진을 열지만 사진 페이지를 전체 새로 고침하고 직접 링크 공유를 통해 열 수 있도록 합니다.

우리의 사진 갤러리의 디렉터리 구조는 다음과 같을 것입니다:

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               ├── intercepted
│               │   └── [photoId]
│               │       └── page.tsx
│               └── page.tsx
└── libs
```

이제 /intercepted/[photoId] 라우트를 가로채도록 원합니다. 이를 위해 레이아웃에 슬롯 디렉토리를 만들어 추가해야 합니다. 슬롯 디렉토리에서 현재 범위를 나타내는 접두사가 있는 디렉토리를 만들어야 합니다. 여기서 (.)는 현재 범위를, (..)는 상위 범위를, (../..)는 상위의 상위 범위를, (...)는 루트 범위를 나타냅니다.```

<div class="content-ad"></div>

만약 중첩된 라우트라면 이 디렉토리 내에서 라우팅 디렉토리 구조를 추가할 거에요. (.) prefix 대신에, 첫 번째 폴더만 가지고 있을 거에요. 우리 @modal 슬롯을 보관할 layout.tsx 파일도 추가해 봅시다.

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               ├── intercepted
│               │   ├── @modal
│               │   │   └── (..)intercepted
│               │   │       └── [photoId]
│               │   │           └── page.tsx
│               │   └── [photoId]
│               │       └── page.tsx
│               ├── layout.tsx
│               └── page.tsx
└── libs
```

다음은 layout.tsx 파일의 코드에요:

```js
import { ReactNode } from "react";

export default function Layout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
  return (
    <>
      {children} {modal}
    </>
  );
}
```

<div class="content-ad"></div>

js
/[photoId]/page.tsx 페이지 코드:

```js
import { ContentWrapper, Title } from "@nrp/components/server";
import { Photo } from "../../components/photo";

export default async function Page({ params }: { params: { imageId: string } }) {
  return (
    <ContentWrapper>
      <Title>가로채인 라우트</Title>

      <div className="w-[600px] self-center">
        <Photo imageId={params.imageId} />
      </div>
    </ContentWrapper>
  );
}
```

가로채인 /@modal/(..)intercepted/[photoId]/page.tsx 페이지 코드:

```js
import { Photo } from "../../../../components/photo";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "../../../../components/modal";

export default async function Page({ params }: { params: { imageId: string } }) {
  return (
    <Modal title="가로채인 라우트">
      <div className="min-h-[100px] flex items-center justify-center">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Photo imageId={params.imageId} />
        </Suspense>
      </div>
    </Modal>
  );
}
```

<div class="content-ad"></div>

예상대로 작동하도록 하려면 default.tsx 파일을 디렉터리 구조에 추가해야 합니다. 이 파일은 만일 레이아웃의 슬롯에 렌더링할 내용이 없을 경우 next.js에 렌더링할 내용을 알려줍니다:

```js
nextjs-routing-patterns
├── apps
│   └── blog
│       └── src
│           └── app
│               ├── intercepted
│               │   ├── @modal
│               │   │   └── (..)intercepted
│               │   │       ├── [photoId]
│               │   │       │   └── page.tsx
│               │   │       └── default.tsx
│               │   └── [photoId]
│               │       ├── default.tsx
│               │       └── page.tsx
│               ├── default.tsx
│               ├── layout.tsx
│               └── page.tsx
└── libs
```

# 동적 렌더링

또 다른 사용하는 패턴으로 옵셔널 캐치 올 라우트를 사용하는 것이 있습니다. 그리고 페이지를 조건부로 렌더링합니다. params가 제공되었는지 여부에 따라 페이지를 조건부로 렌더링할 수 있습니다. 이를 통해 페이지에서 여러 시나리오를 처리하고 직접 링크로 접근해도 항상 특정 페이지를 제어할 수 있는 방법을 제공합니다. 예를 들어 모달에서 이미지를 표시할 때 사용할 수 있습니다.

<div class="content-ad"></div>

다음은 디렉토리 구조입니다:

```bash
nextjs-routing-patterns
├── apps
│ └── blog
│ └── src
│ └── app
│ └── dynamic-render
│ └── [[...slug]]
│ └── page.tsx
└── libs
```

그리고 page.tsx 코드는 다음과 같습니다:

```js
import { Photo } from "../../components/photo";
import { Suspense } from "react";
import { Modal } from "../../components/modal";
import { Loader2 } from "lucide-react";
import { Photos } from "../../components/photos";
import { ContentWrapper } from "@nrp/components/server";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const [photoId] = params.slug ?? [];

  if (!photoId)
    return (
      <Suspense fallback={"Loading..."}>
        <Photos title="Dynamic Render" page="dynamic-render" />
      </Suspense>
    );

  return (
    <ContentWrapper>
      <Photos title="Dynamic Render" page="dynamic-render" />

      {photoId && (
        <Modal>
          <div className="min-h-[100px] flex items-center justify-center">
            <Suspense fallback={<Loader2 className="animate-spin" />}>
              <Photo imageId={photoId} />
            </Suspense>
          </div>
        </Modal>
      )}
    </ContentWrapper>
  );
}
```

<div class="content-ad"></div>

# 결론

우리는 Next.js 앱의 디렉토리 라우팅 패턴을 사용하여 내비게이션 시스템에 다양한 접근 방법을 구현할 수 있다는 것을 알게 되었습니다.

이 글이 도움이 되었다면 좋겠네요. 아래 댓글에 여러분의 생각, 제안, 사랑 😍을 남겨주세요.
