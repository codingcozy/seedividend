---
title: "Apple Watch와 위젯을 지원하는 React Native 앱 개발 방법"
description: ""
coverImage: "/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_0.png"
date: 2024-06-27 14:23
ogImage: 
  url: /assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_0.png
tag: Tech
originalTitle: "React Native App with Apple Watch , Widget Support"
link: "https://medium.com/simform-engineering/react-native-app-with-apple-watch-widget-support-9daef5e131d7"
isUpdated: true
---




## 사용자들의 손목에 앱을 확장해보세요

![image](https://miro.medium.com/v2/resize:fit:1400/1*I9arFpW6WbVftid8urPmfQ.gif)

React Native를 사용하여 모바일 앱을 개발하는 것을 모두가 좋아합니다. 왜냐하면 iOS 및 Android 애플리케이션에 널리 사용되는 크로스 플랫폼 통합을 제공하기 때문이죠. 하지만 더 흥미로운 사실을 아시나요?

맞죠! React Native 애플리케이션에서 스마트 워치 기기도 지원한다는 것이죠.

<div class="content-ad"></div>

이 글에서는 Apple watchOS 애플리케이션을 React Native 애플리케이션과 통합하는 방법을 배우겠습니다. 더불어, 워치 페이스의 복잡성으로 설정할 수 있는 위젯도 생성할 것입니다.

# 준비물

- React Native, Xcode 및 SwiftUI의 기본 지식
- watchOS를 지원하는 장치 시뮬레이터가 포함된 Xcode

# 개발 환경 설정

<div class="content-ad"></div>

watchOS 앱을 React Native 앱에 추가하기 위해 Apple에서 제공하는 IDE인 Xcode를 사용할 거에요.

더불어, Apple이 제공하는 프레임워크인 WatchKit을 사용할 거에요. WatchKit을 이용하면 watchOS 앱을 만들고, 다른 Apple 기기의 앱과 연결하여 작동시킬 수 있어요.

## watchOS 및 위젯을 위한 필수 종속성 설치

iOS와 watchOS 앱 간 통신을 구현하기 위해 react-native-watch-connectivity라는 라이브러리를 사용할 거에요.

<div class="content-ad"></div>

- 이 패키지를 설치하려면 프로젝트에 따라 yarn 또는 npm을 사용할 수 있습니다:

```js
npm install react-native-watch-connectivity --save
```

```js
yarn add react-native-watch-connectivity
```

코코아팟도 설치하는 것을 잊지 마세요!

<div class="content-ad"></div>

```js
cd ios && pod install && cd ..
```

다음으로, 우리는 플러스 및 마이너스 버튼이 있는 카운트 변수를 갖는 매우 기본적인 React Native 화면을 생성할 것입니다.

# watchOS 앱 지원 추가

이제 iOS 앱을 설정했으므로, watchOS 앱을 개발하기 시작해 봅시다.

<div class="content-ad"></div>

Xcode를 열어 iOS 프로젝트를 엽니다. 툴바에서 File - New - Target를 선택합니다.

다음 창이 표시됩니다: 상단 탭에서 watchOS를 선택한 다음 해당 탭에서 App을 선택합니다.

![이미지](/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_0.png)

다음으로, watchOS 앱에 대한 자세한 정보를 제공하는 또 다른 창이 표시됩니다.

<div class="content-ad"></div>

위의 창에서 워치OS 앱의 앱 이름과 번들 식별자를 제공해주세요.

위의 창에서는 이미 기존의 iOS 앱이 있는지 여부를 선택할 수 있습니다. 우리의 경우 iOS 앱 프로젝트가 설정되어 있습니다. 그래서 Watch App for Existing iOS App을 선택하고 아래 드롭다운에서 iOS 앱의 타겟을 선택하겠습니다.

Finish 버튼을 클릭한 후에는 Xcode 프로젝트에 새 폴더가 추가된 것을 알 수 있습니다. 해당 폴더에는 우리의 watchOS 프로젝트 파일이 포함되어 있습니다.

<div class="content-ad"></div>

## 워치OS 앱의 UI 디자인

이제 워치OS 애플리케이션의 UI를 디자인하기 시작합니다. 시작하려면 SwiftUI 코드가 포함된 ContentView.swift 파일을 열어주세요.

우리의 SwiftUI 코드에서는 카운터의 값이 표시되는 간단한 텍스트 요소를 표시할 것입니다.

우리의 ContentView는 다음과 같이 보여야 합니다:

<div class="content-ad"></div>

# 기능 구현하기

이제 iOS 앱과 watchOS 앱 사이의 양방향 통신 메커니즘을 설정해 봅시다.

## iOS 앱에서 watchOS 앱으로 메시지 보내기

- iOS 앱이 발신자

<div class="content-ad"></div>

워치OS 앱에 메시지를 보내려면 React Native 앱에 설치된 패키지를 사용해야 합니다.

react-native-watch-connectivity에서 sendMessage 및 getReachability 함수를 가져와서 시청 가능한 워치여부를 결정하고 count 변수를 워치OS 앱으로 보내기 위해 사용할 수 있습니다.

다음과 같이 버튼 액션을 수정할 것입니다:

- 수신자로서 워치OS 앱

<div class="content-ad"></div>

watchOS 앱이 iOS 앱에서 전송된 메시지를 수신하도록 설정하려면 새 Swift 파일을 만들어 ConnectionHelper.swift로 이름을 지정합시다. 이 클래스를 사용하여 iOS 앱에서 보내는 메시지와 이벤트를 캡처할 것입니다.

먼저 ConnectionHelper라는 클래스를 만들고 그 안에 워치 세션과 이벤트를 설정하겠습니다.

이 코드는 필수 메서드를 구현하도록 강제하여 오류를 발생시킬 것입니다. 우리의 클래스에서 워치 세션 델리게이트를 위해 필요한 메서드를 구현해야 합니다.

코드를 깨끗하게 유지하기 위해 ConnectionHelper 클래스의 확장(extension)을 만들고 거기에 WCSessionDelegate를 구현하세요. 확장(extension)은 아래 표시된 메서드를 반드시 구현해야 한다는 필수 조건이 있습니다.

<div class="content-ad"></div>

이 방법은 WCSession의 활성화 상태에 변경이 있는지 표시하는 데 유용합니다. 이것은 iOS 앱과 페어링된 Apple Watch 간의 통신이 현재 활성화되어 있는지 확인할 수 있다는 뜻입니다. 그렇지 않으면 오류가 발생합니다.

다음 단계는 iOS 앱에서 watchOS 앱으로 전송되는 이벤트 및 메시지를 가져오는 것인데, 이를 위해 확장에서 didReceiveMessage 메서드를 구현할 것입니다. 이제 우리의 ConnectionHelper 확장은 다음과 같이 보여야 합니다:

위에서 선언한 방법을 사용하여 카운터의 값이 업데이트될 것입니다. 먼저 ConnectionHelper 클래스 내에 선언해 봅시다. 이제 우리의 클래스는 다음과 같이 보여야 합니다:

변수 count를 선언하고 Published로 주석을 달고 ObservableObject 프로토콜을 클래스에 구현했습니다. 왜냐하면 이 count 변수가 변경될 때마다 추적하고 싶기 때문입니다.

<div class="content-ad"></div>

이제 iOS 앱에서 이벤트를 받을 때마다 count 값을 업데이트하는 로직을 구현해야 합니다. 이를 위해 ConnectionHelper 확장에서 정의한 didReceiveMessage 메서드를 사용할 것입니다.

이제 우리가 counter 변수를 생성했으니, watchOS 앱의 UI 내에서 그것을 사용할 시간입니다. ContentView에서 ConnectionHelper 클래스를 인스턴스화하고 count 속성을 사용하여 텍스트 요소 아래에 표시합니다.

이제 iOS 앱에서 watchOS 앱으로의 일방향 통신이 완료되었습니다.

## watchOS 앱에서 iOS 앱으로 메시지 보내기

<div class="content-ad"></div>

- watchOS 앱을 보낸 사람

watchOS 앱에서 iOS 앱으로 메시지를 보내기 위해, 먼저 ConnectionHelper 클래스 내부에 도우미 함수를 만들겠습니다. 이 함수는 watchOS로부터 이전에 생성한 watch 세션을 통해 count 변수를 메시지로 iOS 앱으로 보낼 것입니다.

다음으로, ContentView 파일을 수정하여 +와 - 텍스트가 있는 버튼을 추가하고 해당 버튼에 동작을 추가할 것입니다. 아래 코드 스니펫에서 보시다시피, count 변수를 수정하고 sendNewCount 함수를 사용하여 iOS 앱으로 전송할 것입니다.

그러나 기다려주세요! 아직은 iOS 앱을 설정하여 watchOS 앱에서 보낸 메시지를 수신할 준비를 마치지 않았습니다.

<div class="content-ad"></div>

- **수신기로 사용되는 iOS 앱**

이러한 수신 메시지를 처리하기 위해서는 먼저 react-native-watch-connectivity 패키지에서 가져온 watchEvents를 사용하여 메시지를 수신 대기해야 합니다.

만세! 여기까지입니다. 이제 두 앱을 실행시켜서 한번 시도해보세요.

![이미지](https://miro.medium.com/v2/resize:fit:1076/1*PqaAgPuCgE1W_RGKEC9r7Q.gif)

<div class="content-ad"></div>

# 워치OS 애플리케이션에 위젯 추가하기

## 위젯 익스텐션 타겟 설정

우리의 워치OS 앱에 위젯 지원을 도입하려면 동일한 Xcode 프로젝트에 새로운 타겟을 생성해야 합니다.

프로젝트에 '위젯 익스텐션'이라는 새로운 타겟을 추가할 것이며, 이는 워치OS 타겟과 유사합니다.

<div class="content-ad"></div>


![ReactNativeAppwithAppleWatchWidgetSupport image 2](/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_2.png)

다음을 클릭한 후 위젯 대상의 제품 이름을 제공하십시오.

![ReactNativeAppwithAppleWatchWidgetSupport image 3](/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_3.png)

위젯 확장 대상을 설정한 후 프로젝트에 새 폴더가 표시됩니다. 이 경우 CounterWidget이라는 이름의 폴더가 있습니다. 이 폴더에는 처음에 AppIntent 및 CounterWidget이라는 두 개의 Swift 파일이 포함되어 있습니다.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_4.png" />

## 위젯 UI 및 기능 설계 및 구현

UI를 수정하기 전에 먼저 위젯 확장에 count 변수를 설정해보겠습니다.

이를 위해 AppIntent 파일을 열고 currentCount라는 변수를 선언하고 다음 코드 스니펫에 표시된대로 생성자를 설정해주세요:

<div class="content-ad"></div>

위젯 UI를 디자인하기 위해 CounterWidget 파일을 열어보세요. 위젯 확장을 생성할 때 Xcode에서 자동으로 생성한 EntryView로 스크롤하세요. 아래에 보여지는 대로 현재 카운트 변수를 보여줄 매우 간단한 텍스트 구성요소를 만들 것입니다:

## watchOS 앱과 위젯 확장 간의 데이터 교환 및 공유

이제 watchOS 앱에서 선언된 현재 카운트 변수를 위젯 UI에 표시하려고 합니다. 그러나 Apple은 watchOS 앱과 위젯 간에 데이터를 교환할 수 있는 직접적인 방법을 제공하지 않습니다. 따라서 우리는 Apple이 제공하는 로컬 저장소인 UserDefaults에 카운트 변수를 저장할 것입니다.

watchOS 앱과 위젯 확장 사이에서 공유할 단일 속성을 추가하려면 watchOS와 위젯 확장 모두에 App Groups이라는 새 능력을 추가해야 합니다.

<div class="content-ad"></div>

해당 방법을 수행하려면, 프로젝트 설정을 열고, 타겟을 선택한 다음, Signing & Capabilities 탭을 선택하세요. 그러면 + Capability 버튼을 클릭하여 그 창에서 타겟을 선택하세요.

![image](/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_5.png)

App Groups을 기능으로 추가한 후에는, 이 창 안에 이 섹션이 표시될 것입니다. 이제 + 버튼을 눌러 식별자를 추가하세요.

![image](/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_6.png)

<div class="content-ad"></div>

이제, 여러 대상에서 사용되고 프로젝트에서 데이터가 저장되고 사용될 컨테이너에 대한 유효한 식별자(또한 UserDefaults의 스위트 이름으로 사용될 것)를 제공해주세요.

<img src="/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_7.png" />

<img src="/assets/img/2024-06-27-ReactNativeAppwithAppleWatchWidgetSupport_8.png" />

CounterWidget 파일에는 사용자 인터페이스(UI)를 관리하는 모든 로직과 해당 기능이 포함될 것입니다. 그러나, 주요 기능은 지정된 간격으로 위젯의 UI를 새로 고치는 timeline 함수입니다.

<div class="content-ad"></div>

앞으로 나아가면, 우리 앱 그룹이 준비되었으니, watchOS 앱과 위젯 익스텐션 간에 데이터를 공유하기 위한 메커니즘을 설정해 봅시다.

watchOS 타겟 폴더에 선언된 ConnectionHelper 클래스 내부에 appCount라는 새 변수를 선언할 것이며, 이 변수는 UserDefaults를 사용하여 AppStorage로 주석이 달릴 것입니다. 아래와 같이:

또한, appCount 변수가 작동하도록 하기 위해, count가 변경될 때마다 새로운 값을 할당할 것입니다.

다음 단계에서, 위젯의 UI 내에 이를 표시하고 싶다면, 위젯의 Timeline Provider를 수정해야 합니다. 이를 위해 CounterWidget 파일 내의 미리 생성된 Provider 구조로 이동하십시오.

<div class="content-ad"></div>

먼저, 해당 구조체의 범위 내에서 appCount 변수를 선언하고 프로바이더 함수를 아래와 같이 수정해야 합니다:

찬양하리로다! 우리는 성공적으로 watchOS 앱의 위젯 확장 프로그램을 설정하여 카운트 값을 표시했습니다. 이제 실행해서 시도해 보겠습니다.

![이미지](https://miro.medium.com/v2/resize:fit:554/1*4W6YaN1I5FIM0FKJHUZ2BA.gif)

이제 iOS 애플리케이션에서 카운트를 수정해 보겠습니다.

<div class="content-ad"></div>


![이미지](https://miro.medium.com/v2/resize:fit:1196/1*u8y-X3CelS4YDm0JLFuIdg.gif)

# 결론

React Native 앱을 watchOS와 연동하고 워치 페이스용 위젯을 지원하는 데 성공했습니다.

이제 WatchKit과 WidgetKit을 사용하여 멋진 앱을 만들어보세요. 아이디어와 프로젝트를 아래 댓글에서 공유해주세요.


<div class="content-ad"></div>

행복한 코딩! 😉