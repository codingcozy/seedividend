---
title: "SwiftUI 성능을 크게 향상시키는 새로운 방법 Observation 깊이 파헤치기"
description: ""
coverImage: "/assets/img/2024-08-04-ADeepDiveIntoObservationANewWaytoBoostSwiftUIPerformance_0.png"
date: 2024-08-04 19:20
ogImage: 
  url: /assets/img/2024-08-04-ADeepDiveIntoObservationANewWaytoBoostSwiftUIPerformance_0.png
tag: Tech
originalTitle: "A Deep Dive Into Observation A New Way to Boost SwiftUI Performance"
link: "https://medium.com/better-programming/a-deep-dive-into-observation-a-new-way-to-boost-swiftui-performance-f299831c664b"
isUpdated: true
---




## 관측 프레임워크는 SwiftUI 뷰의 불필요한 업데이트를 줄여 성능을 향상시킬 것입니다.

![이미지](/assets/img/2024-08-04-ADeepDiveIntoObservationANewWaytoBoostSwiftUIPerformance_0.png)

WWDC 2023에서 Apple은 Observartion 프레임워크를 Swift 표준 라이브러리에 소개했습니다. 이 프레임워크의 등장으로 SwiftUI 뷰에 대한 불필요한 업데이트 문제가 해소될 것으로 예상됩니다.

이 기사에서는 Q&A 형식으로 Observation 프레임워크를 포괄적으로 탐구하며, 그 생성 배경, 사용 방법, 작동 방식 및 주의 사항을 다룰 것입니다.

<div class="content-ad"></div>

# 관찰 프레임워크의 필요성

Swift 5.9 이전에는 Apple이 참조 유형 속성의 변경을 관찰하는 통일된 효율적인 메커니즘을 개발자에게 제공하지 않았습니다. KVO는 NSObject 하위 클래스에서만 사용할 수 있으며, Combine은 속성 수준에서 정확한 관찰을 제공할 수 없으며, 이 둘 모두 크로스 플랫폼 지원을 달성할 수 없습니다.

또한 SwiftUI에서 참조 유형 데이터 소스의 진실의 원천은 Combine 프레임워크를 기반으로 ObservableObject 프로토콜을 사용하여 구현됩니다. 이로 인해 SwiftUI에서 불필요한 뷰 새로 고침이 많이 발생하여 SwiftUI 애플리케이션의 성능에 영향을 줍니다.

이러한 제한 사항을 해결하기 위해 Swift 5.9에서 Observation 프레임워크가 도입되었습니다. 기존 KVO 및 Combine과 비교하여 다음과 같은 장점이 있습니다:

<div class="content-ad"></div>

- 모든 Swift 참조 유형에 적용됩니다. NSObject 하위 클래스뿐만 아니라 모든 Swift 참조 유형에 교차 플랫폼 지원을 제공합니다.
- 특정 프로퍼티 수준의 정밀한 관찰을 제공하며 관찰 가능한 프로퍼티에 특별 주석이 필요하지 않습니다.
- SwiftUI에서 불필요한 뷰 업데이트를 줄이고 애플리케이션 성능을 향상시킵니다.

# 관찰 가능한 객체 선언 방법

Combine 프레임워크를 사용하여 관찰 가능한 참조 유형을 다음과 같이 선언할 수 있습니다:

```js
class Store: ObservableObject {
    @Published var firstName: String
    @Published var lastName: String
    var fullName: String {
        firstName + " " + lastName
    }

    @Published private var count: Int = 0

    init(firstName: String, lastName: String, count: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.count = count
    }
}
```

<div class="content-ad"></div>

firstName, lastName 및 인스턴스의 count가 변경될 때 @Published는 objectWillChange(ObjectWillChangePublisher)를 통해 모든 구독자에게 현재 인스턴스가 변경될 예정임을 알리기 위해 알림을 보냅니다.

Observation 프레임워크를 사용하여 완전히 다른 선언을 사용하겠습니다:

```js
@Observable
class Store {
    var firstName: String = "Yang"
    var lastName: String = "Xu"
    var fullName: String {
        firstName + " " + lastName
    }

    private var count: Int = 0
    
    init(firstName: String, lastName: String, count: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.count = count
    }
}
```

- 클래스 선언 앞에 @Observable 주석을 추가하고 Store 유형이 특정 프로토콜을 준수해야 한다는 것을 명시할 필요가 없습니다.
- 알림을 트리거할 수 있는 속성을 주석화하는 @Published를 사용할 필요가 없습니다. 명시적으로 주석화되지 않은 모든 저장 프로퍼티는 관찰할 수 있습니다.
- 연산 프로퍼티도 관찰할 수 있습니다 (예: fullName도 관찰할 수 있음).
- 관찰되지 않길 원하는 프로퍼티는 앞에 @ObservationIgnored를 주석화해야 합니다.

<div class="content-ad"></div>

```js
// count cannot be observed
@ObservationIgnored
private var count: Int = 0
```

- 모든 속성은 리터럴 기본 값이 있어야 하며, 사용자 정의 init 메소드가 제공되더라도 그렇다.

Combine 기반 선언과 비교했을 때, Observation은 관찰 가능한 객체의 선언을 더 간결하고 직관적으로 만들어줄뿐만 아니라, 계산된 속성을 관찰하는 기능도 지원합니다.

# @Observable가 무엇을 했나요?

<div class="content-ad"></div>

기존의 @Published 프로퍼티 래퍼나 @available 조건부 컴파일과 같이 @로 시작하는 일반적인 키워드와는 달리, 여기서의 @Observable은 매크로를 나타냅니다.

매크로는 Swift 5.9에 추가된 새로운 기능입니다. 이를 통해 개발자들은 컴파일 시간에 Swift 코드를 조작하고 처리할 수 있습니다. 개발자는 컴파일 중에 실행되며 소스 코드에서 코드를 수정하거나 추가하는 매크로 정의를 제공할 수 있습니다.

Xcode 15에서 @Observable에 마우스 오른쪽 버튼을 클릭하고 "매크로 펼치기"를 선택하면 @Observable 매크로에 의해 생성된 코드를 확인할 수 있습니다:

![매크로 확장](https://miro.medium.com/v2/resize:fit:1400/1*VniNlYNR25VWtF_KabsvdQ.gif)

<div class="content-ad"></div>


@Observable
class Store {
    @ObservationTracked
    var firstName: String = "Yang" {
        get {
            access(keyPath: \.firstName)
            return _firstName
        }
        set {
            withMutation(keyPath: \.firstName) {
                _firstName = newValue
            }
        }
    }
    @ObservationTracked // This code can also be expanded here.
    var lastName: String = "Xu"
    var fullName: String {
        firstName + " " + lastName
    }
    @ObservationIgnored
    private var count: Int = 0
    init(firstName: String, lastName: String, count: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.count = count
    }
    @ObservationIgnored private let _$observationRegistrar = ObservationRegistrar()
    internal nonisolated func access<Member>(
        keyPath: KeyPath<Store, Member>
    ) {
        _$observationRegistrar.access(self, keyPath: keyPath)
    }
    internal nonisolated func withMutation<Member, T>(
        keyPath: KeyPath<Store, Member>,
        _ mutation: () throws -> T
    ) rethrows -> T {
        try _$observationRegistrar.withMutation(of: self, keyPath: keyPath, mutation)
    }
    @ObservationIgnored private var _firstName: String = "Yang"
    @ObservationIgnored private var _lastName: String = "Xu"
}
extension Store: Observable {}


Observable 매크로가 원래 선언을 조정하는 것을 확인할 수 있습니다. Store에서는 관찰 가능한 속성과 관찰자 간의 관계를 유지하고 관리하기 위해 ObservationRegistrar 구조체가 선언됩니다. 저장된 속성은 계산된 속성으로 다시 작성되며 원래 값은 동일한 이름을 가진 _ 접두사가 있는 버전에 저장됩니다. get 및 set 메서드에서 관찰자는 _$observationRegistrar를 통해 등록 및 통지됩니다. 마지막으로 매크로는 관찰 가능한 객체가 Observable 프로토콜을 준수하도록 코드를 추가합니다 (Sendable과 유사하게 구현을 제공하지 않지만 식별자 역할만 수행함).

# 뷰에서 Observable 객체 사용하는 방법

## 뷰에서 Observable 객체 선언하기


<div class="content-ad"></div>

ObservableObject 프로토콜을 준수하는 소스 오브 트루스와 달리, 뷰에서는 observable objects의 라이프사이클을 보장하기 위해 @State를 사용합니다.

```js
@Observable
class Store {
   ....
}

struct ContentView: View {
    @State var store = Store()
    var body: some View {
       ...
    }
}
```

## 환경을 통해 Observable Objects를 뷰 계층구조에 주입하는 방법

ObservableObject 프로토콜을 준수하는 소스 오브 트루스와 비교하여 Obervation 프레임워크를 사용하여 선언된 Observable Objects는 환경 주입에 대해 더 다양하고 유연한 옵션을 갖습니다.

<div class="content-ad"></div>

- 환경을 통해 인스턴스 주입하기

```js
@Observable
class Store {
   ....
}

struct ObservationTest: App {
    @State var store = Store()
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(store)
        }
    }
}

struct ContentView: View {
    @Environment(Store.self) var store // 뷰 내에서 환경을 통해 주입
    var body: some View {
       ...
    }
}
```

- EnvironmentKey 사용자 정의하기

```js
struct StoreKey: EnvironmentKey {
    static var defaultValue = Store()
}

extension EnvironmentValues {
    var store: Store {
        get { self[StoreKey.self] }
        set { self[StoreKey.self] = newValue }
    }
}

struct ContentView: View {
    @Environment(\.store) var store // 뷰 내에서 환경을 통해 주입
    var body: some View {
       ...
    }
}
```

<div class="content-ad"></div>

- 선택적 값을 주입하기

```js
struct ObservationTest: App {
    @State var store = Store()
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(store)
        }
    }
}

struct ContentView: View {
    @Environment(Store.self) var store: Store? // View에서 환경으로 주입
    var body: some View {
       if let firstName = store?.firstName  {
                Text(firstName)
       }
    }
}
```

이 중에서 선택적 값 주입은 미리 설정을 잊어버려서 발생하는 미리보기 충돌 문제를 완벽하게 해결합니다. 특히 EnvironmentKey는 개발자들에게 기본값을 제공하는 능력을 부여합니다.

Observable 프레임워크를 사용하여 선언된 Observable 개체의 주입 방법이 값 형식과 유사한데, ObservableObject 프로토콜을 준수하는 참조 형식은 주입할 개체를 나타내는 메서드(StateObject, EnvironmentObject)를 사용해야 한다는 점에서 혼란스러워하는 사람들이 있을 수도 있습니다. 이것이 혼란을 일으키지는 않을까요?

<div class="content-ad"></div>

iOS 17+ 애플리케이션 개발 과정에서는, Observation 프레임워크를 통해 선언된 Observable 객체와 ObservableObject 프로토콜을 준수하는 Observable 객체가 동시에 나타나는 시나리오가 점점 줄어들 것으로 예상됩니다. 따라서 곧 reference types와 value types는 주입 형태에서 높은 통일성을 갖게 될 것입니다 (environmentObject나 StateObject를 사용하는 시나리오는 거의 없을 것입니다).

## 뷰에서 Observable 객체 전달

```swift
struct ContentView: View {
    @State var store = Store()
    var body: some body {
        SubView(store: store)
    }
}

struct SubView: View {
    let store: Store
    var body: some body {
       ....
    }
}
```

let과 var 모두 사용할 수 있습니다.

<div class="content-ad"></div>

## 바인딩 타입 만들기

바인딩 타입은 SwiftUI에게 양방향 데이터 바인딩을 구현할 수 있는 능력을 제공합니다. 관찰 프레임워크를 사용하여 다음과 같은 방법으로 속성에 해당하는 바인딩 타입을 만들 수 있습니다.

첫 번째 방법:

```js
struct ContentView: View {
    @State var store = Store()
    var body: some body {
        SubView(store: store)
    }
}

struct SubView: View {
    @Bindable var store: Store
    var body: some body {
        TextField("", text: $store.name)
    }
}
```

<div class="content-ad"></div>

Method Two:

```swift
struct SubView: View {
    var store: Store
    var body: some body {
        @Bindable var store = store
        TextField("", text: $store.name)
    }
}
```

Method Three：

```swift
struct SubView: View {
    var store: Store
    var name: Binding<String> {
        .init(get: { store.name }, set: { store.name = $0 })
    }
    var body: some body {
       TextField("", text: name)
    }
}
```

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

기능 시그니처:

```js
func withObservationTracking<T>(
    _ apply: () -> T,
    onChange: @autoclosure () -> () -> Void
) -> T
```

테스트 1:

```js
@Observable
class Store {
    var a = 10
    var b = 20
    var c = 20
}

let sum = withObservationTracking {
    store.a + store.b
} onChange: {
    print("Store Changed a:\(store.a) b:\(store.b) c:\(store.c)")
}
store.c = 100
// 아무 출력 없음
store.b = 100
// 출력
// Store Changed a:10 b:20 c:100
store.a = 100
// 아무 출력 없음
```

<div class="content-ad"></div>

테스트 2:

```js
withObservationTracking {
   print(store)
   DispatchQueue.main.asyncAfter(deadline: .now() + 0.3){
      store.a = 100
   }
} onChange: {
    print("Store Changed")
}

store.b = 100
// 출력 없음
store.a = 100
// 출력 없음
```

Apple이 제공한 withObservationTracking의 공식 문서에 따르면 해당 함수는 다음과 같이 설명됩니다:

- apply: 추적할 속성을 포함하는 클로저
- onChange: 속성 값이 변경될 때 호출되는 클로저
- Returns: apply 클로저가 반환하는 값(반환 값이 있는 경우); 그렇지 않으면 반환 값이 없습니다.

<div class="content-ad"></div>

그러나 설명이 너무 간단하며 몇 가지 혼란스러운 부분이 여전히 있습니다:

- withObservationTracking은 어떻게 apply 클로저 내의 어떤 속성을 관찰할 수 있는지를 결정하는가요?
- 왜 apply 클로저 내의 일부 관찰 가능한 속성이 수정된 후 콜백을 트리거하지 않나요? (테스트 2)
- withObservationTracking으로 생성된 관찰 동작은 일회성인가요, 아니면 지속적인가요?
- onChange 클로저는 언제 호출되나요? "속성 값이 변경될 때"는 속성이 변경되기 전인가요, 아니면 후인가요?

다행히도, Observation 프레임워크는 Swift 5.9 표준 라이브러리의 일부입니다. 소스 코드를 조사함으로써 더 많은 정보를 알아볼 수 있습니다.

# Observation 프레임워크의 관찰 원리는 무엇인가요?

<div class="content-ad"></div>

위 코드를 읽으면 withObservationTracking을 사용하여 관찰을 만드는 과정을 이해할 수 있습니다. 다음과 같이 요약할 수 있습니다:

## 관찰 생성 단계

- withObservationTracking은 현재 스레드의 _ThreadLocal.value에 _AccessList를 생성합니다.
- apply 클로저가 실행됩니다.
- 관찰 대상 객체의 관찰 가능한 속성이 호출될 때 (apply 클로저에 의해 트리거된 경우), 관찰 대상 객체 인스턴스의 ObservationRegistrar에 관찰 가능한 속성과 콜백 클로저 간의 대응 관계를 저장하기 위해 access 메서드가 사용됩니다 (이 콜백 클로저는 여기서 withObservationTracking의 onChange 클로저를 호출하는 데 사용됩니다).
- withObservationTracking은 관찰 가능한 속성과 onChange 콜백 클로저 간의 대응 관계를 _AccessList에 저장합니다.

## 관찰 대상 속성이 변경될 때

<div class="content-ad"></div>

- 관찰된 속성은 ObservationRegistrar의 willSet 메서드를 호출하여 현재 속성 KeyPath에 해당하는 콜백 클로저를 찾습니다.
- 클로저를 호출함으로써, withObservationTracking에 의해 시작된 스레드에서 onChange 클로저가 호출됩니다.
- onChange 클로저가 호출된 후, withObservationTracking의 현재 스레드에 있는 _AccessList에 해당하는 정보가 지워집니다.
- ObservationRegistrar에서 관찰 작업과 관련된 속성 및 콜백 클로저 간의 대응 관계를 지웁니다.

## 결론

정리해보면 다음과 같은 결론을 얻을 수 있습니다:

- apply 클로저에서 읽현(그들의 get 메서드를 호출함으로써)만 되는 관찰 가능한 속성만 관찰됩니다(이것이 테스트 2의 문제를 설명합니다).
- withObservationTracking에 의해 생성된 관찰 작업은 일회성입니다. 어떤 관찰 가능한 속성의 변경도 onChange 함수를 호출한 후에 이 관찰을 종료시킵니다.
- onChange 클로저는 속성 값 변경 전( willSet 메서드에서) 호출됩니다.
- 하나의 관찰 작업에서 여러 관찰 가능한 속성을 관찰할 수 있습니다. 어떤 속성 값 변경도 이 관찰을 종료시킵니다.
- 관찰 동작은 스레드 안전합니다. withObservationTracking은 다른 스레드에서 실행될 수 있으며, onChange 클로저는 withObservationTracking에 의해 시작된 스레드에서 실행됩니다.
- 관찰 가능한 속성만 관찰할 수 있습니다. apply 클로저에서만 나타나는 관찰 가능한 객체는 관찰 작업을 생성하지 않습니다 (테스트 2를 설명합니다).

<div class="content-ad"></div>

# SwiftUI 뷰에서 속성 변경을 관찰하는 방법

Observation 프레임워크의 작동 방식을 기반으로하면 SwiftUI는 아마도 observable 속성과 뷰 간의 연결을 다음 방법을 사용하여 업데이트 할 것으로 예상됩니다.

```js
struct A: View {
   var body: some View {
       ...
   }
}

let bodyValue = withObservationTracking {
    viewA.body
} onChange: {
    PreparingToRe-evaluateTheBodyValue()
}
```

이전 텍스트에서 요약했듯이, "apply 클로저 내에서 읽히는 (get 메서드를 호출하여)만 관찰 가능한 속성"으로 결론 내렸습니다. 따라서 다음 결론을 도출할 수 있습니다:

<div class="content-ad"></div>

```js
Text(store.a) // store.a이 변경되면 body가 다시평가됩니다.

Button("안녕"){
    store.b = "abc" // store.b가 변경되어도 body가 다시평가되지 않습니다.
}
```

# @Observable로 표시된 클래스는 여전히 ObservableObject 프로토콜을 준수할 수 있나요?

네, 가능합니다. 그러나 @Published 프로퍼티 래퍼와 @Observable 매크로 사이에 충돌이 발생할 수 있습니다. 이를 해결하기 위해 withObservationTracking을 사용할 수 있습니다.

```js
@Observable
final class Store: ObservableObject {
    var name = ""
    var age = 0

    init(name: String = "", age: Int = 0) {
        self.name = name
        self.age = age
        observeProperties()
    }
    private func observeProperties() {
        withObservationTracking {
            let _ = name
            let _ = age
        } onChange: { [weak self] in
            guard let self else { return }
            objectWillChange.send()
            observeProperties()
        }
    }
}
```

<div class="content-ad"></div>

# @Obervable과 ObservableObject을 뷰에서 함께 사용할 수 있을까요?

네, 가능합니다. 뷰에서는 observable object를 다양한 방식으로 선언할 수 있고 여전히 함께 공존할 수 있습니다. SwiftUI는 observable object가 뷰에 주입되는 방식에 따라 해당 관찰 방법을 선택합니다.

예를 들어, 이전 텍스트에서는 두 관찰 접근 방식을 모두 충족하는 observable object를 생성했습니다. SwiftUI는 주입 방식에 따라 다른 업데이트 전략을 채택할 것입니다.

```js
@State var store = Store() // 속성 변경에 따라 body를 섬세하게 재평가할지 여부를 결정합니다.

@StateObject var store = Store() // 속성(@Published)이 변경될 때마다 body가 다시평가됩니다.
```

<div class="content-ad"></div>

# Observable은 중첩을 지원합니까 (한 Observable의 속성이 다른 Observable인 경우)?

지원합니다.

@Published는 값 타입만 지원하므로 ObservableObject 프로토콜을 준수하는 observable 객체에 중첩 로직을 구현하는 것이 어려울 수 있습니다:

```swift
class A: ObservableObject {
    @Published var b = B()
}

class B: ObservableObject {
    @Published var a = 10
}
let a = A()
a.b.a = 100 // 뷰 업데이트를 유발하지 않습니다
```

<div class="content-ad"></div>

한 번이라도 나는 이 문제를 해결하기 위해 @PublishedObject 프로퍼티 래퍼를 작성했었어. 더 많은 정보가 필요하면 "Beyond @Published:Custom Property Wrappers에 관한 글을 읽어봐.

기본적으로 @PublishedObject은 외부 객체 A의 objectWillChange를 사용해서 B의 프로퍼티가 변경될 때 A의 구독자들에게 알립니다. 다시 말해 관찰 가능한 객체의 중첩을 달성하기 위해 밀접하게 결합된 접근 방식을 사용해.

그러나 관찰 프레임워크를 통해 생성된 관찰 가능한 객체의 중첩은 훨씬 간단해. withObservationTracking으로 관찰 작업을 만들 때, 읽힌 모든 관찰 가능한 프로퍼티가 구독자와의 관계를 적극적으로 생성해. 관계 체인 내 위치나 존재 방식(예: 배열, 딕셔너리 등)에 관계없이 정확하게 추적될 수 있어.

<div class="content-ad"></div>

```js
@Observable
class A {
   var a = 1
   var b = B()
}

@Observable
class B {
   var b = 1
}

let a = A()

withObservationTracking {
   let _ = a.b.b
} onChange: {
    print("update")
}
```

위의 코드에 대해서 위의 두 가지 방법 중 하나를 사용하면 onChange 클로저를 호출합니다 (한 번만 호출됨).

```js
a.b.b = 100

// 또는

a.b = B()
```

a.b.b에서는 다른 객체와 다른 레벨의 두 가지 observable 속성, a.b 및 b.b에 대한 observations가 생성됩니다. 이것이 Observation 프레임워크의 강점입니다.

<div class="content-ad"></div>

# 관찰: ObservableObject의 성능 이슈가 해결되었습니까?

네, 관찰 프레임워크는 SwiftUI에서 observable 객체의 성능을 두 가지 측면에서 개선했습니다:

- observable 속성을 관찰하면서 observable 객체 대신 뷰에서 관찰하여 불필요한 뷰 업데이트를 줄일 수 있습니다.
- Combine의 publisher-subscriber 모델과 비교하여, 관찰의 콜백 메커니즘이 더 효율적입니다.

그러나 관찰 프레임워크는 아직 지속 가능한 관찰 동작을 지원하지 않기 때문에 뷰는 평가될 때마다 관찰 작업을 재생성해야 합니다. 이것이 새로운 성능 문제를 발생시킬지에 대한 더 많은 시간이 필요합니다.

<div class="content-ad"></div>

# 관측 프레임워크가 SwiftUI 프로그래밍 습관에 영향을 줄까요?

나에게는 그렇습니다.

예를 들어, 현재 개발자들은 일반적으로 어플리케이션의 상태 모델을 구축하기 위해 구조체를 사용합니다. 관측 프레임워크를 사용한 후에는, 속성 레벨 관측을 구현하려면 관측 프레임워크를 사용하여 관측 가능한 객체를 만들어야 하며, 중첩된 관측 가능한 객체로 상태 모델을 구축해야 합니다.

또한, 뷰에서 사용하는 많은 최적화 기술들도 변경될 것입니다. 예를 들어, ObservableObject를 사용할 때, 현재 뷰에 유용한 데이터만을 도입하여 불필요한 새로고침을 줄일 것입니다.

<div class="content-ad"></div>

```swift
class Store:ObservableObject {
    @Published var a = 1
    @Published var b = "hello"
}

struct Root:View {
    @StateObject var store = Store()
    var body: some View {
        VStack{
            A(a: store.a)
            B(b: store.b)
        }
    }
}

struct A:View {
    let a:Int    // only get a(Int)
    var body:some View {
        Text("\(store.a)")
    }
}

struct B:View { // only get b(String)
    let b:String
    var body:some View {
        Text(store.b)
    }
}
```

저장소의 b가 변경될 때, Root와 B 뷰만 다시 평가됩니다.

Observer 패턴으로 변경한 후, 위에서 언급한 최적화 전략은 더 이상 최적화된 해결책이 아닙니다. 대신, 새로운 observable 객체에는 이전에 비권장된 방법이 더 적합합니다.

```swift
@ObservedObject
class Store {
    var a = 1
    var b = "hello"
}

struct Root:View {
    @State var store = Store()
    var body: some View {
        VStack{
            A(store: store)
            B(store: store)
        }
    }
}

struct A:View {
    let store: Store
    var body:some View {
        Text("\(store.a)")
    }
}

struct B:View {
    let store: Store
    var body:some View {
        Text(store.b)
    }
}
```

<div class="content-ad"></div>

본문에 있는 속성 중에서 읽혀지는 것만이 뷰 업데이트를 발생시킵니다. 수정 후에는 store.b가 변경될 때에는 B 뷰만 다시 평가될 것입니다.

Observation 프레임워크는 아직 새로운 것이므로 그 API도 끊임없이 진화하고 있습니다. SwiftUI 애플리케이션을 이 프레임워크로 전환하는 경우가 더 많아짐에 따라 개발자들은 더 많은 사용 경험을 요약할 것입니다.

# 결론

본 글을 통해 독자들은 Observation 프레임워크에 대한 이해를 높일 수 있었을 것입니다. Observation 프레임워크는 현재 SwiftUI와 긴밀하게 통합되어 있지만, API가 더 풍부해지면 SwiftUI에만 한정되지 않고 점점 더 많은 애플리케이션 시나리오에서 나타날 것으로 기대됩니다.

<div class="content-ad"></div>

만약 이 문서가 도움이 되었거나 즐겁게 읽었다면, 저의 글을 지원하기 위해 기부를 고려해주세요. 여러분의 기부는 저가 계속해서 가치 있는 콘텐츠를 제작하는 데 도움이 될 것입니다.
Patreon, Buy Me aCoffee 또는 PayPal을 통해 기부해주세요.

```js
연결하고 싶으신가요?

트위터의 @fatbobman에서 만나요.
```