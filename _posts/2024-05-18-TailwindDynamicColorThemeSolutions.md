---
title: "Tailwind에서 동적 색상 테마사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-18-TailwindDynamicColorThemeSolutions_0.png"
date: 2024-05-18 22:10
ogImage:
  url: /assets/img/2024-05-18-TailwindDynamicColorThemeSolutions_0.png
tag: Tech
originalTitle: "Tailwind Dynamic Color Theme Solutions"
link: "https://medium.com/@oodri/tailwind-dynamic-color-theme-solution-4351d0495c7f"
isUpdated: true
---

<img src="/assets/img/2024-05-18-TailwindDynamicColorThemeSolutions_0.png" />

안녕하세요! Tailwind를 사용하여 더 나은 색상 관리를 위한 테마 솔루션을 온라인으로 찾아보았지만 많은 것을 찾지 못했습니다. 그래서 이 문제에 부딪히는 다른 사람들을 돕기 위해 이 기사에 찾은 솔루션을 문서화하고 있어요.

# 문제점

- Tailwind는 주로 밝은(light)과 어두운(dark) 두 가지 색상 테마만 지원합니다. 대부분의 경우 이것으로 충분하지만, 프로젝트에 대해 더 많은 옵션과 사용자 정의를 찾고 계시다면 이것만으로는 충분하지 않을 수 있어요.
- 어두운 테마 스타일은 html 파일에 개별적으로 정의되어야 하므로 모든 색상 선택지가 css에서 두 번 반복되는 느낌을 주고 유지보수가 어렵게 만들 수 있어요.
- CSS 변수의 사용은 가능하지만, 중요한 단점이 있습니다: 불투명 클래스(예: bg-primary/50)는 '원시' hsl이나 rgb로 정의되지 않는 한 더 이상 작동하지 않을 것입니다(예: — color-primary: 0 0 100;). 또한 css 변수를 사용하면 tailwind의 내장 색상을 재사용하거나 자체 JSON 객체를 사용하여 정의할 수 없어요.

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

여기 내가 생각한 해결책이 두 가지 있어.

## 해결책 1: 테마 파일 사용

여기 단순한 해결책이 있어. 개발 중에 컬러 팔레트를 테스트하는 데 충분한 추상화만 사용하면서 코드에서 그 색상에 멋진 의미론적 접근 방식을 제공해. 보너스로 테일윈드 구성 파일에서 CSS 변수 대신에 색상 스왓치 미리보기를 VScode에서 볼 수 있어.

테일윈드 구성 파일:

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
//tailwind.config.js
/** @type {import('tailwindcss').Config} */

import { colors, getNeutral, getThemeColors } from "./src/styles/theme";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: getNeutral("dark"),
        light: getNeutral("light"),
        neutral: getThemeColors(colors.neutral),
        brand: getThemeColors(colors.brand),
        success: getThemeColors(colors.success),
        warn: getThemeColors(colors.warn),
        danger: getThemeColors(colors.danger),
        info: getThemeColors(colors.info),
      },
    },
  },
  plugins: [],
};
```

Theme file:

```js
//theme.js
const tailwindColors = require("tailwindcss/colors");

const darkShade = 600;
const lightShade = 300;
const defaultShade = 500;
const neutralLightShade = 50;
const neutralDarkShade = 950;

export const colors = {
  neutral: tailwindColors.slate,
  brand: tailwindColors.violet,
  success: tailwindColors.teal,
  warn: tailwindColors.orange,
  danger: tailwindColors.red,
  info: tailwindColors.cyan,
};

export const getThemeColors = (color) => {
  return {
    DEFAULT: color[defaultShade],
    l: color[lightShade],
    d: color[darkShade],
    ...color,
  };
};

export const getNeutral = (shade) => {
  return shade === "light" ? neutralLightShade : shade === "dark" ? neutralDarkShade : colors.neutral[shade];
};
```

Using this solution may have some drawbacks. The process of setting up dark mode, while somewhat improved, still involves some complexity. Additionally, managing text visibility over colored backgrounds is manageable but finding a semantically sensible solution can be challenging.

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

# 해결책 2: CSS 변수 사용

이 해결책은 아주 쉽고 직관적이지만, 몇 가지 단점이 있어서 난 어렵게 느껴져서 전환하기 어렵습니다. 이 해결책의 좋은 버전은 shadcn이 제공하고 그의 UI 해결책에서 사용되는 것입니다 (여기서 그의 예제 저장소를 확인해보세요)

Tailwind 구성 파일:

```js
// tailwind.config.js

const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./ui/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
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

![Tailwind Dynamic Color Theme Solutions](/assets/img/2024-05-18-TailwindDynamicColorThemeSolutions_1.png)

Global CSS File:

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

The advantages of using a solution like this one are that not only the styling will be quicker to write as we don’t need to manage our dark theme with Tailwind, but we also can create as many themes as we want based on any class or selector we want.

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

큰 단점은 Tailwind의 투명도 기능을 유지하기 위해서는 원시 rbg 또는 hsl 코드를 사용해야 하므로 읽기가 훨씬 어려워진다는 것입니다. 이 방식으로는 색상 관리가 쉽거나 직관적이지 않지만, 한 가지 해결책은 루트에서 의미 있는 색상 변수를 정의한 다음에 테마에서 사용하는 것입니다:

```js
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {

    --gray-hsl--50: 0 0% 100%;
    --gray-hsl--950: 222.2 47.4% 11.2%;

    --background: var(--gray-hsl--50);
    --foreground: var(--gray-hsl--950);

  /* ... */
  }

  .dark {
    --background: var(--gray-hsl--950);
    --foreground: var(--gray-hsl--50);

   /* ... */
  }
}

/* ... */
```

# 기타 해결책

몇 가지 더 선택지가 떠오르지만, 나중에 이곳에 작성할 수도 있지만, 지금은 이 2가지 솔루션이 동적으로 색상 테마를 관리하기 위해 찾은 최상의 해결책입니다.
