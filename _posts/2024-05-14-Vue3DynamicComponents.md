---
title: "Vue 3  동적 컴포넌트"
description: ""
coverImage: "/assets/img/2024-05-14-Vue3DynamicComponents_0.png"
date: 2024-05-14 12:29
ogImage: 
  url: /assets/img/2024-05-14-Vue3DynamicComponents_0.png
tag: Tech
originalTitle: "Vue 3 — Dynamic Components"
link: "https://medium.com/javascript-in-plain-english/vue-3-dynamic-components-f53cbdc32fa8"
isUpdated: true
---




<img src="/assets/img/2024-05-14-Vue3DynamicComponents_0.png" />

블로그 포스트 목록이 있다고 상상해봅시다 (여기 예시를 사용하고 있어요). 대부분의 경우, 모든 포스트가 너무 비슷해서 우리는 하나의 컴포넌트를 추출하고 재사용하고 싶을 것입니다. 이를 blogPost.vue라고 부를게요. 이런 경우에는 제목, 부제목 및 이미지를 표시하고 싶을 때 사용할 수 있어요.

이제 블로그 포스트가 다른 특성을 가지고 있다고 상상해보세요. 어떤 포스트는 이미지 대신 상호작용이 필요한 인포그래픽을 가지고 있을 수도 있고, 어떤 것은 그저 다른 디자인이 필요할 수도 있어요. 이 문제를 해결하는 한 가지 방법은 blogPost.vue 컴포넌트 내부에 많은 if (조건부) 렌더링을 만드는 것이 있습니다. 다른 방법은 동적 컴포넌트를 사용하는 것이죠!!

## 예제



위에서 시작한 프로젝트를 확장해 나가려고 합니다. 이것은 Medium에서 가져온 블로그 포스트 목록입니다. 현재 이들은 모두 같은 디자인을 가지고 있지만, 동적 컴포넌트를 사용하여 컴포넌트를 깨끗하게 유지하면서 세 가지 다른 디자인을 만들 것입니다.

기본적인 blogPost.vue 컴포넌트는 다음과 같이 보입니다:

```js
<script setup>
const props = defineProps(['post'])
const openPostWindow = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="card" @click="openPostWindow(post.mediumUrl)">
    <div class="card__header">
      <img :src="`https://miro.medium.com/v2/resize:fill:500:200/${post.previewImage.id}`" alt="Post Image" class="post-image" />

    </div>
    <div class="card__body">
      <h4>
        { post.title }
      </h4>
      <p>
        { post.extendedPreviewContent.subtitle }
      </p>
    </div>
    <div class="card__footer">
      <div class="user">
        <div class="user__info">
          <small>
            { Math.ceil(post.readingTime) } 분
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 /* 스타일은 실제 저장소에 있습니다 */
</style>
```



```javascript
<script setup>
import { usePostsStore } from './../stores/posts'

import MediumPreview from './blogDesigns/MediumPreview.vue'

const postStore = usePostsStore()
</script>

<template>
  <div class="container">
    <component :is="MediumPreview" :post="post" v-for="post in postStore.posts" :key="post.title">
    </component>
  </div>
</template>
```

지금까지 잘 진행되고 있어요! 이제 우리는 동적 접근 방식을 사용하고 있습니다. component 키워드를 사용하여 Vue에게 MediumPreview.vue 컴포넌트를 사용하도록 하고 있어요. 결과는 이렇게 나와요:

![2024-05-14-Vue3DynamicComponents_1](/assets/img/2024-05-14-Vue3DynamicComponents_1.png)




## 동적이 멋있어지는 때

지금까지 우리는 동적 접근 방식만 사용하여 동일한 컴포넌트를 표시했습니다. 이것은 좋은 시작점이지만, 동적 컴포넌트의 진정한 힘을 활용하지 못합니다. 그것은 여러 컴포넌트를 사용할 때에만 얻을 수 있습니다. 그래서 포스트용으로 또 다른 디자인을 추가해 볼까요?
저는 단순히 MediumPreview2.vue로 불리는 다른 컴포넌트를 만들었습니다. 보기에는 비슷해 보이지만, 이 예제에서는 중요하지 않습니다. 각 컴포넌트가 코드를 더 깨끗하게 만드는 충분히 다른 컴포넌트임을 상상해 봅시다.

이제 부모 컴포넌트는 이렇게 생겼습니다.

```js
<script setup>
import { usePostsStore } from './../stores/posts'

import MediumPreview from './blogDesigns/MediumPreview.vue'
import MediumPreview2 from './blogDesigns/MediumPreview2.vue'

const postStore = usePostsStore()
</script>

<template>
  <div class="container">
    <component :is="index % 2 === 0 ? MediumPreview : MediumPreview2" :post="post" v-for="(post, index) in postStore.posts" :key="post.title">
    </component>
  </div>
</template>
```



결과는 아래와 같습니다:

![Vue3 Dynamic Components](/assets/img/2024-05-14-Vue3DynamicComponents_2.png)

## 최종 목표

동적 컴포넌트의 일반적인 사용 사례는 사용자가 어떤 종류의 뷰/디자인을 사용하고 싶은지 선택할 수 있는 탭일 수도 있습니다. 따라서 사용자가 보여져야 하는 디자인의 종류를 선택할 수 있는 탭을 포함한 예제를 확장할 수 있습니다.



<img src="/assets/img/2024-05-14-Vue3DynamicComponents_3.png" />

Pinia store를 사용하여 쉽게 이루어집니다. 어떤 디자인을 보여줄지의 값을 저장하기 위한 Pinia store를 사용합니다 →

```js
<script setup>
import { usePostsStore } from './../stores/posts'
import { useTabStore } from './../stores/tab'
import MediumPreview from './blogDesigns/MediumPreview.vue'
import MediumPreview2 from './blogDesigns/MediumPreview2.vue'

const componentMap = { MediumPreview, MediumPreview2 }
const tabStore = useTabStore()
const postStore = usePostsStore()
</script>

<template>
  <div class="container">
    <component :is="componentMap[tabStore.tab]" :post="post" v-for="(post, index) in postStore.posts" :key="post.title">
    </component>
  </div>
</template>
```

## 결론



동적 구성 요소를 설정하는 것은 코드베이스를 간단하게 유지하고 분할하는 효과적인 방법일 수 있어요. 새로운 디자인을 추가하는 것은 완전히 별도의 파일에서 할 수 있어서 현재 구성 요소에 오류와 버그를 도입할 가능성이 줄어들어요.

여기서 전체 예제 repo를 확인하세요

여기서 데모 사이트를 확인하세요

아래 내용도 참고해보세요:



# 친절한 영어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우하세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- PlainEnglish.io에서 더 많은 콘텐츠 만나보세요