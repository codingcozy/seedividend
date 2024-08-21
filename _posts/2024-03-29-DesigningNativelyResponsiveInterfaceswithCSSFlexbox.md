---
title: "CSS Flexbox를 활용한 네이티브 반응형 사이트 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Designing Natively Responsive Interfaces with CSS Flexbox"
link: "https://medium.com/@mysteryweevil/designing-natively-responsive-interfaces-with-css-flexbox-896f25bd5311"
isUpdated: true
---

여러 해 동안 정사각형 웹사이트 디자인을 모바일 화면에 깔끔하게 재배치하는 것은 개발자들에게 머리아픔을 줬고 사용자들에게는 훌륭하지 못한 경험을 제공했습니다.

그러나 Flexbox를 사용하면 CSS가 유연하게 정렬 요소를 재배치할 수 있어 어떠한 뷰포트에도 동적으로 개인화된 레이아웃 요소를 지원합니다.

원안한 플로트나 무겁고 복잡한 그리드 시스템이 필요했던 것과 달리, Flexbox는 부모 컨테이너에 간단한 방향 흐름과 크기 조절 동작을 적용하여 인터페이스를 손쉽게 조정할 수 있습니다:

```js
/* 레이아웃 컨테이너 */
.flex-container {
   display: flex; /* Flexbox 활성화 */
   flex-direction: row; /* 항목을 수평으로 배열 */
   /* 여러 줄에 걸쳐 항목을 감싸기 */
   flex-wrap: wrap;

   /* 사용 가능한 공간을 균등하게 분배 */
   align-items: stretch;
   /* 항목 사이에 공간 배치 */
   justify-content: space-between;
}

/* 유연한 하위 항목 */
.flex-item {
   flex: 1 1 auto; /* 확장, 축소, 기본 크기 */
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

이러한 기본 지식으로부터 완벽한 레이아웃이 빠르게 형성되며 요소가 크기를 조절함에 따라 내용이 최적으로 재구성됩니다. 플렉스 컨테이너를 중첩함으로써 복잡한 다차원 배열을 반응적으로 작성할 수도 있습니다.

패딩 및 마진과 같은 위치 지정 스타일에 추가적인 플렉스 속성을 결합하면 정렬, 차원 및 시각적 흐름을 더욱 세밀하게 조정할 수 있습니다.

```js
/* 소스 순서와 독립적으로 요소 순서 설정 */
.featured {
 order: -1;
}

/* 항목의 성장/축소 한계 설정 */
img {
 flex-basis: 200px;
 flex-grow: 0;
}
```

Flexbox는 뻣뻣한 데스크톱 중심 가정으로 제한되던 레이아웃 가능성을 마침내 실현합니다. 외부의 엄격함보다는 내재적 유연성을 위해 먼저 디자인함으로써 인터페이스는 다양한 맥락과 사용자들과 조화롭게 어우러질 수 있습니다.

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

그러나 더 많은 Flexbox 채택은 일반적인 전환적 저항을 겪을 수 있습니다:

- 레거시 브라우저 지원 부족으로 대체책이 필요합니다.
- 유연성을 위해 레이아웃 프로세스를 바꾸는 것은 처음에 연습이 필요합니다.
- 반응형 기능은 여전히 CSS 그리드, 플로트 및 미디어 쿼리와 같은 다른 방법을 추가하여 보완됩니다.

디자인의 요소가 고정된 픽셀 대신 적응 가능한 레이어 주변으로 표준화되는 증가함에 따라, Flexbox는 웹사이트를 덜 일시적으로 느끼게 만들어주고 미래의 요구에 대응하기 위해 꺾이지 않고 굽히는 방식으로 계속 변화하는 뷰포트를 생존할 수 있게 만들어줍니다.
