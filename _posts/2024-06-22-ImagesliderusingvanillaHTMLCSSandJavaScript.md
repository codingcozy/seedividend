---
title: "HTML, CSS, JavaScript로 이미지 슬라이더 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_0.png"
date: 2024-06-22 03:48
ogImage: 
  url: /assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_0.png
tag: Tech
originalTitle: "Image slider using vanilla HTML, CSS and JavaScript"
link: "https://medium.com/codex/image-slider-using-vanilla-html-css-and-javascript-b95c7fe16955"
isUpdated: true
---




요즘에 작은 웹 사이트를 개발 중입니다. 이 웹 사이트는 프레임워크나 외부 라이브러리에 의존하지 않습니다. 유일한 복잡한 기능은 이미지 슬라이더를 표시하는 것이었습니다.

이 기능에 대한 요구 사항은 다음과 같습니다:

- 바닐라 코드를 사용해야 합니다 (초심자이거나 프로젝트를 가벼우게 유지하고 치밀한 라이브러리에 의존하지 않고 싶을 때 사용 가능합니다).
- 반응형 디자인: 데스크톱 및 모바일 장치에서 멋지게 보이며 터치 디바이스에서 직접 슬라이딩하는 이점이 있어야 합니다.
- 정확한 이미지 렌더링: 이미지가 잘리지 않고 종횡비가 보존되어야 합니다.

이 기사에서는 시도해 본 세 가지 해결책을 공유하겠습니다. 처음 두 가지는 순수한 HTML/CSS를 기반으로 하지만 결과물에 몇 가지 측면이 부족합니다. 세 번째 해결책은 모든 요구 사항을 충족한 최종 해결책인데, 몇 줄의 JavaScript를 사용합니다.

<div class="content-ad"></div>

# 1. 라디오 버튼과 레이블을 사용한 기본적인 슬라이드 토글러

이 첫 번째 솔루션은 HTML과 CSS만 사용하므로 기본적이며, 움직임이 없기 때문에 제대로 된 슬라이더는 아닙니다. 그럼에도 불구하고 구현은 매우 쉽습니다.

## 구현

루트 슬라이더 div에는 두 개의 내부 div가 포함되어 있습니다: 하나는 슬라이드용이고 또 다른 하나는 슬라이더 탐색을 위한 것입니다.

<div class="content-ad"></div>

```js
<div class="slider">
    <div class="slides">
        ...
    </div>
    <div class="slider-nav">
        ...
    </div>
</div>
```

각 슬라이드마다, 현재 선택된 슬라이드를 저장하는 데 사용되는 라디오 입력과 함께 콘텐츠 div가 포함되어 있습니다.

```js
<div class="slides">
  <div class="slide" >
    <input type="radio" id="radio_slider1_slide1" name="slider1" checked="checked">
    <div class="content">
      <img src="../common/werner-sevenster-JuP0ZG0UNi0-unsplash.jpg">
    </div>
  </div>
  <div class="slide">
    <input type="radio" id="radio_slider1_slide2" name="slider1">
    <div class="content">
      <img src="../common/casey-horner-8ftuBebG3_M-unsplash.jpg" loading="lazy">
    </div>
  </div>
  <div class="slide">
    <input type="radio" id="radio_slider1_slide3" name="slider1">
    <div class="content">
      <img src="../common/laura-smetsers-H-TW2CoNtTk-unsplash.jpg" loading="lazy">
    </div>
  </div>
</div>
```

라디오 요소 그룹 내에서는 한 가지 값만 선택할 수 있습니다. 따라서 CSS로 한 슬라이드만 표시됩니다.

<div class="content-ad"></div>

라디오 입력란은 슬라이더 내비게이션 디브에 배치된 레이블 엘리먼트에 의해 활성화됩니다:

```js
<div class="slider-nav">
  <label for="radio_slider1_slide1"><img src="../common/dot.svg" /></label>
  <label for="radio_slider1_slide2"><img src="../common/dot.svg" /></label>
  <label for="radio_slider1_slide3"><img src="../common/dot.svg" /></label>
</div>
```

라디오 입력란은 각 슬라이드에 첨부된 .previous와 .next 레이블을 사용하여도 활성화할 수 있습니다:

```js
<div class="slide">
  <input type="radio" id="radio_slider1_slide2" name="slider1">
  <div class="slider-arrow previous">
    <label for="radio_slider1_slide1">
      <img src="../common/arrow-sm-right.svg" />
    </label>
  </div>
  <div class="content">
    <img src="../common/casey-horner-8ftuBebG3_M-unsplash.jpg" loading="lazy">
  </div>
  <div class="slider-arrow next">
    <label for="radio_slider1_slide3">
      <img src="../common/arrow-sm-right.svg" />
    </label>
  </div>
</div>
```

<div class="content-ad"></div>

다음 스타일에 대해:

라디오 버튼이 표시되지 않습니다.

한 슬라이드만 표시하려면 체크된 라디오 버튼과 이웃해 있지 않은 한 .content와 .slider-arrow divs를 표시하지 않아야 합니다.

```js
.slider .slides .slide input[type=radio],
.slider .slides .slide .slider-arrow,
.slider .slides .slide .content {
    display: none;
}

.slider .slides .slide input[type=radio]:checked~.slider-arrow {
    display: flex;
}

.slider .slides .slide input[type=radio]:checked~.content {
    display: flex;
}
```

<div class="content-ad"></div>

## 코드

## 결과

<img src="/assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_0.png" />

## 장단점

<div class="content-ad"></div>

✅ HTML/CSS 만 사용

❌ 점들은 단순히 레이블이므로 선택된 슬라이드의 색인을 구분하는 데 적합하지 않습니다.

❌ 슬라이드 간의 전환은 클릭으로 이루어지며 터치 기기에서 슬라이딩 제스처를 활용하지 못합니다.

# 2. 앵커와 링크를 사용하여 스크롤 슬라이더

<div class="content-ad"></div>

이 솔루션에서는 라디오 버튼이 제거되었고, 선택을 위해 레이블 대신 앵커 링크를 사용하게 되었습니다.

```js
<div class="slider" id="slider1">
    <div class="slides">
        <div class="slide" id="slider1_slide1">
            <div class="content">
                <img src="../common/werner-sevenster-JuP0ZG0UNi0-unsplash.jpg">
            </div>
        </div>
        <div class="slide" id="slider1_slide2">
            <div class="content">
                <img src="../common/casey-horner-8ftuBebG3_M-unsplash.jpg" loading="lazy">
            </div>
        </div>
        <div class="slide" id="slider1_slide3">
            <div class="content">
                <img src="../common/laura-smetsers-H-TW2CoNtTk-unsplash.jpg" loading="lazy">
            </div>
        </div>
    </div>
    <div class="slider-nav">
        <a href="#slider1_slide1"><img src="../common/dot.svg" /></a>
        <a href="#slider1_slide2"><img src="../common/dot.svg" /></a>
        <a href="#slider1_slide3"><img src="../common/dot.svg" /></a>
    </div>
</div>
```

CSS 부분에서는 모든 슬라이드가 .slides 컨테이너 안에 표시되고 수평 스크롤이 활성화되어 있습니다.

```js
.slider .slides {
    overflow-x: scroll;
    scrollbar-width: thin;
}
```

<div class="content-ad"></div>

.slide의 너비를 100%로 설정하면 컨테이너의 너비가 자식 슬라이드들 사이에 공유됩니다. 각 슬라이드가 최소한 100%의 너비를 차지하려면 .slide 요소에 "min-width: 100%"을 사용하는 것이 좋습니다.

![이미지](/assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_1.png)

스크롤 부드러움과 스크롤 위치의 적절한 정렬(자석 효과처럼)를 위해서 다음 속성들을 추가해야 합니다:

```js
.slides {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
}

.slide {
    scroll-snap-align: center;
}
```

<div class="content-ad"></div>

## 코드

## 장단점

✅ HTML/CSS만 사용

✅ 수평 스크롤을 통해 터치 기기에서 슬라이딩 제스처의 이점을 누릴 수 있습니다.

<div class="content-ad"></div>

❗ 이전 및 다음 버튼의 경우, 가로 스크롤 동작 때문에 그냥 각 슬라이드에 바로 연결하는 것은 방지되어 있습니다. 그렇지 않으면 슬라이드와 함께 가로로 이동하여 결과물이 보기 좋지 않다.

❗ 이 해결책의 경우, 점들은 단순히 링크입니다. 첫 번째 해결책과 마찬가지로 선택된 슬라이드의 위치를 구분하기에 적합하지 않습니다.

❗ 슬라이드 선택을 위해 앵커를 사용하면, 이러한 앵커를 클릭하면 페이지의 세로 스크롤도 영향을 받습니다. 사용자들은 가로 스크롤을 위해 그러한 동작을 기대하지 않습니다. 또한, 앵커의 사용은 브라우징 히스토리에도 영향을 줍니다. 다시 말하지만, 이러한 동작은 그냥 슬라이더를 위해서는 지나치게 많은 것입니다.

# 3. JavaScript를 사용하여 스크롤 슬라이더 만들기

<div class="content-ad"></div>

이 솔루션에서는 수평 스크롤이 유지됩니다. .slider-nav에는 이제 라디오 버튼과 이전/다음 화살표가 포함될 것입니다.

```js
<div class="slider" id="slider1">
    <div class="slides">
        <div class="slide">
            <div class="content">
                <img src="../common/werner-sevenster-JuP0ZG0UNi0-unsplash.jpg">
            </div>
        </div>
        <div class="slide">
            <div class="content">
                <img src="../common/casey-horner-8ftuBebG3_M-unsplash.jpg" loading="lazy">
            </div>
        </div>
        <div class="slide">
            <div class="content">
                <img src="../common/laura-smetsers-H-TW2CoNtTk-unsplash.jpg" loading="lazy">
            </div>
        </div>
    </div>
    <div class="slider-nav">
        <div class="slider-arrow previous">
            <img src="../common/arrow-sm-right.svg" />
        </div>
        <div class="radios">
            <input type="radio" id="radio_slider1_slide1" name="slider1" checked="checked">
            <input type="radio" id="radio_slider1_slide2" name="slider1">
            <input type="radio" id="radio_slider1_slide3" name="slider1">
        </div>
        <div class="slider-arrow next">
            <img src="../common/arrow-sm-right.svg" />
        </div>
    </div>
</div>
```

다음과 같이 JavaScript가 사용될 것입니다:

- 이전 또는 다음 화살표를 클릭하면 스크롤바 위치가 업데이트되어 이전 또는 다음 슬라이드로 이동합니다: arrowClicked().
- 라디오 선택(점)이 변경되면, 스크롤바 위치도 그에 따라 업데이트됩니다: radioChanged().
- 스크롤바 위치가 업데이트되면(터치 디바이스 스크롤링), 라디오 버튼의 선택 및 이전 및 다음 화살표의 표시가 업데이트됩니다: scrolled().

<div class="content-ad"></div>

```js
function arrowClicked(event, direction) {
    var slides = event.target.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
    slides.scrollLeft += direction * slides.scrollWidth / slides.childElementCount;
}

function radioChanged(event) {
    var radio = document.getElementById(event.target.id);
    var radioIndex = [...radio.parentElement.children].indexOf(radio);
    var slides = radio.parentElement.parentElement.parentElement.getElementsByClassName('slides')[0];
    slides.scrollLeft = radioIndex / slides.childElementCount * slides.scrollWidth;
}

function scrolled(event) {
    var id = event.target.parentElement.id;
    var slides = document.getElementById(id).getElementsByClassName('slides')[0];
    var scrollRatio = slides.scrollLeft / slides.scrollWidth;

    var radioId = 'radio_' + id + '_slide';
    var size = slides.childElementCount;

    for (let i = 1; i <= size; i++) {
        if (scrollRatio + 0.5 / size < i / size) {
            document.getElementById(radioId + i).checked = true;

            if (i == 1) {
                document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "hidden";
            } else {
                document.getElementById(id).getElementsByClassName('previous')[0].style.visibility = "visible";
            }

            if (i == size) {
                document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "hidden";
            } else {
                document.getElementById(id).getElementsByClassName('next')[0].style.visibility = "visible";
            }

            break;
        }
    }
}
```

이 함수들을 .html 파일에서 직접 호출할 수 있습니다. 하지만 코드 분리와 재사용성을 높이기 위해 이벤트 리스너를 직접 사용하는 것이 좋습니다.

```js
document.addEventListener("DOMContentLoaded", function () {

    function arrowClicked(event, direction) { ... }

    function radioChanged(event) { ... }

    function scrolled(event) { ... }

    document.querySelectorAll('.slider').forEach(
        slider => {
            slider.getElementsByClassName('previous')[0].style.visibility = "hidden";

            if (slider.childElementCount < 1) {
                slider.getElementsByClassName('next')[0].style.visibility = "hidden";
            }

            slider.querySelectorAll('.slider-arrow.previous img')[0].addEventListener(
                'click', event => arrowClicked(event, -1)
            );

            slider.querySelectorAll('.slider-arrow.next img')[0].addEventListener(
                'click', event => arrowClicked(event, 1)
            );

            slider.addEventListener(
                'change', event => { radioChanged(event); }
            );

            slider.getElementsByClassName('slides')[0].addEventListener(
                'scroll', event => scrolled(event)
            );
        }
    );
});
```

## 코드

<div class="content-ad"></div>

## 결과

<img src="/assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_2.png" />

## 장단점

❌ 자바스크립트를 사용하면 다른 종속성이 추가되어 유지보수 문제가 늘어날 수 있습니다.

<div class="content-ad"></div>

✅ 가로 스크롤로 인해 터치 장치에서 슬라이딩 제스처를 활용할 수 있습니다.

✅ 슬라이드 선택이 유지됩니다 (도트와 화살표 상태가 업데이트됨) - 도트, 화살표 또는 제스처에 의해 스크롤이 시작되었는지에 관계없이.

이미지 테두리 반경에 유의하세요.

이 프로젝트에서 다음과 같은 문제를 마주쳤습니다:

<div class="content-ad"></div>

- "border-radius" 속성 사용
- 이미지의 가로세로 비율을 유지하기 위해 "object-fit: contain" 사용
- 반응성: 고정된 높이를 유지하고 너비를 가변적으로 유지

이미지가 높이제한이 아닌 너비에 제한되는 경우, border-radius가 사라질 수 있습니다:

<img src="/assets/img/2024-06-22-ImagesliderusingvanillaHTMLCSSandJavaScript_3.png" />

나는 이미지를 프록시 div .content 안에 캡슐화함으로써 이 문제를 해결했습니다:

<div class="content-ad"></div>


<div class="slide" id="slider1_slide1">
    <div class="content">
        <img src="../common/werner-sevenster-JuP0ZG0UNi0-unsplash.jpg">
    </div>
</div>


CSS로:

```css
.slider .slide {
    min-width: 100%;
    display: flex;
    justify-content: center;
}

.slider .slides .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    width: 100%;
}

.slider .slides .content img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 10px;
}
```

이미지 출처


<div class="content-ad"></div>

- Werner Sevenster: 갈색 목재 울타리 사이 도로
- Casey Horner: 낮에 초록 산 사이 폭포
- Laura Smetsers: 나무들이 있는 들판 근처의 물
- Mathew Waters: 하얀과 파란 구름이 덮인 녹색 나무들