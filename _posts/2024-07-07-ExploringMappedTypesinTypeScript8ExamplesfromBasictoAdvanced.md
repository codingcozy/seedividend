---
title: "TypeScript 맵드 타입 알아보기 기초부터 고급까지 8가지 예제"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-ExploringMappedTypesinTypeScript8ExamplesfromBasictoAdvanced_0.png"
date: 2024-07-07 22:01
ogImage:
  url: /assets/img/2024-07-07-ExploringMappedTypesinTypeScript8ExamplesfromBasictoAdvanced_0.png
tag: Tech
originalTitle: "Exploring Mapped Types in TypeScript: 8 Examples from Basic to Advanced"
link: "https://medium.com/javascript-in-plain-english/exploring-mapped-types-in-typescript-8-examples-from-basic-to-advanced-b3b409172c35"
---

Markdown 형식의 표를 변경하실게요.

![Mapped types in TypeScript](/TIL/assets/img/2024-07-07-ExploringMappedTypesinTypeScript8ExamplesfromBasictoAdvanced_0.png)

TypeScript의 Mapped types은 한 타입의 속성을 다른 타입으로 변환하는 강력한 도구입니다. 이들은 map과 filter와 비슷한 배열 메서드와 유사하지만, 이러한 작업들은 타입에 대해 수행됩니다. 우리는 실용적인 예제를 통해 그들의 사용법을 이해할 것입니다. 다음으로, 우리는 기초부터 고급까지 총 8가지 Mapped 타입 예제를 차근차근 시연하면서, 여러분이 이 강력한 타입 변환 도구를 쉽게 마스터할 수 있도록 돕겠습니다.

# I. 기초적인 타입 변환

TypeScript에서는 때때로 한 타입의 속성을 다른 타입으로 변환해야 할 때가 있습니다. 이것은 Mapped types를 사용하여 쉽게 실현할 수 있습니다. 아래에서는 한 Product 타입의 속성을 문자열 타입으로 변환하는 방법을 구체적인 예제를 통해 시연하겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. 제품 유형 정의하기

먼저, 세 가지 속성인 이름 (문자열 유형), 가격 (숫자 유형), 재고 여부 (부울린 유형)을 포함한 제품 유형을 정의합니다.

```js
type Product = {
  name: string,
  price: number,
  inStock: boolean,
};
```

## 2. 제품을 문자열로 변환하는 유형 정의하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그 다음, 우리는 새로운 타입인 ProductToString을 정의합니다. 이 타입은 Product 타입의 모든 속성을 문자열 타입으로 변환합니다.

```js
type…
```
