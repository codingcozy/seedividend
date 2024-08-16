---
title: "HTML와 CSS를 사용하여 그라데이션 테두리와 그라데이션 텍스트가 있는 버튼을 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How To Make a Button with a Gradient Border and Gradient Text in HTML , CSS"
link: "https://medium.com/@christianjbolus/how-to-make-a-button-with-a-gradient-border-and-gradient-text-in-html-css-7d495656169"
isUpdated: true
---





<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_0.png" />

날카로운 디자인의 버튼은 사용자의 참여를 유도하는 좋은 방법입니다. 이 튜토리얼에서는 위에 표시된 그라데이션 테두리와 그라데이션 텍스트가 있는 버튼을 어떻게 만들었는지 보여 드리겠습니다. 다만 이 방법은 굳은 배경에 대해서만 작동한다는 점을 강조해 드립니다. 이 기사 전반에 걸쳐 사용할 일부 기술에 대한 보다 심층적인 설명을 제공하는 리소스로 연결할 예정입니다.

설명을 건너뛰고 바로 코드로 이동하고 싶다면 여기에서 예제를 찾을 수 있습니다.

이 효과를 만들려면 여러 요소를 서로 쌓아야 합니다. 우리는 ::before 및 ::after 가상 요소를 가진 버튼 요소를 사용하여 이를 수행할 것입니다. ::before 및 ::after는 해당되는 요소의 자식 요소를 만들어 냅니다.

<div class="content-ad"></div>

::before와 ::after에 대한 더 깊은 설명을 원하신다면 이 비디오를 추천드려요.

우리의 초기 HTML과 CSS는 이렇습니다.

HTML

```js
<div class="container">
  <button class="btn"></button>
</div>
```

<div class="content-ad"></div>

CSS

```js
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
}
```

화면 중앙에 버튼을 표시하기 위한 엄격한 목적으로 container div가 있습니다. 귀하의 프로젝트에서 이를 사용할지 여부에 따라 필수는 아닙니다.

현재 버튼은 이와 같이 보여야 합니다:

<div class="content-ad"></div>

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_1.png" />

별로 흥미롭지 않네요. 그리고 분명히 알아차렸겠지만, 저희 버튼에는 텍스트가 없습니다. 그 부분은 나중에 다루겠습니다.

첫 번째로 할 일은 그라데이션 테두리 효과를 만드는 것입니다. 이 작업은 보다 간단하지 않을 수 있습니다. 불행히도 CSS에서 border 속성에 그라데이션을 추가하는 쉬운 방법은 없습니다. 걱정하지 마세요. 우리 직접 만들 수 있습니다. 첫 번째 의사 요소가 도와주는 곳입니다. 아래 CSS를 .btn 클래스에 추가할 겁니다:

```js
.btn {
  padding: 20px 60px;
  border: none;
  outline: none;
  position: relative;
  border-radius: 5px;
  background: linear-gradient(to right, #00FFA3, #DC1FFF);
  cursor: pointer;
}
```

<div class="content-ad"></div>

상대 위치 속성을 사용하여 첫 번째 의사 요소를 배치할 수 있습니다. 이제 버튼은 다음과 같아야 합니다:

![버튼](/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_2.png)

테두리 효과를 생성하려면 버튼 내부에 ::before 의사 요소를 배치하고 페이지 배경색과 동일한 배경색(우리의 경우 흰색)을 지정해야 합니다. .btn 클래스 아래에 다음 CSS를 추가해보세요:

```js
.btn::before {
  content: "";
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  background-color: white;
}
```

<div class="content-ad"></div>

우리의 버튼은 이제 다음과 같아야 합니다:

![버튼 이미지](/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_3.png)

우리가 원하는 것은 아니지만 고쳐보겠습니다. 여기서 무슨 일이 벌어지고 있는지 살펴보겠습니다. ::before 추가는 가상 요소로 버튼의 자식입니다. position: absolute 속성은 요소를 문서의 흐름에서 제거하는 데 사용됩니다. position: absolute로 배치된 요소가 position 속성을 가진 조상이 없으면 루트 요소인 html 태그를 기준으로 배치됩니다. 그러나 우리가 버튼에 position: relative를 추가했고, ::before는 버튼의 자식이기 때문에 버튼을 기준으로 배치됩니다.

position: absolute 및 position: relative에 대해 더 자세히 알고 싶다면, 이 비디오를 추천합니다.

<div class="content-ad"></div>

위쪽, 오른쪽, 아래쪽 및 왼쪽 속성들은 ::before의 가장자리를 버튼의 가장자리에서 1픽셀 떨어지게 합니다. 우리 버튼 모서리에 간격이 있는 이유를 이해하려면, ::before의 배경색을 검정으로 변경해 봅시다:

```js
.btn::before {
  content: "";
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  background-color: black;
}
```

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_4.png" />

자세히 보면, ::before의 모서리가 사각형 모양이며 따라서 우리 버튼의 둥근 모서리에 잘릴 수 있습니다. 이는 ::before의 색상이 배경색과 동일할 때 간격처럼 보이게 합니다. 이 문제를 해결하기 위해 ::before에 일정한 border-radius를 추가하겠습니다. 두 요소 사이에 균일한 간격을 얻을 수 있도록 중첩된 요소에 얼마나 많은 border-radius를 줘야 하는지 계산하는 다음 공식을 사용하는 것을 선호합니다:

<div class="content-ad"></div>

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_5.png" />

우리가 이미 갖고있는 값들로 이 공식을 사용하면 올바른 border-radius 값을 :: before에 제공할 수 있습니다. 우리의 버튼은 border-radius: 5px (R1)이 있고 버튼과 :: before 사이에 1px 간격 (D)이 있습니다. 즉, :: before은 border-radius: 4px를 가져야 합니다.
R1 — D = R2 -` 5 — 1 = 4:

```js
.btn::before {
  content: "";
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  background-color: black;
  border-radius: 4px;
}
```

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_6.png" />

<div class="content-ad"></div>

이제 우리가 테두리를 올바르게 라운딩했으므로,::before의 배경색을 다시 흰색으로 변경할 수 있습니다:

```js
.btn::before {
  content: "";
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  background-color: white;
  border-radius: 4px;
}
```

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_7.png" />

이제 우리의 그라데이션 테두리 효과가 완성되었습니다. 이제 그라데이션 텍스트로 넘어가겠습니다.

<div class="content-ad"></div>

::before가 button 요소의 자식이므로 position: absolute를 가지고 있습니다. 따라서 ::before는 button 위에 쌓이게 됩니다. 이는 button 태그 사이에 일반적으로 넣는 텍스트를 사용할 수 없다는 것을 의미합니다. 왜냐하면 그것은 ::before에 의해 가려지기 때문입니다. 이 문제를 해결하기 위해 또 다른 가상 요소인 ::after를 사용할 것입니다. 또한 button 요소에 data 속성을 추가할 것입니다.

다음과 같이 HTML을 작성합니다:

```js
<div class="container">
  <button class="btn" data="Click me"></button>
</div>
```

그리고 ::after에 대한 CSS는 다음과 같습니다:

<div class="content-ad"></div>

```js
.btn::after {
  content: attr(data);
  font-size: 16px;
}
```

자, 이제 하나씩 알아보겠습니다. attr()은 CSS 함수로, 속성의 값을 반환하는 기능입니다 (우리의 경우 데이터 속성). 여기서 이 함수를 사용하여 content 속성의 값을 설정하고 "Click me"가 될 것입니다. content 속성을 직접 하드코딩할 수도 있지만, attr() 함수를 사용하면 JavaScript 라이브러리/프레임워크인 React에서 재사용 가능한 컴포넌트로 사용할 경우 버튼을 구성 가능하게 만들 수 있습니다.

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_8.png" />

아마도 우리가 텍스트를 보지 못한다는 것을 눈치챘을 것입니다. 그러나 이제 우리의 버튼은 더 커져서 .btn 클래스에 추가한 패딩이 어딘가를 밀어올리고 있음을 의미합니다. 우리가 텍스트를 보지 못하는 이유는 현재 ::before (position: absolute 때문에)가 현재 ::after도 가리고 있기 때문입니다. 우선 ::before를 주석 처리해 봅시다:

<div class="content-ad"></div>

```js
/* .btn::before {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 4px;
  background-color: #fff;
  z-index: -1;
} */
```

이제 다음을 보게 될 것입니다:

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_9.png" />

그래디언트 텍스트 효과를 만들기 위해 먼저 ::after의 배경에 같은 색상을 사용하여 선형 그라데이션을 적용해야 합니다. 단, 방향만 반대로 설정합니다:

<div class="content-ad"></div>

```js
.btn::after {
  content: attr(data);
  font-size: 16px;
  background: linear-gradient(to left, #00FFA3, #DC1FFF);
}
```

그러면 이렇게 됩니다:

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_10.png" />

다음 단계는 ::after 에 -webkit-background-clip: text 및 color: transparent를 추가하는 것입니다. background-clip에 -webkit 접두사를 사용하고 있습니다. 이 속성은 아직 모든 브라우저에서 완전히 지원되지 않기 때문입니다.

<div class="content-ad"></div>

```js
.btn::after {
  content: attr(data);
  font-size: 16px;
  background: linear-gradient(to left, #00FFA3, #DC1FFF);
 -webkit-background-clip: text;
  color: transparent;
}
```

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_11.png" />

백그라운드 클립 속성은 요소의 배경이 콘텐츠를 넘어서 얼마큼 확장되는지를 결정합니다. 값으로 text를 설정하면 ::after에 설정한 그라디언트 배경이 문자 텍스트 자체가 차지하는 공간 뒤에만 표시되기를 원한다는 것을 의미합니다. color: transparent를 설정하면 클립된 배경이 텍스트를 통해 드러나며 그라디언트 텍스트 효과를 얻을 수 있습니다.

백그라운드 클립 속성에 대한 더 많은 정보는 이 문서를 참조하실 것을 권장합니다.

<div class="content-ad"></div>

우리 ::before CSS에서 다시 주석을 달아보겠습니다:

```js
.btn::before {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 4px;
  background-color: white;
}
```

버튼을 완성하려면 요소를 올바른 순서로 쌓아야 합니다. 버튼 요소에 position 속성이 적용되어 있기 때문에 .btn 클래스에 z-index: 1을 추가하여 새로운 쌓임 맥락을 만들 수 있습니다:

```js
.btn {
  padding: 20px 60px;
  border: none;
  outline: none;
  position: relative;
  border-radius: 5px;
  background: linear-gradient(to right, #00FFA3, #DC1FFF);
  cursor: pointer;
  z-index: 1;
}
```

<div class="content-ad"></div>

지금은 아무런 변화가 없습니다:

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_12.png" />

z-index 속성은 요소가 z축을 따라 쌓이는 순서를 나타냅니다. 값이 더 높은 요소가 위에 표시됩니다. 따라서 ::before를 ::after 뒤로 움직이려면 z-index: -1을 줍니다. -1이라는 값이 1보다 작으므로 ::before가 버튼 뒤로 움직일 것이라고 생각할 수 있습니다. 그러나 ::before와 ::after는 버튼 요소의 자식이며 버튼이 새로운 쌓임 맥락을 만들기 때문에 ::before와 ::after는 항상 버튼 위에 쌓입니다. 따라서 ::before에 z-index: -1을 지정하여 ::after 뒤로 이동시키면 버튼 위에 유지됩니다.

쌓임 맥락과 z-index에 대한 자세한 내용은 이 기사와 이 비디오를 추천합니다:

<div class="content-ad"></div>

```js
.btn::before {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 4px;
  background-color: white;
  z-index: -1;
}
```

이제 버튼이 완성되었습니다:

<img src="/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_13.png" />

...하지만 몇 가지 마무리 작업을 추가해보겠습니다.

<div class="content-ad"></div>

첫 번째로 ::before와 ::after에 트랜지션을 추가할 거에요. 200ms가 속도로 설정돼요.

```js
.btn::before {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 4px;
  background-color: white;
  z-index: -1;
  transition: 200ms;
}
.btn::after {
  content: attr(data);
  font-size: 16px;
  background: linear-gradient(to left, #00FFA3, #DC1FFF);
  -webkit-background-clip: text;
  color: transparent;
  transition: 200ms;
}
```

다음으로는 :hover 가상 클래스를 ::before와 ::after에 사용하여 버튼에 호버 효과를 추가하겠어요:

```js
.btn:hover::before {
  opacity: 50%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.btn:hover::after {
  color: white;
}
```

<div class="content-ad"></div>

::before에 있는 :hover 가상 클래스의 top, right, bottom 및 left 속성을 수정하면 버튼의 전체 폭과 높이가 확장됩니다. ::after의 opacity: 50% 및 color: white와 결합하여 버튼을 가리면 다음과 같은 효과가 발생합니다:

![이미지](/assets/img/HowToMakeaButtonwithaGradientBorderandGradientTextinHTML-CSS_14.png)

이 튜토리얼이 도움이 되었으면 좋겠습니다. 읽어 주셔서 감사합니다. 개선 제안이 있으시면 알려주시기 바랍니다. 즐거운 코딩되세요!

전체 HTML 및 CSS는 아래에서 확인할 수 있습니다. 예시 CodePen은 여기에서 확인할 수 있습니다:

<div class="content-ad"></div>

Markdown

```css
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.btn {
  padding: 20px 60px;
  border: none;
  outline: none;
  position: relative;
  z-index: 1;
  border-radius: 5px;
  background: linear-gradient(to right, #00ffa3, #dc1fff);
  cursor: pointer;
}
.btn::before {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 4px;
  background-color: white;
  z-index: -1;
  transition: 200ms;
}
.btn::after {
  content: attr(data);
  font-size: 16px;
  background: linear-gradient(to left, #00ffa3, #dc1fff);
  -webkit-background-clip: text;
  color: transparent;
  transition: 200ms;
}
.btn:hover::before {
  opacity: 50%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.btn:hover::after {
  color: white;
}
```
