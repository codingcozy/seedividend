---
title: "Live Activities 101 라이브 타이머 위젯 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-08-13-LiveActivities101AddingaLiveTimerWidget_0.png"
date: 2024-08-13 12:04
ogImage: 
  url: /assets/img/2024-08-13-LiveActivities101AddingaLiveTimerWidget_0.png
tag: Tech
originalTitle: "Live Activities 101 Adding a Live Timer Widget"
link: "https://medium.com/code-like-a-girl/live-activities-101-adding-a-live-timer-widget-d8a6cec7f2e3"
isUpdated: true
updatedAt: 1723864022527
---



![image](https://miro.medium.com/v2/resize:fit:1400/1*JsUzawz5z2ssJZyrfX5fbA.gif)

FocusPasta가 이제 Live Activities를 지원한다는 것을 발표할 수 있어 너무 기쁩니다! 🎉 이 기능은 기다리고 기다리던 것이었는데요. 우리 유일한 사용자(나)가 너무나 요구가 많아서요.

# 왜 이번 업데이트가 중요한 이유

이번 업데이트 이전에 남은 시간을 확인하려면 다음과 같은 작업을 해야 했어요:


<div class="content-ad"></div>

- 내 핸드폰 화면을 탭해요.
- 얼굴을 카메라 앞에서 완벽하게 맞춰 Face ID 작동시키는 중.
- 손가락으로 화면을 위로 스와이프.
- 이미 화면에 FocusPasta가 보이지 않는다면 찾아내기.
- 우연히 인스타그램을 눌러서 처음 목적을 깨닫기 전에 30분 강제로 둠스크롤을 하게 되었어요.

정말 힘든 일이었어요 (네, 일상적인 문제들이죠).

나는 (네, 바로 me!) 이 기능을 추가해달라고 절로 부탁했어요. 치열한 협상 기간 동안 나는 아주 맛있는 아이스 커피와 귀여운 브런치로 나를 뇌물을 주고, 그리고 개발자 (여전히 나)는 마침내 굴복하고 구현했어요.

내 명령은 내 명령이니까요.

<div class="content-ad"></div>

# 라이브 활동 소개

## 사용자를 위해

라이브 활동을 통해 앱이 앱을 열거나 화면을 잠그지 않고도 핸드폰에 실시간 정보를 제공할 수 있습니다. 이 위젯은 iPhone의 두 위치에 나타납니다: 다이나믹 아일랜드와 잠금 화면.

라이브 활동을 통해 Grab/Uber라이드 픽업을 쉽게 추적하거나 축구 경기의 실시간 점수를 업데이트할 수 있습니다. FocusPasta에서는 이 기능을 사용하여 포커스 세션의 남은 시간을 확인할 수 있습니다.

<div class="content-ad"></div>

## 개발자를 위해

기술적인 측면에서 Live Activities는 배터리 효율을 우선시하여 실시간 업데이트를 제공하는 경량 위젯입니다. 복잡한 상호 작용이나 빈번한 업데이트를 지원하지 않는 제한된 기능을 갖고 있습니다.

이 위젯을 디자인하기 시작할 때는 스마트폰의 움직임에 반응하여 냄비 안에서 파스타가 자랄 것처럼 주변을 굴러다니는 모습을 상상했지만, 현실은 그것보다 훨씬 현실적이었습니다.

그 꿈을 내려놓고, Live Activities가 실제로 어떤 성과를 얻을 수 있는지에 초점을 맞춰봅시다. 다음 섹션에서 Live Activities 설정 과정을 안내해 드리도록 하겠습니다.

<div class="content-ad"></div>

# 라이브 활동 설정

다음은 라이브 활동을 설정하는 방법의 단계별 설명입니다:

- 라이브 활동 활성화

- 프로젝트의 주요 대상에서 Info로 이동합니다.
- "Supports Live Activities"를 추가하고 값을 "YES"로 설정합니다.

<div class="content-ad"></div>

2. 새로운 라이브 액티비티 대상 추가하기:

- 파일 ` 새로 만들기 ` 대상 ` 위젯 확장 을 선택합니다.
- "라이브 액티비티 포함"이 체크되어 있는지 확인합니다.
- 제품 이름을 "FocusSession"으로 설정합니다.
- 완료를 클릭합니다.

이렇게 하면 "FocusSession"이라는 새 대상이 생성되며 자동으로 다음 파일을 포함한 새 디렉토리가 만들어집니다:

```js
FocusSession
├── FocusSessionBundle.swift
├── FocusSession.swift
└── FocusSessionLiveActivity.swift
```

<div class="content-ad"></div>

# 이 파일에 대한 개요:

## FocusSessionBundle.swift:

이 파일은 앱의 Live 활동을 포함한 모든 위젯을 그룹화하는 FocusSessionBundle을 포함하고 있습니다.

```swift
import WidgetKit
import SwiftUI

@main
struct FocusSessionBundle: WidgetBundle {
    var body: some Widget {
        FocusSession()
        FocusSessionLiveActivity()
    }
}
```

<div class="content-ad"></div>

## FocusSession.swift

이 파일은 이번 업데이트에서 구현하지 않는 FocusSession 위젯에 해당됩니다. (이 파일에 있는 모든 것과 FocusSessionBundle.swift의 FocusSession()도 주석 처리했습니다.)

## FocusSessionLiveActivity.swift

이 파일은 FocusSessionLiveActivity 위젯에 해당되며, 라이브 활동에 대한 주요 구현 로직이 포함되어 있습니다.

<div class="content-ad"></div>

내용은 두 개의 구조체를 포함합니다:

- FocusSessionAttributes: 라이브 활동의 데이터 구조를 정의합니다.
- FocusSessionLiveActivity: 라이브 활동 UI를 구현합니다.

```js
import ActivityKit
import WidgetKit
import SwiftUI

struct FocusSessionAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // ... 동적 상태 변수
    }
    // ... 고정된 변하지 않는 속성
}

struct FocusSessionLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FocusSessionAttributes.self) { context in
            // ... 락 화면 UI
        } dynamicIsland: { context in
            // ... 동적 아일랜드 UI
        }
    }
}
```

# 라이브 활동 구성

<div class="content-ad"></div>

## 1. FocusSessionAttributes

이 구조에서는 표시할 정보를 나타내는 라이브 활동의 속성 및 콘텐츠 상태를 정의합니다.

```js
struct FocusSessionAttributes: ActivityAttributes {
 public struct ContentState: Codable, Hashable {
  var categoryName: String
  var pastaColor: PastaColors
  var pastaType: PastaTypes
 }
 
 var startDate: Date
 var endDate: Date
 var countsDown: Bool // 타이머 모드 인 경우 true, 스톱워치 모드인 경우 false
}
```

속성: 라이브 활동의 고정되고 변경되지 않는 속성을 정의합니다.

<div class="content-ad"></div>

- startDate와 endDate: FocusPasta에서는 포커스 세션의 기간이 고정되어 있어 활동이 시작되면 이 날짜가 변경되지 않습니다.
- countsDown: 이 속성은 활동이 타이머 모드(카운트다운)인지 스톱워치 모드(카운트업)인지를 나타냅니다. 세션 중에 모드가 변경되지 않기 때문에 상수입니다.

ContentState: 라이브 활동의 동적 부분을 정의하여 실시간 업데이트를 반영합니다.

- FocusPasta에서 사용자는 세션 중에 카테고리를 변경할 수 있습니다. 이런 경우, 업데이트된 카테고리 이름, 파스타 종류, 색상을 반영하기 위해 라이브 활동을 업데이트하고자 합니다.

속성과 콘텐츠 상태를 분리함으로써 Apple은 가변적인 실시간 요소만 추적하고 업데이트해야 하므로 라이브 활동의 효율성과 가벼움을 유지할 수 있습니다.

<div class="content-ad"></div>

## 2. FocusSessionLiveActivity

이 구조체에서는 라이브 액티비티의 UI를 정의합니다.

![live activity image](/assets/img/2024-08-13-LiveActivities101AddingaLiveTimerWidget_0.png)

위 코드가 위의 모습을 달성하는 방법입니다:

<div class="content-ad"></div>

```js
struct FocusSessionLiveActivity: Widget {
 var body: some WidgetConfiguration {
  ActivityConfiguration(for: FocusSessionAttributes.self) { context in
   VStack {
    HStack(spacing: 15) {
     ZStack {
      Image("pot")
       .resizable()
       .aspectRatio(contentMode: .fit)
       .frame(width: 90, height: 90)
       .foregroundColor(.pastaYellow)
      
      Image("\(context.state.pastaType)-\(context.state.pastaColor)")
       .resizable()
       .aspectRatio(contentMode: .fit)
       .frame(width: 40, height: 40)
       .rotationEffect(.degrees(-20))
     }
     .frame(width: 90, height: 90)
     
     VStack(alignment: .leading, spacing: 8) {
      Text(context.state.categoryName)
       .font(.body)
       .foregroundStyle(.white)
       .bold()
      
      Text(timerInterval: context.attributes.startDate...context.attributes.endDate, countsDown: context.attributes.countsDown, showsHours: false)
       .font(.title)
       .foregroundStyle(.white)
       .bold()
      
      ProgressView(timerInterval: context.attributes.startDate...context.attributes.endDate, countsDown: context.attributes.countsDown, label: { Text("") }, currentValueLabel: { Text("") })
       .progressViewStyle(LinearProgressViewStyle())
       .tint(.pastaYellow)
       .frame(height: 20)
       .scaleEffect(x: 1, y: 1.5, anchor: .center)
     }
    }
    
   }
   .activityBackgroundTint(.black.opacity(0.25))
   .padding(.vertical, 20) 
   .padding(.horizontal, 20)
  } dynamicIsland: { context in  
   // ... dynamic island UI (out of scope)
  }
 }
}
```

## TimerInterval

위젯 구성에서 startDate와 endDate를 고정 속성으로 전달했고 timeElapsed를 콘텐츠 상태 변수로 만들지 않았음을 알 수 있습니다. 이는 Apple이 백그라운드 앱 활동에 대한 제한으로 백그라운드에서 타이머가 실행되는 것을 방지하기 때문입니다. timeElapsed를 콘텐츠 상태 변수로 사용하면 위젯의 타이머가 몇 초 후에 업데이트를 멈추게 됩니다.

이러한 제한을 해결하기 위해 Apple은 Text와 ProgressView에 대한 timerInterval 초기화 메서드를 소개했습니다. 이 초기화 메서드는 타이머의 간격을 정의하는 지정된 시간 범위를 수락하고 자동으로 타이머 텍스트와 진행률 막대를 업데이트합니다. countsDown가 true인 경우 카운트다운을 표시하며 false인 경우 스톱워치 스타일 타이머를 표시합니다.

<div class="content-ad"></div>

위젯이 메인 앱의 타이머 업데이트에 의존하지 않고 자체 타이머 인스턴스를 관리할 수 있게 됩니다.

이전에 백그라운드에서 타이머를 실행하는 데 어려움을 겪은 내 경험에 대해 이야기했습니다.

## 3. FocusSessionLiveActivityManager

FocusSessionLiveActivityManager 클래스를 만들어 Live Activity의 라이프 사이클을 관리하고 새 활동을 시작하고 내용 상태를 업데이트하며 세션이 완료되면 활동을 종료합니다.

<div class="content-ad"></div>

별도의 클래스를 사용하여 이러한 작업을 관리하는 것에는 몇 가지 이점이 있습니다:

- 관심사의 분리: 이 원칙은 응용 프로그램의 다른 측면이 각각 특정 책임을 갖는 서로 다른 구성 요소나 클래스에 의해 처리되도록 보장합니다. 이는 유지보수를 간단하게 만들고 코드를 이해하고 테스트하기 쉽게 만듭니다.
- 캡슐화: 이를 통해 Live Activities에 관련된 모든 데이터와 메서드가 단일 클래스 내에 묶이므로 코드 구성이 개선됩니다.
- 집중된 책임: 클래스의 각 메서드는 활동 생성, 업데이트 또는 종료와 같은 특정 작업을 처리하므로 가독성이 향상되고 디버깅이 더 쉬워집니다.

다음은 클래스의 구현 방법입니다:

```js
import ActivityKit
import Combine
import Foundation
import SwiftUI

class FocusSessionLiveActivityManager {
 private var liveActivityID: Activity<FocusSessionAttributes>.ID?
 
 @available(iOSApplicationExtension 16.2, *)
 func startFocusSessionActivity(startDate: Date, endDate: Date, countsDown: Bool, categoryName: String, pastaColor: PastaColors, pastaType: PastaTypes) {
  let attributes = FocusSessionAttributes(
   startDate: startDate,
   endDate: endDate,
   countsDown: countsDown
  )
  
  let contentState = FocusSessionAttributes.ContentState(
   categoryName: categoryName,
   pastaColor: pastaColor,
   pastaType: pastaType
  )
 
  let content = ActivityContent(state: contentState, staleDate: nil, relevanceScore: 1.0)
  
  Task {
   do {
    let activity = try Activity.request(
     attributes: attributes,
     content: content,
     pushType: nil
    )
    liveActivityID = activity.id
   } catch {
    print("Error starting FocusSessionActivity: \(error.localizedDescription)")
   }
  }
 }
 
 
 // 세션 중에 카테고리가 변경되면 Live Activity를 업데이트
 @available(iOSApplicationExtension 16.2, *)
 func updateFocusSessionActivity(categoryName: String, pastaColor: PastaColors, pastaType: PastaTypes) {
  guard let activityID = liveActivityID else {
   return
  }
  
  guard let activity = Activity<FocusSessionAttributes>.activities.first(where: { $0.id == activityID }) else {
   return
  }
  
  let contentState = FocusSessionAttributes.ContentState(
   categoryName: categoryName,
   pastaColor: pastaColor,
   pastaType: pastaType
  )
  
  Task {
   await activity.update(
    ActivityContent(state: contentState, staleDate: nil, relevanceScore: 1.0)
   )
  }
 }
 
 // 타이머가 멈출 때 Live Activity 종료
 @available(iOSApplicationExtension 16.2, *)
 func endFocusSessionActivity(categoryName: String, pastaColor: PastaColors, pastaType: PastaTypes) {
  guard let activityID = liveActivityID else {
   return
  }
  
  guard let activity = Activity<FocusSessionAttributes>.activities.first(where: { $0.id == activityID }) else {
   return
  }
  
  let contentState = FocusSessionAttributes.ContentState(
   categoryName: categoryName,
   pastaColor: pastaColor,
   pastaType: pastaType
  )
  
  Task {
   await activity.end(
    ActivityContent(state: contentState, staleDate: nil, relevanceScore: 1.0),
    dismissalPolicy: .immediate
   )
  }
 }
}
```

<div class="content-ad"></div>

# 결론

라이브 활동은 사용자가 중요한 정보를 화면 잠금 상태에서 직접 살펴볼 수 있는 편리한 방법을 제공합니다. 그러나 배터리 수명을 보호하기 위해 그들의 기능은 일부러 제한되어 있습니다.

애플은 타이머 간격 이니셜라이저를 도입하여 위젯이 타이머를 관리할 수 있게 하여, 주 앱에서 필요로 하는 업데이트 빈도를 줄입니다. 이는 또한 주 앱에서 백그라운드에서 실행되지 않는 타이머 문제에 대한 해결책을 제공합니다.

이 일이 간단한 작업처럼 보일 수 있지만, 실제로는 그렇지 않았습니다. 그러나 나는 이 블로그를 시작하여 정제된 결과물과 그 과정에서 진행한 많은 시행착오를 공유하기 위해 시작했습니다.

<div class="content-ad"></div>

라이브 활동 및 다이나믹 아일랜드 설정에 대해 약 12시간 정도 소요되었고, 아직 일부 문제를 해결하고 있습니다. 다음 게시물에서는 이 간단해 보이는 기능을 작동시키기 위해 12시간이나 걸렸고 해결해야 할 문제들에 대해 자세히 살펴볼 것입니다. 기대해 주세요!