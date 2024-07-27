---
title: "Vue 3 올바른 방법으로 기본 입력 컴포넌트 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-Vue3ImplementaBaseInputComponenttheRightWay_0.png"
date: 2024-05-14 13:14
ogImage: 
  url: /assets/img/2024-05-14-Vue3ImplementaBaseInputComponenttheRightWay_0.png
tag: Tech
originalTitle: "[Vue 3] Implement a Base Input Component the Right Way"
link: "https://medium.com/@fadamakis/vue-3-implement-a-base-input-component-the-right-way-f5ef2f917221"
---


대규모 애플리케이션을 만드는 것은 아주 큰 탑을 짓는 것과 같을 수 있어요. 하지만 그 탑들이 작고 간단한 건물 블록들로 이루어져 있는 것처럼 말이죠. 이 기본 부품 중 하나가 입력 상자인데요. 기본적으로 보일 수도 있지만, 복잡한 기능을 갖추게 하면 정말 복잡해질 수 있어요.

함께 기본 입력 컴포넌트를 구현해봐요. 이것은 어떤 애플리케이션을 만들 때 중요한 작은 단계일 거예요.

## 네이밍

명명하는 것은 어렵죠. 다행히 Vue 스타일 가이드는 기본 컴포넌트의 이름을 Base App 또는 V 접두사와 함께 사용하는 것을 강하게 권장하고 있어요.



AppInput.vue 이름은 우리의 사용 사례에 딱 맞는 것 같아요.

## 초기화

먼저 일관성을 위해 CSS 초기화가 필요해요.

```js
npm install normalize.css
```



```js
/* main.css */
@import 'normalize.css'
```

## Basic Styles

기본 스타일부터 시작해봅시다. 우선 입력란에 대한 기본 구현부터 해보겠습니다. 지금은 모든 입력란이 동일한 모양과 느낌을 가지도록 하는 것이 목표입니다.

```js
<template>
  <input
    type="text"
    class="input"
  />
</template>

<style lang="scss" scoped>
.input {
  box-sizing: border-box;
  width: 100%;
  background: #f5f8fa;
  border: 1px solid #cccccc;
  padding: 8px 20px;
  outline: 0;
  border-radius: 8px;
}
</style>
```



사용법이 간단합니다.

```js
<script setup lang="ts">
import AppInput from '@/components/AppInput.vue'
</script>

<template>
  <main>
    <h1>기본 입력란 데모</h1>
    <AppInput placeholder="이름을 입력해주세요" />
  </main>
</template>
```

플레이스홀더에 fallthrough 속성을 사용 중임을 유의하세요. 이것은 컴포넌트의 루트 요소로 자동 전달됩니다.

![이미지](/assets/img/2024-05-14-Vue3ImplementaBaseInputComponenttheRightWay_0.png)



## 검색 변형

이제 더 둥근 UI를 가진 검색을 위해 다른 변형을 만들어보겠습니다. 이를 위해 pill이라는 프롭을 사용할 것입니다.

```js
<script lang="ts" setup>
defineProps({
  pill: {
    type: Boolean,
  },
});
</script>

<template>
  <input
    type="text"
    class="input"
    :class="{
      pill,
    }"
  />
</template>

<style lang="scss" scoped>
.input {
  box-sizing: border-box;
  width: 100%;
  background: #f5f8fa;
  border: 1px solid #cccccc;
  padding: 8px 20px;
  outline: 0;
  border-radius: 8px;

  &.pill {
    border-radius: 32px;
  }
}
</style>
```

```js
<AppInput pill placeholder="검색" />
```



테이블 태그를 마크다운 형식으로 변경하십시오.

| The only interesting thing is | `:class="'pill'"` | It will apply the class pill if the prop variable with the same name is truthy. |
|------------------------------|-------------------|--------------------------------------------------|
| Remove Hardcoded CSS Values  | Before moving on let’s tackle the hardcoded values in our styles. As our application grows larger we should have our pallete, typography, and spacings declared in a centralized place for everyone to use. This can be done with CSS variables or SCSS variables. We will use SCSS this time. |



다음 내용을 포함한 _variables.scss 파일을 만들어주세요.

```scss
$color-light: #f5f8fa;
$color-border: #cccccc;

@function spacing($factor: 1) {
  @return $factor * 4px;
}

$border-radius-input: spacing(2);
$border-radius-pill: spacing(8);
```

스페이싱 믹스인은 4픽셀 그리드를 강제하는 방법으로, 시각적 리듬을 가진 쾌적한 UI를 만드는 데 도움이 됩니다.

이제 공통 변수를 사용하여 스타일을 업데이트할 수 있습니다.



```js
...

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.input {
  box-sizing: border-box;
  width: 100%;
  background: $color-light;
  border: 1px solid $color-border;
  padding: spacing(2) spacing(5);
  outline: 0;
  border-radius: $border-radius-input;
  &.pill {
    border-radius: $border-radius-pill;
  }
}
</style>
```

반면에 모든 컴포넌트에 import하는 것을 피하기 위해 vite.config.ts 파일을 다음과 같이 업데이트할 수도 있습니다:

```js
export default defineConfig({
  ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
        `
      }
    }
  }
  ...
})
```

## 레이블



플레이스홀더를 레이블로 사용하는 것은 접근성이 떨어지고 전체적으로 사용자 경험이 좋지 않습니다. 이 문제를 해결하기 위해 플로팅 레이블을 구현해 봅시다. 이를 위해 우선 입력란을 래퍼로 감싸고 약간 정리해야 합니다.

```js
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});
defineProps({
  pill: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="input"
      v-bind="$attrs"
      :class="{
        'has-label': $slots.label,
        pill,
      }"
    />
    <div class="label">
      <slot name="label" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}

.input {
  box-sizing: border-box;
  width: 100%;
  background: $color-light;
  border: 1px solid $color-border;
  padding: spacing(2) spacing(5);
  outline: 0;
  border-radius: $border-radius-input;
  &.pill {
    border-radius: $border-radius-pill;
  }
  &.has-label {
    padding-top: spacing(6);
    &::placeholder {
      color: transparent;
    }
  }
}

.label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: spacing(4) spacing(5);
  pointer-events: none;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
</style>
```

이제 입력란이 더 이상 루트 요소가 아니기 때문에 inheritAttrs 옵션을 false로 설정하고 수동으로 $attrs를 바인딩해야 합니다.

실제 레이블은 동일한 이름의 슬롯을 사용하여 전달됩니다. 이 레이블은 절대 위치에 있으며 상태 간에 전환에 사용되는 트랜지션을 가지고 있습니다.



<img src="https://miro.medium.com/v2/resize:fit:1200/1*l91i6d4b3MVHxv1QMUP5tA.gif" />

## 접두사 및 접미사

입력란은 일반적으로 통화, 아이콘 또는 동작이 있는 다른 컴포넌트와 같은 추가 정보와 관련이 있습니다. 기본 컴포넌트는 슬롯을 사용하여 나타나기 전이나 나타난 후에 사용자 정의 콘텐츠를 지원해야 합니다.

```js
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});
defineProps({
  pill: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="input"
      v-bind="$attrs"
      :class="{
        'has-prefix': $slots.prefix,
        'has-suffix': $slots.suffix,
        'has-label': $slots.label,
        pill,
      }"
    />
    <div class="label">
      <slot name="label" />
    </div>
    <div class="prefix">
      <slot name="prefix" />
    </div>
    <div class="suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  + .input-wrapper {
    margin-top: spacing(4);
  }
}
.input {
  box-sizing: border-box;
  width: 100%;
  background: $color-light;
  border: 1px solid $color-border;
  padding: spacing(2) spacing(5);
  outline: 0;
  border-radius: $border-radius-input;
  &.pill {
    border-radius: $border-radius-pill;
  }
  &.has-prefix {
    padding-left: spacing(12);
  }
  &.has-suffix {
    padding-right: spacing(12);
  }
  &.has-label {
    padding-top: spacing(6);
    &::placeholder {
      color: transparent;
    }
  }
}

.label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: spacing(4) spacing(5);
  pointer-events: none;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}
.input.has-prefix ~ .label {
  left: spacing(7);
}

.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}

.prefix, .suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.prefix {
  left: spacing(4);
}
.suffix {
  right: spacing(4);
}
</style>
```



이것은 prefix와 suffix라는 두 가지 추가 슬롯이 있는 레이블과 동일한 기술을 사용합니다.

## 변경 사항을 듣기

반응하는 것이 빠진 유일한 부분입니다. V-모델은 바로 이를 위해 Vue에서 제공됩니다.

우리의 데이터를 보유하는 반응형 객체인 userInfo가 있다고 가정해 봅시다. v-model="userInfo.name"을 추가해야 합니다.



```js
<script setup lang="ts">
import { reactive } from "vue";

const userInfo = reactive({
  name: "Fotis",
  ...
});
</script>

<template>
  <main>
    <h1>Base Input Demo</h1>

    <AppInput v-model="userInfo.name" placeholder="이름">
      <template #label> 이름 </template>
    </AppInput>
  </main>
</template>
```

v-model은

```js
 :value="modelValue"
 @input="emit('update:modelValue', $event.target.value)"
```

의 단축 버전입니다.

이를 반영하여 AppInput을 업데이트해보겠습니다.



```js
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

defineProps({
  modelValue: {
    type: String
  },
  pill: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue'] )
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="input"
      v-bind="$attrs"
      :value="modelValue"
      @input="updateValue"
      :class="{
        'has-prefix': $slots.prefix,
        'has-suffix': $slots.suffix,
        'has-label': $slots.label,
        pill,
      }"
    />
    ...
  </div>
</template>
```

위의 변경 사항은 다음과 같습니다:

- modelValue prop을 추가했습니다.
- update:modelValue 이벤트를 선언했습니다.
- input 요소의 value와 input 속성에 둘 다 바인딩됐습니다.

이제 input 값을 변경하면 반응성 있는 userInfo 객체에 반영될 것입니다.



## 모든 것을 모아보기

마지막으로, 간단한 폼을 만들어 입력 사용법을 보여드릴게요.

```js
<script setup lang="ts">
import AppInput from "@/components/AppInput.vue";
import AppIcon from "@/components/AppIcon.vue";
import { reactive } from "vue";

const userInfo = reactive({
  name: "Fotis",
  bio:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deleniti laboriosam eligendi. Incidunt dolores dicta veritatis. Quaerat ad, magnam esse, illo atque delectus minus, nihil adipisci tempora nobis iusto. Excepturi?",
  location: "Barcelona",
  website: "fadamakis.com",
});

function submitForm() {
  alert('Info submitted: ' + JSON.stringify(userInfo))
}
</script>

<template>
  <main>
    <h1>Base Input Demo</h1>

    <AppInput v-model="userInfo.name" placeholder="이름">
      <template #label> 이름 </template>
    </AppInput>

    <AppInput v-model="userInfo.bio" placeholder="소개">
      <template #label> 소개 </template>
    </AppInput>

    <AppInput v-model="userInfo.location" placeholder="위치">
      <template #label> 위치 </template>
      <template #prefix>
        <AppIcon icon="pin" />
      </template>
    </AppInput>

    <AppInput v-model="userInfo.website" placeholder="웹사이트">
      <template #label> 웹사이트 </template>
      <template #prefix>
        <AppIcon icon="link" />
      </template>
    </AppInput>

    <button @click="submitForm">
      제출하기 <AppIcon size="2x" icon="arrow-right-circle" />
    </button>

    <hr />

    <AppInput pill name="search" placeholder="검색">
      <template #prefix>
        <AppIcon icon="search" />
      </template>
    </AppInput>

    <AppInput placeholder="메시지를 보내주세요...">
      <template #suffix>
        <AppIcon size="2x" icon="arrow-right-circle" />
      </template>
    </AppInput>

  </main>
</template>
```

결과는 다음과 같습니다:



<img src="/assets/img/2024-05-14-Vue3ImplementaBaseInputComponenttheRightWay_1.png" />

실제로 테스트해보고 GitHub에서 소스 코드를 확인할 수 있어요.

구현에 대한 피드백, 아이디어 또는 다른 의견이 있다면 매우 환영합니다.

<img src="/assets/img/2024-05-14-Vue3ImplementaBaseInputComponenttheRightWay_2.png" />



ⓘ 이 글은 Base Component 구현 시리즈의 일부입니다:

- AppInput.vue (여기 있습니다!)
- AppModal.vue
- AppIcon.vue

추가로 하고 싶은 내용이 있으시면 댓글을 남겨주세요.