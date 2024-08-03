---
title: "React Native 개발자라면 알아둬야할 새로운 아키텍처"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Become a React Native Developer  The New Architecture"
link: "https://medium.com/@under_the_hook/react-native-the-new-architecture-c4ba8ed8b452"
---



과거 아키텍처는 예전에는 굉장한 해결책으로 여겨졌지만, 몇 가지 React Native 버전 이후에는 개선이 필수적인 것으로 보입니다. 과거 아키텍처를 살펴보겠습니다:

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_0.png)

## 네이티브 모듈

JavaScript는 웹 및 모바일에서 기능이 제한되어 있습니다. 그래서 JavaScript는 환경 모듈을 사용합니다. 웹에서는 브라우저가 제공하는 모듈(예: console.log)을 사용하고 모바일에서는 Java/ObjC로 작성된 네이티브 모듈이 있습니다. 네이티브 모듈은 JavaScript에서 사용할 수 없는 Bluetooth, 카메라 등과 같은 네이티브 기능 및 라이브러리를 제공합니다.

<div class="content-ad"></div>

## UIManager

UIManager: React Native에서 제공하는 모듈로, 네이티브 UI 구성요소와 상호작용하기 위한 메서드를 노출합니다.

- UIManager 작업은 일반적으로 주 UI 스레드에서 실행됩니다. 이는 레이아웃 업데이트, 속성 변경, 측정 및 애니메이션과 같은 네이티브 UI 구성요소와의 상호작용이 UI 렌더링 프로세스와 동기화되어야 하기 때문입니다.
- 이는 JavaScript 코드에서 직접 UI 구성요소를 관리하는 방법을 제공합니다. 뷰 레이아웃 관리, 뷰 속성 업데이트, 뷰 차원 측정 및 뷰 애니메이션 수행을 위한 메서드를 제공합니다. 이러한 메서드를 사용하면 React Native 애플리케이션에서 네이티브 UI 요소를 제어하고 조작할 수 있습니다.
- UIManager를 사용하여 수행할 수 있는 몇 가지 일반적 작업에는 다음이 포함됩니다:
  - 네이티브 UI 구성요소의 스타일 및 속성 업데이트
  - 네이티브 UI 구성요소의 치수 측정
  - 애플리케이션 내 UI 구성요소의 레이아웃 관리
  - UI 구성요소 애니메이션

다음은 React Native 애플리케이션에서 UIManager를 사용하는 간단한 예시입니다:

```js
import { UIManager, findNodeHandle } from "react-native";
// 네이티브 UI 구성요소 스타일 업데이트
const viewRef = findNodeHandle(this.refs.myView);
UIManager.setStyle(viewRef, { backgroundColor: "red" });
// 네이티브 UI 구성요소 치수 측정
UIManager.measure(viewRef, (x, y, width, height, pageX, pageY) => {
  console.log("View dimensions:", { width, height });
});
// 뷰 애니메이션 수행
UIManager.configureNextLayoutAnimation({
  duration: 500, // 밀리초
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
});
```

<div class="content-ad"></div>

## 요가 (레이아웃 엔진)

요가: 사용자 화면 내 UI 요소의 위치를 계산하는 레이아웃 엔진의 이름입니다.

요가는 Flexbox를 구현하는 크로스 플랫폼 레이아웃 엔진입니다.

요가는 React Native에서 UI 구성 요소의 레이아웃을 처리하기 위해 사용되는 레이아웃 엔진입니다. 이것은 React Native에 통합된 별도의 프로젝트로, 플랫폼 간 일관된 레이아웃 모델을 제공합니다. UI 스레드는 Flexbox 모델을 기반으로 UI 요소의 레이아웃과 위치를 결정하기 위해 Yoga 레이아웃 엔진과 상호 작용합니다.

<div class="content-ad"></div>

React Native 컴포넌트는 flexDirection, justifyContent, alignItems 등의 Flexbox 속성을 사용하여 레이아웃을 지정합니다. Yoga는 이러한 속성을 해석하고 컴포넌트의 위치와 크기를 계산하여 Flexbox 레이아웃 모델을 준수합니다.

따라서 네이티브 측에서는 직접적으로 Flexbox를 "알지" 못하지만, Yoga가 Flexbox 규칙을 네이티브 레이아웃 명령어로 변환하여 React Native의 레이아웃 시스템의 중요한 부분이 됩니다.

Yoga의 역할은 주로 두 가지입니다:

- 레이아웃 계산
- 트리 프로모션.

<div class="content-ad"></div>

React Native이 Yoga가 필요한 이유는 무엇인가요?

- 크로스 플랫폼 일관성: React Native은 iOS 및 Android와 같은 다양한 플랫폼에서 일관된 개발 경험을 제공하기를 목표로 합니다. Yoga는 레이아웃 및 렌더링 처리 방식의 차이에도 불구하고, 레이아웃 계산이 각 플랫폼에서 일관된 결과를 만들도록 보장함으로써 이 목표를 달성하는 데 도움을 줍니다.
- 효율적인 레이아웃 계산: Yoga는 효율적인 레이아웃 계산을 설계되어 부드럽고 반응성 있는 사용자 인터페이스를 유지하는 데 중요한 역할을 합니다. 이는 성능이 중요한 모바일 애플리케이션에서 특히 중요합니다.
- Flexbox 지원: Yoga는 강력하고 유연한 사용자 인터페이스 디자인 방법인 Flexbox 레이아웃 모델을 기반으로 합니다. Flexbox를 이용하면 다양한 화면 크기와 방향에 잘 적응하는 복잡한 레이아웃을 쉽게 만들 수 있습니다.
- 사용자 정의 가능한 레이아웃: Yoga는 다양한 구성 옵션 세트를 통해 레이아웃 동작에 대한 높은 수준의 제어를 제공합니다. 이를 통해 개발자는 애플리케이션의 특정 요구 사항과 일치하는 레이아웃 특성을 세밀하게 조정할 수 있습니다.
- 오픈 소스 및 커뮤니티 지원: Yoga는 오픈 소스로, 다양한 개발자 커뮤니티의 기여와 피드백을 받습니다. 이를 통해 시간이 흐름에 따라 성능, 신뢰성 및 기능 세트를 향상시키는 데 도움을 줍니다.

![React Native 개발자가 되기 - 새로운 아키텍처](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_1.png)

## 3 개의 분리된 스레드

<div class="content-ad"></div>

리액트 네이티브에서는 섀도우, 네이티브 및 자바스크립트 세 가지 주요 스레드로 구성된 아키텍처가 있습니다.

리액트 네이티브 앱이 실행될 때, 자바스크립트 코드는 자바스크립트 번들이라는 하나의 패키지로 번들화됩니다. 네이티브 코드는 별도로 유지됩니다.

자바스크립트 스레드 —

- 자바스크립트 엔진에 의해 사용되며, 자바스크립트 번들(리액트 네이티브 애플리케이션 논리 - 리액트 컴포넌트, 이벤트 핸들러, 데이터 처리 함수 등을 포함)을 실행하는 데 사용됩니다. 이 스레드에서 발생하는 더 많은 일들:

<div class="content-ad"></div>

- React Native 컴포넌트 관리: React Native은 개발자가 JavaScript를 사용하여 네이티브 UI 요소를 만들 수 있게 해주는 일련의 컴포넌트와 API를 제공합니다. 이러한 컴포넌트들은 장치 화면에 렌더링되며 JavaScript 스레드는 이들의 라이프사이클, 상태 변경 및 상호작용을 관리합니다.
- 네이티브 모듈과의 통신 처리: React Native은 개발자가 네이티브 코드를 JavaScript 코드베이스에 통합함으로써 플랫폼별 기능에 액세스할 수 있도록 합니다. 이러한 네이티브 모듈은 JavaScript에 네이티브 API를 노출하여 JavaScript만으로는 달성할 수 없는 작업을 수행할 수 있게 합니다. JavaScript 스레드는 이러한 네이티브 모듈과의 통신을 관리하며 메서드 호출, 데이터 전달 및 콜백 처리 등을 담당합니다.
- 업데이트 및 렌더링 조정: JavaScript 스레드는 또한 애플리케이션 상태 변경에 따른 UI 업데이트를 조정합니다. 상태나 프롭스가 변경되면 React 컴포넌트가 다시 렌더링되어 애플리케이션의 업데이트된 상태를 반영합니다. JavaScript 스레드는 이 프로세스를 조정하여 어떤 컴포넌트가 업데이트되어야 하는지 결정합니다.
- JavaScript 쪽은 비즈니스 로직과 조정을 처리합니다

네이티브/UI 스레드 - 네이티브 모듈 실행 및 UI 렌더링, 사용자 제스처 이벤트 처리 등을 담당합니다.

그림자 스레드 -

- 렌더링하기 전 요소의 레이아웃을 계산하는데 사용되는 3번째 스레드가 있습니다.
- 네이티브 쪽에서 Yoga로 전송된 트리를 업데이트하기 위해 사용됩니다.
- 이 스레드의 주요 역할은 UI 레이아웃 측정(위치, 높이, 너비 등)을 수행하는 것입니다.
- 이 스레드를 도입하기 전에, 메인 스레드는 터치 이벤트, UI 계산 및 UI 렌더링을 처리했습니다. 그러나 그림자 스레드가 추가되면 메인 스레드는 UI 터치와 UI 렌더링에 집중하고, 그림자 스레드는 UI 계산을 처리하고 결과를 메인 스레드에 전달하여 디스플레이에 렌더링합니다. 이는 레이아웃 계산이 수행되는 동안 UI가 계속 렌더링되므로 더 부드럽고 응답성이 뛰어난 UI를 제공합니다.
- React Native은 기본적으로 레이아웃에 플렉스박스를 사용하나, 기본 네이티브 컴포넌트들은 이에 익숙하지 않습니다. 대신 프로젝트 내에서 사용되는 레이아웃 엔진인 Yoga에서 변환을 의존합니다. UI 관련 작업을 처리할 때 네이티브 컴포넌트는 UIManager 모듈을 통해 그림자 트리 모양에 접근해야 하므로 Yoga를 통해 순회할 필요가 있어 성능 부담이 발생할 수 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_2.png)

## JavaScript 엔진

JavaScriptCore: React Native에서 JS 코드를 실행하는 데 사용되는 JavaScript 엔진의 이름입니다.

JavaScript 번들을 JavaScript 스레드에서 실행합니다. 선택한 JavaScript 엔진은 iOS에서 제공하는 WebKit을 기반으로 한 JavaScriptCore입니다. 이의 큰 장점은 iOS에서 무료로 제공된다는 것입니다. Android에서는 JavaScript 번들에 포함되어 있어야 합니다. iOS의 JSC는 무료로 제공되지만 Android에는 그렇지 않으므로 React Native에서 번들에 포함해야 합니다.

<div class="content-ad"></div>

- JSC — 안드로이드에서 번들화될 필요가 있습니다.\*

![/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_3.png](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_3.png)

## 브릿지

비동기 일괄 메시지 대기열은 C++로 작성되었습니다. 이것이 하이라이트입니다 — 애플리케이션이 시작되면 브릿지가 실행됩니다. 이는 JavaScript 측과 네이티브 측 간의 메시지를 전달하는 비동기 대기열입니다. 메시지의 선택된 형식은 JSON이었습니다. 이는 유니버설 형식이기 때문에 통신에 일반적으로 사용되는 형식입니다. 브릿지는 네이티브/JavaScript 측에서 메시지를 일괄 처리하고 다른 쪽으로 비동기적으로 전달합니다. 여기 왔다가 계속 봐야 해요.

<div class="content-ad"></div>

각 데이터가 다리를 통해 전송될 때마다 JSON으로 직렬화해야 합니다. 데이터가 반대편에서 받아지면 해독되어야 합니다.

즉, JavaScript와 네이티브 세계는 서로를 알지 못합니다 (즉, JS 스레드는 네이티브 스레드에서 직접 메소드를 호출할 수 없음).

또 다른 중요한 점은 브릿지를 통해 보내는 메시지들이 비동기적인 성격이라는 것입니다. 대부분의 경우에 대해 좋은 점이지만 JS 코드와 네이티브 코드가 동기화되어야 하는 특정 상황이 있습니다.

JS와 네이티브 스레드 사이의 통신은 브릿지라는 개체를 통해 이루어집니다. 브릿지를 통해 데이터를 보낼 때, 묶어(최적화)서 JSON으로 직렬화되어야 합니다. 이 브릿지는 비동기 통신만 처리할 수 있습니다.

<div class="content-ad"></div>

예를 들어, JavaScript 스레드가 일부 네이티브 모듈(예: 블루투스)에 액세스해야 할 경우 네이티브 스레드에 메시지를 보내야 합니다. JS 스레드는 직렬화된 JSON 메시지를 브릿지로 보냅니다. 브릿지는 이 메시지를 최적화하여 네이티브 스레드로 전송합니다. 메시지는 네이티브 스레드에서 디코딩되고 필요한 네이티브 코드가 실행됩니다.

![React Native Architecture](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_4.png)

네이티브 API를 호출하거나 JavaScript 측에서 렌더링을 할 때마다 메시지가 직렬화되어 큐에 보내져 브릿지로 전달됩니다. 현재 네이티브 스레드가 처리할 수 있는 용량이 있을 때, 큐에 넣고 처리하며 필요한 경우 메시지를 다시 보냅니다. 브릿지 아키텍처는 비동기식으로 설계되어 있습니다. React Native 역시 비동기식으로 설계되어 있기 때문에, 대부분의 경우 아무것도 차단하고 싶지 않을 것입니다.

화면에 보이는 요소만 렌더링되는 목록이 있는 앱을 예로 들어보겠습니다. 스크롤할 때 뷰포트가 변경되므로 새로운 행이 필요합니다. 브릿지를 통해 JavaScript로 각 행에 메시지를 보냅니다. JavaScript는 대기 중인 메시지를 받아 처리하고 다시 보냅니다. 빠르게 스크롤하면 행 대신 빈 공간이 나타날 수 있습니다. 이는 동기식으로 처리할 수 없기 때문에 발생합니다. 네이티브 환경에서는 이러한 문제가 없습니다. 이전의 동기식 방식으로 이러한 행을 재활용할 수 있습니다. 진짜 문제는 어떻게 네이티브 경험에 더 가까워질 수 있는지입니다.

<div class="content-ad"></div>

2개의 별도의 브릿지 및 브릿지 인터페이스

자바스크립트에서 네이티브 코드로 통신 및 그 반대에 대한 처리를위한 별도의 대기열이 있습니다: 네이티브에서 JS로 및 JS에서 네이티브로의 브릿지,

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_5.png)

브릿지와의 모든 상호 작용은 네이티브 측의 브릿지 인터페이스를 통해 이루어집니다.

<div class="content-ad"></div>

클릭 이벤트가 어딘가에 루트 뷰 아래에서 원래 발생 - 브릿지 인터페이스와 통신 - 네이티브에서 JS 브릿지로 전송 - 리액트 앱이 이를 받아 일부 BL을 수행 - UI 응답을 보내고 업데이트가 요소 트리에 발생 - 두 트리 간의 차이가 브릿지 인터페이스로 돌아가고 React Native가 변경 사항을 렌더링하는 방법을 결정합니다.

## 사용자 정의 네이티브 모듈

React Native 라이브러리에는 기본 네이티브 모듈이 함께 제공됩니다. 여기에 사용자가 직접 작성한 사용자 정의 네이티브 모듈이 추가로 포함됩니다. 따라서 Android/iOS 폴더로 이동하여 일부 네이티브 코드를 작성하고 해당 코드를 모듈로 등록할 수 있습니다.

## Metro

<div class="content-ad"></div>

일반적으로, 이것은 사용자 정의 번들러입니다.

# 이전 아키텍처 - 혜택

주요 혜택 2가지:

- 비동기 - 코드는 동기 호출 옵션이 없기 때문에 블로킹되지 않습니다.
- 분리된 - 자바스크립트와 네이티브 측면 간에 통신하기 위해 발명된 브릿지는 React Native에 결합되지 않았습니다.

<div class="content-ad"></div>

# 구식 아키텍처 - 제한사항

## 구식 아키텍처 - 비동기적인 특성

이 브릿지의 특성은 비동기적으로 발견된 문제입니다. 다른 쪽으로 메시지가 도착할 때 정확히 언제인지 확신할 수 없습니다. 브릿지는 데이터를 비동기적으로 전달하며, 필요하지 않을 때도 그렇게 합니다:
예를 들어 - 큰 항목 목록을 스크롤하려고 할 때: 10개의 항목이 표시되지만 나머지를 보고 싶을 때 - 스크롤하면 (아마도 UI가 차단되지 않았을 때) 몇 초 동안 아무것도 보이지 않을 것입니다. 자바스크립트 쪽이 반응하고 데이터를 가져오는 데 시간이 걸리기 때문입니다.

약 100ms마다 자바스크립트/리액트 네이티브 쪽의 모든 작업이 일괄 처리되어 브릿지를 통해 다른 쪽으로 이동합니다.

<div class="content-ad"></div>

## 이전 아키텍처 — 단일 MQ

다리는 단일이며 단일 스레드입니다. 대량의 비동기 메시지를 다룬다면 병목 현상이 예상됩니다. 하나의 다리 - 하나의 큐, 이것은 매우 쉽게 병목 현상이 발생하고 다리 로깅 문제가 생기며 성능이 너무 느립니다.

## 이전 아키텍처 — 다리에 우선순위 없음

다리의 데이터가 직렬화되고 일괄 처리되기 때문에 데이터는 동시에 모두 보내져야 합니다 — 특정 데이터를 우선순위로 설정할 수 없습니다. UI 이벤트의 우선순위를 설정하고 애니메이션을 중단시킬 방법이 없습니다.

<div class="content-ad"></div>

## 과거 아키텍처 - 브릿지 성능

각 계층이 다른 계층과 통신할 때마다 데이터를 직렬화해야 합니다. 다른 계층은 데이터를 역직렬화해야 하는데, 이는 오버헤드와 지연을 증가시킵니다. JSON은 그 간단함과 인간이 읽기 편하다는 이유로 선택되었지만, 경량 형식임에도 불구하고 이에는 비용이 따릅니다.

JS 및 UI 스레드가 동기화되지 않은 경우, 앱이 프레임을 놓치면서 느린 것처럼 보이는 특정 사용 사례가 있을 수 있습니다. (예: 큰 데이터 목록이 포함된 FlatList를 스크롤하는 경우)

## 과거 아키텍처 - 브릿지와 JavaScriptCore Engine의 강한 결합

<div class="content-ad"></div>

현재 아키텍처는 JavaScriptCore 엔진을 사용합니다. 이 브릿지는 이 특정 엔진과만 호환됩니다.

## 이전 아키텍처 — 배포 및 빌드 개선이 반드시 필요합니다

- iOS 및 Android을 위한 공유된 내부 및 렌더링 없음 — 공유 C++ 구현 (렌더링 + 소프트웨어 네이티브)
- 플랫폼별 성능 최적화를 만들어야 합니다. 지금까지 2 플랫폼으로 전달되지 않았습니다 — 각 호스트는 개별적으로 작동합니다.
- React 안전성을 제공 — JS, 네이티브 코드 및 C++로 작업 중이기 때문에 타입이 일치하지 않아 고장 날 일이 없습니다.
- 블루투스와 같은 모든 네이티브 모듈을 업로드합니다 — 시작 시간이 느려집니다! 네이티브 모듈 - 필요할 때 모든 네이티브 모듈을 시작 시에 로드해야합니다 (서로가 서로에 대해 아무것도 모르기 때문에).

## 이전 아키텍처 — 2 영역이 서로를 알지 못합니다.

<div class="content-ad"></div>

요가 — JS가 제어하지 않아요.

위에서 언급한 대로, 비동기식 브릿지의 성질이 좀 더 나아질 수 있습니다. 계속 보내다가 어느 순간, 뭔가 돌아올지도 모릅니다. 진짜로 보장이 없죠.

모든 네이티브 모듈 (블루투스 등) 업로드하기 — 시작 시간이 느려져요! 양 쪽 간 인식이 없으니까 아직 언제 필요할지 모릅니다. 그래서 그냥 모든 것을 업로드합니다 (단순히 화면이 6개라도). 시작 시간을 낮출 수 있어요!

네이티브가 Yoga의 트리를 업데이트하기 위해 메시지를 보내는 경우와 JS가 그것을 제어하지 못하는 경우.

<div class="content-ad"></div>

과거 아키텍처에서 React Native는 브릿지를 사용했어 — 하나의 통신 채널이자 병목 현상이었지. 이전에는 JSON 번들을 통해 네이티브 측에 도달하는 좋은 해결책으로 보였어. 하나의 통신 채널이기 때문에 메시지가 많을 때 빠르게 도달하는데, 자바스크립트와 네이티브 측은 서로 아무것도 모르지. 그들은 JSON 번들을 수신하고 이를 이해하지 못하며, 그러다 보니 어디서 왔는지나 그 내용이 무엇인지 알 수가 없어.

하위 호환성을 유지하기 위해 얼마 동안은 해당 브리지를 유지할 거야. 그러나 곧 사라질 거야.

브리지 — 동기 일괄 처리는 영역 간 인식이 되지 않음을 의미해

리액트의 이러한 동기 전후처리가 필요한 기능들이 있어. 이제 리액트에는 많은 동시 기능들이 있고, 우리는 이 리액트를 뒤쳐지지 않을 거야.

<div class="content-ad"></div>

- 리액트 버전을 올리는 것이 쉽지 않았어요 - 리액트는 리액트 네이티브에 내장되어 있어서 18로 버전을 올리는 것은 동기화 메커니즘이 필요했기 때문이에요.
- 리액트 네이티브 복잡한 인프라 - 리액트 네이티브는 기능을 위해 JavaScript, 쉐도우 및 네이티브 스레드가 3가지 주요 스레드를 사용해요. 게다가 그들 사이의 데이터 교환은 공유 메모리를 사용하지 않고 브릿지를 통해 데이터를 복사해 요.
- 앱이 실행될 때 모든 네이티브 모듈을 로딩해야 해요 - UIManager가 매핑해야 하기 때문이에요.
- 무거운 리액트 네이티브 레포지터리

# 새 아키텍처

2022년에 출시된 새 아키텍처는 JSI와 bridgless가 큰 변화였어요.

해결책은 기존 시스템에서 가져왔어요 - 브라우저와 같은 시스템. 우리에게 JavaScript 런타임이 있고 JavaScript 언어의 일부가 아닌 기능도 있어요. 하지만 setInterval, setTimeout 등은 JavaScript의 일부가 아니지만 사용할 수 있어요. 이들을 사용할 때, JavaScript 런타임을 확장하는 C++ 함수에 대한 참조만 사용하는 거예요.

<div class="content-ad"></div>

리액트 네이티브의 새 아키텍처에서는 JavaScript 엔진 런타임을 확장하고 네이티브 메서드를 JavaScript로 프록시하는 네이티브 코드가 있습니다. 이 코드는 JavaScript에서 직접 호출할 수 있습니다.

리액트 네이티브는 브라우저와 약간 다를 수 있습니다. 왜냐하면 리액트 네이티브에는 Android 및 iOS 환경 두 가지가 있고, 사용하려는 서로 다른 JavaScript 엔진도 다릅니다.

리액트 네이티브는 일종의 계약인 추상화를 생성합니다. JavaScript 엔진과 네이티브 코드를 JavaScript로 노출하고 싶어하는 경우를 위한 것입니다. JSI가 이 추상화 역할을 할 것입니다. 이 추상화는 JavaScript 런타임을 확장하고 서로 다른 JavaScript 엔진(Native - JSI - Chakara/JavaScriptCore/V8)을 사용하는 마법을 가능케 할 것입니다.

![React Native Developer](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_6.png)

<div class="content-ad"></div>

React 쪽은 모든 것이 그대로 유지됩니다. 네이티브 쪽에서는 많은 변화가 있었는데, 가장 중요한 부분은 JavaScript가 네이티브 쪽과 어떻게 통신하는지입니다. 새로운 아키텍쳐에는 4가지 주요 구성 요소가 있습니다:

- JavaScript Interface (JSI)
- Fabric
- Turbo Modules
- CodeGen

## JSI = JavaScript와 C++ 간의 직접적 인터페이스

JavaScript Interface: 이것은 C++으로 작성된 경량의 "일반 목적" 레이어로, JavaScript 엔진이 네이티브 영역에서 메서드를 직접 호출하는 데 사용할 수 있습니다. JavaScript 엔진을 C++ 애플리케이션에 쉽게 내장할 수 있도록 만들어졌습니다.

<div class="content-ad"></div>

다리는 더 이상 새 아키텍처에서 사용되지 않습니다. 대신 새로운 "접착제"인 JSI (JavaScript Interface)가 있습니다. JSI는 JavaScript와 C++ 간에 서로 호출할 수 있는 새로운 인터페이스입니다.

console.log와 같은 아이디어는 (native code) 그대로 유지되었지만, 이제 더 이상 특정 JavaScript VM에 종속되지 않습니다. 왜냐하면 JSI에는 자체 API가 있으며 React 애플리케이션과 C++ 측 간의 모든 통신이 JSI를 통해 이루어지기 때문입니다.

JSI를 사용하면 2 가지 측이 서로 인식할 수 있습니다. 이는 JavaScript에서 네이티브 함수를 직접 사용하여 서로 호출할 수 있기 때문입니다.

JSI는 JavaScript 측이 Native 측과 대화하는 것을 가능하게 하는 자바스크립트 인터페이스입니다. 두 측은 동일한 메모리를 공유합니다. 두 측 간의 JSON 메시지를 직렬화할 필요가 없습니다. JSI는 직접 액세스를 제공하며, 더 이상 직렬화할 필요가 없습니다. 이것은 엄청난 속도 향상을 가져다줍니다! 이제 C++ 측, Native 측, JavaScript 측 간에 직접 통신이 가능합니다. 이는 간단한 인터페이스를 제공하며 직접 호스팅이 가능합니다. JavaScript 코드가 C++ 코드를 호출하고 그 반대도 가능합니다. JavaScript/C++ 코드가 섞인 점프 수트를 가지게 됩니다.

<div class="content-ad"></div>

JSI는 JavaScript와 C++ 간의 직접적인 연결을 제공하지만 JavaScript와 Java(Android) 및 JavaScript와 ObjC(iOS) 사이의 연결은 어떨까요?

ObjC에서 C++과의 관계를 볼 수 있으며 Android에서는 Java가 JNI를 통해 C++로 번역됩니다. C++는 ObjC와 Java의 공통 요소입니다...

예를 들어 "console.log"는 네이티브 코드를 반환합니다. JavaScript는 단순히 네이티브 측에서 실행해야 하는 함수에 대한 참조만 호출합니다.

JavaScript 인터페이스는 JavaScript 엔진과 격리되어 있으므로 새로운 아키텍처는 Chakra, v8, Hermes 등의 JavaScriptCore와 같은 다른 JavaScript 엔진의 사용을 가능하게 합니다. 그래서 "일반 목적"이라는 용어가 사용되는 것입니다.

<div class="content-ad"></div>

![React Native 개발자 되기 - 새로운 아키텍처](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_7.png)

JSI의 또 다른 큰 장점은 C++로 작성된다는 것입니다. C++의 능력으로 React Native는 스마트 워치, 스마트 TV 등 다양한 시스템을 대상으로 할 수 있습니다.

JSI는 코드에 대해 알아야 합니다. 레퍼런스를 노출할 수 있도록 하기 위해 JSI-바인딩이라고 하는 것이 있습니다. 따라서 JavaScript에서 네이티브 모듈을 호출하려면 JSI를 거쳐야 하며, 바인딩을 거치는데 바인딩에 구현 세부 정보가 있습니다. 네이티브 모듈을 호출하는 방법을 알고 있는 get 메서드가 있습니다.

자바스크립트는 네이티브로 직접 호출하거나 jsi를 통해 호출할 수 있습니다 (네이티브 코드에서 알려져야 함). C++에서 jsi 바인딩을 생성하려면 타입을 알아야 합니다. JavaScript에서 rt 이전에는 타입에 대한 정보가 없습니다.

<div class="content-ad"></div>

![Become-a-React-Native-Developer-—-The-New-Architecture_8.png](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_8.png)

JSI를 통해 Native 메소드는 C++ 호스트 객체를 통해 JavaScript에 노출됩니다 (JSI에는 호스트 객체가 있습니다).

호스트 객체: C++의 맥락에서 "호스트 객체"는 일반적으로 C++ 코드가 실행되는 환경 내에 존재하는 객체를 가리킵니다. 이는 운영 체제에 의해 생성된 객체, 하드웨어 리소스를 나타내는 객체 또는 하위 시스템과 상호 작용하는 라이브러리/프레임워크에서 제공된 객체 등을 포함할 수 있습니다. 예를 들어, 파일 스트림: 파일 시스템에 있는 파일을 나타내는 객체로, C++ 표준 라이브러리에서 제공되는 std::ifstream 또는 std::ofstream와 같은 클래스를 사용하여 생성됩니다.

큰 소식은 JSI를 통해 JavaScript 코드가 Native 모듈을 참조할 수 있게 되었으며, 이를 브릿지가 허용하지 않았던 것입니다. JSI를 통해 JavaScript는이 참조를 통해 메소드를 직접 호출할 수 있습니다.

<div class="content-ad"></div>

자바스크립트는 C++ 호스트 객체에 대한 참조를 보유할 수 있으며 해당 참조를 사용하여 메서드를 직접 호출할 수 있습니다. 우리는 모바일 세계에 대해 이야기하고 있지만, 웹도 비슷합니다. 자바스크립트 코드는 DOM 요소에 대한 참조를 보유하고 그 위에 메서드를 호출할 수 있습니다. 예를 들어:

```js
const container = document.createElement("div");
container.style.width = "100px";
container.style.height = "100px";
container.style.background = "red";
container.style.color = "white";
container.innerHTML = "Hello";
document.getElementById("main").appendChild(container);
<body>
  <div id="main"></div>
</body>;
```

위 예제에서 "container"는 자바스크립트 변수입니다. 그러나 실제로는 브라우저의 DOM 요소에 대한 참조를 보유하고 있습니다. 그리고 브라우저는 C++로 작성되었으므로 이 DOM 요소도 C++에서 초기화됩니다. "container" 변수에서 어떤 메서드를 호출하면 결과적으로 DOM 요소에서 메서드가 호출됩니다. JSI는 동일한 논리로 작동합니다.

<div class="content-ad"></div>

위 그림에서 볼 수 있듯이 JavaScript는 네이티브 모듈에 직접 참조를 가지고 있으며 JavaScript 인터페이스를 통해 이 네이티브 모듈의 메서드를 호출할 수 있습니다.

JSI는 브릿지를 대체하는 것입니다. 브릿지를 사용하면 네이티브 메서드를 호출하며 즉시 응답을 받아야 하는 경우도 있습니다(예: 현재 중력 값 가져오기). 네이티브 측의 동기 메서드를 호출하더라도 브릿지의 비동기적인 특성 때문에 JavaScript 측은 비동기 메서드가 됩니다. 특히 애니메이션과 같은 순발력이 필요한 상황에서 동기 메서드를 사용하는 것이 중요합니다. JSI를 사용하면 네이티브 측 메서드를 JavaScript 측에서도 동기적으로 유지할 수 있습니다. JavaScript 측으로 전달되는 메서드를 등록하여 동기적으로 처리할 수 있으므로 반환을 기다릴 필요가 없습니다.

요약하면, JSI는 다른 JavaScript 엔진을 사용할 수 있게 해주며, 쓰레드 간에 완전한 상호 운용성을 제공합니다. JavaScript 코드가 JavaScript 쓰레드에서 바로 네이티브 쪽과 직접 통신할 수 있습니다. 이를 통해 JSON 메시지를 직렬화할 필요 없이 브릿지의 혼잡과 비동기 문제를 해결할 수 있습니다.

<div class="content-ad"></div>

- JavaScript과 Native (C++)는 서로를 알고 있어요 — 이제 JS 일부인 것처럼 함수를 호출할 수 있어요. 동기적으로 같은 스레드에서.
- 동기 이벤트를 사용할 수 있어요.
- JavaScript 엔진과 분리되어 있어요 — 모든 것이 JSI로 이동해서 JavaScript VM을 바꿀 수 있어요.
- 성능 — 첫 번째 바이트까지의 시간이 훨씬 빠르다. 더 많은 구현이 C++로 이루어질 것이고, 이는 크로스 플랫폼이라서 최적화는 iOS와 Android 두 플랫폼 모두에 적용될 거에요. 게다가 C++은 매우 최적화된 언어에요. JavaScript 레이어와 C++ 레이어, 각각이 하나의 코드베이스입니다.

## React Native에서 직접 C++ 사용하기

이제 React Native에서 직접 C++을 사용할 수 있어요. 단순히 C++ 파일을 작성하고 React Native 앱에서 사용하면 되요. JSI에 jhost 객체를 호출하는 메서드가 있어서 가능해졌어요. 이를 통해 객체와 모양을 공유할 수 있으며 JavaScript 엔진을 교체할 수도 있어요.

## Turbo Modules

<div class="content-ad"></div>

터보 모듈: React Native의 네이티브 영역으로의 입구입니다. 네이티브 모듈의 새로운 구현체입니다. 그 중요한 이점은 필요할 때만 로드할 수 있다는 것입니다 - 사용할 때만 로드하고, 모든 것을 실행 시간에 로드하지 않는다는 것이죠.

왜 네이티브 모듈이 필요할까요? 가령 앱이 있고 네이티브 플랫폼 호스트 코드를 파고들어 무언가를 배포하고 싶다고 가정해봅시다. 그렇다면 네이티브 모듈을 작성해야 합니다. 모듈은 서비스와 같습니다. 정보를 입력하거나 출력해야 하는 것들이지요.

과거 아키텍처에서 앱에서 어떤 네이티브 액세스가 필요한 기능(예: 블루투스)이 있다면, 무언가가 드물더라도 - 앱을 실행할 때마다 모든 네이티브 모듈이 메모리로 로드됩니다. 이는 초기 부하 화면을 늦추고 사용자에게 앱 실행 지연을 야기할 수 있습니다. 새로운 아키텍처에서 터보 모듈은 이런 문제를 해결해 줍니다 - 이제 모든 네이티브 모듈을 로드할 필요가 없고, 이제는 지연 로딩을 사용할 수 있습니다.

## 네이티브 모듈:

<div class="content-ad"></div>

- 네이티브 모듈에서의 이니셜라이징: 애플리케이션이 시작될 때 네이티브 모듈을 즉시 초기화할 수 있어 필요한 네이티브 코드 구성 요소가 JavaScript 레이어에서 사용 가능하고 준비되어 있는지 보장할 수 있습니다. 이는 네이티브 라이브러리 초기화, 통신 채널 설정 또는 네이티브 이벤트 리스너 등을 포함할 수 있습니다.
- 네이티브 모듈에서의 싱글톤 라이프사이클: 애플리케이션의 런타임 동안 특정 모듈 인스턴스가 하나뿐임을 보장합니다. 이를 통해 JavaScript에서 네이티브 기능에 효율적이고 일관된 접근이 가능하며, 네이티브 리소스를 불필요하게 재초기화하는 것을 피할 수 있습니다.
- 네이티브 모듈에서의 런타임 네이티브 상수: 네이티브 모듈은 런타임에서만 사용 가능한 네이티브 상수나 설정에 액세스할 수 있습니다. 이는 기기 화면 크기, 네트워크 상태 또는 응용 프로그램 실행 중 변경될 수 있는 다른 시스템 수준 속성과 같은 플랫폼별 상수를 포함할 수 있습니다.
- 네이티브 모듈에서의 호출 확인 불필요: JavaScript에서 호출된 네이티브 메소드 호출은 명시적 검증 없이 유효하다고 가정됩니다. 이로써 네이티브 레이어가 적절한 처리와 작업을 담당하게 됩니다.
- 네이티브 모듈에서의 반복적인 런타임 패키징: 네이티브 모듈을 고려할 때, "반복적인 런타임 패키징"은 직접 적용되지 않을 수 있습니다. 이는 JavaScript 코드 및 자산을 번들링하거나 패키징하는 것과 관련이 더 많으며 네이티브 코드보다는 관련성이 적을 수 있습니다. 그러나 이는 런타임에서 네이티브 모듈의 동적 로딩 또는 다시로딩을 참조할 수 있는 것을 의미할 수 있으며, React Native는 전형적인 정적 모듈 등록 접근 방식을 취하므로 이는 덜 일반적일 수 있습니다.

커스텀 네이티브 모듈을 작성할 때 고려해야 할 사항에 대해 언급해보자면 - 즉, C++로 무언가를 구현하거나 네이티브 측에서 작업을 수행할 수 있습니다. JSI를 통해 직접 JS에서 네이티브 기능을 얻을 수 있습니다. JS에서 네이티브 코드를 동기적으로 호출할 수 있습니다.

![React Native Developer](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_10.png)

React Native 팀은 모듈 시스템을 다시 쓰며 이를 "터보 모듈(Turbo Modules)"이라고 부릅니다. 지난 네이티브 모듈에는 "어떤 것이 언제"인지 모르기 때문에 우리는 그 모든 것을 업로드했습니다. JavaScript 측에서 그들과 통신은 브릿지를 통해 이루어졌습니다. 이제, JavaScript 측에서 JSI를 통해 네이티브 코드에 직접적으로 참조할 수 있으므로 필요할 때만 로드할 수 있습니다. 이는 애플리케이션 시작 시간의 거대한 향상이 됩니다. 모듈의 각 메소드가 동기적으로 호출될 수 있습니다. 따라서 JSON 브릿지를 통한 콜백이 필요 없습니다.

<div class="content-ad"></div>

## Turbo Modules에 대한 몇 가지 중요한 사실:

- Turbo Modules는 JSI에 속합니다(C++로 작성됨) — Turbo Modules는 기본적으로 이전 Native 모듈에 대한 개선 사항입니다. 이제 JavaScript에서는 이러한 모듈에 참조를 보관할 수 있게 되어 JavaScript 코드가 각 모듈이 필요한 경우에만 로드할 수 있게 됩니다. 이는 React Native 앱의 시작 시간을 크게 개선할 것으로 예상됩니다.
- 이들은 레이지로드 네이티브 모듈입니다.
- 이들은 UI와 분리됩니다 — 터보 모듈은 자바스크립트 쪽에 작성된 모듈입니다. 네이티브 모듈(네이티브 객체(호스트 객체))의 참조를 자바스크립트 객체로 내보내어 자바스크립트 쪽에서 사용할 수 있게 합니다. 따라서 이 참조를 통해 자바스크립트 쪽은 메모리를 복사하고 공유하지 않고도 네이티브 UI에 직접적으로 쓸 수 있습니다.
- 역호환성 지원 — 역호환성을 갖춘 TurboModule을 만들면 사용자는 사용 중인 아키텍처와 독립적으로 여러분의 라이브러리를 계속 활용할 수 있게 됩니다. 이러한 모듈을 만드는 과정에는 몇 가지 단계가 필요합니다. 라이브러리를 구성하여 의존성을 올드 및 뉴 아키텍처 양쪽으로 올바르게 준비하고 설정하세요.
- 코드 제너레이션에서의 사용 — 코드 제너레이션 단계는 빌드 시간에 JavaScript 인터페이스를 생성함으로써 유형 안전성을 보장합니다. 지금까지 네이티브 모듈을 어떤 시점에 호출하기 위해서는 앱이 시작될 때 이를 등록해야 했습니다 — 네이티브 쪽이 자바스크립트 쪽에 사용 가능한 것을 알리며 등록이 완료되면 자바스크립트가 네이티브 모듈을 호출할 때 유형 확인이 이루어지지 않습니다. 코드 제너레이션을 통해 JavaScript/TypeScript가 네이티브 쪽에 무슨 유형을 가져와야 하는지 알리는 식으로 전환이 이루어지며, 코드 제너레이션에 명시된 유형은 네이티브 쪽에 무슨 일이 일어나고 있는지 알려줍니다. 이것이 게으른 초기화를 가능하게 하며 정확한 TypeScript 유형과 네이티브 유형을 가지게 합니다.
- JS에서 네이티브 기능에 직접 액세스 가능
- global.\_turboModuleProxy(“MyTurboModule”) — 글로벌 수준에 turbo module 프록시가 있으며 원하는 특정 모듈을 선택해 자바스크립트에서 가져올 수 있습니다. 그리고 내재적으로 네이티브 함수가 호출됩니다.

이제 우리는 자바스크립트 쪽에서 필요한 때마다 모든 것을 정확히 호출할 수 있고 직접 호출할 수 있기 때문에 시작할 때 모든 Native 모듈을로드할 필요가 없게 되었습니다. 지금까지 앱 시작 시 네이티브 쪽에 대해 아무것도 모르고 있었으므로 시작 시 모든 것을 업로드/빌드했습니다. 이제 필요할 때 네이티브 코드를 호출하고 직접 호출하면 필요한 시기에 이 네이티브 모듈들을 알 수 있습니다. 이는 시작 시간의 큰 감소를 초래할 수 있습니다. 네이티브 모듈들은 이제 사용되는 화면에서 게으르게로딩될 수 있습니다.

네이티브 모듈들을 동기적으로 호출할 수 있습니다. 다른 쪽에 도착할 때를 알고 있는 번들로 들어가는 JSON 메시지에 의존하지 않습니다.

<div class="content-ad"></div>

이미 직접적인 참조가 있다면 필요한 경우에 무엇이 필요한지 알 수 있습니다. 필요한 모듈을로드합니다. 필요할 때만 모듈을로드하고 각 모듈은 동기적으로 호출할 수 있습니다. 이전 브릿지를 통해 콜백을 기다릴 필요가 없습니다.

![react-native](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_11.png)

요약하자면, Turbo 모듈은 다음을 제공합니다:

- JavaScript 코드가 필요할 때마다 모듈을로드하고 직접적인 참조를 유지할 수 있도록 합니다.
- 이전 브릿지에서 일치하는 JSON 메시지를 사용하여 통신할 필요가 없어집니다.
- 많은 네이티브 모듈을 사용하는 앱의 시작 시간을 크게 개선할 것입니다.

<div class="content-ad"></div>

# Fabric: 새로운 C++에서의 다시 렌더링

Fabric: React Native의 새로운 렌더링 시스템으로, 기존 렌더 시스템의 개념적 진화입니다. 현재의 UIManager를 대체할 것입니다.

UIManager: React Native에서 제공하는 모듈로, 네이티브 UI 컴포넌트와 상호 작용하기 위한 메서드를 노출합니다.

네이티브 UI의 렌더링을 위해 다시 렌더링이 있습니다: 다시 렌더링은 네이티브 쪽 UI 렌더링을 담당합니다. 새로운 아키텍처 다시 렌더링은 Fabric라고 불립니다. 그 큰 장점은 높은 우선 순위의 UI 작업을 허용한다는 것입니다.

<div class="content-ad"></div>

새 아키텍처, 특히 Fabric은 그런 문제를 해결하기 위해 나왔어요 — 목록을 스크롤하다가 어느 순간에 화면이 플래시 하는 현상이죠. 그건 React Native이 JSON 브릿지를 통해 많은 메시지를 보내기 때문에 발생합니다.

Meta는 rerender를 C++ 세계로 이동시킵니다. Fabric을 사용하면 모든 것이 그렇게 일어나지 않습니다. React 연속 모드처럼 우선 순위를 채택합니다. JSI에서 직접 통신하는 방식 덕분에 잘 작동할 거예요.

네이티브로 깊게 파고들어서, React Native에서 노출된 것에 한정되지 않고 네이티브를 탐험할 수도 있어요.

네이티브 UI를 렌더링할 때, 우리는 rerender를 가지고 있어요: rerender는 네이티브 쪽 UI 렌더링을 담당하죠. 새 아키텍처 rerender는 Fabric이라고 불립니다. 이 큰 장점은 높은 우선 순위 UI 작업이 가능하다는 거예요.

<div class="content-ad"></div>

새 아키텍처, 특히 Fabric은 그런 문제들을 해결하기 위해 나왔어요 — 목록을 스크롤하는 중에 어느 순간 흰색으로 번쩍이는 현상이 있을 때가 있죠. 이는 React Native가 JSON 브리지를 통해 많은 메시지를 보내기 때문에 발생하는 문제입니다.

Fabric을 사용하면 이러한 현상이 발생하지 않아요. Fabric은 React 동시 모드와 같이 우선 순위를 채택합니다. 그것이 작동하는 이유는 JSI에서 직접 통신하기 때문이에요.

Fabric은 JSI를 사용하고 UIManager를 대체해야 합니다:

- UI 작업은 JSI를 통해 직접 JavaScript 쪽에 노출됩니다.
- 모든 UI 작업을 생성하세요 — 새로운 UIManger는 특정 뷰 타입(예: Text, View 또는 Images)에 대한 ComponentDescriptors와 Shadow Nodes를 생성할 수 있어요.
- Java/ObjC와 통신하여 플랫폼별 UI를 그리세요.

<div class="content-ad"></div>

<img src="/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_12.png" />

React Native 앱에서 현재 UI 렌더링은 다음과 같이 작동합니다:

1. 앱이 실행되면 React가 코드를 실행합니다.
2. React가 JavaScript에서 ReactElementTree를 생성합니다.
3. React 트리를 기반으로 React Native 렌더러가 C++에서 ReactShadowTree를 생성합니다.
4. Shadow Tree인 ReactShadowTree는 UI 요소의 위치를 계산하기 위해 레이아웃 엔진인 Yoga에 의해 사용됩니다.
5. Yoga가 작업을 완료하고 레이아웃 계산 결과가 준비되면, Shadow tree는 Native Elements를 포함하는 HostViewTree로 변환됩니다.
6. [ReactElementTree (JavaScript) -` ReactShadowTree(C++) -` HostViewTree(Native)]
7. 예를 들어, React에서는 'View/' 요소 (ReactElementTree 노드)를 갖지만, React Native (ReactShadowTree)에서는 'ViewShadowNode/'로 나타날 것이며, Android에서는 ViewGroup로, iOS에서는 UIView로 변환됩니다 (HostViewTree).

현재 방식의 문제점:

현재 방식의 문제는 JavaScript와 UI 스레드 간의 모든 통신이 브릿지를 통해 발생한다는 점입니다. 이는 비동기적인 성격을 가지고 있으며 JSON 직렬화 및 역직렬화를 강제합니다. 이러한 동작은 전송 속도를 떨어뜨리고 중복 데이터 복사를 유발합니다. 예를 들어, `Image/`: React (ReactElementTree)에서는 'Image/'가 있지만, ReactShadowTree의 이후 노드 또한 이미지일 것입니다. 이러한 데이터는 별도로 중복 저장되어야 합니다.

<div class="content-ad"></div>

이 기사의 JSI 섹션에서 보았듯이 JavaScript Interface는 JavaScript에 네이티브 메소드를 직접 노출시켜주며 UI 메소드를 포함합니다. 이를 통해 JavaScript 및 UI 스레드가 동기화되어 리스트, 탐색, 제스처 처리 등의 성능이 향상됩니다.

패브릭의 이점은 무엇인가요?

- 일관성
- 성능 — 모든 것이 이제 C++로 옮겨졌으므로 성능 향상이 이루어집니다. 1 플랫폼을 최적화하면 모든 플랫폼에 적용됩니다.
- UI 이벤트 우선순위 — 이제 모든 것이 동기화되어 UI 이벤트 우선순위를 다룰 수 있게 되었으며 UI 이벤트를 중단시켜 새 애니메이션이 진행 중인 경우 애니메이션을 중단시킬 수 있습니다.
- 빠른 시작 — 네이티브 모듈은 지연로드됩니다.
- 각 단계가 변경 불가능하고 스레드 안전합니다.
- 선택적 동기 실행 — 새 렌더링 시스템은 주 스레드/네이티브 스레드에서 동기적으로 실행할 수 있는 능력을 제공하며 스크롤링, 제스처 등과 같은 사용자 상호작용과 같은 작업은 비동기적으로 실행됩니다. React 18부터 React 함께 사용 가능 — 우선순위 혐오 인식이 있습니다 — sync, sync bundled, async 및 async bundled 4가지 다른 대기열이 있습니다. 이를 사용하여 언제든지 사용자에게 올바른 인터페이스를 보여줄 수 있습니다.
- 공유 소유권, 모두가 일어나는 일을 알 수 있습니다 — 새로운 Shadow Tree는 변경할 수 없으며 JavaScript 및 UI 스레드 사이에서 공유되어 양쪽에서 직접 상호작용할 수 있습니다.
- 메모리 소비 감소 — 현재 아키텍처에서 React Native는 두 개의 계층/DOM 노드를 유지해야 합니다. 그러나 Shadow Tree가 이제 영역 간에 공유되어 메모리 소비를 줄이는 데 도움이 됩니다. Shadow Tree는 Yoga로 완전 c++이며 양쪽에서 소유되기 때문에 네이티브 UI보다 성능이 좋을 것입니다.
- Turbo Modules와 Codegen을 활용 — Fabric은 React Native의 새 렌더링 시스템으로, Turbo Modules와 Codegen을 활용하는 React Native의 새로운 아키텍처의 기초를 형성합니다. 이는 높은 성능, 강화된 타입 안전성 및 네이티브와 JavaScript 코드 간의 간소화된 상호 운용성을 약속합니다.
- 브릿지 없는 모드 — 후향 호환입니다. 전체 앱을 다 작성할 필요 없으며, 차례로 업그레이드할 수 있도록 아키텍처 변경이 표면 뒤에 있습니다. 현재 JSI가 문제를 해결하는 시점에 React Native는 브릿지를 제거할 수 있을 것처럼 보입니다. 그러나 역사적인 이유로 후향 호환성을 위해 0.73에서 새 기능을 볼 수 있습니다 — 브릿지 없음. 새 아키텍처는 설치에 관한 것입니다.
- JS에서 호스트로의 타입 안전성
- JSI 직접 접근
- 공유 C++ 코어

그렇다면 언제 Turbo Modules가 유용할까요?

<div class="content-ad"></div>

- 기기 API에 액세스: 표준 JavaScript 모듈 이상의 기기 API에 직접 액세스해야 하는 경우 Turbo Modules가 유용합니다. 이 모듈들은 표준 JavaScript 모듈을 통해 즉시 노출되지 않는 센서 또는 블루투스와 같은 기기별 기능과의 통합을 가능케 합니다. 일부 기능은 표준 모듈을 통해 실행할 수도 있지만, Turbo Modules는 최적의 성능과 네이티브 API의 전체 범위에 접근할 수 있도록 보장합니다.
- 네이티브 UI 구성 요소: 커스텀 네이티브 UI 구성 요소를 만들 때 Turbo Modules가 빛을 발합니다. 이러한 구성 요소는 자바스크립트 기반의 대안들보다 부드럽고 효율적인 사용자 경험을 제공합니다.
- CPU 집약 작업: 이미지 처리 또는 복잡한 계산과 같이 CPU를 많이 사용하는 작업에 대해 Turbo Modules는 이러한 작업을 네이티브 코드로 이동시킬 수 있습니다. 기기의 계산 능력을 활용함으로써 앱의 성능을 최적화할 수 있습니다.

이제 Turbo Module을 생성해 봅시다:

새로운 아키텍처를 활성화한 React Native 앱에 사용자 정의 Turbo Module을 통합하는 방법을 살펴보겠습니다. 저희의 예시 Turbo Module은 Android 기기의 모델 번호를 검색하여 앱 내에서 표시할 것입니다. 이 접근 방식은 아마존 Fire 디바이스를 포함한 다양한 Android 기기 간의 호환성을 보장합니다.

자세히 알아봅시다:

<div class="content-ad"></div>

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_13.png)

- 사용자가 버튼을 클릭하는 등의 작업을 수행합니다.
- Fabric은 JavaScript 측에서 전달된 React 엘리먼트 트리를 가져와 그를 그림자 트리로 변환합니다.
- Fabric은 레이아웃 계산을 수행합니다 (이때 Yoga를 사용). Flexbox는 네이티브 환경에 존재하지 않습니다. 그래서 화면의 요소들이 어디에 위치할지 계산하기 위해 Yoga를 사용합니다.
- "뷰 평탄화"는 웹에서 Flexbox를 사용하기 때문에 안드로이드에 최적화된 종류의 최적화입니다. 공유 구현으로 이동했기 때문에 많은 최적화가 공유됩니다. 웹에서 상자 모델을 사용하는 경우, 이로 인해 많은 중첩된 뷰가 발생합니다. 이 중첩된 뷰는 더 이상 필요하지 않으며 — React Native은 사용되지 않는 중첩 뷰를 모두 제거합니다.
- 네이티브 측에서는 이전 호스트 트리에서 새 호스트 트리로의 프로모션으로 산출하고, 그런 다음 트리를 라이브 트리로 승격합니다.

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_14.png)

## Fabric 네이티브 컴포넌트

<div class="content-ad"></div>

Fabric Native Component은 Fabric Renderer를 사용하여 화면에 렌더링되는 네이티브 구성요소입니다. 기존 네이티브 구성요소 대신 Fabric Native Component를 사용하면 새로운 아키텍처의 모든 이점을 누릴 수 있습니다:

- 각 플랫폼에서 일관된 강력한 형식화된 인터페이스.
- 코드를 C++로 작성할 수 있으며, 다른 네이티브 플랫폼 언어와 통합하여 중복 구현이 줄어듭니다.
- JSI 사용으로 네이티브 코드와 JavaScript 코드 간의 효율적인 통신이 가능합니다.

작동 방식은 어떻게 되는 걸까요?

- Fabric Native Component는 JavaScript 명세서를 바탕으로 생성됩니다.
- Codegen은 컴포넌트별 로직(예: 네이티브 플랫폼 기능에 접근)을 React Native 인프라와 연결하기 위한 C++ 기본 코드를 생성합니다.
- C++ 코드는 모든 플랫폼에서 동일합니다.
- 컴포넌트가 기본 코드와 올바르게 연결되면 앱에서 가져와 사용할 준비가 됩니다.

<div class="content-ad"></div>

# 코드 생성 - JS와 C++ 간의 타입 안전성을 제공하는 유틸리티

코드 생성: 정적 유형 확인기입니다. 코드 생성은 전용 도구로, C++에서 인터페이스를 생성합니다! JavaScript가 동적 유형 언어이고 JSI가 C++로 작성된 것을 고려하여(정적 유형 언어인) 원활한 통신을 보장해야 합니다.

리액트 네이티브의 새로운 아키텍처는 애플리케이션 및 라이브러리를 위해 ObjC, C++ 및 Java 코드를 생성하기 위해 CodeGen에 의존합니다.

코드 생성은 빌드 시간에 C++ 인터페이스를 생성하여 유형 안전성을 보장합니다. 이러한 인터페이스는 네이티브 코드와 JavaScript 측 데이터 간의 동기화를 유지합니다.

<div class="content-ad"></div>

CodeGen은 정적 타입 지정된 JavaScript 방언으로 작성된 입력 명세 파일을 입력으로 받습니다. 이것은 대상 언어인 ObjC, C++ 및 Java가 모두 정적으로 타입이 지정되어 있기 때문에 그들을 위해 타입이 지정된 코드를 생성해야 하기 때문에 필요합니다. JavaScript 측에서 네이티브 측으로 전달하려는 모든 것의 인터페이스와 데이터의 정적 유형을 생성합니다. 이것이 바로 타입 안전성입니다.

CodeGen은 JavaScript와 C++ 사이의 정적 타입 통합을 돕게 됩니다. 네이티브 모듈을 작성하려면 지금 CodeGen을 사용하여 많은 보일러플레이트 코드를 생성하고 인터페이스를 제공할 수 있는 도구가 될 것입니다. 그리고 JavaScript가 진리의 원천이 될 것입니다.

JSI는 강력하게 타입이 지정된 C++로 작성되었으므로 인터페이스가 필요하므로 JavaScript를 타입 지정해야만 하는 상황이 됩니다. 적절한 유형을 작성해야만 하는 강제성이 있습니다.

![그림](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_15.png)

<div class="content-ad"></div>

코드 생성기(Codegen) 입력은 TypeScript/Flow로 작성된 JavaScript 파일들입니다. 출력물로는 JSI 바인딩, ObjC 프로토콜 및 추상 자바 클래스가 있습니다. 코드 생성기는 JSI 바인딩을 용이하게 하여 JavaScript와 네이티브 코드 간에 빠르고 직접적인 상호 작용을 가능하게 하며 브릿지를 우회합니다. 이 최적화는 React Native 앱이 네이티브와 JavaScript 간의 더 신속하고 효율적인 통신을 이루도록 합니다.

타입 지정된 JavaScript(타입스크립트/플로우)을 진실의 원천으로 사용함으로써, CodeGen은 Turbo Modules와 Fabric에서 사용될 인터페이스 요소를 정의합니다. 이는 런타임이 아닌 빌드 시점에 더 많은 네이티브 코드를 생성합니다.

Codegen을 사용하는 것은 필수적이지 않습니다. 모두 수동으로 작성될 수 있지만, 많은 시간을 절약해 줄 수 있는 골조 코드를 생성합니다.

iOS에서, 코드 생성기 프로세스는 앱 빌드와 긴밀하게 결합되어 있으며, 스크립트는 react-native NPM 패키지에 있습니다. 실행해야 하는 스크립트는 MyApp/node_modules/react-native/scripts/generate-codegen-artifacts.js에 위치해 있습니다.

<div class="content-ad"></div>

코드 생성기는 React Native를 통해 iOS 또는 Android 앱을 빌드할 때마다 자동으로 호출됩니다. 그러나 때로는 생성된 코드를 확인하기 위해 스크립트를 수동으로 실행하고 싶을 수도 있습니다. 이는 Turbo Native Modules 및 Fabric Native Components을 개발할 때 발생하는 일반적인 시나리오입니다.

![React Native Developer](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_16.png)

코드 생성기(Codegen)의 장점:

- JavaScript 및 Native Worlds 간의 코드가 서로 신뢰할 수 있게 됩니다. 런타임 검사가 필요 없이 인터페이스가 자동 생성되며 C++로 작성됩니다. 이전 아키텍처에서 브릿지를 사용했을 때는 메시지가 일괄 처리되었고 JSON 형식으로 전달되었습니다. JavaScript/Native 측 도착 시 원래 메시지인지 확인이 필요했습니다. 이제 인터페이스가 있으므로 JavaScript 및 Native 측의 데이터 유효성을 검사할 필요가 없어졌습니다. JavaScript 및 Native 측이 서로 전달하는 데이터의 유효성 검사를 대신 처리하게 됩니다. 코드 생성기를 사용하면 Native 측에서 JavaScript 모듈을 인지할 수 있습니다.

- CI를 통해 네이티브 코드가 올바르게 업데이트되었는지 확인할 수 있습니다. 네이티브 코드가 jsi-bindings와 기타 내용과 일치하는지 확신할 수 있습니다. 빌드 시점에 우리는 실패 여부를 알 수 있습니다. 전에는 네이티브에서는 문자열을 사용하고, iOS에서는 숫자를 사용했으며, JavaScript에서는 객체를 전송했기 때문에 누구도 유형을 확인하지 않았습니다.

- "code-push"를 사용할 때, 앱 개발 주기 중 JavaScript 번들을 업데이트할 때 "code-push"를 통해 가능합니다. 새 아키텍처를 사용하면 'over-the-air' 업데이트를 통해 백워드 호환성을 확인할 수 있습니다. 변경 사항이 앱을 망가뜨리는지 여부를 확인할 수 있습니다. 생성되는 스키마는 구성 요소 (Fabric Native Components, Turbo Modules)의 유형과 API의 JSON 표현입니다. 이 스키마를 도구에 제공하여 스키마가 백워드 호환성을 보장하고 변경 사항이 없는지 확인할 수 있습니다.

- 충돌이 적은 코드베이스.

- 모듈식이며, 파서를 교체하고 플로우 파서 대신 TS 파서를 사용할 수 있습니다.

- 실행이 빠르고 안전하며 코드가 더 적어집니다.

<div class="content-ad"></div>

기존 구조와 새로운 구조를 요약하여 비교해 봅시다:

- 다리는 JSI로 대체될 것입니다 - 더 이상 JSON 없음 — 새로운 아키텍처에서는 다리를 없애 JSON 메시지가 JavaScript와 네이티브 측 간 통신에 사용되지 않습니다. 통신은 JSI를 사용하여 직접 이루어지며, JSI의 사용은 상호 운용성과 동시성 그리고 더 나은 메모리 관리를 제공합니다. 또한 추가로 지원될 것이 있는데 — 시간에 민감한 작업은 동기적으로 실행될 수 있습니다.
- Turbo 모듈의 지연 로딩 — 빠른 앱 시작 — 새로운 아키텍처에서 기본적으로 호스트 컴포넌트는 나중에 초기화되며, 처음에 모두 초기화되지 않습니다.
- 타입 안전성 — Codegen을 사용하여 새 아키텍처에서는 타입 안전성을 제공하여 코드 품질을 향상시키고 충돌을 줄입니다. 또한 코드 기반을 최신 상태로 유지할 수 있습니다.
- JavaScriptCore를 다른 엔진으로 교체할 수 있는 기능.
- 모든 스레드 간의 완전한 상호 운용성.
- 웹과 유사한 렌더링 시스템.
- Metro 구성 - inlineRequires
- 현대적인 언어 지원 — TypeScript는 이제 Codegen에서 지원되며, Kotlin은 현재 RN에서 완전히 지원됩니다.

# Hermes

빠른 시작을 위해 좋습니다, 바이트 코드를 배송하며, JavaScript가 아닙니다. 코드를 바이트 코드로 컴파일합니다.

<div class="content-ad"></div>

바이트코드로 배송되었습니다. JS가 아닙니다. 코드를 바이트코드로 컴파일하세요.

- Hermes는 안드로이드에서 React Native 앱을 실행하는 데 최적화된 메타 내부 엔진으로 오픈 소스 JavaScript 엔진입니다.
- 메타는 앱 시작 시간을 최적화하기 위해 열심히 노력했고, 그래서 Hermes를 개발했습니다. JavaScript 엔진 자체가 시작 성능에 중요한 요소라는 것을 깨달았습니다. 그래서 Hermes라는 새로운 JavaScript 엔진을 만들었습니다. React Native 앱에 중점을 두고 앱 성능을 향상시키도록 설계되었습니다. 심지어 메모리가 제한적인 대중 시장 장치(적은 RAM 양 및 느린 Flash 메모리 I/O, 느린 저장 공간 및 감소된 컴퓨팅 성능)에서도 작동합니다.
- 현재 새로운 아키텍처에 권장됩니다. 0.69에서 변경되었는데, Hermes의 배포 방식을 변경했습니다. 해당 버전의 엔진이 포함된 Hermes를 사용하도록 변경되었습니다. 이것은 모든 RN 버전이 이 특정 버전으로 빌드된 엔진을 가지고 있음을 의미합니다. 따라서 엔진이 호환되어 RT 충돌을 일으키는 API 호환성 문제가 없음을 보장할 수 있습니다. 0.70부터는 기본 엔진이며 자동으로 활성화되지만 꺼도 됩니다.
- Hermes는 JavaScript 번들이 생성되는 방식을 최적화하며, 대신 미리 컴파일하여 시작 시간을 단축시킵니다. 다른 JavaScript 엔진은 JavaScript을 번들로 제공했지만, Hermes는 미리 컴파일했습니다.
- JavaScript 기반의 모바일 애플리케이션의 사용자 경험은 몇 가지 주요 메트릭에 대한 주의에 따라 혜택을 받습니다:

- 앱이 사용 가능해지기까지 걸리는 시간, TTI (시작 시간)
     - 다운로드 크기(Android의 경우 APK 크기)
     - 메모리 사용량

5. 주요 Hermes 아키텍처 결정:

<div class="content-ad"></div>

- 바이트 코드 사전 컴파일 — 일반적으로 JavaScript 엔진은 JavaScript 소스를 실행할 때(런타임에서) 파싱한 다음 바이트 코드를 생성합니다. 이 단계는 JavaScript 실행을 지연시킵니다. 이 단계를 건너뛰기 위해 Hermes는 모바일 애플리케이션 빌드 프로세스의 일부로 실행되는 미리 컴파일하는 컴파일러를 사용합니다. 결과적으로 더 많은 시간을 바이트 코드를 최적화하는 데 사용할 수 있어서 바이트 코드가 더 작고 효율적입니다.
- JIT가 없음 — 실행 속도를 높이기 위해 가장 널리 사용되는 JavaScript 엔진은 자주 해석되는 코드를 기계 코드로 느리게 컴파일할 수 있습니다. 이 작업을 수행하는 것은 JIT(즉시 컴파일) 컴파일러입니다. 현재 Hermes는 JIT 컴파일러를 사용하지 않습니다. 이는 Hermes가 특히 CPU 성능에 의존하는 일부 벤치마크에서 성능이 부족하다는 것을 의미합니다. 이것은 의도적인 선택이었습니다. 이러한 벤치마크는 일반적으로 모바일 애플리케이션 작업 부하를 대표하지 않습니다. JIT에 대한 일부 실험을 진행했지만, 주요 지표에 손상을 입히지 않고 유익한 속도 향상을 달성하는 것은 상당히 어렵다고 생각했습니다. 애플리케이션이 시작될 때 JIT가 준비되어야 하기 때문에 TTI(Timeline To Interactive)를 개선하는 데 어려움이 있으며, 때로는 TTI를 해치기도 합니다. 또한 JIT는 네이티브 코드 크기와 메모리 사용량을 늘리므로 주요 지표에 부정적인 영향을 미칩니다. 우리가 가장 중요하게 생각하는 지표들을 손상시킬 가능성이 높으므로 JIT를 구현하지 않기로 결정했습니다. 대신, Hermes에 대한 적절한 교환으로 인터프리터 성능에 초점을 맞추었습니다.
- Garbage collector 전략 — 모바일 장치에서 메모리를 효율적으로 사용하는 것은 특히 중요합니다. 저가 장치는 제한된 메모리를 갖고 있으며, 일반적으로 OS 스왑이 존재하지 않으며, 메모리를 너무 많이 사용하는 애플리케이션을 적극적으로 종료시킵니다. 앱이 종료되면 느린 다시 시작이 필요하고, 백그라운드 기능이 손상됩니다. 초기 테스트에서 32비트 장치에서 대규모 애플리케이션에서 가상 주소(VA) 공간, 특히 연속된 VA 공간이 물리적 페이지의 지연된 할당으로도 제한적인 자원일 수 있다는 것을 알게 되었습니다.
- 엔진이 사용하는 메모리와 VA 공간을 최소화하기 위해 다음과 같은 기능을 갖춘 가비지 컬렉터를 구축했습니다:
- 필요한 경우 할당: 필요할 때만 VA 공간을 청크 단위로 할당합니다.
- 연속적이지 않음: VA 공간은 단일 메모리 범위에 있을 필요가 없으며, 32비트 장치의 자원 한계를 피할 수 있습니다.
- 이동 가능: 물체를 이동할 수 있는 것은 메모리를 조각화하고 더 이상 필요하지 않은 청크를 운영 체제로 반환할 수 있음을 의미합니다.
- 세대별: 모든 GC마다 전체 JavaScript 힙을 스캔하지 않으면 GC 시간이 줄어듭니다.

# 개발자 경험

Hermes를 사용하기 시작하려면 개발자는 build.gradle 파일을 몇 가지 수정하고 앱을 다시 컴파일해야 합니다. React Native에서 Hermes 사용으로의 이주 지침을 확인하세요.

```js
project.ext.react = [
  entryFile: "index.js",
  enableHermes: true
]
```

<div class="content-ad"></div>

# 나태한 컴파일

반복 속도는 JavaScript 기반 플랫폼의 주요 이점 중 하나이지만, 사전에 바이트 코드를 컴파일하면 이 이점이 손상될 수 있습니다. 빠른 다시로드를 유지하기 위해, 헤르메스 디버그 빌드는 사전 컴파일을 사용하지 않습니다. 대신, 기기에서 지연되어 바이트 코드를 생성합니다. 이를 통해 Metro나 다른 일반 JavaScript 코드 소스를 실행하여 신속하게 반복할 수 있습니다. 이러한 접근 방식의 상충은 나태하게 컴파일된 바이트 코드가 프로덕션 빌드의 모든 최적화를 포함하지 않는다는 것입니다. 실제로 성능 차이를 측정할 수 있지만, 이 접근 방식이 생산성 메트릭에 영향을 미치지 않고 좋은 개발자 경험을 제공하는 데 충분하다는 것을 발견했습니다.

# 표준 규격 준수

헤르메스는 현재 ES6 명세를 대상으로 하며, JavaScript 명세의 발전에 맞추어 업데이트할 계획입니다. 엔진 크기를 작게 유지하기 위해, React Native 앱에서 일반적으로 사용되지 않는 프록시나 로컬 eval()과 같은 몇 가지 언어 기능을 지원하지 않기로 결정했습니다. 전체 목록은 GitHub에서 확인할 수 있습니다.

<div class="content-ad"></div>

![Become a React Native Developer - The New Architecture_17](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_17.png)

![Become a React Native Developer - The New Architecture_18](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_18.png)

# The Lean Core — Removing Couples of Libraries Outside the Repo

리액트 네이티브는 거대한 repo였습니다. 현재 주요 코드 베이스의 일부를 별도의 repos(예: WebView, ScrollView, Switches 및 기타 UI 구성 요소)로 이동함으로써 전체 코드베이스의 견고성을 향상시킬 수 있습니다. 이렇게 하면 더 많은 사람들이 참여하고 앱에서 불필요한 코드를 줄일 수 있습니다. 이점으로는 런치 시간이 더 좋아지며, 수정이 더 쉬워지고 기여하기가 더 쉬워집니다.

<div class="content-ad"></div>

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_19.png)

# 빌드 툴

코드를 핸드폰에 어떻게 전달하나요? 업그레이드하고 빌드하는 것이 가장 중요한 작업입니다.

- Meta가 사용한 빌드 툴은 buck입니다.
- React Native 팀은 플랫폼별 도구를 제공하길 원합니다.
- Android —

<div class="content-ad"></div>

- 안드로이드에서 Gradle을 확장하는 작업을 하고 있어요. 특히 C++ 코드를 빌드하는 데 필요한 지원을 추가하고 있어요. CMake 파일은 C++를 어떻게 컴파일할지 설명해요.
- 또한 React Native 팀은 React Native Gradle 플러그인을 다시 작성했어요. 이것은 새로운 아키텍처의 주요 코드여야 해요. 앞으로는 템플릿에 있는 react.gradle 파일을 대체할 예정이에요.

iOS에서는 동일한 작업을 했지만 이젠 코코아팟(cocoapods)을 사용해요. Logic이 이제는 루비 스크립트로 이동했어요. 또한 iOS에서 API를 개선 중이에요.

# 앱 실행

- 사용자가 앱 아이콘을 누름
- Fabric이 네이티브 쪽을 로드해요 (이제는 네이티브 모듈이 아니에요)
- JS — 자바스크립트 번들을 로드해요: React Components & 관련 Turbo Modules을 참조해요
- Fabric
- Fabric — Shadow 노드: 보여질 노드 트리를 빌드해요
- Fabric — Yoga: 레이아웃을 계산해요

<div class="content-ad"></div>

![이미지](/assets/img/Become-a-React-Native-Developer-—-The-New-Architecture_20.png)

# 새 아키텍처를 사용하는 라이브러리

이미 많은 라이브러리들이 새 아키텍처를 사용하기 시작했습니다:

- react-native-mmkv — React Native용 키/값 저장소
- react-native-reanimated
- react-native-slider
- react-native-template-new-architecture
- react-native-template-typescript
- react-native-webview
- react-native-navigation
- react-native-pager-view
- react-native-screens
- react-native-gesture-handler
