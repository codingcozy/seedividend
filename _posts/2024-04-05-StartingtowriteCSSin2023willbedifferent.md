---
title: "2023년에 CSS를 작성하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Starting to write CSS in 2023 will be different"
link: "https://medium.com/@w3cplus/starting-to-write-css-in-2023-will-be-different-9aba143a6160"
isUpdated: true
---





![Starting to write CSS in 2023 will be different](/assets/img/StartingtowriteCSSin2023willbedifferent_0.png)

CSS는 여느 때보다 빠르게 발전하고 있어요. Flexbox와 Grid 이후로 CSS는 긴 침체기를 겪었지만, 최근 몇 년 동안 많은 새로운 기능이 추가되었고 미래에 더 많은 새로운 기능이 추가될 예정이에요. 이 발전 속도는 흥미로우면서도 압도적이에요.

CSS가 많은 새로운 기능들을 추가했지만, 많은 웹 개발자들은 이러한 멋진 것들이 자신들에게 현실적인 변화를 가져오지 않았다고 생각해요. 다시 말해, 이 모든 멋진 것들(CSS의 새로운 기능들)이 실제로 CSS를 어떻게 작성하는 방식을 변경시켰을까요? 대부분의 웹 개발자들에게 CSS의 새로운 기능들은 CSS 작성 방식에 영향을 주었지만, 제가 기대한 것만큼 철저하지 않았을 수도 있어요.

제가 제 책 "현대 CSS"에서 이러한 트렌디한 것들에 대한 블로그 포스트, 소개 및 예시를 많이 봤지만, 아직 제작이나 일상생활에서 이러한 실용적인 응용이 보이지 않았어요. 이는 누구나나 무엇 때문이라는 불평이 아니에요. 개인적으로 CSS의 발전에 매우 흥분하고 있어요. 최신 기능 중 많은 것들이 몇 년간 갈망해온 것들이에요. 실제로 이러한 기능들 중 일부가 점차 내 CSS로 흡수되고 있어요. 완전히 바뀐 것은 아니지만, CSS를 쓰는 것을 더 즐기게 해주는 충분한 변화가 있어요.

<div class="content-ad"></div>

# 2023년은 CSS에 대해 중요한 해입니다!

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_1.png)

2023 Google I/O 컨퍼런스에서부터 연말에 이르는 WWDC23 컨퍼런스, 그리고 Utrecht의 @Frontmania 컨퍼런스에서의 Bramus님의 발표와 Chrome 팀이 최근에 공유한 "CSS Wrapped: 2023!" 등, 모두가 CSS의 최신 기능에 대해 이야기하고 있습니다. 저도 예외는 아니죠. 책자 형식으로 현대 CSS의 기능을 반년이 넘게 설명했는데, 다행히도 제 책자에 소개된 CSS의 최신 기능들 대부분(95% 이상)이 이들 컨퍼런스 주제로 등장했습니다.

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_2.png)

<div class="content-ad"></div>

대다수의 웹 플랫폼에서 지원하는 새로운 CSS 기능이 수십 개가 항상 있다고 말할 수 있습니다. 2023년은 CSS에 있어 매우 중요한 해라고 말할 수 있습니다. 이러한 발전으로, 개발자들이 예전에 웹 플랫폼에서 불가능하다고 생각했던 기능들이 실현 가능해졌습니다. 요즘에는 주류 모던 웹 브라우저에서 CSS 컨테이너 쿼리(사이즈 쿼리, 스타일 쿼리, 상태 쿼리 등), 서브그리드(subgrid), 관계 선택자 : has() (부모 선택자로도 자주 불림), 복잡한 n- \* 선택자, 그리고 color()와 color-mix() 같은 새로운 색상 공간과 함수들을 지원합니다. Chrome 브라우저는 CSS만을 이용한 스크롤 주도 애니메이션 뿐만 아니라, 웹 뷰 간 부드럽게 전환하는 뷰 전환 효과도 지원합니다(웹 애니메이션에 관심이 있다면 "웹 애니메이션 여행"을 읽어보세요). 무엇보다도, CSS 레이어(@layer), 중첩 및 스코프와 같은 새로운 기본 기능들이 등장했는데, 이는 웹 개발자들이 CSS를 작성하고 유지 관리하고 관리하는 방식을 개선할 수 있습니다.

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_3.png)

정말 멋진 해가 되었네요! 이렇게 많은 새로운 기능을 보면서 조금 망설이고 있나요? CSS에서 이렇게 많은 새로운 것들이 있나요? 혹시 이제 말하는 CSS가 여전히 여러분이 아는 CSS인가요?

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_4.png)

<div class="content-ad"></div>

얼마나 많이 아는지와 얼마나 사용해봤는지를 스스로에게 물어보세요. 무엇보다 중요한 것은 이러한 새로운 기능들이 정말로 당신에게 변화를 가져왔는지입니다!

# 망설임을 버리세요

보통 사람들은 새로운 것에 대한 행동이 개인 간 차이로 인해 다양합니다. 어떤 사람들은 호기심, 흥분, 긍정성을 보일 수 있지만, 다른 사람들은 두려움과 저항을 보일 수도 있습니다. 마찬가지로, 웹 개발자들이 CSS의 새로운 기능을 마주할 때도 그들의 반응과 행동은 다를 수 있으며, 이는 그들의 기술 수준, 프로젝트 요구사항, 개인 취향, 새로운 기술 수용에 달려 있습니다. 예를 들어, 몇몇 동료는 CSS의 새로운 기능에 호기심과 기대를 보일 수 있습니다 (제 얘기처럼요). 이들 동료들은 곧바로 이러한 새로운 기능을 배우고 연습하며, 이를 더 완벽하게 만들기 위해 적극적으로 커뮤니티에 참여할 것입니다. 물론, 저항이나 보수주의를 보이는 동료들도 있습니다. 게다가, 중국 커뮤니티에서는 저들이 대부분을 차지하는데, 주변 친구들에게 새로운 기능에 대해 망설이는 이야기를 자주 듣곤 합니다. 이런 멋진 기능들을 사용할 수 있을까? 호환성은 좋은가? 등의 질문들이 많이 나오죠!

여기서 말하고 싶은 것은 새로운 기능들은 시간이 흐를수록 계속 발전하고 개선될 것이라는 점입니다. CSS3 기능을 홍보할 때 가장 많이 받았던 질문이 "새로운 기능이 IE와 호환되는가?"였던 것처럼 말이죠.

<div class="content-ad"></div>

요즘은 비슷한 질문도 받곤 해요: "이 새로운 기능들은 얼마나 호환되는 거지?" 동시에 많은 동료들이 새로운 기능을 어떻게 어디서 구할 수 있는지 물어봐 줘요. 사실 이것은 좋은 일이에요. 더 많은 동료들이 망설임, 두려움, 그리고 새로운 기능을 거부하는 것을 포기하고 있는 거죠.

이미 이것은 변화가 일어나고 있어요.

실제로 현재 환경은 웹 개발자들에게 친절한데요. 새로운 기능에 대한 버전 릴리스 정보, 호환성 데이터, 상호 운용성, 그리고 웹 플랫폼에서 제공하는 정보를 다양한 방법으로 얻을 수 있어요.

# 버전 릴리스

<div class="content-ad"></div>

![/assets/img/StartingtowriteCSSin2023willbedifferent_5.png](/assets/img/StartingtowriteCSSin2023willbedifferent_5.png)

메인스트림 브라우저인 Chrome, Safari 및 Firefox의 릴리스에서 다양한 웹 플랫폼에서 도입된 새로운 기능 및 버그 수정 사항을 확인할 수 있습니다.

# 릴리스 노트

![/assets/img/StartingtowriteCSSin2023willbedifferent_6.png](/assets/img/StartingtowriteCSSin2023willbedifferent_6.png)

<div class="content-ad"></div>

웹 플랫폼들(Chrome, Safari 및 Firefox)은 새 버전이 출시될 때마다 새로운 기능, 개선 사항 및 버그 수정에 대한 상세 정보가 담긴 문서를 제공합니다. 웹 개발자들은 릴리스 노트를 읽음으로써 관련 정보를 학습할 수 있습니다. 마찬가지로, 우리는 해당 문서에서 최신 기능, 기능 개선 및 버그 수정을 포함한 CSS 관련 정보도 얻을 수 있습니다.

# 호환성 데이터

![Compatibility Data](/assets/img/StartingtowriteCSSin2023willbedifferent_7.png)

웹 개발에서 새 CSS 기능을 사용하는 데 중요한 요소는 크로스 플랫폼 호환성입니다. 새로운 기능의 호환성 데이터를 알고 싶다면 Can I Use, Browser Compat Data 및 Time to Stable과 같은 플랫폼을 통해 얻을 수 있습니다.

<div class="content-ad"></div>

# 상호 운용성

Interop은 웹의 상호 운용성을 개선하고자 하는 크로스 브라우저 노력입니다. 상호 운용성은 서로 다른 브라우저에서 웹 기술의 상호 운용성을 개선하려는 노력을 가리킵니다. 상호 운용성은 서로 다른 환경(특히 다른 브라우저)에서 동일한 웹 기술을 사용할 때 일관된 동작과 효과를 보장하는 것을 의미합니다. 간단히 말해, 모든 브라우저에서 각 기술이 정확히 동일한 상태를 달성합니다.

Interop은 2021년에 시작되었고, 현대 브라우저들이 모두 참여하고 있습니다. 현재 Interop2021, Interop2022 및 Interop2023이 진행 중입니다.

<div class="content-ad"></div>

위 그림에서 2023년에 여러 웹 플랫폼이 CSS에 기울인 노력을 볼 수 있습니다. 따라서 2023년에 주요 웹 브라우저에서는 많은 새로운 CSS 기능을 지원할 것입니다.

# 플랫폼 뉴스

![Platform News](/assets/img/StartingtowriteCSSin2023willbedifferent_9.png)

웹.dev 블로그에서는 매달 웹 플랫폼에 관한 최신 뉴스를 제공합니다. 업데이트, 개선 또는 웹 기술 변경에 관한 정보를 확인할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_10.png" />

위 그림에서 보듯이, 2023년 12월에 웹 플랫폼에서 새로운 기능이 소개되었습니다.

# Baseline

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_11.png" />

<div class="content-ad"></div>

2023 Google I/O 컨퍼런스에서는 웹 플랫폼 기능의 사용 가능 여부를 명확히 하기 위해 벤치마크가 소개되었어요. 베이스라인의 원래 정의는 현재와 이전 버전의 모든 주요 브라우저(Chrome, Edge, Firefox, Safari)가 이러한 기능을 지원할 때, 해당 기능이 베이스라인에 포함된다는 것이에요.

베이스라인은 곧 caniuse.com에도 등장할 거예요! 이 블로그 글에서는 이 통합을 소개하고, 베이스라인 2023에 포함된 일부 기능을 살펴볼 거에요. 새로운 벤치마크 정의에 따르면, 기능 수명주기가 두 단계로 나뉘어져요. 첫 번째 옵션은 신규 출시 후 30개월이 지나면 완전히 출시된 것이에요. 다음 브라우저에서 상호 운용 가능하다면, 해당 기능은 베이스라인에서 제공되는 새로운 기능 중 하나가 됩니다:

- Safari (macOS 및 iOS)
- Firefox (데스크톱 및 안드로이드)
- Chrome (데스크톱 및 안드로이드)
- Edge (데스크톱 장치)

앞으로 caniuse.com에서 호환성 데이터를 확인할 때, 해당 기능이 베이스라인에서 널리 사용 가능한지 여부를 알려주는 표시를 볼 수 있을 거예요. 다시 말해, 이 표시를 보면 브라우저 간 호환성 문제를 걱정하지 않고 담담하게 사용할 수 있어요. 이는 CSS의 새로운 기능에 대한 가장 큰 의문 — 호환성 문제 —를 해결해 줄 거예요:

<div class="content-ad"></div>

![Starting to write CSS in 2023 will be different](/assets/img/StartingtowriteCSSin2023willbedifferent_12.png)

상기 언급된 자료를 활용하면 웹 플랫폼과 CSS 관련 최신 정보를 직접 얻을 수 있습니다. CSS나 웹 플랫폼 관련 기술에 관심이 있다면, 다양한 플랫폼에서 항상 최신 정보를 확보할 수 있도록 구독해 보세요. 이를 통해 더 많은 기술을 습득할 수 있습니다.

다음에 소개되는 CSS 기능 제목 앞의 이모지에 주목해 주세요. 이는 새로운 Baseline 뱃지를 나타냅니다! 자세한 내용은 여기를 클릭하세요:

- 💯: 주요 브라우저의 안정 버전 모두 추가됨 (믿고 사용)
- 👁️: 주요 브라우저가 일부 기능만 지원 (기다려야 함)

<div class="content-ad"></div>

# 아키텍처 기본

![Architecture foundation](/assets/img/StartingtowriteCSSin2023willbedifferent_13.png)

CSS의 핵심 기능부터 시작해 봅시다. 이것은 여러분이 CSS를 작성하고 구성하는 방법에 중요한 역할을 하는 기본 기능입니다. 이러한 기본 기능들은 항상 웹 개발자들에게 머리 아픈 문제들을 해결해주는 중요한 특징들입니다. 이러한 기능들은 여러분이 CSS 코드를 작성, 관리, 유지할 때 직접적으로 변화를 줄 것으로 말할 수 있습니다.

# 💯 계층 적용

<div class="content-ad"></div>

![Starting to write CSS in 2023 will be different](/assets/img/StartingtowriteCSSin2023willbedifferent_14.png)

캐스케이딩 계층은 CSS에서 가장 중요한 개념 중 하나입니다. 많은 웹 개발자들이 이를 두렵게 여기는데, 이유 중 하나는 작성한 CSS가 충돌을 일으키거나 덮어쓰기가 쉽기 때문입니다. 예를 들어:

```js
ul[class] { /* (0,1,1) */
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.nav { /* (0,1,0) */
    margin: 0 40px; /* ul[class]의 margin으로 덮어씌워짐 */
}
```

어떤 선언(CSS 스타일 규칙)이 "승리"하여(요소에 적용되는) 적용될지 결정하기 위해, 캐스케이딩은 상응하는 알고리즘을 제공합니다. 캐스케이딩 알고리즘을 이해하면 브라우저가 스타일 규칙 충돌을 해결하는 방법을 이해할 수 있으며, 즉 브라우저가 요소에 적용할 스타일 규칙을 결정합니다. 그러나 캐스케이딩 알고리즘은 다른 사양마다 다양한 설명이 제공되며, 레벨 5에서는 여섯 가지 다른 수준이 제공됩니다. 캐스케이딩 계층을 고려하지 않고, 그 표준은 다음과 같습니다:

<div class="content-ad"></div>

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_15.png)

위의 예시와 같이, 우리는 다음 기준에 따라 .nav 가중치를 높여야 합니다:

```js
ul[class] { /* (0,1,1) */
    margin: 0;
    padding: 0;
    list-style-type: none;
}
ul.nav { /* (0,1,1) */
    margin: 0 40px;
}
```

CSS에 익숙한 동료들은 이러한 표준들의 우선순위가 높은 것부터 낮은 것까지 정렬되어 있고, 얻어진 선언이 결정될 때까지 하나씩 확인합니다. 가장 높은 표준에서 어떤 속성 선언이 이길지 결정할 수 없으면, 카스케이드가 다음 표준으로 이동합니다. 예를 들어, 아래 그림에서 보여지는 것처럼.

<div class="content-ad"></div>

![Starting to write CSS in 2023 will be different](/assets/img/StartingtowriteCSSin2023willbedifferent_16.png)

문제 해결을 위해 CSS는 캐스캐이딩 및 가중치와 같은 문제에 대응하기 위해 캐스캐이딩 레이어 규칙 @layer를 추가합니다.

간단히 말하자면: 캐스캐이딩 레이어는 최종적으로 승리하는 측을 결정하는 CSS 규칙을 구조적인 방법으로 조직화하고 균형있게 제공합니다!.

CSS의 캐스캐이딩 레이어의 특별한 위치로 인해 사용하는 것에는 몇 가지 이점이 있어 개발자가 캐스캐이딩을 더 많이 제어할 수 있게 합니다. CSS의 캐스캐이딩 레이어는 일반적으로 "Style Attribute"와 CSS 선택자의 가중치(특이성) 사이에 위치합니다.

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_17.png" />

@layer 를 사용하면 이전에 보여준 코드를 다음과 같이 변환할 수 있어요:

```js
@layer reset, components;
@layer reset {
    ul[class] {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
}
@layer components {
    .nav {
        margin: 0 40px;
    }
}
```

다음 다이어그램을 사용하여 @layer 를 사용하기 전후의 CSS 캐스케이딩 차이를 설명합니다:

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_18.png" />

바로 보여지는 변화 중 하나는 가중치 계산 규칙이 변경된 것입니다.

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_19.png" />

CSS cascading layer @layer 기능을 이용하면 이전 CSS 방법론 (예: ITCSS) 중 일부를 포기할 수 있습니다. 왜냐하면 @layer가 CSS 캐스케이드를 더 잘 관리할 수 있기 때문입니다.

<div class="content-ad"></div>

간단히 말해서, @layer는 CSS의 새로운 기능으로, 스타일 규칙의 적용과 우선순위에 영향을 주는 카스케이딩 레이어입니다. 여기 카스케이딩 레이어에 대한 주요 세부 정보 몇 가지가 있습니다:

- Cascade Layer에 추가: @layer 규칙을 사용하여 지정된 cascade layer에 스타일을 추가할 수 있습니다. 이를 통해 개발자는 스타일을 더 깔끔하게 정리할 수 있습니다.
- 익명의 Cascade Layer: @layer 규칙을 사용하지 않을 경우, 스타일은 기본 익명의 cascade layer에 배치됩니다. 이를 통해 cascade layer를 지정하지 않은 스타일이 특정 cascade layer의 스타일에 영향을 주지 않도록 보장됩니다.
- 미리 정의된 카스케이딩 레이어 순서: 카스케이딩 레이어는 순서를 미리 정의하여, 스타일 규칙에서 명시적으로 cascade layer를 지정하지 않을 경우, 기본 미리 정의된 카스케이딩 레이어 순서에 따라 적용되도록 보장합니다.
- 외부 CSS 파일을 카스케이딩 레이어에 로드: @layer 규칙을 통해 외부 CSS 파일을 지정된 cascade layer에 로드할 수 있으며, 이를 통해 스타일을 보다 유연하게 구성하고 로드할 수 있습니다.
- 카스케이딩 없는 스타일: @layer unlayered 규칙을 사용하여 카스케이딩이 없는 레이어의 style 레이어에 스타일을 추가할 수 있으며, 이러한 스타일은 기본적으로 어떤 카스케이딩 레이어에서도 상속되지 않습니다.
- 카스케이딩 레이어 중첩: 한 카스케이딩 레이어를 다른 레이어 안에 중첩하여 더 복잡한 스타일 계층을 만들 수 있습니다.
- 카스케이딩 레이어 되돌리기: 이전 카스케이딩 레이어 상태로 되돌아가 특정 스타일 변경을 취소할 수 있습니다.

카스케이딩 레이어는 개발자들에게 스타일을 보다 세밀하게 관리하고 정리할 수 있는 기능을 제공하여, 대형 프로젝트에서 스타일을 유지하고 확장하기 쉽게 만듭니다.

# 💯 중첩

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_20.png" />

일반적으로 웹 개발자들이 Sass(또는 SCSS), LESS, 그리고 Stylus와 같은 CSS 프로세서를 사용하지 않는다면, 각 CSS 선택자는 명시적으로 선언되어야 하며 서로 구분되어야 합니다.

예를 들어:

```js
table.colortable td {
    text-align: center;
}
table.colortable td .c {
    text-transform: uppercase;
}

table.colortable td:first-child,
table.colortable td:first-child + td {
    border: 1px solid black;
}
table.colortable th {
    text-align: center;
    background: black;
    color: white;
}
```

이렇게 하면 스타일 코드가 반복적이고 중복되며 흩어지게 됩니다. 그래서 많은 웹 개발자들이 CSS 프로세서의 특성을 기반으로 CSS 선택자를 작성하는 중첩 방법을 사용할 것입니다. 예를 들어, 위의 코드가 SCSS의 중첩 구문을 사용하여 작성된다면 다음과 같을 것입니다:

<div class="content-ad"></div>

```js
table.colortable {
    td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child {
            border: 1px solid black;
            + td {
                border: 1px solid black;
            }
        }
    }
    th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

이제 CSS에도 SCSS와 유사한 중첩 기능이 있으며 관련 스타일 규칙을 선택자로 그룹화하여 계속해서 선택자를 생성할 수 있습니다.

```js
table.colortable {
    & td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child,
        &:first-child + td {
            border: 1px solid black;
        }
    }
    & th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

중첩은 스타일 시트의 크기를 줄이고 중복 선택자의 부담을 줄이며 구성 요소 스타일을 중앙 집중화할 수 있습니다. 이 구문이 처음 출시된 때 한 가지 제한이 있었습니다: "CSS의 어떤 선택자도 다른 선택자로 중첩할 수 있지만 & , . (클래스 이름), # (ID), @ ( @ 규칙), : , :: , \* , + , ~ , ` 또는 [ 기호로 시작해야 합니다." 이러한 기호들은 중첩 스타일을 사용하고 있다는 분석기에게 신호하는 식별자입니다. 나중에 중첩 느슨한 구문 업데이트로 인해 요소 선택자 앞에 & 식별자를 추가할 필요가 없는 등 이 제한 사항이 해결되었습니다:

<div class="content-ad"></div>

```js
table.colortable {
    td {
        text-align: center;
        .c {
            text-transform: uppercase;
        }
        &:first-child,
        &:first-child + td {
            border: 1px solid black;
        }
    }
    th {
        text-align: center;
        background: black;
        color: white;
    }
}
```

마찬가지로, @ 규칙을 사용하여 중첩시킬 수도 있습니다. 예를 들어:

```js
h1 {
    font-size: 2em;

    @media (width >= 40em) {
        & {
            font-size: 4em;
        }
    }
}
/* 느슨한 문법 */
h1 {
    font-size: 2em;

    @media (width >= 40em) {
        font-size: 4em;
    }
}
```

# 👁️ scope

<div class="content-ad"></div>

![CSS](/assets/img/StartingtowriteCSSin2023willbedifferent_21.png)

모두가 알다시피, CSS 언어는 다른 프로그래밍 언어와 다르게 스코프(scope) 개념이 없습니다. 보통 개발자들은 DOM 구조와 셀렉터를 통해 스코프와 유사한 기능을 달성해야 합니다. 이로 인해 웹 개발자들은 셀렉터를 작성할 때 두 가지 세계 사이를 번갈아 가며 다니게 됩니다. 한편으로 웹 개발자들은 특정 요소를 명확하게 선택해야 하지만, 다른 한편으로는 셀렉터가 DOM 구조에 밀접하게 결합되기보다는 나중에 교체하거나 유지하기를 희망합니다. 이것이 tailwindcss가 인기를 얻는 이유 중 하나입니다.

이를 위해 W3C CSS 작업 그룹은 CSS에 @scope 기능을 추가했으며, 이 기능은 Chrome(버전 118)에서 처음으로 지원되었습니다. @scope는 주변 기반 스타일링과 셀렉터에 대한 하한선 설정이라는 두 가지 주요 장점을 가진 @ 규칙입니다. 다시 말해, 스코프는 CSS에 두 가지 주요 기능을 가져옵니다:

- DOM에서의 근접에 따라 한 세트의 스타일이 다른 세트의 스타일을 재정의할 수 있음
- 셀렉터가 대상으로 하는 요소를 더욱 세밀하게 제어할 수 있음 (즉, CSS 캐스케이드를 더 잘 다룸)

<div class="content-ad"></div>

@scope 규칙은 문서의 특정 서브트리에 선택기를 스코프화할 수 있게 해줍니다. @scope 스타일을 사용하면 지나치게 구체적인 선택기를 작성하지 않거나 DOM 구조와 강하게 결합시킬 필요 없이 요소를 매우 구체적으로 선택할 수 있습니다.

```js
/* 루트 스코프 */
@scope (.card) {
    img {
        border-color: green;
    }
}
```

`@scope` 스타일 규칙의 `img { ... }`은 실제로 일치하는 `.card` 요소의 스코프 내에서만 `img` 요소를 선택할 수 있습니다. 카드 내용 영역인 `.card__content` 내의 `img` 요소가 선택되지 않도록 하려면 더 구체적인 img 선택기를 사용할 수 있습니다. 또 다른 방법은 @scope at 규칙이 최소한의 범위 제한을 받는 것도 가능하다는 점을 활용하는 것입니다.

```js
@scope (.card) to (.card__content) {
    img {
        border-color: green;
    }
}
```

<div class="content-ad"></div>

이 범위 지정 스타일 규칙은 .card와 .card\_\_content 요소 사이의 조상 트리에서만 `img` 요소를 대상으로합니다. 상한선과 하한선이 있는 이러한 범위는 종종 "도넛 범위"라고 불립니다.

다음 예제에서 캐러셀 구성 요소의 `img` 요소는 범위 제한으로 인해 일치하지 않습니다:

```html
<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_22.png" />
```

CSS 카스케이드 내에서 @scope는 인접한 영역을 결정하는 새로운 조건을 추가합니다. 이 단계는 특수성 이후에 오며 렌더링 순서 이전에 발생합니다.

<div class="content-ad"></div>

[Markdown 및 스타일 규칙](img src="/assets/img/StartingtowriteCSSin2023willbedifferent_23.png" />

규격에 따르면: "다른 범위 루트에 있는 스타일 규칙에 나타나는 선언을 비교할 때, 범위 루트와 스타일 규칙 주제 사이의 대수 또는 형제 요소 이동이 가장 적은 선언이 이긴다."

# 💯 셀렉터: is() 및 :where()

![Markdown 및 셀렉터](img src="/assets/img/StartingtowriteCSSin2023willbedifferent_24.png" />

<div class="content-ad"></div>

:is()과 :where()은 여러 개의 간단한 선택자를 선택하여 전체로 선택할 수 있는 두 가지 가상 클래스 선택기입니다. 이를 통해 선택기를 간편하고 최적화할 수 있습니다.

- :is() 함수는 간단한 선택자 목록을 가져와 그 중 하나와 일치하는 요소를 반환합니다. 이는 배열에서의 || (논리 OR)와 유사합니다.
- :where() 함수는 여러 개의 간단한 선택자 목록을 허용하며, 선택자를 그룹화하여 읽고 사용하기 쉽도록합니다.

:is()과 :where() 선택기는 허용성이 있는 선택기입니다. :is() 또는 :where()을 사용할 때 하나의 선택기를 해석할 수 없는 경우 전체 선택기 목록이 잘못되었음을 고려하지 않고 잘못된 또는 지원되지 않는 선택기를 무시하고 다른 선택기를 사용합니다. 게다가, 사용법은 기본적으로 비슷하지만, :where() 선택기의 가중치는 항상 0이고, :is() 선택기의 가중치 개수는 선택기 목록 중 가장 높은 가중치 값과 같습니다.

:where()과 :is() 선택기는 선택기 가중치를 변경하는 데 사용될 수 있기 때문에 선택기 계층 구조에 대한 간단한 대체 수단으로 사용할 수 있습니다. 예를 들어, 프레임워크나 라이브러리를 만들 때, :where() 가상 클래스 함수를 사용하여 프레임워크나 라이브러리의 선택기 가중치를 0으로 줄일 수 있습니다. 이를 통해 웹 개발자가 귀하의 프레임워크나 라이브러리를 사용할 때 선택기 가중치를 처리할 필요가 없으며, 쉽게 귀하의 프레임워크나 라이브러리의 스타일 규칙을 재정의할 수 있습니다.

<div class="content-ad"></div>

간단히 말해서, :is()와 :where()를 사용하면 CSS 선택자 가중치를 더 잘 관리할 수 있어요. 이 두 선택자를 가장 효과적으로 사용하는 방법은 다음과 같아요:

- CSS 프레임워크나 라이브러리를 구축할 때, 모든 선택자의 가중치를 0으로 줄이기 위해 :where()를 사용하세요.
- 상자나 라이브러리를 사용할 때는 :is()를 사용하여 선택자의 가중치를 높일 수 있어요. HTML 코드를 변경하지 않고도 선택자의 가중치를 최고 수준으로 높일 수 있어요.

:is()와 :where()의 차이를 고려하면, 어떤 선택자를 사용할지는 최종적으로는 당신의 특정한 요구에 따라 결정될 거예요.

# 💯 선택자: has()

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_25.png" />

개인적으로 CSS :has()은 if... else... 함수에 가장 가깝습니다. 이는 주로 HTML의 DOM과 관련이 있으며 이것이 관계 선택기(relational selector)라고 불리는 이유입니다. 예를 들어, 다음 예제에서는 하위 요소의 존재를 확인하고 적용된 스타일은 상위 요소에 적용됩니다.

```js
<!-- 케이스 ① -->
<figure>
    <figcaption>CSS Pseudo-Class Specification</figcaption>
    <img src="https://picsum.photos/1240/?random=11" alt="">
</figure>
<!-- 케이스 ② -->
<figure>
    <div class="media">
        <img src="https://picsum.photos/1240/?random=12" alt="">
    </div>
    <figcaption>CSS Pseudo-Class Specification</figcaption>
</figure>
<!-- 케이스 ③ -->
<figure>
    <img src="https://picsum.photos/1240/?random=13" alt="">
    <figcaption>CSS Pseudo-Class Specification</figcaption>
</figure>
```

위 세 가지 케이스에 해당하는 DOM 트리는 아래 그림에 나와 있습니다.

<div class="content-ad"></div>

아래 CSS 코드를 추가해주세요:

```js
/* <figcaption> 자손 요소를 포함하는 <figure> 요소와 일치시킵니다 */
figure:has(figcaption) {
    background-color: #3f51b5;
}
```

figure:has(figcaption)은 figcaption 요소를 포함하는 모든 figure에 일치합니다:

<div class="content-ad"></div>

위에서 보신 것은 :has()의 가장 간단한 사용 예시일 뿐이에요. 이 기능을 사용하면 더 복잡한 작업을 수행할 수도 있습니다. 상호작용하는 동작까지도요. 예를 들어, 아래 예시에서는 :has() 선택자와 상태 선택자를 사용하여 순수 CSS로 구현된 평점 컴포넌트(StarRating)를 만들 수 있어요:

그래서 Defensive CSS Insights에서도 :has()를 조건부 CSS 카테고리에 포함시켰어요. 그 이유는 :has()를 사용하면 많은 경우 관련 동적 조건에 따라 다른 CSS를 사용할 수 있기 때문이에요.

<div class="content-ad"></div>

:has() 선택자는 강력합니다. 자바스크립트 스크립트를 사용하지 않고도 몇 가지 도전적인 GUI를 구현할 수 있게 해주는 것 외에도 다른 많은 기능이 있습니다. 예를 들어, @wesbos가 최근 Twitter에서 :has() 선택자에 대해 열 가지 팁을 소개하는 사진을 공유했습니다:

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_29.png)

:has() 선택자에 대해 더 많은 정보를 원한다면 다음을 참고해보세요:

- CSS 부모 선택자: :has()
- CSS 선택자 :has()가 어떤 문제를 해결할 수 있나요?
- CSS 선택자: :has() 및 :not() 조합

<div class="content-ad"></div>

# 💯 복잡한 n- \* 선택

![CSS Image](/assets/img/StartingtowriteCSSin2023willbedifferent_30.png)

CSS 선택자 레벨 4에는 :nth-child()와 :nth-last-child()에 선택자 목록을 전달할 수 있는 옵션이 추가되었습니다.

```js
:nth-child(An+B [of S]?)
:nth-last-child(An+B [of S]?)
```

<div class="content-ad"></div>

S를 지정한 후에 An + B 논리는 주어진 선택자 목록 S와 일치하는 요소에만 적용됩니다. 이는 An + B가 작업을 수행하기 전에 하위 항목을 사전 필터링할 수 있다는 것을 의미합니다.

:nth-child() 가상 클래스 선택자를 사용하여 DOM에서 색인별로 요소를 선택할 수 있습니다. An + B 마이크로 문법을 사용하여 정확히 어떤 요소를 선택할지를 정밀하게 제어할 수 있습니다.

기본적으로 :nth- \*() 의 가상 코드는 모든 자식 요소를 고려합니다. Chrome 111부터는 선택자 목록을 :nth-child() 및 :nth-last-child() 에 선택적으로 전달할 수 있습니다. 이를 통해 An + B가 작업을 수행하기 전에 자식 항목 목록을 사전 필터링할 수 있습니다.

아래 예제에서 3n + 1 논리는 small 클래스를 사용하여 사전 필터링된 작은 인형에만 적용됩니다. 사용할 선택자를 동적으로 변경하려면 드롭다운 메뉴를 사용하세요.

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_31.png](/assets/img/StartingtowriteCSSin2023willbedifferent_31.png)

더 흥미로운 점은 :has(), :not(), ~ 및 +를 함께 사용하여 :nth-child(An + B [of S]?) 및 :nth-last-child(An + B [of S]?) 선택기를 모방하거나 CSS에 존재하지 않는 선택기까지 시뮬레이션할 수 있다는 것입니다:

- :first-in-ElementGroups-of-class(.😍)는 ElementGroups(클래스 이름 .😍)의 첫 번째 요소를 선택합니다. 해당 선택기는 .😍:not(:has(+ .😍))입니다.
- :last-in-ElementGroups-of-class(.😍)는 ElementGroups(클래스 이름 .😍)의 마지막 요소를 선택합니다. 해당 선택기는 .😍:not(:has(+ .😍))입니다.
- :single-in-ElementGroups-of-class(.😍)는 ElementGroups(클래스 이름 .😍)의 유일한 요소를 선택합니다. 해당 선택기는 .😍:not(.😍 + .😍):not(:has(+.😍))입니다.
- :nth-in-ElementGroups-of-class(.😍)는 ElementGroups에서 n번째 요소(클래스 이름 .😍)를 선택합니다. 예를 들어 .😍:not(.😍 + .😍) + .😍는 2번째 요소(클래스 이름 .😍)를 선택합니다. .😍:not(.😍 + .😍) + .😍 + .😍는 3번째 요소(클래스 이름 .😍)를 선택합니다.
- :nth-last-in-island-of-class(.special)는 ElementGroups에서 n번째 뒤에서 요소(클래스 이름 .😍)를 선택합니다. 예를 들어, .😍:not(:has(+.😍 +.😍)):has(+.😍)는 끝에서 두 번째 요소(클래스 이름 .😍)를 선택하고, .😍:not(:has(+.😍 +.😍 +.😍)):has(+.😍 +.😍)는 끝에서 세 번째 요소(클래스 이름 .😍)를 선택합니다.

![StartingtowriteCSSin2023willbedifferent_32.png](/assets/img/StartingtowriteCSSin2023willbedifferent_32.png)

<div class="content-ad"></div>

# 💯 CSS 삼각함수

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_33.png)

W3C 명세서의 CSS 값 및 단위 모듈 레벨 4는 웹 개발자에게 수학식과 관련된 기능을 제공합니다. calc() 함수와 CSS 비교 함수(min(), max(), clamp() 등)에 추가로 sin(), cos(), tan(), asin(), acos(), atan() 및 atan2()와 같은 CSS 삼각함수도 있습니다.

이제 CSS의 삼각함수를 사용하여 원점을 중심으로 원 위에 요소를 더 쉽게 배치할 수 있습니다:

<div class="content-ad"></div>

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_34.png)

애니메이션 애호가이거나 자주 애니메이션을 개발해야 하는 경우, CSS 삼각 함수가 최선의 도우미가 될 것입니다. 애니메이션 개발 과정에서 다음과 같이 CSS 삼각 함수를 사용할 수 있습니다:

- sin() 함수는 요소 크기를 변경하거나 애니메이션 지속 시간을 제어하는 데 사용할 수 있습니다.
- cos() 함수는 회전된 요소의 크기를 유지하는 데 사용할 수 있습니다.
- tan() 함수는 평행사변형을 그리는 데 사용할 수 있습니다.
- asin(), acos(), atan() 및 atan2() 함수는 요소를 회전하는 데 사용할 수 있습니다.

또한 삼각함수는 애니메이션에서 다양한 응용과 역할을 갖고 있습니다. 일반적인 예시를 몇 가지 소개합니다:

<div class="content-ad"></div>

- 부드러운 움직임과 이징 효과 : 삼각함수, 특히 사인(sin()) 및 코사인(cos()) 함수를 사용하여 요소들의 부드러운 움직임과 이징 효과를 얻을 수 있습니다. 이를 통해 애니메이션이 자연스럽게 보이고 갑작스러운 가속 및 감속을 피할 수 있습니다.
- 주기적 애니메이션 : 사인(sin()) 및 코사인(cos()) 함수는 주기적이기 때문에 반복되는 동작을 가진 애니메이션 효과를 만드는 데 자주 사용됩니다. 예를 들어, 사인(sin()) 함수의 매개변수를 조절하여 파도나 진동 효과를 만들 수 있습니다.
- 회전 애니메이션 : 삼각함수의 회전적 특성은 물체 회전 애니메이션을 만들기에 이상적입니다. 사인(sin()), 코사인(cos()) 함수에서 시간 변수를 이용하면 부드러운 회전 효과를 얻을 수 있습니다.
- 경로 애니메이션 : 삼각함수의 주기성과 부드러움은 복잡한 경로를 따라 움직이는 물체의 애니메이션을 정의하는 데 적합합니다. 삼각함수의 매개변수를 적절히 조절하여 다양한 경로 애니메이션을 만들 수 있습니다.
- 진동 효과 : 사인(sin()) 함수를 사용하여 스윙이나 탄성 애니메이션과 같은 진동 효과를 시뮬레이션할 수 있습니다.
- 위상 및 주파수 조절 : 삼각 함수의 위상과 주파수를 조절하면 애니메이션의 속도와 주기를 변경할 수 있어 더 많은 창의적인 제어가 가능합니다.

애니메이션에서 삼각함수의 일반적인 응용사례들입니다. 창의적인 디자이너와 개발자들은 더 많은 잠재력을 발휘하여 다채롭고 매혹적인 애니메이션 효과를 만들어낼 수 있습니다. 예를 들어, 아래의 회전하는 페리스 휠 모션 그래픽은 CSS 삼각함수를 적용한 것입니다.

![페리스휠](/assets/img/StartingtowriteCSSin2023willbedifferent_35.png)

CSS 삼각함수에 대해 더 배우고 싶다면 '수학의 기적: 애니메이션에서 수학의 적용 탐구' 세션을 참고해주세요.

<div class="content-ad"></div>

# 💯 서브그리드

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_36.png)

CSS 서브그리드를 사용하면 더 복잡한 그리드 레이아웃을 만들고 서브 레이아웃 간에 더 나은 정렬을 달성할 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_37.png)

<div class="content-ad"></div>

다른 그리드 내에 그리드를 사용하여 subgrid를 grid 행 또는 열의 값으로 사용함으로써 외부 그리드의 행과 열을 자체로 사용할 수 있습니다.

간단히 말해, 그리드 항목의 display 값을 명시적으로 grid 또는 inline-grid로 설정하거나 부모 그리드 컨테이너의 display 값을 상속하면 해당 그리드 항목은 독립적인 그리드 형식 컨텍스트임을 의미합니다. 동시에, subgrid의 grid-template-columns 또는 grid-template-rows가 subgrid로 명시적으로 설정되면 subgrid의 내용이 부모 그리드의 형식 컨텍스트에 참여하게 되며 새로운 그리드 형식 컨텍스트를 설정하지 않습니다.

그리드 레이아웃에서의 subgrid는 매우 유용하며 CSS 그리드로 이전에는 불가능했던 기능을 달성할 수 있는 더 많은 방법을 제공합니다. subgrid는 동적 콘텐츠에 따라 서로 정렬된 피어들을 맞추는 데 큰 도움이 되며 subgrid를 사용하면 레이아웃을 콘텐츠에 맞도록 조정할 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_38.png)

<div class="content-ad"></div>

# 조판

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_39.png" />

웹 조판은 항상 매우 복잡하고 많은 지식을 필요로 합니다. 방금 지난 2023년 동안, 웹 조판은 몇 가지 중요한 업데이트를 적용했습니다. 예를 들어, text-wrap 속성을 사용하여 레이아웃 조정을 할 수 있고, initial-letter를 사용하여 첫 글자가 가라앉는 효과를 낼 수 있으며, 심지어 웹에서 가변 글꼴과 색상 글꼴을 사용하여 사용자에게 더 나은 읽기 경험을 제공할 수도 있습니다.

# 👁️ 첫 번째 단어가 가라앉습니다

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_40.png](/assets/img/StartingtowriteCSSin2023willbedifferent_40.png)

맨 처음으로 문자가 가라앉은 것은 신문, 잡지, 소설, 교과서 등과 같은 인쇄 매체에서 처음 등장했습니다. 장을 열거나 문단의 첫 글자에 패션 감각을 더할 수 있습니다. 이러한 가라앉은 문자는 독자들의 관심을 끌 수 있으며, 매우 화려한 글꼴을 사용할 수 있습니다. 텍스트 문자열 중 하나의 문자만 처리하므로 텍스트의 가독성에 영향을 주지 않습니다.

CSS 내부 연결 레이아웃 모듈 레벨 3 (CSS 내부 레이아웃 모듈 레벨 3)은 처음 글자 가라앉음의 스타일을 세밀하게 제어할 수 있는 initial-letter 속성을 제공합니다. 가라앉은 초기 문자, 오목한 초기 문자 및 들어올린 초기 문자의 크기와 수를 지정할 수 있습니다.

```css
p::first-letter {
  initial-letter: 3 2;
}
```

<div class="content-ad"></div>


![Initial-letter](/assets/img/StartingtowriteCSSin2023willbedifferent_41.png)

initial-letter는 초기 글자를 스타일링하는데 사용할 수 있는 작지만 아름다운 CSS 기능입니다.

# 👁️ 균형 잡히고 아름다운

![Initial-letter](/assets/img/StartingtowriteCSSin2023willbedifferent_42.png)


<div class="content-ad"></div>

개발자로서 타이틀이나 문단의 최종 크기, 글꼴 크기 또는 언어조차 알 수 없습니다. 텍스트 래핑을 효과적으로 그리고 아름답게 처리하는 데 필요한 모든 변수는 브라우저에서 제공됩니다. 브라우저는 글꼴 크기, 언어, 할당된 영역과 같은 모든 요소를 이해하기 때문에 고급 텍스트 레이아웃을 처리하기에 매우 적합합니다.

이를 위해 균형(balance)과 아름다움(pretty)라는 두 가지 새로운 텍스트 래핑 기술을 도입해야 합니다. 균형 값은 조화로운 텍스트 블록을 만들기 위해 설계되었고, 아름다움은 고립된 문자를 방지하고 건강한 음절을 보장하기 위해 설계되었습니다. 기존에 이러한 작업들은 수동으로 수행되었으며, 브라우저에 이 작업을 맡기고 어떤 언어로든 번역 가능하도록 지원받는 것이 훌륭합니다.

text-wrap: balance; 일부 텍스트 너비 아래의 텍스트 행 수에 따라 한정이 있을 수 있습니다. text-wrap: balance; 를 사용할 때 텍스트 래핑 행 수에 제한이 있기 때문에 이는 제목과 소제목에만 사용해야 합니다. 대량의 텍스트에 적용하면 효과가 없을 뿐만 아니라 브라우저가 최적의 균형을 계산하려고 시도하여 성능 비용이 발생합니다.

텍스트 조판할 때 균형과 미학 사이에서 선택해야 합니다. 제목과 소제목에는 text-wrap: balance; 를 사용하고, 텍스트 단락에는 text-wrap: pretty; 를 사용하여 마지막 줄의 고립 단어를 제거하세요. 이러한 기능들은 점진적 향상을 위한 좋은 후보입니다. 지원되는 브라우저가 아닌 경우 경험에 부정적인 영향을 미치지 않지만, 지원되는 브라우저에서 페이지의 시각적 균형을 개선할 것입니다.

<div class="content-ad"></div>

위 문서에는 초기 글자 및 텍스트 랩과 같은 두 가지 조판 기능이 소개되었습니다. 사실, 2023년에는 웹 플랫폼에서 지원할 다른 조판 기능도 있습니다. 예를 들어:

- F-mods: @font-face를 위한 새로운 기능
- CSS 텍스트 상자 자르기 및 텍스트 상자 가장자리는 글꼴에 변화를 줍니다.
- 웹에서 가변 글꼴
- 웹에서 색상 글꼴

# 색상

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_43.png)

<div class="content-ad"></div>

2023년은 웹 플랫폼의 색상 연도입니다. 새로운 색 공간과 기능을 통해 동적 색 테마를 구현할 수 있습니다. 풍부하고 밝은 테마를 만들고 사용자 정의할 수 있어요!

# 💯 고화질 색 공간

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_44.png)

웹의 색상 문제는 CSS가 고화질 준비를 지원하지 않는다는 것입니다. 1996년 웹에 도입될 당시 대부분의 컴퓨터 모니터는 매우 나쁘고 대부분 고화질이 아니었습니다. RGB, HSL 또는 HEX(16진수)를 사용하여 정의된 색상은 sRGB 색 고동 범위 내에 있었으며 해당 시점의 모니터에만 적용되었습니다.

<div class="content-ad"></div>

요즘 대부분의 새로운 기기들은 디스플레이 P3 컬러 감막을 사용하는 등 와이드 컬러 감막 디스플레이 기능을 갖추고 있습니다. 심지어 Rec.2020과 같이 더 큰 컬러 감막도 지원합니다. 2023년에는 새로운 색상, 더 다양한 색상, 새로운 색상 공간, 색상 기능 및 새로운 기능들이 있습니다.

CSS와 색상은 이제 다음과 같은 것을 달성할 수 있습니다:

- 사용자 화면 하드웨어가 와이드 감막 HDR 색상을 지원하는지 확인
- 사용자 브라우저가 OKLCH나 Display P3와 같은 색상 구문을 인식하는지 확인
- OKLAB, OKLCH, HWB, Display P3, Rec.2020, XYZ 등과 같은 색상 공간에서 HDR 색상을 지정
- HDR 색상으로 점진적인 변화 생성
- 대체 색상 공간에서 점진적인 변화 보간
- color-mix()를 사용하여 색상 혼합
- 상대적 컬러 구문을 사용하여 색상 변형 생성

![2023년 CSS 작성의 시작은 다를 것입니다](/assets/img/StartingtowriteCSSin2023willbedifferent_45.png)

<div class="content-ad"></div>

CSS 색상은 대부분 sRGB 및 비 sRGB로 분류되는 어떤 색상 공간에서 파싱됩니다. 그 중 sRGB 색상 공간에서 파싱된 색상은 다음과 같습니다:

- 16진수 색상
- rgb() 및 rgba()
- hsl() 및 hsla()
- hwb()
- red, black 등의 이름 색상

비 sRGB 색상 공간에서 파싱된 색상은 다음과 같습니다:

- Lab 및 LCH: lab() 및 lch()
- OKLAB 및 OKLCH: oklab() 및 oklch()
- 모든 색상 공간: color()

<div class="content-ad"></div>

자세한 정보를 원하시면 다음을 참고해주세요:

- 현대 CSS의 색상 형식: RGB, HSL, HWB, LAB 및 LCH
- 웹을 위한 고화질 색상 설정을 위한 새로운 CSS 색상 공간
- CSS에서의 OKLAB 및 OKLCH

# 💯 color-mix () 함수

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_46.png)

<div class="content-ad"></div>

컬러 블렌딩은 고전적인 과제이며, 2023년에는 CSS도 할 수 있습니다. 여러분은 색상을 혼합할 때 흰색이나 검정색만 섞지 않고 투명도도 혼합할 수 있으며, 선택한 모든 색상 공간에서 이러한 작업을 수행할 수 있습니다. 기존의 색상 혼합 방법(단순 평균, 선형 가중 평균 등)과 비교하면 color-mix() 함수는 더 유연한 혼합 방법을 제공합니다. 또한, 다양한 색상 공간에서 혼합할 수 있어 색상을 조정할 때 더 유연하며 필요에 따라 적합한 색상 공간을 선택할 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_47.png)

color-mix()를 점진적인 변화의 순간으로 생각할 수 있습니다. 점진적 변화에서 우리는 파란색에서 흰색으로 모든 부분을 볼 수 있으며, color-mix()는 한 단계만 보여줍니다. 혼합된 색상 공간이 결과와 얼마나 다른지를 배우고 색상 공간에 대해 생각하기 시작하면 더 복잡해집니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_48.png)

<div class="content-ad"></div>

더 자세한 color-mix() 소개는 "모던 CSS"의 "CSS에서 색상 혼합하기: color-mix()" 코스를 참고해주세요!

# 👁️ 상대 색상 구문

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_49.png)

CSS Color Module Level 5는 상대 색상 구문을 소개하여 CSS 색상 함수의 기능을 더 확장했습니다. 이 구문을 사용하면 다른 색상을 기반으로 새 색상을 정의할 수 있습니다. 시작 색상을 from 키워드를 사용하여 먼저 정의하고, 그 후 색상 함수에서 새 색상의 채널을 지정합니다.

<div class="content-ad"></div>

시작 색상을 제공할 때 "채널 키워드"에 액세스할 수 있습니다. 이를 통해 색상 공간의 각 채널을 참조할 수 있습니다. 키워드는 사용하는 색상 함수에 따라 다릅니다. 예를 들어, rgb()를 사용할 경우 r, g 및 b 채널 키워드가 있습니다. oklch()의 경우 l, c 및 h 키워드가 있습니다. 각 색상 함수마다 시작 색상의 알파 채널을 참조하는 투명 채널 키워드도 있습니다. 예를 들어:

```js
:root {
    --theme-primary: #8832CC;
}
.bg-primary-100 {
    background-color: hsl(from var(--theme-primary) h s 90%);
}
.bg-primary-200 {
    background-color: hsl(from var(--theme-primary) h s 80%);
}
.bg-primary-300 {
    background-color: hsl(from var(--theme-primary) h s 70%);
}
.bg-primary-400 {
    background-color: hsl(from var(--theme-primary) h s 60%);
}
```

예시로 hsl(from var(--theme-primary) h s 30%)을 사용할 수 있습니다:

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_50.png" />

<div class="content-ad"></div>

상대색문법(Relative Color Syntax, RCS)은 color-mix()를 보완하여 색상 변형을 만드는 데 사용됩니다. color-mix()보다 더 강력하지만 다른 색상 처리 전략을 갖고 있습니다. color-mix()는 색상을 밝게 하는 데 사용되지만, RCS는 정확히 밝기 채널에 접근할 수 있으며 calc()을 사용하여 밝기를 프로그래밍적으로 줄이거나 높일 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_51.png)

RCS를 사용하면 색상을 상대적으로 또는 절대적으로 조작할 수 있습니다. 상대적 변형은 현재 채도나 밝기 값을 가져와 calc()를 사용하여 수정하는 것을 의미합니다. 절대적 변형은 채널 값을 새로운 값으로 대체하여 opacity를 50%로 설정하는 등을 의미합니다. 이 구문은 의미 있는 테마 설정 도구를 제공하여 시간 변형 등을 위해 유용합니다.

또한 CSS의 accent-color 및 color-scheme을 사용하여 웹 컨트롤의 UI 색상을 사용자 정의하고, color-contrast() 함수를 사용하여 색상 대비를 설정하여 사용자 경험을 향상시킬 수도 있습니다!

<div class="content-ad"></div>

# 👁️ 라이트 다크 모드에 반응하는 light-dark() 함수

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_52.png" />

라이트 모드 또는 다크 모드를 기반으로 색상을 변경하려면 prefers-color-scheme 미디어 쿼리를 자주 사용합니다. CSS는 이제 light-dark() 라는 유용한 함수를 제공하여 작업을 좀 더 쉽게 만들었습니다. 해당 함수는 두 색상 값을 인수로 사용합니다. 현재 사용 중인 색상 테마에 따라 첫 번째 또는 두 번째 매개변수를 출력합니다.

규격에 따르면:

<div class="content-ad"></div>

사용된 색상 구성은 사용자의 밝은 모드 또는 어두운 모드 설정뿐만 아니라 color-scheme 속성의 값에도 기반을 둡니다. 이는 System Colors가 계산되는 방식과 유사합니다.

color-scheme 속성을 사용하면 요소가 렌더링에 사용할 색상 구성을 나타낼 수 있습니다. 이러한 값들은 사용자의 선호도와 협상되어 사용할 색상 구성을 형성합니다. 이는 light-dark()가 작동하려면 color-scheme 선언도 함께 포함해야 함을 의미합니다.

```js
:root {
    color-scheme: light dark;
}
:root {
    --text-color: light-dark(#333, #ccc); /* 밝은 모드에서 첫 번째 값 반환. 어두운 모드에서 두 번째 값 반환. */
}
```

color-scheme을 고려하므로 각 요소에서 해당 값을 재정의하여 특정 모드로 강제로 할당할 수도 있습니다:

<div class="content-ad"></div>

```js
.dark {
    color-scheme: dark; /* light-dark() 함수를 사용하면 prefers-color-scheme 미디어 쿼리를 사용하는 것보다 훨씬 간단하고 편리합니다. */
}
```

light-dark() 함수를 사용하는 것이 prefers-color-scheme 미디어 쿼리를 사용하는 것보다 훨씬 간단하고 편리합니다.

# 반응형 디자인

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_53.png" />


<div class="content-ad"></div>

@Una Kravets은 2021 Google I/O 컨퍼런스에서 새로운 반응형 디자인을 제안했습니다: Component-Driven Web Design. 웹 생태계는 새로운 반응형 웹 디자인 시대로 접어들고, 그 의미를 바꾸며 웹 디자인에 새로운 변화를 가져올 것입니다. Component-Driven Web Design(또는 개발)은 다음 세대의 반응형 웹 디자인으로도 불립니다.

다시 말해, 우리는 반응형 디자인 생태계의 진화를 한 번 더 목격하고 있습니다. 즉, CSS의 새로운 기능은 페이지 기반 스타일 삽입 대신 구성 요소를 기반으로 하게 됩니다. 이 기능을 Component-Driven Web Design라고 하며, 구성 요소중심 개발은 실제로 대중적인 개발 모델이 될 것입니다.

두 년 뒤, 2023년, 반응형 웹 디자인에 있어서 획기적인 해로 평가될 수 있습니다. 이 해는 완전히 새로운 특징들을 선보였으며 우리가 반응형 웹을 구축하는 방식을 완전히 바꾸었고 구성요소 중심 반응형 디자인의 새로운 양식을 개척했습니다. CSS 컨테이너 쿼리(사이즈 쿼리, 스타일 쿼리 및 상태 쿼리)와 :has() 선택자의 결합은 구성 요소가 부모 요소의 크기 및 자식 요소의 존재 또는 상태에 따라 자체 반응형 및 논리 스타일을 가지도록 지원합니다. 이는 페이지 수준의 레이아웃(매크로 레이아웃)을 구성 요소 수준의 레이아웃(마이크로 레이아웃)과 분리하고, 구성 요소를 한 곳에서만 논리적으로 쓰는 것이 가능하도록 해 줍니다!

<div class="content-ad"></div>

# 사이즈 쿼리 💯 컨테이너 쿼리

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_55.png" />

컨테이너 쿼리를 사용하면 요소 컨테이너의 크기, 계산된 스타일 및 상태에 따라 스타일을 적용할 수 있습니다. 가장 큰 특징은 다음과 같습니다: 개발자들이 컨텍스트를 포함하는 모든 요소로 정의할 수 있습니다. 쿼리 컨테이너의 자식 요소는 쿼리 컨테이너의 크기나 계산된 스타일 및 상태의 변화에 따라 스타일을 변경할 수 있습니다!

다시 말해, 쿼리 컨테이너는 컨테이너 유형 속성 (container-type 또는 container)을 사용하여 쿼리 유형을 지정합니다. 동시에 쿼리 컨테이너의 하위 요소의 스타일 규칙은 @container 조건부 그룹 규칙을 사용하여 독립적으로 설정할 수 있습니다. 간단히 말해, 쿼리 컨테이너(CSS 포함이라고도 함)는 페이지의 다양한 부분을 격리시키고 이러한 부분들이 스타일 및 레이아웃 측면에서 다른 부분과 독립적이라고 브라우저에 선언하는 방법을 제공합니다.

<div class="content-ad"></div>

컨테이너 쿼리는 원래 크기 쿼리에만 제한되어 있었지만 시간이 지남에 따라 스타일 쿼리와 상태 쿼리가 컨테이너 쿼리에 추가되었습니다. 다시 말해, 컨테이너 쿼리에는 세 가지 유형이 포함되어 있습니다:

- 크기 쿼리: 쿼리 컨테이너의 크기에 따라 하위 요소의 스타일을 조정합니다.
- 스타일 쿼리: 쿼리 컨테이너의 스타일이나 CSS 변수를 기반으로 하위 요소의 스타일을 조정합니다.
- 상태 쿼리: 쿼리 컨테이너의 상태에 따라 하위 요소의 스타일을 조정합니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_56.png)

크기 쿼리는 전역 크기 정보인 뷰포트(브라우저 창)의 크기 대신 부모 요소의 크기를 쿼리하여 CSS 스타일을 적용합니다. 이는 여러 레이아웃과 뷰에서 컴포넌트에 동적 스타일을 설정할 수 있다는 것을 의미합니다.

<div class="content-ad"></div>

이 기능을 사용하려면 먼저 조회하려는 요소의 요소에 대한 설정을 하고, 그런 다음 미디어 쿼리와 유사한 비교적 작은 매개변수를 사용하여 @container를 이용해 스타일을 적용하세요. 컨테이너 쿼리 외에도 컨테이너 쿼리 크기도 얻을 수 있습니다. 다음 데모에서는 콘테이너 쿼리 크기 cqi (내장된 컨테이너의 크기를 나타냄)를 사용하여 카드 헤더의 크기를 조정하는 방법을 보여줍니다.

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_57.png)

이 기능에 관심이 있다면, "Next Generation Responsive Web Design: Container Queries"와 "CSS Container Queries: Size Queries"를 읽어보세요. 위에서 언급된 cqi는 컨테이너 쿼리 단위로, 윈도우 단위와 다소 유사합니다. 이에 대한 더 자세한 정보는 "Relative Units in Modern CSS"를 참조하세요.

# 👁️ 컨테이너 쿼리를 위한 스타일 쿼리

<div class="content-ad"></div>

![Starting to write CSS in 2023 will be different](/assets/img/StartingtowriteCSSin2023willbedifferent_58.png)

스타일 쿼리는 크기 쿼리와 매우 유사합니다. 스타일 쿼리를 사용하여 컨테이너의 계산된 스타일을 쿼리할 수 있지만 size 쿼리는이를 구별합니다. 이를 통해 style () 함수를 통해여 어떤 유효한 스타일 선언도 허용할 수 있습니다. style () 함수는 다음을 허용합니다:

```js
@container style(font-style: italic) {
    em {
        background: var(--highlight);
        color: var(--highlight-text);
    }
}
@container style(--button: pill) {
    button {
        border-radius: 50%;
        padding-inline: 1em;
    }
}
@container colors style(background-color: black) {
    a:any-link {
        color: var(--link-on-dark);
    }
}
```

스타일 쿼리의 조건( style () 함수에서 선언된대로)이 계산된 값을 비교한다는 점을 유의하십시오.

<div class="content-ad"></div>

많은 경우에는 스타일 쿼리도 사이즈 쿼리와 동일한 결과를 얻을 수 있습니다.

![image 1](/assets/img/StartingtowriteCSSin2023willbedifferent_59.png)

즉, @container style()을 사용할 때 부모 요소의 사용자 정의 속성 값을 쿼리할 수도 있습니다. 예를 들어 사용자 정의 속성 값이 존재하거나 특정 값으로 설정되었는지 쿼리할 수 있습니다. 예: @container style(--rain: true) :

![image 2](/assets/img/StartingtowriteCSSin2023willbedifferent_60.png)

<div class="content-ad"></div>

비록 CSS 클래스 이름 사용과 유사해 보이지만, 스타일 쿼리에는 몇 가지 장점이 있어요. 먼저, 스타일 쿼리를 사용하면 의사 상태에 따라 CSS의 값을 업데이트할 수 있어요. 또한, 추후 구현에서는 값 범위를 쿼리할 수 있으며(attribute value pairs에 따라 적용된 스타일을 결정할 수 있어요(예: style(font-style: italic)).

# 👁️ 컨테이너 쿼리를 위한 상태 쿼리

![StartingtowriteCSSin2023willbedifferent_61](/assets/img/StartingtowriteCSSin2023willbedifferent_61.png)

Una Kravets은 CSS Day 2023에서 "CSS 커뮤니티의 현재 상황"과 관련된 주제를 공유했는데, 이는 CSS 컨테이너 쿼리의 상태 쿼리와 관련된 주제를 포함하고 있어요.

<div class="content-ad"></div>

사실 CSS 상태 쿼리와 CSS 스타일 쿼리는 어느 정도 유사합니다. CSS 컨테이너 쿼리에서 크기 쿼리와 스타일 쿼리를 구분하는 데 state() 함수를 주로 사용합니다. 예를 들어:

```js
@container state(dir: rtl) {
    /* RTL 레이아웃 */
}
```

그러나 중요한 점은 CSS 상태 쿼리가 현재 Chromium 팀에서 실험 중인 새로운 쿼리 유형임을 유의해야 합니다.

# 💯 미디어 쿼리 업데이트

<div class="content-ad"></div>

업데이트 미디어 쿼리를 사용하면 장치의 리프레시 속도에 인터페이스를 적응시킬 수 있어요. 이 기능은 빠르게, 느리게 또는 없음과 같은 값들을 보고, 다양한 장치의 기능과 관련이 있어요.

대부분의 디자인한 장치들은 빠른 리프레시 속도를 가질 수 있고, 데스크탑 장치와 대부분의 모바일 장치를 포함해요. 이와는 달리, E-리더나 저전력 결제 시스템과 같은 장치의 리프레시 속도는 느릴 수 있어요. 장치가 애니메이션을 처리하지 못한다는 것을 알고 있다면, 배터리 수명을 절약하거나 잘못된 화면 업데이트를 줄일 수 있어요.

이미지 참조: ![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_62.png)

애니메이션을 만들 때, 이 미디어 쿼리는 느린 네트워크를 사용하는 사용자들을 위해 모션을 줄이고 싶다면 매우 유용해요. 또한, prefers-reduced-motion: reduce 미디어 쿼리와 함께 사용되어, 모션을 줄인 사용자들에게 다른 애니메이션 효과를 제공하는 데 자주 사용돼요.

<div class="content-ad"></div>

```js
@media (prefers-reduced-motion: reduce), (update: slow)  {
    *,
    ::before,
    ::after {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        background-attachment: initial !important;
        scroll-behavior: auto !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
    }
 }
```

# 💯 스크립트된 미디어 쿼리

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_63.png" />

스크립트된 미디어 쿼리(스크립팅)를 사용하면 JavaScript가 사용 가능한지 확인할 수 있습니다. 이는 점진적 기능 향상에 매우 유용합니다. 이 미디어 쿼리가 소개되기 전에는 JavaScript가 사용 가능한지를 감지하는 전략으로 HTML에 nojs 클래스를 배치한 다음 JavaScript를 사용하여 제거하는 방법이 있었습니다. 이제 CSS가 JavaScript를 감지하고 그에 맞게 조정할 수 있기 때문에 이러한 스크립트를 제거할 수 있습니다.

<div class="content-ad"></div>

```css
.steam {
  transition: opacity 0.2s ease;
}
@media (scripting: none) {
  .steam {
    opacity: 0;
  }
}
@media (scripting: enabled) {
  .steam {
    opacity: 1;
  }
}
```

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_64.png" />

웹 사이트에 테마 스위치가 있다고 가정해보겠습니다. JavaScript를 사용할 수 없는 경우에는 스크립트 미디어 쿼리를 사용하여 스위치를 시스템 환경 설정을 준수하도록 만들 수 있습니다. 또는 JavaScript를 사용할 수 있는 경우에는 스위치 구성 요소를 사용해보세요. 제스처로 스위치를 스와이프하여 켜고 끌 필요 없이 간단하게 동작할 수 있습니다. 스크립트를 활용하면 사용자 경험을 업그레이드할 수 있는 많은 기회가 있습니다. 스크립트가 비활성화된 경우에도 의미 있는 기본적인 경험을 제공할 수 있습니다.

# 👁️ 줏어진 투명도를 가진 미디어 쿼리

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_65](/assets/img/StartingtowriteCSSin2023willbedifferent_65.png)

투명하지 않은 인터페이스는 다양한 시각적 결함으로 인해 머리 아픔이나 시각 피로를 유발할 수 있습니다. 그래서 Windows, macOS, iOS에는 인터페이스의 투명도를 줄이거나 제거할 수 있는 시스템 환경 설정이 있습니다. prefers-reduced-transparency에 대한 이 미디어 쿼리는 다른 환경 설정과 이상적으로 어울려 사용자에 맞게 조정하고 창의적으로 변형할 수 있습니다.

![StartingtowriteCSSin2023willbedifferent_66](/assets/img/StartingtowriteCSSin2023willbedifferent_66.png)

일부 경우에는 컨텐츠를 다른 컨텐츠 위에 오버레이하지 않는 대체 레이아웃을 제공할 수 있습니다. 또 다른 경우에는 색상의 불투명도를 불투명한 또는 거의 불투명한 상태로 조정할 수 있습니다. @Adam Argyle의 블로그 게시물은 사용자 환경 설정에 따라 조정할 수 있는 더 많은 영감을 줍니다.

<div class="content-ad"></div>

# 💯 미디어 쿼리 범위

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_67.png)

미디어 쿼리에서는 min-width(또는 min-height)와 max-width(또는 max-height)를 쿼리 범위라고 합니다. min-과 max-만 사용하는 것은 종종 혼란스러울 수 있습니다. 적어도 저는 그렇게 생각해요: "min-width와 max-width를 사용하는 것은 종종 혼란스럽습니다." 따라서 저는 항상 다음 그림을 사용해서 판단을 내리는 것을 좋아해요:

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_68.png)

<div class="content-ad"></div>

하지만 Media Queries Level 4 명세서는 기존의 window 폭 범위를 확인하는 방법에 새로운 구문을 소개하여, 코드를 더 작성하고 이해하기 쉽게 만듭니다. 이 새로운 구문은 `,` 및 = 같은 일반적인 수학 비교 연산자를 사용하여 윈도우 폭 범위를 결정하며, 문법적으로 더 의미가 있습니다.

```js
/* 기존 방식의 미디어 쿼리 범위 구문 */
@media (min-width: 375px) {
    /* 윈도우 폭이 375px 이상 */
}
@media (max-width: 768px) {
    /* 윈도우 폭이 768px 이하 */
}
@media (min-width: 375px) and (max-width: 768px) {
    /* 윈도우 폭이 375px ~ 768px 사이 */
}
/* 새로운 방식의 미디어 쿼리 범위 구문 */
@media (width >= 375px) {
    /* 윈도우 폭이 375px 이상 */
}
@media (width <= 768px) {
    /* 윈도우 폭이 768px 이하 */
}
@media (375px <= width <= 768px) {
    /* 윈도우 폭이 375px ~ 768px 사이 */
}
```

Media Queries Level 4 명세서의 가장 큰 변화는 값 비교를 조합하는 대신 새로운 연산자를 사용한다는 것입니다.

- ` : 한 값이 다른 값보다 작은지 계산합니다.
- ` : 한 값이 다른 값보다 큰지 계산합니다.
- = : 한 값이 다른 값과 같은지 계산합니다.
- ` : 한 값이 다른 값보다 크거나 같은지 계산합니다.
- ` : 한 값이 다른 값보다 작거나 같은지 계산합니다.

<div class="content-ad"></div>

이러한 새로운 연산자들로 CSS 미디어 쿼리의 구문 규칙이 다음 그림과 같이 대응되게 변경되었습니다:

![CSS 미디어 쿼리 구문](/assets/img/StartingtowriteCSSin2023willbedifferent_69.png)

일반적으로 CSS 미디어 쿼리를 작성할 때, 디자인 "중단" 조건인 브레이크포인트를 만들고 해당 조건에 대한 스타일 세트를 적용합니다. 디자인은 여러 개의 브레이크포인트를 가질 수 있습니다! 일반적으로 이들은 두 가로폭 사이의 창을 기반으로 합니다: 브레이크포인트가 시작하는 위치와 종료하는 위치.

새로운 문법은 시각적으로 다른 점을 제외하고 약간 다르게 작동합니다. min-과 max-를 사용하는 것은 수학적 비교 연산자를 사용하는 것과 동일합니다:

<div class="content-ad"></div>

- Max-width는 `=` 연산자와 동등합니다. 예를 들어 (max-width: 320px)는 (width `= 320px)와 같습니다.
- Min-width는 `=` 연산자와 동등합니다. 예를 들어 (min-width: 320px)는 (width `= 320px)와 같습니다.

두 가지 모두 `>` 또는 `<` 연산자와 동등하지 않음을 유의해 주세요.

# 대화식 애니메이션

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_70.png)

<div class="content-ad"></div>

인터랙티브 애니메이션은 디지턼 경험의 중추입니다. 사용자가 클릭한 콘텐츠에 대한 피드백 및 가상 공간에서의 위치를 확인할 수 있도록 도와줍니다. 2023년에는 많은 흥미로운 기능들이 연이어 출시되어 인터랙티브 애니메이션을 조직하고 구현하기 더 쉬워질 것으로 예상됩니다. 이를 통해 부드러운 사용자 경험과 더 정교한 네트워크 경험을 이룰 수 있을 것입니다.

# 👁️ 뷰 전환

![](/assets/img/StartingtowriteCSSin2023willbedifferent_71.png)

뷰 전환은 웹의 사용자 경험에 큰 영향을 미칠 수 있습니다. CSS View Transitions API를 사용하면 Single Page Application에서 두 페이지 상태 간의 시각적 전환을 만들 수 있습니다. 이러한 전환은 전체 페이지 전환이나 목록에 새로운 항목을 추가하거나 제거하는 것과 같이 작은 웹페이지 내의 전환에도 사용될 수 있습니다.

<div class="content-ad"></div>

CSS View Transitions API의 핵심은 document.trigViewTranstion 함수입니다. 새 상태로 DOM을 업데이트하는 함수를 전달하면, 이 API가 모두 처리해줍니다. 이를 위해 이 API는 전/후 스냅샷을 촬영한 다음 두 가지 사이를 트랜지션합니다. CSS로는 캡처할 내용을 제어하고 필요에 따라 이러한 스냑샷이 어떻게 애니메이트되는지 사용자 정의할 수 있습니다.

```js
:root {
    view-transition-name: none;
}
::view-transition-group(*) {
    animation-duration: 0.5s;
}
```

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_72.png" />

더 자세한 View Transitions 소개를 보려면 “Web Animation Journey에서 'CSS 뷰 트랜지션을 사용하여 부드러운 인터페이스 모션 그래픽'을 참고하시거나, “Unlocking the Magic of CSS View Transitions API“의 “Modern CSS”를 살펴보세요!

<div class="content-ad"></div>

# 👁️ 스크롤 드라이브 모션 그래픽

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_73.png" />

스크롤로 조작되는 애니메이션은 Chrome 115부터 제공되는 흥미로운 기능입니다. 이를 사용하면 기존 CSS 애니메이션이나 Web Animations API를 사용하여 생성된 애니메이션을 스크롤러의 오프셋과 연관시킬 수 있습니다. 수직 및 수평 스크롤러에서 위로 또는 아래로 스크롤하면 연관된 애니메이션이 직접적인 반응으로 되감아집니다.

ScrollTimeline을 사용하여 스크롤러의 전체 진행 상황을 추적할 수 있습니다. 다음 데모에서 보이는 것처럼 페이지의 끝까지 스크롤하면 텍스트가 글자 단위로 표시됩니다.

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_74.png](/assets/img/StartingtowriteCSSin2023willbedifferent_74.png)

ViewTimeline를 사용하면 스크롤 뷰포트 내 요소의 움직임을 추적할 수 있습니다. 이는 IntersectionObserver가 요소를 추적하는 방식과 유사합니다. 아래 데모에서는 각 이미지가 스크롤 뷰포트에 들어간 순간부터 점차 나타나기 시작하여 중앙 위치에 도달할 때까지 나타납니다.

![StartingtowriteCSSin2023willbedifferent_75.png](/assets/img/StartingtowriteCSSin2023willbedifferent_75.png)

스크롤 기반 애니메이션이 CSS 애니메이션 및 Web Animations API와 함께 작동하므로 이러한 API가 제공하는 모든 이점을 활용할 수 있습니다. 이는 이러한 애니메이션을 메인 스레드에서 실행할 수 있는 능력을 포함합니다. 이제 몇 줄의 추가 코드만으로 메인 스레드 이외에서 실행되는 부드러운 애니메이션을 스크롤 작업에 의해 쉽게 구현할 수 있습니다. 무엇이 더 필요할까요?

<div class="content-ad"></div>

CSS를 통해 스크롤에 의한 애니메이션을 적용할 때, 스크롤바를 제어하는 탐색 메커니즘은 항상 DOM 트리를 위로 탐색하므로 스크롤의 조상 엔티티로 제한됩니다. 그러나 보통 애니메이션 효과를 추가해야 할 요소는 스크롤바의 자식 요소가 아니라 완전히 다른 서브트리에 위치한 요소입니다.

비조상 엔티티에 대한 명명된 스크롤 타임라인을 찾을 수 있도록 하려면 공유 부모에 timeline-scope 속성을 사용하십시오. 이렇게 하면 해당 이름으로 정의된 스크롤 타임라인이나 뷰 타임라인을 첨부하고 더 넓은 범위를 부여할 수 있습니다. 이러면 공유 부모의 모든 자식이 해당 이름의 타임라인을 사용할 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_76.png)

공유 부모에 timeline-scope를 선언한 후에는 스크롤바에 선언된 스크롤 타임라인을 animation-timeline의 요소로 사용할 수 있습니다.

<div class="content-ad"></div>

요즘에는 그것을 이루기 위해 순수한 CSS만 사용하면 됩니다. CSS 스크롤 캡처, 사용자 정의 속성 및 스크롤에 반응하는 동적 그래픽을 결합하여 Parallax 스크롤 애니메이션 효과를 달성할 수 있습니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_77.png)

위의 예제에는 반응형 기능도 있습니다. 브라우저 화면 크기를 768px 미만으로 줄이면 페이지가 전체 화면을 스크롤할 수 있고 Parallax 효과가 더욱 두드러집니다:

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_78.png)

<div class="content-ad"></div>

# 👁️ 이산 속성 애니메이션

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_79.png" />

2023년의 또 다른 새로운 기능은 display: none과 display: block 사이와 같은 이산 속성을 애니메이트할 수 있는 능력입니다. Chrome 116부터는 키프레임 규칙에서 display 및 content-visibility를 사용할 수 있습니다. 0% 대신 50%에서 이산 속성을 전환할 수도 있습니다. 이는 transition-behavior 속성의 허용된 이산 값을 사용하거나 transition 속성의 축약형으로 달성할 수 있습니다.

transition-behavior 속성값으로 허용된 이산을 사용하면 이산 속성에 일부 스무스한 전환을 허용합니다. 이는 이산 속성에 전환을 적용하기에 더 유연하게 만듭니다. 이것은 허용된 이산 모드를 사용하면 갑작스럽게 변경되는 대신에 이산 속성에 대해 스무스한 전환을 구현할 수 있습니다. 이것은 전환을 이산 속성에 적용해야 하는 상황에 매우 유용하며, 이를 통해 이러한 속성에 보다 부드러운 애니메이션 효과를 만들 수 있습니다.

<div class="content-ad"></div>

```js
@레이어 전환 {
    .카드 {
        전환: 불투명도 0.25초, 표시 0.25초;
        전환-동작: 허용-이산;
    }
    .페이드-아웃 {
        불투명도: 0;
        표시: 없음;
    }
}
```

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_80.png" />

더 자세한 이산 속성 애니메이션 소개를 원하시면 "Web Animation Journey"에서 "프레임 애니메이션 및 전환 애니메이션: 비즈니스 시나리오에 더 나은 방법은 무엇인가요?"를 읽어보세요!

# 👁️ @starting-style

<div class="content-ad"></div>

![Image](/assets/img/StartingtowriteCSSin2023willbedifferent_81.png)

@Starting-style는 새로운 CSS @ 규칙으로, display: none을 사용하여 요소의 표시와 숨김을 부드럽게 애니메이션하는 데 새로운 웹 기능을 사용합니다. 이 규칙은 브라우저가 페이지에서 요소를 열기 전에 "before-open" 스타일을 찾아주는 방법을 제공합니다. 이는 인트로 애니메이션에 유용하며, 팝업 또는 대화상자와 같은 요소를 애니메이션하는 데 사용할 수 있습니다. 또한 요소를 만들고 애니메이션을 적용하고 싶을 때도 사용할 수 있습니다. 다음 예시는 popover 속성을 사용하여 뷰포트 바깥에서 부드럽게 보여지도록 만들어 상위 레이어로 이동하는 애니메이션을 보여줍니다.

```js
/*   IS-OPEN STATE   */
dialog[open] {
    translate: 0 0;
}
/*   EXIT STATE   */
dialog {
    transition:
        translate 0.7s ease-out,
        overlay 0.7s ease-out,
        display 0.7s ease-out allow-discrete;
    translate: 0 100vh;
}
/*   0. BEFORE-OPEN STATE   */
@starting-style {
    dialog[open] {
        translate: 0 100vh;
    }
}
```

![Image](/assets/img/StartingtowriteCSSin2023willbedifferent_82.png)

<div class="content-ad"></div>

@starting-style에 대한 자세한 정보는 웹 애니메이션 여정에서 Frame Animation vs. Transition Animation: 귀하의 비즈니스 시나리오에 더 적합한 것은 누구인가요?를 참조하세요!

# 👁️ 오버레이

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_83.png)

새로운 CSS 오버레이 속성을 transitions에 추가하여 popover 및 dialog 등의 최상위 스타일을 가진 요소가 최상위 애니메이션에서 부드럽게 이동하도록 할 수 있습니다. 오버레이 transitions을 사용하지 않으면 요소가 즉시 잘려 변환되거나 덮어쓰여, 전환 과정이 표시되지 않습니다. 마찬가지로 최상위 요소에 오버레이를 추가하면 ::backdrop도 부드럽게 애니메이션화됩니다.

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_84.png](/assets/img/StartingtowriteCSSin2023willbedifferent_84.png)

If you’re interested in entry and exit animations, or want to make a smooth entry and exit animation, see @Una Kravets and @Joey Arhar’s tutorial [Four new CSS features for smooth entry and exit animations](link to the tutorial).

# 👁️ Anchor Positioning

![StartingtowriteCSSin2023willbedifferent_85.png](/assets/img/StartingtowriteCSSin2023willbedifferent_85.png)

<div class="content-ad"></div>

CSS 앵커 위치 지정(CSS Anchor Positioning)은 웹 페이지에서 요소를 위치시키는 새로운 방법입니다. 이는 CSS의 새로운 기능입니다. W3C 명세서는 다음과 같이 설명하고 있습니다: "앵커 위치 지정(anchor() 및 anchor-size() 함수를 통한 앵커 위치 지정을 통해, 절대 위치 지정된 요소는 페이지의 다른 하나 이상의 요소와 연결될 수 있으며, 겹침과 오버플로우를 피하기 위해 최적의 위치를 찾기 위해 여러 가지 가능한 위치를 시도할 수 있습니다".

간단히 말하면, CSS 앵커 위치 지정은 요소의 절대 위치 지정 능력을 개선합니다. 웹 개발자는 요소 사이의 관계를 더 간편하고 자연스럽게 정의할 수 있어서 페이지 요소를 포함 블록 내의 다른 요소의 위치와 크기에 따라 배치하고 조절할 수 있게 됩니다. 이 기능의 등장으로 웹 개발자는 더 많은 제어와 유연성을 갖게 되면서 JavaScript에 대한 의존성이 줄어들어 페이지 성능이 최적화됩니다.

CSS 앵커 위치 지정은 웹 레이아웃에서 새로운 위치 지정 패러다임을 제공하며 요소들이 서로 연결될 수 있는 일련의 속성과 값들을 도입합니다.

- 먼저, anchor-name을 사용하여 앵커 지점을 정의하고, 표시된 요소가 절대 위치 지정의 기준 대상 역할을 합니다
- 두 번째로, 위치하려는 요소의 내장 속성(top, right, bottom, left 또는 이와 동일한 논리적 동등)의 값으로 anchor() 또는 anchor-size() 함수를 사용합니다.
- 마지막으로, @position-fallback 규칙을 사용하여 앵커 위치 지정에 대한 예비 메커니즘을 제공합니다. 즉, 더 복잡한 웹 레이아웃에 적응하기 위해 여러 가지 다른 앵커 위치 지정 규칙 집합을 설정합니다.

<div class="content-ad"></div>

과거에는 라바 램프 메뉴 효과를 달성하기 위해 JavaScript 스크립트에 의존해야 했습니다. 이제 CSS 앵커 위치 지정을 사용하여 이를 달성할 수 있습니다. 예를 들어:

![image](/assets/img/StartingtowriteCSSin2023willbedifferent_86.png)

CSS 앵커 위치 지정에 대해 더 알고 싶다면, 모던 CSS에서 웹 레이아웃의 차세대를 탐색하는 CSS Anchor Positioning을 읽어보세요!

# 👁️ 애니메이션 컴포지팅

<div class="content-ad"></div>

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_87.png" />

W3C 명세는 CSS 합성 애니메이션을 다음과 같이 설명합니다:

대략적으로 말하면, "animation-composition 속성은 여러 애니메이션이 동시에 동일한 속성에 영향을 미칠 때 사용되는 복합 연산을 정의합니다."

다시 말해, CSS 애니메이션 합성 (animation-composition)은 여러 CSS 애니메이션 효과를 동시에 동일한 속성에 적용하고, 이러한 애니메이션을 어떻게 결합하여 속성 값에 영향을 미치는지를 제어하는데 사용됩니다. 이를 통해 한 요소에 동시에 여러 애니메이션 효과가 작용할 때 애니메이션 성능을 더 유연하게 제어하고, 속성 값의 오버레이 및 교체를 포함한 복잡한 애니메이션 효과를 만드는 웹 개발자들에게 단일 애니메이션 규칙에 의존하지 않고 더 많은 제어를 제공합니다.

<div class="content-ad"></div>

더 자세한 애니메이션-합성 소개를 원한다면 "웹 애니메이션 여행"에서 "다중 CSS 애니메이션 및 애니메이션 합성: 더 복잡한 애니메이션 효과 생성하기"를 참고하거나 "CSS 애니메이션 합성: animation-composition"에서 "모던 CSS"를 읽어보세요!

# 👁️ Slowdown 함수 linear()

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_88.png" />

이 함수의 이름에 혼동되지 마십시오. linear() 함수(linear 키워드와는 다릅니다)는 일정한 정밀도를 희생하면서도 간단한 방법으로 복잡한 이징 함수를 만들 수 있게 해줍니다.

<div class="content-ad"></div>

Chrome 113에서 발표된 linear()가 도입되기 전에는 CSS에서 바운스나 스프링 효과를 만드는 것이 불가능했어요. linear() 덕분에 이러한 이징 함수들은 간단히 점들의 시리즈로 단순화한 다음 이들 사이를 선형 보간함으로써 근사될 수 있게 되었어요.

이러한 이징 곡선들은 애니메이션을 더 다이나믹하고 무겁고 등등 만들어 줍니다. 그리고 이들은 애니메이션을 현실 세계의 물체의 움직임에 더 가깝게 만들어 줍니다.

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_89.png)

<div class="content-ad"></div>

더 자세한 linear() 함수 소개는 '웹 애니메이션 여정에서 멋진 애니메이션 곡선을 만드는 데 linear() 함수 사용하기'를 참조하십시오!

# 👁️ 스크롤 끝 이벤트

많은 인터페이스에는 스크롤 상호작용이 포함되어 있으며 때로는 인터페이스가 현재 스크롤 위치와 관련된 정보를 동기화하거나 현재 상태를 기반으로 데이터를 추출해야 할 수도 있습니다. scrollend 이벤트 이전에는 사용자의 손가락이 화면에 여전히 있는 경우 트리거될 수 있는 부정확한 타임아웃 방법을 사용해야 했습니다. scrollend 이벤트를 사용하면 사용자가 여전히 제스쳐 작업을 수행하는지 확인할 수 있는 정확한 타이밍의 scrollend 이벤트를 구현할 수 있습니다.

<img src="/assets/img/StartingtowriteCSSin2023willbedifferent_90.png" />

<div class="content-ad"></div>

브라우저에 매우 중요한 사항이죠. 스크롤 중에는 JavaScript가 화면에서 손가락의 존재를 추적할 수 없어 관련 정보를 얻을 수 없습니다. 이제 브라우저가 소유한 고정밀 이벤트로 부정확한 스크롤 종료 시도 코드를 많이 제거하고 대체할 수 있게 되었습니다.

# 💯 스크롤 캡처

![이미지](/assets/img/StartingtowriteCSSin2023willbedifferent_91.png)

사실, 스크롤 캡처는 2023년에 새로 지원되는 기능만이 아닙니다. 그럼에도 이 기능을 이 글에 포함시킨 이유 중 하나는 사용자 경험을 개선하는 데 많은 도움이 되기 때문입니다. 정말 유용하고 쉽게 사용할 수 있는 기능이죠.

<div class="content-ad"></div>

CSS 스크롤 캡처는 사용자가 문서를 스크롤하는 동안 특정 지점(위치)으로 문서를 스크롤하는 방법을 제공합니다. 이는 특정 유형의 응용 프로그램(예: `Carousel` 조각)에 대해 더 나은 애플리케이션과 같은 경험을 제공하기 위해 도움이 됩니다. 모바일 기기와 심지어 데스크탑에서도 유용합니다. 간단히 말해, CSS 스크롤 캡처는 다음과 같은 기능을 제공합니다:

- 스크롤할 때 어색한 위치로 스크롤되는 것을 방지합니다.
- 더 나은 스크롤 경험을 만듭니다.

CSS 스크롤 캡처와 관련된 속성은 CSS 플렉스박스와 그리드 속성과 유사하며, 컨테이너(스크롤 컨테이너)에 작용하는 속성과 위치 지정된 하위 항목(스크롤 컨테이너 하위 요소)에 작용하는 속성으로 나뉩니다. 스크롤 컨테이너에 작용하는 속성은 주로 scroll-snap-type, scroll-padding 및 scroll-snap-stop이 있으며, 위치 지정된 하위 항목에 작용하는 속성은 주로 scroll-margin 및 scroll-snap-align이 있습니다.

이제 스크롤 캡처를 스크롤을 기반으로 한 애니메이션 및 사용자 정의 스크롤 막대와 결합하여 아래에 표시된 것처럼 3D 커버 효과를 얻을 수 있습니다. 이를 위해 어떠한 JavaScript에도 의존하지 않습니다.

<div class="content-ad"></div>

![StartingtowriteCSSin2023willbedifferent_92](/assets/img/StartingtowriteCSSin2023willbedifferent_92.png)

알아두어야 할 것은 스크롤 캡쳐 외에도 사용자의 스크롤 경험을 개선하는 다른 방법이 있습니다. 자세한 내용은 "CSS가 스크롤 경험을 개선하는 방법"을 참조해주세요. "Defensive CSS Insights"에는 "아름다운 스크롤바 UI: 사용자 정의 스크롤바 UI"와 "CSS 스크롤링 캡쳐"에 대한 정보가 있습니다!

# 지난 문제들의 검토

우선, 내 의견으로는 2023년에 CSS 기능의 가장 빠르게 발전하는 부분인 이전에 소개된 내용입니다! 또한 위에서 소개한 내용 중 일부는 방금 출시된 Chrome 팀의 "CSS Wrapped: 2023!"에서 발췌되었지만, 구성 요소 소개를 포기했습니다. 주로 이 부분이 HTML과 더 관련되어 있기 때문입니다.

<div class="content-ad"></div>

2020년부터 매년 새로운 CSS 기능에 관한 요약 기사를 게시하는 버릇이 있어요. 과거 콘텐츠에 관심이 있다면 아래 기사들을 읽어보세요:

- 2020년 CSS의 새로운 기능은 무엇일까요?
- 웹의 다음 세대에 적용된 스타일
- 2021년에 알아두면 좋은 CSS 기능들
- 2022년 CSS
- 2023년 CSS

CSS에 관심이 있는 경우 브로셔도 팔로우해보세요.

![StartingtowriteCSSin2023willbedifferent_93.png](/assets/img/StartingtowriteCSSin2023willbedifferent_93.png)

<div class="content-ad"></div>

- "모던 웹 레이아웃": 웹 레이아웃에 사용할 수 있는 모던 CSS 기능에 중점을 둡니다.
- "모던 CSS": 주로 CSS 분야의 최신 기능에 대해 이야기하며, 이 책에서는 앞서 소개된 기능이 주로 찾아볼 수 있습니다.
- "웹 애니메이션 여행": 웹 애니메이션을 만드는 방법을 주로 설명하는데, 이론부터 디자인 원칙, 실무까지 알려줍니다. 애니메이션을 좋아하면 이 책 내용을 정말 좋아할 것입니다.
- "방어적 CSS 집중 과정": CSS를 작성할 때 '만약을 대비하며' 써야 한다는 마음가짐으로 작성해야 한다는 점을 중점으로 설명합니다. 이 책은 CSS 문제를 해결하는 데 도움이 많이 되는 CSS 기술 모음집이라고 할 수 있습니다.

# 끝을 장식하는 글

CSS는 지난 몇 년 동안(특히 2023년에는) 큰 성공을 거두었습니다. CSS에 관심이 있다면, 또는 이 분야의 기술을 향상시키고 시급한 CSS의 최신 기능을 습득하고 싶다면, 저를 팔로우해주세요! 다양한 CSS를 경험하러 데려다 줄게요!
