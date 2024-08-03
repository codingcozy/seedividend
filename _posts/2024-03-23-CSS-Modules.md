---
title: "Nextjs 13에서 CSS 모듈 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "CSS 모듈"
link: "undefined"
---



# CSS 모듈

Next.js는 .module.css 확장자를 사용하여 CSS 모듈을 내장 지원합니다.

CSS 모듈은 자동으로 고유한 클래스 이름을 생성하여 CSS를 지역적으로 스코프화합니다. 이는 충돌을 걱정하지 않고 서로 다른 파일에서 동일한 클래스 이름을 사용할 수 있도록 합니다. 이 행동은 CSS 모듈을 컴포넌트 수준 CSS를 포함하는 이상적인 방법으로 만듭니다.

## 예시

<div class="content-ad"></div>

예를 들어, components/ 폴더에 재사용 가능한 Button 컴포넌트가 있다고 가정해보세요:

먼저, 다음 내용으로 components/Button.module.css 파일을 생성하세요:

```css
/*
.error {}가 다른 `.css` 또는 `.module.css` 파일과 충돌할 걱정은 없습니다!
*/
.error {
  color: white;
  background-color: red;
}
```

그런 다음, 위 CSS 파일을 import하여 사용하는 components/Button.js 파일을 생성하세요:

<div class="content-ad"></div>

```js
import styles from "./Button.module.css";

export function Button() {
  return (
    <button
      type="button"
      // "error" 클래스가 가져온 `styles` 객체의 속성으로 접근되는 방법을 주의하세요.
      className={styles.error}
    >
      파괴하기
    </button>
  );
}
```

CSS 모듈은 선택적인 기능이며, `.module.css` 확장자를 가진 파일에서만 활성화됩니다. 일반 `link` 스타일시트와 글로벌 CSS 파일은 여전히 지원됩니다.

생산 환경에서는 모든 CSS 모듈 파일이 자동으로 많은 압축된 상태로 결합되어 많은 `.css` 파일로 분할됩니다. 이 `.css` 파일들은 애플리케이션의 핫 실행 경로를 나타내며, 애플리케이션이 렌더링되기 위해 로드되는 CSS 양을 최소화합니다.

## 글로벌 스타일들

<div class="content-ad"></div>

애플리케이션에 스타일시트를 추가하려면 pages/\_app.js 내에서 CSS 파일을 가져와야 합니다.

예를 들어, 다음과 같이 styles.css라는 스타일시트를 고려해 보세요:

```js
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica','Arial', sans-serif;
  padding: 20px 20px 60px;
  max-width: 680px;
  margin: 0 auto;
}
```

pages/\_app.js 파일을 만들어서 없다면 추가하세요. 그런 다음 styles.css 파일을 가져오세요.

<div class="content-ad"></div>

```js
import "../styles.css";

// 이 기본 내보내기는 새로운 `pages/_app.js` 파일에서 필요합니다.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

이 스타일(styles.css)은 애플리케이션의 모든 페이지와 구성 요소에 적용됩니다. 스타일시트의 전역적인 특성 및 충돌을 피하기 위해, 페이지/\_app.js 내에서만 가져올 수 있습니다.

개발 중에 이렇게 스타일시트를 표현하는 것은 스타일을 편집하는 동안 스타일이 열심히 다시로드되어 응용 프로그램 상태를 유지할 수 있음을 의미합니다.

프로덕션에서 모든 CSS 파일은 자동으로 하나의 압축된 .css 파일로 연결됩니다. CSS를 연결하는 순서는 CSS가 \_app.js 파일에 가져올 때의 순서와 일치합니다. 자체 CSS를 포함하는 가져온 JS 모듈에 특별히 주의를 기울일 필요가 있습니다; JS 모듈의 CSS는 가져온 CSS 파일과 동일한 순서 규칙에 따라 연결됩니다. 예를 들어:

<div class="content-ad"></div>

```js
import "../styles.css";
// ErrorBoundary에있는 CSS는 전역 CSS인 styles.css에 따라 달라지므로
// styles.css를 가져온 후에 가져옵니다.
import ErrorBoundary from "../components/ErrorBoundary";

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
```

## 외부 스타일시트

Next.js에서는 자바스크립트 파일에서 CSS 파일을 가져올 수 있습니다. Next.js는 import 개념을 자바스크립트 이상으로 확장하였기 때문에 가능합니다.

### node_modules에서 스타일 가져오기

<div class="content-ad"></div>

Next.js 9.5.4 버전부터는 CSS 파일을 node_modules에서 어디서든 import할 수 있습니다.

부트스트랩이나 nprogress와 같은 전역 스타일시트를 사용하는 경우 pages/\_app.js 파일 내에서 해당 파일을 import해야 합니다. 예를 들어:

```js
import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

서드파티 컴포넌트에서 필요한 CSS를 import하려면 해당 컴포넌트에서 직접 처리할 수 있습니다. 예를 들어:

<div class="content-ad"></div>

```js
import { useState } from "react";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";

function ExampleDialog(props) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <button onClick={open}>대화 상자 열기</button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>닫기</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <p>안녕하세요. 저는 대화 상자입니다.</p>
      </Dialog>
    </div>
  );
}
```

## 추가 기능

Next.js에는 스타일을 추가하는 작성 경험을 향상시키는 추가 기능이 포함되어 있습니다:

- next dev로 로컬로 실행할 때, 로컬 스타일시트(글로벌 또는 CSS 모듈)는 Fast Refresh를 활용하여 편집을 저장할 때 즉시 변경 사항을 반영합니다.
- next build로 프로덕션 빌드할 때, CSS 파일은 미니파이된 .css 파일로 번들링되어 네트워크 요청 수를 줄이기 위해 더 적은 수의 파일로 묶입니다.
- JavaScript를 비활성화하면 스타일은 여전히 프로덕션 빌드(next start)에서 로드됩니다. 그러나 Fast Refresh를 활성화하려면 JavaScript가 next dev에 필요합니다.

<div class="content-ad"></div>
