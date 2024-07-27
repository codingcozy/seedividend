---
title: "Vue3와 함께 더 나은 저장소 만들기 - Pinia에서 글로벌 저장소, 중첩 및 Vue Router에 접근하기"
description: ""
coverImage: "/assets/img/2024-05-12-BetterStoresinPiniawithVue3GlobalStoresNestingandAccessingVueRouterinPinia_0.png"
date: 2024-05-12 23:37
ogImage: 
  url: /assets/img/2024-05-12-BetterStoresinPiniawithVue3GlobalStoresNestingandAccessingVueRouterinPinia_0.png
tag: Tech
originalTitle: "Better Stores in Pinia with Vue3 — Global Stores, Nesting and Accessing Vue Router in Pinia"
link: "https://medium.com/letstream-official/better-stores-in-pinia-with-vue3-global-stores-nesting-and-accessing-vue-router-in-pinia-0064a6f22ed6"
---


![이미지](/assets/img/2024-05-12-BetterStoresinPiniawithVue3GlobalStoresNestingandAccessingVueRouterinPinia_0.png)

Vue 2에서 Vue 3로 이주하면서 Pinia가 이제 Vue 3를 위한 권장 스토어 플러그인이 되었고 Vuex가 아니게 되어 전환이 필요했습니다. 우리 아키텍처와 팀 전체가 Vuex와 작업하는 데 익숙했기 때문에 모든 스토어를 하나의 전역 변수 $store로 액세스하고 모든 곳에서 손쉽게 액세스할 수 있을 때를 좋아합니다!

그래서 우리는 Pinia에서 부족해 보이는 3가지 핵심 기능을 지원하기 위해 일부 사항을 수정했습니다.

- 우리 아직까지 사용 중인 this.$store를 통해 스토어에 액세스하기
- 중첩 구조의 스토어 보유
- 액션 내에서 Vue Router에 액세스하기



# 기본 설정

우리는 src/stores 안에 비슷한 디렉토리 구조를 가진 모든 스토어를 생성했습니다.

```javascript
- src
  -> store
     -> auth
        -> getters.js
        -> index.js
        -> state.js
     -> index.js
     -> state.js
```

주요 index.js는 중첩과 모든 것을 포함한 완전한 스토어의 진입점 역할을 하며, 중첩이 어떻게 작동하는지 등에 대한 설명은 다음 단계에서 설명하겠습니다.



```js
// src/store/index.js
import state from "./state.js"
import authStore from "./auth"

export const useStore = defineStore('core', {  
  state: () => state,
  actions: {
    setStores() {
      this.auth = authStore()
    }
  }
})

export default useStore
```

```js
// src/store/state.js
export default {   
    auth: null,
    version: "1.0.0",
}
```

```js
// src/store/auth/index.js
import state from "./state.js"
import getters from "./getters.js"

export const useStore = defineStore('auth', {  
  state: () => state,
  getters,
  actions: {
    updateUserToken (token) {
      this.token = token
      localStorage.setItem('token', token)
    }
  }
})

export default useStore
```

```js
// src/store/auth/state.js
export default {
  token: null
}
```



```js
// src/store/auth/getters.js

export default {}
```

# 1. Pinia에서 스토어 중첩하기

기본적으로 Pinia는 필요할 때 스토어를 직접 가져와서 사용하는 것이지만, 우리가 원하는 것은 그게 아닙니다. Vuex에서 했던 것처럼 쉽게 접근하고 싶습니다. 그래서 다음과 같이 했습니다.

메인 스토어에 스토어 이름(예: auth)으로 새로운 상태 변수를 만듭니다.



```js
// src/store/state.js
export default {
  auth: null
}
```

이 변수를 사용하려는 Pinia 스토어에 초기화하고 설정하세요. 예를 들어, authStore 를 사용하시려면 주요 스토어의 액션에 추가하여 필요한 모든 스토어를 초기화할 수 있습니다. 예를 들어, setStores()에 다음을 추가하세요.

```js
// src/store/index.js

...
import authStore from "./auth"
...

export const useStore = defineStore('core', {  
  state: () => state,
  actions: {
    setStores() {
      this.auth = authStore() // 액션 내에서 스토어를 초기화합니다.
    },
    ... // 다른 메서드
  }
})
```

주요 스토어를 초기화한 후에 이 액션을 호출하세요.



```js
// main.js
...
import { createPinia } from 'pinia'
...
import store from "@/store"
...
app.use(createPinia()) // Pinia 생성
export const $store = store() // 메인 스토어 초기화
$store.setStores() // 모든 중첩 스토어 초기화하는 액션 호출
```

그게 다야! 이제 모든 스토어에 메인 스토어에서 직접 액세스할 수 있습니다. 다음은 예시입니다 (Options API),

```js
<script>
import { $store } from "@/main.js"

export default {
    mounted() {
       console.log($store.auth.token) // auth 상태에 액세스
       console.log($store.auth.setToken("12345")) // auth 액션 호출
       console.log($store.someState) // 메인 스토어 상태에 액세스
    }
}

</script>
```

# 2. 핀니아 스토어를 전역적으로 접근 가능하게 만들기



이제 한 변수를 통해 중첩된 상점에 접근할 수 있게 되었으니, 이제 그것을 컴포넌트 내에서 직접 액세스할 수 있도록 만들어보겠습니다. 그렇게 하려면 vue의 Global Properties를 사용하여 매핑해야 합니다. 다음과 같이 해보세요.

- main.js에서 메인 상점을 초기화하십시오.
- $store라는 전역 속성을 설정하고 해당 상점을 할당하십시오.
- 즐기세요!

```js
// main.js

...
import { createPinia } from 'pinia'
...
import store from "@/store"
...
app.use(createPinia()) // Pinia 생성

export const $store = store() // 주 상점 초기화
app.config.globalProperties.$store = $store // 상점을 전역적으로 액세스 가능하게 만듦
app.config.globalProperties.$store.setStores() // 모든 중첩된 상점을 초기화하는 작업 호출
```

이것으로 끝났습니다! 이제 옵션 API를 사용하는 컴포넌트 내에서 다음과 같이 액세스할 수 있습니다:



```js
<script>
export default {
    mounted() {
       console.log(this.$store.auth.token) // "auth" 상태에 접근하기
       console.log(this.$store.auth.setToken("12345")) // "auth" 액션 호출하기
       console.log(this.$store.someState) // 메인 상점의 상태에 접근하기
    },
    watch: {
        '$store.auth.token'() { console.log("변경 발생") } // 워치하여 변경 감지하기
    } 
}

</script>
```

# 3. 핀이아 액션 내부에서 Vue Router에 액세스하기

우리는 상점에서 라우터 인스턴스를 직접 가져오고 사용하려고 시도했지만, 올바르지 않은 것처럼 보였습니다. 그때 우리는 특정 속성을 설정할 수 있는 방법을 찾았고 이렇게 설정할 수 있습니다.

```js
// main.js

...
import router from '@/router'
...
import { createPinia } from 'pinia'

let pinia = createPinia()
pinia.use({store} => {store.router = router}) // 여기서 라우터를 설정하여 상점 내에서 접근할 수 있도록 하기
app.use(pinia)

...
```



이렇게 하면 우리는 스토어 내에서 언제든지 라우터 인스턴스에 액세스할 수 있어요.

```js
// srcs/store/index.js

...
import authStore from "./auth"
...

export const useStore = defineStore('core', {  
  state: () => state,
  actions: {
    logRoute() {
       console.log(this.router) // Router Instance
       console.log(this.router.currentRoute) // 현재 라우트 가져오기 (this.$route)
    }
    ... // 다른 메서드
  }
})
```

그리고 이렇게 함으로써 우리는 세 가지 고통을 해결했어요! 세 가지가 모두 구현된 완전한 스크립트는 다음과 같아요.

```js
디렉토리 구조
- src
  -> store
     -> auth
        -> getters.js
        -> index.js
        -> state.js
     -> index.js
     -> state.js
  -> main.js
  -> router
     -> index.js
```



```js
// src/store/index.js

import state from "./state.js"
import authStore from "./auth"

export const useStore = defineStore('core', {  
  state: () => state,
  actions: {
    setStores() {
      this.auth = authStore()
    }
  }
})

export default useStore
```

```js
// src/store/state.js
export default {   
    auth: null,
    version: "1.0.0",
}
```

```js
// src/store/auth/index.js

import state from "./state.js"
import getters from "./getters.js"

export const useStore = defineStore('auth', {  
  state: () => state,
  getters,
  actions: {
    updateUserToken (token) {
      this.token = token
      localStorage.setItem('token', token)
    }
})

export default useStore
```

```js
// src/store/auth/state.js

export default {
  token: null
}
```



```js
// src/store/auth/getters.js

export default {}
```

```js
// main.js
...
import router from '@/router'
...
import { createPinia } from 'pinia'

let pinia = createPinia()
pinia.use({store} => {store.router = router}) // 여기에 router를 설정하여 store 내부에서 접근할 수 있게 함
app.use(pinia)
...

export const $store = store() // 주요 Store 초기화
app.config.globalProperties.$store = $store // Store를 전역적으로 접근 가능하게 함
app.config.globalProperties.$store.setStores() // 모든 중첩 Store를 초기화하는 작업 호출
```

여기까지입니다! 같은 결과를 달성할 수 있는 다른 방법을 발견하면 알려주시기 바랍니다!