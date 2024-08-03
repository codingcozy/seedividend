---
title: "CSS에서 속성 선택자 정리2024년"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "The wasted potential of attribute selectors in CSS"
link: "https://medium.com/@elisehein/the-wasted-potential-of-attribute-selectors-in-css-49102cb88f34"
---



저는 오래 전부터 BEM을 사용해 왔어요. 셀렉터 충돌이 문제가 되지 않을 때에도 이중 밑줄이 내 코드에 스며든답니다. 구체적으로 BEM에 매혹을 느끼는 건 아닌 것 같아요 (그냥 제가 처음 배운 방법론이었고 익숙해져서 그런 것일 뿐이에요). 어떤 방법론이든, HTML 클래스 네이밍에 구조와 의미를 추가한다는 점이 매력적인 거죠.

CSS 모듈이나 CSS-in-JS 라이브러리를 사용할 때 항상 좀 어려움을 느껴요. 내 클래스나 스타일된 컴포넌트 이름을 내가 원하는 대로 지을 수 있다고요? CSS 모듈에 BEM을 사용하는 사람들도 있어요. 즉, 이 둘은 결국 같은 문제를 해결한다는 점에서 우스꽝스럽게 보일 수 있어요. 하지만 엄격한 클래스 네이밍 규칙이 충돌을 피하는 능력 이상의 매력이 있는 걸 보여줄 수도 있어요. 좋든 싫든, 스타일시트만 가지고도 각 셀렉터의 역할을 알 수 있게 해줍니다.

클래스에 집중할 때, 클래스를 기본 셀렉터로 생각하기 쉬울 거에요. 역사적으로, 사람들이 속성으로 요소를 타겟팅하는 대화는 멋진 트릭이나 한 줄짜리 코드와 연관돼 왔죠. ‘특정-도메인.com’ 링크마다 핑크 밑줄을 사용하고 싶을 때 a[href^=https://specific-domain.com]를 사용해보겠다고 한 번 생각한 뒤, 결국 영영 잊어버립니다. 또는 좀 더 실용적인 예로, 속성 셀렉터는 잘못된 HTML을 검사하는 린터나 디버거로서 권장되기도 했죠 (img:not([alt]) { border: 1rem solid red; }).

요즘에는 속성 셀렉터를 클래스와 동등한 일급 시민으로 취급해야 한다는 아이디어가 보다 널리 제안되고 있어요. 이제 우리는 엣지 케이스에 대해 이야기하는 것이 아니라, 클래스의 기본성을 도전하면서도 우리가 CSS 네이밍 규칙에서 찾는 구조감을 포기하지 않는 것이죠.

<div class="content-ad"></div>

내게 인상적이었던 두 기사는 다음과 같습니다:

- Aleksandr Hovhannisyan의 "클래스 이름이 아닌 HTML 속성으로 상태 나타내기"
- Keith Cirkel의 "CSS 클래스는 해로울 수 있다"

Aleksandr와 Keith는 둘 다 클래스 이름 대신 속성 선택자를 지지합니다. 그러나 Aleksandr은 이미 HTML 요소에 있는 속성 선택자를 선호하는 보수적인 접근을 설명하고 있습니다. 반면 Keith는 더 나아가서 필요한 것에 연결할 때 다른 클래스 이름 대신 자체 data-\* 속성을 추가하는 방안을 제안하고 있습니다.

모두 자세히 살펴보겠습니다.

<div class="content-ad"></div>

## 원시 상태 표현

Aleksandr Hovhannisyan은 클래스가 종종 요소의 다른 상태나 변형을 스타일링하는 데 사용되는데, 해당 상태는 이미 다른 속성인 ARIA 속성이나 의사 선택기(pseudo selectors)와 같이 의미론적으로 표현되어야 한다는 주장을 펼칩니다.

누구도 input[disabled]를 input.is-disabled 대신 사용해야 한다는 데 이의를 제기하지 않습니다. 왜냐하면 대부분의 경우 이미 해당 속성 선택기를 활용할 수 있기 때문에 별도로 클래스 이름을 수동으로 추가하는 것은 불필요합니다. 우리는 가장 자주 사용하는 방법을 잊어버리곤 합니다. 이미 사용해야 할 다른 많은 원시 방법들이 있기 때문입니다. 특히 ARIA 속성입니다. (다만 :hover, :checked 또는 :focus와 같은 의사 클래스와는 달리 무료로 제공되지 않는다는 점을 잊지 말아야 합니다.)

다음을 비교해보세요. 수정자 클래스를 사용하는 경우:

<div class="content-ad"></div>

```html
[표 2](/page2/) 클래스 nav-link--is-active을 가진 페이지 2
.nav-link.nav-link--is-active { }
```

ARIA 속성을 사용하면:

```html
[페이지 2](/page2/) 클래스 nav-link이면서 aria-current="page"를 가짐
.nav-link[aria-current="page"] { }
```

여기서 중요한 점은 "aria-current="page"가 활성 링크에 필요한 스타일링에 관계없이 포함되어야 한다는 것입니다. 다른 방식으로 이미 선택할 수 있는 상태인데 왜 추가 클래스를 추가해야 할 지 생각할 수 없습니다. 최악의 경우, 상태 관리를 두 번 구현하게 될 수도 있습니다.

````

<div class="content-ad"></div>

이 문구는 액세스 가능성을 우선시하는 마음가짐을 촉진합니다 - 스타일링하려는 상태를 나타내는 속성이나 가상 선택자가 없다면 추가해야 할까요? 올바른 HTML 요소를 사용하고 있나요? 우리는 클래스를 사용하기 전에 돌파구가 될만한 네이티브, 의미론적 HTML 및 CSS 기능들을 고려하며 숙지해야만 합니다.

Testing Library의 가이드 원칙을 떠올려봅니다 - 다른 의미 있는 쿼리 옵션을 전부 배제한 뒤에야 testId 요소 선택기를 사용하라고 합니다. 클래스를 테스트 ID처럼 취급하는 것은 어떨까요? 적절한 의미론적 속성이 해당 요소에 없을 때 대안으로 활용할 수 있는 견고하고 일반적인 대체 옵션으로 밝힐 수 있습니다.

ARIA 속성 및 다른 의미론적 선택기를 사용하여 스타일을 지정하는 여러 예제가 철저히 다뤄졌으므로 이곳에서 더 다루지는 않겠습니다. 관심이 있다면 아래 내용을 읽어보세요:

- Ben Meyers의 '상태를 고려한 의미론적 선택기로 스타일 지정하기'
- Scott O’Hara의 '사용자 상태 표현'
- Adrian Roselli의 '접근성 강제하기 위해 CSS 사용하기'

<div class="content-ad"></div>

## 사용자 지정 상태 표현

Aleksandr Hovhannisyan은 속성 선택자의 사용이 더 나은 사용자 경험으로 이어질 수 있다는 것을 잘 설명합니다. 개발자 경험을 바탕으로 한 결론에 도달한 Keith Cirkel과의 우연한 일치를 만족스럽게 느낍니다. 그는 클래스와 관련된 DX 문제를 강조합니다:

소프트웨어 공학에서 잘 알려진 핵심 원칙이 있습니다: 불가능한 상태는 불가능하게 만드십시오. (부가적으로, 이 기사와 링크된 강의를 강력히 추천합니다. 코드 작성 시 가장 의존하는 원칙일 수 있으며, JavaScript에서 네이티브 열거형이 없어서 안타깝게 생각하는 이유가 주된 이유입니다.)

Keith의 기사에서 나의 인상은, 핵심적으로, 클래스 선택자가 위배하는 원칙이라는 것입니다. 요소의 클래스는 항상 상태를 정확하게 반영하지 않습니다 (예를 들어 실제로 로딩 중이 아닌 버튼에 button--loading 클래스를 추가하는 것을 막을 것이 없음) 그리고 상호 배타적 변형 중 하나를 나타내는 데 사용되는 클래스는 상호 배타적임을 보장하지 않습니다 (예를 들어 동일한 버튼에 button--primary 및 button--secondary를 추가하는 것을 막을 것이 없음).

<div class="content-ad"></div>

저는 Keith가 이 것을 유형 문제로 설정한다는 점을 좋아합니다. 예를 들어, Tailwind의 일부 유틸리티 클래스의 명명을 보면 콜론을 사용하여 관련된 클래스 세트를 그룹화하는 것이 상호 배타적인 신호로 해석될 수 있습니다. `div class="sm:w-80 sm:w-96"`는 문제가 되는 논리가 명명에서 즉시 보이기 때문에 경고 신호여야 합니다.

Keith는 속성 선택자가 CSS 도구 상자에서 가장 다재다능할 수 있다는 것을 상기시킵니다 - data-* 속성을 CSS 속성 선택자의 다양성과 결합하여 문자열 및 목록을 포함시킬 수 있습니다 - 그리고 우리에게 이를 수용하도록 격려합니다. 그의 제안과 Aleksandr의 제안 사이에는 여기 차이점이 있습니다: 요소에 이미 존재하는 기본 속성을 간단히 사용하는 것이 아니라 사용자 정의 속성을 추가할 때만 - 클래스 대신 - 사용하는 것입니다.

Keith의 기사에 있는 예시:

```js
.Card { /* ... */ }
.Card[data-size=big] { width: 100%; }
.Card[data-size=medium] { width: 50%; }
.Card[data-size=small] { width: 25%; }

.Card[data-align=left] { text-align: left; }
.Card[data-align=right] { text-align: right; }
.Card[data-align=center] { text-align: center; }
.Card[data-border-collapse~="top"] { border-top: 0 }
.Card[data-border-collapse~="right"] { border-right: 0 }
.Card[data-border-collapse~="bottom"] { border-bottom: 0 }
.Card[data-border-collapse~="left"] { border-left: 0 }
````

<div class="content-ad"></div>

불가능한 상태를 피하는 것은 당신의 요소에 대한 다양한 변형 그룹을 채울 "슬롯"이 있는 경우에 훨씬 쉽습니다. 클래스에 모든 것을 강제로 밀어 넣는 대신 단일로 구성된 문자열에 교묶어 넣는 것보다 이름이 얼마나 훌륭하던지 상관없이, 당신의 요소에 대한 다양한 변형 그룹을 채울 "슬롯"이 있는 것이 더 낫습니다.

그리고 `article class="card" data-align="left" data-size="small" /`가 매력적으로 보이는 이유가 있습니다. 디자인 시스템과 컴포넌트 라이브러리에서 보통 보던 API에 반영하면서 일반 HTML 및 CSS로 가져오고 있기 때문입니다. 사실, 데이터 속성 선택자에서 사용자 정의 의사 선택자나 속성 기반 선택자로 이동할 때 Web Components(`my-card align="left" size="small" /`)를 사용할 때까지 그것은 아주 작은 단계입니다.

하지만 지금은 아직 사용자 지정 요소를 사용하지 않는다면, 다음과 같은 것 사이에 큰 차이가 있습니다.

```js
<article
  class="card"
  data-loading="true"
  data-variant="primary"
  data-size="large"
  data-border="top right"
  data-elevation="high"
/>
```

<div class="content-ad"></div>

그리고

```js
<button
  aria-label="메뉴 전환"
  aria-controls="navbar-menu"
  aria-expanded="true"
  비활성화
/>
```

기존 클래스를 사용하는 것에 전적으로 동의하지만, 새로운 속성을 추가하는 것은 조금 어려울 수 있습니다. 네이티브 속성 선택기를 활용하는 것은 사용 중인 CSS 방법론과 충돌하지 않지만, 사용자 정의 속성을 추가하려면 더 큰 헌신이 필요하며 코드베이스 전체의 네이밍 규칙을 변경해야 할 수도 있습니다. 또한 HTML만으로 어떤 속성이 동작을 위한 것인지 스타일링을 위한 것인지 판단하기가 더 어려워질 수 있습니다. 그러나 결국, 스타일링을 위해 데이터 속성을 재사용하는 것은 항상 어긋난 느낌이 들 수 있습니다 — 결국, 요소 선택은 클래스를 위한 것이며, 브라우저가 선택기 성능을 최적화하는데 사용하는 것입니다.

그럼에도 불구하고, 이는 매력적인 제안이며, 사람들이 이를 계속해서 발전시키는 모습을 기대합니다. Devon Govett는 클래스 이름을 구성 요소 자체에 사용하고, 모든 내부 변형 및 상태를 data-_ 또는 aria-_ 속성으로 표현하는 분리 방식을 지지합니다. 더 자세히 알고 싶은 분들을 위해 이 쓰레드에 좋은 통찰력이 있습니다.

<div class="content-ad"></div>

이제는 대부분 CSS-in-JS를 사용하는 코드베이스에서 작업하고 있지만, 이에 대한 내용이 크게 관련이 없는 경우가 많습니다. 하지만 속성에 더 자주 접근하기 위해 뇌를 다시 연결하는 것을 기다리지 않을 수가 없어요. ARIA 속성을 기반으로 스타일을 지정하면 더 접근성 있는 마크업이 가능해지고, 사용자 정의 데이터 속성을 기반으로 스타일을 지정하면 코드가 더 강력하고 가독성이 좋아져 사용자와 개발자 모두에게 더 나은 경험을 제공할 수 있습니다.

원문: 2022년 10월 16일에 https://elisehe.in에서 최초 게재되었습니다.
