---
title: "CSS로 배경을 두 가지 색상으로 나누는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_0.png"
date: 2024-07-12 19:17
ogImage:
  url: /assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_0.png
tag: Tech
originalTitle: "How to Split a Background Into 2 Colors with CSS"
link: "https://medium.com/@miguelznunez/html-css-how-to-split-a-background-into-2-colors-1cdc394deb3d"
isUpdated: true
---

<img src="/assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_0.png" />

안녕하세요! 이번 튜토리얼에서는 배경을 두 가지 색상으로 나누는 방법을 가르쳐 드릴 거예요. 걱정하지 마세요, 이것은 매우 간단하며 복잡한 코드가 필요하지 않습니다. 지금 시작해봐요.

CSS:

요소에서 기본 패딩 및 마진을 제거하세요.

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
*{
  padding: 0;
  margin: 0;
}
```

만약 스플릿된 배경을 전체 화면에 채우고 싶다면, body의 너비를 100%로 설정하고 높이를 100vh로 설정하세요. 배경을 나누는 것은 linear gradient를 사용하여 수행됩니다. Linear gradient는 방향, 색상, 색상, 색상 및 색상 다섯 가지 매개변수를 입력합니다. 다음과 같이:

```js
background: linear - gradient(방향, 색상, 색상, 색상, 색상);
```

방향을 "to right"로 설정하면 색상을 수직으로 표시합니다. 나머지 4개의 매개변수는 셀프 설명적이므로 사용하려는 색상을 삽입하시면 됩니다. 예를 들어, 저는 pink, pink, paleturquoise 및 paleturquoise를 사용했습니다.

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

```css
body {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, pink 0%, pink 50%, paleturquoise 50%, paleturquoise 100%);
}
```

각 색상 뒤에 백분율을 사용했다는 점을 알아채셨나요? 백분율은 색상을 시작하고 끝낼 위치를 나타냅니다. 저는 pink를 0%에서 시작해서 50%에서 끝냈습니다. 이는 pink가 화면의 첫 번째 절반을 차지할 것을 의미합니다. Paleturquoise는 50%에서 시작하고 100%에서 끝났습니다. 이는 paleturquoise가 화면의 두 번째 절반을 차지할 것을 의미합니다.

결과는 다음과 같습니다:

<img src="/assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_1.png" />

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

배경을 가로로 나누려면 "to right"에서 첫 번째 매개변수를 "to top"으로 변경하십시오.

```js
body{
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to top,
    pink 0%,
    pink 50%,
    paleturquoise 50%,
    paleturquoise 100%
  );
}
```

이렇게 설정하면 아래와 같은 결과를 얻을 수 있습니다:

<img src="/assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_2.png" />

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

만약 커스텀 너비와 높이로 컨테이너의 배경을 나누고 싶다면, HTML 파일로 이동하여 "container"라는 클래스 이름을 갖는 div를 생성하세요.

```html
<div class="container"></div>
```

CSS 파일에서 body 선택기를 container로 교체하고 원하는 너비와 높이로 변경하세요.

```css
.container {
  width: 400px;
  height: 300px;
  background: linear-gradient(to right, pink 0%, pink 50%, paleturquoise 50%, paleturquoise 100%);
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

현재 모습은 다음과 같습니다:

![image](/assets/img/2024-07-12-HowtoSplitaBackgroundInto2ColorswithCSS_3.png)

이해가 되지 않나요? 아래의 내 튜토리얼을 확인해보세요.
