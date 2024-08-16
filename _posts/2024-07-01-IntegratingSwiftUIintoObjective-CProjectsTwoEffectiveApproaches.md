---
title: "Objective-C 프로젝트에 SwiftUI 통합 두 가지 효과적인 방법"
description: ""
coverImage: "/assets/img/2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_0.png"
date: 2024-07-01 17:05
ogImage: 
  url: /assets/img/2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_0.png
tag: Tech
originalTitle: "Integrating SwiftUI into Objective-C Projects: Two Effective Approaches"
link: "https://medium.com/@kusalprabathrajapaksha/integrating-swiftui-into-objective-c-projects-two-effective-approaches-daa250fe195c"
isUpdated: true
---





![2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_0](/assets/img/2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_0.png)

iOS 개발이 계속 진화함에 따라 SwiftUI는 강력하고 직관적인 프레임워크로 사용자 인터페이스를 구축하는 데 사용되어 왔습니다. 선언적 구문과 Swift와의 원활한 통합을 통해 새로운 프로젝트에 이 프레임워크를 선택하는 것이 좋습니다. 그러나 많은 개발자들은 Objective-C로 작성된 기존 코드베이스를 유지하고 향상시키고자 합니다. SwiftUI를 이러한 프로젝트에 통합하면 완전히 다시 작성하지 않고도 현대적인 UI 디자인과 향상된 성능을 제공할 수 있습니다.

![2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_1](/assets/img/2024-07-01-IntegratingSwiftUIintoObjective-CProjectsTwoEffectiveApproaches_1.png)

본 문서에서는 Objective-C 프로젝트에 SwiftUI 뷰를 통합하는 두 가지 효과적인 방법을 탐구할 것입니다: UIHostingController를 직접 사용하는 방법과 SwiftUI 래퍼를 만드는 방법. 하나의 SwiftUI 뷰를 추가하거나 전체 UI를 점진적으로 이전하려는 경우, 이러한 방법을 통해 최상의 결과를 얻을 수 있습니다.


<div class="content-ad"></div>

# 방법 1: UIHostingController 직접 사용하기

UIHostingController은 SwiftUI와 UIKit 간의 다리 역할을 수행하여 SwiftUI 뷰를 UIKit 뷰 컨트롤러 내에서 호스팅할 수 있게 해줍니다. 이렇게 하면 됩니다.

## 단계 1: SwiftUI View 만들기

먼저 Swift 파일에서 SwiftUI 뷰를 정의하세요.

<div class="content-ad"></div>

```js
import SwiftUI

struct MySwiftUIView: View {
    var body: some View {
        Text("안녕 SwiftUI!")
            .padding()
    }
}
```

## 단계 2: SwiftUI 뷰 컨트롤러 생성

UIHostingController를 사용하여 SwiftUI 뷰를 호스팅하는 Swift 뷰 컨트롤러를 생성하세요.

```js
import SwiftUI
import UIKit

class MySwiftUIViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let swiftUIView = MySwiftUIView()
        let hostingController = UIHostingController(rootView: swiftUIView)
        
        addChild(hostingController)
        view.addSubview(hostingController.view)
        
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        hostingController.didMove(toParent: self)
    }
}
```

<div class="content-ad"></div>

## 단계 3: 스위프트 뷰 컨트롤러를 Objective-C에 노출시키기

스위프트 클래스를 Objective-C에서 볼 수 있도록 하려면, 브리징 헤더를 만들어야 합니다.

- 'YourProjectName-Bridging-Header.h'라는 브리징 헤더 파일을 생성합니다. (예: 프로젝트명이 HelloWorld인 경우, 브리징 헤더 파일명은 HelloWorld-Bridging-Header.h이어야 합니다.)
- 스위프트 생성 헤더를 import하도록 import 문을 추가합니다.

```js
// YourProjectName-Bridging-Header.h
#import "YourProjectName-Swift.h"
```

<div class="content-ad"></div>

## 단계 4: Objective-C에서 Swift 뷰 컨트롤러 사용하기

이제 Objective-C 코드에서 Swift 뷰 컨트롤러를 인스턴스화하고 사용할 수 있습니다.

```js
// Objective-C ViewController
#import "YourProjectName-Bridging-Header.h"
#import "YourProjectName-Swift.h"

@interface YourObjectiveCViewController ()
@end

@implementation YourObjectiveCViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    MySwiftUIViewController *swiftUIViewController = [[MySwiftUIViewController alloc] init];
    [self addChildViewController:swiftUIViewController];
    [self.view addSubview:swiftUIViewController.view];
    
    swiftUIViewController.view.frame = self.view.bounds;
    [swiftUIViewController didMoveToParentViewController:self];
}

@end
```

# 방법 2: SwiftUI 래퍼 사용하기

<div class="content-ad"></div>

이 방법은 SwiftUI 뷰를 래핑하는 Swift 클래스를 생성하여 관리하고 재사용하기 쉽게 만드는 것을 포함합니다.

## 단계 1: SwiftUI 뷰 생성하기

Swift 파일에서 SwiftUI 뷰를 정의하세요. 이전과 같습니다.

## 단계 2: SwiftUI Wrapper 생성하기

<div class="content-ad"></div>

```swift
import SwiftUI
import UIKit

@objc public class SwiftUIWrapper: NSObject {
    @objc public func createSwiftUIViewController() -> UIViewController {
        let swiftUIView = MySwiftUIView()
        let hostingController = UIHostingController(rootView: swiftUIView)
        return hostingController
    }
}
```

## Step 3: Make the Wrapper Accessible to Objective-C

Ensure the wrapper class is accessible from Objective-C by adding the appropriate bridging header: Same as before.


<div class="content-ad"></div>

- 이미 존재하지 않는 경우 "YourProjectName-Bridging-Header.h"라는 브릿징 헤더 파일을 생성하십시오.
- 다음과 같은 임포트 문을 추가하십시오:

```js
// YourProjectName-Bridging-Header.h
#import "YourProjectName-Swift.h"
```

## 단계 4: Objective-C에서 SwiftUI 래퍼 사용하기

이제 Objective-C 코드에서 SwiftUIWrapper 클래스를 사용하여 SwiftUI 뷰를 표시하십시오.

<div class="content-ad"></div>


```js
// Objective-C ViewController
#import "YourProjectName-Bridging-Header.h"
#import "YourProjectName-Swift.h"

@interface YourObjectiveCViewController ()
@end

@implementation YourObjectiveCViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    SwiftUIWrapper *swiftUIWrapper = [[SwiftUIWrapper alloc] init];
    UIViewController *swiftUIViewController = [swiftUIWrapper createSwiftUIViewController];
    
    [self addChildViewController:swiftUIViewController];
    [self.view addSubview:swiftUIViewController.view];
    
    swiftUIViewController.view.frame = self.view.bounds;
    [swiftUIViewController didMoveToParentViewController:self];
}

@end
```

## 결론

### UIHostingController 직접 사용의 장단점

장점:


<div class="content-ad"></div>

- 단순성: SwiftUI 뷰를 UIKit에 직접 포함시키면 설정 과정이 간단해집니다.
- 성능: 표준 UIKit 뷰 컨트롤러를 사용하기 때문에 오버헤드가 최소화됩니다.
- 유연성: 임베드된 SwiftUI 뷰의 라이프사이클을 완전히 제어할 수 있습니다.

단점:

- 보일러플레이트 코드: 제약 조건 설정 및 뷰 계층 구조 관리를 위해 추가 보일러플레이트 코드가 필요합니다.
- 대규모 프로젝트에서의 복잡성: 여러 UIHostingController 인스턴스를 관리하는 것이 대규모 프로젝트에서는 복잡해질 수 있습니다.

## SwiftUI 래퍼 사용의 장단점

<div class="content-ad"></div>

장점:

- 모듈화: SwiftUI 코드를 별도의 클래스에 캡슐화하여 관리 및 재사용이 쉬워집니다.
- 깔끔한 통합: Objective-C 뷰 컨트롤러에서의 보일러플레이트 코드를 줄입니다.
- 확장성: 프로젝트의 다양한 부분에 여러 SwiftUI 뷰를 추가하는 프로세스를 간소화합니다.

단점:

- 추가적인 추상화: 간단한 통합에 필요하지 않을 수 있는 또 다른 추상화 계층을 도입합니다.
- 학습 곡선: Swift 및 Objective-C 상호 운용성 세부 사항을 모두 이해해야 합니다.

<div class="content-ad"></div>

SwiftUI를 Objective-C 프로젝트에 통합하는 것은 어렵게 느껴질 수 있지만, 올바른 방법을 사용하면 단순해집니다. 이 안내서에서 보여주는 것처럼 UIHostingController를 직접 사용하거나 SwiftUI 래퍼를 만드는 것은 최신 기술을 활용하여 앱을 점진적으로 효율적으로 현대화할 수 있게 해줍니다.