---
title: "Nextjs에서 Tailwind와 Swiper로 썸네일 슬라이더 만드는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-CreatingaThumbnailSliderinNextjswithTailwindandSwiper_0.png"
date: 2024-07-02 21:47
ogImage:
  url: /TIL/assets/img/2024-07-02-CreatingaThumbnailSliderinNextjswithTailwindandSwiper_0.png
tag: Tech
originalTitle: "Creating a Thumbnail Slider in Next.js with Tailwind and Swiper"
link: "https://medium.com/@dadateniola/creating-a-thumbnail-slider-in-next-js-with-tailwind-and-swiper-88cd3fd67709"
---

## Next.js, Tailwind CSS, 및 Swiper를 사용하여 썸네일 슬라이더 만들기 단계별 가이드

썸네일은 더 큰 이미지의 작은 이미지 표현입니다.

썸네일 슬라이더는 클릭할 수 있는 주요 이미지와 그 아래 일련의 썸네일을 포함하는 슬라이더입니다.

위 내용을 기반으로, Next.js, Tailwind CSS, 및 Swiper를 사용하여 자체 썸네일 슬라이더를 만드는 것을 시작해보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 프로젝트 설정

우선, 새로운 Next.js 프로젝트를 설정해보세요. 터미널을 열고 다음 명령어를 실행하세요:

```js
npx create-next-app@latest
```

그런 다음에 뒤이어 나오는 프롬프트에 답변하세요. 내 개인적인 답변은 각 줄의 괄호 안에 있습니다. "Tailwind CSS"에 대해 "Yes"로 선택하는 것을 잊지 마세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
프로젝트의 이름은 무엇인가요? my-app (thumbnail-slider)

TypeScript를 사용하시겠습니까? 아니요 / 예 (예)

ESLint를 사용하시겠습니까? 아니요 / 예 (예)

Tailwind CSS를 사용하시겠습니까? 아니요 / 예 (예)

`src/` 디렉토리를 사용하시겠습니까? 아니요 / 예 (아니요)

App Router를 사용하시겠습니까? (권장) 아니요 / 예 (예)

기본 import 별칭 (@/*)을 사용자 정의하시겠습니까? 아니요 / 예 (아니요)
```

다음으로, 프로젝트 디렉토리에 들어간 후에 Swiper를 설치하세요.

```js
npm install swiper
```

# 썸네일 슬라이더 구축하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 Thumbnail Slider를 구축하기 위한 필수 구성 요소를 생성해 봅시다.

- 프로젝트 디렉토리에 components라는 새 디렉토리를 만듭니다.
- components 디렉토리 내부에 ThumbnailSlider.tsx 또는 .jsx라는 새 파일을 만듭니다(typescript를 사용하지 않는 경우).

## 필수 구성 요소 가져오기

swiper에 필요한 가져오기를 추가하는 것부터 시작해 봅시다. 아래 코드를 그대로 복사하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
"use client";

import React, { useState } from "react";
import Image from "next/image";

// Swiper React 컴포넌트 가져오기
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper 유형 가져오기
import { Swiper as SwiperType } from "swiper";

// Swiper 스타일 가져오기
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// 필요한 모듈 가져오기
import { Thumbs } from "swiper/modules";
```

설명:

- 컴포넌트 가져오기: Swiper 및 SwiperSlide는 Swiper 라이브러리의 React 모듈에서 가져옵니다. 이러한 컴포넌트는 캐러셀/슬라이더와 개별 슬라이드를 만들고 관리하는 데 사용됩니다.
- 유형 가져오기: Swiper as SwiperType은 TypeScript 유형 안전성을 위해 가져옵니다. 이를 통해 적절한 코드 지원과 오류 확인이 가능합니다.
- 스타일 가져오기: Swiper CSS 파일을 가져와서 캐러셀에 필요한 중요한 스타일을 적용합니다. 이는 네비게이션 버튼 및 썸네일 네비게이션을 포함합니다.
- Thumbs 모듈: Thumbs는 "swiper/modules"에서 가져온 것입니다. 이 모듈은 Swiper 슬라이더의 썸네일 네비게이션 기능을 제공합니다.

## 개별 컴포넌트 생성하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 썸네일 슬라이더 컴포넌트를 만들어볼 차례에요. 슬라이더 컴포넌트와 썸네일 컴포넌트와 함께 만들 것인데요, 이들은 한 컴포넌트에 모은 코드양을 줄이기 위해 분리되어 있어요.

```js
const ThumbnailSlider = ({ images }: { images: string[] }) => {
  return (
    // 메인 슬라이더와 썸네일 슬라이더를 담는 컨테이너
    <div className="w-4/5 h-4/5 flex flex-col gap-4">
      <Slider images={images} /> {/* 메인 이미지 슬라이더 */}
      <Thumbnail images={images} /> {/* 썸네일 내비게이션 슬라이더 */}
    </div>
  );
};

const Slider = ({ images }: { images: string[] }) => {
  return (
    // 메인 이미지 슬라이더 컴포넌트
    <div className="w-full h-full flex-1 overflow-hidden">
      <Swiper className="h-full" grabCursor loop>
        {/* 각 이미지 슬라이드를 만들기 위해 이미지를 반복합니다. */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* 각 슬라이드의 이미지 컴포넌트 */}
              <Image
                src={image}
                alt="slide"
                fill
                className="object-cover"
                sizes="70vw"
                priority={index === 0 && true} // 첫 번째 이미지가 우선적으로 로드되도록 합니다.
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Thumbnail = ({ images }: { images: string[] }) => {
  return (
    // 썸네일 내비게이션 슬라이더 컴포넌트
    <div className="relative flex gap-2 justify-center h-14">
      <Swiper className="w-2/4 h-full" loop slidesPerView={4} spaceBetween={8}>
        {/* 각 썸네일을 만들기 위해 이미지를 반복합니다. */}
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="rounded-md cursor-pointer border-[3px] border-solid border-transparent overflow-hidden"
          >
            <div className="relative w-full h-full">
              {/* 썸네일 이미지 컴포넌트 */}
              <Image src={image} alt="thumbnail" fill className="object-cover" sizes="100px" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbnailSlider;
```

## 슬라이더와 썸네일 컴포넌트 연결하기

여기까지 오면 썸네일 슬라이더는 거의 완성되었어요. 유일한 문제는 현재 각각 따로 움직인다는 것이죠. 하지만 우리가 원하는 것은 이들이 연결된 것처럼 함께 움직이도록 하는 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이를 달성하기 위해 ThumbnailSlider 컴포넌트에 다음을 추가할 것입니다:

```js
const [thumbsSwiper, setThumbsSwiper] = (useState < SwiperType) | (null > null);
```

그런 다음 이를 Slider 및 Thumbnail 컴포넌트로 props로 전달하세요.

```js
<Slider images={images} thumbs={ thumbsSwiper, setThumbsSwiper } />
<Thumbnail images={images} thumbs={ thumbsSwiper, setThumbsSwiper } />
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

물론, Slider 및 Thumbnail 컴포넌트에 새로운 속성(props)을 전달하고 있기 때문에 해당 코드를 업데이트해야 합니다.

Typescript를 사용 중이라면, 다음과 같이 타입 안전성을 위한 인터페이스를 붙여넣으세요:

```js
interface SliderProps {
  images: string[];
  thumbs: {
    thumbsSwiper: SwiperType | null,
    setThumbsSwiper: React.Dispatch<React.SetStateAction<SwiperType | null>>,
  };
}
```

이제 정의한 상태를 사용하도록 Slider 및 Thumbnail 컴포넌트를 편집해 보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

슬라이더 컴포넌트에서 다음 작업을 수행하십시오:

```js
const Slider = ({ images, thumbs }: SliderProps) => {
  const { thumbsSwiper } = thumbs;

  return (
    <div className="w-full h-full flex-1 overflow-hidden">
      {/* 이미지 슬라이더용 주 스와이퍼 컴포넌트 */}
      <Swiper
        className="h-full"
        grabCursor
        loop

        thumbs={{ swiper: thumbsSwiper }} // 메인 슬라이더를 썸네일 싱크를 위해 썸네일 스와이퍼에 연결
        modules={[Thumbs]} // 썸네일 탐색을 위해 Thumbs 모듈을 활성화
      >
       // 이전 코드를 여기에 추가하세요...
      </Swiper>
    </div>
```

썸네일 컴포넌트에서 다음 작업을 수행하십시오:

```js
const Thumbnail = ({ images, thumbs }: SliderProps) => {
  const { setThumbsSwiper } = thumbs;

  return (
    <div className="relative flex gap-2 justify-center h-14">
      {/* 썸네일 탐색용 스와이퍼 컴포넌트 */}
      <Swiper
        className="w-2/4 h-full"
        loop
        slidesPerView={4} // 한 뷰 당 썸네일 수
        spaceBetween={8} // 썸네일 간 간격
        onSwiper={setThumbsSwiper} // 컴포넌트가 마운트될 때 썸네일 스와이퍼 설정
        freeMode // 스냅 포인트 없이 자유롭게 슬라이딩 허용
        watchSlidesProgress // 썸네일의 슬라이드 진행 상황을 감시
      >
        // 이전 코드를 여기에 추가하세요...
      </Swiper>
    </div>
  );
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 활성 썸네일 요소 스타일링

지금은 섬네일 슬라이더가 제대로 작동해야 하지만, 현재 활성화된 썸네일을 강조하고 싶다면 globals.css 파일을 /app 디렉토리에서 열어서 다음 CSS 코드를 추가할 수 있어요:

```js
.swiper-slide-thumb-active {
    border-color: black;
}
```

## 썸네일 슬라이더 컴포넌트 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

최종적으로 코드에서 썸네일 슬라이더를 사용하려면 간단히 가져와서 다음과 같이 호출하면 됩니다:

```js
import ThumbnailSlider from "@/components/ThumbnailSlider";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <ThumbnailSlider images={images} />
    </main>
  );
}
```

썸네일 슬라이더가 작동하려면 이미지 URL을 나타내는 문자열 배열을 제공해야 합니다. 아래는 그 예시입니다:

```js
// 별칭을 사용하여 components 디렉토리에서 ThumbnailSlider 컴포넌트 가져오기
import ThumbnailSlider from "@/components/ThumbnailSlider";

// 홈 페이지를 위한 기본 함수 컴포넌트
export default function Home() {
  // 동적으로 생성된 이미지 URL 배열
  const images = Array(4)
    .fill(null)
    .map((_, index) => `/random/image (${index + 1}).png`);

  // 주요 콘텐츠 영역 렌더링
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {/* 동적으로 생성된 이미지를 사용하여 ThumbnailSlider 컴포넌트 렌더링 */}
      <ThumbnailSlider images={images} />
    </main>
  );
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 글을 읽어주셔서 정말 감사합니다! 😊
만약 이 글이 도움이 되었다면 반드시 박수를 치고 팔로우해주세요! 👏
