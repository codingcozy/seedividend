---
title: "SwiftUI에서 Scrolling Picker를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-08-13-ScrollingpickersinSwiftUI_0.png"
date: 2024-08-13 12:06
ogImage: 
  url: /assets/img/2024-08-13-ScrollingpickersinSwiftUI_0.png
tag: Tech
originalTitle: "Scrolling pickers in SwiftUI"
link: "https://medium.com/@uvolchyk/scrolling-pickers-in-swiftui-de4a9c653fb6"
isUpdated: true
updatedAt: 1723864057821
---




![Scrolling Pickers in SwiftUI](/assets/img/2024-08-13-ScrollingpickersinSwiftUI_0.png)

오늘은 iOS 17부터 가지고 있는 ScrollView의 기능을 살펴보면서 값 피커를 만들어볼 거에요.

이 게시물에서 영감을 받아 함께 시작해보세요.

# 울타리 만들기


<div class="content-ad"></div>

구현 아이디어는 꽤 명확합니다. 수직 세그먼트를 생성해야 합니다. 일부는 더 높고 텍스트 블록이 있으며, 일부는 더 짧고 표시할 숫자가 없습니다. 이는 각 세그먼트의 색인에 따라 결정됩니다.

먼저, 솔루션에 대한 토대를 정의합니다.

```js
struct WheelPicker: View {
  // 사용할 값의 범위.
  var values: ClosedRange<Int> = 0...100

  // 세그먼트 간의 수평 간격.
  var spacing: Double = 8.0

  var body: some View {
    ZStack {
      ScrollView(.horizontal) {
        HStack(spacing: spacing) {
          ForEach(values, id: \.self) { index in
            VStack(spacing: 40.0) {
              Rectangle()
                .frame(width: 2.0, height: 20.0)
                .frame(maxHeight: 20.0, alignment: .top)
              Rectangle()
                .frame(width: 2.0, height: 20.0)
                .frame(maxHeight: 20.0, alignment: .bottom)
            }
          }
        }
      }
    }
    .frame(width: 280.0, height: 80.0)
  }
}
```

따라서 수평으로 열두 개의 수직 세그먼트를 표시합니다. 각 수직 세그먼트는 각각 위쪽과 아래쪽에 정렬된 두 개의 사각형으로 구성됩니다.

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1200/1*RfcW4QEqSMMmJE42DeE4Cg.gif)

다음으로, 숫자를 표시하는 논리와 스크롤 동작을 정의하여이 솔루션을 단계별로 개선할 것입니다.

# 울타리 칠하기

계속하기 전에 표준 자 등을 살펴 보겠습니다. 그려진 긴 세그먼트는 주요 값 사이의 단계 수의 배수인 순서 번호입니다.


<div class="content-ad"></div>


![스크롤링 피커](/assets/img/2024-08-13-ScrollingpickersinSwiftUI_1.png)

예를 들어, 숫자 0과 10 사이에는 10개의 단계가 있습니다. 인덱스가 0과 10인 세그먼트가 길고 나머지는 짧을 것입니다.

```swift
struct WheelPicker: View {
  // 사용할 값의 범위.
  var values: ClosedRange<Int> = 0...100

  // 세그먼트 간의 가로 간격.
  var spacing: Double = 8.0

  // 중요한 인덱스 사이의 단계 수.
  var steps: Int = 5
  
  var body: some View {
    ZStack {
      ScrollView(.horizontal) {
        HStack(spacing: spacing) {
          ForEach(values, id: \.self) { index in
            let isPrimary = index % steps == 0
            
            VStack(spacing: 40.0) {
              Rectangle()
                .frame(
                  width: 2.0,
                  height: isPrimary ? 20.0 : 8.0
                )
                .frame(
                  maxHeight: 20.0,
                  alignment: .top
                )
              Rectangle()
                .frame(
                  width: 2.0,
                  height: isPrimary ? 20.0 : 8.0
                )
                .frame(
                  maxHeight: 20.0,
                  alignment: .bottom
                )
            }
            .overlay {
              if isPrimary {
                Text("\(index)")
                  .font(.system(
                    size: 24.0, 
                    design: .monospaced
                  ))
                  .fixedSize()
              }
            }
          }
        }
      }
    }
    .frame(width: 280.0, height: 80.0)
  }
}
```

![사진](https://miro.medium.com/v2/resize:fit:1200/1*GIWZFuUWtgdat1iEL4vJGw.gif)


<div class="content-ad"></div>

스크롤 뷰 위에 빨간색 라인 오버레이를 추가하여 현재 선택 항목을 나타낼 수 있도록 이 부분을 완료했습니다.

```js
ScrollView(.horizontal) {
  ...
}
.overlay {
  Rectangle()
    .fill(.red)
    .frame(width: 2.0)
}
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*6JLkTmNrr9Um2iltXhANWA.gif" />

# 펜스 스크롤링

<div class="content-ad"></div>

기본 스크롤 표시자를 표시하지 않도록 설정하려고 합니다. 그러니 숨겨봅시다.

```js
ScrollView(.horizontal) {
  ...
}
.overlay {
  ...
}
.scrollIndicators(.hidden)
```

다음으로, 휠의 시작 부분이 빨간 선과 정렬되도록 콘텐츠 여백을 추가해 보겠습니다.

이 작업은 .safeAreaPadding 수정자를 사용하여 수행할 수 있습니다. 여백에 필요한 값을 계산하려면 GeometryReader를 사용합니다.

<div class="content-ad"></div>

```js
GeometryReader { proxy in
  ScrollView(.horizontal) {
    ...
  }
  .overlay {
    ...
  }
  .scrollIndicators(.hidden)
  .safeAreaPadding(.horizontal, proxy.size.width / 2.0)
}
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*gMrR1WoLsidFcGMZwcPeiA.gif" />

이제 바퀴에 다이내믹함을 추가하고 세그먼트와 숫자에 특정 효과를 적용해 봅시다.

빨간 선의 왼쪽에 있는 세그먼트는 약간 어둡게 나타나고, 반대로 오른쪽에 있는 세그먼트는 완전히 불투명하게 나타납니다. 이 효과는 `scrollTransition` 수정자를 사용하여 구현합니다.

<div class="content-ad"></div>

두 번째 매개변수는 두 가지 값을 제공하는 클로저입니다:

- 콘텐츠 — `VisualEffect` 프로토콜을 준수하여 다양한 시각적 효과를 적용하는 다양한 옵션을 제공하는 `EmptyVisualEffect` 타입의 인스턴스
- 페이즈 — 스크롤 뷰에 배치된 요소의 다른 상태를 나타내며, 기본적으로 요소가 스크롤 컨테이너의 중앙, 왼쪽 또는 오른쪽 부분에 있는지 알려줍니다

이 지식을 바탕으로 우리는 불투명도 효과를 구현할 수 있습니다: 왼쪽 측면의 세그먼트에 대해 불투명도를 0.2로 설정하고, 기타에 대해서는 1.0으로 설정합니다.

```js
ForEach(values, id: \.self) { index in
  let isPrimary = index % steps == .zero
  
  VStack(spacing: 40.0) {
    ...
  }
  .scrollTransition(
    axis: .horizontal,
    transition: { content, phase in
      content
        .opacity(phase == .topLeading ? 0.2 : 1.0)
    }
  )
  .overlay {
    ...
  }
}
```

<div class="content-ad"></div>


![Image](https://miro.medium.com/v2/resize:fit:1200/1*liBrt3TntxHEvMK2JCClFA.gif)

가운데를 제외한 모든 곳에 숫자가 어두워집니다. 이를 위해 scrollTransition을 다시 사용하여 영향을 제한된 영역으로 적용합니다.

```js
ForEach(values, id: \.self) { index in
  let isPrimary = index % steps == .zero
  
  VStack(spacing: 40.0) {
    ...
  }
  .scrollTransition(
    axis: .horizontal,
    transition: { content, phase in
      content
        .opacity(phase == .topLeading ? 0.2 : 1.0)
    }
  )
  .overlay {
    if isPrimary {
      Text("\(index)")
        .font(.system(
          size: 24.0, 
          design: .monospaced
        ))
        .fixedSize()
        .scrollTransition(
          axis: .horizontal,
          transition: { content, phase in
            content
              .opacity(phase.isIdentity ? 1.0 : 0.4)
          }
        )
    }
  }
}
```

![Image](https://miro.medium.com/v2/resize:fit:1200/1*Bo-t9NrowlRESkvGAZwZjA.gif)


<div class="content-ad"></div>

정수 범위에서 작업 중이므로 세그먼트 자체에만 스크롤을 멈추도록 설정하는 것이 합리적입니다. 다시 말해, 휠을 다소 각인하여 세그먼트에 제대로 정렬하도록 만들어 보겠습니다.

여기에 ScrollTargetBehavior 프로토콜과 해당 수정자가 필요합니다. 기본적으로 두 가지 옵션이 있습니다:

- 페이지별(paging) — 스크롤이 페이지별로 보이도록 설정됨
- 뷰 정렬(viewAligned) — 이 동작을 사용하면 스크롤이 최종 위치를 자식 뷰와 정렬하려고 시도함

ScrollTargetBehavior는 scrollTargetLayout 수정자와 함께 작동합니다. 후자는 스톱 지점을 계산할 때 SwiftUI에게 어떤 뷰를 고려해야 하는지 알려주는 데 도움을 줍니다.

<div class="content-ad"></div>

```js
GeometryReader { proxy in
  ScrollView(.horizontal) {
    HStack(spacing: spacing) {
      ...
    }
    .scrollTargetLayout()
  }
  .overlay {
    ...
  }
  .scrollIndicators(.hidden)
  .safeAreaPadding(.horizontal, proxy.size.width / 2.0)
  .scrollTargetBehavior(.viewAligned)
}
```

아쉽게도 두 옵션 모두 우리가 원하는 동작을 달성하는 데 도움이 되지 않을 것입니다. 다행히도, ScrollTargetBehavior 프로토콜을 준수하는 사용자 정의 유형을 구현하여 직접 정의할 수 있습니다.

먼저 SnapScrollTargetBehaviour라는 새로운 유형을 정의합니다.

```js
struct SnapScrollTargetBehavior: ScrollTargetBehavior {
  func updateTarget(
    _ target: inout ScrollTarget,
    context: TargetContext
  ) {}
}
```

<div class="content-ad"></div>

updateTarget 메서드는 프로토콜에서 필요한 유일한 메서드입니다. 여기서 target 매개변수는 스크롤 뷰에게 멈추어야 하는 위치를 알려줄 때 사용됩니다. 초기에는 SwiftUI가 스크롤 뷰가 멈춰야 할 위치를 알 수 있는 몇 가지 크기 값이 포함되어 있습니다. 이를 사용하여 동작을 사용자 정의할 수 있습니다.

수학 코너.

스크롤 뷰의 전체 길이를 몇 개의 작은 조각으로 나누어서 나눕니다. 각 조각은 빨간 선이 값을 변경하기 위해 이동해야 하는 거리를 나타냅니다. 이 거리는 단일 세그먼트의 너비와 두 개의 분리된 세그먼트 사이의 거리로 구성됩니다.

![Image](/assets/img/2024-08-13-ScrollingpickersinSwiftUI_2.png)

<div class="content-ad"></div>

우리는 x1(예상 중단 지점, SwiftUI에서 범례)을 찾아야 합니다. x2(우리가 평가한 원하는 값)가 조각 길이의 배수이고 x1에 가장 가까운 값이 되도록 해야 합니다.

와카-치카-부카-붐, 여기 코드가 있어요.

```js
struct SnapScrollTargetBehavior: ScrollTargetBehavior {
  let step: Double

  func updateTarget(
    _ target: inout ScrollTarget,
    context: TargetContext
  ) {
    let x1 = target.rect.origin.x
    let x2 = closestMultiple(a: x1, b: step)
    
    target.rect.origin.x = x2
  }

  private func closestMultiple(
    a: Double,
    b: Double
  ) -> Double {
    let lowerMultiple = floor((a / b)) * b
    let upperMultiple = floor(lowerMultiple + b)
    
    return if abs(a - lowerMultiple) <= abs(a - upperMultiple) {
      lowerMultiple
    } else {
      upperMultiple
    }
  }
}
```

이제 남은 일은 이 인스턴스를 생성하는 편리한 메소드를 정의하는 것 뿐입니다.

<div class="content-ad"></div>

```js
extension ScrollTargetBehavior where Self == SnapScrollTargetBehavior {
  static func snap(step: Double) -> SnapScrollTargetBehavior { .init(step: step) }
}
```

그리고 `scrollTargetBehavior` 수정기에서 사용하세요. 우리는 단락 사이의 거리 및 한 단락의 길이로 단계 길이를 고려할 것입니다.

```js
GeometryReader { proxy in
  ScrollView(.horizontal) {
    HStack(spacing: spacing) {
      ...
    }
    .scrollTargetLayout()
  }
  .overlay {
    ...
  }
  .scrollIndicators(.hidden)
  .safeAreaPadding(.horizontal, proxy.size.width / 2.0)
  .scrollTargetBehavior(.snap(step: spacing + 2.0))
}
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*HBpt_MN2ed5wPGgoHyP3pQ.gif" />


<div class="content-ad"></div>

피커로 불리우는 이 기능은 외부로 값을 전달할 수 있어야 합니다. 이를 위해 해당 값을 바인딩할 필요가 있습니다.

```js
struct WheelPicker: View {
  @Binding var count: Int

  ...
}
```

이전에 정의한 프로퍼티를 scrollPosition modifier와 바인딩시키세요. 우리는 해당 바인딩을 사용자화된 setter로 함께 단순히 정의합니다.

```js
GeometryReader { proxy in
  ScrollView(.horizontal) {
    ...
  }
  .overlay {
    ... 
  }
  .scrollIndicators(.hidden)
  .safeAreaPadding(.horizontal, proxy.size.width / 2.0)
  .scrollTargetBehavior(.snap(step: spacing + 2.0))
  .scrollPosition(
    id: .init(
      get: { count },
      set: { value, _ in
        if let value {
          count = value
        }
      }
    )
  )
}
```

<div class="content-ad"></div>

scrollPosition 수정자는 스크롤 대상과 밀접하게 작동하며 그들의 식별자를 사용하여 값을 전달합니다. 정수 범위와 함께 작업하기 때문에 해당 바인딩을 통해 정수가 반환될 것으로 기대할 수 있습니다.

시각 부분에 추가로 촉각적인 응답을 추가할 수도 있습니다. 저는 개인적으로 애플리케이션이 UI 구성 요소에 이 디테일을 구현할 때 매우 좋아합니다.

SwiftUI의 5번째 개정판은 햅틱 피드백을 추가하는 것을 굉장히 쉽게 만들어줍니다. UIFeedbackGenerator 대신 sensoryFeedback 수정자를 사용할 수 있습니다.

```js
ZStack {
  ...
}
.sensoryFeedback(.selection, trigger: count)
```

<div class="content-ad"></div>

# 결론

이 구성 요소를 개선하는 것이 가능합니다. 예를 들어, 정수뿐만 아니라 다른 유형과 작업할 수 있는 기능을 추가하는 방법이 있습니다. 또한 세그먼트 크기, 색상 등을 사용자 정의하는 방법도 있습니다.

일반적으로 SwiftUI가 상당히 복잡한 동작을 처리할 때 얼마나 단순화되는지 알 수 있습니다.

최종 솔루션을 포함한 gist를 남기고, 추가 개선을 위해 빈 칸을 남겼습니다.

<div class="content-ad"></div>

앞으로도 계속해서 실험을 해 나갈 테니, 곧 뵙겠습니다! 🙌