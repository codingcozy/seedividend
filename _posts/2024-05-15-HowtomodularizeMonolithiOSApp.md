---
title: "iOS 앱의 모놀리스 구조를 모듈화하는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_0.png"
date: 2024-05-15 03:13
ogImage: 
  url: /assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_0.png
tag: Tech
originalTitle: "How to modularize Monolith iOS App"
link: "https://medium.com/@batrakov.vitaly/how-to-modularize-monolith-ios-app-e4d0a9477c9e"
isUpdated: true
---




이것은 내 블로그에서의 게시물 전문입니다. 만약 원하신다면 거기서 읽어보실 수 있습니다. 혹은 비디오를 선호하신다면 여기서 찾아볼 수도 있어요.

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_0.png)

안녕하세요 iOS 개발자 여러분!
어플리케이션이 시간이 지남에 따라 복잡성이 증가했다면, 모듈화는 개발 효율성, 빌드 시간, 확장성, 유지보수성 등을 개선하는 좋은 전략일 수 있습니다. 오늘은 모놀리스 앱에서 모듈식 앱으로의 전환 경로를 단계별로 정확히 살펴보고 각 단계에 대한 통찰을 제공할 것입니다.

모놀리스에서 모듈화로



모듈화로 전환하기 전에 앱은 일반적으로 일종의 계층 구조를 따르는 모노리틱 아키텍처를 따랐을 것입니다. 계층 구조는 가장 일반적이고 널리 사용되는 소프트웨어 아키텍처 패턴 중 하나입니다. 계층 구조는 응용 프로그램의 구성 요소를 별도의 수평 계층으로 구성하며 각 계층은 특정 기능이나 책임을 수행합니다.

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_1.png)

가능한 계층에 대한 전형적인 예시는 다음과 같습니다:

- 데이터/지속성 계층: 데이터 저장 및 검색 담당.
- 비즈니스 로직 계층: 응용 프로그램의 핵심 기능과 로직 포함.
- 프리젠테이션 계층 (UI): 사용자 인터페이스 및 통신 처리.



<img src="/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_2.png" />

레이어 분리 외에도 의존성 방향 규칙을 염두에 두어야 합니다:

의존성 방향 규칙은 의존성 역전 원칙에 크게 의존하여 레이어 간의 느슨한 결합을 유지하고 캡슐화 및 확장성을 제공할 수 있도록 합니다.

# 계층화된 모듈화 아키텍처



계층 구조의 개념은 직관적이며 실제로 모듈화된 아키텍처에도 적용할 수 있어요.

본질적으로 모듈화는 앱을 별도의 모듈로 나누는 것을 의미해요. 따라서 모듈화에 계층적 접근 방식을 적용하여 모듈을 특정 계층에 통합할 수 있어요.

우리는 모듈화된 앱을 세 개의 계층으로 구성할 거에요: Core, Features, 그리고 Composition Root.

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_3.png)



**핵심 레이어:**

- 앱의 다양한 기능에서 사용되는 코드를 포함합니다.
- 특정 앱과 무관한 공유 기능을 제공합니다. UI 구성 요소, 네트워킹, 분석, 유틸리티, 메트릭, 인증, 로깅 등이 포함됩니다.
- 핵심 모듈은 서로 독립적으로 작동하며 다른 핵심 모듈에 의존하지 않습니다.

**기능 레이어:**

- 기능 모듈은 앱의 특정 화면, 관련된 화면 세트 또는 보기와 같은 구별되는 기능이나 기능을 캡슐화합니다. 예시로는 결제 처리, 고객 프로필, 음식점 목록, 검색, 지원 채팅 등이 있습니다.
- 특정 기능에 관련된 UI, 로직 및 데이터 처리에 대한 모든 코드가 포함됩니다.
- 필요한 경우 기능 모듈이 핵심 모듈에 의존할 수 있지만, 다른 기능 모듈에 의존해서는 안 됩니다.
- 기능 모듈은 관심사의 분리를 촉진하여 프로젝트 간 독립적인 개발, 테스트 및 재사용을 용이하게 합니다.



# 구성 루트:

- 구성 루트는 응용 프로그램 내에서 객체 그래프가 조립되고 구성되는 중심 장소 역할을 합니다. 주요 책임은 응용 프로그램 전체에서 모든 종속성을 생성하고 주입하는 것에 있습니다.
- 구성 루트 패턴은 모듈(및 레이어)이 느슨하게 결합되도록 유지하여 필요한 경우 구현 사이의 원활한 전환을 용이하게 합니다.
- 구성 루트 자체가 모듈이 아닌 것을 주목해야 합니다. 대신 앱의 메인 대상 내에 위치합니다.
- 각 기능은 구성 루트 내에 별도의 지정된 구성 폴더를 갖게 되며, Feature[X]Support 폴더(또는 Feature[X]Composition으로도 불립니다)라고 합니다.
- 의존성 주입(Dependency Injection, DI) 및 구성 루트의 개념에 익숙하지 않은 분들을 위해 더 많은 세부 정보는 여기, 여기 및 여기에서 찾을 수 있습니다.

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_4.png)

# 시작하기



그래서 이제 당신은 단일 구조에서 모듈식 구조로 이주를 시작할 준비가 되었습니다.

논리적으로 첫 번째 단계는 코어 모듈을 이주하는 것입니다. 어떻게 하면 코드를 코어 레이어로 옮겨야 할지 어떻게 결정합니까? 당신의 애플리케이션에서 여러 피처 모듈에서 공유되고 필요한 기능을 찾아보십시오. 이에는 UI 구성 요소, 네트워킹, 인증, 분석, 로깅, 유틸리티 함수 등이 포함될 수 있습니다.

모든 코어 모듈이 모듈화되면, 다음에 모듈화하려는 당신의 모놀리스 내에 있는 피처가 있는 시나리오를 고려해 봅시다. 새 모듈을 만들고 관련 코드를 그 곳으로 이동해야 합니다.

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_5.png)



요런 상황 중 하나에 처할 수 있다는 점을 명심하는 것이 중요합니다:

1) 당신의 모듈이 다른 기능에 의존하는 경우 (동일한 레이어)  

![이미지](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_6.png)



의존성 방향 규칙에 따라 테이블 태그를 변경할 수 없어요.

이를 준수하기 위해 의존성 역전을 해야 해요.

즉, 저희 모듈은 다른 기능 모듈에 위치한 구체적인 구현이 아닌 추상화/인터페이스/프로토콜에 의존해야 해요.

전형적인 예시로 이를 어떻게 할 수 있는지 명확하게 설명해볼게요. 한 기능이 다른 기능을 제공하는 네비게이션 시나리오를 상상해봐요.



```swift
// feature 모듈 내부 어딘가에...
import AnotherFeature // 여기서는 AnotherFeature 모듈에 의존할 수 없음
import UIKit

final class YourFeatureViewController: UIViewController {
    private func showAnotherFeature() {
        let vc = AnotherFeatureViewController()
        present(vc, animated: true)
    } 
}
```

AnotherFeature에 대한 의존성을 제거하기 위해 이 의존성을 뒤집고 싶습니다. 새로운 feature 모듈 내부에 공개 라우팅 프로토콜을 만듭니다:

```swift
public protocol YourFeatureRouting {
    func showAnotherFeature()
}
```

이제 이 프로토콜을 사용하여 탐색할 수 있습니다:



```swift
import UIKit

final class YourFeatureViewController: UIViewController {
    private let featureRouter: YourFeatureRouting
    
    init(featureRouter: YourFeatureRouting) {
        self.featureRouter = featureRouter
    }

    private func showAnotherFeature() {
        featureRouter.showAnotherFeature()
    } 
}
```

예를 들어, 이 경우에는 사용자 기능 인터페이스가 특정 화면에 대한 뷰 컨트롤러를 생성하는 팩토리입니다. 우리는 라우팅 프로토콜을 팩토리 매개변수 목록에 넣어 우리의 기능의 필수 종속성으로 추가해야 합니다.

```swift
import UIKit

public enum YourFeatureFactory {
    static func make(
        featureRouter: YourFeatureRouting
    ) -> UIViewController {
        YourFeatureViewController(featureRouter: featureRouter)
    }
}
```

이제 우리의 모듈은 명시적으로 모듈의 사용자(호출자 측, 우리 경우에는 구성 루트)가 우리의 기능이 사용할 YourFeatureRouting 프로토콜에 대한 구현을 제공하도록 요구함을 선언합니다.



다음으로 YourFeatureSupport 폴더의 composition root 안에서 라우터를 구현하고 이 라우팅 프로토콜을 준수하겠습니다:

```js
import AnotherFeature
import UIKit
import YourFeature

struct YourFeatureRouter: YourFeatureRouting {
    var source: UIViewController?
  
    func showAnotherFeature() {
        let vc = AnotherFeatureViewController()
        source?.present(vc, animated: true)
    }
}
```

이제 모든 것을 라우터와 함께 조립하기 위해 구성 팩토리를 사용해야 합니다:

```js
import UIKit
import YourFeature

enum YourFeatureCompositionFactory {
    static func make() -> UIViewController {
        let featureRouter = YourFeatureRouter()
        let featureService = YourServiceFactory.make()
        let vc = YourFeatureFactory.make(
            featureRouter: featureRouter,
            homeService: homeService
        )
        featureRouter.source = vc
        return vc
    }
}
```



그거야! 우리는 AnotherFeature에 대한 종속성을 뒤집었어요.

2) 당신의 모듈은 아래로 의존합니다

![Dependency Downwards](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_7.png)

우리의 의존성 방향 규칙에 의해 허용되지 않아요.



의존하는 코드를 이동하거나 복사하여 새로운 기능 모듈로 옮기세요.

또는

- 다른 모듈(기능 모듈 또는 코어)의 경우:
- 필요한 경우 새 모듈을 생성하여 해당 모듈로 이전합니다.
- 동일한 방법을 사용하여 의존성을 역전합니다. 공용 프로토콜을 생성하고 새 기능 모듈이 구성 루트에서 받을 것을 명시합니다. 의존성은 기능 인터페이스를 통해 주입하세요.



3) 당신의 모듈은 상향으로 의존합니다

![img](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_8.png)

이것은 우리의 의존성 방향 규칙과 일치합니다.

이전에 언급했듯이 특정 UI 구성 요소 코어 모듈(CompanyUIKit)에서 feature 모듈에 대한 의존성은 중요할 수 있습니다. 일부 코어 모듈의 경우 이러한 직접 의존성을 진행할 것인지, 또는 이전에 수행한대로 구성 루트에서 주입하는 방식으로 의존성을 반전할지 고려해야 합니다.



의존성 역전은 코어와 피처 레이어 간의 느슨한 결합을 촉진하여 더 많은 유연성과 재사용성을 제공합니다.

예를 들어, 피처 모듈에서 네트워킹 코어 모듈에 의존한다고 상상해보세요:

![image](/assets/img/2024-05-15-HowtomodularizeMonolithiOSApp_9.png)

- (유연성) 만약 구식 네트워킹 모듈을 새로운 네트워킹GPT 모듈로 교체하고 싶다면 어떨까요?
- 네트워킹 모듈에 직접 의존하고 있다면, 피처 모듈 내의 모든 네트워킹 관련 코드를 수정하고 네트워킹 모듈에서 코드를 사용하는 모든 파일의 import를 업데이트해야 합니다.
- 그러나 의존성을 역전시켜 구성 루트를 통해 주입한다면, 전환하기가 더 쉬워집니다. 구성 루트 내에서 구현할 공개 피처 서비스 프로토콜을 정의함으로써, 네트워킹 구현 세부 사항을 피처 모듈에서 숨깁니다. 구성 루트 내에서 피처 서비스 프로토콜에 대한 새로운 구현을 제공하기만 하면 됩니다.
- (재사용성) 다른 프로젝트에서 피처 모듈을 재사용하려면, 이동하기가 더 간답니다.
- (혜택의 비용) 그러나 이 접근 방식은 약간 더 복잡하고 추가 코드 작성이 필요하다는 점을 유념해야 합니다.



귀하는 특정 시나리오에서 이러한 장단점을 고려해 보십시오.

# 최종 생각

여기 전하고 싶은 아이디어는 모듈화가 로켓 과학이 아니라는 점입니다. 특히 대규모 프로젝트의 경우 빠른 작업은 아닙니다. 그러나 긍정적인 측면은 단계적으로 진행할 수 있다는 것입니다. 로마가 하루 만에 지어지지 않았고, 인내심을 가지고 시도하면 성공할 수 있습니다.

여기 간단한 모듈화 프로젝트 예제가 있습니다. 다음 포스트에서 뵙겠습니다!