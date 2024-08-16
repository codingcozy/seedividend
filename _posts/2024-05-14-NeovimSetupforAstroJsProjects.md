---
title: "아스트로 JS 프로젝트용 Neovim 설정"
description: ""
coverImage: "/assets/img/2024-05-14-NeovimSetupforAstroJsProjects_0.png"
date: 2024-05-14 15:58
ogImage: 
  url: /assets/img/2024-05-14-NeovimSetupforAstroJsProjects_0.png
tag: Tech
originalTitle: "Neovim Setup for AstroJs Projects"
link: "https://medium.com/@adam-drake-frontend-developer/neovim-setup-for-astrojs-projects-ef8c405765ab"
isUpdated: true
---




![AstroJS](/assets/img/2024-05-14-NeovimSetupforAstroJsProjects_0.png)

최근 JavaScript 커뮤니티에서 AstroJS가 많은 사랑을 받고 있어요. Astro를 들어보지 못했다면, 콘텐츠 중심 웹 프레임워크입니다. '아일랜드'와 같은 개념을 사용하여 모든 비필수적인 자바스크립트를 제거하여 사이트 속도를 높일 수 있어요.

저는 이것을 시도해보고 있으며, 편집기로 Neovim을 사용하고 있어요. 모든 것을 설정하는 방법이 100% 명확하지 않아서 이 기사에서 제가 한 설정 방법을 공유하려고 해요. AstroJS 프로젝트에서 Neovim을 잘 작동하도록 설정하는 방법은 다음과 같아요.

## LSP 구성



이 부분이 조금 헷갈렸네요.

- 먼저 Mason을 통해 astro-language-server를 설치해야 합니다:

![astro-language-server 설치](/assets/img/2024-05-14-NeovimSetupforAstroJsProjects_1.png)

2. mason_lspconfig.setup에서 astro가 ensure_installed 객체에 있는지 확인하세요:



```js
 mason_lspconfig.setup({
   -- mason 설치할 서버 목록
   ensure_installed = {
    "astro",
    "tsserver",
    "html",
    "cssls",
    "tailwindcss",
   },
   -- lspconfig로 자동 설치 (ensure_installed랑 다름)
   automatic_installation = true,
  })
```

3. lspconfig를 설정하는 곳에 다음 코드를 넣으세요:

```js
  -- astro --
  lspconfig["astro"].setup({
   capabilities = capabilities,
   on_attach = on_attach,
   filetypes = { "astro" },
  })
```

저는 이 부분이 헷갈렸어요. astro-language-server를 설치했는데 lspconfig에서는 astro만 사용한다고 하더라구요. 나중에 돌아봤을 때 Mason에서 LSP 이름 뒤에 astro를 제공하는 걸 볼 수 있었지만, 처음에는 이게 명확하지 않았어요.



이것이 .astro 파일에 대한 LSP를 활성화해야 합니다.

## 구문 강조

그를 위해 저는 내 treesitter 구성에서 ensure_installed object에 astro를 추가했어요.

```js
 require("nvim-treesitter.configs").setup({
    ensure_installed = {
     "astro",
    },
 })
```



## 형식 지정

이를 위해 나는 prettier와 prettier-plugin-astro라는 플러그인의 조합을 사용하고 있습니다. 우선 none-ls.lua 파일에 있는 파일 목록에 astro 파일 유형을 prettier로 서식을 지정할 파일 목록에 추가했습니다 (저는 Mason을 통해 포매터로 prettier를 설치했습니다).

```js
 formatting.prettier.with({
     extra_filetypes = { "svelte", "typescriptreact", "astro" },
    }), 
```

그런 다음 로컬 astro 프로젝트에서 이 prettier-plugin-astro를 로컬 개발 종속성으로 설치했습니다.



```js
pnpm add -D prettier-plugin-astro
```

그리고 Neovim을 다시 시작한 후 .astro 파일을 저장하면 저장될 때 자동으로 서식이 지정됩니다.

# 결론

이 모든 것을 설정하는 방법이 100% 명확하지는 않았고, 꽤 오랜 시간이 걸렸습니다. 여러 가지를 찾아보고 시행착오를 격은 결과였죠. 이 기사가 Neovim에서 AstroJs 프로젝트를 작업하기를 희망하는 사람들이 자신의 설정을 Neovim에서 잘 작동하도록 도와줄 수 있기를 바랍니다.



# 구독하기

만약 이 블로그 글을 좋아한다면, 매번 새로운 글이 올라올 때마다 알림을 받을 수 있습니다. 저는 매주 월요일 아침 8:30에 중앙 유럽 시간에 글을 올립니다.

# 나에 대해

저는 주로 React와 Typescript를 사용하는 프론트엔드 개발자입니다. 새로운 도구와 라이브러리를 탐구하는 것을 좋아하며, JavaScript 생태계를 사랑합니다.



저는 발견한 새로운 흥미로운 도구, 사용 설명서 논문 및 가끔 의견 조각을 나누는 블로그 글을 쓰는 것을 좋아해요.

저는 체코 공화국 프라하에 제 가족과 함께 살고 있어요.

제 블로그에서 원본 블로그 글을 확인해보세요.

관심이 있다면 제 LinkedIn과 Github도 확인해보세요.