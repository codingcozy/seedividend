---
title: "Nextjs에서 Image로 이미지 처리 최적화하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Optimizing Image Handling in Nextjs with the Image Component"
link: "https://medium.com/@gabrielairiart.gi/optimizing-image-handling-in-next-js-with-the-image-component-fcf221b18a0b"
---



![OptimizingImageHandlinginNextjswiththeImageComponent_0](/assets/img/OptimizingImageHandlinginNextjswiththeImageComponent_0.png)

웹 애플리케이션을 개발할 때 이미지를 효율적으로 관리하는 것이 성능과 사용자 경험에 중요합니다. Next.js는 `Image` 컴포넌트를 통해 이 프로세스를 간소화할 수 있는 강력한 솔루션을 제공합니다. 이 컴포넌트는 전통적인 HTML `img` 태그의 기능을 확장하고 여러 가지 최적화와 개선 사항을 도입합니다.

# 이미지 최적화의 필요성

전형적인 Next.js 환경에서 이미지와 같은 정적 자산은 최상위 /public 디렉토리에 저장되어 애플리케이션 전반에 걸쳐 쉽게 액세스할 수 있습니다. 표준 HTML에서 이미지는 다음과 같이 포함됩니다:

<div class="content-ad"></div>

```js
<img src="/kitty.png" alt="A cute kitten sitting on a desk" />
```

이렇게 이미지를 관리하는 것은 수동으로 다음을 해야 합니다:

- 이미지를 다양한 화면 크기에 맞추기
- 다른 기기에 대한 이미지 크기 정의
- 이미지 로드 중 컨텐츠 이동 방지
- 뷰포트에 바로 보이지 않는 이미지에 대해 레이지 로딩 구현

이미지 최적화 고려는 웹 개발의 중요한 측면이므로 이러한 프로세스를 자동화하는 것이 효율성과 성능을 크게 향상시킬 수 있습니다.

<div class="content-ad"></div>

# 향상된 `<Image>` 컴포넌트

Next.js의 `Image` 모듈은 `img`를 대체하는 것뿐만 아니라 자동 이미지 처리를 제공하는 개선 사항입니다. 이는 다음과 같은 기능을 포함합니다:

- 이미지 로딩시 레이아웃을 자동으로 안정화하여 콘텐츠 이동을 방지합니다.
- 이미지 크기를 뷰어 디바이스에 맞게 조정하여 불필요한 데이터 전송을 줄입니다.
- 이미지를 필요한 시점에만 로드하도록 하는 기본적인 레이지 로딩을 제공하여 뷰포트에서만 이미지가 표시될 때에만 로드합니다.
- 브라우저가 해당 형식을 지원할 때 WebP 및 AVIF 같은 고급 형식의 이미지를 제공하여 로딩 시간과 대역폭 사용을 최적화합니다.

# `<Image>`를 사용한 반응형 이미지 구현

<div class="content-ad"></div>

이미지 모듈을 효과적으로 배포하는 방법에 대해 알아봅시다. 데스크톱 및 모바일 화면을 위한 구별된 이미지(kitty-desktop.png 및 kitty-mobile.png)가 있다고 가정하고 다음과 같이 구현할 수 있습니다:

```js
import Image from "next/image";

export default function ResponsiveKittyImage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* 데스크톱 화면용 이미지 */}
      <Image
        src="/kitty-desktop.png"
        width={1000}
        height={750}
        className="hidden md:block"
        alt="데스크톱 환경에서 놀러운 새끼 고양이"
      />
      {/* 모바일 화면용 이미지 */}
      <Image
        src="/kitty-mobile.png"
        width={520}
        height={550}
        className="block md:hidden"
        alt="모바일 화면에서 본 놀러운 새끼 고양이"
      />
    </div>
  );
}
```

Next.js 프로젝트의 Page 구성 요소는 Next.js의 내장 이미지 최적화 도구인 `Image` 컴포넌트를 사용하여 반응형 이미지 렌더링 전략을 보여줍니다. 이 접근 방식은 뷰어의 기기 유형(데스크톱 또는 모바일)에 따라 올바른 이미지가 로드되도록 보장하여 성능과 사용자 경험을 향상시킵니다. 어떻게 작동하는지 및 왜 효과적인지 살펴봅시다:

## 이미지 렌더링 방식

<div class="content-ad"></div>

페이지 컴포넌트에는 화면 크기에 따라 표시되도록 설정된 두 개의 `Image` 컴포넌트가 포함되어 있습니다:

- 데스크톱 이미지 (/kitty-desktop.png):

- 이 이미지는 className="hidden md:block"으로 구성되어 있습니다. 이 CSS 클래스 설정은 Tailwind CSS라는 유틸리티 우선 CSS 프레임워크를 활용합니다. hidden 클래스는 요소를 기본적으로 숨기고, md:block은 중간 크기 이상의 화면(일반적으로 768픽셀보다 넓은 태블릿 및 데스크톱 화면)에서 블록 요소로 표시됩니다.
- 이미지의 크기는 명시적으로 width={1000} 및 height={750}로 설정되어 있으며, 이미지가로드되는 동안 Next.js가 페이지에서 공간을 예약하여 레이아웃 이동을 방지합니다.

2. 모바일 이미지 (/kitty-mobile.png):

<div class="content-ad"></div>

- 이 이미지는 className="block md:hidden"를 사용합니다. 작은 화면에는 보이며(block), 중간 또는 큰 화면에서는 숨겨집니다(md:hidden). 이는 모바일 기기를 위한 기본 선택 사항입니다.
- 더 작은 화면에 적합하도록 너비={520}와 높이={550}의 고유한 크기 설정이 있습니다.

# 반응형 콘텐츠 전달을 위한 시스템이 장치 유형을 인식하는 방법

시스템이 어떻게 장치 유형을 인식하고 CSS 미디어 쿼리를 사용하여 어떤 이미지를 렌더링할지 결정하는지, Tailwind CSS가 필요한지 여부 또는 다른 CSS 라이브러리를 사용할 수 있는지에 대해 더 자세히 알아봅시다.

# CSS 미디어 쿼리를 통한 시스템의 장치 유형 인식

<div class="content-ad"></div>

CSS 미디어 쿼리: 미디어 쿼리는 콘텐츠를 다양한 화면 크기, 방향 및 해상도에 맞게 맞추는 데 사용되는 기본적인 CSS 기능입니다. 기본적으로 기기나 디스플레이의 특성에 따라 조건부로 CSS 스타일을 적용할 수 있도록 합니다.

미디어 쿼리의 작동 방식: 컴포넌트에서 md:block 및 md:hidden 클래스를 사용하여 이미지의 가시성을 화면 너비에 따라 제어합니다. 다음은 작동 방식입니다:

- md:block은 "중간 장치 너비에서부터 display: block;를 적용한다"는 것을 의미합니다. 일반적으로 768픽셀 이상의 화면 너비를 대상으로 하며, 태블릿 및 데스크톱과 주로 관련됩니다.
- md:hidden은 "중간 장치 너비에서부터 display: none;를 적용한다"는 것을 의미하며, 이로써 해당 큰 화면에서는 해당 요소가 보이지 않고 작은 화면에서는 보이게 됩니다.

이미지 렌더링에서 미디어 쿼리의 역할: 브라우저는 이러한 미디어 쿼리를 평가하여 관련된 CSS 규칙을 렌더링할지 여부를 결정합니다. 미디어 쿼리가 설정한 조건과 일치하는 경우(예: md:block에서 768픽셀 이상의 뷰포트), 해당하는 CSS 규칙이 적용됩니다. 이 브라우저를 통한 CSS의 직접 조작은 JavaScript가 필요 없어 매우 효율적이고 빠릅니다.

<div class="content-ad"></div>

# Tailwind CSS나 다른 CSS 라이브러리 사용하기

Tailwind CSS: Tailwind CSS는 쉽게 적용하고 결합할 수 있는 유틸리티 클래스를 활용하여 반응형 디자인을 간단하게 만듭니다. 이러한 유틸리티 클래스(md:block 및 md:hidden 등)는 Tailwind의 미리 정의된 브레이크포인트(sm, md, lg, xl 등)를 활용하는 반응형 디자인 시스템의 일부입니다.

Tailwind CSS가 필수일까요? 아니요, Tailwind CSS는 Next.js의 `Image` 컴포넌트를 사용하거나 반응형 디자인을 구현하는 데 필수적이지 않습니다. Tailwind는 유틸리티 중심 접근 방식을 통해 편리하고 효율적인 방법으로 반응형 동작을 관리하는 도구 중 하나일 뿐입니다. Tailwind를 사용하지 않는 것을 선호한다면 일반 CSS로 동일한 결과를 얻을 수 있습니다.

다른 CSS 라이브러리 또는 순수 CSS 사용하기: 화면 크기에 따라 요소의 가시성을 관리하기 위해 CSS 프레임워크 또는 순수 CSS를 사용할 수 있습니다. 예를 들어 아래와 같이 간단한 CSS로 유사한 기능을 구현할 수 있습니다:

<div class="content-ad"></div>

```css
/* Tailwind의 md:block 및 md:hidden에 대한 일반 CSS 등가물 */
@media (min-width: 768px) {
  .desktop-image {
    display: block; /* 중간 크기 화면 이상에서 표시 */
  }
  .mobile-image {
    display: none; /* 중간 크기 화면 이상에서 숨김 */
}

@media (max-width: 767px) {
  .desktop-image {
    display: none; /* 작은 화면에서 숨김 */
  }
  .mobile-image {
    display: block; /* 작은 화면에서 표시 */
  }
}
```

HTML with Plain CSS Classes:

```js
<img src="/kitty-desktop.png" class="desktop-image" alt="데스크탑 버전">
<img src="/kitty-mobile.png" class="mobile-image" alt="모바일 버전">
```

# 결론

<div class="content-ad"></div>

Next.js의 `Image` 컴포넌트는 현대 웹 애플리케이션에서 이미지 처리를 크게 간소화합니다. 핵심 최적화 프로세스를 자동화하여 개발자들이 성능을 조정하는 대신 새로운 기능을 개발하는 데 더 집중할 수 있도록 돕습니다. 이 컴포넌트는 Next.js가 빠르고 효율적인 웹 솔루션을 제작하는 데 헌신한 것을 입증합니다. 이 강력한 도구를 활용함으로써, 개발자들은 작업 흐름을 향상시키는데 그치지 않고 오늘날의 빠르게 변화하는 온라인 환경의 요구 사항을 충족시키며 전반적인 사용자 경험을 향상시킵니다.

🌐 LinkedIn에서 Gabriela Iriart와 연결하고 GitHub에서 내 프로젝트를 팔로우하세요: gabrielagi
