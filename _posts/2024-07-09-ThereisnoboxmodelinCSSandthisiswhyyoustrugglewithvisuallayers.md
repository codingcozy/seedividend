---
title: "CSS에 박스 모델이 없는 이유  시각적 레이어에서 어려움을 겪는 이유"
description: ""
coverImage: "/assets/img/2024-07-09-ThereisnoboxmodelinCSSandthisiswhyyoustrugglewithvisuallayers_0.png"
date: 2024-07-09 18:13
ogImage: 
  url: /assets/img/2024-07-09-ThereisnoboxmodelinCSSandthisiswhyyoustrugglewithvisuallayers_0.png
tag: Tech
originalTitle: "There is no box model in CSS — and this is why you struggle with visual layers"
link: "https://medium.com/@decketts/there-is-no-box-model-in-css-and-this-is-why-you-struggle-with-visual-layers-24de916657c0"
isUpdated: true
---



## JavaScriptUI — DevBlog #8

<img src="/assets/img/2024-07-09-ThereisnoboxmodelinCSSandthisiswhyyoustrugglewithvisuallayers_0.png" />

지난 주에는 CSS의 "박스 모델"이 부적절한 용어라고 생각하는 이유와, 이 모델이 기본적으로 부서져 있는 것을 간단한 CSS 테두리만 사용해서 보였습니다. 이번 에피소드에서는 제 생각을 더 뒷받침하는 또 다른 예제를 제시할 것입니다. 이번에는 유용한 것도 함께 만들어볼 거에요.

## 필드 데이

<div class="content-ad"></div>

간단한 팝업 창을 만들어 사용자가 웹 앱에 로그인하도록 하는 것이 목적이라고 가정해 봅시다. 굉장히 기본적인 내용으로, 텍스트 몇 개, 입력 필드 몇 개, 그리고 버튼 몇 개만 필요합니다. 우리 아이디어의 대략적인 스케치는 이렇게 보일 수 있습니다:

![Popup Sketch](/assets/img/2024-07-09-ThereisnoboxmodelinCSSandthisiswhyyoustrugglewithvisuallayers_1.png)

우리는 총 일곱 가지 모양을 가지고 있습니다: 연한 회색 배경, 환영 제목, 사용자명을 입력하는 텍스트 필드 하나, 비밀번호를 입력하는 텍스트 필드 하나, 비밀번호를 재설정하는 버튼 하나, 로그인하는 버튼 하나, 그리고 팝업 창 자체를 닫는 버튼 하나가 팝업의 오른쪽 상단에 있습니다.

그렇다면, 이것을 디자인 소프트웨어에서 어떻게 그려야 할까요? 기본 아이디어는 우리의 직관을 따르고 유형의 물리적 객체처럼 구조를 구성하는 것입니다: 모든 요소는 각자의 레이어를 갖습니다. 먼저, 전체 팝업의 배경으로 작용하는 직사각형을 만들고, 그 다음에는 주요 요소들을 균등하게 배치하는 그룹을 만들고, 마지막으로 팝업을 닫는 버튼을 가장 위에 위치한 레이어로 만듭니다. 개념적으로, 우리가 하는 것은 이겁니다:

<div class="content-ad"></div>

![image](/assets/img/2024-07-09-ThereisnoboxmodelinCSSandthisiswhyyoustrugglewithvisuallayers_2.png)

이거 상자 같아 보이지 않아요? 우리는 폭, 높이, 깊이를 갖고, 글쎄, 이건 사실, 물건들을 서로 위에다 쌓는 건데, 마치 상자 안에다 물건을 담는 것처럼 말이에요. 이게 물질적 물건이 작동하는 방식이고, 거의 모든 디자인 소프트웨어들이 작동하는 방식이며, 우리가 HTML과 CSS에서 예상하는 방식이기도 해요. 특히 CSS의 핵심 원칙이 여기 있는 네모 상자 모델이라는 점을 생각해봤을 때요.

그래서, 우리는 웹에서 이와 같은 것들을 달성할 수 있을까요? 물론 불가능하죠.

## CSS 팬케이크 모델

<div class="content-ad"></div>

웹에서 겹치는 합성물을 만들어야 할 때마다 늘 괴로워해요. "박스 모델"이라는 이름과는 달리, CSS는 적절한 시각적 레이어를 구현하는 데 어려움을 겪어 우리는 메인 레이아웃 평면을 벗어날 방법을 찾기 위해 비전통적이고 직관적이지 않은 해킹을 사용해야 합니다. 이 간단한 예제에서 디자인을 어느 정도 실현하려면 세 가지 다른 도구를 사용해야 합니다:

- 백그라운드를 사용하여 기본 사각형을 구현
- position: absolute를 사용하여 닫기 버튼을 만듭니다.
- position: fixed를 사용하여 팝업 자체를 만듭니다.

이들을 살펴보고 문제점에 대해 논의해봅시다.

## #1 — 배경

<div class="content-ad"></div>

CSS에서는 많은 요소에 배경을 설정할 수 있습니다. 디자인 소프트웨어에서 보통 하는 것처럼 컨테이너 안에 사각형을 그냥 넣을 수는 없기 때문에 이 기능을 활용하여 기본 레이어를 구현해야 합니다.

예를 들어, 주요 요소에 플렉스 컨테이너를 사용하고 이 요소에 배경을 정의한다고 해보겠습니다. 이를 HTML과 CSS를 사용해 아래와 같이 구현할 수 있습니다:

```js
<div id="popup">
  <h1>👋 안녕하세요!</h1>
  <input type="text">
  <input type="password">
  <p><a>비밀번호를 잊으셨나요?</a></p>
  <button>로그인</button>
</div>
```

```js
#popup {
  /* 컨테이너 및 배경 설정 */
  width: 480px;
  padding: 55px 85px 55px 85px;
  border-radius: 30px;
  background-color: #e6e6e6;

  /* 콘텐츠 레이아웃 설정 */
  display: flex;
  flex-direction: column;
  row-gap: 50px;
}
```

<div class="content-ad"></div>

배경 소리를 사용하는 것은 똑똑한 해결책처럼 보이지만, 여기서 문제는 우리의 코드가 화면에 두 가지 다른 뷰(둥근 모서리가 있는 직사각형 및 위에 수직 분산된 하나)를 생성할 것임에도 불구하고, 현재 이들이 코드에서 합쳐져 있습니다. #popup의 스타일 정의를 살펴보세요. 여기서 이제 배경 "요소"와 하위 요소의 레이아웃을 설정했습니다. 일부 속성은 하나의 뷰(배경)를 가리키지만 다른 일부는 나머지(하위 레벨 요소)를 가리킵니다.

이것은 의미론적인 코드와 정반대입니다.

CSS 배경에 대해 재미있는 점은 여러 개를 적용할 수 있고, 이들은 실제로 레이어라고 합니다. 유일한 문제는, 배경 속성을 사용하여 여러 요소를 서로 겹쳐 놓을 수 없다는 것입니다. 오직 색상과 이미지만 사용할 수 있습니다. 하지만 우리는 그들을 위치하고 크기를 조절할 수 있으며, 더 중요한 것은 서로 겹쳐 놓을 수 있다는 것입니다.

그래서 CSS는 본질적으로 시각적 레이어를 다시 발명했고 (의사 그림자 DOM? 😅), 그런 다음 배경 속성 형태의 자신만의 위치 및 크기 시스템을 다시 발명했습니다. 요소를 서로 겹쳐 놓을 수 있는 적절한 구성을 제공하는 대신. 단순성을 위해서 이 모든 것을 안겨주었습니다.

<div class="content-ad"></div>

## #2 — 절대 위치 지정

배경이 요소를 처리할 수 없기 때문에 닫기 버튼에 대한 다른 해결책이 필요합니다. 이를 위해 position: absolute를 사용할 것입니다. 단점은 이로 인해 코드가 더 복잡해질 수 있다는 것입니다.

이전 코드를 수정하여 닫기 버튼을 포함하면 다음과 같이 될 것입니다:

```js
<div id="popup">

  <h1>👋 안녕하세요!</h1>
  <input type="text">
  <input type="password">
  <p><a>비밀번호를 잊으셨나요?</a></p>
  <button>로그인</button>

  <button id="close"><img src="close.svg"></button>

</div>
```

<div class="content-ad"></div>

```css
#popup {
  /* 컨테이너 및 배경 설정 */
  width: 480px;
  padding: 55px 85px 55px 85px;
  border-radius: 30px;
  background-color: #e6e6e6;

  /* 콘텐츠 레이아웃 설정 */
  display: flex;
  flex-direction: column;
  row-gap: 50px;

  /* 다른 콘텐츠 레이아웃 설정 */
  position: relative;
}

#close {
  /* 콘텐츠 레이아웃 무시 */
  position: absolute;
  top: 25px;
  right: 25px;
}
```

원본 디자인과 유사한 결과를 얻을 수 있지만, 두 가지 이슈가 있습니다.

첫째, #popup 요소는 이제 실제로 세 가지 다른 시각적 레이어를 사용하여 하나의 객체로 존재하며 서로 다른 접근 방식으로 렌더링됩니다. 화면에 렌더링되는 뷰 트리와 실제로 렌더링되는 것 사이에 상당한 불일치가 있어 레이아웃을 이해하기 어렵고 작업하기도 더 어렵게 만듭니다.

둘째, #popup 요소의 자식 요소 레이아웃이 모호합니다. 요소에 display 속성을 설정하면 해당 요소의 자식 요소 레이아웃을 정의하고 position 속성을 설정하면 요소 자체의 레이아웃을 정의합니다. 예를 들어, #popup은 자식 요소를 수직 스택으로 배치하려고 하지만 이 레이아웃에서 닫기 버튼을 분리하여 flexbox 동작을 무시하려고 합니다. 게다가 HTML 코드도 매우 혼란스럽습니다. 서로 다른 레이아웃 모드를 명확하게 분리할 것으로 기대했는데 무작위로 혼합하고 무시하는 대신.

<div class="content-ad"></div>

세 번째로, #popup 요소의 위치도 변경해야 합니다. 그렇지 않으면 닫기 버튼이 첫 번째 위치 지정된 조상에 상대적일 것입니다. 실제로 position: relative가 절대 기준점이고 position: absolute가 상대적이며 position이 display의 한 형태임을 제외하더라도, 이 코드에는 심지어 아주 작은 의미적 가치를 가진 부분이 없습니다. 이제 우리의 뷰 트리는 렌더링하는 것과는 전혀 다른 레이아웃을 함유하게 되었습니다.

이 꼬랐음에 비해 JavaScriptUI가 정확히 같은 문제를 다루는 방식은 다음과 같습니다:

```js
ZStack(
  Rectangle(),
  VStack(Text("👋 Hi there!"), TextField(), SecureField(), Text("비밀번호를 잊으셨나요?"), Button("로그인")),
  Image("close.svg")
);
```

이 코드는 원본 디자인과 1:1 대응합니다. ZStack을 사용하여 서로 겹치는 모든 종류의 뷰를 배치할 수 있습니다(이미지와 색상 뿐만 아니라), 각 컨테이너는 하위 항목에 대한 단일 레이아웃 모드를 정의하며 이러한 레이아웃을 하위 뷰에서 재정의하지 않습니다. 이 UI 코드는 본질적으로 의미론적이며 디스플레이 및 위치 속성, 배경 속성 내의 "의사 셰도우 DOM"에 대한 필요성을 제거합니다.

<div class="content-ad"></div>

만약 HTML/CSS 버전을 완전히 공평하게 유지하고 싶다면 해당 코드에 모든 스타일링, 레이아웃 및 상호 작용을 추가할 수 있습니다.

```js
ZStack(
  Rectangle().fillColor("#e6e6e6").cornerRadius(30),

  VStack(
    Text("👋 안녕하세요!"),
    TextField(),
    SecureField(),
    Text("비밀번호를 잊으셨나요?").onClick(() => {}),
    Button("로그인").onClick(() => {})
  )
    .gapY(50)
    .padding(55, 85, 55, 85),

  Image("close.svg")
    .top(25)
    .right(25)
    .onClick(() => {})
).width(480);
```

또는 기본 사각형 대신 배경 이미지로 작업하는 것을 선호한다면 다음과 같이 할 수 있습니다.

```js
ZStack(
  VStack(
    Text("👋 안녕하세요!"),
    TextField(),
    SecureField(),
    Text("비밀번호를 잊으셨나요?").onClick(() => {}),
    Button("로그인").onClick(() => {})
  )
    .gapY(50)
    .padding(55, 85, 55, 85),

  Image("close.svg")
    .top(25)
    .right(25)
    .onClick(() => {})
)
  .width(480)
  .cornerRadius(30)
  .backgroundColor("#e6e6e6");
```

<div class="content-ad"></div>

## #3 — 고정 위치

배경으로 사용하는 기본 레이어가 있고, 닫기 버튼은 position: absolute로 설정했습니다. 그러나 팝업을 배치해야 합니다. 팝업과 문서의 나머지는 서로 다른 레이어에 있어야 합니다. 안타깝게도 background나 position: absolute로는 이렇게 배치하는 상황을 해결할 수 없습니다. 그래서 세 번째 접근 방식이 필요합니다: position: fixed.

fixed positioning 구현이 얼마나 어려운지에 대해 자세히 설명하지 않겠지만, 관심이 있다면 여기에서 읽을 수 있는 전체 포스트가 있습니다.

## 요약해 보면

<div class="content-ad"></div>

CSS는 상자 모델을 갖고 있다고 자기 광고를 하지만, 오버레이 요소에 대한 일반화된 해결책은 제공하지 않고, 임시 해킹만 가능합니다. 우리는 배경 속성을 사용해야 하는데, 이는 요소를 처리할 수 없고 우리의 뷰 트리에 별도의 View가 없는 position: absolute를 사용해야 합니다. 이는 사실 relative를 의미하며 UI 의미론을 깨는데, position: fixed는 HTML 및 CSS에 의해 설정된 더 근본적인 시각적 개념을 위반하는 훨씬 더 큰 문제입니다. 이들은 크게 다른 접근 방식으로 특정 문제만 해결할 수 있으며, 우리의 뷰 트리를 매우 모호하고 혼란스럽게 만듭니다.

## 그래서, 이제 어떻게 해야 할까요?

문제는, 웹에서 요소를 오버레이/중첩하기 위한 적절한 레이어를 가능케 하는 일반화된 해결책을 찾지 못했습니다. 지금까지 다음 네 가지 방법만을 찾았지만, 어떤 것도 일반화된 해결책으로 작동하지 않았습니다:

- 위치 지정 사용(absolute, relative, fixed): 뷰 트리를 깨고, 충돌하는 레이아웃 모드를 만듭니다. 위치 지정된 요소의 동적 레이아웃이 없습니다(ZStack이나 유사한 것이 불가능), 레이아웃은 거의 완전 수동적입니다.
- 음수 마진 사용: 절대적인 혼란, 확장 가능한/실행 가능한 해결책은 아닙니다. 여전히 어떤 종류의 디스플레이 및/또는 위치 모드가 필요합니다.
- 변형 사용: 레이아웃 도구가 아니며 다른 목적이 있습니다. 여전히 디스플레이 및/또는 위치 모드가 필요합니다.
- 그리드 사용하여 요소를 동일 셀에 넣기: 이상한 솔루션이지만 흥미로운데, 오버플로 처리 없음, 패딩 없음, 배경 없음, 컨테이너에 둥근 모서리 없음, 명시적 및 암시적 너비/높이 모두 작업하기가 어려움

<div class="content-ad"></div>

마지막으로, 하나의 그리드 셀을 사용하는 것은 꽤 흥미로운 방법입니다. 원시 HTML 및 CSS에서는 이렇게 보일 것입니다:

```js
<div id="popup">
  <div id="background"></div>
  <div id="form">
    <h1>👋 안녕하세요!</h1>
    <input type="text">
    <input type="password">
    <p><a>비밀번호를 잊으셨나요?</a></p>
    <button>로그인</button>
  </div>
  <button id="close"><img src="close.svg"></button>
</div>
```

```js
#popup {
  display: grid;
  grid-template-columns: 480px; /* 필요함, 그렇지 않으면 justify-self가 작동하지 않음 */
}

#popup > * {
  grid-area: 1 / 1 / 1 / 1;
}
```

이것은 기본적인 아이디어일 뿐이지만, 이전에 언급했듯이, 거의 모든 일반적인 레이아웃 속성이 그리드 컨테이너에 적용되지 않고 정렬은 항상 부모 상대적인 것에 맞춰지며 다른 형제요소에 대해 적용되지 않기 때문에 ZStack 구현으로 사용하는 목적에 어긋납니다.

<div class="content-ad"></div>

## 제약 사항

또 다른 문제는 ZStack 구현으로도 모든 겹침 문제를 해결할 수 없다는 것입니다. 가장 일반적인 해결책은 이제 뷰를 배치하기 위해 컨테이너 대신 제약 조건을 사용하는 것입니다. 이 레이아웃 모드는 본 글의 범위를 벗어나지만 간단히 말하면, 레이아웃 속성 간의 산술 관계를 정의하여 레이아웃을 생성하는 것입니다. 이러한 제약을 사용하면 겹침을 효과적으로 처리할 수 있습니다.

제약 조건을 사용하여 다음과 같이 예제를 작성할 수 있습니다:

```js
Group(
  Rectangle().width(parent.width).height(parent.height),

  VStack(Text("👋 안녕하세요!"), TextField(), SecureField(), Text("비밀번호를 잊으셨나요?"), Button("로그인"))
    .width(parent.width)
    .height(content.height),

  Image("close.svg")
    .right(parent.right - 25)
    .top(parent.top - 25)
)
  .width(480)
  .height(content.height);
```

<div class="content-ad"></div>

이 모델에서 유일한 규칙은 각 뷰가 정확히 네 개의 레이아웃 값을 가져야 한다는 것입니다(각 방향마다 두 개씩), 그러나 사용 가능한 네 가지 중 아무 두 가지든 될 수 있습니다(예: 왼쪽 + 오른쪽 또는 가운데 + 너비), 또는 기본값으로 남겨둘 수도 있습니다. 나머지는 자동으로 계산됩니다. 이 모델의 장점은 어떤 뷰든 다른 뷰로 제약을 줄 수 있다는 것입니다. 부모-자식 관계일 필요는 없습니다(여기에는 상당히 간단한 예시만 있습니다). 따라서 우리의 뷰는 원하는 방식으로 서로 겹쳐서 표현할 수 있고, 반응형 능력도 유지할 수 있습니다.

웹에서 일반화된 동적 제약 시스템을 구현하는 것은 현재 상당히 어려운 일입니다(주로 크기 변경만 감지할 수 있기 때문입니다). 그러나 JavaScriptUI에서 이 모델의 상속-자손 서브셋을 구현하기 위해 노력 중입니다.

## 업데이트: "그런데, 왜 신경 쓰나?"

JavaScriptUI로 무엇을 이루고자 하는지 아직 명확하지 않은 분들이 있음을 깨달았습니다. 그래서 제가 원하는 바를 정확히 전달하기 위해 간단한 설명을 준비했습니다. 이전에 여러 차례 언급한 대로, 가장 큰 문제는 HTML과 CSS가 기본적인 그래픽 디자인 원칙을 준수하지 않아서, 이미 경험 많은 디자이너들이 유명한 디자인 소프트웨어로 작성한 기존 모의작품으로부터 올바르고 유지하기 어렵게 레이아웃을 작성하고 수정하는 것입니다. JavaScriptUI는 터무니없는 HTML과 CSS 개념 없이 그래픽 디자인을 웹 디자인으로 번역하는 해결책입니다. 따라서 다음 예시를 보시고 HTML 및 CSS를 사용하는 것보다 JavaScriptUI를 사용하여 레이아웃을 제작하는 것이 여전히 더 나은지 말해 주세요:

<div class="content-ad"></div>

## 이제 마무리

이번 주의 내 엔트리는 여기까지입니다. 흥미로웠으면 좋겣다고 생각합니다. 제 작업을 좋아하셨다면 박수를 치거나 의견을 남겨주시고 다른 사람들과 공유해주세요.

감사합니다, 좋은 한 주 되세요.

⬅️ DevBlog #7 — CSS에는 상자 모델이 없습니다 — 그래서 경계선이 끔찍한 이유
