---
title: "5가지 팁과 트릭으로 Nextjs 14와 함께 더 쉽게 살아가는 방법"
description: ""
coverImage: "/assets/img/2024-05-13-5TipsandTricksToMakeYourLifeWithNextjs14Easier_0.png"
date: 2024-05-13 00:27
ogImage: 
  url: /assets/img/2024-05-13-5TipsandTricksToMakeYourLifeWithNextjs14Easier_0.png
tag: Tech
originalTitle: "5 Tips and Tricks To Make Your Life With Next.js 14 Easier"
link: "https://medium.com/@aryalskanda1/5-tips-and-tricks-to-make-your-life-with-next-js-14-easier-f272bb52537e"
isUpdated: true
---




![이미지](/assets/img/2024-05-13-5TipsandTricksToMakeYourLifeWithNextjs14Easier_0.png)

Next.js 14은 서버 렌더링된 React 애플리케이션을 구축하는 프로세스를 간단화하는 강력한 React 프레임워크입니다. 그러나 고급 기능과 규칙 때문에 특히 이 프레임워크에 처음 접하는 개발자들에게 혼란과 모호함이 있을 수 있습니다. 이 블로그 포스트에서는 Next.js 14를 사용하여 일상을 더 편리하게 만드는 다섯 가지 팁과 요령을 살펴보겠습니다.

## 팁 1: Next.js 이미지 작업

Next.js에서 이미지 처리는 혼란스러운 부분입니다. 로컬 이미지 또는 원격 이미지와 작업하는 방법은 다르기 때문입니다.



# 로컬 이미지

로컬 이미지를 사용할 때는 너비와 높이를 지정할 필요가 없어요. Next.js가 자동으로 이미지 크기를 확인합니다. 이미지를 가져와 `next/image` 컴포넌트를 사용해 렌더링하세요.

```js
import Image from "next/image";
import localImage from "public/hoy.png";
export default function MyComponent() {
  return <Image src={localImage} alt="로컬 이미지" />;
}
```



# 원격 이미지

![Remote Image](/assets/img/2024-05-13-5TipsandTricksToMakeYourLifeWithNextjs14Easier_2.png)

원격 이미지를 사용할 때는 레이아웃 변동을 방지하기 위해 블러 플레이스홀더를 제공하고 너비와 높이를 지정해야 합니다. `placeholder="blur"` 속성을 사용하여 이미지의 완전한 버전이 로드될 때까지 이미지의 흐린 버전을 표시할 수 있습니다.

원격 이미지의 블러 데이터 URL을 생성하려면 `sharp` 및 `placeholder` 패키지를 사용할 수 있습니다:



```js
import Image from "next/image";
import getBase64 from "./utils/getBase64";
export default async function MyComponent() {
  const blurDataUrl = await getBase64(remoteImageUrl);
  return (
    <Image
      src={remoteImageUrl}
      width={600}
      height={600}
      alt="Remote Image"
      placeholder="blur"
      blurDataURL={blurDataUrl}
    />
  );
}
```

`getBase64` 유틸리티 함수는 원격 이미지를 가져와 ArrayBuffer로 변환한 다음 `placeholder` 패키지를 사용하여 해당 이미지의 base64 표현을 생성합니다.

# 팁 2: 환경 변수 처리

환경 변수를 `next.config.env.NEXT_PUBLIC_*`로 표시할 때 주의하십시오. 이러한 변수는 브라우저에서 노출되며 JavaScript 번들에 포함됩니다. 민감한 API 키나 비밀 정보가 있는 경우 `NEXT_PUBLIC_`로 접두사를 붙이지 않도록 주의하십시오. Node.js 환경에서만 사용할 수 있게 됩니다.



# 팁 3: Next.js에서 캐싱 이해하기

![이미지](/assets/img/2024-05-13-5TipsandTricksToMakeYourLifeWithNextjs14Easier_3.png)

Next.js의 캐싱 동작은 개발 환경과 프로덕션 환경에서 다릅니다. 개발 모드에서는 기본적으로 페이지가 동적으로 매 요청마다 렌더링됩니다. 그러나 프로덕션 모드에서는 Next.js가 페이지를 정적으로 렌더링하려고 시도합니다.

프로덕션에서 캐싱을 제어하려면 `revalidate` 옵션을 사용하거나 페이지를 명시적으로 `dynamic`으로 표시할 수 있습니다.



```js
// 매 5초마다 다시 유효성 검사
export const revalidate = 5
// 동적 렌더링 강제
export const dynamic = 'force-dynamic'
```

# 팁 4: 서버 컴포넌트에서 데이터 가져오기

서버 컴포넌트의 데이터를 가져오기 위해 API 라우트 핸들러를 사용하는 것을 피하십시오. 대신 서버 컴포넌트 내에서 데이터를 직접 가져오세요. 이 방법을 통해 Next.js가 여러 서버 컴포넌트 사이에서 데이터의 캐싱 및 재사용을 최적화할 수 있습니다.

만약 여러 컴포넌트 사이에서 동일한 데이터 가져오기 로직을 재사용해야 한다면, `server/` 디렉토리에 서버 액션을 생성하는 것을 고려해보세요.



```js
export async function getJoke() {
  const res = await fetch("https://api.example.com/joke");
  const data = await res.json();
  if (res.ok) {
    return { success: true, joke: data.joke };
  } else {
    return { error: data.error };
  }
}
// app/page.jsx
import { getJoke } from "../server/actions";
export default async function Page() {
  const { success, joke, error } = await getJoke();
  if (success) {
    return <div>{joke}</div>;
  } else {
    throw new Error(error);
  }
}
```

# Tip 5: 클라이언트 및 서버 구성 요소 이해하기

기본적으로 Next.js의 페이지는 서버 구성 요소입니다. 서버 구성 요소 내에서 클라이언트 구성 요소를 렌더링하여 상호작용성을 추가할 수 있습니다.

```js
"use client";
import { useState } from "react";
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```



클라이언트 컴포넌트 내에 렌더링된 자식 컴포넌트는 '사용 클라이언트' 지시문이 필요 없이 자동으로 클라이언트 컴포넌트가 됩니다.

프로바이더(예: 테마 제공자)를 사용할 때는 레이아웃에서 프로바이더로 자식 컴포넌트를 감싸면 자식 컴포넌트는 여전히 서버 컴포넌트로 렌더링됩니다.

```js
// app/layout.jsx
import { ThemeProvider } from "your-theme-library";
export default function RootLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

# 결론



Next.js 14은 서버 렌더링된 React 애플리케이션의 개발을 최적화하는 강력하고 기능이 풍부한 프레임워크입니다. 새로운 개념과 규칙이 소개되었지만, 이 블로그 포스트에서 안내된 꿀팁과 요령을 따르면 혼동과 모호함이 발생할 수 있는 부분을 잘 헤쳐나갈 수 있을 거예요.

이미지 사용 방법, 환경 변수 처리, 캐싱 관리, 서버 컴포넌트에서 데이터 가져오기, 그리고 클라이언트 및 서버 컴포넌트 간의 차이 등을 이해하면 Next.js 14로 튼튼하고 효율적인 애플리케이션을 개발하는 데 능숙해질 거예요.

기술을 마스터하는 데 있어서 연습과 경험은 중요합니다. Next.js 문서를 탐험하고 커뮤니티 포럼에 참여하며 프레임워크의 기능을 실험해보면 보다 깊이 있는 이해를 다질 수 있을 거예요.