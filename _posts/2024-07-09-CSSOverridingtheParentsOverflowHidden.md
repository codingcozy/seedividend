---
title: "CSS 부모의 Overflow Hidden을 덮어쓰는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 18:12
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "CSS: Overriding the Parent’s Overflow Hidden"
link: "https://medium.com/@thomas.ryu/css-overriding-the-parents-overflow-hidden-90c75a0e7296"
isUpdated: true
---

사용 사례: 아주 당연한 것이죠. 특정 요소를 돋보이게 하고 부모 요소의 overflow: hidden을 무시하고 싶을 때입니다.

# 케이스 1: 정의되지 않은 위치가 있는 부모 요소

overflow: hidden;을 가진 부모 요소에 position 속성이 기본 static으로 설정되지 않은 경우 (즉, relative, absolute 또는 fixed로 설정하지 않은 경우), position: relative;이 설정된 래퍼 요소 (부모 요소의 상위 요소)를 만들고, overflow가 발생하는 자식 요소에 position: absolute;를 설정하면 됩니다.

```js
.wrapper {
    position: relative;
}
.parent {
    overflow: hidden;
}
.child {
    position: absolute;
    top: -50px;
    left: -50px;
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Case 2: 위치가 정의된 부모 요소

만약 부모 요소에 position 속성이 있지 않다면, "적절하지는 않지만" 다른 대안으로 wrapper에 transform 속성을 사용하고 값이 none이 아닌 값을 지정하며 오버플로우된 자식 요소에 position: fixed;를 사용하는 방법이 있습니다. 아래와 같이 구현됩니다:

```js
.wrapper {
    transform: scale(0);
}
.parent {
    position: relative;
    overflow: hidden;
}
.child {
    position: fixed;
    top: -50px;
    left: -50px;
}
```

이는 transform이 보통 뷰포트 자체인 위치: fixed; 요소의 포함 블록인—참조 원소—을 덮어쓰기 때문에 발생합니다.
