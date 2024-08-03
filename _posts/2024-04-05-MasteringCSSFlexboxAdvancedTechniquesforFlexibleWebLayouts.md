---
title: "CSS Flexbox - 반응형 웹 사이트를 위한 고급 기술"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering CSS Flexbox Advanced Techniques for Flexible Web Layouts"
link: "https://thiraphat-ps-dev.medium.com/mastering-css-flexbox-advanced-techniques-for-flexible-web-layouts-3804af95594f"
---



# 소개

CSS 작업을 한 동안 진행했다면, 플렉스박스(Flexbox)에 익숙할 것입니다. 이것은 유연하고 반응형 웹 디자인을 만드는 방법을 혁신적으로 변화시킨 강력한 레이아웃 모듈입니다. 그러나 `display: flex`와 `justify-content`와 같은 기본적인 내용 이외에도 플렉스박스에는 더 많은 기능이 있습니다. 이 블로그 포스트에서는 여러 고급 Flexbox 기술에 대해 살펴보고 웹 레이아웃 스킬을 향상시키는 방법을 알아보겠습니다.

## 1. 감싸고 반전하기

플렉스 아이템이 컨테이너 내에서 어떻게 흘러가는지 제어하는 것은 중요합니다. 이를 어떻게 하는지 알아보겠습니다:

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경하세요.

<div class="content-ad"></div>

`justify-content`은 주축을 따라 수평 정렬을 다루지만, 교차 축은 어떨까요?

`align-items`:

- 플렉스 컨테이너 내 항목들의 수직 정렬을 제어합니다.
- 주로 사용되는 값으로는 `flex-start`, `flex-end`, `center`, `stretch` 등이 있습니다.

```css
.flex-container {
  display: flex;
  align-items: center; /* 항목들을 수직 중앙 정렬합니다. */
}
```

<div class="content-ad"></div>

align-content:

- 교차 축 (다중 라인 레이아웃)의 플렉스 아이템 간의 공간을 분배합니다.
- flex-wrap: wrap과 함께 사용하기 유용합니다.

3. 개별 항목 제어

플렉스박스를 사용하면 컨테이너 내 개별 항목의 동작을 세밀하게 조절할 수 있습니다:

<div class="content-ad"></div>

체육광장:

- 아이템이 컨테이너 내의 모든 이용 가능한 공간을 채우기 위해 어떻게 성장할지를 결정합니다.

유연한 축소:

- 오버플로우를 방지하기 위해 아이템이 어떻게 축소되는지를 제어합니다.

<div class="content-ad"></div>

flex-basis

- 아이템이 커지거나 작아지기 전에 초기 크기를 설정합니다.

```js
.item-1 {
    flex-grow: 2; /* 다른 아이템보다 두 배 공간을 차지합니다 */
}
```

4. 'order'의 힘

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경합니다.

| Property | Description                 |
| -------- | --------------------------- |
| order    | Arrange flex items visually |

5. 중첩된 플렉스 컨테이너

복잡한 구조를 위해 서로 다른 Flexbox 레이아웃을 결합하세요. 기억하세요, Flex 항목은 스스로 Flex 컨테이너가 될 수 있습니다!

<div class="content-ad"></div>

결론

이러한 고급 Flexbox 기술들은 웹 레이아웃에 대한 유연성과 제어를 새로운 차원으로 열어줍니다. 감싸기, 양 축에서의 정렬, 개별 항목 속성 및 중첩을 이해함으로써, 복잡하고 반응형 디자인을 쉽게 만들 수 있을 것입니다.

다른 고급 Flexbox 트릭을 사용하고 계신가요? 아래 댓글에서 여러분이 좋아하는 기술을 공유해 주세요!

특정 기술에 대해 자세히 설명하거나 코드 예제를 제공해 주길 원하신다면 말씀해주세요. 포스트를 더 맞춤화하는 데 기꺼이 도와드리겠습니다!
