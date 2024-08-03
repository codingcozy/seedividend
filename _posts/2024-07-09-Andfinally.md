---
title: "마지막으로"
description: ""
coverImage: "/assets/img/2024-07-09-Andfinally_0.png"
date: 2024-07-09 14:23
ogImage:
  url: /assets/img/2024-07-09-Andfinally_0.png
tag: Tech
originalTitle: "And finally"
link: "https://medium.com/@readwanmd/lets-understand-the-differences-href-href-and-href-javascript-void-0-57c7fbfa77b1"
---

## 차이를 이해해 봅시다: href="", href="#", 그리고 href="javascript:void(0)"

![이미지](/assets/img/2024-07-09-Andfinally_0.png)

## 빈 HREF: href=""

빈 href 속성(href="")을 사용하면 현재 페이지를 다시로드합니다. 이는 브라우저의 새로고침 버튼을 클릭한 것과 같습니다.

<div class="content-ad"></div>

## href="#"

href=”#” 속성은 페이지를 위로 스크롤합니다. 이를 원치 않는 경우 JavaScript를 사용하여 동작을 중지할 수 있습니다:

```js
<a href=”#” onclick=”return false;”>안녕</a>
<!--! JavaScript로 이를 달성하는 여러 방법이 있습니다 -->
```

## href="javascript:void(0)"

<div class="content-ad"></div>

가끔 `a` 태그 안에 href="javascript:void(0);"이라는 것을 볼 수 있어요. 이건 클릭해도 아무것도 안 일어나는 링크를 만들어요. 다른 방법으로는 다음과 같이 할 수도 있어요:

- href="javascript:''"
- href="javascript:null"

이런 링크들은 아무 효과가 없으니 피하는 것이 좋아요.

## href="#아무\_아이디"

<div class="content-ad"></div>

아무 동작을 하지 않는 href="#any_id" 속성은 페이지에 ID가 any_id인 요소가 있을 때에만 기능합니다. 링크를 클릭하면 해당 요소로 스크롤 됩니다.
스크롤을 피하려면 페이지에 존재하지 않는 다른 ID 값을 사용하세요.

## 최상의 작업 방법:

버튼이나 스팬 사용: 링크가 어딘가로 이동하지 않는다면, `button`이나 `span`을 사용하여 `a` 요소 대신에 사용할 수 있습니다. 또한 이러한 요소들을 원하는대로 스타일링할 수 있으며, 이는 순수한 CSS나 CSS 프레임워크를 사용하여 가능합니다.

## 마지막으로, 이를 요약해보겠습니다.

<div class="content-ad"></div>

# 그리고 마지막으로

내 글을 읽어주셔서 감사합니다. 동료 개발자들과 이 게시물을 클랩하고 공유해 주시기 바랍니다.
