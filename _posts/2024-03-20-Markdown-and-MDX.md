---
title: "Nextjs 14 마크다운과 MDX 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 마크다운과 MDX 사용 방법

마크다운은 텍스트를 서식 지정하는 데 사용되는 가벼운 마크업 언어입니다. 일반 텍스트 구문을 사용하여 작성하고 구조적으로 유효한 HTML로 변환할 수 있습니다. 웹사이트와 블로그에서 콘텐츠를 작성하는 데 일반적으로 사용됩니다.
당신이 작성한 내용은...

```js
I **love** using [Next.js](https://nextjs.org/)
```

<div class="content-ad"></div>

```js
<p>
  나는 <strong>Next.js</strong>를 사용하는 것을 좋아해요 <a href="https://nextjs.org/">Next.js</a>
</p>
```

MDX는 마크다운의 상위 집합으로, 마크다운 파일에서 직접 JSX를 작성할 수 있게 합니다. 이는 동적 상호 작용성을 추가하고 React 컴포넌트를 콘텐츠 안에 임베드하는 강력한 방법입니다. Next.js는 애플리케이션 내부의 로컬 MDX 콘텐츠뿐만 아니라 서버에서 동적으로 가져오는 원격 MDX 파일도 지원할 수 있습니다. Next.js 플러그인은 마크다운과 React 컴포넌트를 HTML로 변환하며, 앱 라우터의 기본인 서버 컴포넌트에서 사용할 수 있도록 지원합니다.

<div class="content-ad"></div>

## @next/mdx

@next/mdx 패키지는 Next.js를 구성하여 markdown 및 MDX 파일을 처리할 수 있도록 합니다. 이 패키지는 로컬 파일에서 데이터를 가져와서 /pages 또는 /app 디렉토리에서 .mdx 확장자를 가진 페이지를 직접 만들 수 있습니다. MDX를 Next.js와 함께 구성하고 사용하는 방법을 살펴보겠습니다.

## 시작하기

<div class="content-ad"></div>

MDX를 렌더링하는 데 필요한 패키지를 설치하세요:

```js
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

애플리케이션의 루트에 mdx-components.tsx 파일을 생성하세요 (src/ 또는 app/의 상위 폴더):

> 참고: App Router와 함께 MDX를 사용하려면 mdx-components.tsx 파일이 필요하며, 이 파일이 없으면 작동하지 않습니다.

<div class="content-ad"></div>

```typescript
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
```

프로젝트 루트의 next.config.js 파일을 업데이트하여 MDX를 사용하도록 구성하십시오:

```js
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX 파일을 포함하도록 `pageExtensions`를 구성합니다
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // 원하는 경우, 다른 Next.js 구성을 추가할 수 있습니다
};

module.exports = withMDX(nextConfig);
```

그런 다음, /app 디렉토리에 새로운 MDX 페이지를 만드십시오:

<div class="content-ad"></div>

```js
  your-project
  ├── app
  │   └── my-mdx-page
  │       └── page.mdx
  └── package.json
```

이제는 Markdown을 사용하고 MDX 페이지 내에서 직접 React 컴포넌트를 가져올 수 있습니다:

```js
import { MyComponent } from 'my-components'

# 내 MDX 페이지에 오신 것을 환영합니다!

이것은 **굵은** 및 _이탤릭_ 텍스트입니다.

이것은 Markdown의 목록입니다:

- 하나
- 둘
- 셋

내 React 컴포넌트를 확인하세요:

<MyComponent />
```

/my-mdx-page 경로로 이동하면 렌더링된 MDX가 표시됩니다.

<div class="content-ad"></div>

## 원격 MDX

만약 여러분의 마크다운 또는 MDX 파일 또는 내용이 다른 곳에 있다면, 서버에서 동적으로 가져올 수 있습니다. 이것은 별도의 로컬 폴더, CMS, 데이터베이스 또는 다른 곳에 저장된 콘텐츠에 유용합니다. 이 용도로 인기 있는 커뮤니티 패키지는 next-mdx-remote 입니다.

> 알아 두면 좋은 점: 조심스럽게 진행하십시오. MDX는 JavaScript로 컴파일되며 서버에서 실행됩니다. 신뢰할 수 있는 출처에서만 MDX 콘텐츠를 가져와야 하며, 그렇지 않으면 원격 코드 실행(RCE)로 이어질 수 있습니다.
> 아래 예시는 next-mdx-remote를 사용한 예제입니다.

<div class="content-ad"></div>

```typescript
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage() {
  // MDX 텍스트 - 로컬 파일, 데이터베이스, CMS, fetch 등 어디에서든 올 수 있습니다...
  const res = await fetch("https://...");
  const markdown = await res.text();
  return <MDXRemote source={markdown} />;
}
```

/my-mdx-page-remote 경로로 이동하면 렌더링된 MDX가 표시됩니다.

## 레이아웃

MDX 페이지 간에 레이아웃을 공유하려면 앱 라우터의 내장 레이아웃 지원을 사용할 수 있습니다.

<div class="content-ad"></div>

```typescript
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 여기서 공유 레이아웃이나 스타일을 만들어보세요
  return <div style={ color: 'blue' }>{children}</div>
}
```

## Remark 및 Rehype 플러그인

MDX 콘텐츠를 변환하기 위해 선택적으로 remark 및 rehype 플러그인을 제공할 수 있습니다.
예를 들어, GitHub Flavored Markdown을 지원하기 위해 remark-gfm을 사용할 수 있습니다.

<div class="content-ad"></div>

remark과 rehype 에코시스템은 ESM(ES Modules)만 지원하기 때문에 구성 파일로 next.config.mjs를 사용해야 합니다.

```js
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX 파일을 포함하도록 `pageExtensions`을 구성
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // 원하는 경우, 다른 Next.js 구성 추가 가능
};

const withMDX = createMDX({
  // 원하는 대로 여기에 마크다운 플러그인 추가
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// MDX 구성을 Next.js 구성과 병합
export default withMDX(nextConfig);
```

## 프런트매터(Frontmatter)

프런트매터는 페이지에 대한 데이터를 저장하는 데 사용할 수 있는 YAML 형식의 키/값 쌍입니다. @next/mdx는 기본적으로 프런트매터를 지원하지 않지만, 프런트매터를 MDX 콘텐츠에 추가하는 여러 해결책이 있습니다.

<div class="content-ad"></div>

- remark-frontmatter
- remark-mdx-frontmatter
- gray-matter
  .
  @next/mdx를 사용해 페이지 metadata에 접근하려면 .mdx 파일 내부에서 메타데이터 객체를 내보내야 합니다:

```js
export const metadata = {
  author: 'John Doe',
}

# 내 MDX 페이지
```

## 사용자 정의 요소

<div class="content-ad"></div>

마크다운을 사용하는 즐거운 점 중 하나는 네이티브 HTML 요소에 매핑된다는 것이며, 따라서 글을 빠르고 직관적으로 작성할 수 있다는 것입니다:

```js
마크다운에서 목록 작성 예시:

- 하나
- 둘
- 셋
```

위의 코드는 다음과 같은 HTML을 생성합니다:

```js
<p>마크다운에서 목록 작성 예시:</p>

<ul>
  <li>하나</li>
  <li>둘</li>
  <li>셋</li>
</ul>
```

<div class="content-ad"></div>

사용자 정의 웹 사이트나 애플리케이션을 위해 요소를 스타일링하고 싶을 때는 쇼트코드를 전달할 수 있어요. 이것들은 HTML 요소로 매핑되는 사용자 정의 구성 요소입니다.  
이를 위해 애플리케이션 루트의 mdx-components.tsx 파일을 열고 사용자 정의 요소를 추가하세요:

```typescript
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// 이 파일을 통해 사용자 정의 React 컴포넌트를 제공할 수 있습니다.
// MDX 파일에서 사용할 수 있도록 합니다. 원하는 모든
// React 컴포넌트를 가져와 사용할 수 있습니다. 옆에 스타일,
// 다른 라이브러리의 컴포넌트 및 기타 컴포넌트도 사용 가능해요.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 내장된 컴포넌트를 사용자 정의하는 데 도움을 주는 기능, 예를 들어 스타일을 추가할 수 있습니다.
    h1: ({ children }) => <h1 style={ fontSize: '100px' }>{children}</h1>,
    img: (props) => (
      <Image
        sizes="100vw"
        style={ width: '100%', height: 'auto' }
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}
```

## 심층 분석: 마크다운을 HTML로 어떻게 변환할까요?

<div class="content-ad"></div>

리액트는 마크다운을 기본적으로 이해하지 못합니다. 먼저 마크다운 텍스트를 HTML로 변환해야 합니다. 이 작업은 remark와 rehype로 수행할 수 있습니다.
remark는 마크다운 주변의 도구들이 모인 에코시스템입니다. rehype는 HTML에 대해 동일한 역할을 수행합니다. 예를 들어, 다음 코드 조각은 마크다운을 HTML로 변환합니다:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

main();

async function main() {
  const file = await unified()
    .use(remarkParse) // 마크다운 AST로 변환
    .use(remarkRehype) // HTML AST로 변환
    .use(rehypeSanitize) // HTML 입력값 사전 처리
    .use(rehypeStringify) // AST를 직렬화된 HTML로 변환
    .process("안녕, Next.js!");

  console.log(String(file)); // <p>안녕, Next.js!</p>
}
```

remark와 rehype 에코시스템에는 문법 강조, 제목 링킹, 목차 생성 등을 위한 플러그인이 포함되어 있습니다.

<div class="content-ad"></div>

위의 예시와 같이 @next/mdx를 사용할 때는 직접적으로 remark 또는 rehype을 사용할 필요가 없습니다. 이것들이 대신 처리되기 때문에 "@next/mdx" 패키지가 무슨 일을 하는지 더 깊이 이해하고자 이를 설명하고 있습니다.

## 러스트 기반 MDX 컴파일러 사용 (실험 기능)

Next.js는 러스트로 작성된 새로운 MDX 컴파일러를 지원합니다. 이 컴파일러는 아직 실험 단계이며 프로덕션 환경에서 사용하는 것은 권장되지 않습니다. 새로운 컴파일러를 사용하려면 next.config.js를 구성해야 합니다. 그리고 이를 withMDX에 전달할 때 다음과 같이 설정하세요:

```js
module.exports = withMDX({
  experimental: {
    mdxRs: true,
  },
});
```

<div class="content-ad"></div>

## 도움이 되는 링크

- MDX
- @next/mdx
- remark
- rehype
- Markdoc

<div class="content-ad"></div>
