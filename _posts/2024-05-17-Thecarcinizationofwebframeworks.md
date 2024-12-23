---
title: "웹 프레임워크의 유사발암화"
description: ""
coverImage: "/assets/img/2024-05-17-Thecarcinizationofwebframeworks_0.png"
date: 2024-05-17 03:25
ogImage:
  url: /assets/img/2024-05-17-Thecarcinizationofwebframeworks_0.png
tag: Tech
originalTitle: "The carcinization of web frameworks"
link: "https://medium.com/@toddledev/the-carcinization-of-web-frameworks-21f37acb268a"
isUpdated: true
---

프레임워크는 수렴 중입니까? 웹 개발 세계에서 발생하는 근본소생현상을 살펴보고, 과거를 향해 미래를 엿볼 수 있을까요?

![이미지](/assets/img/2024-05-17-Thecarcinizationofwebframeworks_0.png)

생물학적 과학에서 암화 변이란 게이물류 중 게 아닌 이놈들이 게처럼 보이는 형태로 진화하는 현상을 말합니다. 현재 웹 개발 세계에서도 비슷한 일이 일어나고 있는 것으로 보입니다. 웹 프레임워크는 마치 암화 변이 과정을 겪고 있는 것 같아요! — 분명히, 프레임워크는 진짜로 발톱이나 외골격을 개발하고 있는 것은 아니고, 대신 개념적으로 유사한 기능 집합으로 수렴해가고 있어서 점점 더 구별하기 어려워지고 있습니다 🦀 🦞

스포일러 경고: 저는 이론적으로 완벽한 프레임워크가 존재한다고 말하고 싶진 않아요. 각 프로젝트는 다르며, 다른 요구 사항은 새로운 솔루션과 도구를 요구합니다. 그러나 대부분의 프레임워크가 결국 채택하게 될 거의 완벽한 기능 세트가 존재할 수 있습니다. 이 기사에서 그것을 엿볼 수도 있을지 모릅니다.

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

# 어떻게 변했나요?

오래 전, JavaScript 프레임워크는 서로 완전히 다른 방식으로 작동했습니다. 사실, 이것이 대부분의 경우 그들의 주요 장점이었습니다: "웹 개발을 새롭고 더 나은, 그러나 대부분은 다른 방식으로 하는 새로운 방법". jQuery는 브라우저에 유틸리티를 추가하여 개발을 보다 빠르고 크로스 브라우저 친화적으로 만들기 위해 노력했습니다. Angular는 전체 객체지향 프로그래밍(OOP) 스위트를 웹으로 가져와서 확장 가능한 웹 앱을 구축하려고 했습니다. React는 함수형 원칙을 몇 가지 정교한 방법으로 사용하여 개발자가 함수와 합성만을 사용하여 웹 앱을 만들 수 있도록 제안했습니다. 다른 프레임워크들은 새로운 기반 위에 구축되었고, 일부는 단순히 기존 프레임워크를 더 빠르게, 작게 만들거나 서로 다른 아이디어를 결합하여 개선했습니다.

자연스럽게, 일은 진화했습니다... 🧬 어떤 프레임워크는 다른 것보다 더 많은 인기를 얻었습니다. 최고의 아이디어는 새로운 프레임워크뿐만 아니라 기존 프레임워크에도 통합되었습니다. AngularJS는 Angular 2로 중심을 옮겼습니다. 일부 OOP 값들을 제거한 간단한 버전입니다. Vue는 React의 후크를 구현했고, React는 함수를 선호하여 클래스 구성 요소를 버렸습니다. 심지어 한때 급부상한 것으로 여겨졌던 Svelte도 최근에 Runes(신호를 모방하는 것, Solid, toddle 및 Preact에서 볼 수 있음)를 구현했습니다.

그래서, 오늘 우리가 전반적으로 보는 특징들은 무엇일까요?

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

# 변경 불가능성 🪨

프로그래머들에게는 다소 논란이되는 주제입니다. 변경 불가능한 데이터 처리는 성능 대 개발자 경험(DX) 사이의 중요한 교역입니다. 간단한 변이마다 전체 객체와 배열을 복제하는 것은 처음에 낭비처럼 보이기 때문에 수년간 많은 사람들이 기본 설정이 아니었습니다. 그러나 변경 불가능성에 헌신함으로써 귀하의 앱은 초기 성능 최적화가 부족할 수도 있지만 버그를 적게 배포하고 개발 주기를 빠르게 할 수 있습니다. 그럼에도 불구하고, 변경 불가능성은 오늘날의 프레임워크에서 중심적인 요소가 되어서 언제 사용하지 않아야 하는지 종종 잊게 됩니다.

많은 프레임워크는 순수한 불변 데이터를 전달하는 것을 요구합니다. 참조를 수정하는 것은 위험하고 예측할 수 없는 부작용을 일으킬 수 있습니다. 그러나 변경 불가능성에서 분리하는 것은 항상 허용됩니다. 프레임워크가 모르는 것은 해칠 수 없습니다:

## 🐢 느리지만 완전히 변경 불가능합니다.

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

## 🐇 빠르지만 배열을 직접 변경합니다 😱

두 번째 예시는 훨씬 빠르며, 테스트 케이스를 작성하고 불변 코드를 순수 함수로 캡슐화하기 위해 함수로 래핑하는 한 완벽합니다.

# 데이터의 단방향 흐름 🌊

Angular 팀에 의해 처음 소개된 양방향 데이터 바인딩은 마법 같았습니다 🪄 너무 신비로운 것 같아요! ✨ 자식 구성 요소에서 데이터를 변경하면 부모가 자신을 업데이트하고 남아 있는 모든 자식도 업데이트할 수 있습니다 — 뭐가 안 좋을까요?

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

실제 예제에서는 종종 아무도 데이터를 실제로 소유하지 않는 스파게티 코드 🍝로 이어집니다. 진실의 근원이라고 할 수 있는 곳은 어디서나 동시에 존재하고 어디서나 존재하지 않았다. 어떤 것이 작동하지 않을 때 데이터를 손상시킨 사람을 찾을 수 없었습니다.

엄격한 단방향 데이터 흐름으로 데이터가 항상 단일 소유자를 가지도록 보장합니다. 무언가가 망가지면 데이터 흐름을 따라 가면 범인을 찾을 수 있어요 🕵️‍♂️ 이 강제적인 제한은 웹 개발자들을 괴롭히는 많은 문제를 해결했습니다. 하지만, 우리에게 코드를 명확하게 작성하도록 요구합니다. 오늘날 거의 모든 프레임워크는 데이터를 아래로 보내는 이벤트를 올리는 접근 방식을 따릅니다.

# 신호 ⚡

상태 관리는 프레임워크를 확장 가능하게 만드는 데 가장 중요한 개념입니다. 전역 상태 변수를 추가할 때마다, 최소한 이론적으로 존재하는 상태의 복잡성이 두 배로 증가합니다. 앱이 성장함에 따라 상태도 늘어나며, 어느 시점에서든 수십억 개의 가능한 상태에 있을 수 있습니다. 상태의 수가 급격하게 증가하면 앱을 개발하기 거의 불가능해집니다. 앱의 한 부분을 변경할 때 다른 곳에서 적어도 하나의 다른 것이 깨집니다.

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

상태 처리의 복잡성과 중요성을 고려할 때, JavaScript 프레임워크 간의 주요 차별 요소 중 하나로 상태 관리가 역사적으로 부상한 것은 놀라울 것이 없습니다. Angular는 수명 동안 여러 상태 시스템을 가졌고, Vue와 Svelte도 마찬가지입니다. React는 여러 시스템을 가졌으며 수천 개의 호환되는 상태 관리 라이브러리가 있습니다. 우리는 양방향 데이터 바인딩에서 옵저버블, 훅으로 이동했으며, 이제 다음으로 큰 열풍: 신호 ⚡

그러나 신호는 최신 유행에 그치지 않을 수 있습니다. 처음에는 신호를 이해하는 것이 까다로울 수 있지만, 놀랍도록 간단하며 코드 몇 줄로 구현할 수 있습니다. 신호는 세밀한 반응성을 지원하며 전역 상태 및 가장 작은 원시 데이터의 업데이트에 사용할 수 있습니다.

신호가 지금까지 너무 인기가 많아서 원래 채택이 제안되었다는 것을 알고 계셨나요? toddle은 세밀한 반응성과 뛰어난 성능을 달성하기 위해 사용자 정의 신호 구현을 활용합니다!

# 서버 측 렌더링 🌐

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

여러 해 동안, 프레임워크들은 자신들을 클라이언트 측만을 다루는 라이브러리로 자랑스럽게 소개했습니다. 웹사이트를 렌더링하기 위해 서버 코드를 작성할 필요가 없는 방법이었죠. 더 이상 PHP나 Java가 필요 없이, 간단한 JavaScript로만 작업할 수 있었습니다. 그러나 오늘날, 이러한 작고도 클라이언트 전용 라이브러리들은 전체 생태계로 성장하였고, - 여러분이 짐작했듯이 - 서버 측 렌더링(SSR)을 갖추는 것이 기대됩니다.

우리는 이제 모든 것이 다시 돌아왔다고 말할 수 있을 정도로 전환을 했습니다 🤦 다만, 이제는 종종 클라이언트 측 언어가 서버가 출력하는 내용을 지배하는 경우가 많습니다. 앱을 한 번 작성하고, 서버가 각 페이지의 초기 상태를 흉내내어 순수한 HTML, CSS, JavaScript로 다시 보내줍니다. NextJS와 같은 프레임워크에서는 심지어 서버에서 실행되는 서버 액션도 작성할 수 있습니다!

SSR은 SEO를 더 잘 지원하며 종종 더 빠른 첫 번째 페인트 시간을 제공해 인기를 끌고 있습니다. 요즘에는 SSR이 거의 모든 프로젝트에서 엄격한 요구사항이 되었습니다. Toddle은 또한 완벽한 SSR 지원을 제공하며, 웹페이지를 최적의 SEO를 보장하고 콘텐츠를 가능한 빨리 화면에 표시할 수 있도록 서버에서 복잡한 공식과 API를 실행할 수 있습니다.

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

프레임워크들은 이미 많이 통합되었지만, 아직 혁신할 여지가 있습니다. 저는 대부분의 프레임워크에서 복사, 향상되고 적용될 것으로 예측되는 분야에서 발생하는 흥미로운 개발 동향을 살펴보려고 합니다.

# 재개 가능성

재개 가능성(Resumability)은 서버 측 렌더링의 개선사항입니다. 애플리케이션이 초기 렌더링 프로세스를 처리하는 방법에 대한 진화를 나타내며, 성능과 사용자 경험을 향상시켜줍니다. 예를 들어, React Server Components와 같은 프레임워크들은 스트리밍 기능을 활용하여 컴포넌트를 점진적으로 클라이언트로 전달하여 사용자 경험을 향상시키는 방향을 택하고 있습니다. Qwik은 이 용어를 만들었으며 이미 탁월한 지원을 제공하고 있습니다.

재개 가능성은 미래에 더 중요한 기능으로 부상할 것으로 예상되며, 개발자들은 불가피하게 성능을 최적화하고 애플리케이션의 확장성을 향상시키려는 노력을 하게 될 것입니다. 인터랙티브한 웹 환경에서 애플리케이션을 최적화하기 위한 노력이 더욱 활발해질 것입니다.

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

# 웹 컴포넌트

웹 컴포넌트의 도입은 언제나 코앞에 있는 것으로 보입니다. 아마 영원히 예측일 수도 있지만, 최근에는 Declarative Shadow DOM 및 다른 사용자 정의 요소에 대한 브라우저 지원이 새롭게 추가되었습니다. 웹 컴포넌트는 여러 가지 이유로 환상적입니다. 하나의 프레임워크에서 컴포넌트를 작성한 다음 다른 앱에 문제없이 삽입할 수 있습니다! SolidJS는 1급 시민은 아니지만 웹 컴포넌트를 지원하며, 다른 많은 프레임워크도 일부 지원합니다. toddle에서는 컴포넌트가 웹 컴포넌트 스펙을 직접 상속받아 호환성이 다뿍 있으며 사실 웹 컴포넌트로 만들어집니다. toddle 컴포넌트는 별도 설정 없이 웹 컴포넌트로 내보낼 수 있습니다.

웹 컴포넌트가 주류가 되면, 모든 웹 개발자에게 다양한 개선 사항을 제공합니다:

- 비용 부담 없이 새 프레임워크를 시도하세요! 웹 컴포넌트 하나를 만들고 기존 사이트에 네이티브 요소로 구현할 수 있습니다. 프레임워크를 변경할 때 처음부터 다시 시작할 필요가 없습니다.
- 조직 내 각 팀이 원하는 프레임워크를 선택할 수 있습니다. 팀 간에 웹 컴포넌트 표준을 통해 통신하고 원활하게 조합할 수 있습니다.
- 웹 컴포넌트의 상속된 아일랜드 아키텍처는 toddle, solid 또는 Qwik로 만든 더 현대적인 앱으로의 유동적인 이동을 쉽게 만듭니다. 레거시 앱을 천천히 향상시키고 이전 사이트를 대체하며 섬이 퍼질 때마다 컴포넌트를 하나씩 변환할 수 있습니다.

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

# 덜 혼란스러운 세상 🌎

한동안 새로운 프레임워크가 매주 발표되는 것 같았어요. 아마 아직도 그렇겠지만, 새로운 프레임워크마다 이미 시험된 기본 기능에 수렴하고 있어서 우리가 이미 알고 있는 것과 매우 비슷해요. A 프레임워크를 알고 있다면, 거의 B 프레임워크도 알게 될 거예요. 문법과 일부 기능은 다를 수 있지만, 핵심 개념은 쉽게 적용될 거예요. 이미 React나 Vue를 알고 있다면, Qwik나 toddle도 시도해보세요. 그들을 배우는 것은 참 쉬운 일이에요.

덤으로, 프레임워크들이 수렴함에 따라 W3C 팀에겐 우리 브라우저가 가장 필요로 하는 기능들이 더욱 명백해졌어요. 극도로 인기가 많았던 jQuery의 거의 모든 기능이 현재 이 글을 읽고 있는 브라우저에 기본적으로 내장되어 있어요. 이제는 신호, 선언형 Shadow DOM 등과 같은 기능들도 마찬가지예요. 이러한 변화들은 프레임워크 전체를 다운로드할 필요없이도 프레임워크와 유사한 기능을 활성화할 것이에요. 아마도 마지막 프레임워크는 프레임워크가 아닌, 완전한 바닐라 브라우저 기능들일지도 모르겠네요. 🦀 toddle은 브라우저 능력에 대한 미래지향적 실험을 진행하는 데 흥분하고 있어요. 웹 개발에 참으로 흥미진진한 시기에요!

원문 출처: https://toddle.dev.
