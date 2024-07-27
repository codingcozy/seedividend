---
title: "2023년 안드로이드 인터뷰 준비 가이드  PART 1"
description: ""
coverImage: "/assets/img/2024-07-12-Androidinterviewprepin2023PART1_0.png"
date: 2024-07-12 21:47
ogImage: 
  url: /assets/img/2024-07-12-Androidinterviewprepin2023PART1_0.png
tag: Tech
originalTitle: "Android interview prep in 2023 — PART 1"
link: "https://medium.com/gitconnected/android-interview-prep-in-2023-part-1-40e38b2531b"
---


<img src="/assets/img/2024-07-12-Androidinterviewprepin2023PART1_0.png" />

## 2. Context란 무엇인가요?

Context는 시스템에 대한 핸들(handle)로, 리소스 해결, 데이터베이스 및 기본값 액세스 등과 같은 서비스를 제공합니다. 안드로이드 앱에는 활동(activities)이 있습니다. Context는 애플리케이션이 현재 실행 중인 환경에 대한 핸들과 같습니다.
애플리케이션 컨텍스트(Application Context): 이 컨텍스트는 애플리케이션의 수명주기에 묶여 있습니다. 애플리케이션 컨텍스트는 현재 컨텍스트와 별도의 수명주기가 필요할 때 또는 활동 범위를 벗어나는 컨텍스트를 전달해야 할 때 사용될 수 있습니다.
액티비티 컨텍스트(Activity Context): 이 컨텍스트는 액티비티에서 사용할 수 있습니다. 이 컨텍스트는 액티비티의 수명주기에 묶여 있습니다. 액티비티 컨텍스트는 액티비티 범위 내에서 컨텍스트를 전달해야 할 때 사용하거나 현재 컨텍스트와 수명주기가 함께한 컨텍스트가 필요할 때 사용해야 합니다.

## 3. 액티비티 라이프사이클

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_1.png)

## 4. onSavedInstanceState() 및 onRestoreInstanceState()에서 activity?

onRestoreInstanceState() - activity가 이전에 파괴된 후 다시 만들어질 때, 시스템이 activity에 전달하는 Bundle에서 저장된 상태를 복구할 수 있습니다. onCreate() 및 onRestoreInstanceState() 콜백 메서드는 모두 인스턴스 상태 정보를 포함하는 동일한 Bundle을 받습니다. 그러나 시스템이 새로운 활동 인스턴스를 생성하거나 이전 활동을 다시 생성하는지 여부에 관계없이 onCreate() 메서드가 호출되기 때문에 상태 Bundle이 null인지 확인한 후에 읽으려고 시도해야 합니다. null이면 시스템이 파괴된 이전 인스턴스를 복원하는 대신 새로운 인스턴스를 만드는 중이라는 것을 의미합니다.

onSaveInstanceState() - 활동을 일시 중지하기 전에 데이터를 저장하는 데 사용되는 메서드입니다.

<div class="content-ad"></div>

## 5. 안드로이드 앱 구성 요소

앱 구성 요소는 안드로이드 앱의 기본 구성 요소입니다. 각 구성 요소는 시스템이나 사용자가 앱에 진입할 수 있는 입구점입니다. 일부 구성 요소는 다른 구성 요소에 의존합니다.

앱 구성 요소에는 네 가지 유형이 있습니다:

- **액티비티 (Activities)**
- **서비스 (Services)**
- **브로드캐스트 수신기 (Broadcast receivers)**
- **콘텐츠 제공자 (Content providers)**

<div class="content-ad"></div>

## 6. 활동 시작 모드

- 표준(Standard): 해당 활동이 시작된 작업에서 새로운 활동 인스턴스를 생성합니다. 활동의 여러 인스턴스가 생성될 수 있으며 여러 인스턴스가 동일한 또는 다른 작업에 추가될 수 있습니다.
예: A -` B -` C의 활동 스택이 있다고 가정해보겠습니다.
이제 "표준"으로 B를 다시 시작하는 경우, 새로운 스택은 A -` B -` C -` B가 될 것입니다.

- SingleTop: 표준과 동일하지만, 스택 상단에 활동의 이전 인스턴스가 이미 존재하는 경우 새 인스턴스를 만들지 않고 대신 기존 활동의 인스턴스로 인텐트를 보냅니다.
예: A -` B의 활동 스택이 있다고 가정해보겠습니다.
이제 "SingleTop"으로 C를 시작하는 경우, 새로운 스택은 A -` B -` C가 될 것입니다.
이제 A -` B -` C의 활동 스택이 있다고 하면,
"SingleTop"으로 C를 다시 시작하는 경우, 새로운 스택은 여전히 A -` B -` C로 유지됩니다.

- SingleTask: 항상 새 작업이 생성되고 새 인스턴스가 루트로 푸시됩니다. 활동이 이미 작업에 있는 경우 인텐트는 onNewIntent()로 리디렉션되거나 새 인스턴스가 생성됩니다. 한 번에 활동의 인스턴스는 하나만 존재합니다.
예: A -` B -` C -` D의 활동 스택이 있다고 가정해보겠습니다.
이제 "SingleTask"로 D를 시작하는 경우, 새로운 스택은 A -` B -` C -` D가 될 것입니다.
이제 A -` B -` C -` D의 활동 스택이 있다고 하면,
"SingleTask"로 다시 활동 B를 시작하는 경우, 새 활동 스택은 A -` B가 될 것입니다. 활동 C와 D는 파괴됩니다.

- SingleInstance: SingleTask와 동일하지만 시스템은 이 활동과 동일한 작업에 활동을 시작하지 않습니다. 새 활동이 시작되면 별도의 작업에서 수행됩니다.
예: A -` B -` C -` D의 활동 스택이 있다고 가정해보겠습니다. "SingleInstance"로 B를 다시 시작하는 경우, 새 활동 스택은 다음과 같을 것입니다:
작업1 — A -` B
작업2 — C -` D

## 7. 사용자가 화면을 회전할 때 활동이 어떻게 응답하나요?

화면이 회전되면 현재 활동 인스턴스가 파괴되고 새 활동 인스턴스가 새 방향으로 생성됩니다. 화면이 회전될 때는 먼저 onRestart() 메서드가 호출됩니다. 다른 수명 주기 메서드는 활동이 처음 생성될 때와 유사한 흐름으로 호출됩니다.

<div class="content-ad"></div>

## 8. 화면이 회전될 때 데이터를 다시로드 및 재설정되는 것을 방지하는 방법은 무엇인가요?

- 가장 기본적인 접근 방법은 ViewModel과 onSaveInstanceState()의 조합을 사용하는 것입니다. 그래서 어떻게 해야 할까요?
- ViewModel 기본: ViewModel은 LifeCycle-Aware입니다. 즉, 소유자가 소멸되더라도 ViewModel은 소멸되지 않습니다(예: 회전을 위한 구성 변경). 소유자의 새 인스턴스는 기존의 ViewModel에 다시 연결됩니다. 따라서 활동을 세 번 회전한다면 활동을 세 번 만든 것이지만 ViewModel은 하나뿐입니다.
- 그래서 공통적인 방법은 ViewModel 클래스에 데이터를 저장하는 것입니다(구성 변경 중 데이터를 유지하기 때문에) 그리고 OnSaveInstanceState를 사용하여 작은 양의 UI 데이터를 저장하는 것입니다.
- 예를 들어, 검색 화면이 있다고 가정해 보겠습니다. 사용자가 EditText에 쿼리를 입력하면 RecyclerView에 항목 목록이 표시됩니다. 이제 화면이 회전되면 데이터를 재설정하지 않도록 이상적인 방법은 검색 항목 목록을 ViewModel에 저장하고 활동의 OnSaveInstanceState 메서드에 입력한 쿼리 텍스트를 저장하는 것입니다.

## 9. Fragment 라이프사이클

![Fragment Lifecycle](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_2.png)

<div class="content-ad"></div>

## 10. Fragment를 만들 때 오직 기본 생성자만 사용하는 것이 권장되는 이유

번들을 통해 매개변수를 전달하는 것이 좋은 이유는 시스템이 Fragment를 복원할 때(예: 구성 변경 시), 시스템이 자동으로 번들을 복원하기 때문입니다. 이렇게하면 Fragment의 상태가 정확하게 초기화된 상태로 올바르게 복원됨이 보장됩니다.

## 11. 백스택에 Fragment 추가/교체하는 것의 차이점?

- replace는 기존 Fragment를 제거하고 새로운 Fragment를 추가합니다. 따라서 백 버튼을 누를 때 교체된 Fragment가 생성되고 해당 Fragment의 onCreateView가 호출됩니다.
- add는 기존 Fragment를 유지한 채 새로운 Fragment가 추가됩니다. 즉, 기존 Fragment가 활성 상태이고 '일시중지' 상태가 아니기 때문에 새 Fragment가 추가되기 전에 존재하던 Fragment가 백 버튼을 누를 때 onCreateView가 호출되지 않습니다.
- Fragment의 라이프사이클 이벤트인 onPause, onResume, onCreateView 등의 다른 라이프사이클 이벤트는 교체할 때 호출되지만 추가할 경우 호출되지 않습니다.
- `.add` 메소드 호출

<div class="content-ad"></div>


![Image](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_3.png)

![Image](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_4.png)

- .replace method call

![Image](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_5.png)


<div class="content-ad"></div>

<img src="/assets/img/2024-07-12-Androidinterviewprepin2023PART1_6.png" />

## 12. FragmentPagerAdapter와 FragmentStatePagerAdapter의 차이점은 무엇인가요?

- FragmentPagerAdapter: 사용자가 방문하는 각 페이지의 프래그먼트는 메모리에 저장되지만 뷰는 파괴됩니다. 따라서 페이지가 다시 보이면 뷰는 다시 생성되지만 프래그먼트 인스턴스는 다시 생성되지 않습니다. 이는 상당한 양의 메모리를 사용할 수 있습니다. 전체 프래그먼트를 메모리에 저장해야 할 때 FragmentPagerAdapter를 사용해야 합니다. FragmentPagerAdapter는 remove(Fragment) 대신에 detach(Fragment)를 호출합니다.
- FragmentStatePagerAdapter: 사용자에게 보이지 않는 경우 프래그먼트 인스턴스가 파괴되지만 프래그먼트의 저장된 상태는 유지됩니다. 이는 소량의 메모리만 사용하게 되며 대량의 데이터 집합을 처리하는 데 유용할 수 있습니다. 동적 프래그먼트, 위젯이 있는 프래그먼트 등 다양한 데이터를 가진 경우에는 FragmentStatePagerAdapter를 사용해야 합니다. 프래그먼트 개수가 많은 경우에도 성능에 영향을 미치지 않습니다.

## 13. Dialog와 DialogFragment의 차이점은 무엇인가요?

<div class="content-ad"></div>

대화 상자는 활동에 완전히 의존합니다. 화면이 회전되면 대화 상자가 해제됩니다. 대화 상자 단편은 방향, 구성 변경을 처리합니다.

## 14. 선형 레이아웃 대 비제약 레이아웃 / 비제약 레이아웃의 장단점

## 15. 안드로이드에서 싱글톤 클래스란 무엇인가요?

싱글톤 클래스는 다른 모든 클래스와 공유할 수 있는 객체를 하나만 생성할 수 있는 클래스입니다.

<div class="content-ad"></div>

이 링크에서 참조하고 아래 코드를 구현했어요.

## 16. SharedPreferences에서 commit()과 apply()의 차이점은 무엇인가요?

commit()은 동기적으로 데이터를 쓰고 즉시 결과에 따라 성공 또는 실패의 부울 값이 반환됩니다.

<div class="content-ad"></div>

`apply()`은 비동기적으로 동작하며 어떤 부울 응답도 반환하지 않습니다. 또한 `apply()`가 진행 중인 상태에서 또 다른 `commit()`을 수행하면, `commit()`은 `apply()`가 완료되지 않을 때까지 차단될 것입니다.

## 17. View와 ViewGroup의 차이점은 무엇인가요?

View: ImageView나 TextView와 같이 단일 뷰입니다.

ViewGroup: LinearLayout, RelativeLayout와 같이 여러 뷰를 포함하는 컨테이너입니다.

<div class="content-ad"></div>

## 18. 사용자 지정 뷰를 만드는 방법 및 라이프사이클 메서드는 무엇인가요?

사용자 지정 뷰는 원하는대로 디자인할 수 있는 것입니다. 예를 들어 로그인 시 특정 유형의 편집 텍스트를 사용하고 여러 곳에서 사용하고 싶다면 해당 용도에 맞는 사용자 지정 뷰를 만들어 여러 XML 파일에서 사용할 수 있습니다.

다음 문서를 확인해보세요.

뷰 라이프사이클

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_7.png)

## 19. 리사이클러 뷰 최적화하는 방법

## 20. 중첩 리사이클러 뷰 또는 Merge 어댑터

https://proandroiddev.com/playing-with-the-new-mergeadapter-on-android-8da514c45ca6#:~:text=MergeAdapter%20reduces%20the%20friction%20when,fixed%20header%20item%20on%20top.

<div class="content-ad"></div>

이제 어려운 난이도의 문제에 들어가기 전에 몇 가지 Kotlin 기본 문제를 풀어 보겠습니다.

# Kotlin 면접 문제

## 21. var와 val을 사용한 변수 선언의 차이는 무엇인가요?

변경 가능한 변수를 선언하려면 var를 사용할 수 있습니다. 변경할 수 없는 변수를 선언하려면 val을 사용하세요. 즉, val 변수는 한 번 할당되면 변경할 수 없습니다.

<div class="content-ad"></div>

## 22. val과 const를 사용하여 변수를 선언하는 차이점은 무엇인가요?

val과 const로 선언된 변수 모두 변경할 수 없는(immutable) 특성을 갖습니다. 하지만 const 변수의 값은 컴파일 타임에 알려져 있어야 하며, val 변수의 값은 런타임에 할당될 수도 있습니다.

## 23. 안전한 호출(?.)과 널 체크(!!)의 차이점은 무엇인가요?

안전한 호출 연산자인 ?.는 변수의 값이 null인지 여부를 확인하는데 사용됩니다. 값이 null이라면 null이 반환되고, 그렇지 않으면 원하는 값을 반환합니다.

<div class="content-ad"></div>

만약 변수의 값이 null 일 때 NullPointerException을 발생시키고 싶다면, null 체크나 !! 연산자를 사용할 수 있어요.

## 24. 코틀린에는 자바와 같은 삼항 연산자가 있나요?

아니요, 코틀린에는 삼항 연산자가 없지만 if-else나 Elvis 연산자를 사용하여 삼항 연산자의 기능을 대체할 수 있어요.

## 25. 코틀린에서 Elvis 연산자란 무엇인가요?

<div class="content-ad"></div>

특정 값을 확인하여 null 값이 있는지 확인하려면 if-else 문을 사용하거나 Elvis 연산자인 ?: 를 사용할 수 있습니다. 예를 들어:

```js
var name:String? = "Sample"
val nameLength = name?.length ?: -1
println(nameLength)
```

## 26. @JvmStatic, @JvmOverloads 및 @JvmFiled가 Kotlin에서 어떻게 사용되는가요?

- @JvmStatic: 이 주석은 메서드가 정적 메서드임을 컴파일러에게 알리고 Java 코드에서 사용할 수 있다는 것을 알려줍니다.
- @JvmOverloads: Kotlin 코드에서 전달된 기본값을 Java 코드에서 사용하려면 @JvmOverloads 주석을 사용해야 합니다.
- @JvmField: Kotlin 클래스의 필드에 대한 getter와 setter를 사용하지 않고 Java 코드에서 접근하려면 Kotlin 코드에서 @JvmField를 사용해야 합니다.

<div class="content-ad"></div>

여기서 더 많은 정보를 확인하세요
https://amitshekhar.me/blog/jvmstatic-annotation-in-kotlin

## 27. 코틀린에서 데이터 클래스란 무엇인가요?

데이터 클래스(Data classes)는 데이터를 저장하기 위해 만들어진 클래스입니다. 코틀린에서는 이를 'data'로 표시합니다. 다음은 그 예시입니다:

```js
data class Developer(val name: String, val age: Int)
```

<div class="content-ad"></div>

데이터 클래스로 클래스를 표시하면 Java에서 하는 것처럼 hashCode() , equals() , toString() , copy() 같은 함수를 구현하거나 생성할 필요가 없습니다. 컴파일러가 내부적으로 이러한 함수들을 자동으로 생성하기 때문에 코드도 더 깔끔해집니다. 그러나 데이터 클래스가 충족해야 하는 다른 요구 사항도 몇 가지 있습니다.

## 28. 코틀린에서 int, double, float 같은 기본 유형을 사용할 수 있나요?

코틀린에서는 기본 유형을 직접 사용할 수 없습니다. 대신 Int, Double 등과 같은 클래스를 기본 유형의 객체 래퍼로 사용할 수 있습니다. 그러나 컴파일된 바이트 코드에는 이러한 기본 유형이 포함되어 있습니다.

## 29. 코틀린의 파괴적인 선언

<div class="content-ad"></div>

때로는 객체를 여러 변수로 분해하는 것이 편리할 수 있습니다. 예를 들어:

```js
때로는 객체를 여러 변수로 분해하는 것이 편리할 수 있습니다
```

이 구문을 구조 분해 선언이라고 합니다. 구조 분해 선언은 한 번에 여러 변수를 만듭니다. 새로운 두 변수인 name과 age를 선언했으며 독립적으로 사용할 수 있습니다:

```js
println(name)
println(age)
```

<div class="content-ad"></div>

파괴 선언은 다음 코드로 컴파일됩니다.

```kotlin
val name = person.component1()
val age = person.component2()
```

## 30. lateint 속성은 무엇인가요?

Kotlin에서 lateinit은 선언 시 변수를 초기화하고 싶지 않지만 나중에 초기화하고 싶을 때 유용합니다. 그러나 사용하기 전에 변수를 초기화해야 합니다.

<div class="content-ad"></div>

```kotlin
private lateinit var person: Person

그런 다음 코드의 나중에 사용하기 전에 선언할 수 있습니다.

person = Person()

lateinit 속성이 초기화되었는지 확인하려면 isInitialized 메서드를 사용합니다. person.isInitialized()
```

<div class="content-ad"></div>

## 31. Kotlin에서 lateinit와 lazy의 차이점은 무엇인가요?

- lazy는 val 속성에만 사용할 수 있고, lateinit는 var에만 적용할 수 있습니다. 이는 lateinit가 final 필드로 컴파일되지 않기 때문에 불변성이 보장되지 않기 때문입니다.
- 속성을 미리 알 수 없는 방식으로 외부에서 초기화하려면 lateinit을 사용하세요.

```kotlin
val p: String by lazy { // 처음 액세스할 때에만 값이 계산됩니다
    // 문자열 계산
}
```

## 32. == 연산자와 === 연산자 사이에 어떤 차이가 있나요?

<div class="content-ad"></div>

네, == 연산자는 변수에 저장된 값들을 비교하는 데 사용되고, === 연산자는 변수의 참조가 동일한지 여부를 확인하는 데 사용됩니다. 그러나 기본 유형의 경우 === 연산자도 값과 참조를 모두 확인합니다.

```js
// primitive example
val int1 = 10 
val int2 = 10
println(int1 == int2) // true
println(int1 === int2) // true
// wrapper example
val num1 = Integer(10)
val num2 = Integer(10)
println(num1 == num2) // true
println(num1 === num2) //false
```

## 33. 코틀린에서 동반 객체란 무엇인가요?

코틀린에서 클래스의 인스턴스 없이 호출할 수 있는 함수나 멤버를 작성하려면 해당 클래스 내부에 동반 객체의 멤버로 작성할 수 있습니다.

<div class="content-ad"></div>

## 34. 코틀린에서 FlatMap과 Map의 차이는 무엇인가요?

**FlatMap**은 리스트의 모든 항목을 하나의 리스트로 결합하는 데 사용됩니다.
예시:

```js
val allVehicles = mutableListOf<MotorVehicle>()
allVehicles.addAll(cars)
allVehicles.addAll(bikes)
```

여기서 우리는 요소를 하나씩 추가하고 있습니다. 이를 **flatmap**을 사용하여 수행할 수 있습니다.

<div class="content-ad"></div>

```kotlin
val vehicles = listOf(cars, bikes)
val allVehicles = vehicles.flatMap { it }
```

# Map is used to transform a list based on certain conditions.
Example:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val squaredNumbers = mutableListOf<Int>()

numbers.forEach {
    squaredNumbers.add(it * it)
}
```

This code returns the list after squaring the values. But for this, we needed to write 5 lines of code. We can do this using Map in Kotlin.


<div class="content-ad"></div>

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val squaredNumbers = numbers.map {
    it * it
}
```

## 35. List와 Array 타입의 차이점은 무엇인가요?

만약 고정된 크기의 데이터 목록이 있다면 Array를 사용할 수 있습니다. 하지만 목록의 크기가 변할 수 있다면 mutable list를 사용해야 합니다.

## 36. Kotlin에서 싱글톤 클래스를 생성하는 방법은 무엇인가요?

<div class="content-ad"></div>

Kotlin에서 Singleton 클래스를 만들려면 object 키워드를 사용해야 합니다.

```kotlin
object AnySingletonClassName
```

## Kotlin에서 open 키워드는 무엇을 위해 사용되나요?

기본적으로 Kotlin에서 클래스와 함수는 final입니다. 따라서 클래스를 상속하거나 함수를 재정의할 수 없습니다. 클래스나 함수를 상속하거나 재정의하려면 해당 클래스나 함수 앞에 open 키워드를 사용해야 합니다.

<div class="content-ad"></div>

## 38. 코틀린에서 고차 함수란 무엇인가요?

## 39. 코틀린에서 확장 함수란 무엇인가요?

확장 함수는 코틀린의 모든 클래스에 추가되는 확장 속성처럼 작용합니다. 확장 함수를 사용하여 기존 클래스에 메서드나 기능을 추가할 수 있습니다. 이를 통해 클래스를 상속받지 않고도 기존 클래스에 새로운 기능을 추가할 수 있습니다. 예를 들어, 보이기 속성을 제어해야 하는 뷰가 있는 경우 확장 함수를 통해 다음과 같이 뷰에 대한 확장 함수를 만들 수 있습니다.

```js
fun View.show() {
 this.visibility = View.VISIBLE
}
```

<div class="content-ad"></div>

```kotlin
fun View.hide() {
 this.visibility = View.GONE
}
```

## 40. Kotlin에서 중위 함수란 무엇인가요?

중위 함수는 괄호나 괄호를 사용하지 않고 함수를 호출하는 데 사용됩니다. 중위 함수를 사용하려면 중위 키워드를 사용해야 합니다.

```kotlin
class Operations {
 var x = 10; 
 infix fun minus(num: Int) {
  this.x = this.x - num
 } 
}
fun main() {
 val opr = Operations()
 opr minus 8
 print(opr.x)
}
```

<div class="content-ad"></div>

## 41. Kotlin에서 인라인 함수란 무엇인가요?

인라인 함수는 해당 함수가 코드에서 사용될 때, 컴파일러에게 함수의 전체 내용을 삽입하도록 지시하는 것입니다.

인라인 함수의 장점: 함수 호출 오버헤드가 발생하지 않습니다. 오버헤드가 적고 프로그램 실행이 더 빠릅니다.

## 42. Kotlin에서 연산자 오버로딩이란 무엇인가요?

<div class="content-ad"></div>

## 43. Kotlin에서 let, run, with, also, apply의 사용 사례를 설명해주세요.

<img src="/assets/img/2024-07-12-Androidinterviewprepin2023PART1_8.png" />

## 44. Sealed Class를 Enum 대신 사용하는 이점은 무엇인가요?

Sealed 클래스는 서브클래스의 다양한 유형을 포함하고 상태를 지니는 유연성을 제공합니다.

<div class="content-ad"></div>

```kotlin
sealed class NetworkRequestResult {
    data class Success(val data: String) : NetworkRequestResult()
    data class Error(val message: String) : NetworkRequestResult()
    object Loading : NetworkRequestResult()
}

fun handleNetworkRequestResult(result: NetworkRequestResult) {
    when (result) {
        is NetworkRequestResult.Success -> println("Success: ${result.data}")
        is NetworkRequestResult.Error -> println("Error: ${result.message}")
        NetworkRequestResult.Loading -> println("Loading...")
    }
}
```

```kotlin
sealed class Shape {
    class Circle(val radius: Double) : Shape()
    class Square(val sideLength: Double) : Shape()
    class Rectangle(val width: Double, val height: Double) : Shape()
}

fun calculateArea(shape: Shape): Double {
    return when (shape) {
        is Shape.Circle -> Math.PI * shape.radius * shape.radius
        is Shape.Square -> shape.sideLength * shape.sideLength
        is Shape.Rectangle -> shape.width * shape.height
    }
}
```

## 45. Serializable와 Parcelable의 차이점은 무엇인가요?

직렬화(Serialization)는 객체를 바이트 스트림으로 변환하여 객체를 메모리에 저장하여 나중에 다시 만들 수 있도록 하는 프로세스로, 여전히 객체의 원래 상태와 데이터를 유지합니다.


<div class="content-ad"></div>

직렬화를 금지하려면 어떻게 해야 하나요? 변수를 transient로 선언할 수 있습니다.

Serializable은 표준 Java 인터페이스입니다. Parcelable은 안드로이드 전용 인터페이스로, 여러분이 직렬화를 직접 구현해야 합니다. Serializable보다 훨씬 효율적으로 만들어졌습니다 (이 방법의 문제는 리플렉션이 사용되고 느리다는 점입니다. 이 메커니즘은 많은 임시 객체를 생성하고 상당량의 가비지 컬렉션을 유발하는 경향이 있습니다.).

## 46. 백그라운드 서비스에서 액티비티의 UI를 어떻게 업데이트할 수 있나요?

액티비티에서 LocalBroadcastReceiver를 등록해야 합니다. 그리고 백그라운드 서비스에서 인텐트를 사용하여 데이터와 함께 브로드캐스트를 보내야 합니다. 액티비티가 화면에 표시된 상태라면, UI가 백그라운드에서 업데이트됩니다. 메모리 누수를 방지하기 위해 액티비티의 onStop() 메서드에서 브로드캐스트 수신기를 unresgister해야 합니다. 또한 Handler를 등록하고 Handlers를 통해 데이터를 전달할 수도 있습니다. 자세한 내용은 여기에서 구현 방법을 찾을 수 있습니다.

<div class="content-ad"></div>

## 47. AsyncTask의 라이프 사이클과 Activity 간의 관계는 무엇인가요? 이로 인해 발생할 수 있는 문제는 무엇이며, 어떻게 이러한 문제를 피할 수 있을까요?

AsyncTask는 그것을 포함하는 Activity의 라이프 사이클과 결합되어 있지 않습니다. 예를 들어, Activity 내에서 AsyncTask를 시작하고 사용자가 기기를 회전시키면 Activity가 소멸됩니다(새로운 Activity 인스턴스가 생성됨), 그러나 AsyncTask는 소멸되지 않고 완료될 때까지 동작을 계속합니다.

이후 AsyncTask가 완료되면, 새 Activity의 UI를 업데이트하는 대신에 이전 Activity의 인스턴스(즉, 생성된 Activity인데 더 이상 표시되지 않는 경우)를 업데이트합니다. 이는 예외를 일으킬 수 있습니다(java.lang.IllegalArgumentException 형식의 View not attached to window manager와 같은 예외가 발생할 수 있음. 예를 들어, Activity 내의 view를 검색하기 위해 findViewById를 사용하는 경우).

또한, AsyncTask가 Activity에 대한 참조를 유지하기 때문에 AsyncTask가 살아 있는 한 Activity가 garbage collected 되지 않을 수 있는 메모리 누수 가능성도 있습니다.

<div class="content-ad"></div>

이러한 이유로, 긴 실행 시간이 소요되는 백그라운드 작업에 대해 AsyncTasks를 사용하는 것은 일반적으로 좋지 않은 아이디어입니다. 대신, 긴 실행 시간이 소요되는 백그라운드 작업에 대해서는 서비스와 같은 다른 메커니즘을 사용해야 합니다.

참고: AsyncTasks는 기본적으로 직렬 실행자(serial executor)를 사용하여 단일 스레드에서 실행되며, 이는 하나의 스레드만 사용하며 각 작업이 차례대로 실행된다는 것을 의미합니다.

## 48. Intent란 무엇인가요?

Android에서 사용자들이 한 애플리케이션에서 다른 애플리케이션으로 이동하는 것을 전체 프로세스의 일부로 볼 수 있는 것은 꽤 보편적입니다. 예를 들어, 링크를 클릭하면 해당 앱으로 이동하거나 한 앱에서 결제를 진행하는 중에 gpay와 같은 결제 앱으로 이동하거나 한 활동에서 다른 활동으로 이동하는 것과 같은 경우입니다. 사용자를 한 애플리케이션에서 다른 애플리케이션으로 이동시키는 이 프로세스는 시스템에 Intent를 전달하여 달성됩니다. Intent는 일반적으로 동일한 애플리케이션 내에서 다양한 활동 간을 탐색하는 데 사용됩니다. 그러나 중요한 점은 하나의 단일 애플리케이션에만 한정되지 않으며 즉, 한 애플리케이션에서 다른 애플리케이션으로 이동하는 데도 사용될 수 있습니다.

<div class="content-ad"></div>

의도(Intent)에는 두 가지 유형이 있습니다:

암시적 의도(Implicit Intent): 암시적 의도는 구성 요소를 지정하지 않습니다. 이 경우, 의도는 시스템에서 실행될 구성 요소에 대한 정보를 제공합니다. 예를 들어, 다음 코드를 사용하여 웹페이지를 보려면 다음과 같이 작성할 수 있습니다.

구문:

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("https://www.geeksforgeeks.org/"));
startActivity(intent);
```

<div class="content-ad"></div>

명시적 인텐트는 컴포넌트를 지정합니다. 이 경우에는 인텐트가 외부 클래스를 호출할 수 있도록 제공합니다.

구문:

```js
Intent i = new Intent(getApplicationContext(), ActivityTwo.class);  
startActivity(i);
```

## 49. 서비스란 무엇인가

<div class="content-ad"></div>

안드로이드의 서비스는 응용프로그램이 백그라운드에서 실행되어 장기 실행 작업을 수행할 수 있도록 하는 특별한 구성 요소입니다. 서비스는 응용프로그램이 여러 작업을 다른 응용프로그램에서 수행할 수 있도록 백그라운드에서 실행되도록 보장합니다.

서비스는 사용자가 응용프로그램과 상호 작용하지 않을 때에도 백그라운드에서 실행될 수 있는 구성 요소로, 이에 해당하는 경우에만 서비스를 생성해야 합니다. 메인 스레드 외부에서 작업을 수행해야 하지만 사용자가 응용프로그램과 상호 작용하는 동안에만 작업을 수행해야 하는 경우에는 다른 응용프로그램 구성 요소의 문맥에서 새로운 스레드를 생성해야 합니다.

서비스에는 세 가지 유형이 있습니다.

1. Foreground Services:

<div class="content-ad"></div>

사용자에게 현재 작업에 대해 알리는 서비스를 Foreground Services라고합니다. 사용자는 계속되는 작업에 대한 제공된 알림을 통해 서비스와 상호 작용할 수 있습니다. 예를 들어 파일을 다운로드하는 경우, 사용자는 다운로드 진행 상황을 추적하고 프로세스를 일시 중단하거나 다시 시작할 수 있습니다.

## 백그라운드 서비스:
백그라운드 서비스는 사용자 개입이 필요하지 않습니다. 이러한 서비스는 백그라운드 작업에 대한 알림을 사용자에게 제공하지 않으며 사용자도 액세스할 수 없습니다. 데이터 동기화 일정 설정이나 데이터 저장과 같은 프로세스가 이 서비스에 속합니다.


<div class="content-ad"></div>

이 유형의 안드로이드 서비스는 액티비티와 같은 애플리케이션 구성 요소가 서비스와 바인드되도록 허용합니다. 바운드 서비스는 어떤 애플리케이션 구성 요소가 바인드되어 있는 한 작업을 수행합니다. 하나 이상의 구성 요소가 한 번에 서비스와 바인드될 수 있습니다. 애플리케이션 구성 요소를 서비스에 바인드하려면 bindService() 메서드를 사용합니다.

![이미지](/assets/img/2024-07-12-Androidinterviewprepin2023PART1_9.png)

## 50. 인텐트 서비스란

인텐트 서비스는 안드로이드의 Service의 하위 클래스로, 요청을 처리하는 데 사용되는 비동기 요청(“인텐트”로 표현)을 처리하는 데 사용됩니다. 백그라운드에서 실행되며, 보내진 모든 인텐트를 처리한 후에 자체적으로 중지됩니다.

<div class="content-ad"></div>

```java
public class MyIntentService extends IntentService {
  
    public MyIntentService() {
        super("MyIntentService");
    }
  
    @Override
    protected void onHandleIntent(Intent intent) {
        // Perform some background task here
    }
}
```

```java
Intent intent = new Intent(this, MyIntentService.class);
intent.putExtra("data", "my data");
startService(intent);
```

# References
