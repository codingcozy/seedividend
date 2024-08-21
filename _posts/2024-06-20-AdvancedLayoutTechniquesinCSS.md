---
title: "CSS의 고급 레이아웃 기술"
description: ""
coverImage: "/assets/img/2024-06-20-AdvancedLayoutTechniquesinCSS_0.png"
date: 2024-06-20 03:20
ogImage:
  url: /assets/img/2024-06-20-AdvancedLayoutTechniquesinCSS_0.png
tag: Tech
originalTitle: "Advanced Layout Techniques in CSS"
link: "https://medium.com/@szaranger/advanced-layout-techniques-in-css-38b229c379a1"
isUpdated: true
---

![image](/assets/img/2024-06-20-AdvancedLayoutTechniquesinCSS_0.png)

# :empty 가상 클래스를 사용하여 내용이 없는 요소 선택하기

추가적인 마크업 없이 빈 요소를 선택하는 쉬운 방법은 :empty 가상 클래스를 사용하여 자식 요소가 없는 요소를 대상으로 하는 것입니다.

아래 예시에서는 class가 message인 두 개의 div 요소가 있습니다:

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
<!DOCTYPE html>
<html>
  <body>
    <div class="message">
      <p>Info: Hey there!</p>
    </div>
    <div class="message"></div>
  </body>
</html>
```

:empty 가상 클래스 선택자를 사용하여 빈 div 요소를 숨길 수 있어요

```js
.message {
  margin: 10px;
  padding: 10px;
  background-color: blue;
  color: white;
  border-radius: 5px;
}

.message:empty {
  display: none;
}
```

하지만, :not(:empty) 가상 클래스 선택자를 사용하여 비어 있지 않은 message 요소를 스타일링하는 방법도 있어요

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
.message:not(:empty) {
  margin: 10px;
  padding: 10px;
  background-color: lightblue;
  color: white;
  border-radius: 5px;
}
```

🚨 공백은 자식으로 간주되기 때문에, :empty는 요소에 내용(자식이 없지만 시작 태그와 끝 태그 사이에 공백이 있는 경우)이 있는 경우 작동하지 않음을 주의하십시오.

# \*-Of-Type CSS 가상 클래스를 사용하여 위치에 따른 요소 선택하기

부모 요소 내에서 형제 요소 중에서 위치에 따라 요소를 선택하는 방법을 알아보세요.

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

# :first-of-type 와 :last-of-type

CSS :first-of-type 선택자를 사용하면 부모 컨테이너 내에서 특정 요소의 첫 번째 인스턴스를 선택할 수 있습니다. CSS의 :last-of-type 선택자를 사용하면 마지막 요소를 선택할 수 있습니다.

```js
article p:first-of-type {
  font-size: 16px;
  font-style: italic;
}

article p:last-of-type {
  color: green;
}
```

# :only-of-type

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

:only-of-type 가상 클래스는 동일한 유형의 형제 요소가 없는 요소를 나타냅니다.

```js
article blockquote:only-of-type {
  border-left: 4px solid black;
  padding-left: 10px;
  font-style: italic;
  font-weight: bold;
  color: darkblue;
}
```

# :nth-of-type()

:nth-of-type 가상 클래스는 동일한 유형(태그 이름)의 형제 요소 중에서 요소의 위치에 따라 일치시킵니다.

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

/* 위 예시에서 2번째와 6번째 단락과 일치합니다. (즉, 4n+2 규칙에 따라 일치하는 요소입니다.)
4n+2는 4*0 + 2 = 2번째, 4*1 + 2 = 6번째 등으로 변환될 수 있습니다.
*/
article p:nth-of-type(4n+2) {
color: purple;
}

아래 예시를 살펴보세요:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <article>
      <h1>Lorem Ipsum</h1>
      <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
      <!-- 이하 생략 -->
    </article>
  </body>
</html>
```

또한, CSS 코드는 다음과 같습니다:

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
article p:first-of-type {
  font-size: 16px;
  font-style: italic;
}

article img:last-of-type {
  border: 10px solid pink;
}

article blockquote:only-of-type {
  border-left: 4px solid black;
  padding-left: 10px;
  font-style: italic;
  font-weight: bold;
  color: darkblue;
}

/* 2번째와 6번째 문단이 일치하도록 합니다.4n+2는 4*0+2=2번째, 4*1+2=6번째와 같이 모든 4의 배수에 2를 더하여 일치하는 엘리먼트를 의미합니다 */
article p:nth-of-type(4n+2) {
  color: purple;
}
```

# CSS calc()를 사용하여 고정-유동-고정 레이아웃 만들기

CSS calc()를 사용하면 단위를 섞어 실시간 계산을 수행할 수 있습니다. 알 수 없는 수를 고려하여 요소의 크기를 조절해야 할 때 유용합니다.

calc() 속성은 스타일시트 내의 CSS 길이 또는 숫자가 있는 곳이라면 어디서나 사용할 수 있습니다.

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

레이아웃 유연성을 향상시키는 두 가지 주요 기능을 제공합니다:

- 백분율과 절대 값 혼합
- 크기 단위 혼합

# 백분율과 절대 단위 혼용

백분율과 절대 단위를 결합한 예제를 살펴보겠습니다. 사용 가능한 영역 중 50%를 할당하되 고정 픽셀 양만큼 빼고 싶다고 가정해 봅시다. 이를 다음과 같이 작성할 수 있습니다:

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
.parent {
  border: 1px solid black;
}

.child {
  width: calc(50% - 100px);
  background-color: green;
}
```

And the HTML code:

```js
<div class="parent">
  <div class="child">Always 100 pixels less than half the available area</div>
</div>
```

Now if you preview this code, it’d look like:

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

부모 요소의 크기를 줄이면 다음과 같이 보입니다:

![image1](/assets/img/2024-06-20-AdvancedLayoutTechniquesinCSS_2.png)

이 방식의 좋은 점은 콘텐츠의 오른쪽 가장자리를 항상 포함 영역 중앙에서 왼쪽으로 100px 위치시킬 수 있다는 것입니다. 다양한 값 유형을 혼합할 수 있는 이 능력은 웹 애플리케이션의 레이아웃 관리를 향상시켜서 다양한 크기의 장치에 걸쳐 더 효과적인 제어를 제공합니다.

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

# 단위 조합

또 다른 훌륭한 기능은 다양한 측정 단위를 조합하여 최종 크기를 얻을 수 있는 능력입니다. 예를 들어, 'em'과 'px' 단위를 섞어서 현재 글ꔼ 크기에 상대적인 크기를 설정할 수 있습니다.

```js
.child {
  height: calc(10em + 3px);
  background-color: green;
}
```

💡 calc()를 사용하여 +, -, \*, /를 사용하여 값들을 더하거나 빼내거나 곱하거나 나눌 수 있어서 다양한 가능성을 제공합니다. calc()는 CSS 길이나 숫자가 사용될 수 있는 곳이면 어디에서든 사용할 수 있습니다. 또한 곧 각도나 주파수 속성에 대한 calc()를 추가할 예정입니다.

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

# CSS를 사용하여 요소를 동적으로 크기 조절하기

브라우저 크기를 조정할 때도 반응형 레이아웃을 만들 수 있도록 뷰포트의 크기에 따라 요소의 크기를 조정할 수 있습니다.

# 뷰포트 단위

뷰포트 단위는 "반응형 길이 단위"로 간주되며, 브라우저 크기가 조정될 때마다 그 값이 조정됩니다. CSS에는 이러한 뷰포트 기반 단위 네 가지가 포함되어 있습니다. 이들은 vh, vw, vmin 및 vmax입니다.

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

- 뷰포트 높이 (vh). 이 단위는 뷰포트의 높이를 기준으로 합니다. 1vh의 값은 뷰포트 높이의 1%에 해당합니다.
- 뷰포트 너비 (vw). 이 단위는 뷰포트의 너비를 기준으로 합니다. 1vw의 값은 뷰포트 너비의 1%에 해당합니다.
- 뷰포트 최솟값 (vmin). 이 단위는 뷰포트의 작은 차원을 기준으로 합니다. 뷰포트 높이가 너비보다 작은 경우, 1vmin의 값은 뷰포트 높이의 1%에 해당합니다. 마찬가지로, 뷰포트 너비가 높이보다 작은 경우, 1vmin의 값은 뷰포트 너비의 1%에 해당합니다.
- 뷰포트 최댓값 (vmax). 이 단위는 뷰포트의 큰 차원을 기준으로 합니다. 뷰포트 높이가 너비보다 큰 경우, 1vmax의 값은 뷰포트 높이의 1%에 해당합니다. 마찬가지로, 뷰포트 너비가 높이보다 큰 경우, 1vmax의 값은 뷰포트 너비의 1%에 해당합니다.

다음과 같이 단락을 포함한 div 요소로 시작하세요:

```js
<div class="Layout">
  <p>Hello Dynamic Sizing!</p>
</div>
```

포함 요소에 뷰포트 단위를 추가하세요:

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
.Layout {
  height: 40vh;
  width: 40vw;
  margin: 30vh 25vw;
  background-color: cadetblue;
}

p {
  padding: 32px 0 0 32px;
  font-family: monospace;
  font-size: 18px;
  color: azure;
}
```

실제로 보기:

브라우저 크기를 조절하면 크기가 반응적으로 변경됩니다.

# 단 하나의 CSS 값으로 손쉽게 스타일 재설정하기

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

요소의 스타일을 부모의 스타일로 재설정해야 할 때, 더 많은 스타일 선언을 덧붙이는 대신 간단히 재설정할 수 있습니다.

섹션 컨테이너 안에 랩핑된 버튼 요소를 선언하세요:

```js
<section>
  <button>Click me!</button>
</section>
```

버튼 요소의 부모인 섹션 요소에서 선언된 글꼴 색상을 사용하려면 색상을 검정으로 설정하는 대신 재설정할 수 있습니다:

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

section {
color: black;
}

button {
cursor: pointer;
padding: 20px;
border: 0;
border-radius: 4px;
text-align: center;
text-decoration: none;
font-size: 16px;
font-weight: 500;
color: white;
background-color: springgreen;
}
section button {
color: unset;
}

실제로 보십시오:

# CSS를 사용하여 반응형 플루이드 칼럼 레이아웃 설계하기

추가 마크업이 필요 없이 유연하고 반응성 레이아웃을 만들기 위해 CSS 칼럼을 활용하는 방법을 발견하세요.

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

참고 사항:

- column-width는 width가 아닌 min-width와 같이 작동합니다. 브라우저는 제공된 너비로 가능한 많은 열을 렌더링합니다. 각 열이 제공된 값 이상을 차지할 수 있다면 그렇게 할 것입니다.
- column-span은 특정 요소가 column-count와 column-width를 무시하도록 허용합니다. 정수값으로 설정하여 특정 열 수에 걸쳐 확장하거나 "all"로 모든 열에 걸쳐 확장할 수 있습니다. 그러나 이 속성은 Firefox에서 작동하지 않습니다. 해결책으로는 컨테이너에 적용된 열을 벗어난 요소(예: 헤딩)로 이동하는 것이 있습니다. 이렇게 하면 해당 요소가 자동 열 흐름 밖에 유지됩니다.
- column-fill을 사용하면 콘텐츠가 열로 흐르는 방식을 변경할 수 있습니다. 기본값으로 "balance"로 구성되어 있어 콘텐츠가 열 사이에 균등하게 분배되도록 보장합니다. "auto"로 설정할 수도 있지만 이를 위해 고정 높이를 설정해야 합니다. 이는 유동적이고 응답형 레이아웃의 개념을 깨는 것이므로 신중히 사용해야 합니다.
- column-gap은 각 열 사이의 갭 또는 거터를 지정하며, 음수가 아닌 길이를 사용하여 픽셀, rems, 다시 말해 퍼센트로 설정할 수 있습니다. column-gap은 열 사이의 내장된 패딩으로 생각할 수 있으며 올바른 간격을 얻기 위해 실제로 수학을 할 필요가 없습니다.
- column-rule을 사용하면 각 열 사이에 테두리를 넣을 수 있으며, border shorthand와 동일한 인수를 사용하므로 1px dashed #ccc와 같이 말할 수 있습니다. 이렇게 하면 각 열 가장자리에 수직 선이 추가됩니다.

```js
<section>
  <h2>Europe</h2>
  <nav>
    <ul>
      <li>
        <a href="#">Belgium</a>
      </li>
      <li>
        <a href="#">Netherlands</a>
      </li>
      <li>
        <a href="#">Denmark</a>
      </li>
      <li>
        <a href="#">Germany</a>
      </li>
      <li>
        <a href="#">Czechia</a>
      </li>
      <li>
        <a href="#">France</a>
      </li>
      <li>
        <a href="#">Spain</a>
      </li>
      <li>
        <a href="#">Portugal</a>
      </li>
      <li>
        <a href="#">Italy</a>
      </li>
      <li>
        <a href="#">Poland</a>
      </li>
      <li>
        <a href="#">Sweden</a>
      </li>
      <li>
        <a href="#">Norway</a>
      </li>
      <li>
        <a href="#">Finland</a>
      </li>
      <li>
        <a href="#">Slowakia</a>
      </li>
      <li>
        <a href="#">Slovenia</a>
      </li>
      <li>
        <a href="#">Hungary</a>
      </li>
    </ul>
  </nav>
</section>
```

위에서 배운 column 프로퍼티를 사용해 보겠습니다:

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
nav {
    /*column-count: 4;
    column-width: 150px;*/
    columns: 4 120px; /* same as above */
    column-gap: 2rem;
    column-rule: 1px dashed #ccc;
}
```

실제로 이것을 확인해 보겠습니다:
