---
title: "SwiftData 마스터하기 고급 사용 방법 대공개"
description: ""
coverImage: "/assets/img/2024-07-01-UseSwiftDatalikeaboss_0.png"
date: 2024-07-01 17:02
ogImage:
  url: /assets/img/2024-07-01-UseSwiftDatalikeaboss_0.png
tag: Tech
originalTitle: "Use SwiftData like a boss"
link: "https://medium.com/@samhastingsis/use-swiftdata-like-a-boss-92c05cba73bf"
isUpdated: true
---

![이미지](/assets/img/2024-07-01-UseSwiftDatalikeaboss_0.png)

SwiftData의 @Query 매크로는 MainActor에서 실행됩니다. 작업 부하가 많은 경우 UI를 블록할 수 있습니다. 한 가지 해결책은 백그라운드 스레드에서 SwiftData 모델을 가져오는 것입니다. 이 문서는 Swift 컴파일러 동시성 경고를 유발하지 않는 빠른 구현을 제공합니다.

# 이 문서의 목적

Swift의 동시성 모델을 이해하는 데는 가파른 학습 곡선이 있습니다. 제 자신의 앱을 구축할 때 성능을 유지하고 반응성을 유지하는 데 어려움을 겪었습니다.

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

![2024-07-01-UseSwiftDatalikeaboss_1.png](/assets/img/2024-07-01-UseSwiftDatalikeaboss_1.png)

가끔은 동작하는 접근 방식을 함께 해킹해 냅니다만, Swift 컴파일러의 엄격한 동시성 검사를 "완료"로 설정하는 것에 두려움을 느낍니다.

![2024-07-01-UseSwiftDatalikeaboss_2.png](/assets/img/2024-07-01-UseSwiftDatalikeaboss_2.png)

하지만 무지는 불행함이 아닙니다; 이러한 경고는 앱이 데이터 레이스와 같은 동시성 관련 문제에 취약할 수 있음을 나타냅니다. 미래의 Swift 버전에서 이러한 경고 중 일부는 오류가 될 것입니다. 지금 이를 처리하는 것이 합리적입니다.

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

# 기사 구조

안녕하세요! 저는 대량의 SwiftData 모델을 백그라운드 스레드에서 안전하게 가져올 수 있는 일련의 구성 요소를 구현하는 방법을 보여드릴 거에요. 이 기사에서는 다음 섹션에서 구현 방법을 차례로 소개할 거에요:

- SwiftData 모델;
- ModelActor;
- ViewModel 및 View.

전체 프로젝트 코드는 해당 GitHub 저장소에서 찾을 수 있어요.

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

만약 코드를 읽고 있어서 "응, 하지만 처음에 SwiftData 모델을 생성하고 유지하는 방법이 뭐야?" 라고 궁금해 한다면 걱정하지 마세요. 전체 프로젝트에는 백그라운드 스레드에서 SwiftData 모델을 생성하고 유지하는 코드가 추가로 포함되어 있어서 안전한 방법으로 이루어집니다.

시작하기 전에 두 가지 더 알아두어야 할 점이 있습니다:

(i) 이 글은 SwiftData, Swift actors 및 Sendable 프로토콜에 대한 기본적인 이해를 가정합니다. Swift actors에 대한 훌륭한 설명을 보려면 다음 링크를 확인해주세요:

(ii) 이 글 전반에서 서로 다른 Swift 컴파일러 경고에 언급할 것입니다. 만약 함께 코딩하고 이러한 경고를 직접 확인하고 싶다면 Xcode 프로젝트 설정을 변경해야 합니다: 프로젝트를 선택하고 "Build Settings" 탭으로 이동하고 "concurrency"를 검색하여 "Strict Concurrency Checking"을 "Complete"로 설정하세요.

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

![이미지](/assets/img/2024-07-01-UseSwiftDatalikeaboss_3.png)

그럼 시작해볼까요?

# 1. SwiftData 모델

먼저 User라는 SwiftData 모델을 설정합니다:

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
// User.swift
import Foundation
import SwiftData

@Model
class User {
    let id: UUID
    let name: String

    init(id: UUID = UUID(), name: String) {
        self.id = id
        self.name = name
    }
}
```

저희 목표는 백그라운드 액터에서 이러한 User 모델들을 대량으로 가져오는 것입니다. 즉, 주 스레드를 차단하지 않고 가져와야 하며, 한번 가져오면 이를 메인 액터에 전달하여 앱의 UI를 업데이트해야 합니다. 이를 "액터 경계를 넘어서는 것"이라고 합니다 (즉, 한 액터에서 다른 액터로 값 전달).

SwiftData 모델 및 Sendable 프로토콜

타입을 Sendable로 표시하면 Swift 컴파일러에게 그 값이 실행 스레드 간에 안전하게 공유될 수 있음을 알려줍니다. 즉, 이들 값은 MainActor와 백그라운드 액터 사이의 경계를 넘나들 수 있습니다.

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

그러나 우리는 사용자 값이 액터 경계를 통과하는 것을 원한다는 예상에 따라 클래스를 final로 만들고 단순히 Sendable 프로토콜로 표시하려고 한다면, Xcode에서 다음 경고가 표시됩니다:

<img src="/assets/img/2024-07-01-UseSwiftDatalikeaboss_4.png" />

이것은 @Model 매크로가 주석을 추가하는 클래스에 자동으로 var \_id를 추가하기 때문입니다. 변수 저장 속성이 있는 클래스는 Sendable이 될 수 없습니다. 왜냐하면 액터 간에 가변 상태를 공유하면 데이터 레이스가 발생할 수 있기 때문입니다. 어쨌든, 일반적인 규칙은 SwiftData 모델이 Sendable이 아니라는 것입니다. 그러므로 사용자의 값을 액터 경계를 통해 전달하려면 다른 접근 방식이 필요합니다. 이때 데이터 전송 객체(DTO) 클래스가 필요합니다:

```js
// User.swift
final class UserDTO: Sendable, Identifiable {
    let id: UUID
    let name: String

    init(id: UUID, name: String) {
        self.id = id
        self.name = name
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

이 클래스의 목적은 사용자 모델에서 필요한 데이터를 Actor 경계를 통해 전달하는 것입니다. UserDTO의 모든 저장된 속성이 변경할 수 없는 속성(즉, 상수로 선언됨)이기 때문에 해당 클래스는 경고 없이 Sendable 프로토콜을 준수합니다.

# 2. ModelActor

다음으로, 백그라운드 스레드에서 SwiftData 작업을 관리하기 위해 ModelActor를 작성합니다:

```js
// ThreadsafeBackgroundActor.swift

import Foundation
import SwiftData

@available(iOS 17, *)
@ModelActor
actor ThreadsafeBackgroundActor: Sendable {

    private var context: ModelContext { modelExecutor.modelContext }

    func fetchData() async throws -> [UserDTO] {
        let fetchDescriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\User.name)])
        let users: [User] = try context.fetch(fetchDescriptor)
        let userDTOs = users.map{UserDTO(id: $0.id, name: $0.name)}
        return userDTOs
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

`fetchData` 메서드는 User 모델을 검색하고 이를 UserDTO 객체로 변환하여 안전하게 액터 경계를 넘어갈 수 있도록 합니다.

## @ModelActor는 무엇을 하는 건가요?

Xcode에서 @ModelActor 매크로를 마우스 오른쪽 버튼으로 클릭하고 "매크로 펼치기"를 선택하면 다음 보일러플레이트가 액터에 추가되었음을 확인할 수 있습니다:

```js
// ThreadsafeBackgroundActor.swift
// This code is Auto-generated by the @ModelActor annotation
nonisolated let modelExecutor: any SwiftData.ModelExecutor

nonisolated let modelContainer: SwiftData.ModelContainer

init(modelContainer: SwiftData.ModelContainer) {
    let modelContext = ModelContext(modelContainer)
    self.modelExecutor = DefaultSerialModelExecutor(modelContext: modelContext)
    self.modelContainer = modelContainer
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

SwiftData에서 ModelContainer는 @Model 어노테이션 클래스에서 생성된 스키마를 사용하여 해당 Model 클래스의 인스턴스를 보유할 수있는 데이터베이스를 생성합니다.

ModelContext는 모델에 대한 변경 사항을 관찰하고 그러한 모델을 조작하는 데 많은 작업을 제공합니다. 구체적으로 데이터를 가져오고 변경 사항을 저장하는 인터페이스입니다. SwiftData 모델의 상태를 변경할 수 있는 능력이 있기 때문에 ModelContext는 Sendable이 아니며, 따라서 ModelContext가 실행하는 작업이 스레드 안전한지 확인하려면 ModelContext를 액터 간에 공유할 수 없습니다.

그러나 ModelContainer는 모델 상태를 변경하지 않기 때문에 Sendable입니다. 때문에 위의 보일러플레이트 코드에서 MainActor에서 생성된 ModelContainer로 ModelActor를 초기화하는 것이 가능합니다.

이니셜라이저는 DefaultSerialModelExecutor를 설정합니다. 이 객체는 액터 내부에서 생성된 actor-분리된 ModelContext를 사용하여 SwiftData 작업을 수행합니다. 이 실행기는 ModelContext가 일렬로 작동하도록 보장하여 SwiftData에 의해 관리되는 모델이 동시 작업에 의해 손상되는 것을 방지합니다.

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

# 3. ViewModel 및 View

이제 ViewModel을 정의할 수 있습니다. async 함수 backgroundFetch를 사용하여 ViewModel을 정의합니다. 이 함수는 ModelActor를 사용하여 메인 스레드가 아닌 곳에서 SwiftData 모델을 검색합니다. 이 ViewModel을 Sendable로 만들어 Swift 컴파일러가 안전하게 여러 컨텍스트 간에 공유할 수 있음을 알 수 있습니다:

```js
// UserQueryView.swift

import SwiftData

@Observable
final class UsersQueryViewModel: Sendable {

    let modelContainer: ModelContainer

    init(modelContainer: ModelContainer) {
        self.modelContainer = modelContainer
    }

    func backgroundFetch() async throws -> [UserDTO] {
        let backgroundActor = ThreadsafeBackgroundActor(modelContainer: modelContainer)
        let result = try await backgroundActor.fetchData()
        return result
    }

}
```

그런 다음 백그라운드 검색을 트리거하는 버튼과 결과를 표시하는 List 뷰가 있는 SwiftUI View를 구현합니다.

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

```swift
// UserQueryView.swift
import SwiftUI
struct UsersQueryView: View {
    let modelContainer: ModelContainer
    @State var isFetchingUsers = false
    @State private var users: [UserDTO] = []
    var viewModel: UsersQueryViewModel


    init(modelContainer: ModelContainer) {
        self.modelContainer = modelContainer
        viewModel = UsersQueryViewModel(modelContainer: modelContainer)
    }

    var body: some View {
        VStack {
            Button("백그라운드 검색") {
                isFetchingUsers = true
                Task {
                    users = try await viewModel.backgroundFetch()
                    isFetchingUsers = false
                }
            }
            .buttonStyle(.bordered)

            if isFetchingUsers {
                List {
                    Text("사용자 정보 가져오는 중...")
                }
            } else {
                if users.count == 0 {
                    ContentUnavailableView("가져온 사용자 없음", systemImage: "person.crop.circle.badge.exclamationmark")
                } else {
                    List(users) { model in
                        Text(model.name)
                    }
                }
            }
        }
    }
}
```

ViewModel의 fetchData 메서드는 actor에서 정의되었기 때문에 await 키워드를 사용하여 actor 외부에서만 호출할 수 있습니다. 따라서 이 함수는 비동기 컨텍스트 내에서 호출되어야 합니다. 이것이 함수 backgroundFetch가 비동기인 이유입니다. backgroundFetch는 View 내에서 분리된 Task 내에서 호출되며 함수가 백그라운드 스레드에서 작업을 수행하는 동안 대기합니다. 함수가 반환되면 ViewModel에서 정의된 변수 users로 백그라운드 actor의 값이 전달됩니다. 이것이 ViewModel이 Sendable이어야 하는 이유입니다.

백그라운드에서 호출된 backgroundFetch 함수를 SwiftUI View 내에서 정의할 수도 있었지만 그런 경우 해당 View 자체가 Sendable 이어야 했습니다. 이는 원하는 유연성을 제공하지 않을 수 있습니다. 그러나 별도의 ViewModel을 가지는 것은 설계 선택이며 엄격히 필수적인 것은 아닙니다.

ThreadsafeBackgroundActor를 메인 스레드에서 초기화하는 것이 반드시 필요합니다. 이는 이로 인해 해당 저장된 속성 modelContext가 메인 스레드에서 실행되도록 보장합니다. 이는 처음에 ThreadsafeBackgroundActor를 생성한 이유 때문입니다 - SwiftData 작업이 백그라운드에서 진행되는 동안 UI가 반응할 수 있게 유지하기 위해서입니다. 예를 들어 View의 이니셜라이저 내에서 ThreadsafeBackgroundActor를 생성하고 이를 ViewModel의 backgroundFetch 함수에 속성으로 전달한다면 fetchData 함수는 MainActor에서 실행되어 UI를 블록할 수 있습니다.

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

## 주의: 작업 우선순위를 ".background"로 설정하지 마세요!

일부 튜토리얼에서는 분리된 작업의 우선순위를 명시적으로 ".background"로 설정하는 것을 권장합니다:

![이미지](/assets/img/2024-07-01-UseSwiftDatalikeaboss_5.png)

이 경우 성능에 상당한 영향을 줄 수 있습니다. 제가 테스트한 결과, 요청 처리 시간이 5배나 늘어난 것으로 나왔어요! 그러니 이렇게 하지 마세요 ;)

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

# 결론

저희 데모 앱은 UI를 차단하지 않고 백그라운드 스레드에서 대량의 SwiftData 모델을 성공적으로 가져와 Swift 컴파일러로부터의 동시성 경고 없이 작동합니다!

아래 GIF에서 앱을 확인할 수 있어요:

![앱 GIF](https://miro.medium.com/v2/resize:fit:1200/1*FjjKhsvvwxWUeTU529rx5w.gif)

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

"\"배경 검색\" 버튼을 누르면 즉시 해제됩니다. 그러나 \"주 스레드 검색\" 버튼을 누를 때는 모델이 반환된 순간에만 해제되며 주 스레드가 검색 중에 차단된 것을 시사합니다.

이는 GIF에서 작업이 수행되는 동안 앱이 프로필링될 때 Instruments에서 해당 창을 통해 확인할 수 있습니다:

![2024-07-01-UseSwiftDatalikeaboss_6](/assets/img/2024-07-01-UseSwiftDatalikeaboss_6.png)

시간 프로필 도구에서 첫 번째 큰 파란색 블록은 어떤 멈춤이 발생하지 않았음을 나타냅니다. 이는 배경 검색과 일치합니다. 그러나 Hangs 도구에서 두 번째 큰 파란색 블록 옆에 "심각한 멈춤"이 표시되는데, 이는 주 스레드 검색이 UI를 차단하고 있는 것을 나타냅니다."

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

이 앱의 전체 구현 내용은 해당 프로젝트용 GitHub 저장소에서 확인할 수 있어요.

읽으신 것이 즐거우셨다면, 이 게시물을 좋아요하거나 저를 팔로우해 주시거나 둘 다 해주세요!

- 고지: 저의 아바타는 DALL-E에 의해 생성되었으며 제 모습과는 무관합니다 — 그는 훨씬 더 잘 생겼어요.
