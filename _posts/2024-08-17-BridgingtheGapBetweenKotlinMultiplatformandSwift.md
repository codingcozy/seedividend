---
title: "Kotlin Multiplatform과 Swift 간의 격차를 좁히는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_0.png"
date: 2024-08-17 01:37
ogImage: 
  url: /assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_0.png
tag: Tech
originalTitle: "Bridging the Gap Between Kotlin Multiplatform and Swift"
link: "https://medium.com/next-level-swift/bridging-the-gap-between-kotlin-multiplatform-and-swift-a69c4196459f"
isUpdated: true
updatedAt: 1723864122912
---


코틀린 멀티플랫폼과 스위프트를 사용하고 계신가요? SKIE를 탐험하고 이 도구가 프로세스를 간소화하고 스위프트 개발자를 능력있게 만드는 방법을 배워보세요.

![Bridging the Gap Between Kotlin Multiplatform and Swift](/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_0.png)

저는 코틀린 멀티플랫폼을 몇 년 동안 사용해왔습니다. 완전히 원할한 것은 아니었지만, 코드 공유에 탁월한 도구라고 강력히 믿습니다.
간단히 이 도구의 이점을 살펴보겠습니다:

- 앱 로직을 한 번에 작성: 이는 더 적은 코드 작성을 의미하며 일반적으로 더 낮은 버그 및 더 나은 유지 관리를 의미합니다. 이 주제에 대한 유익한 기사들이 있습니다. [예시 글](링크)
- 네이티브 성능.
- 안드로이드와 iOS용으로 만든 모든 네이티브 라이브러리 사용 가능.
- 필요한 경우 플랫폼별 코드 작성 가능.

<div class="content-ad"></div>


# 스위프트 / iOS 개발자를 위한 도전 과제

코틀린 멀티플랫폼은 이점을 제공하지만, iOS 개발자들은 안드로이드와 비교하여 몇 가지 도전 과제에 직면합니다. 이러한 도전 과제를 살펴보겠습니다:

- 초과하지 않는 열거형: 코틀린에서 열거형 클래스를 정의하면, 스위프트는 항상 기본 케이스를 필요로 합니다. 심지어 가능한 모든 열거 값이 별도의 케이스를 갖는 경우에도 그렇습니다.
- 미완료된 실드 클래스: 열거형과 유사하게, 실드 클래스를 switch하는 경우 항상 기본 케이스를 추가해야 합니다. 또한, 코틀린 데이터 클래스의 연관 값에 접근하기가 어려울 수 있습니다.
- 기본 인수 지원 없음: 코틀린 함수의 기본 인수는 스위프트에서 지원되지 않습니다. 스위프트에서 해당 함수를 호출할 때 모든 인수를 전달해야 합니다.
- 코틀린 예외 지원 없음: 코틀린 예외는 스위프트에서 처리하지 않습니다. 코틀린 함수에서 예외가 발생하면, 스위프트가 충돌하며 이러한 오류를 스위프트 코드에서 잡을 수 없습니다.
- Flow collection: 코틀린 멀티플랫폼으로 작업하는 iOS 개발자는 아마도 코틀린 Flow를 스위프트에서 어떻게 관찰해야 할지 궁금해했을 것입니다. 불행하게도, 솔루션은 직접적이지 않습니다.
- 중단 함수: 코틀린 중단 함수는 메인 스레드에서만 호출할 수 있습니다. 또한 취소 기능은 지원되지 않습니다.

![이미지](/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_1.png)

<div class="content-ad"></div>

그래서 코틀린과 스위프트는 모두 현대적인 언어이지만, 두 언어 간의 호환성은 좋지 않아요. 주된 이유는 코틀린 코드가 코틀린의 일부 기능이 부족한 Objective-C로 번역되기 때문이에요.

# SKIE 소개: Kotlin Multiplatform을 간단하게 만들기

따라서 SKIE(developed by Touchlab)는 코틀린 컴파일러가 내보내는 프레임워크를 수정하여 스위프트 코드를 생성하는 컴파일러 플러그인이에요. SKIE의 주요 기능은 새로운 유형을 생성하여 코틀린 코드를 쉽게 처리하고, 코틀린 Flow를 감시하고 suspend 함수를 호출하는 것을 훨씬 쉽게 만드는 것이에요.

# SKIE 기능

<div class="content-ad"></div>

- 완전한 열거형: Swift는 이제 Kotlin에서 완전한 열거형을 처리할 수 있어서 기본 케이스가 필요 없어졌어요.
- 기본 인수: Kotlin 함수에서 정의된 기본 인수는 이제 Swift에서 사용할 수 있어서 모든 인수를 전달할 필요가 없어요.
- 완전한 실드 클래스: 열거형과 마찬가지로 이제 Swift 컴파일러는 각 가능한 Kotlin 데이터 클래스나 데이터 객체에 대한 케이스를 구현했는지 감지할 수 있어요. 게다가 Kotlin 데이터 클래스의 연관 값을 쉽게 액세스할 수 있어요.
우리는 실드 클래스를 스위치하는 것이 조금 다르다는 점을 명심하기만 하면 됩니다:

![이미지](/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_2.png)

이 예시에서 OperationType은 실드 클래스이고 onEnum(of:)를 사용하여 스위치합니다. 또한 .unknown 연관 값을 쉽게 액세스하는 방법을 확인해보세요.

- Flow 상호 운용성: 모든 Kotlin Flow는 AsyncSequence로 표현되며 몇 가지 이점이 있어요:
- Kotlin Flow는 그냥 AsyncSequence이기 때문에 AsyncExtensions와 같은 제3의 라이브러리를 사용할 수 있어요.
- Kotlin Flow는 Swift의 비동기 수명 주기에 참여합니다. 예를 들어, SwiftUI 뷰의 task 수정자에서 Flow를 관찰하면 뷰가 제거될 때 자동으로 취소될 거에요.
- StateFlow의 특별한 구현이 있어서(StateFlow messages인 경우) 다음과 같이 StateFlow의 값을 가져오고 설정(가변이면)할 수 있어요:

<div class="content-ad"></div>

<img src="/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_3.png" />

- Suspend functions: SKIE를 통해 우리는 어떤 스레드에서든 Kotlin 일시 중단 함수를 호출하고 동시에 취소를 관리할 수 있습니다!
- 오류 처리: 취소를 지원하기 위해 일시 중단 함수는 throwable async Swift 함수로 변환됩니다. 그러나 CancellationException 이외의 예외가 발생하면 Kotlin 내에서 오류가 발생합니다.
그러나 @Throws 어노테이션을 추가하면 예외는 스위프트 측에서 나타나며 그곳에서 잡고 처리할 수 있습니다:

<img src="/assets/img/2024-08-17-BridgingtheGapBetweenKotlinMultiplatformandSwift_4.png" />

# SKIE가 작동하는 방식

<div class="content-ad"></div>

SKIE는 Kotlin 구현과 클래스를 나타내는 Swift 코드를 생성하여 통합을 간소화합니다. 이 생성된 코드는 두 언어 사이의 다리 역할을 하며 개발자들에게 익숙한 Swift API를 제공합니다.

예를 들어, Kotlin enums 및 sealed classes를 나타내는 새로운 Swift enum이 생성됩니다. Kotlin enum/sealed class는 여전히 존재하지만 밑줄로 감춰집니다.

기본 인수에 대해서는 SKIE가 선택적 인수를 수용하기 위해 다른 개수의 매개변수를 갖는 여러 개의 Swift 함수를 생성할 수 있습니다. 이 접근 방식은 호환성을 보장하지만 코드 크기가 커질 수 있다는 점을 유의해야 합니다.

# 플러그인 구성

<div class="content-ad"></div>

SKIE는 글로벌(global) 및 로컬(local) 두 가지 구성 옵션을 제공합니다.

## 글로벌 구성

이 접근 방식은 Gradle 파일 내에서 구성을 설정하는 것을 포함합니다

```js
skie { 
features { 
       group { 
          FlowInterop.Enabled(true) 
      } 
    }
}
```

<div class="content-ad"></div>

이 경우에는 Flow 상호 운용성 기능이 프로젝트 전체에서 기본적으로 활성화됩니다. 그러나 SKIE를 사용하면 특정 패키지에서 기능을 선택적으로 활성화할 수 있습니다. 코드베이스의 특정 부분에서만 Flow 지원이 필요한 경우 유용할 수 있습니다.

## 로컬 구성

코드베이스 내에서 SKIE의 동작을 더 세밀하게 제어할 수 있습니다. 이를 위해 코틀린 코드 내에서 직접 주석을 사용할 수 있습니다. 예를 들어 특정 함수마다 Flow 코드 생성을 활성화하거나 비활성화할 수 있습니다.

```js
@FlowInterop.Enabled
fun enabledFlow(): Flow<Int> = flowOf(1)

@FlowInterop.Disabled
fun disabledFlow(): Flow<Int> = flowOf(1)
```

<div class="content-ad"></div>

여기서 gradle 구성 옵션과 주석의 전체 목록을 확인할 수 있어요.

기본 설정으로, SKIE는 기본 인수를 제외한 모든 기능을 활성화합니다. 이는 선택적 인수를 처리하기 위해 여러 개의 Swift 함수를 생성하면 이진 크기가 증가할 수 있기 때문입니다. 필요에 따라 로컬 구성을 사용하여 기본 인수를 명시적으로 활성화할 수 있어요.

# 기존 프로젝트 이전

기존 프로젝트의 경우, SKIE 기능을 기본적으로 활성화하는 것은 좋은 아이디어가 아닐 수도 있어요. 기존 코드베이스에 SKIE를 활성화하는 것은 망가진 코드를 유발할 가능성이 매우 높습니다. SKIE의 각 기능을 활성화하는 것에 대한 위험을 검토해봅시다.

<div class="content-ad"></div>

- Sealed Classes: SKIE가 원본 sealed 클래스를 내보낸 Objective-C 헤더에 유지하고 병렬 Swift 열거형을 생성하기 때문에 Sealed 클래스를 활성화해도 안전합니다.
- Enums: SKIE는 이전의 Kotlin enum 이름을 가진 새로운 Swift enum을 생성하고 Kotlin enum 앞에 두 개의 밑줄을 붙여 숨깁니다. SKIE에 따르면, 열거형을 기본적으로 활성화하는 것은 컴파일 문제를 일으킬 수 있습니다.
- Default Arguments: 이 기능은 빌드 시간과 이진 크기를 상당히 증가시킬 수 있습니다. 기본적으로 비활성화되어 있지만 컴파일 문제를 일으키지 않을 것입니다.
- Suspend functions: Kotlin suspend 함수를 호출하기 위해 async/await를 사용하는 코드는 제대로 작동할 것이지만, 완료 블록을 전달하는 코드는 컴파일에 실패할 것입니다. 그리고 SKIE suspend 함수는 취소를 지원하기 때문에 예기치 않은 동작이 발생할 수 있습니다. 이 기능은 아마도 기본적으로 활성화되지 않아야 합니다. suspend 함수를 호출하고 완료 블록을 전달하는 코드가 없는 경우를 제외하고는요.
- Flow: 직접 Kotlin Flow를 사용하는 iOS 코드가 있다면 컴파일 문제에 직면할 가능성이 높습니다. 게다가, SKIE는 여러 Flow 상호 운용 솔루션을 사용하지 않기를 권장합니다. 예를 들어, KMP-NativeCoroutines를 사용하는 경우 이 기능을 비활성화해야 잠재적 충돌을 피할 수 있습니다.

# SKIE 주의사항

- SKIE가 Kotlin Flow를 Swift의 AsyncSequence로 표현하기 때문에 이 시퀀스에 직접 Flow 연산자를 사용할 수 없습니다.
- 저는 그래들 캐시에 문제가 있었습니다. 새 프로젝트에 SKIE 플러그인을 적용한 후 빌드 실패를 경험했습니다. 이를 해결하기 위해 저는 그래들 캐시를 비활성화해야 했습니다.
- SKIE는 링크 단계에서 특히 빌드 시간을 증가시키고 이진 크기를 늘릴 수 있습니다. 따라서, SKIE는 이를 관리하기 위해 내보낸 클래스/함수의 수를 제한하는 것을 권장합니다.

알려진 문제 및 제한 사항 목록을 확인할 수 있습니다.

<div class="content-ad"></div>

# 마지막으로

SKIE는 Swift와 Kotlin Multiplatform 개발 간의 간극을 줄이는 데 유용한 도구로 등장했습니다.

이 플러그인은 Kotlin Multiplatform의 FAQ에서 Swift에서 suspend 함수를 호출하고 Kotlin Flows를 관찰하는 데 가장 좋은 도구 중 하나로 언급되었습니다.

아직 제가 SKIE를 제품 애플리케이션에서 사용해 본 경험은 없지만, 빌드 시간과 이진 크기의 증가 가능성은 유효한 우려입니다. 다행히도, SKIE의 기능 선택의 유연성을 통해 개발자들은 필요한 경우에만 해당 기능을 활성화하여 이러한 우려를 완화할 수 있습니다.

<div class="content-ad"></div>

SKIE는 Kotlin Multiplatform을 사용하는 Swift 및 Android 개발자들을 위한 통합 개발 환경을 위한 중요한 한 걸음을 나타냅니다.

여기에서 코드 예제를 확인할 수 있습니다. Touchlab에서 제공한 샘플 및 ToDo 목록 기능이 포함되어 있습니다.