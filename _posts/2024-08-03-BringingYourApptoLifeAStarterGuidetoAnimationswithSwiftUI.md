---
title: "SwiftUI로 애니메이션 시작하기 앱을 생동감 있게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-08-03-BringingYourApptoLifeAStarterGuidetoAnimationswithSwiftUI_0.png"
date: 2024-08-03 19:07
ogImage: 
  url: /assets/img/2024-08-03-BringingYourApptoLifeAStarterGuidetoAnimationswithSwiftUI_0.png
tag: Tech
originalTitle: "Bringing Your App to Life A Starter Guide to Animations with SwiftUI"
link: "https://medium.com/@luiscalvillo/bringing-your-app-to-life-a-starter-guide-to-animations-with-swiftui-9876ffa9f071"
isUpdated: true
---




<img src="/assets/img/2024-08-03-BringingYourApptoLifeAStarterGuidetoAnimationswithSwiftUI_0.png" />

스마트폰 앱의 세계에서 애니메이션은 미학에 관한 것뿐만 아니라 사용자 경험에서 중요한 역할을 합니다. 애니메이션은 사용자를 안내하고 피드백을 제공하며 상호작용이 자연스럽고 매력적으로 느껴지도록 할 수 있습니다. SwiftUI는 Apple의 선언적 UI 프레임워크로, 최소한의 코드로 앱에 애니메이션을 추가할 수 있는 강력한 도구를 제공합니다. 이 글에서는 SwiftUI에서 간단한 전환부터 복잡한 상호작용 애니메이션까지 만들 수 있는 다양한 유형의 애니메이션을 탐험해보겠습니다.

## 애니메이션을 사용하는 이유

기술적인 세부 사항에 대해 자세히 알아보기 전에, 애니메이션의 중요성에 대해 간단히 알아봅시다:

<div class="content-ad"></div>

1. 피드백 및 확인: 애니메이션은 시각적인 피드백을 제공하여 작업이 인식됐음을 확인할 수 있습니다 (예: 버튼을 누르는 것).

2. 사용자 안내: 중요한 요소에 사용자의 주의를 집중시키거나 사용자를 프로세스를 통해 안내할 수 있습니다.

3. 기쁨과 참여: 잘 만들어진 애니메이션은 앱을 더 즐겁게 사용할 수 있게 만들어 기쁨과 참여감을 만들어낼 수 있습니다.

## SwiftUI 애니메이션 시작하기

<div class="content-ad"></div>

SwiftUI는 애니메이션을 추가하는 것이 굉장히 쉽습니다. SwiftUI에서의 애니메이션은 단순히 시간이 지남에 따라 SwiftUI가 애니메이트하는 상태 변경에 불과합니다. 이는 애니메이션 블록 내에서 뷰의 속성을 수정하여 달성됩니다. 코딩을 시작하기 전에 암시적 애니메이션과 명시적 애니메이션의 차이를 배워봅시다.

# 암시적 vs. 명시적 애니메이션

SwiftUI는 암시적 애니메이션과 명시적 애니메이션 둘 다 지원하며 두 가지 유형 모두를 사용하여 원하는 애니메이션을 구현할 수 있습니다.

암시적 애니메이션
암시적 애니메이션은 두 유형 중에서 더 간단하고 직관적입니다. 애니메이션은 직접 애니메이션화하려는 속성에 정의됩니다. .animation()이나 .transition()을 사용하여 상태 변경 시 자동으로 트리거됩니다.

<div class="content-ad"></div>

명시적 애니메이션
명시적 애니메이션은 애니메이션이 어떻게 발생하는지와 언제 발생하는지에 대해 더 많은 제어를 제공합니다. withAnimation() 함수를 사용하여 애니메이션 블록을 명시적으로 정의합니다. 이 접근 방식을 통해 상태나 뷰 속성의 변경을 구체적으로 애니메이션화하거나 여러 변경 사항을 하나의 애니메이션 하에 그룹화할 수 있습니다.

이제 암시적 및 명시적 애니메이션의 기본을 다뤘으니, 구체적인 예제로 들어가 봅시다.

# 1. 기본 애니메이션

가장 간단한 형태의 애니메이션부터 시작해 보겠습니다: 암시적 애니메이션을 사용하여 뷰 상태의 변경을 애니메이션화하는 것입니다. 이 예제에서는 파란 원을 확대 및 축소하는 방법을 살펴보겠습니다.

<div class="content-ad"></div>

```js
import SwiftUI

struct BasicAnimationView: View {
    @State private var isScaled: Bool = false
    
    var body: some View {
        VStack {
            Spacer()
            Circle()
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .scaleEffect(isScaled ? 2.0 : 1.0)
                .animation(.easeInOut(duration: 1.0), value: isScaled)
            
            Spacer()
            
            Button(action: {
                isScaled.toggle()
            }) {
                Text("Animate")
                    .font(.title)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            Spacer()
        }
    }
}
```

위 코드 이해하기:
- isScaled 상태 변수가 토글될 때 크기가 변경되는 Circle() 뷰가 있습니다. .animation() 수정자는 .easeInOut 곡선을 사용하여 변경 사항을 부드럽게 애니메이션화합니다.
- scaledEffect(): isScaled Bool 값을 2.0으로 변경하여 객체의 크기를 1.0에서 2.0으로 조정합니다.
- .easeInOut: 이는 이징 곡선을 지정합니다. ease-in-out 곡선은 애니메이션이 천천히 시작하여 중간에 가속되고 마지막에 다시 속도가 감소합니다.
- duration: 1.0: 애니메이션의 지속 시간을 1초로 설정합니다.
- value: isScaled: 이 매개변수는 변경 사항을 감시할 값을 지정합니다. isScaled가 변경될 때 애니메이션이 트리거됩니다.

<img src="https://miro.medium.com/v2/resize:fit:442/1*aHTmEZpr6WbhPOuDBjXcFw.gif" />


<div class="content-ad"></div>

# 3. 물체 회전하기

여기서는 withAnimation()을 사용하여 명시적 애니메이션으로 회전하는 녹색 정사각형을 만들어볼 것입니다.

```js
import SwiftUI

struct RotatingAnimationView: View {
    @State private var rotation: Double = 0
    
    var body: some View {
        VStack {
            Spacer()
            Rectangle()
                .fill(Color.green)
                .frame(width: 100, height: 100)
                .rotationEffect(.degrees(rotation))
            
            Spacer()
            
            Button(action: {
                withAnimation(.easeInOut(duration: 2.0)) {
                    rotation += 360
                }
            }) {
                Text("회전하기")
                    .font(.title)
                    .padding()
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            Spacer()
        }
    }
}
```

코드 이해하기:

<div class="content-ad"></div>

- object의 회전 상태를 추적하려면 회전 상태 변수를 0으로 설정하세요.
- 직사각형에 .rotationEffect()를 추가하세요.
- withAnimation()에서 애니메이션을 실행할 기간과 객체의 이동 방식을 결정하세요. ease-in-out 곡선은 천천히 시작하여 중간에서 가속하고 끝에 다가갈수록 느려져 더 자연스러운 애니메이션으로 보입니다.
- 직사각형을 전체 360도 회전시키려면 withAnimation() 내에서 회전 상태 변수에 360을 추가하세요.

![이미지](https://miro.medium.com/v2/resize:fit:442/1*lGYUApFiO0PzhrHYV1h7UA.gif)

# 3. Spring 애니메이션

Spring 애니메이션은 전환에 바운스하고 자연스러운 느낌을 제공합니다. SwiftUI를 사용하면 .spring() 애니메이션 곡선을 사용하여 간단하게 spring 애니메이션을 만들 수 있습니다. 우리는 튀어오르고 내려오는 둥근 직사각형을 만들겠습니다.

<div class="content-ad"></div>

```swift
import SwiftUI

struct SpringAnimationView: View {
    @State private var offset: CGFloat = -100
    
    var body: some View {
        VStack {
            Spacer()
            RoundedRectangle(cornerRadius: 25)
                .fill(Color.orange)
                .frame(width: 200, height: 100)
                .offset(y: offset)
                .animation(.spring(response: 0.5, dampingFraction: 0.5, blendDuration: 1), value: offset)
            
            Spacer()
            
            Button(action: {
                offset = offset == 0 ? -100 : 0
            }) {
                Text("Bounce")
                    .font(.title)
                    .padding()
                    .background(Color.orange)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            Spacer()
        }
    }
}
```

코드 이해하기:

- offset의 변화로 사각형이 산뜻한 효과로 위아래로 튕기며 애니메이션됩니다. response, dampingFraction, blendDuration와 같은 매개변수를 사용하여 튕김을 세밀하게 조정할 수 있습니다.
- response: 0.5초, 애니메이션 속도를 제어합니다.
- dampingFraction: 0.5, 움직임이 얼마나 빨리 느려지거나 멈출지를 결정합니다.
- blendDuration: 1초, 이 애니메이션을 다른 애니메이션과 혼합하는 데 필요한 초 단위의 지속 시간을 지정합니다.

![이미지](https://miro.medium.com/v2/resize:fit:442/1*5-xcMoCrF4y6hBuxb6j6Nw.gif)


<div class="content-ad"></div>

# 4. 도형과 경로 애니메이션

사용자 정의된 도형과 경로를 애니메이션화 할 수도 있어요. 이를 통해 더 창의적인 애니메이션을 만들 수 있습니다. 여기에서, 보라색 선이 원의 경로를 따라 이동합니다.

```js
import SwiftUI

struct PathShapeAnimationView: View {
    @State private var trimEnd: CGFloat = 0.0
    
    var body: some View {
        VStack {
            Spacer()
            Circle()
                .trim(from: 0.0, to: trimEnd)
                .stroke(Color.purple, lineWidth: 5)
                .frame(width: 100, height: 100)
                .animation(.easeInOut(duration: 1.0), value: trimEnd)
            
            Spacer()
            
            Button(action: {
                trimEnd = trimEnd == 1.0 ? 0.0 : 1.0
            }) {
                Text("경로 애니메이션")
                    .font(.title)
                    .padding()
                    .background(Color.purple)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            Spacer()
        }
    }
}
```

코드 이해:

<div class="content-ad"></div>

- state 변수 trimEnd를 생성하고 0.0으로 설정하여 원의 그리기 진행 상황을 추적합니다.
- 원 모양에 .trim 수정자를 추가하여 trimEnd를 통해 시각적 세그먼트를 제어합니다.
- .animation 내에서 애니메이션 지속 시간과 이징을 설정합니다. 우리는 .easeInOut을 사용하여 더 부드러운 움직임을 위해 애니메이션이 천천히 시작하고 끝나도록 합니다.
- 버튼을 사용하여 trimEnd를 0.0과 1.0 사이로 전환하여 원의 완전한 나타나고 사라짐을 애니메이션화합니다.

![image](https://miro.medium.com/v2/resize:fit:442/1*mek_VgbOawYN4DfhaZMi4g.gif)

# 5. 트랜지션 애니메이션

트랜지션은 뷰의 입장과 퇴장을 애니메이션화합니다. SwiftUI는 .slide, .opacity 및 .scale과 같은 다양한 트랜지션 유형을 제공합니다. 우리는 .opacity를 사용하여 둥근 직사각형이 나타나고 사라지도록 만들 것입니다.

<div class="content-ad"></div>

```swift
import SwiftUI

struct TransitionAnimationView: View {
   @State private var isVisible: Bool = false
    
    var body: some View {
        VStack {
            Spacer()
            
            if isVisible {
                RoundedRectangle(cornerRadius: 25)
                    .fill(Color.red)
                    .frame(width: 300, height: 300)
                    .transition(.opacity)
            }
            
            Spacer()
            
            Button(action: {
                withAnimation(.easeInOut) {
                    isVisible.toggle()
                }
            }) {
                Text("Toggle View")
                    .font(.title)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            
            Spacer()
        }
    }
}
```

코드 이해:

- RoundedRectangle는 isVisible 상태에 따라 슬라이딩 전환으로 나타나고 사라집니다.
- .transition(.opacity): RoundedRectangle의 가시성을 제어합니다.
- withAnimation(.easeInOut)를 사용하여 투명도를 부드럽게 애니메이션화할 수 있습니다.
- 그런 다음 isVisible 상태를 isVisible.toggle()로 토글합니다.

![image](https://miro.medium.com/v2/resize:fit:442/1*zWa1i1VhYQV9mBHmB5qO4w.gif)


<div class="content-ad"></div>

# 6. 제스처와 인터랙티브 애니메이션

SwiftUI는 제스처에 의한 애니메이션도 지원합니다. 이는 사용자 입력에 따라 드래깅 또는 탭 같은 동작으로 애니메이션이 작동하는 것을 말합니다. 저희는 DragGesture()을 사용하여 드래그할 수 있는 달걀 모양의 타원을 만들어봅시다.

```swift
import SwiftUI

struct DraggableView: View {
   @State private var dragOffset: CGSize = .zero
    
    var body: some View {
        Ellipse()
            .fill(Color.yellow)
            .frame(width: 170, height: 200)
            .offset(dragOffset)
            .gesture(
                DragGesture()
                    .onChanged { gesture in
                        dragOffset = gesture.translation
                    }
                    .onEnded { _ in
                        withAnimation(.spring()) {
                            dragOffset = .zero
                        }
                    }
            )
    }
}
```

코드를 이해하는 방법:

<div class="content-ad"></div>

- 원은 화면 주변에서 드래그할 수 있고, 놓으면 스프링 애니메이션으로 원래 위치로 스냅합니다.
- 드래그로 인한 위치 변화를 추적하기 위해 CGSize 변수 dragOffset을 사용합니다. 초기화 값은 .zero입니다.
- 원의 위치는 .offset(dragOffset)으로 설정합니다.
- .gesture()은 Ellipse에 DragGesture()을 적용하는 데 사용됩니다.
- .onChanged를 사용하여 gesture.translation으로 드래그할 때 Ellipse의 위치를 변경합니다.
- 사용자가 놓으면 Ellipse는 .spring() 효과와 함께 시작 위치 .zero로 돌아갑니다.

![이미지](https://miro.medium.com/v2/resize:fit:442/1*kYExoUsvQki1oC0lvyDkPw.gif)

# 결론

SwiftUI의 애니메이션 기능은 강력하면서도 쉽게 사용할 수 있어 개발자들이 최소한의 노력으로 시각적으로 매력적이고 직관적인 사용자 인터페이스를 만들 수 있습니다. 간단한 전환효과나 복잡한 상호작용 애니메이션을 추가하든, SwiftUI는 기쁜 사용자 경험을 만들기 위해 필요한 도구를 제공합니다.

<div class="content-ad"></div>

애니메이션은 앱을 크게 향상시킬 수 있지만 사용할 때에는 신중하고 적게 사용하여 사용자 경험에 긍정적인 영향을 미치도록 해야 합니다. 이제 애니메이션 사용 방법을 배웠으니, 앱의 사용자 경험을 향상시키기 위해 애니메이션을 추가해보세요.

SwiftUI 및 iOS 개발에 대한 더 많은 자습서, 팁, 그리고 통찰력을 얻으려면 제 Medium 페이지를 팔로우하고 다른 글도 읽어보세요. 이 튜토리얼이 도움이 되었다면 박수로 응원해주세요! 즐거운 애니메이팅 되세요! 🎨