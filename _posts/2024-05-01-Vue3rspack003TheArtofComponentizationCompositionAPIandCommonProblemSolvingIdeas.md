---
title: "Vue3 + Vite 컴포넌트화 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-Vue3rspack003TheArtofComponentizationCompositionAPIandCommonProblemSolvingIdeas_0.png"
date: 2024-05-01 18:06
ogImage: 
  url: /assets/img/2024-05-01-Vue3rspack003TheArtofComponentizationCompositionAPIandCommonProblemSolvingIdeas_0.png
tag: Tech
originalTitle: "Vue3 + rspack 003 The Art of Componentization (Composition API) and Common Problem Solving Ideas"
link: "https://medium.com/@beckmoulton/vue3-rspack-003-the-art-of-componentization-composition-api-and-common-problem-solving-ideas-7a7f816d4d6a"
---


# Vue3 + rspack 003: 컴포넌트화의 기술 (Composition API) 및 일반적인 문제 해결 아이디어

Vue 3에서 Composition API는 컴포넌트와 로직을 재사용하는 새로운 방법을 제공합니다. 이는 우리의 코드에 더 나은 구성 구조를 제공할 뿐만 아니라 복잡한 컴포넌트 로직을 더 유연하게 처리할 수 있는 기회를 줍니다. 아래에서 탐색해봅시다.

# 컴포넌트 생성 및 사용

컴포넌트는 Vue 애플리케이션의 기본 구성 요소입니다. Composition API에서는 reactive 상태와 컴포넌트의 동작을 정의하기 위해 setup 함수를 사용합니다.

<div class="content-ad"></div>

# 예시: 간단한 카운터 컴포넌트

```js
<template>
  <button @click="increment">{ count }</button>
</template><script>
import { ref } from 'vue';export default {
  setup() {
    const count = ref(0);
    function increment() {
      count.value++;
    }    return { count, increment };
  };
</script>
```

# 실용적인 어려움과 해결책

어려움: Composition API를 사용할 때, 개발자들은 조각난 상태 로직을 경험하여 컴포넌트를 유지하기 어렵게 만들 수 있습니다.

<div class="content-ad"></div>

해결책: 관련 로직을 함수로 캡슐화한 후에 이 함수를 설정(setup)에서 호출하세요. 이렇게 하면 코드의 가독성과 유지보수성이 향상될 수 있습니다.

# 부모 및 자식 컴포넌트 간 통신

Vue 3에서 부모 및 자식 컴포넌트 간의 통신은 주로 props와 emit을 통해 이루어집니다. Composition API는 defineProps와 defineEmit 함수를 제공하여이 프로세스를 간단화합니다.

# 예: 부모-자식 컴포넌트 간 통신

<div class="content-ad"></div>

```js
<!-- ChildComponent.vue -->
<template>
  <div @click="emitToParent">나를 클릭해주세요!</div>
</template>
<script>
import { defineProps, defineEmit } from 'vue';
export default {
  setup() {
    const props = defineProps(['messageFromParent']);
    const emit = defineEmit(['messageToParent']);
    
    function emitToParent() {
      emit('messageToParent', '안녕하세요, 부모님!');
    }
    
    return { emitToParent };
  }
};
</script>

<!-- ParentComponent.vue -->
<template>
  <ChildComponent
    :messageFromParent="parentMessage"
    @messageToParent="handleMessageFromChild"
  />
</template>
<script>
import { ref } from 'vue';
import ChildComponent from './components/ChildComponent.vue';
export default {
  components: {
    ChildComponent
  },
  setup() {
    const parentMessage = ref('안녕하세요, 자식님!');
    
    function handleMessageFromChild(message) {
      console.log(message);
    }
    
    return { parentMessage, handleMessageFromChild };
  }
};
</script>
```

# 실용적인 어려움과 해결책

어려움 : 대규모 어플리케이션에서는 종종 다층 중첩된 컴포넌트 간의 통신 요구사항이 발생합니다. 직접 props와 emit을 사용하면 "props를 계층적으로 전달하는" 및 "이벤트를 계층적으로 발생시키는" 문제가 발생할 수 있습니다.

해결책 : 이러한 번거로운 계층별 전달을 피하기 위해 Vue 3의 provide 및 inject API를 사용하여 컴포넌트 간 수준의 통신을 할 수 있습니다.

<div class="content-ad"></div>

# 슬롯 사용

슬롯을 사용하면 자식 컴포넌트의 내용으로 어떤 템플릿 코드든 부모 컴포넌트에 전달할 수 있습니다. Composition API에서는 슬롯 내용에 접근할 수 있습니다.

# 예시: 슬롯 사용하기

```js
<!-- BaseLayout.vue -->
<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>
<script>
import { useSlots } from 'vue';
export default {
  setup() {
    const slots = useSlots();
    return { slots };
  }
};
</script>
<!-- App.vue -->
<template>
  <BaseLayout>
    <template #header>
      <h1>여기에 페이지 제목이 올 수 있어요</h1>
    </template>
    <p>페이지의 주요 내용</p>
    <template #footer>
      <p>여기에 연락처 정보가 있습니다</p>
    </template>
  </BaseLayout>
</template>
<script>
import BaseLayout from './components/BaseLayout.vue';
export default {
  components: {
    BaseLayout
  }
};
</script>
```

<div class="content-ad"></div>

# 실용적인 어려움과 해결책

어려움: 이름이 지정된 슬롯을 사용할 때, 슬롯 콘텐츠를 자식 컴포넌트의 상태 또는 동작에 따라 동기화하는 것이 복잡할 수 있습니다.

해결책: scoped 슬롯을 사용할 수 있습니다. scoped 슬롯을 사용하면 자식 컴포넌트가 부모 컴포넌트에 데이터를 노출시킬 수 있고 그 데이터를 부모 컴포넌트의 슬롯 콘텐츠에서 사용할 수 있습니다.

# 동적 컴포넌트와 비동기 컴포넌트

<div class="content-ad"></div>

Vue 3는 defineAsyncComponent를 통해 비동기 컴포넌트를 지원합니다. 동적 컴포넌트는 내장 `component` 태그와 `:` 속성을 사용하여 구현할 수 있습니다.

# 예시: 비동기 컴포넌트

```js
// defineAsyncComponent를 사용하여 비동기 컴포넌트 로드
import { defineAsyncComponent } from 'vue';export default {
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
};
```

# 예시: 동적 컴포넌트

<div class="content-ad"></div>

```js
<template>
  <component :is="currentComponent" />
</template>
<script>
import { ref } from 'vue';
import ComponentA from './components/ComponentA.vue';
import ComponentB from './components/ComponentB.vue';
export default {
  setup() {
    const currentComponent = ref('ComponentA');    // 실제 상황에 맞게 currentComponent의 값을 변경하여 컴포넌트를 전환할 수 있습니다.
    
    // currentComponent.value = 'ComponentB';
    
    return { currentComponent, ComponentA, ComponentB };
  }
};
</script>
```

# 실용적인 어려움과 해결책

어려움: 비동기 컴포넌트를 사용할 때 컴포넌트 로딩 지연이나 실패와 같은 문제가 발생할 수 있어 사용자 경험에 영향을 줄 수 있습니다.

해결책: 로딩 상태 힌트 및 오류 처리 매커니즘을 제공할 수 있습니다. 예를 들어, Suspense 컴포넌트를 사용하여 비동기 컴포넌트를 감쌀 수 있고 대체 콘텐츠(대체 콘텐츠)를 제공할 수 있습니다.

<div class="content-ad"></div>

```js
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

위의 예제와 해결책을 통해 Vue 3의 모듈화 및 Composition API가 강력한 기능과 유연성을 제공하여 우리가 실용적인 개발 문제를 더 잘 해결하고 우아한 방식으로 복잡한 애플리케이션을 구축할 수 있음을 볼 수 있습니다.