---
title: "내 Neovim 설정 React, TypeScript, Tailwind CSS 등"
description: ""
coverImage: "/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_0.png"
date: 2024-06-20 05:27
ogImage:
  url: /assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_0.png
tag: Tech
originalTitle: "My Neovim setup for React, TypeScript, Tailwind CSS, etc"
link: "https://medium.com/prodhacker/my-neovim-setup-for-react-typescript-tailwind-css-etc-in-2022-a7405862c9a4"
isUpdated: true
---

<img src="/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_0.png" />

안녕하세요, 타쿠야입니다. 제 어플리케이션 인크드롭(Inkdrop)을 코딩하기 위해 주로 Neovim을 사용하는 것을 아시겠지만, 인크드롭은 크로스 플랫폼 마크다운 노트 앱입니다. 데스크탑용으로는 일렉트론(Electron), 모바일 플랫폼으로는 리액트 네이티브(React Native)로 만들어졌습니다. 지난 번 Neovim 설정을 올린 지 1년이 지났네요. Neovim과 관련 플러그인들이 아주 잘 발전했습니다. 그래서 리액트와 타입스크립트 기반의 앱 개발을 위한 제 최신 설정을 공유하고 싶습니다. 주요 변화 중 하나는 설정 파일이 이제 Lua로 작성되었다는 점입니다. vim-plug에서 Packer로 변경했습니다. 그리고 M1 MacBook Air에서 Neovim을 처음부터 설정하는 방법에 대한 튜토리얼 비디오도 만들었습니다. 이미 여러분들께서 자신만의 도트 파일을 보유하고 계신다면, 제 설정을 선택적으로 사용해보세요. 즐겨주시기 바랍니다!

# 재료

여기 제 설정의 간단한 요약입니다:

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

- Neovim `= 0.7
- wbthomason/packer.nvim — Neovim을 위한 플러그인 매니저
- svrana/neosolarized.nvim — Truecolor, 솔라라이즈드 다크 컬러스킴
- nvim-lualine/lualine.nvim — Lua로 작성된 Neovim 스테이터스 라인으로 빠르고 쉽게 구성할 수 있습니다.
- onsails/lspkind-nvim — VSCode와 유사한 픽토그램들
- L3MON4D3/LuaSnip — Lua로 작성된 Neovim을 위한 스니펫 엔진
- hrsh7th/cmp-nvim-lsp — Neovim의 내장 LSP를 위한 nvim-cmp 소스
- hrsh7th/cmp-buffer — 버퍼 단어를 위한 nvim-cmp 소스
- hrsh7th/nvim-cmp — Lua로 작성된 Neovim을 위한 완성 엔진 플러그인
- neovim/nvim-lspconfig — Neovim의 내장 LSP 구성 모음
- jose-elias-alvarez/null-ls.nvim — Lua를 통해 LSP 진단, 코드 액션 등을 삽입하기 위해 Neovim을 언어 서버로 사용합니다.
- MunifTanjim/prettier.nvim - Neovim의 내장 LSP 클라이언트를 위한 Prettier 플러그인
- williamboman/mason.nvim - Neovim에서 동작하는 이동 가능한 패키지 매니저로 LSP 서버, DAP 서버, 린터 및 포매터를 쉽게 설치하고 관리할 수 있습니다.
- williamboman/mason-lspconfig.nvim - mason.nvim의 확장으로 mason.nvim과 lspconfig를 쉽게 사용할 수 있도록 합니다.
- glepnir/lspsaga.nvim - 높은 성능의 UI를 갖춘 neovim의 내장 LSP를 기반으로 한 가벼운 lsp 플러그인
- nvim-treesitter/nvim-treesitter - Neovim을 위한 Treesitter 구성 및 추상화 레이어
- kyazdani42/nvim-web-devicons - neovim용 vim-web-devicons의 Lua 포크
- nvim-telescope/telescope.nvim - 리스트를 통해 확장 가능한 퍼지 찾기 도구
- nvim-telescope/telescope-file-browser.nvim - telescope.nvim의 파일 브라우저 확장
- windwp/nvim-autopairs - 자동 괄호 기능
- windwp/nvim-ts-autotag - Treesitter를 사용하여 html 태그를 자동으로 닫고 이름을 바꿉니다.
- norcalli/nvim-colorizer.lua - 고성능 색상 강조 플러그인
- akinsho/nvim-bufferline.lua - 멋진 버퍼 라인
- lewis6991/gitsigns.nvim - 버퍼용 Git 통합
- dinhhuy258/git.nvim - 플러그인 vim-fugitive의 단순한 클론
- folke/zen-mode.nvim - 산만한 모드
- iamcco/markdown-preview.nvim - Markdown 실시간 미리보기

그리고 여기가 제 dotfiles 저장소입니다.

튜토리얼 비디오 (YouTube):

# 사전 요구 사항 — iTerm2 및 Patched Nerd 글꼴

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

iTerm2는 macOS용 빠른 터미널 에뮬레이터입니다. 터미널에서 멋진 글리프를 표시하기 위해 Nerd Fonts 중 하나를 설치하세요. 저는 현재 Hack을 사용하고 있어요. 그리고 터미널 앱에서 사용해보세요. 예를 들어, iTerm2에서:

[2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_1.png](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_1.png)를 확인해보세요.

# Homebrew를 통해 Neovim 설치하기

간단합니다:

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
brew install neovim
```

# 디렉토리 구조

Neovim은 XDG 기본 디렉토리 구조를 준수합니다. 여기는 내 설정 파일 구조입니다:

```js
📂 ~/.config/nvim
├── 📁 after
│  └── 📁 plugin
├── 📂 lua
│  └── 🌑 base.lua
├── 📁 plugin
└── 🇻 init.lua
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

Neovim은 $HOME/.config/nvim/init.vim 또는 init.lua를 $HOME/.vimrc 대신 먼저로드합니다. 자세한 내용은 퀵스타트 가이드를 확인해보세요:

## 플러그인 매니저 설치: Packer

아래 명령어를 실행하여 Packer를 설치하세요:

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim \
~/.local/share/nvim/site/pack/packer/start/packer.nvim
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

그러면, 다음과 같이 `.config/nvim/lua/plugins.lua` 파일을 만들어주세요:

```js
local status, packer = pcall(require, "packer")
if (not status) then
  print("Packer가 설치되지 않았습니다")
  return
end

vim.cmd [[packadd packer.nvim]]

packer.startup(function(use)
  use 'wbthomason/packer.nvim'
  -- 여기에 사용할 플러그인을 추가하세요
end)
```

그런 다음, `init.lua`에서 다음과 같이 불러오세요:

```js
require("plugins");
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

# 색 구성표: Neosolarized

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_2.png)

저는 svrana/neosolarized.nvim을 일부 사용자 지정과 함께 사용합니다.

```js
local status, n = pcall(require, "neosolarized")
if (not status) then return end

n.setup({
  comment_italics = true,
})

local cb = require('colorbuddy.init')
local Color = cb.Color
local colors = cb.colors
local Group = cb.Group
local groups = cb.groups
local styles = cb.styles

Color.new('black', '#000000')
Group.new('CursorLine', colors.none, colors.base03, styles.NONE, colors.base1)
Group.new('CursorLineNr', colors.yellow, colors.black, styles.NONE, colors.base1)
Group.new('Visual', colors.none, colors.base03, styles.reverse)

local cError = groups.Error.fg
local cInfo = groups.Information.fg
local cWarn = groups.Warning.fg
local cHint = groups.Hint.fg

Group.new("DiagnosticVirtualTextError", cError, cError:dark():dark():dark():dark(), styles.NONE)
Group.new("DiagnosticVirtualTextInfo", cInfo, cInfo:dark():dark():dark(), styles.NONE)
Group.new("DiagnosticVirtualTextWarn", cWarn, cWarn:dark():dark():dark(), styles.NONE)
Group.new("DiagnosticVirtualTextHint", cHint, cHint:dark():dark():dark(), styles.NONE)
Group.new("DiagnosticUnderlineError", colors.none, colors.none, styles.undercurl, cError)
Group.new("DiagnosticUnderlineWarn", colors.none, colors.none, styles.undercurl, cWarn)
Group.new("DiagnosticUnderlineInfo", colors.none, colors.none, styles.undercurl, cInfo)
Group.new("DiagnosticUnderlineHint", colors.none, colors.none, styles.undercurl, cHint)
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

# 상태 라인: Lualine

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_3.png)

nvim-lualine/lualine.nvim은 상태 행을 유연하게 구성할 수 있는 방법을 제공합니다.

```js
local status, lualine = pcall(require, "lualine")
if (not status) then return end

lualine.setup {
  options = {
    icons_enabled = true,
    theme = 'solarized_dark',
    section_separators = { left = '', right = '' },
    component_separators = { left = '', right = '' },
    disabled_filetypes = {}
  },
  sections = {
    lualine_a = { 'mode' },
    lualine_b = { 'branch' },
    lualine_c = { {
      'filename',
      file_status = true, -- 파일 상태 표시(읽기 전용 상태, 수정된 상태)
      path = 0 -- 0 = 파일 이름만, 1 = 상대 경로, 2 = 절대 경로
    } },
    lualine_x = {
      { 'diagnostics', sources = { "nvim_diagnostic" }, symbols = { error = ' ', warn = ' ', info = ' ',
        hint = ' ' } },
      'encoding',
      'filetype'
    },
    lualine_y = { 'progress' },
    lualine_z = { 'location' }
  },
  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = { {
      'filename',
      file_status = true, -- 파일 상태 표시(읽기 전용 상태, 수정된 상태)
      path = 1 -- 0 = 파일 이름만, 1 = 상대 경로, 2 = 절대 경로
    } },
    lualine_x = { 'location' },
    lualine_y = {},
    lualine_z = {}
  },
  tabline = {},
  extensions = { 'fugitive' }
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

# Lspconfig

Neovim에는 내장 LSP 지원이 있습니다. neovim/nvim-lspconfig를 사용하여 쉽게 구성할 수 있습니다. 예를 들어, Neovim에서 typescript 언어 서버를 활성화하려면:

```js
local status, nvim_lsp = pcall(require, "lspconfig")
if (not status) then return end

local protocol = require('vim.lsp.protocol')

local on_attach = function(client, bufnr)
  -- 저장 시 형식 지정
  if client.server_capabilities.documentFormattingProvider then
    vim.api.nvim_create_autocmd("BufWritePre", {
      group = vim.api.nvim_create_augroup("Format", { clear = true }),
      buffer = bufnr,
      callback = function() vim.lsp.buf.formatting_seq_sync() end
    })
  end
end

-- TypeScript
nvim_lsp.tsserver.setup {
  on_attach = on_attach,
  filetypes = { "typescript", "typescriptreact", "typescript.tsx" },
  cmd = { "typescript-language-server", "--stdio" }
}
```

타입스크립트 언어 서버를 설치하는 것을 잊지 마세요:

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
npm i -g typescript-language-server
```

# 자동 완성: Lspkind 및 cmp

<img src="/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_4.png" />

팬시한 픽토그램이 포함된 LSP를 인식하는 자동 완성 기능을 얻으려면 다음 플러그인을 사용합니다:

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

- onsails/lspkind-nvim - VSCode와 비슷한 그림표
- L3MON4D3/LuaSnip - 스니펫 엔진
- hrsh7th/cmp-nvim-lsp - neovim 내장 LSP용 nvim-cmp 소스
- hrsh7th/cmp-buffer - 버퍼 단어용 nvim-cmp 소스
- hrsh7th/nvim-cmp - neovim을 위한 완성 엔진 플러그인

다음과 같이 설정하십시오:

```js
local status, cmp = pcall(require, "cmp")
if (not status) then return end
local lspkind = require 'lspkind'

cmp.setup({
  snippet = {
    expand = function(args)
      require('luasnip').lsp_expand(args.body)
    end,
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-d>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.close(),
    ['<CR>'] = cmp.mapping.confirm({
      behavior = cmp.ConfirmBehavior.Replace,
      select = true
    }),
  }),
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
    { name = 'buffer' },
  }),
  formatting = {
    format = lspkind.cmp_format({ with_text = false, maxwidth = 50 })
  }
})

vim.cmd [[
  set completeopt=menuone,noinsert,noselect
  highlight! default link CmpItemKind CmpItemMenuDefault
]]
```

# 문법 강조: Treesitter

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

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_5.png)

Treesitter은 구문 강조를 위한 인기있는 언어 구문 분석기입니다. 먼저 다음을 설치하세요:

```js
brew install tree-sitter
```

Packer를 사용하여 nvim-treesitter/nvim-treesitter를 설치하고 다음과 같이 구성하세요:

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
local status, ts = pcall(require, "nvim-treesitter.configs")
if (not status) then return end

ts.setup {
  highlight = {
    enable = true,
    disable = {},
  },
  indent = {
    enable = true,
    disable = {},
  },
  ensure_installed = {
    "tsx",
    "toml",
    "fish",
    "php",
    "json",
    "yaml",
    "swift",
    "css",
    "html",
    "lua"
  },
  autotag = {
    enable = true,
  },
}

local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.tsx.filetype_to_parsername = { "javascript", "typescript.tsx" }
```

# Autotag and Autopair

리액트 앱에서는 태그를 빠르게 닫고 싶을 때가 많습니다. windwp/nvim-ts-autotag가 정확히 원하는 기능을 제공합니다.

```js
local status, autotag = pcall(require, "nvim-ts-autotag")
if (not status) then return end

autotag.setup({})
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

windwp/nvim-autopairs는 괄호를 자동으로 닫아주는 플러그인이에요.

```js
local status, autopairs = pcall(require, "nvim-autopairs")
if (not status) then return end

autopairs.setup({
  disable_filetype = { "TelescopePrompt" , "vim" },
})
```

# 퍼즈 파인더: Telescope

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_6.png)

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

telescope.nvim은 최신 Neovim 기능을 기반으로 한 목록 위의 대화식 퍼지 파인더를 제공합니다. 또한 filer로 telescope-file-browser.nvim을 사용합니다.

실제로 파일을 열지 않고도 파일의 내용을 보면서 파일을 검색할 수 있어서 매우 유용합니다. Vim, 파일, Git, LSP, Treesitter 등 다양한 소스를 지원합니다. Telescope의 쇼케이스를 확인해보세요.

Telescope, 상태행 및 다른 지원 플러그인에 파일 아이콘을 얻기 위해 kyazdani42/nvim-web-devicons를 설치하세요.

구성은 다음과 같이 보일 것입니다:

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
local status, telescope = pcall(require, "telescope")
if (not status) then return end
local actions = require('telescope.actions')
local builtin = require("telescope.builtin")

local function telescope_buffer_dir()
  return vim.fn.expand('%:p:h')
end

local fb_actions = require "telescope".extensions.file_browser.actions

telescope.setup {
  defaults = {
    mappings = {
      n = {
        ["q"] = actions.close
      },
    },
  },
}

-- 키맵
vim.keymap.set('n', ';f',
  function()
    builtin.find_files({
      no_ignore = false,
      hidden = true
    })
  end)
vim.keymap.set('n', ';r', function()
  builtin.live_grep()
end)
vim.keymap.set('n', '\\', function()
  builtin.buffers()
end)
vim.keymap.set('n', ';t', function()
  builtin.help_tags()
end)
vim.keymap.set('n', ';;', function()
  builtin.resume()
end)
vim.keymap.set('n', ';e', function()
  builtin.diagnostics()
end)
```

이미지를 추가했어요:

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_7.png)

텔레스코프 브라우저 확장 기능을 사용합니다:

```js
telescope.setup {
  defaults = {
    mappings = {
      n = {
        ["q"] = actions.close
      },
    },
  },
  extensions = {
    file_browser = {
      theme = "dropdown",
      -- netrw를 비활성화하고 telescope-file-browser를 사용합니다
      hijack_netrw = true,
      mappings = {
        -- 사용자 정의 삽입 모드 매핑
        ["i"] = {
          ["<C-w>"] = function() vim.cmd('normal vbd') end,
        },
        ["n"] = {
          -- 사용자 정의 일반 모드 매핑
          ["N"] = fb_actions.create,
          ["h"] = fb_actions.goto_parent_dir,
          ["/"] = function()
            vim.cmd('startinsert')
          end
        },
      },
    },
  },
}
telescope.load_extension("file_browser")

vim.keymap.set("n", "sf", function()
  telescope.extensions.file_browser.file_browser({
    path = "%:p:h",
    cwd = telescope_buffer_dir(),
    respect_gitignore = false,
    hidden = true,
    grouped = true,
    previewer = false,
    initial_mode = "normal",
    layout_config = { height = 40 }
  })
end)
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

# 탭: 버퍼 라인

<img src="/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_8.png" />

나는 탭의 보다 멋진 모양을 얻기 위해 akinsho/nvim-bufferline.lua를 사용합니다. Solarized 테마와 더 잘 어울리도록 몇 가지 사용자 정의를 추가했습니다:

```js
local status, bufferline = pcall(require, "bufferline")
if (not status) then return end

bufferline.setup({
  options = {
    mode = "tabs",
    separator_style = 'slant',
    always_show_bufferline = false,
    show_buffer_close_icons = false,
    show_close_icon = false,
    color_icons = true
  },
  highlights = {
    separator = {
      guifg = '#073642',
      guibg = '#002b36',
    },
    separator_selected = {
      guifg = '#073642',
    },
    background = {
      guifg = '#657b83',
      guibg = '#002b36'
    },
    buffer_selected = {
      guifg = '#fdf6e3',
      gui = "bold",
    },
    fill = {
      guibg = '#073642'
    }
  },
})

vim.keymap.set('n', '<Tab>', '<Cmd>BufferLineCycleNext<CR>', {})
vim.keymap.set('n', '<S-Tab>', '<Cmd>BufferLineCyclePrev<CR>', {})
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

# LSP 설정: Lspsaga

![](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_9.png)

![](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_10.png)

![](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_11.png)

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
local status, saga = pcall(require, "lspsaga")
if (not status) then return end

saga.init_lsp_saga {
  server_filetype_map = {
    typescript = 'typescript'
  }
}

local opts = { noremap = true, silent = true }
vim.keymap.set('n', '<C-j>', '<Cmd>Lspsaga diagnostic_jump_next<CR>', opts)
vim.keymap.set('n', 'K', '<Cmd>Lspsaga hover_doc<CR>', opts)
vim.keymap.set('n', 'gd', '<Cmd>Lspsaga lsp_finder<CR>', opts)
vim.keymap.set('i', '<C-k>', '<Cmd>Lspsaga signature_help<CR>', opts)
vim.keymap.set('n', 'gp', '<Cmd>Lspsaga preview_definition<CR>', opts)
vim.keymap.set('n', 'gr', '<Cmd>Lspsaga rename<CR>', opts)
```

# Code formatter: Prettier and null-ls

제가 가장 좋아하는 LSP 플러그인 중 하나인 glepnir/lspsaga.nvim은 hover doc, definition preview, rename actions 등과 같은 다양한 LSP 관련 기능에 대한 아름다운 UI를 제공합니다. 제 설정은 간단합니다. typescript 파일에 대해 'typescript' 서버를 매핑하고, 다른 기능에 대한 keymap을 설정합니다.

TypeScript/JavaScript/CSS 파일을 포맷하는 데 Prettier에 큰 의존을 하고 있습니다. 이를 위해 jose-elias-alvarez/null-ls.nvim 및 MunifTanjim/prettier.nvim을 사용합니다.

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

먼저, prettierd를 설치해야 합니다:

```js
brew install prettierd
```

그런 다음 null-ls를 다음과 같이 구성하세요:

```js
local status, null_ls = pcall(require, "null-ls")
if (not status) then return end

null_ls.setup({
  sources = {
    null_ls.builtins.diagnostics.eslint_d.with({
      diagnostics_format = '[eslint] #{m}\n(#{c})'
    }),
    null_ls.builtins.diagnostics.fish
  }
})
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

친화적인 톤으로 번역하면:

```js
local status, prettier = pcall(require, "prettier")
if (not status) then return end

prettier.setup {
  bin = 'prettierd',
  filetypes = {
    "css",
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "json",
    "scss",
    "less"
  }
}
```

# Git 표시: gitsigns

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_12.png)

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

lewis6991/gitsigns.nvim은 현재 버퍼에 대한 Git 장식을 제공합니다. 현재 변경된 줄을 파악하는 데 도움이 됩니다. 기본 설정으로 작동합니다.

```js
require('gitsigns').setup {}
```

# git

<img src="/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_13.png" />

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

요즘 제가 자주 사용하는 사이트는 GitHub입니다. dinhhuy258/git.nvim을 사용하면 Neovim에서 바로 GitHub을 열 수 있고, 분할 화면에서 git blame을 볼 수 있어 정말 편리해요.

```js
local status, git = pcall(require, "git")
if (not status) then return end

git.setup({
  keymaps = {
    -- Open blame window
    blame = "<Leader>gb",
    -- Open file/folder in git repository
    browse = "<Leader>go",
  }
})
```

# LSP 도구: mason

<img src="/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_14.png" />

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

특정 라이브러리에 대한 추가 LSP 지원이 필요하면 williamboman/mason.nvim 및 williamboman/mason-lspconfig.nvim이 필요할 수 있습니다. Neovim에서 Tailwind CSS 언어 서버를 실행하기 위해 사용하고 있어요.

```js
local status, mason = pcall(require, "mason")
if (not status) then return end
local status2, lspconfig = pcall(require, "mason-lspconfig")
if (not status2) then return end

mason.setup({})

lspconfig.setup {
  ensure_installed = { "sumneko_lua", "tailwindcss" },
}
```

다음으로 lspconfig을 추가하세요:

```js
local nvim_lsp = require "lspconfig"
nvim_lsp.tailwindcss.setup {}
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

이것으로 대부분 끝났어요! 네오빔 환경을 개선하는 데 도움이 되길 바랍니다.

# 온라인에서 나를 따르세요

- Inkdrop라는 앱을 확인해보세요 — 마크다운 노트 앱
- Twitter: [https://twitter.com/inkdrop_app](https://twitter.com/inkdrop_app)
- 블로그: [https://blog.inkdrop.app/](https://blog.inkdrop.app/)
- YouTube: [https://www.youtube.com/devaslife](https://www.youtube.com/devaslife)
- Instagram: [https://instagram.com/craftzdog](https://instagram.com/craftzdog)

![이미지](/assets/img/2024-06-20-MyNeovimsetupforReactTypeScriptTailwindCSSetc_15.png)
