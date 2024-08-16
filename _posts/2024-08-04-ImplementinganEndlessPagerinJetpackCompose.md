---
title: "Jetpack Compose에서 무한 스크롤 페이지 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-08-04-ImplementinganEndlessPagerinJetpackCompose_0.png"
date: 2024-08-04 19:08
ogImage: 
  url: /assets/img/2024-08-04-ImplementinganEndlessPagerinJetpackCompose_0.png
tag: Tech
originalTitle: "Implementing an Endless Pager in Jetpack Compose"
link: "https://medium.com/@callmeryan/implementing-an-endless-pager-in-jetpack-compose-bbb509a434b6"
isUpdated: true
---




## 최소한의 변경으로 매끄러운 스크롤링

![이미지](/assets/img/2024-08-04-ImplementinganEndlessPagerinJetpackCompose_0.png)

# 무한 페이저란?

무한 페이저 또는 인피니트 페이저는 콘텐츠를 계속 순환하여 무한 스크롤링의 환상을 제공하는 사용자 인터페이스 요소입니다. 주로 이미지 캐로셀, 뉴스 피드 및 제품 갤러리에서 연속적인 탐색이 유용한 경우에 사용됩니다.

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:640/1*R5jKsgVazelbMjVUm6YVWQ.gif)

# 기존 페이저를 무한 페이저로 변환하는 방법

우리는 간단한 트릭을 활용하여 일반 페이저를 무한 스크롤이 가능한 페이저로 변환할 수 있습니다.

## 작동 방식


<div class="content-ad"></div>

무한 페이저의 기본 원리는 무한 스크롤링의 환상을 만들어내는 것입니다. 이를 위해 다음과 같은 방법을 사용합니다:

- 페이지 범위 확장: 전체 페이지 수를 큰 상수*로 곱함으로써 더 많은 페이지 범위를 생성합니다. 이를 통해 사용자가 끝에 도달하지 않고 오랜 시간 동안 양방향으로 스크롤할 수 있도록 보장합니다.
- 초기 페이지를 페이지 범위의 중간으로 설정: 어디서 시작해야 할지 모를 때 사용자들이 끝에 도달하기 전에 상당한 시간이 소요됩니다.
- 인덱스 래핑: 콘텐츠를 표시할 때 현재 페이지의 인덱스를 모듈로 연산자(%)를 사용하여 감싸줍니다. 이를 통해 사용자가 스크롤한 거리에 상관없이 콘텐츠를 반복해서 순환할 수 있습니다.

이 두 가지 간단한 전략을 통해 원할하고 반복되는 탐색 경험을 만들어낼 수 있습니다.

# 코드 예시

<div class="content-ad"></div>

기존 페이저를 엔드리스 페이저로 전환하는 방법을 제트팩 콤포즈를 사용하여 보여드릴게요. GitHub 저장소에서 보여지는 것과 같이요:
  
## 원본 코드
제트팩 콤포즈를 사용한 페이저의 원래 구현 코드입니다:

## 엔드리스 페이징을 위한 수정된 코드

<div class="content-ad"></div>

페이저를 무한 페이저로 변환하는 데 필요한 변경사항입니다:

## 주요 코드 변경사항

### 1. 페이지 수 확장

기존 페이지 수를 큰 상수 (endlessPagerMultiplier)로 곱한 후 초기 페이지를 이 확장된 범위의 중간으로 설정합니다.

<div class="content-ad"></div>

```kotlin
val endlessPagerMultiplier = 1000
val pageCount = endlessPagerMultiplier * drawables.size
val initialPage = pageCount / 2

val pagerState = rememberPagerState(
    initialPage = initialPage,
    initialPageOffsetFraction = 0f,
    pageCount = { pageCount },
)
```

## 2. Index Wrapping

We use the modulus operator to wrap the page index when determining which content to display.

```kotlin
val resolvedPageContentIndex = absolutePageIndex % drawables.size
```

<div class="content-ad"></div>

다시 한번, 제 GitHub 저장소에서 전체 작동 소스 코드를 확인할 수 있어요:

# 결론

우리는 몇 줄의 코드로 표준 페이지 전환기를 무한 페이지 전환기로 변환하여 사용자 경험과 참여를 향상시킬 수 있어요.

이 구현에 대한 자세한 내용은 스택 오버플로에서의 토론을 참조하고 제 GitHub 저장소에서 코드 변경 사항을 살펴보세요.