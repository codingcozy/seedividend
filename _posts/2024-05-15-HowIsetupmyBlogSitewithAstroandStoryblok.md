---
title: "Astro와 Storyblok을 활용해 나만의 블로그 사이트를 만들어 본 경험 공유"
description: ""
coverImage: "/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_0.png"
date: 2024-05-15 15:19
ogImage: 
  url: /assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_0.png
tag: Tech
originalTitle: "How I set up my BlogSite with Astro and Storyblok"
link: "https://medium.com/@nikhilc2209/how-i-set-up-my-blogsite-with-astro-and-storyblok-4faa6b016313"
isUpdated: true
---




<img src="/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_0.png" />

이제부터 블로그를 쓴 지 꽤 시간이 지났죠. 대부분의 시간은 다음에 무엇에 집중해야 할지 고민하면서 게을리했습니다. 마침내 나만의 포트폴리오 웹사이트를 만들기로 결정했습니다. 단 하나의 문제는... 지금이 2024년이고 이를 달성할 수 있는 다양한 기술 스택이 있다는 것입니다. 처음에는 새로운 스위스 아미 나이프인 Next JS를 사용하여 빠르게 템플릿을 활용해 포트폴리오를 구축할 생각이었습니다. 그러나 Astro JS에 대해 읽게 되었고 완전히 사로잡혔습니다.

하지만 Next JS도 여전히 정말 대단한 프레임워크라고 생각합니다. 때로는 스위스 나이프를 사용하는 대신 빛을 내는 레이저 칼 (Astro JS)을 사용하는 것이 낫다고 생각합니다. 이 경우에는 Astro를 사용하는 것이 더 나은 이유는 Astro가 정적 사이트를 빠르게 프로토타이핑하는 데 특히 적합하기 때문입니다.

<img src="/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_1.png" />



# Astro JS를 사용해야 하는 이유

개발에 들어가기 전에 Astro가 무엇이고, 언제 Astro를 선택해야 하는지를 이해해 보겠습니다.

공식 문서에서:

# 성능과 복잡성 사이의 교환



일반적으로 대부분의 현대 웹 프레임워크는 관리자 대시보드, 역할 관리, 인사 포탈 등과 같이 복잡한 기능을 갖춘 애플리케이션을 구축하는 데 우수합니다. 그러나 이러한 복잡성은 성능에 큰 비용이 들며 콘텐츠를 제공하기 위해 많은 최적화가 필요합니다.

그러나 모든 사이트가 요구 사항을 충족하기 위해 복잡할 필요는 없습니다. 블로그, 포트폴리오, 매력적인 랜딩 페이지와 같이 정적 콘텐츠를 제공하는 사이트는 사용자와 상호 작용할 필요 없이 콘텐츠를 쇼케이스하는데 이상적입니다. 여기서 Astro가 빛을 발합니다.

Astro는 기본적으로 빠른 웹사이트를 제공합니다. Astro 문서에 언급된대로:

이것은 Astro가 기본적으로 브라우저로 아무런 JavaScript 없이 웹사이트를 제공하기 때문에 순전히 서버 측에서 사전 렌더링되어 성능을 향상시키기 위해 순수한 HTML을 제공하려고 한다는 의미입니다. 문서에 명시된대로:



## 그러나 만약 모든 것이 HTML이라면 JavaScript에 의존하는 대화형 구성 요소는 어떨까요?

여기에서 Astro의 마법이 진정으로 발휘됩니다. Astro 컴포넌트는 기본적으로 서버에서 렌더링되지만, 클라이언트 측에서 렌더링할 컴포넌트를 선택하여 활성화할 수 있습니다. 이를 통해 웹 사이트에서 성능과 상호 작용을 유지하면서 최소한의 JavaScript를 브라우저로 전송할 수 있습니다. 정적 및 동적 렌더링을 필요에 따라 활성화하는 능력은 Astro의 가장 큰 장점이며, 이 아키텍처는 Islands로 알려져 있습니다.

# Astro Islands

![Astro Islands](/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_2.png)



간단히 말해서, 웹 사이트를 여러분의 상호 작용하는 다양한 구성 요소가 가벼운, 미리 렌더링된 정적 HTML의 바다 속을 떠다니는 여러 섬으로 구성된 군도인 '아키텍처라 생각해 보세요. 이 디자인 패턴을 통해 개발자는 Astro와 함께 다양한 UI 프레임워크를 사용할 수 있습니다. 이것이 다음으로 이어지는 내 포인트인데...

# Astro는 다른 프론트엔드 프레임워크와 경쟁하지 않고 함께 작동합니다

섬 아키텍처를 통해 Astro는 React, Preact, Svelte, Vue 및 SolidJS와 같은 다양한 UI 프레임워크를 지원할 수 있습니다. 개발자들은 주로 특정 프레임워크에 충실하지만 이 유연성은 프로젝트 내에서 동시에 모든 이들을 사용할 수 있도록 허용합니다!

![이미지](/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_3.png)



```js
---
// 예시: 동일한 페이지에서 여러 프레임워크 구성 요소 혼합.
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

# 웹사이트 설정하기

## 포트폴리오/랜딩 페이지

이제 우리가 Astro가 무엇인지 알았으니:



<img src="https://miro.medium.com/v2/resize:fit:900/1*qtLLXKOJJjKKNbLcTEzWpg.gif" />

일단 Astro Themes로 이동하여 프로젝트를 시작할 템플릿을 선택해보세요. 처음부터 만들 필요 없이 프로젝트용 새로운 레포지토리를 만들고 로컬 머신에 클론한 다음 npm install을 실행하여 package.json에서 필요한 모든 종속성을 설치합니다. npm run dev를 실행하여 시작하면 됩니다!

포트폴리오/랜딩 페이지의 콘텐츠를 간단히 수정하여 개인 정보를 빠르게 표시하거나 모든 구성 요소 중 일부 또는 모두를 버리고 나만의 사용자 정의 구성 요소를 추가하여 웹 사이트를 스타일링할 수도 있습니다.

# 블로그 페이지 설정



이제 이게 좀 더 흥미로운 부분이고 조금 까다로울 수도 있어요, 거짓말 안 할게요, 그래서 제가 이 과정을 가장 간단하게 설명하려고 노력할게요. 하지만 블로그 페이지를 디자인하기 전에 CMS를 선택하고 설정해야 합니다. CMS가 뭔지 궁금하다고요? 걱정하지 마세요. 제가 설명해줄게요 🙃

# CMS (콘텐츠 관리 시스템)

첫 번째로 CMS가 왜 필요한지를 간단한 예시로 설명해보죠. 일단 당신이 근무하는 회사를 상상해보세요 (지속적인 불황으로 인해 상상만 할 수 있는 상황이지만 😅). 회사가 블로그 페이지를 시작하려고 하는데, 여러분의 상사가 여러분을 포함한 3~4명의 팀을 구성했습니다. 아쉽게도 나머지 팀원들은 코딩을 몰라 웹사이트를 위한 HTML과 함께 블로그를 작성하는 방법에 대해 전혀 모릅니다. 하지만 그들은 창의적인 작가들과 UI 디자이너로 있습니다. 그런데 여기서 문제가 발생합니다. 작가들은 코딩을 하지 몰라 웹페이지에 콘텐츠를 작성할 수 없고, 심지어 알고 있더라도 순수한 HTML로 콘텐츠를 작성하는 것은 어려운 일이죠.

<img src="/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_4.png" />



CMS로 만들어진 웹사이트에서는 여러 관리자가 콘텐츠를 생성, 편집 및 발행하는 데 사용되는 응용 프로그램인 콘텐츠 관리 시스템(CMS)이 필요해요. 이는 주로 두 가지 주요 구성 요소로 나뉩니다:

- CMA(콘텐츠 관리 응용 프로그램): 이는 저자가 사용자 친화적 인 인터페이스에서 콘텐츠를 작성할 수 있는 미디어 저장 및 편집기로 설명됩니다. 이를 마이크로소프트 워드의 확장판으로 생각해보세요.
- CDA(콘텐츠 전달 응용 프로그램): 이는 정적 콘텐츠를 처리하고 웹페이지로 표시하는 모든 백그라운드 처리 작업을 다룹니다.

![이미지](/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_5.png)

# 적절한 CMS 선택하기



CMS를 선택하려면 시장에서 선택할 수있는 다양한 옵션이 있지만이 블로그를 위해 나는 내 웹 사이트에 사용한 훌륭한 Headless CMS 옵션 인 Storyblok에 대해 이야기하겠습니다. Storyblok은 재사용 가능한 구성 요소인 Bloks를 사용하여 콘텐츠를 관리하도록 허용하는 구성 요소 기반 Headless CMS입니다. Astro는 다양한 CMS 옵션에 대한 안내를 제공하지만 공식 CMS 통합으로 Storyblok을 발표했으며 이것이 정말 그 가치가 있다고 말할 때 믿어 주십시오.

# Storyblok과 Astro 통합

- 먼저, Storyblok 계정을 등록하고 자체 공간을 설정해야합니다. 저는 무료 플랜을 선택했는데 아주 잘 작동합니다. 설정에서 미리보기 토큰을 복사하여 .env 파일에 붙여 넣어 나중에 사용할 수 있도록합니다.
- 이제 공식 Storyblok 통합 패키지를 설치해야합니다.

```js
npm install @storyblok/astro vite
```  



# Storyblok Space에 Astro를 연결하기

우리의 Astro 프로젝트를 Storyblok 공간에 연결하기 위해서는 astro.config.mjs 파일을 아래와 같이 수정하고 .env 파일에서 미리 보기 토큰을 추가하기만 하면 됩니다.

```js
import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv("", process.cwd(), 'STORYBLOK');

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // 여기에 컴포넌트를 추가하세요
      },
      apiOptions: {
        // Storyblok 공간 지역을 선택하세요
        region: 'us', // 옵션, 'eu' (기본값)으로 설정할 수 있습니다
      },
    })
  ],
});
```

# Storyblok에서 블록 만들기



블록은 실제로 Storyblok을 통합할 때 웹 페이지의 "구성 요소"이며, 여러분의 공간에 있는 블록 라이브러리에 저장됩니다. 웹 페이지의 콘텐츠를 서로 다른 청크(블록)으로 분할하여 생각해 보세요. 이 블록들은 이동하거나 변경하거나 필요에 따라 다른 블록에 삽입할 수 있습니다.

지금은 콘텐츠를 작성하기 위해 세 개의 블록이 필요합니다. 즉, 블로그 게시물, 블로그 게시물 목록, 그리고 다른 하나인 페이지입니다. 우리가 생성하는 각 블록에 대해 해당하는 Astro 컴포넌트를 생성해야 합니다. 따라서 storyblok이라는 디렉터리를 만들어 그 안에 이러한 컴포넌트들을 저장합니다.

- BlogPost: 이는 콘텐츠 유형 블록으로, 블로그의 레이아웃 역할을 하는 곳으로 생각할 수 있습니다. 여기에서는 타이틀, 설명, 이미지, 콘텐츠와 같이 몇 가지 고정 필드를 정의하거나 배너 이미지, 테이블 등과 같은 다른 중첩 가능한 블록을 추가할 수 있습니다.

```js
src/pages/storyblok/BlogPost.astro

---
import { storyblokEditable, renderRichText } from '@storyblok/astro'
const { blok } = Astro.props
const content = renderRichText(blok.content)
---

<article {...storyblokEditable(blok)}>
  <h1>{blok.title}</h1>
  <p>{blok.description}</p>
  <img
      class="w-full h-[360px] lg:h- [450px] object-cover"
      src={`${blok.image.filename}/m/1600x0`}
   />
  <Fragment set:html={content} /> 
</article>
```



위 코드는 BlogPost.astro 컴포넌트를 위한 것입니다. 이 컴포넌트는 모든 필드에서 내용을 렌더링하며, 우리의 content 필드는 Richtext 유형이므로 먼저 HTML로 변환한 다음 `Fragment set:html='content' /`로 전달하여 HTML로 렌더링합니다.

- BlogPostList: 이는 BlogPost 유형의 모든 블록을 포함하고 카드로 표시할 수 있는 중첩 가능한 블록입니다. useStoryblokApi 훅을 사용하여 blogPost 콘텐츠 유형을 가진 모든 스토리를 가져와서 필요에 따라 draft/published로 필터링합니다.

```js
src/pages/storyblok/BlogPostList.astro

---
import { storyblokEditable } from '@storyblok/astro'
import { useStoryblokApi } from '@storyblok/astro'

const storyblokApi = useStoryblokApi();

const { data } = await storyblokApi.get('cdn/stories', {
  version: import.meta.env.DEV ? "draft" : "published",
  content_type: 'blogPost',
})

const posts = data.stories.map(story => {
  return {
    title: story.content.title,
    date: new Date(story.published_at).toLocaleDateString("en-US", {dateStyle: "full"}),
    description: story.content.description,
    slug: story.full_slug,
  }
})

const { blok } = Astro.props
---

- Blog 포스트 목록

<ul {...storyblokEditable(blok)}>
  {posts.map(post => (
    <li>
      <time>{post.date}</time>
      <a href={post.slug}>{post.title}</a>
      <p>{post.description}</p>
    </li>
  ))}
</ul>
```

- Page: 이 또한 본문 필드 내의 모든 컴포넌트/블록을 렌더링하는 중첩 가능한 유형 블록입니다. 또한 부모 요소에 storyblokEditable 속성을 추가하여 Storyblok에서 페이지를 편집할 수 있습니다.




src/pages/storyblok/Page.astro

---
import { storyblokEditable } from '@storyblok/astro'
import StoryblokComponent from "@storyblok/astro/StoryblokComponent.astro";
const { blok } = Astro.props
---

<main {...storyblokEditable(blok)}>
  {
    blok.body?.map((blok) => {
      return <StoryblokComponent blok={blok} />
    })
  }
</main>


이제, 우리가 블록을 만들었으니, 블로그용 각 웹페이지에 대한 동적 경로를 처리해야 합니다. Astro를 사용하여 동적 경로를 구성하는 것은 매우 간단합니다. 페이지 디렉토리 안에 blog라는 새 디렉토리를 만들고 그 안에 아래 코드가 있는 [...slug].astro라는 새 파일을 만들어주기만 하면 됩니다:

```js
src/pages/blog/[...slug].astro

---
import { useStoryblokApi } from '@storyblok/astro'
import StoryblokComponent from '@storyblok/astro/StoryblokComponent.astro'

export async function getStaticPaths() {
  const sbApi = useStoryblokApi();

  const { data } = await sbApi.get("cdn/stories", {
    content_type: "blogPost",
    version: import.meta.env.DEV ? "draft" : "published",
  });

  const stories = Object.values(data.stories);

  return stories.map((story) => {
    return {
      params: { slug: story.slug },
    };
  });
}

const sbApi = useStoryblokApi();
const { slug } = Astro.params;
const { data } = await sbApi.get(`cdn/stories/blog/${slug}`, {
  version: import.meta.env.DEV ? "draft" : "published",
});

const story = data.story;

---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Storyblok & Astro</title>
  </head>
  <body>
    <StoryblokComponent blok={story.content} tags={story.tag_list}/>    {/* 각 Story에 대한 콘텐츠와 함께 Story 태그목록을 전달합니다. */}
  </body>
</html>
```

이렇게 하면 blog/로 시작하는 모든 요청은 이 파일에서 처리됩니다. 왜냐하면 이 파일이 요청 URL을 라이브러리에 있는 각 Story에서 생성된 슬러그로 매핑하기 때문입니다. Storyblok 콘텐츠 탭에서 Test Blog를 만들어 테스트해볼 수 있습니다. "New Story"로 이동하고 "Content type"을 "BlogPost"로 선택하면 됩니다. 왼쪽에는 Visual Editor라 불리는 화면이 나타나고 오른쪽에는 콘텐츠/미디어를 작성 및 관리하는 일반 편집기가 표시됩니다.




## Storyblok의 시각 에디터에 대해 알아보기

Storyblok의 시각 에디터는 작가/개발자에게 즐거운 경험을 제공해주는 게임을 바꿔놓는 기능이라고 생각해요.

하지만 이를 설정하려면 데브 서버가 실행 중인 로컬호스트 및 포트 번호로 미리보기 URL을 기본값에서 변경해야 해요. 제 경우에는 https://localhost:4321/입니다.

참고: 데브 서버는 기본적으로 HTTP에서 실행되지만, Storyblok은 앱을 HTTPS를 통해 제공해야 하므로 이를 우회하기 위해 basicSsl을 설치하고 앱을 HTTPS로 실행하세요. 자세한 내용은 다음 링크를 참조하세요: [링크](https://www.storyblok.com/faq/setting-up-https-on-localhost-in-astro)




![image](/assets/img/2024-05-15-HowIsetupmyBlogSitewithAstroandStoryblok_6.png)

작업이 완료되었습니다. 이제 우리는 콘텐츠 편집기 플랫폼을 갖추었고, 실시간으로 변경 사항을 시각화하고 Storyblok의 에셋 라이브러리를 사용하여 미디어를 관리하며 사용자 정의 블록을 사용하여 모든 구성 요소를 사용자 정의할 수 있습니다.

## 소스 코드:

## 참고 자료:




- Astro Docs: [https://docs.astro.build/en/getting-started/](https://docs.astro.build/en/getting-started/)
- Storyblok Integration Guide: [https://docs.astro.build/en/guides/cms/storyblok/](https://docs.astro.build/en/guides/cms/storyblok/)
- Astro Syntax: [https://docs.astro.build/en/basics/astro-syntax/](https://docs.astro.build/en/basics/astro-syntax/)
- Astro Community Guides: [https://docs.astro.build/en/community-resources/talks/](https://docs.astro.build/en/community-resources/talks/)
- RichText vs Markdown: [https://www.ssp.sh/brain/markdown-vs-rich-text/](https://www.ssp.sh/brain/markdown-vs-rich-text/)