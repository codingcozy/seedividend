---
title: "안드로이드 시작하기 2024년 코틀린 프로그래밍 언어 입문 안내"
description: ""
coverImage: "/assets/img/2024-08-04-GettingStartedwithAndroidAnIntroductiontoKotlinProgrammingLanguage_0.png"
date: 2024-08-04 19:09
ogImage:
  url: /assets/img/2024-08-04-GettingStartedwithAndroidAnIntroductiontoKotlinProgrammingLanguage_0.png
tag: Tech
originalTitle: "Getting Started with Android An Introduction to Kotlin Programming Language"
link: "https://medium.com/@royanimesh2211/getting-started-with-android-an-introduction-to-kotlin-programming-language-dea82a6cf17c"
isUpdated: true
---

![Getting Started with Android: An Introduction to Kotlin Programming Language](/assets/img/2024-08-04-GettingStartedwithAndroidAnIntroductiontoKotlinProgrammingLanguage_0.png)

안녕하세요! 코틀린 프로그래밍을 통해 개발자가 더 생산적일 수 있습니다. 코틀린은 더 간결하고, 동일한 기능을 수행할 때 다른 프로그래밍 언어인 자바보다 코드 라인 수를 줄일 수 있게 해줍니다. 구글은 새로운 네이티브 안드로이드 앱을 만들 때 Kotlin을 추천하고 있습니다. 2017년 Google I/O에서 Kotlin이 안드로이드 개발을 공식적으로 지원할 것이라고 발표했습니다.

코틀린으로 개발된 앱은 안정적이고 사용자에게 훌륭한 사용자 경험을 제공하여 크래시할 가능성이 적습니다. 결과적으로, 코틀린은 산업에서 인기를 얻고 있으며, 현대적인 안드로이드 개발자들이 주로 사용하는 언어입니다.

이 글에서는 코틀린의 기본 언어 기능을 배우고 이 언어의 탄탄한 기반을 구축해보겠습니다.

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

이 문서를 따라가기 위해 무료로 제공되는 IntelliJ IDEA(Community Edition) IDE 또는 웹 기반의 Kotlin Playground를 다운로드할 수 있어요.

## 우리의 첫 번째 Kotlin 프로그램

```kotlin
fun main() {
    println("Hello, Kotlin!")
}
```

당신이 이미 이 프로그램이 무엇을 하는지 추측했다면 틀렸어요. 이 프로그램은 "Hello, Kotlin"을 출력해요.

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

## Kotlin 컴파일러

프로그래밍 언어는 사람들이 프로그램을 작성하고 읽고 협업할 수 있도록 이해할 수 있어야 합니다. 그러나 우리 컴퓨터는 바로 이해하지 못합니다. 당신이 작성한 Kotlin 코드를 Kotlin 컴파일러라는 것이 필요한데, 이는 당신이 작성한 Kotlin 코드를 한 줄씩 살펴보고 컴퓨터가 이해할 수 있는 형태로 번역합니다. 이 과정을 코드를 컴파일한다고 합니다. 실행 버튼을 누르고 코드에 오류가 없다면, 코드는 성공적으로 컴파일되어 프로그램이 실행되고 출력을 제공할 것입니다.

## Kotlin에서의 Main 함수

Kotlin 프로그램은 시작점인 main 함수를 가져야 합니다. main 함수는 프로그램이 실행되기 시작하는 장소입니다.

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

## 함수란 무엇인가요?

함수는 프로그램에서 특정 작업을 수행하는 세그먼트입니다. 프로그램에는 하나 이상의 함수가 있을 수 있습니다. 코드에서,

해당 작업을 수행하기 위해 필요한 모든 명령을 지정하여 먼저 함수를 정의합니다.

함수를 정의한 후에는 함수를 호출하여 함수의 명령이 실행되거나 수행될 수 있습니다.

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

# 함수 정의하는 방법

함수를 정의하는 데 세 가지 부분이 필요합니다:

- 함수에는 나중에 호출할 수 있는 이름이 필요합니다.
- 함수는 특정 작업을 수행하기 위해 전달해야 하는 정보인 입력 또는 매개변수도 필요합니다. 입력은 옵션이며 일부 함수는 입력이 필요하지 않을 수도 있습니다.
- 함수에는 명령을 포함한 본문이 있습니다.

예를 들어보겠습니다:

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
fun main() {
    println("Hello, Kotlin!")
}
```

- 함수 정의는 키워드 fun으로 시작합니다.
- 함수의 이름은 main입니다.
- 함수에는 입력 매개변수가 없습니다.
- 함수 본문에는 println 문이 하나만 있습니다.

Camel Case 형식으로 함수명 작성:

함수명은 카멜 케이스 규칙을 따라야 합니다. 함수명의 첫 번째 단어는 소문자로 시작하고 나머지 단어는 대문자로 시작해야 합니다. 예: calculateTip(), takePhoto(), callMeHere()

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

함수에서 값을 반환하기:

코틀린 함수는 코드의 다른 곳에서 사용할 수 있는 변수에 저장되는 반환 값을 생성할 수도 있습니다.

함수를 정의할 때 반환할 값의 데이터 유형을 지정할 수 있습니다. 반환 유형은 괄호 뒤에 콜론 (:)을 두고 공백 한 칸을 둔 다음 유형의 이름 (Int, String 등)을 지정하여 지정됩니다. 반환 유형과 여는 중괄호 사이에는 공백 한 칸이 추가됩니다. 함수 본문 안에서는 모든 문을 작성한 후 해당 함수가 반환해야 하는 값을 지정하는 반환 문을 사용합니다. 반환 문은 변수와 같은 값을 포함하는 반환 키워드 뒤에 값으로 구성됩니다.

예시:

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
fun birthdayGreeting(): String {
    val nameGreeting = "생일 축하해, Rover!"
    val ageGreeting = "지금 5살이야!"
    return "$nameGreeting\n$ageGreeting"
}
```

Unit 타입

기본적으로 반환 타입을 지정하지 않으면 기본 반환 타입은 Unit입니다. Unit은 함수가 값을 반환하지 않음을 의미합니다. Unit은 다른 언어의 void 반환 타입과 동등합니다 (Java 및 C의 void; Swift의 Void/빈 튜플(); Python의 None 등). 값을 반환하지 않는 함수는 암시적으로 Unit을 반환합니다.

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

보통 같은 용어로 사용되지만, 매개변수와 인수는 같은 것이 아닙니다. 함수를 정의할 때 함수를 호출할 때 전달할 매개변수를 정의합니다. 함수를 호출할 때, 매개변수에 대한 인수를 전달합니다. 매개변수는 함수에서 접근 가능한 변수들입니다. 예를 들어, 이름 변수입니다. 한편, 인수는 전달하는 실제 값입니다. 예를 들어, "Rover"라는 문자열입니다.

## Named Argument

Kotlin의 명명된 인수는 함수를 호출할 때 매개변수의 이름을 지정할 수 있습니다. 순서에 의존하는 대신에 매개변수 이름을 명시함으로써 코드의 가독성을 높이고 각 인수의 목적을 이해하기 쉽게 만듭니다.

다음은 간단한 예시입니다:

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
fun createUser(name: String, age: Int, email: String) {
 println(“Name: $name, Age: $age, Email: $email”)
}
```

```js
// Using named arguments
createUser(name = “Alice”, age = 30, email = “alice@example.com”)
```

이 예제에서는 함수 호출에 `name`, `age`, 그리고 `email`이 명시적으로 지정되어 있어서 어떤 값이 어떤 매개변수에 해당하는지 명확합니다. 이 방법은 특히 매개변수가 많은 함수나 일부 매개변수가 기본값을 가지는 경우에 유용합니다.

## 기본 인수 설정

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

코틀린에서는 기본 인수를 사용하여 함수의 매개변수에 기본값을 지정할 수 있습니다. 호출자가 기본값이 지정된 매개변수에 값을 제공하지 않으면, Kotlin은 대신 기본값을 사용합니다. 이 기능은 함수 호출을 간소화하고 오버로드된 함수가 필요한 경우를 줄일 수 있습니다.

다음은 예시입니다:

```kotlin
fun greet(name: String, greeting: String = “안녕하세요”) {
 println(“$greeting, $name!”)
}
```

```kotlin
// 두 개의 인수를 사용하여 호출
greet(“Alice”, “안녕”) // 출력: 안녕, Alice!
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

```js
// ‘greeting’의 기본값으로 호출하기
greet(“Bob”) // 출력: Hello, Bob!
```

## Kotlin 스타일 가이드

당신은 안드로이드 개발자로서 따라야 할 좋은 코딩 관행을 배우게 될 것입니다. 전체 가이드는 스타일 가이드라고 하며, 코드가 어떻게 서식이 지정되어야 하는지, 코드를 작성할 때 따라야 할 관습에 대해 설명합니다. 예를 들어, 스타일 가이드는 공백, 들여쓰기, 명명 등의 사용에 대한 권장 사항을 포함합니다. 스타일 가이드를 준수하면 코드가 더 가독성이 좋아지고 다른 안드로이드 개발자들의 코딩 관행과 일치합니다. 이 일관성은 대규모 프로젝트에서의 협업에 필수적이며, 모든 파일에서 일관된 코드 스타일을 유지하는 데 도움이 됩니다.

전체 스타일 가이드는 여기에 있습니다.

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

다음은 관련 스타일 권고 사항입니다:

- 함수 이름은 카멜 케이스여야 합니다.
- 보다 복잡한 프로그램을 작성할 때는 한 줄당 문자 수를 100자로 제한하는 것이 좋습니다. 이를 통해 프로그램의 모든 코드를 가로 스크롤 없이 쉽게 컴퓨터 화면에서 읽을 수 있습니다.
- 각 문장은 각자의 줄에 있어야 합니다.
- 여는 중괄호는 함수가 시작되는 줄 끝에 나타나야 합니다.
- 여는 중괄호 앞에 공백이 있어야 합니다.
- 함수 본문은 4칸 들여쓰기가 되어야 합니다.

## Kotlin에서 변수 생성 및 사용

컴퓨터 프로그래밍에서 변수란 데이터의 단일 컨테이너를 가리킵니다. 그 값을 포함한 상자로 상상할 수 있습니다. 상자에는 변수의 이름인 레이블이 있습니다. 변수의 이름으로 그 상자를 지칭함으로써 그 값에 액세스할 수 있습니다.

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

예를 들어: val name = "Animesh"

여기서 name은 String 데이터 유형의 변수입니다.

## 데이터 유형

Kotlin에서는 변수에 저장할 수 있는 데이터 유형을 명시하는 것이 중요합니다. Kotlin에는 일반적인 기본 데이터 유형이 있습니다. 아래는 몇 가지 데이터 유형입니다:

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

문자열: 텍스트 데이터를 포함하며, 예를 들어, "안녕, 코틀린", "일요일" 등이 포함됩니다.

정수: 정수 숫자를 포함하며, 예를 들어, 344, -1398, 55 등이 포함됩니다.

더블: 십진수를 포함하며, 예를 들어, 55.41, -13.98, 20.002010 등이 포함됩니다.

플롯: 더블보다 정밀하지 않은 십진수를 포함하며, 숫자 끝에 f나 F가 붙습니다. 예를 들어, 344.0, -1398.0, 55.0 등이 포함됩니다.

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

## val vs var 키워드

val: 변수 값이 변경되지 않을 것으로 예상될 때 사용합니다. 다른 프로그래밍 언어에 익숙하다면, val을 선언하는 것은 값을 읽기 전용 변수로 선언하는 것과 유사합니다.

var: 변수 값이 변경될 수 있다고 예상할 때 사용합니다. 값이 변경 가능(mutable)하다는 것을 의미하며, 값이 변경되거나 수정될 수 있습니다. 값은 변이될(mutated) 수 있습니다.

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

코틀린에서는 가능한 경우 var 키워드 대신 val 키워드를 사용하는 것이 좋습니다.

## 증가 및 감소 연산자

변수를 1씩 증가시키고 싶다면, 두 개의 플러스 기호로 이루어진 증가 연산자(++)를 사용할 수 있습니다. 변수 이름 바로 뒤에 이러한 기호를 사용함으로써 컴파일러에게 현재 변수 값을 1 더하고, 그 새로운 값을 변수에 저장하고 싶다고 알릴 수 있습니다. 다음 두 줄의 코드는 동일하지만, ++ 증가 연산자를 사용하는 것이 타이핑을 덜 할 수 있습니다.

```js
count = count + 1;
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

```js
count++;
```

만약 변수를 1 감소시키고 싶다면 감소 연산자를 사용할 수 있어요.

```js
count--;
```

## 코드 주석화

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

코드를 작성할 때 코드의 목적과 기능을 설명하는 주석을 포함하는 것이 유익합니다. 주석을 추가하면 다른 사람들이 코드를 이해하고 따라가기 쉬워집니다. 주석을 추가하려면 두 개의 슬래시 //를 사용하십시오. 이는 해당 라인에서 그 뒤에 오는 텍스트가 주석임을 나타내며 코드로 실행되지 않아야 함을 의미합니다. // 뒤에 공백을 추가하는 것이 가독성을 높이는 좋은 습관입니다.

한 줄 주석:

```js
// 이것은 한 줄 주석입니다.
height = 1; // 높이가 1이라고 가정합니다.
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

```js
/*
 * 이것은 여러 줄에 걸쳐 작성될 수 있는 아주 긴 주석입니다.
 */
```

Kotlin에서 더 많은 것을 탐구하고 숙달해야 할 부분이 많습니다. 이 글은 기본 개념에 대해 언급한 것 뿐입니다. 읽어주셔서 감사합니다. 앞으로 더 깊이 들어가서 안드로이드 개발에 관해 다룰 미래의 글을 기대해주세요.
