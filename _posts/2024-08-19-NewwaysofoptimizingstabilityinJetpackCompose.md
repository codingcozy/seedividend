---
title: "Jetpack Compose 안정성 최적화 방법 소개"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-19 03:20
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "New ways of optimizing stability in Jetpack Compose"
link: "https://medium.com/androiddevelopers/new-ways-of-optimizing-stability-in-jetpack-compose-038106c283cc"
isUpdated: true
updatedAt: 1724032950032
---

젯팩 컴포즈에서 클래스 안정성을 제어하는 새로운 강력한 스킵 모드가 변경되었습니다. 이 변경으로 앱의 다시 구성 최적화 방법이 변경됩니다. 이 블로그 포스트에서는 이 변경으로 해결되는 경우와 수동으로 제어해야 하는 부분을 다룰 것입니다. 또한 람다 함수를 기억해야 하는지, kotlinx 불변 컬렉션이 필요한지, 또는 도메인 모델 클래스를 모두 안정화하는 방법 등에 대한 자주 묻는 질문들을 다룰 것입니다. 안정성이 무엇인지 잘 모르겠다면, 개념을 배울 수 있는 문서를 확인해보세요.

# 강력한 스킵 모드 도입 전 안정성

젯팩 컴포즈 컴파일러가 클래스를 불안정하게 처리하는 이유는 여러 가지가 있습니다:

- 클래스가 가변 클래스인 경우. 예를 들어, 스냅샷 상태를 지원하지 않는 가변 속성이 포함된 경우.
- 젯팩 컴포즈를 사용하지 않는 Gradle 모듈에서 정의된 클래스인 경우(젯팩 컴파일러에 의존성이 없는 경우).
- 불안정한 속성이 있는 클래스인 경우(안정화 중첩).

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

다음과 같은 클래스를 고려해 봅시다:

```kotlin
data class Subscription(          // 클래스는 불안정합니다
    val id: Int,                  // 안정적
    val planName: String,         // 안정적
    val renewalOn: LocalDate      // 불안정
)
```

id 및 planName 속성은 변경할 수 없는 기본 유형으로 구성되어 있기 때문에 안정적입니다. 그러나 renewalOn 속성은 java.time.LocalDate가 Java 표준 라이브러리에서 가져온 것이며 Compose 컴파일러에 의존성이 없기 때문에 불안정합니다. 따라서 전체 Subscription 클래스는 불안정한 것으로 간주됩니다.

Subscription 클래스를 사용하는 상태 속성을 갖는 다음 예제를 고려해 보겠습니다. SubscriptionComposable에 전달됩니다.:

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

```kotlin
// 상태 보관을 만들기 (예: ViewModel)
var state by mutableStateOf(Subscription(
  id = 1,
  planName = "30일",
  renewalOn = LocalDate.now().plusDays(30)
))

@Composable
fun SubscriptionComposable(input: Subscription) {
    // 입력이 변경되었는지 여부와 관계없이 항상 recomposed됩니다.
}
```

과거에는 이러한 불안정한 클래스의 입력 매개변수를 가진 composable는 건너뛸 수 없는 것으로 결정되지 않고 변경 여부에 상관없이 항상 recomposed되었습니다.

# 강한 스킵 모드로 안정성

Jetpack Compose 컴파일러 1.5.4 이상에는 strong skipping mode를 활성화할 수 있는 옵션이 함께 제공됩니다. 이 모드는 입력 매개변수의 안정성과 관계없이 항상 스킵 로직을 생성하므로 불안정한 클래스를 가진 composables를 건너뛸 수 있게 합니다. strong skipping mode 및 활성화 방법에 대해 더 자세히 알아보려면 당사 문서 또는 Ben Trengrove의 블로그 게시물을 참조할 수 있습니다.

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

간편 스킵 모드는 입력 매개변수가 이전 조합과 다른지 확인하는 두 가지 방법이 있습니다:

- 클래스가 안정적인 경우 구조적 동등성(.equals())을 사용합니다.
- 클래스가 불안정한 경우 참조적 동등성(===)을 사용합니다.

프로젝트에서 강력한 스킵 모드를 활성화한 후, 불안정한 Subscription 클래스를 사용하는 컴포저블이 이전 조합과 동일한 인스턴스인 경우 재구성되지 않습니다.

예를 들어, 다른 composable Screen에서 사용되는 SubscriptionComposable이 있고 해당 composable Screen이 inputText 매개변수를 사용한다고 가정해 봅시다. inputText 매개변수가 변경되어도 구독 매개변수가 그대로인 경우, SubscriptionComposable은 재구성되지 않고 건너뜁니다.

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

```kotlin
@Composable
fun Screen(inputText: String, subscription: Subscription) {
    Text(inputText)

    // 구독 매개변수가 변경되지 않았을 때 생략됨
    SubscriptionComposable(subscription)
}
```

하지만 상태 변수를 업데이트하는 renewSubscription 함수가 있다고 가정해 봅시다. 현재 날짜로 바뀌어 최신 변경이 발생한 날짜를 추적합니다.

```kotlin
fun renewSubscription() {
   state = state.copy(renewalOn = LocalDate.now().plusDays(30))
}
```

copy 함수는 동일한 구조적 속성을 가진 클래스의 새 인스턴스를 생성합니다 (동일한 날에 발생하는 경우), 이로 인해 SubscriptionComposable은 다시 recompose되게 됩니다. 왜냐하면 강력한 스킵 모드에서는 불안정한 클래스를 참조 동등성(===)으로 비교하고 copy가 구독의 새 인스턴스를 생성하기 때문입니다. 날짜는 동일하지만 참조 동등성을 사용하기 때문에 구독을 recompose하게 됩니다.

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

# 주석을 사용하여 안정성 제어하기

구조적 데이터 변화가 없을 때 SubscriptionComposable의 recomposing을 방지하려면 (equals()가 동일한 결과를 반환할 때), Subscription 클래스를 수동으로 안정적으로 표시해야 합니다.

이 경우에는 클래스에 @Immutable 주석을 달아 간단히 수정할 수 있습니다. 여기서 표현된 클래스는 변경할 수 없기 때문에 안정적입니다:

```js
+@Immutable
-data class Subscription(       // 불안정함
+data class Subscription(       // 안정함
    val id: Int,                // 안정함
    val planName: String,       // 안정함
    val renewalOn: LocalDate    // 불안정함
)
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

이 예에서 renewSubscription을 호출할 때 SubscriptionComposable이 다시 건너뛰어집니다. 이제 이전 상태와 비교하여 true를 반환하는 equals() 함수를 사용하기 때문에 === 대신에 사용합니다.

## 언제 이런 일이 발생할 수 있나요?

@Immutable으로 클래스를 주석 처리해야 하는 현실적인 예는 데이터베이스 엔티티, API 엔티티, Firestore 변경 등 시스템 주변에서 가져오는 엔티티를 사용하는 경우입니다.

이러한 엔티티들은 기본 데이터에서 매번 파싱되므로 매번 새 인스턴스가 생성됩니다. 따라서 주석이 없으면 다시 구성됩니다.

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

# 안정성 구성 파일로 안정성 제어하기

코드베이스에 속하지 않은 클래스에 대해 안정화하는 유일한 방법은 해당 클래스를 코드베이스에 속한 클래스로 래핑하고 해당 클래스를 @Immutable으로 주석 처리하는 것이었습니다.

예를 들어, java.time.LocalDate 매개변수를 직접 허용하는 합성 가능한 컴포저블이 있는 경우를 고려해보세요:

```js
@Composable
fun LatestChangeOn(updated: LocalDate) {
  // 화면에 일(day) 매개변수 표시
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

renewSubscription 함수를 호출하여 최신 변경 사항을 업데이트하면 이전과 비슷한 상황에 빠지게 됩니다. 즉, 같은 날이든 아니든 LatestChangeOn 코모저블이 계속 recomposing을 유지하게 됩니다. 그러나 이런 상황에서는 클래스에 주석을 달 수 있는 방법이 없기 때문에 표준 라이브러리의 일부입니다.

이 문제를 해결하기 위해 안정성 구성 파일을 활성화할 수 있습니다. 이 파일에는 Compose 컴파일러에 의해 안정적으로 간주되는 클래스나 클래스 패턴이 포함될 수 있습니다.

활성화하려면 composeCompiler 구성에 stabilityConfigurationFile을 추가하십시오:

```js
composeCompiler {
  ...

  // 설정 파일의 경로 설정
  stabilityConfigurationFile = rootProject.file("stability_config.conf")
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

귀하의 프로젝트 루트 폴더에 stability_config.conf 파일을 생성하십시오. 해당 파일에 LocalDate 클래스를 추가하십시오:

```js
// add the immutable classes outside of your codebase
java.time.LocalDate

// alternatively you can stabilize all java.time classes with *
java.time.*
```

## 도메인 모델 클래스 안정화하기

코드베이스의 일부가 아닌 클래스 외에도, 안정성 구성 파일은 데이터나 도메인 모델 클래스를 모두 안정화하는 데 도움이 될 수 있습니다 (해당 클래스들이 불변이라고 가정). 이렇게 하면 도메인 모듈이 Java Gradle 모듈이 되어 Compose 컴파일러에 의존성을 필요로하지 않게 됩니다.

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
// model 패키지의 모든 클래스 안정화
com.example.app.domain.model.*
```

# 규칙을 어겼는지 주의하세요

가변 클래스에 @Immutable 주석을 달거나 안정성 구성 파일에 클래스를 추가하는 것은 여러분의 코드베이스에서 버그의 원인이 될 수 있습니다. 컴포즈 컴파일러가 계약을 확인하지 못하기 때문에, 여러분이 생각하기에 다시 구성되어야 할 때다 변하지 않는 것으로 표시될 수 있습니다.

# lambda를 remember() 하지 않아도 됩니다

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

강력한 스킵의 또 다른 장점은 구성에서 사용된 모든 람다를 "기억"한다는 것입니다. 심지어 불안정한 캡처를 사용하는 람다도 말이죠. 이전에는 불안정한 클래스(예: ViewModel)를 사용하는 람다가 recomposition의 원인이었을 수도 있습니다. 이를 해결하기 위한 일반적인 해결책 중 하나는 람다 함수를 기억하는 것이었습니다.

따라서 코드베이스에서 remember로 람다가 래핑되어 있다면, Compose 컴파일러에서 자동으로 수행하기 때문에 remember 호출을 안전하게 제거할 수 있습니다.

```js
Screen(
-removeItem = remember(viewModel){ { id -> viewModel.removeItem(id) } }
+removeItem = { id -> viewModel.removeItem(id) }
)
```

# 불변 컬렉션은 여전히 필요할까요?

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

과거에 kotlinx.collections.immutable 컬렉션들인 ImmutableList과 같은 것들은 List 항목들이 안정적이므로 recomposing이 발생하지 않도록 할 수 있었습니다. List 매개변수를 가지는 composable을 recomposing으로부터 방지하기 위해 코드베이스에 이러한 컬렉션들이 있는 경우, 그것들을 일반 List로 리팩토링하고 java.util.List를 안정성 구성 파일에 추가하는 것을 고려해볼 수 있습니다.

## 하지만!

만약 그렇게 하면, List 매개변수가 안정적이지 않을 때 composable이 더 느릴 수 있습니다!

안정성 구성 파일에 List를 추가하면 List 매개변수가 equals 호출과 비교되며, 이는 결과적으로 해당 목록의 각 항목에 대해 equals를 호출하게 됩니다. Lazy list의 경우, 똑같은 equals 확인은 잔목 composable의 관점에서 다시 호출되며, 결과적으로 많은 가시적 항목에 대해 equals() 호출을 두 번 계산하게 하며, 아마도 보이지 않는 모든 항목에게도 불필요하게 호출될 수 있습니다!

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

만약 List 매개변수를 포함하는 composable에 많은 다른 UI 구성 요소가 없다면, 다시 구성하는 것이 equals() 확인을 계산하는 것보다 더 빠를 수 있습니다.

그러나 여기에 일반적으로 적용할 수 있는 하나의 해결책은 없으므로, 벤치마크로 선택 사항을 확인해야 합니다!

# 요약

코드 베이스에서 강력한 스킵 모드를 활성화시켜서, 클래스를 수동으로 유지할 필요성을 줄일 수 있습니다. 일부 경우에는 여전히 수동으로 유지해야 할 수도 있지만, 이제 안정성 설정 파일로 간단하게 해결할 수 있습니다!

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

모든 이 변경 사항이 Compose에서 안정성에 대한 생각의 부담을 줄여줄 것을 희망합니다.

더 알고 싶으세요? Compose에서 실용적인 성능 문제 해결에 관한 코드랩을 참조하세요.

```js
이 블로그의 코드 조각은 다음 라이선스를 가지고 있습니다:
// Copyright 2024 Google LLC. SPDX-License-Identifier: Apache-2.0
```
