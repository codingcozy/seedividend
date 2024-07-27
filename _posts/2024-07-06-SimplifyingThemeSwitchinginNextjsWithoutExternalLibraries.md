---
title: "외부 라이브러리 없이 Nextjs에서 테마 전환 간단하게 구현하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-06-SimplifyingThemeSwitchinginNextjsWithoutExternalLibraries_0.png"
date: 2024-07-06 02:17
ogImage:
  url: /assets/img/2024-07-06-SimplifyingThemeSwitchinginNextjsWithoutExternalLibraries_0.png
tag: Tech
originalTitle: "Simplifying Theme Switching in Next.js Without External Libraries"
link: "https://medium.com/@niralspectrum/simplifying-theme-switching-in-next-js-without-external-libraries-c889c4b76573"
---

/assets/img/2024-07-06-SimplifyingThemeSwitchinginNextjsWithoutExternalLibraries_0.png

소개

테마 전환기를 웹 애플리케이션에 통합하면 사용자 경험을 향상시키고 사용자 정의 가능한 브라우징 환경을 제공할 수 있습니다. 본 안내서에서는 CSS 변수와 :root 선택기를 사용하여 Next.js 응용 프로그램에서 테마 전환을 구현하는 간단한 접근 방법을 탐색하며, 외부 CSS 라이브러리를 사용하지 않습니다. 이 방법은 사용자 선호도에 맞게 맞춤형 라이트 및 다크 테마 간의 원활한 전환을 제공합니다.

전제 조건

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

시작하기 전에 React, Next.js 및 CSS에 대한 기본적인 이해가 필요합니다.

테마 색상 정의하기

글로벌 CSS 파일(globals.css)에서 CSS 변수를 사용하여 테마 색상을 정의하세요. CSS 변수를 사용하면 외부 라이브러리에 의존하지 않고 동적 테마 관리가 가능합니다:

```js
/* app/globals.css */
:root {
  --background-color: #ffffff; /* 기본 배경색 */
  --text-color: #333333; /* 기본 텍스트색 */
}
/* 다크 테마 */
:root:dark {
  --background-color: #333333; /* 다크 테마 배경색 */
  --text-color: #ffffff; /* 다크 테마 텍스트색 */
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기에서는 :root가 기본 테마 변수를 설정하고, :root:dark가 다크 테마를 위한 변수를 조정합니다.

테마 전환 컴포넌트 만들기

이제 ToggleTheme 컴포넌트를 생성하여 사용자가 밝은 테마와 어두운 테마 사이를 전환할 수 있도록 하세요. 매끄럽게 테마 전환을 위해 Next.js의 useTheme 훅을 활용하세요:

```js
// components/ToggleTheme.tsx

import React from "react";
import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <button onClick={toggleTheme}>테마 전환</button>;
};

export default ToggleTheme;
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 컴포넌트는 외부 CSS 라이브러리에 의존하지 않고 테마 전환을 간단하게 만들어줍니다. 사용자가 자신만의 브라우징 경험을 개인화할 수 있는 직관적인 방법을 제공합니다.

동적 테마 스타일 적용

선택한 테마를 반영하도록 컴포넌트의 스타일을 업데이트하여 앞서 정의한 CSS 변수를 활용하세요. 여기에는 메인 레이아웃 컴포넌트를 스타일링하는 예시가 있습니다 (page.module.css):

```js
/* styles/page.module.css */

.main {
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 예제에서는 선택된 테마에 따라 :root 및 :root:dark 선택기를 사용하여 .main이 배경 및 텍스트 색상을 심미적으로 적응합니다.

결론

CSS 변수와 :root 선택자를 사용하여 Next.js 애플리케이션에서 테마 전환을 구현하면 유연하고 효율적인 방식을 제공합니다. 이 방법은 사용자 경험과 접근성을 향상시키며, 사용자가 외부 CSS 라이브러리에 의존하지 않고 자신의 선호에 맞는 테마를 선택할 수 있도록 합니다.
