---
title: "자바스크립트로 가상 요소Pseudo-elements 스타일링하는 두 가지 방법"
description: ""
coverImage: "/assets/img/2024-07-09-TwodifferentwaystostylePseudo-elementswithJavascript_0.png"
date: 2024-07-09 18:03
ogImage:
  url: /assets/img/2024-07-09-TwodifferentwaystostylePseudo-elementswithJavascript_0.png
tag: Tech
originalTitle: "Two different ways to style Pseudo-elements with Javascript"
link: "https://medium.com/codex/two-different-ways-to-style-pseudo-elements-with-javascript-3d9260d9c61b"
---

<img src="/assets/img/2024-07-09-TwodifferentwaystostylePseudo-elementswithJavascript_0.png" />

프로젝트 중에 페이지의 모든 ::before 요소를 대상으로 하고 싶었는데, 특정 요소를 가리키면서 hover 했을 때의 javascript 코드를 작성해보았어요. 그냥 앞에 붙은 것 뿐만 아니라요. 그래서 이렇게 작성해보았어요:

```js
const links = document.querySelectorAll("a");
const changeBefore = () => {
    for (let i = 0; i < links.length; i++) {
      const before = links[i].querySelector("::before");
      console.log(before);
      before.style.color = "#f00";
    }
  },
  initBefore = () => {
    for (let i = 0; i < links.length; i++) {
      const before = links[i].querySelector("::before");
      before.style.color = "#000";
    }
  };
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  link.addEventListener("mouseover", function () {
    changeBefore();
  });
  link.addEventListener("mouseout", function () {
    initBefore();
  });
}
```

문제는 이제 발생했어요, 아무 일도 일어나지 않아요 ! 콘솔을 확인해보니 "before 가 null 입니다" 라고 메시지가 나와요.

<div class="content-ad"></div>

# 하지만, 왜 그럴까요?

지금은 정확한 답변을 확신할 수 없지만, DOM이 HTML 노드만을 대상으로 하기 때문이라고 생각합니다. 가상 요소는 노드가 아니라 "가상"이기 때문입니다. 페이지를 검사할 때, 가상 요소가 `pseudo-element`처럼 태그 규약 없이 쓰여 있는 것을 발견할 수 있습니다. 이것은 가상 요소가 브라우저의 CSSOM에 정의되어 있고 DOM에 존재하지 않기 때문에 JavaScript에서 이를 대상으로 지정할 수 없기 때문입니다.
자세한 내용은 James Starkie가 dev.to에 쓴 멋진 글을 참고하시기 바랍니다. 그 글에서 브라우저가 웹 페이지를 렌더링하는 방법에 대해 더 자세히 설명하고 있습니다.

# 그럼, 지금은?

JavaScript로 가상 요소에 직접 액세스할 수 없더라도, 여전히 백도어를 사용하여 스타일을 적용할 수 있습니다.

<div class="content-ad"></div>

## 1. 사용자 지정 속성 사용하기

네, 지금은 의사 요소에서 무언가를 변경하는 일반적인 방법입니다. 마지막 예제를 설명하는 데 사용했어요. 먼저, 기본값이 있는 사용자 지정 속성을 CSS에서 할당했습니다:

```js
:root {
  --color: #000;
}
::before {
  background: var(--color);
}
```

그런 다음 이전 스크립트를 가져와 다음과 같이 바꿉니다:

<div class="content-ad"></div>

```js
const links = document.querySelectorAll("a");
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  link.addEventListener("mouseover", function () {
    document.documentElement.style.setProperty("--color", "#00f");
  });
  link.addEventListener("mouseout", function () {
    document.documentElement.style.setProperty("--color", "#000");
  });
}
```

글로벌 루트에 사용자 정의 값을 설정하는 데 이 한 줄이 필요합니다:

```js
document.documentElement.style.setProperty("--your-prop", "YOUR COLOR");
```

## 2. 데이터 속성을 사용하여 콘텐츠 관리하기

<div class="content-ad"></div>

여러분이 아마 이미 아시다시피, 가상 요소인 ::before와 ::after에는 이미지나 텍스트와 같은 객체를 삽입할 수 있는 content 속성이 있습니다. 그러나 알지 못하는 사람들이 있는데요, 태그의 데이터 속성을 사용하여 해당 콘텐츠를 관리할 수 있다는 것입니다. 데이터 속성을 사용하면 일반 텍스트와 다양한 언어로 목록 번호를 설정할 수 있습니다!

먼저, 데이터 속성을 이용한 순서가 지정된 목록과 언어를 전환할 수 있는 버튼을 만들어봅시다:

```js
<ol>
  <li data-style-type="One">Garlic</li>
  <li data-style-type="Two">Tomato</li>
  <li data-style-type="Three">Ginger</li>
</ol>
<button>언어 전환</button>
```

그럼, `li` 요소를 간단히 스타일링하기 위해 style-type을 제거하고 before를 사용하여 content에 데이터 속성을 넣습니다:

<div class="content-ad"></div>

```json
li {
  list-style: none;
}
li::before {
  content: attr(data-style-type) ": ";
}
```

여기에서는 목록 요소 앞에 콜론(:)이 오도록 attr(data-style-type)을 설정했어요. 만약에 속성을 문자열에 연결하려면 간단한 공백만 사용하면 돼요. 하지만 단순히 속성만 사용하고 싶으면 그냥 사용하세요.

그리고 그 뒤에 언어 전환 스크립트를 작성했어요:

```js
const list = document.querySelectorAll("li");
const arrEn = ["One", "Two", "Three"];
const arrFr = ["Un", "Deux", "Trois"];
let arr = arrEn;
const setStyleType = (arr, i) => {
  list[i].dataset.styleType = arr[i];
};
document.querySelector("button").addEventListener("click", function () {
  arr = arr === arrEn ? arrFr : arrEn;
  for (let i = 0; i < list.length; i++) {
    setStyleType(arr, i);
  }
});
```

<div class="content-ad"></div>

여기서 가장 중요한 점은 DOM이 요소의 데이터셋을 변경했다는 것입니다. 이렇게 하는 데 유용할 수 있는 몇 가지 경우가 있다고 생각합니다.

# 결론

앞으로 몇 주 동안 쓸 다른 기사들처럼, 이 예시들은 제가 직면한 문제 앞에서 한 탐험의 작은 결과물입니다. 가상 요소 스타일을 관리하는 다른 방법들도 많고 때로는 더 나은 방법이 있지만, 이것들을 살펴본 것이 중요했습니다.

아마도 이 기사의 두 번째 부분을 작성해서 다른 방법을 연구하거나 같은 것을 완전한 CSS로 만드는 등 흥미로울 수 있는 일을 할지도 모릅니다.
