---
title: "Nextjs에서 Nuxtjs와 Vuejs에서 fetch 기능을 향상시키는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How Nextjs can enhance its fetch functionality by drawing inspiration from Nuxtjs and Vuejs ecosystem "
link: "https://medium.com/@kristiyan.velkov/how-next-js-can-enhance-its-fetch-functionality-by-drawing-inspiration-from-nuxt-js-37534a09cce4"
---



![Next.js와 Nuxt.js 생태계에서 영감을 받아 가져오기 기능을 강화하는 방법_0.png](/assets/img/HowNextjscanenhanceitsfetchfunctionalitybydrawinginspirationfromNuxtjsandVuejsecosystem_0.png)

자바스크립트 프레임워크의 계속 발전하는 풍경에서 데이터를 가져오고 관리하는 메커니즘은 프레임워크의 사용성과 효율성을 정의하는 데 중요한 역할을 합니다. Next.js와 Nuxt.js는 각각 React와 Vue.js로 서버 측 렌더링 애플리케이션을 구축하는 데 사용되는 선도적인 프레임워크로, 두 프레임워크 모두 데이터 가져오기에 강력한 해결책을 제공합니다. 그러나 각각의 내부 세부 사항과 혁신이 서로에게 개선을 영감을 줄 수 있습니다.

# Next.js 데이터 가져오기

자, Next.js의 데이터 가져오기 예제부터 시작해 보겠습니다:

<div class="content-ad"></div>

```js
export default async function Page() {
  // 이 요청은 수동으로 무효화될 때까지 캐싱되어야 합니다.
  const staticData = await fetch(`https://...`);

  // 이 요청은 매 요청마다 다시 가져와야 합니다.
  const dynamicData = await fetch(`https://...`, { cache: "no-store" });

  // 이 요청은 10초 동안 유지되는 캐시로 보관되어야 합니다.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  });

  // 이 요청은 revalidateTag('collection')로 다시 확인되어야 합니다.
  const revalidateWithTag = await fetch("https://...", {
    next: { tags: ["collection"] },
  });

  return <div>...</div>;
}
```

# Nuxt 데이터 가져오기

<img src="/assets/img/HowNextjscanenhanceitsfetchfunctionalitybydrawinginspirationfromNuxtjsandVuejsecosystem_2.png" />
```

<div class="content-ad"></div>

# 다음 Next.js 개선 사항

Nuxt.js에서 영감을 받아 Next.js가 개발자에게 더 나은 Fetch 기능을 제공할 수 있는 몇 가지 방법이 있습니다:

## 1. 데이터 가져오기에 대한 통합 가능한 API

Next.js는 데이터 가져오기를 위한 통합 가능한 API를 제공하여 개발자들에게 더 좋은 서비스를 제공할 수 있습니다.

<div class="content-ad"></div>

Nuxt.js는 useFetch, useAsyncData 및 $fetch를 제공하여 데이터 가져오기에 대한 통일된 유연한 접근 방식을 제공합니다. Next.js에서는 유사한 일련의 훅이나 컴포저블을 도입할 수 있어 데이터 가져오기의 복잡성을 추상화할 수 있습니다. 특히 서버 측 렌더링(SSR) 및 정적 사이트 생성(SSG)에 대해 간편한 방법을 제공할 수 있습니다. 통일된 API를 통해 데이터를 가져오는 개발자 경험을 단순화할 수 있으며, 어디서나 어떻게 데이터를 가져오던 일관된 방법을 제공할 수 있습니다.

```js
// useFetch 컴포저블은 데이터 가져오는 가장 간단한 방법입니다.

const { data: count } = await useFetch('/api/count')
</script>
```

```js
// $fetch - useFetch가 내부에서 사용하는 방법이지만 클라이언트 측에서 사용됩니다.

async function addTodo() {
  const todo = await $fetch("/api/todos", {
    method: "POST",
    body: {},
  });
}
```

```js
// 이 컴포저블은 useAsyncData와 $fetch 주변에 편리한 래퍼를 제공합니다. URL과 가져오기 옵션을 기반으로 키를 자동으로 생성하고, 서버 라우트 기반의 요청 URL에 대한 유형 힌트를 제공하며, API 응답 유형을 추론합니다.

const { data, pending, error, refresh } = await useFetch("/api/modules", {
  pick: ["title"],
});
```

<div class="content-ad"></div>

# 2. 클라이언트 쪽 데이터 가져오기 기능 강화

Nuxt.js의 $fetch는 사용자 상호 작용을 위해 특히 최적화되어 있습니다. Next.js에서는 클라이언트 쪽 가져오기에 최적화된 유사한 유틸리티를 제공할 수 있습니다. 이 유틸리티는 자동 재시도, 요청 취소 및 더 나은 오류 처리 기능을 기본적으로 제공할 수 있습니다.

```js
// 클라이언트 쪽에서만 실행되는 모든 메서드에서 $fetch 사용

function contactForm() {
  $fetch("/api/contact", {
    method: "POST",
    body: { hello: "world " },
  });
}
```

# 3. 데이터 가져오기 행동에 대한 정교한 제어

<div class="content-ad"></div>

Nuxt.js는 개발자들이 데이터를 가져오는 방법과 시기를 더욱 세밀하게 제어할 수 있도록 lazy fetching 및 client-only fetching(server: false)와 같은 옵션을 제공합니다. Next.js는 유사한 옵션을 도입하여 개발자들이 데이터를 SSR 중에 가져올지, 클라이언트 측에서 연기할지 또는 특정 조건 하에 다시 가져올지 지정할 수 있도록 합니다. 이를 통해 성능 및 사용자 경험을 최적화하는 데 더 많은 유연성을 제공할 수 있습니다.

```js
// 기본적으로 데이터 가져오기 컴포저블은 Vue의 Suspense를 사용하여 새 페이지로 이동하기 전에 비동기 함수의 해결을 기다립니다.
// 이 기능은 lazy 옵션을 사용하여 클라이언트 측 탐색에서 무시할 수 있습니다.

const { pending, data: posts } = useFetch("/api/posts", {
  lazy: true,
});
```

# 4. 서버-클라이언트 데이터 전송을 위한 개선된 직력화

Nuxt.js는 서버에서 클라이언트로 전달된 데이터를 직렬화하기 위해 devalue를 활용하여 날짜, 맵, 세트 및 반응형 객체와 같은 복잡한 데이터 구조를 지원합니다.

<div class="content-ad"></div>

# 5. 사용자 정의 캐싱 및 다시 유효화 전략

Nuxt의 캐싱 및 다시 가져오기 접근 방식에서 영감을 받아서, Next.js는 캐싱 및 다시 유효화 전략에 대해 더 세분화된 제어를 제공할 수 있습니다. 이에는 시간 기반 다시 유효화를 위한 옵션, 이벤트에 기반한 요청 시 다시 유효화, 캐시 항목에 대한 더 정교한 태그 시스템 등이 포함될 수 있습니다.

```js
// 다른 반응형 값이 변경될 때마다 가져오기 함수를 다시 실행하려면 watch 옵션을 사용합니다.

const { data, error, refresh } = await useFetch("/api/users", {
  /* id를 변경하면 다시 가져오기가 트리거됩니다 */
  watch: [id],
});
```

# 6. 선택적 데이터 가져오기 및 변환

<div class="content-ad"></div>

Nuxt.js의 데이터 가져오기 컴포저블에서는 선택 및 변환 옵션을 제공하여 개발자가 클라이언트에 도달하기 전에 페이로드 크기를 최소화하고 데이터 구조를 맞춤화할 수 있습니다.

- Pick 방법: Pick 방법을 사용하면 응답에 포함되어야 하는 필드를 정확히 지정할 수 있습니다. 이를 통해 불필요한 데이터를 제외하여 초기 페이로드의 크기를 크게 줄일 수 있습니다.

```js
/* 템플릿에서 사용된 필드만 선택 */
const { data: mountain } = await useFetch("/api/mountains/everest", {
  pick: ["title", "description"],
});
```

- Transform 방법: Transform 방법은 데이터 구조를 컴포넌트에 전달되기 전에 조작하는 방법을 제공합니다. 이를 사용하여 서버에서 클라이언트로의 데이터 형식을 적합한 형식으로 변환하거나 여러 소스에서 데이터를 집계하거나 프론트엔드에서 필요한 기타 데이터 변환 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

```js
// 산 목록을 가져와 각 산의 'title'과 'description'만 포함하도록 데이터를 변환합니다.
// 변환 함수는 API 응답을 재구성하여 템플릿에서 더 효율적으로 데이터를 사용할 수 있게 합니다.
const { data: mountains } = await useFetch("/api/mountains", {
  transform: (mountains) => {
    return mountains.map((mountain) => ({
      title: mountain.title,
      description: mountain.description,
    }));
  },
});
```

# 결론

Next.js는 React 기반 애플리케이션을 개발하기 위한 강력한 프레임워크로서 소중한 역할을 합니다. 그러나 Nuxt.js 및 보다 넓은 Vue.js 생태계로부터 아이디어와 기능을 받아들이면 Next.js의 능력을 더욱 높일 수 있습니다. Nuxt.js의 유니버설 데이터 가져오기, 컴포넌트별 데이터 액세스, 선언적 패턴, 향상된 상태 관리 방법에서 배울 수 있음으로써 Next.js는 개발자에게 더 많은 유연성, 사용 편의성, 및 성능 최적화를 제공할 수 있습니다. 이러한 기능을 통합함으로써 개발 프로세스를 보다 원활하게 만들 뿐만 아니라 전반적인 생태계를 풍부하게 만들어 더 원활하고 효율적인 웹 개발 경험을 유도할 수 있습니다.

## ❤️ 만약 내 작업을 좋아한다면, 팔로우하고 구독해주세요 ❤️

<div class="content-ad"></div>

- 팔로우해주세요
- 구독하기
- LinkedIn
- Front-end World 방문하여 구독하기.
