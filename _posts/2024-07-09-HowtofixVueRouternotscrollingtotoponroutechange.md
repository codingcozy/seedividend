---
title: "라우트 변경 시 Vue Router가 상단으로 스크롤되지 않는 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtofixVueRouternotscrollingtotoponroutechange_0.png"
date: 2024-07-09 18:45
ogImage: 
  url: /assets/img/2024-07-09-HowtofixVueRouternotscrollingtotoponroutechange_0.png
tag: Tech
originalTitle: "How to fix Vue Router not scrolling to top on route change"
link: "https://medium.com/@andrewmasonmedia/how-to-fix-scroll-to-top-scrollbehaviour-not-working-in-vue-router-b443c0fecf91"
isUpdated: true
---



일반적인 웹사이트에서는 페이지를 다시로드할 때 브라우저 창이 항상 페이지 맨 위로 스크롤됩니다. 그러나 Vue와 같은 프론트엔드 프레임워크가 있는 응용프로그램에서는 페이지를 다시로드하지 않기 때문에 이는 기본 동작이 아닙니다. 이를 제어하기 위해 Vue Router에는 scrollBehaviour() 함수가 있어 앱이 페이지 간 이동 중에 스크롤 위치를 맨 위로 돌아가게 할 수 있습니다. 그러나 제 최신 Vue 프로젝트(Vue 3, Vite, Vue Router 4)에서는 이게 작동하지 않았습니다. 이 문제를 해결한 방법을 소개합니다.

![이미지](/assets/img/2024-07-09-HowtofixVueRouternotscrollingtotoponroutechange_0.png)

## TL;DR

CSS에서 body와 html 요소, 그리고 App.js 파일의 부모 컨테이너에서 overflow-x: hidden을 제거하십시오.

<div class="content-ad"></div>

## \*업데이트

페이지의 overflow-x: hidden를 유지하는 동시에 라우트 스크롤에 영향을 주지 않으려면 각 페이지 내의 부모 컨테이너에 추가할 수 있습니다. 저는 모든 뷰/페이지를 감싸는 Layout 컴포넌트 내의 부모 div에 이를 추가함으로써 이 작업을 수행했습니다.

## 설명

페이지/경로 간에 이동할 때 Vue Router는 이전 페이지에서의 스크롤 위치를 자동으로 유지하여 새 페이지로 이동합니다. 이는 멍청한 것처럼 들립니다. 저의 소견으로는 기본 동작으로 설정해서는 안된다고 생각합니다. 그러나 아마존에서 특정 청바지를 보고 있는 중에 브라우저의 뒤로가기 버튼을 사용하여 해당 상품으로 돌아갈 수 있게하려면 특히 유용합니다. 맨 위부터 다시 시작해야 하는 대형 스크롤 전자 상거래 사이트에서 매우 편리합니다.

<div class="content-ad"></div>

그러니까, 내 앱 얘기로 돌아가볼게요.

경로 변경 시 상단으로 스크롤되지 않았어요. 내가 뭘 해도 아무것도 작동하지 않았어요. 왜 그런지 찾기 위해 모든 변형과 용어를 구글링했죠. 많은 결과가 돌아왔지만, 모두 Vue Router 문서를 가리켰어요. 네, 그들은 말해요, Vue Router를 사용해서 루트/페이지를 정상적인 웹사이트처럼 상단으로 스크롤할 수 있어요. 이렇게 하면 돼요:

```js
// 항상 상단으로 스크롤

scrollBehavior(to, from, savedPosition) {
  return { top: 0 }
},

// 만약 to, from, savedPosition 값이 없다면, 제거하세요.
```

또는 이렇게 하세요:

<div class="content-ad"></div>

```js
scrollBehavior() {
  return { x: 0, y: 0 }
},
```

또는 이렇게 하세요:

```js
scrollBehavior() {
  window.scrollTo(0, 0)
},
```

또는 각 구성 요소 내에서 다음을 수행하세요:

<div class="content-ad"></div>

```js
// Vue 3 setup/Composition을 사용하는 경우

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

// Vue 2 Options을 사용하는 경우

<script>

mounted: {
  window.scrollTo(0, 0)
}
</script>
```

하지만, 아이구. 아무것도 작동하지 않았어요.

같은 문제를 겪는 사람들의 게시물을 몇 개 찾았어요. 제가 생각한 답변들은 모두 위와 같았어요. 그래도 제게는 아무것도 작동하지 않았어요.

그래서 Vue 개발자 친구에게 이 문제를 겪어봤는지 물어봤어요.

<div class="content-ad"></div>

그러셔요.

CSS에 overflow-x: hidden이 적용된 부모 컨테이너는 라우터가 맨 위로 스크롤되는 것을 방지할 것입니다.

정말 인상깊은 순간이었어요. 내 앱의 body에 overflow-x: hidden을 설정하여 원치 않는 오버플로우를 피하려고 한 것을 알았을 때요. 이를 제거한 후 라우트 변경 시 맨 위로 스크롤하는 것이 잘 되었어요.

overflow: hidden을 제거한 후 router/index.js에 이것을 추가하여 scrollTop 값을 돌려받았어요.

<div class="content-ad"></div>

```js
scrollBehavior () {
  return { top: 0, left: 0 }
}

// 전체 router/index.js 코드:

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...],
  scrollBehavior() {
     return { top: 0, left: 0 }
   }
})
```

그리고 이것도 동작했어요:

```js
scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
```

그래서 (제게 괴로웠지만) 해결해야 했던 간단한 문제에 빠르게 고칠 수 있는 방법이 있었어요. overflow: hidden을 제거하고 router/index.js 파일에서 위의 옵션을 설정하세요.
