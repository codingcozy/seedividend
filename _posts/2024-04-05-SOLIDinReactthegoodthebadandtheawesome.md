---
title: "리액트에서의 SOLID 좋은 점, 나쁜 점"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "SOLID in React the good, the bad, and the awesome"
link: "https://medium.com/itnext/solid-in-react-the-good-the-bad-and-the-awesome-79d6cc518d1f"
isUpdated: true
---

자바스크립트 개발자인 당신을 위해 간단히 SOLID 원칙을 소개해드릴게요. 만약 SOLID 원칙이 무엇인지 잘 모르신다면, 아래 내용을 먼저 읽어보세요.

정확히 얘기하자면, 이미 이 주제에 대해 작성된 다양한 기사들이 있음을 잘 알고 있습니다. 거기서 얻을 수 있는 정보를 대부분 접해봤기 때문에요. 제가 이 글을 쓴 이유도 바로 그 때문입니다. 저는 그 기사들에서 제공된 정보에 동의하지 않는 부분이 있습니다. 문제는 대부분의 기사에서 SOLID 원칙의 위대함과 멋진 점들만 언급되고, 가능한 단점이나 주의할 점들은 말하지 않는다는 점이죠. 이게 리액트 애플리케이션에 적용 가능한지, 이야기를 나눠봐야 할 부분입니다. 지금부터 바로 그 내용에 대해 이야기해보도록 할게요. 계속 읽어주세요!

# S장: 단일 책임 원칙

첫 번째 원칙은 대체로 이해하기 쉬운 편입니다: 당신의 컴포넌트는 단일 책임을 가져야 합니다. 다시 말해, 이 컴포넌트가 존재하는 이유는 단 하나여야 합니다.

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

그러나 '소비 모드'에서 머리를 전환하여 생각해 본다면 즉시 한 가지 문제를 알 수 있을 겁니다. 애플리케이션의 비단말 컴포넌트가 서브트리의 루트이기 때문에 몇몇 컴포넌트가 여러 책임을 갖게 될 확률이 거의 100%입니다. 예를 들어서 해당 컴포넌트는 다섯 개의 자식을 갖고 있고 이 중 세 개의 상태를 제어합니다. 여러분의 루트 App 컴포넌트가 원칙을 심각하게 위반하고 있다고 확신합니다!

그렇다면 어떻게 해야 할까요? 단일 책임 원칙을 경험적으로 찾아 적용하는 방법은 무엇일까요? 주의 깊게 살펴보면 두 그룹의 컴포넌트를 발견할 수 있을 것입니다. 즉, 단일 책임 원칙을 염두에 두고 설계하기 쉬운 컴포넌트 그룹과 다수의 책임(혹은 제어권)을 가진 어떤 종류의 조율자들입니다. 그들을 스마트/덤 컴포넌트 또는 컨테이터/프레젠테이셔널 컴포넌트라고 부를 수 있고, 이 분류를 인정하기만 한다면 관계는 중요하지 않습니다.

나는 그들을 관리자와 작업자로 부르며, 간단한 규칙을 도입함으로써 모든 애플리케이션 컴포넌트가 단일 책임 원칙을 존중할 수 있다고 주장합니다! 이를 정의해보겠습니다:

- 관리자는 작업자의 일을 하지 말아야 합니다. 다시 말해, 그들의 유일한 책임은 작업자(또는 다른 관리자)를 관리하고 조합하는 것이어야 합니다.
- 작업자는 비즈니스 로직을 인식해서는 안 되며, 일을 관리자가 아닌 다른 작업자에게 위임해야 합니다.

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

한 번 두 가지 규칙에 대해 생각해 봅시다. "매니저는 워커의 일을 하지 말아야 한다"는 무슨 의미인가요? 이것은 매니저가 자체 JSX 콘텐츠를 가지지 말아야 한다는 것을 의미합니다. 매니저가 반환하는 것은 워커 및/또는 다른 매니저들로만 구성되어야 하며, 간단하게 말해서 자체 HTML 요소를 가지지 말아야 한다는 것입니다. 그 결과 매니저들은 스타일링할 것이 없기 때문에 CSS도 없을 것입니다. 매니저는 애플리케이션의 (자바)스크립트 부분을 대표한다고 안심할 수 있습니다. 비즈니스 로직을 모두 가지고 있으며 대부분의 사용자 상호 작용을 제어합니다.

"비즈니스 로직을 알지 못해야 하는 워커"에 대해서는 어떤가요? 여기서는 그 반대입니다! 워커들은 모든 콘텐츠와 스타일링(또는 애플리케이션의 HTML 및 CSS 부분)을 가지고 있으며 매우 적거나 전혀 자바스크립트를 가지고 있지 않습니다. 그들 자신의 격리된 존재를 위해서만 필요합니다.

![SOLIDinReactthegoodthebadandtheawesome_0.png](/assets/img/SOLIDinReactthegoodthebadandtheawesome_0.png)

여기서 스타일링에 대한 매우 중요한 주의사항이 있음을 언급해야 합니다. (여기에 포함하려고 하기에는 너무 큰) 이런 문제 때문에 나중에 "스타일링이 React 앱을 파괴하는 방법"과 같은 제목의 다른 기사가 있을 수도 있고 없을 수도 있습니다.

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

또한, Worker가 작업을 관리자에게 위임할 수 없다는 사실은 Worker의 하위 요소로 Manager가 될 수 없다는 것을 의미하지는 않습니다. 이러한 내용은 마지막 장에서 다룰 예정이에요 😉

# 장 O: 개방/폐쇄 원칙

이 원칙은 쉽게 이해할 수 있는 정의를 갖고 있어요: 컴포넌트는 확장에 대해 열려 있고 수정에 대해 닫혀 있어야 합니다. 그러나 확장과 수정의 차이를 이해하는 것이 쉽지 않을 수도 있어요. 컴포넌트 자체의 관점에서는 모든 확장이 수정이라고 볼 수 있어요. 따라서 이 원칙은 외부 소비자의 관점에 순전히 의존한다는 것을 알 수 있죠.

이것이 익숙하게 느껴질 겁니다! 이 원칙은 역호환성의 근간이며, 실제로 어디서나 적용됩니다. 웹 API 및 디자인 트렌드는 항상 발전할 것이며, 컴포넌트의 발전이 필요할 때는 언제나\*\* 기존 소비자를 고려해야 합니다. 간단한 예를 통해 실전에서 개방/폐쇄 원칙을 살펴보겠습니다:

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

당신은 아이콘을 제공한다면 버튼 컴포넌트를 생성하도록 지시받았고, 그렇게 만들었어요:

어느 날, 제품 디자이너가 "친구야, 아이콘이 오른쪽에 있도록 한 버튼이 필요해!" 라고 말했을 때, 당신은 어떻게 행동하시겠어요? 한번 멈춰서 생각해보세요.

이 새로운 동작을 달성하는 방법은 여러 가지가 있습니다. 예를 들어, 기본값이 왼쪽/시작인 iconPlacement라는 새로운 prop을 도입하여 아이콘의 위치를 제어할 수 있습니다. 소비자들이 행복하다면 이에 반대하지 않겠지만, 저는 실제로 두 개의 새로운 prop을 소개하고 하나는 폐기하는 것을 선호합니다.

이것이 '개방/폐쇄 원칙'이 무엇이며 React 애플리케이션에서 어떻게 구현하는지 조금은 명확해졌으면 좋겠어요. 이 원칙이 마법같은 해결책이 아니라는 점을 유의해주세요 (힌트: 모든 것이 그렇지요) 그리고 확장은 불가피하게 큰 파일을 야기하며 어느 시점에서는 역효과를 낳을 수 있습니다. 때때로 구성 요소를 확장하고 그것들의 서브 유형을 만들어 나가는 방향을 선택할 수도 있습니다.

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

이 컴포넌트에서 잠재적인 문제점을 발견할 수 있나요? 발견하지 못했다고 하셔도 걱정하지 마세요. 다음 장에서 그에 대해 이야기할 거에요.

# L 장: 리스코프 치환 원칙

리스코프 치환 원칙은 공변성에 기반을 둡니다: 어떤 슈퍼 타입을 해당 서브 타입으로 대체할 수 있어야 합니다. 컴퓨터 과학 수업을 듣지 않은 사람들에게는 이름이 좀 이상하게 들릴 수 있어요. 타입 A를 확장하여 새로운 타입 B를 만든다면, 타입 B를 A의 서브 타입, A를 B의 슈퍼 타입이라고 부르는 것은 직관적이지 않을 수 있지만, 그게 바로 내용입니다. 기억하세요, 컴퓨터 과학에서는 나무도 아래로 자라요.

그러면 IconButton 컴포넌트에서 어떤 실수를 했을까요? IconButton은 theButton 컴포넌트를 확장하므로 다시 말해서 theButton의 서브컴포넌트입니다. 이제 두 개의 질문이 있습니다. 첫 번째 질문은 이미 추측했을 것이고, 두 번째 질문은 좀 까다로울 거예요:

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

- theButton 구성 요소의 모든 발생을 서브 타입 구성 요소인 IconButton으로 대체할 수 있을까요?
- 이러한 대체를 하는 것이 합리적일까요?

첫 번째 질문에 대한 답은 "아뇨!" theButton 구성 요소의 icon 속성을 생략함으로써 Liskov 치환 원칙을 효과적으로 위반했습니다. IconButton 구성 요소는 오히려 "고아(child)"이며, Button의 클래식 서브 타입이 아닙니다. 두 타입은 독립적이고 상호 대체할 수 없거나, 멋진 기술 용어를 사용해서 말하자면 서로에게 불변적입니다.

두 번째 질문에 대한 답도 "아뇨!" 처음부터 서브 타입을 만들 의도가 전혀 없었기 때문에 IconButton이 Button을 대체하도록 만들어지지 않았습니다.

이것은 프로그래밍에서 구성(Inheritance) 대비 상속(Composition)의 훌륭한 예입니다: Liskov 치환 원칙은 상속을 기반으로 하고 React는 구성을 기반으로 합니다(나중에 알게 될 것입니다). React가 구성을 토대로 한다는 사실은 상속에 자리가 없다는 것을 의미하는 것은 아닙니다. 사실, 위의 Button 구성 요소를 살펴보면 의도적으로 두 가지 중요한 기능을 활성화시켜 HTMLButtonElement의 서브 타입으로 만들었습니다:

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

- `React.PropsWithChildren`을 확장합니다: 콘텐츠를 허용합니다.
- `React.HTMLAttributes<HTMLButtonElement>`를 확장합니다: 속성을 허용합니다.

Button 컴포넌트가 Liskov 대체 원칙을 존중하기 때문에 여러분은 애플리케이션에서 button HTML 요소의 모든 발생을 안전하게 이 컴포넌트로 대체할 수 있기 때문에 정말 좋은 계획이었어요.

그럼 IconButton도 Liskov 대체 원칙을 존중하게 하지 않는 이유가 뭘까요, 라고 물을 수도 있어요. 당연히 가능하지만 곧 여러분의 코드는 불필요하게 복잡하고 여러 걸 바꿨을 때 인생에 많은 드라마를 추가할 수 있는 복잡한 구성 요소 목록이 될 거예요.

React 앱 개발을 진행 중인 초보자라면, 저는 이 원칙을 무시하라고 조언하고 싶어요. React에 익숙하다면 항상 시작 전에 이 질문을 던져보세요: "이 컴포넌트가 기본 컴포넌트 또는 확장하는 요소를 대체하도록 의도된 건가요?" 만약 그렇다면, props, children, 속성, ref를 적절하게 전달하여 Liskov 대체 원칙을 준수하세요. 그렇지 않다면 — 하지 마세요!

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

# 제1장: 인터페이스 분리 원칙

만약 내가 따를 만한 SOLID 원칙 중 하나를 눈 감고 따라야 한다면, 아무런 질문 없이 따를 것이 바로 '인터페이스 분리 원칙'이겠죠. 컴포넌트는 사용하지 않는 속성에 의존하면 안 된다는 원칙입니다.

처음에는 이 원칙이 너무나 당연한 것처럼 보일 수 있습니다. 컴포넌트가 사용하지 않는 속성을 왜 도입해야 할까요? 올바른 린터 구성을 사용하면 고의로 그렇게 할 수조차 없을 텐데요, 그렇다면 무슨 함정이 있는 걸까요?

이 원칙의 함정은 재귀적인 성격에 있습니다. 다음 컴포넌트를 생각해 보십시오:

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

먼저, 여기에는 사용되지 않는 속성이 없는 것처럼 보입니다. 우리는 사용자를 사용하고 있고 이것이 우리가 가지고 있는 유일한 속성입니다. 그러나 재귀적으로 User type은 이 컴포넌트에 꼭 필요하지 않은 email, id 등 여러 사용되지 않는 속성들을 끌어와요. 여기서 인터페이스 분리 원칙이 위반됩니다. 이는 앞서 Worker 컴포넌트에 대한 토론과 밀접한 관련이 있습니다. 그들은 비즈니스 로직을 인식해서는 안 된다는 것입니다. 사실, 그들은 외부의 어떤 것도 인식해서는 안 된다고 주장할 수 있습니다 (항상 가능한 것은 아닙니다).

수정해 봅시다!

변경된 부분을 분석해 봅시다. 우리가 한 가장 중요한 일은 첫 번째 예제의 3번 라인에서의 import를 제거한 것입니다. 이렇게 함으로써 우리는 사실상 UserAvatar를 User 인터페이스와 분리했으며, 이로써 컴포넌트의 재사용성을 크게 향상시켰습니다. 사실, 이제 "User"에 대한 언급조차 제거했습니다. 이제 우리 펫들도 아바타를 가질 수 있어요! 😻

# 장(D): 의존성 역전 원칙

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

이제 우리의 마지막 장을 준비해주세요. 한 번뿐인, 리액트 구성의 대부, 모든 원칙의 근원 - 의존성 역전 원칙을 환영해주세요! 공식적인 정의는 처음에는 이해하기 어려울 수 있습니다. 또한 두 부분으로 이루어진 유일한 SOLID 원칙입니다:

무겁게 들릴지 모릅니다. 의존성 역전 원칙은 내가 아름다운 소개로 언급했듯이, 물론 전용 기사를 가지고 있는 만큼 제법 자리잡고 있습니다. 리액트에 관해서 이야기할 때, 좋은 소식과 나쁜 소식을 전해드릴게요:

좋은 소식: 당신은 의도치 않게 기본적으로 의존성 역전 원칙을 사용하고 있습니다!

나쁜 소식: 당신은 의도치 않게 기본적으로 의존성 역전 원칙을 사용하고 있습니다!

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

그러니까, 이 원리를 해체하고 React의 모든 기초인 이 가장 강력한 SOLID 원칙을 주의 깊게 살펴보자. 이름을 분석하기부터 시작해보겠습니다: 어떤 종속성인가요? 제 컴포넌트에서 사용하는 외부 코드(모듈, 패키지, 함수, 훅, 컴포넌트 등)입니다.

이 종속성은 정확히 두 가지 방식으로 '내 영토'에 나타날 수 있습니다:

- Import: 해당 모듈에서 가져옵니다.
- Injection: 매개변수(또는 프롭)로 전달됩니다.

Import는 내가 거의 또는 전혀 제어할 수 없는 직접적인 종속성입니다. 만약 해당 종속성이 행동을 바꾼다면 큰일납니다.

Injection은 역종속성입니다: 전달받은 것에 의존하지만, 어떤 것을 전달할 지 제어할 수 있습니다 - 프롭 인터페이스라는 추상화를 통해요.

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

의존 역전 원칙이 단일 책임 원칙과 인터페이스 분리 원칙과 얼마나 긴밀하게 관련되어 있는지 유념해 주세요. 앞서 나온 badUserAvatar 예제에서 컴포넌트가 비즈니스 로직을 인식해서는 안 된다고 언급한 기억이 나시나요? (즉, Worker 역할을 해서는 안 된다는 것); 또한 컴포넌트가 필요하지 않은 속성/정보를 전달해서는 안 된다고 했었죠. 그리고 이제 의존 역전 원칙은 이 컴포넌트가 나쁜 이유를 세 번째로 더하고 있습니다 — 직접 의존성을 만들고 있다거나, 다른 말로, 저희의 추상화 (AvatarProps)가 세부사항 (User)에 의존하는 것입니다.

두 번째로 가장 중요한 점은 의존 역전이 우리 컴포넌트에서 함수를 전달하는 데서만 발생하는 것이 아니라는 것입니다. 사실 React에서 이 원칙에 관한 예제는 모두 이벤트 핸들러에 대해 이야기하지만, 의존 역전으로 가능해지는 가장 중요한 것을 간과하고 있습니다. 버튼 컴포넌트를 다시 쓰고 있는데, 이 부분에 주목할 수 있는지 확인해 보세요:

그러니까, onClick이 명백한 부분입니다: 이를 내장된 상태로 처리할 수 없습니다. 그렇게 하면 단일 책임 원칙을 위반하게 되고, 직접 가져올 수도 없습니다. 이곳에서 의존 역전 원칙을 위반하게 됩니다. 여기서 의존성 주입의 다른 예시들을 볼 수 있나요? 자식 요소에 대해서는 어떻습니까? 전달되었나요? 맞습니다! 그들의 유형을 제어하고 있나요? 맞습니다! 그리고 이제 이 장의 정점입니다:

이것이 첫 장에서의 작업자가 관리자보다 컴포넌트 트리에서 더 높게 배치될 수 있도록 만드는 것입니다. 그들의 의존성은 역전되고, 결국 그들은 실제로 무엇을 포함하고 있는지 인식하지 않고 컨테이너로 효과적으로 변화하며, 그것 때문에 단일 책임 원칙을 위반하지 않게 됩니다.

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

이제 "모든 것이 React에서는 구성(composition)"이라는 약속으로 돌아 가 봅시다. React에서 children을 전달하는 방법은 다른 것이 아닙니다. 프로퍼티로 예약 된 children을 사용하여 좀 더 자연스럽게 데이터를 전달할 수 있게끔 다시보세요:

컴포넌트 A와 B는 동일하지만, 유일한 차이점은 JSX 관점에서 children을 사용하여 컴포넌트로 데이터를 전달 할 수 있다는 것 입니다.

이제 타입 구분에 대해 이야기해 봅시다. ReactNode | undefined 타입은 별도의 규칙이 아니라 단순히 React가 충돌 없이 작업 할 수있는 가장 일반적인 타입입니다. 하지만 우리는 타입을 제어할 수 있다는 사실을 기억하세요. 그래서 위의 섹션을 다시 작성하여 타입을 좁히겠습니다:

React에서 구성은 children 프로퍼티에 대하여에만 예약되어있지 않습니다. 응용 프로그램을 어떤 프로퍼티 이름으로도 구성할 수 있으며, ReactNode 타입에만 예약되어있지 않습니다. 응용 프로그램을 어떤 프로퍼티 타입으로도 구성할 수 있습니다. 모든 것이 React에서는 구성입니다.

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

리액트의 관점에서만 본 의존성 역전 원칙은 다른 것이 아닌 책임을 부모로 올리는 것입니다. 이는 우리가 첫 장에서 논의한 관리자/작업자 패턴을 고려할 때 전체적으로 이치에 맞다는 것을 의미합니다. 하지만, 단일 책임 원칙과 마찬가지로, 소비에서 생각으로 마지막 한 번 전환하면 다시 큰 문제를 알 수 있을 것입니다. 무한히 책임을 올릴 수는 없다는 것이죠. 다시 말해, 애플리케이션은 최소한 하나 이상의 관리자 구성요소가 필요하며, 이게 한 개뿐이라면 실제 세계와 마찬가지로, 이 가난한 사람이 갖게 될 수 있는 책임의 수준과 양을 상상해볼 수 있습니다. 이는 가독성과 추론 관점에서 절대적으로 재앙을 초래할 것입니다.

구성요소들을 분리함으로써 제공하는 놀라운 이점과 안정성에도 불구하고, 의존성 역전 원칙을 따르다가도 어느 시점에서는 구성을 멈춰야 하며, 관리자 구성요소가 그런 역할을 하는 좋은 장소로 보입니다. 가능한 한 의존성 역전 원칙을 따르는 것이 좋지만, 다시 말해 애플리케이션 내 관리자 구성요소의 수를 최소화하고, 관리자들이 과부하가 될 때만 기능을 분리하는 것이 좋습니다. 예를 들어 새로운 Next.js 프로젝트를 시작하면, 라우트당 두 개의 관리자(layout.tsx 및 page.tsx)가 있게 될 것입니다. 나중에 페이지에 많은 기능이 있는 경우 각 기능에 대한 관리자 구성요소를 도입하여 page.tsx를 간소화할 수 있습니다.

그러면 여기까지! 다행히도 'SOLID'에서 더 이상의 글자는 없으며, 끝내 이 긴 힘든 글 쓰는 과정을 중단할 수 있습니다. 전반적으로 내 결론은 객체 지향 프로그래밍에서 비롯된 것임에도 불구하고, SOLID 원칙은 리액트 앱 개발에 매우 적용 가능하며, 이를 알고 있으면 많은 코드를 디폴트로 쓰는데 실제로 이러한 기본 원칙에 기반하고 있다는 것을 인지할 가치가 있다는 것입니다.

조금이나마 설명이 도움이 되었으면 좋겠습니다. 만약 도움이 된다면, 세상과 공유해주시면 감사하겠습니다.

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

## 각주

- - 컴포넌트의 진화는 항상 소비자를 존중해야 하는 것은 아닙니다. 일반적인 접근 방식은 컴포넌트를 라이브러리로 그룹화하여 버전 관리를 하는 것입니다. 이로 인해 파괴적인 변경을 도입할 수 있습니다.
- \*\* 이것은 목적에 따른 과장된 단순화로, 실제 해결책은 forward ref를 사용하고 className을 override하지 않도록 하는 것입니다.
- \*\*\* 나는 Dan Abramov가 인기를 얻은 표현적/컨테이너 대신 매니저/워커 명명을 선호하는 이유입니다. "포함"이라는 것은 반드시 "제어"를 의미하는 것은 아니기 때문입니다.
