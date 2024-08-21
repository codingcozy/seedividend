---
title: "Vue3에서 구성 요소 간 통신하는 9가지 방법"
description: ""
coverImage: "/assets/img/2024-06-20-9WaysofComponentCommunicationinVue3_0.png"
date: 2024-06-20 04:12
ogImage:
  url: /assets/img/2024-06-20-9WaysofComponentCommunicationinVue3_0.png
tag: Tech
originalTitle: "9 Ways of Component Communication in Vue3"
link: "https://medium.com/stackademic/9-ways-of-component-communication-in-vue3-9059520f070e"
isUpdated: true
---

![이미지](/assets/img/2024-06-20-9WaysofComponentCommunicationinVue3_0.png)

# 개요

- props / emit
- provide / inject
- Pinia
- expose / ref
- attr
- v-model
- mitt.js
- Slots
- Teleport

# Props / Emit

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

부모 컴포넌트는 props를 사용하여 데이터를 자식 컴포넌트로 전달하고, 자식 컴포넌트는 이벤트를 사용하여 부모 컴포넌트에 데이터를 전달합니다.

부모 컴포넌트에서 데이터를 자식 컴포넌트로 전달합니다.

```js
// Parent.vue에서 전송
<child :msg2="msg2"></child>
<script setup lang="ts">
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const msg2 = ref<string>("자식 컴포넌트로 전송되는 메시지 2입니다")
    // 복잡한 타입의 경우
    const msg2 = reactive<string>(["하위 컴포넌트로 전송되는 메시지 2입니다"])
</script>

// Child.vue에서 수신
<script setup lang="ts">
    // import 할 필요 없이 직접 사용합니다
    // import { defineProps } from "vue"
    interface Props {
      msg1: string
      msg2: string
    }
    const props = withDefaults(defineProps<Props>(), {
      msg1: '',
      msg2: '',
    })
    console.log(props) // { msg2: "하위 컴포넌트로 전송되는 메시지 2입니다" }
</script>
```

참고:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

부모 컴포넌트가 setup() 메서드를 사용하고 자식 컴포넌트가 script setup 구문을 사용하는 경우, 부모의 데이터에서 속성을 전달받지 못하며 부모의 setup 함수에서 전달받은 속성만 받을 수 있습니다.

부모 컴포넌트가 script setup 구문을 사용하고 자식 컴포넌트가 setup() 메서드를 사용하는 경우, 자식은 부모의 데이터 및 setup 함수에서 속성을 모두 받을 수 있습니다. 그러나 자식 컴포넌트가 setup에서 속성을 받으려면 부모의 setup 함수에서만 속성을 받을 수 있고 데이터 속성에서는 받을 수 없습니다.

자식 컴포넌트가 부모로 데이터를 전달

```js
// Child.vue dispatch
<template>
    // 방법 1
    <button @click="emit('myClick')">버튼</button>
    // 방법 2
    <button @click="handleClick">버튼</button>
</template>
<script setup lang="ts">

    // 방법 1: Vue3.2 버전에 적합, import 필요 없음
    // import { defineEmits } from "vue"
    // 방법 1에 대응
    const emit = defineEmits(["myClick","myClick2"])
    // 방법 2에 대응
    const handleClick = ()=>{
        emit("myClick", "부모 컴포넌트로 전송된 메시지입니다")
    }

    // 방법 2: Vue3.2 버전에 적합하지 않음, useContext()는 사용이 중단됨
    import { useContext } from "vue"
    const { emit } = useContext()
    const handleClick = () => {
        emit("myClick", "부모 컴포넌트로 전송된 메시지입니다")
    }
</script>

// Parent.vue response
<template>
    <child @myClick="onMyClick"></child>
</template>
<script setup lang="ts">
    import child from "./child.vue"
    const onMyClick = (msg: string) => {
        console.log(msg) // 부모 컴포넌트가 받은 메시지입니다
    }
</script>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 제공 / 주입

이 매커니즘은 부모로부터 하위 구성 요소 중 어떤 것이든 종속성 주입을 개발하는 데 사용됩니다. 반드시 직계 자식 구성 요소일 필요는 없습니다.

제공: 우리가 지정한 데이터를 주입할 수 있도록 합니다.

주입: 어떠한 하위 구성 요소에서도 이 구성 요소에 추가하고 싶은 데이터를 수신합니다. 구성 요소가 얼마나 심층적으로 중첩되었는지와는 관계없이 직접 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// Parent.vue
<script setup>
    import { provide } from "vue"
    provide("name", "Jhon")
</script>

// Child.vue
<script setup>
    import { inject } from "vue"
    const name = inject("name")
    console.log(name) // Jhon
</script>
```

# Pinia

Pinia는 Vuex의 대체로 설계된 새로운 Vue 상태 관리 라이브러리입니다.

```js
// main.ts
import { createPinia } from 'pinia'
createApp(App).use(createPinia()).mount('#app')

// /store/user.ts
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
    state: () => {
        return {
            count: 1,
            arr: []
        }
    },
    getters: { ... },
    actions: { ... }
})

// Page.vue
<template>
    <div>{ store.count }</div>
</template>
<script lang="ts" setup>
import { userStore } from '../store'
const store = userStore()
// 분해할당
// const { count } = userStore()
</script>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 노출 / 참조

참조는 부모 구성 요소가 자식 구성 요소의 인스턴스나 요소에 직접 액세스하는 데 사용될 수 있습니다.

```js
// Child.vue
<script setup>
    // 방법 1 Vue 3.2 버전에 적합하지 않으며,이 버전에서 useContext()는 사용되지 않습니다.
    import { useContext } from "vue"
    const ctx = useContext()
    // 노출된 속성 및 메서드 등
    ctx.expose({
        childName: "이것은 자식 구성 요소의 속성입니다",
        someMethod(){
            console.log("이것은 자식 구성 요소의 메서드입니다")
        }
    })

    // 방법 2 Vue 3.2 버전에 적합하며, import할 필요가 없습니다.
    // import { defineExpose } from "vue"
    defineExpose({
        childName: "이것은 자식 구성 요소의 속성입니다",
        someMethod(){
            console.log("이것은 자식 구성 요소의 메서드입니다")
        }
    })
</script>

// Parent.vue  참조 ref="comp"
<template>
    <child ref="comp"></child>
    <button @click="handlerClick">버튼</button>
</template>
<script setup>
    import child from "./child.vue"
    import { ref } from "vue"
    const comp = ref(null)
    const handlerClick = () => {
        console.log(comp.value.childName) // 자식 구성 요소에서 노출된 속성 가져오기
        comp.value.someMethod() // 자식 구성 요소에서 노출된 메서드 호출
    }
</script>
```

# attrs

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

attrs: 부모 스코프에서 클래스 및 스타일을 제외한 컬렉션을 포함합니다.

```js
// Parent.vue에서 전송
<child :msg1="msg1" :msg2="msg2" title="3333"></child>
<script setup>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const msg1 = ref("1111")
    const msg2 = ref("2222")
</script>

// Child.vue에서 수신
<script setup>
    import { defineProps, useAttrs } from "vue"
    const props = defineProps({
        msg1: String
    })

    const attrs = useAttrs()
    console.log(attrs) // { msg2:"2222", title: "3333" }
</script>
```

# v-model

여러 데이터 요소에 대한 양방향 데이터 바인딩을 지원합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// Parent.vue
<child v-model:key="key" v-model:value="value"></child>
<script setup>
    import child from "./child.vue"
    import { ref, reactive } from "vue"
    const key = ref("1111")
    const value = ref("2222")
</script>

// Child.vue
<template>
    <button @click="handlerClick">Button</button>
</template>
<script setup>

    // Method 1은 useContext()이 폐기됨에 따라 Vue 3.2 버전에 적합하지 않습니다.
    import { useContext } from "vue"
    const { emit } = useContext()

    // Method 2는 Vue 3.2 버전에 적합하며, import 할 필요가 없습니다.
    // import { defineEmits } from "vue"
    const emit = defineEmits(["key","value"])

    // 사용법
    const handlerClick = () => {
        emit("update:key", "새로운 키")
        emit("update:value", "새로운 값")
    }
</script>
```

# mitt.js

Vue3에서는 컴포넌트간 통신을 위한 EventBus가 더 이상 사용되지 않지만, EventBus와 동일한 원리를 기반으로 하는 mitt.js라는 대체 방법이 새롭게 도입되었습니다.

```js
// mitt.js
import mitt from 'mitt'
const mitt = mitt()
export default mitt;

// 컴포넌트 A
<script setup>
import mitt from './mitt'
const handleClick = () => {
    mitt.emit('handleChange')
}
</script>

// 컴포넌트 B
<script setup>
import mitt from './mitt'
import { onUnmounted } from 'vue'
const someMethed = () => { ... }
mitt.on('handleChange',someMethed)
onUnmounted(()=>{
    mitt.off('handleChange',someMethed)
})
</script>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 슬롯

슬롯은 부모 구성 요소가 자식 구성 요소의 콘텐츠 일부를 제어할 수 있도록 합니다. 재사용 가능하고 유연한 구성 요소 템플릿을 만드는 데 유용합니다.

## 기본 슬롯

```js
// Parent.vue
<FancyButton>
  Click me! <!-- 슬롯 콘텐츠 -->
</FancyButton>

// Child.vue
<button class="fancy-btn">
  <slot></slot> <!-- 슬롯 출력 -->
</button>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 이름이 지정된 슬롯

이름이 지정된 슬롯은 기본 슬롯을 기반으로 한 분류이며, 내용물을 해당 자리 표시자에 일치시키는 것으로 이해할 수 있습니다.

```js
// Parent.vue
<template>
  <Child>
    <template v-slot:monkey>
      <div>monkey</div>
    </template>

    <button>Click me!</button>
  </Child>
</template>

// Child.vue
<template>
  <div>
    <!-- 기본 슬롯 -->
    <slot></slot>
    <!-- 이름이 지정된 슬롯 -->
    <slot name="monkey"></slot>
  </div>
</template>
```

## 스코프 있는 슬롯

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

슬롯의 내용은 자식 컴포넌트의 상태에 액세스할 수 없습니다. 그러나 경우에 따라 슬롯의 내용이 부모 컴포넌트의 sphere와 자식 컴포넌트의 sphere에서 데이터를 사용하고 싶을 수 있습니다. 이를 달성하기 위해서는 렌더링 시 자식 컴포넌트가 슬롯에 데이터를 제공할 수 있는 방법이 필요합니다.

```js
// Parent.vue
<template>
  <!-- v-slot="{scope}"은 자식 컴포넌트에서 전달된 데이터를 수신하는 데 사용됩니다 -->
  <!-- :list="list"은 리스트를 자식 컴포넌트에 전달합니다 -->
  <Child v-slot="{scope}" :list="list">
    <div>
      <div>Name: { scope.name }</div>
      <div>Occupation: { scope.occupation }</div>
      <hr>
    </div>
  </Child>
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const list = ref([
  { name: 'Jhon', occupation: 'Thundering'},
  ...
])
</script>

// Child.vue
<template>
  <div>
    <!-- 각 항목을 반환하려면 :scope="item"을 사용합니다 -->
    <slot v-for="item in list" :scope="item" />
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>
```

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 가기 전에:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 작가에게 박수와 팔로우를 부탁드립니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Differ
- 더 많은 콘텐츠: Stackademic.com
