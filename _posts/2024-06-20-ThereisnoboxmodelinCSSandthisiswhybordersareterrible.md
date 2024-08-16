---
title: "CSS에서는 박스 모델이 없습니다 - 그래서 테두리가 좋지 않은 이유"
description: ""
coverImage: "/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_0.png"
date: 2024-06-20 00:58
ogImage: 
  url: /assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_0.png
tag: Tech
originalTitle: "There is no box model in CSS — and this is why borders are terrible"
link: "https://medium.com/@decketts/there-is-no-box-model-in-css-and-this-is-why-borders-are-terrible-dd7e4b736955"
isUpdated: true
---




## 자바스크립트UI — 개발 블로그 #7

“이제 좀, 너무하지 마. 모두가 박스 모델이 CSS의 기반이라는 것을 알아. 넌 대체 뭘 얘기하고 있어?”

음, 그런 식으로 말하기는 싫지만, 이건 박스야:

![box](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_0.png)

<div class="content-ad"></div>

그리고 이것이 사각형입니다:

![Rectangle](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_1.png)

음, 사실은 여러 개의 직사각형이지만, 확실히 상자는 아닙니다. "사각형 모델"이라고 부르면 그렇게 멋있어 보이진 않겠지만, 정말로 일을 훨씬 쉽게 만들어줄 거에요.

사실, 더 자세히 살펴보면 상자와 사각형 사이에 뚜렷한 차이를 느낄 수 있을 거에요: 하나는 3차원이고 다른 하나는 완전히 평면입니다. 무언가를 "상자"라고 부르면 사람들은 자연스럽게 3차원적인 것을 기대할 테지만, CSS는 모든 것을 2차원으로 평평하게 만들려고 최선을 다합니다.

<div class="content-ad"></div>

이 불일치로 웹 레이아웃과 사용자 인터페이스를 구축하는 데 심각한 결과가 발생했습니다. 이 중 하나는 CSS에서 적절한 테두리를 적용할 수 없는 것입니다. 이것은 테두리가 문서 내로 펼쳐지기 때문입니다. 이것만으로도 CSS "박스" 모델이 근본적으로 깨진 이유를 보여줍니다.

이유를 살펴보겠습니다.

## 셋 중에서 하나

CSS "박스" 모델의 핵심에는 세 가지 개념이 있습니다: 마진 "박스", 테두리 "박스" 및 패딩 "박스"가 있습니다. 간단해 보이죠? 그렇지만, CSS에서 테두리는 항상 레이아웃의 일부인데 실제로는 그렇지 않아야 합니다. 이것이 두 가지 중요한 문제를 일으킵니다:

<div class="content-ad"></div>

- 어떤 요소의 크기가 애매해집니다
- 테두리의 너비가 변경될 때마다 레이아웃이 바뀌게 됩니다.

첫 번째 문제를 해결하기 위해 CSS에서는 box-sizing 속성을 소개했습니다. 이 속성을 border-box로 설정하면 요소의 크기에 테두리의 너비가 포함되고 content-box로 설정하면 포함되지 않습니다. 문제 해결되었죠, 맞나요?

다시 한 번 틀렸습니다. 아마도 제가 깐깐한 편이겠지만, 이 모델에서 content-box란 존재하지 않습니다. 여기에는 margin "상자", border "상자", 그리고 padding "상자"가 있습니다. padding "상자"가 이미 우리가 원하는 것(테두리는 제외하고 padding은 포함하는 크기)을 전달하고 있기 때문에, 왜 이것을 content-box라고 부르는지 정말 이해가 안 가요. 오히려, 직관적으로는 이것이 padding "상자" 안의 영역(네 번째 "상자")일 것이라고 생각할 텐데요.

그래도 두 번째 문제가 남아있습니다: 레이아웃이 바뀌는 문제입니다. box-sizing에 관계없이 레이아웃이 계속 바뀝니다. 그저 "상자" 내부의 모든 것을 엉망으로 만들 지, 바깥쪽 모든 것을 엉망으로 만들 지를 선택할 수 있을 뿐입니다. 버튼에 호버 효과를 추가할 때 테두리를 넣어보는 단순한 예제를 살펴보세요:

<div class="content-ad"></div>


![Image](https://miro.medium.com/v2/resize:fit:1400/1*ayv0dXb1OsnY0qv6EaxxUQ.gif)

아래는 이를 달성하는 코드입니다.:

```js
Stack(
    Button(`Border "box"`)
        .css("box-sizing", "border-box")
        .width(150)
        .height(50)
        .cornerRadius(25)
        .css("text-align", "center") //수평 정렬
        .css("line-height", "50px") //수직 정렬 요령
        .backgroundColor("#027FFC")
        .onMouseOver(self => self.border("2px solid black"))
        .onMouseOut(self => self.border("none")),
        
    Button(`Content "box"`)
        .css("box-sizing", "content-box")
        .width(150)
        .height(50)
        .cornerRadius(25)
        .css("text-align", "center") //수평 정렬
        .css("line-height", "50px") //수직 정렬 요령
        .backgroundColor("#027FFC")
        .onMouseOver(self => self.border("2px solid black"))
        .onMouseOut(self => self.border("none"))
)
    .width(680)
    .height(500)
    .gapX(20)
    .css("justify-content", "center") //수평 정렬
    .css("align-items", "center"); //수직 정렬
```

이는 일반적이고 상대적으로 간단한 레이아웃 상황입니다: 동일한 크기의 두 버튼을 만들어 호버 시 2px 폭의 검은 실선 테두리를 추가합니다. border-box를 사용하면 버튼 내부의 레이아웃이 깨지고 content-box를 사용하면 주변에 레이아웃이 깨집니다. 이보다 더 기본적인 예제를 찾기 어려울 것이며, 심지어 여기서도 "box" 모델이 완전히 붕괴됩니다.


<div class="content-ad"></div>

이 문제는 단순한 픽셀 조정이라고 속시원하게 말할 수 있지만, 시각 장애나 인지 장애를 가진 사람들에게는 중요한 접근성 문제입니다. 그리고 어떤 요소에도 동적으로 테두리를 설정할 때 이 문제가 널리 발생합니다.

## 꿍꿍이, 해킹, 하지만 진짜 해결책은 없다

불행히도, 이 문제에 대한 좋은 해결책은 없습니다. 도리어 크리에이티브한 꿍꿍이와 비겁한 해킹이 많이 있지만, 이러한 해결책들은 심각한 단점 없이는 작동하지 않습니다:

- 배경과 동일한 스타일링을 사용하는 유휴 상태의 플레이스홀더 테두리를 추가하고 테두리의 존재 여부를 토글하는 대신 이러한 스타일을 모두 테두리에 적용: 이 방법은 우리 코드의 의미적 성격을 파괴하며 단일 테두리 속성 대신 여러 값을 변경해야 하며 배경의 스타일 복잡성이 증가할수록(투명도, 백드롭 필터, 유휴 및 호버 상태 이상) 점점 복잡해집니다. 또한 CSS로 가운데 테두리를 구현할 수 없습니다 (이 후에 이에 대해 언급할 것이고) (또한 CSS로 가운데 정렬은 왜 거의 어디서나 끔찍한가요?)
- 패딩을 사용하여 유휴 테두리를 가짜로 만들기: 이 또한 의미론적으로 적합하지 않고, 단일 테두리 속성 대신 여러 값을 토글해야 하며 가운데 "테두리"가 없습니다 (내부 또는 외부만 가능)
- 아웃라인을 사용하여 테두리를 가짜로 만들기: 다시한번 의미론적 해결책이 아닌 다른 도구를 사용하며 이미 목적이 있고, 코드가 혼란스럽게 만들어지며 가운데 "테두리"가 없습니다 (내부 또는 외부만 가능)
- 드롭 섀도우를 사용하여 테두리를 가짜로 만들기: 동일한 문제가 있으며, 의미론적이 아니며, 목적이 다르며, 깔끔하지 않으며, 가운데 "테두리"가 없습니다 (내부 또는 외부만 가능)
- 일반 요소나 svg 사각형을 기존 요소 위에 추가하여 테두리 역할을 하는 요소로 사용: 의미론적이 아니며, 스타일링뿐만 아니라 뷰 트리(html 계층 구조)를 불필요하게 늘려주며 (예: 둥근 모서리?), CSS에서 요소를 겹치는 것은 일반적으로 고통스럽지만 적어도 가운데 정렬할 수 있습니다 (내부 또는 외부만 가능)
- 명시적인 대신 상대적인 크기 사용: 두 개 이상의 버튼 너비를 일치시킬 수 없으며, 항상 콘텐츠 상자처럼 동작하기 때문에 모든 것이 외부로 커져 (버튼 내의 레이아웃 변화하는 문제를 포함시킬 수 없게됩니다), 여전히 가운데 테두리가 없습니다. (외부만 가능)

<div class="content-ad"></div>

무엇을 시도해도 "해결책"은 추해고 부자연스럽며 번거로울 것입니다. 이렇게 쉬운 것조차도 이렇게 불행스러울 때, 우리는 어떻게 효율적으로 가치 있는 것을 구축할 것을 기대할 수 있을까요? 그리고 이것이 CSS의 핵심입니다는 것을 염두에 두세요.

## 개요

우리는 실제로 직사각형 모델인 상자 모델이 있고, 실제로는 패딩 상자인 content-box가 있습니다. 레이아웃을 망치치 않고 테두리를 추가할 수 없습니다. 우리는 배경 스타일과 일치하는 placeholder 테두리를 사용하도록 강요당하며, 이 기본적인 문제를 해결하기 위해 패딩, 외곽선 또는 그림자를 사용하여 가짜 테두리를 추가하거나 다른 겹치는 요소를 사용해야 합니다. 그럼에도 불구하고, 여전히 중앙에 테두리를 넣을 수 없습니다. 붕출(outset) 또는 삽입(inset)만 가능합니다. 그리고 CSS가 가파른 학습 곡선을 갖는 이유에 궁금해할 수도 있습니다.

## 다른 차원에서 참된 해결책

<div class="content-ad"></div>

기본 CSS "박스" 모델이 그렇게 나쁘다면 올바른 접근 방식은 무엇인가요?

쉬워요: "박스" 모델에서 테두리를 제거하고 우리 요소 위에 배치하세요. 테두리를 내용, 여백 및 안쪽 여백과 함께 같은 평면으로 펴야 할 필요는 전혀 없어요. 우리는 단순히 세 번째 차원을 활용해야 해요. 정상적인 시각 디자인 소프트웨어가 동작하는 방식처럼요:

![이미지1](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_2.png)

![이미지2](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_3.png)

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_4.png)

이 모델에서는 테두리(border)를 inset/inside 또는 outset/outside로 설정해도 실제 내용 위에 다른 레이어로 렌더링됩니다. 테두리는 레이아웃에 영향을 미치지 않아야 합니다.

## 결과

이 접근 방식을 사용하면 단일하고 명확한 요소 크기를 얻을 수 있으며, 레이아웃에 영향을 주지 않고 테두리를 어떤 방식으로든 변경할 수 있습니다. 심지어 테두리를 제대로 정렬할 수도 있습니다. 갑자기 모든 해킹, box-sizing 및 content-box와 같은 불필요한 개념이 완전히 워크플로우에서 제거되고 이제 Box Model이라는 이름도 약간 더 의미를 갖게 됩니다.


<div class="content-ad"></div>

하지만 이 모든 것 위에 엄청난 추가 혜택이 하나 더 있는데, 이제 디자인 (특히 그래픽 디자인) 및 웹 개발팀이 같은 언어를 구사할 수 있다는 것입니다. 마찰도 없고 번복도 없습니다. 웹이 다른 모든 것과 마찬가지로 작동하는 것이다. 항상 모든 가능한 방법을 다시 창조하는 것이 아닌 것이다.

![image](/assets/img/2024-06-20-ThereisnoboxmodelinCSSandthisiswhybordersareterrible_5.png)

## 결론

CSS "박스" 모델이라는 용어는 3차원으로 작업할 수 있다는 것을 시사하는 것이 틀림없고 오해를 불러일으킨다. 실제로, 심지어 겹치는 테두리를 구현하는 것조차 거의 불가능하다. 모든 가능한 해결책은 매우 제한적이며 문제를 더 많이 일으키는 경우가 훨씬 많다. 웹 레이아웃에서 테두리를 제거하면 레이아웃 자체뿐만 아니라 작업하기가 훨씬 편리해지며 그래픽 디자인과 웹 개발 간의 간격을 줄일 수 있습니다. 불행히도, JavaScriptUI에서 수용할만한 해결책을 찾지 못했지만, 해결책이 떠오르면 댓글 섹션에서 공유해주세요.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경하세요.