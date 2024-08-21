---
title: "Nextjs 14 폰트 최적화하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# Nextjs 14 폰트 최적화하는 방법

next/font는 자동으로 폰트를 최적화하고 (사용자 정의 폰트 포함) 개인 정보 보호 및 성능 향상을 위해 외부 네트워크 요청을 제거합니다.

> 🎥 시청: next/font 사용에 대해 자세히 알아보기 → YouTube (6 분)
> .
> next/font에는 모든 글꼴 파일에 대한 내장 자동 셀프 호스팅이 포함되어 있습니다. 이는 CSS 크기 조정 속성을 이용하여 웹 폰트를 최적으로 로드할 수 있게 해 줍니다.
> 이 새로운 폰트 시스템은 모든 Google Fonts를 효율적이고 개인 정보 보호를 고려하여 편리하게 사용할 수 있도록 합니다. CSS 및 글꼴 파일은 빌드 시 다운로드되어 정적 에셋과 함께 셀프 호스팅됩니다. 브라우저가 Google로 요청을 보내지 않습니다.

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

## 구글 글꼴

구글 글꼴을 자동으로 자체 호스팅하세요. 글꼴은 배포에 포함되어 도메인과 동일한 곳에서 제공됩니다. 브라우저가 구글로 요청을 보내지 않습니다.
사용할 글꼴을 next/font/google에서 함수로 가져와서 가져오세요. 최상의 성능과 유연성을 위해 변수 글꼴을 사용하는 것을 권장합니다.

```typescript
import { Inter } from "next/font/google";

// 변수 글꼴을 로드하는 경우, 글꼴 무게를 지정할 필요가 없습니다.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
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

만약 변수 글꼴을 사용할 수 없다면, 글꼴 무게를 지정해야 합니다.

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
```

여러 가중치나 스타일을 배열을 사용하여 지정할 수 있습니다:

```js
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
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

> 알아두면 좋은 정보: 여러 단어로 된 글꼴 명은 밑줄 (\_)을 사용하세요. 예: Roboto Mono의 경우 Roboto_Mono로 가져와야 합니다.

### 특정 서브셋 지정하기

Google Fonts는 자동으로 하위 집합(subset)으로 나뉘어집니다. 이는 글꼴 파일 크기를 줄이고 성능을 향상시킵니다. 미리 로드(preload)할 하위 집합을 정의해야 합니다. preload가 true일 때 어떤 하위 집합도 지정하지 않으면 경고가 발생합니다.
함수 호출에 추가하여 이를 수행할 수 있습니다:

```typescript
const inter = Inter({ subsets: ["latin"] });
```

더 많은 정보를 보려면 Font API 참조 문서를 참조해주세요.

### 여러 글꼴 사용하기

당신은 앱에서 여러 폰트를 가져와 사용할 수 있어요. 두 가지 방법이 있어요. 첫 번째 방법은 폰트를 내보내고 가져와서 필요한 곳에 className을 적용하는 유틸리티 함수를 만드는 거예요. 이렇게 하면 폰트가 렌더링될 때에만 사전로드되도록 할 수 있어요:

```typescript
import { Inter, Roboto_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});
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

```typescript
import { inter } from "./fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
```

```typescript
import { roboto_mono } from "./fonts";

export default function Page() {
  return (
    <>
      <h1 className={roboto_mono.className}>My page</h1>
    </>
  );
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

위의 예시에서 Inter는 전역적으로 적용되며, Roboto Mono는 필요할 때 가져와 적용할 수 있습니다.
또는 CSS 변수를 만들고 원하는 CSS 솔루션과 함께 사용할 수도 있습니다:

```typescript
import { Inter, Roboto_Mono } from "next/font/google";
import styles from "./global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  );
}
```

```js
html {
  font-family: var(--font-inter);
}

h1 {
  font-family: var(--font-roboto-mono);
}
```

위의 예시에서 Inter는 전역적으로 적용되며, 모든 `<h1>` 태그는 Roboto Mono로 스타일이 적용됩니다.

> 권장 사항: 클라이언트가 다운로드해야 하는 추가 리소스인 각 새로운 글꼴을 절약하려면 여러 글꼴을 삼가 사용하세요.

## 로컬 글꼴

다음/글꼴/로컬을 가져와서 로컬 글꼴 파일의 src를 지정하세요. 성능과 유연성을 위해 변수 글꼴을 사용하는 것을 권장합니다.

```typescript
import localFont from "next/font/local";

// 글꼴 파일은 `app` 내부에 공존할 수 있습니다.
const myFont = localFont({
  src: "./my-font.woff2",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}
```

하나의 글꼴 패밀리에 여러 파일을 사용하려면 src를 배열로 할 수 있습니다:

```js
const roboto = localFont({
  src: [
    {
      path: "./Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Roboto-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Roboto-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});
```

폰트 API 참조를 더 보려면 이걸 확인해보세요.

## Tailwind CSS와 함께

next/font는 Tailwind CSS와 함께 사용할 수 있습니다.
CSS 변수를 통해 사용 가능합니다.
아래 예제에서 우리는 next/font/google로부터 Inter 폰트를 사용합니다 (Google 또는 Local Fonts에서 폰트를 사용할 수 있습니다). 변수 옵션을 사용하여 CSS 변수 이름을 정의하고 inter로 할당하세요. 그런 다음, inter.variable을 사용하여 CSS 변수를 HTML 문서에 추가하세요.

```typescript
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

마지막으로 Tailwind CSS 구성에 CSS 변수를 추가하세요:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
```

이제 font-sans 및 font-mono 유틸리티 클래스를 사용하여 요소에 글꼴을 적용할 수 있습니다.

## 사전로드(preloading)

페이지에서 글꼴 처리 함수를 호출하면 해당 글꼴은 전역적으로 사용 가능하거나 모든 경유지에 미리로드되지 않습니다. 대신 글꼴은 사용된 파일 유형에 따라 관련 경로에만 미리로드됩니다:

- 고유한 페이지인 경우, 해당 페이지의 고유 경로에 미리로드됩니다.
- 레이아웃인 경우, 해당 레이아웃으로 둘러싸인 모든 경로에 미리로드됩니다.
- 루트 레이아웃이라면, 모든 경로에 미리로드됩니다.

## 글꼴 재사용

localFont 또는 Google 글꼴 함수를 호출할 때마다 해당 글꼴은 응용 프로그램에서 하나의 인스턴스로 호스팅됩니다. 따라서 여러 파일에서 동일한 글꼴 함수를 로드하면 동일한 글꼴의 다중 인스턴스가 호스팅됩니다. 이 상황에서는 다음을 권장합니다:

- 글꼴 로더 함수를 하나의 공유 파일에 호출
- 상수로 내보내기
- 이 글꼴을 사용하려는 각 파일에서 해당 상수 가져오기
