---
title: "HTML  CSS  JS로 이미지 슬라이더 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_0.png"
date: 2024-07-09 18:04
ogImage:
  url: /assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_0.png
tag: Tech
originalTitle: "How to Create an Image Slider using HTML + CSS + JS"
link: "https://medium.com/@nicholasepps03/how-to-create-an-image-slider-using-html-css-js-fde4a6b4a62a"
isUpdated: true
---

## 이미지 컬렉션을 위한 훌륭한 UI 컴포넌트

![Image](/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_0.png)

Image Carousel로도 알려진 이 UI 컴포넌트는 다른 경우에 공간을 차지하게 될 이미지 컬렉션을 단일 프레임에 배치합니다. 이러한 이미지들을 일정한 위치에 배치하여 사용자가 사진에서 사진으로 슬라이드하거나 자동 슬라이딩 스크립트가 사용자 대신에 이를 수행할 수 있습니다. 더 이상 늑장없이, HTML, CSS, JS를 사용하여 이미지 슬라이더를 만들어 봅시다.

# 개요

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

어떤 코드를 작성하기 전에, 이미지 슬라이더가 어떻게 보이고 어떻게 동작하는지 개념을 잡아보겠습니다. 다음 애니메이션을 통해 우리의 이미지 슬라이더가 어떻게 동작할지 확인할 수 있어요.

![image slider](https://miro.medium.com/v2/resize:fit:1400/1*4WIZWkOInril_VMTv23nuA.gif)

파란색 컨테이너 내의 이미지가 표시되는 이미지예요. 컨테이너 내의 모든 것은 보이고, 바깥쪽은 숨겨질 거예요. 각 이미지를 포함하는 빨간색 컨테이너는 좌우로 이동하여 오른쪽 이미지를 표시하거나 그 반대로 할 거예요.

파란색 컨테이너 안에는 디스플레이 이미지를 변경할 수 있는 내비게이션 버튼이 있어요. 좌우에 있는 화살표를 클릭하면 왼쪽이나 오른쪽 이미지로 디스플레이 이미지가 변경돼요. 디스플레이 이미지가 양쪽 끝에 있을 경우, 이미지 컨테이너는 반대쪽 끝으로 순환할 거예요. 맨 아래의 점들은 사용자가 특정 이미지로 이동할 수 있도록 해 줘요.

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

한 번에 보면, 우리는 CSS에서 position 속성을 사용하여 HTML 요소를 서로 겹쳐놓을 필요가 있음이 분명합니다. 아래 시각화된 내용은 이미지 슬라이더가 3D 공간에서 어떻게 인식될 수 있는지 보여줍니다.

![이미지](/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_1.png)

파란색 컨테이너와 빨간색 컨테이너는 같은 평면에 존재하지만, 초록색 네비게이션 컨테이너는 다른 모든 것들 앞에 있어서 네비게이션 버튼에 의해 포인터 이벤트가 잡히도록 합니다.

# HTML

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

시작하기 전에, 완성된 코드를 보고 싶다면 Replit 페이지를 참조해보세요.

먼저, 이 튜토리얼에서 가장 짧은 부분인 HTML부터 작성해보겠습니다. HTML은 아래와 같습니다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Slider</title>
</head>
<style>
  /* 스타일은 여기에 추가하세요 */
</style>
<body>
  <main>
    <div class="slider-container slider-dimensions">
      <div class="slider">
        <div data-img-url="image_1.jpg" class="slider-dimensions"></div>
        <div data-img-url="image_2.jpg" class="slider-dimensions"></div>
        <div data-img-url="image_3.jpg" class="slider-dimensions"></div>
      </div>
      <div class="nav-container slider-dimensions">
        <button data-index-change="-1">&lt;</button>
        <div class="index-container">
          <button></button>
          <button></button>
          <button></button>
        </div>
        <button data-index-change="1">&gt;</button>
      </div>
    </div>
  </main>
  <script>
    /* 스크립트는 여기에 추가하세요 */
  </script>
</body>
</html>
```

이미지 자체에 대해서는 `div` 태그를 사용하고, 속성 data-img-url="\*.png"을 사용하겠습니다. 그리고 반응형 디자인을 위해 `img`태그 대신 CSS background-image 속성을 추가하는 JavaScript를 사용할 것입니다.

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

`div class="index-container"` 안에는 하단 중앙에 위치한 3개의 버튼이 있습니다. 만약 슬라이더에 이미지를 추가하거나 제거한다면, 버튼도 추가하거나 제거하여 이미지의 수와 버튼의 수가 일치하도록 해주세요.

이미지 슬라이더를 테스트하기 위해 이미지가 필요하다면 unsplash.com을 추천합니다. 그곳에는 자유롭게 이용할 수 있는 상당한 이미지 컬렉션이 있습니다.

이전에 언급했던 스케치 이미지와 관련된 컨테이너와 일치하는 HTML 요소를 살펴봅시다.

![이미지](/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_2.png)

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

CSS를 작성하기 전에 이미지를 렌더링하는 데 필요한 JavaScript 코드를 삽입해 봅시다. 이 코드를 `script` 태그 안에 넣어주세요.

```js
const imgs = document.querySelectorAll("[data-img-url]");

imgs.forEach((div) => {
  div.style.backgroundImage = `url(./${div.getAttribute("data-img-url")})`;
});
```

이 코드는 `[data-img-url]` 속성이 있는 각 `div`를 순회하면서 각 `div`에 해당하는 `[data-img-url]` 속성을 가진 이미지의 `background-image` 속성을 추가합니다.

현재 `div`에 높이가 0이기 때문에 이미지를 볼 수 없지만, CSS를 작성하면 이미지가 표시될 것입니다.

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

# CSS

슬라이더에 스타일을 추가해 보겠습니다. 먼저 기본 스타일이 있습니다.

```js
body {
  margin: 0;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-dimensions {
  width: min(100vw, 720px);
  aspect-ratio: 3 / 2;
}
```

body 및 main 스타일 선언은 이미지 슬라이더를 가운데 정렬합니다. .slider-dimensions 클래스는 슬라이더 컨테이너, 내비게이션 컨테이너 및 각 슬라이더 이미지에 적용되는 유틸리티 클래스입니다. 모바일 기기에 맞춰 반응형 폭을 제공합니다. 초기 값은 720px인 min 함수의 두 번째 인수를 변경하여 이미지 슬라이더의 최대 폭을 늘리거나 줄일 수 있습니다.

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

`.slider-container`의 CSS 선택기는 다음과 같습니다:

```css
.slider-container {
  position: relative;
  overflow: hidden;
  background-color: lightgray;
}
```

`position: relative;`는 이 요소의 경계 내에서 `position: absolute;`를 갖는 자식 요소를 유지할 수 있도록 합니다. `overflow: hidden;`은 특히 이미지를 숨길 수 있도록 중요합니다.

이제 `.slider` 클래스와 이미지 자체를 위한 CSS를 추가해봅시다. `.slider`를 위한 CSS와 이미지는 다음과 같습니다:

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
.slider {
  position: absolute;
  display: flex;
  transform: translateX(-0%);
  transition: transform 1s;
}

.slider > div {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
```

'position: absolute;' 속성은 요소를 문서 흐름에서 제거하고 문서 상단 또는 static이 아닌 위치 값을 가진 가장 가까운 조상 요소(이 경우 .slider-container)로 이동시킵니다.

.slider 선택자에서 'position: absolute;' 및 'display: flex;'는 각 이미지 'div'가 새 줄로 줄 바꿈되지 않고 슬라이더의 너비를 채우도록 허용합니다. .slider `div format의 배경-\* 속성은 배경 이미지가 슬라이더 컨테이너의 크기에 맞게 맞춰지도록 지정합니다. 아래에 이렇게 보이는 두 가지 예시가 있습니다.

<img src="/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_3.png" />

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

지금쯤이면 웹 사이트의 중앙에 첫 번째 이미지가 표시되어 있어야 합니다. 그렇지 않은 경우 CSS와 HTML을 다시 확인하고, 앞에서 제공한 JS 스크립트를 추가했는지 확인해주세요.

아래는 .nav-container의 스타일링입니다.

```js
.nav-container {
  position: absolute;
  padding: 0 20px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: radial-gradient(transparent, rgba(0,0,0,.3));
  opacity: 0;
  transition: opacity .2s;
}

.nav-container:hover {
  opacity: 1;
}
```

.nav-container는 .nav-container:hover 선택자로 인해 마우스를 올리면만 표시됩니다. 다른 스타일 속성들은 버튼을 배치하기 위한 것입니다. 마지막으로 내비게이션 버튼을 스타일링하고 @media 쿼리를 사용하여 조건부 모바일 스타일링을 추가할 것입니다.

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
.index-container {
  align-self: flex-end;
  display: flex;
  gap: 30px;
}

.index-container > button {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 20px;
  background-color: rgba(255,255,255,.3);
  transition: background-color .2s;
  cursor: pointer;
}

.index-container > button:hover {
  background-color: rgba(255,255,255,.7);
}

button[data-index-change] {
  font-size: 40px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

@media (max-width: 500px) {
  .nav-container {
    padding: 0 0 10px;
  }

  .index-container {
    gap: 20px;
  }
}
```

CSS 작업이 모두 완료되었으니 이미지 슬라이더는 다음과 같이 보일 것입니다:

<img src="/assets/img/2024-07-09-HowtoCreateanImageSliderusingHTMLCSSJS_4.png" />

이제 이 이미지 슬라이더를 상호작용 가능하게 만들어 봅시다!

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

# 자바스크립트

지금까지 따라오셨다면, `script` 태그는 다음과 같이 보일 것입니다:

```js
<script>
    const imgs = document.querySelectorAll('[data-img-url]');

    imgs.forEach((div) => {
        div.style.backgroundImage = `url(./${div.getAttribute('data-img-url')})`;
    });
</script>
```

imgs.forEach 함수 호출 뒤에 나머지 자바스크립트 코드를 추가할 겁니다. 먼저 다양한 슬라이더 태그를 참조하는 변수들을 정의해봅시다.

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
const slider = document.querySelector(".slider");
const indexButtons = document.querySelectorAll(".index-container > button");
const arrowButtons = document.querySelectorAll("[data-index-change]");
let currIndex = 0;
```

currIndex 변수는 현재 표시되고 있는 이미지를 추적하는 데 사용되며 필요에 따라 업데이트됩니다.

다음은 slide 함수입니다. 이 함수는 이미지 슬라이더를 현재 currIndex에서 매개변수 nextIndex로 변경합니다.

```js
function slide(nextIndex) {
  if (nextIndex < 0) nextIndex = imgs.length - 1;
  if (nextIndex >= imgs.length) nextIndex = 0;
  indexButtons[currIndex].style.backgroundColor = "";
  indexButtons[nextIndex].style.backgroundColor = "white";
  slider.style.transform = `translateX(-${(nextIndex / imgs.length) * 100}%)`;
  currIndex = nextIndex;
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

if 문은 첫 번째 이미지를 표시하는 상태에서 왼쪽 화살표를 클릭했거나, 마지막 이미지를 표시하는 상태에서 오른쪽 화살표를 클릭한 2가지 경우를 처리합니다. 어느 경우든 nextIndex는 각각 마지막 이미지 또는 첫 번째 이미지의 인덱스가 됩니다. 다음 두 줄은 이미지 변경을 반영하기 위해 인덱스 버튼의 배경색을 변경합니다. 다음 줄은 transform: translateX(); 함수를 사용하여 (nextIndex / img.length) \* 100의 계산을 사용하여 .slider 요소를 이동시킵니다. 예를 들어, 이미지가 3장이 있고 nextIndex가 1인 경우, 스타일 선언은 transform: translateX(-33.3333%);로 계산됩니다. 백분율 값을 사용하고 이미지의 수를 고려하여 이미지 슬라이더에 다양한 이미지 수를 대응할 수 있습니다.

CSS을 기억하시나요? 이전에 작성한 일부 전이 속성이 slide 함수를 호출할 때 실현될 것입니다. 지금 테스트해보려면 HTML 파일을 브라우저에서 열고 개발자 콘솔로 이동하여 인덱스 번호를 인수로 slide를 호출하세요.

다음으로 진행하기 전에, 초기에 첫 번째 이미지로 표시되는 대로 처음 인덱스 버튼에 하얀 배경을 설정하는 이 한 줄을 추가해야합니다.

```js
indexButtons[0].style.backgroundColor = "white";
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

이제 서로 다른 네비게이션 버튼을 슬라이드 기능에 이벤트 리스너를 사용하여 연결해 보겠습니다.

```js
indexButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    slide(index);
  });
});

arrowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const indexChange = +button.getAttribute("data-index-change");
    slide(currIndex + indexChange);
  });
});
```

indexButtons.forEach 함수 호출은 각 버튼에 이벤트 리스너를 추가하며 해당하는 인덱스로 클릭할 때 slide 함수를 호출합니다. arrowButtons.forEach는 유사하지만 더 많은 논리를 가지고 있습니다. indexChange 변수는 클릭한 버튼의 data-index-change 속성 값이며 -1 또는 1로, 단항 플러스를 사용하여 숫자로 변환됩니다. 그런 다음 다음 인덱스를 currIndex + indexChange로 설정하여 slide를 호출합니다.

이게 전부입니다! 다른 네비게이션 버튼을 클릭해보고 이미지 슬라이더를 사용해보세요. 네비게이션 버튼이 나타나려면 슬라이더 위로 마우스를 올려야 한다는 것을 기억하세요.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*nAKob14dM6V0eqkUPI50XA.gif)

# 보너스: 자동 슬라이딩 기능

이미지 슬라이더를 업그레이드하고 싶나요? 다음 사진을 보려고 클릭하는 과정을 자동화하고 싶나요? 솔직히 말해서, 사용자들은 그렇게 하는데 시간이나 에너지가 없습니다. 자바스크립트를 추가하여 자동 슬라이딩 기능을 만들어봐요.

슬라이더가 다음 이미지로 자동으로 넘어가도록 하려면, 사용자가 이미지 슬라이더 위에 마우스를 올려놓은 경우가 아닐 때에만 넘어가게 하고 싶어요. 먼저 자동 슬라이딩 기능을 시작하고 멈추게 하는 코드를 추가해봅시다.

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
const navContainer = document.querySelector(".nav-container");
let id;
let isSliding = false;

function startAutoSlide() {
  if (!isSliding) {
    id = setInterval(() => slide(currIndex + 1), 5000);
    isSliding = true;
  }
}

function stopAutoSlide() {
  clearInterval(id);
  isSliding = false;
}

startAutoSlide();
```

**startAutoSlide**이 호출되면 slide가 매 5초마다 호출되는 setInterval이 생성됩니다. id는 현재 간격의 ID이며 **stopAutoSlide**가 호출되면 지워집니다. **isSliding**은 연달아 **startAutoSlide**가 두 번 호출되는 경우를 처리하는 가드 불리언으로, 이 경우 이전 setInterval의 ID를 잃을 수 있습니다.

이제 이미지 슬라이더 위에 마우스 커서를 가져다 놓을 때 자동 슬라이더를 중지시킬 이벤트 리스너를 추가해봅시다.

```js
navContainer.addEventListener("mouseover", () => stopAutoSlide());
navContainer.addEventListener("mouseout", () => startAutoSlide());

document.addEventListener("touchstart", (e) => {
  if (e.target !== navContainer && !navContainer.contains(e.target)) startAutoSlide();
});
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

이 코드를 설명해야 합니다. 데스크톱에서는 마우스 오버 및 마우스 아웃 이벤트가 예상대로 작동하지만, 모바일에서는 이미지 슬라이더를 클릭해야 마우스 오버 이벤트가 트리거됩니다.

![이미지](https://miro.medium.com/v2/resize:fit:1032/1*ePBYIV506OxFdJno10Wu1Q.gif)

그러나 iPhone에서 이미지 슬라이더를 테스트한 후에는 마우스 아웃 이벤트를 트리거하는 것이 불가능했습니다. 그래서 touchstart 이벤트 리스너가 사용자가 모바일 장치에서 이미지 슬라이더 외부를 클릭한 경우를 처리합니다. if 문은 사용자가 실제로 이미지 슬라이더 외부를 클릭했는지 확인합니다.

최종 제품은 다음과 같이 작동해야 합니다:

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*tjo3KiEYIo1M4HlxDIkNoA.gif)

# 결론

웹의 기본 기술로 데스크톱과 모바일 장치에서 작동하는 견고한 이미지 슬라이더를 만들었습니다. 자동 슬라이딩 기능을 추가할 수도 있습니다. 사용자들은 이 UI 구성 요소의 상호 작용 및 직관적인 디자인을 평가할 것입니다.
