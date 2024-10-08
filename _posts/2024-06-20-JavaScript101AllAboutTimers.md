---
title: "자바스크립트 101 타이머에 대해 알아보기"
description: ""
coverImage: "/assets/img/2024-06-20-JavaScript101AllAboutTimers_0.png"
date: 2024-06-20 04:10
ogImage:
  url: /assets/img/2024-06-20-JavaScript101AllAboutTimers_0.png
tag: Tech
originalTitle: "JavaScript 101: All About Timers"
link: "https://medium.com/bitsrc/javascript-101-all-about-timers-cec07db55b86"
isUpdated: true
---

## 타이머는 사용 방법을 알고 있다면 강력한 도구가 될 수 있어요

![JavaScript timers](/assets/img/2024-06-20-JavaScript101AllAboutTimers_0.png)

자바스크립트 타이머는 주기적인 동작을 달성하거나 지연된 작업을 트리거하는 데 훌륭한 도구입니다.

어떤 시간 기반 논리를 가지고 있던, 타이머가 답이 될 거예요.

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

하지만 그들이 어떻게 작동하는지 완전히 이해하지 못한다면, JavaScript로 만들어진 벽에 머리를 맞추게 될 거예요.

가용한 타이머들과 그 작동 방식을 살펴보겠습니다.

# 타이머에 대해 기억해야 할 주요 사항

타이머의 세부사항에 대해 깊이 들어가기 전에, 타이머에 대해 기억해야 할 중요한 몇 가지 사항이 있어요.

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

## 정확하지는 않아요

타이머는 일정한 시간 후에 작업을 트리거하거나 지정된 시간이 지날 때마다 작업을 반복합니다.

하지만 여러분이 엄밀히 1초마다 정확하게 작동한다고 기대할지도 모릅니다. 그러나 실제로는 그렇지 않습니다.

이러한 타이머의 사양에 따르면 시간 매개변수(즉, 지정한 시간(초) 수)를 최소 대기 시간으로 사용할 것이라고 명시되어 있지만, 다른 작업이 먼저 완료되어야 할 경우에는 더 긴 시간이 소요될 수 있습니다.

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

정확한 시간 측정에 의존하는 로직, 예를 들어 setInterval 콜백으로 초를 세는 시계가 있을 때에만 문제가 될 수 있습니다.

이 점을 염두에 두고 타이머를 사용한다면 안전합니다.

## 비동기 함수들입니다

즉, 이들은 완료될 때까지 프로그램 흐름을 멈추지 않습니다. 타임아웃 값을 0으로 지정해도 그들의 동작은 여전히 비동기적일 것입니다.

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

이 함수들은 원하는 함수에 대한 참조를 이벤트 루프에 추가하므로, 타임아웃 값에 0을 지정해도 해당 참조는 그 다음에 오는 모든 작업 이후에 예약됩니다.

# setTimeout 이해하기

setTimeout 함수는 아마도 가장 이해하기 쉬운 함수일 것입니다. 주된 목적은 일정 시간 후에 함수를 트리거하는 것입니다.

이 함수는 다음을 받습니다:

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

- 실행할 함수에 대한 참조입니다. 시간이 지나면 트리거될 코드입니다.
- 함수가 실행되기 전의 초 단위의 숫자입니다.
- 그 외의 모든 매개변수는 동일한 순서로 실행된 함수로 전달됩니다.

따라서 다음 코드는 3초 후에 "Hello World"를 출력합니다:

이 작업이 작동하는 이유는 console.log 함수가 받은 모든 매개변수를 연결하고 문자열을 출력하기 때문입니다.

그러나 대신 다음과 같은 것이있는 경우 어떻게 됩니까:

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

14번 줄은 작동하지만, 16번 줄은 동작하지 않습니다. 이는 호출된 함수의 실행 컨텍스트가 변하기 때문입니다. 사실, 전역 범위로 변경됩니다. Node에서는 global, 브라우저에서는 window 입니다.

두 경우 모두 함수의 this가 변경되므로, 16번 줄이 실행될 때 this.c에 대한 참조가 더 이상 존재하지 않습니다.

따라서 이 문제를 해결하려면 다음과 같이 간단히 wrapper 함수를 만들 수 있습니다:

16번 줄에 추가한 wrapper 익명 함수에 주목해 주세요. 이제 익명 함수가 두 매개변수와 함께 호출될 때, 해당 함수 내에서 바로 c.log를 call 메서드로 호출합니다 (모든 함수에 있는 메서드입니다). 우리는 call 메서드를 사용하는데, 이는 익명 함수에 의해 수신된 인수를 직접 log 메서드로 전달하기 때문입니다. 우리는 동적 방식으로 이동하고 있기 때문에 call을 사용하지 않고는 이 작업을 수행할 수 없습니다.

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

익명 함수에 하드 코딩된 매개변수가 있다면 다음과 같이 log 메서드를 직접 호출할 수 있습니다:

setTimeout은 특별한 종류의 비동기 함수이므로 그 이후에 작성하는 모든 코드가 해당 함수가 트리거되기 전에 실행됩니다:

해당 코드의 출력은 다음과 같습니다:

![이미지](/assets/img/2024-06-20-JavaScript101AllAboutTimers_1.png)

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

세트 타임아웃에서 9번째 줄이 타임아웃이 0인데도 마지막으로 실행된다는 것에 주목해 보세요.

## 그리고 한 가지!

setTimeout에 대해 다시 한 번 살펴보기 전에, 타임아웃 값을 설정하고 실행을 중단해야 하는 경우에는 어떻게 해야 할까요? 실행되기 전에 타이머를 중지하려면 반환된 값(타이머 ID)을 저장하면 됩니다.

그 값은 clearTimeout 함수와 함께 사용하여 타이머가 트리거되기 전에 중지할 수 있습니다.

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

이전에 있던 코드를 편집해봅시다. 이번에는 첫 번째 타임아웃을 제거해 보겠습니다:

위 코드를 사용하면 첫 번째 타이머가 코드를 실행하기 전에 제거되어 문자열 "Third! (1)"이 출력되지 않을 것입니다.

하지만 만약 이 타이머를 제거하는 대신에 몇 초마다 반복하도록 하고 싶다면 어떻게 해야 할까요? 그런 경우 setTimeout은 한계가 있고, 그의 형제인 setInternval을 사용할 수 있습니다.

# setInterval 이해하기

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

setInterval 함수는 setTimeout과 매우 유사하지만, 함수를 한 번만 트리거하는 대신 그 함수를 멈출 때까지 계속해서 실행합니다.

이 함수의 시그니처는 setInterval과 정확히 동일하며, 모든 매개변수에 대한 설명도 동일합니다.

트리거된 함수 내에서 this의 컨텍스트에 대한 제한 사항도 마찬가지입니다. 해결책 또한 동일하게 래퍼 함수를 사용하는 것입니다.

위 코드는 1초마다 실행되는 루프를 시작하며, 실행될 때마다 무작위 이름이 선택되어 "Hello `name`" 문자열이 출력됩니다.

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

뿐만 아니라, 무한 루프를 4초 후에 타임아웃하여 clearTimeout 함수를 호출하여 종료하는 타임아웃을 설정하고 있습니다. 물론 clearInterval 함수도 있지만, 동일한 타이머 풀을 사용하기 때문에 서로 교차하여 사용할 수 있습니다.

타이머는 반복적이거나 지연된 동작을 생성하는 훌륭한 도구이며, 특히 일정 시간 기반 조건하에서 다른 서비스와 상호 작용해야 할 때 유용합니다.

타임아웃과 간격 모두 clear\* 함수를 사용하여 트리거되기 전에 중지할 수 있습니다. 돌려받은 함수 호출 ID를 유지했다면 언제든지 가능합니다.

JavaScript에서 타이머에 대해 더 궁금한 사항이 있으신가요? 댓글에 질문을 남겨주시면 최선을 다해 답변해 드리겠습니다!

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

# 리고처럼 재사용 가능한 컴포넌트로 앱을 개발하세요

![JavaScript 101](/assets/img/2024-06-20-JavaScript101AllAboutTimers_2.png)

Bit의 오픈소스 도구는 25만 명 이상의 개발자들이 컴포넌트로 앱을 개발하는 데 도와줍니다.

어떤 UI, 기능 또는 페이지든 재사용 가능한 컴포넌트로 변환하고, 여러 애플리케이션에서 공유할 수 있습니다. 협업이 쉽고 개발 속도도 빨라집니다.

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

→ 더 알아보기

앱을 컴포넌트로 분할하여 앱 개발을 더 쉽게 만들고, 원하는 작업 흐름에 대한 최상의 경험을 즐기세요:

## → 마이크로 프론트엔드

## → 디자인 시스템

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

## - 코드 공유 및 재사용

## - Monorepo

# 자세히 알아보기
