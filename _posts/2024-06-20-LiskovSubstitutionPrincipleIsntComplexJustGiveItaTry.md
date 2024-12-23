---
title: "리스코프 치환 원칙은 복잡하지 않아요 한 번 시도해 보세요"
description: ""
coverImage: "/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_0.png"
date: 2024-06-20 07:26
ogImage:
  url: /assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_0.png
tag: Tech
originalTitle: "Liskov Substitution Principle Isn’t Complex. Just Give It a Try"
link: "https://medium.com/better-programming/liskov-substitution-principle-isnt-complex-just-give-it-a-try-d4f84093ca5f"
isUpdated: true
---

## 리스코프 치환 원칙을 더 잘 이해할 수 있는 가이드

![이미지](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_0.png)

# 소개

우리 모두가 알다시피, 소프트웨어 요구 사항은 항상 변합니다. 그리고 우리 개발자로서는 이러한 변경으로 기존 코드가 망가지지 않도록 해야 합니다. 그래서 객체지향 설계에서 SOLID 원칙이 소개되었습니다. 이를 통해 이 프로세스를 더 쉽게 할 수 있습니다.

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

SOLID 원칙은 로버트 C. 마틴 (Bob 삼촌)이 만든 원칙 세트입니다. 이 원칙들은 더 유연하고 유지보수 가능하며 이해하기 쉬운 소프트웨어를 만드는 데 도움을 줍니다. 이 원칙들은 다음과 같습니다:

- 단일 책임 원칙 (Single Responsibility Principle)
- 개방-폐쇄 원칙 (Open-Closed Principle)
- 리스코프 치환 원칙 (Liskov Substitution Principle)
- 인터페이스 분리 원칙 (Interface Segregation Principle)
- 의존성 역전 원칙 (Dependency Inversion)

이전 글에서 개방-폐쇄 원칙을 소개한 후 이번 글에서는 SOLID 약어에서의 "L"인 리스코프 치환 원칙 (LSP)에 대해 논의하겠습니다.

# 정의

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

수학적으로 LSP의 정의를 소개하고 자세히 알아보겠습니다. Barbara Liskov는 1988년에 이를 도입했습니다.

기본 객체지향 설계는 상속 또는 구성을 사용하여 객체 간의 관계를 제어합니다. 상속은 IS-A 관계로, 어떤 것이 다른 것의 한 종류이면 발생합니다. 예를 들어, 말은 동물의 일종이라고 할 수 있습니다.

반면에, 구성은 다른 것과의 HAS-A 관계로 이루어집니다. 예를 들어, 주소는 그와 관련된 도시를 가지고 있습니다. LSP는 객체지향 설계에 추가적인 제약을 가져와서 이러한 관계가 충분하지 않으며 IS-SUBSTITUTABLE-FOR로 대체되어야 함을 명시합니다.

하지만 이것이 의미하는 바는 무엇일까요? 간단히 말해, 슈퍼타입은 서브타입으로 대체될 수 있어야 하며 기존 코드를 망가뜨리지 않고 대체될 수 있어야 합니다. 다시 말해, 슈퍼타입은 서브타입과 동일하게 동작해야 합니다.

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

그럼 어떻게 우리가 슈퍼타입을 서브타입으로 교체해도 기존 코드에 부작용이 없는지 보장할 수 있을까요?

# LSP은 OCP를 확장한다

5가지 SOLID 원칙이 어떤 방식으로 연관돼 있는지 고려해 보세요. 하나의 원칙을 따르는 것이 다른 원칙을 올바르게 따르는 것을 보장하지 않는다는 점을 명심하세요.

우리가 보게 되겠지만, LSP는 Open-Closed 원칙을 확장하며, OCP의 규칙을 따르는 것만으로는 코드가 확장을 허용하고 수정을 닫는지 보장할 수 없습니다. 하지만 코드는 부작용을 피하기 위해 리스코프 치환 원칙에도 준수해야 합니다.

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

아래는 이 점을 더 잘 이해하는 데 도움이 되는 예시입니다:

![예시 이미지](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_1.png)

보시다시피, 이 예시는 OCP를 완벽하게 따릅니다. 새로운 직원 역할을 추가하고 싶다면, 새로운 클래스를 추가하면 되며, 해당 클래스는 IEmployee 계약에 준수하는 새로운 역할 기능을 포함하면 됩니다.

좋아 보이네요. 그러나 한 가지 질문이 있습니다. 게스트 역할을 어떻게 구현하겠습니까? 네, 게스트 역할은 listPosts를 수행할 수 있지만, 게스트 직원에 대한 인증이 없으므로 로그인 기능을 어떻게 처리할지 궁금합니다.

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

위의 텍스트를 번역해 드리겠습니다.

당신이나 빈 기능이 없이 빈칸으로 남겨 둘 수 있거나 로그인 메소드에서 지원되지 않는 예외를 throw할 수 있다고 생각해 볼 수 있어요. 네, 이런 해결책들은 LSP를 고려하지 않는다면 직관적일 수 있어요.

다시 말해, OCP를 완벽하게 준수했다면 문제를 발생시키는 것이 LSP를 어기는 것이 무엇인지에 대해 물어볼 수 있습니다. 이 질문은 암묵적으로 옳은 점을 지적합니다: 일부 원칙이 다른 것보다 중요하다는 것을 의미합니다. 그러나 어떤 원칙이 중요하지 않다고 해서 무시해서는 안 됩니다.

우리가 이미 알고 있듯이, LSP는 상위 유형과 하위 유형을 교체하더라도 기존 클라이언트 코드에 영향을 미치지 않는 것입니다. 이 점을 염두에 두고 다시 당신의 해결책들을 살펴보죠:

- 기능이 없이 빈칸으로 남겨 둘 경우: 이제 클라이언트 코드는 인증된 사용자 토큰을 반환하는 로그인 함수를 기대합니다. 아무것도 반환하지 않는 Guest.login을 사용하면 어떻게 될까요? 기존 코드가 망가질 거예요, 맞죠?
- 지원되지 않는 예외를 throw하는 경우: 다시 말해서, 기존 코드는 Guest.login으로부터 이 새로운 예외를 처리하지 않습니다. 결과적으로 Guest.login을 사용하면 기존 코드가 망가질 거예요.

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

의왕 교체하신 것에 깜짝 놀랐네요! 요 디자인은 OCP를 완벽하게 따르고 있어요. 그러나 LSP를 위반하고 있군요.

# LSP 규칙

![Liskov Substitution Principle](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_2.png)

아쉽게도 이 원칙을 코드에 강제로 적용하는 쉬운 방법은 없어요. 그러나 코드에서 이 원칙을 올바르게 적용하려면 두 가지 유형의 규칙, 즉 서명과 동작을 따라야 해요.

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

자바와 같은 컴파일된 언어를 사용하여 서명 규칙을 강제할 수는 있지만 행동 규칙을 강제할 수는 없습니다. 대신 특정 동작을 강제하기 위해 검사를 구현해야 합니다.

## 먼저, 서명 규칙을 소개해 보겠습니다.

1. 메서드 인수의 반변성: 이것은 보다 구체적인 유형에서 보다 일반적인 유형으로의 변환입니다. 다시 말해, 오버라이드된 서브 유형 메서드 인수는 수퍼 유형이나 더 넓은 유형과 동일해야 합니다.

클라이언트 코드가 SuperType에서 문자열 인수만 예상한다면, 해당 SuperType을 문자열 또는 숫자 인수 (더 넓은)를 허용하는 SubType으로 대체하면 클라이언트 코드에는 차이점이 없습니다.

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

2. 반환 유형의 공변성: 보다 일반적인 유형에서 보다 구체적인 유형으로 변환됩니다. 다시 말해, 오버라이드된 서브유형 메서드의 반환 유형은 수퍼유형이나 더 좁은 유형과 같아야 합니다.

클라이언트 코드는 이미 슈퍼유형에서 오는 문자열이나 숫자 응답을 처리했습니다. 따라서 만약 슈퍼유형을 문자열 응답만 반환하는 서브유형으로 대체한다면, 클라이언트 코드가 손상되지 않을 것입니다.

3. 예외: 서브유형 메서드는 슈퍼유형이나 더 좁은 예외를 던져야 합니다. 모든 컴파일된 언어가이 규칙을 강제할 수는 없습니다. Java와 같이 이를 강제할 수 있는 언어와 TypeScript와 같이 강제할 수 없는 언어가 있습니다.

이전 규칙과 마찬가지로, 클라이언트 코드가 슈퍼유형에 더 많은 예외를 처리하도록 의존한다면, 이 슈퍼유형을 더 적은 예외를 처리하는 서브유형으로 대체한다 해도 클라이언트 코드에는 차이가 없을 것입니다.

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

## 그 다음, 행동 규칙을 소개할게요

1. 클래스 불변성 (속성 규칙): 서브타입 메서드는 슈퍼타입의 클래스 불변성을 유지하거나 강화해야 합니다.

서브타입은 같은 슈퍼타입의 불변성을 유지하거나 강화해야 합니다. 생각해보세요, 만약 서브타입이 같은 슈퍼타입의 불변성을 유지하지 않는다면, 슈퍼타입 대신 사용될 수 없으며 슈퍼타입에서 특정 동작을 기대하는 클라이언트 코드가 망가질 수 있습니다.

2. 이력 제약 (속성 규칙): 서브타입 메서드는 슈퍼타입이 허용하지 않는 상태 변경을 허용해서는 안 됩니다.

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

만일 SubType이 상속받은 제약을 무시한다면, 이는 이러한 제약에 의존하는 클라이언트 코드를 손상시킬 수 있습니다. 따라서 SubType은 SuperType으로 대체될 수 없습니다.

2. 사전조건 (메서드 규칙): 서브타입 메서드는 오버라이드된 수퍼타입 메서드의 사전조건을 보존하거나 약화해야 합니다. 여기서 조건을 약화한다면 그 제약을 완화합니다.

이전 예제에서, SuperType 조건 hour `0 && hour` 12가 적용된 시간 입력을 제공하는 클라이언트 코드는 SubType에서 시간 `0 && 시간` 23의 더 넓은 범위를 적용받습니다. 다시 말해, 부작용 없이 SubType이 SuperType을 대체할 수 있습니다.

3. 사후조건 (메서드 규칙): 서브타입 메서드는 오버라이드된 수퍼타입 메서드의 사후조건을 보존하거나 강화해야 합니다.

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

이전 예제처럼 SuperType으로부터 반환된 값의 최댓값이 50이라고 클라이언트 코드가 기대한다면, 이를 SubType으로 변경하여 30의 최댓값을 반환하는 값으로 대체하면 유효해질 것입니다.

# 나처럼 혼동스럽지 마세요

![이미지](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_3.png)

처음에는 Liskov 치환 원칙이 상속에 관한 모든 것이라고 생각할 수 있지만, 그렇지 않습니다. 이 원칙을 배우는 동안 많이 혼란스러웠기 때문에 이 점을 강조하기 위해 별도의 섹션을 할애하는 것을 선호했습니다. LSP는 상속을 사용할 때만 적용할 수 있다고 생각했었죠.

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

리스코프 치환 원칙은 상속과는 아무런 관련이 없습니다. LSP는 단순히 서브타이핑에 관한 것입니다. 그럼에도 불구하고, 이 서브타이핑은 상속이나 합성에서 나올 수 있습니다. LSP는 상속과는 관련이 없기 때문에 상속을 사용하든 말든 LSP가 적용되는지 여부는 중요하지 않습니다. StackExchange의 이 해결책을 살펴보세요.

그러므로, LSP와 상속 개념을 엄격하게 연결하지 마세요. 대신, 상속을 사용해야 할 때에 LSP를 염두에 두세요. "LSP는 OCP를 확장한다" 섹션 예제를 다시 살펴보세요.

# LSP 위반

![이미지](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_4.png)

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

가장 일반적인 LSP 위반 사례를 소개하고 LSP를 준수하도록 다시 디자인해보겠습니다.

## 1. Type checking

폴리모픽 코드 내부에서 변수의 유형을 확인하는 경우입니다. 아래 예제를 살펴보세요:

코드에서 보듯이 이 루프는 직원 유형에 따라 두 가지 다른 기능을 수행합니다. 그러나 이 구현에서 어떤 문제가 있는 것일까요?

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

한 번 더 생각해보세요. 여기서 첫 번째 문제는 직원과 작업할 때마다, 특정 기능을 실행하기 위해 이 직원이 '게스트' 유형인지를 확인해야 할 수도 있다는 것입니다. 또 다른 유형인 경우 다른 기능을 실행해야 할 수도 있습니다.

두 번째 문제는 추후 새로운 유형을 추가할 수 있으며, 이러한 새로운 유형을 지원하기 위해 이 확인이 존재하는 모든 곳을 방문해야 할 수 있다는 것입니다. 게다가 이는 개방-폐쇄 원칙을 위반하는 것이기도 합니다.

그렇다면 이 문제를 어떻게 해결할 수 있을까요? 한 가지 해결책은 '말하고, 물어보지 말 것' 원칙 또는 캡슐화를 사용하는 것입니다. 이는 인스턴스에게 해당 유형에 대해 질문하고 조건부로 특정 작업을 실행하는 대신, 그 로직을 유형에 캡슐화하고 작업을 수행하도록 지시하는 것을 의미합니다. 이를 이전 예제에 적용해봅시다:

## 2. Null checking

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

그것은 형식 검사와 동일한 동작을 갖습니다. 아래 예제를 확인해보세요. Guest 유형을 확인하는 대신, 이처럼 null 값에 대해 확인하고 있습니다. (employee === null) 이것은 LSP를 위반합니다.

하지만 이 문제를 어떻게 해결할 수 있을까요? 이 문제에 대한 일반적인 해결책 중 하나는 Null Object 디자인 패턴을 사용하는 것입니다. 이 재설계를 살펴보세요:

## 3. 구현되지 않은 예외 던지기

이것은 인터페이스나 기본 클래스의 부분적 구현으로 인해 발생하는 일반적인 문제입니다. "LSP extends OCP" 섹션의 예제를 다시 살펴보세요. Guest 하위 유형의 login 메소드에서는 IEmployee 인터페이스 (상위 유형)를 완전히 구현할 수 없기 때문에 Not Implemented Exception을 던져야 합니다.

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

이 문제의 해결책은 수퍼타입을 완전히 구현하는 것입니다. 이것이 인터페이스인지 기본 클래스인지에 상관없이요.

하지만 때로는 예시처럼 인터페이스를 완전히 구현하는 것이 어려울 수 있다는 점을 주장할 수 있습니다. 맞아요. 그런 경우에는 수퍼타입과 서브타입 간의 관계를 더 신중하게 확인해야 할 것입니다. 서브타입이 이 수퍼타입의 대체 가능성을 충족하지 못할 수도 있으며, 다시 말해 인터페이스 분리 원칙을 위반한 것일 수 있습니다.

# 결론

이 글에서는 리스코프 치환 원칙을 소개했습니다. LSP가 객체 지향 설계에 새로운 제약 조건을 추가한다는 것을 이해했습니다. 이것은 관계만으로는 충분하지 않고 서브타입이 수퍼타입을 대체할 수 있는지 확인해야 한다는 것을 말합니다.

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

해당 원칙을 올바르게 적용하기 위해 따라야 하는 규칙을 알고 계셨습니다. 그리고 이러한 규칙은 서명 및 행동 규칙으로 분류할 수 있습니다.

이후에는 이 원칙을 위반하는 몇 가지 일반적인 사례들과 그에 대한 해결책을 소개했습니다.

# 떠나시기 전에

만일 이 글이 유용하다고 느끼셨다면, 아래의 글도 함께 확인해보세요:

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

- 단일 책임 원칙을 정말로 이해하고 계신가요?
- 개방-폐쇄 원칙: 어려운 부분
- 전략 vs 상태 vs 템플릿 디자인 패턴
- SQL Server에서의 잠금 기반 격리

지금까지 함께해 주셔서 정말 감사합니다. 이 기사를 읽으시는 데 즐거움이 있기를 바랍니다.

![image](/assets/img/2024-06-20-LiskovSubstitutionPrincipleIsntComplexJustGiveItaTry_5.png)

# 참고문헌

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

- C# 개발자를 위한 SOLID 원칙
- 자바에서의 Liskov 대체 원칙
- 코드 예제와 함께 설명하는 SOLID 디자인 원칙: Liskov 대체 원칙
- 사전조건/사후조건 강화/약화에 대한 혼란
- 이것이 Liskov 대체 원칙 위반인가요?

원문은 https://mayallo.com에서 확인할 수 있습니다.
