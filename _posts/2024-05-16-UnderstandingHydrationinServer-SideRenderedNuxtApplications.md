---
title: "서버 측 렌더링된 눅트 애플리케이션에서 수분 공급 이해하기"
description: ""
coverImage: "/assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_0.png"
date: 2024-05-16 03:14
ogImage: 
  url: /assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_0.png
tag: Tech
originalTitle: "Understanding Hydration in Server-Side Rendered Nuxt Applications"
link: "https://medium.com/@susantomandal1998/hydration-54cb4715e4b2"
isUpdated: true
---




이 게시물은 수분 섭취에 대해 자세히 다루며, 그것이 무엇인지, 왜 중요한지, 그리고 사용자에게 웹 사이트를 부드럽고 빠르게 느끼게 하는 방법을 설명합니다. 하지만 주의하세요, 수분 섭취는 모든 게 해피 엔딩인 것은 아닙니다. 잠재적인 장애물을 탐구하고 이를 극복하여 웹 사이트가 번개처럼 빠르고 사용자 친화적인 상태를 유지할 수 있도록 안내할 것입니다.

![이미지](/assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_0.png)

# 수분 섭취란?

요리를 준비하고 있다고 상상해보세요. 수분 섭취는 요리의 대부분을 미리 준비(서버 측 렌더링)하고 식사 직전에 마무리 손질을 하는 것(클라이언트 측 렌더링)과 같습니다. 이를 통해 식사가 빨리 준비되고 맛있게 느껴지는 것처럼 빠르게 로딩되고 상호작용하는 웹 페이지를 만들 수 있습니다.



이제 수분 보충이 작동하는 방식을 살펴보겠습니다:

- 서버는 코드를 컴파일하고 정적 HTML을 생성합니다.
- HTML은 CSS와 JavaScript와 함께 클라이언트(브라우저)로 전송됩니다.
- 브라우저는 서버에서 JavaScript 파일을 실행하고 정적 페이지를 대화형 HTML 페이지로 변환합니다.

# 수분 보충 불일치 오류

수분 보충 불일치 오류는 서버에서 렌더링된 HTML과 Vue 애플리케이션의 클라이언트 측 렌더링된 HTML이 최종 구조에 대해 동의하지 않을 때 발생합니다. 미리 렌더링된 HTML의 DOM 구조가 클라이언트 측 앱의 예상 출력과 일치하지 않으면 수분 보충 불일치 오류가 발생합니다.



## 수분 불일치의 일반 원인:

## 잘못된 HTML

서버 렌더링 출력물에 형식이 잘못된 또는 유효하지 않은 HTML이 포함되어 있으면 클라이언트 측 수분화 과정 중에 문제가 발생할 수 있습니다.

예시:




<a
  class="Invalid A tag"
  href="https://www.google.com/"
>
  Hello
  <div>
    <a href="https://www.youtube.com/">
      World
    </a>
  </div>
</a>
<p class="Invalid P tag">
  <div>Bye World</div>
</p>


이 HTML은 아래 이미지에 나와 있는 오류를 발생시킵니다.

![2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_1.png](/assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_1.png)

이 코드에는 중첩 오류가 두 가지 있습니다:




- 다른 'a' 태그 안에 중첩된 'a' 태그.
- 'p' 태그 안에 중첩된 'div' 태그.

그리고 브라우저는 코드를 다음과 같이 렌더링합니다.

```js
<a class="Invalid A tag" href="https://www.google.com/">
  Hello
</a>
<div>
  <a class="Invalid A tag" href="https://www.google.com/">
  </a>
  <a href="https://www.youtube.com/">
    World
  </a>
</div>
```

이 템플릿은 유효하지 않은 HTML 중첩 구조를 포함하고 있으며, 브라우저의 네이티브 HTML 구문 해석 동작에 의해 렌더링된 HTML이 "수정"되었습니다.



## HTML을 수정하는 스크립트들

서버에서 실행 중인 스크립트들은 초기 HTML 구조를 수정할 수 있기 때문에, 클라이언트가 이를 수분화하려고 할 때 불일치가 발생할 수 있습니다.
특히 Vue가 제어를 쥐기 전에 서버 측에서 DOM을 과도하게 조작하는 것을 피하십시오.

예시:
Vue가 클라이언트에서 렌더링하기 전에 서버 측에 양식을 넣으면, 일치하지 않을 수 있습니다.

## 상태 불일치



서버 및 클라이언트에서 렌더링하는 데 사용되는 데이터(상태)의 차이로 인해 수분화 불일치가 발생할 수 있습니다. 비동기 데이터 가져오기나 동적 사용자 상호작용 시에 이는 일반적입니다.

예시

```js
<script setup>
const articles = useAsyncData('articles', async () => {
  // 클라이언트에서만 기사 데이터 가져오기
  const response = await fetch('/api/articles');
  return await response.json();
})
</script>


<template>
  <div>
    { articles.length === 0 ? '로딩 중...' : '' }
    <div v-if="articles.length > 0">
      <p v-for="article in articles">
        {  article }
      </p>
    </div>
  </div>
</template>
```

이 예시에서 서버 측 렌더링에는 어떤 기사 데이터도 없으므로 "로딩 중…" 텍스트가 표시됩니다. 그러나 클라이언트 측에서 데이터를 가져온 후에는 "로딩 중…" 텍스트가 표시되지 않습니다. 초기 상태의 차이로 인해 수분화 불일치가 발생합니다.



## 날짜, 타임스탬프 및 무작위화

날짜, 타임스탬프 또는 무작위 콘텐츠와 관련된 구성 요소는 서버와 클라이언트에서 다른 출력물을 생성할 수 있으므로 수분화 불일치 오류가 발생할 수 있습니다.

예시

```js
<div>
  <p>
    { Math.random() }
  </p>
</div>
```



서버와 클라이언트에서 Math.random()을 사용하면 서로 다른 난수가 생성되어 일치하지 않을 수 있습니다.

# 수분 불일치 해소

![이미지](/assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_2.png)

실제 해결책으로 수분 불일치에 대응해 보겠습니다:



## 올바른 HTML 보장하기

- 올바르게 구조화된 HTML 구조를 유지하세요. 초기 서버 렌더링된 HTML의 오류나 일관성 부족은 클라이언트 측 JavaScript가 상호 작용할 때 일치하지 않을 수 있습니다.
- 린터(linter)나 유효성 검사기와 같은 도구를 사용하여 문제가 발생하기 전에 HTML 구문 오류를 잡아내세요.

예시 (위의 잘못된 HTML에 대한 해결책)

```js
<a
  class="Valid A tag"
  href="https://www.google.com/"
>
  Hello
</a>
<a href="https://www.youtube.com/">
  World
</a>
<p class="Valid P tag">
  Bye World
</p>
```



이 예시에서는 잘못된 HTML을 수정한 방법은 다음과 같습니다:

- 중첩된 `a` 태그를 제거했습니다. `a` 태그 안에 또 다른 `a` 태그를 넣을 수 없습니다.
- `p` 태그 내에 불필요한 `div` 태그를 제거했습니다. 단락 (`p`)은 텍스트 콘텐츠를 직접 포함해야 하며 `div`와 같은 추가적인 블록 수준 요소를 포함할 수 없습니다.

## 서버와 클라이언트 간 상태 불일치 해결하기

- 서버에서 HTML을 렌더링하는 데 사용되는 데이터와 클라이언트에서 사용 가능한 데이터가 다를 때 발생하는 수분화 불일치를 해결했습니다.
- Nuxt 3와 같은 프레임워크가 제공하는 디버깅 도구를 사용하면 어디서 불일치가 발생했는지 정확히 파악하고 신속하게 해결할 수 있습니다.
- Nuxt 3는 서버 및 클라이언트 측의 상태를 유지하기 위한 사용 가능한 UseHydration도 제공합니다.



## 최종 탈출

## `ClientOnly` 컴포넌트

`ClientOnly` 컴포넌트는 목적에 맞게 클라이언트 측에서만 컴포넌트를 렌더링하는 데 사용됩니다.

- 이 지시문은 Nuxt에게 해당 컴포넌트에 대해 서버 측 렌더링을 완전히 건너뛰고 클라이언트 측에서만 렌더링하도록 지시합니다.
- 이 옵션을 사용할 때 SEO 및 초기 로드 성능에 영향을 줄 수 있으므로 신중하게 사용하세요.



## .client과 .server 접미사 사용하기

특정 코드가 실행되는 시점을 제어하기 위해 .server 또는 .client 접미사가 붙은 파일을 생성할 수 있습니다.

.server:

- 파일은 초기 렌더링 중에 서버에서만 실행됩니다.
- 초기 로드 및 SEO를 개선합니다.
- 창 객체나 클라이언트 측 API에 접근할 수 없습니다.



.client:

- 파일은 클라이언트 측에서만 실행됩니다.
- 상호작용을 위해 완전한 브라우저 환경을 활용합니다.
- 사용자 입력 및 동적 기능에 이상적입니다.

## NuxtLazyHydrate

- NuxtLazyHydrate 라이브러리는 렌더링이 필요 없는 컴포넌트, 컴포저블 및 임포트 래퍼를 제공하여 사전 렌더링된 HTML의 수분화를 지연시킵니다. 비중요 구성 요소를 상호작용 가능하게 하는 컴포넌트를 제공하여 초기로드 및 반응성이 향상됩니다.
- 지연 로딩과 같이 중요한 콘텐츠를 우선해서 불러오고 필요할 때까지 중요하지 않은 요소는 정적으로 유지합니다.



# 읽어 주셔서 감사합니다!

이 코딩 모험에 함께해 주셔서 대단히 감사합니다! 댓글로 의견을 알려주시고, 더 자세히 알아보고 싶은 다른 코딩 주제가 있으면 알려주세요. 계속해서 멋진 것들을 코딩하고 만들어봐요!

![image](/assets/img/2024-05-16-UnderstandingHydrationinServer-SideRenderedNuxtApplications_3.png)

# 참고문헌



- Vue 2 하이드레이션 실패 시 어떻게 해야 할까요?— Alexander Lichter
- 서버 사이드 렌더링 (SSR) | Vue.js
- Nuxt 3 "Hydration Mismatch" 오류 · Harlan Wilton
- Nuxt에서의 Lazy Hydration 및 서버 컴포넌트 — Vue.js 3 성능 — Vue School Articles
- Baroshem/nuxt-lazy-hydrate