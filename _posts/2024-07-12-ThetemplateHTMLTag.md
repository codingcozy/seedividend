---
title: "HTML template 태그 완전 정복하기"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-12-ThetemplateHTMLTag_0.png"
date: 2024-07-12 19:25
ogImage: 
  url: /ui-log-2/assets/img/2024-07-12-ThetemplateHTMLTag_0.png
tag: Tech
originalTitle: "The <template> HTML Tag"
link: "https://medium.com/@asierr/the-template-html-tag-72be6fb5eba9"
---


모듈식이고 재사용 가능한 코드가 필수적입니다. `template` HTML 태그의 도입은 이러한 필요성을 해결하면서 개발자들에게 동적 콘텐츠를 정의하고 관리하는 간소화된 방법을 제공합니다. 이 새로운 태그는 재사용 가능한 HTML 구조를 생성할 때 이전에 직면했던 많은 어려움을 간소화합니다.

![Image](/ui-log-2/assets/img/2024-07-12-ThetemplateHTMLTag_0.png)

## `template` 태그가 필요한 이유

- 중복 감소:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- **이전**: 개발자들은 동적 콘텐츠를 만들기 위해 HTML 조각을 복제해야 했는데, 이는 중복된 코드와 유지보수 노력의 증가로 이어졌습니다.
- **지금**: `template` 요소를 사용하면 재사용 가능한 HTML 조각을 한 번 정의하고 필요할 때마다 인스턴스화할 수 있어서 코드를 DRY (Don't Repeat Yourself)하게 유지할 수 있습니다.

2. 성능 병목 현상:

- **이전**: JavaScript를 통해 대량의 HTML을 동적으로 삽입하는 것은 페이지 성능을 느리게하고 로드 시간을 증가시킬 수 있습니다.
- **지금**: `template` 요소는 기본적으로 비활성 상태이며 명시적으로 사용될 때까지 렌더링되지 않으므로 성능이 더 좋아지고 빠른 로드 시간이 제공됩니다.

3. 역할의 깔끔한 분리:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 이전에는 JavaScript 내에서 HTML 생성 로직을 섞는 것이 종종 복잡하고 유지 관리하기 어렵게 이어졌습니다.
- 지금은 `template` 태그를 사용하여 HTML 구조와 이를 조작하는 JavaScript 간에 명확한 분리가 가능해져 코드베이스를 더 유지보수하기 쉽고 이해하기 쉬운 것으로 만들어 줍니다.

# 옛날 방식: 동적 콘텐츠 생성

동적 콘텐츠를 생성하는 것은 이전에는 HTML, CSS 및 JavaScript의 조합이 필요했습니다:

- HTML 설정:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>


1. Markdown 형식으로 표를 변경하시려면 아래와 같이 변경해 주세요.


| Syntax | Description |
| --- | --- |
| Header | Title |
| Paragraph | Text |


2. 콘테이너에 콘텐츠를 삽입하는 JavaScript 코드는 다음과 같습니다.

```js
const container = document.getElementById('container');
const content = `
  <div class="item">
    <h2>아이템 제목</h2>
    <p>아이템 설명...</p>
  </div>
`;
container.innerHTML += content;
```

이 방법은 JavaScript 내에서 HTML 문자열을 포함하는 방식을 사용했는데, 이는 특히 대규모 프로젝트에서는 복잡하고 오류 발생 가능성이 높아질 수 있습니다.


<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# `template`을 활용한 현대적인 방법

`template` 태그를 사용하면 동적 콘텐츠를 더 깔끔하고 효율적으로 처리할 수 있어요:

- `template`으로 구성된 HTML 구조:

```js
<template id="itemTemplate">
  <div class="item">
    <h2></h2>
    <p></p>
  </div>
</template>

<div id="container"></div>
<button id="addItemBtn">Add Item</button>
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

2. 템플릿 사용을 위한 JavaScript:

```js
const container = document.getElementById('container');
const template = document.getElementById('itemTemplate');
const addItemBtn = document.getElementById('addItemBtn');

addItemBtn.addEventListener('click', () => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('h2').textContent = '아이템 제목';
  clone.querySelector('p').textContent = '아이템 설명...';
  container.appendChild(clone);
});
```

이 방식은 HTML 구조를 JavaScript 로직과 분리하여 코드를 더 모듈화하고 관리하기 쉽게 만듭니다. 템플릿 콘텐츠는 명시적으로 DOM에 삽입되기 전까지 렌더링되지 않아 성능과 로딩 시간을 향상시킵니다.

## `template` 태그의 장점

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- **Deferred Rendering:**

- 템플릿 요소의 내용은 파싱되지만 문서에 삽입되기 전까지는 렌더링되지 않습니다. 이는 초기 페이지로드 시간에 영향을 미치지 않는다는 것을 의미합니다.

2. **재사용 가능한 코드:**

- 한 번만 HTML 구조를 정의하고 필요한 만큼 재사용합니다. 이는 코드 중복을 줄일 뿐만 아니라 업데이트를 단순화합니다. 템플릿을 변경하면 모든 인스턴스가 업데이트를 반영합니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

3. HTML과 JavaScript 분리:

- HTML 구조를 JavaScript 로직으로부터 분리함으로써 코드가 더 읽기 쉽고 유지보수하기 쉬워집니다. 이 분리는 소프트웨어 개발의 best practices에 부합합니다.

4. 성능 향상:

- 템플릿 콘텐츠가 초기 렌더 트리의 일부가 아닌 경우, 초기로드 시간이 줄어들고 웹 페이지 전체적인 성능이 향상됩니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

`template` HTML 태그는 웹 개발자에게 상당한 혁신을 가져다 주는 중요한 도구로, 동적이고 재사용 가능한 콘텐츠를 만들기 위한 강력한 도구를 제공합니다. 중복성, 성능 및 유지 관리의 일반적 문제를 해결함으로써 개발 프로세스를 간소화하고 보다 깔끔하고 모듈식 코드를 촉진합니다. 웹 표준이 계속 발전함에 따라 `template` 태그는 웹 개발을 더 효율적이고 개발자 친화적으로 만들기 위한 지속적인 노력의 상징으로 빛을 발하고 있습니다.

이와 같은 기사 더 보시려면, 저의 Medium 팔로워로 가거나, 새로운 이야기를 이메일로 받아보세요. 또는 제 리스트를 살펴보실 수도 있습니다. 혹은 다음과 같은 관련 기사들을 확인해보세요:

- 프론트엔드 개발 필수사항
- 새로운 `dialog` HTML 태그
- 시맨틱 요소를 활용한 더 나은 웹 구조 구축
- React에서 Lit 웹 컴포넌트 통합하기: 예제와 함께 실용적 가이드
- Lit 컴포넌트에서 효과적인 상태 관리: 개발자를 위한 안내서