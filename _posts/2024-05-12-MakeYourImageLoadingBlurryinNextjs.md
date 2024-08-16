---
title: "Nextjs에서 이미지 로딩을 흐릿하게 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-MakeYourImageLoadingBlurryinNextjs_0.png"
date: 2024-05-12 20:06
ogImage: 
  url: /assets/img/2024-05-12-MakeYourImageLoadingBlurryinNextjs_0.png
tag: Tech
originalTitle: "Make Your Image Loading Blurry in Next.js"
link: "https://medium.com/@Furki4_4/make-your-image-loading-blurry-in-next-js-0f0e5bf3dc7c"
isUpdated: true
---




웹 이미지는 사이트 성능 측면에서 중요하며 솔직히 말하자면 번거로운 부분이기도 합니다. Next.js의 최고의 기능 중 하나는 이미지 컴포넌트로, 이미지를 최적화해 줍니다. 이 컴포넌트는 화면 크기에 맞춰 WebP와 같은 현대적인 포맷의 이미지를 자동으로 생성하여 이미지 크기를 줄여줍니다. 또한 이미지가 뷰포트에 진입할 때 이미지를 불러오는 lazy loading과 레이아웃 이동을 방지하는 시각적 안정성이 구현되어 있습니다. 만약 이미지 컴포넌트에 익숙하지 않다면 Lee Robinson의 이 비디오를 추천합니다. 이 글에서는 실제 이미지가 로드되는 동안 흐린 이미지를 추가하는 것에 초점을 맞추고자 합니다.

## 이미지 컴포넌트의 기본 이미지 흐림

이미지 컴포넌트에는 한 가지 제한이 있지만, 기본 옵션으로 이미지를 흐리게 만들어 줄 수도 있습니다! 제 포트폴리오 웹사이트에서 한 예시를 보여드리겠습니다.

기본 로딩보다 훨씬 나아요. 앞서 언급한 대로 한 가지 제한이 있습니다: 이미지를 정적으로 가져와야 합니다. 특히 이미지 동적 또는 클라우드 서비스를 사용하는 경우에는 이미지를 정적으로 가져오는 것이 불가능할 수 있습니다. 이 제한을 다음 기술에서 극복하겠지만, 지금은 이 기본 흐린 이미지를 가능하게 하는 코드를 살펴보도록 하죠.



```js
import furkanpicture from "@/public/pics/furkan.png";
import Image from "next/image";
import React from "react";

export default function AboutImage() {
  return (
    <figure>
      <Image
        src={furkanpicture}
        alt={"Furkan Cengiz"}
        placeholder="blur" //기본값은 "empty"입니다
      />
    </figure>
  );
}
```

placeholder prop을 blur로 전달하고 src prop을 정적으로 가져온 이미지 개체로 전달할 때 Image 컴포넌트는 비디오에서 보는 것처럼 흐린 이미지를 생성합니다! 정적 페이지나 웹사이트를 구축 중이라면 기본적인 블러 동작을 활용할 수 있습니다!

## Plaiceholder를 사용하여 dataURL 생성하기

정적 이미지를 사용하는 경우 로딩 상태에 대한 흐린 이미지를 추가할 수 있습니다. 이제 이전 방법의 한계를 극복해야 합니다.




문서에 따르면 동적 이미지를 위해 Image 컴포넌트의 blurDataUrl 속성에 dataURL을 전달해야 합니다. dataURL은 기본적으로 base64 형식으로 흐린 이미지 데이터를 보유하는 문자열입니다.

```js
dataURL 예시
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC
```

우리는 이제 무엇이 필요한지 알았지만, 이렇게 데이터URL을 생성하는 방법이 무엇인지 궁금할 것입니다. 문서에서 제안한대로, plaiceholder는 이를 가능하게 해줍니다!

우선, sharp와 plaiceholder 두 가지 패키지를 설치해야 합니다. 설치 방법은 이 페이지를 참고해주세요.



Next.js를 사용하고 있다고 가정합니다. 다음 페이지를 따라서 next.config.ts 또는 next.config.mjs 파일을 구성해 주세요.

설치가 완료되었습니다! 이제 서버 측에서 실행되는 사용자 정의 함수를 구현해야 합니다. 이 함수는 우리가 필요한 데이터URL을 생성합니다.

```js
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (imgPath: string) => {
  try {
    const file = await fs.readFile(`public/${imgPath}`)
    const { base64 } = await getPlaiceholder(file)
    return base64
  } catch (error: unknown) {
    // 에러 처리
    if (error instanceof Error) return error.message
    else if (error && typeof error === "object" && "message" in error)
      return error.message as string
    else if (typeof error === "string") return error;
    else return "예기치 않은 오류 발생!"
  }
}
```

저는 문서에서처럼 then 또는 catch 메서드 대신 async-await 키워드를 사용하여 구현했습니다. getPlaiceholder 함수가 필요한 파일을 읽어야 합니다. 파일 경로에 "public" 접두사를 추가했습니다. 그런 다음 파일을 getPlaiceholder 함수에 전달했습니다. 이 함수는 css, color, pixels, base64 등과 같은 여러 객체를 반환합니다. 반환된 객체를 비구조화하여 base64 값을 추출하고 반환하세요!



필요한 데이터URL을 생성하는 함수가 완성되었습니다. 이제 중요한 마지막 단계가 나왔어요!

## getBase64 함수 사용하기

함수에서 node:fs/promises를 가져오는 함수를 통해 파일을 읽었음을 알 수 있어요. 이는 이 함수가 노드 환경에서만 실행될 수 있다는 뜻이에요. 그러므로, 클라이언트 구성 요소에서 이 함수를 사용할 수는 없다는 점을 명심하는 것이 중요해요. 그치만 걱정할 필요는 아직 없어요. 왜냐하면 서버 구성 요소는 있거든요. 클라이언트 구성 요소에서 이 함수를 사용할 수 없더라도, 여전히 서버 구성 요소에서 이 async 함수를 호출하고 반환된 값을 클라이언트 구성 요소로 전달할 수 있어요.

저의 포트폴리오 프로젝트에서 예제를 확인할 수 있어요. (이미 서버 구성 요소에서 이미지 구성 요소를 사용 중이라면, 이 마지막 단계는 필요하지 않아요. 클라이언트 구성 요소에 base64 문자열을 blurDataUrl 속성에 전달하려면 단순히 구성 요소를 async로 만들고 함수를 호출하면 됩니다.)



위의 코드에서 여러 개의 base64 문자열을 생성하고 각각의 클라이언트 컴포넌트로 전달하고 있어요. (개별 이미지의 경로 문자열을 getBase64 함수에 전달하고 기다리면 단일 base64 문자열을 생성할 수 있어요)

그래서 지금 우리는 흐린 이미지를 준비했어요!



마지막으로, 플레이스홀더를 사용하여 SVG 및 색상과 같은 다른 기술을 활용할 수 있습니다. 그 외에도 시도해 볼 수 있는 기술이 많으니 플레이스홀더의 데모를 방문해 모든 기술을 확인해보세요.

로딩 상태에서 흐릿한 이미지는 정말 좋아하는 기술입니다. 많은 웹사이트와 심지어 Discord와 같은 Windows 애플리케이션이 사용하는 기술인데, 우아함의 요소를 더해준다고 생각합니다. 이 기사가 도움이 되었으면 좋겠어요. 제 최신 작업 소식을 받아보려면 Medium이나 LinkedIn에서 팔로우해주세요. 다음 글에서 뵙길 기대하겠습니다!