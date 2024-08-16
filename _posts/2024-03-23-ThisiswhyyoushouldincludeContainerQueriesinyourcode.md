---
title: "CSS Container Query를 반드시 사용해야하는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "This is why you should include Container Queries in your code"
link: "https://medium.com/@mkachsah/why-do-you-need-to-include-container-queries-in-your-code-facadb83a5d2"
isUpdated: true
---





<img src="/assets/img/This-is-why-you-should-include-Container-Queries-in-your-code_0.png" />

뷰포트 기반 미디어 쿼리와 씨름하는 고충을 잊어버리세요. @컨테이너 쿼리가 레스폰시브 디자인을 혁신할 것입니다!

상상해보세요: 두 개의 카드를 담고 있는 부모 컨테이너가 있다고 가정해 봅시다. 전통적으로, 스타일을 조정하려면 뷰포트 기반 미디어 쿼리와 씨름해야 했습니다. 하지만 @컨테이너가 나타나면, 게임이 완전히 달라집니다. 이제 요소들은 부모 컨테이너의 크기에 반응하여 독자적으로 적응할 수 있습니다. 뷰포트뿐만 아니라 컨테이너의 크기에 반응할 수 있게 되어요.

다음과 같이 생각해보세요: 사이드바나 본문과 같은 다른 섹션에 놓여 있는 동일한 카드는 주변에 맞게 신속하게 변환됩니다. 이것이 @컨테이너의 힘입니다. 개발자들이 환경에 진정으로 대응하는 인터페이스를 만들도록 돕습니다.

<div class="content-ad"></div>

그래서, 어떻게 작동하나요?

한 예제로 들어가 봅시다. 정의된 마크업과 포함 속성을 갖는 카드 래퍼가 있습니다. container-type을 inline-size로 설정함으로써 CSS는 조정을 위해 부모의 너비를 감시합니다. 이는 너비 기반 미디어 쿼리처럼 작동하지만 컨테이너가 주도하는 것입니다.

```js
<div class="card-wrapper">
  <div class="card">
    <div class="notes">
      <p class="description">Lorem ipsum dolor sit amet. Eos modi saepe aut architecto velit ut iste obcaecati.</p>
      <div class="links">...</div>
    </div>
    <button class="submit-button">Submit</button>
  </div>
</div>
```

```js
.card-wrapper{
  container-type: inline-size;
  width: 100%;
  border: 1px solid #000;
  padding: 8px;
}
```

<div class="content-ad"></div>

이제 @container 쿼리를 통해 마법이 벌어집니다:

```js
@container (max-width: 850px) {
   .links{
    display: none;
  }

  .description{
    font-size: 1.2rem;
  }

  /* ... */
}
@container (max-width: 650px) {
  .description{
    font-size: 1rem;
  }
  /* ... */
}
```

우아함을 보셨나요? 스타일이 부모 요소의 크기에 맞게 유연하게 조절되어 웹 디자인에서 이전에 볼 수 없었던 정밀성과 제어를 제공합니다.

하지만 여기서 더욱 흥미로운 점은 — Container Queries + Media Queries입니다. 이 다이내믹한 둘을 함께 사용하면 Container 쿼리로 미시적 레이아웃을 정의하면서 Media 쿼리로 거시적 레이아웃을 관리할 수 있습니다. 이것은 스타일의 교향곡을 연주하는 것과 같아서 각 요소가 조화롭게 역할을 하는 것처럼 느껴집니다.

<div class="content-ad"></div>

```js
/* 컨테이너 쿼리 */
@container (max-width: 500px) {
  .submit-button {
    height: 30px;
    border-radius: 8px;
  }
}

/* 미디어 쿼리 */
@media (min-width: 768px) {
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
```

이 조합은 컨테이너 내에서 정밀한 마이크로 레이아웃 조정을 가능하게 하면서, 다양한 화면 크기나 상황에 따라 마크로 레이아웃 변경을 미끄럽게 다루게 합니다. 결과는 무엇인가요? 어떤 화면 크기나 상황에도 손쉽게 적응하는 시각적으로 멋진 인터페이스가 만들어집니다.
