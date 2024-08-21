---
title: "Flexbox 완벽한 CSS 레이아웃 치트 시트 "
description: ""
coverImage: "/assets/img/2024-07-09-FlexboxTheUltimateCheatSheetforCSSLayouts_0.png"
date: 2024-07-09 17:48
ogImage:
  url: /assets/img/2024-07-09-FlexboxTheUltimateCheatSheetforCSSLayouts_0.png
tag: Tech
originalTitle: "Flexbox: The Ultimate Cheat Sheet for CSS Layouts! 🎨"
link: "https://medium.com/@mdtaqui.jhar/flexbox-the-ultimate-cheat-sheet-for-css-layouts-e1d200eda2bf"
isUpdated: true
---

![image](/assets/img/2024-07-09-FlexboxTheUltimateCheatSheetforCSSLayouts_0.png)

안녕하세요 여러분! 👋 제 이름은 Md Taqui Imam이고, 오늘은 멋진 치트 시트와 함께 CSS Flexbox에 대해 공유하고 싶어요.

🌟 Flexbox는 유연하고 반응형 레이아웃을 쉽게 만들 수 있도록 도와주는 강력한 도구입니다.

이제 시작해보고 어떻게 사용하는지 배워봅시다!

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

![Flexbox](/assets/img/2024-07-09-FlexboxTheUltimateCheatSheetforCSSLayouts_1.png)

# Flexbox가 뭔가요?

Flexbox 또는 Flexible Box Layout은 아이템들 간의 공간을 배치, 정렬 및 분배하는 더 효율적인 방법을 제공하는 CSS 모듈입니다. 이를 사용하면 float 또는 positioning을 사용하지 않고도 유연하고 반응형 레이아웃을 쉽게 디자인할 수 있습니다.

# 기본 내용

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

- 메인 축 및 교차 축

- 메인 축은 플렉스 항목이 배치되는 주요 축입니다. 수평 (행) 또는 수직 (열)이 될 수 있습니다.
- 교차 축은 메인 축과 수직입니다.

2. 플렉스 컨테이너 및 플렉스 항목

- 플렉스 컨테이너는 플렉스 항목을 보유합니다. 요소에 display: flex를 설정하여 생성됩니다.
- 플렉스 항목은 플렉스 컨테이너의 직계 자식입니다.

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

# Flexbox 속성

- Flex-Direction 속성

```js
flex-direction: row;         /* 항목을 가로로 정렬합니다 */
flex-direction: row-reverse; /* 항목을 가로로 역순으로 정렬합니다 */
flex-direction: column;      /* 항목을 세로로 정렬합니다 */
flex-direction: column-reverse; /* 항목을 세로로 역순으로 정렬합니다 */
```

2. Flex-Wrap 속성

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

```js
flex-wrap: nowrap;       /* 모든 아이템을 한 줄에 배치합니다 */
flex-wrap: wrap;         /* 아이템이 여러 줄로 나누어집니다 */
flex-wrap: wrap-reverse; /* 아이템이 여러 줄로 역순으로 나누어집니다 */
```

3. Flex-Grow 속성

```js
flex-grow: 1; /* 아이템이 사용 가능한 공간을 채우도록 확장됩니다 */
```

4. Flex-Shrink 속성

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

```js
flex-shrink: 1; /* 아이템이 컨테이너에 맞게 축소됩니다 */
```

5. Flex-Basis 속성

```js
flex-basis: 200px; /* 확장 또는 축소되기 전에 항목의 초기 크기 */
```

6. Flex 갭 속성

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

```js
gap: 20px; /* 플렉스 아이템 간의 간격 */
```

# 아이템 정렬과 정렬

- Align-Items 속성

```js
align-items: stretch;  /* 컨테이너를 채우기 위해 아이템을 늘림 */
align-items: center;   /* 아이템을 수직으로 가운데 정렬 */
align-items: flex-start; /* 아이템을 교차 축의 시작 부분에 정렬 */
align-items: flex-end; /* 아이템을 교차 축의 끝 부분에 정렬 */
align-items: baseline; /* 아이템을 기준선에 따라 정렬 */
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

2. Justify-Content Property

```js
justify-content: flex-start; /* 메인 축의 시작 부분에 아이템 정렬 */
justify-content: flex-end;   /* 메인 축의 끝 부분에 아이템 정렬 */
justify-content: center;     /* 메인 축을 따라 아이템 가운데 정렬 */
justify-content: space-between; /* 아이템들을 균일하게 간격을 두고 정렬 */
justify-content: space-around;  /* 아이템들을 주변에 공간을 두고 정렬 */
justify-content: space-evenly;  /* 아이템 주변에 동일한 간격을 두고 정렬 */
```

3. Align-Content Property

```js
align-content: flex-start;   /* 크로스 축의 시작 부분에 플렉스 라인 정렬 */
align-content: flex-end;     /* 크로스 축의 끝 부분에 플렉스 라인 정렬 */
align-content: center;       /* 크로스 축을 따라 플렉스 라인 가운데 정렬 */
align-content: space-between; /* 플렉스 라인들을 균일한 간격으로 정렬 */
align-content: space-around;  /* 플렉스 라인들을 주변에 공간을 두고 정렬 */
align-content: space-evenly;  /* 플렉스 라인과 주변 간격을 동일하게 두고 정렬 */
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

4. Align-Self Property

```js
align-self: auto;     /* 기본값으로 설정하면 부모 요소의 값을 상속받음 */
align-self: stretch;  /* 요소를 컨테이너에 맞게 늘림 */
align-self: center;   /* 요소를 수직으로 가운데 정렬함 */
align-self: flex-start; /* 요소를 교차 축의 시작 부분에 정렬함 */
align-self: flex-end; /* 요소를 교차 축의 끝 부분에 정렬함 */
align-self: baseline; /* 요소를 기준선을 따라 정렬함 */
```

# 결론

이 속성 자료로, Flexbox 속성을 하나하나 알려드렸고 어떻게 동작하는지 빠르게 참조할 수 있게 해드렸습니다. Flexbox는 반응형 레이아웃을 만드는 데 탁월한 도구이니 이제 자신 있게 활용해보세요!

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

행복한 코딩하세요! 💻

이 Flexbox 치트 시트가 도움이 되었으면 좋겣어요! 궁금한 점이 있거나 Flexbox 작업물을 공유하고 싶다면 언제든지 연락해주세요.

코딩 친구,

## Md Taqui Imam
