---
title: "컴포넌트 기반 접근법 안드로이드 애플리케이션에서 복잡성 극복하는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_0.png"
date: 2024-07-02 22:15
ogImage:
  url: /assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_0.png
tag: Tech
originalTitle: "Component-based Approach. Fighting Complexity in Android Applications"
link: "https://medium.com/itnext/component-based-approach-fighting-complexity-in-android-applications-2eaf5e8c5fad"
isUpdated: true
---

새로운 Android 애플리케이션 개발을 시작한다고 상상해보세요. 이 단계에서는 주요 문제가 발생할 확률이 적습니다. 기본 기능만 구현했습니다. 몇 가지 간단한 화면이 있습니다. 코드를 탐색하는 것이 간단합니다. 열정적으로 기능을 하나씩 추가하기 시작합니다. 그러나 시간이 지남에 따라 개발이 복잡해집니다. 코드베이스가 확장되고, 주요 화면에 많은 UI 요소와 복잡한 논리가 증가하며, 화면 흐름이 복잡한 전환 체인으로 발전합니다. 새로운 것을 추가하려고 하면 예전 것을 망가뜨리지 않는 것이 머리아프게 됩니다. 결과적으로, 개발 속도가 늦어집니다. 이 상황이 익숙한가요?

이러한 복잡성에 대항할 수 있는 효과적인 전략은 컴포넌트 기반 접근 방식입니다. MobileUp에서 우리는 세 가지 주요 Android 애플리케이션에서 이 접근 방식을 구현했으며, 그 전에는 어떻게 관리했는지 상상하기 어렵습니다.

저는 MobileUp의 팀 리드인 Artur Artikov입니다. 컴포넌트 기반 접근 방식을 마스터하는 데 도와드리겠습니다. 이 여정을 가능한 한 직관적이고 매력적으로 만드는 것이 제 목표입니다.

여러 분을 기다리는 일련의 기사가 있습니다. 이 첫 번째 기사는 이론에 초점을 맞추고 있습니다. Android 애플리케이션 개발 시 마주치는 복잡성을 탐구하고 MVVM과 Clean Architecture가 만병통치약이 아닌 이유에 대해 논의할 것입니다. 저는 컴포넌트 기반 접근 방식을 설명하고 이점을 개괄합니다. 기사의 끝에는 더 깊이있는 학습을 위한 자원 링크가 제공됩니다.

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

# Android 애플리케이션의 복잡성

안드로이드 애플리케이션 개발에서는 일반적으로 두 가지 유형의 복잡성을 직면하게 됩니다:

1. 복잡한 화면
   은행, 온라인 쇼핑, 또는 소셜 네트워크와 같은 애플리케이션의 주 화면을 생각해보세요. 이 화면은 중요한 사용자 정보를 표시하며 다수의 UI 요소, 네트워크 요청 및 복잡한 로직을 포함합니다.

2. 복잡한 탐색
   애플리케이션이 성장하고 새로운 화면이 추가되면, 그 사이를 이동하는 것이 더 복잡해집니다. 이로 인해 권한 부여, 등록, 구매 및 설문 조사와 같은 다단계 시나리오가 발생하게 되는데, 이들은 서로 연결되어 있습니다. 애플리케이션은 종종 하단 네비게이션을 통합하는데, 이는 화면 간 전환하는 버튼이 있는 패널을 의미합니다. 태블릿 사용자들을 위해, 항목 목록과 선택한 항목에 대한 세부 정보를 동시에 표시하는 마스터-세부 탐색이 필요합니다. 추가적으로, 하단 시트와 대화 상자를 사용한 탐색이 포함됩니다.

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

아무것도 하지 않으면 개발 속도와 품질이 서서히 저하될 것입니다.

# MVVM 및 Clean Architecture의 문제점

많은 Android 개발자들은 MVVM 및 Clean Architecture에 의존합니다. 이러한 방법론은 코드를 더 잘 구성하는 데 도움이 되지만, 각각의 단점도 있습니다. 제가 다음 토론에서 강조해 드리겠습니다.

MVVM과 Clean Architecture는 다양한 방식으로 해석되고 구현될 수 있다는 점을 명심하는 것이 중요합니다. 본문에서 메소드의 이해 및 사용 중 마주한 어려움을 설명하겠습니다. 여러분이 느끼시는 경험은 다를 수 있으며, 댓글에서 여러분의 인사이트를 공유해주시기를 환영합니다.

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

## 대규모 뷰 모델

MVVM 패턴은 화면의 로직을 별도의 클래스인 ViewModel로 추출하는 것을 권장합니다. 이 클래스는 화면에 표시되는 모든 데이터를 보유하고 모든 사용자 작업을 처리하는 메서드를 가지고 있습니다.

![image](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_0.png)

은행 앱의 메인 화면을 개발하고 해당 화면을 위한 뷰 모델을 만든다고 상상해봅시다. 화면 상단에는 사용자의 이름과 아바타가 표시되며, 프로필 필드와 onAvatarClick 메서드가 필요합니다. 오른쪽 상단에는 알림을 위한 종 모양 아이콘이 있어 알림 뱃지 표시 필드와 onNotificationIconClick 메서드를 추가합니다. 광고 배너의 캐러셀이 표시되어 광고 항목 필드와 배너 클릭을 처리하는 메서드를 포함해야 합니다. 계속 진행하면 매월 지출, 은행 카드, 환율, 예금, 모기지 등 각 기능에 대한 필드 및 메서드가 추가됩니다. 뷰 모델이 얼마나 빠르게 굉장히 복잡해지는지 알 수 있습니다.

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

물론이죠, 뷰 모델의 코드를 최적화하기 위해 데이터 로딩을 별도의 클래스로 위임하는 방식 등을 시도할 거예요. 하지만 이 접근 방식은 상황을 근본적으로 바꾸지는 않아요. 필드와 메서드는 여전히 유지되고, 화면에 추가될 때마다 뷰 모델은 계속 커질 거에요. 이 문제는 하나의 화면이 단일 뷰 모델에 바인딩되는 고전적인 MVVM에서 피할 수 없는 것이에요.

## Multi-Layer Architecture

Clean Architecture는 응용 프로그램을 각각 특정 책임을 가진 별도의 레이어로 구조화하는 것을 지지해요. 예를 들어, 한 레이어는 외부 소스에서 데이터를 검색하는 데 특화되어 있고, 다른 레이어는 비즈니스 로직을 실행하고, 세 번째 레이어는 사용자 인터페이스를 표시하는 데 중점을 둘 수 있어요. 레이어의 정확한 수와 책임은 프로젝트에 따라 다양할 수 있어요.

우리가 응용 프로그램을 세 가지 레이어로 나눴다고 가정해봐요. 코드를 다루다 보니 여전히 복잡하다면 어떻게 해야 할까요? 더 많은 레이어를 만들면 되겠죠! 그리고 우리가 일반적으로 하는 것이 바로 이겁니다.

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

그러나 레이어를 추가하면 비용이 발생합니다. 우리가 도입하는 레이어가 많아질수록 프로젝트는 유지하기 어려워집니다. 추가적인 추상화가 발생하고 레이어 간 상호 작용을 관리해야 합니다. 일관성을 유지하기 위해 개발자들은 심지어 가장 간단한 화면도 많은 레이어로 구현하기 시작합니다. 우리의 의도는 코드를 간단하게 만드는 것이었지만, 역설적으로 코드는 더 복잡해지게 됩니다.

![이미지](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_1.png)

## 인터렉터는 유스케이스가 아닙니다

Clean Architecture의 또 다른 중요한 요소는 인터렉터의 개념입니다. 그러나 이에 대해 설명하기 전에 유스케이스를 이해하는 것이 중요합니다.

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

사용 사례는 요구 사항 공학 용어입니다. 사용 사례는 응용 프로그램 내에서 사용자가 수행할 수 있는 작업을 설명합니다. 예를 들어 '전화번호부' 앱에서 사용 사례는 연락처 목록 보기, 연락처 추가, 편집, 삭제, 그리고 연락처에 전화 걸기와 같은 것이 될 수 있습니다.

인터랙터는 프로그래밍 세계에서 탄생했습니다. 프로그래머들은 사용 사례를 구현하기 위해 인터랙터를 작성합니다. 각 사용 사례는 일반적으로 구분된 인터랙터와 일치합니다. 이 말이 실용적으로 들릴 수 있죠?

하지만 미묘한 차이가 있습니다. 실제로 인터랙터는 사용 사례를 완전히 구현하지는 않습니다. Clean Architecture 지침에 따르면, 인터랙터는 사용자 인터페이스를 인식해서는 안 되며, 고수준 로직인 비즈니스 규칙에만 집중해야 합니다. 앱과의 사용자 상호작용의 구체적인 부분은 인터랙터의 범위를 벗어납니다. 이 접근 방식의 실용적인 영향을 살펴보겠습니다.

다시 한번 전화번호부 애플리케이션을 생각해 봅시다. 여기서 좀 더 복잡한 사용 사례에 초점을 맞추어 보죠: 여러 연락처 동시에 삭제하기. 사용자 입장에서는 이 프로세스가 다음과 같이 보입니다:

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

- 사용자는 연락처 목록을 확인합니다.
- 사용자는 연락처 중 하나를 길게 누릅니다. 연락처가 선택됩니다. '삭제' 버튼이 나타납니다.
- 사용자는 몇 가지 더 많은 연락처를 누릅니다. 그들도 선택됩니다.
- 사용자는 '삭제' 버튼을 누릅니다. 확인 대화 상자가 나타납니다.
- 사용자는 삭제를 확인합니다. 선택한 연락처가 사라집니다.

그리고 상호작용자(Interactor)는 다음과 같습니다:

```js
class RemoveContactsInteractor(
   private val contactsRepository: ContactsRepository
) {

   suspend fun execute(contactIds: Set<ContactId>) {
       contactsRepository.removeContacts(contactIds)
   }
}
```

봐봐, 거의 비어 있어요. 여기에는 여러 연락처를 선택하거나 삭제를 확인하는 로직이 없어요. 이러한 책임들은 일반적으로 뷰 모델 안에 속하고 있으며, 상호작용자 안에는 비즈니스 규칙이 없으므로 유용하지 않습니다. 그냥 호출을 리포지토리로 전달하는 겁니다.

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

이 상황은 흔하지 않습니다. 대부분의 모바일 앱은 많은 사용자 상호작용을 가지고 있지만 많은 비즈니스 규칙이 없습니다.

![이미지](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_2.png)

사용 사례와 상호자들에 대한 이 논의가 복잡한 화면과 어떻게 관련이 있는지 알아봅시다. 화면의 복잡성은 동시에 여러 사용 사례를 관리하기 때문에 발생합니다. 이상적으로 각 사용 사례를 별도의 클래스에 캡슐화해야 합니다. 그러나 상호자들은 이런 작업을 용이하게 해주지 않습니다.

# 구성 요소 기반 접근법 (Component-Based Approach)

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

## 현실 세계에서의 구성 요소 기반 접근 방식

좋은 소식은 이미 프로그래밍에서 아니면 분명히 현실 세계에서 구성 요소 기반 접근 방식에 익숙하다는 것입니다.

![이미지](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_3.png)

인간의 몸을 생각해보세요. 이 몸은 작은 단위, 즉 세포로 구성되어 있습니다. 이 세포들은 무작위로 연결되어 있지 않습니다. 명확한 계층적 구조가 있습니다. 세포가 조직을 형성하고, 조직이 모여서 장기를 만들고, 장기가 장기계를 이루며, 이러한 체계들이 모여 전체 생물체를 이룹니다.

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

기본적으로, 더 간단한 요소들이 결합하여 더 복잡한 구조물을 형성하며, 이 과정이 여러 수준에서 반복됩니다. 우리는 이를 구성 요소 기반 접근법이라고 합니다.

이 원리가 적용되는 예시를 쉽게 찾을 수 있습니다:

- 전체 우주: 행성과 별 ➜ 행성계 ➜ 은하 ➜ 은하 군집
- 개인용 컴퓨터: 프로세서 내부의 가장 작은 트랜지스터부터 시스템 유닛과 모니터 같은 큰 구성 요소까지
- 레고로 조립된 호그와트 성
- 책 도서관
- 대규모 IT 회사
- 집
- 우주선

일반적으로, 모든 복잡한 물체와 시스템은 구성 요소 기반 접근법에 따라 구조화됩니다.

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

컴포넌트 기반 접근 방식은 복잡성을 효과적으로 관리하는 데 효과적입니다. 이러한 계층 구조 덕분에 일부 수준을 건너뛸 수 있어 더 간단하게 만들 수 있습니다. 인간의 신체를 예로 들어보겠습니다. "인간은 기관으로 구성되어 있으며, 그 기관이 모여 유기체를 이룬다"라고 말하는 것이 정확합니다. 여기서 세포와 조직 수준을 건너뛴 것입니다. 원래 설명에서도 세포 자체가 복잡한 구조라는 단순화가 있었습니다.

무엇을 할지에 따라 세부 정보 수준을 조정할 수 있는 능력은 컴포넌트 기반 접근 방식의 주요 이점이며, 매우 유용한 측면입니다.

![component_based_approach](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_4.png)

## 안드로이드 개발에서의 컴포넌트 기반 접근 방식

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

휴대폰 애플리케이션은 컴포넌트라고 불리는 요소들로 구성된 계층 구조로 이해할 수 있어요.

![컴포넌트 기반 접근으로 안드로이드 애플리케이션 복잡성 극복하기](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_5.png)

모바일 애플리케이션은 다음과 같은 유형의 컴포넌트로 구성돼 있어요:

- UI 요소: 이러한 요소들은 가장 간단한 컴포넌트로, 버튼, 텍스트 필드, 체크박스와 같은 표준 UI 프레임워크 요소뿐만 아니라 프로그래머가 개발한 사용자 정의 UI 요소를 포함하고 있어요. 일반적으로 UI 요소는 추상적이며 사용자 작업을 독립적으로 처리하지 않아요.
- 기능 블록: 이러한 컴포넌트들은 더 자율적입니다. 각각의 기능 블록은 특정 기능을 처리하며 사용자의 관점에서 작업을 효과적으로 수행해요.
- 화면: 이름에서 알 수 있듯이, 이러한 컴포넌트들은 전체 애플리케이션 화면을 담당하고 있어요. 여러 가지 기능을 수행하는 복잡한 화면은 일반적으로 여러 기능 블록으로 구성돼 있어요.
- 플로우: 특정 기능에 대한 일련의 화면을 나타내는 것입니다. 플로우의 예시로는 인증, 등록, 구매, 설문 과정이 있어요.
- 애플리케이션: 이 또한 컴포넌트로 보여지며 사용자에게 접근 가능한 전체 기능 범위를 책임지고 있으며 여러 플로우로 구성돼요.

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

이 구조는 당신의 애플리케이션의 요구에 맞게 조정할 수 있어요. 예를 들어 간단한 화면에서는 기능 블록 수준을 건너뛰고 UI 요소에서 직접 화면을 구성할 수 있어요. 매우 기본적인 애플리케이션의 경우, 여러 흐름이 없을 수 있어 앱이 개별 화면으로만 구성될 수 있어요. 그에 반해, 블록을 하위 블록으로 나누고 추가적인 네비게이션 중첩 레이어를 추가함으로써 구조를 더 자세히 설명할 수도 있어요.

이 접근 방식에서 구성 요소들은 Clean Architecture의 계층별 분할 대신 기능별로 정리된 프로그램 코드에 의해 정의돼요. 종종, 한 구성 요소는 여러 레이어를 아우를 수 있어요. 하나의 구성 요소 내에서 네트워크 데이터 로딩, 어떤 형태의 로직, 그리고 사용자에게 데이터 표시를 포함할 수 있어요. 이 규칙은 UI 요소에는 다소 적용하기 어려울 수 있지만, 그중에서도 인터넷에서 이미지를 로드하는 역할을 하는 예시가 있어요.

구성 요소는 항상 하나의 클래스에 해당하지는 않아요; 일반적으로 여러 클래스로 구성돼요. 이러한 클래스의 조직은 다양하게 할 수 있어요: 레이어로 나누어지거나 패키지로 그룹화되거나 다른 구성 요소들 간에 공유돼도 괜찮아요.

수행할 작업에 따라 우리는 집중할 세부 수준을 조정할 수 있어요. 예를 들어, 기능 블록을 사용하여 화면을 구성할 때, 각 블록 내의 특정 UI 요소가 덜 중요해질 수 있어요. 우리는 이러한 블록들을 단순하고 일관된 단위로 보게 되어요. 이 원칙은 흐름에도 적용돼요 — 화면 간의 전환을 생성할 때, 화면의 내부 구조에 대해서는 깊게 파고들지 않아도 되어요. 게다가, 대규모 애플리케이션에서 네비게이션을 구성하는 것이 더 용이해져요. 백 개의 화면을 번갈아가면서 다루는 대신 대략 열둘 흐름을 다룰 수 있어요.

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

# MVVM 및 Clean Architecture에 대한 새로운 시각

구성 요소 기반 접근 방식은 MVVM 및 Clean Architecture과 충돌하지 않고 보완하며 새로운 가능성을 열어줍니다. 더 많은 선택의 자유를 가지고 있기 때문에 MVVM과 Clean Architecture를 새로운 시각으로 살펴볼 수 있습니다.

## MVVM 2.0

MVVM 패턴은 화면과 기능 블록을 구현하는 데 완벽합니다. 복잡한 화면은 하나의 부모와 여러 자식 뷰 모델로 구조화할 수 있습니다.

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

<img src="/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_6.png" />

부모 뷰 모델은 필요에 따라 자식 뷰 모델 간의 상호 작용을 관리하는 조정자 역할을 합니다.

자식 뷰 모델은 개별 기능 블록을 처리합니다. 일반적으로 각각이 기능의 한정된 범위를 다루므로 단순한 뷰 모델을 유지합니다. 그러나 블록의 기능이 너무 방대한 경우, 구성 요소 기반 접근 방식을 다시 적용할 수 있습니다. 블록을 더 작은 하위 블록으로 나누고 각각에 뷰 모델을 할당하여 거대한 뷰 모델 문제를 완전히 해결할 수 있습니다.

## 인공적인 복잡성 제거

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

복잡한 화면과 탐색은 응용 프로그램 요구 사항에서 기인한 본질적인 복잡성입니다. 이를 단순히 제거할 수는 없지만 MVVM, Clean Architecture 및 구성 요소 기반 접근 방식을 사용하여 이를 관리할 수 있습니다.

그러나 '인공적인 복잡성'도 있습니다. 개발자가 부적절한 도구나 기술을 사용함으로써 만드는 복잡성을 의미합니다. 이는 오버엔지니어링이라고도 합니다.

Clean Architecture에서 오버엔지니어링은 흔한 문제입니다. 레이어와 추상화의 과도한 사용으로 나타납니다. 실제 업무 규칙을 구현하지 못하는 상호 작용자로 발생합니다. 비효율적인 상호 작용자 위에 추가적인 레이어 - 상호 작용자를 위한 패싸드가 존재하는 경우를 관찰한 적도 있습니다.

구성 요소 기반 접근 방식을 구현하면 오버엔지니어링의 위험을 자연스럽게 완화할 수 있습니다. 화면, 기능 블록 및 흐름으로의 분할은 응용 프로그램의 본질적인 구조와 일치합니다. 흔히, 개발자가 화면을 너무 많은 기능 블록으로 세분화하는 경우를 거의 본 적이 없습니다. 마찬가지로, 플로우를 만드는 경우도 주로 두 개 이상의 화면이 들어 맞을 때에만 발생하며 명백한 필요성이 있는 경우에 한정됩니다.

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

이것은 우리가 구성 요소 중심 방식을 독점적으로 채택하고 클린 아키텍처를 포기해야 한다는 것을 시사합니까? 전혀 그렇지 않아요! 각 도구마다 특정 목적이 있습니다.

구성 요소 중심 접근 방식은 응용 프로그램을 느슨하게 결합된 기능 단위로 분할하는 데 탁월합니다. 한편, 클린 아키텍처는 이러한 단위를 구현하는 데 매우 중요합니다. 그러나 프로세스는 특정 순서를 따라야 합니다: 먼저 코드를 구성 요소로 분할하고, 그 후에 필요에 따라 레이어, 인터랙터 및 다른 추상화를 도입합니다.

이 접근 방식을 채택하면 대부분의 작업에 대해 매우 가벼운 버전의 클린 아키텍처만으로 충분함을 발견할 것입니다. 이는 더 적은 레이어, 종종 세 개 또는 두 개일 수도 있습니다. 사용 사례는 구별된 구성 요소에 통합되고, 비즈니스 규칙이 존재하는 영역에만 인터랙터가 특별히 사용됩니다.

![이미지](/assets/img/2024-07-02-Component-basedApproachFightingComplexityinAndroidApplications_7.png)

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

# 추가로 읽을 거리

- 로버트 C. 마틴의 책, "Clean Architecture: A Craftsman's Guide to Software Structure and Design" — Clean Architecture에 대한 포괄적인 설명이 담겨 있습니다.
- 페르난도 세하스의 기사 (part1, part2, part3) — 안드로이드 개발에 Clean Architecture를 소개하는 기사입니다.
- "화면에 생각하지 않는 거대한 혜택" 이라는 강연 — 컴포넌트 기반 접근의 장점에 대한 이야기입니다.

## 계속해서

본문이 컴포넌트 기반 접근과 그 장점에 대해 명확히 이해하도록 도와드린 것 같습니다. 궁금한 점이 있으면 댓글로 자유롭게 질문해 주세요. 다음 글에서는 실제로 컴포넌트 기반 접근을 어떻게 적용하는지 자세히 살펴볼 예정입니다.
