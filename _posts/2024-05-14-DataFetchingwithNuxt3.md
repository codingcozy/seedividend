---
title: "뉵트 3에서 데이터 가져오기"
description: ""
coverImage: "/assets/img/2024-05-14-DataFetchingwithNuxt3_0.png"
date: 2024-05-14 14:38
ogImage: 
  url: /assets/img/2024-05-14-DataFetchingwithNuxt3_0.png
tag: Tech
originalTitle: "Data Fetching with Nuxt 3"
link: "https://medium.com/@enestalayy/data-fetching-with-nuxt-3-ede89fb0509f"
isUpdated: true
---





![이미지](/assets/img/2024-05-14-DataFetchingwithNuxt3_0.png)

Table of Contents

- 소개
- $fetch
- useFetch
- useAsyncData
- 옵션
- 캐싱 및 재검색

# 소개




데이터 가져오기와 관련된 Nuxt 3의 세계에서는 useFetch, useAsyncData, 그리고 $fetch 세 가지 강력한 도구를 갖추고 있습니다. 흥미로운 점은 이것들이 각기 다른 목적을 위해 사용되는 두 가지 조합 가능한 함수와 하나의 내장 라이브러리로 깔끔하게 분류될 수 있다는 것입니다. 이 모든 것을 이해하기 위해선, 단순함을 위해 차이점부터 알아야 합니다.

# $fetch

먼저 $fetch의 차이를 정의해야 한다고 생각합니다;

- $fetch는 Nuxt에서 HTTP 요청을 만들기 위한 유틸리티 함수입니다. $fetch는 Vue 앱이나 API 라우트 내에서 HTTP 요청을 만들기 위해 ofetch 라이브러리를 사용합니다.
- $fetch는 서버 측에서 클라이언트 측으로 상태를 전달할 수 없으며, 따라서 서버 및 클라이언트 측 모두에 대해 두 번 요청해야 합니다. 이 상황은 다음과 같은 코드로 콘솔과 터미널에서 기본적으로 볼 수 있습니다;



```js
const dataFetch = await $fetch('https://jsonplaceholder.typicode.com/photos')
console.log(dataFetch)
```

![Data Fetching with Nuxt](/assets/img/2024-05-14-DataFetchingwithNuxt3_1.png)

두 번째로, useAsyncData의 차이점은 다음과 같이 설명할 수 있습니다:

- useAsyncData는 컴포넌트 내에서 데이터 가져오기 프로세스를 조직적으로 관리할 수 있게 해주는 복합 기능입니다.
- useAsyncData의 특징은 key와 handler 함수를 둘 다 필요로 한다는 점입니다. 예를 들어, useAsyncData를 사용하면 axios, graphql 또는 firebase와 같은 다양한 라이브러리나 API를 활용할 수 있습니다. 또한 useAsyncData와 nuxtApp 인수를 함께 사용하면 Nuxt 애플리케이션의 다른 기능에 액세스할 수 있어 데이터, 상태, 변수를 공유할 수 있습니다.
- useAsyncData는 서버 사이드 렌더링 중 미리 데이터를 서버에서 가져와 클라이언트 측에서 재요청 없이 사용할 수 있습니다. 따라서 $fetch와 달리 데이터를 서버 측에서 클라이언트 측으로 재요청 없이 전송할 수 있습니다.



```js
const data = await useAsyncData('photos', () => $fetch('https://jsonplaceholder.typicode.com/photos'))
console.log(data)
```

![Image](/assets/img/2024-05-14-DataFetchingwithNuxt3_2.png)

보시다싶이 클라이언트 측에서 사진을 가져오는 순서가 아니라 터미널에서 가져오는 것을 볼 수 있습니다.

마지막으로 foruseFetch에 대해 말하자면, useAsyncData와 같은 목적을 가졌지만 더 구체적인 방법으로 데이터를 가져오는 데 사용할 수 있습니다.



- useFetch는 URL을 사용하여 데이터를 가져오는 데 사용하는 다른 조합 가능한(composable)입니다.
- 이 함수와 거의 동등하면서 더 간단하다고 말할 수 있습니다:

![이미지](/assets/img/2024-05-14-DataFetchingwithNuxt3_3.png)

차이점을 확인했으므로, 어떻게 사용하는지 알아보고 세부 사항을 자세히 살펴볼 수 있습니다.

# useFetch



가장 간단한 형태로 useFetch 컴포저블을 사용해보고, 그 기능을 분석해봅시다;

```js
const data = useFetch('https://jsonplaceholder.typicode.com/photos')
console.log(data)
```

![이미지](/assets/img/2024-05-14-DataFetchingwithNuxt3_4.png)

보시다시피 우리가 얻는 결과는 약속(promise)이고, 이는 미래에 완료될 값이 담겨 있는 비동기 작업을 나타냅니다. 따라서 우리는 await을 사용해야 합니다. 또한, 몇 가지 중요한 값들을 관찰할 수 있는데, 이들을 어떻게 사용하고 그 의미를 이해하는지 알아보겠습니다.



- data: 비동기 작업의 결과물을 나타내는 RefImpl 객체입니다.
- error: 데이터 요청이 실패할 때 오류 객체를 포함하는 ObjectRefImpl입니다. 데이터 요청이 성공한 경우 null 값을 받습니다.
- execute: useFetch 함수에 전달된 매개변수인 execute는 데이터 요청을 다시 시작하는 데 사용되는 함수입니다. lazy 매개변수가 useFetch 함수에서 true로 설정된 경우에 사용됩니다. 이 경우 데이터 요청은 route가 로드된 후에 해결되며, execute는 데이터 요청을 수동으로 시작하는 데 사용될 수 있습니다.
- pending: 비동기 작업이 완료되었는지를 나타내는 RefImpl 객체입니다. RefImpl의 값이 true이면 작업이 계속 진행 중이라는 것을 의미합니다.
- refresh: useFetch 함수에서 반환된 refresh 함수는 데이터를 다시 가져오는 데 사용할 수 있는 함수입니다. refresh 함수는 useFetch 함수를 다시 호출하여 데이터를 업데이트합니다. 데이터가 변경되거나 다시 로드해야 할 때 유용합니다.
- status: 비동기 작업의 완료 상태를 나타내는 RefImpl 객체입니다. 성공, 오류, 대기 중 또는 진행 중과 같은 값들을 가질 수 있습니다.

# useAsyncData

사용할 때는 useFetch와 동일한 결과가 나올 것이므로, 제대로 사용합시다;

```js
const { data: photos, error, execute, pending, refresh, status} = await useAsyncData('photos', () => $fetch('https://jsonplaceholder.typicode.com/photos'))
```



이 사용 예에서는 가져오기에 대한 'photos' 키 값을 지정했습니다.

```js
// promise.all을 사용한 예제
const { data: postCard, error, execute, pending, refresh, status } = await useAsyncData('post-card', async () => {
  const [posts, users, comments] = await Promise.all([
    $fetch('https://jsonplaceholder.typicode.com/posts'),
    $fetch('https://jsonplaceholder.typicode.com/users'),
    $fetch('https://jsonplaceholder.typicode.com/comments')
  ])
  return { posts, users, comments }
})
```

키 지정

useAsyncData 함수에서 키를 지정하지 않으면 Nuxt가 자동으로 하나를 생성합니다. 이 키는 useAsyncData 함수가 위치한 파일 이름과 행 번호를 기반으로합니다. 그러나 이 키는 때때로 잘못될 수 있거나 충돌할 수 있습니다. 따라서 useAsyncData 함수에서 키를 명시하는 것이 좋습니다. 키 매개변수는 데이터 가져오기에 속하는 고유한 값을 가져야합니다.



<img src="/assets/img/2024-05-14-DataFetchingwithNuxt3_5.png" />

# 옵션

옵션은 composable에 대한 더 깊은 수준의 제어를 제공하며, useFetch와 useAsyncData에 대해 공통 값들을 취합니다. 이들을 통해 어떤 것을 달성할 수 있는지 자세히 살펴보겠습니다:

Lazy



기본적으로 fetch composables의 기능 중 하나는 데이터를 가져오는 동안 라우트를 로딩하는 것을 방지하는 것입니다. 이는 데이터를 가져오는 예상 시간 동안 라우트 로딩이 일시 중지되어 데이터가 준비된 후 라우트가 로드됩니다. 그러나이 함수의 lazy 매개변수를 true로 설정하여 데이터 가져오기가 라우트 로드를 차단하지 않도록 허용할 수 있습니다. 이 경우 데이터를 가져오는 예상 시간 동안에도 라우트의 로드가 계속되며 결과적으로 데이터가 라우트 로드 후에 로드됩니다.

기본적으로 두 가지 방법으로 lazy하게 만들 수 있습니다;

```js
// useFetch()
const { data } = await useFetch('https://jsonplaceholder.typicode.com/photos', {
    lazy: true
})
// useAsyncData()
const { data }= await useAsyncData('photos', () => $fetch('https://jsonplaceholder.typicode.com/photos'), {
    lazy: true
})
```

```js
// useFetch()
const { data } = await useLazyFetch('https://jsonplaceholder.typicode.com/photos')

// useAsyncData()
const { data } = await useLazyAsyncData('photos', () => $fetch('https://jsonplaceholder.typicode.com/photos'))
```



클라이언트 전용 데이터 가져오기

기본적으로 데이터 가져오기 구성 요소는 서버 측과 클라이언트 측에서 모두 작동합니다. 클라이언트 측에서만 실행하는 것이 서버 측에서 데이터를 가져올 필요가 없는 경우에 유용할 수 있습니다. 예를 들어 데이터가 사용자 상호작용에 따라 달라지거나 SEO에 민감하지 않은 데이터에 이 접근 방식을 사용할 수 있습니다.

페이지가 처음로드 될 때 발생하는 대기 상태는 클라이언트 측 탐색 중에는 경험되지 않습니다. lazy 옵션과 함께 사용하면 초기 렌더링 시 필요하지 않은 데이터에 특히 유용할 수 있으며, 특히 클라이언트 측 탐색에 대해 유용합니다.

```js
const { data } = await useFetch('https://jsonplaceholder.typicode.com/photos', {
    lazy: true,
    server: false,
})
```



페이로드 크기 최소화

Nuxt 3을 사용하면 데이터를 가져올 때 pick 및 transform 옵션을 사용하여 페이지 로드를 줄일 수 있습니다. pick 옵션으로 초기 데이터에서 원하는 키 값을 가져올 수 있고, transform 기능으로 모든 데이터에서 특정 키 값을 가져올 수 있습니다.

데이터를 가져오고 받는 과정에서는 변경사항이 없으며, 대신 서버 측에서 수신한 데이터를 처리하고 클라이언트 측으로는 특정 값만 보냅니다.

```js
// Pick
const { data: photos, error, pending, refresh, execute, status } = await useFetch('https://jsonplaceholder.typicode.com/photos?&_limit=50', {
  pick: ['url', 'id']
})
// Transform
const {data: photos, pending, error, execute, refresh, status} = await useFetch('https://jsonplaceholder.typicode.com/photos', {
  transform: (photos) => {
    return photos.map(photo => ({ title: photo.title, url: photo.url }))
  }
})
```



와치

와치 옵션을 사용하면 값을 모니터링하고 해당 값이 변경될 때마다 페치 프로세스를 다시 트리거할 수 있습니다. Immediate가 false로 설정되어 있을 때는 페치 프로세스를 완전 수동으로 수행합니다. 사용법은 다음과 같습니다:

![이미지](/assets/img/2024-05-14-DataFetchingwithNuxt3_6.png)

Deep



깊이 옵션을 사용하면 데이터가 ref 객체에서 어떻게 반환되는지 제어할 수 있습니다. 기본적으로 deep 값은 true로 설정되어 있어 데이터가 깊게 반응하는 ref 객체로 반환됩니다. 이는 그 안의 항목 중 하나에 대한 변경 사항이 모두 추적된다는 것을 의미합니다. 이 옵션은 일반적으로 성능을 최적화하고 데이터 내의 모든 변경을 추적할 필요가 없을 때 사용됩니다.

중복 제거

dedupe 옵션은 데이터 검색 시 동일한 키로 데이터를 여러 차례 반환하는 것을 방지하는 데 사용됩니다. 이 옵션의 기본값은 cancel로, 새 요청이 발생할 때 기존 요청을 취소합니다. 다른 옵션인 defer는 대기 중인 요청이 있을 때 새 요청을 만들지 않습니다. 이러한 옵션을 사용하면 데이터 검색이 더 효율적이고 성능 지향적으로 이루어집니다.

# 캐싱과 재검색



Nuxt 3를 사용하면 서버 쪽에서 데이터를 가져와 클라이언트 쪽으로 전송하는 데 useFetch 및 useAsyncData 컴포저블을 사용하는 방법을 탐색했습니다. 이렇게 하면 양쪽에서 데이터를 가져 오는 필요가 없어지죠. 그러나 클라이언트 측 탐색 중에 반복적인 데이터 가져 오기 작업에 대한 문제가 여전히 존재합니다. 이때 캐싱이 우리를 구해줍니다. 할당 된 키 값에 따라 캐시에서 이러한 데이터를 가져 오므로 클라이언트 측 탐색 중에 이러한 데이터를 반복적으로 가져 오는 필요가 사라집니다. 대신 캐시를 일시적 저장소로 활용하여 짧은 기간 동안 사용합니다.

캐시 데이터 가져 오기

일반적으로 캐시에서 데이터를 검색할 때 useNuxtData를 사용하면 데이터를 성공적으로 가져올 수 있습니다. 그러나 이것만으로 충분하지 않을 수 있습니다. 또한 캐시에 데이터가 없는 경우에만 조건부로 데이터를 가져 오는 경우, 페이지 간 탐색 중에 캐시에서 데이터를 활용하고 데이터를 다시 가져 오지 않을 겁니다. 여기서 필요한 컴포저블은 useNuxtApp입니다. 그러나 먼저 수행해야 할 작은 추가 사항이 있습니다.

```js
export default defineNuxtConfig({
// ...
  experimental: {
    payloadExtraction: true,
  },
});
```



그런 다음, 우리는 useFetch 및 useAsyncData 조합을 사용하여 getCacheData 옵션을 이용해 작은 함수를 작성할 것입니다. 이 방법을 통해 데이터가 캐시에 없을 때에만 fetch 작업이 실행됩니다.

```js
const nuxtApp = useNuxtApp()
const { data: photos, error} = await useFetch('https://jsonplaceholder.typicode.com/photos?_limit=5', {
  key: 'photos',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})
```

useNuxtData

이 조합을 사용하면 지정된 키를 사용하여 데이터를 쉽게 검색하거나 새로 고칠 수 있습니다. 사용 예시는 다음과 같습니다:



```js
const { data: cachedPhotos } = useNuxtData('photos')
```

여기서 캐시에서 데이터를 직접 가져오는 것이에요. 사용자가 시작한 변경사항 또는 다른 이유로 데이터를 다시 가져와 캐시를 새로 고치는 필요가 있을 때는 refreshNuxtData가 아주 편리한 방법일 수 있어요. 이렇게 하면 데이터를 다시 불러오게 돼요:

```js
const refreshData = async () => {
  await refreshNuxtData('photos')
}
```