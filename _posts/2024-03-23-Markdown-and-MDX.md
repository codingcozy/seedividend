---
title: "Nextjs 13 에서 Markdown과 MDX 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Markdown 및 MDX"
link: "undefined"
isUpdated: true
---

# 마크다운과 MDX

마크다운은 텍스트를 서식 지정하는 데 사용되는 가벼운 마크업 언어입니다. 일반 텍스트 구문을 사용하여 작성하고 구조적으로 유효한 HTML로 변환할 수 있습니다. 주로 웹사이트와 블로그에 콘텐츠를 작성하는 데 사용됩니다.

당신이 작성하는 내용은...

```js
I **love** using [Next.js](https://nextjs.org/)
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

```js
<p>
  저는 <strong>Next.js</strong>를 사용하는 것을 좋아합니다. <a href="https://nextjs.org/">Next.js</a>
</p>
```

MDX는 JSX를 직접적으로 마크다운 파일에 작성할 수 있는 마크다운의 확장 기능입니다. 동적 상호작용을 추가하고 콘텐츠 내에 React 컴포넌트를 삽입하는 강력한 방법입니다.

Next.js는 응용 프로그램 내부의 로컬 MDX 콘텐츠뿐만 아니라 서버에서 동적으로 가져오는 원격 MDX 파일도 지원할 수 있습니다. Next.js 플러그인은 마크다운과 React 컴포넌트를 HTML로 변환하는 작업을 처리하며, App Router의 기본값인 서버 컴포넌트에서 사용되는 방법을 지원합니다.

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

## @next/mdx

@next/mdx 패키지는 Next.js를 구성하여 마크다운 및 MDX를 처리할 수 있도록 합니다. 로컬 파일에서 데이터를 소스로 가져와서 /pages 또는 /app 디렉토리에서 .mdx 확장자로 직접 페이지를 생성할 수 있습니다.

Next.js에서 MDX를 구성하고 사용하는 방법을 살펴봅시다.

## 시작하기

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

MDX를 렌더링하는 데 필요한 패키지를 설치하세요:

```js
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

프로젝트 루트에 있는 next.config.js 파일을 업데이트하여 MDX를 사용하도록 구성하세요:

```js
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `pageExtensions`를 구성하여 MDX 파일을 포함시킵니다
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // 원하는 경우, 다른 Next.js 구성을 추가하세요
};

module.exports = withMDX(nextConfig);
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

그럼, /pages 디렉토리 내에 새로운 MDX 페이지를 만들어보세요:

```js
  your-project
  ├── pages
  │   └── my-mdx-page.mdx
  └── package.json
```

이제 MDX 페이지 내에서 마크다운을 사용하고 React 컴포넌트를 직접 가져올 수 있습니다:

```js
import { MyComponent } from 'my-components'

# 내 MDX 페이지에 오신 것을 환영합니다!

이것은 **굵은** 텍스트와 _이탤릭_ 텍스트입니다.

이것은 마크다운의 목록입니다:

- 하나
- 둘
- 셋

내 React 컴포넌트를 확인해보세요:

<MyComponent />
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

/my-mdx-page 경로로 이동하면 렌더링된 MDX가 표시됩니다.

## 원격 MDX

만약 여러분의 마크다운 또는 MDX 파일 또는 콘텐츠가 다른 곳에 저장되어 있다면, 서버에서 동적으로 가져올 수 있습니다. 이는 별도의 로컬 폴더, CMS, 데이터베이스 또는 다른 곳에 저장된 콘텐츠에 유용합니다. 이 용도로 널리 사용되는 커뮤니티 패키지 중 하나는 next-mdx-remote입니다.

> 알아 두면 좋아요: 주의해서 진행해주세요. MDX는 JavaScript로 변환되어 서버에서 실행됩니다. 신뢰할 수 있는 소스에서만 MDX 콘텐츠를 가져와야 하며, 그렇지 않으면 원격 코드 실행(RCE)로 이어질 수 있습니다.

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

다음 예제는 next-mdx-remote을 사용합니다:

```typescript
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function RemoteMdxPage({ mdxSource }: Props) {
  return <MDXRemote {...mdxSource} />;
}

export async function getStaticProps() {
  // MDX 텍스트 - 로컬 파일, 데이터베이스, CMS, fetch 등 어디서든 가져올 수 있습니다...
  const res = await fetch("https:...");
  const mdxText = await res.text();
  const mdxSource = await serialize(mdxText);
  return { props: { mdxSource } };
}
```

/my-mdx-page-remote 경로로 이동하면 렌더링된 MDX가 표시됩니다.

## 레이아웃

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

MDX 페이지 주변에 레이아웃을 공유하려면 레이아웃 구성 요소를 만드세요:

```typescript
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 여기서 공유 레이아웃이나 스타일을 생성하세요
  return <div style={ color: 'blue' }>{children}</div>;
}
```

그런 다음, 레이아웃 구성 요소를 MDX 페이지로 가져와서 MDX 콘텐츠를 레이아웃으로 감싸고 내보냈습니다:

```js
import MdxLayout from '../components/mdx-layout'

# 내 MDX 페이지에 오신 것을 환영합니다!

export default function MDXPage({ children }) {
  return <MdxLayout>{children}</MdxLayout>;
}
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

## Remark과 Rehype 플러그인

MDX 콘텐츠를 변환하기 위해 remark와 rehype 플러그인을 선택적으로 제공할 수 있습니다.

예를 들어, remark-gfm을 사용하여 GitHub Flavored Markdown을 지원할 수 있습니다.

remark와 rehype 생태계는 ESM(ES Modules)만 지원하므로 설정 파일로 next.config.mjs를 사용해야 합니다.

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
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
```

## Frontmatter

Frontmatter는 페이지에 대한 데이터를 저장하는 데 사용할 수 있는 YAML과 유사한 키/값 쌍입니다. @next/mdx는 기본적으로 frontmatter를 지원하지 않지만 frontmatter를 MDX 콘텐츠에 추가하는 많은 솔루션이 있습니다. 예를 들어:

- remark-frontmatter
- remark-mdx-frontmatter
- gray-matter

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

@next/mdx를 사용하여 페이지 메타데이터에 액세스하려면 .mdx 파일 내에서 메타데이터 객체를 내보낼 수 있습니다:

```js
export const metadata = {
  author: 'John Doe',
}

# 내 MDX 페이지
```

## 사용자 지정 요소

마크다운을 사용하는 즐거운 측면 중 하나는 네이티브 HTML 요소로 매핑된다는 것입니다. 이는 빠른 작성과 직관적인 작성을 가능하게 합니다.

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
마크다운 목록 예시입니다:

- 하나
- 둘
- 셋
```

위 내용은 다음과 같은 HTML을 생성합니다:

```js
<p>마크다운 목록 예시입니다:</p>

<ul>
  <li>하나</li>
  <li>둘</li>
  <li>셋</li>
</ul>
```

사용자 정의 웹사이트나 애플리케이션을 위해 원하는 요소를 스타일링하려면 쇼트코드를 사용할 수 있습니다. 쇼트코드는 HTML 요소로 매핑되는 사용자 정의 구성 요소입니다.

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

이를 위해 애플리케이션의 루트(페이지/ 또는 src/ 폴더의 상위 폴더)에 mdx-components.tsx 파일을 만들고 사용자 지정 요소를 추가하십시오:

```typescript
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// 이 파일은 MDX 파일에서 사용할 수 있는 사용자 지정 React 구성 요소를 제공합니다. 원하는 모든 React 구성 요소를 가져오고 사용할 수 있으며, 인라인 스타일, 다른 라이브러리의 구성 요소 등도 사용할 수 있습니다.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 내장된 구성 요소를 사용자 정의하는 것을 허용합니다. 예: 스타일을 추가할 수 있습니다.
    h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    img: (props) => <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...(props as ImageProps)} />,
    ...components,
  };
}
```

## 심화: 마크다운을 HTML로 어떻게 변환하나요?

React는 마크다운을 원천적으로 이해하지 않습니다. 먼저 마크다운 일반 텍스트를 HTML로 변환해야 합니다. 이 작업은 remark와 rehype를 사용하여 수행할 수 있습니다.

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

remark은 마크다운 주변의 도구 생태계입니다. rehype는 HTML을 위한 동일한 것입니다. 예를 들어, 아래 코드 스니펫은 마크다운을 HTML로 변환합니다:

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
    .use(rehypeSanitize) // HTML 입력을 살균
    .use(rehypeStringify) // AST를 직렬화된 HTML로 변환
    .process("Hello, Next.js!");

  console.log(String(file)); // <p>Hello, Next.js!</p>
}
```

remark와 rehype 생태계에는 구문 강조 플러그인, 제목 링킹, 목차 생성 및 기타 기능이 포함되어 있습니다.

위에서 표시된대로 @next/mdx를 사용할 때는 직접 remark나 rehype를 사용할 필요가 없습니다. 그것들이 대신 처리되기 때문입니다. 여기서는 @next/mdx 패키지가 무슨 일을 하는지 더 깊게 이해하기 위해 설명하고 있습니다.

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

## Rust 기반 MDX 컴파일러 사용 (실험 중)

Next.js는 Rust로 작성된 새로운 MDX 컴파일러를 지원합니다. 이 컴파일러는 여전히 실험적이며 프로덕션 환경에서는 권장되지 않습니다. 새 컴파일러를 사용하려면 next.config.js를 설정해야 합니다. 이 설정은 withMDX 함수에 전달될 때 필요합니다:

```js
module.exports = withMDX({
  experimental: {
    mdxRs: true,
  },
});
```

## 도움이 되는 링크

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

- MDX
- @next/mdx
- remark
- rehype
- Markdoc

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
