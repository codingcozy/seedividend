---
title: "읽기 쉬운 코드를 작성하는 방법 10가지"
description: ""
coverImage: "/assets/img/2024-07-12-ClearCodeHowToWriteCodeThatIsEasyToRead_0.png"
date: 2024-07-12 21:30
ogImage: 
  url: /assets/img/2024-07-12-ClearCodeHowToWriteCodeThatIsEasyToRead_0.png
tag: Tech
originalTitle: "Clear Code: How To Write Code That Is Easy To Read"
link: "https://medium.com/didact-publication/clear-code-how-to-write-code-that-is-easy-to-read-fc8f12820592"
---


이 기사는 나의 구현(코드)을 기억하지 못하는 것에 대처하는 방법에 대해 트윗한 후속 기사입니다. 당신에게는 재미있을 수도 있지만, 사실 글을 쓰고 나면 금방 내가 무엇을 썼는지 잊어버리곤 합니다.

먼저, 간결(짧은) 코드 대신 더 가독성 좋은 코드를 작성하려는 이유에 대해 이야기할 것입니다. 그 후에 다음과 같은 전략들을 통해 어떻게 그것을 할 수 있는지 알아볼 것입니다:

- 변수, 클래스, 함수의 명명
- 도우미 함수
- 코드 주석
- Enum/사전/Sealed 클래스/기타
- 패키지 구성 및 명명

![이미지](/assets/img/2024-07-12-ClearCodeHowToWriteCodeThatIsEasyToRead_0.png)

<div class="content-ad"></div>

# 효율성은 더 적은 키 입력으로 오는 걸까요?

저는 주니어 개발자로서 식별자에 대해 짧거나 축약된 이름(개발자들이 이름을 지을 수 있는 모든 코드 구성 요소)을 사용하는 것이 더 효율적이라고 생각했던 기억이 납니다.

제 논리는 간단했습니다: 더 적은 시간이 걸린다면 작업을 더 빨리 완료할 수 있을 것이라고 생각했거든요.

만약 다음 사항들이 사실이라면, 이 논리는 옳을 수 있습니다:

<div class="content-ad"></div>

- 저나 다른 사람이 과거에 작성한 내용을 다시 읽거나 수정할 필요가 없게 되었어요.
- 함수를 읽을 때 변수 또는 여러 변수가 무엇인지 자주 까먹지 않았어요.
- 실제로 복잡하고 이해하기 어려운 코드를 가끔 작성할 필요가 없었어요.
- 어색하거나 불편한 외부 라이브러리 함수, 클래스 또는 속성의 이름을 더 적절한 것으로 바꿀 수 있었어요.

중요한 점은 저에게는 간결함이 실제로 시간을 절약하는 경우가 드물다는 것이에요. 게다가 현대적인 IDE들은 코드 완성이라는 유용한 기능을 가지고 있어 대부분의 키 입력을 절약해줘요.

마음에 들지 않을 수도 있는데, 괜찮아요! 이 글에서 당신에게 도움이 될 내용은 취하고 나머지는 버려도 돼요.

이제 코드를 더 쉽게 읽을 수 있게 하기 위해 제가 하는 방법을 공유할게요. 제가 사용하는 코드 예제는 코틀린으로 되어 있지만, 제가 전하는 내용은 대부분의 플랫폼과 언어에 적용될 수 있어요.

<div class="content-ad"></div>

# 클래스, 변수 및 함수의 명명 방법

소프트웨어 entity의 이름 짓는 방법을 배울 때 알아야 할 두 가지 중요한 사항을 살펴봅니다. 이 용어인 "소프트웨어 entity"는 다음 중 하나를 의미합니다:

- 클래스, 구조체, 객체
- 변수, 값, 참조, 포인터
- 함수, 메서드, 알고리즘, 명령어
- 인터페이스, 프로토콜, 추상화

마침내, 프로그래머가 이름을 지정하는 모든 것들을 포함합니다.

<div class="content-ad"></div>

## 이름은 얼마나 구체적이어야 하는가

소프트웨어 개체에 이름을 지을 때 제 목표는 이렇습니다: 이름은 소프트웨어 개체가 무엇을 하는지 또는 무엇인지에 대한 혼란을 줄여야 합니다.

어떻게 무언가를 하는지에 대한 세부 정보는 대개 필요하지 않습니다.

소프트웨어 개체의 문맥(주변 모든 것), 특히 함수 및 변수 등의 수준에서의 문맥은 중요합니다. 어떤 것은 문맥에 따라 더 많거나 더 적은 세부 정보가 필요할 수 있습니다.

<div class="content-ad"></div>

세 가지 예시를 살펴보겠습니다:

- getFormattedDate(date: String) : String
- getYYYYMMDDFormattedDate(date: String) : String
- getYYYYMMDDFormattedDateFromIso8601Format(date: String) : String

내가 현재 작업 중인 프로덕션 애플리케이션은 다른 형식으로 날짜를 변환하거나 그 반대로 변환해야 할 일이 많습니다.

이 맥락에서, 저는 절대적으로 예시 3과 같은 방법을 사용합니다. 이는 예시 1이 프로젝트 요구사항에 매우 모호하기 때문입니다.

<div class="content-ad"></div>

다른 옵션으로는 예시 2에서의 매개변수 이름을 iso8601Date와 같은 것으로 바꾸는 것이 있을 수 있습니다. 코드베이스 내에서 일관된 방식을 유지하는 것이 좋지만, 당신에게 맞는 방법을 실험해 보는 것도 자유롭게 해보세요.

중요한 점은 혼동을 없앨 만큼의 정보를 추가하는 것입니다.

만약 다른 형식을 다른 형식으로 변환하는 일회용 프로그램을 작성한다면, 예시 1을 사용하는 것이 괜찮습니다. 여기서 제안하는 것은 필요 이상의 정보를 추가하는 것이 아니에요.

## 하는 일이 많으면 이름지어주기가 더 어렵다

<div class="content-ad"></div>

어떤 것의 이름을 짓는 데 어려움을 겪고 있다면, 대부분의 경우에는 개념적으로 관련이 없는 너무 많은 작업을 수행하기 때문입니다.

소프트웨어 엔티티들이 개념적으로 얼마나 관련되어 있는지를 나타내는 정도를 응집성(cohesion)이라고합니다.

소프트웨어 엔티티들이 관련되어 있는 정도 또는 관련되지 않은 정도는 그것들이 어떻게 그룹화 또는 분리되어야 하는지에 대한 안내 역할을 해야 합니다.

이 과정은 다양한 관점에서 수행될 수 있으며, 저는 예를 통해 설명해보겠습니다.

<div class="content-ad"></div>

우선, 네 개의 소프트웨어 개체를 고려해 봅시다:

- StoreUserInCloud
- StoreUserOnDisk
- StoreMessage
- EditUserUI

먼저 이러한 개체들이 관련 있는 현실 세계 정보를 고려해 볼 수 있습니다. 이 관점에서 StoreUserInCloud, StoreUserOnDisk, EditUserUI는 같은 정보 모델을 사용하는 것으로 볼 수 있습니다: 사용자.

그러나 GUI 프로그램을 설계할 때 반드시 염두에 둬야 할 또 다른 관점이 있습니다. 모든 GUI 프로그램은 세 가지 주요 계층으로 세분화할 수 있습니다:

<div class="content-ad"></div>

- 사용자 인터페이스 (일반적으로 “뷰”라고 함)
- 논리 (주로 컨트롤러 및 프레젠터와 같은 요소들을 의미함)
- 모델 (데이터 저장 및 접근 또는 정의에 따라 상태 자체)

이 세 계층 접근 방식은 종종 충분하지 않을 수 있다는 점을 주의하세요. 그러나 이 관점에서 보면 StoreMessage는 EditUserUI보다 다른 저장 엔티티들과 더 유사한 특성을 가지고 있습니다.

분리 방식을 적용하는 방법에 상관없이, 소프트웨어 엔티티의 명명이 더 쉽게 될 것입니다.

# 헬퍼 함수 사용 방법

<div class="content-ad"></div>

도움 함수들은 좋은 함수 명명 관행과 결합될 때 코드의 가독성을 크게 향상시킬 수 있습니다. 도움 함수는 또한 소프트웨어 아키텍처의 핵심 원칙인 관심사 분리를 적용하는 기회이기도 합니다.

## 수도쿠 퍼즐 만들기 방법

이제 도움 함수들의 광범위한 사용을 보여주는 실제 예제를 살펴보겠습니다. 모든 것이 하나의 거대한 함수에 모두 포함되어 있다면 이 코드를 따라가는 것이 얼마나 어려울지 상상해보십시오!

과거에는 그래프 데이터 구조와 알고리즘을 사용하는 수도쿠 빌더라는 프로그램의 크고 통일된 부분에서 일했습니다. 수도쿠나 그래프 DSA에 익숙하지 않더라도, 제가 전달하려는 주요 요점을 이해하실 수 있다고 믿습니다.

<div class="content-ad"></div>

여기에서 전체 소스 코드를 찾을 수 있어요.

우리는 플레이 가능한 수도쿠 퍼즐을 생성하는 과정을 다섯 단계로 나눌 수 있어요:

- 퍼즐의 노드(타일을 나타내는 것)를 생성하기
- 퍼즐의 엣지(여기서 엣지는 타일 간의 관계를 나타내는 단어입니다: 행, 열 또는 서브그리드 중 하나)
- 구조에 일부 값을 추가하여 퍼즐을 더 빨리 해결할 수 있도록 하는 시딩(심기)
- 퍼즐 해결하기
- 게임을 사용자가 실제로 플레이할 수 있도록 특정 수의 타일을 언솔빙하기

나는 퍼즐을 생성하는 데 사용하는 함수에서 이러한 단계들을 나타내기 위해 빌더 패턴과 유사한 것을 사용했어요:

<div class="content-ad"></div>

```kotlin
내부 fun buildNewSudoku(
    경계: Int,
    난이도: 난이도
): 수도쿠퍼즐 = 노드구축(경계, 난이도)
        .엣지구축()
        .색상입히기()
        .해결()
        .풀기해제()
```

"노드"와 "엣지"라는 개념은 그래프 이론 내에서의 기술적인 정의일지라도, 이 코드는 제가 정한 다섯 단계를 명확히 반영하고 있습니다.

전체 코드베이스를 살펴보지는 않겠지만, 도우미 함수들이 로직을 계속 분해하고 가독성을 높이는 방법을 강조하는 점을 강조하고 싶습니다:

```kotlin
내부 fun SudokuPuzzle.엣지구축(): SudokuPuzzle {
    this.graph.forEach {
        val x = it.value.first.x
        val y = it.value.first.y

        it.value.중복없이병합(
                이.graph에서 열별노드얻기(x)
        )

        it.value.중복없이병합(
                이.graph에서 행별노드얻기(y)
        )

        it.value.중복없이병합(
                이.graph에서 부분그리드노드얻기(x, y, 경계)
        )

    }
    return this
}

내부 fun LinkedList<SudokuNode>.중복없이병합(new: List<SudokuNode>) {
    val hashes: MutableList<Int> = this.map { it.hashCode() }.toMutableList()
    new.forEach {
        if (!hashes.contains(it.hashCode())) {
            this.add(it)
            hashes.add(it.hashCode())
        }
    }
}

내부 fun 이.graph에서 열별노드얻기(graph: LinkedHashMap<Int,
        LinkedList<SudokuNode>>, x: Int): List<SudokuNode> {
    val edgeList = mutableListOf<SudokuNode>()
    graph.values.filter {
        it.first.x == x
    }.forEach {
        edgeList.add(it.first)
    }
    return edgeList
}
//...
```

<div class="content-ad"></div>

이 프로세스를 요약하자면, 도우미 함수는 두 가지 이점을 제공합니다:

- 하나의 어떤 작업을 하는 코드 덩어리를 대신하는 역할을 합니다
- 그 코드 덩어리에 의미 있는 이름을 부여할 수 있습니다

어떤 것을 함수로 유지해야 할지 또는 도우미 함수로 위임해야 할지 결정하기 위해 일정 수준의 시행 착오가 필요합니다.

# 코드 주석 사용 방법

<div class="content-ad"></div>

코드 주석에 대한 내 개인적인 취향은 기본적으로 두 가지 용도가 있다고 생각해요. 첫 번째는 복잡한 함수를 작성하기 전에 하는 일이에요.

두 번째 용도는 훨씬 간단해요: 어떤 코드 줄이나 블록에 대한 혼란을 해소하는 겁니다.

## 새로운 기능을 설계하는 데 주석을 사용하는 방법

어떤 함수를 작성하기 어렵다고 예상되는 경우, 함수가 하는 일을 간단한 언어나 의사 코드를 사용해 설명할 거에요.

<div class="content-ad"></div>

이것을 하는 방법은 몇 년 동안 변해왔으며, 당신에게 맞는 방법을 찾도록 장려합니다.

이전 섹션의 예제에서는 실제로 코드 주석을 생략했습니다:

```js
/**
 * 1. n*n 개의 노드가 포함 된 Map을 생성합니다.
 * 2. 각 인접 노드 (수도쿠의 규칙에 따라)에 해시셋에 Edge를 추가합니다
 *   - 열 기준
 *   - 행 기준
 *   - n 크기의 서브그리드 기준
 *
 *  LinkedHashMap: Map에 배치된 요소의 순서를 보존하기 때문에 LinkedHashMap을 선택했지만, x 및 y 값에 의해 생성 된 해시 코드를 통해 조회도 가능합니다.
 *
 *  각 버킷 (요소)의 LinkedList에 대한 설명은, hashCode(x, y)의 첫 번째 요소가 노드임을 가정하고, 그 요소의 엣지들이 이어집니다.
 *  LinkedList의 첫 번째 요소를 Head로 정렬하는 것을 제외하고, 나머지 요소는 특정한 방식으로 정렬되어 있지 않아도 됩니다.
 *
 *
 *  */
internal fun buildNodes(n: Int, difficulty: Difficulty): SudokuPuzzle {
    val newMap = LinkedHashMap<Int, LinkedList<SudokuNode>>()

    (1..n).forEach { xIndex ->
        (1..n).forEach { yIndex ->
            val newNode = SudokuNode(
                    xIndex,
                    yIndex,
                    0
            )

            val newList = LinkedList<SudokuNode>()
            newList.add(newNode)
            newMap.put(
                    newNode.hashCode(),
                    newList
            )
        }
    }
    return SudokuPuzzle(n, difficulty, newMap)
}
```

이러한 주석에 추가하는 세부 정보는 맥락에 따라 다릅니다. 팀에서 작업하는 경우, 위에 표시된 것보다 훨씬 짧게 유지하려고 할 것입니다. 단 필요한 부분만 포함할 것입니다.

<div class="content-ad"></div>

위 예는 타인과 공유하고 싶었던 개인 학습 프로젝트였기 때문에 수도쿠 퍼즐을 표현하는 데 사용된 유형에 대한 의사 결정 방식까지 포함했습니다.

테스트 주도 개발 팬들을 위해, 테스트를 작성하기 전에 알고리즘의 의사 코드 단계를 쓰는 것을 시도해볼 수 있습니다:

```js
/**
     * On bind process, called by view in onCreate. Check current user state, write that result to
     * vModel, show loading graphic, perform some initialization
     *
     * a. User is Anonymous
     * b. User is Registered
     *
     * a:
     * 1. Display Loading View
     * 2. Check for a logged in user from auth: null
     * 3. write null to vModel user state
     * 4. call On start process
     */
    @Test
    fun `On bind User anonymous`() = runBlocking {

        //...
    } 
```

이렇게 하면 구현하기 전에 고차원의 추상화 수준에서 유닛을 설계할 수 있습니다. 더 높은 수준에서 설계하는 데 투자하는 시간은 장기적으로 시간을 절약할 수 있습니다.

<div class="content-ad"></div>

## 인라인 코드 주석을 효과적으로 사용하는 방법

저는 인라인 코드 주석을 작성하는 두 가지 주요 상황이 있습니다:

- 코드 줄 또는 블록의 목적이 후에 읽을 사람들에게 명확하지 않다고 느낄 때
- 제어할 수 없는 무작위하고 이름이 잘못 지정된 라이브러리 함수를 호출해야 할 때

지금까지 제 프로그램에서 가장 복잡한 수도쿠 알고리즘은 해결 알고리즘이었습니다. 실제로 그 알고리즘이 너무 길기 때문에 여기에는 조각만을 게시하겠습니다:

<div class="content-ad"></div>

```kotlin
내가 이 방대한 알고리즘을 읽는 중간에 이 변수들 중 어떤 것이든 자주 까먹기 때문에 필요했어요.

제가 제어할 수 없는 코드에 대해 설명하거나 스스로에게 상기시킬 때 인라인 주석을 추가하는 또 다른 경우입니다.

예를 들어, 유명한 Java Calendar API는 월에 대해 0을 기준으로 색인을 사용합니다. 이것은 1월을 나타내는 표준이 있다는 것을 제가 아는 한 사용되는 예가 없기 때문에 아마도 굉장히 어리석은 것이라고 볼 수 있어요.
```

<div class="content-ad"></div>

공개할 수 없는 코드가 명의권이 있는 것으로, 죄송합니다. 현재 팀의 코드베이스에는 여기저기 무작위 - 1 문장을 설명하는 주석이 있습니다.
 
# 열거형 및 사전 사용법

이러한 종류의 코드 구조물에 대해 다른 이름들이 있을 수 있지만 저는 이 두 가지 방법에 익숙합니다. 어떤 것을 나타내기 위해 제한적인 값을 사용해야 하는 경우를 생각해보세요.

예를 들어, 새로운 수도쿠 퍼즐에 포함되는 타일의 수를 제한해야 한다고 가정해보겠습니다.

<div class="content-ad"></div>

- 퍼즐의 크기 (열/행/서브그리드당 4, 9 또는 16 타일)
- 퍼즐의 난이도 (쉬움, 보통, 어려움)

다양한 테스트를 거쳐 다음과 같은 값들을 수정자로 사용하여 결정했어요:

```js
enum class Difficulty(val modifier:Double) {
    EASY(0.50),
    MEDIUM(0.44),
    HARD(0.38)
}

data class SudokuPuzzle(
        val boundary: Int,
        val difficulty: Difficulty,
        val graph: LinkedHashMap<Int, LinkedList<SudokuNode>>
        = buildNewSudoku(boundary, difficulty).graph,
        var elapsedTime: Long = 0L
)//...
```

이 값들은 난이도에 기반을 두고 로직이 변경되어야 하는 여러 곳에서 사용됩니다.

<div class="content-ad"></div>

가끔은 값과 관련된 사람이 읽을 수 있는 이름이 필요하지 않을 수도 있어요. 선택한 난이도에 따라 퍼즐을 플레이할 수 있도록 다양한 해결 전략을 나타내기 위해 다른 열거형을 사용했어요:

```js
enum class SolvingStrategy {
    BASIC,
    ADVANCED,
    UNSOLVABLE
}

internal fun determineDifficulty(
    puzzle: SudokuPuzzle
): SolvingStrategy {
    val basicSolve = isBasic(
        puzzle
    )
    val advancedSolve = isAdvanced(
        puzzle
    )

    // 만약 퍼즐을 더 이상 풀 수 없다면 현재 전략을 반환해요
    if (basicSolve) return SolvingStrategy.BASIC
    else if (advancedSolve) return SolvingStrategy.ADVANCED
    else {
        puzzle.print()
        return SolvingStrategy.UNSOLVABLE
    }
}
```

어떤 시스템을 디자인할 때 좋은 원칙은 이겁니다: 더 적은 이동 부분은 보통 잘못될 수 있는 요소의 수가 적답니다.

값과 유형에 제한을 두고, 좋은 이름을 주는 것은 코드를 읽기 쉽게 만드는 것뿐만 아니라 잘못된 것으로부터도 보호할 수 있어요.

<div class="content-ad"></div>

# 패키지, 폴더 및 디렉토리 조직화와 명명법 알아보기

코드 가독성에 대한 안내서는 패키지에 대한 논의를 포함하지 않을 수 없어요. 당신이 선호하는 플랫폼과 언어가 이 용어를 사용하지 않는다면, 폴더 또는 디렉토리를 의미한다고 가정해주세요.

저는 이것에 대한 의견을 여러 차례 바꿨고 그것이 제 이전 프로젝트에 반영되어 있어요.

패키지 조직에 대한 두 가지 일반적인 접근 방식이 있어요:

<div class="content-ad"></div>

- 아키텍처 층별로 패키징
- 기능별로 패키징

## 아키텍처 층별로 패키징하는 방법

아키텍처 층별로 패키징은 저의 경험 상 가장 좋지 않은 시스템 중 하나입니다. 이 방법은 보통 MVC, MVP, MVVM과 같은 아키텍처 패턴을 따르도록 하는 것입니다.

MVC를 예로 들면, 최상위 레벨의 패키지 구조는 다음과 같이 보일 것입니다:

<div class="content-ad"></div>

- 모델
- 뷰
- 컨트롤러

이 방식의 첫 번째 문제는 모든 클래스나 함수가 이러한 레이어 중 하나에 편안하게 들어 맞는 것으로 가정한다는 것입니다. 이는 실제로는 거의 발생하지 않는 경우입니다.

이 접근 방식은 가독성이 가장 낮다고 생각합니다. 최상위 수준만으로 각 패키지 내부에서 기대할 내용에 대한 가장 일반적인 내용만을 제공합니다.

일반적으로 이 접근 방식은 더 구체적인 "레이어"를 추가하여 개선할 수 있습니다.

<div class="content-ad"></div>

- ui
- model
- api
- repository
- domain
- common

작은 코드베이스에서는 일반적인 패턴과 스타일에 익숙한 모든 개발자가 있는 경우에는 이것이 합리적으로 잘 작동할 것입니다.

## 기능별로 패키징하는 방법

기능별 패키징은 자체적인 결함이 있지만 일반적으로 읽기와 탐색이 쉽습니다. 다시 말하지만 패키지에 좋은 이름을 부여한다는 가정 아래에서입니다.

<div class="content-ad"></div>

"기능"이라는 용어를 설명하는 것은 어려운 일이지만, 일반적으로 사용자 또는 고객을 위한 주요 기능을 정의하는 화면/페이지 또는 화면/페이지 세트로 정의할 수 있습니다.

소셜 미디어 앱의 경우 다음과 같은 구조를 볼 수 있습니다:

- 타임라인
- 친구
- 사용자 프로필
- 메시지
- 메시지 상세

feature by package의 핵심 문제는 package by layer의 반대로, 거의 항상 여러 기능에서 사용되는 소프트웨어 엔티티가 있을 것이라는 것입니다.

<div class="content-ad"></div>

이 문제에는 두 가지 해결책이 있습니다. 첫 번째는 각 기능마다 중복 코드를 넣는 것입니다.

믿을 수 없겠지만, 특정 상황에서 기업 환경에서 소프트웨어 엔티티를 중복하는 것이 매우 유용할 수 있습니다.

하지만 일반적인 규칙으로 추천하지는 않습니다.

## 하이브리드 패키지 구조 방법

<div class="content-ad"></div>

개발자들에게 일반적으로 추천하는 해결책은 하이브리드 접근법이라고 부르는 방법입니다. 이 방법은 매우 간단하고 유연하며 대부분의 요구 사항을 충족할 것입니다:

- 타임라인
- 친구
- 메시지
- 모든메시지
- 대화
- 메시지상세
- API
- 타임라인
- 사용자
- 메시지
- UI 구성요소

이 예제를 너무 엄격하게 받아들이지 마십시오. 저는 일반 아이디어를 전달하려고 노력하고 있습니다: 특정 기능과 관련된 모든 것은 해당 기능 패키지에 포함되어야 합니다. 각 기능 간에 공유되는 것은 동일 레벨이나 더 높은 수준의 중첩된 별도 패키지에 포함되어야 합니다.

다시 말씀드립니다, 레이어를 정의하는 것이 처음부터 모호했기 때문에 규칙에 맹목적으로 따르지 마십시오. 프로젝트에 익숙하지 않은 사람에게 특히 명확한 것을 생각해보고 비판적으로 생각해 보세요.

<div class="content-ad"></div>

# 마무리

코드 가독성과 스타일 측면에서 대부분의 선호도는 여러 가지 방법을 시도해보면서 형성되었습니다. 때로는 다른 사람들이 사용한 방법을 보고, 때로는 자연스럽게 발전했습니다.

만약 당신이 보는 사람이 코드나 프로그램에 대해 적은 경험을 가진 사람이라고 생각해본다면, 코드를 책처럼 읽기 쉽게 만드는 데 더 수월할 것입니다.

# 소셜: