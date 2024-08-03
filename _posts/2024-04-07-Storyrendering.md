---
title: "Storybook에서 컴포넌트가 렌더링되는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Story rendering"
link: "https://storybook.js.org/docs/configure/story-rendering"
---




Storybook에서 여러분의 스토리들은 Storybook 웹 애플리케이션 내부의 특정 "미리보기" 아이프레임(캔버스 탭)에서 렌더링됩니다. 미리보기의 JavaScript 빌드 구성은 웹팩 설정에 의해 제어되지만, 여러분은 스토리들이 올바르게 렌더링되도록 직접 렌더링된 HTML을 제어하기 위해 추가적인 작업을 할 수도 있습니다.

## `head`에 추가하기

예를 들어 미리보기 아이프레임의 `head`에 추가적인 요소를 넣어야 하는 경우, 정적 스타일시트, 글꼴 파일 등을 로드할 때 .storybook/preview-head.html이라는 파일을 생성하고 다음과 같이 태그를 추가할 수 있습니다:

```typescript
<!-- Static 디렉토리에서 제공되는 정적 파일이나 인터넷에서 제공되는 파일 가져오기 -->
<!-- 예시: `main.js|ts`는 staticDirs: ['../public']로 구성되어 있고 여러분의 글꼴은 `public` 디렉토리 내부의 `fonts` 디렉토리에 있습니다 -->
<link rel="preload" href="/fonts/my-font.woff2" />

<!-- 또는 사용자 지정 head 태그 JavaScript를 로드할 수도 있습니다: -->

<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>
  try {
    Typekit.load();
  } catch (e) {}
</script>
```



그러나 main.js 파일에 정의된 프리셋을 사용하여 미리보기 헤드 HTML을 프로그래밍적으로 수정하는 것도 가능합니다. 더 많은 정보를 얻으려면 프리셋 설명서를 읽어보세요.

## `body`에 추가하기

가끔은 `body`에 다른 태그를 추가해야 할 수도 있습니다. 사용자 지정 콘텐츠 루트를 추가하는 데 도움이 됩니다.

.storybook 디렉토리 내에 preview-body.html이라는 파일을 만들고 다음과 같이 태그를 추가함으로써 이를 수행할 수 있습니다:



```typescript
<div id="custom-root"></div>
```

만약 rem이나 em과 같은 상대 크기를 사용하는 프로젝트라면, preview-body.html에 스타일 태그를 추가하여 기본 글꼴 크기를 업데이트할 수 있습니다:

```typescript
<style>
  html {
    font-size: 15px;
  }
</style>
```

미리보기 헤드 HTML 태그를 사용자 정의할 수 있는 것처럼, 동일한 단계를 따라 미리보기 본문을 사용자 정의할 수도 있습니다. 이를 수행하는 방법에 대한 자세한 정보는 프리셋 문서를 참고하세요.```