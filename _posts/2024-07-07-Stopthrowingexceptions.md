---
title: "예외를 던지지 마세요 그 대신 사용할 수 있는 5가지 방법"
description: ""
coverImage: "/assets/img/2024-07-07-Stopthrowingexceptions_0.png"
date: 2024-07-07 22:11
ogImage:
  url: /assets/img/2024-07-07-Stopthrowingexceptions_0.png
tag: Tech
originalTitle: "Stop throwing exceptions!"
link: "https://medium.com/@joostklitsie/stop-throwing-exceptions-4282c8472027"
isUpdated: true
---

이제 당신의 주의를 끈 것 같으니, 이 기사가 실제로 말하고 싶은 내용을 구체적으로 명시해보겠습니다: 예외를 던지지 말아주세요!

![이미지](/assets/img/2024-07-07-Stopthrowingexceptions_0.png)

Kotlin 세계에서 예외를 처리하는 멋진 방법이 몇 가지 있습니다. 가장 합리적인 방법은 try/catch 블록을 사용하여 예외를 캐치하는 것입니다:

```js
try {
    something()
} catch (exception: Exception) {
    println(exception)
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

좋은 점은 Kotlin의 try/catch가 표현식이라는 것입니다. 따라서 try 블록이나 catch 블록에서 유용한 데이터를 반환할 수 있습니다.
또한 Kotlin은 Flow에서 예외를 처리하는 데 좋은 지원을 제공합니다:

```js
flowOf(“Some”, “values”).catch { println(it) }
```

마지막으로, 호출을 Result 객체로 감싸는 방법이 있습니다:

```js
runCatching {
    something()
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

Kotlin이 특히 잘하지 못하는 것은 코드 어느 부분이 예외를 던질 수 있는지 알지 못하는 것입니다. 그것은 우리가 모두 알고 있는 것처럼 Kotlin이 확인된 예외를 지원하지 않기 때문입니다. 내가 알아! 내 코드 중 어느 부분이 예외를 던지는지 정확히 알아! 나는 모든 땅에서 가장 위대한 받는 사람이며, 모든 걸 잡을 것이다! 2개의 다음 함수 중 어느 함수가 예외를 던지는지 알려드릴게요.

```js
fun function1() {
    println(getSomeInformation())
}

fun function2() {
    println(getSomeOtherInformation())
}
```

베팅해보세요! 안타깝게도, 어떤 함수가 예외를 던지는지는 결코 알 수 없고, 무엇보다 걱정할 필요가 없습니다. Kotlin의 확인된 예외 부재는 버그가 아닌 실제로는 기능입니다. 이 기능은 현재 어떤 개발 여정 중이든 실제로 활용하길 권장하는데, 언어에 관계없이요. 러스트 사용자들은 이미 런타임 예외 없는 동화 같은 세계에 살고 있는지도 모르겠네요.

# 하지만 왜일까요?

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

간단해요: 예외 처리는 추한 거 있어요. 저랑 같은게 사람은 일을 처리하겠다는 의지가 없어질 만큼요. 자바 같은 구식 언어를 사용한다 하더라도, try/catch 블록으로 코드를 감싸는 데 의존해서는 안 돼요. 자바에서 try/catch는 식이 아니라서 값을 제대로 반환할 수 없어요.

이렇게 하면 실제로 자신을 어떤 종류의 숨겨진 오류 던지기 문맥에 끼워 넣는 것이라 가독성을 해치죠. IntelliJ에 있는 빨간색 물결선을 의존해서 컴파일 또는 실행 중에 어떤 것이 충돌할지 여부를 확인하는 게 좋지 않아요. VIM 사용자들을 위해 말하자면: IntelliJ는 실제로 빠르고 효율적인 방식으로 코드를 작성할 수 있도록 도와주는 IDE에요, 당신의 단축키로 착각하고 있는 것과는 다르게요.

# 그래서 우리는 어떻게 해야 하나요?

제목을 한 번 더 반복할게요: 우리는 예외를 던지는 걸 중단해야 해요! 물론, 프로그램이 실제로 충돌하길 원하는 경우에만 예외를 던지면 돼요. 그리고 대부분은 그렇고 싶어하지 않을 겁니다. 사실, 프로그램이 충돌하지 않도록 하는 데 많은 시간을 보내는 걸 자주 볼 거예요.

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

한걸음 물러나서서 문제를 멀리서 바라봐봐요: 모든 애플리케이션은 본질적으로 데이터베이스 주변의 멋진 포장지일 뿐이에요. 결국, 우리가 원하는 결과를 이 데이터베이스에서 전파하고 싶어요: 우리가 원하는 값이던가, 데이터베이스에서 값 가져오는 데 실패한 것이던가요. 태평양 상공 어딘가에서 데이터를 가져와서 핸드폰 캐시에 넣고 화면에 표시하는 과정을 통해 데이터를 가져오는 데 어느 정도 어려움이 있다고 하더라도, 실제로 코드로 이 두 가지 선택 사항을 완벽하게 정의할 수 있어요. 마법에 의존하지 않고요.

자, 충분한 프롤레이는 여기까지! 이제 코드가 나옵니다! 또는 적어도 이 작업을 하는 한 가지 방법입니다. 100명 이상의 사람이 이미 해결했고 아마도 나보다 더 나은 방법을 찾았을 문제에서 이 방법이 최선이라고 할 수는 없어요. 그러나 이 방식을 좋아합니다. 제가 이 글을 썼으니, 이 방식으로 갈 거에요.
우리를 안드로이드 개발자의 신발 속으로 두어봐요. 와, 정말 지저분한 신발이에요. 이제 뷰 모델이 필요하죠. 일단 옛날 방식으로 뭔가 잡아보고, 나중에 개선해보도록 해봐요:

```js
class MyViewModel(
    private val fetchSomeStuffUseCase: FetchSomeStuffUseCase,
    private val someMapper: SomeMapper
): ViewModel() {

    val viewState = MutableStateFlow<ViewState>(LoadingState)

    init {
        viewModelScope.launch {
            try {
                val newState = someMapper.map(fetchSomeStuffUseCase.run())
                viewState.update { newState }
            }.catch(e: Exception) {
                println(e)
            }
        }
    }

}
```

적절한 모바일 엔지니어로서, 우리는 행복한 길이 아닌 것은 완전히 무시해 버립니다. 이걸 고쳐봅시다. 왜냐면, 나는 신경 쓰거든요:

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
class MyViewModel(
    private val fetchSomeStuffUseCase: FetchSomeStuffUseCase,
    private val someMapper: SomeMapper
): ViewModel() {
    val viewState = MutableStateFlow<ViewState>(LoadingState)

    init {
        viewModelScope.launch {
            val newState = try {
                someMapper.map(fetchSomeStuffUseCase.run())
            } catch (e: Exception) {
                println(e)
                ErrorState
            }
            viewState.update { newState }
        }
    }
}
```

이 경우의 코드는 이해하기 쉽지만 try/catch를 생략해도 정상적으로 실행됩니다(실행되지 않을 때까지). 또한 다음과 같이 만든 예시를 살펴보세요:

```kotlin
class FetchSomeSafeStuffUseCase(
    private val fetchSomeDangerousStuffUseCase: FetchSomeDangerousStuffUseCase
) {

    suspend fun run(): Stuff? = try {
        fetchSomeDangerousStuffUseCase.run()
    } catch (e: Exception) {
        println(e)
        println("물건을 가져오지 못했습니다. null을 반환합니다!")
         null
    }

}
```

어디가 아프다고 가리키세요. 아프지 않으면 모르핀을 그만 복용하세요. 축하합니다! 방금 coroutine이 취소될 때 실행을 중지시키기 위해 사용되는 CancellationException을 잡았습니다. 그렇다면 이러한 문제를 어떻게 수정해야 할까요?

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

# 결과 결과 결과!

Kotlin에는 내장 Result 클래스가 함께 제공됩니다. 지금 당신은 "아 그저 Success와 Failure 하위 클래스를 가진 sealed 클래스일 뿐이야"라고 생각할 수 있습니다. 하지만 그것은 실제로 값 클래스, 이전에는 inline 클래스로 불리는 것입니다. 그것은 값 주위에 래퍼 클래스를 할당하는 오버헤드가 거의 발생하지 않는 경우가 많아서, 100만 개의 객체를 가진 경우에는 좋은 추가 혜택입니다.

이제 실제로 좋은 것은 Kotlin 표준 라이브러리에 이 Result 클래스와 함께 내장 된 몇 가지 훌륭한 확장 기능이 있다는 것입니다. 당신은 getOrNull()할 수 있고, getOrElse ''할 수도 있고, map ''할 수도 있고, onSuccess ''하고 onFailure''할 수도 있고, recover ''할 수도 있고, 세탁물처럼 fold ''할 수도 있습니다! 유아극으로, 저는 세탁을 접을 때만큼 자주 결과를 접습니다. 제 솔직한 의견으로 빼놓은 유일한 것은 flatMap ''메소드라고 생각해요. 같은 날순히 결과를 매핑할 때 발생하는 문제는 결과 안에 결과가 있게 되는 것입니다:

```js
fun example(
    initialResult: Result<Something>,
): Result<Result<Other>> = initialResult.map { something ->
    getAnotherResultBasedOnSomething(something)
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

이는 원치 않는 결과일 수 있습니다. 특히 우리가 액션을 연결하고 싶을 때에는요. 대신, 우리는 그것을 평평하게 만들어 더 간단한 결과 객체를 얻기를 원합니다. 이제 결과 객체에 대한 간단한 flatMap 확장 함수를 작성해보겠습니다:

```js
inline fun <T, R> Result<T>.flatMap(
    transform: (T) -> Result<R>,
): Result<R> {
    contract {
        callsInPlace(transform, InvocationKind.AT_MOST_ONCE)
    }
    val value = getOrElse {
        return failure(it)
    }
    return transform(value)
    // 한 줄로 작성할 수 있지만, 긴장감을 위해 분리했습니다:
    // return transform(getOrElse { return failure(it) })
}
```

기본 설정이 완료되었으니, 이제 Result 객체를 사용하여 view 모델을 다시 작성해보고, 당신의 양말을 벗고 나서야 합니다. 왜냐하면 당신은 실망할 것이기 때문입니다!

```js
class MyViewModel(
    private val fetchSomeStuff: FetchSomeStuffUseCase,
    private val mapper: SomeMapper
): ViewModel() {

    val viewState = MutableStateFlow<ViewState>(LoadingState)

    init {
        viewModelScope.launch {
            val newState = fetchSomeStuff.run().map(mapper::map).getOrElse {
                println(it)
                ErrorState
            }
            viewState.update { newState }
        }
    }
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

요금 모두는 손쉽게 매핑할 수 있기 때문에 중요한 부분은 getOrElse ''를 사용해 성공할 경우 값에 액세스하거나 그 외에는 전달한 블록에서 결과를 반환합니다. 말씀드렸던 대로, 실망할 수도 있고 신이 날수도 있습니다. 우리가 분리된 위치에 있고 아마 서로 만난 적이 없기 때문에 제게는 판단하기 어렵습니다. 하지만, ViewModel에서 실패 처리를 왜 처리해야 하는 걸까요? mapper에 전체 Result를 전달하고 실패도 처리할 수 있도록 하면 되지 않을까요?

```js
class MyViewModel(
    private val fetchSomeStuff: FetchSomeStuffUseCase,
    private val mapper: SomeMapper
): ViewModel() {

    val viewState = MutableStateFlow<ViewState>(LoadingState)

    init {
        viewModelScope.launch {
            val newState = fetchSomeStuff.run().map(mapper::map)
            viewState.update { newState }
        }
    }
}
```

이제 우리의 뷰 모델은 매우 깔끔하고 테스트하기 쉬워졌습니다! 결과의 매핑은 이제 매퍼로 추상화되어 더 쉽게 테스트할 수 있습니다! 그러니 한걸음 더 나아가서 유즈 케이스를 살펴보겠습니다:

```js
class FetchSomeStuffUseCase(
    private val fetchLoggedInUserUseCase: FetchLoggedInUserUseCase,
    private val fetchSomeSecretUseCase: FetchSomeSecretUseCase,
    private val someRepository: SomeRepository,
) {

    suspend fun run(): Result<Something> = fetchLoggedInUserUseCase.run()
        .flatMap { user -> fetchSomeSecretUseCase.run(user) }
        .flatMap { secret -> someRepository.fetchSomethingWithSecret(secret) }
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

내 겸손한 의견으로는 이 문서는 매우 읽기 쉽습니다. 이곳에는 마법이 일어나는 것이 아니라, 사용자를 가져오고 성공적으로 가져온 후에 그 정보를 사용하여 비밀을 가져올 뿐입니다. 이것 중에서도 최고라고 언급하고 싶은 점이 있습니다: 우리의 뷰 모델과 유스 케이스 내부에서 실제로 같은 종류의 로직을 사용한다는 점! 어떤 것을 트리거하고 그것을 매핑하는 것은 심지어 아이들도 즐길 수 있는 패턴입니다. 하지만 놀라운 것이 있다! 레포지토리를 사용해 데이터를 메모리, 데이터베이스 또는 네트워크에서 가져오는 작업을 할 때, 표준 라이브러리는 실패 시 결과를 복구할 수 있는 Result.recover ''라는 확장 함수를 제공합니다. 여기 예시를 확인할 수 있습니다. initialResult가 실패하는 경우에만 복구되어 성공하게 됩니다. 하지만 단순한 값을 주기보다는 다른 결과 객체를 받고 싶다면, 이전에 만들었던 놀라운 flatMap ''과 유사한 flatRecover ''라는 함수를 만들었습니다. 작명이 가장 어렵다고 생각되는 세상에서 이 함수를 만들었습니다. 이 함수는 실패를 다른 결과 객체로 보정하려고 시도합니다.

```kotlin
fun recoverExample(initialResult: Result<String>): Result<String>
    = initialResult.recover { “initialResult가 실패했을 때 반환될 내용” }
```

```kotlin
class SomeRepository(
    private val memoryCache: MemoryCache,
    private val database: Database,
    private val network: FancyShmancyNetwork,
) {

    suspend fun fetchSomethingWithSecret(
        secret: String,
    ): Result<Something> = memoryCache.get(secret).flatRecover {
        database.get(secret).flatRecover {
            network.get(secret).onSuccess { something ->
                database.set(secret, something)
            }
        }.onSuccess { stuff ->
            memoryCache.set(secret, something)
        }
    }
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

와! 함수형 프로그래밍과 멋짐이 만나서 탄생한 것 같아요. 숙취를 겪고 있는 친구들을 위해 간단한 단계를 안내해볼게요. 먼저 메모리에서 어떤 것을 가져오세요. 그게 있으면 그뿐이에요. 코드와 당신은 여기서 헤어지고 결코 다시 만나지 않아요. 하지만 메모리 캐시에서 무언가를 가져오는 데 실패하면, 데이터베이스에게 데이터의 소재를 물어봐요. 데이터베이스가 값을 갖고 있다면 바로 반환할 수 있어요. 데이터베이스가 제공하지 못할 경우 네트워크 스택을 활용해서 도전을 해요. 성공하면 데이터베이스를 업데이트해요. 데이터베이스나 네트워크에서 가져오는 것 중 하나라도 성공했다면, 메모리도 업데이트돼요. 이를 통해 앞으로 쉽게 접근할 수 있어요. 이걸 미리 알았는지는 모르겠지만요.

map `, flatMap ` 그리고 flatRecover `` 은 모든 형태의 데이터 흐름의 핵심이 될 수 있어요. 모든 데이터를 이 방식으로 검색할 수 있어요. 사용자 위치를 가져와야 하나요? 좋아요, 가서 이걸 묶어보죠:

```js
suspend fun run(): Result<Location>
    = checkLocationPermissionUseCase.run().flatMap { /* unit -> */
        checkLocationServicesEnabledUseCase.run()
    }.flatMap { /* unit -> */
        fetchUserLocation.run()
    }
```

# 그래서 결과만 있으면 되는 건가요?

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

예. 그리고 아니요. 원하는 대로 하시되, 예외를 던지지 말아주세요! 우리 이에 대해 이야기했잖아요... 이제 이 방법의 가능한 단점을 논의해봅시다:

결과 객체는 예외 또는 값이 들어 있는 내부 마법이 꽤 있는 값 클래스이므로 패턴 매칭을 할 수 없습니다:

```js
when(result) {
    is Success /* 존재하지 않음 */ -> doStuff()
    is Failure /* 존재하지 않음 */ -> doFailureStuff()
}
```

또한, 예외 타입을 정의할 수 없습니다. 여기에서 Arrow를 언급하고 싶습니다. Arrow는 Kotlin 사용자들 사이에서 많이 인기를 얻고 있는 라이브러리로, 해당 라이브러리의 Either 유형을 사용하면 특정 예외 형식 중 하나를 지정할 수 있습니다. 한 번 살펴보시기 바랍니다!
개인적으로 모바일 애플리케이션에서 많은 데이터를 네트워크 스택을 통해 받아옵니다. 이는 IOException과 같은 예외 또는 잘못된 VPN을 사용하여 배우자에게 선물을 찾으려다가 일어날 수 있는 오류와 같은 다양한 예외로 인해 실패할 수 있습니다. 어떤 실패가 발생할 수 있는지 얼마만큼 예측할 수 있더라도 오류 처리는 '그 외' 분기가 있는 것이 더 자주입니다.

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

다른 단점은 물건을 던지고 받는 중독에 걸렸을 때 발생합니다. 이에 익숙해지게 됩니다. 그러나 이를 극복하면 괜찮아집니다. 제 전환 단계에서는 Java에서 Kotlin으로 이동하면서 모든 땅에서 최고의 수련사가 되려고 노력했지만 실패했습니다. 결과 객체를 사용하기 시작하면서 매우 만족스럽습니다. 여전히 물건을 받아야하지만, 앱이 다른 라이브러리와 상호 작용하는 코드 주변에서만 필요합니다. 그 라이브러리는 작성자의 관용에 따라 예외를 throw 할 수도 있고 아닐 수도 있습니다. 제 조언은: 무엇인가를 throw할 수 있는 모든 코드는 직접 runCatching '' 블록으로 감싸서 원본에서 처리하십시오. 그것은 결과 객체를 반환하여 앱 전체에 안전하게 전파할 수 있게 됩니다.

확실히 여러분의 언어에는 화난 유아처럼 곳곳에 던지는 대신 결과를 제대로 처리하는 방법이 있을 거예요.

모두 다 즐겁게 생각을 종이에 담았습니다. 여기서 종이란 노트북의 메모장을 의미합니다. 여러분 모두에게 행복한 하루, 그리고 행복한 내일이 되길 바랍니다.
