---
title: "CSS를 사용하여 웹 브라우저 크기 표시하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Using CSS to Display Web Browser Sizes"
link: "https://medium.com/web-designers-depot/using-css-to-display-web-browser-sizes-71617b01de52"
isUpdated: true
---

반응형 웹 디자인은 이제 모바일 디바이스 사용량이 증가함에 따라 중요합니다. 새 웹사이트를 만들거나 현재 웹사이트를 모바일 반응형으로 재설계하는 경우, 이 튜토리얼은 웹 브라우저 테스트에 도움이 될 것입니다. 이 튜토리얼에서는 CSS를 활용하여 작업 중인 웹 브라우저의 크기를 표시하는 방법을 보여줍니다. 웹 페이지 하단에 전체 너비의 바를 배치함으로써 이를 수행합니다. 이것은 웹사이트 디자인 반응성을 테스트하기 위해 실제로 다른 모바일 디바이스를 사용하는 경우 도움이 됩니다.

responsivetest.css라는 새 CSS 파일을 만들거나 현재 CSS 파일에 다음을 추가하세요.

우리는 각 웹 브라우저 크기에 대한 body HTML 요소를 타게팅하는 CSS를 만들 것이며, 이 튜토리얼에서 다루지 않는 웹 브라우저에 대한 사용자 정의 CSS를 만드는 방법도 보여드릴게요. 아주 작은 웹 브라우저부터 시작해보겠습니다:

```js
body:after {
    content: "320px 미만";
    font-size: 200%;
    line-height: 1;
    font-weight: bold;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 5px 0;
    text-align: center;
    background-color: #000; /* 후방 호환성 */
    background-color: hsla(0,0%,0%,0.7);
    color: #fff;
    z-index: 9999;
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

이제 모든 다른 웹 브라우저의 크기는 위의 코드 스니펫으로부터 값을 상속받을 것이며, content 값은 재설정할 것입니다.

이제 320px에서 480px 크기의 웹 브라우저를 대상으로합니다:

```js
@media only screen and (min-width: 320px) {
    body:after {
        content: "320 to 480px";
    }
}
```

이제 480px에서 640px 크기의 웹 브라우저를 대상으로 합니다:

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
@media only screen and (min-width: 480px) {
    body:after {
        content: "480 to 640px";
    }
}
```

이제 640px부터 800px 크기의 웹 브라우저를 대상으로합니다:

```js
@media only screen and (min-width: 640px) {
    body:after {
        content: "640 to 800px";
    }
}
```

이제 800px부터 960px 크기의 웹 브라우저를 대상으로합니다:

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
@media only screen and (min-width: 800px) {
    body:after {
        content: "800 to 960px";
    }
}
```

이제 960px부터 1120px 크기의 웹 브라우저를 대상으로합니다:

```js
@media only screen and (min-width: 960px) {
    body:after {
        content: "960 to 1120px";
    }
}
```

이제 1120px부터 1280px 크기의 웹 브라우저를 대상으로합니다:

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
@media only screen and (min-width: 1120px) {
    body:after {
        content: "1120부터 1280픽셀";
    }
}
```

이제 1280픽셀에서 1440픽셀 크기의 웹 브라우저에 대상을 지정합니다:

```js
@media only screen and (min-width: 1280px) {
    body:after {
        content: "1280부터 1440픽셀";
    }
}
```

이제 1440픽셀 이상의 웹 브라우저에 대상을 지정합니다:

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
@media only screen and (min-width: 1440px) {
    body:after {
        content: "1440 and up";
    }
}
```

자신만의 것을 만들려면 우리가 위에서 한 것처럼 CSS 미디어 쿼리를 사용하고 콘텐츠를 정의하세요:

```js
@media <argument> {
    body:after {
        content: "";
    }
}
```

위 예제에서는 `argument`를 대상으로 하는 최소 및 / 또는 최대 웹 브라우저 크기로 바꿔주세요.

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

첫 번째 예제에서 모든 것의 배경색을 변경할 수도 있고, 각 웹 브라우저 크기에 대해 배경색을 재설정할 수도 있어요. 기본적으로 배경색은 검정의 70%, #000000, 입니다. 그리고 각각에 더 많은 CSS를 추가할 수도 있어요.
