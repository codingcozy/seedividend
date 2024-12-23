---
title: "Atomic CSS의 깨진 약속 기대와 현실 비교분석"
description: ""
coverImage: "/assets/img/2024-07-09-ThebrokenpromiseofatomicCSS_0.png"
date: 2024-07-09 18:25
ogImage:
  url: /assets/img/2024-07-09-ThebrokenpromiseofatomicCSS_0.png
tag: Tech
originalTitle: "The broken promise of atomic CSS"
link: "https://medium.com/@hayavuk/the-broken-promise-of-atomic-css-4d3de5e25886"
isUpdated: true
---

## (그다지 숨겨지지 않는) 아토믹 CSS의 숨은 비용

![이미지](/assets/img/2024-07-09-ThebrokenpromiseofatomicCSS_0.png)

무엇을 몰라서 죄악을 저지르는 것은 아닙니다. 결국 우리 모두는 어디선가 시작해야 합니다. 안타깝게도 오늘날의 웹은 순진한 사람들을 위한 많은 함정을 포함하고 있습니다. 사실, 이러한 함정은 10년 이상 전부터 존재합니다. 어떤 사람들은 무지함으로, 어떤 사람들은 자만심을 충족시키기 위해 그렇게 합니다. 그들의 이유에 관계없이, 그들은 당신에게 필요하지 않고 오히려 코드에 해로운 것을 판매합니다.

최근 웹 스크래핑 프로젝트를 진행했습니다. 처음에는 남의 코드를 보는 것이 재미있었고, 웹의 나쁜 코드 역사 전체를 다시 살펴볼 수 있는 기회인 줄 알았습니다. 그러나 이것이 금세 질려버렸습니다. 안 그래도 웹은 좋지 않은 코드로 가득 차 있습니다! 스크레이퍼의 작업을 어렵게 만드는 것이 꼭 나쁜 일이 아니라면, 현재 일반적으로 진행되는 방식대로 일을 하는 것에는 정말로 아무 혜택도 없습니다. 없습니다.

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

HTML은 (대부분 불필요한) 클래스로 가득 차 있고, 해당 웹사이트의 비의미론적인 div 소스에서 요소를 선택하기 어렵습니다. HTML과 CSS를 보면 아마도 사람들을 설득하지 못하지 않을까요. 바닐라 JavaScript를 사용해 본 경험이 없다면, 아마 저또한 이해할 수 없습니다. 그들이 더 큰 문제를 안고 있기 때문이죠. 여기서 접근성에 대해서는 아직 논하지도 않았습니다.

가장 나쁜 것은 분명 원자적인 CSS 및 최신 구현인 Tailwind, Atomizer, StilifyCSS 등입니다.

원자적 CSS와 Tailwind에 매료되어 있다면, 당신은 CSS와 HTML을 최대한 활용하지 않을 가능성이 높습니다. 다시 말해, CSS와 HTML을 알고 있다고 생각할 수는 있지만 사실은 그렇지 않습니다. 당신은 단지 그것들의 구문(그리고 아마 몇 가지 대안)을 알 뿐입니다. 그러나 구문을 알고 언어를 활용할 수 있는 능력은 다른 문제입니다. 정말 그렇습니다.

하지만 내가 비난하려는 것은 아닙니다. 오해하지 마세요. 만약 당신이 매우 멍청하다고 생각했다면, 왜 전문가들이 발표한 이 아이디어에 대한 전체 기사를 써야 하는지 궁금할 터입니다. 사실, 이러한 아이디어를 팔아드리는 "전문가"가 결코 그렇게 못생긴것은 아니며 때로는 고급 회사에서 일하기도 합니다. 아마도 아직 이러한 아이디어가 얼마나 어리석은지에 대해 말해주는 사람과 함께 일한 경험도 없을 테니까요. 그건 당신의 잘못이 아닙니다.

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

# 일부 배경

일부 배경부터 알아봅시다. 그냥 배경이 아니라 역사 말이에요.

HTML에서 모든 스타일을 처리한다는 아이디어는 새로운 것이 아니에요. 사실, 이 아이디어는 CSS보다 먼저 나왔어요. CSS가 1996년에 도입될 때, 그것은 웹을 괴롭히던 의미론적이고 프레젠테이션 태그들의 혼합을 고치기 위한 것으로 의도되었어요. 아이디어는 간단해요: HTML은 의미론적 문서 구조에 집중하고, CSS는 프레젠테이션에 집중합니다. 어떤 것인지에 대한 내용은 HTML에서 다루고, 어떻게 보이는지에 대한 내용은 CSS에서 처리하는 거죠 (특정 장치에서). 오늘날의 브라우저에서도 여전히 작동하는 다음과 같은 코드로부터 시작합니다:

```js
<center>
  <p>This text is centered.</p>
</center>
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

다음과 같이 변경하십시오:

```js
<p id="intro">이 텍스트는 가운데 정렬되어 있습니다.</p>
```

그리고 두 번째 파일을 링크하여 다음과 같이 넣어주세요:

```js
#intro {
  text-align: center;
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

주어진 분리를 달성하기 위해 CSS는 HTML 요소 및 요소 컬렉션을 설명하는 풍부한 구문을 제공했습니다. 이를 통해 HTML을 수정하지 않고도 HTML을 부풀리지 않고 비의미론적 정보인 선택기를 사용할 수 있었습니다. 이것은 CSS 파일을 교체함으로써 동일한 문서에 완전히 다른 모양을 줄 수 있다는 것을 의미합니다. CSS Zen Garden은 동일한 콘텐츠에 다양한 디자인이 적용된 이 아이디어를 보여줍니다.

이 분리는 CSS 파일을 로드하는 동안 HTML이 로드/구문 분석될 수 있게 함으로써 추가적인 혜택을 가져왔습니다. 또한, 캐시된 스타일을 여러 페이지에서 재사용할 수 있는 능력 등이 있었습니다.

아이디어와 의도는 한 가지이지만, 실제 적용은 보통 다르다고 볼 수 있습니다.

대부분의 웹 개발자들은 예전에도 페이지의 시각적 측면에 주로 집중했습니다. 이것은 특히 웹 디자이너(현재 UX 디자이너로 불림)가 별도의 역할이 되었을 때 두드러졌는데, 이는 시각적 외관을 전문으로 하는 비프로그래머 역할이었습니다. 페이지의 시각적 측면에만 집중하는 웹 개발자들은 보통 HTML의 의미론을 무시하고 HTML을 사용하여 페이지를 "디자인"했습니다. 그들에게는 HTML이 스타일이 적용된 요소들의 모음을 나타낸다는 생각이었습니다 — 이들이 문서에서 하는 역할은 주로 CSS 선언을 적용하기 위한 것으로, 콘텐츠와 CSS 간의 접착제 같은 역할을 한 것입니다. 이것이 "스타일링된 컴포넌트" 같다고 느껴진다면, 그 이유는 그게 바로 이 아이디어의 확장이기 때문입니다.

이는 "클래스 기반 CSS"의 등장으로 이어졌습니다. 이 글을 작성할 때 사용한 용어인 "클래스 기반 CSS"는 클래스를 선언 블록의 레이블로 사용합니다. 스타일 재사용은 상속을 통해 가능하며, 객체지향 프로그래밍(OOP)의 상속과 유사합니다. 예를 들어, 모든 버튼에 .button 베이스 클래스가 적용되고, 그런 다음 특정 버튼에 .button-cta와 같은 더 특수한 버전이 적용됩니다.

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
.button {
  background: blue;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.button-cta {
  font-size: 120%;
  background: red;
  color: yellow;
}
```

이 접근 방식은 "진짜" 프로그래밍 언어에서 온 사람들에게는 더 익숙하게 느껴질 것으로 상상합니다 (CSS가 상상력인 것처럼). 그러나 이 접근 방식은 함께 적용해야 하는 변형을 도입할 때 복잡해집니다. 객체 지향 프로그래밍(OOP)에서는 절대 마주치지 않는 상황입니다. 예를 들어:

```js
.button-disabled {
  background: grey;
  color: silver;
}
```

.button-disabled와 .button-cta가 동시에 적용되어야 한다면 CSS에 나타나는 규칙의 순서가 중요합니다. .button-disabled가 .button-cta보다 먼저 나타나면 원하는 효과를 얻지 못합니다 (-disabled가 -cta보다 우선해야 한다고 가정할 때). 이 간단한 경우에는 규칙을 다시 정렬함으로써 문제를 해결할 수 있지만, 복잡한 응용 프로그램에서는 이런 식의 단순한 해결책이 드물게 나타납니다.

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

이 규칙들이 동일한 파일에 없을 때 상황은 더 복잡해집니다. 그리고 그 순서를 세밀하게 조정하는 것이 불가능하다면 더 복잡해집니다. 때로는 선택기 명확성을 높이려는 시도로 (.button.button-disabled과 같이) 또는 절박한 경우에는 !important를 사용하기도 합니다. 그리고 -disabled 버전에서 스타일을 재정의해야 할 필요가 있다면 어떨까요? 이는 특히 우리가 대부분의 (때로는 복잡한) 코드를 제어하지 못하는 Bootstrap과 같은 인기있는 CSS UI 프레임워크와 관련된 상황에서 특히 사실입니다.

그 이슈들을 해결하기 위해 다양한 방법들이 개발되어 왔습니다. 특히 BEM 네이밍 스키마, atomic CSS (2013년부터의 Tailwind의 선례), 그리고 컴포넌트 기반 코드 구성의 등장과 함께 나타난 scoped CSS와 CSS 모듈, CSS-in-JS 등이 가장 주목할 만합니다.

이러한 수많은 도구 지원 및 비도구 지원 방식으로 시도한 해결 방법들이 다루려고 시도하는 것은 궁극적으로 CSS 자체의 문제가 아니라 CSS 사용 방식의 주류에 있는 문제이며, 모두 - 예외 없이 - 여전히 class 기반 CSS로 분류됩니다. 또한 모두 class 기반 접근 방식과 관련된 하나 이상의 문제를 겪습니다. 특히 atomic CSS (그리고 대부분의 scoped CSS 구현)은 몇 가지 주장되는 이점을 위해 분리를 의도적으로 희생함으로써 표현과 문서 구조 사이의 매우 강한 결합 때문에 주목할 만합니다.

# 왜 atomic CSS인가?

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

Atomic CSS는 (CSS-in-JS 이전에) 산업이 CSS 자체 이후로 본 것 중 가장 급작스럽다는 아이디어일 것입니다. 그 이상한 점은 CSS에 대한 견해를 뒤집고 거의 CSS 이전의 HTML과 똑같은 것을 하였다는 점입니다— 너무 분명히 보이지 않아도 될 정도로요. 이 발명가는 의도적으로 CSS로 도입된 분리를 희생하여 일부 다른 이점을 얻으려고 했습니다 ("CSS 파일을 편집하고 싶지 않다"가 아니에요. atomic CSS가 개발된 이유가 아니에요).

주장되는 주요 이점은 선택자를 컨텍스트에서 독립적으로 만들어 UI 요소를 더 쉽게 이식할 수 있다는 것입니다. 즉, HTML을 이동시키면 해당 CSS를 수정할 필요가 없다는 점입니다. 왜냐하면 선택자는 요소가 무엇인지나 문서의 어디에 위치하는지에 따라 의존하지 않기 때문이에요. 이것은 좋은 것처럼 들릴 수 있지만, 나중에 그게 실제로 그렇게 유용하지 않은 이유를 알려줄게요.

이 발명가는 안정적인 클래스 이름, 선택자 그룹화하지 않는 등의 다른 이점들도 언급하는데, 이들은, 최선의 경우에는 CSS 코딩이 잘못된 개발자들을 대상으로 하거나, 최악의 경우에는 완전히 임의로 설정된 것입니다 ("선택자 그룹화는 더 많은 CSS를 생성한다"는 것은 내 경험상 아무 의미도 없어요). atomic CSS의 일부 "이점"은 브라우저 기술의 발전에 의해 더 나은 것에 밀려났습니다 (예: RTL vs LTR).

atomic CSS의 핵심은 Tailwind와 같은 후속 버전을 고려하면, HTML 내에서 CSS를 대체 구문을 사용하여 코딩해야하며, HTML을 이동시키더라도 CSS를 변경할 필요가 없지만, 이를 통해 CSS에게 표현에 대한 독점적인 제어를 희생한다는 것입니다.

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

# 임의로 뭐라 그런 거야?

먼저 “임의” 부분에 대해 얘기해볼게. 2013년 기사에서 발명가의 말을 그대로 인용한 후, 왜 각 부분이 임의적이라고 생각하는지 설명할게.

이 주장은 터무니없어. CSS는 표현을 기술하는 거야. 어떤 UI 요소의 외관을 바꾸면 CSS를 수정해야 해. 항상 새로운 규칙이 필요한가? 물론 아니지. 그건 오직 기존 요소에 새로운 변형을 추가하거나 CSS를 잘못 사용하는 경우에만 해당돼. "모듈"이란 단어가 문제의 실마리를 제공하는 것 같지만, 내가 거기에 있지 않았으니 확신할 순 없어.

나는 그들이 어떻게 작동하는지 모르겠지만, 이것 또한 규칙이 아니야. 그저 당시 사용한 클래스 기반 CSS로 발명가가 관찰한 것 뿐이야. 선언 블록에 여러 선택자를 추가해도 CSS가 증가하는 건 아니야. 선택자를 "더 많은 CSS"로 간주한다면 어쩔 수 없지만, 언제나 환영해. 더 파워를 받을게.

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

마크업에서 필요한 것은 테이블 태그를 편집할 때이며, 일반적으로 CSS에서 모든 변경 내용이 제한된다는 것입니다. 'atomic CSS'를 사용하면 HTML에서 변경 사항이 발생합니다. 클래스 명 자체는 변경되지 않지만 class 속성의 내용을 편집해야 합니다. 안정적인 클래스 명에 대한 논의는 상당히 무의미합니다. 안정적인 클래스 명을 가지고 있다고 해서 atomic CSS의 경우에 아무 유용한 도움이 되지 않습니다. display 또는 position과 같은 CSS 속성명이 결코 변경되지 않는다고 주장하는 것과 같습니다—완전히 쓸모 없는 주장입니다.

그리고 여기 테일윈드에서 나온 현대적인 주장이 있습니다:

HTML과 CSS가 청결하게 분리되어있지 않기 때문에 이 전환이 발생하는 것입니다. 이겪이를 옳게 분리하면, HTML 또는 CSS 중 하나에서 작업하게 되지만 둘 다 동시에 작업하는 일은 드뭅니다. 가끔씩—드물게—HTML에 들어가서 여기에 클래스를 추가하거나 어떤 부가적인 래퍼 요소를 추가하는 정도입니다. 그러나 반면에 페이지의 외관을 작업하는 동안 HTML을 계속 수정해야 한다면, 경험이 부족한 상태일 수도 있고 (그래도 괜찮아요, 모두 처음에 시작할 때가 있죠, 내 말이죠.), HTML 작업을 올바르게 수행하지 않거나 CSS의 확장으로 취급하고 있을 가능성이 높습니다(이는 괜찮지 않습니다, 알아차리셨나요?).

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

# 그리 무작위한 주장?

하나의 주장은 어느 정도 이치에 맞을 수 있습니다. 그리고 그것은 다음과 같습니다:

다음 이유 때문에 이것이 이루어진 것으로 알려져 있습니다:

캡슐화하는 이유는 물론 완전히 무작위적입니다. 언제나 적용되는 규칙이 아닙니다. 나는 맥락별 셀렉터를 여러 번 사용해왔고, 그로 인해 유지보수에 제약이 생기거나 재사용을 방해한 적이 없었습니다. 그러나 캡슐화가 허용하는 속성은 타당합니다. 이는 scoped CSS (CSS 모듈, CSS-in-JS)에서 반복되는 아이디어입니다.

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

정말 유용한 것과 실제로 쓸모 있는 것은 두 가지 다른 것입니다.

문맥별 규칙은 이러한 규칙입니다:

```js
.hero > .button {
  font-size: 160%;
}
```

이것은 .hero 요소 내에서만 .button 요소를 선택합니다. 버튼을 .hero 요소 바깥으로 이동하면 스타일이 적용되지 않습니다. 원자 클래스를 요소에 직접 넣으면, 이렇게 주장합니다:

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
<button class="fs-160">지금 눌러주세요</button>
```

그러면 이 버튼을 어디로 이동하더라도 항상 동일하게 보입니다.

표면적으로는 이것이 논리적으로 들리고 혜택이 있는 것처럼 들립니다. 그러나 이에는 두 가지 문제가 있습니다.

첫째로 이런 행동을 정말 원한다면 요소에 id나 클래스를 간단히 붙이고 어떤 문맥에서든 이를 선택할 수 있습니다. 이를 이동할 때 직접 스타일을 적용한 것과 정확히 동일하게 작동합니다. 다시 말해, atomic CSS는 이미 할 수 있는 것이 없습니다.

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

둘째, 이 속성에서 항상 혜택을 받을 가능성이 매우 낮습니다. 예를 들어 버튼은 페이지의 특정 영역에 있을 때에만 글꼴 크기를 키울 필요가 있다는 반론이 제기될 수 있습니다. 제작자가 이전에 하던 방식보다 이 원자적 CSS 속성이 유익하다고 판단한 문제에는 의심의 여지가 없지만, 그 때 함께하지 않았기 때문에 어떻게 이러한 특정 문제에 대처하고 해결책이 개선될 것인지 확신할 수 없습니다. 유일하게 희망할 수 있는 것은 나중에 이에 마주쳐 더 나은 해결책을 찾을 수도 있다는 것입니다. 😎

(테일윈드(Tailwind) 포함한) 원자적 CSS를 사용하는 유일한 실제 혜택인 스타일 캡슐화가 의미 있는지(도구로 이용하는 것만을 가진다? 나도 그렇게 봐)에 대한 의문이 들 때, 여러분은 왜 이를 위해 모든 희생을 하고 새로운 언어를 배우는 걸까요? 저에게는 깨진 약속이 가득한 도시처럼 들립니다.

# 그렇다면 대안은 무엇인가요?

실제 문제는 우리가 전혀 대안이 필요한지 여부입니다. 사람들이 한 번이라도 CSS를 의도대로 사용하려 시도해볼만 한 경우, 아마 저처럼 “우리는 이렇게 여러 년/개월/일 동안 잘못된 접근을 했었구나”라고 결론 지을지도 모릅니다. 그리고 CSS에는 처음부터 깨진 부분이 없었던 것이 아니었을까요. 아무리 이러한 프레임워크/기술/라이브러리 저자들이 말하고 싶어 해도 말이죠. 아마 제가 2013년에 이 주장을 할 때 더 많은 어려움을 겪었을지 모릅니다 — 정말 기억이 나지 않네요 — 하지만 오늘날엔 이 주장을 편안하게 할 수 있는 문제가 전혀 없습니다.

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

다음은 무엇을 의미하는지 보여 드리겠습니다.

클래스 기반 버튼 예제를 이렇게 변환할 수 있습니다:

```css
button {
  background: blue;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: grey;
  color: silver;
}

#hero > button {
  font-size: 120%;
}

#hero > button:not(:disabled) {
  background: red;
  color: yellow;
}
```

스스로 해 보세요. 이 선언 블록의 순서를 섞어보세요. 대부분의 경우에는 그렇게 중요하지 않다는 것을 알 수 있을 것입니다. 예를 들어, 이는 유지보수에 더 좋습니다. #hero 선택기는 시간이 지나도 매우 변할 가능성이 적으며, 다른 선택기도 변할 가능성이 거의 없습니다. 따라서 안정적인 선택기를 갖고 있습니다.

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

몇 가지 요소, 예를 들어 :not() 가상 클래스는 2013년에는 존재하지 않았지만, 이제 모든 주요 브라우저에서 지원되므로 자체 코드와 충돌하지 않는 CSS를 작성하는 것이 이제는 더욱 쉬워졌습니다.

CSS의 의도된 사용법입니다.

CSS가 원자적 CSS(또는 Tailwind)보다 더 많은 줄을 가지고 있습니까? 그렇습니다. 하지만 HTML에서의 코드 양이 더 적습니다.

원자적 CSS를 사용한 이 마크업을 고려해보세요.

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
<section id="hero">
  <button class="bg-grey c-silver fs-120 cr-pointer" disabled>
    여기를 클릭하세요
  </button>
</section>
```

CSS 부분은 상상해보세요. 일반 버전의 HTML과 비교해보면:

```js
<section id="hero">
  <button disabled>여기를 클릭하세요</button>
</section>
```

그리고 원자적인 CSS로 인한 HTML 부풀림은 오늘날 사람들이 작성하는 CSS의 문제 중 하나입니다. 모든 전환, 애니메이션, 호버 효과, 포커스 효과가 슈퍼 간결한 문법으로 클래스 속성에 밀어 넣어진다는 점은 좀 CSS 같지만 정작 그렇지 않은...

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

그리고 "컨텍스트-프리" 주장에 대해 다시 강조하고자 합니다.

일반 CSS를 사용하여 어떤 버튼 요소든 어디론가 이동시키면 당연히 영향을 받지 않습니다. 버튼:disabled 요소를 이동시켜도 마찬가지로 영향을 받지 않습니다. 이러한 선택자들은 이미 컨텍스트에 속해 있지 않아서 컨텍스트-프리입니다. 외곽자(outer wrapper) 요소로 이동하거나 빠져나가는 버튼만이 컨텍스트에 따라 모양이 변합니다. 버튼이 그렇게 동작하기를 원하나요? 실제로 원합니다! 웹 디자이너 출신으로 말씀드리면—죄송합니다, UX 엔지니어 출신으로 말씀드리면—이것은 멋지고 환영받을 기능입니다! 버튼의 특별한 모양은 해당 컨텍스트에 따라 달라집니다. 버튼을 이동할 때마다 CSS/클래스를 편집하는 일은 지루할 것입니다.

그리고 코드를 재사용하고 싶을 때의 이야기는 더 신기해집니다.

예를 들어 페이지에 세 개의 버튼이 있다고 가정해 봅시다.

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

버튼
첫 번째
두 번째
세 번째

CSS의 비 원자 버전은 이미 작동합니다. 재사용성 측면에서는 어떠신가요!

그럼 원자 버전은 어떨까요?

버튼
첫 번째
두 번째
세 번째

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

음, 그것은 일부 코드 재사용이네요, 그렇죠? 그럼, 이 상황에서 원자적 CSS 팬들은 무엇을 말할까요? “그것은 당신이 컴포넌트나 부분 템플릿을 사용하지 않아서 그렇다고요. 당신의 코드는 다른 부분에서도 삭감된 것처럼 부풀어 있을 거라고 확신합니다.” 음, 전 잘 모르겠어요. 여러분이 제게 말해주세요. 제가 코드를 재사용하는 데 컴포넌트가 필요하지 않다는 건데, 아마 뭔가 놓친 게 있나봐요. 여러분은 잘 모르겠지만, 저는 코드를 WET하게 만드는 대신 다중 커서 능력을 더 의미 있는 일에 사용하는 게 좋아요.

아이러니한 점은, 원자적 CSS의 발명자가 코드의 부풀음을 없애려고 이것을 발명했다고 이는 매우 의미심장합니다…

# 가장 큰 문제

이제 분명한 부분은 처리했으니, 이렇게 보이지 않는 것들, 즉 암시적인 부분에 대해 이야기해보겠습니다.

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

아토믹 CSS는 "유틸리티 클래스"를 직접 작성하여 수동으로 처리할 수도 있고, 갖고 있는 클래스에 기반하여 그 작업을 대신해 주는 도구를 사용할 수도 있어. 아토믹 CSS가 처음에는 그렇게 인기가 없었던 이유는 도구의 부재 때문이라고 생각해. 예전에 시도해봤을 때 그 작업은 정말 지칠 정도로 지루했어!

이제는 Atomizer나 Tailwind와 같은 도구들이 있어. 하지만 어떤 도구든 사용하면 비용이 드는 법이야. 그런데 추가 비용은 공짜로 제공되는 것이 아니라, 무료로 받는다고 해서 일자리가 사라지는 것은 아니야. 단지 다른 곳으로 업무가 위임되었을 뿐이고, 대개 추가 작업을 생성하는 경우가 더 많아. 만약 물리학자 같은 척 하려면, “일은 창조되거나 파괴될 수 없고, 변환되거나 추상화될 뿐이다” 같은 걸 얘기할 수도 있지! 🤣

npm을 이용해 어떤 것을 설치하는 게 무료라고 스스로 속이는 것은 하지 말아야 해. 프로젝트 설정해야 할 시간, 보안 문제 주시해야 할 것, 업데이트 유지해야 할 것, 파이어폭스에서 변경 사항을 볼 수 있기 전에 취해야 하는 추가 단계 등이 비용으로 발생해. 때로는 도구에 맞게 코드를 (그리) 교묘히 수정하거나, 설정 파일을 유지해야 할 수도 있어. 배포를 복잡하게 만들 수도 있는데, 이제 파일들을 그대로 서버로 보내는 대신에 뭔가를 빌드해야 한다거나 하니까. 그런 것들을 “무료”라고 할 수는 없을 거야.

# 보너스 불평글소리

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

아, 제가 2013년에 발명된 원자 CSS가 1990년대의 아이디어를 내포하고 있는데도 "현대적"이라고 말하는 주장을 읽으며 얼마나 우울한지 언급했나요?
