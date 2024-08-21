---
title: "PreferenceKey 사용하여 SwiftUI 뷰 향상시키는 방법 종합 가이드"
description: ""
coverImage: "/assets/img/2024-08-03-EnhancingSwiftUIViewswithPreferenceKeyAComprehensiveGuide_0.png"
date: 2024-08-03 19:04
ogImage:
  url: /assets/img/2024-08-03-EnhancingSwiftUIViewswithPreferenceKeyAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Enhancing SwiftUI Views with PreferenceKey A Comprehensive Guide"
link: "https://medium.com/@wesleymatlock/enhancing-swiftui-views-with-preferencekey-a-comprehensive-guide-0dfa7be2044f"
isUpdated: true
---

<img src="/assets/img/2024-08-03-EnhancingSwiftUIViewswithPreferenceKeyAComprehensiveGuide_0.png" />

SwiftUI는 PreferenceKey를 사용하여 데이터를 사용자 정의하고 상위 뷰 계층 구조로 전달하는 강력한 방법을 제공합니다. 이 블로그 포스트에서는 PreferenceKey를 활용하여 SwiftUI 애플리케이션에서 동적이고 반응적인 뷰를 만드는 방법을 탐색합니다. PreferenceKey의 기본 사항, 구현 방법 및 단위 테스트가 포함된 샘플 프로젝트를 제공합니다. PreferenceKey의 전체 잠재력을 보여주기 위해 고급 사용법에 대해도 알아보겠습니다.

## 목차

1. PreferenceKey 소개

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

2. PreferenceKey 만들기

3. 뷰에서 PreferenceKey 사용하기

4. 실제 예시: 다이나믹 헤더

5. PreferenceKey의 고급 사용법

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

6. Unit Testing PreferenceKey

7. 결론

## 1. PreferenceKey 소개

PreferenceKey는 SwiftUI의 프로토콜로, 뷰가 데이터를 상위 뷰 계층 구조로 전달할 수 있게 해줍니다. 특히 자식 뷰에서 부모 뷰로 데이터를 전달해야 하는 상황에 특히 유용합니다.

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

## 2. PreferenceKey 생성

PreferenceKey를 생성하려면 PreferenceKey 프로토콜을 준수하는 구조체를 정의해야 합니다. 간단한 예제를 살펴보겠습니다:

```js
import SwiftUI

struct MyPreferenceKey: PreferenceKey {
    static var defaultValue: String = ""

    static func reduce(value: inout String, nextValue: () -> String) {
        value = nextValue()
    }
}
```

이 예제에서 MyPreferenceKey는 빈 문자열의 기본값을 갖고 있으며 값을 업데이트하는 reduce 메서드가 있습니다.

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

## 3. 뷰에서 PreferenceKey 사용하기

PreferenceKey를 사용하려면 preference 수정자를 사용하여 뷰에 preference를 첨부한 다음 onPreferenceChange 수정자를 사용하여 조상 뷰에서 preference를 읽어들어야 합니다.

```js
struct ChildView: View {
    var body: some View {
        Text("안녕, SwiftUI!")
            .background(
                GeometryReader { geometry in
                    Color.clear
                        .preference(key: MyPreferenceKey.self, value: "\(geometry.size.width)")
                }
            )
    }
}

struct ParentView: View {
    @State private var width: String = ""

    var body: some View {
        VStack {
            ChildView()
            Text("너비: \(width)")
        }
        .onPreferenceChange(MyPreferenceKey.self) { value in
            self.width = value
        }
    }
}
```

## 4. 실전 예제: 동적 헤더

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

더 실용적인 예제를 만들어보죠. 아래 내용에 따라 외부의 콘텐츠에 따라 모양이 변하는 동적 헤더를 생성해보겠습니다.

```js
import SwiftUI

struct HeaderHeightKey: PreferenceKey {
    static var defaultValue: CGFloat = 0

    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = max(value, nextValue())
    }
}

struct ContentView: View {
    @State private var headerHeight: CGFloat = 0

    var body: some View {
        VStack {
            Text("Dynamic Header")
                .font(.largeTitle)
                .frame(height: headerHeight)
                .background(Color.blue)

            ScrollView {
                VStack {
                    ForEach(0..<50) { index in
                        Text("Item \(index)")
                            .padding()
                            .background(GeometryReader { geometry in
                                Color.clear.preference(key: HeaderHeightKey.self, value: geometry.frame(in: .global).maxY)
                            })
                    }
                }
            }
        }
        .onPreferenceChange(HeaderHeightKey.self) { value in
            self.headerHeight = value
        }
    }
}
```

### 5. PreferenceKey의 고급 사용법

PreferenceKey는 간단한 데이터 전달 이상으로, 여러 자식에서 값을 결합하거나 복잡한 레이아웃을 조정하는 등 더 고급적인 시나리오에 활용할 수 있습니다.

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

여러 자식 뷰에서 값을 결합하는 방법

여러 자식 뷰에서 값을 모아서 사용하려면 PreferenceKey를 사용할 수 있습니다. 예를 들어, 여러 자식 뷰의 총 너비를 계산할 수 있습니다.

```js
struct TotalWidthKey: PreferenceKey {
    static var defaultValue: CGFloat = 0

    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value += nextValue()
    }
}

struct ChildView: View {
    var body: some View {
        Text("Child View")
            .padding()
            .background(GeometryReader { geometry in
                Color.clear.preference(key: TotalWidthKey.self, value: geometry.size.width)
            })
    }
}

struct ChildViewTwo: View {
    var body: some View {
        Text("Child View Two")
            .padding()
            .background(GeometryReader { geometry in
                Color.clear.preference(key: TotalWidthKey.self, value: geometry.size.width)
            })
    }
}

struct ChildViewThree: View {
    var body: some View {
        Text("Child View Three")
            .padding()
            .background(GeometryReader { geometry in
                Color.clear.preference(key: TotalWidthKey.self, value: geometry.size.width)
            })
    }
}

struct ParentView: View {
    @State private var totalWidth: CGFloat = 0

    var body: some View {
        VStack {
            ChildView()
            ChildViewTwo()
            ChildViewThree()
            Text("Total Width: \(totalWidth)")
        }
        .onPreferenceChange(TotalWidthKey.self) { value in
            self.totalWidth = value
        }
    }
}
```

<img src="/assets/img/2024-08-03-EnhancingSwiftUIViewswithPreferenceKeyAComprehensiveGuide_1.png" />

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

복잡한 레이아웃을 조정하는 방법

여러 뷰의 크기를 동기화하는 것과 같이 복잡한 레이아웃을 조정할 때 PreferenceKey를 사용할 수 있습니다.

```swift
struct SynchronizedView: View {
  var body: some View {
    Text("동기화된 뷰")
      .padding()
      .background(GeometryReader { geometry in
        Color.clear.preference(key: SynchronizedSizeKey.self, value: geometry.size)
      })
  }
}

struct SynchronizedViewTwo: View {
  var body: some View {
    Text("동기화된 뷰 2")
      .padding()
      .background(GeometryReader { geometry in
        Color.clear.preference(key: SynchronizedSizeKey.self, value: geometry.size)
      })
  }
}

struct CoordinatedParentView: View {
  @State private var synchronizedSize: CGSize = .zero

  var body: some View {
    VStack {
      SynchronizedView()
      SynchronizedViewTwo()
      Text("크기: \(synchronizedSize.width) x \(synchronizedSize.height)")
    }
    .onPreferenceChange(SynchronizedSizeKey.self) { value in
      self.synchronizedSize = value
    }
  }
}
```

<img src="/assets/img/2024-08-03-EnhancingSwiftUIViewswithPreferenceKeyAComprehensiveGuide_2.png" />

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

## 6. PreferenceKey 단위 테스트

PreferenceKey를 테스트하는 것은 선호 값을 올바르게 전파하고 업데이트되는지 확인하는 것을 포함합니다. 위 예제에 대한 유닛 테스트를 작성하는 방법은 다음과 같습니다.

```js
import XCTest
import SwiftUI
@testable import YourApp

class PreferenceKeyTests: XCTestCase {

    func testHeaderHeightPreferenceKey() {
        let rootView = ContentView()
        let hostingController = UIHostingController(rootView: rootView)

        // 테스트 환경 설정
        hostingController.view.frame = UIScreen.main.bounds
        let window = UIWindow()
        window.rootViewController = hostingController
        window.makeKeyAndVisible()

        // 뷰 계층 구성
        RunLoop.main.run(until: Date())

        // 초기 높이 확인
        XCTAssertEqual(rootView.headerHeight, 0)

        // 스크롤하여 선호값 변경 트리거
        let scrollView = hostingController.view.subviews.first { $0 is UIScrollView } as? UIScrollView
        scrollView?.contentOffset = CGPoint(x: 0, y: 100)

        // 뷰 계층 다시 구성
        RunLoop.main.run(until: Date())

        // 업데이트된 높이 확인
        XCTAssertGreaterThan(rootView.headerHeight, 0)
    }

    func testTotalWidthPreferenceKey() {
        let rootView = ParentView()
        let hostingController = UIHostingController(rootView: rootView)

        // 테스트 환경 설정
        hostingController.view.frame = UIScreen.main.bounds
        let window = UIWindow()
        window.rootViewController = hostingController
        window.makeKeyAndVisible()

        // 뷰 계층 구성
        RunLoop.main.run(until: Date())

        // 초기 전체 너비 확인
        XCTAssertEqual(rootView.totalWidth, 0)

        // 업데이트된 전체 너비 확인
        RunLoop.main.run(until: Date())
        XCTAssertGreaterThan(rootView.totalWidth, 0)
    }

    func testSynchronizedSizePreferenceKey() {
        let rootView = CoordinatedParentView()
        let hostingController = UIHostingController(rootView: rootView)

        // 테스트 환경 설정
        hostingController.view.frame = UIScreen.main.bounds
        let window = UIWindow()
        window.rootViewController = hostingController
        window.makeKeyAndVisible()

        // 뷰 계층 구성
        RunLoop.main.run(until: Date())

        // 초기 동기화된 크기 확인
        XCTAssertEqual(rootView.synchronizedSize, .zero)

        // 업데이트된 동기화된 크기 확인
        RunLoop.main.run(until: Date())
        XCTAssertNotEqual(rootView.synchronizedSize, .zero)
    }
}
```

## 7. 결론

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

SwiftUI에서 PreferenceKey를 사용하면 뷰에서 고급 사용자 정의 및 동적 동작을 구현할 수 있습니다. 이 안내를 따라가면 PreferenceKey를 활용하여 SwiftUI 애플리케이션에서 반응형 및 상호작용 가능한 사용자 인터페이스를 만들 수 있습니다.

원시 모바일 앱 개발에 대해 자세히 알고 싶다면, 여기에서 저가 작성한 다른 기사를 확인해보세요: https://medium.com/@wesleymatlock

즐거운 코딩하시길! 🚀
