---
title: "알고리즘 프로그래밍 나 대 ChatGPT 비교 분석"
description: ""
coverImage: "/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_0.png"
date: 2024-07-12 21:52
ogImage: 
  url: /assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_0.png
tag: Tech
originalTitle: "Me Versus ChatGPT In Algorithmic Programming"
link: "https://medium.com/tech-ai-chat/me-versus-chatgpt-in-algorithmic-programming-dcf57bf4a41b"
---


## 소프트웨어 세계

![Image](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_0.png)

간단한 알고리즘을 코딩해보려고 생각 중이었어요. 10이 될 수 있는 랜덤 숫자 시퀀스를 출력하는 함수를 작성하고 싶어요.

다음 중 하나일 수 있어요:

<div class="content-ad"></div>

제가 직접 코드를 작성해보고 ChatGPT를 이용해서 결과를 확인해봤어요.

- 저는 더 나은 코드를 짜냐면, ChatGPT가 더 나은 알고리즘을 제공할까?
- ChatGPT는 신뢰할 만 하며, 코드 알고리즘적인 면에서 완전히 대체될 수 있을까요?

# 사용하는 인터페이스

비교를 더 쉽게하기 위해, 동일한 인터페이스를 사용했어요.

<div class="content-ad"></div>

```js
    fun generateRandomSequence(
        sumTarget: Int,
        minCount: Int = 1,
        maxCount: Int = sumTarget
    ): List<Int>
```

여기서

- sumTarget은 생성된 숫자 시퀀스를 더할 때의 총 합입니다.
- minCount는 생성할 숫자 시퀀스의 최소 숫자 개수입니다. 예를 들어, 2인 경우 최소 2개의 숫자를 생성해야 합니다.
- maxCount는 생성할 숫자 시퀀스의 최대 숫자 개수입니다. 예를 들어, 3인 경우 3개의 숫자를 생성하거나 그 이하로 생성해야 합니다.

## 테스트

<div class="content-ad"></div>

위의 기준과 일치하도록 프로그램하는지 확인하기 위해, 최소 개수와 최대 개수의 모든 가능한 조합을 반복하는 테스트를 만듭니다. 30번의 반복에서 여러 개수를 테스트하고 디버깅할 수 있습니다. ChatGPT 알고리즘과 저의 코드를 모두 테스트하며 확인할 수 있어요.

```js
@org.junit.Test
fun generateRandomSequence() {
    val numbersGenerator = NumbersGenerator()
    val target = 10

    val sequences = mutableListOf<List<Int>>()
    (1..target).forEach { minCount ->
        (minCount..target).forEach { maxCount ->
            repeat(30) {
                print("min = $minCount, max = $maxCount ~~~ ")
                val sequence = numbersGenerator.generateRandomSequence(target, minCount, maxCount)
                println(sequence)
                assert(sequence.sum() == target) { println("Sum should equal target") }
                assert(sequence.size >= minCount) { println("Size should be equal or larger than minCount") }
                assert(sequence.size <= maxCount) { println("Size should be equal or smaller than minCount") }
                sequences.add(sequence)
            }
        }
    }

    println("Summary")
    val summary = sequences.groupBy { it.size }
    summary.forEach {
        println("${it.key} ${it.value.size}")
    }
    println("Detail")
    sequences.sortedBy { it.size }.asReversed().forEach {
        println("${it.size} : $it")
    }
}
```

# 제 알고리즘

이 문제를 해결하기 위한 직관적인 방법은 각 숫자를 순차적으로 생성하는 것입니다.

<div class="content-ad"></div>

가정 시 sumTarget이 10인 경우, 아래는 작동 방식입니다.

![image](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_1.png)

- 첫 번째 숫자는 1에서 10 사이의 임의의 숫자로 시작합니다. 예를 들어, 4의 임의의 값 생성
- 다음 숫자는 1에서 10 사이의 난수가 4보다 작은 값으로 지정됩니다 (10-4), 즉 6이 될 것입니다. 예를 들어, 1의 임의의 값 생성
- 다음 숫자는 1에서 6 사이의 난수가 1보다 작은 값으로 지정됩니다 (6-1), 즉 5가 될 것입니다. 예를 들어, 5의 임의의 값 생성
- 이제 값이 10이 되도록 합산합니다. 알고리즘이 종료됩니다. [4, 1, 5]의 시퀀스가 생성되었습니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int = 1,
    maxCount: Int = sumTarget
): List<Int> {

    val random = Random
    val sequence = mutableListOf<Int>()
    var currentSum = 0

    while (currentSum < sumTarget) {
        val randomTop = sumTarget - currentSum
        val randomNumber = random.nextInt(1, randomTop + 1)
        sequence.add(randomNumber)
        currentSum += randomNumber
    }

    return sequence
}
```

<div class="content-ad"></div>

## 최대 카운트 처리

이전에 적은 내용은 좋아요. 숫자의 무작위 시퀀스가 항상 1부터 총합 사이에 있으면 좋은데요.

그런데 만약 우리가 합계 목표보다 작은 최대 카운트를 가지고 싶다면 예를 들어

- 최대 카운트는 2입니다.
- 합계 목표는 10입니다.

<div class="content-ad"></div>

이전 알고리즘을 사용할 수 없습니다. 왜냐하면 2를 누르기 전에 충분한 합계를 생성하지 못할 수도 있기 때문입니다.

- 첫 번째 숫자에 4를 생성하고 두 번째 숫자에 1을 사용하면 5의 합만 얻게 되어 10보다 작습니다! 💥

이 문제를 해결하기 위해 우리는

- 최대 카운트 이전에 두 번째 마지막 숫자를 생성하고 아직 합계 대상에 도달하지 않은 경우 프로세스를 종료해야 합니다.
- 그런 다음, 현재까지의 총 합계가 아닌 합계 대상에서 현재까지의 총 합계를 뺀 값을 사용하여, 마지막 값이 전체 합 중 대상 합계에 도달하도록 할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_2.png" />

```kotlin
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int = 1,
    maxCount: Int = sumTarget
): List<Int> {

    val random = Random
    val sequence = mutableListOf<Int>()
    var currentSum = 0

    while (currentSum < sumTarget) {
        if (sequence.size == maxCount - 1) {
            val lastElement = sumTarget - currentSum
            sequence.add(lastElement)
            break
        }
        val randomTop = sumTarget - currentSum
        val randomNumber = random.nextInt(1, randomTop + 1)
        sequence.add(randomNumber)
        currentSum += randomNumber

    }

    return sequence
}
```

위의 로직에서는 max에 도달하기 전에 남은 요소를 확인하여 maxCount = 1 경우를 고려합니다. 마지막 값만을 처리하고 더 이상 무작위 값을 생성하지 않습니다.

## 최소 개수 처리

<div class="content-ad"></div>

최소 개수가 1보다 큰 경우를 고려하여 팩터를 만들 때, 1부터 목표 합계까지의 임의 범위로 시작할 수 없습니다.

- 최소 개수가 2이고 목표 합계가 10이라고 가정해 봅시다.
- 초기 임의 범위를 1부터 10으로 시작하면, 10이 생성될 수 있습니다. 이후 숫자를 생성할 수 없게 됩니다. 왜냐하면 최종 합계가 10을 초과하게 되기 때문입니다! 💥 (0 또는 음수 값을 허용한다면 가능하지만, 그렇게 하고 싶지 않아요)

이를 해결하기 위해, 최소 개수를 가진 경우 초기 최소 랜덤 숫자는 조금 더 작아야 하며, 최소 개수를 맞추기 위해 더 많은 숫자를 생성할 수 있도록 여유 공간을 제공해야 합니다. 예시:

- 최소 개수가 2이고 목표 합계가 10이라고 가정해 봅시다.
- 그렇다면 첫 번째 임의 범위는 1부터 9까지여야 합니다. 수학적으로, 이는 1부터

<div class="content-ad"></div>

정확히 말하자면, 숫자를 더 많이 생성할수록 최대 난수 범위가 줄어드는 경우, 룰은 다음과 같습니다.

이제 이 공식을 가지고 아래와 같이 알고리즘을 프로그래밍할 수 있습니다. 다음을 가정해 봅시다.

- 최소 카운트는 2입니다.
- 최대 카운트는 4입니다.
- 합계 타겟은 10입니다.

아래는 생성된 숫자의 가능한 시나리오입니다. 즉, [4, 1, 3, 2]

<div class="content-ad"></div>

<img src="/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_3.png" />

알고리즘은 아래와 같습니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int = 1,
    maxCount: Int = sumTarget
): List<Int> {
    val random = Random
    val sequence = mutableListOf<Int>()
    var currentSum = 0

    var minRemaining = minCount

    while (currentSum < sumTarget) {
        if (sequence.size == maxCount - 1) {
            val lastElement = sumTarget - currentSum
            sequence.add(lastElement)
            break
        }
        val randomTop = sumTarget - currentSum - (minRemaining - 1)

        val randomNumber = random.nextInt(1, randomTop + 1)
        sequence.add(randomNumber)
        currentSum += randomNumber

        if (minRemaining > 1) minRemaining--
    }

    return sequence
}
```

## 추가적인 고려 사항

<div class="content-ad"></div>

위의 작업이 완료되면 제가 원하는 대로 작동합니다. 그러나 한 가지 제한이 있습니다.

무작위 범위가 더 큰 범위에서 더 작은 범위로 이동하는 것을 알 수 있습니다.

<img src="/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_4.png" />

따라서 생성된 숫자는 큰 숫자가 먼저 나오고, 결국 작은 숫자가 나오는 경향이 있습니다.

<div class="content-ad"></div>

이상적이지 않아요. 완전히 무작위를 원하기 때문에 나중에 높은 수를 생성할 가능성이 같다면 해당 수를 먼저 생성할 확률도 동일합니다. 다행히 이 문제를 해결하기 위해 최종 결과를 피할 수 있어요.

대신 return 시퀀스 대신 sequence.shuffled()를 반환할 수 있어요.

그럼 그렇게 하고 추가적인 타당성 검사를 통해 (required 사용하여), 아래는 제 알고리즘 코드입니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int = 1,
    maxCount: Int = sumTarget
): List<Int> {
    require(maxCount <= sumTarget)
    require(minCount <= maxCount)
    require(minCount >= 1)

    val random = Random
    val sequence = mutableListOf<Int>()
    var currentSum = 0
    
    var minRemaining = minCount

    while (currentSum < sumTarget) {
        if (sequence.size == maxCount - 1) {
            val lastElement = sumTarget - currentSum
            sequence.add(lastElement)
            break
        }

        val randomTop = sumTarget - currentSum - (minRemaining - 1)
        print("$randomTop ($minRemaining) ")
        require((randomTop >= 1) && (randomTop <= sumTarget))

        val randomNumber = random.nextInt(1, randomTop + 1)
        sequence.add(randomNumber)
        currentSum += randomNumber

        if (minRemaining > 1) minRemaining--
    }

    return sequence.shuffled()
}
```

<div class="content-ad"></div>

이제 위에 어떻게 코드하는지 보셨어요. 이제 ChatGPT가 어떻게 작동하는지 보겠습니다.

# ChatGPT 알고리즘

ChatGPT (https://chat.openai.com/)은 이제 더 이상 모르는 사람이 없죠. 많은 잠재력을 가지고 강력해요. 그래서 제가 궁금해서 어떤 모습을 보여줄지 확인해보려고 했어요.

ChatGPT에서 여러번 시도해봤어요. 처음 몇 번은 꽤 밋밋하고 실망스러웠지만, 마지막 시도는 제게 꽤 인상깊게 다가왔어요.

<div class="content-ad"></div>

## **첫 번째 시도**

ChatGPT에게 명확한 지침을 제공하는 것을 첫 번째 시도로 합니다.

```kotlin
// 다음과 같은 이름과 매개변수를 가진 Kotlin 함수를 작성하세요
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int>
```

이 함수는 다음을 수행합니다.
- sumTarget 값을 받습니다.
- 숫자의 합이 sumTarget이 될 무작위 정수 시퀀스를 생성합니다.
- 무작위 정수의 수는 minCount에서 maxCount로 제한됩니다.
- 함수는 정수 숫자를 포함한 목록을 반환합니다.

<div class="content-ad"></div>

```kotlin
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int> {
    require(minCount <= maxCount) { "minCount는 maxCount보다 작거나 같아야합니다." }

    val count = if (minCount == maxCount) minCount else Random.nextInt(minCount, maxCount + 1)
    val sequence = mutableListOf<Int>()

    repeat(count - 1) {
        val randomNumber = Random.nextInt(1, sumTarget - sequence.sum())
        sequence.add(randomNumber)
    }

    sequence.add(sumTarget - sequence.sum())

    return sequence
}
```

![이미지](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_5.png)

현재 코드는 동작하는 것처럼 보이지만 버그가 있습니다. 아래와 같은 에러로 인해 앱이 충돌할 수 있습니다.

bound must be greater than origin
java.lang.IllegalArgumentException: bound must be greater than origin
at java.base/jdk.internal.util.random.RandomSupport.checkRange(Unknown Source)
at java.base/java.util.random.RandomGenerator.nextInt(Unknown Source)


<div class="content-ad"></div>

이는 1에서 10 사이의 임의의 값을 생성할 수 있기 때문입니다. 초기 값으로 9가 생성되는 경우 이후 값은 10-9로 표시되어 충돌이 발생합니다.

```js
Random.nextInt(1, sumTarget - sequence.sum())

// Will be
Random.nextInt(1, 10 - 9)

// Will be which will crash
Random.nextInt(1, 1)
```

크래시를 발생시킬 수 있는 프로그램을 생성하는 것은 꽤 실망스럽습니다.

## 두 번째 시도

<div class="content-ad"></div>

위 내용을 통해 ChatGPT에게 말합니다.

```js
때로 코드를 실행하면 다음과 같은 오류가 발생할 수 있습니다.
```
java.lang.IllegalArgumentException: bound must be greater than origin

다음 줄에서<br>

val randomNumber = Random.nextInt(1, sumTarget - sequence.sum())


이것을 고칠 수 있을까요?


그럼 빠르게 다음 코드를 생성합니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int> {
    require(minCount <= maxCount) { "minCount must be less than or equal to maxCount" }

    val count = if (minCount == maxCount) minCount else Random.nextInt(minCount, maxCount + 1)
    val sequence = mutableListOf<Int>()

    repeat(count - 1) {
        val remainingSum = sumTarget - sequence.sum()
        val randomNumber = if (remainingSum > 0) Random.nextInt(1, remainingSum) else 0
        sequence.add(randomNumber)
    }

    sequence.add(sumTarget - sequence.sum())

    return sequence
}
```

<div class="content-ad"></div>

당연한데, 그것은 문제를 해결하지 못해. 남아있는 잔액은 여전히 1일 수 있고, 결과적으로 아래의 일이 계속 발생할 거야. 그리고 알고리즘 전체는 여전히 변하지 않았어.

```js
// Will be which will crash
Random.nextInt(1, 1)
```

## 세 번째 시도

그래서 계속해서 ChatGPT에게 아래와 같이 물어보세요.

<div class="content-ad"></div>

```js
남아있는 합계 (remainingSum)은 여전히 1이 될 수 있고, 그렇게 되면 코드가 충돌할 수 있어요. 이 문제를 해결해줄 수 있을까요?
```

이제 문제가 수정되었습니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int> {
    require(minCount <= maxCount) { "minCount는 maxCount보다 작거나 같아야합니다." }

    val count = if (minCount == maxCount) minCount else Random.nextInt(minCount, maxCount + 1)
    val sequence = mutableListOf<Int>()

    repeat(count - 1) {
        val remainingSum = sumTarget - sequence.sum()
        val randomNumber = if (remainingSum > 1) Random.nextInt(1, remainingSum) else 1
        sequence.add(randomNumber)
    }

    sequence.add(sumTarget - sequence.sum())

    return sequence
}
```

동일한 알고리즘을 사용하면서 코드 충돌 문제가 해결되었습니다. 멋져요! ChatGPT는 코드 문제 해결에 대해 알고 있네요. 여전히 위와 동일한 알고리즘을 기반으로 합니다.

<div class="content-ad"></div>

그러나, … 결과로 나타낼 수 있습니다.

숫자는 0 또는 음수가 될 수 있습니다.

정확히 잘못된 것은 아니지만, 0이나 음수를 원치 않는 것을 명시하지 않았습니다. 그러나 이것은 제가 기대하는 것이 아닙니다. 따라서 ChatGPT에 추가 지시를 제공해야 합니다.

## 네 번째 시도

<div class="content-ad"></div>

여기에 도와줍니다.

```js
생성된 숫자 시퀀스 중 어떤 숫자도 0 또는 음수 값이 없게 할 수 있을까요?
```

ChatGPT가 다시 생성합니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int> {
    require(minCount <= maxCount) { "minCount must be less than or equal to maxCount" }

    val count = if (minCount == maxCount) minCount else Random.nextInt(minCount, maxCount + 1)
    val sequence = mutableListOf<Int>()

    repeat(count - 1) {
        val remainingSum = sumTarget - sequence.sum()
        val randomNumber = if (remainingSum > 1) Random.nextInt(1, remainingSum) else 1
        sequence.add(randomNumber)
    }

    val lastNumber = sumTarget - sequence.sum()
    sequence.add(if (lastNumber > 0) lastNumber else 1)

    return sequence
}
```

<div class="content-ad"></div>

알고리즘은 다시 위와 유사합니다. 더 이상 0 또는 음수가 없습니다.

하지만 목표 합계가 10 인 경우와 같이 결과를 생성합니다.

여기서 9+1+1 = 11인데, 이는 목표 합계보다 크고 잘못된 결과입니다(원래 주어진 요구 사항에 따르면 합계는 목표 합계와 같아야 합니다).

## 다섯 번째 시도 (최종 시도)

<div class="content-ad"></div>

그러면 이제 ChatGPT에게 문제에 대해 말하고, 요구 사항을 다시 상기시켜볼게요.

위의 코드는 때때로 합산 목표(sumTarget)보다 큰 숫자 시퀀스를 생성할 수 있어요. 시퀀스의 합이 sumTarget과 정확히 일치하도록 할 수 있을까요?

제 생각에는 ChatGPT가 항상 사용하던 알고리즘을 개선하고 수정할 것이라고 생각했어요. 놀랍게도, 아래처럼 완전히 다른 알고리즘을 생성했어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_6.png)

정말 쉽게 이해할 수 있는 알고리즘이지만, 기존 방식과는 매우 다른 사고 방식입니다.

이렇게 알고리즘 플로우를 사용해본 적이 없어서 감명받았어요. 설정된 요구 사항을 충족시킬 것이 보장됩니다.

# 결과 비교


<div class="content-ad"></div>

비록 두 알고리즘이 모두 내 요구 사항을 충족시켰지만, 서로에 비해 각기 다른 장점을 가지고 있어요.

## 1. 이해하기 쉽다

내 알고리즘을 보면, 코드를 천천히 추적하고 흐름을 이해하지 않으면 무엇을 하는지 알기가 어려워요.

<div class="content-ad"></div>

아래 ChatGPT가 생성한 코드는 더 짧고 이해하기 쉽습니다.

```js
fun generateRandomSequence(
    sumTarget: Int,
    minCount: Int,
    maxCount: Int
): List<Int> {
    val count = if (minCount == maxCount) minCount else Random.nextInt(minCount, maxCount + 1)
    val sequence = MutableList(count) { 1 } // 모두 1로 초기화

    repeat(sumTarget - count) {
        val randomIndex = Random.nextInt(count)
        sequence[randomIndex] += 1
    }

    return sequence
}
```

판정: ChatGPT가 더 나은 것 같아요

## 2. 생성된 요소 수의 무작위성

<div class="content-ad"></div>

만약 100만 번의 생성을 통해, 번호의 시퀀스(요소 수)가 얼마나 무작위로 생성되는지 확인해보도록 해줄게.

내 알고리즘은 다음과 같은 결과를 가져올거야:

- 다른 것들보다 3개 이상의 요소가 더 많이 나올 것이며, 이것이 가장 많이 나올 확률이기 때문이야.
- 시퀀스의 높은 수를 맞출 가능성은 극히 낮을 거야. 예를 들어, 10개의 요소를 맞출 확률은 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]으로 나오는데, 이는 10¹⁰의 확률인 1/(10¹⁰)인데, 우리가 시퀀스를 100만 번 생성해도 불가능할 거야.
- 한 요소를 맞출 확률, 즉 [10]를 맞출 확률은 거의 1/10인데, 약 10만 번(100만 번 중) 나올 거야.

![이미지](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_7.png)

<div class="content-ad"></div>

그래서 실제로 예상한 일반적인 무작위성과 일치해요.

**ChatGPT**

ChatGPT 알고리즘은 첫 번째 무작위 숫자에 의해 생성해야 하는 요소의 개수가 결정되므로 1 요소에서 10 요소 시퀀스의 숫자를 균등하게 생성할 거예요.

각각의 확률은 1/10이에요. 따라서 아래와 같이 결과가 균등하게 나올 것이에요.

<div class="content-ad"></div>

![image](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_8.png)

요거 말이 좀 거북한데, 비슷한 숫자의 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]이 다른 것들과 비교될 것 같아.

만약 균등하게 퍼뜨리길 원한다면, ChatGPT가 더 낫겠지. 그치만 종합적으로 생각하면 내 알고리즘이 랜덤한 면에 더 적합한 것 같아.

판단: 내 알고리즘이 더 낫다

<div class="content-ad"></div>

## 3. 생성된 숫자의 무작위성

내 알고리즘에서 생성된 무작위 숫자는 요소가 증가함에 따라 천천히 감소할 것입니다. 예를 들어,

![이미지](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_9.png)

요소가 증가함에 따라 무작위성이 줄어드는 것을 알 수 있습니다. 따라서 처음에는 더 큰 숫자를 얻는 것이 더 가능하며, 나중에는 숫자가 줄어듭니다.

<div class="content-ad"></div>

문제를 해결하기 위해서는 shuffled()를 사용하여 결과를 나중에 섞어야 합니다.

ChatGPT

ChatGPT에서는 항상 일정한 랜덤 숫자 대신에 후에 결과를 섞기 위해 slowly increment each element를 생성합니다. 이는 요소 간의 무작위성을 향상시킵니다.

![이미지](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_10.png)

<div class="content-ad"></div>

결론: ChatGPT가 더 나아요

## 4. 알고리즘 속도

체크와 로깅을 주석 처리하여, 10,000번, 100,000번 및 1,000,000번을 실행한 결과를 비교했을 때, 두 알고리즘의 시간을 비교할 수 있었습니다. ChatGPT가 약간 선두에 있지만, 둘 다 비슷한 성능을 보여줍니다.

<div class="content-ad"></div>



![2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_11.png](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_11.png)

![2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_12.png](/assets/img/2024-07-12-MeVersusChatGPTInAlgorithmicProgramming_12.png)

결론: 양쪽 다 무승부입니다.

# 전체적인 결론


<div class="content-ad"></div>

내 알고리즘이 ChatGPT보다 나은 것 같다고 말하는 것을 좋아하지만, 이 경험을 통해 ChatGPT가 나에게 놀라움을 준 점을 알 수 있었어요.

- 나의 초기 요구 사항을 충족하는 완전히 다른 알고리즘을 생성할 수 있었어요.
- 일을 하는 다른 관점을 제시했어요. 새로운 사고 방식을 배웠어요.
- 내 요구사항이 명확하지 않았다는 것을 보여줬어요 (0 또는 음수가 나오지 않도록 설정하지 않은 것을 깜빡함). 그래서 원하는 대로는 아니지만 합법적인 결과물을 생성했어요. 요구 사항을 명확히 해야겠어요.
- 더 나은 결과를 얻을 수 있도록 계속 지시한다면 개선이 가능할 것 같지만, 더 강력한 새로운 ChatGPT 버전이 있을 수 있어서 더 나은 결과를 가져올 수도 있을 거 같아요.

결국, ChatGPT는 분명히 도움이 된다고 생각해요.

말한 바에 따라, 놀라운 사실로, ChatGPT(참고: 저는 ChatGPT 3.5를 사용 중입니다)

<div class="content-ad"></div>

- 때로는 요구 사항을 명백히 위배하는 버그 있는 코드를 만들기도 하고, 디버깅이 필요해서 확인하고, 더 잘하도록 지시해야 합니다.
- 알고리즘은 점진적 변경 대신 대폭 변경됩니다. 이러한 예측할 수 없는 행동은 ChatGPT가 점진적 변경을 하는 동안 다른 변수가 그대로 유지되는 것을 보장하기 어렵게 만듭니다.
- ChatGPT에 대한 안내서를 매우 정확하게 작성해야 합니다. 출력물에 도달하고 문제를 가리켜야 합니다. 말 그대로 지도해야 합니다. 그러므로 제가 여전히 제대로 활용하기 위해 상당히 기술적으로 유지해야 합니다.

전반적으로, ChatGPT가 무엇을 할 수 있는지 더 나은 학습을 할 수 있어서, 다른 알고리즘으로 놀라움을 느끼게 되는 등 저에게 이득입니다. 저는 현재(적어도 지금은) 경쟁자보다는 친구라고 생각합니다.