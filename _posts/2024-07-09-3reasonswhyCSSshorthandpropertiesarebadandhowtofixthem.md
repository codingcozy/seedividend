---
title: "CSS 축약 속성이 안 좋은 3가지 이유와 해결 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-3reasonswhyCSSshorthandpropertiesarebadandhowtofixthem_0.png"
date: 2024-07-09 14:08
ogImage:
  url: /assets/img/2024-07-09-3reasonswhyCSSshorthandpropertiesarebadandhowtofixthem_0.png
tag: Tech
originalTitle: "3 reasons why CSS shorthand properties are bad — and how to fix them"
link: "https://medium.com/@decketts/3-reasons-why-css-shorthand-properties-are-bad-and-how-to-fix-them-f25220a86b21"
---

## 자바스크립트 UI – 개발 블로그 #5

CSS의 많은 기능과 마찬가지로, shorthand 속성도 처음에는 단순하고 강력한 언어 추가처럼 보입니다. 그러나 그들이 실제로 어떻게 작동하는지 깊이 파고들면, 그들이 해결하려고 하는 문제보다 더 많은 문제를 일으킨다는 것을 깨닫게 됩니다.

가장 큰 문제점들은 다음과 같습니다.

# 1 – 그것들은 모순인 것 같습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

프로그래밍에서 속성은 하나의 키와 하나의 값을 관련시키는 것입니다. "단축" 속성은 존재하지 않습니다. 하나의 속성에 여러 값을 연관시키려면 해당 값을 데이터 구조로 감싸거나 대신 메서드를 사용해야 합니다. 이 두 가지 접근 방법은 모두 잘 이해되고 직관적이지만 CSS는 적절한 데이터 구조와 메서드를 언어에 도입하지 않았기 때문에 완전히 새로운 개념으로 바퀴를 다시 발명하게 되었습니다.

다음과 같은 코드가 있습니다:

```js
#ermahgerd {
    padding: 2px 4px 6px;
}
```

이미 이렇게 선택할 수 있는 옵션이 모두 있음에도 불구하고:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
ermahgerd.padding = ["2px", "4px", "6px"]; // 배열을 사용한 경우
ermahgerd.padding = { top: "2px", left_right: "4px", bottom: "6px" }; // 객체를 사용한 경우
ermahgerd.padding = "2px 4px 6px"; // 문자열을 사용한 경우
ermahgerd.padding("2px", "4px", "6px"); // 메서드를 사용한 경우
```

# No. 2 — 모호함을 갖고 있습니다

패딩(padding) 및 마진(margin)과 같은 간단한 줄임 속성들조차 혼동스러울 수 있습니다. 이는 줄임 속성들이 실제로 나타내는 값보다 적은 수의 값을 사용할 수 있기 때문입니다. 예를 들어 패딩(padding)을 네 가지 값으로 사용하는 것은 명확하지만, 한 가지, 두 가지 또는 세 가지 값으로 사용할 때는 어떨까요? 이것은 첫 번째 몇 가지 값만 설정하고 나머지는 기본값으로 유지하려는 의미인지, 아니면 일부 값이 복제된다는 것을 의미하는지 알 수 없습니다. 그리고 복제된다면 어떤 값이 어떻게 복제되어야 하는지도 알 수 없습니다.

이 문제는 CSS에 이러한 시나리오에 대한 규칙이 없기 때문이 아니라, 이러한 규칙들이 즉흥적으로 정해졌기 때문에 발생합니다. 예를 들어, 패딩(padding)의 세 가지 값에 대한 경우를 살펴봅시다. 이 경우 세 가지 값 중 한 가지는 반드시 복제되어야 하지만, 어떤 값이어야 하는지, 그리고 어떻게 복제되어야 하는지는 불분명합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
//order is always top, right, bottom, left

//첫 번째 값 복제
padding: (2px) 2px  4px  6px
padding:  2px (2px) 4px  6px
padding:  2px  4px (2px) 6px
padding:  2px  4px  6px (2px)

//두 번째 값 복제
padding: (4px) 2px  4px  6px
padding:  2px (4px) 4px  6px
padding:  2px  4px (4px) 6px
padding:  2px  4px  6px (4px) //이건 공식이에요

//세 번째 값 복제
padding: (6px) 2px  4px  6px
padding:  2px (6px) 4px  6px
padding:  2px  4px (6px) 6px
padding:  2px  4px  6px (6px)
```

이 값들의 순서를 바꾸지 않아도 이미 12가지의 옵션이 나옵니다. CSS 사양이 하나를 선택했지만, 이 선택에 구체적인 기준은 없습니다. 임의적입니다.

우리는 즉석에서 기억해야 할 규칙들을 남겨두고, 개발 도중에 인지 부하와 혼란을 증가시킵니다. 여러분은 얼마나 자주 기억력에서 이 그림을 떠올려야 했나요?

<img src="/ui-log-2/assets/img/2024-07-09-3reasonswhyCSSshorthandpropertiesarebadandhowtofixthem_0.png" />

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 3번 - 그들은 심각하게 과소 전력화되어 있습니다

약칭 속성의 가장 큰 문제는 그들이 매우 제한적이라는 것입니다. 다음 예시를 살펴보세요:

```js
#ermahgerd {
    padding: 5px 5px 3px;
    transform: translateX(10px) rotate(10deg) translateY(5px);
    transition: margin-right 2s ease-in-out .5s, padding-top 4s ease-in-out .3s;
}
```

적절한 데이터 구조 없이 단일 속성에 많은 기능을 넣으려고 할수록 전체 성능과 명확성이 나빠집니다. padding과 같은 약칭은 이미 한계에 도달했지만, transform 및 transition과 같은 속성은 이유를 벗어납니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

예를 들어, 트랜지션 속성을 살펴보겠습니다. 우리는 단일 속성에 여러 값을 할당하는 것뿐만 아니라, 또 다른 임시 솔루션을 사용하여 중첩된 데이터 구조도 가짭니다. 실은, 이 또한 적절한 프로그래밍 패러다임을 사용하면 아주 쉽습니다.

그래서 이렇게 하는 대신에:

```js
#ermahgerd {
    transition: margin-right 2s ease-in-out .5s, padding-top 4s ease-in-out .3s;
}
```

우리는 이 중 하나를 사용해야 합니다 (그리고 그 외에도 많은 것들):

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
ermahgerd.transition = [
  ["margin-right", 2, "ease-in-out", 0.5],
  ["padding-top", 4, "ease-in-out", 0.3],
];

ermahgerd.transition = {
  marginTop: [2, "ease-in-out", 0.5],
  paddingTop: [4, "ease-in-out", 0.3],
};

ermahgerd.transition({
  marginTop: [2, "ease-in-out", 0.5],
  paddingTop: [4, "ease-in-out", 0.3],
});
```

게다가, transition과 transform 속성 모두 브라우저 API를 통해 개별 값을 상호 작용할 수 없다는 사실이 있습니다. 단일 값을 얻기 위해 전체 문자열을 구문 분석하고 모든 값을 문자열로 변환하고 연결해야 합니다. 이것은 매우 번거롭습니다.

하지만 더 나쁜 점이 있습니다. transition을 원시 HTML에서 설정하거나 브라우저 API를 통해 수동으로 .style 속성을 설정하려면 5단계의 객체 계층을 단일 문자열로 평탄화해야 합니다 (추가 수준으로 단위를 계산하는 경우 6단계). 개발 중에 본 가장 기이한 일 중 하나입니다:

```js
<div style="transition: margin-right 2s ease-in-out .5s, padding-top 4s ease-in-out .3s;">
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

마크다운 형식으로 표 태그를 바꿀 수 있다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

CSS는 자신의 속성에 이름을 짓는 데 형편없다는 것은 비밀이 아닙니다. 그리고 shorthand 속성도 예외는 아닙니다.

어떤 이유에서인지 CSS에서는 코너-반경 대신 border-radius 속성 이름을 사용합니다. 이 이름은 정확하지 않을 뿐만 아니라 (우리는 요소 전체를 둥글게 만드는 것인데, 그냥 테두리만 둥글게 하는 것이 아닙니다), border-radius 속성이 경계 축약어와 무슨 관련이 있다는 것을 시사하기도 합니다. 이것은 사실이 아니며 (네 모서리 대 네 면), 가능하지도 않습니다.

또 다른 문제된 영역은, 주로 올바르지만 비영어 원어민에게는 다소 혼란스러운 transition, transform, translate 이름입니다. 그러나 이론적으로 요소에 직접 변형을 적용할 수 있으며, 그것들을 transform 속성 내에서 결합하지 않고도 직접 속성에 트랜지션을 적용할 수 있습니다.

# 해결책: JavaScriptUI

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

JavaScriptUI에서는 뷰를 구성하는 getter/setter 메소드를 사용합니다. 이것은 여러 가지 값을 처리하는 명확한 방법을 제공하기 때문에 유용합니다. 다음 예시를 살펴보세요:

```js
//paddingLeft가 설정되지 않았습니다 (기본값 또는 이전 값)
component.padding(2, 4, 6);
component.padding({ top: 2, right: 4, bottom: 6 });
```

안타깝게도, JavaScript는 명명된 인수를 지원하지 않지만, 만약 지원했다면 가장 깔끔한 해결책이 될 것입니다:

```js
component.padding(top: 2, right: 4, bottom: 6);
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 개념을 더 확장하면 비슷한 방식으로 개별 변형에 대한 getter/setter 메서드를 도입할 수 있습니다:

```js
component.translateX(10).rotate(CSS.deg(10)).translateY(5);

//또는 조합 방식을 계속 선호한다면:
component.transform({
  translateY: 10,
  rotate: CSS.deg(10),
  translateY: 5,
});
```

그리고 트랜지션도 추가할 수 있습니다:

```js
component.marginRight(0, 2, "ease-in-out", 0.5).paddingTop(0, 4, "ease-in-out", 0.3);

//또는
component.marginRight(0, [2, "ease-in-out", 0.5]).paddingTop(0, [4, "ease-in-out", 0.3]);

//또는 (가짜) 이름 있는 인수로
component
  .marginRight({ value: 0, transition: [2, "ease-in-out", 0.5] })
  .paddingTop({ value: 0, transition: [4, "ease-in-out", 0.3] });
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 마무리

이로써 우리의 글을 마칩니다. 흥미로웠다면 박수를 보내주시고, 의겢를 남기고, 다른 사람들과 이 글을 공유해 주세요.

읽어 주셔서 감사합니다. 즐거운 하루 보내세요.

⬅️ DevBlog #4 — CSS position: fixed is terrible, here’s why
