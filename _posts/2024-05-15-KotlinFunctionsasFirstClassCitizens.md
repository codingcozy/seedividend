---
title: "코틀린 함수가 일등 시민인 이유"
description: ""
coverImage: "/assets/img/2024-05-15-KotlinFunctionsasFirstClassCitizens_0.png"
date: 2024-05-15 10:25
ogImage: 
  url: /assets/img/2024-05-15-KotlinFunctionsasFirstClassCitizens_0.png
tag: Tech
originalTitle: "Kotlin: Functions as First Class Citizens"
link: "https://medium.com/@chetan-garg36/kotlin-functions-as-first-class-citizens-a88178c554dd"
isUpdated: true
---




코틀린에서 함수 구성 이해하기

![코틀린 함수](/assets/img/2024-05-15-KotlinFunctionsasFirstClassCitizens_0.png)

코틀린에서 함수는 일등 시민으로 취급되어 변수처럼 다룰 수 있습니다. 즉, 함수는 변수에 할당되거나 다른 함수에 매개변수로 전달되거나 함수에서 반환될 수 있습니다.

이를 통해 함수를 다양한 방식으로 결합하여 코드를 간소화하고 함수형 프로그래밍 패러다임을 사용할 수 있습니다.



자, 우리가 얻을 수 있는 몇 가지 기능들을 살펴봅시다!

## 변수에 값 할당하기 📝

이것에 대한 예시는 다음과 같습니다:

```js
// 선언
val foo : () -> Unit = {
    println("안녕 함수!")
}

// 사용
foo()

// 결과
안녕 함수!
```



참고: 네, 당신은 보통 또는 선언적으로 할 수 있습니다. 여기서는 함수 합성에 대해 이야기하고 있으므로 주석 섹션에서 소리치지 않아도 됩니다.

이 방법의 장점:

- 재사용성

변수에 저장해 두었기 때문에 코드베이스의 여러 곳에서 재사용할 수 있습니다.



```kotlin
// 현재 시간 계산
val currentTime: () -> Unit = {
    val currentTime = LocalTime.now()
    val formatter = DateTimeFormatter.ofPattern("HH:mm:ss")
    val formattedTime = currentTime.format(formatter)
    println("현재 시간은: $formattedTime")
}

// 보통은 호출하여 사용
currentTime()

// 또는 일정 간격으로

suspend fun repeatInterval(block: () -> Unit, delay: Long) {
    while (true) {
        delay(delay)
        block.invoke()
    }
}

fun main(){
    runBlocking {
        launch {
            // 매개변수로 전달하는 사용법
            repeatInterval(currentTime, 1000)
        }
    }
}
```

2. 가독성

익명 함수 대신 변수 이름을 전달하여 더 명확하게 만들 수 있습니다. 그렇지 않으면 전체 함수 블록을 읽어야 이해할 수 있습니다. 예시 :

```kotlin
repeatInterval({
  val currentTime = LocalTime.now()
  val formatter = DateTimeFormatter.ofPattern("HH:mm:ss")
  val formattedTime = currentTime.format(formatter)
  println("현재 시간은: $formattedTime")
  // 이것을 이해하려면 전체를 읽어야 합니다
 }, 1000)

// 대비

val currentTime: () -> Unit = {
    val currentTime = LocalTime.now()
    val formatter = DateTimeFormatter.ofPattern("HH:mm:ss")
    val formattedTime = currentTime.format(formatter)
    println("현재 시간은: $formattedTime")
}

repeatInterval(currentTime, 1000)
```



## 함수를 인수로 전달할 수 있어요 🔀

가장 흔한 사용 사례는 악명 높은 콜백 함수입니다. 예를 들어,

```js
// count complete callback
val countCompleteCallback : () -> Unit = {
    println("카운팅이 완료되었습니다!")
}

// 콜백을 인수로 전달
fun count10(callback:() -> Unit){
    (1..10).toList().joinToString().also(::println)
    callback.invoke()
}

// 트리거
count10(countCompleteCallback)

// 결과
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
카운팅이 완료되었습니다!
```

하지만 우리가 가장 흔히 하는 일은 무엇인지 되돌아보자



```js
(1..10).map { it -> it * it }.also(::println)
```

여기서 map 함수는 구문 설탕을 추가하고 있지만 실제 코드는 다음과 같습니다.

```js
(1..10).map ({ it -> it * it }).also(::println)

// 또는 

val double = { it -> it * it }
(1..10).map(double).also(::println)
```

맵 작업에서는 함수를 매개변수로 전달하고 있습니다. 이 방식은 모듈화되어 있고 집중적이어서 좋은 접근 방식입니다.



## 다른 함수에서 함수를 반환할 수 있어요 🔙

이것은 많은 사람들에게 이해하기 어려운 내용이지만, 이것을 기반으로 한 가장 유용한 팩토리 함수가 있어요. 예시를 보겠습니다:

```js
enum class Language {
    ENGLISH,
    FRENCH,
    HINDI
}

fun greet(language: Language, name: String) {
    val greetings = when (language) {
        Language.ENGLISH -> "Hello, $name!"
        Language.FRENCH -> "Bonjour, $name!"
        Language.HINDI -> "नमस्ते, $name!"
    }
    println(greetings)
}

greet(Language.HINDI, "Chetan") // नमस्ते, Chetan!
greet(Language.ENGLISH, "Chetan") // Hello, Chetan!
greet(Language.FRENCH, "Chetan") // Bonjour, Chetan!
```

이 프로그램은 언어와 이름을 인수로 사용하여 인사말을 출력합니다. 또는 이렇게도 할 수 있어요:



```js
enum class Language {
    ENGLISH,
    FRENCH,
    HINDI
}

fun greetFactory(language: Language): (String) -> Unit {
    // function within function
    val greetTo = { name: String ->
        val greetings = when(language){
            Language.ENGLISH -> "Hello, $name!"
            Language.FRENCH -> "Bonjour, $name!"
            Language.HINDI -> "नमस्ते, $name!"
        }
        println(greetings)
    }

    // returning function
    return greetTo
}

// mini function factories which are reusable
val englishGreeting = greetFactory(Language.ENGLISH)
val frenchGreeting = greetFactory(Language.FRENCH)
val hindiGreeting = greetFactory(Language.HINDI)

// use them separately 
hindiGreeting("Chetan") // नमस्ते, Chetan!
englishGreeting("Chetan") // Hello, Chetan!
frenchGreeting("Chetan") // Bonjour, Chetan!
```

추후에 좋아하는 경우에 우리가 다양한 함수 조합 방법을 알고 있다는 것을 걱정하지 마십시오.

## 커링 함수: 부분 실행 🥘

커링 함수 또는 부분 실행 함수는 함수를 반환하는 함수의 부작용입니다. 이를 사용하여 함수의 일부분만 실행할 수 있지만 모두 실행하는 것은 아닙니다. 한 예를 살펴보겠습니다 :



```kotlin
// 두 숫자를 더하는 커링된 함수를 정의했습니다
fun curriedAdd(firstNumber: Int): (Int) -> Int {
    val sumWith = { secondNumber: Int ->
        val sum = firstNumber + secondNumber
        sum
    }
    return sumWith
}

// 커링을 사용하여 부분적으로 적용된 함수를 생성합니다
val partialResult = curriedAdd(2) // 이 함수는 첫 번째 인수를 2로 고정합니다

// 이제 addTwo는 인수에 2를 더하는 함수입니다
val result1 = partialResult(3) 
val result2 = partialResult(10) 

println("Result1: $result1") // 결과: 2 + 3 = 5
println("Result2: $result2") // 결과: 2 + 10 = 12
```

여기서 `curriedAdd` 함수는 값 2로 부분 실행되며, 3이 전달될 때 완전 실행되어 결과를 반환합니다. 계산된 값들을 매개변수로 사용하는 경우 뒤에 계산을 완료한 값을로드할 수 있어 매우 편리합니다.

## 클로저 👯

클로저는 외부 함수 범위에 있는 변수에 접근할 수 있도록 내부 함수를 통해 제공합니다. 아래 예제를 참조하세요:




```js
fun countWithClosure(): () -> Unit {
    var counter = 0 // 외부 스코프에서 정의된 변수
    val innerFunction = {
        counter++ // 외부 스코프의 변수에 접근 및 수정
        println("Counter: $counter")
    }
    return innerFunction
}

val increment = countWithClosure()

increment() // 출력: Counter: 1
increment() // 출력: Counter: 2
increment() // 출력: Counter: 3
```

기본적으로 두 개의 함수인 외부 함수와 내부 함수가 역할에 관여하며, 내부 함수는 외부 함수 스코프에 접근할 수 있으며 내부 함수 스코프를 사용하여 외부 스코프의 값을 변경할 수 있습니다.

React에서 매우 인기 있는 기능으로 사용자 정의 후크를 만드는 데 사용되며, Kotlin에서 Jetpack Compose에서도 사용할 수 있습니다.

```js
val leakyClosure: () -> Unit = {
    // 여기서 컨텍스트나 다른 Composable에 액세스하면 메모리 누수가 발생할 수 있습니다.
}
```



## 함수는 데이터 구조에 저장될 수 있어요 💾

함수를 컬렉션/데이터 구조에 저장할 수 있어요:

```js
fun greet() {println("hello world!")}
fun farewell() {println("bye bye world!")}

val functions : List<()->Unit> = listOf(::greet, ::farewell)

// 리스트를 반복하며 각 함수를 호출해요
functions.onEach { it.invoke() }

// 결과
hello world!
bye bye world!
```

런타임에서 코드 동작을 조작할 수 있어요. 저는 지난 회사에서 실시간 매개 변수 값을 가져와 서버에 기록하기 위해 분석을 구축하는 데 사용했어요. 예를 들어:



```kotlin
fun logOnUserClicked () : Map<String,Any> { 
  ...
  return mapOf(
    "이메일" to datastore.userEmail,
    "안드로이드 버전" to BuildConfig.Version
  )
}

fun logOnBackPress () : Map<String,Any> { ...}

val events : List<()->Unit> = listOf(::logOnUserClicked, ::logOnBackPress)

events.forEach { event ->
  loggingSdk.log(event())
}
```

만약 지금 분석 시스템을 설계하는 방법에 대한 자세한 가이드가 필요하다면, 기사에 댓글을 달아주세요. 다음에 그에 맞는 내용을 만들어 보겠습니다.

함수를 객체에 저장할 수도 있습니다. 예를들어:

```kotlin
data class Calculator(
    val addition: (Int, Int) -> Int = { num1, num2 -> num1 + num2 },
    val subtraction: (Int, Int) -> Int = { num1, num2 -> num1 - num2 },
    val multiplication: (Int, Int) -> Int = { num1, num2 -> num1 * num2 },
)

val calculator = Calculator()

val result1 = calculator.addition(5, 3) // 결과: 8
val result2 = calculator.subtraction(10, 4) // 결과: 6
val result3 = calculator.multiplication(6, 2) // 결과: 12
```



객체 내에 함수를 저장하면 코드 구조를 더 잘 정의하고 강력하고 다재다능한 프로그래밍 기술을 구현할 수 있습니다.

## 익명 함수 🕵🏽‍♂️

일시적이거나 일회성 함수에 매우 유용합니다. 이름을 부여하지 않은 함수들이기 때문에 당연히 인라인 함수라고도 불립니다 — 그렇지 않았다면 왜 익명인지요?

이미 알고 계신 예시:



```js
(1..10).map { it -> it * it }.also(::println) // 결과: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
(1..10).filter { it -> it % 2 == 0 }.also(::println) // 결과: [2, 4, 6, 8, 10]
```

여기까지입니다. 읽어주셔서 감사합니다!

## - 삶 속에서의 업데이트 -

안녕하세요 👋! 저는 코틀린과 안드로이드 개발에서 7년 이상의 실무 경험을 보유하고 있습니다. 새로운 흥미로운 기회를 찾고 있습니다! 제 포트폴리오와 GitHub 기여를 살펴보시고, 회사에서 경험 많은 안드로이드 개발자가 필요하다면 chetan.garg36@gmail.com으로 연락해주세요. 또한 WhatsApp 번호 +91 8368928213로 연락하거나 LinkedIn에서 저와 연결할 수도 있습니다. 제 전문성을 귀하의 팀에 어떻게 가져다줄 수 있는지 이야기해 보겠습니다!