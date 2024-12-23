---
title: "자바스크립트 공부 순수하고 불량한"
description: ""
coverImage: "/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_0.png"
date: 2024-06-20 02:44
ogImage:
  url: /assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_0.png
tag: Tech
originalTitle: "Javascript at the Nunnery: Pure , Undefiled"
link: "https://medium.com/@rayepps/javascript-at-the-nunnery-pure-undefiled-353e32fd6e1b"
isUpdated: true
---

가장 좋은 자바스크립트는 간단하고 깔끔하며 클래스, this, 상속 및 데코레이터와 같은 추종할만한 기능으로 오염되지 않았어야 한다.

![이미지](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_0.png)

## TLDR;

자바스크립트는 다양한 언어 기능을 갖춘 매우 강력한 프로그래밍 언어입니다. 그러나 대부분은 완전한 쓰레기입니다. 지난 10년 동안 엔지니어들이 품질 좋은 코드를 작성하는 능력을 저해하는 데 그 기능들은 소용이 없었습니다. 저는 객체와 함수만 사용하는 것이 훨씬 좋습니다.

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

# JavaScript의 문제

JavaScript는 놀라운 언어입니다. JavaScript의 가장 놀라운 점은 그 창시 이후 얼마나 멀리 왔는지입니다. 대부분의 언어는 창조, 구식화, 소멸이라는 자연스러운 과정을 따릅니다. 하지만 약한 프로그래밍 언어는 필요한 것을 갖추지 못하면 새로운 언어에 밀려나며 결국 소멸합니다.

JavaScript는 그 규칙의 예외입니다.

JavaScript가 약했더라도 웹을 구동하는 기술로서 죽어서는 안되었습니다. 대신 새로운 기능들이 외부로 테이핑, 접착, 그리고 끈과 와이어로 결합되어 추가되었습니다.

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

우리가 오늘 알고 있는, 싫어하는, 그리고 사랑하는 JavaScript는 처음부터 의심스러운 핵심 엔진에 계층 지어 쌓인 기능들의 집합이에요.

# 커뮤니티의 문제

진짜 문제는 JavaScript가 아니라, 엔지니어들이 JavaScript에 대해 어떻게 생각하는지에요. 모든 언어 기능이 특별하고 유용하며 적절한 시간과 장소가 있어서 가능한 경우 모든 기능을 배워서 사용해야 한다고 배우게 되죠.

거짓말이에요.

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

프로토타입 상속을 예로 들어보죠. 좀 이상하고, 좀 추잡하며, 현대 프로그래밍 언어에는 어울리지 않는 개념이죠. 언어에 그 개념이 존재한다고 해서 우리가 받아들여야 하는 것은 아니라고 생각해요.

# 해결책

저는 모든 저 추잡한 특징들을 거부해요. 간단히 거절합니다. 특히 클래스, this 키워드, 데코레이터 및 상속 형태의 어떤 형태에도 의존하지 않아요. 제 JavaScript 코드는 모두 객체와 함수로 이루어져 있어요.

## 클래스를 사용하지 않아요

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

클래스는 상태가 초기화된 객체일 뿐입니다. 정말, 그게 전부에요!

다음 두 코드 조각은 정신적으로 동일합니다. 유일한 차이점은 클래스 파서는 new 키워드를 요구하는데 반해 const 파서는 그렇지 않습니다.

![image](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_1.png)

그렇다면 왜 클래스를 사용해야 할까요? 상속에 대해 생각 중이라면 다음 코드 조각을 고려해보세요.

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

![이미지](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_2.png)

클래스로 할 수 있는 것은 모두 객체와 함수로도 할 수 있어요. 그리 어렵지 않아요.

## 데코레이터는 사용하지 않아요

사실 데코레이터 아이디어를 좋아해요. 안타깝게도 자바스크립트 위원회가 금기 주류에 취해 있었던 그 날 밤, 형식을 결정해버렸어요.

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

이를 수행하기 위해 자바스크립트가 만든 형식을 배워야 합니다. 저는 파이썬 접근 방식을 선호합니다. 파이썬에서 데코레이터는 함수를 인수로 받아들이고 함수를 반환하는 함수입니다.

이것이 어떻게 동작하는지 자바스크립트에서 보여 드리겠습니다:

![이미지](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_3.png)

이 예제에서는 `speak` 함수를 우리의 `uppercase` 및 `emphasize` 데코레이터로 장식하여 `scream` 함수를 만들었습니다. 실제로 우리는 데코레이팅하는 것이 아니라 조합하고 있습니다. 그것은 버그가 아니라 기능입니다. 어쨌든, 우리는 동일한 꾸미기 목표를 달성하고 있습니다.

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

# 그런데 왜요?

내 코드를 객체와 함수에만 제한하는 이유가 몇 가지 있습니다. 일반적으로 이야기하자면, 이렇게 하면 코드를 간단하고 읽기 쉽고 빠르며, 전반적으로 더 나아지게 할 수 있습니다. 나는 더 좋아합니다.

## 클래스는 상태를 쌓는 경향이 있습니다

이것은 절대적인 규칙은 아니지만, 제 경력 동안 본 경향입니다. 개인적으로, 결정론적인 코드와 가능한 한 순수한 함수를 강력히 선호합니다. 당신이 단호하다면 클래스로도 이러한 것들을 달성할 수 있습니다. 그러나 항상 그대로인 것 같지는 않습니다. 제가 단호해도, 다음 10 명의 엔지니어들은 같은 생각을 공유할 가능성이 낮습니다.

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

시간이 지남에 따라 클래스는 더 많은 속성을 저장하고 해당 속성에 의존하는 더 많은 함수를 추가하는 경향이 있습니다. 클래스가 정말 통제를 벗어날 때, 어느 시점에 적절한 속성 값은 메소드의 올바른 기능에 중요해집니다. 즉, 상태의 악몽입니다.

![이미지](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_4.png)

객체를 사용하면 모듈 스코프에서 결정적인 함수를 작성하고 필요한 것만 전달해서 객체 인스턴스에서 호출할 수 있습니다. 이를 통해 함수에 수동으로 상태를 전달하게 되는데, 이를 통해 엔지니어들이 무엇을 추가하는지 두 번 생각하도록 유도합니다.

이를 클래스로 수행할 수 있지만, 30년 이상의 전통이 있어 이 방식으로 작업하지 않는 것이 좋습니다. 다른 사람들이 당신의 코드를 분석하고 클래스를 찾게 되면, 그들은 깊게 생각하지 않고 상태를 더 늘리게 될 것입니다.

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

## 클래스 테스트하기 어렵습니다

이 포인트는 이전 내용과 밀접하게 관련되어 있습니다. 클래스가 가지고 있는 상태(state)가 많을수록 그것을 테스트하기가 어려워집니다. 클래스에서 상태를 제거하여 불변 객체(immutable object)로 만들고, 복잡한 함수를 모듈 스코프에 배치하여 독립적으로 테스트할 수 있도록 한다면, 테스트의 복잡성을 크게 줄일 수 있습니다.

저는 유닛 테스트에 코드 커버리지를 중요하게 생각합니다. 아픈 경험을 토대로 말씀드리지만 상태를 가지는 클래스의 코드 커버리지는 아무런 의미가 없다고 말할 수 있습니다. 반면, 만일 클래스가 불변 객체 인스턴스이고 모듈 스코프에 결정적 함수(deterministic functions)가 있으며, 결정적 함수들이 100%의 유닛 테스트로 커버된 경우에는, 실제로 로직이 커버된 것에 자신감을 가질 수 있습니다.

<img src="/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_5.png" />

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

우리의 오토바이 수업은 약간 특이해요 — 빨간 오토바이가 가장 빠르다는 건 누구나 알고 있죠 — 하지만 이것은 국가가 결과를 파생해내는 실제 시나리오를 보여줘요.

테스트를 작성할 때, 물건의 색상과 같이 보이게는 상관없는 것이 속도에 영향을 미칠 수 있다는 것이 명백하지 않을 수 있어요.

함수 및 객체 버전에서, getSpeed 함수를 위한 테스트를 작성하면 개발자에게 색상 — 필수 인수 — 가 결과에 영향을 미친다는 것을 알려줄 거에요.

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

## 객체는 인지 부담을 줄입니다

사람으로서 클래스 메서드를 이해하기 위해서는 모든 상태를 내 머리로 불러와야 하고 그 후 이에 의존하는 상태를 고려하여 런타임 동작을 고려해야 합니다. 개발자로서 우리는 주로 이 의존 상태를 식별하기 위해 클래스 메서드를 검사하여 this나 self와 같은 키워드를 찾게 됩니다.

결정론적 함수는 인자를 통해 의존성을 정의합니다. 이러한 경향은 이해하기 쉽고 추론하기 쉽게 만듭니다.

## 데코레이터는 영원히 함수에 데코레이터를 바인딩합니다

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

JavaScript에서 @decorator 기능을 사용할 때는 데코레이터 함수를 영원히 데코레이트된 함수에 바인딩하는 것입니다. 이것은 함수를 격리해서 테스트하는 능력을 완전히 파괴합니다.

speak/scream 데코레이터 예제의 버전을 살펴봅시다. 이 예제는 @decorator 기능을 사용하도록 변환되었습니다.

![이미지](/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_7.png)

나는 데코레이터를 실행하지 않고는 speak 메서드를 테스트할 수 없습니다. 품질 높은 단위 테스트를 중요시하는 사람으로서, 이는 시작조차 할 수 없는 상황입니다.

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

## 장식자는 난해한 형식에 대한 지식이 필요합니다

다음 코드 스니펫을 살펴보고, 저희 강조 장식자에 관해 알려주세요: 타겟이 무엇인가요? 이름은 무엇인가요? 그리고 디스크립터는 무엇인가요?

<img src="/assets/img/2024-06-20-JavascriptattheNunneryPureUndefiled_8.png" />

장식자의 정의는 간단하고 아름다운데...함수를 취하고 함수를 반환하는 함수입니다. 자바스크립트는 복잡한 형식으로 실로 우아한 패턴을 와해시켰습니다.

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

## 데코레이터들은 이를 필요로 합니다

우리 두 데코레이터에서 보듯이, apply와 this를 사용하여 데코레이트된 메소드의 컨텍스트를 올바르게 설정해야 합니다.

저랑 함께 마음을 열고 잠시 얘기해볼까요?... 20년 전 실수였고 오늘날에도 그래요. 하느님아, 자바스크립트에 이것을 중심으로 언어 기능을 만들지 말아 주시고 엔지니어분들아, 코딩에서 이를 중심으로 코드를 작성하지 말아 주세요.

그리고 다른 얘기인데, 만약 면접을 볼 때 this 키워드에 대해 물어보면, 올바른 대답은 "잘 모르겠어요, 이 구식 쓰레기를 사용하지 않아요. 이것은 코드를 불필요하게 복잡하게 만들 뿐이에요" 입니다.
