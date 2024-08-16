---
title: "Nextjs 14에서 font module 사용 하는 방법"
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





# Nextjs 14에서 font module 사용 하는 방법

이 API 참조는 next/font/google 및 next/font/local을 사용하는 방법을 이해하는 데 도움이 될 것입니다. 기능과 사용법은 글꼴 최적화 페이지를 참조해 주세요.

### 글꼴 기능 인수

사용법은 Google 글꼴 및 로컬 글꼴을 검토해 주세요.

<div class="content-ad"></div>

### 키

폰트 로더 함수가 호출되는 디렉토리를 기준으로 한 문자열 또는 객체 배열(`{path: string, weight?: string, style?: string}` 유형)의 경로(문자열 또는 객체 배열)입니다.

Used in next/font/local

<div class="content-ad"></div>

- 필수 항목

예시:

- src:`./fonts/my-font.woff2` 여기서 my-font.woff2은 앱 디렉토리 내에 위치한 fonts라는 디렉토리에 있습니다.
- src:[{path: `./inter/Inter-Thin.ttf`, weight: `100`},{path: `./inter/Inter-Regular.ttf`, weight: `400`},{path: `./inter/Inter-Bold-Italic.ttf`, weight: `700`, style: `italic`}]
- 폰트 로더 함수가 src:`../styles/fonts/my-font.ttf`을 사용하여 app/page.tsx에서 호출되었을 때, 여기서 my-font.ttf은 프로젝트 루트에 styles/fonts에 위치해야 합니다.

### weight

<div class="content-ad"></div>

다음과 같은 가능성을 가진 글꼴 두께:

- 특정 글꼴용으로 사용 가능한 두께 값 또는 변수일 경우 값의 범위를 가진 문자열
- 글꼴이 변수가 아닌 경우 가중치 값의 배열 Google 글꼴
  . 다음/글꼴/구글 에만 적용됩니다.

다음/글꼴/구글 및 다음/글꼴/로컬 에 사용됩니다.

- 사용 중인 글꼴이 변수가 아닌 경우 필수입니다.

<div class="content-ad"></div>

예시:

- weight: `400`: Inter 폰트의 단일 무게 값에 대한 문자열입니다. 가능한 값은 `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900` 또는 `variable`이며, `variable`은 기본값입니다.
- weight: `100 900`: 변수 글꼴의 100부터 900까지의 범위에 대한 문자열입니다.
- weight: [`100`,`400`,`900`]: 비 변수 글꼴의 3가지 가능한 값 배열입니다.

### style

폰트 스타일
다음과 같은 가능성을 가집니다:

<div class="content-ad"></div>

- 기본값이 `normal`인 문자열 값
- 폰트가 변수가 아닌 경우의 스타일 값 배열
  다음/font/google에서만 적용됩니다.

  next/font/google 및 next/font/local에서 사용됩니다.

- 선택적 요소

예시:

<div class="content-ad"></div>

- style: `italic`: 문자열 - 다음/font/google의 경우 일반 또는 이탤릭체일 수 있습니다
- style: `oblique`: 문자열 - 다음/font/local의 경우 어떤 값을 사용해도 되지만 표준 글꼴 스타일에서 가져온 것으로 예상됩니다
- style: [`italic`,`normal`]: 다음/font/google의 2개 값으로 구성된 배열 - 값은 일반 및 이탤릭체에서 가져옵니다

### 하위 집합

글꼴 하위 집합은
각 세트 이름의 문자열 값 배열로 정의된다. preload 옵션이 true인 경우 preload 태그가 head에 삽입됩니다. 기본값은 true입니다. subsets를 통해 지정된 글꼴은 preload 옵션이 true인 경우 head에 링크 preload 태그가 삽입됩니다.

다음/font/google에서 사용됩니다

<div class="content-ad"></div>

- 옵션

예시:

- 하위 집합: [`latin`]: 라틴 서브셋이 포함된 배열

폰트의 Google Fonts 페이지에서 모든 하위 집합의 목록을 찾을 수 있어요.

<div class="content-ad"></div>

### 축

일부 변수 글꼴에는 포함할 수 있는 추가 축이 있을 수 있습니다. 기본적으로 글꼴 무게만 포함되어 파일 크기를 줄입니다. 축의 가능한 값은 특정 글꼴에 따라 다릅니다.

다음 글꼴/구글에서 사용

- 선택사항

<div class="content-ad"></div>

예시:

- axes: [`slnt`]: Inter 변수 글꼴의 추가 축으로 slnt 값을 가진 배열입니다. 가능한 축 값을 구글 변수 글꼴 페이지의 필터를 사용하여 확인하고 wght 외의 축을 찾을 수 있습니다.

### display

폰트 디스플레이는 가능한 문자열 값 중 `auto`, `block`, `swap`, `fallback` 또는 `optional`을 가집니다. 기본 값은 `swap`입니다.

<div class="content-ad"></div>

Used in next/font/google 및 next/font/local

- 선택 사항

예시:

- display: `optional`: optional 값에 할당된 문자열

<div class="content-ad"></div>

### preload

폰트를 미리 로드해야 하는지 여부를 지정하는 부울 값입니다. 기본값은 참입니다.

다음과 같은 곳에서 사용됩니다: next/font/google 및 next/font/local

- 선택 사항

<div class="content-ad"></div>

예시:

- preload: false

### 대체

만약 글꼴을 불러올 수 없을 때 사용할 대체 글꼴입니다. 기본값 없이 대체 글꼴의 문자열 배열입니다.

<div class="content-ad"></div>

- 선택 사항

다음/font/google 및 다음/font/local에서 사용됩니다.

예시:

- 대체: [`system-ui`, `arial`]: 시스템 글꼴 또는 arial로 대체 글꼴을 설정하는 배열

<div class="content-ad"></div>

### adjustFontFallback

- For next/font/google: 누적 레이아웃 이동을 줄이기 위해 자동 대체 폰트를 사용해야 하는지 설정하는 부울 값입니다. 기본값은 true입니다.
- For next/font/local: 누적 레이아웃 이동을 줄이기 위해 자동 대체 폰트를 사용해야 하는지 설정하는 문자열 또는 부울 false 값입니다. 가능한 값은 `Arial`, `Times New Roman` 또는 false입니다. 기본값은 `Arial`입니다.

next/font/google 및 next/font/local에서 사용됩니다.

- 선택 사항

<div class="content-ad"></div>

예시:

- adjustFontFallback: false: for next/font/google
- adjustFontFallback: `Times New Roman`: for next/font/local

### 변수

CSS 변수 방식으로 스타일이 적용될 경우 사용할 CSS 변수 이름을 정의하는 문자열 값입니다.

<div class="content-ad"></div>

다음/font/google 및 next/font/local에 사용됩니다

- 선택 사항

예시:

- 변수: `--my-font`: CSS 변수 `--my-font`이 선언됨

<div class="content-ad"></div>

### 선언사항

생성된 @font-face를 정의하는 키-값 쌍 배열로 구성된 폰트 페이스 서술자입니다.

다음/폰트/로컬에서 사용됩니다.

- 선택 사항

<div class="content-ad"></div>

예시:

- declarations: [{ prop: `ascent-override`, value: `90%` }]

## 스타일 적용

폰트 스타일을 적용하는 방법은 세 가지가 있어요:

<div class="content-ad"></div>

- className
- style
- CSS 변수

### className

로드된 글꼴에 대한 읽기 전용 CSS className을 반환하여 HTML 엘리먼트로 전달할 수 있습니다.

```js
<p className={inter.className}>Hello, Next.js!</p>
```

<div class="content-ad"></div>

### 스타일

로드된 글꼴에 대한 읽기 전용 CSS 스타일 객체를 반환하여 HTML 요소에 전달합니다. 이 객체에는 fontFamily 스타일, 폰트 패밀리 이름 및 대체 글꼴에 액세스할 수 있습니다.

```js
<p style={inter.style}>Hello World</p>
```

### CSS 변수

<div class="content-ad"></div>

만일 외부 스타일 시트에서 스타일을 설정하고 추가 옵션을 지정하고 싶다면, CSS 변수 방법을 사용하세요.

글꼴을 가져오는 것 외에도 CSS 변수가 정의된 CSS 파일을 가져와서 글꼴 로더 객체의 변수 옵션을 다음과 같이 설정해야 합니다:

```typescript
import { Inter } from "next/font/google";
import styles from "../styles/component.module.css";

const inter = Inter({
  variable: "--font-inter",
});
```

글꼴을 사용하려면, 텍스트를 스타일링 하고 싶은 부모 컨테이너의 className을 글꼴 로더의 변수 값으로, 텍스트의 className을 외부 CSS 파일의 styles 속성으로 설정하세요.

<div class="content-ad"></div>

```typescript
<main className={inter.variable}>
  <p className={styles.text}>안녕하세요, 세계</p>
</main>
```

다음과 같이 component.module.css CSS 파일에 텍스트 셀렉터 클래스를 정의합니다.

```js
.text {
  font-family: var(--font-inter);
  font-weight: 200;
  font-style: italic;
}
```

위 예시에서는 "Hello World" 텍스트가 Inter 글꼴을 사용하여 스타일이 적용되며 font-weight: 200 및 font-style: italic로 생성된 폰트 폴백이 적용됩니다.

<div class="content-ad"></div>

## 글꼴 정의 파일 사용하기

`localFont` 또는 `Google font` 함수를 호출할 때마다 해당 글꼴이 귀하의 애플리케이션에서 하나의 인스턴스로 호스팅됩니다. 따라서 여러 곳에서 동일한 글꼴을 사용해야 하는 경우, 한 곳에서 해당 글꼴을로드하고 필요한 위치에서 해당 글꼴 객체를 가져와야 합니다. 이는 글꼴 정의 파일을 사용하여 수행됩니다.

예를 들어, 앱 디렉토리의 루트에 있는 styles 폴더에 fonts.ts 파일을 만듭니다.

그런 다음, 아래와 같이 글꼴 정의를 지정합니다:

<div class="content-ad"></div>

```typescript
import { Inter, Lora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

// 변수 글꼴을 정의합니다.
const inter = Inter();
const lora = Lora();
// 변수 글꼴을 사용하여 2개의 무가변 글꼴 두꺼운 정도를 정의합니다.
const sourceCodePro400 = Source_Sans_3({ weight: "400" });
const sourceCodePro700 = Source_Sans_3({ weight: "700" });
// GreatVibes-Regular.ttf 글꼴이 styles 폴더에 저장된 사용자 정의 로컬 글꼴을 정의합니다.
const greatVibes = localFont({ src: "./GreatVibes-Regular.ttf" });

export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes };
```

위의 정의를 다음과 같이 코드에서 사용할 수 있습니다:

```typescript
import { inter, lora, sourceCodePro700, greatVibes } from "../styles/fonts";

export default function Page() {
  return (
    <div>
      <p className={inter.className}>인터 글꼴을 사용한 Hello world</p>
      <p style={lora.style}>Lora 글꼴을 사용한 Hello world</p>
      <p className={sourceCodePro700.className}>두꺼운 정도가 700인 Source_Sans_3 글꼴을 사용한 Hello world</p>
      <p className={greatVibes.className}>Great Vibes 글꼴 제목</p>
    </div>
  );
}
```

코드에서 글꼴 정의를 쉽게 액세스하도록 하려면 tsconfig.json 또는 jsconfig.json 파일에서 다음과 같이 경로 별칭을 정의할 수 있습니다:

<div class="content-ad"></div>

```js
{
  "compilerOptions": {
    "paths": {
      "@/fonts": ["./styles/fonts"]
    }
  }
}
```

이제 다음과 같이 어떤 글꼴 정의든 가져올 수 있습니다:

```typescript
import { greatVibes, sourceCodePro400 } from "@/fonts";
```

## 버전 변경

<div class="content-ad"></div>

| Version   | Changes                                                               |
| --------- | --------------------------------------------------------------------- |
| `v13.2.0` | `@next/font` renamed to `next/font`. Installation no longer required. |
| `v13.0.0` | `@next/font` was added.                                               |

<div class="content-ad"></div>
