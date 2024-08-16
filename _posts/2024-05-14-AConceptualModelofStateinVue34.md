---
title: "Vue 34의 State에 대한 개념 모델"
description: ""
coverImage: "/assets/img/2024-05-14-AConceptualModelofStateinVue34_0.png"
date: 2024-05-14 12:33
ogImage: 
  url: /assets/img/2024-05-14-AConceptualModelofStateinVue34_0.png
tag: Tech
originalTitle: "A Conceptual Model of State in Vue 3.4"
link: "https://medium.com/itnext/a-conceptual-model-of-state-in-vue-3-4-9390c8e68aa5"
isUpdated: true
---




상태와 컴포넌트 경계의 배치를 이해하는 것은 현대 프론트엔드 웹 개발에서 가장 중요한 도전 중 하나이며, 어플리케이션의 규모가 커짐에 따라 개발을 가속화하거나 가장 큰 마찰 원인이 될 수 있는 팀이 내릴 수 있는 가장 중요한 결정 중 하나입니다.

올바르게 수행하면 프론트엔드 컴포넌트의 구축, 구성, 리팩토링 및 테스트가 간단해집니다. 잘못 수행하면 코드베이스를 부서지기 쉽게 만들며 추적하기 어려운 유령 버그의 끝없는 근원이 될 수 있습니다.

Vue의 3.4 릴리스로 실험적인 상태에서 벗어나 정식 출시된 defineModel 마크로는 아마도 서로 다른 컴포넌트 간의 복잡한 상태 상호작용을 어떻게 생각하고 구현해야 하는지를 형성하는 방식에 대해 팀이 생각하는 방식을 바꿀 수 있는 가장 혁신적인 기능 중 하나일지도 모릅니다.

이 설명은 꽤 무해한 것처럼 보입니다:



표면적으로 보면, 이 매크로의 유용성은 미묘해 보일 수 있지만, 팀이 상태에 대해 생각하고 컴포넌트 경계를 관리하는 방식에 깊은 영향을 미칩니다. defineModel이 무엇을 하는지 알아보고 Vue 3.4에 추가된 것이 얼마나 패러다임 변화처럼 느껴지는지 살펴보겠습니다 — 비록 그것이 단순한 매크로일 뿐이라도요.

# 상태에 대한 개념적 모델

일반적으로, 현대 프론트엔드 애플리케이션을 생각할 때 상태에는 3가지 범위가 있습니다 (창 수준의 진정으로 전역 상태를 제외한 경우).

![Conceptual Model of State](/assets/img/2024-05-14-AConceptualModelofStateinVue34_0.png)



- 전역, 공유 상태. 이는 전체 계층 구조 내에서 여러 컴포넌트에서 액세스할 수 있는 상태로, 로그인한 사용자 계정 정보 및 경로 간에 공유되는 정보와 같이 실제로 글로벌 상태에 해당합니다.
- 계층 구조 형태의 컴포넌트 상태. 이는 계층 구조의 하위 트리 내에서 여러 컴포넌트에서 액세스할 수 있는 상태입니다. 예시로는 목록-상세 편집기 뷰가 있습니다.
- 단일 컴포넌트 레벨 상태. 이는 계층 구조 내의 단일 컴포넌트 내에서만 액세스할 수 있는 상태로, 상태 상호 작용이 트리를 올라가거나 내려가지 않아도 되는 컴포넌트의 경계 내에서 유지됩니다.

글로벌 수준에서 이를 해결하기 위한 많은 라이브러리와 솔루션이 있습니다. 예를 들어, React의 Zustand, Jotai, Recoil, Redux (그 외 다른 라이브러리 및 프레임워크) 및 Vue의 Pinia는 컴포넌트 트리 내부에서 상태를 전역 범위로 끌어내어 트리를 가로질러 이동할 수 있도록 도와줍니다. 이러한 용도로 light/dark 모드나 테넌트 ID와 같은 실제로 전역 상태를 유지하는 것이 목적입니다.

이 두 번째 상태 레이어에서, 팀이 마주치는 'prop drilling' 마찰이 발생합니다 — React, Vue 또는 다른 라이브러리나 프레임워크에서 발생하는 것일 수 있습니다. 그 중 일부는 수많은 상태를 컴포넌트 간에 상하로 이동하는 것을 관리하기 번거로운 점입니다.

이 경우 팀이 자연스럽게 내리는 결정을 하는 것은 상태를 전역 스토어로 옮겨놓는 것이거나, 상태를 이동하는 대신 세 번째 컴포넌트 범위로 빠져 이 마찰을 피하고 단순히 하나의 거대한 컴포넌트에 계속 쌓는 것입니다 — 이로써 다른 종류의 고통이 생기게 됩니다.



상태를 prop 트리거링 없이 쉽게 분리할 수 있다면 얼마나 좋을까요? Vue의 반응형 양방향 바인딩을 유지하면서 컴포넌트 간 상태를 이동하는 데 생기는 마찰과 고통을 크게 줄여줄 수 있는 defineModel이 나타납니다.

# defineModel이란?

먼저 무엇인지와 무엇을 하는지를 이해하는 것이 중요합니다. Vue에 익숙하지 않은 사용자들을 위해 컴포넌트 간으로 상태를 옮기는 유행적인 방식은 props와 emits를 사용했습니다.

## defineModel 이전 - props와 emits



예를 들어, 부모-자식 구성 요소를 고려해 봅시다:

![이미지](/assets/img/2024-05-14-AConceptualModelofStateinVue34_1.png)

양방향 바인딩을 위해 내부 NameInput.vue 컴포넌트를 다음과 같이 만들어야 합니다:

```js
<!-- NameInput.vue -->
<template>
  <LabeledContainer label="NameInput.vue">
    <!-- 👇 이 곳에 input을 바인딩합니다 -->
    <input v-model="name"/>
  </LabeledContainer>
</template>

<script setup lang="ts">
// 👇 프롭으로 들어옴
const props = defineProps<{
  modelValue: string
}>()

// 👇 업데이트를 부모에게 emit
const emits = defineEmits<{
  'update:modelValue': [string]
}>()

// 👇 연결하기 위한 writable 컴퓨티드
const name = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>
``` 



밖에 있는 예시1.vue 컴포넌트는 다음과 같습니다:

```js
<!-- 예시1.vue -->
<template>
  <LabeledContainer label="예시1.vue">
    <h1>예시 1</h1>
    <p>안녕하세요, { name.length === 0 ? "(아래에 이름을 입력하세요)" : name }</p>
    <!-- 👇 여기가 우리 컴포넌트입니다 -->
    <NameInput v-model="name"/>
  </LabeledContainer>
</template>

<script setup lang="ts">
const name = ref('')
</script>
```

이제 텍스트 상자에 값을 입력하면 이 값이 prop의 값으로 자동으로 업데이트됩니다:

<img src="https://miro.medium.com/v2/resize:fit:1358/0*f_imWYDRjdKfO_RA.gif" />



이렇게 간단한 것을 위한 보일러플레이트가 얼마나 지루해질 수 있는지 쉽게 알 수 있어요!

## defineModel 이후 ✨

Vue 3.4에서 defineModel이 출시되면, 이것이 NameInput.vue를 어떻게 간단하게 만드는지 살펴봐요:

```js
<!-- NameInput.vue -->
<template>
  <LabeledContainer label="NameInput.vue">
    <input v-model="name"/>
  </LabeledContainer>
</template>

<script setup lang="ts">
  // 🎉 한 줄로 끝!
const name = defineModel<string>({ required: true })
</script>
```



## 탁상 속에서 이 변경은 상당히 사소해 보일지 모릅니다. 편의성이 약간 향상되긴 했지만, 개발자가 상태를 관리하는 방식에 이것이 어떻게 실제로 영향을 미치는 걸까요? 그저 간단한 매크로인데 이렇게 주장하는 건 너무나 황당한 일이 아닌가요?

실제로 개발자들은 가급적 쉬운 길을 택하려고 합니다. 그리고 그 쉬운 길이 나쁜 관행 중 하나인 경우, 그렇다면 개발자들은 많은 많은 나쁜 관행을 갖춘 코드베이스를 만들어냅니다 — 일명 "기술 부채(Tech Debt)"라고도 불리는 것이죠. 1000줄 이상의 React나 Vue 컴포넌트를 보았다면(누구나 그런 경험이 있으시죠?), 그 이유는 컴포넌트가 유기적으로 성장함에 따라 상태를 관리하기 괴로워져서 새 컴포넌트를 분리하는 것보다 동일한 상태를 계속 공유하는 게 더 쉬웠기 때문이라고 할 수 있습니다.



`defineModel`가 하는 일은 최소한의 저항력 경로를 만들어주는 동시에 팀이 상태에 대해 어떻게 생각할 수 있는 방법을 개선하는 데 도움이 되는 것입니다. 갑자기 계층적 컴포넌트 상태를 관리하는 중간 지점이 미미하게 쉬워지고 상태를 전역 범위로 옮기거나 대형 컴포넌트를 작은 구성 요소로 분해하기를 꺼린다는 유혹을 없애주어 상태를 오르내리는 게 골치 아프다는 것을 없애줍니다 (보통 1000줄 이상 컴포넌트가 생기는 방법).

## 계층적 상태를 단순화하기 위해 defineModel 사용하기

다음과 같은 간단한 연락처 관리 앱을 고려해보세요:

![contact management app](/assets/img/2024-05-14-AConceptualModelofStateinVue34_2.png)



이 예제에서 계층구조를 주의해서 보시기 바랍니다. 사용자가 Listing.vue에서 연락처를 선택하면 앱은 Details.vue에 세부 정보를 보여주어야 합니다. 사용자가 Details.vue에서 세부 정보를 편집하고 변경 사항을 저장하면 앱은 Listing.vue의 항목을 업데이트해야 합니다.

Listing.vue와 Details.vue 간에 상태를 공유하려면 전역 상태이거나 공통 부모 Example3.vue에서 시작하는 계층 상태 여야 합니다. 그렇지 않으면 한 거대한 컴포넌트에 모든 것을 모으려는 유혹이 큽니다!

이 경우에는 우리의 계층구조 상태가 다음과 같습니다:

![상태 개념 모델](/assets/img/2024-05-14-AConceptualModelofStateinVue34_3.png)



바깥쪽부터 코드를 살펴봐봅시다.

여기에는 부모 컴포넌트인 Example3.vue가 있습니다:

```js
<template>
  <LabeledContainer label="Example3.vue">
    <h1>Example 3</h1>

    <p v-if="!!selectedContact">
      선택된: { selectedContact.name } ({ selectedContact.handle })
    </p>

    <div class="parent">
      <!-- 👈 왼쪽 가지 -->
      <Listing
        v-model="contacts"
        v-model:selected="selectedContact"/>

      <!-- 👉 오른쪽 가지 -->
      <Details v-model="selectedContact"/>
    </div>
  </LabeledContainer>
</template>

<script setup lang="ts">
const selectedContact = ref<Contact>()

const contacts = ref<Contact[]>([{
  name: 'Charles',
  handle: '@chrlschn'
}])
</script>
```

이것은 우리의 상태가 살고 있는 루트이며, Listing 및 Details 컴포넌트로 바인딩을 통해 전달됩니다.



```js
<!-- Example3.vue에서 스니펫입니다-->
<Listing
  v-model="contacts"
  v-model:selected="selectedContact"/>

<Details v-model="selectedContact"/>
```

먼저 Details.vue 파일을 살펴봅시다:

```js
<!-- Details.vue, 오른쪽 폼 입력란 -->
<template>
  <LabeledContainer label="Details.vue">
    <div v-if="!!selected">
      <!-- 사용자 이름 입력 -->
      <label>
        이름
        <input v-model="name"/>
      </label>

      <!-- 사용자 핸들 입력 -->
      <label>
        핸들
        <input v-model="handle"/>
      </label>

      <!-- 작업 버튼 -->
      <div>
        <button @click="handleCancel">완료</button>
        <button @click="handleDone">저장</button>
      </div>
    </div>
    <p v-else>
      연락처를 선택하세요
    </p>
  </LabeledContainer>
</template>

<script setup lang="ts">
const selected = defineModel<Contact|undefined>({
  required: true
})

const name = ref('')

const handle = ref('')

// 선택된 값이 업데이트되면 로컬 사본을 업데이트합니다.
watch (selected, (contact) => {
  if (!contact) {
    return
  }

  name.value = contact.name,
  handle.value = contact.handle
})

// 변경 내용을 취소하면 모든 것을 되돌립니다.
function handleCancel() {
  selected.value = undefined
}

// 변경 사항이 저장되면 선택한 객체를 업데이트합니다.
function handleDone() {
  if (!selected.value) {
    return
  }

  selected.value.name = name.value;
  selected.value.handle = handle.value;
}
</script>
```

이 컴포넌트는 연락처 세부 정보의 사본을 얻는 state 집합을 가지고 작성되었습니다. 선택된 연락처가 변경되면 컴포넌트가 값들을 로컬 상태로 복사하여 사용자가 저장할 때 까지 상태(이름과 핸들)를 변경할 수 있게 합니다. 이로써 사용자는 편집을 취소할 수도 있습니다.



(속성 집합이 큰 경우에는 개체의 완전한 반응형 사본을 만들고 직접 바인딩하는 것을 고려하십시오.)

왼쪽에 있는 Listing.vue 컴포넌트에는 연락처 목록이 포함되어 있으며 새 연락처를 추가할 수 있는 옵션이 있습니다.

```js
<!-- Listing.vue -->
<template>
  <LabeledContainer label="Listing.vue">
    <div class="container">
      <ContactItem
        v-for="contact in contacts"
        :contact="contact"
        :selected="selected == contact"
        @click="selected = contact">
      </ContactItem>
    </div>

    <div>
      <button @click="handleAddContact"> Add contact </button>
    </div>
  </LabeledContainer>
</template>

<script setup lang="ts">
const contacts = defineModel<Contact[]>({
  required: true
})

const selected = defineModel<Contact|undefined>('selected', {
  required: true
})

function handleAddContact() {
  contacts.value.push({
    name: '이름',
    handle: '핸들'
  })
}
</script>
```

그런 다음 ContactItem.vue에서는 변형이 없으므로 (그리고 양방향 바인딩이 필요하지 않으므로) Listing.vue가 표시 값을 바로 전달합니다:



```js
<template>
  <LabeledContainer
    label="Contact.vue"
    class="contact"
    :class="{
      'selected': !!selected
    }">
    <p class="name">{ contact.name }</p>
    <p class="handle">{ contact.handle }</p>
  </LabeledContainer>
</template>

<script setup lang="ts">
defineProps<{
  contact: Contact,
  selected?: boolean
}>()
</script>
```

이것이 어떻게 모두 함께 작동하는지 봅시다:

<img src="https://miro.medium.com/v2/resize:fit:1400/0*EfFxU6oa6uYyKIFA.gif" />

간편하게 상호 작용을 단순화하도록 도와주는 defineModel 없이는 여러 emit 및 computed를 작성하는 것이 마찬가지로 이 작은 예시에서도 어느 정도의 마찰을 초래할 수 있기 때문에 바로 전역 상태로 이동하거나 단축키를 사용하는 것이 직관적으로 느껴질 수 있습니다!



빌리 미즈가 말할 것 같이, "그러나 기다려! 더 있어요!"; 이 코드를 이해하기 쉽고 관리하기 쉽도록 만드는 더 많은 방법을 살펴보겠습니다.

## Composables를 사용하여 defineModel

Composables를 활용하면 상태를 컴포넌트에서 분리함으로써 코드를 더욱 간단하고 이해하기 쉽게 만들 수 있습니다. 컴포넌트가 커지면 특히 유용합니다.

Vue에서는 이를 쉽게 수행할 수 있으며 리팩토링 및 복잡성 재구성을 간편하게 수행할 수 있습니다.



우리는 간단히 상태와 함수를 컴포넌트에서 끌어올려서 다른 함수로 넣어주기만 하면 됩니다:

```js
// useContacts 컴포저블
export function useContacts() {
  const selectedContact = ref<Contact>()

  const contacts = ref<Contact[]>([{
    name: 'Charles',
    handle: '@chrlschn'
  }])

  function addContact() {
    contacts.value.push({
      name: '이름',
      handle: '핸들'
    })
  }

  return {
    selectedContact,
    contacts,
    addContact
  }
}
```

예를 들어, Details.vue에서 논리와 상태를 더 많이 가져와서 다른 컴포저블에 넣고 싶다면, 예를 들어 이름, 핸들 참조값들과 handleCancel() 및 handleDone() 함수들을 또 다른 컴포저블로 옮기고 공유하는 것은 매우 적은 마찰력을 가질 것입니다.:

```js
// useDetailsEditor.ts

// 👇 선택된 연락처를 받아서 반응형으로 사용하는 방법
// 여기서는 관찰할 수 있습니다.
export function useDetailsEditor(
  selectedContact: Ref<Contact|undefined>
) {
  const name = ref('')

  const handle = ref('')

  // 👇 여기서 selectedContact를 관찰하여
  // 캡슐화된 상태를 업데이트합니다.
  watch (selectedContact, (contact) => {
    if (!contact) {
      return
    }

    name.value = contact.name,
    handle.value = contact.handle
  })

  function cancel() {
    selectedContact.value = undefined
  }

  function done() {
    if (!selectedContact.value) {
      return
    }

    selectedContact.value.name = name.value;
    selectedContact.value.handle = handle.value;
  }

  return {
    name,
    handle,
    cancel,
    done
  }
}
```



그리고 Details.vue를 업데이트합니다:

```js
<template>
  <LabeledContainer label="Details.vue">
    <div v-if="!!selected">
      <div>
        <label>
          이름
          <input v-model="name"/>
        </label>
      </div>

      <div>
        <label>
          핸들
          <input v-model="handle"/>
        </label>
      </div>

      <div>
        <button @click="cancel">완료</button>
        <button @click="done">저장</button>
      </div>
    </div>
    <p v-else>
      연락처를 선택하세요
    </p>
  </LabeledContainer>
</template>

<script setup lang="ts">
const selected = defineModel<Contact|undefined>({
  required: true
})

const {
  name,
  handle,
  cancel,
  done
} = useDetailsEditor(selected)
// 👆 여기에서 선택한 연락처를 사용하여 
// composable에서 감시할 수 있도록 전달합니다
</script>
```

Vue 3 콤포저블과 Vue 3.4의 defineModel 매크로를 사용하여 관련 상태 및 로직을 깔끔하게 분리하고 캡슐화하는 데 아주 효과적입니다. 이 패턴을 통해 코드를 이 패턴에 맞게 리팩토링하는 것이 얼마나 쉬운지 보여줍니다. 단순히 상태, 함수, 감시자 및 계산된 값을 전부 복사하여 컴포저블에 붙여넣으면 됩니다.

이 패턴을 사용하면 대규모 하위 컴포넌트 트리도 쉽게 관리, 리팩토링 및 테스트할 수 있습니다.



# 마무리

Vue 3.4의 defineModel 소개는 실은 팀이 최상의 방법을 따르고 더 나은, 더 관리 가능한 컴포넌트를 구축하는 데 도움을 줄 것입니다. 계층 형태의 상태를 구성하는 데 드는 많은 마찰을 제거함으로써 팀이 전역 상태에 바로 의존하거나 엉성한 방법을 사용할 가능성을 줄여줍니다.

defineModel을 Vue 컴포저블과 결합하면 팀이 관련 있는 상태와 로직을 체계적으로 구성하고 캡슐화하여 읽기 쉬운 컴포넌트를 만들 수 있습니다.

Evan You가 Vue 3를 위해 Composition API를 처음 제안했을 때, Options API의 간단함과 접근성을 유지하고 싶어했던 커뮤니티로부터 많은 걱정과 항의가 있었습니다. 그러나 회고적으로 볼 때, Vue를 대규모 프로젝트를 구축하는 팀에 더 나아가게 도와줄 Evan You의 방향이 옳았다는 것을 분명히 알 수 있습니다.



3.4버전으로 인해 비전이 더욱 완성됐다는 느낌을 받을 수 있어요. 상태 관리를 간소하고 명확하게 만들어서 종종 복잡한 과정에서 어디에 상태를 배치해야 하는지에 대한 결정을 명확하게 도와줍니다. defineModel은 작은 돌처럼 느껴집니다. 바다에 떨어뜨려진 작은 돌이 언젠가 대형파가 될 것 같은 기분이에요!

이 글을 작성하도록 영감을 준 Lefan에게 특별히 감사드려요.