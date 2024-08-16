---
title: "Vue 3 디자인 시스템으로 재사용 가능한 디자인 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Vue 3 Design System Series -1"
link: "https://medium.com/@ademyalcin27/vue-3-design-system-series-1-59ee543ccf40"
isUpdated: true
---





# 설치 및 재사용 가능한 입력 컴포넌트 생성

![Vue3DesignSystemSeries-1_0](/assets/img/Vue3DesignSystemSeries-1_0.png)

# 소개

Nuxt 3는 웹 애플리케이션을 구축하는 방식을 혁신적으로 변화시켰습니다. 더 효율적이고 유연한 프레임워크를 제공합니다. 효율적이고 일관된 사용자 인터페이스를 만드는 데 중요한 부분은 잘 구조화된 디자인 시스템입니다. 이 글에서는 Vue 3 디자인 시스템 킷 중에서 특별히 입력 컴포넌트에 집중합니다. 실제 킷의 코드를 사용하여 설정, 구조 및 스타일링을 살펴보겠습니다.

<div class="content-ad"></div>

디자인 시스템 컴포넌트를 탐험하기 전에 Nuxt 3 프로젝트가 설정되어 있는지 확인해주세요. nuxi를 사용하여 쉽게 새 프로젝트를 만들 수 있습니다.

## 설정

1- Nuxt 설치

```js
npx nuxi@latest init <프로젝트명>
```

<div class="content-ad"></div>

2- Tailwind CSS 설치하기

- 프로젝트에 @nuxtjs/tailwindcss 종속성을 설치하세요:

```js
npm install -D @nuxtjs/tailwindcss
```

2. nuxt.config의 modules 섹션에 추가하세요:

<div class="content-ad"></div>

```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
});
```

3. 아래 명령어를 실행하여 tailwind.config.js 파일을 만들 수 있습니다:

```js
npx tailwindcss init
```

4. 직접 Tailwind CSS 파일을 만들 계획이라면, 각 Tailwind 레이어 유형(base, components, utilities)에 대해 @tailwind 지시문을 추가해야 합니다.

<div class="content-ad"></div>

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5- (옵션) nuxt.config에서 tailwindcss 속성을 사용하여 모듈의 동작을 사용자 정의할 수 있습니다:

```js
export default defineNuxtConfig({
  tailwindcss: {
    // 옵션
  },
});
```

# 3- Font Awsome 설정

<div class="content-ad"></div>

1. 먼저 @fortawesome/fontawesome-svg-core 및 사용할 아이콘 패키지를 설치하세요.

```js
npm i --save @fortawesome/vue-fontawesome@latest-3
```

2. Nuxt 프로젝트 내에서 plugins/fontawesome.js 파일을 추가하세요:

```js
// Nuxt 3용
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

// 중요한 설정으로, CSS에 대한 걱정은 Nuxt에 맡깁니다.
config.autoAddCss = false;

// 이 플러그인에 직접 아이콘을 추가할 수 있습니다. 다른 예제를 참조하여
// 다른 스타일이나 개별 아이콘을 추가하는 방법을 확인하세요.
library.add(fas);
```

<div class="content-ad"></div>

3- `nuxt.config.ts` 파일을 수정하여 `export default defineNuxtConfig()`에 다음 코드를 추가해주세요.

```js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
```

# 재사용 가능한 입력 컴포넌트 만들기

## 1- 입력 컴포넌트 템플릿 부분

<div class="content-ad"></div>

- 동적 레이블: 레이블 요소는 :for 바인딩을 통해 입력 필드와 연결되어 접근성을 향상시킵니다.
- 유연한 입력 필드: input 클래스는 v-model로 동적으로 변경되며, clearable 및 error와 같은 상태를 처리합니다.
- Clearable 기능: Font Awesome 아이콘을 clear 버튼으로 사용하며, 조건에 따라 표시되고 입력 필드를 지울 수 있습니다.
- 오류 처리: 유효성 검사 문제가 있을 경우 오류 메시지가 표시됩니다.

```js
<template>
  <div class="input-wrapper">
    <!-- Label -->
    <label :for="id" class="input-wrapper__label" v-if="label">{ label }</label>
    <!-- Input field with clear and error handling -->
    <div class="relative flex">
      <input
        v-model="modelValue"
        :id="id"
        :type="type"
        class="input-wrapper__input"
        :class="{
          'input-wrapper__input--clearable': showClearable,
          'input-wrapper__input--error': error,
        }"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
      />
      <!-- Clear icon -->
      <font-awesome-icon
        v-if="showClearable"
        icon="fa-xmark"
        class="input-wrapper__clear"
        @click="clearInput"
      />
    </div>
    <!-- Error message -->
    <span v-if="errorMessages" class="input-wrapper__error-message">
      { errorMessage }</span
    >
  </div>
</template>
```

## 2- 스크립트 부분

- TypeScript 통합: 유형 안정성과 예측 가능성을 향상시킵니다.
- 동적 Props: Props에는 표준 입력 속성과 clearable 및 error와 같은 추가 기능이 포함됩니다.
- 반응형 상태: Vue 3의 Composition API를 사용하여 반응성과 상태 관리에 활용됩니다.
- 계산된 속성: showClearable은 clear 아이콘이 표시되어야 하는 조건을 결정합니다.
- Clear 함수: clearInput은 입력 필드를 지우는 논리를 제공합니다.

<div class="content-ad"></div>

```js
<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { errorMessages } from "vue/compiler-sfc";
// 허용된 입력 유형을 정의합니다
type InputTypes = Extract<
  InputHTMLAttributes["type"],
  "text" | "number" | "email" | "password" | "tel" | "url"
>;
// 입력 컴포넌트 속성
interface InputProps {
  id?: string;
  label?: string;
  type?: InputTypes;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  error?: boolean;
}
// 고유 ID 생성과 함께 기본 속성 정의
const props = withDefaults(defineProps<InputProps>(), {
  id: self.crypto.randomUUID(),
  label: "",
  type: "text",
  placeholder: "",
  errorMessage: "",
});
const emit = defineEmits(["update:modelValue"]);
const modelValue = defineModel<{ modelValue: InputHTMLAttributes["value"] }>();
const showClearable = computed(
  () => props.clearable && modelValue.value && !props.disabled
);
// 입력 클리어하는 함수
function clearInput() {
  if (!props.clearable) return;
  modelValue.value = undefined;
}
</script>
```

## 3- 스타일링 부분

우리는 입력 컴포넌트를 사용자 정의하기 위해 tailwindscss를 사용합니다.

```js
.input-wrapper {
  @apply w-full;
  &__label {
    @apply mb-2 block text-sm font-medium leading-6 text-gray-600;
  }
  &__input {
    @apply block w-full rounded-md border-0 px-2
    py-1.5 text-gray-900 shadow-sm ring-1
    ring-inset ring-gray-300 placeholder:text-gray-400
    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
    sm:leading-6;
    &--clearable {
      @apply pr-8;
    }
    &--error {
      @apply ring-red-600;
    }
  }
  &__clear {
    @apply absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 transform cursor-pointer items-center p-2;
  }
  &__error-message {
    @apply mt-2 text-sm text-red-600;
  }
  :has(:disabled) :is(&__input) {
    @apply pointer-events-none  text-gray-400;
  }
}
```

<div class="content-ad"></div>

만약 모든 튜토리얼을 시청하고 싶다면.

만약 레포지토리를 복제하고 싶다면.
