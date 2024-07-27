---
title: "React용 스켈레톤 로더 라이브러리 구축 방법"
description: ""
coverImage: "/assets/img/2024-06-23-BuildingaSkeletonLoaderLibraryforReact_0.png"
date: 2024-06-23 13:40
ogImage: 
  url: /assets/img/2024-06-23-BuildingaSkeletonLoaderLibraryforReact_0.png
tag: Tech
originalTitle: "Building a Skeleton Loader Library for React"
link: "https://medium.com/gitconnected/building-a-skeleton-loader-library-for-react-2cf680c236ee"
---


웹 개발의 빠르게 변화하는 세상에서 UI 컴포넌트 라이브러리는 개발자들에게 귀중한 도구가 되어왔어요. Material-UI, Chakra UI, Ant Design, 그리고 ShadCN과 같은 이러한 라이브러리들은 다양한 사전 구축된 컴포넌트들을 제공하여 사용자 인터페이스의 신속하고 일관된 개발을 가능하게 합니다. 이들은 생산성을 향상시키고 디자인 일관성을 유지하며, 개발자들이 애플리케이션의 독특한 측면에 집중할 수 있게 하여 휠을 재창조하는 것보다 더 효율적입니다. 하지만 때로는 성능이나 디자인 요구 사항을 충족시키기 위해 보다 구체적으로 초점을 맞춰야 할 때도 있습니다. 이 글에서는 React를 위한 가벼운 스켈레톤 로더 컴포넌트 라이브러리인 @paul/skeleton-loader-react을 소개하겠습니다. 종합적인 UI 라이브러리와 달리, 이 프로젝트는 데이터가 로딩되는 동안 사용자 경험을 향상시키기 위한 간단하고 효과적인 스켈레톤 로더에 초점을 맞추고 있습니다.

## 이 라이브러리를 개발하는 데 고려해야 할 주요 사항

@paul/skeleton-loader-react 라이브러리를 개발하는 동안, 이 효과적이고 사용하기 쉬운 라이브러리를 보장하기 위해 몇 가지 중요한 요소가 고려되었습니다:

<div class="content-ad"></div>

- Skeleton Loader Variants:
라이브러리는 세 가지 유형의 스켈레톤 로더를 지원합니다: 원형, 직사각형 및 모서리가 둥근 직사각형.
- 단일 구성요소 노출:
라이브러리는 `Skeleton /`이라는 하나의 구성요소만을 노출하여 API 및 사용을 간소화합니다.
- Variant 속성:
`Skeleton /`의 variant 속성은 스켈레톤 로더의 유형(원형, 직사각형 또는 모서리가 둥근 직사각형)을 결정합니다.
- Variant별 속성:
선택한 variant에 따라 `Skeleton /`의 속성이 변경됩니다. 예를 들어, borderRadius 속성은 평범한 직사각형 variant에는 적용되지 않고, 모서리가 둥근 직사각형 variant에만 해당됩니다.
- TypeScript 통합:
TypeScript를 사용하면 각 variant의 속성에 대한 자동 제안과 힌트를 제공받아 개발을 더 직관적으로 만들고 오류 가능성을 줄일 수 있습니다.
- 다양한 프로젝트 설정과의 호환성:
이 라이브러리는 Create React App (CRA), Vite 및 기타 일반적인 React 프로젝트 설정을 사용하여 쉽게 사용할 수 있도록 구성되어 있습니다.
- 재사용 가능한 보일러플레이트 코드:
@paul/skeleton-loader-react의 코드베이스는 자신의 React 라이브러리를 만들고 싶은 개발자들을 위한 보일러플레이트로 사용될 수 있습니다. src 폴더의 내용을 제거함으로써, 개발자들은 기존 설정을 사용하여 사용자 정의 구성요소 또는 라이브러리를 구축할 수 있습니다.

## 미리보기

<img src="/assets/img/2024-06-23-BuildingaSkeletonLoaderLibraryforReact_1.png" />

## 설치

<div class="content-ad"></div>

npm을 사용하여 라이브러리를 설치하세요:

```js
npm install https://github.com/souvik-pl/skeleton-loader-react.git
```

## 사용 방법

```js
import React from "react";
import { Skeleton } from "@paul/skeleton-loader-react";

const App = () => {
  return (
    <div>
      <h2>원형 스켈레톤</h2>
      <Skeleton variant="circle" height="100px" width="100px" animated={true} />

      <h2>직사각형 스켈레톤</h2>
      <Skeleton variant="rectangle" height="100px" width="50vw" animated={true} />

      <h2>둥근 직사각형 스켈레톤</h2>
      <Skeleton
        variant="rectangle-rounded"
        borderRadius="10px"
        width="50vw"
        height="15px"
        animated={true}
      />
    </div>
  );
};

export default App;
```

<div class="content-ad"></div>

## 마무리 맺는 글

이 라이브러리를 꼭 프로젝트에 사용해보시기를 권장합니다. 저장소를 fork하여 원하는 대로 수정하거나 React 라이브러리의 기본으로 활용해보세요.

이슈 보고, 기능 제안, 혹은 풀 리퀘스트 제출 등 모든 기여를 환영합니다.

감사합니다. 즐거운 코딩 되세요 🚀